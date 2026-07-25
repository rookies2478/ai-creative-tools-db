# AUD-31 Microsoft Designer オーファンコンポーネント検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Microsoft Designer
- **対象ファイル**: `src/content/tools/microsoft-designer.md`(9-10,13,92-93,196-198) vs `src/components/MicrosoftDesignerTool.astro`

## 監査指摘
現行DBは`commercialUse: "no"`（商用利用不可・個人利用限定）、`freePlan: "limited"`、`watermark: "unknown"`（+C2PA関連情報）が最新値だが、どこからも参照されていないオーファンコンポーネント`MicrosoftDesignerTool.astro`が「条件あり」「無料枠あり」「要確認」という古い値を保持したまま残置されていた。

## DB値
- `commercialUse: "no"`（"Microsoft Designer利用規約...trade or commerce（取引・商業）の過程での利用は認められていない"）
- `freePlan: "limited"`
- `watermark: "unknown"`

## 表示値
`MicrosoftDesignerTool.astro`が独自に古いprops値（"条件あり"/"無料枠あり"/"要確認"）を保持。ただし現行の`src/pages/tools/microsoft-designer/index.astro`は`ToolDetailPage.astro`を使用しており、`MicrosoftDesignerTool.astro`は一切参照されていない。

## 不一致分類
オーファンファイル（AUD-18 CanvaAiTool.astroと同型）。

## 確認手順・結果
1. **import検索**: `src/`配下の`.astro`/`.ts`全文検索で`MicrosoftDesignerTool`の参照は自身のファイル以外に0件。
2. **リポジトリ全体検索**（node_modules/dist除く）: 監査報告書・reports/配下のドキュメント内でのみ言及あり（いずれも「オーファン」と明記）。将来利用の明記なし。
3. **現行ページ確認**: `src/pages/tools/microsoft-designer/index.astro`は`ToolDetailPage.astro`を使用しており、`MicrosoftDesignerTool.astro`とは無関係。同等機能は現行の`ToolDetailPage.astro`に完全に置き換わっている。
4. **動的import・ファイル名文字列参照**: grepで`MicrosoftDesignerTool`という文字列がJS/TS内の動的import・ルーティング設定等に現れないことを確認。
5. **削除影響**: ビルド実行し92ページ生成・error 0を確認。ページ数・ルートに変化なし。

## 一次情報
不要（参照調査のみ、DB値自体は既存の一次情報確認済み）。

## 採用した値
削除。

## 修正内容
`src/components/MicrosoftDesignerTool.astro`を削除。

## 判断できなかった項目
他のオーファンコンポーネント候補（`LeonardoAiTool.astro`, `MidjourneyTool.astro`, `TdpToolPage.astro`）は監査本文のAUD-31ではMicrosoftDesignerTool.astroのみが対象のため、今回のバッチでは扱わない。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED＝削除実施）。

## 構造上の課題
旧世代の専用ページコンポーネントが複数残置されている問題（AUD-18と同根）。今回削除したのはAUD-31で名指しされた1件のみ。残り2件（LeonardoAiTool.astro, MidjourneyTool.astro, TdpToolPage.astro）も同一パターンのリスクを抱えており、次回バッチでの棚卸しを推奨。
