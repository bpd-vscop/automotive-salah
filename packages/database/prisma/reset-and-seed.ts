// filepath: packages/database/prisma/reset-and-seed.ts
// Clean database reset and seed script
// This will safely remove existing data and create fresh sample data

import { PrismaClient, UserRole, ProfessionalTier, OrderStatus, PaymentStatus } from '../src/generated'

const prisma = new PrismaClient()

async function clearDatabase() {
  console.log('🧹 Clearing existing data...')
  
  try {
    // Delete in reverse dependency order to avoid foreign key issues
    await prisma.productReview.deleteMany({})
    await prisma.orderItem.deleteMany({})
    await prisma.order.deleteMany({})
    await prisma.address.deleteMany({})
    await prisma.vehicleCompatibility.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.category.deleteMany({})
    
    console.log('✅ Database cleared successfully')
  } catch (error) {
    console.log('ℹ️  Database was already empty or clearing not needed')
  }
}

async function seedDatabase() {
  console.log('🌱 Starting fresh database seed...')

  // ======================== CATEGORIES ========================
  console.log('📂 Creating categories...')
  
  const categories = [
    {
      name: 'Programming Tools',
      slug: 'programming-tools',
      description: 'Professional key programming and diagnostic tools',
      sortOrder: 1,
    },
    {
      name: 'Key Cutting Machines',
      slug: 'key-cutting-machines', 
      description: 'Precision key cutting and duplicating machines',
      sortOrder: 2,
    },
    {
      name: 'Transponder Keys',
      slug: 'transponder-keys',
      description: 'Blank transponder keys and remotes',
      sortOrder: 3,
    },
    {
      name: 'Lockout Tools',
      slug: 'lockout-tools',
      description: 'Professional vehicle lockout and entry tools',
      sortOrder: 4,
    },
    {
      name: 'Key Fob Batteries',
      slug: 'batteries',
      description: 'Replacement batteries for key fobs and remotes',
      sortOrder: 5,
    },
  ]

  // Create categories one by one
  for (const categoryData of categories) {
    await prisma.category.create({ data: categoryData })
  }

  // ======================== SAMPLE PRODUCTS ========================
  console.log('🔧 Creating sample products...')
  
  const products = [
    // Featured Programming Tools
    {
      name: 'Autel MaxiIM IM608 Pro Key Programming Tool',
      description: 'Advanced key programming diagnostic tool with comprehensive vehicle coverage. Features include all keys lost programming, ECU programming, and advanced diagnostics.',
      shortDescription: 'Professional key programming tool with advanced diagnostics',
      price: 4299.00,
      salePrice: 3899.00,
      category: 'programming-tools',
      brand: 'Autel',
      partNumber: 'IM608PRO',
      sku: 'AUT-IM608PRO',
      stockQuantity: 15,
      featured: true,
      onSale: true,
      images: [
        'https://www.key4.com/uploads/files/products/autel-im608-pro-1.jpg',
        'https://www.key4.com/uploads/files/products/autel-im608-pro-2.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/autel-im608-pro-thumbnail.jpg',
      tags: ['autel', 'programming', 'diagnostic', 'professional'],
      weight: 3.5,
      dimensions: { length: 12, width: 8, height: 2 },
      compatibility: [
        { year: '2015', make: 'BMW', model: 'X5', notes: 'All trims supported' },
        { year: '2018', make: 'Mercedes-Benz', model: 'C-Class', notes: 'Requires software update' },
        { year: '2020', make: 'Audi', model: 'A4', notes: 'Full compatibility' }
      ]
    },
    
    {
      name: 'Launch X-PROG3 Key Programmer',
      description: 'Next-generation key programming solution with wireless connectivity and cloud-based updates. Supports latest vehicle models.',
      shortDescription: 'Wireless key programmer with cloud updates',
      price: 1899.00,
      category: 'programming-tools',
      brand: 'Launch',
      partNumber: 'XPROG3',
      sku: 'LAU-XPROG3',
      stockQuantity: 8,
      featured: true,
      newProduct: true,
      images: [
        'https://www.key4.com/uploads/files/products/launch-xprog3-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/launch-xprog3-thumb.jpg',
      tags: ['launch', 'wireless', 'programming', 'new'],
      weight: 2.1,
      compatibility: [
        { year: '2019', make: 'Ford', model: 'F-150', notes: 'All engine types' },
        { year: '2021', make: 'Chevrolet', model: 'Silverado', notes: 'Gas engines only' }
      ]
    },
    
    // Key Cutting Machines
    {
      name: 'Silca Futura Edge Key Cutting Machine',
      description: 'Precision automatic key cutting machine with touch screen interface. Cuts automotive, residential, and commercial keys.',
      shortDescription: 'Professional automatic key cutting machine',
      price: 12999.00,
      category: 'key-cutting-machines',
      brand: 'Silca',
      partNumber: 'FUTURA-EDGE',
      sku: 'SIL-FUTURA-EDGE',
      stockQuantity: 3,
      featured: true,
      professionalOnly: true,
      images: [
        'https://www.key4.com/uploads/files/products/silca-futura-edge-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/silca-futura-edge-thumb.jpg',
      tags: ['silca', 'cutting', 'automatic', 'professional'],
      weight: 85.0,
      dimensions: { length: 24, width: 18, height: 16 },
      compatibility: []
    },
    
    {
      name: 'JMA Nomad Portable Key Cutter',
      description: 'Portable key cutting solution for mobile locksmiths. Battery powered with precision cutting capabilities.',
      shortDescription: 'Portable battery-powered key cutter',
      price: 2499.00,
      salePrice: 2199.00,
      category: 'key-cutting-machines',
      brand: 'JMA',
      partNumber: 'NOMAD-PORTABLE',
      sku: 'JMA-NOMAD-PORT',
      stockQuantity: 12,
      onSale: true,
      images: [
        'https://www.key4.com/uploads/files/products/jma-nomad-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/jma-nomad-thumb.jpg',
      tags: ['jma', 'portable', 'mobile', 'battery'],
      weight: 15.5,
      compatibility: []
    },
    
    // Transponder Keys
    {
      name: 'BMW Proximity Key Blank (FEM/BDC)',
      description: 'High-quality BMW proximity key blank for FEM/BDC systems. Compatible with 2011+ BMW vehicles with comfort access.',
      shortDescription: 'BMW proximity key blank for FEM/BDC systems',
      price: 89.99,
      salePrice: 79.99,
      category: 'transponder-keys',
      brand: 'BMW',
      partNumber: 'BMW-PROX-FEM',
      sku: 'BMW-PROX-FEM-01',
      stockQuantity: 45,
      onSale: true,
      images: [
        'https://www.key4.com/uploads/files/products/bmw-proximity-key-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/bmw-proximity-thumb.jpg',
      tags: ['bmw', 'proximity', 'blank', 'fem', 'bdc'],
      weight: 0.2,
      compatibility: [
        { year: '2011', make: 'BMW', model: '3 Series', notes: 'F30 chassis' },
        { year: '2012', make: 'BMW', model: '5 Series', notes: 'F10 chassis' },
        { year: '2014', make: 'BMW', model: 'X5', notes: 'F15 chassis' }
      ]
    },
    
    {
      name: 'Mercedes-Benz Smart Key Blank (BE Key)',
      description: 'Original equipment quality smart key blank for Mercedes-Benz vehicles. Features chrome finish and genuine MB logo.',
      shortDescription: 'Mercedes-Benz smart key blank with chrome finish',
      price: 125.00,
      category: 'transponder-keys',
      brand: 'Mercedes-Benz',
      partNumber: 'MB-SMART-BE',
      sku: 'MB-SMART-BE-01',
      stockQuantity: 28,
      newProduct: true,
      images: [
        'https://www.key4.com/uploads/files/products/mercedes-smart-key-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/mercedes-smart-thumb.jpg',
      tags: ['mercedes', 'smart', 'chrome', 'be-key'],
      weight: 0.15,
      compatibility: [
        { year: '2017', make: 'Mercedes-Benz', model: 'C-Class', notes: 'W205 chassis' },
        { year: '2019', make: 'Mercedes-Benz', model: 'E-Class', notes: 'W213 chassis' }
      ]
    },
    
    // Batteries
    {
      name: 'CR2032 Key Fob Battery (10-Pack)',
      description: 'High-quality CR2032 lithium batteries for key fobs and remotes. Long-lasting power with 10-year shelf life.',
      shortDescription: 'CR2032 batteries for key fobs (10-pack)',
      price: 19.99,
      category: 'batteries',
      brand: 'Panasonic',
      partNumber: 'CR2032-10PK',
      sku: 'PAN-CR2032-10',
      stockQuantity: 150,
      featured: true,
      images: [
        'https://www.key4.com/uploads/files/products/cr2032-batteries-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/cr2032-thumb.jpg',
      tags: ['cr2032', 'battery', 'lithium', 'key-fob'],
      weight: 0.3,
      minimumOrderQuantity: 1,
      compatibility: []
    }
  ]

  // Create products with compatibility
  for (const productData of products) {
    const { compatibility, ...productInfo } = productData
    
    const product = await prisma.product.create({
      data: {
        ...productInfo,
        slug: productInfo.name.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim(),
        metaTitle: `${productInfo.name} | Automotive Locksmith Tools`,
        metaDescription: productInfo.shortDescription,
      },
    })

    // Create vehicle compatibility if provided
    if (compatibility && compatibility.length > 0) {
      for (const compat of compatibility) {
        await prisma.vehicleCompatibility.create({
          data: {
            productId: product.id,
            ...compat,
            verified: true,
          },
        })
      }
    }
  }

  // ======================== ADMIN USER ========================
  console.log('👤 Creating admin user...')
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@automotive-locksmith.com',
      password: '$2a$10$example.hash.password', // In real app, hash with bcrypt
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      professionalTier: ProfessionalTier.PLATINUM,
      discountRate: 0.15, // 15% admin discount
      emailVerified: new Date(),
      isActive: true,
    },
  })

  // ======================== SAMPLE CUSTOMER ========================
  console.log('👥 Creating sample customer...')
  
  const sampleCustomer = await prisma.user.create({
    data: {
      email: 'john@pro-locksmith.com',
      password: '$2a$10$example.hash.password',
      firstName: 'John',
      lastName: 'Smith',
      phone: '(555) 123-4567',
      role: UserRole.PROFESSIONAL,
      professionalTier: ProfessionalTier.GOLD,
      discountRate: 0.10, // 10% professional discount
      businessInfo: {
        businessName: 'Pro Locksmith Services',
        businessType: 'Locksmith',
        taxId: '12-3456789',
        licenseNumber: 'LS-2024-001',
        website: 'https://pro-locksmith.com',
        verified: true,
        verificationDocs: []
      },
      emailVerified: new Date(),
      isActive: true,
      newsletter: true,
    },
  })

  // Create sample address for customer
  await prisma.address.create({
    data: {
      userId: sampleCustomer.id,
      firstName: 'John',
      lastName: 'Smith',
      company: 'Pro Locksmith Services',
      addressLine1: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'US',
      type: 'BOTH',
      isDefault: true,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - ${categories.length} categories`)
  console.log(`   - ${products.length} products`)
  console.log(`   - 2 users (1 admin, 1 customer)`)
  console.log(`   - 1 customer address`)
}

async function main() {
  try {
    await clearDatabase()
    await seedDatabase()
  } catch (error) {
    console.error('❌ Reset and seeding failed:', error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('🎉 Database reset and seed completed successfully!')
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('❌ Process failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })