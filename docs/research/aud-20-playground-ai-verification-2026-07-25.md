# AUD-20 Playground AI カテゴリ一覧検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Playground AI
- **対象ファイル**: `src/pages/categories/image-generation/index.astro:127`

## 監査指摘
DB（`src/content/tools/playground-ai.md:9`）で`japaneseUi: false`（非対応確定）だが、カテゴリ一覧ページの`jp`列は「要確認」のまま未反映。

## DB値
`japaneseUi: false`

## ページ値（修正前）
`jp: '要確認'`

## 一次情報
新規の一次情報確認は不要と判断。DBの`japaneseUi: false`は既存の一次情報確認（`verifiedAt`/`officialSourceUrl`充足）に基づく確定値であり、DB→ページの反映のみ実施。

## 採用した値
DBの`japaneseUi: false`をそのまま採用し、他ツール行の表記（Clipdrop行の`jp: '非対応'`）に合わせて統一。

## 修正内容
`src/pages/categories/image-generation/index.astro:127`の`jp: '要確認'`→`jp: '非対応'`。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
カテゴリページがハードコード配列（`getCollection`不使用）のため、DB更新の反映漏れが構造的に起きやすい（AUD-15/16と同根）。
