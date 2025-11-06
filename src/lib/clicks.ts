/**
 * Click tracking delegation
 * Tracks CTA clicks, outbound links, and contact links
 */

import { trackEvent } from "./analytics";

const trackedClicks = new Set<string>();

/**
 * Extract and normalize domain from URL
 * Returns lowercase domain without www prefix
 */
function getDomain(href: string): string | null {
  try {
    const url = new URL(href);
    let domain = url.hostname.toLowerCase();
    // Remove www prefix
    if (domain.startsWith("www.")) {
      domain = domain.substring(4);
    }
    return domain;
  } catch {
    return null;
  }
}

/**
 * Extract contact method from href
 */
function getContactMethod(href: string): "email" | "phone" | "whatsapp" {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp";
  return "email"; // default
}

/**
 * Create unique key for click tracking to prevent duplicates
 */
function getClickKey(element: HTMLElement, eventType: string): string {
  const id = element.getAttribute("data-cta-id") || 
             element.getAttribute("href") || 
             element.getAttribute("data-track");
  return `${eventType}_${id || Math.random()}`;
}

/**
 * Initialize click tracking delegation
 */
export function initClickTracking(): () => void {
  // Reset tracked clicks on new page
  trackedClicks.clear();

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a, button") as HTMLElement | null;
    
    if (!link) return;

    // Track CTA clicks
    const ctaId = link.getAttribute("data-cta-id");
    const ctaLoc = link.getAttribute("data-cta-loc");
    if (ctaId) {
      const key = getClickKey(link, "cta");
      if (!trackedClicks.has(key)) {
        trackedClicks.add(key);
        trackEvent("cta_click", {
          cta_id: ctaId,
          cta_location: ctaLoc,
        });
      }
    }

    // Track outbound clicks
    const trackType = link.getAttribute("data-track");
    const href = link.getAttribute("href");
    
    if (trackType === "outbound" && href) {
      const domain = getDomain(href);
      if (domain) {
        const key = getClickKey(link, "outbound");
        if (!trackedClicks.has(key)) {
          trackedClicks.add(key);
          trackEvent("outbound_click", {
            outbound_domain: domain,
          });
        }
      }
    }

    // Track contact clicks
    if (trackType === "contact" && href) {
      const method = getContactMethod(href);
      const key = getClickKey(link, "contact");
      if (!trackedClicks.has(key)) {
        trackedClicks.add(key);
        trackEvent("contact_click", {
          contact_method: method,
        });
      }
    }
  };

  document.addEventListener("click", handleClick, true);

  // Return cleanup function
  return () => {
    document.removeEventListener("click", handleClick, true);
  };
}


