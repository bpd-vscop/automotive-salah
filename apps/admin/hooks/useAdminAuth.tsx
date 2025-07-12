// filepath: apps/admin/hooks/useAdminAuth.tsx
// React hooks and context for admin authentication state management
// Provides authentication state, permissions checking, and auto-refresh

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";

// Types
interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: {
    id: string;
    name: string;
    hierarchyLevel: number;
    description?: string;
  };
  permissions: Record<string, any>;
  departmentAccess: string[];
  mustChangePassword: boolean;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
}

interface AdminAuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Record<string, any>;
}

interface AdminAuthContextType extends AdminAuthState {
  setAuth: (auth: Partial<AdminAuthState>) => void;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  hasMinimumHierarchy: (level: number) => boolean;
  refreshAuth: () => Promise<void>;
}

// Context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined,
);

// Provider Props
interface AdminAuthProviderProps {
  children: ReactNode;
}

// Provider Component
export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AdminAuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    permissions: {},
  });

  // tRPC queries and mutations
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = trpc.admin.auth.me.useQuery(undefined, {
    enabled: false, // We'll enable this manually
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.admin.auth.logout.useMutation({
    onSuccess: () => {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        permissions: {},
      });
      router.push("/admin/login");
    },
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to fetch current user (will fail if not authenticated)
        const result = await refetchUser();

        if (result.data) {
          setAuthState({
            user: result.data as AdminUser,
            isAuthenticated: true,
            isLoading: false,
            permissions: result.data.permissions,
          });
        } else {
          setAuthState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, [refetchUser]);

  // Update auth state when user data changes
  useEffect(() => {
    if (userData) {
      setAuthState({
        user: userData as AdminUser,
        isAuthenticated: true,
        isLoading: false,
        permissions: userData.permissions,
      });
    }
  }, [userData]);

  // Auth functions
  const setAuth = (auth: Partial<AdminAuthState>) => {
    setAuthState((prev) => ({ ...prev, ...auth }));
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      // Force logout even if server call fails
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        permissions: {},
      });
      router.push("/admin/login");
    }
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!authState.user || !authState.permissions) return false;

    const resourcePerms = authState.permissions[resource];
    if (!resourcePerms || typeof resourcePerms !== "object") {
      return false;
    }

    return resourcePerms[action] === true;
  };

  const hasMinimumHierarchy = (requiredLevel: number): boolean => {
    if (!authState.user) return false;

    // Lower numbers = higher permissions (1 = Super Admin, 4 = Editor)
    return authState.user.role.hierarchyLevel <= requiredLevel;
  };

  const refreshAuth = async () => {
    try {
      await refetchUser();
    } catch (error) {
      console.error("Failed to refresh auth:", error);
    }
  };

  const contextValue: AdminAuthContextType = {
    ...authState,
    setAuth,
    logout,
    hasPermission,
    hasMinimumHierarchy,
    refreshAuth,
  };

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
}

// Hook to use admin auth
export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }

  return context;
}

// Hook for permission checking
export function useAdminPermission(resource: string, action: string) {
  const { hasPermission, user } = useAdminAuth();

  return {
    hasPermission: hasPermission(resource, action),
    loading: !user,
    user,
  };
}

// Hook for hierarchy checking
export function useAdminHierarchy(requiredLevel: number) {
  const { hasMinimumHierarchy, user } = useAdminAuth();

  return {
    hasAccess: hasMinimumHierarchy(requiredLevel),
    userLevel: user?.role.hierarchyLevel,
    loading: !user,
    user,
  };
}

// Higher-order component for protected routes
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredPermission?: { resource: string; action: string };
    requiredHierarchy?: number;
    redirectTo?: string;
  },
) {
  return function ProtectedComponent(props: P) {
    const {
      isAuthenticated,
      isLoading,
      hasPermission,
      hasMinimumHierarchy,
      user,
    } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) return;

      // Check authentication
      if (!isAuthenticated) {
        router.push(options?.redirectTo || "/admin/login");
        return;
      }

      // Check password change requirement
      if (user?.mustChangePassword) {
        router.push("/admin/auth/change-password");
        return;
      }

      // Check permission requirement
      if (options?.requiredPermission) {
        const { resource, action } = options.requiredPermission;
        if (!hasPermission(resource, action)) {
          router.push("/admin/unauthorized");
          return;
        }
      }

      // Check hierarchy requirement
      if (options?.requiredHierarchy !== undefined) {
        if (!hasMinimumHierarchy(options.requiredHierarchy)) {
          router.push("/admin/unauthorized");
          return;
        }
      }
    }, [
      isAuthenticated,
      isLoading,
      user,
      hasPermission,
      hasMinimumHierarchy,
      router,
    ]);

    // Show loading state
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
        </div>
      );
    }

    // Show nothing while redirecting
    if (!isAuthenticated || user?.mustChangePassword) {
      return null;
    }

    // Check permissions
    if (options?.requiredPermission) {
      const { resource, action } = options.requiredPermission;
      if (!hasPermission(resource, action)) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Access Denied
              </h1>
              <p className="text-gray-600">
                You don't have permission to access this page.
              </p>
            </div>
          </div>
        );
      }
    }

    // Check hierarchy
    if (options?.requiredHierarchy !== undefined) {
      if (!hasMinimumHierarchy(options.requiredHierarchy)) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Access Denied
              </h1>
              <p className="text-gray-600">
                Insufficient access level for this page.
              </p>
            </div>
          </div>
        );
      }
    }

    return <Component {...props} />;
  };
}

// Component for conditional rendering based on permissions
interface PermissionGateProps {
  resource: string;
  action: string;
  children: ReactNode;
  fallback?: ReactNode;
  hierarchyLevel?: number;
}

export function PermissionGate({
  resource,
  action,
  children,
  fallback = null,
  hierarchyLevel,
}: PermissionGateProps) {
  const { hasPermission, hasMinimumHierarchy } = useAdminAuth();

  const hasResourcePermission = hasPermission(resource, action);
  const hasHierarchyAccess =
    hierarchyLevel !== undefined ? hasMinimumHierarchy(hierarchyLevel) : true;

  if (hasResourcePermission && hasHierarchyAccess) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

// Hook for protected API calls
export function useProtectedMutation<TData, TVariables>(
  resource: string,
  action: string,
  mutation: any,
) {
  const { hasPermission } = useAdminAuth();

  return {
    ...mutation,
    mutate: hasPermission(resource, action) ? mutation.mutate : undefined,
    mutateAsync: hasPermission(resource, action)
      ? mutation.mutateAsync
      : undefined,
    canExecute: hasPermission(resource, action),
  };
}
