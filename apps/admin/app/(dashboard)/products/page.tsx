// filepath: apps/admin/app/(dashboard)/products/page.tsx
// Complete product management dashboard for admins
// Create, edit, and manage products that appear on the customer website

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'
import { Button } from '@automotive/ui/components/button'
import { Input } from '@automotive/ui/components/input'
import { Badge } from '@automotive/ui/components/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@automotive/ui/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@automotive/ui/components/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@automotive/ui/components/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@automotive/ui/components/select'
import { trpc } from '@/lib/trpc'
import { useAdminAuth, PermissionGate } from '@/hooks/useAdminAuth'
import AdminLayout from '@/components/layout/AdminLayout'

export default function ProductsPage() {
  const { hasPermission } = useAdminAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Fetch products with filters
  const { data: productsData, isLoading, refetch } = trpc.admin.products.getAll.useQuery({
    search: searchQuery,
    status: statusFilter === 'all' ? undefined : statusFilter,
    categoryId: categoryFilter === 'all' ? undefined : categoryFilter,
    page: 1,
    limit: 20
  })

  // Fetch categories for filter
  const { data: categories } = trpc.admin.categories.getAll.useQuery()

  // Delete product mutation
  const deleteProduct = trpc.admin.products.delete.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  // Bulk actions mutation
  const bulkUpdate = trpc.admin.products.bulkUpdate.useMutation({
    onSuccess: () => {
      refetch()
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const getStatusBadge = (status: string, approvalStatus: string) => {
    if (status === 'DRAFT') {
      return <Badge variant="secondary">Draft</Badge>
    }
    if (approvalStatus === 'PENDING') {
      return <Badge className="bg-yellow-500">Pending Approval</Badge>
    }
    if (approvalStatus === 'REJECTED') {
      return <Badge variant="destructive">Rejected</Badge>
    }
    if (status === 'ACTIVE') {
      return <Badge className="bg-green-500">Active</Badge>
    }
    if (status === 'INACTIVE') {
      return <Badge variant="outline">Inactive</Badge>
    }
    return <Badge variant="secondary">{status}</Badge>
  }

  const getStockStatus = (quantity: number, lowThreshold: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (quantity <= lowThreshold) {
      return <Badge className="bg-yellow-500">Low Stock</Badge>
    }
    return <Badge className="bg-green-500">In Stock</Badge>
  }

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct.mutateAsync({ id: productId })
    }
  }

  // Calculate summary stats
  const stats = productsData?.products.reduce((acc, product) => {
    acc.total++
    if (product.status === 'ACTIVE') acc.active++
    if (product.stockQuantity === 0) acc.outOfStock++
    if (product.stockQuantity <= product.lowStockThreshold) acc.lowStock++
    if (product.featured) acc.featured++
    return acc
  }, { total: 0, active: 0, outOfStock: 0, lowStock: 0, featured: 0 }) || 
  { total: 0, active: 0, outOfStock: 0, lowStock: 0, featured: 0 }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">
              Manage your automotive locksmith product catalog
            </p>
          </div>
          
          <PermissionGate resource="products" action="create">
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </PermissionGate>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.outOfStock}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lowStock}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.featured}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>
              View and manage all products in your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading products...
                      </TableCell>
                    </TableRow>
                  ) : productsData?.products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    productsData?.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{product.category?.name}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {formatPrice(product.salePrice || product.regularPrice)}
                            </div>
                            {product.salePrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.regularPrice)}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{product.stockQuantity}</div>
                            {getStockStatus(product.stockQuantity, product.lowStockThreshold)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(product.status, product.approvalStatus)}
                        </TableCell>
                        <TableCell>
                          {product.featured && (
                            <Badge className="bg-yellow-500">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-500">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              
                              <DropdownMenuItem asChild>
                                <Link href={`/products/${product.sku.toLowerCase()}`} target="_blank">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View on Site
                                </Link>
                              </DropdownMenuItem>
                              
                              <PermissionGate resource="products" action="update">
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/products/${product.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                              </PermissionGate>
                              
                              <DropdownMenuSeparator />
                              
                              <PermissionGate resource="products" action="delete">
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </PermissionGate>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {productsData?.pagination && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {((productsData.pagination.page - 1) * productsData.pagination.limit) + 1} to{' '}
                  {Math.min(productsData.pagination.page * productsData.pagination.limit, productsData.pagination.totalCount)} of{' '}
                  {productsData.pagination.totalCount} products
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!productsData.pagination.hasPrev}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!productsData.pagination.hasNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}