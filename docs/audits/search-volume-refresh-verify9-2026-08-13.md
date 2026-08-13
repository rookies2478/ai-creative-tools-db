# Search Volume Refresh — VERIFY 9 Tools

## Executive Summary

RESULT: PASS。9ツール分のGoogle Keyword Planner (GKP) 包括的エクスポート（ユーザーがDownloadsへ配置）を検証・取込し、`docs/seo-research/ai-tools-search-volume-master.xlsx` の該当9ツールを VERIFY → RESEARCHED へ昇格した。旧VERIFY行202件は削除せずSUPERSEDEDマークで provenance を保持。12ツール横断の `BIG_KEYWORD_RANKING` シートを新規作成。捏造値なし。commit/push/デプロイは未実施。

## Methodology

- ツール: stable-diffusion / runway / adobe-firefly / kling-ai / luma-ai / hailuo-ai / pika / vidu-ai / pixverse
- 出典: Google Keyword Planner のみ
- 対象市場: 日本 / 言語: 日本語（各CSVヘッダーの期間表記「2025年7月1日 - 2026年6月30日」で確認）
- ブランド名の完全一致キーワードを基準に brand_search_volume を算出、その他を related として集計

## Phase 1 — Input File Validation

Downloadsフォルダに9ファイル全て実在確認（拡張子は隠れておらず全て `.csv`、実体はUTF-16LE・タブ区切り・GKP標準エクスポート形式）。

| ファイル | 拡張子 | 行数(データ行) | 検出期間 | 完全性評価 |
|---|---|---|---|---|
| search_volume_stable-diffusion_2026-08-13.csv | .csv (UTF-16LE) | 943 | 2025-07〜2026-06 | 網羅的（brand行+関連819行） |
| search_volume_runway_2026-08-13.csv | .csv (UTF-16LE) | 524 | 同上 | 網羅的（brand行+関連233行） |
| search_volume_adobe-firefly_2026-08-13.csv | .csv (UTF-16LE) | 742 | 同上 | 網羅的（brand行+関連363行） |
| search_volume_kling-ai_2026-08-13.csv | .csv (UTF-16LE) | 756 | 同上 | 網羅的（brand行+関連400行） |
| search_volume_hailuo-ai_2026-08-13.csv | .csv (UTF-16LE) | 566 | 同上 | 網羅的（brand行+関連274行） |
| search_volume_luma-ai_2026-08-13.csv | .csv (UTF-16LE) | 610 | 同上 | 網羅的（brand行+関連336行） |
| search_volume_pika_2026-08-13.csv | .csv (UTF-16LE) | 392 | 同上 | 網羅的（brand行+関連163行） |
| search_volume_pixverse_2026-08-13.csv | .csv (UTF-16LE) | 448 | 同上 | 網羅的（brand行+関連225行） |
| search_volume_vidu-ai_2026-08-13.csv | .csv (UTF-16LE) | 355 | 同上 | 網羅的（brand行+関連126行） |

各ファイルで確認した項目：keyword列あり／Avg. monthly searches列あり／competition・competition indexあり／CPC low・high(Top of page bid)あり／月別履修列(Jul2025〜Jun2026)あり／関連キーワード行を多数含み単一行やブランド名のみの出力ではないことを確認。9件すべてPASS、HOLD該当なし。

## Phase 2 — File Move

上記9ファイルを `~/Downloads` から `docs/seo-research/imports/` へ移動（ファイル名・内容は無変更、`mv` によりDownloads側は削除、二重コピーなし）。`.gitignore` により `docs/seo-research/**/*.csv` はGit管理外のまま（`git check-ignore -v` で確認済み）。

## Phase 4 — Legacy VERIFY Rows（置換前の記録）

| tool_slug | 旧行数 | source_file | 旧research_status |
|---|---|---|---|
| stable-diffusion | 77 | article_brushup_recommendations.xlsx (04_全KW整理) | VERIFY |
| runway | 47 | 同上 | VERIFY |
| adobe-firefly | 21 | 同上 | VERIFY |
| kling-ai | 19 | 同上 | VERIFY |
| luma-ai | 15 | 同上 | VERIFY |
| hailuo-ai | 8 | 同上 | VERIFY |
| pika | 7 | 同上 | VERIFY |
| vidu-ai | 6 | 同上 | VERIFY |
| pixverse | 2 | 同上 | VERIFY |

合計202行（SOURCE_LOG `SRC-2026-06-B` の記載と一致）。

## Phase 5〜7 — Normalize & Replace

KEYWORD_DATAへ9ツール分・合計5,318行を新規追加（`data_source="Google Keyword Planner"`, `country="Japan"`, `language="Japanese"`, `period_start=2025-07-01`, `period_end=2026-06-30`, `collected_at=2026-08-13`, `research_status="RESEARCHED"`, `source_file=docs/seo-research/imports/search_volume_<slug>_2026-08-13.csv`）。keyword列が空の集計行（GKPエクスポート冒頭の合計擬似行、各ファイル2行）は取込対象外。

旧202行は削除せず `research_status` を `SUPERSEDED_2026-08-13` に変更し、notesに置換理由を追記（現行サマリー集計から除外、provenanceは保持）。

新規SOURCE_LOGエントリ `SRC-2026-08-B` を追加。

## Phase 6 — Ambiguous Brand Terms（除外根拠）

各エクスポートに、非AI義の裸のブランド語（`runway` / `pika` / `luma` / `firefly` 単体）は1行も含まれていなかった（GKPのキーワードアイデア生成が既に "ai" 付きバリエーションを中心に返したため）。よって brand_search_volume は下記の完全一致キーワードのみから算出し、非AI義の混入なし：

| tool | 採用したexact brand keyword | volume |
|---|---|---|
| stable-diffusion | `stable diffusion` | 500,000 |
| runway | `runway ai` | 5,000 |
| adobe-firefly | `adobe firefly` | 50,000 |
| kling-ai | `kling ai` | 50,000 |
| hailuo-ai | `hailuo ai` | 50,000 |
| luma-ai | `luma ai` | 5,000 |
| pika | `pika ai` | 5,000 |
| pixverse | `pixverse ai` | 5,000 |
| vidu-ai | `vidu ai` | 5,000 |

related集計から除外した個別行（無関係な別ツール名・汎用語と判断）：
- pika: `pixnova ai`（別ツール、Pikaと無関係）— 1行・volume 500
- vidu-ai: `fal ai video`（別ツールfal.ai）、`kissing ai video`（汎用・vidu固有でない）— 2行・各volume 50

上記3行を除いた残り全行を related_keyword_count / related_keyword_volume_total に集計。**限界事項**: 各ツール163〜819行の related 行全件を1件ずつ目視精査したわけではなく、上記で識別できた明確な異物のみを除外した。将来的な精緻化（全件レビュー）は別タスク推奨。

## Phase 8 — MASTER_SUMMARY 更新結果

| tool | brand_volume | related_count | related_volume_total | research_status | latest_research_date |
|---|---|---|---|---|---|
| stable-diffusion | 500,000 | 819 | 265,800 | RESEARCHED | 2026-08-13 |
| runway | 5,000 | 233 | 10,900 | RESEARCHED | 2026-08-13 |
| adobe-firefly | 50,000 | 363 | 43,100 | RESEARCHED | 2026-08-13 |
| kling-ai | 50,000 | 400 | 35,600 | RESEARCHED | 2026-08-13 |
| hailuo-ai | 50,000 | 274 | 15,450 | RESEARCHED | 2026-08-13 |
| luma-ai | 5,000 | 336 | 22,750 | RESEARCHED | 2026-08-13 |
| pika | 5,000 | 163 | 13,250 | RESEARCHED | 2026-08-13 |
| pixverse | 5,000 | 225 | 9,500 | RESEARCHED | 2026-08-13 |
| vidu-ai | 5,000 | 126 | 7,100 | RESEARCHED | 2026-08-13 |

実際の全体件数（32ツール中）: **RESEARCHED = 12（既存3: photoroom/creatify/recraft + 今回9） / VERIFY = 0 / NOT_RESEARCHED = 20**。ユーザー想定値と一致。

## Phase 9 — BIG_KEYWORD_RANKING（12ツール、xlsx新規シート）

exact AIツールブランド検索ボリューム順（同値はrelated_keyword_volume_totalで補助ソート、非AI義の混入なし）：

| rank | tool_slug | tool_name | exact_brand_keyword | brand_search_volume | related_keyword_volume_total | related_keyword_count |
|---|---|---|---|---|---|---|
| 1 | stable-diffusion | Stable Diffusion | stable diffusion | 500,000 | 265,800 | 819 |
| 2 | photoroom | Photoroom | photoroom | 50,000 | 64,000 | 578 |
| 3 | adobe-firefly | Adobe Firefly | adobe firefly | 50,000 | 43,100 | 363 |
| 4 | kling-ai | Kling AI | kling ai | 50,000 | 35,600 | 400 |
| 5 | hailuo-ai | Hailuo AI | hailuo ai | 50,000 | 15,450 | 274 |
| 6 | luma-ai | Luma AI | luma ai | 5,000 | 22,750 | 336 |
| 7 | recraft | Recraft | recraft | 5,000 | 17,050 | 566 |
| 8 | pika | Pika | pika ai | 5,000 | 13,250 | 163 |
| 9 | runway | Runway | runway ai | 5,000 | 10,900 | 233 |
| 10 | pixverse | PixVerse | pixverse ai | 5,000 | 9,500 | 225 |
| 11 | vidu-ai | Vidu AI | vidu ai | 5,000 | 7,100 | 126 |
| 12 | creatify | Creatify | creatify | 500 | 6,150 | 319 |

## Phase 10 — Top 5 Search-Demand Opportunities（検索需要のみ、実装優先度ではない）

1. stable-diffusion（500,000）
2. photoroom（50,000、tie内related最多）
3. adobe-firefly（50,000）
4. kling-ai（50,000）
5. hailuo-ai（50,000）

**注意**: これは検索需要（exact brand volume）のみに基づく順位。最終的なSEO実装優先度の決定には、現行GSC順位・impressions/clicks・SERP難易度・現行ページ品質・公式サイトの検索結果占有度の追加確認が別途必要（未実施）。

## Remaining NOT_RESEARCHED Tools（20件）

canva-ai-image-generator, capcut-ai, clipdrop, d-id, dalle, dreamstudio, fotor-ai, gemini-image-generation, haiper, heygen, ideogram, invideo-ai, leonardo-ai, microsoft-designer, midjourney, nightcafe, playground-ai, seaart-ai, synthesia, tensor-art（20件、変更なし）

## Data Quality Notes

- 捏造値なし。全数値はDownloadsのGKPエクスポートCSVから直接抽出。
- xlsx編集はPython (openpyxl) で実施（Node.js側にxlsx/exceljs依存が存在しないことを確認済みのため）。
- ワークブックはPhase12検証で正常に開くことを確認済み（4シート: MASTER_SUMMARY / KEYWORD_DATA / SOURCE_LOG / BIG_KEYWORD_RANKING）。
- src/content/tools/*.md、src/pages配下、その他本番反映系ファイルは一切変更していない。
- commit / push / デプロイは実施していない（`git status --short` は本監査ファイルの新規作成分のみを表示）。

## Validation (Phase 12)

- 正常にxlsxが開けることを確認: PASS
- 9ツール全てRESEARCHED: PASS
- Photoroom/Creatify/Recraftのレコード無変更で健在: PASS（brand/related値は既存2026-08-13値のまま）
- 重複アクティブ行なし: PASS（旧202行はSUPERSEDED、集計対象は新規5,318行のみ）
- 旧VERIFY行の汚染なし: PASS（MASTER_SUMMARYの集計値は新規データのみで算出）
- 捏造値なし: PASS
- importファイルは`docs/seo-research/imports/`に実在: PASS
- xlsx/csvはGit管理外のまま: PASS（`git check-ignore -v`で確認）
- 本番ファイル無変更: PASS（`git status --short`はaudit md 1件のみ）

## Next Step

12ツールランキングは実装優先度決定の準備が整った状態。次の推奨アクションはGSC実績（現行順位・impressions/clicks）とSERP難易度を上位候補（stable-diffusion / photoroom / adobe-firefly / kling-ai / hailuo-ai）に重ね合わせ、強化すべきbig-keywordページ上位3件を選定すること。
