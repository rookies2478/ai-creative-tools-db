# 本番デプロイ確認記録 2026-05-24

## 1. デプロイ概要

| 項目 | 内容 |
|------|------|
| デプロイ完了日 | 2026-05-24 |
| 対象サイト | https://aicreative-db.com/ |
| 本番反映 | 正常 |

---

## 2. 重点確認ページ

| URL | 確認結果 |
|-----|---------|
| https://aicreative-db.com/ | 正常 |
| https://aicreative-db.com/tools/pika/ | 正常 |
| https://aicreative-db.com/tools/runway/ | 正常 |
| https://aicreative-db.com/guides/commercial-use-copyright/ | 正常 |
| https://aicreative-db.com/sitemap.xml | 正常 |
| https://aicreative-db.com/robots.txt | 正常 |

---

## 3. 商用利用ガイド確認結果

- 「〇（条件あり）」残存：**なし**
- 「条件あり / 要公式確認」表示：**あり**（正常）
- 「商用利用可能」「問題ありません」「安全です」等の断定表現：**なし**
- canonical タグ：**正常**
- 旧ドメイン `ai-creative-navi.com` 残存：**なし**

---

## 4. Pika / Runway 確認結果

| ページ | 最終確認日 | canonical |
|--------|-----------|-----------|
| /tools/pika/ | 2026-05-24 | 正常 |
| /tools/runway/ | 2026-05-24 | 正常 |

---

## 5. インフラ確認結果

| 項目 | 結果 |
|------|------|
| sitemap.xml HTTPステータス | 200 |
| sitemap.xml エントリ数 | 64 |
| sitemap.xml Last-Modified | 2026-05-24 |
| robots.txt HTTPステータス | 200 |
| robots.txt Sitemap 記載 | `Sitemap: https://aicreative-db.com/sitemap.xml` あり |

---

## 6. Search Console 次アクション

### 即時実施
- [ ] sitemap.xml を Search Console で再送信
- [ ] P0 URL を URL検査ツールで再クロール依頼

### 1週間後（2026-05-31頃）
- [ ] sitemap.xml のステータス確認（処理済みエントリ数）

### 2〜4週間後（2026-06-07〜2026-06-21頃）
- [ ] 検索パフォーマンス確認（表示回数・クリック数・順位）

---

## 7. 再クロール依頼 URL リスト

### P0（最優先）

```
https://aicreative-db.com/
https://aicreative-db.com/tools/
https://aicreative-db.com/video-generators/
https://aicreative-db.com/guides/commercial-use-copyright/
https://aicreative-db.com/compare/free-ai-image-generators/
https://aicreative-db.com/compare/runway-vs-pika/
```

### P1

```
https://aicreative-db.com/tools/midjourney/
https://aicreative-db.com/tools/runway/
https://aicreative-db.com/tools/pika/
https://aicreative-db.com/tools/adobe-firefly/
https://aicreative-db.com/tools/canva-ai-image-generator/
https://aicreative-db.com/tools/leonardo-ai/
```
