/**
 * Analytics tracking utilities
 * Centralized event tracking for GA4 and Meta Pixel
 */

export type EventName =
  | "page_view"
  | "view_section"
  | "scroll_depth"
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "generate_lead"
  | "contact_click"
  | "outbound_click"
  | "slide_change";

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

/**
 * Clean undefined values from params object
 */
function cleanParams(params?: Record<string, any>): Record<string, any> {
  if (!params) return {};
  const cleaned: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * Track event to GA4 and Meta Pixel
 */
export function trackEvent(
  name: EventName,
  params?: Record<string, any>
): void {
  // Only track in production
  if (process.env.NODE_ENV !== "production") {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("[Analytics]", name, params);
    }
    return;
  }

  if (typeof window === "undefined") return;

  const cleanedParams = cleanParams(params);

  // GA4 tracking
  if (window.gtag) {
    window.gtag("event", name, cleanedParams);
  }

  // Meta Pixel tracking with custom mappings
  if (window.fbq) {
    switch (name) {
      case "view_section":
        window.fbq("track", "ViewContent", {
          content_name: cleanedParams.section_id,
          content_category: "section",
        });
        break;

      case "generate_lead":
        window.fbq("track", "Lead", {
          value: cleanedParams.value,
          currency: cleanedParams.currency || "CLP",
        });
        break;

      case "contact_click":
        window.fbq("track", "Contact", {
          contact_method: cleanedParams.contact_method,
        });
        break;

      default:
        window.fbq("trackCustom", name, cleanedParams);
    }
  }
}


