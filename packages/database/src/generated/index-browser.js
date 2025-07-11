
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  roleName: 'roleName',
  hierarchyLevel: 'hierarchyLevel',
  permissions: 'permissions',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StaffUserScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  status: 'status',
  lastLoginAt: 'lastLoginAt',
  loginCount: 'loginCount',
  avatar: 'avatar',
  phone: 'phone',
  timezone: 'timezone',
  emailVerified: 'emailVerified',
  twoFactorEnabled: 'twoFactorEnabled',
  passwordChangedAt: 'passwordChangedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  passwordHash: 'passwordHash',
  emailVerified: 'emailVerified',
  isActive: 'isActive',
  accountType: 'accountType',
  professionalTier: 'professionalTier',
  discountRate: 'discountRate',
  newsletter: 'newsletter',
  smsNotifications: 'smsNotifications',
  marketingOptIn: 'marketingOptIn',
  preferredCurrency: 'preferredCurrency',
  preferredLanguage: 'preferredLanguage',
  totalOrders: 'totalOrders',
  totalSpent: 'totalSpent',
  lifetimeValue: 'lifetimeValue',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLoginAt: 'lastLoginAt',
  lastOrderAt: 'lastOrderAt'
};

exports.Prisma.ActivityLogScalarFieldEnum = {
  id: 'id',
  staffUserId: 'staffUserId',
  actionType: 'actionType',
  description: 'description',
  entityType: 'entityType',
  entityId: 'entityId',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  metadata: 'metadata',
  success: 'success',
  errorMessage: 'errorMessage',
  timestamp: 'timestamp'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  settingKey: 'settingKey',
  settingValue: 'settingValue',
  category: 'category',
  dataType: 'dataType',
  isEncrypted: 'isEncrypted',
  isPublic: 'isPublic',
  description: 'description',
  updatedBy: 'updatedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  shortDescription: 'shortDescription',
  regularPrice: 'regularPrice',
  salePrice: 'salePrice',
  costPrice: 'costPrice',
  sku: 'sku',
  partNumber: 'partNumber',
  upc: 'upc',
  manufacturerPartNumber: 'manufacturerPartNumber',
  images: 'images',
  thumbnailImage: 'thumbnailImage',
  categoryId: 'categoryId',
  subCategory: 'subCategory',
  brand: 'brand',
  tags: 'tags',
  stockQuantity: 'stockQuantity',
  lowStockThreshold: 'lowStockThreshold',
  trackInventory: 'trackInventory',
  allowBackorder: 'allowBackorder',
  status: 'status',
  approvalStatus: 'approvalStatus',
  publishedAt: 'publishedAt',
  professionalOnly: 'professionalOnly',
  minimumOrderQuantity: 'minimumOrderQuantity',
  maximumOrderQuantity: 'maximumOrderQuantity',
  slug: 'slug',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  featured: 'featured',
  onSale: 'onSale',
  newProduct: 'newProduct',
  weight: 'weight',
  shippingClass: 'shippingClass',
  adminNotes: 'adminNotes',
  createdBy: 'createdBy',
  lastModifiedBy: 'lastModifiedBy',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VehicleCompatibilityScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  year: 'year',
  make: 'make',
  model: 'model',
  trim: 'trim',
  engine: 'engine',
  notes: 'notes',
  verified: 'verified'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  orderNumber: 'orderNumber',
  customerId: 'customerId',
  customerEmail: 'customerEmail',
  customerPhone: 'customerPhone',
  status: 'status',
  paymentStatus: 'paymentStatus',
  priorityLevel: 'priorityLevel',
  subtotal: 'subtotal',
  taxAmount: 'taxAmount',
  shippingAmount: 'shippingAmount',
  discountAmount: 'discountAmount',
  totalAmount: 'totalAmount',
  shippingAddress: 'shippingAddress',
  billingAddress: 'billingAddress',
  shippingMethod: 'shippingMethod',
  shippingCarrier: 'shippingCarrier',
  trackingNumber: 'trackingNumber',
  estimatedDelivery: 'estimatedDelivery',
  paymentMethod: 'paymentMethod',
  paymentIntentId: 'paymentIntentId',
  paymentReference: 'paymentReference',
  assignedToStaffId: 'assignedToStaffId',
  internalNotes: 'internalNotes',
  customerNotes: 'customerNotes',
  cancellationReason: 'cancellationReason',
  refundAmount: 'refundAmount',
  lastModifiedBy: 'lastModifiedBy',
  processedAt: 'processedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  shippedAt: 'shippedAt',
  deliveredAt: 'deliveredAt',
  cancelledAt: 'cancelledAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  productName: 'productName',
  productSku: 'productSku',
  unitPrice: 'unitPrice',
  quantity: 'quantity',
  totalPrice: 'totalPrice',
  productImage: 'productImage',
  productOptions: 'productOptions'
};

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  company: 'company',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  city: 'city',
  state: 'state',
  zipCode: 'zipCode',
  country: 'country',
  type: 'type',
  isDefault: 'isDefault',
  isVerified: 'isVerified',
  customerId: 'customerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  title: 'title',
  content: 'content',
  verified: 'verified',
  helpful: 'helpful',
  status: 'status',
  moderatedBy: 'moderatedBy',
  moderatedAt: 'moderatedAt',
  productId: 'productId',
  customerId: 'customerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  iconClass: 'iconClass',
  parentId: 'parentId',
  image: 'image',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  isFeatured: 'isFeatured',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  productCount: 'productCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.StaffStatus = exports.$Enums.StaffStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING_VERIFICATION: 'PENDING_VERIFICATION'
};

exports.CustomerType = exports.$Enums.CustomerType = {
  INDIVIDUAL: 'INDIVIDUAL',
  BUSINESS: 'BUSINESS',
  PROFESSIONAL: 'PROFESSIONAL'
};

exports.ProfessionalTier = exports.$Enums.ProfessionalTier = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
  PLATINUM: 'PLATINUM'
};

exports.SettingDataType = exports.$Enums.SettingDataType = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON',
  EMAIL: 'EMAIL',
  URL: 'URL'
};

exports.ProductStatus = exports.$Enums.ProductStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED',
  LOW_STOCK: 'LOW_STOCK'
};

exports.ApprovalStatus = exports.$Enums.ApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REVIEW: 'REVIEW'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED'
};

exports.OrderPriority = exports.$Enums.OrderPriority = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

exports.AddressType = exports.$Enums.AddressType = {
  SHIPPING: 'SHIPPING',
  BILLING: 'BILLING',
  BOTH: 'BOTH'
};

exports.ReviewStatus = exports.$Enums.ReviewStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  SPAM: 'SPAM'
};

exports.Prisma.ModelName = {
  Role: 'Role',
  StaffUser: 'StaffUser',
  Customer: 'Customer',
  ActivityLog: 'ActivityLog',
  Setting: 'Setting',
  Product: 'Product',
  VehicleCompatibility: 'VehicleCompatibility',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Address: 'Address',
  ProductReview: 'ProductReview',
  Category: 'Category'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
