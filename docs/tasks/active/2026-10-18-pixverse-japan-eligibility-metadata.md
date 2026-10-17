---
task_id: "2026-10-18-pixverse-japan-eligibility-metadata"
created_at: "2026-10-18"
status: READY
risk: LOW
current_phase: affiliate-conversion-validation
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "PixVerseのパートナー返信(2026-10-12)で確認した日本の有料サブスク対象可否を内部調査メタデータにのみ記録し、公開CTAは公式URLのまま維持する"

non_goals:
  - "アフィリエイトURL・追跡リンクの追加や公開CTAの変更をしない"
  - "approvalStatus / statusを変更しない(2026-10-18台帳のWAITING_REPLYとの不整合は報告のみ)"
  - "メール本文・秘密情報を記録しない"
  - "Fotor/Runway/InVideo等の他プログラムを変更しない"

target_files:
  - "src/data/affiliatePrograms.ts"
  - "docs/tasks/active/2026-10-18-pixverse-japan-eligibility-metadata.md"

reference_files:
  - "CLAUDE.md"
  - "docs/tasks/TEMPLATE.md"
  - "src/data/affiliatePrograms.ts"

unknowns:
  - "PixVerseのImpact承認状態(2026-10-18台帳: WAITING_REPLY)と本ファイルのapproved/activeの不整合は未解決"
  - "コミッション条件・追跡URLは未確認"

preexisting_untracked_files: []

required_checks:
  - "npm run validate:task"
  - "npm run build"
  - "npm run validate:affiliate-links"
  - "npm run validate:scope"
  - "git diff --check"

acceptance_criteria:
  - "pixverseのjapanEligibleがyes、根拠(パートナー返信2026-10-12)が注記されている"
  - "approvalStatus/status/URL/CTAが無変更"
  - "ビルド出力に差分が出ない(内部メタデータのみ)"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - URL_CHANGE
  - AFFILIATE_PROGRAM_CHANGE
  - PR_MERGE
---

# Task

## Background
2026-10-12のPixVerseパートナー返信で日本の有料サブスクリプションは対象と確認。affiliatePrograms.ts(調査層、CTAから参照禁止)のjapanEligibleがunknownのまま。

## Implementation Notes
japanEligibleとnotesのみ更新。PixVerseのapproval(approved/active)は2026-10-18台帳(WAITING_REPLY)と食い違うが、一次確認(Impact管理画面)なしに変更しない。ノートに未整合と明記。

## Definition of Done
required_checks PASS後、Draft PR。Mergeは人間判断。
