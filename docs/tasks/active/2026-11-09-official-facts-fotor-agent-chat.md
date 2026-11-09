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
goal: "PR #90で実際に統合した公式情報の限定修正（Fotor / Pika / Canva / HeyGen / Higgsfield / Luma / Recraft）と、先行監査タスクをpausedへ移した履歴を正確に管理する"
non_goals:
  - "公式で実証されていない透かし・商用利用・価格・通貨の記述を断定変更しない"
  - "アフィリエイトURL、計測、デプロイ、本番サイト、台帳を変更しない"
target_files:
  - src/content/tools/fotor-ai.md
  - src/content/tools/pika.md
  - src/content/tools/canva-ai-image-generator.md
  - src/content/tools/heygen.md
  - src/content/tools/higgsfield-ai.md
  - src/content/tools/luma-ai.md
  - src/content/tools/recraft.md
  - docs/tasks/paused/2026-11-07-official-facts-59-followup.md
  - docs/tasks/active/2026-11-09-official-facts-fotor-agent-chat.md
  - docs/tasks/paused/2026-11-09-official-facts-higgsfield-luma-recraft.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
unknowns:
  - "Fotor Basicの透かしは2026-11-10公式料金表の描画DOMで確認済み（Basicは透かしなし対象外）"
  - "Recraft有料出力の契約終了後の権利継続、LumaのJPY/税込・透かし条件は未確認"
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

PR #90 CI remediation (2026-11-10): CI compared the whole PR against origin/master, including preserved first commit 6842796 and paused task move. The previous active task target_files omitted four already-committed paths (Higgsfield, Luma, Recraft, prior 59-followup task), causing scope validation failure. This task now explicitly records all of the **actual existing PR changes**; no additional vendor claims or article content changed in this fix.
