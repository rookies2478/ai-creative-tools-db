/*
  resolveToolOutboundLink()
  ツールの外向きCTA（購入・申込導線）のURL/rel/disclosureを解決する共通ヘルパー。
  公開CTA承認済みリンクのファイルのみを参照する（調査・申請管理層のファイルは直接参照しない）。
  根拠: docs/audits/affiliate-comparison-category-link-audit-2026-07-28.md 14章・15章
*/
import { toolAffiliateLinks } from '../data/toolAffiliateLinks';

export interface ResolvedOutboundLink {
  url: string;
  linkType: 'affiliate' | 'official';
  rel: string;
  isAffiliate: boolean;
  disclosureRequired: boolean;
  provider?: string;
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
}: {
  toolSlug: string;
  officialUrl: string;
}): ResolvedOutboundLink {
  if (!officialUrl || !isValidHttpUrl(officialUrl)) {
    throw new Error(`resolveToolOutboundLink: officialUrl が無効です (toolSlug=${toolSlug})`);
  }

  const entry = toolAffiliateLinks.find((link) => link.toolSlug === toolSlug);

  const isUsable =
    !!entry &&
    entry.enabled === true &&
    entry.approvalStatus === 'approved' &&
    !!entry.url &&
    isValidHttpUrl(entry.url);

  if (isUsable && entry) {
    return {
      url: entry.url,
      linkType: 'affiliate',
      rel: 'sponsored nofollow noopener noreferrer',
      isAffiliate: true,
      disclosureRequired: entry.disclosureRequired === true,
      provider: entry.provider,
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
