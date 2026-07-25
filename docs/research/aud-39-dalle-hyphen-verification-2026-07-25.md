# AUD-39 DALL·E ハイフン表記残存検証記録

- **確認日**: 2026-07-25
- **対象ツール**: DALL·E
- **対象項目**: name表記（ハイフンvs中点）
- **監査指摘**: DB正本`name: "DALL·E"`（中点）が45ファイル中の多数派だが、4ファイルでハイフン表記「DALL-E」が残存していた。

## DB値
`name: "DALL·E"`

## 表示値（修正前）
以下4ファイルで計30箇所の「DALL-E」（ハイフン）表記を確認：
- `src/content/guides/commercial-use-cost-comparison.md`: 14箇所
- `src/content/tools/nightcafe.md`: 6箇所
- `src/pages/guides/commercial-use-cost-comparison/index.astro`: 6箇所
- `src/pages/tools/nightcafe/index.astro`: 4箇所

## 不一致分類
表記ゆれ。

## 一次情報
不要。DB正本のname値（中点表記）への統一のみ。

## 採用した値
DBの`name: "DALL·E"`（中点表記）。

## 修正内容
上記4ファイル内の「DALL-E」（ハイフン）を全て「DALL·E」（中点）に一括置換（`sed`による文字列置換、計30箇所）。他ツール名・他フィールドへの影響がないことを確認済み。

## 修正しなかった内容
上記4ファイル以外にDALL-E（ハイフン）表記が残っていないか全文検索したが、監査本文で引用された4ファイル以外には残存していないことを確認した。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
特になし。今回の一括置換で該当ファイルの表記ゆれは解消。

## 他AUDとの関係
AUD-33（Canva AI画像生成の短縮表記統一）と同種の表記統一パターン。
