// filepath: packages/database/prisma/setup-database.ts
// Complete database setup script that handles schema generation, 
// database creation, and initial data seeding

import { PrismaClient } from '../src/generated'
import { execSync } from 'child_process'
import { existsSync } from 'fs'
import path from 'path'

const prisma = new PrismaClient()

interface SetupOptions {
  recreateDatabase?: boolean
  runSeed?: boolean
  generateTypes?: boolean
  verbose?: boolean
}

async function setupDatabase(options: SetupOptions = {}) {
  const {
    recreateDatabase = false,
    runSeed = true,
    generateTypes = true,
    verbose = true
  } = options

  console.log('🚀 Starting database setup...')

  try {
    // Step 1: Generate Prisma client
    if (generateTypes) {
      console.log('📦 Generating Prisma client...')
      execSync('npx prisma generate', { 
        stdio: verbose ? 'inherit' : 'pipe',
        cwd: path.resolve(__dirname, '..')
      })
      console.log('✅ Prisma client generated')
    }

    // Step 2: Check database connection
    console.log('🔌 Testing database connection...')
    try {
      await prisma.$connect()
      console.log('✅ Database connection successful')
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      throw new Error('Cannot connect to database. Please check your DATABASE_URL.')
    }

    // Step 3: Push schema to database
    console.log('📋 Pushing schema to database...')
    try {
      execSync('npx prisma db push', { 
        stdio: verbose ? 'inherit' : 'pipe',
        cwd: path.resolve(__dirname, '..')
      })
      console.log('✅ Schema pushed successfully')
    } catch (error) {
      console.error('❌ Schema push failed:', error)
      throw error
    }

    // Step 4: Check if database is empty (needs seeding)
    let needsSeeding = runSeed
    if (runSeed) {
      try {
        const customerCount = await prisma.customer.count()
        const productCount = await prisma.product.count()
        const roleCount = await prisma.role.count()

        if (customerCount > 0 || productCount > 0 || roleCount > 0) {
          console.log('📊 Database already contains data')
          if (!recreateDatabase) {
            console.log('⏭️  Skipping seed (use --recreate to force)')
            needsSeeding = false
          } else {
            console.log('🗑️  Clearing existing data...')
            await clearDatabase()
            needsSeeding = true
          }
        }
      } catch (error) {
        console.log('📊 Database appears to be empty, will seed with initial data')
        needsSeeding = true
      }
    }

    // Step 5: Seed database if needed
    if (needsSeeding) {
      console.log('🌱 Seeding database with initial data...')
      try {
        execSync('npx tsx prisma/seed.ts', { 
          stdio: verbose ? 'inherit' : 'pipe',
          cwd: path.resolve(__dirname, '..')
        })
        console.log('✅ Database seeded successfully')
      } catch (error) {
        console.error('❌ Database seeding failed:', error)
        throw error
      }
    }

    // Step 6: Verify setup
    console.log('🔍 Verifying setup...')
    const verification = await verifySetup()
    
    if (verification.success && verification.counts) {
      console.log('✅ Database setup completed successfully!')
      console.log('\n📊 Database Summary:')
      console.log(`   - Roles: ${verification.counts.roles}`)
      console.log(`   - Staff Users: ${verification.counts.staffUsers}`)
      console.log(`   - Categories: ${verification.counts.categories}`)
      console.log(`   - Products: ${verification.counts.products}`)
      console.log(`   - Customers: ${verification.counts.customers}`)
      console.log(`   - Orders: ${verification.counts.orders}`)
      console.log(`   - Settings: ${verification.counts.settings}`)
      
      if (verification.counts.staffUsers > 0) {
        console.log('\n🔑 Admin Login Credentials:')
        console.log('   Super Admin: admin@ulks.com / admin123!')
        console.log('   Admin: sarah@ulks.com / admin123!')
        console.log('   Store Manager: mike@ulks.com / admin123!')
      }
    } else {
      throw new Error('Setup verification failed')
    }

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

async function clearDatabase() {
  console.log('🗑️ Clearing database...')
  
  // Delete in correct order to avoid foreign key constraints
  const deleteOperations = [
    () => prisma.activityLog.deleteMany(),
    () => prisma.orderItem.deleteMany(),
    () => prisma.order.deleteMany(),
    () => prisma.productReview.deleteMany(),
    () => prisma.product.deleteMany(),
    () => prisma.address.deleteMany(),
    () => prisma.customer.deleteMany(),
    () => prisma.category.deleteMany(),
    () => prisma.staffUser.deleteMany(),
    () => prisma.role.deleteMany(),
    () => prisma.setting.deleteMany(),
    () => prisma.banner.deleteMany(),
    () => prisma.heroSlide.deleteMany(),
    () => prisma.siteCustomization.deleteMany(),
  ]

  for (const operation of deleteOperations) {
    try {
      await operation()
    } catch (error) {
      // Continue with other deletions even if one fails
      console.warn('Warning during cleanup:', error)
    }
  }

  console.log('✅ Database cleared')
}

async function verifySetup() {
  try {
    const [
      roles,
      staffUsers,
      categories,
      products,
      customers,
      orders,
      settings,
      banners,
      heroSlides
    ] = await Promise.all([
      prisma.role.count(),
      prisma.staffUser.count(),
      prisma.category.count(),
      prisma.product.count(),
      prisma.customer.count(),
      prisma.order.count(),
      prisma.setting.count(),
      prisma.banner.count(),
      prisma.heroSlide.count()
    ])

    return {
      success: true,
      counts: {
        roles,
        staffUsers,
        categories,
        products,
        customers,
        orders,
        settings,
        banners,
        heroSlides
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const options: SetupOptions = {
    recreateDatabase: args.includes('--recreate'),
    runSeed: !args.includes('--no-seed'),
    generateTypes: !args.includes('--no-generate'),
    verbose: !args.includes('--quiet')
  }

  setupDatabase(options)
    .then(() => {
      console.log('\n🎉 Setup complete! Your automotive locksmith platform is ready.')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n💥 Setup failed:', error.message)
      process.exit(1)
    })
}

export { setupDatabase, clearDatabase, verifySetup }