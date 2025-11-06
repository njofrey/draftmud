/**
 * Scroll depth tracking
 * Emits scroll_depth events at 50% and 100% thresholds once
 */

import { trackEvent } from "./analytics";

const thresholds = [50, 100]; // Solo 50% y 100% para reducir volumen
const trackedThresholds = new Set<number>();

/**
 * Calculate scroll percentage of document
 */
function getScrollDepth(): number {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const scrollableHeight = documentHeight - windowHeight;
  if (scrollableHeight <= 0) return 0;

  const scrolled = scrollTop / scrollableHeight;
  return Math.round(scrolled * 100);
}

/**
 * Initialize scroll depth tracking
 */
export function initScrollDepthTracking(): () => void {
  // Reset tracked thresholds on new page
  trackedThresholds.clear();

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const depth = getScrollDepth();

        // Check each threshold
        for (const threshold of thresholds) {
          if (depth >= threshold && !trackedThresholds.has(threshold)) {
            trackedThresholds.add(threshold);
            trackEvent("scroll_depth", { percent: threshold });
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}


