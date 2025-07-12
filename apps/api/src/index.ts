// filepath: apps/api/src/index.ts
// Fix the main API server to use correct tRPC setup

import fastify from 'fastify'
import cors from '@fastify/cors'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter, createTRPCContext } from '@automotive/trpc'

const server = fastify({
  maxParamLength: 5000,
  logger: true
})

// Register CORS
await server.register(cors, {
  origin: [
    'http://localhost:3000',  // Customer website
    'http://localhost:3001',  // Admin dashboard
  ],
  credentials: true
})

// Register tRPC
await server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext: createTRPCContext,
  },
})

// Health check endpoint
server.get('/health', async () => {
  try {
    const { prisma } = await createTRPCContext({ req: {} as any, res: {} as any })
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      env: process.env.NODE_ENV || 'development'
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})

// Root endpoint
server.get('/', async () => {
  return {
    message: 'ULKS Automotive Locksmith API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    documentation: '/trpc-panel',
    health: '/health',
    api: '/trpc'
  }
})

// Start server
const start = async () => {
  try {
    await server.listen({ port: 4000, host: '0.0.0.0' })
    console.log('🚀 API Server running on http://localhost:4000')
    console.log('📊 Health check: http://localhost:4000/health')
    console.log('🔧 tRPC API: http://localhost:4000/trpc')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()

// filepath: packages/database/src/client.ts
// Fix database client connection

import { PrismaClient } from './generated'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/automotive-locksmith'
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Connection helpers
export async function connectDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect()
}

export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'connected', timestamp: new Date() }
  } catch (error) {
    return { 
      status: 'disconnected', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date() 
    }
  }
}

// Transaction helper
export async function withTransaction<T>(
  callback: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(callback)
}

export default prisma

// filepath: packages/trpc/src/context.ts
// Update context to use proper database client

import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { prisma } from '@automotive/database'

export interface Context {
  prisma: typeof prisma
  admin?: {
    id: string
    email: string
    role: string
  }
}

export const createTRPCContext = async (
  opts: CreateFastifyContextOptions
): Promise<Context> => {
  // TODO: Add authentication logic here when needed
  return {
    prisma,
  }
}

export type CreateContextFn = typeof createTRPCContext

// filepath: apps/web/app/api/trpc/[trpc]/route.ts
// Update API route to use correct imports

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from '@automotive/trpc'
import type { NextRequest } from 'next/server'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req: req as any, res: {} as any }),
  })

export { handler as GET, handler as POST }

// filepath: packages/auth/src/index.ts
// Fix auth package exports

export {
  hashPassword,
  verifyPassword,
  generateAdminToken,
  generateRefreshToken,
  verifyAdminToken,
  verifyRefreshToken,
  hasPermission,
  hasMinimumHierarchy,
  validatePasswordStrength,
  generateSecurePassword,
  loginRateLimiter,
  LoginRateLimiter,
  ADMIN_SECURITY_HEADERS
} from './admin-auth'

export type {
  AdminJWTPayload,
  AdminContext
} from './admin-auth'

// filepath: packages/auth/src/admin-auth.ts
// Fix JWT typing issues

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { TRPCError } from '@trpc/server'

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '30d'

// Admin JWT Payload Interface
export interface AdminJWTPayload {
  userId: string
  email: string
  roleId: string
  roleName: string
  hierarchyLevel: number
  permissions: Record<string, any>
  iat?: number
  exp?: number
}

// Admin Session Context
export interface AdminContext {
  user: any // Replace with proper type when StaffUser is available
  permissions: Record<string, any>
  isAuthenticated: boolean
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Generate JWT token for admin user
 */
export function generateAdminToken(user: any): string {
  const payload: AdminJWTPayload = {
    userId: user.id,
    email: user.email,
    roleId: user.roleId,
    roleName: user.role.roleName,
    hierarchyLevel: user.role.hierarchyLevel,
    permissions: user.role.permissions as Record<string, any>
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'ulks-admin',
    audience: 'ulks-admin-dashboard'
  })
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId, type: 'refresh' },
    JWT_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      issuer: 'ulks-admin',
      audience: 'ulks-admin-refresh'
    }
  )
}

/**
 * Verify and decode JWT token
 */
export function verifyAdminToken(token: string): AdminJWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'ulks-admin',
      audience: 'ulks-admin-dashboard'
    }) as AdminJWTPayload
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Token expired'
      })
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid token'
      })
    }
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token verification failed'
    })
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): { userId: string } {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      issuer: 'ulks-admin',
      audience: 'ulks-admin-refresh'
    }) as any
    
    if (payload.type !== 'refresh') {
      throw new Error('Invalid token type')
    }
    
    return { userId: payload.userId }
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid refresh token'
    })
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  permissions: Record<string, any>,
  resource: string,
  action: string
): boolean {
  const resourcePerms = permissions[resource]
  if (!resourcePerms || typeof resourcePerms !== 'object') {
    return false
  }
  return resourcePerms[action] === true
}

/**
 * Check if user has minimum hierarchy level
 */
export function hasMinimumHierarchy(userLevel: number, requiredLevel: number): boolean {
  // Lower numbers = higher permissions (1 = Super Admin, 4 = Editor)
  return userLevel <= requiredLevel
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Generate secure random password
 */
export function generateSecurePassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const all = uppercase + lowercase + numbers + symbols
  let password = ''
  
  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}

/**
 * Rate limiting for login attempts
 */
export class LoginRateLimiter {
  private attempts: Map<string, { count: number; lockUntil?: Date }> = new Map()
  private readonly maxAttempts = 5
  private readonly lockDuration = 15 * 60 * 1000 // 15 minutes

  canAttemptLogin(identifier: string): boolean {
    const record = this.attempts.get(identifier)
    
    if (!record) {
      return true
    }
    
    if (record.lockUntil && record.lockUntil > new Date()) {
      return false
    }
    
    if (record.lockUntil && record.lockUntil <= new Date()) {
      // Lock expired, reset
      this.attempts.delete(identifier)
      return true
    }
    
    return record.count < this.maxAttempts
  }

  recordFailedAttempt(identifier: string): void {
    const record = this.attempts.get(identifier) || { count: 0 }
    record.count++
    
    if (record.count >= this.maxAttempts) {
      record.lockUntil = new Date(Date.now() + this.lockDuration)
    }
    
    this.attempts.set(identifier, record)
  }

  recordSuccessfulLogin(identifier: string): void {
    this.attempts.delete(identifier)
  }

  getRemainingLockTime(identifier: string): number {
    const record = this.attempts.get(identifier)
    
    if (!record || !record.lockUntil) {
      return 0
    }
    
    const remaining = record.lockUntil.getTime() - Date.now()
    return Math.max(0, remaining)
  }
}

// Global rate limiter instance
export const loginRateLimiter = new LoginRateLimiter()

/**
 * Security headers for admin responses
 */
export const ADMIN_SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
}