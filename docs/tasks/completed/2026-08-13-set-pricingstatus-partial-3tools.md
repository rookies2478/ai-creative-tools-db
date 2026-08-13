---
task_id: "2026-08-13-set-pricingstatus-partial-3tools"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: false

goal: "docs/decisions/pricing-status-classification-policy.mdおよび2026-08-13完了済み監査（docs/audits/pricing-status-missing-fields-audit-2026-08-13.md）でSAFE_TO_SET_FROM_CURRENT_EVIDENCEと判定された3ツール（d-id/heygen/synthesia）にのみ、明示的なpricingStatus: partialを新規追加する。既存の価格金額・通貨・freePlan・source・officialUrl・verifiedAt等の他フィールドは一切変更しない。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - invideo-ai/kling-ai/stable-diffusion/tensor-artの変更（VERIFY_REQUIRED、対象外）
  - 新規のpricing調査・Web確認
  - 価格金額・通貨・freePlan変更
  - verifiedAt/lastReviewed変更
  - source/officialSourceUrl変更
  - notes/本文の書き換え
  - schema変更
  - validator変更
  - UI変更
  - 記事変更
  - アフィリエイト変更
  - 本番デプロイ
  - パッケージ/依存関係変更

target_files:
  - docs/tasks/active/2026-08-13-set-pricingstatus-partial-3tools.md
  - docs/tasks/completed/2026-08-13-set-pricingstatus-partial-3tools.md
  - docs/tasks/LATEST.md
  - src/content/tools/d-id.md
  - src/content/tools/heygen.md
  - src/content/tools/synthesia.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - src/content/tools/clipdrop.md

unknowns: []

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html

required_checks:
  - npm run validate:task
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "d-id.mdにpricingStatus: \"partial\"が追加される"
  - "heygen.mdにpricingStatus: \"partial\"が追加される"
  - "synthesia.mdにpricingStatus: \"partial\"が追加される"
  - "上記3ファイル以外のsrc/content/tools/*.mdは変更されない"
  - "3ファイルとも他フィールド（価格・通貨・freePlan・source・officialSourceUrl・verifiedAt・lastReviewed・notes等）は無変更"
  - "validate:data PASSかつpricingStatus enumがconfirmedされる"
  - "build PASS"
  - "validate:publish PASS（既存Warningsのみ許容）"

result: >
  d-id.md/heygen.md/synthesia.mdの3ファイルへpricingModel行の直後に`pricingStatus: "partial"`を
  1行のみ追加（各ファイルdiff +1行のみ）。他フィールド（価格金額・通貨・freePlan・source・
  officialSourceUrl・verifiedAt・lastReviewed・notes等）は無変更。docs/decisions/
  pricing-status-classification-policy.mdのSAFE_TO_SET_FROM_CURRENT_EVIDENCE判定・
  2026-08-13監査結果と一致することを実装前に再確認済み。invideo-ai/kling-ai/stable-diffusion/
  tensor-artは無変更。validate:data PASS（Errors 0, Warnings 4=既存microsoft-designer/
  midjourney/runway/stable-diffusionのreview-overdue、本タスク無関係）。build 92ページ PASS。
  validate:publish PASS（Errors 0, Warnings 4=既存long-meta-description、本タスク無関係）。
  git diff --check PASS。validate:scope PASS（変更ファイルはtarget_files内のみ）。
---
