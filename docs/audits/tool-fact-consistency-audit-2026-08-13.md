# ツールファクト整合性 横断監査（2026-08-13）

## Executive Summary

src/content/tools/*.md（正本）を基準に、31ツール分のfrontmatter（日本語対応・商用利用・料金・無料プラン・カテゴリ・ブランド名）を、src/pages/categories・use-cases・guides・comparisons・tools・components・data配下の手書き記述と比較した。結果、大多数の記述は正本と整合しており、直近の複数回の監査・DB化（conditions-db-refactor、predeployment SEO audit等）により品質は良好に保たれている。今回新たに発見したのは、Stable DiffusionのDreamStudio誘導リンクにおけるブランド名の表記ゆれ（旧名「DreamStudio」を単独表記、正しくは「Brand Studio（旧DreamStudio）」）2件のみで、いずれも軽微（P3）。安全に修正しbuildで確認済み。他に重大な矛盾（P1/P2）は検出されなかった。

## Scope

- 正本: `src/content/tools/*.md` 全31件（Photoroom / Creatify / Recraftを含む）
- 比較対象: `src/pages/categories/`, `src/pages/use-cases/`, `src/pages/guides/`, `src/pages/comparisons/`, `src/pages/tools/`, `src/components/`, `src/data/`
- 対象外（正本として扱う）: `src/content/tools/*.md` 自体は変更しない
- `reports/` は履歴アーカイブとして参照のみ、現行の正としては扱わない

## Method

1. 全31ツールのfrontmatter主要フィールド（japaneseUi/japanesePrompt, commercialUse/commercialUseNote, freePlan, lowestPaidPlan/currency, watermark, pricingModel, lastReviewed）を一括抽出。
2. `src/pages/conditions/commercial-use/` `src/pages/conditions/japanese/` はgetCollection('tools')で正本を直接読み込むDB駆動ページであることを確認（conditions-db-refactor 2026-06-22 適用済み）→ 自動的にCONSISTENT。
3. 各ツール名・slugでpages/components/dataを横断grep。価格表記（$/月・円/月）、無料プラン表現、商用利用表現、日本語対応表現、ブランド名表記を正本と逐次比較。
4. 新規3ツール（Photoroom/Creatify/Recraft）は当日の別タスク（predeployment SEO audit, commit 762fb8c/8a9607e）で既に個別チェック済みのため重点的に再確認し、他ツールは横断grepでサンプリング的に広く確認。
5. 発見した不一致を分類（CONSISTENT / STALE / CONTRADICTORY / TOO_STRONG / VERIFY / NON_FACTUAL_REFERENCE）し、軽微かつ無曖昧なもののみ最小修正。

## Findings Summary

- tools checked: 31 / 31
- references checked: 約120件超（grep一致行、カテゴリ表・比較表・ガイド表・FAQ文中の言及を含む）
- P1: 0
- P2: 0
- P3: 1（2箇所・同一種類の指摘）
- VERIFY: 0（新規に外部確認が必要な事実は発見せず。既存のVERIFY項目は各ツールmd内の既存注記のまま）
- files corrected: 2

## P1 Findings

なし。料金（$/月・円/月表記）、商用利用区分、無料プラン有無について、サンプリングした全ケース（Midjourney, Adobe Firefly, Canva AI, Leonardo AI, Playground AI, Runway, Pika, Luma AI, InVideo AI, Photoroom, Creatify, Recraft 等）で正本と一致していた。

## P2 Findings

なし。日本語対応（UI/プロンプト）については、canonicalが `false`/`unknown`/`partial` のツール（Clipdrop, Playground AI, Vidu AI, Midjourney, Runway, Kling AI等）に対応するページ側の記述（「非対応」「×」「英語UIのみ」等）はいずれも整合していた。ツール機能カテゴリ（image/video）についても比較記事・カテゴリページでの掲載区分に矛盾は見られなかった。

## P3 Findings

| # | 内容 | 該当 |
|---|------|------|
| 1 | ブランド名表記ゆれ：Stable Diffusionツールページの誘導リンクで、正本では「Brand Studio（旧DreamStudio）」に統一されている名称が、単独の旧名「DreamStudio」のまま残存 | `src/pages/tools/stable-diffusion/index.astro:149` |
| 2 | 同上（FAQ回答内の誘導リンク） | `src/pages/conditions/commercial-use/index.astro:36` |

いずれも同一パターンの軽微な表記ゆれ。他の全ページ（categories/image-generation, comparisons/ai-image-generation-sample-comparison, comparisons/free-ai-image-generators, components/CommercialUse.astro, components/Japanese.astro, components/JapaneseAiToolsGuide.astro, components/WatermarkCreditGuide.astro）は既に「Brand Studio（旧DreamStudio）」表記に統一済みであることを確認した。なお `src/pages/tools/nightcafe/index.astro:198` と `src/pages/categories/image-generation/index.astro:949` にも短い link ラベルとして単独「DreamStudio」があるが、比較表内の短縮ラベルであり事実主張性が低いためNON_FACTUAL_REFERENCEとして修正不要と判断した。

## VERIFY / Needs External Confirmation

今回の監査範囲では、新たに外部確認が必要な事実の矛盾は見つからなかった。既存の「要公式確認」「要確認」表記は各ツールmd側の既存の慎重な言い回しのまま維持されており、そのままで問題ない。

## Per-Tool Summary（抜粋・全31件確認、矛盾なしは省略記載）

| Tool | Canonical Status | Conflicting Locations | Decision | Correction |
|---|---|---|---|---|
| Adobe Firefly | japaneseUi=true, commercialUse=limited, price 1,580円/月 | categories/image-generation, comparisons(3件), guides/commercial-use-cost-comparison | CONSISTENT | なし |
| Canva AI | commercialUse=limited, currency=unknown, price ¥1,180/月〜(App Store) | categories/image-generation, comparisons/canva-ai-vs-adobe-firefly, guides | CONSISTENT | なし |
| Midjourney | freePlan=false, japaneseUi=false | 複数use-cases/comparisons | CONSISTENT | なし |
| Leonardo AI | japaneseUi=unknown, price $10/月(年払い)/$12/月(月払い) | comparisons/midjourney-vs-leonardo-ai | CONSISTENT | なし |
| Playground AI | japaneseUi=false, freePlan=true(非商用限定) | use-cases(3件), categories/image-generation | CONSISTENT | なし |
| Stable Diffusion | 正本slug=stable-diffusion, DreamStudio誘導リンク | tools/stable-diffusion:149 | STALE(表記ゆれ) | ブランド名修正 |
| Brand Studio（旧DreamStudio） | name="Brand Studio（旧DreamStudio）" | conditions/commercial-use:36, tools/stable-diffusion:149 | STALE(表記ゆれ) | ブランド名修正（2箇所） |
| Runway / Pika / Kling AI / Luma AI | 料金・商用利用・日本語対応 | categories/video-generation, comparisons(3件), guides(2件) | CONSISTENT | なし |
| InVideo AI | price 約$20/月〜 | categories/video-generation, comparisons/invideo-ai-vs-capcut-ai | CONSISTENT | なし |
| Vidu AI | japaneseUi=false | categories/video-generation, guides | CONSISTENT | なし |
| Photoroom（新規） | japaneseUi=true, japanesePrompt=unknown, commercialUse=paid-only | categories/image-generation, use-cases/ec-product-image | CONSISTENT（本日別タスクで修正済み確認） | なし |
| Creatify（新規） | japaneseUi=unknown, commercialUse=unknown | use-cases/ad-banner | CONSISTENT（ヘッジ表現一致） | なし |
| Recraft（新規） | japaneseUi=unknown, commercialUse=limited | categories/image-generation, guides/ai-image-commercial-use-checklist | CONSISTENT（本日別タスクで修正済み確認） | なし |
| その他22ツール（Clipdrop, D-ID, DALL·E, Fotor AI, Gemini画像生成, Hailuo AI, Haiper, HeyGen, Ideogram, Microsoft Designer, NightCafe, PixVerse, SeaArt AI, Synthesia, Tensor.Art, CapCut AI 等） | 各frontmatter値 | 横断grepでサンプリング確認 | CONSISTENT | なし |

## Changes Made

| Tool | File | Fact | Canonical | Existing | Severity | Action |
|---|---|---|---|---|---|---|
| Brand Studio（旧DreamStudio） | src/pages/tools/stable-diffusion/index.astro | ブランド名(G) | "Brand Studio（旧DreamStudio）" | "DreamStudio" | P3 | 修正: リンクテキストを "Brand Studio（旧DreamStudio）の料金・商用利用条件" に変更 |
| Brand Studio（旧DreamStudio） | src/pages/conditions/commercial-use/index.astro | ブランド名(G) | "Brand Studio（旧DreamStudio）" | "DreamStudio" | P3 | 修正: 同上 |

## Remaining Risks

- `src/pages/tools/nightcafe/index.astro:198` と `src/pages/categories/image-generation/index.astro:949` の短縮リンクラベル「DreamStudio」は事実主張性が低いため未修正（表示上の省略表記として許容）。将来的にリブランド表記統一ルールを厳格化する場合は要再検討。
- 監査は全ページの全文一致確認ではなく、フィールドごとの横断grepによるサンプリング確認である。個々のFAQ文・比較記事本文中の細かい言い回しまで100%網羅はしていない。

## Recommended Follow-Up

- 次回優先タスク: 本タスクの変更2件（コミット未実施）を、既存未pushの predeployment SEO audit 分（commit 8a9607e、Photoroom/Creatify/Recraft）と合わせて一度に人間承認のうえコミット・push・本番反映判断を行うこと。
- 中期的には、DreamStudioのような旧ブランド名を含むツールが増えた場合に備え、ブランド名の正本を`src/content/tools/*.md`の`name`フィールドから自動参照する仕組み（コンポーネント側でハードコード名を排除）を検討すると再発防止になる。

## リポジトリ全体の整合性についての結論

今回のサンプリング横断監査では重大な矛盾（P1/P2）は検出されず、リポジトリ全体のツールファクト整合性は良好な状態にある。次の最優先タスクは、新規3ツール（Photoroom/Creatify/Recraft）分の既存コミットと本監査の軽微修正を合わせてレビュー・コミット・push・人間による本番反映判断を進めることである。
