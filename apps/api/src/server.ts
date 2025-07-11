// filepath: apps/api/src/server.ts
// Main Fastify server setup with tRPC integration

import Fastify, { FastifyInstance } from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { appRouter } from './trpc/router'
import { createContext } from './trpc/context'
import { connectDatabase } from '@automotive/database'

// Environment configuration
const ENV = process.env.NODE_ENV || 'development'
const PORT = parseInt(process.env.PORT || '4000', 10)
const HOST = process.env.HOST || 'localhost'

/**
 * Create and configure Fastify server
 */
async function createServer(): Promise<FastifyInstance> {
  // Create Fastify instance with simplified logging
  const server = Fastify({
    logger: ENV === 'development' ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    } : true,
  })

  // CORS configuration
  await server.register(import('@fastify/cors'), {
    origin: (origin, callback) => {
      const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001').split(',')
      
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true)
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      
      return callback(new Error('Not allowed by CORS'), false)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  // Security headers
  await server.register(import('@fastify/helmet'), {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })

  // Rate limiting
  await server.register(import('@fastify/rate-limit'), {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10), // 1 minute
    errorResponseBuilder: () => {
      return {
        code: 'RATE_LIMIT_EXCEEDED',
        error: 'Too Many Requests',
        message: 'Rate limit exceeded, please try again later.',
        statusCode: 429,
      }
    },
  })

  // Health check endpoint (outside tRPC for monitoring)
  server.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: ENV,
    }
  })

  // Root endpoint
  server.get('/', async () => {
    return {
      message: 'ULKS Automotive Locksmith API',
      version: '1.0.0',
      environment: ENV,
      documentation: '/trpc-panel', // Will add tRPC panel later
      health: '/health',
      api: '/trpc',
    }
  })

  // Register tRPC
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error, req }: { path?: string; error: any; req: any }) {
        // Log errors for debugging
        if (ENV === 'development') {
          console.error(`❌ tRPC Error on ${path}:`, error)
        }
        
        // Log to your preferred logging service in production
        server.log.error({
          path,
          error: error.message,
          stack: error.stack,
          input: req.body,
        }, 'tRPC Error')
      },
    },
  })

  // Graceful shutdown handler
  const gracefulShutdown = async (signal: string) => {
    server.log.info(`Received ${signal}, shutting down gracefully...`)
    
    try {
      await server.close()
      server.log.info('HTTP server closed')
      
      // Close database connections
      // Prisma handles this automatically, but you can add custom cleanup here
      
      process.exit(0)
    } catch (error) {
      server.log.error('Error during shutdown:', error)
      process.exit(1)
    }
  }

  // Register shutdown handlers
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  process.on('SIGINT', () => gracefulShutdown('SIGINT'))

  return server
}

/**
 * Start the server
 */
async function startServer() {
  try {
    // Connect to database first
    console.log('🔗 Connecting to database...')
    await connectDatabase()
    
    // Create and start server
    console.log('🚀 Starting server...')
    const server = await createServer()
    
    // Start listening
    await server.listen({ 
      port: PORT, 
      host: ENV === 'development' ? HOST : '0.0.0.0' 
    })
    
    console.log('')
    console.log('🎉 ULKS Automotive API Server Started!')
    console.log(`📍 Environment: ${ENV}`)
    console.log(`🌐 Server URL: http://${HOST}:${PORT}`)
    console.log(`🔗 API Endpoint: http://${HOST}:${PORT}/trpc`)
    console.log(`❤️  Health Check: http://${HOST}:${PORT}/health`)
    console.log('')
    console.log('🚀 Ready to serve your automotive locksmith platform!')
    
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  startServer()
}

export { createServer, startServer }