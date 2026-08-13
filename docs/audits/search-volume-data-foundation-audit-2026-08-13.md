# 検索ボリュームデータ基盤 構築記録（2026-08-13）

## 経緯

ユーザーがDownloadsに`search_volume_Photoroom_Creatify_Recraft.xlsx`（Google Keyword Planner由来、Photoroom/Creatify/Recraft 3ツール分）をダウンロード。これを全ツール共通の正本キーワード検索ボリュームデータの基盤とする方針を受け、既存データとの重複調査 → 統合 → 正本確立を実施。

## 発見した既存データ

- `docs/seo-research/article_brushup_recommendations.xlsx`（作成日2026-06-15、git非追跡）に、GSC×ラッコ×GKPを組み合わせたコンテンツ企画用クラスタ分析が存在。生GKP数値（月間検索数・競合・CPC）と派生分析（優先度スコア・記事化推奨等）が同一シートに混在。
- 対象ツールはKling AI/Runway/Stable Diffusion等の動画・画像生成系一部に限定。Photoroom/Creatify/Recraftは非収録のため直接の重複はない。
- GSCエクスポート（`docs/analytics/gsc/**/raw/*.csv`）はインプレッション/クリックデータであり、検索需要データとは別物として区別。
- `reports/*.csv`各種は内部リンク・DB整合性監査であり無関係。

## 実施内容

1. 新規ダウンロードworkbook（Photoroom/Creatify/Recraft、計1467行の関連キーワード）を正本KEYWORD_DATAへフルインポート。
2. 旧workbookの`04_全KW整理`シートから、ツールを確実に識別できる9ツール（Stable Diffusion/Runway/Adobe Firefly/Kling AI/Luma AI/Hailuo AI/Pika/Vidu AI/PixVerse）・202行の生GKP数値のみを移行。優先度スコア・記事化推奨・想定ページ種別などの派生判断列は移行対象外（旧ファイルに残置）。
3. ツール不明な757行、D-ID/HeyGen系（複数ツール混在で不可分）、Sora/Veo/Wan/Flow/FramePack/AIアバター系（DB未収録ツール）、Gemini（曖昧・4行のみ）は移行せず除外。
4. 完全一致の重複（同ツール・同キーワード・同期間）4件を重複排除。
5. `src/content/tools/*.md`の32ツール全件を`MASTER_SUMMARY`に反映。データなしツールは`NOT_RESEARCHED`（数値欄は空欄、0は入れない）。
6. 新規ダウンロードworkbook原本は`docs/seo-research/imports/search_volume_Photoroom_Creatify_Recraft_2026-08-13.xlsx`へ移動し保管（重複編集可能マスタを作らないため、Downloads側は残さない）。
7. `.gitignore`の`docs/seo-research/*.xlsx`等をサブディレクトリ含む`**/*.xlsx`等に修正（importsサブフォルダが誤ってgit追跡されないよう対応）。
8. 旧workbookは削除せず、HISTORICAL / DERIVED ANALYSISとしてガバナンス文書に明記（[docs/decisions/search-volume-data-governance.md](../decisions/search-volume-data-governance.md)）。

## 最終構成

- 正本: `docs/seo-research/ai-tools-search-volume-master.xlsx`（`MASTER_SUMMARY` / `KEYWORD_DATA` / `SOURCE_LOG`の3シート）
- 原本保管: `docs/seo-research/imports/search_volume_Photoroom_Creatify_Recraft_2026-08-13.xlsx`
- 旧ファイル: `docs/seo-research/article_brushup_recommendations.xlsx`（HISTORICAL / DERIVED ANALYSIS、削除せず残置）
- GSCは`docs/analytics/gsc/`に分離維持、検索ボリュームと混同しない

## 集計結果

- 現在のツール数（`src/content/tools/*.md`）: 32
- RESEARCHED: 3（photoroom / creatify / recraft）
- VERIFY（部分データのみ、要再調査): 9（stable-diffusion / runway / adobe-firefly / kling-ai / luma-ai / hailuo-ai / pika / vidu-ai / pixverse）
- NOT_RESEARCHED: 20
- KEYWORD_DATAの総行数: 1665（新規workbook由来1467 + 旧workbook移行202 - 重複排除4）

## 本番・git影響

- 本番サイト・DB・スキーマ・依存関係・本番設定：無変更
- git管理対象への変更: `.gitignore`の1行修正のみ（研究用xlsx/csv/zipのサブフォルダも確実に除外する意図）
- xlsxファイル自体はすべてgit非追跡（`.gitignore`対象）
- commit/push: 未実施（ユーザー確認待ち）
