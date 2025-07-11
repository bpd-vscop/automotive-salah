// filepath: apps/api/src/trpc/routers/categories.ts
// Category API endpoints for navigation and filtering

import { TRPCError } from '@trpc/server'
import { initTRPC } from '@trpc/server'
import type { Context } from '../context'

// Initialize tRPC for this router
const t = initTRPC.context<Context>().create()
const router = t.router
const publicProcedure = t.procedure

export const categoriesRouter = router({
  // Get all categories for navigation
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const categories = await ctx.prisma.category.findMany({
          where: {
            isActive: true
          },
          orderBy: {
            sortOrder: 'asc'
          },
          include: {
            children: {
              where: {
                isActive: true
              },
              orderBy: {
                sortOrder: 'asc'
              }
            }
          }
        })

        return categories.map(category => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          image: category.image,
          iconClass: category.iconClass,
          productCount: category.productCount,
          isFeatured: category.isFeatured,
          sortOrder: category.sortOrder,
          children: category.children.map(child => ({
            id: child.id,
            name: child.name,
            slug: child.slug,
            description: child.description,
            productCount: child.productCount,
            sortOrder: child.sortOrder
          }))
        }))
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch categories',
          cause: error
        })
      }
    }),

  // Get featured categories for homepage
  getFeatured: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const categories = await ctx.prisma.category.findMany({
          where: {
            isActive: true,
            isFeatured: true
          },
          orderBy: {
            sortOrder: 'asc'
          }
        })

        return categories.map(category => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          image: category.image,
          iconClass: category.iconClass,
          productCount: category.productCount,
          sortOrder: category.sortOrder
        }))
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch featured categories',
          cause: error
        })
      }
    })
})