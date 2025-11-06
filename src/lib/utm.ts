const STORAGE_KEY = "estudio_mud_utm";

type RawValue = string | null;

export type UtmParams = Partial<
  Record<
    | "utm_source"
    | "utm_medium"
    | "utm_campaign"
    | "utm_term"
    | "utm_content"
    | "gclid"
    | "fbclid",
    string
  >
>;

const trackedKeys: Array<keyof UtmParams> = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

const isBrowser = (): boolean => typeof window !== "undefined";

const parseStored = (): UtmParams => {
  if (!isBrowser()) return {};
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored) as UtmParams;
    return parsed ?? {};
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return {};
  }
};

export function captureUtm(): void {
  if (!isBrowser()) return;

  const url = new URL(window.location.href);
  const existing = parseStored();
  let hasNew = false;
  const next: UtmParams = { ...existing };

  trackedKeys.forEach((key) => {
    const value: RawValue = url.searchParams.get(key);
    if (value && value !== next[key]) {
      next[key] = value;
      hasNew = true;
    }
  });

  if (hasNew) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
}

export function getUtm(): UtmParams {
  if (!isBrowser()) return {};
  return parseStored();
}

