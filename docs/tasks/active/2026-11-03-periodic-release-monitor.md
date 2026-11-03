---
task_id: "2026-11-03-periodic-release-monitor"
created_at: "2026-11-03"
status: READY
risk: MEDIUM
goal: "本番自動公開を有効にせず、公開サイトのSHAマーカーがmaster履歴に存在することを定期監視する。"
target_files:
  - docs/tasks/active/2026-11-03-periodic-release-monitor.md
  - scripts/monitor-published-release.mjs
  - .github/workflows/monitor-published-release.yml
  - docs/tasks/completed/2026-11-03-periodic-release-monitor.md
  - docs/tasks/LATEST.md
reference_files:
  - CLAUDE.md
  - AGENTS.md
  - .github/workflows/verify-production-commit.yml
  - scripts/verify-production-commit.mjs
unknowns:
  - "公開承認後のみreleaseを実施する。masterの最新SHAが必ず即公開されるとは限らない"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
acceptance_criteria:
  - "SHAマーカーが存在しmaster履歴に含まれることを確認する"
  - "不明な場合はFAILとして監視する"
  - "手動の公開ゲートを変えない"
forbidden_operations:
  - PRODUCTION_DEPLOY
production_required: false
---
# Read-only production monitoring
This job cannot attest that the latest master commit is published: manual release is separate.
