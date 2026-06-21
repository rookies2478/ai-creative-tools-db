# DB要確認バックログ

作成日：2026-06-21  
対象：src/content/tools/ 全26ファイル  
方針：DB修正なし・公式未確認項目は推測補完しない・この記事は法的助言ではない

---

## サマリー

| 項目 | 件数 |
|---|---:|
| 総ツール数 | 26 |
| pricingStatus: confirmed（フィールド明示） | 10 |
| pricingStatus: partial（フィールド明示） | 1 |
| pricingStatus: unconfirmed | 3 |
| pricingStatus: service_changed | 1 |
| pricingStatus: フィールドなし（未設定） | 11 |
| needsReview: yes/true | 3 |
| currency: unknown（値） | 6 |
| currency: フィールドなし/空（実質不明） | 3 |
| commercialUse: unknown | 3 |
| watermark: unknown | 10 |
| 優先確認A | 3 |
| 次回確認B | 9 |
| 保留C | 2 |

> **A/B/C分類について**：総ツール数26件の分類ではなく、未確認・要確認として抽出した主要バックログ項目の分類です。1つのツールに複数の未確認項目がある場合があります。

---

## 優先確認A

料金・商用利用・権利まわりに影響。公開ページでユーザー判断に直結。

| slug | toolName | issue | currentValue | 推奨対応 |
|---|---|---|---|---|
| pixverse | PixVerse | pricingStatus:unconfirmed / currency:unknown / needsReview:yes | pricingStatus:"unconfirmed", currency:"unknown" | 公式料金ページで有料プラン金額・通貨を確認後に partial または confirmed へ更新 |
| seaart-ai | SeaArt AI | pricingStatus:unconfirmed / currency:unknown / commercialUse:unknown / watermark:unknown / needsReview:yes | 上記4フィールドすべて未確定 | 公式利用規約・料金ページを確認。商用利用・透かし条件は断定せず |
| clipdrop | Clipdrop | pricingStatus:partial / currency:unknown / commercialUse:unknown / watermark:unknown | 3フィールドすべて unknown | 公式料金ページ・利用規約で確認。commercialUse断定は避ける |
| kling-ai | Kling AI | pricingStatus:partial / needsReview:yes | partial（一部のみ確認済み）2026-06-21再確認：料金ページはアクセス可能になった可能性あり（HTTP 446解消か）。ただし具体的プラン価格は未取得のため partial 維持 | 次回：公式料金ページに直接アクセスしてプラン価格・通貨を確認 |
| ~~dreamstudio~~ | ~~Brand Studio（旧DreamStudio）~~ | ~~pricingStatus:partial / currency:unknown / needsReview:yes~~ **2026-06-21解決** | confirmed, currency:USD, Core $50/月 | stability.ai/brand-studio-plans で Trial無料1000cr / Core $50/月 USD 5000cr/月 確認済み |
| hailuo-ai | Hailuo AI | ~~pricingStatus:partial / currency:unknown / needsReview:yes~~ **2026-06-21解決** | confirmed, currency:USD, $14.99〜 | hailuoai.video/subscribe で Standard $14.99/Pro $54.99/Master $119.99 USD確認済み |
| vidu-ai | Vidu AI | pricingStatus:unconfirmed / currency:unknown / inputMaterialRisk:high | unconfirmed, currency:unknown | 【2026-06-21再確認】vidu.com/pricingは動的ロードで料金・通貨取得不可。次回は実ブラウザでの確認が必要 |
| ideogram | Ideogram | pricingStatus:partial / watermark:unknown | partial, watermark:unknown（2026-06-21再確認：currency=USD確認・週10クレジット確認。透かし公式情報なし・pricingStatus partial維持） | 次回：透かし条件を公式で確認 |

---

## 次回確認B

表示上は安全だが、公式情報を追加できると品質が上がる。

| slug | toolName | issue | currentValue | 推奨対応 |
|---|---|---|---|---|
| gemini-image-generation | Gemini画像生成 | pricingStatus:confirmed だが currency:unknown | confirmed / currency:"unknown" | Google公式料金ページで通貨を確認（JPY / USD 混在の可能性） |
| tensor-art | Tensor.Art | pricingStatus:confirmed だが currency:unknown / watermark:unknown | confirmed / currency:"unknown" / watermark:"unknown" | 公式料金ページで通貨・透かし条件を確認 |
| capcut-ai | CapCut AI | pricingStatus:confirmed だが currency:unknown | confirmed / currency:"unknown" | 公式サブスクリプション料金ページで通貨を確認 |
| nightcafe | NightCafe | pricingStatus:partial / currency:unknown | partial / currency:"unknown" | 公式クレジット料金ページで通貨・具体額を確認 |
| fotor-ai | Fotor AI | pricingStatus:partial（有料プラン金額未記載） | partial / pricingText に「公式ページ参照」 | 公式料金ページで有料プランの具体価格を確認 |
| microsoft-designer | Microsoft Designer | pricingStatus:partial / watermark:unknown | partial / watermark:"unknown" | Microsoft 365 連携プランの料金条件と透かし条件を公式で確認 |
| canva-ai-image-generator | Canva AI画像生成 | watermark:unknown | watermark:"unknown" | Canva公式ヘルプでAI生成画像の透かし有無を確認 |
| leonardo-ai | Leonardo AI | watermark:unknown | watermark:"unknown" | 公式プランページで透かし条件を確認 |
| playground-ai | Playground AI | watermark:unknown | watermark:"unknown" | 公式料金ページで無料プランの透かし有無を確認 |

---

## 保留C

現在の表示上は安全。推測補完リスクが高いため保留。

| slug | toolName | 理由 |
|---|---|---|
| haiper | Haiper | pricingStatus:service_changed / needsReview:no。コンシューマー向けサービス2025年2月シャットダウン済み。現状の商用利用・透かし条件は確認困難。noindex対象として管理中。無理に情報を更新すると推測補完になるため保留 |
| stable-diffusion | Stable Diffusion | pricingStatus:confirmed だが RAIL-M / SDXL ライセンスが複雑。inputMaterialRisk:high。利用規約・Stability AI公式ライセンスは既に officialSourceUrl に記載済み。現状の記述は安全範囲内。新情報は公式ライセンスページで要確認 |

---

## B候補 partial / no_fixed_price 明示化監査（2026-06-22）

対象：8件（invideo-ai / capcut-ai / dalle / gemini-image-generation / microsoft-designer / nightcafe / ideogram / clipdrop）  
DB変更：なし（監査・分類のみ）

| slug | 現状 | suggestedStatus | 理由 | DB反映推奨 |
|---|---|---|---|---|
| invideo-ai | 未設定 | partial（hold） | 「約$20/月〜」で月額断定不可。公式URL有。 | hold（「約」解消後にconfirmed再検討） |
| capcut-ai | 未設定 | no_fixed_price | 地域・プラットフォーム差あり。固定月額なし。 | yes |
| dalle | 未設定 | partial | ChatGPT Plus内包。DALL·E単体独立料金なし。 | yes |
| gemini-image-generation | 未設定 | partial | Google One AI Premium内包。独立料金なし。 | yes |
| microsoft-designer | 未設定 | partial | M365/Copilot Pro内包の可能性。独立料金ページ未確認。 | yes |
| nightcafe | 未設定 | partial | pricingSourceUrlがブログURL。currency=unknown。月額未確認。 | yes |
| ideogram | 未設定 | partial | docs URLあり・USD。最安プラン月額未確認。 | yes |
| clipdrop | 未設定 | partial | 公式料金ページあり。Proプラン「--per month」で金額非開示。 | yes |

### 禁止事項チェック（2026-06-22）

断定表現「商用利用できます / 著作権的に問題ありません / 安全です / 自由に使えます」の増加：なし（DB変更なし）

### 次回DB反映候補

| slug | suggestedStatus | 優先度 |
|---|---|---|
| capcut-ai | no_fixed_price | 高 |
| dalle | partial | 高 |
| gemini-image-generation | partial | 高 |
| microsoft-designer | partial | 高 |
| nightcafe | partial | 中 |
| ideogram | partial | 中 |
| clipdrop | partial | 中 |
| invideo-ai | partial | 低（「約」解消後） |

---

## 注意事項

- 推測で埋めない。公式情報が確認できない場合は unknown / 要確認を維持する
- 商用利用・著作権・肖像権・商標・第三者素材については断定しない
- Haiperを現役おすすめに見せない（noindex管理中）
- 本記事は法的助言ではない

---

## Haiper 特別確認ステータス

| 項目 | 現状 | ステータス |
|---|---|---|
| pricingStatus | service_changed | ✅ 適切 |
| needsReview | no | ✅ 適切 |
| noindex | レイアウト側で制御（haiper.md に `noindex` フィールドなし・別制御） | 要build後確認 |
| 通常おすすめCTA | bestFor に「過去情報・比較参考」「現在の利用可否は要確認」明記 | ✅ 適切 |
| limitations[0] | 「【重要】コンシューマー向けWebアプリは2025年2月にシャットダウン済み」 | ✅ 適切 |

> operation-checklist.md §8 で `/tools/haiper/` の noindex レンダリングを毎回 build 後に確認すること。

---

## 公式情報ソース強度評価

| ソース強度 | 定義 | 該当ツール例 |
|---|---|---|
| strong | 公式料金ページ直リンク・日付明記 | midjourney, runway, luma-ai, pika, adobe-firefly, invideo-ai |
| medium | 公式ドキュメント・利用規約ページ（料金ページ直リンクではない） | kling-ai, stable-diffusion, dalle, ideogram |
| weak | officialSourceUrl が公式トップページのみ | seaart-ai |
| missing | pricingSourceUrl が存在しない | nightcafe, tensor-art, microsoft-designer |
| unknown | フィールド自体が未設定 | clipdrop, vidu-ai |

---

## 優先確認A 完了サマリー（2026-06-21）

| slug | 結果 | confirmed化 | 備考 |
|---|---|---|---|
| hailuo-ai | 完了 | ✅ confirmed | hailuoai.video/subscribe でStandard $14.99/Pro $54.99/Master $119.99 USD確認。needsReview=false・currency=USD・pricingSourceUrl更新済み |
| dreamstudio | 完了 | ✅ confirmed | stability.ai/brand-studio-plans でTrial無料1000cr/Core $50/月 USD確認。Brand Studio注記・freePlanNote・lowestPaidPlan追加済み |
| seaart-ai | 完了 | ❌ 維持 | seaart.ai/pricing・/ja は非ログイン時に具体価格・通貨表示なし。pricingStatus=unconfirmed・currency=unknown・commercialUse=unknown・watermark=unknown 維持 |
| pixverse | 完了 | ❌ 維持 | pixverse.ai/pricing・/en/pricing ともに404。料金ページURL未発見。pricingStatus=unconfirmed・currency=unknown 維持 |
| clipdrop | 完了 | ❌ 維持 | clipdrop.co/pricing Proプランは「--per month」（金額非開示）。pricingStatus=partial・currency=unknown 維持 |
| kling-ai | 完了 | ❌ 維持 | HTTP 446によりページ直接確認不可。第三者情報で$6.99確認済みだがpricingStatus=partial維持。lastReviewed=2026-06-21更新済み |
| ideogram | 完了 | ❌ 維持 | currency=USD・週10クレジット確認。透かし公式情報なし。pricingStatus=partial・watermark=unknown維持 |
| vidu-ai | 完了 | ❌ 維持 | vidu.com/pricing は動的ロードで取得不可。pricingStatus=unconfirmed・currency=unknown 維持。実ブラウザ確認が必要 |

**confirmed化：2件（hailuo-ai・dreamstudio）**  
**維持：6件（seaart-ai・pixverse・clipdrop・kling-ai・ideogram・vidu-ai）**

### 維持した理由

| slug | 理由 |
|---|---|
| seaart-ai | 料金ページが非ログイン時に金額・通貨を表示しない構造。ログイン後のみ確認可能 |
| pixverse | 公式料金ページURL自体が404。消費者向け料金の公式確認手段なし |
| clipdrop | Proプラン金額が「--per month」で非開示。2024年にJasper AI傘下へ移管後、料金体系が不透明 |
| kling-ai | HTTP 446により公式ページ直接アクセス不可。第三者情報のため confirmed 化せず |
| ideogram | 最安有料プランの月額が公式ドキュメントから確認できず。透かし条件も未確認 |
| vidu-ai | 公式料金ページが動的ロード（JS必須）のためスクレイピング不可。実ブラウザ確認必要 |

### unknown / 要確認を維持した項目

| 項目 | 件数 | 対象slug |
|---|---:|---|
| pricingStatus: unconfirmed | 3 | seaart-ai・pixverse・vidu-ai |
| pricingStatus: partial（明示1件＋実質partial相当4件） | 5 | fotor-ai（明示）・clipdrop・kling-ai・ideogram・nightcafe |
| currency: unknown（値6件＋フィールドなし3件） | 9 | haiper・nightcafe・pixverse・seaart-ai・tensor-art・vidu-ai（値）＋capcut-ai・clipdrop・gemini-image-generation（フィールドなし） |
| commercialUse: unknown | 3 | seaart-ai・clipdrop・haiper |
| watermark: unknown | 10 | canva-ai-image-generator・clipdrop・dreamstudio・haiper・ideogram・leonardo-ai・microsoft-designer・playground-ai・seaart-ai・tensor-art |

### 次回確認Bへ回す項目

確認Bとして既にバックログ登録済み（§次回確認B参照）：gemini-image-generation / tensor-art / capcut-ai / nightcafe / fotor-ai / microsoft-designer / canva-ai-image-generator / leonardo-ai / playground-ai

---

## 確認ログ

### 2026-06-21 — seaart-ai / pixverse / clipdrop 公式再確認（優先確認A 3件）

| slug | 確認内容 | 結果 | DB変更 |
|---|---|---|---|
| seaart-ai | seaart.ai/pricing・/ja の非ログイン表示 | 具体価格・通貨表示なし（ログイン後のみと推定） | lastReviewed/reviewed.pricing → 2026-06-21。pricingStatus/currency/commercialUse/watermark：維持 |
| pixverse | pixverse.ai/pricing・/en/pricing | いずれも404。コンシューマー向け料金ページURL未発見 | lastReviewed/reviewed.pricing → 2026-06-21。pricingSourceNote更新（404確認）。pricingStatus/currency：維持 |
| clipdrop | clipdrop.co/pricing | Freeプランあり確認。Proプラン「--per month」（金額非開示） | lastReviewed/reviewed.pricing → 2026-06-21。pricingSourceNote更新（--per month確認）。pricingStatus/currency：維持 |

**confirmed化なし。** 全3件とも新たに公式確認できた料金・通貨・商用利用・透かし条件なし。未確認項目は従来どおり維持。
