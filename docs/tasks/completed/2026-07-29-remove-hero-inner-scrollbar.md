# Task Result

## Goal

トップページhero左カラムに常時表示される中央の縦スクロールバーを削除し、「掲載ツール — 29」のティッカー表示と横流しアニメーションを維持したまま解消する。

## Result

PASS

## Summary

- 原因: 直前の修正（`docs/tasks/completed/2026-07-29-fix-hero-ticker-clipping.md`、commit 32f20e4）でティッカークリップ対策として`.fv-hero .left`に`overflow-y:auto`を追加したが、`.fv-hero`本体の固定`max-height:calc(100svh - var(--fv-header) - 80px)`と`overflow:hidden`が残っていたため、`.left`内コンテンツがビューポート高さ次第で本体上限を超え、`.left`単体が縦スクロール領域化し、左右カラム境界に常時可視の縦スクロールバーが表示された。
- 修正: `.fv-hero`の`max-height:calc(...)`と`overflow:hidden`を削除し`overflow-x:hidden; overflow-y:visible;`へ変更（`min-height:420px`は維持）。`.fv-hero .left`の`overflow-y:auto`を削除し`overflow:visible`へ変更。ヒーロー全体が内容量に応じて高さを確保できる構造にし、内部スクロール領域を廃止した。
- ティッカー: `.toolmarquee{flex-shrink:0}`は維持したため再クリップ・再圧縮なし。`.tm-row{animation:fv-marquee 30s linear infinite}`は無変更のため横流しアニメーションは維持。横方向のページ全体溢れは`.fv-hero`の`overflow-x:hidden`で防止。
- 影響範囲: `@keyframes fv-marquee`、ツール配列29件、`.right`、モバイル用メディアクエリ、title/H1/meta/canonicalは無変更。`HomeHeroAnimated`は`src/pages/index.astro`でのみ使用され他ページへの影響なし。

## Changed Files

4件
- `src/components/HomeHeroAnimated.astro`（変更、2箇所）
- `docs/tasks/active/2026-07-29-remove-hero-inner-scrollbar.md`（新規→completedへ移動）
- `docs/tasks/completed/2026-07-29-remove-hero-inner-scrollbar.md`（新規）
- `docs/tasks/LATEST.md`（更新予定）

## Checks

- task validation: PASS
- build: PASS（92ページ、warning 0）
- diff check: PASS
- scope validation: PASS
- data quality: PASS（Files checked: 29, Errors: 0, Warnings: 0, Verify: 0）
- publish check: 未実施（本タスクのrequired_checksに含めていない）
- preview: ブラウザ実表示・dist直接確認は未実施。ソースコード上でmax-height/overflow:hidden/overflow-y:auto除去とoverflow-x:hidden/overflow-y:visible反映、flex-shrink:0維持をgrep確認済み。
- GitHub Actions: push後に別途確認が必要

## Git

- branch: master
- commit: push後に確定
- push: 実施
- origin sync: push後に確認
- working tree: push後clean見込み

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番デプロイなし）

## Decisions

なし（既存レイアウト設計・アニメーション仕様の変更は行っていない、固定max-height/overflow:hiddenの解除と内部スクロール廃止のみ）

## LATEST Update

`docs/tasks/LATEST.md`を本タスクの結果で更新。

## Next

- 本番反映（人間による手動デプロイ、最新distの手動アップロード）
- 本番トップページで中央スクロールバー消失・ティッカー表示・横流しアニメーション維持・console errorなしを確認
- 1440px/768px/375px実機確認（本環境ではdist直接確認・ブラウザ実表示が未実施のため）
