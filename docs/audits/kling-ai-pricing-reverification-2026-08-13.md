# Kling AI pricingStatus再検証（AUDIT ONLY）

作成日: 2026-08-13
対象: `src/content/tools/kling-ai.md`
方針: DB変更なし。監査・分類・提案のみ。

---

## Part A — 旧HTTP 446問題の再評価

過去監査（2026-06-21時点、`docs/audits/pricing-status-missing-fields-audit-2026-08-13.md`記載）は「公式料金ページがHTTP 446で直接確認不可」としていた。本タスクで現状を再テストした。

### WebFetchツールでの結果

- `https://kling.ai/membership/membership-plan` → **HTTP 446 Unknown Status**（本文取得不可）
- `https://kling.ai/docs/user-policy` → **HTTP 446 Unknown Status**（本文取得不可）
- `https://kling.ai`（トップページ） → **HTTP 446 Unknown Status**（本文取得不可）

→ WebFetchツール経由では、旧問題が**現在も再現する**。

### curl（通常UA付与）での結果

同一URLをcurl（`Mozilla/5.0 ... Chrome/120.0`のUser-Agent付与）で直接取得したところ、いずれも**HTTP 200**が返った。

- `https://kling.ai/membership/membership-plan` → HTTP 200、245,050 bytes
- `https://kling.ai/docs/user-policy` → HTTP 200、516,930 bytes
- `https://kling.ai` → HTTP 200

ただし取得したHTML本文を検査したところ、両ページとも`<body>`直下がほぼ空でJavaScriptバンドル（`<script>`タグ複数、membership-planページで6件、user-policyページで18件）のみが埋め込まれたSPA（クライアントサイドレンダリング）構造であり、価格・プラン名・クレジット数等のテキストは静的HTML内に存在しなかった（`grep`で`$`, `credit`, `USD`, `Standard`, `Premier`, `Ultra`等のパターンを検索したが実質ヒットなし）。

### 結論（Part A）

- 旧HTTP 446問題は、**WebFetchツール固有では引き続き発生する**（ボット判定またはAnthropicのfetcher UA/IPに対するブロックの可能性、断定はしない）。
- 一方、一般的なUser-Agentでの直接アクセス自体は現在**HTTP 446ではなくHTTP 200**が返ることを確認した＝「サイト全体がアクセス不能」という単純な旧状態ではないことが判明した。
- ただし実質的な結果は変わらない：ページがSPA構造のため、価格情報はクライアントサイドJS実行後にのみレンダリングされ、静的HTML取得（curl・WebFetch問わず）では**価格情報を抽出できない**。
- 本セッションではclaude-in-chromeブラウザ拡張が未接続（`tabs_context_mcp`で確認、"Browser extension is not connected"）のため、JSレンダリング後の実際の価格情報を取得する手段がない。
- **したがって「旧HTTP 446問題は解消していない」と結論する。** 正確には、単純なアクセス拒否から「SPAレンダリング制約＋WebFetch固有のブロック」という、より正確な性質の同一結果（価格情報抽出不可）に置き換わった。

---

## Part B — アクセス検証詳細

| 項目 | 結果 |
|---|---|
| official URL attempted | https://kling.ai/membership/membership-plan, https://kling.ai/docs/user-policy, https://kling.ai |
| HTTP/access結果（WebFetch） | 446 Unknown Status（3件とも） |
| HTTP/access結果（curl, 標準UA） | 200（3件とも） |
| 価格情報が有用な形でレンダリングされるか | いいえ（SPA、静的HTMLに価格テキストなし） |
| ログイン要否 | 不明（会員プラン価格はDB記載上「ログイン後表示」とされているが、ログイン画面自体には未到達のため未検証） |
| クライアントサイドレンダリングが抽出を妨げるか | はい（`<body>`直下ほぼ空、JSバンドルのみ） |
| 地域/ログイン/アカウント状態が表示に影響するか | 未検証（レンダリング自体に到達できず判定不能） |

---

## Part C — 検証を試みた事実（結果: 未確定）

以下はいずれも公式一次情報から確認できなかった（推測・第三者情報での補完は行わない）。

- 無料プランの有無: 未確認（DB記載の「1日66クレジット程度」は第三者情報由来のまま）
- プラン名: 未確認（DB記載のStandard/Pro/Premier/Ultraは第三者情報由来のまま）
- 月額価格: 未確認
- 年払い価格: 未確認
- 通貨: 未確認（DB記載のUSDは第三者情報由来のまま）
- プランごとのクレジット数: 未確認
- クレジットリセット周期: 未確認
- クレジット/トップアップの別売り有無: 未確認
- モデル/機能による価格差: 未確認
- プランによる透かし/エクスポート条件差: 未確認
- 地域別価格差: 未確認
- 税表示（内税/外税）: 未確認
- エンタープライズ/カスタム価格有無: 未確認

---

## Part D — 現行DBとの比較

### 現行DB (`src/content/tools/kling-ai.md`) の主張

- pricingModel: `subscription_credit`
- freePlan: `limited`
- lowestPaidPlan: 「要公式確認（会員プラン価格はログイン後表示・USD建て）」
- currency: `USD`
- pricingStatus: **未設定**
- lastReviewed/verifiedAt: `2026-06-21`
- officialSourceUrl: `https://kling.ai/membership/membership-plan`
- pricingSourceUrl/pricingSourceNoteフィールド: なし（sourceRefs/sourcesに汎用URLのみ）
- 本文中の料金表（Standard/Pro $25.99/Premier $64.99/Ultra $127.99〜$180等）は「第三者情報源をもとにした参考情報」と明記され、公式で断定していない
- commercialUseNote・pricingDecision.pricingNote等、複数箇所で「公式ページへの直接アクセスはHTTP 446により確認できなかった」旨を明示

### 精度評価

- 現行DBの表現は、価格の断定を避け「第三者情報源」「要公式確認」を繰り返し明示しており、**現状の検証結果と矛盾しない**（過大な断定は元々していない）。
- 本タスクにより、HTTP 446問題の性質がより正確に判明した（WebFetch固有のブロック＋SPA構造による恒常的な抽出不能）が、DB記載の「HTTP 446により確認できなかった」という事実自体は依然として正しい（WebFetch経由では今も446が発生するため）。
- 具体的な金額（$25.99等）が公式情報と一致するかは、今回も検証不能のまま。

---

## Part E — pricingStatus判定

### 判定ロジック適用

1. 権威ある一次情報が直接または既存フィールド経由で入手できるか？ → **できない**（WebFetch経由で446、curl経由でもSPAのためレンダリング後価格情報を取得できず、ブラウザ拡張も本セッション未接続）
2. → 判定ロジック手順1の時点で「unconfirmedまたは未設定のまま」に該当

### 推奨: VERIFY_REQUIRED

- ポリシー該当箇所: `docs/decisions/pricing-status-classification-policy.md`の特殊ケース表「anti-bot/HTTPブロックにより価格ページ確認不可」項目に完全一致（"kling-aiが該当例"として明記済み）。
- 「一時的な障害と断定できない限り、直近の検証済み値を維持しつつ次回タスクで再確認する旨をHOLD/VERIFYとして記録する」という同ポリシーの指示にも合致。
- unconfirmedへの格上げも検討したが、ポリシー上unconfirmedは「情報自体を信頼・検証できない」場合に用いる値であり、DB記載自体は既に十分ヘッジされ矛盾がないため、値を明示的に設定するより**VERIFY_REQUIREDを維持し次回検証に委ねる**判断とした。
- confidence: 高い（判定根拠は明確。今回の制約は技術的アクセス手段の欠如によるものであり、公式情報の内容自体に矛盾があるわけではない）
- unresolved_details: 会員プラン価格・プラン名・クレジット数等すべて公式一次情報で未確認のまま

---

## Part F — 将来のDB変更提案

### REQUIRED

なし（今回の再検証で誤りと確定した事実はない）

### OPTIONAL

- `pricingSourceUrl`/`pricingSourceNote`フィールドを新規に追加し、「WebFetch経由でHTTP 446、curl直接アクセスは200だがSPA構造のため価格テキスト抽出不可（2026-08-13再確認）」という具体的な技術的制約を記録すると、次回監査者が同じ検証を繰り返す手間を省ける。
- ブラウザ自動化環境（claude-in-chrome接続済みセッション）でのJSレンダリング後の実地確認を、将来タスクの推奨事項として明示的に残す。

### NO_CHANGE

- pricingModel、freePlan、currency、lowestPaidPlanの表現、commercialUseNote、pricingDecision.pricingNote、本文の料金表とその「参考情報」の明示、sourceRefs/sourcesの記載はいずれも現状の検証結果と矛盾せず、変更不要。

---

## 今回のDB変更

**なし**（監査・分類・提案のみ。`src/content/tools/kling-ai.md`は無変更）
