# sitemap vs build 差分監査レポート

日付：2026-06-21（更新：2026-06-21 /tools/haiper/ sitemap除外対応）  
監査範囲：src/pages/, src/content/tools/, src/pages/sitemap.xml.ts, 公開サイト https://aicreative-db.com/sitemap.xml

---

## sitemap差分確認結果

| 項目 | 修正前 | 修正後 |
|---|---:|---:|
| buildページ数 | 79 | 79 |
| sitemap URL数 | 78 | 77 |
| buildのみ（sitemapなし） | 2件 | 3件 |
| sitemapのみ（buildなし） | 0件 | 0件 |

| 項目 | 値 |
|---|---|
| 修正ファイル | src/pages/sitemap.xml.ts |
| URL変更 | なし（/tools/haiper/ URLは維持） |
| noindex/draft/redirect変更 | なし |
| DB修正有無 | なし |

---

## 対応内容

`sitemap.xml.ts` に `SITEMAP_EXCLUDED_PATHS` 除外セットを追加。

```ts
const SITEMAP_EXCLUDED_PATHS = new Set([
  '/tools/haiper/',
]);
```

最終URL一覧生成直前で `.filter((p) => !SITEMAP_EXCLUDED_PATHS.has(p))` を適用。

---

## 差分一覧

| URL | build | sitemap | noindex | 理由 | 状態 |
|---|---|---|---|---|---|
| /404 | ✓ | ✗ | n/a | 404エラーページ・sitemap対象外が正常 | 対応不要 |
| /sitemap.xml | ✓(API) | ✗ | n/a | Astroがページ数にカウント・sitemap自身は対象外が正常 | 対応不要 |
| /tools/haiper/ | ✓ | ✗ | ✓ | noindexページのため明示的にsitemapから除外 | 対応済み |

---

## 主要ページ確認

| URL | sitemap掲載 | 結果 |
|---|---|---|
| / | ✓ | OK |
| /tools/ | ✓ | OK |
| /categories/image-generation/ | ✓ | OK |
| /categories/video-generation/ | ✓ | OK |
| /categories/video-editing/ | ✓ | OK |
| /categories/avatar-video/ | ✓ | OK |
| /categories/design/ | ✓ | OK |
| /categories/voice-narration/ | ✓ | OK |
| /conditions/free/ | ✓ | OK |
| /conditions/commercial-use/ | ✓ | OK |
| /conditions/no-watermark/ | ✓ | OK |
| /guides/commercial-use-copyright/ | ✓ | OK |
| /about/ | ✓ | OK |
| /editorial-policy/ | ✓ | OK |
| /tools/adobe-firefly/ | ✓ | OK |
| /tools/hailuo-ai/ | ✓ | OK |
| /tools/seaart-ai/ | ✓ | OK |
| /tools/pixverse/ | ✓ | OK |
| /use-cases/ai-image-use-case-comparison/ | ✓ | OK |
| /comparisons/ai-image-video-tools/ | ✓ | OK |

全20件確認済み・全件OK。

---

## Haiper確認

| 項目 | 結果 |
|---|---|
| build存在 | ✓（/tools/haiper/index.html） |
| sitemap掲載 | ✗（除外済み） |
| ページにnoindex=true | ✓（src/pages/tools/haiper/index.astro:38） |
| service_changed 表示 | ✓（維持） |
| URL削除/draft/redirect | なし |

---

## sitemap.xml.ts 構成分析

```
STATIC_PATHS: 52件
  - / (1)
  - /tools/ (1)
  - /categories/* (6)
  - /comparisons/* (12: index + 11記事)
  - /conditions/* (4)
  - /use-cases/* (13: index + 12)
  - /guides/* (8: index + 7)
  - /prompts/, /templates/ (2)
  - /about/, /contact/, /privacy-policy/, /disclaimer/, /editorial-policy/ (5)

tools collection: 26件（src/content/tools/*.md）
SITEMAP_EXCLUDED_PATHS除外: 1件（/tools/haiper/）
合計: 77 URL
```

---

## build結果

| 項目 | 結果 |
|---|---|
| build | PASS |
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| 実行コマンド | `/c/Program Files/nodejs/npm.cmd` run build |
