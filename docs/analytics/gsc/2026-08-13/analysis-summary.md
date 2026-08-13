---
analysis_id: "gsc-2026-08-13-manual-17d"
analysis_type: gsc
generated_at: "2026-08-13T04:10:00+09:00"
period_start: "2026-07-27"
period_end: "2026-08-12"
comparison_period_start: null
comparison_period_end: null
source_run: "run-130308"
data_quality: "partial（query-pages/sitemaps unavailable, search-appearance empty, filters CSV本文0行）"
implementation_now: false
next_review_date: "2026-08-27"
status: "draft"
---

# GSC Analysis Summary

## Scope

対象プロパティ: aicreative-db.com（property全体、手動UI export、検索タイプ=ウェブ）。分析目的: ユーザー指定の「最新14日分析」依頼だが、実際のダウンロードファイルの記録期間は17日間（2026-07-27〜2026-08-12）であったため、期間はファイル記録値を正本として扱った（CLAUDE.md常設ルール4：不明な事実を推測で補完しない）。

## Source Run

`docs/analytics/gsc/2026-08-13/raw/run-130308/manifest.json`。取得方式: manual-ui-export（GSC UI手動ZIP、`aicreative-db.com-Performance-on-Search-2026-08-13.zip`、sha256 feb90fd1...）。Downloads内の原本はrawへ移動後に削除済み（重複コピーなし）。

## Data Quality

daily 17行（2026-07-27〜2026-08-12、連続・欠損なし）。queries 181行、pages 78行、countries 32行、devices 3行。search-appearanceは空（0行、GSC UI仕様上の正常な空 = present:true, empty:true）。query-pages・sitemapsはmanual export非対応のためunavailable（既知の制約、statusには影響なし）。filters.csvは値行が本文になくヘッダーのみパースされたが、実ファイル内の生テキストで「フィルタ,期間 2026/07/27-2026/08/12」を直接確認し期間を確定した。今日2026-08-13時点で終了日が08-12（1日ラグ）というのはGSCの通常データ確定ラグ（2〜3日）より短く、直近1〜2日分の数値が確定後に微修正される可能性がある点に留意。

## Executive Summary

- 期間はユーザー想定の14日固定ではなく実測17日間（07-27〜08-12）。前回API取得期間（07-13〜07-26）とは連続しているが重複なし、長さも異なるため、Step6の厳密な期間対比条件（「同じ14日間の場合のみ」）を満たさず、厳密増減率比較はINVALIDとした。
- サイト全体: clicks 28 / impressions 2,773 / CTR 1.01% / 加重平均position 11.34（17日間累計）。
- C1 Tensor.Art: 引き続きブランド指名検索が大半（tensor.art/tensor art系で表示回数の95%超）、position改善傾向（前回9.6→今回7.62）、非ブランドクリックなし。HOLD継続が妥当。
- C2 Stable Diffusion 商用利用: 表示回数は維持（前回42→今回51）だがposition悪化（前回23.0→今回24.02）、クリック0のまま。7/11-7/12の本文改善は両期間より前に反映済みのため、効果が出ていないと判断できる。
- C3 バナー生成AI比較: 「バナー生成ai比較」はposition横ばい〜微悪化（13.9→14.13）、「バナー作成ai比較」は明確に悪化（15.7→21.38）。クリック0継続。
- 新規候補3件抽出（実装なし、implementation_now: false）。

## Top Findings

1. サイト全体のクリック数は少数（28件/17日）のため、個別クエリ・ページの増減は過大評価しない。
2. C2（stable diffusion 商用利用）はposition改善せず、7/11-7/12の施策の効果が確認できない状態が継続。
3. C3のうち「バナー作成ai比較」はposition悪化が明確（前回比+5.68）。
4. 新規候補: vidu-aiページで「vidu ai 商用利用」がposition 3.67（既にトップ3）だがCTR 0%（表示回数9件）。
5. 「luma 手数料」が前回期間には存在しなかった新規クエリとして出現（impressions 17, position 8.53）。

## Query Findings

- tensor.art: clicks 2 / impr 97 / CTR 2.06% / pos 7.67
- tensor art: clicks 1 / impr 432 / CTR 0.23% / pos 7.42
- stable diffusion 商用利用: clicks 0 / impr 51 / CTR 0% / pos 24.02（前回 impr42 / pos23.0）
- stable diffusion 商用 利用: clicks 0 / impr 14 / pos 24
- stable diffusion 著作権: clicks 0 / impr 15 / pos 24.53
- バナー生成ai比較: clicks 0 / impr 15 / pos 14.13（前回 impr19 / pos13.9）
- バナー作成ai比較: clicks 0 / impr 16 / pos 21.38（前回 impr17 / pos15.7）
- vidu ai 商用利用: clicks 0 / impr 9 / pos 3.67（前回期間クエリなし、比較不可）
- luma 手数料: clicks 0 / impr 17 / pos 8.53（前回期間クエリなし、新規出現）
- runway 商用利用: clicks 0 / impr 12 / pos 12.92（前回 impr13 / pos8.08、悪化）

## Page Findings

- /tools/tensor-art/: clicks 3 / impr 635 / CTR 0.47% / pos 7.62（表示回数最多ページ）
- /tools/stable-diffusion/: clicks 2 / impr 287 / CTR 0.70% / pos 12.48
- /tools/luma-ai/: clicks 1 / impr 154 / CTR 0.65% / pos 7.27
- /tools/runway/: clicks 0 / impr 47 / CTR 0% / pos 10.83（前回 impr51 / pos8、悪化）
- /tools/vidu-ai/: clicks 1 / impr 87 / CTR 1.15% / pos 8.24（期間中の2026-07-28に生成動画サンプル追加commit ea4489fあり、期間途中の変更のため効果は部分的にしか反映されていない可能性）
- /comparisons/ad-banner-ai-tools/: clicks 0 / impr 33 / CTR 0% / pos 16.12

## CTR Opportunities

- vidu ai 商用利用（/tools/vidu-ai/）: position 3.67と上位表示にもかかわらずCTR 0%。タイトル・スニペットの訴求見直し候補。
- tensor art（ブランド指名, impr432）: position 7.42でCTR 0.23%と低い。ただしブランド検索のためタイトル改善余地は限定的。

## Position Opportunities

- runway 商用利用: 12.92（前回8.08から後退）。2ページ目相当まで悪化しており要因不明（本文変更なし、外部要因の可能性）。
- luma 手数料: 8.53で1ページ目圏内。既存本文の料金・手数料記述の網羅性次第でさらなる改善余地あり（未確認、断定しない）。

## Cannibalization Signals

query-pagesがunavailableのため、クエリ×ページの直接対応は今回のデータでは検証不能。ページ単位の重複は目視で確認: firefly canva 比較（クエリ）はimpr12・pos9.75、対応候補ページ/comparisons/canva-ai-vs-adobe-firefly/はimpr76・pos9.37と近接しており、既に当該ページが同クエリ意図をカバーしていると推定（新規カニバリゼーションの兆候ではなく正常な対応関係）。

## Metadata Change Hold Check

- a3a2648（2026-07-11, GSC priority pages CTR titles改善）、a7cbf2f/7e78c79（2026-07-11〜12, stable diffusion商用ライセンス強化）、3aba73e（2026-07-12, Luma AI公式ライセンス出典追加）、00925ad（2026-07-11, runway review date更新）はいずれも前回・今回両期間より前の変更のため、両期間の数値比較への混入なし。
- edbc8ea（2026-07-25, Tensor.Art japanesePrompt整合性修正）も両期間開始前。
- ea4489f（2026-07-28, Vidu AI生成動画サンプル追加）は今回期間（07-27〜08-12）の2日目に発生した変更のため、vidu-aiページの数値は期間内で条件が変化している可能性がある点をHOLD要因として記録。

## Candidates

| candidate_id | page | query | issue | evidence | priority | recommendation | implementation_now | hold_reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N1 | /tools/vidu-ai/ | vidu ai 商用利用 | position 3.67と上位だがCTR 0% | impr9, clicks0, pos3.67 | A1 | タイトル・meta descriptionのCTR改善余地を個別auditで検討 | false | 表示回数が少なく統計的信頼性が低い（次回run再確認後に実施判断） |
| N2 | /tools/luma-ai/ | luma 手数料 | 新規出現クエリ、1ページ目圏内 | impr17, clicks0, pos8.53, 前回期間クエリなし | A1 | 既存料金・手数料関連本文の網羅性を個別確認 | false | 単月点データのみで再現性未確認 |
| N3 | /tools/runway/ | runway 商用利用 | position悪化（8.08→12.92） | impr12（前回13）, clicks0, pos12.92 | A2 | 悪化要因の特定（本文変更なし、外部要因の可能性）を次回runで追跡 | false | 悪化要因不明、断定回避のため次回再確認優先 |

## Selected Candidate

なし（implementation_now: false、分析のみで実装は行わない）。

## HOLD Items

- C1 Tensor.Art: ブランド指名検索比率が引き続き極めて高く（非ブランドクエリの表示回数は全体の5%未満、クリックはブランドクエリのみ）、position改善（9.6→7.62）中のため現状維持が妥当。HOLD継続。
- C2 Stable Diffusion 商用利用: 表示回数維持もposition悪化・クリック0が継続。7/11-7/12施策の効果不十分と見られるが、原因（アルゴリズム変動か内容要因か）を本データのみでは断定できないためHOLD、次回run（目安2026-08-27以降）で再追跡。
- C3 バナー比較: 「バナー作成ai比較」の悪化が明確だが、クリックが依然0で統計的サンプルが小さいため、個別audit実施は次回run後に判断。
- fotorの自然文・AI対話調クエリ群: 前回同様、意図不明確のためHOLD継続。

## Implementation Decision

実装しない。対応するactive taskは作成せず、分析結果のみをdocsへ記録。

## Required Follow-up

- 次回run時、GSC Search Analytics API（`scripts/analytics-gsc-fetch.mjs`）でquery-pagesを取得しC1〜C3・N1〜N3のカニバリゼーション有無を直接検証する。
- runway商用利用のposition悪化要因（外部要因か）を次回run後に再確認する。
- vidu-aiページはea4489f（動画サンプル追加）の効果が今期間データに部分的にしか反映されていないため、次回runでフル期間の効果を再評価する。

## Next Review Date

2026-08-27（目安、次回14日〜運用に復帰する場合はGSC APIでの取得を優先する）。
