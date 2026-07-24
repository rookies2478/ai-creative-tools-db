# AUD-18 オーファンコンポーネント（CanvaAiTool.astro）検証記録

- **確認日**: 2026-07-25
- **対象ファイル**: `src/components/CanvaAiTool.astro`

## 監査指摘
`CanvaAiTool.astro`はどこからも参照されていないオーファンコンポーネントで、旧$15/月・古いcheckedDateなど古いデータを保持したまま残置。誤って再利用されるリスクがある。

## 確認手順・結果
1. **import検索**: `src/`配下の`.astro`/`.ts`全文検索で`CanvaAiTool`の参照は自身のファイル以外に0件。
2. **リポジトリ全体検索**（node_modules/dist除く）: 監査報告書・fix log・研究記録・reports/配下のドキュメント内でのみ言及あり（いずれも「オーファン」「対象外」と明記した記述）。コード・設定・README内に将来利用の明記なし。
3. **現行ページ確認**: `src/pages/tools/canva-ai-image-generator/index.astro`は`ToolDetailPage.astro`を使用しており、`CanvaAiTool.astro`とは無関係。同等機能は現行の`ToolDetailPage.astro`に完全に置き換わっている。
4. **Git履歴**: `feat: add custom tool pages and comparison articles`で追加された旧世代の専用ページ実装。以降のコミットで内容更新（`d91dd6f Correct Canva AI disclosure guidance`等）はあったが、参照元ページは一度も生成されていない（監査報告書の指摘通り）。
5. **動的import・ファイル名文字列参照**: grepで`CanvaAiTool`という文字列がJS/TS内の動的import・ルーティング設定等に現れないことを確認。CMS・生成スクリプトからの利用なし。
6. **削除影響**: ビルド実行し92ページ生成・error 0を確認。ページ数・ルートに変化なし。

## 削除可否判断
完全未使用・動的参照なし・現行ページで完全代替済み・削除後もbuild影響なしを確認。**削除**を実施。

## 実施内容
`src/components/CanvaAiTool.astro`を削除。

## build影響
`npm run build` 実行、92ページ生成、error 0、warning増減なし（削除前後で同一ページ数）。

## 判断できなかった項目
他4件のオーファンコンポーネント候補（`LeonardoAiTool.astro`, `MicrosoftDesignerTool.astro`, `MidjourneyTool.astro`, `TdpToolPage.astro`）は監査本文のAUD-18ではCanvaAiTool.astroのみが対象のため、今回のバッチでは扱わない（AUD-19以降または別バッチで検討）。

## HOLD理由
なし（FIXED）。

## DB設計または構造上の課題
旧世代の専用ページコンポーネントが複数（5件）残置されている。今回削除したのはAUD-18で名指しされた1件のみ。残り4件も同一パターンのリスクを抱えており、次回バッチでの棚卸しを推奨。
