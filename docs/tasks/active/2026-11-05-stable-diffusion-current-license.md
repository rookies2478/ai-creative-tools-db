---
task_id: "2026-11-05-stable-diffusion-current-license"
created_at: "2026-11-05"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: true
db_change: true
ui_change: false
official_verification_required: true

goal: "Growth Loop ranking candidateかつfreshness overdueのStable Diffusionについて、2026-11-05時点の公式Core Models・License・Stable Imageページを再確認し、現行モデル/ライセンス根拠とfreshness metadataを同期する。API料金は2026-10-31確認済みのため変更しない。"

target_files:
  - docs/tasks/active/2026-11-05-stable-diffusion-current-license.md
  - docs/tasks/completed/2026-11-05-stable-diffusion-current-license.md
  - src/content/tools/stable-diffusion.md
  - src/pages/tools/stable-diffusion/index.astro

reference_files:
  - docs/decisions/pricing-status-classification-policy.md

unknowns:
  - "コミュニティ配布の派生モデル/LoRAは各配布元ライセンスを個別確認"
  - "旧SD 1.x/2.x/SDXLの個別ライセンスは現行Core Models一覧のCommunity License対象と同一視しない"

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "current official page still identifies Stable Diffusion 3.5 as current most powerful image family"
  - "2026-05-20 Core Models list and current Community License revenue threshold are reflected"
  - "no API pricing churn; 2026-10-31 pricing evidence preserved"
  - "review dates updated only after actual source verification"

forbidden_operations:
  - MODIFY_AFFILIATE_LINKS
  - MODIFY_GLOBAL_ANALYTICS
  - MODIFY_SCHEMA
  - MODIFY_COMPARISON_LOGIC
---

# Verified official sources — 2026-11-05

- https://stability.ai/license
- https://stability.ai/core-models
- https://stability.ai/stable-image
- https://platform.stability.ai/docs/release-notes

# Decision

No broad rewrite: current page is materially aligned. Apply a narrow factual/freshness update and preserve the 2026-10-31 API-pricing review.