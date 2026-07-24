# Clipdrop日本語プロンプト対応確認

- 確認日: 2026-07-25

## AUD-10の監査指摘

- DB(`src/content/tools/clipdrop.md`:11) `japanesePrompt: false`（非対応確定）
- ページ側(`src/pages/tools/clipdrop/index.astro`:89) バッジ「要公式確認」（中立・未確定表現）
- 非対応という判定が読者に伝わらない不一致

## 確認した公式情報

- Clipdrop公式サイト内、日本語向けURL `https://clipdrop.co/ja/stable-diffusion` — WebFetchで内容確認。ページ自体は英語UIのまま表示され、日本語ローカライズはされていない。
- 同ページのFAQ内に "Text to image can take an English text as an input, called the 'text prompt'" という記載を確認。入力は英語テキストを前提とした説明。
- Clipdrop APIドキュメント `https://clipdrop.co/apis/docs/text-to-image` — `prompt`パラメータの説明に言語制限の明記はなし。日本語入力可否についての言及もなし。

## 項目別の確認結果

- 日本語文字入力: 公式情報からは技術的な入力可否（文字コードとして受け付けるか）は確認できず。
- 日本語プロンプト処理: 公式サイトFAQは入力を「English text」と明示しており、日本語プロンプトを前提とした公式サポートは確認できない。
- 日本語理解精度: 公式情報に記載なし。実機比較データも管理者環境で未取得。
- 英語推奨の有無: あり（FAQ内で入力を英語テキストと明示）。
- 日本語UI: `/ja/`パスは存在するが、実際の表示は英語のまま。日本語ローカライズは確認できず（本件はAUD-10の対象外、japaneseUiは変更なし）。
- 日本語サポート全般: 公式サイト内に日本語サポート窓口・日本語ヘルプの案内は見当たらず。

## DBで採用する値

- `japanesePrompt: false` を維持（変更なし）。理由: 公式FAQが入力を「English text」と明示しており、日本語プロンプトの公式対応が確認できないという既存判定は一次情報と矛盾しない。

## サイトで採用する表現

- `src/pages/tools/clipdrop/index.astro` の日本語対応バッジ「プロンプト：要公式確認」→「プロンプト：非対応（英語推奨）」に変更。
- `src/pages/tools/playground-ai/index.astro` のrelatedTools内Clipdrop行「日本語：要確認」→「日本語：非対応」に変更（UI・プロンプト双方ともDBがfalseのため）。

## 判断できなかった項目

- 日本語文字そのものの入力可否（技術的な受理有無）。
- 日本語プロンプト使用時の生成結果の具体的な精度劣化の度合い。

## 一次情報未確認の項目

- Clipdrop公式ヘルプセンター内の多言語対応に関する個別記載（検索で該当ページ未発見）。
