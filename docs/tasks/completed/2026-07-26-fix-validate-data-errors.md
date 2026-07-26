---
task_id: "fix-validate-data-errors"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: false

goal: "Resolve the five existing validate:data errors without changing unrelated tool data, routes, comparison logic, or production systems."

non_goals:
  - "WARNINGの修正（review-overdue, duplicate-source-url）"
  - "validate-data.mjsの基準緩和"
  - "validate:publishの実装"
  - "URL構造・route変更"
  - "比較ロジック変更"
  - "全DB一括整理"
  - "pricing情報の広範囲監査"
  - "公式サイトへの外部APIアクセス"
  - "GitHub Actions変更"
  - "本番反映"

target_files:
  - src/content/tools/adobe-firefly.md
  - src/content/tools/fotor-ai.md
  - src/content/tools/ideogram.md
  - src/content/tools/microsoft-designer.md
  - src/content/tools/pixverse.md
  - docs/tasks/active/fix-validate-data-errors.md
  - docs/tasks/completed/*.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - src/content/config.ts
  - scripts/validate-data.mjs

unknowns:
  - "Whether pricingText and pricingSummary are legacy fields, intentional extensions, or schema omissions."
  - "Whether these fields are referenced by pages, components, scripts, or build output."
  - "What valid replacement should be used for pixverse pricingSourceUrl instead of \"unknown\"."
  - "Official pricing source availability may require VERIFY."

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
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "All five existing validate:data ERRORs are resolved."
  - "npm run validate:data reports Errors: 0."
  - "Existing WARNINGs are not silently removed or reclassified."
  - "pricingText and pricingSummary handling is based on actual repository usage."
  - "No validator rule is weakened to hide existing data errors."
  - "pixverse pricingSourceUrl no longer contains a non-URL placeholder."
  - "No unrelated tool file changes."
  - "No URL route or slug changes."
  - "Build succeeds."
  - "Scope validation succeeds."
  - "No secrets or external API calls are used."

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

validate:dataが検出した既存ERROR 5件を、DB正本の意味を確認したうえで解消する。

## Background

前タスクのvalidator実装で、pricingText（adobe-firefly, fotor-ai）、pricingSummary（ideogram, microsoft-designer）がunknown-field、pixverse.mdのpricingSourceUrl="unknown"がinvalid-urlとして検出された。

## Implementation Notes

調査結果（grep、全src検索）:
- pricingText / pricingSummary は src/content/tools/*.md の該当4ファイル以外・ページ/コンポーネント/scriptsのどこからも参照されていない（reports/配下の過去監査ドキュメントのみ言及）。
- adobe-firefly.pricingText と fotor-ai.pricingText は、既存の paidPlanNote / freePlanNote / pricingSourceNote に同等以上の情報が既に含まれており、削除しても情報損失なし → REMOVE_LEGACY_FIELD。
- ideogram.pricingSummary と microsoft-designer.pricingSummary は、両ファイルとも paidPlanNote が未設定で、pricingSummary内の有料プラン関連情報（生成容量・優先処理／Microsoft 365・Copilot Pro連携のサブスク要件）が他フィールドに存在しない → 情報を保持するため paidPlanNote（schema既存のoptionalフィールド、schema変更不要）へ移設 → MIGRATE_TO_EXISTING_FIELD。
- pixverse.pricingSourceUrl="unknown" は、pricingSourceNoteに404確認済み・未確認の理由が既に詳細に記述されており、pricingSourceUrlはschema上optionalのため、フィールド自体を削除しても情報損失なし → REMOVED_OPTIONAL_INVALID_URL。
- 上記いずれもsrc/content/config.tsの変更は不要（schema追加なし）。

## Result

PASS

## Summary

validate:data ERROR 5件を全て解消（pricingText 2件を重複情報のため削除、pricingSummary 2件を既存optionalフィールドpaidPlanNoteへ移設、pixverse pricingSourceUrl="unknown"を削除）。schema・validator・URL・route・比較ロジックは無変更。

## Changed Files

- src/content/tools/adobe-firefly.md
- src/content/tools/fotor-ai.md
- src/content/tools/ideogram.md
- src/content/tools/microsoft-designer.md
- src/content/tools/pixverse.md
- docs/tasks/active/fix-validate-data-errors.md → docs/tasks/completed/2026-07-26-fix-validate-data-errors.md（移動）
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 3, Verify: 0, Files checked: 29）
- publish check: NOT_REQUIRED
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし

## Field Decisions

- pricingText（adobe-firefly.md, fotor-ai.md）: REMOVE_LEGACY_FIELD — 両ファイルとも既存のpaidPlanNote/freePlanNote/pricingSourceNoteに同等以上の情報が既にあり、削除しても情報損失なし。ページ・コンポーネント・scriptsからの参照も一切なし（grep確認済み）。
- pricingSummary（ideogram.md, microsoft-designer.md）: MIGRATE_TO_EXISTING_FIELD — 両ファイルともpaidPlanNoteが未設定で、pricingSummary内の有料プラン固有情報（生成容量・優先処理／Microsoft 365・Copilot Pro連携のサブスク要件）が他フィールドに存在しなかったため、schema変更なしでpaidPlanNote（既存optionalフィールド）へ移設。情報損失なし。
- pixverse.md pricingSourceUrl: REMOVED_OPTIONAL_INVALID_URL — schema上optional。"unknown"という非URL値は削除し、既存のpricingSourceNote（404確認済み・未確認理由を詳細記述）とpricingStatus="unconfirmed"で状態を正確に表現。外部URLの推測は行っていない。

## Data Changes

- src/content/tools/adobe-firefly.md: pricingText行を削除（paidPlanNoteに同一価格情報あり）。information_loss: なし。
- src/content/tools/fotor-ai.md: pricingText行を削除（freePlanNote+pricingSourceNoteに同等情報あり）。information_loss: なし。
- src/content/tools/ideogram.md: pricingSummaryを削除しpaidPlanNoteとして新規追加（内容は同一文言をそのまま移設）。information_loss: なし。
- src/content/tools/microsoft-designer.md: pricingSummaryを削除しpaidPlanNoteとして新規追加（サブスク要件部分を抽出して移設、freePlanNoteと重複する部分は既存freePlanNoteに残置）。information_loss: なし。
- src/content/tools/pixverse.md: pricingSourceUrl（値"unknown"）を削除。information_loss: なし（pricingSourceNoteに未確認理由が既に詳述済み）。

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED (HEAD 55f6321)
- working tree: 対象5ファイル＋タスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし

## Decisions

- validate-data.mjsのallowlist・検証ロジックは今回変更していない（unknown-fieldを消すための基準緩和は行わず、データ側を修正した）。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

Review remaining validate:data warnings in a separate scoped task.
（review-overdue×2、duplicate-source-url×1が未解決のまま残存。今回は意図的に対象外。）

---
生ログ全文は保存していない。
