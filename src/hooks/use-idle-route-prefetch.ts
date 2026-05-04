"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface UseIdleRoutePrefetchOptions {
  enabled?: boolean;
  delayMs?: number;
}

const prefetchedRoutes = new Set<string>();

export function useIdleRoutePrefetch(
  routes: string[],
  options: UseIdleRoutePrefetchOptions = {}
) {
  const router = useRouter();
  const { enabled = true, delayMs = 1200 } = options;

  useEffect(() => {
    if (!enabled || routes.length === 0) return;
    if (typeof window === "undefined") return;

    const uniqueRoutes = routes.filter((route) => {
      if (prefetchedRoutes.has(route)) return false;
      prefetchedRoutes.add(route);
      return true;
    });

    if (uniqueRoutes.length === 0) return;

    const prefetch = () => {
      for (const route of uniqueRoutes) {
        router.prefetch(route);
      }
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: delayMs + 2000 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = globalThis.setTimeout(prefetch, delayMs);
    return () => globalThis.clearTimeout(timer);
  }, [delayMs, enabled, router, routes]);
}
