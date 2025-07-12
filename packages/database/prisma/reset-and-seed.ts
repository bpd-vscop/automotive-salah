// filepath: packages/database/prisma/reset-and-seed.ts
// DANGEROUS: This script DELETES ALL DATA in the database and then reseeds it.
// Used for resetting the development environment from a clean slate.
// DO NOT RUN THIS ON A PRODUCTION DATABASE.

import { PrismaClient } from "../src/generated";
import { execSync } from "child_process";
import * as path from "path";

const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("🔥 DANGER: Deleting all data from the database...");

  // Deletion order is critical to avoid foreign key constraint violations.
  console.log("Deleting OrderItem...");
  await prisma.orderItem.deleteMany({});

  console.log("Deleting ProductReview...");
  await prisma.productReview.deleteMany({});

  console.log("Deleting Order...");
  await prisma.order.deleteMany({});

  console.log("Deleting ActivityLog...");
  await prisma.activityLog.deleteMany({});

  console.log("Deleting Product...");
  await prisma.product.deleteMany({});

  console.log("Deleting Category...");
  await prisma.category.deleteMany({});

  console.log("Deleting Address...");
  await prisma.address.deleteMany({});

  console.log("Deleting Customer...");
  await prisma.customer.deleteMany({});

  console.log("Deleting StaffUser...");
  await prisma.staffUser.deleteMany({});

  console.log("Deleting Role...");
  await prisma.role.deleteMany({});

  console.log("Deleting Setting...");
  await prisma.setting.deleteMany({});

  console.log("Deleting Banner...");
  await prisma.banner.deleteMany({});

  console.log("Deleting HeroSlide...");
  await prisma.heroSlide.deleteMany({});

  console.log("Deleting SiteCustomization...");
  await prisma.siteCustomization.deleteMany({});

  console.log("✅ All data deleted.");
}

async function runSeed() {
  console.log("🌱 Starting database seed from seed.ts...");
  const seedPath = path.join(__dirname, "seed.ts");
  try {
    // We use ts-node to execute the TypeScript seed script directly
    execSync(`npx ts-node ${seedPath}`, { stdio: "inherit" });
    console.log("✅ Seed script executed successfully.");
  } catch (error) {
    console.error("❌ Failed to execute seed script:", error);
    throw new Error("Seeding failed.");
  }
}

async function main() {
  // 1. Clear the database
  await clearDatabase();

  // 2. Run the seed script
  await runSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("❌ Reset and seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
