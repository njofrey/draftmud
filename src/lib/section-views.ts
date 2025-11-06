/**
 * Section view tracking
 * Uses IntersectionObserver to track when sections enter viewport
 * Threshold 0.5, delay 700ms before emitting
 */

import { trackEvent } from "./analytics";

const viewedSections = new Set<string>();
let observer: IntersectionObserver | null = null;

/**
 * Get section title from first h2 or h3 element
 */
function getSectionTitle(element: HTMLElement): string | undefined {
  const heading = element.querySelector("h2, h3");
  return heading?.textContent?.trim() || undefined;
}

/**
 * Initialize section view tracking
 */
export function initSectionViewTracking(): () => void {
  // Reset viewed sections on new page
  viewedSections.clear();

  if (typeof window === "undefined" || !window.IntersectionObserver) {
    return () => {};
  }

  // Cleanup existing observer
  if (observer) {
    observer.disconnect();
  }

  const timeouts = new Map<HTMLElement, NodeJS.Timeout>();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const sectionId = element.getAttribute("data-section") || element.id;

        if (!sectionId) return;

        // Clear existing timeout for this element
        const existingTimeout = timeouts.get(element);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
          timeouts.delete(element);
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Delay 700ms before tracking
          const timeout = setTimeout(() => {
            if (!viewedSections.has(sectionId)) {
              viewedSections.add(sectionId);

              const title = getSectionTitle(element);
              const params: Record<string, any> = { section_id: sectionId };
              if (title) {
                params.page_section_title = title;
              }

              trackEvent("view_section", params);
            }
            timeouts.delete(element);
          }, 700);

          timeouts.set(element, timeout);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px",
    }
  );

  // Observe only critical sections: hero, portfolio, contact
  const criticalSections = document.querySelectorAll(
    "section#hero[data-section='hero'], section#portfolio[data-section='portfolio'], section#contact[data-section='contact']"
  );

  criticalSections.forEach((section) => {
    observer?.observe(section);
  });

  // Return cleanup function
  return () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    timeouts.forEach((timeout) => clearTimeout(timeout));
    timeouts.clear();
  };
}


