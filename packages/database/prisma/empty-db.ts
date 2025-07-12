// filepath: packages/database/prisma/empty-db.ts
// DANGEROUS: This script DELETES ALL DATA in the database.
// Used for resetting the development environment to a clean, empty state.
// DO NOT RUN THIS ON A PRODUCTION DATABASE.

import { PrismaClient } from "../src/generated";

const prisma = new PrismaClient();

async function main() {
  console.log("🔥 DANGER: Deleting all data from the database...");

  // Deletion order is critical to avoid foreign key constraint violations.
  // Start with models that have the most dependencies on other models.

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

  console.log("✅ All data deleted. The database is now empty.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("❌ Failed to empty the database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
