Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
} = require("./runtime/edge.js");

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.RoleScalarFieldEnum = {
  id: "id",
  roleName: "roleName",
  hierarchyLevel: "hierarchyLevel",
  permissions: "permissions",
  description: "description",
  isActive: "isActive",
  maxUsers: "maxUsers",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.StaffUserScalarFieldEnum = {
  id: "id",
  roleId: "roleId",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  phone: "phone",
  passwordHash: "passwordHash",
  isActive: "isActive",
  emailVerified: "emailVerified",
  twoFactorEnabled: "twoFactorEnabled",
  twoFactorSecret: "twoFactorSecret",
  lastLogin: "lastLogin",
  lastLoginIp: "lastLoginIp",
  loginAttempts: "loginAttempts",
  lockedUntil: "lockedUntil",
  passwordChangedAt: "passwordChangedAt",
  mustChangePassword: "mustChangePassword",
  avatar: "avatar",
  timezone: "timezone",
  language: "language",
  canAccessAdmin: "canAccessAdmin",
  departmentAccess: "departmentAccess",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  createdBy: "createdBy",
  lastModifiedBy: "lastModifiedBy",
};

exports.Prisma.SettingScalarFieldEnum = {
  id: "id",
  settingKey: "settingKey",
  settingValue: "settingValue",
  category: "category",
  subcategory: "subcategory",
  dataType: "dataType",
  isEncrypted: "isEncrypted",
  isPublic: "isPublic",
  displayName: "displayName",
  description: "description",
  defaultValue: "defaultValue",
  validation: "validation",
  sortOrder: "sortOrder",
  isVisible: "isVisible",
  isEditable: "isEditable",
  updatedBy: "updatedBy",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.BannerScalarFieldEnum = {
  id: "id",
  title: "title",
  subtitle: "subtitle",
  description: "description",
  imageUrl: "imageUrl",
  videoUrl: "videoUrl",
  altText: "altText",
  buttonText: "buttonText",
  buttonUrl: "buttonUrl",
  linkTarget: "linkTarget",
  position: "position",
  displayType: "displayType",
  priority: "priority",
  showOnMobile: "showOnMobile",
  showOnTablet: "showOnTablet",
  showOnDesktop: "showOnDesktop",
  backgroundColor: "backgroundColor",
  textColor: "textColor",
  borderColor: "borderColor",
  startDate: "startDate",
  endDate: "endDate",
  isActive: "isActive",
  clickCount: "clickCount",
  viewCount: "viewCount",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  createdBy: "createdBy",
};

exports.Prisma.HeroSlideScalarFieldEnum = {
  id: "id",
  title: "title",
  subtitle: "subtitle",
  description: "description",
  imageUrl: "imageUrl",
  mobileImageUrl: "mobileImageUrl",
  altText: "altText",
  primaryButtonText: "primaryButtonText",
  primaryButtonUrl: "primaryButtonUrl",
  secondaryButtonText: "secondaryButtonText",
  secondaryButtonUrl: "secondaryButtonUrl",
  textPosition: "textPosition",
  overlayOpacity: "overlayOpacity",
  textColor: "textColor",
  animationType: "animationType",
  displayDuration: "displayDuration",
  sortOrder: "sortOrder",
  isActive: "isActive",
  startDate: "startDate",
  endDate: "endDate",
  showOnMobile: "showOnMobile",
  showOnTablet: "showOnTablet",
  showOnDesktop: "showOnDesktop",
  clickCount: "clickCount",
  viewCount: "viewCount",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  createdBy: "createdBy",
};

exports.Prisma.SiteCustomizationScalarFieldEnum = {
  id: "id",
  siteName: "siteName",
  siteDescription: "siteDescription",
  logoUrl: "logoUrl",
  faviconUrl: "faviconUrl",
  primaryColor: "primaryColor",
  secondaryColor: "secondaryColor",
  accentColor: "accentColor",
  backgroundColor: "backgroundColor",
  textColor: "textColor",
  linkColor: "linkColor",
  primaryFont: "primaryFont",
  secondaryFont: "secondaryFont",
  fontSize: "fontSize",
  headerStyle: "headerStyle",
  footerStyle: "footerStyle",
  borderRadius: "borderRadius",
  showSearch: "showSearch",
  showWishlist: "showWishlist",
  showCompare: "showCompare",
  showReviews: "showReviews",
  enableChat: "enableChat",
  enableNewsletter: "enableNewsletter",
  contactEmail: "contactEmail",
  contactPhone: "contactPhone",
  contactAddress: "contactAddress",
  businessHours: "businessHours",
  socialMedia: "socialMedia",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  metaKeywords: "metaKeywords",
  googleAnalytics: "googleAnalytics",
  privacyPolicyUrl: "privacyPolicyUrl",
  termsOfServiceUrl: "termsOfServiceUrl",
  isActive: "isActive",
  updatedAt: "updatedAt",
  updatedBy: "updatedBy",
};

exports.Prisma.ActivityLogScalarFieldEnum = {
  id: "id",
  staffUserId: "staffUserId",
  actionType: "actionType",
  description: "description",
  entityType: "entityType",
  entityId: "entityId",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  metadata: "metadata",
  success: "success",
  errorMessage: "errorMessage",
  timestamp: "timestamp",
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: "id",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  phone: "phone",
  passwordHash: "passwordHash",
  emailVerified: "emailVerified",
  isActive: "isActive",
  professionalTier: "professionalTier",
  discountRate: "discountRate",
  totalOrders: "totalOrders",
  totalSpent: "totalSpent",
  lifetimeValue: "lifetimeValue",
  averageOrderValue: "averageOrderValue",
  preferredPaymentMethod: "preferredPaymentMethod",
  communicationPrefs: "communicationPrefs",
  timezone: "timezone",
  customerType: "customerType",
  riskLevel: "riskLevel",
  notes: "notes",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  lastLogin: "lastLogin",
};

exports.Prisma.AddressScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  firstName: "firstName",
  lastName: "lastName",
  company: "company",
  address1: "address1",
  address2: "address2",
  city: "city",
  state: "state",
  postalCode: "postalCode",
  country: "country",
  phone: "phone",
  type: "type",
  isDefault: "isDefault",
  isValidated: "isValidated",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  description: "description",
  iconClass: "iconClass",
  parentId: "parentId",
  image: "image",
  sortOrder: "sortOrder",
  isActive: "isActive",
  isFeatured: "isFeatured",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  productCount: "productCount",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.ProductScalarFieldEnum = {
  id: "id",
  categoryId: "categoryId",
  name: "name",
  description: "description",
  shortDescription: "shortDescription",
  regularPrice: "regularPrice",
  salePrice: "salePrice",
  costPrice: "costPrice",
  sku: "sku",
  partNumber: "partNumber",
  upc: "upc",
  stockQuantity: "stockQuantity",
  lowStockThreshold: "lowStockThreshold",
  trackInventory: "trackInventory",
  allowBackorders: "allowBackorders",
  professionalOnly: "professionalOnly",
  minimumOrderQuantity: "minimumOrderQuantity",
  status: "status",
  approvalStatus: "approvalStatus",
  featured: "featured",
  onSale: "onSale",
  newProduct: "newProduct",
  metaTitle: "metaTitle",
  metaDescription: "metaDescription",
  tags: "tags",
  weight: "weight",
  dimensions: "dimensions",
  requiresShipping: "requiresShipping",
  shippingClass: "shippingClass",
  version: "version",
  createdBy: "createdBy",
  lastModifiedBy: "lastModifiedBy",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.ProductReviewScalarFieldEnum = {
  id: "id",
  productId: "productId",
  customerId: "customerId",
  rating: "rating",
  title: "title",
  content: "content",
  verified: "verified",
  helpful: "helpful",
  status: "status",
  moderatedBy: "moderatedBy",
  moderatedAt: "moderatedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  orderNumber: "orderNumber",
  status: "status",
  paymentStatus: "paymentStatus",
  fulfillmentStatus: "fulfillmentStatus",
  priorityLevel: "priorityLevel",
  subtotal: "subtotal",
  taxAmount: "taxAmount",
  shippingAmount: "shippingAmount",
  discountAmount: "discountAmount",
  totalAmount: "totalAmount",
  paymentMethod: "paymentMethod",
  paymentReference: "paymentReference",
  shippingAddress: "shippingAddress",
  billingAddress: "billingAddress",
  shippingCarrier: "shippingCarrier",
  shippingMethod: "shippingMethod",
  trackingNumber: "trackingNumber",
  estimatedDelivery: "estimatedDelivery",
  actualDelivery: "actualDelivery",
  assignedToStaffId: "assignedToStaffId",
  internalNotes: "internalNotes",
  customerNotes: "customerNotes",
  cancellationReason: "cancellationReason",
  cancelledAt: "cancelledAt",
  refundAmount: "refundAmount",
  refundReason: "refundReason",
  refundedAt: "refundedAt",
  orderDate: "orderDate",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  productId: "productId",
  quantity: "quantity",
  priceAtPurchase: "priceAtPurchase",
  productNameAtPurchase: "productNameAtPurchase",
  quantityShipped: "quantityShipped",
  quantityRefunded: "quantityRefunded",
};

exports.Prisma.SortOrder = {
  asc: "asc",
  desc: "desc",
};

exports.Prisma.QueryMode = {
  default: "default",
  insensitive: "insensitive",
};
exports.SettingDataType = exports.$Enums.SettingDataType = {
  STRING: "STRING",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  JSON: "JSON",
  EMAIL: "EMAIL",
  URL: "URL",
  PASSWORD: "PASSWORD",
  COLOR: "COLOR",
  IMAGE: "IMAGE",
};

exports.BannerPosition = exports.$Enums.BannerPosition = {
  TOP: "TOP",
  HEADER: "HEADER",
  HERO: "HERO",
  SIDEBAR: "SIDEBAR",
  FOOTER: "FOOTER",
  FLOATING: "FLOATING",
  BETWEEN_CONTENT: "BETWEEN_CONTENT",
};

exports.BannerType = exports.$Enums.BannerType = {
  INFO: "INFO",
  PROMOTION: "PROMOTION",
  ALERT: "ALERT",
  ANNOUNCEMENT: "ANNOUNCEMENT",
  CTA: "CTA",
};

exports.SlideTextPosition = exports.$Enums.SlideTextPosition = {
  CENTER_LEFT: "CENTER_LEFT",
  CENTER_RIGHT: "CENTER_RIGHT",
  CENTER_CENTER: "CENTER_CENTER",
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
};

exports.SlideAnimation = exports.$Enums.SlideAnimation = {
  FADE: "FADE",
  SLIDE_LEFT: "SLIDE_LEFT",
  SLIDE_RIGHT: "SLIDE_RIGHT",
  SLIDE_UP: "SLIDE_UP",
  SLIDE_DOWN: "SLIDE_DOWN",
  ZOOM_IN: "ZOOM_IN",
  ZOOM_OUT: "ZOOM_OUT",
};

exports.ProfessionalTier = exports.$Enums.ProfessionalTier = {
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
};

exports.CustomerType = exports.$Enums.CustomerType = {
  RETAIL: "RETAIL",
  BUSINESS: "BUSINESS",
  DISTRIBUTOR: "DISTRIBUTOR",
  GOVERNMENT: "GOVERNMENT",
};

exports.RiskLevel = exports.$Enums.RiskLevel = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  BLOCKED: "BLOCKED",
};

exports.AddressType = exports.$Enums.AddressType = {
  BILLING: "BILLING",
  SHIPPING: "SHIPPING",
  BOTH: "BOTH",
};

exports.ProductStatus = exports.$Enums.ProductStatus = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DISCONTINUED: "DISCONTINUED",
  OUT_OF_STOCK: "OUT_OF_STOCK",
};

exports.ApprovalStatus = exports.$Enums.ApprovalStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
};

exports.ReviewStatus = exports.$Enums.ReviewStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SPAM: "SPAM",
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
  ON_HOLD: "ON_HOLD",
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: "PENDING",
  AUTHORIZED: "AUTHORIZED",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
  CANCELLED: "CANCELLED",
};

exports.FulfillmentStatus = exports.$Enums.FulfillmentStatus = {
  UNFULFILLED: "UNFULFILLED",
  PARTIALLY_FULFILLED: "PARTIALLY_FULFILLED",
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED",
};

exports.OrderPriority = exports.$Enums.OrderPriority = {
  LOW: "LOW",
  NORMAL: "NORMAL",
  HIGH: "HIGH",
  URGENT: "URGENT",
};

exports.Prisma.ModelName = {
  Role: "Role",
  StaffUser: "StaffUser",
  Setting: "Setting",
  Banner: "Banner",
  HeroSlide: "HeroSlide",
  SiteCustomization: "SiteCustomization",
  ActivityLog: "ActivityLog",
  Customer: "Customer",
  Address: "Address",
  Category: "Category",
  Product: "Product",
  ProductReview: "ProductReview",
  Order: "Order",
  OrderItem: "OrderItem",
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client-js",
    },
    output: {
      value:
        "E:\\Storage\\Downloads\\Zen\\1-Dev projects\\automotive-locksmith-platform\\test\\automotive-salah\\packages\\database\\src\\generated",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: "windows",
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath:
      "E:\\Storage\\Downloads\\Zen\\1-Dev projects\\automotive-locksmith-platform\\test\\automotive-salah\\packages\\database\\prisma\\schema.prisma",
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
    schemaEnvPath: "../../.env",
  },
  relativePath: "../../prisma",
  clientVersion: "5.22.0",
  engineVersion: "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  datasourceNames: ["db"],
  activeProvider: "mongodb",
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: "DATABASE_URL",
        value: null,
      },
    },
  },
  inlineSchema:
    '// filepath: packages/database/prisma/schema.prisma\n// Complete Automotive Locksmith Platform Database Schema\n// MongoDB with Prisma - Production Ready\n\ngenerator client {\n  provider = "prisma-client-js"\n  output   = "../src/generated"\n}\n\ndatasource db {\n  provider = "mongodb"\n  url      = env("DATABASE_URL")\n}\n\n// ======================== RBAC SYSTEM ========================\n// 4-Tier Role-Based Access Control for Admin Dashboard\n\nmodel Role {\n  id             String @id @default(auto()) @map("_id") @db.ObjectId\n  roleName       String @unique // "Super Admin", "Admin", "Store Manager", "Editor"\n  hierarchyLevel Int    @unique // 1=Super Admin, 2=Admin, 3=Store Manager, 4=Editor\n\n  // Permissions object - detailed control over what each role can do\n  permissions Json // { "products": { "create": true, "read": true, "update": true, "delete": false }, ... }\n\n  // Role settings\n  description String?\n  isActive    Boolean @default(true)\n  maxUsers    Int? // Optional limit on users with this role\n\n  // Audit\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  staffUsers StaffUser[]\n\n  @@map("roles")\n}\n\nmodel StaffUser {\n  id     String @id @default(auto()) @map("_id") @db.ObjectId\n  roleId String @db.ObjectId\n\n  // Basic Info\n  firstName String\n  lastName  String\n  email     String  @unique\n  phone     String?\n\n  // Authentication\n  passwordHash  String\n  isActive      Boolean @default(true)\n  emailVerified Boolean @default(false)\n\n  // Security Features\n  twoFactorEnabled Boolean   @default(false)\n  twoFactorSecret  String?\n  lastLogin        DateTime?\n  lastLoginIp      String?\n  loginAttempts    Int       @default(0)\n  lockedUntil      DateTime?\n\n  // Password Policy\n  passwordChangedAt  DateTime @default(now())\n  mustChangePassword Boolean  @default(true)\n\n  // Profile\n  avatar   String?\n  timezone String  @default("UTC")\n  language String  @default("en")\n\n  // Permissions & Access\n  canAccessAdmin   Boolean  @default(true)\n  departmentAccess String[] // ["products", "orders", "customers"]\n\n  // Audit\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  createdBy      String?  @db.ObjectId\n  lastModifiedBy String?  @db.ObjectId\n\n  // Relations\n  role         Role          @relation(fields: [roleId], references: [id])\n  activityLogs ActivityLog[]\n\n  @@map("staff_users")\n}\n\n// ======================== SETTINGS MANAGEMENT ========================\n// Global application configuration with categories\n\nmodel Setting {\n  id           String @id @default(auto()) @map("_id") @db.ObjectId\n  settingKey   String @unique // "store_name", "stripe_api_key", "default_currency"\n  settingValue Json // Flexible value storage (string, number, boolean, object)\n\n  // Organization\n  category    String // "general", "payment", "shipping", "email", "security", "appearance"\n  subcategory String? // Further grouping within categories\n\n  // Data handling\n  dataType    SettingDataType @default(STRING)\n  isEncrypted Boolean         @default(false) // For sensitive data like API keys\n  isPublic    Boolean         @default(false) // Can be exposed to frontend\n\n  // Metadata\n  displayName  String? // Human-readable name for admin UI\n  description  String? // Help text for admin users\n  defaultValue Json? // Default value for this setting\n  validation   Json? // Validation rules (min, max, regex, etc.)\n\n  // Ordering & Display\n  sortOrder  Int     @default(0)\n  isVisible  Boolean @default(true) // Show in admin UI\n  isEditable Boolean @default(true) // Can be changed by admins\n\n  // Audit\n  updatedBy String?  @db.ObjectId\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("settings")\n}\n\nenum SettingDataType {\n  STRING\n  NUMBER\n  BOOLEAN\n  JSON\n  EMAIL\n  URL\n  PASSWORD\n  COLOR\n  IMAGE\n}\n\n// ======================== CONTENT MANAGEMENT ========================\n// Homepage banners and promotional content\n\nmodel Banner {\n  id String @id @default(auto()) @map("_id") @db.ObjectId\n\n  // Content\n  title       String\n  subtitle    String?\n  description String?\n\n  // Media\n  imageUrl String?\n  videoUrl String?\n  altText  String?\n\n  // Action\n  buttonText String?\n  buttonUrl  String?\n  linkTarget String  @default("_self") // "_self" or "_blank"\n\n  // Placement & Display\n  position    BannerPosition @default(TOP)\n  displayType BannerType     @default(INFO)\n  priority    Int            @default(0) // Higher priority = shown first\n\n  // Responsive settings\n  showOnMobile  Boolean @default(true)\n  showOnTablet  Boolean @default(true)\n  showOnDesktop Boolean @default(true)\n\n  // Styling\n  backgroundColor String? // Hex color\n  textColor       String? // Hex color\n  borderColor     String? // Hex color\n\n  // Scheduling\n  startDate DateTime? // When banner becomes active\n  endDate   DateTime? // When banner expires\n\n  // Status & Analytics\n  isActive   Boolean @default(true)\n  clickCount Int     @default(0) // Track banner clicks\n  viewCount  Int     @default(0) // Track banner views\n\n  // SEO\n  metaTitle       String?\n  metaDescription String?\n\n  // Audit\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  createdBy String?  @db.ObjectId\n\n  @@map("banners")\n}\n\nenum BannerPosition {\n  TOP // Top of page\n  HEADER // In header area\n  HERO // Hero section\n  SIDEBAR // Sidebar\n  FOOTER // Footer area\n  FLOATING // Floating/overlay\n  BETWEEN_CONTENT // Between content sections\n}\n\nenum BannerType {\n  INFO // Informational\n  PROMOTION // Sales/discount\n  ALERT // Important notice\n  ANNOUNCEMENT // General announcement\n  CTA // Call to action\n}\n\n// ======================== HERO SLIDER ========================\n// Homepage hero carousel/slider management\n\nmodel HeroSlide {\n  id String @id @default(auto()) @map("_id") @db.ObjectId\n\n  // Content\n  title       String\n  subtitle    String?\n  description String?\n\n  // Media\n  imageUrl       String // Required background image\n  mobileImageUrl String? // Optional mobile-specific image\n  altText        String?\n\n  // Call to Action\n  primaryButtonText   String?\n  primaryButtonUrl    String?\n  secondaryButtonText String?\n  secondaryButtonUrl  String?\n\n  // Styling & Layout\n  textPosition   SlideTextPosition @default(CENTER_LEFT)\n  overlayOpacity Float             @default(0.3) // Dark overlay over image (0-1)\n  textColor      String            @default("#ffffff")\n\n  // Animation\n  animationType   SlideAnimation @default(FADE)\n  displayDuration Int            @default(5000) // Milliseconds\n\n  // Display Settings\n  sortOrder Int     @default(0)\n  isActive  Boolean @default(true)\n\n  // Scheduling\n  startDate DateTime? // When slide becomes active\n  endDate   DateTime? // When slide expires\n\n  // Responsive\n  showOnMobile  Boolean @default(true)\n  showOnTablet  Boolean @default(true)\n  showOnDesktop Boolean @default(true)\n\n  // Analytics\n  clickCount Int @default(0)\n  viewCount  Int @default(0)\n\n  // SEO\n  metaTitle       String?\n  metaDescription String?\n\n  // Audit\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  createdBy String?  @db.ObjectId\n\n  @@map("hero_slides")\n}\n\nenum SlideTextPosition {\n  CENTER_LEFT\n  CENTER_RIGHT\n  CENTER_CENTER\n  TOP_LEFT\n  TOP_RIGHT\n  BOTTOM_LEFT\n  BOTTOM_RIGHT\n}\n\nenum SlideAnimation {\n  FADE\n  SLIDE_LEFT\n  SLIDE_RIGHT\n  SLIDE_UP\n  SLIDE_DOWN\n  ZOOM_IN\n  ZOOM_OUT\n}\n\n// ======================== SITE CUSTOMIZATION ========================\n// Visual branding and theme settings\n\nmodel SiteCustomization {\n  id String @id @default(auto()) @map("_id") @db.ObjectId\n\n  // Branding\n  siteName        String  @default("ULKS Automotive Locksmith")\n  siteDescription String?\n  logoUrl         String?\n  faviconUrl      String?\n\n  // Color Scheme\n  primaryColor    String @default("#1f2937") // Main brand color\n  secondaryColor  String @default("#6b7280") // Accent color\n  accentColor     String @default("#3b82f6") // Highlight color\n  backgroundColor String @default("#ffffff") // Page background\n  textColor       String @default("#111827") // Main text\n  linkColor       String @default("#2563eb") // Links\n\n  // Typography\n  primaryFont   String @default("Inter") // Main font family\n  secondaryFont String @default("Inter") // Heading font family\n  fontSize      String @default("16px") // Base font size\n\n  // Layout Settings\n  headerStyle  String @default("modern") // Header layout style\n  footerStyle  String @default("detailed") // Footer layout style\n  borderRadius String @default("8px") // Button/card border radius\n\n  // Feature Toggles\n  showSearch       Boolean @default(true)\n  showWishlist     Boolean @default(true)\n  showCompare      Boolean @default(true)\n  showReviews      Boolean @default(true)\n  enableChat       Boolean @default(false)\n  enableNewsletter Boolean @default(true)\n\n  // Contact Information\n  contactEmail   String?\n  contactPhone   String?\n  contactAddress Json? // Full address object\n  businessHours  Json? // Opening hours\n\n  // Social Media\n  socialMedia Json? // { "facebook": "url", "twitter": "url", ... }\n\n  // SEO\n  metaTitle       String?\n  metaDescription String?\n  metaKeywords    String?\n  googleAnalytics String? // GA tracking ID\n\n  // Legal\n  privacyPolicyUrl  String?\n  termsOfServiceUrl String?\n\n  // Status\n  isActive Boolean @default(true)\n\n  // Audit\n  updatedAt DateTime @updatedAt\n  updatedBy String?  @db.ObjectId\n\n  @@map("site_customization")\n}\n\n// ======================== EXISTING MODELS (KEEP AS IS) ========================\n// Activity logging for admin actions audit trail\n\nmodel ActivityLog {\n  id          String @id @default(auto()) @map("_id") @db.ObjectId\n  staffUserId String @db.ObjectId\n\n  // Action details\n  actionType  String // "PRODUCT_CREATE", "ORDER_UPDATE", "USER_DELETE", etc.\n  description String // Human-readable description\n  entityType  String? // "Product", "Order", "Customer", "User"\n  entityId    String? // ID of the affected entity\n\n  // Context\n  ipAddress String?\n  userAgent String?\n  metadata  Json? // Additional context data\n\n  // Results\n  success      Boolean @default(true)\n  errorMessage String?\n\n  // Timestamp\n  timestamp DateTime @default(now())\n\n  // Relations\n  staffUser StaffUser @relation(fields: [staffUserId], references: [id])\n\n  @@map("activity_logs")\n}\n\n// ======================== CUSTOMERS ========================\nmodel Customer {\n  id String @id @default(auto()) @map("_id") @db.ObjectId\n\n  // Basic Info\n  firstName String\n  lastName  String\n  email     String  @unique\n  phone     String?\n\n  // Authentication\n  passwordHash  String\n  emailVerified Boolean @default(false)\n  isActive      Boolean @default(true)\n\n  // Professional Details (B2B features)\n  professionalTier ProfessionalTier @default(BRONZE)\n  discountRate     Float            @default(0) // Percentage discount (0-100)\n  businessInfo     BusinessInfo? // Embedded business information\n\n  // Customer Analytics\n  totalOrders       Int   @default(0)\n  totalSpent        Float @default(0)\n  lifetimeValue     Float @default(0)\n  averageOrderValue Float @default(0)\n\n  // Preferences\n  preferredPaymentMethod String?\n  communicationPrefs     Json? // Email, SMS preferences\n  timezone               String  @default("UTC")\n\n  // Status & Segmentation\n  customerType CustomerType @default(RETAIL)\n  riskLevel    RiskLevel    @default(LOW)\n  notes        String? // Internal notes\n\n  // Audit\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  lastLogin DateTime?\n\n  // Relations\n  addresses Address[]\n  orders    Order[]\n  reviews   ProductReview[]\n\n  @@map("customers")\n}\n\n// Business information for B2B customers\ntype BusinessInfo {\n  companyName      String\n  taxId            String? // Business tax ID\n  licenseNumber    String? // Professional license\n  website          String?\n  verified         Boolean  @default(false)\n  verificationDocs String[] // Document URLs\n  yearEstablished  Int?\n  employeeCount    String? // "1-10", "11-50", etc.\n}\n\nenum ProfessionalTier {\n  BRONZE // Basic discount\n  SILVER // Better discount\n  GOLD // Great discount  \n  PLATINUM // Best discount\n}\n\nenum CustomerType {\n  RETAIL // Individual customers\n  BUSINESS // Business customers\n  DISTRIBUTOR // Distributors/resellers\n  GOVERNMENT // Government contracts\n}\n\nenum RiskLevel {\n  LOW\n  MEDIUM\n  HIGH\n  BLOCKED\n}\n\n// ======================== ADDRESSES ========================\nmodel Address {\n  id         String @id @default(auto()) @map("_id") @db.ObjectId\n  customerId String @db.ObjectId\n\n  // Address fields\n  firstName  String?\n  lastName   String?\n  company    String?\n  address1   String\n  address2   String?\n  city       String\n  state      String\n  postalCode String\n  country    String  @default("US")\n  phone      String?\n\n  // Address type and preferences\n  type      AddressType @default(SHIPPING)\n  isDefault Boolean     @default(false)\n\n  // Validation\n  isValidated Boolean @default(false)\n\n  // Timestamps\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  @@map("addresses")\n}\n\nenum AddressType {\n  BILLING\n  SHIPPING\n  BOTH\n}\n\n// ======================== CATEGORIES ========================\nmodel Category {\n  id String @id @default(auto()) @map("_id") @db.ObjectId\n\n  // Category Info\n  name        String  @unique // "Programming Tools"\n  slug        String  @unique // "programming-tools"\n  description String?\n  iconClass   String? // FontAwesome icon class\n\n  // Hierarchy\n  parentId String?    @db.ObjectId\n  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)\n  children Category[] @relation("CategoryHierarchy")\n\n  // Display & Status\n  image      String? // Category image\n  sortOrder  Int     @default(0)\n  isActive   Boolean @default(true)\n  isFeatured Boolean @default(false)\n\n  // SEO\n  metaTitle       String?\n  metaDescription String?\n\n  // Statistics\n  productCount Int @default(0) // Computed field\n\n  // Timestamps\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  products Product[]\n\n  @@map("categories")\n}\n\n// ======================== PRODUCTS ========================\nmodel Product {\n  id         String @id @default(auto()) @map("_id") @db.ObjectId\n  categoryId String @db.ObjectId\n\n  // Basic Product Info\n  name             String // Product name\n  description      String // Detailed description\n  shortDescription String? // Brief description for cards\n\n  // Pricing\n  regularPrice Float // Regular price\n  salePrice    Float? // Sale price (optional)\n  costPrice    Float? // Your cost (for profit calculation)\n\n  // Product Codes & Identification\n  sku        String  @unique // Stock keeping unit\n  partNumber String? // Your internal part number\n  upc        String? // Universal Product Code\n\n  // Inventory Management\n  stockQuantity     Int     @default(0)\n  lowStockThreshold Int     @default(5)\n  trackInventory    Boolean @default(true)\n  allowBackorders   Boolean @default(false)\n\n  // Professional Features\n  professionalOnly     Boolean @default(false) // B2B only product\n  minimumOrderQuantity Int     @default(1)\n\n  // Product Status & Workflow\n  status         ProductStatus  @default(DRAFT)\n  approvalStatus ApprovalStatus @default(PENDING)\n\n  // Marketing & SEO\n  featured        Boolean  @default(false)\n  onSale          Boolean  @default(false)\n  newProduct      Boolean  @default(false)\n  metaTitle       String?\n  metaDescription String?\n  tags            String[] // Search tags\n\n  // Physical Properties\n  weight     Float? // Weight in pounds\n  dimensions Json? // { "length": 10, "width": 5, "height": 3 }\n\n  // Shipping\n  requiresShipping Boolean @default(true)\n  shippingClass    String? // "standard", "oversized", "hazmat"\n\n  // Vehicle Compatibility (Automotive specific)\n  vehicleCompatibility VehicleCompatibility?\n\n  // Audit Trail\n  version        Int      @default(1)\n  createdBy      String?  @db.ObjectId\n  lastModifiedBy String?  @db.ObjectId\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  // Relations\n  category   Category        @relation(fields: [categoryId], references: [id])\n  reviews    ProductReview[]\n  orderItems OrderItem[]\n\n  @@map("products")\n}\n\n// Vehicle compatibility for automotive products\ntype VehicleCompatibility {\n  makes         String[] // ["BMW", "Mercedes", "Audi"]\n  models        String[] // ["3 Series", "C-Class", "A4"]\n  years         String[] // ["2015-2023", "2018+"]\n  engineTypes   String[] // ["Gasoline", "Diesel", "Hybrid"]\n  transmissions String[] // ["Manual", "Automatic"]\n  notes         String? // Additional compatibility notes\n}\n\nenum ProductStatus {\n  DRAFT // Being created/edited\n  PENDING // Awaiting approval\n  APPROVED // Ready for sale\n  ACTIVE // Currently selling\n  INACTIVE // Temporarily disabled\n  DISCONTINUED // No longer available\n  OUT_OF_STOCK // Temporarily out of stock\n}\n\nenum ApprovalStatus {\n  PENDING // Waiting for review\n  APPROVED // Approved for sale\n  REJECTED // Rejected, needs changes\n  CHANGES_REQUESTED // Minor changes needed\n}\n\n// ======================== PRODUCT REVIEWS ========================\nmodel ProductReview {\n  id         String @id @default(auto()) @map("_id") @db.ObjectId\n  productId  String @db.ObjectId\n  customerId String @db.ObjectId\n\n  // Review Content\n  rating   Int // 1-5 stars\n  title    String // Review title\n  content  String // Review text\n  verified Boolean @default(false) // Verified purchase\n  helpful  Int     @default(0) // Helpful votes\n\n  // Status\n  status      ReviewStatus @default(PENDING)\n  moderatedBy String?      @db.ObjectId\n  moderatedAt DateTime?\n\n  // Relations\n  product  Product  @relation(fields: [productId], references: [id], onDelete: Cascade)\n  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)\n\n  // Timestamps\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("product_reviews")\n}\n\nenum ReviewStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  SPAM\n}\n\n// ======================== ORDERS ========================\nmodel Order {\n  id         String @id @default(auto()) @map("_id") @db.ObjectId\n  customerId String @db.ObjectId\n\n  // Order Identification\n  orderNumber String @unique // Human-readable order number\n\n  // Order Status Management\n  status            OrderStatus       @default(PENDING)\n  paymentStatus     PaymentStatus     @default(PENDING)\n  fulfillmentStatus FulfillmentStatus @default(UNFULFILLED)\n  priorityLevel     OrderPriority     @default(NORMAL)\n\n  // Financial Details\n  subtotal       Float\n  taxAmount      Float @default(0)\n  shippingAmount Float @default(0)\n  discountAmount Float @default(0)\n  totalAmount    Float\n\n  // Payment Information\n  paymentMethod    String? // "stripe", "paypal", "authorize_net"\n  paymentReference String? // Payment gateway transaction ID\n\n  // Addresses (stored as JSON for flexibility)\n  shippingAddress Json\n  billingAddress  Json\n\n  // Shipping Information\n  shippingCarrier   String? // "UPS", "FedEx", "USPS"\n  shippingMethod    String? // "Ground", "Express", "Overnight"\n  trackingNumber    String?\n  estimatedDelivery DateTime?\n  actualDelivery    DateTime?\n\n  // Admin Management\n  assignedToStaffId String? @db.ObjectId\n  internalNotes     String?\n  customerNotes     String?\n\n  // Cancellation & Refunds\n  cancellationReason String?\n  cancelledAt        DateTime?\n  refundAmount       Float?\n  refundReason       String?\n  refundedAt         DateTime?\n\n  // Timestamps\n  orderDate DateTime @default(now())\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  customer   Customer    @relation(fields: [customerId], references: [id])\n  orderItems OrderItem[]\n\n  @@map("orders")\n}\n\nenum OrderStatus {\n  PENDING // Order placed, payment pending\n  CONFIRMED // Payment confirmed\n  PROCESSING // Being prepared\n  SHIPPED // Shipped to customer\n  DELIVERED // Delivered to customer\n  CANCELLED // Cancelled by customer/admin\n  REFUNDED // Refunded\n  ON_HOLD // Admin hold\n}\n\nenum PaymentStatus {\n  PENDING // Payment not processed\n  AUTHORIZED // Payment authorized but not captured\n  PAID // Payment successful\n  FAILED // Payment failed\n  REFUNDED // Payment refunded\n  PARTIALLY_REFUNDED // Partial refund\n  CANCELLED // Payment cancelled\n}\n\nenum FulfillmentStatus {\n  UNFULFILLED // Not shipped\n  PARTIALLY_FULFILLED // Some items shipped\n  FULFILLED // All items shipped\n  CANCELLED // Fulfillment cancelled\n  RETURNED // Items returned\n}\n\nenum OrderPriority {\n  LOW\n  NORMAL\n  HIGH\n  URGENT\n}\n\n// ======================== ORDER ITEMS ========================\nmodel OrderItem {\n  id        String @id @default(auto()) @map("_id") @db.ObjectId\n  orderId   String @db.ObjectId\n  productId String @db.ObjectId\n\n  // Item Details\n  quantity              Int\n  priceAtPurchase       Float // Price when ordered (for historical accuracy)\n  productNameAtPurchase String // Product name when ordered\n\n  // Fulfillment\n  quantityShipped  Int @default(0)\n  quantityRefunded Int @default(0)\n\n  // Relations\n  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  product Product @relation(fields: [productId], references: [id])\n\n  @@map("order_items")\n}\n',
  inlineSchemaHash:
    "be1a389ff225cf0c9f8da8b8008c07dab74325bcec4adf0b5c42ecb9ce7a53f4",
  copyEngine: true,
};
config.dirname = "/";

config.runtimeDataModel = JSON.parse(
  '{"models":{"Role":{"dbName":"roles","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"roleName","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"hierarchyLevel","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"permissions","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"maxUsers","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"staffUsers","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"StaffUser","relationName":"RoleToStaffUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"StaffUser":{"dbName":"staff_users","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"roleId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"passwordHash","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"emailVerified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"twoFactorEnabled","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"twoFactorSecret","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastLogin","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"lastLoginIp","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"loginAttempts","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"lockedUntil","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"passwordChangedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"mustChangePassword","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"avatar","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"timezone","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"UTC","isGenerated":false,"isUpdatedAt":false},{"name":"language","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"en","isGenerated":false,"isUpdatedAt":false},{"name":"canAccessAdmin","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"departmentAccess","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastModifiedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Role","relationName":"RoleToStaffUser","relationFromFields":["roleId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"activityLogs","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ActivityLog","relationName":"ActivityLogToStaffUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Setting":{"dbName":"settings","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"settingKey","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"settingValue","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"subcategory","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"dataType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"SettingDataType","default":"STRING","isGenerated":false,"isUpdatedAt":false},{"name":"isEncrypted","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"isPublic","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"displayName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"defaultValue","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"validation","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"sortOrder","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"isVisible","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"isEditable","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Banner":{"dbName":"banners","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"subtitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"imageUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"videoUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"altText","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"buttonText","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"buttonUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"linkTarget","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"_self","isGenerated":false,"isUpdatedAt":false},{"name":"position","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"BannerPosition","default":"TOP","isGenerated":false,"isUpdatedAt":false},{"name":"displayType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"BannerType","default":"INFO","isGenerated":false,"isUpdatedAt":false},{"name":"priority","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"showOnMobile","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showOnTablet","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showOnDesktop","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"backgroundColor","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"textColor","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"borderColor","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"startDate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"endDate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"clickCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"viewCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"metaTitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metaDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"HeroSlide":{"dbName":"hero_slides","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"subtitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"imageUrl","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"mobileImageUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"altText","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"primaryButtonText","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"primaryButtonUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"secondaryButtonText","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"secondaryButtonUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"textPosition","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"SlideTextPosition","default":"CENTER_LEFT","isGenerated":false,"isUpdatedAt":false},{"name":"overlayOpacity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0.30000000000000004,"isGenerated":false,"isUpdatedAt":false},{"name":"textColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#ffffff","isGenerated":false,"isUpdatedAt":false},{"name":"animationType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"SlideAnimation","default":"FADE","isGenerated":false,"isUpdatedAt":false},{"name":"displayDuration","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":5000,"isGenerated":false,"isUpdatedAt":false},{"name":"sortOrder","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"startDate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"endDate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"showOnMobile","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showOnTablet","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showOnDesktop","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"clickCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"viewCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"metaTitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metaDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"SiteCustomization":{"dbName":"site_customization","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"siteName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"ULKS Automotive Locksmith","isGenerated":false,"isUpdatedAt":false},{"name":"siteDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"logoUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"faviconUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"primaryColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#1f2937","isGenerated":false,"isUpdatedAt":false},{"name":"secondaryColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#6b7280","isGenerated":false,"isUpdatedAt":false},{"name":"accentColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#3b82f6","isGenerated":false,"isUpdatedAt":false},{"name":"backgroundColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#ffffff","isGenerated":false,"isUpdatedAt":false},{"name":"textColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#111827","isGenerated":false,"isUpdatedAt":false},{"name":"linkColor","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"#2563eb","isGenerated":false,"isUpdatedAt":false},{"name":"primaryFont","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"Inter","isGenerated":false,"isUpdatedAt":false},{"name":"secondaryFont","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"Inter","isGenerated":false,"isUpdatedAt":false},{"name":"fontSize","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"16px","isGenerated":false,"isUpdatedAt":false},{"name":"headerStyle","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"modern","isGenerated":false,"isUpdatedAt":false},{"name":"footerStyle","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"detailed","isGenerated":false,"isUpdatedAt":false},{"name":"borderRadius","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"8px","isGenerated":false,"isUpdatedAt":false},{"name":"showSearch","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showWishlist","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showCompare","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"showReviews","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"enableChat","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"enableNewsletter","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"contactEmail","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"contactPhone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"contactAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"businessHours","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"socialMedia","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"metaTitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metaDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metaKeywords","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"googleAnalytics","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"privacyPolicyUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"termsOfServiceUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"updatedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ActivityLog":{"dbName":"activity_logs","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"staffUserId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"actionType","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"entityType","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"entityId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"ipAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"userAgent","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metadata","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"success","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"errorMessage","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"timestamp","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"staffUser","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"StaffUser","relationName":"ActivityLogToStaffUser","relationFromFields":["staffUserId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Customer":{"dbName":"customers","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"passwordHash","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"emailVerified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"professionalTier","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProfessionalTier","default":"BRONZE","isGenerated":false,"isUpdatedAt":false},{"name":"discountRate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"businessInfo","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BusinessInfo","isGenerated":false,"isUpdatedAt":false},{"name":"totalOrders","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalSpent","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"lifetimeValue","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"averageOrderValue","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"preferredPaymentMethod","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"communicationPrefs","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"timezone","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"UTC","isGenerated":false,"isUpdatedAt":false},{"name":"customerType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"CustomerType","default":"RETAIL","isGenerated":false,"isUpdatedAt":false},{"name":"riskLevel","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"RiskLevel","default":"LOW","isGenerated":false,"isUpdatedAt":false},{"name":"notes","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"lastLogin","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"addresses","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Address","relationName":"AddressToCustomer","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"orders","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","relationName":"CustomerToOrder","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"reviews","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductReview","relationName":"CustomerToProductReview","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Address":{"dbName":"addresses","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"customerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"company","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"address1","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"address2","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"state","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"postalCode","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":"US","isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AddressType","default":"SHIPPING","isGenerated":false,"isUpdatedAt":false},{"name":"isDefault","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"isValidated","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"customer","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Customer","relationName":"AddressToCustomer","relationFromFields":["customerId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Category":{"dbName":"categories","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"slug","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"iconClass","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"parentId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"parent","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryHierarchy","relationFromFields":["parentId"],"relationToFields":["id"],"relationOnDelete":"NoAction","isGenerated":false,"isUpdatedAt":false},{"name":"children","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryHierarchy","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"sortOrder","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"isActive","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"isFeatured","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"metaTitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metaDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"productCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"products","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"CategoryToProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Product":{"dbName":"products","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"categoryId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"shortDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"regularPrice","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"salePrice","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"costPrice","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"sku","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"partNumber","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"upc","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"stockQuantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"lowStockThreshold","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":5,"isGenerated":false,"isUpdatedAt":false},{"name":"trackInventory","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"allowBackorders","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"professionalOnly","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"minimumOrderQuantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":1,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProductStatus","default":"DRAFT","isGenerated":false,"isUpdatedAt":false},{"name":"approvalStatus","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ApprovalStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"featured","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"onSale","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"newProduct","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"metaTitle","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"metaDescription","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"tags","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"weight","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"dimensions","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"requiresShipping","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"shippingClass","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"vehicleCompatibility","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"VehicleCompatibility","isGenerated":false,"isUpdatedAt":false},{"name":"version","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":1,"isGenerated":false,"isUpdatedAt":false},{"name":"createdBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"lastModifiedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"category","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Category","relationName":"CategoryToProduct","relationFromFields":["categoryId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"reviews","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ProductReview","relationName":"ProductToProductReview","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"orderItems","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderItem","relationName":"OrderItemToProduct","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ProductReview":{"dbName":"product_reviews","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"productId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"customerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"rating","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"verified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"helpful","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ReviewStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"moderatedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"moderatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"ProductToProductReview","relationFromFields":["productId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"customer","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Customer","relationName":"CustomerToProductReview","relationFromFields":["customerId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Order":{"dbName":"orders","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"customerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"orderNumber","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"OrderStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"paymentStatus","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"PaymentStatus","default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"fulfillmentStatus","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"FulfillmentStatus","default":"UNFULFILLED","isGenerated":false,"isUpdatedAt":false},{"name":"priorityLevel","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"OrderPriority","default":"NORMAL","isGenerated":false,"isUpdatedAt":false},{"name":"subtotal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"taxAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"shippingAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"discountAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"paymentMethod","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"paymentReference","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"shippingAddress","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"billingAddress","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Json","isGenerated":false,"isUpdatedAt":false},{"name":"shippingCarrier","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"shippingMethod","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"trackingNumber","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"estimatedDelivery","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"actualDelivery","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"assignedToStaffId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"internalNotes","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"customerNotes","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"cancellationReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"cancelledAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"refundAmount","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"refundReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"refundedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":false},{"name":"orderDate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","isGenerated":false,"isUpdatedAt":true},{"name":"customer","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Customer","relationName":"CustomerToOrder","relationFromFields":["customerId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"orderItems","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"OrderItem","relationName":"OrderToOrderItem","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"OrderItem":{"dbName":"order_items","fields":[{"name":"id","dbName":"_id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","default":{"name":"auto","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"orderId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"productId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"quantity","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","isGenerated":false,"isUpdatedAt":false},{"name":"priceAtPurchase","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","isGenerated":false,"isUpdatedAt":false},{"name":"productNameAtPurchase","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"quantityShipped","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"quantityRefunded","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"order","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Order","relationName":"OrderToOrderItem","relationFromFields":["orderId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"product","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Product","relationName":"OrderItemToProduct","relationFromFields":["productId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"SettingDataType":{"values":[{"name":"STRING","dbName":null},{"name":"NUMBER","dbName":null},{"name":"BOOLEAN","dbName":null},{"name":"JSON","dbName":null},{"name":"EMAIL","dbName":null},{"name":"URL","dbName":null},{"name":"PASSWORD","dbName":null},{"name":"COLOR","dbName":null},{"name":"IMAGE","dbName":null}],"dbName":null},"BannerPosition":{"values":[{"name":"TOP","dbName":null},{"name":"HEADER","dbName":null},{"name":"HERO","dbName":null},{"name":"SIDEBAR","dbName":null},{"name":"FOOTER","dbName":null},{"name":"FLOATING","dbName":null},{"name":"BETWEEN_CONTENT","dbName":null}],"dbName":null},"BannerType":{"values":[{"name":"INFO","dbName":null},{"name":"PROMOTION","dbName":null},{"name":"ALERT","dbName":null},{"name":"ANNOUNCEMENT","dbName":null},{"name":"CTA","dbName":null}],"dbName":null},"SlideTextPosition":{"values":[{"name":"CENTER_LEFT","dbName":null},{"name":"CENTER_RIGHT","dbName":null},{"name":"CENTER_CENTER","dbName":null},{"name":"TOP_LEFT","dbName":null},{"name":"TOP_RIGHT","dbName":null},{"name":"BOTTOM_LEFT","dbName":null},{"name":"BOTTOM_RIGHT","dbName":null}],"dbName":null},"SlideAnimation":{"values":[{"name":"FADE","dbName":null},{"name":"SLIDE_LEFT","dbName":null},{"name":"SLIDE_RIGHT","dbName":null},{"name":"SLIDE_UP","dbName":null},{"name":"SLIDE_DOWN","dbName":null},{"name":"ZOOM_IN","dbName":null},{"name":"ZOOM_OUT","dbName":null}],"dbName":null},"ProfessionalTier":{"values":[{"name":"BRONZE","dbName":null},{"name":"SILVER","dbName":null},{"name":"GOLD","dbName":null},{"name":"PLATINUM","dbName":null}],"dbName":null},"CustomerType":{"values":[{"name":"RETAIL","dbName":null},{"name":"BUSINESS","dbName":null},{"name":"DISTRIBUTOR","dbName":null},{"name":"GOVERNMENT","dbName":null}],"dbName":null},"RiskLevel":{"values":[{"name":"LOW","dbName":null},{"name":"MEDIUM","dbName":null},{"name":"HIGH","dbName":null},{"name":"BLOCKED","dbName":null}],"dbName":null},"AddressType":{"values":[{"name":"BILLING","dbName":null},{"name":"SHIPPING","dbName":null},{"name":"BOTH","dbName":null}],"dbName":null},"ProductStatus":{"values":[{"name":"DRAFT","dbName":null},{"name":"PENDING","dbName":null},{"name":"APPROVED","dbName":null},{"name":"ACTIVE","dbName":null},{"name":"INACTIVE","dbName":null},{"name":"DISCONTINUED","dbName":null},{"name":"OUT_OF_STOCK","dbName":null}],"dbName":null},"ApprovalStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"APPROVED","dbName":null},{"name":"REJECTED","dbName":null},{"name":"CHANGES_REQUESTED","dbName":null}],"dbName":null},"ReviewStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"APPROVED","dbName":null},{"name":"REJECTED","dbName":null},{"name":"SPAM","dbName":null}],"dbName":null},"OrderStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"CONFIRMED","dbName":null},{"name":"PROCESSING","dbName":null},{"name":"SHIPPED","dbName":null},{"name":"DELIVERED","dbName":null},{"name":"CANCELLED","dbName":null},{"name":"REFUNDED","dbName":null},{"name":"ON_HOLD","dbName":null}],"dbName":null},"PaymentStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"AUTHORIZED","dbName":null},{"name":"PAID","dbName":null},{"name":"FAILED","dbName":null},{"name":"REFUNDED","dbName":null},{"name":"PARTIALLY_REFUNDED","dbName":null},{"name":"CANCELLED","dbName":null}],"dbName":null},"FulfillmentStatus":{"values":[{"name":"UNFULFILLED","dbName":null},{"name":"PARTIALLY_FULFILLED","dbName":null},{"name":"FULFILLED","dbName":null},{"name":"CANCELLED","dbName":null},{"name":"RETURNED","dbName":null}],"dbName":null},"OrderPriority":{"values":[{"name":"LOW","dbName":null},{"name":"NORMAL","dbName":null},{"name":"HIGH","dbName":null},{"name":"URGENT","dbName":null}],"dbName":null}},"types":{"BusinessInfo":{"dbName":null,"fields":[{"name":"companyName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"taxId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"licenseNumber","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"website","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"verified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","default":false},{"name":"verificationDocs","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"yearEstablished","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int"},{"name":"employeeCount","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[]},"VehicleCompatibility":{"dbName":null,"fields":[{"name":"makes","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"models","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"years","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"engineTypes","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"transmissions","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"},{"name":"notes","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String"}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[]}}}',
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      (typeof globalThis !== "undefined" && globalThis["DATABASE_URL"]) ||
      (typeof process !== "undefined" &&
        process.env &&
        process.env.DATABASE_URL) ||
      undefined,
  },
});

if (
  (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
  (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
      (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
      undefined,
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
