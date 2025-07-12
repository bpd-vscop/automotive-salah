// filepath: packages/database/src/types.ts
// Complete database types and utilities for type-safe operations
// This file exports all generated Prisma types and adds custom utilities

// Re-export all Prisma generated types
export type {
  // RBAC System Types
  Role,
  StaffUser,
  ActivityLog,

  // Content Management Types
  Banner,
  BannerPosition,
  BannerType,
  HeroSlide,
  SlideTextPosition,
  SlideAnimation,
  SiteCustomization,

  // Settings Types
  Setting,
  SettingDataType,

  // Customer Types
  Customer,
  BusinessInfo,
  ProfessionalTier,
  CustomerType,
  RiskLevel,

  // Address Types
  Address,
  AddressType,

  // Category Types
  Category,

  // Product Types
  Product,
  VehicleCompatibility,
  ProductStatus,
  ApprovalStatus,

  // Review Types
  ProductReview,
  ReviewStatus,

  // Order Types
  Order,
  OrderItem,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
  OrderPriority,

  // Prisma utility types
  Prisma,
} from "./generated";

import {
  ProductStatus,
  ApprovalStatus,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
  OrderPriority,
  ProfessionalTier,
  CustomerType,
  RiskLevel,
} from "./generated";

// Import Prisma for custom types
import type { Prisma } from "./generated";

// ======================== CUSTOM UTILITY TYPES ========================

// Product with all relations loaded
export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    reviews: {
      include: {
        customer: {
          select: {
            firstName: true;
            lastName: true;
            email: true;
          };
        };
      };
    };
    orderItems: true;
  };
}>;

// Product for listing (minimal data for performance)
export type ProductSummary = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    shortDescription: true;
    regularPrice: true;
    salePrice: true;
    sku: true;
    stockQuantity: true;
    featured: true;
    onSale: true;
    newProduct: true;
    professionalOnly: true;
    weight: true;
    status: true;
    categoryId: true;
    category: {
      select: {
        name: true;
        slug: true;
      };
    };
    vehicleCompatibility: true;
    tags: true;
    createdAt: true;
  };
}>;

// Product for admin management
export type ProductForAdmin = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
        slug: true;
      };
    };
    reviews: {
      select: {
        id: true;
        rating: true;
        status: true;
      };
    };
    orderItems: {
      select: {
        id: true;
        quantity: true;
        order: {
          select: {
            orderNumber: true;
            status: true;
          };
        };
      };
    };
  };
}>;

// Order with complete details
export type OrderWithDetails = Prisma.OrderGetPayload<{
  include: {
    customer: {
      select: {
        id: true;
        firstName: true;
        lastName: true;
        email: true;
        professionalTier: true;
        businessInfo: true;
      };
    };
    orderItems: {
      include: {
        product: {
          select: {
            id: true;
            name: true;
            sku: true;
            regularPrice: true;
            weight: true;
          };
        };
      };
    };
  };
}>;

// Order summary for listing
export type OrderSummary = Prisma.OrderGetPayload<{
  select: {
    id: true;
    orderNumber: true;
    status: true;
    paymentStatus: true;
    fulfillmentStatus: true;
    priorityLevel: true;
    totalAmount: true;
    orderDate: true;
    customer: {
      select: {
        firstName: true;
        lastName: true;
        email: true;
        professionalTier: true;
      };
    };
    orderItems: {
      select: {
        quantity: true;
        product: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

// Customer with business info and stats
export type CustomerWithDetails = Prisma.CustomerGetPayload<{
  include: {
    addresses: true;
    orders: {
      select: {
        id: true;
        orderNumber: true;
        status: true;
        totalAmount: true;
        orderDate: true;
      };
      orderBy: {
        orderDate: "desc";
      };
      take: 5;
    };
    reviews: {
      select: {
        id: true;
        rating: true;
        title: true;
        createdAt: true;
        product: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

// Customer summary for listing
export type CustomerSummary = Prisma.CustomerGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    email: true;
    professionalTier: true;
    customerType: true;
    totalOrders: true;
    totalSpent: true;
    lifetimeValue: true;
    isActive: true;
    createdAt: true;
    lastLogin: true;
  };
}>;

// Staff user with role
export type StaffUserWithRole = Prisma.StaffUserGetPayload<{
  include: {
    role: true;
  };
}>;

// Category with children and product count
export type CategoryWithChildren = Prisma.CategoryGetPayload<{
  include: {
    children: {
      include: {
        _count: {
          select: {
            products: true;
          };
        };
      };
    };
    parent: {
      select: {
        id: true;
        name: true;
        slug: true;
      };
    };
    _count: {
      select: {
        products: true;
      };
    };
  };
}>;

// Activity log with user details
export type ActivityLogWithUser = Prisma.ActivityLogGetPayload<{
  include: {
    staffUser: {
      select: {
        firstName: true;
        lastName: true;
        email: true;
        role: {
          select: {
            roleName: true;
          };
        };
      };
    };
  };
}>;

// ======================== SEARCH AND FILTER TYPES ========================

// Product search filters
export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  onSale?: boolean;
  newProduct?: boolean;
  professionalOnly?: boolean;
  status?: ProductStatus[];
  approvalStatus?: ApprovalStatus[];
  brands?: string[];
  tags?: string[];
  compatibility?: {
    makes?: string[];
    models?: string[];
    years?: string[];
  };
  sortBy?: "name" | "price" | "created" | "updated" | "popularity";
  sortOrder?: "asc" | "desc";
}

// Order search filters
export interface OrderFilters {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  fulfillmentStatus?: FulfillmentStatus[];
  priorityLevel?: OrderPriority[];
  customerId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  search?: string; // Order number, customer name, etc.
  assignedToStaffId?: string;
  sortBy?: "orderDate" | "totalAmount" | "status" | "updated";
  sortOrder?: "asc" | "desc";
}

// Customer search filters
export interface CustomerFilters {
  professionalTier?: ProfessionalTier[];
  customerType?: CustomerType[];
  riskLevel?: RiskLevel[];
  isActive?: boolean;
  hasOrders?: boolean;
  search?: string; // Name, email, company
  registeredFrom?: Date;
  registeredTo?: Date;
  minSpent?: number;
  maxSpent?: number;
  sortBy?: "name" | "email" | "totalSpent" | "created" | "lastLogin";
  sortOrder?: "asc" | "desc";
}

// ======================== PAGINATION TYPES ========================

export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// ======================== API RESPONSE TYPES ========================

// Standard API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

// Error response
export interface ApiError {
  success: false;
  error: string;
  message?: string;
  code?: string;
  details?: any;
  timestamp: string;
}

// ======================== DASHBOARD ANALYTICS TYPES ========================

export interface DashboardStats {
  orders: {
    total: number;
    pending: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    todayCount: number;
    weekGrowth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    monthGrowth: number;
    avgOrderValue: number;
  };
  customers: {
    total: number;
    active: number;
    new: number;
    returning: number;
    professional: number;
    weekGrowth: number;
  };
  products: {
    total: number;
    active: number;
    lowStock: number;
    outOfStock: number;
    featured: number;
  };
  inventory: {
    totalValue: number;
    lowStockAlerts: number;
    topSellingProducts: Array<{
      id: string;
      name: string;
      totalSold: number;
      revenue: number;
    }>;
  };
}

export interface SalesChartData {
  date: string;
  sales: number;
  orders: number;
}

export interface CategoryPerformance {
  categoryId: string;
  categoryName: string;
  productCount: number;
  totalSales: number;
  orderCount: number;
  avgOrderValue: number;
}

// ======================== INVENTORY TYPES ========================

export interface InventoryAlert {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  lowStockThreshold: number;
  status: "low_stock" | "out_of_stock" | "discontinued";
  lastRestocked?: Date;
}

export interface InventoryMovement {
  productId: string;
  type: "sale" | "restock" | "adjustment" | "return";
  quantity: number;
  reason?: string;
  orderId?: string;
  staffUserId?: string;
  timestamp: Date;
}

// ======================== VALIDATION TYPES ========================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ======================== FILE UPLOAD TYPES ========================

export interface FileUploadResult {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  width?: number;
  height?: number;
}

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpeg" | "png" | "webp" | "avif";
}

// ======================== NOTIFICATION TYPES ========================

export interface Notification {
  id: string;
  type: "order" | "customer" | "inventory" | "system" | "review";
  title: string;
  message: string;
  isRead: boolean;
  priority: "low" | "normal" | "high" | "urgent";
  createdAt: Date;
  expiresAt?: Date;
  actionUrl?: string;
  metadata?: any;
}

// ======================== AUDIT TRAIL TYPES ========================

export interface AuditTrailEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: any;
  newValues?: any;
  staffUserId: string;
  staffUserName: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

// ======================== EXPORT TYPES ========================

export interface ExportOptions {
  format: "csv" | "xlsx" | "json";
  fields?: string[];
  filters?: any;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface ExportResult {
  filename: string;
  url: string;
  recordCount: number;
  size: number;
  createdAt: Date;
  expiresAt: Date;
}

// ======================== SYSTEM HEALTH TYPES ========================

export interface SystemHealth {
  database: {
    status: "healthy" | "degraded" | "unhealthy";
    responseTime: number;
    connections: number;
    lastCheck: Date;
  };
  cache: {
    status: "healthy" | "degraded" | "unhealthy";
    hitRate: number;
    memoryUsage: number;
    lastCheck: Date;
  };
  storage: {
    status: "healthy" | "degraded" | "unhealthy";
    usage: number;
    available: number;
    lastCheck: Date;
  };
}

// ======================== CONFIGURATION TYPES ========================

export interface AppConfig {
  database: {
    url: string;
    connectionTimeout: number;
    poolSize: number;
  };
  auth: {
    jwtSecret: string;
    tokenExpiry: string;
    refreshTokenExpiry: string;
  };
  upload: {
    maxSize: number;
    allowedTypes: string[];
    destination: string;
  };
  email: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  payment: {
    stripe: {
      publishableKey: string;
      secretKey: string;
    };
    paypal: {
      clientId: string;
      clientSecret: string;
    };
  };
}
