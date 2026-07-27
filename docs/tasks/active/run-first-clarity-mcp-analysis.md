---
task_id: "run-first-clarity-mcp-analysis"
created_at: "2026-07-27"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Run the first aggregate-only Microsoft Clarity analysis through the available MCP tools for the Stable Diffusion tool page, save a privacy-safe manifest and analysis summary, and validate the operational workflow without modifying site content."

non_goals:
  - ページ修正
  - title変更
  - meta description変更
  - H1変更
  - 本文変更
  - 内部リンク変更
  - DB変更
  - sitemap変更
  - GSC候補の実装
  - Clarity API実装
  - Credential Manager設定
  - token取得・表示
  - Node runner実装
  - package.json変更
  - GitHub Actions変更
  - session recording動画の保存
  - session IDのGit管理
  - recording URLのGit管理
  - raw画面キャプチャ保存
  - 本番反映

target_files:
  - docs/analytics/clarity/2026-07-27/analysis-summary.md
  - docs/tasks/active/run-first-clarity-mcp-analysis.md
  - docs/tasks/completed/2026-07-27-run-first-clarity-mcp-analysis.md
  - docs/tasks/LATEST.md
  - docs/tasks/active/README.md
  - docs/tasks/paused/README.md
  - docs/tasks/paused/add-capcut-ai-generated-video.md
  - scripts/validate-task.mjs
  - scripts/validate-scope.mjs
  - docs/tasks/completed/2026-07-27-add-paused-task-state.md

reference_files:
  - docs/analytics/README.md
  - docs/analytics/clarity/README.md
  - docs/analytics/clarity/templates/manifest.template.json
  - docs/analytics/clarity/templates/analysis-summary.template.md
  - docs/analytics/gsc/2026-07-10/analysis-summary.md
  - docs/tasks/LATEST.md
  - docs/tasks/active/README.md
  - docs/tasks/paused/README.md
  - scripts/validate-task.mjs
  - scripts/validate-scope.mjs

unknowns:
  - Actual response schema of query-analytics-dashboard.
  - Whether page URL filtering is exact or contains-based.
  - Whether all behavior metrics are available for the selected period.
  - Whether dashboard metrics are sampled or limited.
  - Whether recordings pagination beyond count=250 is available.
  - Whether session volume is sufficient for interpretation.

required_checks:
  - npm run validate:task
  - MCP response structure check
  - privacy review
  - manifest JSON parse
  - analysis-summary frontmatter check
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - Clarity MCP is actually queried.
  - The selected page and period are explicitly recorded.
  - Aggregate metrics are saved without personal identifiers.
  - No session ID or recording URL is committed.
  - No raw recording content is saved.
  - Manifest records MCP acquisition and data limitations.
  - Analysis summary distinguishes evidence, uncertainty, HOLD items, and decision.
  - Clarity is not used to infer a GSC query-page mapping.
  - No page or DB changes occur.
  - Validators and build pass.
  - Raw files remain ignored.

forbidden_operations:
  - PRODUCTION_DEPLOY
  - SECRET_ACCESS
  - PAGE_MODIFICATION
  - RECORDING_EXPORT
  - PERSONAL_DATA_COMMIT

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html
---

# Task

## Operational prerequisite

The Clarity analysis cannot proceed safely while another valid incomplete task remains active. Add a formal paused task state, move the CapCut generated-video task to paused, and update task/scope validation so preserved paused changes do not block the single active Clarity task.

## Blocker discovered

- Multiple active tasks caused validate:task to fail.
- The repository had no valid non-completed state for incomplete work.
- CapCut changes are valid but must not be completed or discarded.
- Clarity remains the current priority.

## Prerequisite completion condition

- paused state documented
- CapCut task moved to paused
- active task count equals 1
- validate:task passes
- validate:scope recognizes paused preserved changes
- no CapCut code or asset is committed
- no Clarity analysis result is committed as valid data

## Background

docs/analytics/clarity/README.mdおよびGSC分析（docs/analytics/gsc/2026-07-10/analysis-summary.md、candidate C5「stable diffusion」クエリ）を踏まえ、実際のClarity MCP toolを使って`/tools/stable-diffusion/`の行動データを初回取得する。Clarity単独でGSCクエリとページの対応を証明しない。ページ・DB・sitemapは一切変更しない。
