# AUD-25 Vidu AI カテゴリ一覧japaneseUi未反映検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Vidu AI
- **対象ファイル**: `src/content/tools/vidu-ai.md:11` vs `src/pages/categories/video-generation/index.astro:105`

## 監査指摘
DB`japaneseUi: false`（確定）だが、カテゴリ一覧の`jp`列は「要確認」の古いプレースホルダーのまま。

## DB値
`japaneseUi: false`

## 表示値（修正前）
`jp: '要確認'`

## 不一致分類
ハードコード未反映（ページが古い）。

## 確認した一次情報
新規の一次情報確認は不要。DBの`japaneseUi: false`は既存の一次情報確認済み（`verifiedAt`/`officialSourceUrl`充足）の確定値であり、DB→ページの反映のみ実施。

## 採用した値
DBの`japaneseUi: false`をそのまま採用し、他ツール行の表記（Playground AI, Clipdrop）に合わせ「非対応」と表記。

## 修正内容
`src/pages/categories/video-generation/index.astro:105`の`jp: '要確認'`→`jp: '非対応'`。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
カテゴリページがハードコード配列（`getCollection`不使用）のため、DB更新の反映漏れが構造的に起きやすい（AUD-15/16/20と同根）。
