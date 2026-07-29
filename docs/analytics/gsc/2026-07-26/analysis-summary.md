---
analysis_id: "gsc-2026-07-26-property-14d-api"
analysis_type: gsc
generated_at: "2026-07-29T15:53:22Z"
period_start: "2026-07-13"
period_end: "2026-07-26"
comparison_period_start: null
comparison_period_end: null
source_run: "run-005322"
data_quality: "MEDIUM"
implementation_now: false
next_review_date: "2026-08-12"
status: "final"
---

# GSC Analysis Summary

## Scope

対象: `sc-domain:aicreative-db.com` property全体。GSC Search Analytics API経由の初回本取得（API方式が正式運用として稼働することを確認する回でもある）。連続14日間・同一期間で全9dataset取得。目的: 検索流入立ち上げフェーズの改善候補を最大3件抽出する（本タスクでは実装しない）。

## Source Run

- run_id: `run-005322`
- raw path（Git非追跡）: `docs/analytics/gsc/2026-07-26/raw/run-005322/`
- manifest: `method=api`, `success=true`, `credentialPathStored=false`
- requested/actual period: `2026-07-13`〜`2026-07-26`（14日間、data_lag_days=3のため最新確定日は2026-07-26）
- timezone_basis: PT
- generated_at: `2026-07-29T15:53:22.456Z`
- 全9 dataset status: すべて`success`、`truncated: []`、`warnings: []`、`errors: []`
- totals/daily整合チェック: `status: match`（clicksDifference/impressionsDifference/ctrDifference/positionDifference すべて0）
- credentialMethod: `service-account`、秘密情報（パス・鍵内容・トークン）はコード・ログ・manifest・本書のいずれにも含まれないことを確認済み

## Data Quality

**評価: MEDIUM**

- daily.csv: 14行、2026-07-13〜2026-07-26で欠損日なし（`missingDates: []`）。正確に連続14日間であることを確認済み。
- queries.csv 209行、pages.csv 82行、query-pages.csv 219行（distinct query 209、うちmulti-URL 8件）、devices.csv 3行、countries.csv 30行。search-appearance.csvは0行（空、GSC上の該当リッチリザルトなしのため正常）。sitemaps.jsonは1件（`aicreative-db.com/sitemap.xml`、warnings/errors 0、submitted 90 URL、lastDownloaded 2026-07-28）。
- truncated datasetなし（安全上限未到達）。
- 総クリック18件と少なく、クエリ単体では統計的有意性が低いケースが多い。特に上位表示回数の多くを「fotorの〜を無料で使う方法は？」のような自然文・AI対話的クエリ（生成系AI/アシスタント経由と推定される表現パターン）が占め、順位2〜9台にもかかわらずクリック0が多数見られる。これらは通常の検索意図クエリと性質が異なる可能性があり、本書では実装候補として扱わずHOLDする。
- 国別は日本が支配的（クリック18/18、インプレッション1,832/2,329）。デバイス別はPC優位（クリック10、インプレッション1,719）、モバイル（クリック8、インプレッション596）、タブレット（クリック0、インプレッション14）。

## Executive Summary

1. 総クリック18、総インプレッション2,329、CTR 0.77%、加重平均順位15.5（表示ページ82・表示クエリ209・query-pages行219）。
2. 前回分析（2026-07-10、手動ZIP・期間ラベル`3m`＝約65日間）とは取得方式・期間長ともに条件が異なるため、増減率比較は**INVALID**（無理に算出しない）。
3. 意味のある表示があり、直近21日以内の変更履歴がなく、正常なハブ＆スポーク以外の単一URL帰属が明確な候補として、`tensor art`（A1）・`stable diffusion 商用利用`（A2）・`ad-banner-ai-tools`比較記事（A1/A2境界）の3件を抽出した。いずれも今回は実装せず（`implementation_now: false`）。

## Top Findings

1. `tensor art`（クリック0、インプレッション49、順位9.6）— `/tools/tensor-art/`単独URL。ブランド寄りだが比較・比較検討目的の余地があるツール名クエリで、良好な順位に対しCTRが弱い。
2. `stable diffusion 商用利用`（クリック0、インプレッション42、順位23.0）— `/tools/stable-diffusion/`単独URL。前回分析（2026-07-10時点、順位30.22、インプレッション166、65日間集計）と比べ順位帯が改善方向にあるが、集計期間が異なるため厳密な前回比較はできない。
3. `バナー生成ai 比較`（インプレッション19、順位13.9）・`バナー作成ai 比較`（インプレッション17、順位15.7）— いずれも主要URLは`/comparisons/ad-banner-ai-tools/`で、副次的に`/use-cases/ad-banner/`・`/categories/design/`へも少量表示（カテゴリ→比較記事→use-caseの正常なハブ＆スポーク構造と判断）。

## Query Findings

- クリックが発生したクエリ群は1クリックずつの散発的なもので、統計的有意性は低い（総クリック18に対し個別クエリで2件以上のクリックを持つものなし）。
- 上位インプレッション（クリック0）の大半を、`fotorの〜を無料で使う方法は？`型の自然文・AI対話調クエリが占める（順位2〜9台）。これらは意図の正体（人間の検索行動か、生成AI/アシスタント経由の合成クエリか）が本データだけでは判別できないため、HOLDとする（【query意図が不明確】に該当）。
- ブランド系クエリ（`tensor art`、`tensor.art`）はナビゲーショナル意図の可能性を残しつつも、順位が良好でCTRが0のためA1候補として扱う。

## Page Findings

- クリック上位: `/guides/ai-generation-credits-guide/`（2）、`/tools/synthesia/`（2）、`/tools/vidu-ai/`（2）、他は軒並み0〜1クリック。
- インプレッション上位ながらクリック0のページ: `/comparisons/ad-banner-ai-tools/`（179）、`/tools/tensor-art/`（49+27=76相当）、`/tools/stable-diffusion/`（該当クエリで42）。
- 直近21日以内（2026-07-05〜2026-07-26）にtitle/meta/H1/主要構成を変更したページかどうかをGit履歴で確認した結果、候補3件（`/tools/tensor-art/`、`/tools/stable-diffusion/`、`/comparisons/ad-banner-ai-tools/`）はいずれも2026-06-01以降の変更履歴なし（`git log --since=2026-06-01`で該当コミットなし）。データへの反映懸念なし。

## CTR Opportunities

- `tensor art`: 順位9.6・インプレッション49・CTR 0% — 順位に対しCTRが弱く、title/meta/冒頭回答の改善余地あり（A1）。
- `ad-banner-ai-tools`比較記事: `バナー生成ai 比較`（順位13.9）・`バナー作成ai 比較`（順位15.7）ともにCTR 0% — 意図整合・タイトル表現の改善余地あり（A1/A2境界）。

## Position Opportunities

- `stable diffusion 商用利用`: 順位23.0・インプレッション42 — 見出し・回答具体化・内部リンクで順位11位台への押し上げ余地あり（A2）。

## Cannibalization Signals

query-pagesでmulti-URLとなったクエリ8件をすべて確認した。

| query | 主URL | 副URL | 判定 |
| --- | --- | --- | --- |
| アバター動画生成ai 比較 | categories/avatar-video/ | use-cases/faceless-video/ | 正常なハブ＆スポーク |
| バナー作成ai 比較 | comparisons/ad-banner-ai-tools/ | categories/design/, use-cases/ad-banner/ | 正常なハブ＆スポーク |
| バナー生成ai 比較 | comparisons/ad-banner-ai-tools/ | use-cases/ad-banner/ | 正常なハブ＆スポーク |
| 商品画像生成ai おすすめ | comparisons/ec-product-image-ai-tools/ | use-cases/ec-product-image/ | 正常なハブ＆スポーク |
| 商品画像生成ai 比較 | comparisons/ec-product-image-ai-tools/ | use-cases/ec-product-image/ | 正常なハブ＆スポーク |
| 広告バナー 生成ai | comparisons/ad-banner-ai-tools/ | use-cases/ad-banner/ | 表示回数極小（各1）・正常構造 |
| 広告バナーの…作成できるツールを教えてください | comparisons/ad-banner-ai-tools/ | categories/design/, use-cases/ad-banner/ | 正常なハブ＆スポーク |
| 最新のaiアバター動画生成ツールと料金は？ | categories/avatar-video/ | categories/video-generation/ | 表示回数極小（3+2）・カテゴリ間の軽微な重複、実装判断には早い |

いずれも意図的なカテゴリ／比較記事／use-caseの役割分担と判断でき、統合・是正が必要なカニバリゼーションは検出されなかった。

## Metadata Change Hold Check

候補3件（tensor-art、stable-diffusion、ad-banner-ai-tools）について`git log --since=2026-06-01`を確認し、該当コミットなしを確認した。直近14〜21日以内のtitle/meta/H1/主要構成変更はないため、HOLD対象外。

## Candidates

| candidate_id | page | query | issue | evidence | priority | recommendation | implementation_now | hold_reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | /tools/tensor-art/ | tensor art | 順位9.6と良好だがCTR 0% | impr=49, clicks=0, pos=9.6（単一URL） | A1 | title/meta/冒頭回答の意図整合強化（本文は今回変更しない） | false | データ量・確度は十分だが本タスクはnon-goalsで実装を含まないため次回task化 |
| C2 | /tools/stable-diffusion/ | stable diffusion 商用利用 | 順位23.0、表示は一定数あり | impr=42, clicks=0, pos=23.0（単一URL） | A2 | 商用利用に関する見出し具体化・内部リンク追加候補 | false | 同上 |
| C3 | /comparisons/ad-banner-ai-tools/ | バナー生成ai 比較 / バナー作成ai 比較 | 順位13.9/15.7、CTR 0% | impr=19/17, clicks=0（主URL、副URLは正常ハブ＆スポーク） | A1 | title/meta表現・比較意図整合の改善余地 | false | 同上 |

## Selected Candidate

なし。本タスクは分析専用（non-goalsに実装・記事変更を含む）のため、`implementation_now: false`で確定。次回、C1〜C3のいずれか1件を対象とした個別active taskの作成を推奨する。

## HOLD Items

- `fotorの〜を無料で使う方法は？`型の自然文・AI対話調クエリ群（複数、順位2〜9台・クリック0） — query意図が不明確（人間検索かAIアシスタント経由の合成クエリか判別不能）のためHOLD。再評価条件: 次回run以降も同種クエリが継続的に出現し、クリック発生パターンが確認できた場合に再評価。
- `アバター動画生成ai 比較`（categories/avatar-video/、impr=17、pos=41.0） — 順位がA1/A2レンジ外（30超）のためHOLD。再評価条件: 順位が30位以内へ改善した場合。
- `最新のaiアバター動画生成ツールと料金は？`（categories/avatar-video/ と categories/video-generation/、各impr 3/2） — 表示数が少なく実装効果判断には早い。再評価条件: インプレッションが継続的に増加した場合。
- 前回分析（2026-07-10）で候補だった`stable diffusion`単体クエリ（ブランドクエリ） — 今回run内では単体クエリとしての大規模表示は確認されず（`tensor art`が同種のブランドクエリとして代わりに顕在化）。再評価条件: 次回runでの再出現時。

## Sitemap Check

- sitemap_count: 1（`https://aicreative-db.com/sitemap.xml`）
- submitted_urls: 90
- warnings: 0
- errors: 0
- notable_changes: lastDownloaded 2026-07-28（直近）、lastSubmitted 2026-06-16。異常なし。

## Required Follow-up

- C1〜C3のいずれかを対象に、title/meta description/冒頭回答改善の個別active taskを作成し、実施後は本run（run-005322）を効果測定のベースラインとする。
- `fotorの〜`型自然文クエリの継続出現状況を次回run（28日推奨、または14日連続run）で再確認する。
- 前回（2026-07-10、65日間・手動ZIP）と今回（2026-07-26、14日間・API）の集計条件が異なるため、次回以降は同一期間長（14日固定）でのAPI取得を継続し、比較可能なベースラインを蓄積する。

## Next Review Date

2026-08-12
