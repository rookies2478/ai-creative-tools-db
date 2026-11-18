---
task_id: "2026-11-18-official-facts-66-p7-chrome-facts"
created_at: "2026-11-18"
status: DONE
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Issue #66 Phase 7: Chrome実画面で確認した公開情報だけを反映する（Dzine無料クレジットの公式ページ間CONFLICT明記、Hedra Play価格のACCOUNT_ONLY明示・商用利用のunknown化・Builder Program条件、PixAIの公開JPY料金）。Pollo AIはNOT_VERIFIED維持。"
non_goals:
  - "Pollo AIの数値追加、PixAIの無料枠・商用利用・透かし・アフィリエイトの断定"
  - "Hedra Play価格の推測、Terms所有権表記を商用利用許諾として扱うこと"
  - "アフィリエイトURL、計測、デプロイ、ワークフローを変更しない"
target_files:
  - src/content/tools/dzine-ai.md
  - src/content/tools/hedra.md
  - src/content/tools/pixai.md
  - docs/operations/creative-tools-jp-affiliate-audit-2026-11-07.csv
  - docs/tasks/active/2026-11-18-official-facts-66-hedra-terms-link.md
  - docs/tasks/completed/2026-11-18-official-facts-66-hedra-terms-link.md
  - docs/tasks/active/2026-11-18-official-facts-66-p7-chrome-facts.md
  - docs/tasks/completed/2026-11-18-official-facts-66-p7-chrome-facts.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
preexisting_untracked_files: []
unknowns:
  - "Dzine: PricingとHomeの無料クレジット表記の食い違い（CONFLICT維持）"
  - "Hedra: Play価格（ログイン必須）、商用利用・透かし・モデル別権利"
  - "PixAI: 無料枠の数値、商用利用、透かし、アフィリエイト"
  - "Pollo AI: 料金表はスケルトン表示のみ（NOT_VERIFIED）"
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "Dzineは料金ページとトップの記載を併記し、どちらも現行条件と断定しない"
  - "Hedra commercialUseはunknownで、Terms所有権と商用利用を区別。Play価格はACCOUNT_ONLY"
  - "PixAIは公開実画面のJPY料金のみ反映、他項目はunknown維持"
forbidden_operations:
  - PRODUCTION_DEPLOY
  - GITHUB_ACTIONS
---

# Issue #66 Phase 7

Evidence: Chrome Phase 6 real-screen checks (2026-11-18) of dzine.ai pricing/home, hedra.com pricing/builders/terms, pixai.art membership plans (JPY), pollo.ai pricing; plus logged-out raw HTML cross-checks of the Dzine, PixAI pages. Previous active task (Hedra terms link, PR #93) closed.

# Result

PASS_WITH_FINDINGS. Dzine: free-credit CONFLICT stated across Pricing/Home. Hedra: commercialUse paid-only -> unknown, Play pricing ACCOUNT_ONLY, Builder Program API usage excluded. PixAI: public JPY prices and monthly credits recorded; other fields unknown. Pollo AI unchanged (NOT_VERIFIED). Production: NOT_DEPLOYED.
