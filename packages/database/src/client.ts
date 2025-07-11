// filepath: packages/database/src/client.ts
// Database client setup with connection management
// This creates a singleton Prisma client for your entire application

import { PrismaClient } from './generated'

// Global variable for Prisma client (prevents multiple instances in development)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with optimized configuration
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      // Log configuration based on environment
      ...(process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] as const
        : ['error'] as const
      ),
    ],
    errorFormat: 'pretty',
  })

// In development, store the client in global to prevent hot reload issues
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Connection management functions
export async function connectDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw error
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect()
    console.log('✅ Database disconnected successfully')
  } catch (error) {
    console.error('❌ Database disconnection failed:', error)
    throw error
  }
}

// Health check function
export async function checkDatabaseHealth() {
  try {
    // Simple query to check if database is responding
    await prisma.customer.count()
    return { status: 'healthy', timestamp: new Date().toISOString() }
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString() 
    }
  }
}

// Utility function to handle database transactions
export async function withTransaction<T>(
  fn: (prisma: PrismaClient | Omit<PrismaClient, '$transaction'>) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(async (tx) => {
    return await fn(tx as typeof prisma)
  })
}

// Export the default client
export default prisma