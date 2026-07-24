# PixVerse日本語UI対応確認

- 確認日: 2026-07-25

## AUD-13の監査指摘

DB（`src/content/tools/pixverse.md`(11)）は`japaneseUi: true`。一方、`src/pages/guides/video-generation-credit-cost-comparison/index.astro`のFAQ（faqItems配列）にはPixVerse自体への言及が一切なく、DBで確定している日本語UI対応という強みが読者に伝わっていなかった。誤表記ではなく単なる未掲載（欠落）。

## 確認した公式情報

- `https://pixverse.ai`（WebFetch）: ページ上部ナビに`/ja`へのリンクがあり、URLパスベースの言語切替を実装。
- `https://pixverse.ai/ja`（WebFetch）: 日本語UIで正常表示。見出し・ナビ・本文はほぼ日本語化されている一方、利用規約・プライバシーポリシー等一部リンク先は`/en/`のまま英語。
- `https://app.pixverse.ai`（WebFetch）: ログイン前トップのみ取得可能で、言語設定メニューの有無は確認不可（ログイン後の実操作画面は未検証）。
- Google Playストア（`play.google.com/store/apps/details?id=com.pixverseai.pixverse&hl=ja`、WebFetch）: アプリ名が「PixVerse: AI動画作成ツール」と日本語表記で提供されており、日本市場向けにローカライズされていることを確認。
- App Storeページ（複数URL試行）: WebFetchでは404が続き直接確認不可。WebSearchの二次情報では日本語対応言語との記載あり（一次情報未確認、参考情報止まり）。

## Web版UI

日本語UI（`/ja`パス）を公式に提供。ただし法務系ページ（利用規約・プライバシーポリシー）は英語のまま。マーケティングサイト全体としては「ほぼ日本語化」だが「完全ローカライズ」ではない。

## iOS版UI

一次情報で直接確認できず（App StoreページがWebFetchで404）。WebSearchの二次情報では日本語対応の記載があるが未確認情報として扱う。

## Android版UI

Google Playストア掲載情報（公式一次情報）で日本語向けにアプリ名がローカライズされていることを確認。ただしアプリ内実画面のスクリーンショット・説明文までは今回未取得。

## UI言語設定

ログイン後の実際の動画生成ダッシュボード内での言語切替メニューの有無は、ログイン必須のため今回のWebFetchでは確認不可。

## ブラウザ言語連動

マーケティングサイトはURLパス方式（`/ja`）であり、ブラウザ言語の自動連動ではなく明示的な言語選択・URL指定による切替と考えられる。

## 日本語プロンプト

DB`japanesePrompt: "unknown"`のまま。今回はUI対応の確認が目的のため、プロンプト対応については再調査していない（既存のunknown判定を維持）。

## 日本語ヘルプ・サポート

`help.pixverse.ai`は名前解決不可（DNS該当なし）。公式ヘルプセンターの日本語対応状況は未確認。

## ブラウザ翻訳との違い

今回確認した`pixverse.ai/ja`は公式が提供するURLパスベースの言語版であり、ブラウザの自動翻訳機能とは異なる公式ローカライズと判断できる。

## DBで採用する値

`japaneseUi: true`は変更しない。監査は値そのものの誤りを指摘しておらず、マーケティングサイトの日本語ローカライズという根拠も一次情報で再確認できたため。

## ガイドで採用する表現

「公式サイトが日本語UI（pixverse.ai/ja）で提供されている」という限定的な表現を採用し、「日本語完全対応」等の断定は避けた。

## FAQで採用する表現

`src/pages/guides/video-generation-credit-cost-comparison/index.astro`のFAQ末尾に新規質問を追加。UI対応（日本語UI提供）とプロンプト対応（unknown）を明確に分離し、法務ページが英語のままである点は本文では言及せず簡潔にまとめた（対応範囲の詳細は公式サイトを参照する形にした）。

## 判断できなかった項目

- ログイン後の実際の操作画面（動画生成ダッシュボード）の言語対応状況
- 公式ヘルプセンターの日本語対応状況（URL不明・DNS不達）
- iOS/Android公式ストアの「対応言語」欄の一次情報での直接確認（WebFetchで404）

## 一次情報未確認の項目

- App Store（iOS）の対応言語欄はWebSearchの二次情報のみで、一次情報（Apple公式ページ）を直接取得できていない
