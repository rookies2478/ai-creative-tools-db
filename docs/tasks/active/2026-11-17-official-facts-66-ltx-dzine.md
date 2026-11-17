---
task_id: "2026-11-17-official-facts-66-ltx-dzine"
created_at: "2026-11-17"
status: READY
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Issue #66の残りツールのうち、2026-11-17に公開公式ページ本文で確認できたフィールド（LTX Studioの透かし・無料クレジット条件、Dzineの無料クレジット条件）だけを保守的に反映する"
non_goals:
  - "38/59ツールを一括で検証済みにしない"
  - "Scenario / Pixelcut / PicLumen（PR #91で反映済み）を再変更しない"
  - "ログイン後価格・税・地域差・商用権利を推測しない。透かしなし表示から商用権利を推論しない"
  - "アフィリエイトURL、計測、デプロイ、ワークフローを変更しない"
target_files:
  - src/content/tools/ltx-studio.md
  - src/content/tools/dzine-ai.md
  - docs/tasks/active/2026-11-17-official-facts-66-pilot.md
  - docs/tasks/completed/2026-11-17-official-facts-66-pilot.md
  - docs/tasks/active/2026-11-17-official-facts-66-ltx-dzine.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
preexisting_untracked_files: []
unknowns:
  - "LTX Studio / Dzineの日本での請求通貨・税・割引、ログイン後UIは未確認"
  - "LTX Studioの無料800クレジットは地域・提供状況により付与されない場合がある（公式ヘルプ）"
  - "Dzineの透かし条件は公開料金表本文で確認できないためunknownを維持"
  - "PixAI（Wikiの一次性未確定）、Pollo AI（料金表が動的でプラン帰属を抽出不可）、Hedra（公式価格表示の矛盾）はNOT_VERIFIEDで変更なし"
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "LTX Studioは公式ヘルプのFree透かしあり・有料透かしなしをプラン条件付きで反映し、透かしなしを商用許諾と混同しない"
  - "LTX Studioの無料800クレジットは一度のみ・地域/提供状況で変動・アップグレード時に置換される旨を公式ヘルプどおりに記載"
  - "Dzineは新規無料ユーザー100クレジット（12か月有効）と旧日次32クレジット廃止を公式料金表どおりに記載し、透かしはunknown維持"
  - "未確認フィールドのlastReviewedや値は変更しない（変更した2ツールのみlastReviewedを更新）"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Issue #66 field-level follow-up (Lane E: LTX Studio / Dzine)

Parent: https://github.com/rookies2478/ai-creative-tools-db/issues/66
Base: origin/master 558bea0 (PR #91 merged). Previous active task `2026-11-17-official-facts-66-pilot` closed (merged in PR #91).

Evidence (public official pages, logged out, fetched 2026-11-17 as raw HTML text):
- LTX Studio Help: https://help.ltx.io/hc/en-us/articles/32046651702290 (Standard/Pro/Enterprise commercial; Free/Lite personal only), https://help.ltx.io/hc/en-us/articles/33219919181074 (one-time free credits, most eligible users 800, not guaranteed, replaced on upgrade), https://help.ltx.io/hc/en-us/articles/32042304720146 (free credits depend on region), https://help.ltx.io/hc/en-us/p/ltx-studio and https://ltx.io/studio/pricing FAQ ("Free plan exports include a watermark ... On any paid plan, exports are watermark-free"; Lite card "No watermarking"; Lite US$15/mo monthly, Standard US$35/mo monthly).
- Dzine pricing: https://www.dzine.ai/pricing/ ("New free users receive 100 Credits after sign-up, valid for 12 months. The previous daily reset to 32 Credits is no longer available."; Free "Public Generation / Non-Commercial Use"; Beginner US$8.99/mo monthly, 1,000 credits/mo).
