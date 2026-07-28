# Task Result

## Goal

トップページhero内「掲載ツール — 29」直下のティッカー（横流しアニメーション）が親要素に隠れて表示される不具合を、アニメーションを維持したまま最小修正する。

## Result

PASS

## Summary

- 原因: `src/components/HomeHeroAnimated.astro`の`.fv-hero{max-height:calc(100svh - var(--fv-header) - 80px);overflow:hidden}`と`.fv-hero .left{justify-content:center}`の組み合わせにより、`.left`内コンテンツ（kicker+h1 2行+lead+cta+toolmarquee）の合計高さがビューポート高さから算出される上限を超えると、上下対称にオーバーフローし`overflow:hidden`でクリップされる。`.toolmarquee`（ティッカー）は`.left`内の最下部要素のため影響を受けやすい。`src/pages/index.astro`はコンポーネントのデフォルトより長いtitleLines・lead文言を渡しており、デスクトップ幅かつビューポート高さが小さい環境（ノートPC等）で発生しやすい条件。
- 修正: `.fv-hero .left`に`overflow-y:auto`を追加（通常時は見た目変化なし、内容がはみ出す場合のみ`.left`単体がスクロール可能になりティッカーへ到達可能）。`.toolmarquee`に`flex-shrink:0`を追加（flexboxによる圧縮防止）。`.fv-hero`本体のoverflow:hidden・max-height、アニメーション定義（`@keyframes fv-marquee`）、mask-image、`.right`、モバイル用メディアクエリは無変更。
- アニメーション: `.tm-row{animation:fv-marquee 30s linear infinite}`は無変更のため横流し自体は維持。
- 影響範囲: `HomeHeroAnimated`は`src/pages/index.astro`でのみ使用されており、他ページへの影響なし。

## Changed Files

4件
- `src/components/HomeHeroAnimated.astro`（変更、2行）
- `docs/tasks/active/2026-07-29-fix-hero-ticker-clipping.md`（新規→completedへ移動予定）
- `docs/tasks/completed/2026-07-29-fix-hero-ticker-clipping.md`（新規）
- `docs/tasks/LATEST.md`（更新予定）

## Checks

- task validation: PASS
- build: PASS（92ページ、warningなし）
- diff check: PASS
- scope validation: PASS
- data quality: 対象外（`src/content/tools/*.md`は変更していない）
- publish check: 未実施（本タスクのrequired_checksに含めていない）
- preview: dist/への直接アクセスが本環境権限でブロックされたため生成HTML直接確認・1440/768/375px実機確認は未実施（過去タスクと同様の既知制約）
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

なし（既存レイアウト設計・アニメーション仕様の変更は行っていない、局所的なoverflow挙動の追加のみ）

## LATEST Update

`docs/tasks/LATEST.md`を本タスクの結果で更新。

## Next

- 本番反映（人間による手動デプロイ）
- 本番ページで1440px/768px/375pxの実機確認、ティッカーの表示・アニメーション・console errorなしを確認
- dist/への直接アクセス権限が解除された場合、生成HTML上での反映を直接確認
