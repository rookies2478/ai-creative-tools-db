---
task_id: "2026-11-05-luma-current-official"
created_at: "2026-11-05"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: true
db_change: true
ui_change: false
official_verification_required: true

goal: "Luma AIの現行公式情報（Ray3.2 / Luma App / 現行プラン構成）へ正本と専用ページを同期し、旧Dream Machine・Ray3・固定価格・無料プラン・商用利用の古い断定を除去する。"

target_files:
  - docs/tasks/active/2026-11-05-luma-current-official.md
  - docs/tasks/completed/2026-11-05-luma-current-official.md
  - src/content/tools/luma-ai.md
  - src/pages/tools/luma-ai/index.astro

reference_files:
  - docs/decisions/pricing-status-classification-policy.md

unknowns:
  - "Luma Appの現行月額金額は公式公開面から安全に抽出できないため断定しない"
  - "Luma Appの恒常無料プラン・現行watermark条件・プラン別commercial-use条件は公開公式情報だけでは確証不足"

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "現行動画モデルをRay3.2として扱う"
  - "Dream Machineを現行モデル/主製品名として扱わない"
  - "現行プラン名Plus/Pro/Ultra/Enterpriseを反映する"
  - "固定$30/$90/$300、Freeプラン、Plus以上商用可の旧断定を除去する"
  - "APIとLuma Appの料金・商用利用条件を混同しない"

forbidden_operations:
  - MODIFY_AFFILIATE_LINKS
  - MODIFY_GLOBAL_ANALYTICS
  - MODIFY_SCHEMA
  - MODIFY_COMPARISON_LOGIC
---

# Verified official sources — 2026-11-05

- https://lumalabs.ai/llm-info — Luma App, current Ray3.2, current plan names Plus/Pro/Ultra/Enterprise, free trial credits.
- https://docs.agents.lumalabs.ai/guides/model/ — Ray3.2 supported create/edit/reframe capabilities and current durations/resolutions.
- https://docs.agents.lumalabs.ai/guides/faq/ — API has no free tier; API billing is pay-as-you-go/provisioned throughput.
- https://docs.lumalabs.ai/docs/faq — legacy/current API FAQ says API outputs have no watermark and may be used commercially.
- https://lumalabs.ai/legal/terms-of-service — current terms and trial restrictions.
- https://lumalabs.ai/legal/billing-policy — Luma App subscription credits and billing behavior.

# Notes

Overdue does not mean wrong. Only source-backed changes are permitted. Exact Luma App prices remain unconfirmed in this task.