/*
  resolveToolOutboundLink()
  ツールの外向きCTA（購入・申込導線）のURL/rel/disclosureを解決する共通ヘルパー。
  公開CTA承認済みリンクのファイルのみを参照する（調査・申請管理層のファイルは直接参照しない）。
  根拠: docs/audits/affiliate-comparison-category-link-audit-2026-07-28.md 14章・15章
*/
import { toolAffiliateLinks } from '../data/toolAffiliateLinks';
import type { LinkPlacement } from '../data/toolAffiliateLinks';
import { toCtaPlacement } from './ctaPlacement';
import { applyAspSubId, buildAspSubId } from './aspSubId';

export interface ResolvedOutboundLink {
  url: string;
  linkType: 'affiliate' | 'official';
  rel: string;
  isAffiliate: boolean;
  disclosureRequired: boolean;
  provider?: string;
  /** `<tool_slug>.<placement>` ASP sub-id key (informational; only appended to url when ASP_SUBID_CONFIG enables it). */
  subId?: string;
}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function resolveToolOutboundLink({
  toolSlug,
  officialUrl,
  placement = 'primary',
}: {
  toolSlug: string;
  officialUrl: string;
  // link-table placement; DOM placement mapping lives in ./ctaPlacement.ts
  placement?: LinkPlacement;
}): ResolvedOutboundLink {
  if (!officialUrl || !isValidHttpUrl(officialUrl)) {
    throw new Error(`resolveToolOutboundLink: officialUrl が無効です (toolSlug=${toolSlug})`);
  }

  const entry = toolAffiliateLinks.find(
    (link) => link.toolSlug === toolSlug && (link.placement ?? 'primary') === placement
  );

  const isUsable =
    !!entry &&
    entry.enabled === true &&
    entry.approvalStatus === 'approved' &&
    !!entry.url &&
    isValidHttpUrl(entry.url);

  if (isUsable && entry) {
    const subId = buildAspSubId(toolSlug, toCtaPlacement(placement)) ?? undefined;
    return {
      // href is unchanged unless ASP_SUBID_CONFIG.enabled (default OFF, param NOT_VERIFIED)
      url: applyAspSubId(entry.url, entry.provider, subId ?? null),
      linkType: 'affiliate',
      rel: 'sponsored nofollow noopener noreferrer',
      isAffiliate: true,
      disclosureRequired: entry.disclosureRequired === true,
      provider: entry.provider,
      subId,
    };
  }

  return {
    url: officialUrl,
    linkType: 'official',
    rel: 'noopener noreferrer',
    isAffiliate: false,
    disclosureRequired: false,
  };
}
