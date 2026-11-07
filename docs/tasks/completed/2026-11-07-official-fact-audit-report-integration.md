---
task_id: "2026-11-07-official-fact-audit-report-integration"
created_at: "2026-11-07"
status: COMPLETED
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "旧PR #77の38ツール監査証跡を59ツールの正本を壊さず履歴として保存し、未確認と公式間矛盾を明示する"
non_goals:
  - "38件のCSVを59件台帳へ上書きしない"
  - "料金・商用利用の未検証値を更新済みと断定しない"
  - "新規の外部接続・アフィリエイト・計測・デプロイを変更しない"
target_files:
  - docs/tasks/active/2026-11-07-growth-loop-route-policy.md
  - docs/tasks/completed/2026-11-07-growth-loop-route-policy.md
  - docs/tasks/active/2026-11-07-official-fact-audit-report-integration.md
  - docs/audits/official-fact-reaudit-2026-11-07.md
  - docs/tasks/LATEST.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/operations/official-source-review.md
  - docs/operations/official-source-registry.csv
  - docs/analytics/growth-loop.md
unknowns:
  - "旧PR77は38件時点の監査で現行59ツールの監査ではない"
  - "公式原文で確定できたのは7件、18件は要約のみ。アカウント特定の条件と公式間矛盾は未解消"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - node scripts/validate-official-source-registry.mjs
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "旧PRの監査報告を対象38件の履歴として保存する"
  - "確認7件・要約18件のエビデンス区分を先頭で明示する"
  - "59件の現行CSV・記事・提携URL・計測に変更がない"
  - "PRビルド、正本59件とregistryの整合、scope検証がPASS"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Historical official fact audit preservation
Parent Issue: https://github.com/rookies2478/ai-creative-tools-db/issues/66
Supersedes outdated stacked Draft PR #77; preserve historical evidence, do not claim the underlying contract verification is complete.


## Closeout
- PR #88 merged at 07a39c434ec6013e7ba3e8a1ab5e6e282279a82b; audit report history and raw-source evidence caveats preserved without altering 59-row official registry.
- Superseded PR #77 closed unmerged. Underlying 59-tool fact audit and account-level clauses remain open Issue #66.
