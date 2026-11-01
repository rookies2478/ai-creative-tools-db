---
task_id: "2026-11-01-measurement-safety"
created_at: "2026-11-01"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "GA4/Clarityをcanonical production hostnameでのみ初期化し、outbound CTAのdestination_urlからquery/hashを除去して計測汚染と不要なURL情報送信を防ぐ。"

non_goals:
  - "GA4 Measurement ID変更"
  - "Clarity Project ID変更"
  - "affiliate URL・CTA URL・CTA label・navigation変更"
  - "Consent UIやPrivacy Policyの再設計"
  - "本番手動デプロイ"

target_files:
  - src/layouts/BaseLayout.astro
  - src/utils/measurementSafety.mjs
  - scripts/test-measurement-safety.mjs
  - package.json
  - docs/tasks/active/2026-11-01-measurement-safety.md
  - docs/audits/measurement-safety-2026-11-01.md

reference_files:
  - CLAUDE.md
  - AGENTS.md
  - docs/tasks/LATEST.md
  - src/data/toolAffiliateLinks.ts
  - src/components/ToolDetailPage.astro

unknowns:
  - "GA4 Realtime / Clarity実到達は本番反映後のHuman/Browser確認が必要"
  - "custom domain以外のhostnameでは計測を意図的に初期化しない"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run test:measurement-safety
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "production buildかつhostnameがaicreative-db.comのときだけGA4/Clarity初期化"
  - "Cloudflare Pages preview hostnameではGA4/Clarityを初期化しない"
  - "destination_urlはhttp(s) origin+pathnameのみでquery/hashを送らない"
  - "既存GA4/Clarity ID、affiliate URL、CTA挙動は不変"
  - "専用回帰テストがbuild前に実行されCIでも通る"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Issue #22。計測安全性の最小修正。
