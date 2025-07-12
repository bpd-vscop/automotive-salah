// filepath: packages/trpc/src/trpc.ts
// Core tRPC setup - this file was missing

import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'
import type { Context } from './context'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

// Middleware for admin authentication
export const adminMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.admin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      admin: ctx.admin,
    },
  })
})

export const adminProcedure = publicProcedure.use(adminMiddleware)

// filepath: packages/trpc/src/context.ts  
// Fix context to match actual database schema

import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { prisma } from '@automotive/database'

export interface Context {
  prisma: typeof prisma
  admin?: {
    id: string
    email: string
    role: string
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions): Promise<Context> => {
  return {
    prisma,
  }
}

export type CreateContextFn = typeof createTRPCContext

// filepath: packages/trpc/src/routers/products.ts
// Fix products router to match actual database schema

import { z } from 'zod'
import { publicProcedure, router, adminProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const productsRouter = router({
  // Public procedures for customer website
  getAll: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().min(0).default(0),
      search: z.string().optional(),
      categoryId: z.string().optional(),
    }))
    .query(async ({ input, ctx }) => {
      try {
        const { limit, offset, search, categoryId } = input

        const where: any = {
          status: 'ACTIVE',
          approvalStatus: 'APPROVED'
        }

        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } }
          ]
        }

        if (categoryId) {
          where.categoryId = categoryId
        }

        const [products, total] = await Promise.all([
          ctx.prisma.product.findMany({
            where,
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
            take: limit,
            skip: offset
          }),
          ctx.prisma.product.count({ where })
        ])

        return {
          products: products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            shortDescription: product.shortDescription,
            price: product.salePrice || product.regularPrice,
            originalPrice: product.salePrice ? product.regularPrice : null,
            sku: product.sku,
            slug: product.sku.toLowerCase(),
            image: `/images/products/${product.sku.toLowerCase()}.jpg`,
            category: product.category,
            stockQuantity: product.stockQuantity,
            inStock: product.stockQuantity > 0,
            featured: product.featured,
            onSale: product.onSale,
            newProduct: product.newProduct,
            createdAt: product.createdAt
          })),
          total,
          hasMore: offset + limit < total
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch products'
        })
      }
    }),

  getFeatured: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(12).default(8)
    }))
    .query(async ({ input, ctx }) => {
      try {
        const products = await ctx.prisma.product.findMany({
          where: {
            featured: true,
            status: 'ACTIVE',
            approvalStatus: 'APPROVED'
          },
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          },
          orderBy: [
            { featured: 'desc' },
            { createdAt: 'desc' }
          ],
          take: input.limit
        })

        return products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.shortDescription || product.description,
          price: product.salePrice || product.regularPrice,
          originalPrice: product.salePrice ? product.regularPrice : null,
          image: `/images/products/${product.sku.toLowerCase()}.jpg`,
          category: product.category.name,
          categorySlug: product.category.slug,
          slug: product.sku.toLowerCase(),
          sku: product.sku,
          featured: product.featured,
          onSale: product.onSale,
          newProduct: product.newProduct,
          inStock: product.stockQuantity > 0,
          stockQuantity: product.stockQuantity
        }))
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch featured products'
        })
      }
    }),

  getOnSale: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(12).default(8)
    }))
    .query(async ({ input, ctx }) => {
      try {
        const products = await ctx.prisma.product.findMany({
          where: {
            onSale: true,
            salePrice: { not: null },
            status: 'ACTIVE',
            approvalStatus: 'APPROVED'
          },
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          },
          orderBy: [
            { onSale: 'desc' },
            { updatedAt: 'desc' }
          ],
          take: input.limit
        })

        return products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.shortDescription || product.description,
          price: product.salePrice!,
          originalPrice: product.regularPrice,
          discount: Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100),
          image: `/images/products/${product.sku.toLowerCase()}.jpg`,
          category: product.category.name,
          categorySlug: product.category.slug,
          slug: product.sku.toLowerCase(),
          sku: product.sku,
          onSale: product.onSale,
          inStock: product.stockQuantity > 0,
          stockQuantity: product.stockQuantity
        }))
      } catch (error) {
        console.error('Failed to fetch on sale products:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch on sale products'
        })
      }
    }),

  getNew: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(12).default(8)
    }))
    .query(async ({ input, ctx }) => {
      try {
        const products = await ctx.prisma.product.findMany({
          where: {
            newProduct: true,
            status: 'ACTIVE',
            approvalStatus: 'APPROVED'
          },
          include: {
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          },
          orderBy: [
            { newProduct: 'desc' },
            { createdAt: 'desc' }
          ],
          take: input.limit
        })

        return products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.shortDescription || product.description,
          price: product.salePrice || product.regularPrice,
          originalPrice: product.salePrice ? product.regularPrice : null,
          image: `/images/products/${product.sku.toLowerCase()}.jpg`,
          category: product.category.name,
          categorySlug: product.category.slug,
          slug: product.sku.toLowerCase(),
          sku: product.sku,
          newProduct: product.newProduct,
          onSale: product.onSale,
          inStock: product.stockQuantity > 0,
          stockQuantity: product.stockQuantity
        }))
      } catch (error) {
        console.error('Failed to fetch new products:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch new products'
        })
      }
    })
})

// filepath: packages/trpc/src/index.ts
// Main tRPC router export

import { router } from './trpc'
import { productsRouter } from './routers/products'

export const appRouter = router({
  products: productsRouter
})

export type AppRouter = typeof appRouter
export { createTRPCContext } from './context'