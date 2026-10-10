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
    toolSlug: 'pixverse',
    status: 'active',
    preferredProvider: 'PixVerse Affiliate',
    programs: [{
      provider: 'PixVerse',
      network: 'Impact',
      programName: 'PixVerse Affiliate',
      approvalStatus: 'approved',
      commissionType: 'unknown',
      japanEligible: 'unknown',
      mediaEligible: 'unknown',
      sourceType: 'official',
      verifiedAt: '2026-10-11',
      notes: 'Approval independently confirmed by direct message from PixVerse representative Yuri (2026-08-31). No dedicated referral link has been verified or activated. Inquiry sent 2026-10-11; Japan eligibility and terms pending.',
    }],
    verifiedAt: '2026-10-11',
    notes: 'Approved does NOT mean an affiliate link is published; public CTA remains the ordinary official URL pending verified tracking URL and eligibility.',
  },
  {
    toolSlug: 'fotor',
    status: 'verify',
    programs: [{
      provider: 'Fotor',
      approvalStatus: 'applied',
      sourceType: 'official',
      verifiedAt: '2026-10-11',
      notes: 'User reports submitted application 2026-10-10; OTP emails are login authentication, NOT approval. No confirmation or tracking URL verified.',
    }],
    verifiedAt: '2026-10-11',
  },
  {
    toolSlug: 'runway',
    status: 'verify',
    programs: [{
      provider: 'Runway',
      approvalStatus: 'applied',
      sourceType: 'official',
      verifiedAt: '2026-10-11',
      notes: 'User reports initial application August 2026 and reapplication/follow-up completion October 10. No approval/rejection notification verified. No affiliate URL.',
    }],
    verifiedAt: '2026-10-11',
  },

  {
    toolSlug: 'invideo-ai',
    status: 'active',
    preferredProvider: 'Impact / InVideo',
    programs: [
      {
        provider: 'InVideo',
        network: 'Impact',
        programName: 'InVideo application',
        commissionType: 'percentage',
        commissionValue: '月額プラン初月50%／年額プラン初年25%（リカーリングなし）',
        cookieDays: 120,
        japanEligible: 'unknown',
        mediaEligible: 'unknown',
        approvalStatus: 'approved',
        sourceType: 'official',
        verifiedAt: '2026-08-01',
        notes:
          'Default Copy Link destination returned an error. Replaced with a working deep link created through Impact.',
      },
    ],
    verifiedAt: '2026-08-01',
    notes:
      'Default Copy Link destination returned an error. Replaced with a working deep link created through Impact.',
  },
];
