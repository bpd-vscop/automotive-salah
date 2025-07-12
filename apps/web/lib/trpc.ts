// filepath: apps/web/lib/trpc.ts
// tRPC client setup for customer website (apps/web)
// Connects your existing components to real backend data

"use client";

import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { type AppRouter } from "@automotive/trpc";

export const trpc = createTRPCReact<AppRouter>();

/**
 * tRPC client configuration for customer website
 * Uses httpBatchLink for efficient request batching
 */
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative URL
    return "";
  }

  if (process.env.VERCEL_URL) {
    // SSR should use vercel URL
    return `https://${process.env.VERCEL_URL}`;
  }

  // Dev SSR should use localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpcClientConfig = {
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      // Optional: Add headers for authentication
      headers() {
        return {
          "x-trpc-source": "client",
        };
      },
    }),
  ],
};
