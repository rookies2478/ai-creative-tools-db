# InVideo AI pricingStatus再検証（AUDIT ONLY）

作成日: 2026-08-13
対象: `src/content/tools/invideo-ai.md`（変更なし）
方針: DB変更なし。公式情報の再検証と分類提案のみ。

---

## Part A — 公式情報の再検証結果

### 1. https://invideo.io/pricing/（公式料金ページ）

- source_type: 公式pricingページ
- access: 取得成功（HTTP到達）だが、価格の具体的数値（$xx/月等）はページの静的HTML/初期レンダリング内容に含まれていない。プラン切替タブ（Individual / Team & Enterprise）・全プラン共通機能の説明・「Model & agent prices are subject to change」の注記・クレジット制のFAQ導線・Enterpriseは「contact sales」導線であることは確認できた。
- checked_at: 2026-08-13（WebFetchツールによる取得、2回実施：通常抽出・raw/script探索の2種類のプロンプトで確認）
- facts_supported:
  - Individual / Team & Enterprise の2区分タブが存在する
  - 全有料プラン共通で200以上のモデル（Seedance 2.5, Veo 3.1, Kling 3.0, Nano banana pro, Elevenlabs music等）にアクセス可能と案内
  - クレジットの追加購入（on-demand top-up）が可能
  - 「Model & agent prices are subject to change」という変更可能性の明記あり
  - Enterpriseは個別見積り（contact sales）
- facts_NOT_supported（今回の取得手段では確認不可）:
  - 具体的な金額（$xx/月等）
  - 月払い/年払いの価格差
  - 通貨表示
  - プランごとのクレジット数
  - 「from」価格表記の有無

### 2. https://help.invideo.io/en/articles/11528140-invideo-plans-and-credits-everything-you-need-to-know（公式ヘルプ）

- source_type: 公式ヘルプ記事
- access: 取得成功
- checked_at: 2026-08-13
- facts_supported:
  - クレジットは動画作成・生成AIモデル実行・AI機能利用に消費され、ダウンロード/エクスポートには消費されない
  - Autopilot生成品質（Basic/Pro/Ultra）でクレジット消費量が変動
  - AIアクター追加は1分あたり追加20クレジット
  - プランクレジットは契約更新日に月次リセットされ、繰越されない
  - 記事自体が「具体的なプラン詳細・価格はPricingページ参照」と明記し、価格を記事内に再掲していない

### 3. https://help.invideo.io/en/articles/11528140-what-plans-does-invideo-offer-and-what-s-included-in-each（公式ヘルプ、DB記載の別URL）

- source_type: 公式ヘルプ記事
- access: 取得成功
- checked_at: 2026-08-13
- facts_supported:
  - プラン名: Plus / Max / Generative / Elite（Free tierは別記事で言及）— **現行DB（paidPlanNote）の記載と一致**
  - プラン切替は契約期間中いつでも可能、アップグレードはプロレート
  - 追加購入クレジットは購入日から12か月有効
  - 具体的な価格・クレジット数はこの記事にも含まれず、Pricingページへの導線のみ

### 取得手段の限界

- 本環境ではWebFetch（静的HTML→Markdown変換）のみが利用可能で、ブラウザ拡張（claude-in-chrome）は本セッションで未接続のため使用できなかった（`tabs_context_mcp`が「Browser extension is not connected」を返した）。
- invideo.io/pricing/の価格数値はクライアントサイドJS（SPA）でレンダリングされている可能性が高く、WebFetchが取得する初期HTML/変換結果には数値が含まれていなかった。2種類のプロンプト（通常の価格抽出・スクリプト/構造化データ内探索）で試行したが、いずれも価格数値は取得できず。
- これは「公式ソースにアクセスできない」ではなく、「公式ソースは到達可能だが、本環境のツールでは動的レンダリング後の価格数値を取得できない」という取得手段側の制約である。

---

## Part B — 現行DBとの比較

現行`invideo-ai.md`のpricing関連フィールド:

- `pricingModel`: "subscription"
- `lowestPaidPlan`: "約$20/月〜"（「約」表記で断定回避済み）
- `currency`: "USD"
- `freePlanNote`: 無料プランあり（透かし・エクスポート制限）、詳細は公式確認を促す表現
- `paidPlanNote`: "Plus / Max / Generative / Eliteプランあり。各プランのクレジットは月次リセット・繰越なし...モデルごとにクレジット消費量が異なる...料金・クレジット数は変更される場合があるため公式サイトをご確認ください。"
- `japanBilling.pricingNote`: "プラン構成（Plus/Max等・クレジット制）は公式ヘルプで確認済みですが、現行価格・通貨は公式料金ページでご確認ください。日本語公式ページは確認できず、日本円請求の公式記載もありません。"
- `verifiedAt` / `lastReviewed`: "2026-06-15"
- `officialSourceUrl`: "https://invideo.io/pricing/"

### 一致点（NO_CHANGE候補）

- プラン名（Plus/Max/Generative/Elite）は今回のヘルプ記事再確認と一致。
- クレジット月次リセット・繰越なしという記載は、今回のヘルプ記事再確認（"reset monthly on your renewal date and do not carry forward"）と一致。
- 「料金・クレジット数は変更される場合がある」という既存の免責的表現は、公式ページの「Model & agent prices are subject to change」という明記と一致し、過度な断定にはなっていない。
- `currency: "USD"`かつ`japanBilling.billingCurrency: "要公式確認"`という既存の二重表現（DB主要フィールドではUSD確定扱い、japanBillingでは要確認扱い）は、実際に通貨が公式に断定確認できていない現状（今回も確認不可）と整合しており、過大な断定にはなっていない。

### 未解消点

- `lowestPaidPlan: "約$20/月〜"`の「約$20」という具体的数値は、今回の再検証でも公式ソースから直接確認できなかった。この数値が現在も正確か、変更されたかは今回のアクセス手段では判断不能。
- 通貨（USD）・年払い/月払いの価格差・「from」価格の位置づけ・地域価格差・税表示のいずれも、今回のアクセス手段では未確認のまま。

**結論**: 現行DBの表現自体は既に「約」「変更される場合がある」「要公式確認」といった適切なヘッジ表現を使っており、公式情報を過大に断定していない。しかし、$20という具体的数値自体の正確性を今回も直接確認できなかったため、値の正誤を判定する材料が増えていない。

---

## Part C — pricingStatus分類

**recommended_status: VERIFY_REQUIRED**

- policy_basis: `docs/decisions/pricing-status-classification-policy.md`の「判定ロジック」1.「対象ツールの価格に関する権威ある一次情報が、直接または既存フィールド経由で入手できるか？」に対し、具体的な金額の裏付けが今回も得られなかったため、confirmed/partialいずれにも十分な根拠がない。同ポリシーの「anti-bot/HTTPブロックにより価格ページ確認不可」特殊ケースに準じ、確認不可の事実を記録しつつ推測で値を入れない扱いとする（本件はHTTPブロックではなくJSレンダリングによる取得制限だが、扱いは同様）。
- confidence: 低（今回の再検証は取得手段の制約により金額を確認できなかったため、confirmed/partial/unconfirmedのいずれかへ断定する根拠がない）
- unresolved_details:
  - 「約$20/月〜」の現在の正確性
  - 通貨（USD）の公式断定可否
  - 月払い/年払いの価格差
  - 地域価格差・税表示

2026-06-22時点の過去監査、および2026-08-13のmissing-fields-audit双方が示した`likely_value_if_known: partial`という見立て自体は否定されないが、今回の再検証でもそれを確定させる新たな根拠は得られなかったため、値付けは時期尚早と判断する。

---

## Part D — 将来のDB変更（今回は未実施）

### REQUIRED

なし（今回の再検証で「明確に誤り・古い」と断定できる事実は見つからなかった）。

### OPTIONAL

- `paidPlanNote`または`sources`に、Enterpriseプランが個別見積り（contact sales）であることを明記する（現行DBには明記がなく、今回の公式ページ確認で新たに確認できた事実）。
- 可能であればブラウザレンダリング環境（claude-in-chrome接続、または別の動的レンダリング手段）を用いて、次回タスクでinvideo.io/pricing/の実際の価格数値を確認する。

### NO_CHANGE

- `pricingModel`: "subscription" — 変更不要
- プラン名（Plus/Max/Generative/Elite）— 今回のヘルプ記事再確認と一致、変更不要
- クレジット月次リセット・繰越なしの記載 — 今回のヘルプ記事再確認と一致、変更不要
- 「約」「要公式確認」等の既存ヘッジ表現 — 過大な断定になっておらず、変更不要

---

## 今回のDB変更

**なし**（監査・再検証・分類提案のみ。`src/content/tools/invideo-ai.md`は無変更）
