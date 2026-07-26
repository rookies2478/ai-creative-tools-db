---
task_id: "clarify-synthesia-free-download-limitation"
created_at: "2026-07-26"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "アバター動画カテゴリページのSynthesia表記に、無料Basicプランでは動画ファイルをダウンロードできないという制限を明記する。"

non_goals:
  - "src/content/tools/synthesia.mdの変更"
  - "DBスキーマの変更"
  - "他ツールの表記変更"
  - "Synthesiaを無料プランなしに変更すること"
  - "URL・レイアウト・比較ロジックの変更"
  - "Haiperのデフォルト配列の修正"
  - "新規記事作成"
  - "本番反映"

target_files:
  - src/pages/categories/avatar-video/index.astro
  - docs/tasks/active/clarify-synthesia-free-download-limitation.md
  - docs/tasks/completed/*.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - src/content/tools/synthesia.md

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
  - npm run build
  - git diff --check
  - npm run validate:data
  - npm run validate:scope

acceptance_criteria:
  - "変更対象はsrc/pages/categories/avatar-video/index.astroとタスク運用ファイルのみ"
  - "Synthesiaに無料プランが存在する事実は維持"
  - "無料版ではダウンロード不可と明記"
  - "月10分・透かしありの既存情報を消さない"
  - "他ツールの表示は無変更"
  - "buildが成功する"
  - "validate:dataが成功する"
  - "diff checkが成功する"
  - "validate:scopeが成功する"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task Result

## Goal

アバター動画カテゴリページのSynthesia表記に、無料Basicプランでは動画ファイルをダウンロードできないという制限を明記する。

## Result

PASS

## Summary

公式Pricing監査結果（無料Basicプランは動画作成可能・カード不要・月10分・透かしありだが、ダウンロードは有料プラン限定）を踏まえ、`src/pages/categories/avatar-video/index.astro`のSynthesia行を「無料枠あり（月10分・透かしあり）」から「無料作成可／ダウンロード不可（月10分・透かしあり）」に修正し、note欄にもダウンロード制限を明記した。他ツールの行・DB正本（synthesia.md）は無変更。

## Changed Files

count: 1（+タスク運用ファイル）

- src/pages/categories/avatar-video/index.astro
- docs/tasks/active/clarify-synthesia-free-download-limitation.md → docs/tasks/completed/2026-07-26-clarify-synthesia-free-download-limitation.md（移動）
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 0, Verify: 0, Files checked: 29）
- publish check: NOT_REQUIRED
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED
- working tree: 対象1ファイル＋タスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番未確認）

## Decisions

- src/content/tools/synthesia.md・DBスキーマは無変更。
- Haiperのデフォルト配列（Free.astro）は今回のnon-goalsのため未修正（別タスク候補として記録済み）。
- 他ツールの行は無変更（diffで1行のみの変更を確認済み）。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

PixVerse実機確認タスクを起票し、①クレジットカード要求の有無、②生成後のダウンロードボタンの有無、③透かしの有無、④実際の無料クレジット数（初回・翌日補充分）を確認する。
