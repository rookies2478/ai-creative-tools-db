---
task_id: "implement-analytics-raw-rotation"
created_at: "2026-07-27"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Implement a safe dry-run-first rotation tool for GSC and Clarity raw runs that enforces documented retention rules, protects referenced and latest successful runs, and deletes only explicitly eligible ignored raw directories when --apply is used."

non_goals:
  - raw自動定期実行・GitHub Actions schedule追加
  - GSC API・Clarity API実装
  - analysis-summary生成・更新
  - サイトページ変更
  - DBスキーマ変更（src/content/tools/*.md変更なし）
  - source ZIP削除
  - manifest schemaの大幅変更
  - 本番反映
  - external network呼び出し
  - credential/secretアクセス

target_files:
  - scripts/rotate-analytics-raw.mjs
  - scripts/analytics-rotation-lib.mjs
  - scripts/test-rotate-analytics-raw.mjs
  - package.json
  - docs/analytics/README.md
  - docs/analytics/gsc/README.md
  - docs/analytics/clarity/README.md
  - docs/tasks/active/implement-analytics-raw-rotation.md
  - docs/tasks/completed/2026-07-27-implement-analytics-raw-rotation.md
  - docs/tasks/LATEST.md

reference_files:
  - .gitignore
  - docs/analytics/gsc/templates/manifest.template.json
  - docs/analytics/clarity/templates/manifest.template.json
  - docs/analytics/gsc/2026-07-10/analysis-summary.md
  - docs/analytics/clarity/2026-07-27/analysis-summary.md
  - docs/tasks/completed/2026-07-27-create-first-gsc-analysis-summary.md
  - docs/tasks/completed/2026-07-27-run-first-clarity-mcp-analysis.md
  - scripts/validate-task.mjs
  - scripts/validate-scope.mjs

unknowns: []

preexisting_untracked_files:
  - public/videos/generated/tools/hailuo-ai-tool-video-output-01.mp4
  - public/videos/generated/tools/hailuo-ai-tool-video-output-01-poster.webp
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
  - node scripts/test-rotate-analytics-raw.mjs
  - node scripts/rotate-analytics-raw.mjs --dry-run
  - dry-run no-write check
  - apply deletion check (fixture only)
  - protected-run check
  - referenced-run check
  - invalid-manifest check
  - path safety check
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - デフォルトdry-runで削除0件
  - --apply明示時のみ削除実行
  - --dry-runと--apply同時指定はエラー
  - manifest必須・manifestなし/invalidは削除しない
  - 各analysis type/periodの最新success runを保護
  - analysis-summaryのsource_run参照runを保護
  - completed taskで参照されるrunを保護
  - failed/partial/statusごとの明示ルールがないものは保護
  - label不明のGSC runは自動削除しない
  - GSC 14d=90日, 28d=365日, 3m=365日, Clarity=90日のretentionを実装
  - raw配下・.gitignore対象のrunのみ削除対象にできる
  - source ZIP・Git管理ファイル・symlink・path traversalを削除しない
  - apply削除直前にpath safetyを再検証する
  - dry-run出力にabsolute path・secret・personal dataを含めない
  - 実rawに対するdry-runでeligible=0（削除0件）であることを確認する
  - fixture testで20項目超のケースをPASSする
  - 新規npm依存を追加しない

forbidden_operations:
  - PRODUCTION_DEPLOY
  - DELETE_SOURCE_ZIP
  - GSC_API_CALL
  - CLARITY_API_CALL
  - MODIFY_DB_CONTENT
  - MODIFY_ANALYSIS_SUMMARY
---

# Task

## Background

GSC/Clarity raw run（`docs/analytics/{gsc,clarity}/**/raw/run-*/`）はGit非追跡で無期限に蓄積される。保持期限判定・安全な削除手段が存在しないため、rotation runnerを新規実装する。

## Implementation Notes

- retention: GSC 14d=90日, 28d=365日, 3m=365日, label不明=自動削除しない(protected)。Clarity=90日固定。
- 保護対象: 各type/period別latest success run、analysis-summaryのsource_run、completed task本文で参照されるrun_id、manifest欠損/invalid、status≠success、label不明、generated_at不明、raw root外、symlink、path traversal疑い、tracked file含有run。
- CLI: `--dry-run`(既定) / `--apply` / `--type gsc|clarity|all` / `--as-of YYYY-MM-DD`。出力pathはrepository相対のみ、absolute path/secret非表示。
- fixtureは一時ディレクトリに作成し実rawは変更しない。実rawに対する検証はdry-runのみ。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- build:
- diff_check:
- scope_validation:
- data_quality:
- publish_check:
- preview:
- github_actions:

GIT:
- commit:
- push:
- origin_sync:

PRODUCTION:
NOT_DEPLOYED | DEPLOYED | NEEDS_VERIFICATION

LATEST_UPDATED:
yes | no

NEXT:
one concrete next action
```
