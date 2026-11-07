# Fotor AI：無料・透かし・商用利用の検索意図と公式根拠（2026-11-07）

## Evidence

- 公開URL `/tools/fotor-ai/`。記事正本 `src/content/tools/fotor-ai.md`。
- 既存認証済み90日Page-only集計 `2026-08-07..11-04`：682 impressions、0 clicks、average position 7.3（出典: https://github.com/rookies2478/strategy-os/issues/268#issuecomment-6702529159 ）。ページ全体の表示回数であり、検索クエリの種類や改稿効果ではない。
- Growth Loop Query×Page再検証 `2026-10-08..11-04`：AI Creativeサイト全体 Page2,762imp、Query×Page1,605imp（可視58.1%）、正規化除外0、URL異常0、クライアント打切りなし。個別Fotorクエリの全量・順位内訳は**NOT_VERIFIED**。https://github.com/rookies2478/movance-growth-loop/issues/71
- Google検索のSERP競合ページは検索日時や地域で変動し、外部Web検索だけでは対象プロパティのブランド/非ブランド比率を確定できない。**検索意図の分類は仮説**、クリック増加は未検証。

## 2026-11-07に確認した公式情報と条件差

1. https://www.fotor.com/jp/pricing/ : Basic（無料）、Pro/Pro+/Max、有料・無料プラン別のAI利用上限、出力と透かしについての比較。金額・クレジットはページの動的表示があり、数値を新たに転記しない。
2. https://support.fotor.com/hc/en-us/articles/900006654446-Commercial-Use : AI Image Generatorの生成画像の個人/商用用途と、Fotor提供素材・テンプレートの利用権を区別して説明。無条件の出力著作権保証はしない。
3. https://www.fotor.com/jp/ai-image-generator/ : 日本語のAI画像生成ページ。生成画像の商用利用を案内。
4. https://www.fotor.com/jp/features/one-tap-enhance : 高画質化機能のFAQでは無料利用を個人用途に限定しPro/Pro+を商用向けとして案内。**生成画像の一般案内をFotorの全機能・全契約へ自動拡張しないことが重要**。
5. https://www.fotor.com/termsofservice : 商用納品・素材利用・第三者権利は最新版の規約と契約に従う。

## 変更判断

- `/tools/fotor-ai/` に**検索目的別（無料／透かしなし／業務商用／日本語）**の表を追加し、機能単位の条件差と一次情報への導線を明確化。
- 既存の価格・無料枠・公式クレジット数、DBの`commercialUse`や`watermark`値、affiliate URL、schema、title/metaを改変しない。最新の未ログインサイトの権利表示を「法的な保証」と解釈しない。
- 過去の2026-11-06ファクト確認があるため情報の重複更新を避ける。
- 他サイトの記事・URL・本番コードは変更しない。

## Workflow / HOLD

- 親タスク https://github.com/rookies2478/ai-creative-tools-db/issues/71 と横断監査 https://github.com/rookies2478/strategy-os/issues/268 。
- 別件の公式URL台帳タスクは[PR #76](https://github.com/rookies2478/ai-creative-tools-db/pull/76)で完了記録がmasterへマージ済み。本PRはその正本を変更・復元しない。
- 本PRはユーザーの2026-11-07公開承認を受けているが、独立した必須QAがPASSするまではDraftのまま。`validate:task`、`build`、`validate:data`、`validate:publish`、`validate:affiliate-links`、`validate:scope`、`git diff --check` は実行証拠があるもののみPASSとする。
- 実際のユーザー検索意図の構成を確定するにはGSCのより詳細な非機密集計とSERPの人手確認が必要。新記事・URL統合・本番公開を行わない。
