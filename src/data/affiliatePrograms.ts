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
    preferredProvider: 'PixVerse Affiliate / Impact',
    programs: [{
      provider: 'PixVerse',
      network: 'Impact',
      programName: 'PixVerse Affiliate',
      approvalStatus: 'approved',
      commissionType: 'percentage',
      commissionValue: '2026-11-05に操作者がImpact契約画面で確認：Online Sale 30%、Deposit 30%、Renewal 30%（更新報酬は1顧客あたり最大12回）。公式の個別契約条件であり、30%を全顧客の生涯継続報酬と誤認しない。',
      cookieDays: 90,
      japanEligible: 'yes',
      mediaEligible: 'unknown',
      sourceType: 'network',
      verifiedAt: '2026-11-05',
      notes: '2026-11-05に認証済みImpact画面を操作者が確認：PixVerse Affiliate program 49478、契約2026-08-02発効、90日last-click。日本の有料購入者は報酬対象と2026-10-12のパートナー回答で確認（japanEligible=yesは購入者側の適格のみを表す）。個別Link Creator URLは取得済みだが最終遷移先未検証。日本在住パブリッシャーの送金適格、SEO記事・X等の掲載媒体許可、具体的な支払方法はUNKNOWN。自己クリック・テスト注文・実報酬の主張はしない。操作者確認をGPTの再ログイン確認とは表現しない。詳細証拠と未確認ゲートはIssue #36。',
    }],
    verifiedAt: '2026-11-05',
    notes: 'Research metadata only. Impact契約は操作者が確認したが、公開CTAの許可・リンク終点・媒体適格・日本パブリッシャーへの送金条件は未確認。src/data/toolAffiliateLinks.tsにPixVerseを追加しておらず、公開サイトのリンクは承認済みの公式URLへのフォールバックを維持。',
  },
  {
    toolSlug: 'fotor-ai',
    status: 'active',
    preferredProvider: 'Fotor / Tolt',
    programs: [{
      provider: 'Fotor',
      network: 'Tolt',
      programName: 'Fotor Affiliate Program',
      approvalStatus: 'approved',
      commissionType: 'percentage',
      commissionValue: '対象有料サブスクリプションの25%。ユーザーがプラン変更しない限り最長12か月継続（Fotor Partnerships 2026-11-05返信）',
      japanEligible: 'yes',
      mediaEligible: 'yes',
      sourceType: 'official',
      verifiedAt: '2026-11-05',
      notes: 'Fotor Partnershipsが2026-11-05に承認済みアカウントを確認。affiliates.fotor.comはTolt基盤。固有ref=yoheiはFotor配下の任意ページへ付与可。オーガニック検索のレビュー・比較記事を歓迎。支払いは有効化月の3か月目初旬にaffiliate account email宛PayPal。cookie/attribution日数は返信で未確認のため記録しない。',
    }],
    verifiedAt: '2026-11-05',
    notes: 'Account-specific approval and tracking pattern verified directly by Fotor Partnerships. Public CTA may use the approved ref=yohei links with disclosure and affiliate-click measurement.',
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
