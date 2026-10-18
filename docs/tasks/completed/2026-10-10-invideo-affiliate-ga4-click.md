# Task Result

## Goal

承認済みInVideo AIのHero／料金CTAにGA4計測属性を付与し、既存のdelegated click handlerで `affiliate_click` / `official_site_click` を測れるようにする（Issue #1）。

## Result

PASS（ローカル静的DOM検証まで。GA4実イベント到達・ASP実績は未検証＝UNKNOWN）

## Summary

`src/pages/tools/invideo-ai/index.astro` の primaryCta / secondaryCta に `outboundType`（`resolveToolOutboundLink` の linkType）と `ctaPosition`（hero / pricing）を追加。href・rel・ラベル・広告開示・CSSは無変更。承認済みなら `affiliate`、official fallbackなら `official` に自動で切り替わる。

## Changed Files

- src/pages/tools/invideo-ai/index.astro（2 CTA、4 props）
- docs/tasks/completed/2026-10-10-invideo-affiliate-ga4-click.md（active から移動、以前の NOT_RUN 記述を実測へ更新）
- docs/tasks/LATEST.md

## Checks

- task validation: PASS（完了移動前、active 1件）
- build: PASS（95ページ）
- diff check: PASS
- scope validation: PASS（完了移動前）
- data quality: validate:data Errors 0、validate:affiliate-links PASS
- publish check: validate:publish Errors 0（PR #4 のCRLF修正の上で実行）
- preview: `astro preview` で /tools/invideo-ai/ を取得（200）。2つの `<a>` が `data-outbound-type="affiliate"` `data-tool-name="InVideo AI"` `rel="sponsored nofollow noopener noreferrer"` を持ち、hero（invideo.sjv.io/enByKZ）= `data-cta-position="hero"`、pricing（invideo.sjv.io/JkQeKe）= `data-cta-position="pricing"`。BaseLayout のdelegated handlerがインライン存在。これは**ローカルの静的DOM検証**であり、実ブラウザclick・GA4実payload・ASPリンク稼働は **NOT_VERIFIED**
- GitHub Actions: 要PRで確認

## Git

- branch: fix/issue-1-invideo-ga4-click-tracking（PR #2、PR #4 の上に積み上げ）
- push / merge / deploy: merge・本番反映は人間判断

## Production

- state: 変更なし（production_required: false）

## Decisions

- Issue #6 に従い、完了済みtaskをcompletedへ移動しactive/を空に戻す。未実行だった検証は上記のとおり実測で更新（未検証項目は NOT_VERIFIED のまま明記）。
- InVideoのクリック・CV・報酬はUNKNOWN（0ではない）。

## Next

PR #5（PixVerse 内部メタデータ）を積み上げ。人間: 実GA4 Realtime／Impactでの確認。
