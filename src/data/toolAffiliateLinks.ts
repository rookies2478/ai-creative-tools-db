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

// InVideo AI: affiliatePrograms.ts上ではcandidate/not_appliedであり、
// 実在確認できる承認済みURLが存在しないため、公開エントリはまだ作成しない。
// 承認済みURL取得後にここへ1件追加すればよい（コンポーネント側の変更は不要）。
export const toolAffiliateLinks: ToolAffiliateLink[] = [];
