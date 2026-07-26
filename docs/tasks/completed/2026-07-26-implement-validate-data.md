---
task_id: "implement-validate-data"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Implement a CI-safe data validator for src/content/tools/*.md without modifying the tool data, routes, schema, or production environment."

non_goals:
  - "validate:publishの実装"
  - "DBデータの修正"
  - "src/content/tools/*.mdの編集"
  - "src/content/config.tsの変更"
  - "URL到達性の外部通信チェック"
  - "料金・無料枠・規約内容の最新性判定"
  - "公式情報の真偽判定"
  - "ページHTMLの検証"
  - "broken link検証"
  - "GitHub Actionsへのvalidate:data追加"
  - "新規npm依存関係の追加"
  - "URL、slug、routeの変更"
  - "本番反映"

target_files:
  - scripts/validate-data.mjs
  - package.json
  - docs/tasks/active/implement-validate-data.md
  - docs/tasks/completed/*.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - src/content/config.ts

unknowns:
  - "Actual allowed frontmatter fields must be derived from src/content/config.ts and repository usage."
  - "Some repository fields may intentionally exist outside the current Zod schema."
  - "Existing tool files may already contain violations; this task must not modify them."
  - "The validator must distinguish implementation defects from pre-existing data violations."

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
  - "npm run validate:data exists."
  - "The validator reads every src/content/tools/*.md file."
  - "The validator performs no external network request."
  - "The validator reads no secret or credential."
  - "The validator reports file path and rule name for each violation."
  - "The validator exits 1 when violations exist."
  - "The validator exits 0 when no violations exist."
  - "Unknown frontmatter keys are detected according to an explicitly documented allowlist derived from the actual repository schema and intentional repository extensions."
  - "Required values, types, enum values, dates, URLs, file-name-derived slugs, and duplicate identities are checked where supported by the actual schema."
  - "No src/content/tools/*.md file is modified."
  - "No src/content/config.ts file is modified."
  - "Build succeeds."
  - "Scope validation succeeds."
  - "Existing data violations, if found, are reported separately and not silently fixed."

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

src/content/tools/*.mdのfrontmatterを検証するCI安全なvalidatorを実装する。

## Background

前段の監査で、DB品質を自動検証する実行可能スクリプトは存在せず、既存のData Quality CheckはClaudeエージェント向けの手順書（SKILL.md）のみであることが判明した。

## Implementation Notes

- src/content/config.ts全文とtools/*.md全29件のfrontmatterキーを機械集計済み。
- schema外だが複数ファイルで意図的に使われているキー: needsReview, notFor, pricingSourceNote, pricingSourceUrl, pricingStatus（いずれも6件以上で使用、意図的拡張と判断）。
- pricingSummary（2件）、pricingText（2件）はallowlistに含めず、unknown-fieldとして検出する（判断不能・要人間確認）。

## Result

PASS

implementation_status: PASS
repository_data_status: FAIL_WITH_EXISTING_VIOLATIONS

## Summary

scripts/validate-data.mjsを新規実装。src/content/tools/*.md全29件を外部通信・secret不使用で検証。negative test（repo外fixture）でERROR検出動作を確認済み。既存DBに5 ERROR・3 WARNINGを検出したが、DB自体は今回修正していない。

## Changed Files

- scripts/validate-data.mjs（新規）
- package.json（validate:data script追加）
- docs/tasks/active/implement-validate-data.md → docs/tasks/completed/2026-07-26-implement-validate-data.md（移動）
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): FAIL_WITH_EXISTING_VIOLATIONS（実装は正常、既存データに違反あり）
- publish check: NOT_REQUIRED（今回範囲外）
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし（build専用のまま、validate:data未追加）

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED (HEAD 41c7bde)
- working tree: 許可範囲内のファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし

## Decisions

- schema外だが複数ファイルで意図的に使われているキー（needsReview, notFor, pricingSourceNote, pricingSourceUrl, pricingStatus）をallowlistとして許可。pricingSummary（2件）・pricingText（2件）はallowlistに含めず、unknown-fieldとして検出する設計とした。

## Validator Detected Issues (pre-existing, not fixed)

ERROR (5件):
- adobe-firefly.md: unknown-field `pricingText`
- fotor-ai.md: unknown-field `pricingText`
- ideogram.md: unknown-field `pricingSummary`
- microsoft-designer.md: unknown-field `pricingSummary`
- pixverse.md: invalid-url `pricingSourceUrl` = "unknown"（文字列"unknown"がURL値として設定されている）

WARNING (3件):
- clipdrop.md: review-overdue（nextReviewDue過去日）
- gemini-image-generation.md: review-overdue（nextReviewDue過去日）
- kling-ai.md: duplicate-source-url（sourceRefs内重複）

VERIFY: なし（今回の実装範囲では未確定事項なし）

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。next_candidateは既存DB違反の修正タスク。

## Next

Fix validated tool-data violations in a separate scoped task.

---
生ログ全文は保存していない。
