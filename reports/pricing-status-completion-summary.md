# pricingStatus 整理フェーズ完了サマリー

作成日：2026-06-22  
対象：src/content/tools/ 全26件

---

## 1. 実施目的

- 料金表示の断定を避ける
- 公式情報で確認できる範囲だけ pricingStatus を明示する
- 不明な料金・通貨・月額を推測で埋めない
- confirmed / partial / unconfirmed / no_fixed_price / service_changed / 未設定 を整理する

---

## 2. 最終集計

src/content/tools/*.md の実データを正として集計（2026-06-22時点）。

| 分類 | 件数 |
|---|---:|
| 総ツール数 | 26 |
| confirmed | 10 |
| partial | 7 |
| unconfirmed | 3 |
| no_fixed_price | 1 |
| service_changed | 1 |
| pricingStatus未設定 | 4 |
| 不正値・表記揺れ | 0 |

---

## 3. 今回明示化した主なツール

### confirmed（フィールド追加済み）

| slug | 追加日 | 根拠 |
|---|---|---|
| runway | 2026-06-22 第1バッチ | 公式料金ページ（runwayml.com/pricing/）・USD確認済み |
| midjourney | 2026-06-22 第1バッチ | 公式ドキュメント・USD・$10/月確認済み |
| leonardo-ai | 2026-06-22 第1バッチ | 公式料金ページ（leonardo.ai/pricing/）・USD確認済み |
| luma-ai | 2026-06-22 第1バッチ | 公式料金ページ（lumalabs.ai/pricing）・USD確認済み |
| pika | 2026-06-22 第1バッチ | 公式料金ページ（pika.art/pricing）・USD確認済み |
| canva-ai-image-generator | 2026-06-22 第2バッチ | 公式料金URL（canva.com/pricing/）・USD・$15/月確認済み |
| playground-ai | 2026-06-22 第2バッチ | 公式料金URL（playground.com/design/pricing）・USD・$12/月確認済み |
| hailuo-ai | 2026-06-21 DQ補正 | hailuoai.video/subscribe Standard $14.99/Pro $54.99/Master $119.99 USD確認済み |
| dreamstudio | 2026-06-21 DQ補正 | stability.ai/brand-studio-plans Trial無料1000cr / Core $50/月 USD確認済み |
| adobe-firefly | 2026-06-19 | adobe.com/jp 日本語公式料金ページ・JPY・1,580円/月（税込）確認済み |

### partial（フィールド追加済み）

| slug | 追加日 | 理由 |
|---|---|---|
| capcut-ai（→no_fixed_price） | 2026-06-22 第3バッチ | 地域・プラットフォームにより料金が異なる・固定月額なし |
| dalle | 2026-06-22 第3バッチ | ChatGPT Plus等有料プランに内包・DALL·E単体の独立料金なし |
| gemini-image-generation | 2026-06-22 第4バッチ | Google One AI Premium等に内包・独立料金ページなし |
| microsoft-designer | 2026-06-22 第4バッチ | Microsoft 365/Copilot Pro内包の可能性・独立料金ページ未確認 |
| nightcafe | 2026-06-22 第5バッチ | pricingSourceUrlがブログURL・currency=unknown・月額未確認 |
| ideogram | 2026-06-22 第5バッチ | docs URLあり・USD・ただし最安有料プラン月額未確認 |
| clipdrop | 2026-06-22 第5バッチ | 公式料金ページあり・Proプラン「--per month」で金額非開示 |

### no_fixed_price

| slug | 理由 |
|---|---|
| capcut-ai | 地域・プラットフォームにより料金が異なる。公式も「アプリ内確認」案内。固定月額なし |

### service_changed

| slug | 理由 |
|---|---|
| haiper | コンシューマー向けWebアプリ2025年2月シャットダウン済み。noindex/sitemap除外方針維持 |

### unconfirmed（今回変更なし）

| slug | 理由 |
|---|---|
| pixverse | 公式料金ページ（pixverse.ai/pricing・/en/pricing）ともに404。料金URL未発見（2026-06-21確認） |
| seaart-ai | 公式料金ページが非ログイン時に具体価格・通貨を表示しない構造 |
| vidu-ai | 公式料金ページ（vidu.com/pricing）が動的ロードで料金・通貨取得不可 |

---

## 4. 残り未設定4件

| slug | 未設定理由 | 今後の方針 |
|---|---|---|
| invideo-ai | lowestPaidPlanに「約$20/月〜」と「約」付き。公式URL（invideo.io/pricing/）はあるが月額断定不可 | 保留（「約」解消後にpartial→confirmed検討） |
| kling-ai | HTTP 446によりページ直接確認不可（2026-06-21確認）。前回確認結果との矛盾未解消 | 保留（公式料金ページ直アクセス可能になり次第再確認） |
| stable-diffusion | ローカル無料・クラウドAPIクレジット制の二重構造。pricingModel=local_freeだが公式APIプランとの整合が複雑 | 保留（local_free＋partial 2軸整理は実テスト後） |
| tensor-art | currency=unknown。pricingSourceUrlがイベントページURL（恒久性に懸念）。専用料金ページ未確認 | 保留（tensor.art/pricing等の専用料金ページURL確認後） |

---

## 5. 表示方針

- **confirmed** でも、料金・プランは変更される可能性があるため公式確認を促す
- **partial** は、公式情報が一部あるが独立料金や固定月額として断定しない
- **unconfirmed** は、公式料金ページや通貨が十分確認できない
- **no_fixed_price** は、固定月額として単純比較しにくい（地域・プラットフォーム依存）
- **service_changed** は、現役おすすめに見せない（haiper：noindex/警告表示維持）
- **未設定4件** は、無理に埋めず次回確認対象とする

---

## 6. 禁止表現ポリシー

以下の断定表現は使わない。

- 商用利用できます
- 著作権的に問題ありません
- 安全です
- 自由に使えます
- 著作権的にクリアです
- 問題ありません

> 質問文（「〜できますか？」「〜は安全ですか？」）は断定文ではないため対象外。

---

## 7. 公開状態

| 項目 | 値 |
|---|---|
| build | PASS |
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| Haiper noindex | 維持 |
| Haiper sitemap除外 | 維持 |
| 禁止表現検出 | 0件 |

---

## 8. 今後の更新ルール

1. 料金変更時は公式URLを優先する
2. pricingStatus変更時は reports も更新する
3. DB変更後は Data Quality Check を実施する
4. 公開前は Pre-Publish Check を実施する
5. 最後は `npm run build` を実行する
6. build終了コード0かつWARNなしのみPASS
7. commit / push は Git Checkpoint Protocol に従う
8. currency=unknown のうちは通貨記号（$/¥）を表示しない
9. partial / unconfirmed は「要公式確認」「公式ページ参照」に統一
10. service_changed ツールは現役おすすめ除外・警告表示を維持する

---

*このサマリーはレポート目的のみ。DBへの修正は公式確認後に別タスクで実施すること。*
