// filepath: packages/trpc/src/routers/public.ts
// Public tRPC procedures for customer website (apps/web)
// These endpoints power your existing homepage components with real data

import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@automotive/database";
import { TRPCError } from "@trpc/server";

export const publicRouter = router({
  // ======================== HOMEPAGE DATA ========================

  /**
   * Get featured products for FeaturedProducts component
   * Replaces static data with real database products
   */
  getFeaturedProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(12).default(8),
      }),
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          featured: true,
          status: "ACTIVE",
          approvalStatus: "APPROVED",
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: input.limit,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        price: product.salePrice || product.regularPrice,
        originalPrice: product.salePrice ? product.regularPrice : null,
        image: `/images/products/${product.sku.toLowerCase()}.jpg`, // Assuming image naming convention
        category: product.category.name,
        categorySlug: product.category.slug,
        slug: product.sku.toLowerCase(),
        sku: product.sku,
        featured: product.featured,
        onSale: product.onSale,
        newProduct: product.newProduct,
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
      }));
    }),

  /**
   * Get products on sale for OnSale component
   */
  getOnSaleProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(12).default(8),
      }),
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          onSale: true,
          salePrice: { not: null },
          status: "ACTIVE",
          approvalStatus: "APPROVED",
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: [{ onSale: "desc" }, { updatedAt: "desc" }],
        take: input.limit,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        price: product.salePrice!,
        originalPrice: product.regularPrice,
        discount: Math.round(
          ((product.regularPrice - product.salePrice!) / product.regularPrice) *
            100,
        ),
        image: `/images/products/${product.sku.toLowerCase()}.jpg`,
        category: product.category.name,
        categorySlug: product.category.slug,
        slug: product.sku.toLowerCase(),
        sku: product.sku,
        onSale: product.onSale,
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
      }));
    }),

  /**
   * Get new products for NewProducts component
   */
  getNewProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(12).default(8),
      }),
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          newProduct: true,
          status: "ACTIVE",
          approvalStatus: "APPROVED",
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: [{ newProduct: "desc" }, { createdAt: "desc" }],
        take: input.limit,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        price: product.salePrice || product.regularPrice,
        originalPrice: product.salePrice ? product.regularPrice : null,
        image: `/images/products/${product.sku.toLowerCase()}.jpg`,
        category: product.category.name,
        categorySlug: product.category.slug,
        slug: product.sku.toLowerCase(),
        sku: product.sku,
        newProduct: product.newProduct,
        onSale: product.onSale,
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
      }));
    }),

  /**
   * Get back in stock products for BackInStock component
   */
  getBackInStockProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(12).default(8),
      }),
    )
    .query(async ({ input }) => {
      // Products that recently came back in stock (restocked in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const products = await prisma.product.findMany({
        where: {
          stockQuantity: { gt: 0 },
          status: "ACTIVE",
          approvalStatus: "APPROVED",
          updatedAt: { gte: thirtyDaysAgo },
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: [{ updatedAt: "desc" }],
        take: input.limit,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.shortDescription || product.description,
        price: product.salePrice || product.regularPrice,
        originalPrice: product.salePrice ? product.regularPrice : null,
        image: `/images/products/${product.sku.toLowerCase()}.jpg`,
        category: product.category.name,
        categorySlug: product.category.slug,
        slug: product.sku.toLowerCase(),
        sku: product.sku,
        inStock: true,
        stockQuantity: product.stockQuantity,
        restockedAt: product.updatedAt,
      }));
    }),

  /**
   * Get categories for CategoryGrid component
   */
  getCategories: publicProcedure
    .input(
      z.object({
        featured: z.boolean().optional().default(true),
      }),
    )
    .query(async ({ input }) => {
      const categories = await prisma.category.findMany({
        where: {
          isActive: true,
          ...(input.featured && { isFeatured: true }),
        },
        orderBy: [
          { isFeatured: "desc" },
          { sortOrder: "asc" },
          { name: "asc" },
        ],
      });

      return categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: `/images/categories/${category.slug}.jpg`, // Assuming image naming convention
        iconClass: category.iconClass,
        productCount: category.productCount,
        isFeatured: category.isFeatured,
      }));
    }),

  /**
   * Get hero slides for HeroSlider component
   */
  getHeroSlides: publicProcedure.query(async () => {
    const slides = await prisma.heroSlide.findMany({
      where: {
        isActive: true,
        // Check if slide is within date range
        OR: [{ startDate: null }, { startDate: { lte: new Date() } }],
        AND: [
          {
            OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
          },
        ],
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return slides.map((slide) => ({
      id: slide.id,
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      imageUrl: slide.imageUrl,
      mobileImageUrl: slide.mobileImageUrl,
      altText: slide.altText,
      primaryButtonText: slide.primaryButtonText,
      primaryButtonUrl: slide.primaryButtonUrl,
      secondaryButtonText: slide.secondaryButtonText,
      secondaryButtonUrl: slide.secondaryButtonUrl,
      textPosition: slide.textPosition,
      overlayOpacity: slide.overlayOpacity,
      textColor: slide.textColor,
      animationType: slide.animationType,
      displayDuration: slide.displayDuration,
    }));
  }),

  /**
   * Get promotional banners
   */
  getBanners: publicProcedure
    .input(
      z.object({
        position: z
          .enum([
            "TOP",
            "HEADER",
            "HERO",
            "SIDEBAR",
            "FOOTER",
            "FLOATING",
            "BETWEEN_CONTENT",
          ])
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      const banners = await prisma.banner.findMany({
        where: {
          isActive: true,
          ...(input.position && { position: input.position }),
          // Check if banner is within date range
          OR: [{ startDate: null }, { startDate: { lte: new Date() } }],
          AND: [
            {
              OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
            },
          ],
        },
        orderBy: {
          priority: "desc",
        },
      });

      return banners.map((banner) => ({
        id: banner.id,
        title: banner.title,
        subtitle: banner.subtitle,
        description: banner.description,
        imageUrl: banner.imageUrl,
        buttonText: banner.buttonText,
        buttonUrl: banner.buttonUrl,
        position: banner.position,
        displayType: banner.displayType,
        backgroundColor: banner.backgroundColor,
        textColor: banner.textColor,
        borderColor: banner.borderColor,
        showOnMobile: banner.showOnMobile,
        showOnTablet: banner.showOnTablet,
        showOnDesktop: banner.showOnDesktop,
      }));
    }),

  // ======================== PRODUCT PAGES ========================

  /**
   * Get single product by slug for product detail pages
   */
  getProduct: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      }),
    )
    .query(async ({ input }) => {
      const product = await prisma.product.findFirst({
        where: {
          sku: input.slug.toUpperCase(),
          status: "ACTIVE",
          approvalStatus: "APPROVED",
        },
        include: {
          category: true,
          reviews: {
            where: {
              status: "APPROVED",
            },
            include: {
              customer: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
          },
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      // Calculate average rating
      const avgRating =
        product.reviews.length > 0
          ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
          : 0;

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.salePrice || product.regularPrice,
        originalPrice: product.salePrice ? product.regularPrice : null,
        sku: product.sku,
        partNumber: product.partNumber,
        weight: product.weight,
        dimensions: product.dimensions,
        category: {
          id: product.category.id,
          name: product.category.name,
          slug: product.category.slug,
        },
        images: [
          `/images/products/${product.sku.toLowerCase()}-1.jpg`,
          `/images/products/${product.sku.toLowerCase()}-2.jpg`,
          `/images/products/${product.sku.toLowerCase()}-3.jpg`,
        ].filter(Boolean),
        inStock: product.stockQuantity > 0,
        stockQuantity: product.stockQuantity,
        lowStock: product.stockQuantity <= product.lowStockThreshold,
        onSale: product.onSale,
        featured: product.featured,
        newProduct: product.newProduct,
        professionalOnly: product.professionalOnly,
        minimumOrderQuantity: product.minimumOrderQuantity,
        vehicleCompatibility: product.vehicleCompatibility,
        tags: product.tags,
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length,
        reviews: product.reviews.map((review) => ({
          id: review.id,
          rating: review.rating,
          title: review.title,
          content: review.content,
          verified: review.verified,
          helpful: review.helpful,
          customerName: `${review.customer.firstName} ${review.customer.lastName[0]}.`,
          createdAt: review.createdAt,
        })),
      };
    }),

  /**
   * Get products by category for category pages
   */
  getProductsByCategory: publicProcedure
    .input(
      z.object({
        categorySlug: z.string().min(1),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(24).default(12),
        sortBy: z.enum(["name", "price", "newest", "rating"]).default("name"),
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
        filters: z
          .object({
            priceMin: z.number().optional(),
            priceMax: z.number().optional(),
            inStock: z.boolean().optional(),
            onSale: z.boolean().optional(),
            brands: z.array(z.string()).optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      const { categorySlug, page, limit, sortBy, sortOrder, filters } = input;
      const skip = (page - 1) * limit;

      // Get category
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug, isActive: true },
      });

      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found",
        });
      }

      // Build where clause
      const where: any = {
        categoryId: category.id,
        status: "ACTIVE",
        approvalStatus: "APPROVED",
      };

      if (filters) {
        if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
          where.OR = [
            {
              salePrice: {
                ...(filters.priceMin && { gte: filters.priceMin }),
                ...(filters.priceMax && { lte: filters.priceMax }),
              },
            },
            {
              AND: [
                { salePrice: null },
                {
                  regularPrice: {
                    ...(filters.priceMin && { gte: filters.priceMin }),
                    ...(filters.priceMax && { lte: filters.priceMax }),
                  },
                },
              ],
            },
          ];
        }

        if (filters.inStock) {
          where.stockQuantity = { gt: 0 };
        }

        if (filters.onSale) {
          where.onSale = true;
        }
      }

      // Build order by
      let orderBy: any = {};
      switch (sortBy) {
        case "price":
          orderBy = [{ salePrice: sortOrder }, { regularPrice: sortOrder }];
          break;
        case "newest":
          orderBy = { createdAt: "desc" };
          break;
        case "name":
        default:
          orderBy = { name: sortOrder };
          break;
      }

      // Get products and total count
      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
            reviews: {
              where: { status: "APPROVED" },
              select: { rating: true },
            },
          },
          orderBy,
          skip,
          take: limit,
        }),
        prisma.product.count({ where }),
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return {
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
        },
        products: products.map((product) => {
          const avgRating =
            product.reviews.length > 0
              ? product.reviews.reduce(
                  (acc, review) => acc + review.rating,
                  0,
                ) / product.reviews.length
              : 0;

          return {
            id: product.id,
            name: product.name,
            description: product.shortDescription || product.description,
            price: product.salePrice || product.regularPrice,
            originalPrice: product.salePrice ? product.regularPrice : null,
            image: `/images/products/${product.sku.toLowerCase()}.jpg`,
            slug: product.sku.toLowerCase(),
            sku: product.sku,
            inStock: product.stockQuantity > 0,
            stockQuantity: product.stockQuantity,
            onSale: product.onSale,
            featured: product.featured,
            newProduct: product.newProduct,
            avgRating: Math.round(avgRating * 10) / 10,
            reviewCount: product.reviews.length,
          };
        }),
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    }),

  // ======================== SEARCH ========================

  /**
   * Search products for HeaderMenu search functionality
   */
  searchProducts: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(20).default(10),
      }),
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: input.query, mode: "insensitive" } },
                { description: { contains: input.query, mode: "insensitive" } },
                { sku: { contains: input.query, mode: "insensitive" } },
                { partNumber: { contains: input.query, mode: "insensitive" } },
                { tags: { has: input.query.toLowerCase() } },
              ],
            },
            { status: "ACTIVE" },
            { approvalStatus: "APPROVED" },
          ],
        },
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: [{ featured: "desc" }, { name: "asc" }],
        take: input.limit,
      });

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.regularPrice,
        originalPrice: product.salePrice ? product.regularPrice : null,
        image: `/images/products/${product.sku.toLowerCase()}.jpg`,
        category: product.category.name,
        slug: product.sku.toLowerCase(),
        sku: product.sku,
        inStock: product.stockQuantity > 0,
      }));
    }),

  // ======================== SITE CONFIGURATION ========================

  /**
   * Get public site settings
   */
  getSiteSettings: publicProcedure.query(async () => {
    const settings = await prisma.setting.findMany({
      where: {
        isPublic: true,
      },
      select: {
        settingKey: true,
        settingValue: true,
      },
    });

    const siteCustomization = await prisma.siteCustomization.findFirst({
      where: {
        isActive: true,
      },
    });

    const settingsMap = settings.reduce(
      (acc, setting) => {
        acc[setting.settingKey] = setting.settingValue;
        return acc;
      },
      {} as Record<string, any>,
    );

    return {
      ...settingsMap,
      siteCustomization,
    };
  }),
});
