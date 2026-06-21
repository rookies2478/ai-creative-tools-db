# ツール料金情報 棚卸しレポート

生成日: 2026-06-17 / 更新日: 2026-06-18（優先度C 3件確認・microsoft-designer/stable-diffusion pricingSourceUrl追加）  
対象: src/content/tools/ 全26件  
目的: 月額費用のUSD表記偏りチェック・引用URL確認・日本/海外サイト判定

---

## サマリー

| 項目 | 件数 |
|---|---|
| 全ツール数 | 26 |
| pricingStatus = confirmed | 11 |
| pricingStatus = partial | 9 |
| pricingStatus = unconfirmed | 3 |
| pricingStatus = no_fixed_price | 1 |
| pricingStatus = service_changed | 1 |
| pricingStatus = confirmed（要確認あり） | 1 |
| needsReview = yes | 14（haiper対応済みで15→14に更新） |
| needsReview = no | 12 |
| currency = USD | 16 |
| currency = Unknown / unknown | 6 |
| currency = N/A | 1 |
| siteOrigin = overseas | 26 |
| siteOrigin = japan | 0 |
| siteOrigin = unknown | 0 |

**日本企業のサービスはDB内に存在しない。** 全26件が海外企業運営のサービス。USD表記自体は方針として問題なし。ただし **15件が何らかの理由で要確認**。

---

## 要確認15件 詳細

### 🔴 優先度：高（公式料金情報が実質未確認）

#### pixverse ✅ 対応済み（2026-06-17）
- pricingSourceUrl フィールドが frontmatter に存在しなかった（sourceRefs にはPlatform API料金ページURLあり）
- **修正内容**: `pricingSourceUrl: "unknown"` + `pricingSourceNote` を追加。コンシューマー向け公式料金ページURLが未確認である旨を明記。
- 月額は依然として第三者情報由来。lowestPaidPlan の「要公式確認（複数の第三者情報では...）」表記は維持。
- **残課題**: コンシューマー向け公式料金ページ（pixverse.ai/pricing 等）のURL確認が未解決。

#### seaart-ai ✅ 対応済み（2026-06-17）
- officialSourceUrl が CDN 画像URL（利用規約文書）→ ルート崩れリスクあり
- **修正内容**: officialSourceUrl を `https://www.seaart.ai/` （公式トップ）に変更。CDN利用規約URLは sourceRefs 内ラベル付きで維持。
- pricingSourceUrl は未設定のまま（公式料金ページURLを確認できないため）。
- **残課題**: 公式料金ページURL（seaart.ai/pricing または会員ページ）が未確認。料金は「要公式確認」のまま維持。

#### haiper ✅ 確認済み・対応不要（2026-06-17）
- ファイル精査の結果、シャットダウン注記はすでに完備されていた。
  - shortDescription にシャットダウン旨を明記済み
  - 本文冒頭に ⚠️ 警告ブロック（2025年2月シャットダウン・共同創業者移籍・モデル売却）
  - limitations・faqs・bestFor すべてにシャットダウン注記あり
  - bestFor に「現役おすすめ」ではなく「過去情報・比較参考」として記載済み
  - officialSourceUrl = `https://docs.haiper.ai/pricing`（適切な料金ドキュメントURL）
- **修正内容**: ファイル変更なし（対応済みを確認）
- **公開判断**: noindex/draft 化は現時点では不要。参照・比較ページとして機能している。積極推奨でない旨の注記は完備済み。

#### vidu-ai ✅ 部分対応済み（2026-06-17）
- **修正内容**: `pricingSourceUrl: "https://www.vidu.com/pricing"` 追加。`pricingSourceNote` 追加（動的ロードのため要直接確認）。
- currency=unknown は変更不可（公式ページを直接確認しないと断定できない）。
- **残課題**: currency と具体的月額を公式で確認する必要あり。

#### hailuo-ai ✅ 部分対応済み（2026-06-17）
- **修正内容**: `pricingSourceUrl: "https://hailuoai.video/doc/payment-policy.html"` 追加（sourceRefs内の既存URLをfrontmatterに昇格）。`pricingSourceNote` 追加（料金表ではなく支払いポリシー文書である旨を明記）。
- officialSourceUrl は利用規約URLのまま維持（公式根拠として有効）。
- 月額は「$9.99〜$14.99」の範囲表記のまま維持（第三者情報由来）。
- **残課題**: 専用料金ページ（hailuoai.video/pricing 等）のURLが未確認。月額を公式で確認する必要あり。

---

### 🟡 優先度：中（currency不明・月額未記載）

#### clipdrop ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://clipdrop.co/pricing"` + `pricingSourceNote` 追加。Proプラン料金ログイン要の可能性を明記。
- currency=Unknown・月額未確認のまま。needsReview=yes継続。
- **残課題**: clipdrop.co/pricing でProプランのcurrency・月額を人間がブラウザで確認する。

#### dreamstudio ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://stability.ai/brand-studio-plans"` + `pricingSourceNote` 追加。Brand Studioリブランド済みの旨を明記。
- currency=Unknown・月額未確認のまま。needsReview=yes継続。
- **残課題**: stability.ai/brand-studio-plans でcurrency・月額・クレジット条件を人間がブラウザで確認する。

#### nightcafe ✅ 部分対応済み（2026-06-17）
- **修正内容**: `pricingSourceUrl: "https://nightcafe.studio/blogs/info/is-nightcafe-free"` 追加（公式ブログ）。`pricingSourceNote` 追加（料金表ページではない旨を明記）。`currency: "unknown"` 追加（フィールド未存在のため新規追加）。
- officialSourceUrl は利用規約URLのまま維持。
- **残課題**: 有料プラン料金表ページのURLが未確認。月額・currency を公式で確認する必要あり。

#### tensor-art ✅ 部分対応済み（2026-06-17）
- **修正内容**: `pricingSourceUrl: "https://tensor.art/event/proupdate"` 追加（公式Proプラン案内ページ）。`pricingSourceNote` 追加（イベントページのためURL変更リスクあり）。`currency: "unknown"` 追加（フィールド未存在のため新規追加）。
- officialSourceUrl は利用規約URLのまま維持。
- **残課題**: /pricing 等の専用料金ページURLが未確認。event URLは恒久性に懸念あり。

#### haiper（上記と重複）→ 対応不要（確認済み）

---

### 🟢 優先度：低（月額未記載だが理由あり・または軽微）

#### ideogram ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://docs.ideogram.ai/plans-and-pricing/available-plans"` + `pricingSourceNote` 追加。
- currency=USD設定済み。月額は要公式確認のまま。needsReview=yes継続。
- **残課題**: docs.ideogram.ai/plans-and-pricing/available-plans で最安有料プランの月額を人間がブラウザで確認する。

#### fotor-ai ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://www.fotor.com/jp/pricing/"` + `pricingSourceNote` 追加。currency=USD推定を明記。
- 具体的月額は要公式確認のまま。needsReview=yes継続。
- **残課題**: fotor.com/jp/pricing/ で最安有料プランの月額（USD）を人間がブラウザで確認する。

#### gemini-image-generation ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://gemini.google.com/advanced?hl=ja"` 追加。`pricingSourceNote` 追加（Gemini Advanced公式ページ・独立料金なし・Google One AI Premium相当）。
- sourceRefs内の既存URL（type: official）をpricingSourceUrlに昇格させた。
- **残課題**: 具体的月額・プラン名称の公式確認は未実施。needsReview=yes 継続。

#### microsoft-designer ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer"` 追加（sourceRefs内の既存URLを昇格）。`pricingSourceNote` 追加（独立料金ページなし・Microsoft 365/Copilot Pro内包の可能性・月額要公式確認）。
- officialSourceUrl はサービス規約URL（servicesagreement）のまま維持（変更禁止ルール適用）。
- 月額は要公式確認のまま。needsReview=yes継続。sourcesCount=3（少ない）は変更なし。
- **残課題**: designer.microsoft.com またはMicrosoft 365プランページをブラウザで確認し、独立料金の有無・月額・currency を確認する。

#### dalle ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://openai.com/chatgpt/pricing/"` 追加（sourceRefs内の既存URLを昇格）。`pricingSourceNote` 追加（独立料金なし・ChatGPT Plus依存を明記）。
- officialSourceUrl は利用規約URLのまま維持（変更禁止ルール適用）。
- 月額は要公式確認のまま。needsReview=yes継続。
- **残課題**: openai.com/chatgpt/pricing/ でChatGPT Plus等の現在の月額を人間がブラウザで確認する。

#### stable-diffusion ✅ 部分対応済み（2026-06-18）
- **修正内容**: `pricingSourceUrl: "https://platform.stability.ai/pricing"` を frontmatter に追加（sourceRefs内・audit CSV内に既存の URL を昇格）。`pricingSourceNote` 追加。`pricingStatus=partial`・`needsReview=yes` に統一。
- ローカル/API料金の二重構造・月額プラン・クレジット体系の最新性が未確認のため、pricingStatus=confirmed には変更しない。
- **残課題**: platform.stability.ai/pricing でローカル/API料金・月額プランの最新状況をブラウザで確認する。確認後のみ confirmed 化を検討すること。

#### invideo-ai
- lowestPaidPlan「約$20/月〜」の「約」が曖昧。公式料金URLあり。
- **アクション**: 公式料金ページで正確な金額を確認・更新。

---

## 確認不要11件（confirmed）

| slug | 月額（最安） | 料金引用URL |
|---|---|---|
| midjourney | $8〜$10/月 | docs.midjourney.com |
| canva-ai-image-generator | $15/月 | canva.com/pricing |
| luma-ai | $30/月 | lumalabs.ai/pricing |
| playground-ai | $12/月（年払い） | playground.com/design/pricing |
| leonardo-ai | $10/月（年払い） | leonardo.ai/pricing |
| pika | $8/月（年払い） | pika.art/pricing |
| adobe-firefly | 1,580円/月（税込）〜 | adobe.com/jp/products/firefly/plans.html |
| kling-ai | $6.99/月 | klingai.com/global/pricing |
| runway | $12/月（年払い） | runwayml.com/pricing |
| capcut-ai | アプリ内確認 | capcut.com/help/...pricing |
| stable-diffusion（部分） | 要公式確認 | platform.stability.ai/pricing（部分対応済み・月額最新性要確認） |

---

## 日本サイト / 海外サイト 判定一覧

| slug | siteOrigin | 判定根拠 |
|---|---|---|
| midjourney | overseas | Midjourney Inc. (US) |
| ideogram | overseas | Ideogram AI Inc. (US) |
| canva-ai-image-generator | overseas | Canva Pty Ltd (Australia) |
| capcut-ai | overseas | ByteDance Ltd. (China) |
| fotor-ai | overseas | Everimaging Ltd. (Hong Kong) ※日本語ページあるが日本企業でない |
| gemini-image-generation | overseas | Google LLC (US) |
| clipdrop | overseas | Stability AI Ltd. (UK/US) |
| luma-ai | overseas | Luma AI Inc. (US) |
| invideo-ai | overseas | InVideo Inc. (US/India) |
| pixverse | overseas | PixVerse (China) |
| playground-ai | overseas | Playground AI Inc. (US) |
| leonardo-ai | overseas | Leonardo AI Pty Ltd (Australia) |
| hailuo-ai | overseas | MiniMax Co. Ltd. (China) |
| seaart-ai | overseas | SeaArt (Hong Kong/China) |
| dreamstudio | overseas | Stability AI Ltd. (UK/US) |
| vidu-ai | overseas | Shengshu AI (China) |
| pika | overseas | Pika Labs Inc. (US) |
| dalle | overseas | OpenAI Inc. (US) |
| nightcafe | overseas | NightCafe Studio (Australia) |
| adobe-firefly | overseas | Adobe Inc. (US) |
| microsoft-designer | overseas | Microsoft Corporation (US) |
| haiper | overseas | Haiper AI (UK) |
| tensor-art | overseas | 運営国不明（中国系とみられる）→ overseas/unknown 要確認 |
| kling-ai | overseas | Kuaishou Technology (China) |
| runway | overseas | Runway AI Inc. (US) |
| stable-diffusion | overseas | Stability AI Ltd. (UK/US) |

**注意**: DB内にいずれの tool も `siteOrigin` フィールドが存在しない。判定はすべて外部知識による。DBに `siteOrigin` フィールドを追加する場合は別タスクで対応すること。

---

## 結論・次アクション候補

1. **緊急でない** — 全26件は海外ツール。USD表記は方針として妥当。日本円への変換は不要。
2. **pricingSourceUrl 未設定 or 利用規約URLになっている7件** を料金ページURLに差し替え推奨。
3. **currency=Unknown 6件** は料金ページ確認後 USD / credit / N/A 等を設定推奨。
4. **pixverse / seaart-ai** は料金引用URLが料金ページを指していない。優先修正候補。
5. **haiper** はコンシューマー向けサービス終了を明記する方向でページ更新を検討。
6. **siteOrigin フィールド追加** は別タスクで検討（既存DB構造変更のため）。

---

---

## 公開ページ断定料金表示 確認結果（2026-06-18）

優先度A 6件（pixverse / seaart-ai / hailuo-ai / vidu-ai / tensor-art / nightcafe）について、公開ページ上の料金表示を確認した。

### 確認結果

| slug | 修正前 specs 料金表示 | 修正後 / 現状 | 断定表示なし |
|---|---|---|---|
| pixverse | `$10〜$199/月程度（要確認）` | `要公式確認` に修正（2026-06-18） | ✅ |
| hailuo-ai | `$9.99〜$14.99/月程度（要確認）` | `要公式確認` に修正（2026-06-18） | ✅ |
| seaart-ai | `無料〜VIP/SVIP（公式確認）` | 変更なし（公式確認を促す表示） | ✅ |
| vidu-ai | `要公式確認` | 変更なし | ✅ |
| tensor-art | `無料〜Proプラン（公式確認）` | 変更なし（公式確認を促す表示） | ✅ |
| nightcafe | `無料〜（クレジット/サブスク）` | 変更なし（詳細は公式参照） | ✅ |

### 確認した表示箇所

- ツール詳細ページ specs ストリップ（料金フィールド）
- basicInfo カード（最安料金目安カード）
- quickTable 比較ポイント早見表（最安料金行）
- pricing テーブル（料金プランセクション）
- ToolsListCard の price 表示（`lowestPaidPlan` → フォールバック `要公式確認`）

### 適用ルール

- `pricingStatus` が `confirmed` でない / `needsReview=yes` の場合は具体的金額を公開ページに表示しない
- `currency=unknown` の場合は `$` / `¥` 等の通貨記号を表示しない
- `pricingSourceUrl` が `unknown` / ブログ / 支払いポリシー文書 の場合は公式料金確認済みとして扱わない
- 表示は「要公式確認」「公式サイトで確認」「最新情報は公式サイトをご確認ください」に統一

*このレポートは棚卸し目的のみ。修正は別タスクで承認後に実施すること。*
