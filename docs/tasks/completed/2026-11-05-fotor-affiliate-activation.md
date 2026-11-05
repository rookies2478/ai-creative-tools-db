---
task_id: "2026-11-05-fotor-affiliate-activation"
created_at: "2026-11-05"
status: COMPLETED
risk: MEDIUM
current_phase: monetization
production_required: true
db_change: true
ui_change: false
official_verification_required: true

goal: "Fotor公式パートナー返信で承認済み条件・専用リンクを確認したため、Fotor AI詳細ページのprimary/pricing CTAだけを承認済みアフィリエイトリンクへ切り替え、既存の開示・GA4計測を維持する。"

non_goals:
  - "Fotor以外のアフィリエイトURL変更"
  - "ランキング・比較ロジック・料金/商用利用本文の変更"
  - "GA4 property / ASP account / PayPal設定変更"
  - "自己購入・テスト購入・架空CV"

target_files:
  - docs/tasks/active/2026-11-05-fotor-affiliate-activation.md
  - src/data/affiliatePrograms.ts
  - src/data/toolAffiliateLinks.ts
  - src/pages/tools/fotor-ai/index.astro

reference_files:
  - docs/affiliate-link-master.md
  - docs/analytics/cta-event-schema.md

unknowns:
  - "cookie/attribution daysはパートナー返信で明示なし。UNKNOWNのまま扱う"
  - "実CV/売上は未検証"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run audit:cta:test
  - npm run audit:cta
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "Fotorの承認状態・25%条件・Tolt運用・媒体可否を2026-11-05公式返信に整合"
  - "primary/pricing CTAのみ ref=yohei の承認済みURLを使用"
  - "rel=sponsored nofollow noopener noreferrer"
  - "affiliate_click計測属性を維持"
  - "ページ上にアフィリエイト開示を表示"

forbidden_operations:
  - "MODIFY_OTHER_AFFILIATE_LINKS"
  - "MODIFY_GA4_SETTINGS"
  - "SELF_CONVERSION"
---

# Evidence

Connected Gmail thread 1a1ab00355a35a4c, reply from Fotor Partnerships on 2026-11-05:
- affiliates.fotor.com is powered by Tolt;
- account-specific affiliate link: https://www.fotor.com/?ref=yohei;
- ?ref=yohei may be appended to any Fotor-domain page;
- eligible paid subscriptions: 25% commission, continuing up to 12 months if the user does not change plan;
- payout via PayPal at the beginning of the third month to the affiliate-account email;
- organic-search reviews and comparison articles are encouraged.

Do not store email authentication codes or payout credentials.

# Closeout

Implementation completed on branch after Build/CTA/data/publish validation. Production release is performed only after PR merge and Cloudflare verification. No conversion or revenue is claimed before dashboard evidence.
