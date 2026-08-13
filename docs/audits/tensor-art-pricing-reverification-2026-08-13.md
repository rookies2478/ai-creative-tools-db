# Tensor.Art pricingStatus再検証（AUDIT ONLY）

作成日: 2026-08-13
対象: `src/content/tools/tensor-art.md`
方針: DB変更なし。監査・分類・提案のみ。

---

## Part A — 現行DBの検査

- `pricingModel`: `subscription_credit`
- `currency`（トップレベル）: `"unknown"`
- `japanBilling.billingCurrency`: `"USD"`（**トップレベルcurrencyと矛盾**、Part D参照）
- `freePlan`: `true`、`freePlanNote`: 「無料利用枠やクレジット制の内容は変更される可能性があります」とヘッジ
- `pricingSourceUrl`: `https://tensor.art/event/proupdate`（プラン案内の公式イベントページ）
- `pricingSourceNote`: 「専用の公式料金ページURL（/pricing等）は未確認」と既に明記
- `japanBilling.pricingUrl`: `https://tensor.art/purchase/vip`（購入/メンバーシップページ）
- 本文中の料金案内: 「有料プランとしてDaily Pass・Monthly Pro Subscription・Quarterly・Yearly・Credits Packなどが案内されています」（具体的な金額は本文に記載なし、「変更される可能性がある」と明記）
- `verifiedAt`/`lastReviewed`: `2026-06-17`
- `commercialUseNote`: Tensor.Art側は生成物の所有権・著作権を主張しない、モデルごとの商用利用可否は個別確認要、商用利用不可モデル使用時の責任はユーザー側
- 現在のpricingStatus: **未設定**
- 全体として、価格関連の主張は「案内されている」「変更される可能性がある」という表現に終始しており、具体的な金額を断定していない。既存の慎重な記述スタイルは他のVERIFY_REQUIRED対象（kling-ai等）と同様

---

## Part B — 公式一次情報の検証

### アクセス結果サマリー

| URL | WebFetch | curl（標準UA） | レンダリング形式 |
|---|---|---|---|
| https://tensor.art/purchase/vip | **HTTP 403 Forbidden** | HTTP 200（221,285 bytes） | Nuxtクライアントレンダリング（価格データはAPI経由で動的取得、静的HTMLに価格数値なし） |
| https://tensor.art/event/proupdate | **HTTP 403 Forbidden** | HTTP 200（232,455 bytes） | Nuxt SSRだが**本文（イベント記事のMarkdown変換HTML）は静的HTMLに含まれていた** |
| https://tensor.art/about/terms-of-service-new | **HTTP 403 Forbidden** | HTTP 200（228,844 bytes） | 同上、規約本文はSSRで含まれていた |

WebFetchツールはTensor.Art公式ドメイン全体で一貫して403 Forbiddenを返した（kling-aiのHTTP 446とは異なる拒否コードだが、同種のボット判定と推測される。断定はしない）。一方、標準User-Agent付きのcurl直接アクセスはいずれもHTTP 200を返し、`/event/proupdate`と`/about/terms-of-service-new`については実際のコンテンツ本文（Nuxtのサーバーサイドレンダリング結果）を取得できた。`/purchase/vip`のみ、実際の購入UI・価格表示はクライアントサイドでAPI取得後にレンダリングされる構造で、静的HTMLには価格情報が含まれていなかった。

### B-1. `https://tensor.art/event/proupdate`（Proプラン案内・公式イベントページ）

- 取得方法: curl（標準UA）
- アクセス結果: 成功（HTTP 200、SSR済み本文取得）
- 確認日: 2026-08-13
- タイトル: "Pro Membership Adjustments | Tensor.Art"
- 確認できた事実（原文引用、通貨はUSD建て）:
  - **Daily Pass**: Price: $1（Each user can ONLY purchase once＝1ユーザー1回限り）
  - **Monthly Pro Subscription**: Price: $9.9、Bonus: 1k credits、サブスクリプション（即時解約後の即時再登録は不可、現行期間終了後に再登録可能）
  - **Quarterly Pro Subscription**: Price: $19.9（"The discount period has ended, and the price has returned to the original"＝割引期間終了・通常価格に復帰したと明記）、Bonus: 5k credits
  - **Yearly Pro Subscription（NEW!と表記）**: Original price: $119.9、Special offer: 50% off, price is now $59.9（**時限的な特別オファーと明記**）、Bonus: 25k credits
  - **Credits Pack Purchases**: 3k・10kクレジットパックは価格変更なし（"remain unchanged"）と記載されているが、具体的な金額自体はこのページに記載なし。サブスクリプション非対応・複数回購入可
  - 新しい決済方法としてStripeサポート開始の案内あり
- ページの性質: このページはURL自体が`/event/proupdate`（イベント/お知らせ）であり、タイトルも「Pro Membership Adjustments（プラン変更のお知らせ）」という**変更通知・アナウンス記事**である。専用の恒久的な料金ページ（例: `/pricing`）ではない。
- **公開日が本文から特定できなかった**（`<title>`・`og:title`は確認できたが、記事公開日・更新日のメタデータは取得したHTML内に見つからず）。"discount period has ended"（割引終了）・"Special offer"（時限オファー）という文言が含まれることから、記載内容の一部（特にYearlyの$59.9）は**時限的なプロモーション価格である可能性が高く、現時点でこの価格が有効かどうかは本ページ単独では判断できない**。

### B-2. `https://tensor.art/purchase/vip`（購入/メンバーシップページ、japanBilling.pricingUrl記載の正本URL）

- 取得方法: curl（標準UA）
- アクセス結果: HTTP 200だが、Nuxtのクライアントサイドレンダリング（`<div id="__nuxt">`配下がローディングインジケーターのみ、価格・プラン名の数値は確認できず）
- 確認日: 2026-08-13
- 確認できた事実: **なし**（静的取得では価格情報を抽出不可。JS実行環境が必要と判断される）
- claude-in-chromeブラウザ拡張は本セッション未接続のため、JSレンダリング後の実地確認手段なし

### B-3. `https://tensor.art/about/terms-of-service-new`（公式利用規約）

- 取得方法: curl（標準UA）
- アクセス結果: 成功（HTTP 200、SSR済み本文取得）
- 確認日: 2026-08-13
- 確認できた事実:
  - 3.1条: "No claims on the ownership or copyright of models and AI-generated images are made by Tensor.Art, and all created content may be freely used by yourself."（Tensor.Art側は所有権・著作権を主張せず、生成物はユーザーが自由に使用可能）→ DBの`commercialUseNote`の該当記載と**完全に一致**
  - 3.9条: "AI tools that are subscribed to must choose models that are commercially available when they are open. If models that do not allow commercial use are used, the author will bear all the consequences."（商用利用不可モデルを使用した場合の責任はユーザー側）→ DBの記載と**完全に一致**
  - 2.6条: アカウント終了時、購入・サブスクリプションの返金は保証されないと明記
  - 通貨・具体的な価格に関する記載はToS内には見当たらず（想定どおり、規約は価格を扱わない）

---

## Part C — 検証事実まとめ

| 項目 | 結果 |
|---|---|
| 無料枠の有無 | DBの主張どおり存在（ただし公式イベント/購入ページで無料枠の具体的なクレジット量・回数は今回のcurl取得範囲では確認できず） |
| 無料デイリー/マンスリークレジット | 未確認（`/event/proupdate`は有料プランの記載が中心で、無料枠の具体的な数量には言及なし） |
| 有料プラン名 | **確認済み**: Daily Pass, Monthly Pro Subscription, Quarterly Pro Subscription, Yearly Pro Subscription, Credits Pack Purchases（DBの本文記載と完全一致） |
| 最安有料価格 | Daily Pass $1（一時的なパスとして。継続課金の最安値はMonthly Pro $9.9/月） |
| 月額課金 | Monthly Pro Subscription $9.9/月（確認済み、ただし取得元ページの鮮度は不明） |
| 年額課金 | Yearly Pro Subscription: 原価$119.9、現在(?)$59.9（50%オフの時限オファーと明記されており、現時点で有効かは不明） |
| 通貨 | **USD確認済み**（$表記が公式イベントページに明記。DBの`japanBilling.billingCurrency: "USD"`と一致するが、トップレベル`currency: "unknown"`と矛盾） |
| プランごとのクレジット付与量 | 確認済み: Monthly=1k、Quarterly=5k、Yearly=25k credits |
| クレジット別売り | 確認済み（Credits Pack Purchases、3k・10kパック、サブスク非対応・複数回購入可） |
| モデルによる消費量差 | 未確認 |
| プランによる高速/優先生成の差 | 未確認 |
| 商用利用権のプラン依存性 | 未確認（ToS上はモデル単位のライセンスに依存し、購入プラン単位の商用権差は今回の情報源からは確認できず） |
| 地域別価格 | 未確認 |
| 税表示（内税/外税） | 未確認（DB既存記載どおり`taxDisplay: "unknown"`は今回も未解決） |
| エンタープライズ/カスタム価格 | 未確認（今回の情報源に記載なし） |

---

## Part D — 現行DBとの比較（フィールド単位）

| フィールド | 現在値 | 証拠状態 | 備考 |
|---|---|---|---|
| pricingModel | `subscription_credit` | SUPPORTED | サブスクリプション＋クレジット制という構造は`/event/proupdate`の内容と一致 |
| currency（トップレベル） | `"unknown"` | **UNSUPPORTED（保守的すぎ）** | 公式イベントページでUSD建ての具体的価格（$1、$9.9等）が確認でき、かつ同一ファイル内の`japanBilling.billingCurrency`は既に`"USD"`と記録済み。トップレベルの`"unknown"`は現行の自己矛盾であり、今回の検証結果に照らすと更新の余地がある |
| japanBilling.billingCurrency | `"USD"` | SUPPORTED | 今回の検証で裏付けが得られた |
| freePlan | `true` | PARTIALLY_SUPPORTED | 無料枠自体の存在は妥当と考えられるが、今回の情報源（有料プラン中心のイベントページ）からは無料枠の具体的な内容を確認できていない |
| pricingSourceUrl | `https://tensor.art/event/proupdate` | PARTIALLY_SUPPORTED | このURLは実際に価格情報を含む唯一のアクセス可能な公式ページであることが今回判明した（`/purchase/vip`はクライアントレンダリングで数値抽出不可）。ただし「イベント/お知らせページであり恒久的な料金ページではない」という性質は`pricingSourceNote`の懸念と一致 |
| pricingSourceNote | 「専用の公式料金ページURL未確認」 | SUPPORTED | 今回の検証でも専用の`/pricing`等の恒久ページは確認できず、この記載は現状も正確 |
| 本文の料金案内（プラン名のみ、金額記載なし） | Daily Pass・Monthly Pro・Quarterly・Yearly・Credits Pack | SUPPORTED（プラン名） | 5プラン名は`/event/proupdate`の内容と完全一致。本文はあえて具体的金額を記載しておらず、これは今回判明した「価格が時限オファーで変動する」という実態を踏まえると適切な慎重さだったと言える |
| verifiedAt/lastReviewed（2026-06-17） | - | UNVERIFIABLE（鮮度） | `/event/proupdate`ページ自体に更新日時が明記されておらず、DBの検証日との前後関係を判断できない |

---

## Part E — pricingStatus判定

### 判定ロジック適用

1. 権威ある一次情報が直接または既存フィールド経由で入手できるか？
   - 部分的に**できる**: `/event/proupdate`から具体的なプラン名・USD建て価格・クレジット付与量を確認できた
   - ただし恒久的な公式料金ページ（`/purchase/vip`）は依然としてアクセス不可（クライアントレンダリング）
2. 主要な価格情報は判明しているが周辺要素が未確定か？
   - 主要情報（プラン構造・通貨・大まかな価格帯）は今回**判明した**
   - 一方、(a) 取得元が恒久的な料金ページではなく時限イベント記事であるため現行性が不明、(b) Yearlyプランの$59.9は明示的に「時限オファー」と記載されており現在も有効か不明、(c) 無料枠の具体的な内容は未確認、という**複数の周辺要素が未確定**
   - → **partial**の定義（主要情報判明・一部が不完全/変動的/未検証）に該当

### 推奨: partial

- **confirmed**にしない理由: 取得できた価格情報の出所が「時限オファーを含むお知らせページ」であり、現在の実際の請求額と一致するかを裏付ける恒久的な料金ページに到達できていない。無料枠の具体的な内容も未確認
- **unconfirmed**にしない理由: 「情報自体を信頼・検証できない」状態ではない。実際に公式ドメインから具体的なプラン名・価格・クレジット量を取得でき、DBの記述（プラン名一覧・「変更される可能性がある」というヘッジ）と矛盾しない
- **no_fixed_price**にしない理由: Monthly Pro $9.9/月のように、少なくとも一部プランには明確な固定価格が存在する。変動性を理由にこの値を選ばないという指示にも従う
- **VERIFY_REQUIRED**にしない理由: 前回監査時点では「専用料金ページ未確認・currency unknown」が未解決だったが、本タスクにより(a) 具体的な価格情報を公式イベントページから取得でき、(b) 通貨がUSDであることも確認できた。前進があったため、判断不能のままに留め置く必要性は薄い
- policy_basis: `docs/decisions/pricing-status-classification-policy.md`のpartial定義（「〜から」表記の最安値のみ判明、一部プランのみ確認済みで全プラン未確認、価格自体は判明しているが周辺要素が未確定、等）に合致。特に「地域による価格差」「近似的」に類する「時限オファーの現行性」という新規の不確実性要素が該当
- confidence: 中（プラン名・通貨は高い確信度で確認できたが、価格の現行性・無料枠の具体的内容には残余不確実性がある）
- unresolved_details: Yearly Pro $59.9（50%オフ）が現在も有効か、Quarterly $19.9が現行通常価格として維持されているか、無料枠の具体的なクレジット量・回数、専用の恒久的公式料金ページの有無、地域/税表示、モデル別消費量差、商用利用権のプラン依存性

---

## Part F — 将来のDB変更提案

### REQUIRED

- **フィールド**: `currency`（トップレベル）
- **現状**: `"unknown"`
- **提案**: `"USD"`への変更を検討（今回の検証で公式イベントページから$建て価格を確認でき、かつ同一ファイル内の`japanBilling.billingCurrency`は既に`"USD"`と記録されており、トップレベルとの不整合が生じている）
- **根拠**: `docs/audits/tensor-art-pricing-reverification-2026-08-13.md` Part B-1（`/event/proupdate`のUSD建て価格表記）およびPart D（既存`japanBilling.billingCurrency`との矛盾）
- 注: 本タスクはAUDIT ONLYのため、この変更は今回実施しない。次回の値付けタスクでの反映を推奨する

### OPTIONAL

- `pricingSourceNote`へ、`/event/proupdate`が「時限オファー・お知らせ記事」であり、恒久的な料金ページではない旨、および掲載価格（特にYearly $59.9）が現在も有効か未確認である旨を追記すると、次回監査者の作業負担が減る
- `pricingSourceUrl`または`japanBilling.pricingUrl`に、実際に価格数値を確認できる情報源として`/event/proupdate`を、UI/購入導線としては`/purchase/vip`を、と役割を分けて記録すると情報源の性質がより明確になる（現行でも`japanBilling.pricingUrl`は`/purchase/vip`、`pricingSourceUrl`は`/event/proupdate`と既に分かれているため、この区別の意図をnote等で明示するのみで十分）
- 無料枠の具体的なクレジット量・回数について、将来的にブラウザレンダリング環境（claude-in-chrome接続時）で`/purchase/vip`を実地確認し追記することを推奨

### NO_CHANGE

- pricingModel（`subscription_credit`）
- freePlan（`true`）
- freePlanNote・本文の慎重な表現（金額を断定せず「変更される可能性がある」とする記述）
- commercialUseNote・usagePolicy関連（ToS 3.1条・3.9条と完全に一致することを確認済み）
- japanBilling.billingCurrency（`"USD"`、今回の検証で裏付けられた）
- japanBilling.pricingUrl（`/purchase/vip`、実際の購入導線として妥当）

---

## 今回のDB変更

**なし**（監査・分類・提案のみ。`src/content/tools/tensor-art.md`は無変更）
