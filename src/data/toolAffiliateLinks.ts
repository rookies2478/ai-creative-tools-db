/*
  toolAffiliateLinks.ts
  公開CTA承認済みリンクの正本。ここに存在し enabled:true かつ approvalStatus:"approved" の
  エントリだけが resolveToolOutboundLink() からアフィリエイトURLとして解決される。
  未登録・enabled:false・approvalStatus非approved のツールは officialUrl へ自動fallbackする。
  実在しないURL・仮URLは登録禁止。
  根拠: docs/audits/affiliate-comparison-category-link-audit-2026-07-28.md 15章
*/
import type { ApprovalStatus } from './affiliatePrograms';

export interface ToolAffiliateLink {
  toolSlug: string;
  url: string;
  provider: string;
  enabled: boolean;
  approvalStatus: ApprovalStatus;
  disclosureRequired: boolean;
  verifiedAt: string;
}

export const toolAffiliateLinks: ToolAffiliateLink[] = [
  {
    toolSlug: 'invideo-ai',
    url: 'https://invideo.sjv.io/c/7531370/883681/12258',
    provider: 'Impact / InVideo',
    enabled: true,
    approvalStatus: 'approved',
    disclosureRequired: true,
    verifiedAt: '2026-08-01',
  },
];
