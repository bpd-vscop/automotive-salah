// filepath: packages/database/prisma/reset-and-seed.ts
// DANGEROUS: This script DELETES ALL DATA in the database and then reseeds it.
// Used for resetting the development environment from a clean slate.
// DO NOT RUN THIS ON A PRODUCTION DATABASE.

import { PrismaClient, ProfessionalTier, OrderStatus, PaymentStatus } from '../src/generated'

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
  
  console.log('✅ All data deleted.')
  console.log('🌱 Starting database seed...')

  // ======================== CATEGORIES ========================
  console.log('📂 Creating categories...')
  
  const category1 = await prisma.category.create({
    data: {
      name: 'Programming Tools',
      slug: 'programming-tools',
      description: 'Professional key programming and diagnostic tools',
      sortOrder: 1,
    },
  })
  
  const category2 = await prisma.category.create({
    data: {
      name: 'Key Cutting Machines',
      slug: 'key-cutting-machines',
      description: 'Precision key cutting and duplicating machines',
      sortOrder: 2,
    },
  })
  
  const category3 = await prisma.category.create({
    data: {
      name: 'Transponder Keys',
      slug: 'transponder-keys',
      description: 'Blank transponder keys and remotes',
      sortOrder: 3,
    },
  })
  
  const category4 = await prisma.category.create({
    data: {
      name: 'Lockout Tools',
      slug: 'lockout-tools',
      description: 'Professional vehicle lockout and entry tools',
      sortOrder: 4,
    },
  })
  
  const category5 = await prisma.category.create({
    data: {
      name: 'Key Fob Batteries',
      slug: 'batteries',
      description: 'Replacement batteries for key fobs and remotes',
      sortOrder: 5,
    },
  })

  const categories = [category1, category2, category3, category4, category5]

  // ======================== SAMPLE PRODUCTS ========================
  console.log('🔧 Creating sample products...')
  
  const products = [
    // Featured Programming Tools
    {
      name: 'Autel MaxiIM IM608 Pro Key Programming Tool',
      description: 'Advanced key programming diagnostic tool with comprehensive vehicle coverage. Features include all keys lost programming, ECU programming, and advanced diagnostics.',
      shortDescription: 'Professional key programming tool with advanced diagnostics',
      regularPrice: 4299.00,
      salePrice: 3899.00,
      category: {
        connect: {
          slug: 'programming-tools',
        },
      },
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
      regularPrice: 1899.00,
      category: {
        connect: {
          slug: 'programming-tools',
        },
      },
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
      regularPrice: 12999.00,
      category: {
        connect: {
          slug: 'key-cutting-machines',
        },
      },
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
      dimensions: { length: 24, width: 18, height: 16 }
    },
    
    {
      name: 'JMA Nomad Portable Key Cutter',
      description: 'Portable key cutting solution for mobile locksmiths. Battery powered with precision cutting capabilities.',
      shortDescription: 'Portable battery-powered key cutter',
      regularPrice: 2499.00,
      salePrice: 2199.00,
      category: {
        connect: {
          slug: 'key-cutting-machines',
        },
      },
      brand: 'JMA',
      partNumber: 'NOMAD-PORTABLE',
      sku: 'JMA-NOMAD',
      stockQuantity: 12,
      onSale: true,
      images: [
        'https://www.key4.com/uploads/files/products/jma-nomad-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/jma-nomad-thumb.jpg',
      tags: ['jma', 'portable', 'mobile', 'battery'],
      weight: 15.5
    },
    
    // Transponder Keys
    {
      name: 'BMW Proximity Key Blank (FEM/BDC)',
      description: 'High-quality BMW proximity key blank for FEM/BDC systems. Compatible with 2011+ BMW vehicles with comfort access.',
      shortDescription: 'BMW proximity key blank for FEM/BDC systems',
      regularPrice: 89.99,
      salePrice: 79.99,
      category: {
        connect: {
          slug: 'transponder-keys',
        },
      },
      brand: 'BMW',
      partNumber: 'BMW-PROX-FEM',
      sku: 'BMW-PROX-FEM',
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
      regularPrice: 125.00,
      category: {
        connect: {
          slug: 'transponder-keys',
        },
      },
      brand: 'Mercedes-Benz',
      partNumber: 'MB-SMART-BE',
      sku: 'MB-SMART-BE',
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
    
    // Lockout Tools
    {
      name: 'Pro-Lok Air Wedge Kit',
      description: 'Professional air wedge kit for safe vehicle entry. Includes multiple sizes and pump for gradual door opening.',
      shortDescription: 'Professional air wedge kit with pump',
      regularPrice: 149.99,
      category: {
        connect: {
          slug: 'lockout-tools',
        },
      },
      brand: 'Pro-Lok',
      partNumber: 'PL-AIRWEDGE-KIT',
      sku: 'PL-AIRWEDGE-KIT',
      stockQuantity: 35,
      featured: true,
      images: [
        'https://www.key4.com/uploads/files/products/prolok-air-wedge-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/prolok-air-wedge-thumb.jpg',
      tags: ['prolok', 'air-wedge', 'lockout', 'safe'],
      weight: 2.8
    },
    
    {
      name: 'Steck Big Easy Lock Out Tool',
      description: 'Inflatable lockout tool for creating entry space in vehicle doors. Easy to use and prevents door damage.',
      shortDescription: 'Inflatable lockout tool for safe entry',
      regularPrice: 89.99,
      salePrice: 74.99,
      category: {
        connect: {
          slug: 'lockout-tools',
        },
      },
      brand: 'Steck',
      partNumber: 'STECK-BIGEASY',
      sku: 'STECK-BIGEASY',
      stockQuantity: 22,
      onSale: true,
      images: [
        'https://www.key4.com/uploads/files/products/steck-big-easy-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/steck-big-easy-thumb.jpg',
      tags: ['steck', 'inflatable', 'safe', 'easy'],
      weight: 1.2
    },
    
    // Batteries
    {
      name: 'CR2032 Key Fob Battery (10-Pack)',
      description: 'High-quality CR2032 lithium batteries for key fobs and remotes. Long-lasting power with 10-year shelf life.',
      shortDescription: 'CR2032 batteries for key fobs (10-pack)',
      regularPrice: 19.99,
      category: {
        connect: {
          slug: 'batteries',
        },
      },
      brand: 'Panasonic',
      partNumber: 'CR2032-10PK',
      sku: 'PAN-CR2032-10PK',
      stockQuantity: 150,
      featured: true,
      images: [
        'https://www.key4.com/uploads/files/products/cr2032-batteries-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/cr2032-thumb.jpg',
      tags: ['cr2032', 'battery', 'lithium', 'key-fob'],
      weight: 0.3,
      minimumOrderQuantity: 1
    },
    
    {
      name: 'CR2025 Key Fob Battery (5-Pack)',
      description: 'Premium CR2025 lithium batteries for automotive key fobs. Compatible with most European vehicle remotes.',
      shortDescription: 'CR2025 batteries for European key fobs',
      regularPrice: 12.99,
      category: {
        connect: {
          slug: 'batteries',
        },
      },
      brand: 'Energizer',
      partNumber: 'CR2025-5PK',
      sku: 'ENG-CR2025-5PK',
      stockQuantity: 89,
      images: [
        'https://www.key4.com/uploads/files/products/cr2025-batteries-1.jpg'
      ],
      thumbnailImage: 'https://www.key4.com/uploads/files/products/cr2025-thumb.jpg',
      tags: ['cr2025', 'battery', 'european', 'remote'],
      weight: 0.2
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
  
  const adminUser = await prisma.customer.create({
    data: {
      email: 'admin@automotive-locksmith.com',
      passwordHash: '$2a$10$example.hash.password', // In real app, hash with bcrypt
      firstName: 'Admin',
      lastName: 'User',
      professionalTier: ProfessionalTier.PLATINUM,
      discountRate: 0.15, // 15% admin discount
      emailVerified: new Date(),
      isActive: true,
    },
  })

  // ======================== SAMPLE CUSTOMER ========================
  console.log('👥 Creating sample customer...')
  
  const sampleCustomer = await prisma.customer.create({
    data: {
      email: 'john@pro-locksmith.com',
      passwordHash: '$2a$10$example.hash.password',
      firstName: 'John',
      lastName: 'Smith',
      phone: '(555) 123-4567',
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
      customerId: sampleCustomer.id,
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

  // ======================== SAMPLE ORDER ========================
  console.log('📦 Creating sample order...')
  
  const sampleProducts = await prisma.product.findMany({
    take: 3,
    select: { id: true, regularPrice: true, name: true, partNumber: true }
  })

  if (sampleProducts.length > 0) {
    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-2024-001',
        customerId: sampleCustomer.id,
        customerEmail: sampleCustomer.email,
        customerPhone: sampleCustomer.phone!,
        status: OrderStatus.SHIPPED,
        paymentStatus: PaymentStatus.PAID,
        subtotal: 299.97,
        taxAmount: 24.00,
        shippingAmount: 15.99,
        discountAmount: 29.99, // 10% professional discount
        totalAmount: 309.97,
        shippingAddress: {
          firstName: 'John',
          lastName: 'Smith',
          company: 'Pro Locksmith Services',
          addressLine1: '123 Main Street',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'US'
        },
        billingAddress: {
          firstName: 'John',
          lastName: 'Smith',
          company: 'Pro Locksmith Services',
          addressLine1: '123 Main Street',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'US'
        },
        shippingMethod: 'Standard Shipping',
        trackingNumber: 'TRACK123456789',
        paymentMethod: 'Credit Card',
        paymentIntentId: 'pi_example123',
        shippedAt: new Date(),
      },
    })

    // Create order items
    for (let i = 0; i < Math.min(3, sampleProducts.length); i++) {
      const product = sampleProducts[i]
      const quantity = i + 1
      
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          productName: product.name,
          productSku: product.partNumber ?? '',
          unitPrice: product.regularPrice,
          quantity: quantity,
          totalPrice: product.regularPrice * quantity,
        },
      })
    }
  }

  // ======================== SAMPLE REVIEWS ========================
  console.log('⭐ Creating sample reviews...')
  
  const reviewableProducts = await prisma.product.findMany({
    take: 5,
    select: { id: true }
  })

  for (const product of reviewableProducts) {
    await prisma.productReview.create({
      data: {
        productId: product.id,
        customerId: sampleCustomer.id,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        title: 'Great product!',
        content: 'This tool works exactly as described. Professional quality and fast shipping.',
        verified: true,
      },
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - ${categories.length} categories`)
  console.log(`   - ${products.length} products`)
  console.log(`   - 2 users (1 admin, 1 customer)`)
  console.log(`   - 1 sample order`)
  console.log(`   - ${reviewableProducts.length} product reviews`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })