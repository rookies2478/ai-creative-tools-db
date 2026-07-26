---
analysis_id: "REPLACE_WITH_ID"
analysis_type: gsc
generated_at: "YYYY-MM-DDTHH:mm:ssZ"
period_start: "YYYY-MM-DD"
period_end: "YYYY-MM-DD"
comparison_period_start: null
comparison_period_end: null
source_run: "run-HHMMSS"
data_quality: "REPLACE (例: sufficient / insufficient / partial)"
implementation_now: false
next_review_date: "YYYY-MM-DD"
status: "draft"
---

# GSC Analysis Summary

## Scope

対象プロパティ・対象期間・分析目的を記載する。

## Source Run

参照した`manifest.json`の`run_id`、取得方式、取得日時を記載する。

## Data Quality

行数・期間連続性・欠損の有無・サンプル数の妥当性を記載する。不十分な場合はその旨を明記する。

## Executive Summary

主要な発見を3〜5行で要約する。

## Top Findings

優先度の高い発見を箇条書きで記載する。

## Query Findings

クエリ単位の発見（順位変動・CTR変動等）を記載する。

## Page Findings

ページ単位の発見を記載する。

## CTR Opportunities

表示回数は多いがCTRが低いページ・クエリの組み合わせを記載する。

## Position Opportunities

僅かな改善で順位上昇が見込める候補を記載する。

## Cannibalization Signals

同一クエリで複数ページが競合している兆候を記載する。

## Metadata Change Hold Check

直近でtitle/meta description/URL構造等の変更があった場合、その影響が数値に混入していないか確認し、該当する場合はHOLD理由を明記する。

## Candidates

| candidate_id | page | query | issue | evidence | priority | recommendation | implementation_now | hold_reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | |

## Selected Candidate

今回実装対象として選定したcandidate_idと選定理由を記載する。実装しない場合は「なし」と明記する。

## HOLD Items

保留とした項目とその理由を記載する。

## Implementation Decision

実装する／しないの最終判断と、対応するactive task（存在する場合）を記載する。

## Required Follow-up

追加で必要な確認・次回runで取得すべきデータを記載する。

## Next Review Date

次回レビュー予定日を記載する。
