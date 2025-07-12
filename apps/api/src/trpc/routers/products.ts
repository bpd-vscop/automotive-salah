// filepath: apps/api/src/trpc/routers/products.ts
// Product API endpoints for homepage and catalog

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";
import type { Context } from "../context";

// Initialize tRPC for this router
const t = initTRPC.context<Context>().create();
const router = t.router;
const publicProcedure = t.procedure;

export const productsRouter = router({
  // Get featured products for homepage hero section
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.prisma.product.findMany({
        where: {
          featured: true,
          status: "ACTIVE",
        },
        include: {
          compatibility: {
            take: 3, // Include some vehicle compatibility info
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6, // Limit to 6 featured products
      });

      // Transform for frontend consumption
      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        images: product.images,
        thumbnailImage: product.thumbnailImage || product.images[0],
        brand: product.brand,
        slug: product.slug,
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
        featured: product.featured,
        onSale: product.onSale,
        newProduct: product.newProduct,
        compatibility: product.compatibility.map((c) => ({
          year: c.year,
          make: c.make,
          model: c.model,
          notes: c.notes,
        })),
      }));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch featured products",
        cause: error,
      });
    }
  }),

  // Get products on sale for sale section
  getOnSale: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.prisma.product.findMany({
        where: {
          onSale: true,
          status: "ACTIVE",
          salePrice: {
            not: null,
          },
        },
        orderBy: [
          { featured: "desc" }, // Featured sale items first
          { createdAt: "desc" },
        ],
        take: 8,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        savings: product.salePrice
          ? product.regularPrice - product.salePrice
          : 0,
        savingsPercent: product.salePrice
          ? Math.round(
              ((product.regularPrice - product.salePrice) /
                product.regularPrice) *
                100,
            )
          : 0,
        images: product.images,
        thumbnailImage: product.thumbnailImage || product.images[0],
        brand: product.brand,
        slug: product.slug,
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
      }));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch sale products",
        cause: error,
      });
    }
  }),

  // Get new products for new products section
  getNew: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.prisma.product.findMany({
        where: {
          newProduct: true,
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 8,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
        images: product.images,
        thumbnailImage: product.thumbnailImage || product.images[0],
        brand: product.brand,
        slug: product.slug,
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
        newProduct: product.newProduct,
      }));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch new products",
        cause: error,
      });
    }
  }),

  // Get all products (basic listing)
  getAll: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(50).default(12),
          page: z.number().min(1).default(1),
        })
        .optional(),
    )
    .query(async ({ input, ctx }) => {
      try {
        const { limit = 12, page = 1 } = input || {};
        const offset = (page - 1) * limit;

        const [products, total] = await Promise.all([
          ctx.prisma.product.findMany({
            where: {
              status: "ACTIVE",
            },
            orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
            skip: offset,
            take: limit,
          }),
          ctx.prisma.product.count({
            where: {
              status: "ACTIVE",
            },
          }),
        ]);

        return {
          products: products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.shortDescription || product.description,
            regularPrice: product.regularPrice,
            salePrice: product.salePrice,
            images: product.images,
            thumbnailImage: product.thumbnailImage || product.images[0],
            brand: product.brand,
            slug: product.slug,
            inStock: product.stockQuantity > 0,
            stockQuantity: product.stockQuantity,
            featured: product.featured,
            onSale: product.onSale,
            newProduct: product.newProduct,
          })),
          pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch products",
          cause: error,
        });
      }
    }),
});
