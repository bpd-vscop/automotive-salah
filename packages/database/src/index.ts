// filepath: packages/database/src/index.ts
// Main database package exports
// This is the entry point for all database operations

// Export the main Prisma client
export {
  default as prisma,
  connectDatabase,
  disconnectDatabase,
  checkDatabaseHealth,
  withTransaction,
} from "./client";

// Export all types
export * from "./types";

// Export Prisma client type for dependency injection
export { PrismaClient } from "./generated";
