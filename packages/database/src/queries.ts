// filepath: packages/database/src/queries.ts
// Database query utilities and helper functions
// Provides reusable queries and data access patterns

import { prisma } from "./client";
import type {
  ProductFilters,
  OrderFilters,
  CustomerFilters,
  PaginationOptions,
  PaginatedResult,
  ProductSummary,
  OrderSummary,
  CustomerSummary,
  DashboardStats,
  SalesChartData,
  CategoryPerformance,
  InventoryAlert,
} from "./types";
import type { ApprovalStatus, Prisma, ProductStatus } from "./generated";

// ======================== PRODUCT QUERIES ========================

export class ProductQueries {
  /**
   * Get products with filtering, sorting, and pagination
   */
  static async getProducts(
    filters: ProductFilters = {},
    pagination: PaginationOptions = {},
  ): Promise<PaginatedResult<ProductSummary>> {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    // Build where clause
    const where: Prisma.ProductWhereInput = {
      ...(filters.search && {
        OR: [
          { name: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
          { sku: { contains: filters.search, mode: "insensitive" } },
          { partNumber: { contains: filters.search, mode: "insensitive" } },
          { tags: { hasSome: [filters.search] } },
        ],
      }),
      ...(filters.category && {
        category: {
          slug: filters.category,
        },
      }),
      ...(filters.minPrice && { regularPrice: { gte: filters.minPrice } }),
      ...(filters.maxPrice && { regularPrice: { lte: filters.maxPrice } }),
      ...(filters.inStock && { stockQuantity: { gt: 0 } }),
      ...(filters.featured !== undefined && { featured: filters.featured }),
      ...(filters.onSale !== undefined && { onSale: filters.onSale }),
      ...(filters.newProduct !== undefined && {
        newProduct: filters.newProduct,
      }),
      ...(filters.professionalOnly !== undefined && {
        professionalOnly: filters.professionalOnly,
      }),
      ...(filters.status && {
        status: { in: filters.status as ProductStatus[] },
      }),
      ...(filters.approvalStatus && {
        approvalStatus: { in: filters.approvalStatus as ApprovalStatus[] },
      }),
      ...(filters.brands && {
        vehicleCompatibility: {
          is: {
            makes: {
              hasSome: filters.brands,
            },
          },
        },
      }),
    };

    // Build order clause
    const orderBy: Prisma.ProductOrderByWithRelationInput = (() => {
      switch (filters.sortBy) {
        case "price":
          return { regularPrice: filters.sortOrder || "asc" };
        case "created":
          return { createdAt: filters.sortOrder || "desc" };
        case "updated":
          return { updatedAt: filters.sortOrder || "desc" };
        case "name":
        default:
          return { name: filters.sortOrder || "asc" };
      }
    })();

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        select: {
          id: true,
          name: true,
          shortDescription: true,
          regularPrice: true,
          salePrice: true,
          sku: true,
          stockQuantity: true,
          featured: true,
          onSale: true,
          newProduct: true,
          professionalOnly: true,
          weight: true,
          status: true,
          categoryId: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
          vehicleCompatibility: true,
          tags: true,
          createdAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products as unknown as ProductSummary[],
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
        hasNextPage: offset + limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Get featured products for homepage
   */
  static async getFeaturedProducts(limit: number = 8) {
    return prisma.product.findMany({
      where: {
        featured: true,
        status: "ACTIVE",
        stockQuantity: { gt: 0 },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        shortDescription: true,
        regularPrice: true,
        salePrice: true,
        sku: true,
        category: {
          select: { name: true, slug: true },
        },
        tags: true,
      },
    });
  }

  /**
   * Get products on sale
   */
  static async getOnSaleProducts(limit: number = 8) {
    return prisma.product.findMany({
      where: {
        onSale: true,
        salePrice: { not: null },
        status: "ACTIVE",
        stockQuantity: { gt: 0 },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        regularPrice: true,
        salePrice: true,
        sku: true,
        category: {
          select: { name: true },
        },
      },
    });
  }

  /**
   * Get low stock products
   */
  static async getLowStockProducts(): Promise<InventoryAlert[]> {
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        trackInventory: true,
        OR: [
          {
            stockQuantity: {
              equals: 0,
            },
          },
          {
            lowStockThreshold: {
              not: 0,
            },
            // This is a workaround for the lack of direct column comparison in Prisma
            // It fetches more than needed and filters in memory.
            // For large datasets, a raw query would be more efficient.
          },
        ],
      },
      select: {
        id: true,
        name: true,
        sku: true,
        stockQuantity: true,
        lowStockThreshold: true,
        status: true,
        updatedAt: true,
      },
    });

    const lowStockProducts = products.filter(
      (p) =>
        p.stockQuantity === 0 ||
        (p.lowStockThreshold !== null &&
          p.stockQuantity <= p.lowStockThreshold),
    );

    return lowStockProducts.map((product) => ({
      productId: product.id,
      productName: product.name,
      sku: product.sku ?? "",
      currentStock: product.stockQuantity,
      lowStockThreshold: product.lowStockThreshold,
      status: product.stockQuantity === 0 ? "out_of_stock" : "low_stock",
      lastRestocked: product.updatedAt,
    }));
  }
}

// ======================== ORDER QUERIES ========================

export class OrderQueries {
  /**
   * Get orders with filtering and pagination
   */
  static async getOrders(
    filters: OrderFilters = {},
    pagination: PaginationOptions = {},
  ): Promise<PaginatedResult<OrderSummary>> {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(filters.status && { status: { in: filters.status } }),
      ...(filters.paymentStatus && {
        paymentStatus: { in: filters.paymentStatus },
      }),
      ...(filters.fulfillmentStatus && {
        fulfillmentStatus: { in: filters.fulfillmentStatus },
      }),
      ...(filters.priorityLevel && {
        priorityLevel: { in: filters.priorityLevel },
      }),
      ...(filters.customerId && { customerId: filters.customerId }),
      ...(filters.assignedToStaffId && {
        assignedToStaffId: filters.assignedToStaffId,
      }),
      ...(filters.dateFrom && { orderDate: { gte: filters.dateFrom } }),
      ...(filters.dateTo && { orderDate: { lte: filters.dateTo } }),
      ...(filters.minAmount && { totalAmount: { gte: filters.minAmount } }),
      ...(filters.maxAmount && { totalAmount: { lte: filters.maxAmount } }),
      ...(filters.search && {
        OR: [
          { orderNumber: { contains: filters.search, mode: "insensitive" } },
          {
            customer: {
              OR: [
                {
                  firstName: { contains: filters.search, mode: "insensitive" },
                },
                { lastName: { contains: filters.search, mode: "insensitive" } },
                { email: { contains: filters.search, mode: "insensitive" } },
              ],
            },
          },
        ],
      }),
    };

    const orderBy: Prisma.OrderOrderByWithRelationInput = (() => {
      switch (filters.sortBy) {
        case "totalAmount":
          return { totalAmount: filters.sortOrder || "desc" };
        case "status":
          return { status: filters.sortOrder || "asc" };
        case "updated":
          return { updatedAt: filters.sortOrder || "desc" };
        case "orderDate":
        default:
          return { orderDate: filters.sortOrder || "desc" };
      }
    })();

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        select: {
          id: true,
          orderNumber: true,
          status: true,
          paymentStatus: true,
          fulfillmentStatus: true,
          priorityLevel: true,
          totalAmount: true,
          orderDate: true,
          customer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              professionalTier: true,
            },
          },
          orderItems: {
            select: {
              quantity: true,
              product: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: orders as unknown as OrderSummary[],
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
        hasNextPage: offset + limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Get recent orders for dashboard
   */
  static async getRecentOrders(limit: number = 10) {
    return prisma.order.findMany({
      orderBy: { orderDate: "desc" },
      take: limit,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalAmount: true,
        orderDate: true,
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  /**
   * Get order statistics for date range
   */
  static async getOrderStats(dateFrom: Date, dateTo: Date) {
    const [orders, revenue] = await Promise.all([
      prisma.order.groupBy({
        by: ["status"],
        where: {
          orderDate: {
            gte: dateFrom,
            lte: dateTo,
          },
        },
        _count: { id: true },
      }),
      prisma.order.aggregate({
        where: {
          orderDate: {
            gte: dateFrom,
            lte: dateTo,
          },
          paymentStatus: "PAID",
        },
        _sum: { totalAmount: true },
        _avg: { totalAmount: true },
        _count: { id: true },
      }),
    ]);

    return {
      ordersByStatus: orders,
      totalRevenue: revenue._sum.totalAmount || 0,
      averageOrderValue: revenue._avg.totalAmount || 0,
      totalOrders: revenue._count.id,
    };
  }
}

// ======================== CUSTOMER QUERIES ========================

export class CustomerQueries {
  /**
   * Get customers with filtering and pagination
   */
  static async getCustomers(
    filters: CustomerFilters = {},
    pagination: PaginationOptions = {},
  ): Promise<PaginatedResult<CustomerSummary>> {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {
      ...(filters.professionalTier && {
        professionalTier: { in: filters.professionalTier },
      }),
      ...(filters.customerType && {
        customerType: { in: filters.customerType },
      }),
      ...(filters.riskLevel && { riskLevel: { in: filters.riskLevel } }),
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters.hasOrders && { totalOrders: { gt: 0 } }),
      ...(filters.registeredFrom && {
        createdAt: { gte: filters.registeredFrom },
      }),
      ...(filters.registeredTo && { createdAt: { lte: filters.registeredTo } }),
      ...(filters.minSpent && { totalSpent: { gte: filters.minSpent } }),
      ...(filters.maxSpent && { totalSpent: { lte: filters.maxSpent } }),
      ...(filters.search && {
        OR: [
          { firstName: { contains: filters.search, mode: "insensitive" } },
          { lastName: { contains: filters.search, mode: "insensitive" } },
          { email: { contains: filters.search, mode: "insensitive" } },
          {
            businessInfo: {
              is: {
                companyName: {
                  contains: filters.search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      }),
    };

    const orderBy: Prisma.CustomerOrderByWithRelationInput = (() => {
      switch (filters.sortBy) {
        case "email":
          return { email: filters.sortOrder || "asc" };
        case "totalSpent":
          return { totalSpent: filters.sortOrder || "desc" };
        case "created":
          return { createdAt: filters.sortOrder || "desc" };
        case "lastLogin":
          return { lastLogin: filters.sortOrder || "desc" };
        case "name":
        default:
          return { firstName: filters.sortOrder || "asc" };
      }
    })();

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          professionalTier: true,
          customerType: true,
          totalOrders: true,
          totalSpent: true,
          lifetimeValue: true,
          isActive: true,
          createdAt: true,
          lastLogin: true,
        },
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      data: customers as unknown as CustomerSummary[],
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
        hasNextPage: offset + limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Get customer statistics
   */
  static async getCustomerStats() {
    const [total, active, byTier, byType, recent] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({ where: { isActive: true } }),
      prisma.customer.groupBy({
        by: ["professionalTier"],
        _count: { id: true },
      }),
      prisma.customer.groupBy({
        by: ["customerType"],
        _count: { id: true },
      }),
      prisma.customer.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
    ]);

    return {
      total,
      active,
      byTier: byTier.reduce(
        (acc, item) => {
          if (item.professionalTier) {
            acc[item.professionalTier] = item._count.id;
          }
          return acc;
        },
        {} as Record<string, number>,
      ),
      byType: byType.reduce(
        (acc, item) => {
          if (item.customerType) {
            acc[item.customerType] = item._count.id;
          }
          return acc;
        },
        {} as Record<string, number>,
      ),
      recentRegistrations: recent,
    };
  }
}

// ======================== ANALYTICS QUERIES ========================

export class AnalyticsQueries {
  /**
   * Get dashboard statistics
   */
  static async getDashboardStats(): Promise<DashboardStats> {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const [
      orderStats,
      revenueStats,
      customerStats,
      productStats,
      todayOrders,
      weekOrders,
      thisMonthRevenue,
      lastMonthRevenue,
      newCustomers,
      lowStockCount,
    ] = await Promise.all([
      // Order statistics
      prisma.order.groupBy({
        by: ["status"],
        _count: { id: true },
      }),

      // Revenue statistics
      prisma.order.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: { totalAmount: true },
        _avg: { totalAmount: true },
        _count: { id: true },
      }),

      // Customer statistics
      prisma.customer.aggregate({
        _count: { id: true },
      }),

      // Product statistics
      prisma.product.aggregate({
        _count: { id: true },
      }),

      // Today's orders
      prisma.order.count({
        where: {
          orderDate: { gte: startOfToday },
        },
      }),

      // Week's orders for growth calculation
      prisma.order.count({
        where: {
          orderDate: { gte: startOfWeek },
        },
      }),

      // This month's revenue
      prisma.order.aggregate({
        where: {
          orderDate: { gte: startOfMonth },
          paymentStatus: "PAID",
        },
        _sum: { totalAmount: true },
      }),

      // Last month's revenue
      prisma.order.aggregate({
        where: {
          orderDate: { gte: startOfLastMonth, lte: endOfLastMonth },
          paymentStatus: "PAID",
        },
        _sum: { totalAmount: true },
      }),

      // New customers this week
      prisma.customer.count({
        where: {
          createdAt: { gte: startOfWeek },
        },
      }),

      // Low stock products
      prisma.product.count({
        where: {
          stockQuantity: { lte: 5 },
          status: "ACTIVE",
        },
      }),
    ]);

    // Calculate growth percentages
    const thisMonthRev = thisMonthRevenue._sum.totalAmount || 0;
    const lastMonthRev = lastMonthRevenue._sum.totalAmount || 0;
    const monthGrowth =
      lastMonthRev > 0
        ? ((thisMonthRev - lastMonthRev) / lastMonthRev) * 100
        : 0;

    return {
      orders: {
        total: revenueStats._count.id,
        pending: orderStats.find((s) => s.status === "PENDING")?._count.id || 0,
        shipped: orderStats.find((s) => s.status === "SHIPPED")?._count.id || 0,
        delivered:
          orderStats.find((s) => s.status === "DELIVERED")?._count.id || 0,
        cancelled:
          orderStats.find((s) => s.status === "CANCELLED")?._count.id || 0,
        todayCount: todayOrders,
        weekGrowth: weekOrders > 0 ? weekOrders / 7 : 0,
      },
      revenue: {
        total: revenueStats._sum.totalAmount || 0,
        thisMonth: thisMonthRev,
        lastMonth: lastMonthRev,
        monthGrowth,
        avgOrderValue: revenueStats._avg.totalAmount || 0,
      },
      customers: {
        total: customerStats._count.id,
        active: customerStats._count.id, // Simplified for now
        new: newCustomers,
        returning: customerStats._count.id - newCustomers,
        professional: 0, // Will be calculated separately
        weekGrowth: newCustomers,
      },
      products: {
        total: productStats._count.id,
        active: productStats._count.id, // Simplified
        lowStock: lowStockCount,
        outOfStock: 0, // Will be calculated separately
        featured: 0, // Will be calculated separately
      },
      inventory: {
        totalValue: 0, // Will be calculated separately
        lowStockAlerts: lowStockCount,
        topSellingProducts: [], // Will be calculated separately
      },
    };
  }

  /**
   * Get sales chart data for the last 30 days
   */
  static async getSalesChartData(days: number = 30): Promise<SalesChartData[]> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const salesData = await prisma.order.groupBy({
      by: ["orderDate"],
      where: {
        orderDate: {
          gte: startDate,
          lte: endDate,
        },
        paymentStatus: "PAID",
      },
      _sum: {
        totalAmount: true,
      },
      _count: {
        id: true,
      },
    });

    // Fill missing dates with zero values
    const chartData: SalesChartData[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];

      const dayData = salesData.find(
        (d) => d.orderDate.toISOString().split("T")[0] === dateStr,
      );

      chartData.push({
        date: dateStr,
        sales: dayData?._sum.totalAmount || 0,
        orders: dayData?._count.id || 0,
      });
    }

    return chartData;
  }

  /**
   * Get category performance data
   */
  static async getCategoryPerformance(): Promise<CategoryPerformance[]> {
    const categoryData = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
            orderItems: {
              select: {
                quantity: true,
                priceAtPurchase: true,
                order: {
                  select: {
                    paymentStatus: true,
                  },
                },
              },
              where: {
                order: {
                  paymentStatus: "PAID",
                },
              },
            },
          },
        },
      },
    });

    return categoryData.map((category) => {
      const allOrderItems = category.products.flatMap((p) => p.orderItems);
      const totalSales = allOrderItems.reduce(
        (sum, item) => sum + (item.priceAtPurchase || 0) * item.quantity,
        0,
      );
      const orderCount = allOrderItems.length;
      const avgOrderValue = orderCount > 0 ? totalSales / orderCount : 0;

      return {
        categoryId: category.id,
        categoryName: category.name,
        productCount: category.products.length,
        totalSales,
        orderCount,
        avgOrderValue,
      };
    });
  }

  /**
   * Get top selling products
   */
  static async getTopSellingProducts(limit: number = 10) {
    const topProducts = await prisma.orderItem.groupBy({
      by: ["productId"],
      where: {
        order: {
          paymentStatus: "PAID",
        },
      },
      _sum: {
        quantity: true,
        priceAtPurchase: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: limit,
    });

    // Get product details
    const productIds = topProducts
      .map((p) => p.productId)
      .filter((p): p is string => p !== null);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        name: true,
        sku: true,
        regularPrice: true,
      },
    });

    return topProducts.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        id: item.productId,
        name: product?.name || "Unknown Product",
        sku: product?.sku || "",
        totalSold: item._sum.quantity || 0,
        revenue: item._sum.priceAtPurchase || 0,
        orderCount: item._count.id,
      };
    });
  }
}

// ======================== CATEGORY QUERIES ========================

export class CategoryQueries {
  /**
   * Get all categories with hierarchy
   */
  static async getCategoriesWithHierarchy() {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          include: {
            _count: {
              select: { products: true },
            },
          },
        },
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });
  }

  /**
   * Get featured categories
   */
  static async getFeaturedCategories() {
    return prisma.category.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }
}

// ======================== SEARCH QUERIES ========================

export class SearchQueries {
  /**
   * Global search across products, orders, and customers
   */
  static async globalSearch(query: string, limit: number = 20) {
    const [products, orders, customers] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { sku: { contains: query, mode: "insensitive" } },
            { partNumber: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        select: {
          id: true,
          name: true,
          sku: true,
          regularPrice: true,
        },
      }),

      prisma.order.findMany({
        where: {
          OR: [
            { orderNumber: { contains: query, mode: "insensitive" } },
            {
              customer: {
                OR: [
                  { firstName: { contains: query, mode: "insensitive" } },
                  { lastName: { contains: query, mode: "insensitive" } },
                  { email: { contains: query, mode: "insensitive" } },
                ],
              },
            },
          ],
        },
        take: limit,
        select: {
          id: true,
          orderNumber: true,
          totalAmount: true,
          status: true,
          customer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),

      prisma.customer.findMany({
        where: {
          OR: [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          professionalTier: true,
        },
      }),
    ]);

    return {
      products,
      orders,
      customers,
      total: products.length + orders.length + customers.length,
    };
  }
}

// ======================== UTILITY FUNCTIONS ========================

/**
 * Generate unique order number
 */
export async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  // Get the count of orders today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayCount = await prisma.order.count({
    where: {
      orderDate: { gte: todayStart },
    },
  });

  const sequence = String(todayCount + 1).padStart(4, "0");
  return `ORD-${year}-${sequence}`;
}

/**
 * Calculate customer lifetime value
 */
export async function calculateCustomerLTV(
  customerId: string,
): Promise<number> {
  const result = await prisma.order.aggregate({
    where: {
      customerId,
      paymentStatus: "PAID",
    },
    _sum: {
      totalAmount: true,
    },
  });

  return result._sum.totalAmount || 0;
}

/**
 * Update product inventory after order
 */
export async function updateProductInventory(
  productId: string,
  quantityChange: number,
  operation: "add" | "subtract" = "subtract",
) {
  const multiplier = operation === "add" ? 1 : -1;

  return prisma.product.update({
    where: { id: productId },
    data: {
      stockQuantity: {
        increment: quantityChange * multiplier,
      },
    },
  });
}

/**
 * Bulk update customer statistics
 */
export async function updateCustomerStats(customerId: string) {
  const stats = await prisma.order.aggregate({
    where: {
      customerId,
      paymentStatus: "PAID",
    },
    _count: { id: true },
    _sum: { totalAmount: true },
    _avg: { totalAmount: true },
  });

  return prisma.customer.update({
    where: { id: customerId },
    data: {
      totalOrders: stats._count.id,
      totalSpent: stats._sum.totalAmount || 0,
      lifetimeValue: stats._sum.totalAmount || 0,
      averageOrderValue: stats._avg.totalAmount || 0,
    },
  });
}
