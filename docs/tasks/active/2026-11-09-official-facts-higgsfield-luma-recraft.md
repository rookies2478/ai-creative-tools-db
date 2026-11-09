---
task_id: "2026-11-09-official-facts-higgsfield-luma-recraft"
created_at: "2026-11-09"
status: READY
risk: HIGH
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Higgsfield FAQの商用利用表現、Luma現行公式料金・商用条件、Recraft新規約の再確認結果を、該当ファイルのみ最小修正する"
non_goals:
  - "未確認の商用利用権・透かし条件・日本円請求条件を断定しない"
  - "アフィリエイトURL、計測、デプロイ、本番サイト、台帳を変更しない"
target_files:
  - src/content/tools/higgsfield-ai.md
  - src/content/tools/luma-ai.md
  - src/content/tools/recraft.md
  - docs/tasks/active/2026-11-09-official-facts-higgsfield-luma-recraft.md
  - docs/tasks/paused/2026-11-07-official-facts-59-followup.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/paused/2026-11-07-official-facts-59-followup.md
unknowns:
  - "Lumaの透かし条件・税込/日本円請求・地域差は未確認"
  - "Recraft第14条と第7.2条の解約後の権利継続は法的に一義でなくHOLD"
  - "Higgsfield Freeでの広告・受託利用は書面確認までHOLD"
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
  - "公式一次資料（2026-11-09確認）に基づく記述のみ。確認できない条件はHOLD/要確認のまま"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Higgsfield / Luma / Recraft official facts (scoped)
Parent: https://github.com/rookies2478/ai-creative-tools-db/issues/66
Follow-up task paused (not completed): docs/tasks/paused/2026-11-07-official-facts-59-followup.md
