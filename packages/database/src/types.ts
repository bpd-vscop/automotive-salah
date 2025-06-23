// filepath: packages/database/src/types.ts
// Database types and utilities for type-safe operations
// This file exports all the generated Prisma types and adds custom utilities

// Re-export all Prisma generated types
export type {
    // Product Types
    Product,
    VehicleCompatibility,
    ProductDimensions,
    
    // User Types  
    User,
    BusinessInfo,
    UserRole,
    ProfessionalTier,
    
    // Order Types
    Order,
    OrderItem,
    OrderStatus,
    PaymentStatus,
    
    // Address Types
    Address,
    AddressType,
    
    // Review Types
    ProductReview,
    
    // Category Types
    Category,
    
    // Prisma utility types
    Prisma,
  } from './generated'
  
  // Import Prisma for custom types
  import type { Prisma } from './generated'
  
  // ======================== CUSTOM UTILITY TYPES ========================
  
  // Product with all relations loaded
  export type ProductWithDetails = Prisma.ProductGetPayload<{
    include: {
      compatibility: true
      reviews: {
        include: {
          user: {
            select: {
              firstName: true
              lastName: true
            }
          }
        }
      }
    }
  }>
  
  // Product for listing (minimal data for performance)
  export type ProductSummary = Prisma.ProductGetPayload<{
    select: {
      id: true
      name: true
      price: true
      salePrice: true
      thumbnailImage: true
      images: true
      inStock: true
      brand: true
      featured: true
      onSale: true
      newProduct: true
      slug: true
    }
  }>
  
  // Order with complete details
  export type OrderWithDetails = Prisma.OrderGetPayload<{
    include: {
      user: {
        select: {
          firstName: true
          lastName: true
          email: true
        }
      }
      items: {
        include: {
          product: {
            select: {
              name: true
              thumbnailImage: true
              slug: true
            }
          }
        }
      }
    }
  }>
  
  // User with business info
  export type UserWithBusiness = Prisma.UserGetPayload<{
    include: {
      addresses: true
    }
  }>
  
  // Category with children
  export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: {
      children: true
      parent: true
    }
  }>
  
  // ======================== SEARCH AND FILTER TYPES ========================
  
  // Product search filters (for your CategoryGrid and search)
  export interface ProductFilters {
    category?: string
    brand?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    featured?: boolean
    onSale?: boolean
    newProduct?: boolean
    search?: string
    compatibility?: {
      year?: string
      make?: string
      model?: string
    }
  }
  
  // Sort options for product listings
  export type ProductSortOption = 
    | 'name_asc'
    | 'name_desc'
    | 'price_asc'
    | 'price_desc'
    | 'newest'
    | 'oldest'
    | 'featured'
  
  // Pagination parameters
  export interface PaginationParams {
    page?: number
    limit?: number
    sortBy?: ProductSortOption
  }
  
  // Search result type
  export interface ProductSearchResult {
    products: ProductSummary[]
    total: number
    page: number
    pages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  
  // ======================== VEHICLE COMPATIBILITY TYPES ========================
  
  // Vehicle search parameters (matches your VehicleSearch component)
  export interface VehicleSearchParams {
    year?: string
    make?: string
    model?: string
    trim?: string
  }
  
  // Vehicle options for dropdowns
  export interface VehicleOptions {
    years: string[]
    makes: string[]
    models: string[]
    trims: string[]
  }
  
  // ======================== ORDER TYPES ========================
  
  // Cart item (before order creation)
  export interface CartItem {
    productId: string
    quantity: number
    product?: ProductSummary
  }
  
  // Order creation input with embedded addresses
  export interface CreateOrderInput {
    items: Array<{
      productId: string
      quantity: number
    }>
    shippingAddress: {
      firstName: string
      lastName: string
      company?: string
      addressLine1: string
      addressLine2?: string
      city: string
      state: string
      zipCode: string
      country: string
    }
    billingAddress: {
      firstName: string
      lastName: string
      company?: string
      addressLine1: string
      addressLine2?: string
      city: string
      state: string
      zipCode: string
      country: string
    }
    shippingMethod: string
    paymentMethod: string
    customerNotes?: string
  }
  
  // ======================== ADMIN DASHBOARD TYPES ========================
  
  // Dashboard statistics
  export interface DashboardStats {
    totalProducts: number
    totalOrders: number
    totalCustomers: number
    totalRevenue: number
    lowStockProducts: number
    pendingOrders: number
    recentOrders: OrderWithDetails[]
    topProducts: Array<{
      product: ProductSummary
      orderCount: number
      revenue: number
    }>
  }
  
  // Product form input (for admin)
  export interface ProductFormInput {
    name: string
    description: string
    shortDescription?: string
    price: number
    salePrice?: number
    category: string
    subCategory?: string
    brand: string
    partNumber: string
    sku?: string
    stockQuantity: number
    lowStockAlert: number
    featured: boolean
    onSale: boolean
    newProduct: boolean
    professionalOnly: boolean
    minimumOrderQuantity: number
    weight?: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
    tags: string[]
    images: string[]
    thumbnailImage?: string
    compatibility: Array<{
      year: string
      make: string
      model: string
      trim?: string
      engine?: string
      notes?: string
    }>
  }
  
  // ======================== API RESPONSE TYPES ========================
  
  // Standard API response wrapper
  export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
  }
  
  // Paginated response
  export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
      total: number
      page: number
      pages: number
      limit: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
  
  // ======================== IMAGE MANAGEMENT TYPES ========================
  
  // Image upload result
  export interface ImageUploadResult {
    url: string
    filename: string
    size: number
    width?: number
    height?: number
  }
  
  // Image optimization options
  export interface ImageOptimizationOptions {
    width?: number
    height?: number
    quality?: number
    format?: 'jpeg' | 'png' | 'webp'
  }