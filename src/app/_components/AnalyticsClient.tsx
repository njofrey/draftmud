"use client";

/**
 * Analytics Client Component
 * Handles page view tracking on route changes
 * Only tracks route changes, not initial render
 */

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    fbq?: (
      command: string,
      event: string,
      params?: Record<string, any>
    ) => void;
  }
}

function AnalyticsClientInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    // Skip first render - only track route changes (not hash-only changes)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      lastPathname.current = pathname;
      return;
    }

    // Skip if only hash changed (hash links don't trigger page_view)
    if (lastPathname.current === pathname) {
      return;
    }

    lastPathname.current = pathname;

    // Wait for scripts to be ready
    if (typeof window === "undefined") return;

    const pagePath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    const pageTitle = document.title;
    const pageLocation = window.location.href;

    // Track GA4 page view
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_location: pageLocation,
        page_path: pagePath,
        page_title: pageTitle,
      });
    }

    // Track Meta Pixel page view (only on route changes, not initial load)
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsClient() {
  return (
    <Suspense fallback={null}>
      <AnalyticsClientInner />
    </Suspense>
  );
}


