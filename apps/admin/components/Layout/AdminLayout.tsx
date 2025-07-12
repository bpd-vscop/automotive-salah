// filepath: apps/admin/components/layout/AdminLayout.tsx
// Main admin dashboard layout with sidebar navigation and header
// Includes role-based menu rendering and user profile dropdown

"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Home,
  Palette,
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Button } from "@automotive/ui/components/button";
import { Input } from "@automotive/ui/components/input";
import { Badge } from "@automotive/ui/components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@automotive/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@automotive/ui/components/avatar";
import { useAdminAuth, PermissionGate } from "@/hooks/useAdminAuth";

// Navigation items with permission requirements
const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    permission: { resource: "dashboard", action: "read" },
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
    permission: { resource: "products", action: "read" },
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    permission: { resource: "orders", action: "read" },
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
    permission: { resource: "customers", action: "read" },
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    permission: { resource: "analytics", action: "read" },
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Shield,
    permission: { resource: "users", action: "read" },
    hierarchyLevel: 2, // Admin level and above
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    permission: { resource: "settings", action: "read" },
  },
  {
    name: "Homepage",
    href: "/admin/homepage",
    icon: Home,
    permission: { resource: "content", action: "read" },
  },
  {
    name: "Design",
    href: "/admin/design",
    icon: Palette,
    permission: { resource: "content", action: "update" },
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, hasPermission, hasMinimumHierarchy } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const filteredNavigation = navigationItems.filter((item) => {
    // Check basic permission
    if (!hasPermission(item.permission.resource, item.permission.action)) {
      return false;
    }

    // Check hierarchy requirement
    if (item.hierarchyLevel && !hasMinimumHierarchy(item.hierarchyLevel)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ULKS</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user ? getInitials(user.firstName, user.lastName) : "AD"}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user ? `${user.firstName} ${user.lastName}` : "Admin User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role.name || "Administrator"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {filteredNavigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon
                    className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-600"}
                  `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Role indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">
                Access Level
              </span>
              <Badge
                variant={
                  user?.role.hierarchyLevel === 1
                    ? "destructive"
                    : user?.role.hierarchyLevel === 2
                      ? "default"
                      : user?.role.hierarchyLevel === 3
                        ? "secondary"
                        : "outline"
                }
              >
                {user?.role.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search products, orders, customers..."
                  className="pl-10 pr-4 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <PermissionGate resource="dashboard" action="read">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 relative">
                  <Bell className="h-6 w-6" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                    3
                  </Badge>
                </button>
              </PermissionGate>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 p-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {user
                          ? getInitials(user.firstName, user.lastName)
                          : "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {user
                          ? `${user.firstName} ${user.lastName}`
                          : "Admin User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>

                  <PermissionGate resource="settings" action="read">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/settings"
                        className="flex items-center"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Settings
                      </Link>
                    </DropdownMenuItem>
                  </PermissionGate>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
