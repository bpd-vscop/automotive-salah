// filepath: packages/database/prisma/seed.ts
// Enhanced database seeding script with RBAC, admin users, and content management
// This creates a complete development environment with all necessary data

import { PrismaClient } from "../src/generated";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting enhanced database seed...");

  // ======================== RBAC SYSTEM ========================
  console.log("👥 Creating roles and admin users...");

  // Create roles with detailed permissions
  const superAdminRole = await prisma.role.create({
    data: {
      roleName: "Super Admin",
      hierarchyLevel: 1,
      description: "Complete system access with all permissions",
      permissions: {
        dashboard: { read: true, write: true, delete: true },
        products: {
          create: true,
          read: true,
          update: true,
          delete: true,
          approve: true,
        },
        orders: {
          create: true,
          read: true,
          update: true,
          delete: true,
          refund: true,
        },
        customers: { create: true, read: true, update: true, delete: true },
        users: { create: true, read: true, update: true, delete: true },
        settings: { read: true, update: true },
        content: { create: true, read: true, update: true, delete: true },
        analytics: { read: true, export: true },
        system: { backup: true, maintenance: true, logs: true },
      },
    },
  });

  const adminRole = await prisma.role.create({
    data: {
      roleName: "Admin",
      hierarchyLevel: 2,
      description: "Full business management access",
      permissions: {
        dashboard: { read: true, write: true, delete: false },
        products: {
          create: true,
          read: true,
          update: true,
          delete: true,
          approve: true,
        },
        orders: {
          create: true,
          read: true,
          update: true,
          delete: false,
          refund: true,
        },
        customers: { create: true, read: true, update: true, delete: false },
        users: { create: false, read: true, update: true, delete: false },
        settings: { read: true, update: true },
        content: { create: true, read: true, update: true, delete: true },
        analytics: { read: true, export: true },
        system: { backup: false, maintenance: false, logs: true },
      },
    },
  });

  const storeManagerRole = await prisma.role.create({
    data: {
      roleName: "Store Manager",
      hierarchyLevel: 3,
      description: "Store operations and inventory management",
      permissions: {
        dashboard: { read: true, write: false, delete: false },
        products: {
          create: true,
          read: true,
          update: true,
          delete: false,
          approve: false,
        },
        orders: {
          create: false,
          read: true,
          update: true,
          delete: false,
          refund: false,
        },
        customers: { create: false, read: true, update: true, delete: false },
        users: { create: false, read: false, update: false, delete: false },
        settings: { read: true, update: false },
        content: { create: true, read: true, update: true, delete: false },
        analytics: { read: true, export: false },
        system: { backup: false, maintenance: false, logs: false },
      },
    },
  });

  const editorRole = await prisma.role.create({
    data: {
      roleName: "Editor",
      hierarchyLevel: 4,
      description: "Content management and product editing",
      permissions: {
        dashboard: { read: true, write: false, delete: false },
        products: {
          create: true,
          read: true,
          update: true,
          delete: false,
          approve: false,
        },
        orders: {
          create: false,
          read: true,
          update: false,
          delete: false,
          refund: false,
        },
        customers: { create: false, read: true, update: false, delete: false },
        users: { create: false, read: false, update: false, delete: false },
        settings: { read: false, update: false },
        content: { create: true, read: true, update: true, delete: false },
        analytics: { read: false, export: false },
        system: { backup: false, maintenance: false, logs: false },
      },
    },
  });

  // Create admin users
  const hashedPassword = await bcrypt.hash("admin123!", 12);

  const superAdmin = await prisma.staffUser.create({
    data: {
      roleId: superAdminRole.id,
      firstName: "John",
      lastName: "Smith",
      email: "admin@ulks.com",
      passwordHash: hashedPassword,
      isActive: true,
      emailVerified: true,
      mustChangePassword: false,
      canAccessAdmin: true,
      departmentAccess: ["all"],
      timezone: "America/New_York",
    },
  });

  const admin = await prisma.staffUser.create({
    data: {
      roleId: adminRole.id,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@ulks.com",
      passwordHash: hashedPassword,
      isActive: true,
      emailVerified: true,
      mustChangePassword: false,
      canAccessAdmin: true,
      departmentAccess: ["products", "orders", "customers"],
      timezone: "America/New_York",
    },
  });

  const storeManager = await prisma.staffUser.create({
    data: {
      roleId: storeManagerRole.id,
      firstName: "Mike",
      lastName: "Wilson",
      email: "mike@ulks.com",
      passwordHash: hashedPassword,
      isActive: true,
      emailVerified: true,
      mustChangePassword: true,
      canAccessAdmin: true,
      departmentAccess: ["products", "orders"],
      timezone: "America/Chicago",
    },
  });

  // ======================== GLOBAL SETTINGS ========================
  console.log("⚙️ Creating global settings...");

  const settings = [
    // General Settings
    {
      key: "store_name",
      value: "ULKS Automotive Locksmith",
      category: "general",
      dataType: "STRING",
      isPublic: true,
    },
    {
      key: "store_description",
      value: "Professional automotive locksmith tools and supplies",
      category: "general",
      dataType: "STRING",
      isPublic: true,
    },
    {
      key: "contact_email",
      value: "support@ulks.com",
      category: "general",
      dataType: "EMAIL",
      isPublic: true,
    },
    {
      key: "contact_phone",
      value: "+1 (555) 123-4567",
      category: "general",
      dataType: "STRING",
      isPublic: true,
    },
    {
      key: "business_hours",
      value: {
        monday: "9:00-17:00",
        tuesday: "9:00-17:00",
        wednesday: "9:00-17:00",
        thursday: "9:00-17:00",
        friday: "9:00-17:00",
        saturday: "10:00-14:00",
        sunday: "closed",
      },
      category: "general",
      dataType: "JSON",
      isPublic: true,
    },

    // E-commerce Settings
    {
      key: "default_currency",
      value: "USD",
      category: "general",
      dataType: "STRING",
      isPublic: true,
    },
    {
      key: "tax_rate",
      value: 8.25,
      category: "general",
      dataType: "NUMBER",
      isPublic: true,
    },
    {
      key: "shipping_rate",
      value: 9.99,
      category: "shipping",
      dataType: "NUMBER",
      isPublic: true,
    },
    {
      key: "free_shipping_threshold",
      value: 75.0,
      category: "shipping",
      dataType: "NUMBER",
      isPublic: true,
    },
    {
      key: "low_stock_threshold",
      value: 5,
      category: "inventory",
      dataType: "NUMBER",
      isPublic: false,
    },

    // Professional Tier Discounts
    {
      key: "bronze_discount",
      value: 5,
      category: "pricing",
      dataType: "NUMBER",
      isPublic: false,
    },
    {
      key: "silver_discount",
      value: 10,
      category: "pricing",
      dataType: "NUMBER",
      isPublic: false,
    },
    {
      key: "gold_discount",
      value: 15,
      category: "pricing",
      dataType: "NUMBER",
      isPublic: false,
    },
    {
      key: "platinum_discount",
      value: 20,
      category: "pricing",
      dataType: "NUMBER",
      isPublic: false,
    },

    // Payment Settings (demo values)
    {
      key: "stripe_publishable_key",
      value: "pk_test_demo",
      category: "payment",
      dataType: "STRING",
      isPublic: true,
    },
    {
      key: "stripe_secret_key",
      value: "sk_test_demo",
      category: "payment",
      dataType: "PASSWORD",
      isEncrypted: true,
      isPublic: false,
    },
    {
      key: "paypal_client_id",
      value: "demo_paypal_client",
      category: "payment",
      dataType: "STRING",
      isPublic: true,
    },

    // Email Settings
    {
      key: "smtp_host",
      value: "smtp.gmail.com",
      category: "email",
      dataType: "STRING",
      isPublic: false,
    },
    {
      key: "smtp_port",
      value: 587,
      category: "email",
      dataType: "NUMBER",
      isPublic: false,
    },
    {
      key: "smtp_username",
      value: "noreply@ulks.com",
      category: "email",
      dataType: "EMAIL",
      isPublic: false,
    },
    {
      key: "smtp_password",
      value: "demo_password",
      category: "email",
      dataType: "PASSWORD",
      isEncrypted: true,
      isPublic: false,
    },

    // Analytics
    {
      key: "google_analytics_id",
      value: "GA-DEMO-12345",
      category: "analytics",
      dataType: "STRING",
      isPublic: true,
    },
    {
      key: "facebook_pixel_id",
      value: "FB-DEMO-12345",
      category: "analytics",
      dataType: "STRING",
      isPublic: true,
    },
  ];

  for (const setting of settings) {
    await prisma.setting.create({
      data: {
        settingKey: setting.key,
        settingValue: setting.value,
        category: setting.category,
        dataType: setting.dataType as any,
        isEncrypted: setting.isEncrypted || false,
        isPublic: setting.isPublic,
        displayName: setting.key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: `Configuration for ${setting.key.replace(/_/g, " ")}`,
        updatedBy: superAdmin.id,
      },
    });
  }

  // ======================== SITE CUSTOMIZATION ========================
  console.log("🎨 Creating site customization...");

  await prisma.siteCustomization.create({
    data: {
      siteName: "ULKS Automotive Locksmith",
      siteDescription:
        "Professional automotive locksmith tools and equipment for locksmiths and dealerships",
      primaryColor: "#1f2937",
      secondaryColor: "#6b7280",
      accentColor: "#3b82f6",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      linkColor: "#2563eb",
      contactEmail: "support@ulks.com",
      contactPhone: "+1 (555) 123-4567",
      contactAddress: {
        street: "123 Locksmith Lane",
        city: "Detroit",
        state: "MI",
        zipCode: "48201",
        country: "USA",
      },
      businessHours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed",
      },
      socialMedia: {
        facebook: "https://facebook.com/ulks",
        twitter: "https://twitter.com/ulks",
        linkedin: "https://linkedin.com/company/ulks",
        youtube: "https://youtube.com/ulks",
      },
      metaTitle: "ULKS - Professional Automotive Locksmith Tools & Equipment",
      metaDescription:
        "Shop professional automotive locksmith tools, key programming equipment, and diagnostic tools. Trusted by locksmiths and dealerships nationwide.",
      metaKeywords:
        "automotive locksmith, key programming, diagnostic tools, transponder keys",
      updatedBy: superAdmin.id,
    },
  });

  // ======================== HERO SLIDES ========================
  console.log("🖼️ Creating hero slides...");

  await prisma.heroSlide.create({
    data: {
      title: "Professional Automotive Locksmith Tools",
      subtitle: "Trusted by Professionals Nationwide",
      description:
        "Discover our comprehensive selection of key programming tools, diagnostic equipment, and locksmith supplies.",
      imageUrl: "/images/hero/hero-1.jpg",
      altText: "Professional locksmith working with key programming tool",
      primaryButtonText: "Shop Now",
      primaryButtonUrl: "/products",
      secondaryButtonText: "Learn More",
      secondaryButtonUrl: "/about",
      textPosition: "CENTER_LEFT",
      sortOrder: 1,
      isActive: true,
      createdBy: superAdmin.id,
    },
  });

  await prisma.heroSlide.create({
    data: {
      title: "Latest Key Programming Technology",
      subtitle: "Autel IM608 Pro - Now Available",
      description:
        "Advanced diagnostic and key programming capabilities for modern vehicles.",
      imageUrl: "/images/hero/hero-2.jpg",
      altText: "Autel IM608 Pro key programming tool",
      primaryButtonText: "View Product",
      primaryButtonUrl: "/products/autel-im608-pro",
      textPosition: "CENTER_RIGHT",
      sortOrder: 2,
      isActive: true,
      createdBy: superAdmin.id,
    },
  });

  // ======================== BANNERS ========================
  console.log("📢 Creating promotional banners...");

  await prisma.banner.create({
    data: {
      title: "Free Shipping on Orders Over $75",
      description: "Professional grade tools delivered to your door",
      position: "TOP",
      displayType: "PROMOTION",
      backgroundColor: "#059669",
      textColor: "#ffffff",
      isActive: true,
      priority: 1,
      createdBy: superAdmin.id,
    },
  });

  await prisma.banner.create({
    data: {
      title: "New Product Alert",
      subtitle: "Launch X-PROG3 Now Available",
      description:
        "Latest generation key programming tool with expanded vehicle coverage",
      buttonText: "Shop Now",
      buttonUrl: "/products/launch-x-prog3",
      position: "HERO",
      displayType: "ANNOUNCEMENT",
      backgroundColor: "#1f2937",
      textColor: "#ffffff",
      isActive: true,
      priority: 2,
      createdBy: superAdmin.id,
    },
  });

  // ======================== CATEGORIES ========================
  console.log("📂 Creating categories...");

  const category1 = await prisma.category.create({
    data: {
      name: "Programming Tools",
      slug: "programming-tools",
      description: "Professional key programming and diagnostic tools",
      iconClass: "fas fa-microchip",
      sortOrder: 1,
      isFeatured: true,
      metaTitle: "Key Programming Tools - Professional Automotive Equipment",
      metaDescription:
        "Shop professional key programming tools including Autel, Launch, and more. Trusted by locksmiths nationwide.",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Key Cutting Machines",
      slug: "key-cutting-machines",
      description: "Precision key cutting and duplicating machines",
      iconClass: "fas fa-cut",
      sortOrder: 2,
      isFeatured: true,
      metaTitle: "Key Cutting Machines - Professional Grade Equipment",
      metaDescription:
        "Professional key cutting machines for automotive and residential keys. Silca, JMA, and more top brands.",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Transponder Keys",
      slug: "transponder-keys",
      description: "Blank transponder keys and remotes for all vehicle makes",
      iconClass: "fas fa-key",
      sortOrder: 3,
      isFeatured: true,
      metaTitle: "Transponder Keys & Remotes - All Vehicle Makes",
      metaDescription:
        "Blank transponder keys and remote controls for BMW, Mercedes, Audi, and all major vehicle brands.",
    },
  });

  const category4 = await prisma.category.create({
    data: {
      name: "Lockout Tools",
      slug: "lockout-tools",
      description: "Professional vehicle lockout and entry tools",
      iconClass: "fas fa-unlock",
      sortOrder: 4,
      metaTitle: "Vehicle Lockout Tools - Professional Entry Equipment",
      metaDescription:
        "Professional lockout tools for safe vehicle entry. Wedges, picks, and air bags for all vehicle types.",
    },
  });

  const category5 = await prisma.category.create({
    data: {
      name: "Batteries & Accessories",
      slug: "batteries-accessories",
      description: "Replacement batteries and accessories for key fobs",
      iconClass: "fas fa-battery-three-quarters",
      sortOrder: 5,
      metaTitle: "Key Fob Batteries & Accessories",
      metaDescription:
        "Replacement batteries for key fobs and remotes, plus essential locksmith accessories.",
    },
  });

  const categories = [category1, category2, category3, category4, category5];

  // ======================== PROFESSIONAL CUSTOMERS ========================
  console.log("👥 Creating sample customers...");

  const customerPassword = await bcrypt.hash("customer123", 12);

  // B2B Professional Customer
  const professionalCustomer = await prisma.customer.create({
    data: {
      firstName: "David",
      lastName: "Martinez",
      email: "david@speedlocksmith.com",
      phone: "+1 (555) 987-6543",
      passwordHash: customerPassword,
      emailVerified: true,
      professionalTier: "GOLD",
      discountRate: 15,
      customerType: "BUSINESS",
      businessInfo: {
        companyName: "Speed Locksmith Services",
        taxId: "12-3456789",
        licenseNumber: "LS-2023-0156",
        website: "https://speedlocksmith.com",
        verified: true,
        yearEstablished: 2015,
        employeeCount: "11-50",
      },
      totalOrders: 23,
      totalSpent: 8750.5,
      lifetimeValue: 12000,
      averageOrderValue: 380.45,
    },
  });

  // Retail Customer
  const retailCustomer = await prisma.customer.create({
    data: {
      firstName: "Jennifer",
      lastName: "Davis",
      email: "jennifer.davis@email.com",
      phone: "+1 (555) 654-3210",
      passwordHash: customerPassword,
      emailVerified: true,
      professionalTier: "BRONZE",
      discountRate: 5,
      customerType: "RETAIL",
      totalOrders: 3,
      totalSpent: 245.75,
      lifetimeValue: 350,
      averageOrderValue: 81.92,
    },
  });

  // Customer addresses
  await prisma.address.create({
    data: {
      customerId: professionalCustomer.id,
      firstName: "David",
      lastName: "Martinez",
      company: "Speed Locksmith Services",
      address1: "456 Industrial Blvd",
      city: "Dallas",
      state: "TX",
      postalCode: "75201",
      country: "US",
      phone: "+1 (555) 987-6543",
      type: "BOTH",
      isDefault: true,
      isValidated: true,
    },
  });

  // ======================== ENHANCED PRODUCTS ========================
  console.log("🔧 Creating enhanced product catalog...");

  const products = [];

  // Featured Programming Tools
  const autelIM608 = await prisma.product.create({
    data: {
      categoryId: category1.id,
      name: "Autel MaxiIM IM608 Pro Key Programming Tool",
      description:
        "The Autel MaxiIM IM608 Pro is an advanced automotive diagnostic and key programming tool that combines the functionality of the IM608 with additional features. It offers comprehensive vehicle coverage for key programming, including all keys lost scenarios, and provides advanced diagnostics capabilities.",
      shortDescription:
        "Advanced key programming tool with comprehensive vehicle coverage and diagnostic capabilities.",
      sku: "AUTEL-IM608-PRO",
      partNumber: "AU-IM608P-2024",
      regularPrice: 4299.99,
      salePrice: 3899.99,
      costPrice: 2800.0,
      stockQuantity: 12,
      lowStockThreshold: 3,
      professionalOnly: true,
      minimumOrderQuantity: 1,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      featured: true,
      onSale: true,
      newProduct: false,
      weight: 5.2,
      dimensions: { length: 12, width: 8, height: 3 },
      vehicleCompatibility: {
        makes: [
          "BMW",
          "Mercedes-Benz",
          "Audi",
          "Volkswagen",
          "Ford",
          "GM",
          "Honda",
          "Toyota",
        ],
        models: ["All Models 2000+"],
        years: ["2000-2024"],
        engineTypes: ["Gasoline", "Diesel", "Hybrid"],
        transmissions: ["Manual", "Automatic"],
        notes:
          "Comprehensive coverage for European, Asian, and Domestic vehicles",
      },
      metaTitle: "Autel MaxiIM IM608 Pro - Professional Key Programming Tool",
      metaDescription:
        "Advanced Autel IM608 Pro key programming and diagnostic tool. All keys lost programming, ECU coding, and comprehensive vehicle coverage.",
      tags: [
        "autel",
        "key programming",
        "diagnostic",
        "professional",
        "all keys lost",
      ],
      createdBy: superAdmin.id,
      lastModifiedBy: superAdmin.id,
    },
  });
  products.push(autelIM608);

  const launchXProg = await prisma.product.create({
    data: {
      categoryId: category1.id,
      name: "Launch X-PROG3 Key Programming Tool",
      description:
        "The Launch X-PROG3 is a professional-grade key programming device designed for automotive locksmiths and technicians. It supports key programming for a wide range of vehicle makes and models, including European, Asian, and domestic vehicles.",
      shortDescription:
        "Professional key programming device with wide vehicle coverage and user-friendly interface.",
      sku: "LAUNCH-XPROG3",
      partNumber: "LA-XP3-2024",
      regularPrice: 2899.99,
      costPrice: 1950.0,
      stockQuantity: 8,
      lowStockThreshold: 2,
      professionalOnly: true,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      featured: true,
      newProduct: true,
      weight: 3.8,
      vehicleCompatibility: {
        makes: [
          "BMW",
          "Mercedes-Benz",
          "Audi",
          "Volkswagen",
          "Porsche",
          "Land Rover",
          "Jaguar",
        ],
        models: ["All Models 2005+"],
        years: ["2005-2024"],
        engineTypes: ["Gasoline", "Diesel"],
        transmissions: ["Manual", "Automatic"],
        notes:
          "Specialized for European vehicles with advanced security systems",
      },
      metaTitle: "Launch X-PROG3 - Professional Key Programming Device",
      metaDescription:
        "Launch X-PROG3 key programming tool for European vehicles. Professional-grade with comprehensive coverage.",
      tags: ["launch", "key programming", "european vehicles", "professional"],
      createdBy: superAdmin.id,
    },
  });
  products.push(launchXProg);

  // Key Cutting Machines
  const silcaFutura = await prisma.product.create({
    data: {
      categoryId: category2.id,
      name: "Silca Futura Edge Automatic Key Cutting Machine",
      description:
        "The Silca Futura Edge is a state-of-the-art automatic key cutting machine that combines precision, speed, and ease of use. Perfect for automotive and residential key cutting with advanced calibration technology.",
      shortDescription:
        "State-of-the-art automatic key cutting machine with precision calibration technology.",
      sku: "SILCA-FUTURA-EDGE",
      partNumber: "SI-FE-2024",
      regularPrice: 8999.99,
      salePrice: 7999.99,
      costPrice: 6200.0,
      stockQuantity: 3,
      lowStockThreshold: 1,
      professionalOnly: true,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      featured: true,
      onSale: true,
      weight: 85.0,
      dimensions: { length: 24, width: 18, height: 16 },
      metaTitle: "Silca Futura Edge - Automatic Key Cutting Machine",
      metaDescription:
        "Professional Silca Futura Edge automatic key cutting machine. Precision cutting for automotive and residential keys.",
      tags: ["silca", "key cutting", "automatic", "precision"],
      createdBy: superAdmin.id,
    },
  });
  products.push(silcaFutura);

  // Transponder Keys
  const bmwKeys = await prisma.product.create({
    data: {
      categoryId: category3.id,
      name: "BMW Proximity Key Blank - 5 Series, 7 Series (2017-2024)",
      description:
        "High-quality BMW proximity key blanks compatible with 5 Series and 7 Series models from 2017-2024. Includes comfort access functionality and requires programming.",
      shortDescription:
        "BMW proximity key blanks for 5 Series and 7 Series with comfort access.",
      sku: "BMW-PROX-57-2017",
      partNumber: "BM-PK57-24",
      regularPrice: 89.99,
      salePrice: 74.99,
      costPrice: 45.0,
      stockQuantity: 50,
      lowStockThreshold: 10,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      onSale: true,
      weight: 0.2,
      vehicleCompatibility: {
        makes: ["BMW"],
        models: ["5 Series", "7 Series"],
        years: ["2017-2024"],
        engineTypes: ["Gasoline", "Diesel", "Hybrid"],
        transmissions: ["Automatic"],
        notes: "Comfort access functionality included",
      },
      metaTitle: "BMW Proximity Key Blank - 5 & 7 Series 2017-2024",
      metaDescription:
        "BMW proximity key blanks for 5 Series and 7 Series. High-quality with comfort access functionality.",
      tags: ["bmw", "proximity key", "comfort access", "5 series", "7 series"],
      createdBy: superAdmin.id,
    },
  });
  products.push(bmwKeys);

  const mercedesKeys = await prisma.product.create({
    data: {
      categoryId: category3.id,
      name: "Mercedes-Benz Smart Key Shell - C, E, S Class",
      description:
        "Replacement smart key shells for Mercedes-Benz C-Class, E-Class, and S-Class vehicles. High-quality ABS plastic construction with chrome accents.",
      shortDescription:
        "Mercedes-Benz smart key replacement shells for C, E, and S Class vehicles.",
      sku: "MB-SMART-CES",
      partNumber: "MB-SK-CES-24",
      regularPrice: 24.99,
      costPrice: 12.5,
      stockQuantity: 100,
      lowStockThreshold: 20,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      newProduct: true,
      weight: 0.1,
      vehicleCompatibility: {
        makes: ["Mercedes-Benz"],
        models: ["C-Class", "E-Class", "S-Class"],
        years: ["2014-2024"],
        engineTypes: ["Gasoline", "Diesel", "Hybrid"],
        transmissions: ["Automatic"],
        notes: "Chrome accent trim included",
      },
      metaTitle: "Mercedes-Benz Smart Key Shell - C, E, S Class",
      metaDescription:
        "High-quality Mercedes-Benz smart key replacement shells. Compatible with C, E, and S Class vehicles.",
      tags: [
        "mercedes",
        "smart key",
        "key shell",
        "c class",
        "e class",
        "s class",
      ],
      createdBy: superAdmin.id,
    },
  });
  products.push(mercedesKeys);

  // Lockout Tools
  const lockoutKit = await prisma.product.create({
    data: {
      categoryId: category4.id,
      name: "Professional Vehicle Lockout Tool Kit - 32 Piece Set",
      description:
        "Comprehensive 32-piece vehicle lockout tool kit including wedges, long reach tools, air wedges, and door handle tools. Suitable for all vehicle types.",
      shortDescription:
        "Complete 32-piece professional lockout tool kit for all vehicle types.",
      sku: "LOCKOUT-KIT-32",
      partNumber: "LO-32P-KIT",
      regularPrice: 189.99,
      costPrice: 95.0,
      stockQuantity: 25,
      lowStockThreshold: 5,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      weight: 8.5,
      dimensions: { length: 20, width: 12, height: 4 },
      metaTitle: "Professional Vehicle Lockout Tool Kit - 32 Piece Set",
      metaDescription:
        "Complete professional lockout tool kit with 32 pieces. Wedges, long reach tools, and air wedges for all vehicles.",
      tags: [
        "lockout tools",
        "vehicle entry",
        "professional kit",
        "wedges",
        "long reach",
      ],
      createdBy: superAdmin.id,
    },
  });
  products.push(lockoutKit);

  // JMA Key Cutting Machine
  const jmaNomad = await prisma.product.create({
    data: {
      categoryId: category2.id,
      name: "JMA Nomad Portable Key Cutting Machine",
      description:
        "The JMA Nomad is a lightweight, portable key cutting machine perfect for mobile locksmiths. Battery-operated with precision cutting capabilities for automotive and residential keys.",
      shortDescription:
        "Portable battery-operated key cutting machine ideal for mobile locksmith services.",
      sku: "JMA-NOMAD-PORTABLE",
      partNumber: "JMA-NM-2024",
      regularPrice: 3299.99,
      salePrice: 2899.99,
      costPrice: 2100.0,
      stockQuantity: 6,
      lowStockThreshold: 2,
      professionalOnly: true,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      onSale: true,
      weight: 22.0,
      dimensions: { length: 18, width: 14, height: 10 },
      metaTitle: "JMA Nomad Portable Key Cutting Machine",
      metaDescription:
        "Portable JMA Nomad key cutting machine. Battery-operated for mobile locksmith services.",
      tags: [
        "jma",
        "portable",
        "key cutting",
        "mobile locksmith",
        "battery operated",
      ],
      createdBy: superAdmin.id,
    },
  });
  products.push(jmaNomad);

  // Key Fob Batteries
  const cr2032Batteries = await prisma.product.create({
    data: {
      categoryId: category5.id,
      name: "CR2032 Lithium Batteries for Key Fobs (Pack of 20)",
      description:
        "High-quality CR2032 lithium coin cell batteries specifically designed for automotive key fobs and remotes. Long-lasting power with 10-year shelf life.",
      shortDescription:
        "CR2032 lithium batteries for key fobs - 20 pack with 10-year shelf life.",
      sku: "BATTERY-CR2032-20",
      partNumber: "BAT-CR2032-20",
      regularPrice: 19.99,
      costPrice: 8.5,
      stockQuantity: 200,
      lowStockThreshold: 30,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      weight: 0.6,
      metaTitle: "CR2032 Key Fob Batteries - 20 Pack",
      metaDescription:
        "High-quality CR2032 lithium batteries for automotive key fobs. 10-year shelf life, pack of 20.",
      tags: [
        "cr2032",
        "key fob battery",
        "lithium",
        "automotive",
        "remote battery",
      ],
      createdBy: superAdmin.id,
    },
  });
  products.push(cr2032Batteries);

  // Diagnostic Cable Set
  const diagnosticCables = await prisma.product.create({
    data: {
      categoryId: category1.id,
      name: "Universal OBD2 Diagnostic Cable Set - 16 Pin Adapters",
      description:
        "Complete set of OBD2 diagnostic cables and adapters for connecting programming tools to various vehicle makes. Includes 16-pin to brand-specific adapters.",
      shortDescription:
        "Universal OBD2 diagnostic cable set with 16-pin adapters for all vehicle makes.",
      sku: "OBD2-CABLE-SET-16",
      partNumber: "OBD-CS16-2024",
      regularPrice: 159.99,
      costPrice: 75.0,
      stockQuantity: 30,
      lowStockThreshold: 8,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      weight: 2.5,
      metaTitle: "Universal OBD2 Diagnostic Cable Set - 16 Pin Adapters",
      metaDescription:
        "Complete OBD2 diagnostic cable set with adapters. Compatible with all major vehicle brands.",
      tags: [
        "obd2",
        "diagnostic cables",
        "adapters",
        "universal",
        "programming tools",
      ],
      createdBy: superAdmin.id,
    },
  });
  products.push(diagnosticCables);

  // Audi Key Blanks
  const audiKeyBlanks = await prisma.product.create({
    data: {
      categoryId: category3.id,
      name: "Audi A4/A6/Q5 Proximity Key Blank (2016-2024)",
      description:
        "Original equipment quality Audi proximity key blanks for A4, A6, and Q5 models. Features advanced encryption and comfort access functionality.",
      shortDescription:
        "Audi A4/A6/Q5 proximity key blanks with advanced encryption and comfort access.",
      sku: "AUDI-PROX-A4A6Q5",
      partNumber: "AU-PK-A4A6Q5",
      regularPrice: 95.99,
      salePrice: 79.99,
      costPrice: 48.0,
      stockQuantity: 35,
      lowStockThreshold: 8,
      status: "ACTIVE",
      approvalStatus: "APPROVED",
      onSale: true,
      weight: 0.2,
      vehicleCompatibility: {
        makes: ["Audi"],
        models: ["A4", "A6", "Q5"],
        years: ["2016-2024"],
        engineTypes: ["Gasoline", "Diesel", "Hybrid"],
        transmissions: ["Manual", "Automatic"],
        notes: "Advanced encryption with comfort access",
      },
      metaTitle: "Audi A4/A6/Q5 Proximity Key Blank 2016-2024",
      metaDescription:
        "Original quality Audi proximity key blanks for A4, A6, and Q5. Advanced encryption technology.",
      tags: ["audi", "proximity key", "a4", "a6", "q5", "comfort access"],
      createdBy: superAdmin.id,
    },
  });
  products.push(audiKeyBlanks);

  console.log(`✅ Created ${products.length} products`);

  // ======================== SAMPLE ORDERS ========================
  console.log("📦 Creating sample orders...");

  // Professional customer order
  const order1 = await prisma.order.create({
    data: {
      customerId: professionalCustomer.id,
      orderNumber: "ORD-2024-0001",
      status: "SHIPPED",
      paymentStatus: "PAID",
      fulfillmentStatus: "FULFILLED",
      priorityLevel: "HIGH",
      subtotal: 4299.99,
      taxAmount: 354.75,
      shippingAmount: 0, // Free shipping for professional
      discountAmount: 644.99, // 15% Gold tier discount
      totalAmount: 4009.75,
      paymentMethod: "stripe",
      paymentReference: "pi_demo_12345",
      shippingAddress: {
        firstName: "David",
        lastName: "Martinez",
        company: "Speed Locksmith Services",
        address1: "456 Industrial Blvd",
        city: "Dallas",
        state: "TX",
        postalCode: "75201",
        country: "US",
        phone: "+1 (555) 987-6543",
      },
      billingAddress: {
        firstName: "David",
        lastName: "Martinez",
        company: "Speed Locksmith Services",
        address1: "456 Industrial Blvd",
        city: "Dallas",
        state: "TX",
        postalCode: "75201",
        country: "US",
        phone: "+1 (555) 987-6543",
      },
      shippingCarrier: "UPS",
      shippingMethod: "UPS Ground",
      trackingNumber: "UPS123456789",
      estimatedDelivery: new Date("2024-07-15"),
      assignedToStaffId: storeManager.id,
      customerNotes: "Please deliver to loading dock entrance",
      internalNotes: "Gold tier customer - priority handling",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: autelIM608.id,
      quantity: 1,
      priceAtPurchase: 3899.99, // Sale price
      productNameAtPurchase: "Autel MaxiIM IM608 Pro Key Programming Tool",
      quantityShipped: 1,
    },
  });

  // Retail customer order
  const order2 = await prisma.order.create({
    data: {
      customerId: retailCustomer.id,
      orderNumber: "ORD-2024-0002",
      status: "PROCESSING",
      paymentStatus: "PAID",
      fulfillmentStatus: "UNFULFILLED",
      priorityLevel: "NORMAL",
      subtotal: 109.98,
      taxAmount: 9.07,
      shippingAmount: 9.99,
      discountAmount: 5.5, // 5% Bronze tier discount
      totalAmount: 123.54,
      paymentMethod: "paypal",
      paymentReference: "PAY-demo-67890",
      shippingAddress: {
        firstName: "Jennifer",
        lastName: "Davis",
        address1: "789 Oak Street",
        city: "Phoenix",
        state: "AZ",
        postalCode: "85001",
        country: "US",
        phone: "+1 (555) 654-3210",
      },
      billingAddress: {
        firstName: "Jennifer",
        lastName: "Davis",
        address1: "789 Oak Street",
        city: "Phoenix",
        state: "AZ",
        postalCode: "85001",
        country: "US",
        phone: "+1 (555) 654-3210",
      },
      assignedToStaffId: admin.id,
      customerNotes: "First time customer - please include care instructions",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: bmwKeys.id,
      quantity: 1,
      priceAtPurchase: 74.99,
      productNameAtPurchase:
        "BMW Proximity Key Blank - 5 Series, 7 Series (2017-2024)",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: mercedesKeys.id,
      quantity: 1,
      priceAtPurchase: 24.99,
      productNameAtPurchase: "Mercedes-Benz Smart Key Shell - C, E, S Class",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: cr2032Batteries.id,
      quantity: 1,
      priceAtPurchase: 19.99,
      productNameAtPurchase:
        "CR2032 Lithium Batteries for Key Fobs (Pack of 20)",
    },
  });

  // ======================== PRODUCT REVIEWS ========================
  console.log("⭐ Creating product reviews...");

  // Reviews for Autel IM608 Pro
  await prisma.productReview.create({
    data: {
      productId: autelIM608.id,
      customerId: professionalCustomer.id,
      rating: 5,
      title: "Excellent Professional Tool",
      content:
        "This tool has revolutionized our key programming capabilities. The all keys lost functionality works flawlessly on BMW and Mercedes vehicles. Well worth the investment for a professional shop.",
      verified: true,
      status: "APPROVED",
      helpful: 12,
    },
  });

  await prisma.productReview.create({
    data: {
      productId: launchXProg.id,
      customerId: professionalCustomer.id,
      rating: 4,
      title: "Great for European Vehicles",
      content:
        "Excellent coverage for European makes. User interface is intuitive and the device is well-built. Only minor complaint is the case could be more robust.",
      verified: true,
      status: "APPROVED",
      helpful: 8,
    },
  });

  await prisma.productReview.create({
    data: {
      productId: bmwKeys.id,
      customerId: retailCustomer.id,
      rating: 5,
      title: "Perfect Fit and Quality",
      content:
        "Exactly what I needed for my 2019 BMW 5 Series. Quality is excellent and programming went smoothly. Fast shipping too!",
      verified: true,
      status: "APPROVED",
      helpful: 5,
    },
  });

  await prisma.productReview.create({
    data: {
      productId: silcaFutura.id,
      customerId: professionalCustomer.id,
      rating: 5,
      title: "Best Investment for Our Shop",
      content:
        "This machine has increased our efficiency tremendously. The automatic calibration saves so much time, and the cut quality is perfect every time. Customer service from Silca is also top-notch.",
      verified: true,
      status: "APPROVED",
      helpful: 15,
    },
  });

  // ======================== ACTIVITY LOGS ========================
  console.log("📋 Creating activity logs...");

  await prisma.activityLog.create({
    data: {
      staffUserId: superAdmin.id,
      actionType: "SYSTEM_SETUP",
      description: "Initial database setup and configuration completed",
      entityType: "System",
      success: true,
      ipAddress: "192.168.1.100",
      userAgent: "Database Seeder v1.0",
    },
  });

  await prisma.activityLog.create({
    data: {
      staffUserId: admin.id,
      actionType: "ORDER_UPDATE",
      description: "Updated order status to processing",
      entityType: "Order",
      entityId: order2.id,
      success: true,
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  await prisma.activityLog.create({
    data: {
      staffUserId: storeManager.id,
      actionType: "PRODUCT_UPDATE",
      description: "Updated inventory levels for BMW proximity keys",
      entityType: "Product",
      entityId: bmwKeys.id,
      success: true,
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  // ======================== SUMMARY ========================
  console.log("✅ Enhanced database seeded successfully!");
  console.log(`📊 Created:`);
  console.log(`   - 4 roles (Super Admin, Admin, Store Manager, Editor)`);
  console.log(`   - 3 staff users with different permission levels`);
  console.log(`   - 21 global settings across 5 categories`);
  console.log(`   - 1 site customization configuration`);
  console.log(`   - 2 hero slides for homepage`);
  console.log(`   - 2 promotional banners`);
  console.log(`   - ${categories.length} product categories`);
  console.log(`   - ${products.length} professional automotive products`);
  console.log(`   - 2 customers (1 B2B Gold tier, 1 B2C Bronze tier)`);
  console.log(`   - 1 customer address`);
  console.log(`   - 2 sample orders (1 shipped, 1 processing)`);
  console.log(`   - 4 order items`);
  console.log(`   - 4 verified product reviews`);
  console.log(`   - 3 activity log entries`);
  console.log("");
  console.log("🔑 Admin Login Credentials:");
  console.log("   Super Admin: admin@ulks.com / admin123!");
  console.log("   Admin: sarah@ulks.com / admin123!");
  console.log("   Store Manager: mike@ulks.com / admin123!");
  console.log("");
  console.log("👤 Customer Login Credentials:");
  console.log("   Professional (Gold): david@speedlocksmith.com / customer123");
  console.log("   Retail (Bronze): jennifer.davis@email.com / customer123");
  console.log("");
  console.log("🚀 Your automotive locksmith platform is ready!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("❌ Enhanced seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
