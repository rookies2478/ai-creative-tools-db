---
task_id: "2026-11-09-official-facts-fotor-agent-chat"
created_at: "2026-11-09"
status: READY
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Fotor日本語公式料金表(2026-11-09ブラウザ描画確認)で実証されたBasicのAI Agentチャット回数の記載のみ最小修正する"
non_goals:
  - "透かし・商用利用・価格・通貨の記述を断定変更しない"
  - "アフィリエイトURL、計測、デプロイ、本番サイト、台帳を変更しない"
target_files:
  - src/content/tools/fotor-ai.md
  - docs/tasks/active/2026-11-09-official-facts-fotor-agent-chat.md
  - docs/tasks/paused/2026-11-09-official-facts-higgsfield-luma-recraft.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
unknowns:
  - "Basicの透かし有無は料金表の表示から判別不能(未確認)"
  - "旧記載『作品保存30日』は現行表に該当項目なし"
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
  - "公式一次資料(2026-11-09)に基づく記述のみ。確認できない条件は要確認のまま"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Fotor Basic AI Agent chat entitlement (scoped)
Parent: https://github.com/rookies2478/ai-creative-tools-db/issues/66
Evidence: https://www.fotor.com/jp/pricing/ rendered in headless Chrome (ja-JP, logged out, JPY), 2026-11-09: Basic = チャット 50 回 / 1タスク / メッセージ履歴7日間 / 512MB / 同時生成1.
Previous task paused: docs/tasks/paused/2026-11-09-official-facts-higgsfield-luma-recraft.md (commit 6842796 retained)
