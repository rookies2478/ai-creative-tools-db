---
task_id: "2026-11-03-production-verification"
created_at: "2026-11-03"
status: READY
risk: MEDIUM
goal: "本番デプロイ後に公開されたソースコミットをread-onlyで照合する仕組みを追加する。公開は実施しない。"
target_files:
  - docs/tasks/active/2026-11-03-production-verification.md
  - scripts/write-deployment-commit.mjs
  - scripts/verify-production-commit.mjs
  - .github/workflows/verify-production-commit.yml
  - package.json
reference_files:
  - CLAUDE.md
  - AGENTS.md
  - package.json
unknowns:
  - "本番公開トリガーは人間管理。push と公開は同義でない"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
acceptance_criteria:
  - "Cloudflare Pagesで公開されたSHAの検査ができる"
  - "本番公開を自動実行しない"
forbidden_operations:
  - PRODUCTION_DEPLOY
production_required: false
---
# Read-only release identity checks
No domain, GA4, affiliate or release settings change.
