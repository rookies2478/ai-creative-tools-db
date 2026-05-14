# ツールデータ 運用レビューメモ

作成日：2026-05-14  
対象：初期9ツール（公開後運用フェーズ）

---

## 次回レビュー期限一覧

| ツール               | lastReviewed | nextReviewDue |
|----------------------|--------------|---------------|
| Adobe Firefly        | 2026-05-04   | 2026-06-04    |
| DALL·E               | 2026-05-04   | 2026-06-04    |
| Leonardo AI          | 2026-05-04   | 2026-06-04    |
| Canva AI画像生成     | 2026-05-04   | 2026-06-04    |
| Stable Diffusion     | 2026-05-04   | 2026-06-04    |
| Midjourney           | 2026-05-04   | 2026-06-04    |
| Kling AI             | 2026-05-05   | 2026-06-05    |
| Pika                 | 2026-05-05   | 2026-06-05    |
| Runway               | 2026-05-05   | 2026-06-05    |

---

## 要確認項目（次回レビュー時に公式サイトで確認）

### DALL·E
- `officialUrl` の有効性確認
  - 現在値：`https://openai.com/dall-e-3`
  - ChatGPTへの統合に伴い、URLが変更・リダイレクトされている可能性がある

### Leonardo AI
- `japaneseUi` の確認
  - 現在値：`"unknown"`
  - 公式サイトにアクセスし、日本語UI対応状況を確認する

### Canva AI画像生成
- `watermark` の確認
  - 現在値：`"unknown"`
  - 無料プラン・有料プランそれぞれで透かしの有無を公式ヘルプで確認する

### Runway
- `commercialUse` の再確認
  - 現在値：`"limited"`（全プランでOutputの商用利用を制限していないとされているが）
  - 公式ヘルプ・利用規約の最新版を確認し、`"ok"` への変更が適切か判断する

### Midjourney
- 最新料金・無料プラン状況の再確認
  - 現在の `freePlan: false` が引き続き正しいか確認
  - `lowestPaidPlan` の料金・プラン名が変更されていないか確認
  - 公式サイト：https://www.midjourney.com/account

### Adobe Firefly
- 料金ページの再確認
  - `lowestPaidPlan` のプロモ価格・プラン構成が変更されていないか確認
  - 公式サイト：https://firefly.adobe.com

### Kling AI
- 料金詳細の再確認
  - `lowestPaidPlan` の料金幅（約$5.99〜$6.99/月）が引き続き正しいか確認
  - 公式サイト：https://klingai.com

---

## 確認方針

- 公式サイト・公式ヘルプページで直接確認できた情報のみ更新する
- 推測・二次情報による更新は行わない
- 確認後は `lastReviewed` と `nextReviewDue` を更新する
