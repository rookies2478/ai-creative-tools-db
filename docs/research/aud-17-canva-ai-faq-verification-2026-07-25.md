# AUD-17 Canva AI画像生成 FAQ欠落検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Canva AI画像生成
- **対象ファイル**: `src/content/tools/canva-ai-image-generator.md`(144-162) / `src/pages/tools/canva-ai-image-generator/index.astro`(faqs prop)

## 監査指摘
DB上のfaqsは9件だが、ツールページのfaqs propは8件で1件欠落。

## DB値
9件のFAQ（質問文）:
1. 無料で使えますか？
2. 商用利用できますか？
3. 日本語で使えますか？
4. 透かしは入りますか？
5. どの環境で使えますか？
6. どんな用途に向いていますか？ ← ページに欠落していた項目
7. Adobe Fireflyとどう違いますか？
8. Midjourneyとどう違いますか？
9. 人物や著名人の画像を生成できますか？

## ページ値（修正前）
8件（6.「どんな用途に向いていますか？」が欠落）。

## 一次情報
不要（DB内の既存回答文をそのまま使用する範囲の修正のため）。

## 採用した値
DB内の該当FAQの質問・回答文（`src/content/tools/canva-ai-image-generator.md:155-156`）をそのまま採用。

## 修正内容
`src/pages/tools/canva-ai-image-generator/index.astro` のfaqs配列に、「どの環境で使えますか？」と「Adobe Fireflyとどう違いますか？」の間へ以下を追加。

```
{ q: 'Canva AI画像生成はどんな用途に向いていますか？', a: 'SNS投稿用画像、広告バナー、ブログアイキャッチ、プレゼン資料の挿絵など、生成後にCanvaのテンプレートやデザイン機能でそのまま編集する用途と相性があります。' }
```

## 判断できなかった項目
ページ側の既存FAQ（商用利用・Adobe Firefly・Midjourney比較）はDB本文と若干の文言差異があるが、これはAUD-17のスコープ外（欠落件数の指摘のみ）のため今回は変更していない。

## HOLD理由
なし（FIXED）。

## DB設計または構造上の課題
専用astroページでfaqs propを手動指定する構造（AUD-42と同根）。DB更新時にページ側との同期が保証されない。
