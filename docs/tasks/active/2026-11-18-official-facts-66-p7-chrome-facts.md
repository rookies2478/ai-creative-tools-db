---
task_id: "2026-11-18-official-facts-66-p7-chrome-facts"
created_at: "2026-11-18"
status: READY
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Issue #66 final public-source closeout: current first-party public evidence for Hedra Play, Pollo AI and PixAIを反映し、Dzineの公式ページ間CONFLICTは維持する。"
non_goals:
  - "ログイン後のみの条件、キャンペーン価格、税・請求通貨を推測しない"
  - "Termsの所有権表記だけを商用利用許諾として扱わず、料金FAQ等の明示的な商用条件を根拠にする"
  - "アフィリエイトURL、計測、デプロイ、ワークフローを変更しない"
target_files:
  - src/content/tools/dzine-ai.md
  - src/content/tools/hedra.md
  - src/content/tools/pixai.md
  - src/content/tools/pollo-ai.md
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
  - "Hedra: モデル固有・無料/解約後の商用条件は引き続き利用画面で確認が必要"
  - "PixAI: コミュニティモデル/LoRA/UGCの権利は個別ライセンス確認が必要"
  - "Pollo AI: 月払い価格・無料クレジット上限・税は利用画面で確認が必要"
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
  - "Hedraは公開Play料金表に基づき有料プランのcommercial useと価格・creditsを反映し、無料/限定アクセスは別扱い"
  - "PixAIは公開Terms/生成ページ/Wikiに基づき日次無料credits・no watermark・生成物利用条件を反映し、モデル/UGC権利は限定表現"
  - "Pollo AIは公式FAQ/料金ページに基づき無料時watermark・商用不可、有料時商用可・透かしなし、公開料金を反映"
forbidden_operations:
  - PRODUCTION_DEPLOY
  - GITHUB_ACTIONS
---

# Issue #66 Phase 7

Evidence: Chrome Phase 6 real-screen checks (2026-11-18) of dzine.ai pricing/home, hedra.com pricing/builders/terms, pixai.art membership plans (JPY), pollo.ai pricing; plus logged-out raw HTML cross-checks of the Dzine, PixAI pages. Previous active task (Hedra terms link, PR #93) closed.
