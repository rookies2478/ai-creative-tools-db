---
analysis_id: "gsc-2026-08-10-api-14d"
analysis_type: gsc
generated_at: "2026-08-13T13:25:00+09:00"
period_start: "2026-07-28"
period_end: "2026-08-10"
comparison_period_start: "2026-07-13"
comparison_period_end: "2026-07-26"
source_run: "run-131755"
data_quality: "sufficient（9 dataset全success、truncation無し、totals/daily match）"
implementation_now: false
next_review_date: "2026-08-27"
status: "draft"
---

# GSC Analysis Summary

## Scope

対象プロパティ: aicreative-db.com（sc-domain）。取得方式: GSC Search Analytics API（正式方式）。期間: 2026-07-28〜2026-08-10（14日間、requestedとactualが一致）。前回正式14日run（2026-07-13〜2026-07-26）との比較。2026-08-13の17日manual export分析（docs/analytics/gsc/2026-08-13/analysis-summary.md）は補助資料として扱い、本比較には使用しない。

## Source Run

`docs/analytics/gsc/2026-08-10/raw/run-131755/manifest.json`。method: api、credentialMethod: service-account、credentialPathStored: false。9 dataset（totals/daily/queries/pages/query-pages/devices/countries/search-appearance/sitemaps）すべてstatus=success、truncated: []、totalsDailyCheck.status: match。

## Data Quality

daily 14行連続（header除く）。queries 154行、pages 72行、query-pages 170行。query-pages上の一部URLではpage全体impressionsと個別query合計に差があり（例: tensor-artページ471 vs 明示query合計401）、GSCのプライバシー閾値による低ボリュームqueryの非表示（anonymized/未集計行）が原因と推定。これはGSC仕様上の既知制約であり、importer/fetcherの不具合ではない。

## Executive Summary

- 全体: clicks 22（前回18、+4/+22.2%、UP）、impressions 2,213（前回2,329、-116/-4.98%、DOWN）、CTR 0.99%（前回0.77%、UP）、position 11.73（前回15.5、UP=改善）。
- impressionsは減少したがclicksは増加、CTRも明確に改善しており、構成変化だけでなく実質的なCTR改善と解釈できる。
- C1 Tensor.Art: ブランド依存継続、非指名クリック0、HOLD継続。
- C2 Stable Diffusion 商用利用系: 表示回数微増もposition横ばい〜微悪化、クリック0継続。7/11-7/12施策から約1か月経過も効果確認できず。AUDIT（title/meta・SERP競合の個別確認を推奨、今回は実装しない）。
- C3 バナー生成AI比較: ページ全体のpositionは大幅改善（34.9→15.5）だがimpressionsは大幅減（179→30）。クエリレベルでは/categories/design/との表示回数分散（カニバリゼーション）を確認。AUDIT。
- 新規候補3件抽出（すべてimplementation_now: false）。

## Query Findings

- tensor.art: clicks1 / impr66 / pos7.52（前回impr27 / pos9.41、改善）
- tensor art: clicks0 / impr321 / pos7.32（前回impr49 / pos9.59、改善だが表示回数が前回比+555%と急増、集計方法差の可能性あり）
- stable diffusion 商用利用: clicks0 / impr48 / pos24.38（前回impr42 / pos23.02、微悪化）
- stable diffusion 商用 利用: clicks0 / impr12 / pos24
- stable diffusion 著作権: clicks0 / impr15 / pos24.53
- stable diffusion 無料 制限: clicks0 / impr25 / pos7.36（商用利用系とは別intent、page1相当だがCTR0%）
- stable diffusion ライセンス / stability ai community license: 今期間は不在（0件ではなく「観測なし」、断定しない）
- バナー作成ai比較: clicks0 / impr16 / pos21.38（前回impr18 / pos17.5、悪化）
- バナー生成ai比較: clicks0 / impr14 / pos14.29（前回impr25 / pos21.52、大幅改善）
- バナー生成ai おすすめ: clicks0 / impr7 / pos43.86
- luma 手数料: clicks0 / impr13 / pos8.23（前回期間に該当query観測なし、新規）
- runway 商用利用: clicks0 / impr11 / pos13.09（前回impr13 / pos8.08、悪化）
- vidu ai 商用利用: clicks0 / impr7 / pos7.14（前回impr6 / pos10.67、改善だがサンプル僅少）
- firefly canva 比較: clicks0 / impr11 / pos9.64 → 既存/comparisons/canva-ai-vs-adobe-firefly/ページ（impr69 / pos9.48）で概ねカバー済みと判断

## Page Findings

- /tools/tensor-art/: impr471 / clicks1 / CTR0.21% / pos7.49
- /tools/stable-diffusion/: impr221 / clicks2 / CTR0.90% / pos14.07（前回impr177 / pos14.20、ほぼ横ばい）
- /comparisons/ad-banner-ai-tools/: impr30 / clicks0 / CTR0% / pos15.53（前回impr179 / pos34.89、position大幅改善だがimpressions大幅減）
- /use-cases/ad-banner/: impr19 / clicks1 / CTR5.26% / pos36.26（前回impr29 / pos42.48）
- /tools/luma-ai/: impr124 / clicks1 / CTR0.81% / pos7.18
- /tools/runway/: impr40 / clicks0 / CTR0% / pos11.25
- /tools/vidu-ai/: impr73 / clicks1 / CTR1.37% / pos8.34
- /comparisons/canva-ai-vs-adobe-firefly/: impr69 / clicks0 / pos9.48

## CTR Opportunities

- /tools/stable-diffusion/の商用利用・著作権クエリ群（合計impr75、clicks0）はposition24前後で1ページ目には届いていないため、CTR改善よりposition改善が優先課題。
- stable diffusion 無料 制限（impr25 / pos7.36）は1ページ目相当でCTR0%、タイトル・スニペット訴求の見直し余地あり。

## Position Opportunities

- runway 商用利用: 前回8.08→今回13.09で明確な悪化。本文変更なし（git log確認済み）のため外部要因（競合変化・アルゴリズム変動）の可能性。
- バナー作成ai比較: 前回17.5→今回21.38で悪化継続。

## Cannibalization Signals

- バナー作成ai比較: /comparisons/ad-banner-ai-tools/（impr13, pos16.38）と/categories/design/（impr12, pos45.42）でほぼ同数の表示回数分散を確認。design側は順位が大きく劣るため、内部リンク構造上の重複が示唆される（実装は今回対象外）。
- バナー生成ai比較: /comparisons/ad-banner-ai-tools/（impr13, pos12.31）が主要、/categories/design/（impr1, pos40）はごく僅かで実質的な競合ではない。
- tensor-art / stable-diffusion系クエリでは単一URLへの集約を確認、カニバリゼーションなし。

## Metadata Change Hold Check

- 2f8a910（2026-07-30, Microsoft Designer commercial-use表記統一）が今期間中（07-28〜08-10）に`src/pages/comparisons/ad-banner-ai-tools/index.astro`を1行変更。Microsoft Designer行の商用可否表記のみでバナー関連クエリのタイトル・見出し・比較ロジックには影響しないと判断されるが、C3のposition改善（34.9→15.5）とタイミングが一部重なるため、要因特定はできない旨をHOLD要因として記録。
- ea4489f（2026-07-28, Vidu AI生成動画サンプル追加）も今期間開始直後の変更。vidu-aiページの数値は期間内で条件変化がある点は前回summaryと同様に留意。
- 他の対象ページ（tensor-art, stable-diffusion, luma-ai, runway）は前回期間終了後〜今期間中の変更なし（git log確認済み）。

## Candidates

| candidate_id | page | query | issue | evidence | priority | recommendation | implementation_now | hold_reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N1 | /tools/stable-diffusion/ | stable diffusion 無料 制限 | position7.36と1ページ目相当だがCTR0% | impr25, clicks0, pos7.36 | A1 | タイトル・スニペットのCTR改善余地を個別audit | false | 単期間データのみ、次回run再確認後に判断 |
| N2 | /tools/luma-ai/ | luma 手数料 | 新規出現query、1ページ目圏内 | impr13, clicks0, pos8.23、前回期間観測なし | A1 | 既存料金・手数料関連本文の網羅性確認 | false | サンプル小、再現性未確認 |
| N3 | /tools/runway/ | runway 商用利用 | position明確悪化（8.08→13.09） | impr11(前回13), clicks0, pos13.09 | A2 | 悪化要因特定を次回run後に追跡（本文変更なしを確認済み） | false | 悪化要因不明、断定回避 |

## Selected Candidate

なし（implementation_now: false）。

## HOLD Items

- C1 Tensor.Art: 明示的に識別できたquery（impr合計401/471=85.1%）は全てブランド系。非集計分（14.9%）は個別query非表示（GSC仕様）のため断定不可だが、非指名クリックは0のまま。HOLD継続。
- C2 Stable Diffusion 商用利用系: 表示回数維持〜微増、position横ばい〜微悪化、クリック0継続。7/11-7/12施策から約1か月経過しても効果確認できず。実装GOの根拠不足のためAUDIT（次点で個別調査推奨、本タスクでは実装しない）。
- C3 バナー生成AI比較: ページ全体のposition改善は確認できたがクエリレベルのクリックは依然0、かつ/categories/design/との軽微なカニバリゼーションを確認。AUDIT（今回実装なし）。
- vidu ai 商用利用: position改善傾向だが表示回数7件と少なくHOLD。
- firefly canva 比較: 既存比較ページで概ねカバー済みのためNO_ACTION。
- fotorの自然文・AI対話調クエリ群、および同系統の他ブランド組合せクエリ（タトゥーシール、midjourney×firefly等）: 意図不明確のため引き続きHOLD。

## Implementation Decision

実装しない。C2・C3はAUDIT（個別監査候補）として次点に記録するが、本タスクでは着手しない。

## Required Follow-up

- C2・C3のAUDIT対応要否を次回active taskとして検討する。
- runway商用利用のposition悪化要因を次回run後に再確認する。
- バナー関連クエリの/categories/design/との表示回数分散について、内部リンク構造の意図的な設計かどうかを次回individual auditで確認する。

## Next Review Date

2026-08-27（目安）。
