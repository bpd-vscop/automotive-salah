// filepath: apps/web/app/page.tsx
// Enhanced homepage that connects your existing beautiful design to real database data
// Maintains your exact styling while adding dynamic content management

'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { trpc } from '@/lib/trpc'

// Import your existing components (keeping the same design)
import HeaderMenu from '@automotive/ui/components/layout/HeaderMenu'
import VehicleSearch from '@automotive/ui/components/homepage/VehicleSearch'
import CategoryGrid from '@automotive/ui/components/homepage/CategoryGrid'
import BackInStock from '@automotive/ui/components/homepage/BackInStock'
import OnSale from '@automotive/ui/components/homepage/OnSale'
import ManufacturerLogos from '@automotive/ui/components/homepage/ManufacturerLogos'
import BatteryPromo from '@automotive/ui/components/homepage/BatteryPromo'
import Footer from '@automotive/ui/components/layout/Footer'

// Import enhanced components with database integration
import HeroSlider from '@automotive/ui/components/homepage/HeroSlider'
import FeaturedProducts from '@automotive/ui/components/homepage/FeaturedProducts'

// Dynamic imports for better performance
const NewProductsSection = dynamic(
  () => import('@automotive/ui/components/homepage/NewProductsSection'),
  { ssr: false }
)

const PromotionalBanner = dynamic(
  () => import('@automotive/ui/components/homepage/PromotionalBanner'),
  { ssr: false }
)

export default function HomePage() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isVehicleSearchOpen, setIsVehicleSearchOpen] = useState(false)

  // Fetch site-wide data for dynamic content
  const { data: siteSettings } = trpc.public.getSiteSettings.useQuery()
  const { data: topBanners } = trpc.public.getBanners.useQuery({ 
    position: 'TOP' 
  })

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen)
  }

  const handleVehicleSearchToggle = () => {
    setIsVehicleSearchOpen(!isVehicleSearchOpen)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ======================== TOP BANNERS ======================== */}
      {topBanners && topBanners.length > 0 && (
        <div className="bg-gradient-to-r from-[#f6b210] to-[#a00b0b] text-white">
          {topBanners.map((banner) => (
            <PromotionalBanner key={banner.id} banner={banner} />
          ))}
        </div>
      )}

      {/* ======================== HEADER & MENUS ======================== */}
      <HeaderMenu 
        isMobileSearchOpen={isMobileSearchOpen}
        isVehicleSearchOpen={isVehicleSearchOpen}
        onMobileSearchToggle={handleMobileSearchToggle}
        onVehicleSearchToggle={handleVehicleSearchToggle}
        siteSettings={siteSettings}
      />

      {/* ======================== VEHICLE SEARCH ======================== */}
      <VehicleSearch 
        isMobileSearchOpen={isMobileSearchOpen}
        onToggle={handleVehicleSearchToggle}
      />

      {/* ======================== MAIN CONTENT AREA ======================== */}
      <main className="flex-1">
        {/* Hero Slider Section - Now with Database Integration */}
        <HeroSlider />

        {/* Featured Products Section - Now with Real Data */}
        <section className="w-[88%] mx-auto py-8 md:py-12">
          <FeaturedProducts limit={8} />
        </section>

        {/* Shop by Category Section - Enhanced with Real Categories */}
        <section className="w-[88%] mx-auto py-8 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">
            Shop by Category
          </h2>
          <CategoryGrid />
        </section>

        {/* New Products Section - Using Database Data */}
        <NewProductsSection />

        {/* Back In Stock Section - Real Inventory Data */}
        <section className="w-[88%] mx-auto py-8 md:py-12">
          <BackInStock />
        </section>
        
        {/* On Sale Section - Real Sale Data */}
        <section className="w-[88%] mx-auto py-8 md:py-12">
          <OnSale />
        </section>

        {/* Featured Manufacturers Section - Unchanged */}
        <section className="w-[88%] mx-auto py-8 md:py-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">
            Featured Manufacturers
          </h2>
          <ManufacturerLogos />
        </section>

        {/* Battery Promotion Section - Unchanged */}
        <BatteryPromo />
      </main>

      {/* ======================== FOOTER ======================== */}
      <Footer siteSettings={siteSettings} />
    </div>
  )
}

// filepath: packages/ui/components/homepage/PromotionalBanner.tsx
// New component for database-driven promotional banners

import { X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@automotive/ui/lib/utils'
import { Button } from '@automotive/ui/components/button'

interface Banner {
  id: string
  title: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  backgroundColor?: string
  textColor?: string
  displayType: string
  showOnMobile: boolean
  showOnTablet: boolean
  showOnDesktop: boolean
}

interface PromotionalBannerProps {
  banner: Banner
  dismissible?: boolean
}

export function PromotionalBanner({ banner, dismissible = true }: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const bgColor = banner.backgroundColor || '#f6b210'
  const textColor = banner.textColor || '#ffffff'

  return (
    <div 
      className={cn(
        "relative px-4 py-3 text-center",
        !banner.showOnMobile && "hidden sm:block",
        !banner.showOnTablet && "sm:hidden lg:block",
        !banner.showOnDesktop && "lg:hidden"
      )}
      style={{ 
        backgroundColor: bgColor,
        color: textColor 
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1 flex items-center justify-center gap-4">
          <div className="text-center">
            <h3 className="font-semibold">
              {banner.title}
              {banner.subtitle && (
                <span className="ml-2 font-normal opacity-90">
                  {banner.subtitle}
                </span>
              )}
            </h3>
            {banner.description && (
              <p className="text-sm opacity-80 mt-1">
                {banner.description}
              </p>
            )}
          </div>
          
          {banner.buttonText && banner.buttonUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-current text-current hover:bg-current hover:text-white"
              asChild
            >
              <Link href={banner.buttonUrl}>
                {banner.buttonText}
              </Link>
            </Button>
          )}
        </div>

        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// filepath: packages/ui/components/homepage/NewProductsSection.tsx
// Enhanced NewProducts component with database integration

import { trpc } from '@/lib/trpc'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@automotive/ui/components/button'
import ProductCard from './ProductCard'

export default function NewProductsSection() {
  const { data: products, isLoading } = trpc.public.getNewProducts.useQuery({
    limit: 8
  })

  if (isLoading) {
    return (
      <section className="w-[88%] mx-auto py-8 md:py-12">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="w-[88%] mx-auto py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            New Products
          </h2>
          <p className="text-gray-600">
            Latest additions to our automotive locksmith tool collection
          </p>
        </div>
        <Link 
          href="/products?filter=new" 
          className="hidden md:flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          View All New Products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="md:hidden mt-8 text-center">
        <Button 
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-50"
          asChild
        >
          <Link href="/products?filter=new">
            View All New Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}

// filepath: packages/ui/components/homepage/ProductCard.tsx
// Reusable product card component for consistent styling

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { cn } from '@automotive/ui/lib/utils'
import { Button } from '@automotive/ui/components/button'
import { Badge } from '@automotive/ui/components/badge'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number | null
  image: string
  category: string
  categorySlug?: string
  slug: string
  sku: string
  featured?: boolean
  onSale?: boolean
  newProduct?: boolean
  inStock: boolean
  stockQuantity: number
  avgRating?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const calculateSavings = (originalPrice: number, salePrice: number) => {
    const savings = originalPrice - salePrice
    const percentage = Math.round((savings / originalPrice) * 100)
    return { amount: savings, percentage }
  }

  const savings = product.originalPrice 
    ? calculateSavings(product.originalPrice, product.price) 
    : null

  return (
    <div className={cn(
      "group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden",
      className
    )}>
      {/* Product Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.newProduct && (
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
            New
          </Badge>
        )}
        {product.onSale && savings && (
          <Badge className="bg-red-600 hover:bg-red-700 text-white">
            Save {savings.percentage}%
          </Badge>
        )}
        {product.featured && (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Featured
          </Badge>
        )}
        {!product.inStock && (
          <Badge variant="secondary" className="bg-gray-500 text-white">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.preventDefault()
          console.log('Add to wishlist:', product.id)
        }}
      >
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-600 transition-colors" />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-50 overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={(e) => {
              const target = e.currentTarget
              target.src = "https://placehold.co/400x400/f3f4f6/9ca3af?text=Product+Image"
            }}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.avgRating && product.reviewCount && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.avgRating!)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center gap-1">
            <div className={cn(
              "w-2 h-2 rounded-full",
              product.inStock ? "bg-green-500" : "bg-red-500"
            )} />
            <span className="text-xs text-gray-600">
              {product.inStock 
                ? product.stockQuantity > 10 
                  ? "In Stock" 
                  : `${product.stockQuantity} left`
                : "Out of Stock"
              }
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            className="w-full bg-gradient-to-r from-[#f6b210] to-[#a00b0b] hover:from-[#e5a00f] hover:to-[#8f090a] text-white"
            disabled={!product.inStock}
            onClick={(e) => {
              e.preventDefault()
              console.log('Add to cart:', product.id)
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <Link href={`/products/${product.slug}`}>
                <Eye className="mr-1 h-3 w-3" />
                View Details
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault()
                console.log('Quick view:', product.id)
              }}
            >
              Quick View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}