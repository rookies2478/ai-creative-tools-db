/*
  ctaPlacement.ts
  CTA placement naming: single explicit mapping between
    - DOM / GA4 placement  (data-cta-position -> event params `placement`, legacy `cta_position`)
    - toolAffiliateLinks.LinkPlacement (affiliate link table key)
  Canonical doc: docs/analytics/cta-event-schema.md ("Placement mapping").
  Pure module (no runtime imports) so scripts/ can import it directly under Node.
*/
import type { LinkPlacement } from '../data/toolAffiliateLinks';

/** Every value allowed in `data-cta-position` / `ctaPosition`. */
export const CTA_PLACEMENTS = [
  'hero', // main CTA at top of the page
  'primary', // default for primaryCta when no ctaPosition is given (ToolDetailPage fallback)
  'pricing', // pricing-plan CTA
  'secondary', // default for secondaryCta when no ctaPosition is given (ToolDetailPage fallback)
  'checklist', // CTA at the end of the checklist section
  'table', // official link inside a comparison / quick table cell
  'source', // official info / usage-guide button
  'terms', // terms-of-use button
] as const;
export type CtaPlacement = (typeof CTA_PLACEMENTS)[number];

/** Affiliate link table key -> the DOM placement that renders it. Exhaustive over LinkPlacement. */
export const LINK_PLACEMENT_TO_CTA_PLACEMENT: Record<LinkPlacement, CtaPlacement> = {
  primary: 'hero',
  pricing: 'pricing',
};

/**
 * DOM placement -> affiliate link table key. Only these DOM placements may ever carry an affiliate link;
 * every other placement (secondary, table, source, terms) is official-only by design.
 */
export const CTA_PLACEMENT_TO_LINK_PLACEMENT: Partial<Record<CtaPlacement, LinkPlacement>> = {
  hero: 'primary',
  primary: 'primary',
  checklist: 'primary',
  pricing: 'pricing',
};

export function isCtaPlacement(value: string): value is CtaPlacement {
  return (CTA_PLACEMENTS as readonly string[]).includes(value);
}

/** Canonical DOM placement for an affiliate link-table placement. */
export function toCtaPlacement(linkPlacement: LinkPlacement): CtaPlacement {
  return LINK_PLACEMENT_TO_CTA_PLACEMENT[linkPlacement];
}

/** Link-table placement for a DOM placement, or null when the slot is official-only. */
export function toLinkPlacement(ctaPlacement: string): LinkPlacement | null {
  return isCtaPlacement(ctaPlacement) ? (CTA_PLACEMENT_TO_LINK_PLACEMENT[ctaPlacement] ?? null) : null;
}
