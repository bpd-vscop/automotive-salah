// filepath: packages/auth/src/admin-auth.ts
// Admin authentication utilities for RBAC system
// Handles JWT tokens, password hashing, and role-based permissions

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import type { StaffUser, Role } from "@automotive/database";

// JWT Configuration
const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

// Admin JWT Payload Interface
export interface AdminJWTPayload {
  userId: string;
  email: string;
  roleId: string;
  roleName: string;
  hierarchyLevel: number;
  permissions: Record<string, any>;
  iat?: number;
  exp?: number;
}

// Admin Session Context
export interface AdminContext {
  user: StaffUser & { role: Role };
  permissions: Record<string, any>;
  isAuthenticated: boolean;
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token for admin user
 */
export function generateAdminToken(user: StaffUser & { role: Role }): string {
  const payload: AdminJWTPayload = {
    userId: user.id,
    email: user.email,
    roleId: user.roleId,
    roleName: user.role.roleName,
    hierarchyLevel: user.role.hierarchyLevel,
    permissions: user.role.permissions as Record<string, any>,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: "ulks-admin",
    audience: "ulks-admin-dashboard",
  });
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId, type: "refresh" }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: "ulks-admin",
    audience: "ulks-admin-refresh",
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyAdminToken(token: string): AdminJWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: "ulks-admin",
      audience: "ulks-admin-dashboard",
    }) as AdminJWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token expired",
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid token",
      });
    }
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token verification failed",
    });
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): { userId: string } {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      issuer: "ulks-admin",
      audience: "ulks-admin-refresh",
    }) as any;

    if (payload.type !== "refresh") {
      throw new Error("Invalid token type");
    }

    return { userId: payload.userId };
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid refresh token",
    });
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  permissions: Record<string, any>,
  resource: string,
  action: string,
): boolean {
  const resourcePerms = permissions[resource];
  if (!resourcePerms || typeof resourcePerms !== "object") {
    return false;
  }
  return resourcePerms[action] === true;
}

/**
 * Check if user has minimum hierarchy level
 */
export function hasMinimumHierarchy(
  userLevel: number,
  requiredLevel: number,
): boolean {
  // Lower numbers = higher permissions (1 = Super Admin, 4 = Editor)
  return userLevel <= requiredLevel;
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generate secure random password
 */
export function generateSecurePassword(length: number = 12): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const all = uppercase + lowercase + numbers + symbols;
  let password = "";

  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

/**
 * Rate limiting for login attempts
 */
export class LoginRateLimiter {
  private attempts: Map<string, { count: number; lockUntil?: Date }> =
    new Map();
  private readonly maxAttempts = 5;
  private readonly lockDuration = 15 * 60 * 1000; // 15 minutes

  canAttemptLogin(identifier: string): boolean {
    const record = this.attempts.get(identifier);

    if (!record) {
      return true;
    }

    if (record.lockUntil && record.lockUntil > new Date()) {
      return false;
    }

    if (record.lockUntil && record.lockUntil <= new Date()) {
      // Lock expired, reset
      this.attempts.delete(identifier);
      return true;
    }

    return record.count < this.maxAttempts;
  }

  recordFailedAttempt(identifier: string): void {
    const record = this.attempts.get(identifier) || { count: 0 };
    record.count++;

    if (record.count >= this.maxAttempts) {
      record.lockUntil = new Date(Date.now() + this.lockDuration);
    }

    this.attempts.set(identifier, record);
  }

  recordSuccessfulLogin(identifier: string): void {
    this.attempts.delete(identifier);
  }

  getRemainingLockTime(identifier: string): number {
    const record = this.attempts.get(identifier);

    if (!record || !record.lockUntil) {
      return 0;
    }

    const remaining = record.lockUntil.getTime() - Date.now();
    return Math.max(0, remaining);
  }
}

// Global rate limiter instance
export const loginRateLimiter = new LoginRateLimiter();

/**
 * Security headers for admin responses
 */
export const ADMIN_SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
};
