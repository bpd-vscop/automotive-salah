// filepath: apps/api/src/trpc/router.ts
// Main tRPC router - combines all API routes

import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import type { Context } from "./context";

// Initialize tRPC with context
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof z.ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export reusable router and middleware builders
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to ensure user is authenticated
const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // Now TypeScript knows user is defined
    },
  });
});

// Middleware to ensure user is staff member
const isStaff = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.userType !== "staff") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Staff access required",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Middleware to ensure user is admin (Super Admin or Admin)
const isAdmin = t.middleware(({ ctx, next }) => {
  if (
    !ctx.user ||
    ctx.user.userType !== "staff" ||
    !["Super Admin", "Admin"].includes(ctx.user.role)
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Middleware to ensure user is Super Admin only
const isSuperAdmin = t.middleware(({ ctx, next }) => {
  if (
    !ctx.user ||
    ctx.user.userType !== "staff" ||
    ctx.user.role !== "Super Admin"
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Super Admin access required",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Export protected procedures
export const protectedProcedure = publicProcedure.use(isAuthenticated);
export const staffProcedure = publicProcedure.use(isAuthenticated).use(isStaff);
export const adminProcedure = publicProcedure.use(isAuthenticated).use(isAdmin);
export const superAdminProcedure = publicProcedure
  .use(isAuthenticated)
  .use(isSuperAdmin);

// Health check router (public endpoint)
const healthRouter = router({
  check: publicProcedure.query(async ({ ctx }) => {
    try {
      // Test database connection
      await ctx.prisma.product.count();

      // Get basic system stats
      const stats = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        env: process.env.NODE_ENV || "development",
      };

      return stats;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Health check failed",
        cause: error,
      });
    }
  }),

  stats: staffProcedure.query(async ({ ctx }) => {
    try {
      // Get detailed system statistics (staff only)
      const [
        productCount,
        customerCount,
        orderCount,
        staffCount,
        categoryCount,
      ] = await Promise.all([
        ctx.prisma.product.count(),
        ctx.prisma.customer.count(),
        ctx.prisma.order.count(),
        ctx.prisma.staffUser.count(),
        ctx.prisma.category.count(),
      ]);

      return {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        counts: {
          products: productCount,
          customers: customerCount,
          orders: orderCount,
          staff: staffCount,
          categories: categoryCount,
        },
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          nodeVersion: process.version,
          platform: process.platform,
        },
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch system stats",
        cause: error,
      });
    }
  }),
});

// Import routers after exports to avoid circular dependency
import { productsRouter } from "./routers/products";
import { categoriesRouter } from "./routers/categories";

// Main application router
export const appRouter = router({
  health: healthRouter,

  // Public API routes for homepage
  products: productsRouter,
  categories: categoriesRouter,

  // Protected API routes (will be added later)
  // auth: authRouter,
  // admin: adminRouter,
  // customer: customerRouter,
});

// Export type definition for tRPC client
export type AppRouter = typeof appRouter;
