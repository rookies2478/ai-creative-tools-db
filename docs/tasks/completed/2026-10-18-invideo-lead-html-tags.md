# Task Result

## Goal

InVideoページのlead等で`<b>`タグが文字として露出する不具合を、共通コンポーネント無変更で解消する。

## Result

PASS（PR・CI・merge・本番確認は別途追記）

## Summary

`ToolDetailPage.astro` は `lead` / `commercial.lead` / `basicInfo.sum` を `{}` でエスケープ出力するため、`src/pages/tools/invideo-ai/index.astro` の3箇所の `<b>` が露出していた。ページ側の文字列から `<b>` `</b>` のみ除去（文章・CTA・href・rel・計測属性は不変）。

## Changed Files

- src/pages/tools/invideo-ai/index.astro（3箇所、タグ除去のみ）
- docs/tasks/LATEST.md
- docs/tasks/completed/2026-10-18-invideo-ga4-release-readiness.md（前タスク記録をcommit）
- docs/tasks/completed/2026-10-18-invideo-lead-html-tags.md（本ファイル）

## Checks

- task validation: PASS
- build: PASS（95ページ）
- diff check: PASS
- scope validation: active task を completed へ移動後に再実行（最終結果は PR 本文に記載）
- data quality: validate:data Errors 0、validate:affiliate-links PASS
- publish check: validate:publish Errors 0 / Warnings 4
- preview: dist静的検査。`&lt;タグ` 出現 0件、hero/pricing CTA 2件の data-outbound-type=affiliate / data-tool-name / data-cta-position・href・rel を維持
- GitHub Actions: 未確認

## Production

NOT_DEPLOYED（確認は別途追記）

## LATEST Update

yes
