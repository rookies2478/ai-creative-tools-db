# pricingStatus未設定7ツール監査（AUDIT ONLY）

作成日: 2026-08-13
対象: src/content/tools/{d-id, heygen, invideo-ai, kling-ai, stable-diffusion, synthesia, tensor-art}.md
方針: DB変更なし。監査・分類・提案のみ。

---

## Part A — pricingStatusの現行セマンティクス（repository証拠）

- `src/content/config.ts`にpricingStatusのzodフィールド定義は**存在しない**。schema上は未定義（型検証対象外）。
- `scripts/validate-data.mjs`側で「実運用で使われている拡張フィールド」として認識され、コメント（281-287行）に「22ファイルで使用・enum的な料金確認状態」と明記。
- `ALLOWED_EXTENSION_FIELDS`（288-294行）にpricingStatusを含む5フィールドが登録され、これ以外の未知フィールドはWARNING対象になる仕組み（=schemaでは無いが運用上は許容フィールドとして明示的にホワイトリスト化）。
- `PRICING_STATUS_ENUM`（295-301行）: `confirmed | no_fixed_price | partial | service_changed | unconfirmed` の5値。
- `checkEnum()`（336-344行）: `if (value === undefined) return;` — **未設定は許容**。設定されている場合のみ、enum外の値をERROR判定。
- つまり「missing」と「invalid value」は明確に区別され、missingはノーオペ（許容）、invalid値のみERROR。
- フォールバック挙動（未設定時にUI/テンプレートが代替表示する仕組み）は確認できず。grep範囲でpricingStatusを参照するUI側テンプレートは見当たらず、DB内部の運用管理フィールドとして使われている。
- validate:data以外の検証（validate:publish、validate:scope等）でpricingStatusへの依存は確認できず。

**結論**: pricingStatusは現行schemaでは非必須の運用拡張フィールド。未設定は技術的に完全に許容されており、validate:dataでもERROR/WARNING化されない。

---

## Part B / 分類 — 7ツール個別

### 既存repository証拠（過去監査）

`reports/pricing-status-remaining-audit.md`（2026-06-22作成）と`reports/pricing-status-completion-summary.md`（同日）が、当時のDB全26件中「未設定4件」として**invideo-ai / kling-ai / stable-diffusion / tensor-art**を個別に検討済み。各ツールについて`nextSuggestedStatus: partial`を候補視しつつ、**明示的にdbUpdateRecommended: hold**と結論している。d-id/heygen/synthesiaは当時DB未収録のツールで、この監査の対象外（後日追加されたツール）。

### 1. invideo-ai

- 現在値: pricingModel="subscription", freePlan=true, lastReviewed/verifiedAt="2026-06-15"
- pricingSourceUrl/pricingSourceNoteフィールドなし
- 過去監査の保留理由: 最安有料プラン「約$20/月〜」の「約」表記が未解消、公式URLの断定的な根拠なし
- 現ファイルのlastReviewedは2026-06-15のまま変化なし＝過去監査の保留理由は未解消
- **分類: VERIFY_REQUIRED**
- likely_value_if_known: partial（過去監査のnextSuggestedStatus）
- 検証必要事項: invideo.io/pricing/ で最安プラン月額の断定表記（「約」を外せるか）を確認

### 2. kling-ai

- 現在値: pricingModel="subscription_credit", freePlan="limited", lastReviewed/verifiedAt="2026-06-21"
- pricingSourceUrl/pricingSourceNoteフィールドなし（sourceUrlsに汎用URLあり）
- 過去監査の保留理由: 公式料金ページがHTTP 446で直接確認不可（2026-06-21時点）、前回確認結果との矛盾未解消
- 現ファイルのlastReviewedは2026-06-21のまま変化なし＝アクセス可否の再確認記録なし
- **分類: VERIFY_REQUIRED**
- likely_value_if_known: partial（過去監査のnextSuggestedStatus）
- 検証必要事項: kling.ai公式料金ページへの直接アクセス可否の再確認、現行価格の断定可否

### 3. stable-diffusion

- 現在値: pricingModel="local_free", pricingSourceUrl="https://platform.stability.ai/pricing", pricingSourceNote記載あり（ローカル/API二重構造・要確認）, lastReviewed/verifiedAt="2026-07-11"
- lastReviewedは2026-07-11に更新されているが、これは同日実施のmeta description修正タスク（stable-diffusion-meta-description-fix、2026-08-13完了記録参照）に伴うものであり、pricingStatus判断に必要な「ローカル無料＋クラウドAPI二重構造の実テスト」は実施記録なし
- 過去監査の保留理由（ローカル/クラウド二重構造は実テストなしに断定しない）は未解消
- **分類: VERIFY_REQUIRED**
- likely_value_if_known: partial（過去監査のnextSuggestedStatus）
- 検証必要事項: クラウドAPI料金体系の実テストまたは公式ページでの断定可能な情報確認

### 4. tensor-art

- 現在値: pricingModel="subscription_credit", pricingSourceUrl="https://tensor.art/event/proupdate"（イベントページ、恒久性に懸念）, currency記載なし, lastReviewed/verifiedAt="2026-06-17"
- 過去監査の保留理由（専用料金ページ未確認、currency=unknown）は未解消（現ファイルにcurrency確定記載なし）
- **分類: VERIFY_REQUIRED**
- likely_value_if_known: partial（過去監査のnextSuggestedStatus）
- 検証必要事項: tensor.art/pricing等の専用公式料金ページの存在確認、currency確定

### 5. d-id

- 現在値: pricingModel="subscription", freePlanNote詳細（Trial/Lite・透かし・15秒単位課金）、japanBilling.pricingUrl="https://www.d-id.com/pricing/studio/"、pricingCheckedAt="2026-07-13"、pricingNote="現行価格・通貨は公式料金ページでご確認ください"（明示的に価格断定を避ける記載）
- lastReviewed/verifiedAt="2026-07-05"（japanBilling.pricingCheckedAtは2026-07-13でより新しい）
- プラン構成・トライアル条件は公式FAQで確認済みとpricingNoteに明記されているが、現行価格・通貨自体は「要公式確認」と明言
- 既存partial分類ツール（microsoft-designar、clipdrop、dalle等）と同様の「プラン構造は判明・独立料金額の断定は不可」パターンに一致
- **分類: SAFE_TO_SET_FROM_CURRENT_EVIDENCE**
- likely_value_if_known: partial
- evidence: japanBilling.pricingNoteが価格・通貨の断定不可を明言。既存partial判定基準（プラン構造判明・独立料金未確定）に合致
- 検証必要事項: なし（現行値としてはpartialが妥当。confirmed化には別途公式価格断定が必要）

### 6. heygen

- 現在値: pricingModel="subscription", japanBilling.pricingUrl="https://www.heygen.com/ja-jp/pricing"、pricingCheckedAt="2026-07-13"、pricingNote="料金は米ドル表示です。日本円での実際の支払額は...変動します...最終金額は公式購入画面をご確認ください"
- 具体的な月額金額はpricingNoteに記載なし（USD表示という事実のみ確認、金額断定なし）
- d-idと同型パターン（公式料金ページ存在・価格自体は断定回避）
- **分類: SAFE_TO_SET_FROM_CURRENT_EVIDENCE**
- likely_value_if_known: partial
- evidence: pricingNoteが金額断定を明示的に避けている。既存partial判定基準に合致
- 検証必要事項: なし（現行値としてはpartialが妥当）

### 7. synthesia

- 現在値: pricingModel="subscription", japanBilling.pricingUrl="https://www.synthesia.io/pricing"、pricingCheckedAt="2026-07-13"、pricingNote="Starter：年払い$18/月相当、月払い$29/月...日本語公式ページでは日本円価格（Starter ¥4,690/月等）が表示されますが、実際の請求通貨がJPYかは公式に明記されておらず要確認"
- 具体的な金額（$18/$29、¥4,690）は明記されているが、**実際の請求通貨がJPYかは未確認**と明言＝価格自体は判明・通貨確定は未了
- d-id/heygenより情報は具体的だが、通貨確定という別の未解決要素がある
- 過去に`docs/research/synthesia-free-download-verification-2026-07-26.md`で公式pricing WebFetch確認済みの実績あり（別トピックだが同ページの信頼性を補強）
- **分類: SAFE_TO_SET_FROM_CURRENT_EVIDENCE**
- likely_value_if_known: partial
- evidence: 金額は判明済みだが請求通貨の確定待ちという点で「一部確認済み・完全断定不可」というpartialの定義に合致
- 検証必要事項: なし（現行値としてはpartialが妥当。confirmed化には請求通貨の確定が必要）

---

## Part C — 系統的DB論点

- **全アクティブツールへの必須化**: 現行schema・validatorのいずれも必須化していない。missingはERROR/WARNING化されない設計。必須化する明確な方針決定は repository内に見当たらない。
- **DQ Check失敗として扱うべきか**: 現行のData Quality Check（validate:data）はpricingStatusを未設定でもPASS対象としており、DQ失敗扱いにする場合はscripts/validate-data.mjsの変更（今回スコープ外）が必要。
- **現行validatorの一貫性**: enumチェック自体は一貫している（未設定許容・invalid値のみERROR）。矛盾や表記揺れは検出されず（過去監査でも「不正値・表記揺れ 0」と記録）。
- **必須化した場合の擬陽性リスク**:
  - オープンソース/自己ホスト型ツール（stable-diffusionのlocal_free等）は「固定価格」概念自体が薄く、一律必須化するとconfirmed/partialの区別が形式的になる懸念
  - サービス終了ツール（haiper、service_changed）は継続的な価格確認自体が無意味なため、必須化は運用上の空値埋めを誘発するリスク
  - カスタム/エンタープライズ料金ツール（現行7件中には明確な該当なしだが、将来的にtensor-art等のcredit制ツールで発生し得る）は「confirmed」の定義自体が曖昧になりうる
  - 無料専用ツール（現行7件中には該当なし）
- **enum/ポリシーの文書化状況**: PRICING_STATUS_ENUMの5値定義はvalidate-data.mjs内のコードコメントのみで、docs/decisions配下に正式なポリシー文書は確認できず。各値の意味（confirmed/partial/unconfirmed/no_fixed_price/service_changedの使い分け基準）は`reports/pricing-status-completion-summary.md`の「5. 表示方針」に運用ルールとして記載されているが、これはreports/（監査レポート）であり正式な決定文書（docs/decisions/）ではない。

**結論**: 現行は「schema必須ではない・validatorも許容・運用ルールはreports止まり」という状態。これ自体は矛盾ではないが、正式なポリシー文書（docs/decisions/）が存在しない点はSCHEMA_OR_POLICY_GAPとして記録に値する。

---

## 分類サマリー

| ツール | 分類 | likely_value | 検証要否 |
|---|---|---|---|
| d-id | SAFE_TO_SET_FROM_CURRENT_EVIDENCE | partial | 不要 |
| heygen | SAFE_TO_SET_FROM_CURRENT_EVIDENCE | partial | 不要 |
| synthesia | SAFE_TO_SET_FROM_CURRENT_EVIDENCE | partial | 不要 |
| invideo-ai | VERIFY_REQUIRED | partial（未確定） | 要（「約$20/月〜」の断定可否） |
| kling-ai | VERIFY_REQUIRED | partial（未確定） | 要（公式ページHTTP 446再確認） |
| stable-diffusion | VERIFY_REQUIRED | partial（未確定） | 要（クラウドAPI実テスト） |
| tensor-art | VERIFY_REQUIRED | partial（未確定） | 要（専用料金ページ・currency確認） |

INTENTIONAL_OMISSION / SCHEMA_OR_POLICY_GAP / REVIEW に該当する個別ツールはなし（ただしPart Cの通り、系統的にはSCHEMA_OR_POLICY_GAPが存在する）。

---

## 今回のDB変更

**なし**（監査・分類・提案のみ）
