// filepath: packages/database/prisma/empty-db.ts
// DANGEROUS: This script DELETES ALL DATA in the database.
// Used for resetting the development environment to a clean, empty state.
// DO NOT RUN THIS ON A PRODUCTION DATABASE.

import { PrismaClient } from '../src/generated'

const prisma = new PrismaClient()

async function main() {
  console.log('🔥 DANGER: Deleting all data from the database...')
  
  // Deletion order matters to avoid foreign key constraint errors
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.productReview.deleteMany({})
  await prisma.vehicleCompatibility.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.customer.deleteMany({})
  await prisma.address.deleteMany({})
  
  console.log('✅ All data deleted. The database is now empty.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('❌ Failed to empty the database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })