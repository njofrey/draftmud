"use client";

/**
 * Analytics Boot Component
 * Initializes all tracking: scroll depth, section views, clicks, forms, carousels
 * Only runs in production environment
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { initCarouselTracking } from "@/lib/carousel-track";
import { initClickTracking } from "@/lib/clicks";
import { initScrollDepthTracking } from "@/lib/scroll-depth";
import { initSectionViewTracking } from "@/lib/section-views";
import { captureUtm } from "@/lib/utm";

export function AnalyticsBoot() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtm();

    // Only run in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Wait for DOM to be ready
    if (typeof window === "undefined") return;

    // Verify analytics scripts are loaded
    if (!window.gtag || !window.fbq) {
      console.warn("[Analytics] Scripts not loaded");
      return;
    }

    // Initialize all tracking (Sets are reset inside each init function)
    const cleanupScrollDepth = initScrollDepthTracking();
    const cleanupSectionViews = initSectionViewTracking();
    const cleanupClicks = initClickTracking();
    const cleanupCarousels = initCarouselTracking();

    // Cleanup function: unmount listeners and observers before re-initializing
    return () => {
      // Execute cleanup in reverse order
      cleanupCarousels();
      cleanupClicks();
      cleanupSectionViews();
      cleanupScrollDepth();
    };
  }, [pathname]); // Re-initialize on route change (cleanup runs first)

  return null;
}

