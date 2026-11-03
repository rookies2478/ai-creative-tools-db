/*
  aspSubId.ts
  ASP sub-id builder. Design: docs/analytics/asp-subid-design.md.

  Key = `<tool_slug>.<placement>`  (lowercase ASCII [a-z0-9-] + one "."; max 40 chars; no PII, no timestamp).
  `placement` is the DOM/GA4 placement (see ctaPlacement.ts), so ASP reports join GA4 `tool_slug` + `placement`.

  SAFETY: applyAspSubId() leaves every href byte-for-byte unchanged unless ASP_SUBID_CONFIG.enabled === true
  AND the provider has a param entry with verified === true. Both default OFF / empty because the ASP's
  query parameter name is NOT_VERIFIED (Impact "subId1" is only a candidate). Turning this on is a
  human-approved change (affiliate links are a protected path); audit:cta enforces the guard.
  Pure module, no imports.
*/

export const ASP_SUBID_MAX_LENGTH = 40;

export interface AspSubIdProviderParam {
  /** Query parameter name accepted by the ASP for this provider. */
  param: string;
  /** Must be true only after the param name was confirmed in the ASP console/docs by a human. */
  verified: boolean;
}

export interface AspSubIdConfig {
  enabled: boolean;
  /** Keyed by ToolAffiliateLink.provider, e.g. 'Impact / InVideo'. */
  providerParams: Record<string, AspSubIdProviderParam>;
}

// NOT_VERIFIED: do not add entries / flip `enabled` without console confirmation.
export const ASP_SUBID_CONFIG: AspSubIdConfig = {
  enabled: false,
  providerParams: {},
};

export function sanitizeSubIdPart(value: string): string {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** `<tool_slug>.<placement>`; null when either part sanitizes to empty. Slug is truncated to fit 40 chars. */
export function buildAspSubId(toolSlug: string, placement: string): string | null {
  const place = sanitizeSubIdPart(placement);
  let slug = sanitizeSubIdPart(toolSlug);
  if (!slug || !place) return null;
  const room = ASP_SUBID_MAX_LENGTH - 1 - place.length;
  if (room < 1) return null;
  slug = slug.slice(0, room).replace(/-+$/, '');
  return slug ? `${slug}.${place}` : null;
}

/** Returns `url` unchanged unless the feature is enabled AND the provider param is verified. */
export function applyAspSubId(
  url: string,
  provider: string | undefined,
  subId: string | null,
  config: AspSubIdConfig = ASP_SUBID_CONFIG
): string {
  if (!config.enabled || !subId || !provider) return url;
  const entry = config.providerParams[provider];
  if (!entry || entry.verified !== true || !/^[A-Za-z][A-Za-z0-9_]*$/.test(entry.param)) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set(entry.param, subId);
    return parsed.toString();
  } catch {
    return url;
  }
}
