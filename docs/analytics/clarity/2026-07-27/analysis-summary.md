---
analysis_id: "clarity-2026-07-27-stable-diffusion-28d-v2"
analysis_type: clarity
generated_at: "2026-07-27T14:35:00Z"
period_start: "2026-06-29"
period_end: "2026-07-27"
source_run: "run-143000"
related_gsc_analysis: "gsc-2026-07-10-property-3m"
data_quality: "LOW"
implementation_now: false
next_review_date: "2026-08-24"
status: "final"
---

# Clarity Analysis Summary

## Scope

対象: `https://aicreative-db.com/tools/stable-diffusion/`（page_match_type: contains）。目的: GSC分析（`gsc-2026-07-10-property-3m`、candidate C5「stable diffusion」クエリ）を踏まえた、Stable Diffusionツールページの初回Clarity MCP行動分析run。期間: 2026-06-29〜2026-07-27（UTC、28日、requested=returned一致）。ページ・DB・sitemapへの変更は行っていない。

## Source Run

- run_id: `run-143000`
- raw path（Git非追跡）: `docs/analytics/clarity/2026-07-27/raw/run-143000/`
- manifest status: `success`
- 取得方式: MCP（`mcp__clarity-ai-creative__query-analytics-dashboard`、`mcp__clarity-ai-creative__list-session-recordings`）。旧`clarity` MCPは使用していない。
- 事前確認: `list-session-recordings`（フィルタなし・URLフィルタあり両方）で返却URLがすべて`aicreative-db.com`ドメインであることを確認済み。前回run（`run-131108`、`docs/analytics/clarity/2026-07-27/raw/run-131108-failed/`）は別サイト（`www.ai-gijiroku-navi.com`）への誤接続によるfailedで、本runで正式に置き換える（analysis-summaryの`source_run`としては使用しない）。

## Related GSC Candidate

- GSC candidate C5（クエリ「stable diffusion」、順位2.37、インプレッション127、クリック0）を参照。
- query-page対応は依然未確認（GSC側の制約）。**Clarityは検索クエリとページの対応を証明しない**。今回はStable Diffusionページ内の行動確認のみを目的とした。
- 本runで得られたのはページ内行動データのみであり、C5のクエリ-ページ対応自体に新たな判断材料は与えない。

## Data Quality

**評価: LOW**

- セッション数: 3（対象期間28日）— 統計的解釈には不十分な件数。
- filter精度: URLフィルタ（contains）適用後の3セッション全件がドメイン`aicreative-db.com`・パス`/tools/stable-diffusion/`一致を目視確認済み。他URL混入なし。
- period一致: requested 2026-06-29〜2026-07-27、returned 2026-06-29〜2026-07-27で一致。
- sampling有無: unclear（MCPレスポンスにsampling/limited明示フラグなし）。
- metric coverage: overview・behaviors・device・country・scroll閾値（25/50/75/90%）はすべて取得済み。JavaScriptエラーは0件返却（発生なしと解釈するが、件数自体が3セッションのため検出力は低い）。
- device/country coverage: PCのみ3件（Japan 2、Hong Kong SAR 1）。モバイル・他国データなし。
- behavior count: rage click 0、dead click 0、quick back 0、excessive scroll 0（いずれも3セッション中0件、率としては解釈しない）。

## Session Volume

3セッション／28日（unique users 3、page views 3）。**少数のため、率（0%等）を「問題なし」の断定材料にしない。**

## Page Behavior

- 平均active time: 34.26秒、平均engagement time: 206.53秒（ページ滞在の指標としては一定の閲覧が見られるが、n=3のため傾向とはしない）。
- `list-session-recordings`で確認した3件のtimelineでは、明確なrage click・dead click・quick back・excessive scrollのパターンは見られなかった。1件はCTA「公式サイトで確認する」をクリックして退出、1件は他ページ（アニメ・イラスト比較ページ）経由で流入し6分超滞在、1件は瞬間離脱（duration 106ms、quick backには該当しない極短時間セッション）。

## Scroll Analysis

- 平均scroll depth: 29.33%
- 到達率: 25%到達 66.67%、50%到達 33.33%、75%到達 0%、90%到達 0%
- n=3のため、絶対値としての解釈（「75%以降を読まれていない」等）は保留。ページ構成上の問題を示す根拠としては不十分。

## Rage Clicks

0件（3セッション中）。件数不足のため「rage clickなし」を確定判断としない。

## Dead Clicks

0件（3セッション中）。同上。

## Quick Backs

0件（3セッション中）。1件のduration 106msの短時間セッションはtimelineEvents 0件・referrer nullで直接流入と見られ、quick back（他ページへの即時戻り）の定義には該当しない。

## Device Differences

全3セッションがPCのみ。モバイル・タブレットのデータは0件で、デバイス間比較は不可能（unavailable）。

## Country Differences

Japan 2件、Hong Kong SAR 1件。件数が少なく国別傾向の比較は不可能（unavailable）。

## Recording Review Notes

集計上、rage click・dead click・quick back・excessive scrollのいずれも0件だったため、異常検知に基づく追加reviewは実施していない（review 0件）。ただし件数確認のため3セッション全件のtimelineを目視し、いずれも一般的な閲覧・CTAクリック・短時間離脱という範囲内の行動であることを確認した。session ID・recording URL・氏名・メールアドレス・入力内容・cookie・IP相当情報・個人単位timestampは本ドキュメント・manifestのいずれにも保存していない。

## Findings

1. 対象ページの28日間セッション数は3件のみで、統計的に断定できる規模ではない。
2. rage click・dead click・quick back・excessive scroll・JavaScriptエラーはいずれも0件だが、母数が小さいため「問題なし」の確定判断にはしない。
3. scroll到達率は50%到達が33.33%、75%以降は0%だが、n=3のため構成上の問題判断は保留。
4. デバイスはPCのみ、国はJapan中心（Hong Kong SAR 1件）で、比較可能な母数がない。
5. 前回run（`run-131108`）はClarity project誤接続によるfailedであり、本runで正式に再接続・再取得を完了した。

## Candidates

| candidate_id | page | issue | evidence | priority | recommendation | implementation_now | hold_reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| （該当なし） | `/tools/stable-diffusion/` | セッション数不足 | 28日間で3セッションのみ | 低 | セッション蓄積後に再run | hold | n=3では実装判断に足る根拠がない |

## HOLD Items

- **セッション数不足**: 3セッション/28日は統計的解釈に不十分。追加のセッション蓄積を待つ。
- **device/country比較不可**: PCのみ・国も2種のみで比較材料がない。
- **GSC候補C5との連携**: 今回のClarityデータはページ内行動のみであり、C5（クエリ-ページ対応）自体への新たな判断材料はない。C5は引き続きGSC側のHOLD状態のまま。

## Implementation Decision

実装なし（`implementation_now: false`）。ページ・DB・sitemapは無変更。セッション数が少なく、Clarity単独でもGSCとの併用でも実装判断に足る根拠がない。

## Required Follow-up

1. セッション数が十分に蓄積された時点（目安: 数十セッション以上）で同一手順（`query-analytics-dashboard` → `list-session-recordings`）を再実行する。
2. 次回GSC 28日exportの取得時期とClarity再runの時期を揃えることを検討する。
3. モバイル・他国データが得られた場合、device/country別の傾向比較を追加する。

## Next Review Date

2026-08-24
