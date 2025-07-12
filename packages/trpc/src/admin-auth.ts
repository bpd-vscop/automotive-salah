// filepath: packages/trpc/src/admin-auth.ts
// tRPC authentication procedures and middleware for admin dashboard
// Provides protected routes with role-based access control

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { prisma } from "@automotive/database";
import {
  verifyAdminToken,
  generateAdminToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  hasPermission,
  hasMinimumHierarchy,
  loginRateLimiter,
  type AdminJWTPayload,
  type AdminContext,
  ADMIN_SECURITY_HEADERS,
} from "@automotive/auth";

// ======================== MIDDLEWARE ========================

/**
 * Admin authentication middleware
 * Verifies JWT token and loads user with role and permissions
 */
export const adminAuthMiddleware = publicProcedure.use(
  async ({ ctx, next }) => {
    // Extract token from Authorization header or cookies
    const authHeader = ctx.req?.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : ctx.req?.cookies?.adminToken;

    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Authentication required",
      });
    }

    try {
      // Verify and decode JWT
      const payload = verifyAdminToken(token);

      // Load full user data with role
      const user = await prisma.staffUser.findUnique({
        where: { id: payload.userId },
        include: { role: true },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      if (!user.isActive) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Account deactivated",
        });
      }

      if (!user.canAccessAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Admin access denied",
        });
      }

      // Check if account is locked
      if (user.lockedUntil && user.lockedUntil > new Date()) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Account temporarily locked",
        });
      }

      // Update last login
      await prisma.staffUser.update({
        where: { id: user.id },
        data: {
          lastLogin: new Date(),
          lastLoginIp: ctx.req?.ip || "unknown",
        },
      });

      // Create admin context
      const adminContext: AdminContext = {
        user,
        permissions: user.role.permissions as Record<string, any>,
        isAuthenticated: true,
      };

      return next({
        ctx: {
          ...ctx,
          admin: adminContext,
        },
      });
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid authentication token",
      });
    }
  },
);

/**
 * Permission-based middleware factory
 * Checks if user has specific permission for resource and action
 */
export function requirePermission(resource: string, action: string) {
  return adminAuthMiddleware.use(async ({ ctx, next }) => {
    const { admin } = ctx;

    if (!hasPermission(admin.permissions, resource, action)) {
      // Log permission violation
      await prisma.activityLog
        .create({
          data: {
            staffUserId: admin.user.id,
            actionType: "PERMISSION_DENIED",
            description: `Access denied for ${resource}.${action}`,
            success: false,
            ipAddress: ctx.req?.ip || "unknown",
            userAgent: ctx.req?.headers["user-agent"] || "unknown",
          },
        })
        .catch(() => {}); // Don't fail on logging error

      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Insufficient permissions for ${resource}.${action}`,
      });
    }

    return next({ ctx });
  });
}

/**
 * Hierarchy-based middleware factory
 * Checks if user has minimum hierarchy level (1=Super Admin, 4=Editor)
 */
export function requireHierarchy(minimumLevel: number) {
  return adminAuthMiddleware.use(async ({ ctx, next }) => {
    const { admin } = ctx;

    if (!hasMinimumHierarchy(admin.user.role.hierarchyLevel, minimumLevel)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Insufficient access level",
      });
    }

    return next({ ctx });
  });
}

// ======================== AUTH PROCEDURES ========================

export const adminAuthRouter = router({
  /**
   * Admin Login
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
        rememberMe: z.boolean().optional().default(false),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password, rememberMe } = input;
      const clientIp = ctx.req?.ip || "unknown";

      // Rate limiting check
      if (!loginRateLimiter.canAttemptLogin(email)) {
        const lockTime = loginRateLimiter.getRemainingLockTime(email);
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `Too many failed attempts. Try again in ${Math.ceil(lockTime / 60000)} minutes`,
        });
      }

      try {
        // Find user with role
        const user = await prisma.staffUser.findUnique({
          where: { email: email.toLowerCase() },
          include: { role: true },
        });

        if (!user) {
          loginRateLimiter.recordFailedAttempt(email);
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        // Verify password
        const isValidPassword = await verifyPassword(
          password,
          user.passwordHash,
        );
        if (!isValidPassword) {
          loginRateLimiter.recordFailedAttempt(email);

          // Update failed login attempts
          await prisma.staffUser.update({
            where: { id: user.id },
            data: {
              loginAttempts: { increment: 1 },
              lockedUntil:
                user.loginAttempts >= 4
                  ? new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
                  : undefined,
            },
          });

          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }

        // Check account status
        if (!user.isActive) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Account is deactivated",
          });
        }

        if (!user.canAccessAdmin) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Admin access not permitted",
          });
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Account is temporarily locked",
          });
        }

        // Generate tokens
        const accessToken = generateAdminToken(user);
        const refreshToken = generateRefreshToken(user.id);

        // Reset failed attempts and update last login
        await prisma.staffUser.update({
          where: { id: user.id },
          data: {
            loginAttempts: 0,
            lockedUntil: null,
            lastLogin: new Date(),
            lastLoginIp: clientIp,
          },
        });

        // Log successful login
        await prisma.activityLog.create({
          data: {
            staffUserId: user.id,
            actionType: "ADMIN_LOGIN",
            description: `Admin login successful`,
            ipAddress: clientIp,
            userAgent: ctx.req?.headers["user-agent"] || "unknown",
            metadata: { rememberMe },
          },
        });

        // Clear rate limiting
        loginRateLimiter.recordSuccessfulLogin(email);

        // Set security headers
        Object.entries(ADMIN_SECURITY_HEADERS).forEach(([key, value]) => {
          ctx.res?.setHeader(key, value);
        });

        // Set secure httpOnly cookies
        if (ctx.res) {
          const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as const,
            maxAge: rememberMe
              ? 30 * 24 * 60 * 60 * 1000
              : 7 * 24 * 60 * 60 * 1000, // 30 days or 7 days
          };

          ctx.res.setHeader("Set-Cookie", [
            `adminToken=${accessToken}; ${Object.entries(cookieOptions)
              .map(([k, v]) => `${k}=${v}`)
              .join("; ")}; Path=/admin`,
            `adminRefresh=${refreshToken}; ${Object.entries(cookieOptions)
              .map(([k, v]) => `${k}=${v}`)
              .join("; ")}; Path=/admin/auth`,
          ]);
        }

        return {
          success: true,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: {
              name: user.role.roleName,
              hierarchyLevel: user.role.hierarchyLevel,
            },
            mustChangePassword: user.mustChangePassword,
            twoFactorEnabled: user.twoFactorEnabled,
          },
          tokens: {
            accessToken,
            refreshToken,
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Login failed",
        });
      }
    }),

  /**
   * Refresh Token
   */
  refresh: publicProcedure
    .input(
      z.object({
        refreshToken: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { userId } = verifyRefreshToken(input.refreshToken);

        const user = await prisma.staffUser.findUnique({
          where: { id: userId },
          include: { role: true },
        });

        if (!user || !user.isActive || !user.canAccessAdmin) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid refresh token",
          });
        }

        const newAccessToken = generateAdminToken(user);
        const newRefreshToken = generateRefreshToken(user.id);

        return {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid refresh token",
        });
      }
    }),

  /**
   * Logout
   */
  logout: adminAuthMiddleware.mutation(async ({ ctx }) => {
    const { admin } = ctx;

    // Log logout activity
    await prisma.activityLog.create({
      data: {
        staffUserId: admin.user.id,
        actionType: "ADMIN_LOGOUT",
        description: "Admin logout",
        ipAddress: ctx.req?.ip || "unknown",
        userAgent: ctx.req?.headers["user-agent"] || "unknown",
      },
    });

    // Clear cookies
    if (ctx.res) {
      ctx.res.setHeader("Set-Cookie", [
        "adminToken=; Path=/admin; HttpOnly; Secure; SameSite=strict; Max-Age=0",
        "adminRefresh=; Path=/admin/auth; HttpOnly; Secure; SameSite=strict; Max-Age=0",
      ]);
    }

    return { success: true };
  }),

  /**
   * Get Current Admin User
   */
  me: adminAuthMiddleware.query(async ({ ctx }) => {
    const { admin } = ctx;

    return {
      id: admin.user.id,
      firstName: admin.user.firstName,
      lastName: admin.user.lastName,
      email: admin.user.email,
      avatar: admin.user.avatar,
      timezone: admin.user.timezone,
      language: admin.user.language,
      role: {
        id: admin.user.role.id,
        name: admin.user.role.roleName,
        hierarchyLevel: admin.user.role.hierarchyLevel,
        description: admin.user.role.description,
      },
      permissions: admin.permissions,
      departmentAccess: admin.user.departmentAccess,
      mustChangePassword: admin.user.mustChangePassword,
      twoFactorEnabled: admin.user.twoFactorEnabled,
      lastLogin: admin.user.lastLogin,
    };
  }),

  /**
   * Change Password
   */
  changePassword: adminAuthMiddleware
    .input(
      z.object({
        currentPassword: z.string(),
        newPassword: z.string().min(8),
        confirmPassword: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { admin } = ctx;
      const { currentPassword, newPassword, confirmPassword } = input;

      // Verify passwords match
      if (newPassword !== confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "New passwords do not match",
        });
      }

      // Validate current password
      const isCurrentValid = await verifyPassword(
        currentPassword,
        admin.user.passwordHash,
      );
      if (!isCurrentValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Current password is incorrect",
        });
      }

      // Validate new password strength
      const validation = validatePasswordStrength(newPassword);
      if (!validation.isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: validation.errors.join(", "),
        });
      }

      // Hash new password
      const newPasswordHash = await hashPassword(newPassword);

      // Update password
      await prisma.staffUser.update({
        where: { id: admin.user.id },
        data: {
          passwordHash: newPasswordHash,
          passwordChangedAt: new Date(),
          mustChangePassword: false,
        },
      });

      // Log password change
      await prisma.activityLog.create({
        data: {
          staffUserId: admin.user.id,
          actionType: "PASSWORD_CHANGE",
          description: "Password changed successfully",
          ipAddress: ctx.req?.ip || "unknown",
          userAgent: ctx.req?.headers["user-agent"] || "unknown",
        },
      });

      return { success: true };
    }),

  /**
   * Update Profile
   */
  updateProfile: adminAuthMiddleware
    .input(
      z.object({
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        timezone: z.string().optional(),
        language: z.string().optional(),
        avatar: z.string().url().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { admin } = ctx;

      const updatedUser = await prisma.staffUser.update({
        where: { id: admin.user.id },
        data: {
          ...input,
          lastModifiedBy: admin.user.id,
        },
      });

      // Log profile update
      await prisma.activityLog.create({
        data: {
          staffUserId: admin.user.id,
          actionType: "PROFILE_UPDATE",
          description: "Profile updated",
          ipAddress: ctx.req?.ip || "unknown",
          userAgent: ctx.req?.headers["user-agent"] || "unknown",
          metadata: input,
        },
      });

      return {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        timezone: updatedUser.timezone,
        language: updatedUser.language,
        avatar: updatedUser.avatar,
      };
    }),

  /**
   * Verify Permission
   */
  verifyPermission: adminAuthMiddleware
    .input(
      z.object({
        resource: z.string(),
        action: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { admin } = ctx;
      const { resource, action } = input;

      return {
        hasPermission: hasPermission(admin.permissions, resource, action),
        hierarchyLevel: admin.user.role.hierarchyLevel,
      };
    }),
});

// Export protected procedures for use in other routers
export const adminProtectedProcedure = adminAuthMiddleware;
export const requirePermissionProcedure = requirePermission;
export const requireHierarchyProcedure = requireHierarchy;
