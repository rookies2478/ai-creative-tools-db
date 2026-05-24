# リリースメモ 2026-05-24

## build結果

```
61 page(s) built in 5.83s — エラーなし
```

---

## 改善内容まとめ

### 1. ブランド表記統一

- サイト名を「AIクリエイティブナビ」に統一（全ページ）
- ヘッダーロゴ・フッター・OGPタグを一括更新
- CTA文言を統一

### 2. URL設計の安全整理

- slug・canonicalPath・既存URL変更なし
- sitemap.xml 再生成（動的ルート含む全61URL反映）
- robots.txt 確認済み

### 3. AI動画生成カテゴリ強化

既存ツール（luma-ai / haiper / capcut-ai 含む）の掲載状況・表示確認：
- 各ツール詳細ページ本文・FAQ・注意点を強化
- カテゴリページ（`/categories/free-video/`・`/video-generators/`）の本文・構造を整理・強化

比較ページ構造確認・強化：
- `/compare/runway-vs-pika/`
- `/compare/ai-image-video-tools/`

### 4. AI画像生成カテゴリ品質強化

既存ツール（計20件以上）の掲載状況・表示確認：
midjourney / stable-diffusion / dalle / adobe-firefly / canva-ai-image-generator /
leonardo-ai / ideogram / microsoft-designer / seaart-ai / dreamstudio /
playground-ai / fotor-ai / nightcafe / clipdrop / tensor-art /
runway / pika / kling-ai / luma-ai / haiper / capcut-ai 等

- 比較ポイント・FAQ内容を強化
- gemini-image-generation ページ（Google Gemini）の内容・導線確認

### 5. 商用利用・著作権表現点検

- 断定表現（「商用利用できます」等）→ 条件付き表現（「商用利用可能とされています」等）に修正
- ガイドページ（`/guides/commercial-use-copyright/` / `/guides/ai-image-commercial-use-checklist/` / `/guides/watermark-credit-guide/`）の本文・構造強化・導線整理

### 6. 固定ページ微修正

- about / contact / disclaimer / editorial-policy / privacy-policy の説明文微修正
- 表現・レイアウト整合性確認

### 7. 内部リンク・回遊導線整理

トップページ導線整理：
- カテゴリ導線（アウトプット別）
- 比較タブセクション
- ピックアップセクション
- FAQ整理・重複削除
- ガイド枠への誘導整理
- ヘッダーナビ最終調整

### 8. 技術SEO点検

- `<title>` / `<meta description>` / OGP / canonical — 全ページ確認
- noindex 誤設定なし
- hreflang 未使用（日本語サイト単一言語）

### 9. sitemap修正

- 動的ルート（tools/[slug]）含む61URL反映
- 静的生成（`src/pages/sitemap.xml.ts`）確認済み
- sitemap漏れページを追加

### 10. 構造化データ追加

追加したJSON-LDタイプ：

| タイプ | 対象ページ |
|---|---|
| `SoftwareApplication` | ツール詳細ページ（/tools/[slug]/） |
| `BreadcrumbList` | カテゴリ・ガイド・比較・ユースケースページ |
| `Article` | ガイドページ（/guides/） |
| `FAQPage` | トップページ、カテゴリページ |

---

## 最終build結果

| 項目 | 内容 |
|---|---|
| 総ページ数 | 61ページ |
| ビルド時間 | 5.83秒 |
| エラー | なし |
| 警告 | なし |
| output mode | static |

---

## 公開後確認リスト

本番反映後、以下URLをブラウザで確認する。

### 確認URL一覧

| URL | 確認項目 |
|---|---|
| `/` | 表示・ヘッダー・FAQ・導線 |
| `/tools/` | ツール一覧表示 |
| `/video-generators/` | AI動画ツール一覧 |
| `/categories/free/` | 無料ツール一覧 |
| `/categories/free-video/` | 無料動画ツール一覧 |
| `/categories/commercial-use/` | 商用利用可ツール |
| `/categories/no-watermark/` | ウォーターマークなし |
| `/categories/japanese/` | 日本語対応ツール |
| `/guides/` | ガイド一覧 |
| `/guides/commercial-use-copyright/` | 著作権ガイド |
| `/compare/runway-vs-pika/` | 比較ページ |
| `/compare/ai-image-video-tools/` | 比較ページ |
| `/use-cases/ai-image-use-case-comparison/` | 用途別比較 |
| `/sitemap.xml` | XML出力確認 |
| `/robots.txt` | テキスト出力確認 |

### 確認項目チェックリスト

- [ ] ページが200で表示される
- [ ] レイアウト崩れがない
- [ ] ヘッダー・フッターのサイト名が「AIクリエイティブナビ」
- [ ] 内部リンクが機能している
- [ ] sitemap.xml が表示される（61URL含む）
- [ ] robots.txt が表示される
- [ ] noindex が意図せず付いていない
- [ ] JSON-LDがHTML内に出力されている（DevTools > Elements で確認）
- [ ] 商用利用・著作権の断定表現がない

---

## 次フェーズ候補（優先順位順）

| 優先 | 内容 | 理由 |
|---|---|---|
| 1 | 主要ツール詳細ページの個別品質強化 | midjourney / runway / stable-diffusion など主要ツールのコンテンツ充実 |
| 2 | GSCデータ確認後のリライト対象抽出 | 本番公開後のクロール・インデックス状況を確認してから着手 |
| 3 | AI動画生成ツール追加候補調査 | Sora / Vidu / Gen-3 Alpha など新興ツール評価 |
| 4 | AI画像生成ツール追加候補調査 | Flux / Recraft / Krea など未掲載ツール評価 |
| 5 | 用途別ページの品質改善 | use-cases配下ページのコンテンツ深化・比較表拡充 |

> 注：GSCデータは本番公開後2〜4週間で初期データが蓄積される。優先2は公開後を推奨。
