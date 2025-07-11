// filepath: apps/api/src/trpc/context.ts
// tRPC context setup - provides database, authentication, and request context

import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@automotive/database'
import jwt from 'jsonwebtoken'

// Types for authentication
interface JWTPayload {
  userId: string
  email: string
  role: string
  userType: 'staff' | 'customer'
}

// Extended request context
interface CreateContextOptions {
  req: FastifyRequest
  res: FastifyReply
}

// Main context type
export interface Context {
  req: FastifyRequest
  res: FastifyReply
  prisma: typeof prisma
  user?: {
    id: string
    email: string
    role: string
    userType: 'staff' | 'customer'
    permissions?: any
  }
}

/**
 * Creates the tRPC context for each request
 * This runs on every API call and provides:
 * - Database access (Prisma)
 * - Authentication information
 * - Request/response objects
 */
export async function createContext({ req, res }: CreateContextOptions): Promise<Context> {
  // Base context with database and request/response
  const baseContext: Context = {
    req,
    res,
    prisma,
  }

  // Extract JWT token from Authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No auth token - return context for public endpoints
    return baseContext
  }

  try {
    // Extract and verify JWT token
    const token = authHeader.substring(7) // Remove "Bearer " prefix
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key'
    
    const decoded = jwt.verify(token, jwtSecret) as JWTPayload

    // Fetch user details based on user type
    let userDetails = null
    let permissions = null

    if (decoded.userType === 'staff') {
      // Fetch staff user with role permissions
      userDetails = await prisma.staffUser.findUnique({
        where: { id: decoded.userId },
        include: {
          role: true
        }
      })
      
      if (userDetails && userDetails.status === 'ACTIVE') {
        permissions = userDetails.role.permissions
      }
    } else if (decoded.userType === 'customer') {
      // Fetch customer details
      userDetails = await prisma.customer.findUnique({
        where: { id: decoded.userId }
      })
    }

    // If user not found or inactive, treat as unauthenticated
    if (!userDetails) {
      return baseContext
    }

    // Add authenticated user to context
    return {
      ...baseContext,
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
        userType: decoded.userType,
        permissions
      }
    }

  } catch (error) {
    // JWT verification failed - treat as unauthenticated
    console.warn('JWT verification failed:', error)
    return baseContext
  }
}

/**
 * Utility function to check if user has specific permission
 */
export function hasPermission(
  context: Context, 
  module: string, 
  action: string
): boolean {
  if (!context.user || !context.user.permissions) {
    return false
  }

  const modulePermissions = context.user.permissions[module]
  if (!modulePermissions) {
    return false
  }

  return modulePermissions[action] === true || 
         modulePermissions[action] === 'full' ||
         (Array.isArray(modulePermissions[action]) && modulePermissions[action].includes('full'))
}

/**
 * Utility function to check if user can access admin features
 */
export function isAdmin(context: Context): boolean {
  return context.user?.userType === 'staff' && 
         ['Super Admin', 'Admin'].includes(context.user.role)
}

/**
 * Utility function to check if user can manage other users
 */
export function canManageUsers(context: Context): boolean {
  return context.user?.userType === 'staff' && 
         ['Super Admin', 'Admin', 'Store Manager'].includes(context.user.role)
}

/**
 * Utility function to get user hierarchy level
 */
export function getUserHierarchyLevel(context: Context): number {
  if (!context.user || context.user.userType !== 'staff') {
    return 999 // Lowest priority for non-staff
  }

  const roleHierarchy: Record<string, number> = {
    'Super Admin': 1,
    'Admin': 2,
    'Store Manager': 3,
    'Editor': 4
  }

  return roleHierarchy[context.user.role] || 999
}

export type { CreateContextOptions }