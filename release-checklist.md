# リリースチェックリスト

## 1. 現在の状態

| 項目 | 状態 |
|---|---|
| フレームワーク | Astro（静的サイト） |
| ホスティング | ConoHa WING |
| 公開URL | https://y-labo.online/ |
| URL設計 | 確定済み |
| 実装ページ数 | **19ページ**（追加ガイド3本込み） |
| noindex,nofollow | 設定中（全ページ）← **維持中** |
| robots.txt | `Disallow: /`（クローラー全拒否中）← **維持中** |
| 状態 | 検証公開版アップロード完了・本番化判断待ち |

### 検証公開の確認状況（2026-05-05 時点）

| 確認項目 | 状況 |
|---|---|
| `dist/` → `public_html/y-labo.online/` アップロード | ✅ 完了 |
| https://y-labo.online/ 表示確認 | ✅ 確認済み |
| https://y-labo.online/robots.txt 確認 | ✅ `Disallow: /` 維持確認済み |
| https://y-labo.online/sitemap.xml 確認 | ✅ 16URL 掲載確認済み（追加ガイド3本はFTP反映待ち） |
| CSS反映確認 | ✅ 確認済み |
| noindex,nofollow 維持 | ✅ 全ページ維持中 |
| Google Search Console sitemap送信 | ⏸ 未実施（本番化後に実施） |
| GA4設置 | ⏸ 未実施 |
| AdSense申請 | ⏸ 未実施 |

---

## 2. 実装済みページ

| URL | 説明 |
|---|---|
| `/` | トップページ |
| `/tools/` | ツール一覧（画像・動画） |
| `/tools/midjourney/` | Midjourney 詳細 |
| `/tools/adobe-firefly/` | Adobe Firefly 詳細 |
| `/tools/dalle/` | DALL·E 詳細 |
| `/tools/canva-ai-image-generator/` | Canva AI画像生成 詳細 |
| `/tools/leonardo-ai/` | Leonardo AI 詳細 |
| `/tools/stable-diffusion/` | Stable Diffusion 詳細 |
| `/tools/runway/` | Runway 詳細 |
| `/tools/pika/` | Pika 詳細 |
| `/tools/kling-ai/` | Kling AI 詳細 |
| `/categories/free/` | 無料で使えるツール |
| `/categories/commercial-use/` | 商用利用OKのツール |
| `/categories/japanese/` | 日本語対応ツール |
| `/categories/no-watermark/` | 透かしなしツール |
| `/guides/commercial-use-copyright/` | 商用利用・著作権ガイド |
| `/guides/free-ai-image-tools/` | 無料で使えるAI画像生成ツールの選び方 |
| `/guides/watermark-credit-guide/` | 透かし・クレジット表記ガイド |
| `/guides/japanese-ai-image-tools/` | 日本語対応AI画像生成ツールの選び方 |

---

## 3. 本番化前チェック

### 表示・動作確認

- [ ] 全ページ表示確認（エラーなし）
- [ ] スマホ表示確認（レスポンシブ）
- [ ] 内部リンク確認（リンク切れなし）
- [ ] 404ページ確認

### SEOメタ確認

- [ ] title：全ページに適切なtitleが設定されているか
- [ ] meta description：全ページに設定されているか
- [ ] canonical：全ページに正しいURLが設定されているか
- [ ] OGP（og:title / og:description / og:type / og:url）：全ページで出力されているか

### sitemap.xml 状況

- [x] `public/sitemap.xml` 作成済み（**19URL掲載**・追加ガイド3本含む）
- [x] `npm run build` → `dist/sitemap.xml` 生成確認済み（19ページ）
- [x] https://y-labo.online/sitemap.xml 公開確認済み（16URL・追加ガイド3本はFTP反映待ち）
- [ ] Google Search Console へのサイトマップ送信（本番化後に実施）
- **現状維持：** robots.txt は `Disallow: /` のまま／noindex 維持中

### 本番化前の最終確認

- [ ] noindex解除前の最終コンテンツ確認
- [ ] robots.txt 変更前の最終確認
- [ ] 各ツールの公式情報ソースが最新か確認
- [ ] 全ページの免責文が適切に表示されているか確認
- [ ] 商用利用・著作権について断定的な表現がないか確認
- [ ] `npm run build` が通る状態であること

---

## 4. 本番化時に変更するもの

> **注意：以下はユーザー確認のもとで実施してください。自動実行禁止。**

### 本番化手順（順序厳守）

1. [ ] 全ページの `noindex,nofollow` を解除する（`BaseLayout.astro`）
2. [ ] `robots.txt` の `Disallow: /` を解除する（クローラー許可）
3. [ ] `npm run build` を実行し `dist/` を再生成する
4. [ ] `dist/` を ConoHa WING の `public_html/y-labo.online/` へ再アップロード（FTP）
5. [ ] 公開URL（https://y-labo.online/）で全ページ表示確認
6. [ ] Google Search Console でサイトマップ（`/sitemap.xml`）を送信する

### その他（本番化後）

- [ ] GA4を設定する（トラッキングコード埋め込み）
- [ ] AdSense申請準備を進める（コンテンツ量・品質の最終確認後）

---

## 5. 次に判断する項目

> 検証公開が完了した現時点で、以下のいずれかを選択してください。

| 選択肢 | 内容 |
|---|---|
| A. このまま本番化する | noindex解除 → robots.txt解除 → ビルド → アップロード → GSC送信 |
| B. 本番化前にコンテンツを増やす | ツール追加・ガイド追加・カテゴリ拡充などを先行 |
| C. GSC / GA4 を先に準備する | Search Console プロパティ追加・GA4タグ設置を先行（本番化と同時でも可） |
| D. AdSense申請前に記事・ガイドを追加する | コンテンツ量・品質をAdSense基準に合わせてから申請 |

---

## 6. 本番化時の禁止事項（変更不可）

- URL設計を変更しない（既存URLの変更はSEO上のリスクあり）
- slugを変更しない
- Content Collections schema を大きく変更しない
- 既存WordPressや他ドメインに触れない
- 公式情報で確認できない項目について商用利用可否を断定しない
- `npm run build` が通らない状態で公開しない

---

## 7. 確認コマンド

```bash
# ビルド確認
npm run build

# ローカルプレビュー
npm run preview
```

---

## 8. 掲載ツールの次回確認予定

| ツール | lastReviewed | nextReviewDue | 状態 |
|---|---:|---:|---|
| Midjourney | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Adobe Firefly | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Stable Diffusion | 2026-05-04 | 2026-08-04 | 一次精査済み |
| DALL·E | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Canva AI画像生成 | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Leonardo AI | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Runway | 2026-05-05 | 2026-08-04 | 一次精査済み |
| Pika | 2026-05-05 | 2026-08-04 | 一次精査済み |
| Kling AI | 2026-05-05 | 2026-08-04 | 一次精査済み |

---

_このファイルはバージョン管理対象です。本番化作業のたびに更新してください。_
