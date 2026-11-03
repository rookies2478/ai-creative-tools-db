---
task_id: "2026-11-02-cta-tracking-audit"
created_at: "2026-11-02"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "全ツールのoutbound CTA計測(official_site_click/affiliate_click)を静的監査し、計測漏れ修正・event schema統一・CI検知を追加する"

non_goals:
  - affiliate URL・href・rel・target・文言の変更
  - GA4/GSC/ASP設定変更
  - 本番デプロイ

target_files:
  - docs/tasks/active/2026-11-02-cta-tracking-audit.md
  - docs/analytics/cta-event-schema.md
  - scripts/audit-cta-tracking.mjs
  - scripts/test-audit-cta-tracking.mjs
  - reports/cta-tracking-audit.md
  - reports/cta-tracking-audit.json
  - package.json
  - .github/workflows/build.yml
  - src/layouts/BaseLayout.astro
  - src/components/ToolDetailPage.astro
  - src/components/AdobeFireflyTool.astro
  - src/pages/tools/[slug].astro
  - src/pages/tools/invideo-ai/index.astro

reference_files:
  - docs/tasks/LATEST.md

unknowns:
  - GA4実到達(実ブラウザクリック)はNOT_VERIFIED

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run audit:cta:test
  - npm run audit:cta
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - audit:cta errors 0
  - 全toolページのprimary/secondary CTAがdata-outbound-type付き

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Fork作業用。Draft PRのみ。
