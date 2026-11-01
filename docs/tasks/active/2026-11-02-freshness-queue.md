---
task_id: "2026-11-02-freshness-queue"
created_at: "2026-11-02"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Issue #32: 既存の lastReviewed / nextReviewDue / source メタデータから、公開コンテンツを一切変更しない決定的な再確認キュー（overdue一覧）を生成する内部スクリプトと初回レポートを追加する。"

non_goals:
  - "src/content/** の変更（ツールDB・ガイド記事）"
  - "価格・商用利用・機能のclaim変更"
  - "アフィリエイトURL・承認状態の変更"
  - "package.json / CI / デプロイ設定の変更"
  - "期限超過をもって内容が誤りと推定すること（overdue != wrong）"

target_files:
  - docs/tasks/active/2026-11-02-freshness-queue.md
  - scripts/generate-freshness-queue.mjs
  - docs/audits/freshness-queue-2026-11-02.md
  - docs/audits/freshness-queue-2026-11-02.csv

reference_files:
  - docs/tasks/LATEST.md
  - src/content/config.ts
  - src/data/toolAffiliateLinks.ts
  - scripts/validate-data.mjs

unknowns:
  - "ページ別トラフィックは検証済み集計に無いため UNKNOWN 扱い"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "--as-of 固定日付で同一入力から同一出力になる（現在時刻に依存しない）"
  - "日付欠損・不正は UNKNOWN と表示し 0 にしない"
  - "src/content/** と affiliate データを変更しない"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

Issue #32 Content freshness queue。ANALYSIS_DONE後、scoped design reviewとして内部generatorのみ実装する。公開内容は不変。

## Implementation Notes

`node scripts/generate-freshness-queue.mjs --as-of YYYY-MM-DD [--out-dir docs/audits]`。読み取り専用（外部通信なし）。overdueは「再確認が必要」を意味し、内容の誤りを意味しない。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED
```
