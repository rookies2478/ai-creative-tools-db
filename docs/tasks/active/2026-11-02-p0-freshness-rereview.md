---
task_id: "2026-11-02-p0-freshness-rereview"
created_at: "2026-11-02"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: true

goal: "Issue #34: freshness queue P0 4件（Haiper / PixVerse / SeaArt AI / Vidu AI）を2026-11-02時点の公式一次情報で再確認し、確認できた stale claim と freshness metadata だけを最小修正する。"

non_goals:
  - "affiliate URL / approval state / commission claimの変更"
  - "schema / validator / UI / comparison logicの変更"
  - "production deploy"
  - "公式一次情報から確認できない価格を推測すること"
  - "Haiper consumer serviceが復活したと推測すること"
  - "Vidu API/platform termsをconsumer planへ無条件適用すること"

target_files:
  - docs/tasks/active/2026-11-02-p0-freshness-rereview.md
  - docs/audits/p0-freshness-rereview-2026-11-02.md
  - src/content/tools/haiper.md
  - src/content/tools/pixverse.md
  - src/content/tools/seaart-ai.md
  - src/content/tools/vidu-ai.md
  - src/pages/tools/haiper/index.astro
  - src/pages/tools/pixverse/index.astro
  - src/pages/tools/seaart-ai/index.astro
  - src/pages/tools/vidu-ai/index.astro
  - docs/tasks/LATEST.md

reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/freshness-queue-2026-11-02.md
  - docs/tasks/completed/2026-11-02-freshness-queue.md

unknowns:
  - "SeaArt current public Mallの正確な金額表示は動的で、取得証拠では未確認"
  - "Vidu consumer pricing pageの正確な現行plan金額は取得証拠では未確認"
  - "Haiper consumer serviceの現行availability / pricingは未確認"

preexisting_untracked_files: []

required_checks:
  - npm ci
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "PixVerseの商用利用条件・Basic credit情報・Web pricing claimが現行公式情報と整合"
  - "SeaArtのcommercialUseが公式FAQに沿ったcaveated classificationへ更新され、未確認価格を捏造しない"
  - "Viduのcurrent model claimがQ4/Q4 Previewへ更新され、consumer pricingは未確認部分を明示"
  - "Haiperはservice_changedを維持し、current review結果だけを記録"
  - "4件ともlastReviewed / relevant reviewed metadataを2026-11-02 reviewに整合"
  - "affiliate data / URL / CTAは無変更"
  - "static override詳細ページとtool DBの公開claimが同じEvidenceへ整合"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - AFFILIATE_LINK_CHANGE
  - SCHEMA_CHANGE
---

# Task

## Background

Issue #32 freshness queueのP0 4件を、Issue #34の公式一次情報確認結果に基づき再レビューする。

## Evidence rule

公式価格ページ / 公式Terms / 公式product pageを優先する。
公式ページで金額を取得できない場合はpricingStatus policyに従い、partial / unconfirmedを維持する。
二次情報だけで現行価格・商用利用を確定しない。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED
```
