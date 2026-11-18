---
task_id: "2026-11-18-official-facts-66-hedra-terms-link"
created_at: "2026-11-18"
status: READY
risk: LOW
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Issue #66 Phase 5: Hedra の規約リンク（/terms-of-service）が公式サイトで404のため、公開中の公式規約ページ（/terms, タイトル Terms of Service | Hedra AI）へ差し替える。規約本文の内容は主張しない。"
non_goals:
  - "Hedraの料金・商用権利・無料枠の値を変更しない（公式料金ページは動的で現行プラン価格を抽出できず、NOT_VERIFIED/CONFLICT維持）"
  - "Dzine日次クレジットのCONFLICT（料金ページ: 日次32廃止 / トップ: 毎日30）は値を変更せず記録のみ"
  - "アフィリエイトURL、計測、デプロイ、ワークフローを変更しない"
target_files:
  - src/content/tools/hedra.md
  - docs/tasks/active/2026-11-17-official-facts-66-ltx-dzine.md
  - docs/tasks/completed/2026-11-17-official-facts-66-ltx-dzine.md
  - docs/tasks/active/2026-11-18-official-facts-66-hedra-terms-link.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
preexisting_untracked_files: []
unknowns:
  - "Hedraの現行プラン価格・商用権利（公式料金ページはJS描画で抽出不可）"
  - "Pollo AI料金表（動的）、PixAIの基本日次クレジット（wikiのみ）はNOT_VERIFIEDのまま"
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "hedra.mdの規約リンク2か所が200を返す公式URLに更新されている"
  - "他フィールドは無変更"
forbidden_operations:
  - PRODUCTION_DEPLOY
  - GITHUB_ACTIONS
---

# Issue #66 Phase 5: Hedra terms link

Evidence (2026-11-18, logged-out raw HTML): https://www.hedra.com/terms-of-service -> 404; https://www.hedra.com/terms -> 200, title "Terms of Service | Hedra AI". Previous active task (LTX/Dzine, PR #92 merged) closed.
