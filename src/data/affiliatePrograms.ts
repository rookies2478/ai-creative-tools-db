/*
  affiliatePrograms.ts
  調査・申請管理層。アフィリエイトプログラムの調査結果・審査状況を記録する。
  CTAコンポーネントから直接参照してはならない（公開判断は toolAffiliateLinks.ts のみが担う）。
  根拠: docs/audits/affiliate-program-management-audit-2026-07-28.md
*/

export type AffiliateResearchStatus =
  | 'active'
  | 'candidate'
  | 'verify'
  | 'hold'
  | 'none'
  | 'rejected'
  | 'ended';

export type ApprovalStatus =
  | 'not_applied'
  | 'applied'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | 'ended';

export interface AffiliateProgramEntry {
  provider: string;
  network?: string;
  programName?: string;
  publicApplicationUrl?: string;
  commissionType?: 'one_time' | 'recurring' | 'fixed' | 'percentage' | 'credit' | 'unknown';
  commissionValue?: string;
  cookieDays?: number;
  japanEligible?: 'yes' | 'no' | 'unknown';
  mediaEligible?: 'yes' | 'no' | 'unknown';
  approvalStatus: ApprovalStatus;
  sourceUrl?: string;
  sourceType: 'official' | 'network' | 'third_party';
  verifiedAt?: string;
  notes?: string;
}

export interface AffiliateProgram {
  toolSlug: string;
  status: AffiliateResearchStatus;
  preferredProvider?: string;
  programs: AffiliateProgramEntry[];
  verifiedAt?: string;
  notes?: string;
}

export const affiliatePrograms: AffiliateProgram[] = [
  {
    toolSlug: 'invideo-ai',
    status: 'candidate',
    preferredProvider: 'InVideo',
    programs: [
      {
        provider: 'InVideo',
        network: 'Impact.com',
        programName: 'InVideo Affiliate Program',
        commissionType: 'percentage',
        commissionValue: '月額プラン初月50%／年額プラン初年25%（リカーリングなし）',
        cookieDays: 120,
        japanEligible: 'unknown',
        mediaEligible: 'unknown',
        approvalStatus: 'not_applied',
        sourceType: 'official',
        verifiedAt: '2026-07-28',
        notes:
          '公開情報ベースで自己申込可・地域制限記載なしを確認済み（GO_CANDIDATE）。ただしASP応募・承認は未実施。実在する承認済みアフィリエイトURLは未取得のため、承認済みURLとして公開利用してはならない。根拠: docs/audits/affiliate-program-management-audit-2026-07-28.md 6.1章。',
      },
    ],
    verifiedAt: '2026-07-28',
    notes: 'pilot対象。承認完了まではtoolAffiliateLinks.tsに公開エントリを作らない、または enabled:false で登録する。',
  },
];
