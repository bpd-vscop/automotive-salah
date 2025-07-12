// filepath: apps/web/lib/trpc.ts
// tRPC client setup for customer website

'use client'

import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@automotive/trpc'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
})

// filepath: apps/web/components/providers/TRPCProvider.tsx  
// tRPC provider for customer website

'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { trpc, trpcClient } from '@/lib/trpc'

interface TRPCProviderProps {
  children: React.ReactNode
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  const [queryClient] = useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000, // 30 seconds
        },
      },
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

// filepath: apps/web/app/api/trpc/[trpc]/route.ts
// API route for tRPC in Next.js app router

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, createTRPCContext } from '@automotive/trpc'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })

export { handler as GET, handler as POST }

// filepath: apps/web/app/layout.tsx
// Root layout with tRPC provider

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/components/providers/TRPCProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ULKS - Professional Automotive Locksmith Tools',
  description: 'Professional automotive locksmith tools and equipment. Key programming tools, diagnostic equipment, and locksmith supplies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  )
}

// filepath: packages/ui/components/FeaturedProducts.tsx
// Update existing FeaturedProducts component to use tRPC

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Eye, ArrowRight } from 'lucide-react'
import { trpc } from '@/lib/trpc'

export default function FeaturedProducts() {
  // Fetch real featured products from database
  const { data: products, isLoading, error } = trpc.products.getFeatured.useQuery({
    limit: 8
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load featured products. Please try again later.</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Featured Products</h3>
        <p className="text-gray-600">Featured products will appear here once they are added.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
        >
          {/* Product Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.newProduct && (
              <span className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded">
                New
              </span>
            )}
            {product.onSale && product.originalPrice && (
              <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                Sale
              </span>
            )}
            {product.featured && (
              <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                Featured
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white px-2 py-1 text-xs font-semibold rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100">
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
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>

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
                <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
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
              <button
                className="w-full bg-gradient-to-r from-[#f6b210] to-[#a00b0b] hover:from-[#e5a00f] hover:to-[#8f090a] text-white py-2 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="flex gap-2">
                <Link 
                  href={`/products/${product.slug}`}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Eye className="h-3 w-3" />
                  View Details
                </Link>
                
                <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-all duration-200 text-sm">
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}