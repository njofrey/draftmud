/**
 * Carousel slide change tracking
 * Supports Swiper, Embla, or MutationObserver fallback
 */

import { trackEvent } from "./analytics";

const trackedSlideChanges = new Set<string>();

/**
 * Create unique key for slide change tracking
 */
function getSlideKey(carouselId: string, slideId: string | number): string {
  return `${carouselId}_${slideId}`;
}

/**
 * Track slide change event
 */
function trackSlideChange(
  carouselId: string,
  slideId: string | number | null,
  slideIndex: number | null
): void {
  const key = getSlideKey(carouselId, slideId || slideIndex || 0);
  if (trackedSlideChanges.has(key)) return;

  trackedSlideChanges.add(key);

  const params: Record<string, any> = { carousel_id: carouselId };
  if (slideId) {
    params.slide_id = slideId;
  } else if (slideIndex !== null) {
    params.slide_index = slideIndex;
  }

  trackEvent("slide_change", params);
}

/**
 * Initialize Swiper tracking
 */
function initSwiperTracking(carousel: HTMLElement): () => void {
  // Check if Swiper is available
  if (typeof (window as any).Swiper === "undefined") {
    return () => {};
  }

  const carouselId = carousel.getAttribute("data-carousel") || "unknown";
  let swiperInstance: any = null;

  // Try to find Swiper instance
  const swiperData = (carousel as any).swiper;
  if (swiperData) {
    swiperInstance = swiperData;
  } else {
    // Look for swiper instance in parent
    const parent = carousel.closest(".swiper");
    if (parent) {
      swiperInstance = (parent as any).swiper;
    }
  }

  if (!swiperInstance) return () => {};

  const handleSlideChange = () => {
    const activeIndex = swiperInstance.activeIndex;
    const slides = swiperInstance.slides || [];
    const activeSlide = slides[activeIndex];
    const slideId = activeSlide?.getAttribute("data-slide-id") || null;

    trackSlideChange(carouselId, slideId, activeIndex);
  };

  swiperInstance.on("slideChange", handleSlideChange);

  return () => {
    swiperInstance?.off("slideChange", handleSlideChange);
  };
}

/**
 * Initialize Embla tracking
 */
function initEmblaTracking(carousel: HTMLElement): () => void {
  // Find viewport - Embla uses refs, so we need to find the actual viewport element
  const viewport = carousel.querySelector("[ref]") || 
                   Array.from(carousel.children).find(
                     (el) => el.classList.contains("overflow-hidden") || 
                             (el as HTMLElement).style.overflow === "hidden"
                   ) as HTMLElement | undefined;

  if (!viewport) {
    // Fallback: use MutationObserver if Embla not yet initialized
    return initMutationObserverTracking(carousel);
  }

  // Try to find Embla API - it might be stored in React ref or global
  // For now, use MutationObserver as fallback since we can't access React refs directly
  return initMutationObserverTracking(carousel);
}

/**
 * Initialize MutationObserver fallback
 */
interface VisibleSlide {
  element: HTMLElement;
  ratio: number;
}

function initMutationObserverTracking(carousel: HTMLElement): () => void {
  const carouselId = carousel.getAttribute("data-carousel") || "unknown";
  let lastActiveSlideId: string | null = null;
  let checkInterval: NodeJS.Timeout | null = null;

  const checkActiveSlide = () => {
    // Find all slides with data-slide-id or data-slide-index
    const slides = Array.from(
      carousel.querySelectorAll("[data-slide-id], [data-slide-index]")
    ) as HTMLElement[];

    // Find the most visible slide (highest intersection ratio)
    let mostVisible: VisibleSlide | null = null;

    slides.forEach((slide) => {
      const element = slide as HTMLElement;
      const rect = element.getBoundingClientRect();
      const carouselRect = carousel.getBoundingClientRect();
      
      // Calculate intersection
      const intersectionLeft = Math.max(rect.left, carouselRect.left);
      const intersectionRight = Math.min(rect.right, carouselRect.right);
      const intersectionWidth = Math.max(0, intersectionRight - intersectionLeft);
      const ratio = intersectionWidth / rect.width;

      // Check for active classes as fallback
      const hasActiveClass =
        element.classList.contains("active") ||
        element.classList.contains("is-active") ||
        element.classList.contains("swiper-slide-active") ||
        element.classList.contains("embla__slide--selected") ||
        element.style.opacity === "1" ||
        element.style.transform?.includes("translateX(0%)") ||
        element.style.transform?.includes("translate3d(0%");

      const shouldUpdate = ratio > 0.5 || hasActiveClass;
      const isBetter = mostVisible === null || ratio > mostVisible.ratio;
      
      if (shouldUpdate && isBetter) {
        mostVisible = { element: element, ratio };
      }
    });

    if (mostVisible !== null) {
      const visible: VisibleSlide = mostVisible;
      const slideId = visible.element.getAttribute("data-slide-id");
      const slideIndex = visible.element.getAttribute("data-slide-index");
      const currentKey = slideId || slideIndex || "unknown";

      if (currentKey !== lastActiveSlideId) {
        lastActiveSlideId = currentKey;
        trackSlideChange(
          carouselId,
          slideId || null,
          slideIndex ? parseInt(slideIndex, 10) - 1 : null
        );
      }
    }
  };

  // Initial check
  setTimeout(checkActiveSlide, 100);

  // Periodic check for slide changes with throttle (solo cambios manuales o cada 3s)
  let lastTrackTime = 0;
  const throttleMs = 3000; // Solo track cada 3 segundos máximo
  
  checkInterval = setInterval(() => {
    const now = Date.now();
    if (now - lastTrackTime >= throttleMs) {
      checkActiveSlide();
      lastTrackTime = now;
    }
  }, 500);

  const observer = new MutationObserver(() => {
    // Debounce checks on mutations
    setTimeout(checkActiveSlide, 100);
  });

  observer.observe(carousel, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style", "data-slide-id", "data-slide-index"],
  });

  return () => {
    observer.disconnect();
    if (checkInterval) {
      clearInterval(checkInterval);
    }
  };
}

/**
 * Initialize carousel tracking for all carousels
 */
export function initCarouselTracking(): () => void {
  // Reset tracked changes on new page
  trackedSlideChanges.clear();

  const carousels = document.querySelectorAll("[data-carousel]");
  const cleanupFunctions: (() => void)[] = [];

  carousels.forEach((carousel) => {
    const element = carousel as HTMLElement;

    // Try Swiper first
    const swiperCleanup = initSwiperTracking(element);
    if (swiperCleanup) {
      cleanupFunctions.push(swiperCleanup);
      return;
    }

    // Try Embla
    const emblaCleanup = initEmblaTracking(element);
    if (emblaCleanup) {
      cleanupFunctions.push(emblaCleanup);
      return;
    }

    // Fallback to MutationObserver
    const observerCleanup = initMutationObserverTracking(element);
    cleanupFunctions.push(observerCleanup);
  });

  // Return cleanup function
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
}

