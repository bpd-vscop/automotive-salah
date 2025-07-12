Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip,
} = require("./runtime/index-browser.js");

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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
};

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message;
        const runtime = getRuntime();
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message =
            "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" +
            runtime.prettyName +
            "`).";
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;

        throw new Error(message);
      },
    });
  }
}

exports.PrismaClient = PrismaClient;

Object.assign(exports, Prisma);
