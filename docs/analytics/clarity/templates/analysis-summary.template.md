---
analysis_id: "REPLACE_WITH_ID"
analysis_type: clarity
generated_at: "YYYY-MM-DDTHH:mm:ssZ"
period_start: "YYYY-MM-DD"
period_end: "YYYY-MM-DD"
source_run: "run-HHMMSS"
related_gsc_analysis: "REPLACE_WITH_GSC_ANALYSIS_ID"
data_quality: "REPLACE (例: sufficient / insufficient / partial)"
implementation_now: false
next_review_date: "YYYY-MM-DD"
status: "draft"
---

# Clarity Analysis Summary

## Scope

対象ページ・対象期間・分析目的を記載する。

## Source Run

参照した`manifest.json`の`run_id`、取得方式、取得日時を記載する。

## Related GSC Candidate

本分析のきっかけとなったGSC分析の`analysis_id`とcandidate_idを記載する。

## Data Quality

セッション数・サンプリングの有無・期間連続性を記載する。不十分な場合はその旨を明記する。

## Session Volume

対象ページのセッション数を記載する。少数の場合は断定材料にしない旨を明記する。

## Page Behavior

ページ単位の行動傾向を記載する。

## Scroll Analysis

scroll depthの傾向を記載する。

## Rage Clicks

rage click発生箇所と推定原因を記載する。

## Dead Clicks

dead click発生箇所と推定原因を記載する。

## Quick Backs

quick back（即離脱・即戻り）の発生状況を記載する。

## Device Differences

デバイス別の行動差異を記載する。

## Country Differences

国別の行動差異を記載する。

## Recording Review Notes

recordingを目視確認した場合の所見を記載する。**個人を特定できる情報（氏名・メールアドレス・IPアドレス・フォーム入力内容等）は書かないこと。**

## Findings

主要な発見を箇条書きで記載する。

## Candidates

| candidate_id | page | issue | evidence | priority | recommendation | implementation_now | hold_reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## HOLD Items

保留とした項目とその理由を記載する。

## Implementation Decision

実装する／しないの最終判断と、対応するactive task（存在する場合）を記載する。

## Required Follow-up

追加で必要な確認・次回runで取得すべきデータを記載する。

## Next Review Date

次回レビュー予定日を記載する。
