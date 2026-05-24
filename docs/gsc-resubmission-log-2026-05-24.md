# Google Search Console サイトマップ再送信・URL検査ログ

**日付：** 2026-05-24  
**担当：** rookies2478@gmail.com

---

## 1. サイトマップ再送信

| 項目 | 値 |
|------|----|
| 送信URL | https://aicreative-db.com/sitemap.xml |
| 送信日 | 2026-05-24 |
| GSC操作 | サイトマップ → URLを入力 → 送信 |

---

## 2. サイトマップ事前確認結果

事前にHTTPステータスを全URL確認済み（HEAD リクエスト）。

| 項目 | 結果 |
|------|------|
| 総URL数 | 62 |
| 200 OK | 62 |
| 200以外 | 0 |
| リダイレクト | なし |
| 別ドメイン混在 | なし |

**判定：全URL正常。問題なし。**

---

## 3. URL検査 優先送信（P0）

GSC の「URL検査 → インデックス登録をリクエスト」で個別送信。

| # | URL |
|---|-----|
| 1 | https://aicreative-db.com/ |
| 2 | https://aicreative-db.com/tools/ |
| 3 | https://aicreative-db.com/video-generators/ |
| 4 | https://aicreative-db.com/guides/commercial-use-copyright/ |
| 5 | https://aicreative-db.com/compare/free-ai-image-generators/ |
| 6 | https://aicreative-db.com/compare/runway-vs-pika/ |

---

## 4. URL検査 次点送信（P1）

余裕があれば送信。

| # | URL |
|---|-----|
| 1 | https://aicreative-db.com/tools/midjourney/ |
| 2 | https://aicreative-db.com/tools/runway/ |
| 3 | https://aicreative-db.com/tools/pika/ |
| 4 | https://aicreative-db.com/tools/adobe-firefly/ |
| 5 | https://aicreative-db.com/tools/canva-ai-image-generator/ |
| 6 | https://aicreative-db.com/tools/leonardo-ai/ |

---

## 5. 送信後の確認スケジュール

| 時期 | 確認内容 |
|------|----------|
| 1週間後（2026-05-31頃） | GSC サイトマップステータス確認（送信済み・検出URL数） |
| 2〜4週間後（2026-06-07〜21頃） | 検索パフォーマンス（表示回数・クリック数・掲載順位）確認 |
| 随時 | インデックス未登録URLがあれば個別URL検査で再リクエスト |

---

## 6. 備考

- ソースコード変更なし（`src/` `content/` 不変）
- 本番アップロード・git push なし
- このログは `docs/` のみに存在
