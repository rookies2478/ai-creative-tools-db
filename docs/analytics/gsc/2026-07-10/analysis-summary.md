---
analysis_id: "gsc-2026-07-10-property-3m"
analysis_type: gsc
generated_at: "2026-07-27T09:45:04Z"
period_start: "2026-05-05"
period_end: "2026-07-08"
comparison_period_start: null
comparison_period_end: null
source_run: "run-094504"
data_quality: "MEDIUM"
implementation_now: false
next_review_date: "2026-08-10"
status: "final"
---

# GSC Analysis Summary

## Scope

対象: aicreative-db.com property全体（`aicreative-db.com-Performance-on-Search-2026-07-10.zip`、scope=property、期間ラベル`3m`）。目的: 最初の正式importを行い、SEO改善候補とHOLD対象を洗い出す（本タスクでは実装は行わない）。

## Source Run

- run_id: `run-094504`
- raw path（Git非追跡）: `docs/analytics/gsc/2026-07-10/raw/run-094504/`
- manifest status: `success`（validation.errors: 0, validation.warnings: 0）
- source ZIP: `aicreative-db.com-Performance-on-Search-2026-07-10.zip`（size_bytes: 7453, sha256: `52dfdf3e9198bebd46b254a17a14326be13ce472d7a8cfa4bed9341a93c18a54`）
- scope: property全体（page_url: null）
- required datasets: daily/queries/pages/countries/devices/search-appearance/filters すべてpresent。search-appearanceはpresent=true, empty=true（正常）。query-pages・sitemapsはpresent=false（manual exportの既知の制約、異常ではない）

## Data Quality

**評価: MEDIUM**

- daily.csv: 65行、日付連続性OK（2026-05-05〜2026-07-08、欠損日なし）。ただしラベルは`3m`（過去3か月間）だが実際の連続データは約65日分のみで、GSCの反映ラグ・プロパティ開始時期等により3か月フルレンジではない可能性がある（`period.start_date`/`end_date`はimporter側で未算出のため、本書ではdaily.csvの実データ範囲を採用した）。
- queries.csv: 295行、pages.csv: 97行、countries.csv: 44行、devices.csv: 3行。malformed row・異常CTR値は検出されず。
- query-pages非対応のため、**クエリとページの対応関係は推測であり断定できない**（後述の各所見で明記）。
- GSCの仕様上、極少数のクエリは匿名化されて`queries.csv`に現れない可能性がある（anonymized query）。今回のデータでは検出方法がないため、上位クエリの合計とページ単位impressionsに差がある可能性を残す。
- 検索ボリューム自体は推測しない（GSCのimpressionsは実際の検索表示回数であり、検索需要全体を表すものではない）。
- **最大の制約**: 後述の通り、上位トラフィックページの多くがdaily.csv期間の末尾付近または期間後にtitle/meta/snippet変更を受けており、CTR・順位変化の帰属を現時点のデータだけで判断できない。

## Executive Summary

1. 総クリック56、総インプレッション3,979、CTR 1.41%、加重平均順位16.3。国別は日本が支配的（クリック56/56、インプレッション3,688/3,979）。デバイス別はPC優位（クリック45、CTR 1.63%）。
2. トラフィック上位ページは`/tools/stable-diffusion/`（インプレッション529、クリック4）、`/tools/runway/`（241、3）、`/tools/luma-ai/`（238、3）。
3. **候補ページのほぼ全てが、データ期間の末尾（2026-07-05前後）またはデータ期間後（2026-07-11〜07-26）にtitle・meta・snippetの変更を受けている**ため、CTRベースの新規改善判断を行うには評価期間が不足している。今回は実装候補を選定せず、次回export（28日推奨）まで待つ判断とする。

## Top Findings

1. クエリ「stable diffusion」（インプレッション127、クリック0、加重平均順位2.37）— 非常に良い順位にもかかわらずCTR 0%。ただしquery-pages不在のため対応ページを断定できず、単独の裸ツール名クエリはナビゲーショナル意図（公式サイトを探している）の可能性がありCTR改善余地があるとは限らない。
2. クエリ「stable diffusion 商用利用」（インプレッション166、クリック0、順位30.22）— 順位30台のため低CTRは順位起因であり、CTR起因ではない可能性が高い（Position Opportunity寄り）。
3. 国別・デバイス別データは日本・PC優位で想定通り、異常なし。

## Query Findings

- 上位クリック: `tensor.art 料金`(1)、`stable diffusion 無料 制限`(1)、`runway 料金`(1)など、いずれもクリック数1件のみで統計的有意性は低い。
- 上位インプレッション（クリック0）: `stable diffusion 商用利用`(166)、`stable diffusion`(127)、`商品画像生成ai 比較`(73)、`aiクリエイティブ`(66)、`日本語のプロンプトに対応していて使いやすいおすすめの画像生成aiサービスを教えてください`(52)、`バナー生成ai 比較`(42)。
- 上記のうち`stable diffusion`以外は順位17〜48台で、CTRが低いのは主に順位起因（Position Opportunity）と考えられ、CTR単独の問題として扱わない。
- ブランドクエリ（ツール名単体、例: `stable diffusion`, `ステーブルディフュージョン`）と非ブランドクエリ（`〜 比較`, `〜 おすすめ`, `〜 商用利用`等）が混在。ツール名単体クエリは意図がツール本体（公式サイト）である可能性があり、review/DBサイトへの誘導自体が本質的に難しい場合がある。
- 料金・商用利用・無料クエリが多数を占め、DB全体の強み（料金・商用利用情報の整備）と検索需要が概ね一致している。

## Page Findings

- ツールページ（`/tools/*`）がクリック・インプレッションの大半を占める（stable-diffusion, runway, luma-ai, tensor-art, pixverse, kling-ai, gemini-image-generation, fotor-ai, capcut-ai）。
- use-case系（`/use-cases/blog-eyecatch/`, `/use-cases/ec-product-image/`, `/use-cases/ad-banner/`, `/use-cases/youtube-thumbnail/`）も一定のインプレッションを獲得。
- comparison系（`/comparisons/adobe-firefly-vs-microsoft-designer/`）はCTR13.64%と高め（ただし母数22インプレッションのみで小規模）。
- クリック0ページのうち、`/use-cases/ad-banner/`（インプレッション106、順位29.31）は順位起因の低CTRであり、`/tools/fotor-ai/`（インプレッション207、クリック1、順位8.15）は比較的良好な順位でCTRが低い（0.48%）ため本来はCTR Opportunity候補だが、後述の通り既にtitle変更済み（2026-07-11、データ期間後）でHOLD。
- ルート分類はrepository構造（`src/pages/tools/`, `src/pages/use-cases/`, `src/pages/comparisons/`, `src/pages/categories/`, `src/pages/guides/`, `src/pages/conditions/`）に基づき判定。不明routeはunknownとして扱ったが、今回の97件中unknown該当なし。

## CTR Opportunities

| query/page | impressions | clicks | ctr | position | note |
| --- | --- | --- | --- | --- | --- |
| query: stable diffusion | 127 | 0 | 0% | 2.37 | 順位優秀・CTR 0%。query-page不明のためpage側の断定不可。ツール名単体はナビゲーショナル意図の可能性あり |
| page: /tools/fotor-ai/ | 207 | 1 | 0.48% | 8.15 | 順位良好・CTR低いが、2026-07-11に既にtitle変更済み（データ期間後）でHOLD |

CTRが低いというだけでtitle変更を即断していない（順位起因のケースは除外して記載）。

## Position Opportunities

順位4〜15: クエリ107件・ページ57件。順位11〜30: クエリ53件・ページ28件。順位30超: クエリ102件・ページ10件。母数の大部分がクリック0・インプレッション少数のロングテールクエリであり、個別の順位改善判断はページ単位（`/tools/fotor-ai/` position 8.15、`/tools/kling-ai/` position 17.45等）でのみ言及し、クエリ単体の順位改善は候補化しない（データ不足）。

## Cannibalization Signals

`stable diffusion`関連クエリ（`stable diffusion`, `stable diffusion 商用利用`, `stable diffusion 商用 利用`, `ステーブルディフュージョン`）が複数存在し、いずれも高インプレッション・0クリックだが、query-pages不在のため単一ページへの集約か複数ページへの分散かを判定できない。カニバリゼーションの有無は本データだけでは判断不可（data_gap）。

## Metadata Change Hold Check

以下のページはデータ期間内または期間直後にtitle/meta/snippetを変更しており、評価期間が不足しているためHOLD対象とする。

| page | last relevant change | change date | days from period_end (2026-07-08) |
| --- | --- | --- | --- |
| /tools/stable-diffusion/ | fix: improve Stable Diffusion search snippet | 2026-07-05 | -3日（期間内、末尾） |
| /tools/runway/ | fix: improve SEO copy for high-impression AI Creative pages | 2026-07-05 | -3日（期間内、末尾） |
| /tools/fotor-ai/ | fix: improve CTR titles for GSC priority pages | 2026-07-11 | +3日（期間後） |
| /tools/luma-ai/ | fix: improve CTR titles for GSC priority pages | 2026-07-11 | +3日（期間後） |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | Align Microsoft Designer commercial-use comparison | 2026-07-12 | +4日（期間後） |
| /tools/kling-ai/ | Fix duplicate Kling AI source reference | 2026-07-26 | +18日（期間後） |
| /tools/gemini-image-generation/ | Fix resolved DB consistency issues AUD-34 to AUD-44 | 2026-07-25 | +17日（期間後） |
| /tools/tensor-art/ | Fix Tensor.Art japanesePrompt inconsistency | 2026-07-25 | +17日（期間後） |

上記8ページで、トラフィック上位ページのほぼ全てをカバーしている。14日未満の評価期間、または変更がデータ期間後で評価期間ゼロのケースが大半。

## Candidates

| candidate_id | route | page_type | clicks | impressions | ctr | position | classification | issue | evidence | repository_finding | recent_change | data_gap | priority | recommendation | implementation_now | hold_reason | next_required_data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 | /tools/stable-diffusion/ | tool | 4 | 529 | 0.76% | 15.05 | A5 | 最大トラフィックページ、CTR/順位とも改善余地はあるが直近変更あり | impressions最大 | title/snippet変更あり(2026-07-05) | 期間末尾3日のみ | 低（HOLD中） | 次回export後に再評価 | hold | 2026-07-05のsnippet変更から評価期間3日のみで不十分 | 変更後28日以上のGSCデータ |
| C2 | /tools/runway/ | tool | 3 | 241 | 1.24% | 11.35 | A5 | 順位境界(11)でCTR改善余地の可能性 | impressions上位 | SEOコピー変更あり(2026-07-05) | 期間末尾3日のみ | 低（HOLD中） | 次回export後に再評価 | hold | 変更から評価期間3日のみで不十分 | 変更後28日以上のGSCデータ |
| C3 | /tools/luma-ai/ | tool | 3 | 238 | 1.26% | 10.11 | A5 | 順位良好・CTR低め | impressions上位 | title変更あり(2026-07-11、期間後) | 評価期間ゼロ | 低（HOLD中） | 次回export後に再評価 | hold | 変更がデータ期間後で評価データなし | 変更後のGSCデータ |
| C4 | /tools/fotor-ai/ | tool | 1 | 207 | 0.48% | 8.15 | A5 | 順位優秀・CTR低い（本来A1相当の好条件） | impressions上位・順位良好 | title変更あり(2026-07-11、期間後) | 評価期間ゼロ | 低（HOLD中） | 変更効果測定を優先 | hold | 2026-07-11のtitle変更の効果が未測定 | 変更後のGSCデータ |
| C5 | (query) stable diffusion | query | 0 | 127 | 0% | 2.37 | A4 | 順位最上位帯・CTR 0% | 順位2.37 | query-pages不在で対応page断定不可 | 対応ページ不明のため判定不可 | 高 | ページ確定後に再評価（ナビゲーショナル意図の可能性も考慮） | hold | query-page対応が不明でページ側の施策を特定できない | page-filtered GSC exportまたはAPI取得によるquery-page対応 |
| C6 | /use-cases/ad-banner/ | use-case | 0 | 106 | 0% | 29.31 | A3 | 順位30近傍、クリック0 | impressions中位 | 直近変更（2026-07-11 GSC P2内部リンク・Pika title改善） | 期間後 | 中 | metadata変更より先にコンテンツ・意図整合を検討 | hold | 直近変更の効果測定期間不足 | 変更後のGSCデータ |
| C7 | /use-cases/ec-product-image/ | use-case | 1 | 126 | 0.79% | 32.93 | A3 | 順位30台 | impressions中位 | 直近変更（2026-07-14 内部リンク追加） | 期間後 | 中 | 即時metadata変更を優先しない | hold | 順位30台は新規性・情報量課題の可能性、metadata変更のみでは解決しない | 追加分析（コンテンツ精査） |
| C8 | /comparisons/adobe-firefly-vs-microsoft-designer/ | comparison | 3 | 22 | 13.64% | 18.5 | A6 | CTR良好だが母数小 | 少数データ | 直近変更あり(2026-07-12) | 期間後 | 高 | 判断材料不足 | hold | インプレッション22件は統計的に不十分 | 次回exportでの母数拡大 |
| C9 | /tools/kling-ai/ | tool | 2 | 127 | 1.57% | 17.45 | A5 | 順位17台・CTR低め | impressions中位 | 直近変更あり(2026-07-25/26) | 評価期間ゼロ | 低（HOLD中） | 次回export後に再評価 | hold | 変更から評価期間なし | 変更後のGSCデータ |
| C10 | /tools/gemini-image-generation/ | tool | 2 | 96 | 2.08% | 16.06 | A5 | 順位16台 | impressions中位 | 直近変更あり(2026-07-25) | 評価期間ゼロ | 低（HOLD中） | 次回export後に再評価 | hold | 変更から評価期間なし | 変更後のGSCデータ |

## Selected Candidate

selected_candidate: none
implementation_now: false

理由: 上位候補（C1〜C4, C9, C10）はいずれも直近14日未満（または評価期間ゼロ）のtitle/meta/snippet変更を受けており、再度のmetadata変更判断を行うには早すぎる。C5はquery-page対応が不明で施策対象ページを特定できない。C6〜C8はコンテンツ・意図整合や母数の観点で即時実装に足る根拠がない。無理に1件を選定しない。

## HOLD Items

- **C1〜C4, C9, C10（計6件）**: title/meta/snippet変更からの評価期間が14日未満、またはデータ期間後の変更で評価データが皆無。次回export（28日推奨）まで判断を保留。
- **C5「stable diffusion」クエリ**: query-pages非対応のためGSC上で対応ページを一意に特定できない。page-filtered exportまたはAPI取得によるquery-page対応が必要。
- **C6, C7**: 直近の内部リンク変更の効果測定期間が不足。加えて順位30近傍のため、metadata変更よりコンテンツ・検索意図の精査が先。
- **C8**: インプレッション22件のみで統計的に不十分。母数拡大を待つ。
- **カニバリゼーション懸念（stable diffusion関連クエリ群）**: query-pages不在のため単一/複数ページへの分散状況が不明。
- **Clarity未実施**: 本タスクではUX行動データを扱っておらず、UX起因のCTR低下を断定していない。
- **DB情報未確認**: 各候補ページのDB本文（`src/content/tools/*.md`）とtitle/meta/H1の整合は簡易確認のみで、変更提案の詳細検討は行っていない。

## Implementation Decision

今回は実装を行わない（`implementation_now: false`）。理由は上記Selected Candidate欄の通り。ページ・DB・sitemapへの変更は一切実施していない。

## Required Follow-up

1. 次回GSC export（28日推奨）を取得し、2026-07-05〜07-26の一連のtitle/snippet変更（stable-diffusion, runway, fotor-ai, luma-ai, adobe-firefly-vs-microsoft-designer, kling-ai, gemini-image-generation, tensor-art）の効果を測定する。
2. 「stable diffusion」クエリの対応ページ特定のため、page-filtered GSC export（`/tools/stable-diffusion/`単体）の取得・importを検討する。
3. importer側の既知の制約（`filters.csv`の日付キーが実データでは「日付」ラベルで記録されており、`period.start_date`/`end_date`が自動算出されず`null`のまま出力される）を別タスクで修正することを推奨する（本タスクのtarget_files外のため今回は未修正）。

## Next Review Date

2026-08-10
