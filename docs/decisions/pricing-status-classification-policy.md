# pricingStatus Classification Policy

- decided_at: 2026-08-13
- status: ADOPTED（分類ポリシーの正式化のみ。既存ツールの値変更は本決定に含まれない）
- 根拠監査:
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - docs/tasks/completed/2026-08-13-pricing-status-missing-fields-audit.md
  - reports/pricing-status-remaining-audit.md（2026-06-22、参考・非正式）
  - reports/pricing-status-completion-summary.md（2026-06-22、参考・非正式）

## 背景（repository証拠）

- `src/content/config.ts`に`pricingStatus`のzodフィールド定義は存在しない。schema上は非必須。
- `scripts/validate-data.mjs`の`ALLOWED_EXTENSION_FIELDS`にschema外の運用拡張フィールドとして登録済み。
- `PRICING_STATUS_ENUM`（同ファイル）: `confirmed | no_fixed_price | partial | service_changed | unconfirmed` の5値。
- `checkEnum()`は`value === undefined`の場合は即return（未設定は許容）。設定時のみenum外値をERROR。
- つまり「missing」と「invalid value」は明確に区別されており、missingは現状ノーオペ（許容）。
- pricingStatusを参照するUI/テンプレートは確認できず、DB内部の運用管理フィールドとして使われている。

本決定は上記の現行動作を変更しない。**分類基準を明文化するだけ**であり、schema必須化・validator変更は別タスクの対象とする。

## 決定事項 — 5値の定義

### confirmed

現在サイトに表示している価格の主張（プラン名・金額・課金単位等）が、権威ある最新の一次情報から十分に裏付けられている場合にのみ使用する。

「料金ページが存在する」ことと「confirmed」を同義にしない。表示中の具体的な数値・プラン構成が公式情報と一致していると断定できる場合のみ使用する。「約」「〜から」等のあいまい表現が残る場合はconfirmedにしない。

### partial

価格情報自体は存在し、有用な情報が得られているが、以下のいずれかにより一部が不完全・変動的・近似的・地域依存・プラン依存・未検証のまま残っている場合に使用する。

例:
- 「〜から」表記の最安値のみ判明
- 一部プランのみ確認済みで全プラン未確認
- 通貨換算が近似
- 地域による価格差
- 価格自体は判明しているが請求通貨・課金地域等の周辺要素が未確定

**partialを優先する場面**: プラン構造・価格帯など主要な情報は判明しており、残る不確実性が限定的・具体的に説明可能な場合。未確定点を注記（`pricingSourceNote`等）で明示できるならpartialが適切。

### unconfirmed

価格関連の主張を、現時点で権威ある一次情報から十分検証できない場合に使用する。

**partialとの境界**:
- 情報は存在するが一部が不完全 → partial
- 現時点で情報自体を信頼・検証できない（未取得、アクセス不可、矛盾する情報のみ）→ unconfirmed

### no_fixed_price

製品/サービスに、通常の形式で表現できる単一の意味ある固定公開価格が存在しない場合に使用する。

想定ケース:
- 見積もり制のエンタープライズ価格
- カスタム価格
- 安定した公開ベース価格を持たない使用量依存の価格体系

この値は限定的に運用する。「価格ページの一部情報が複雑」程度の理由で安易に使わない（その場合は通常partial）。

### service_changed

サービスが終了・大幅な仕様変更・当該コンシューマー向け提供が既に利用不可であるなど、通常の運用中サービスとしての価格分類がもはや意味を持たない場合に使用する。

**noindex/sitemap除外との関係**: service_changedは価格分類の状態であり、`noindex`設定やsitemap除外を自動的に発生させない。noindex・sitemap除外は既存の個別判断（例: haiperのsitemap.xml.ts明示除外、docs/audits/sitemap-build-diff-2026-08-13.md参照）に従う。pricingStatus=service_changedは、それらの判断が既に下された場合の価格面の記録として整合させるものであり、逆方向の自動化ルールは設けない。

## 未設定（missing）ポリシー

- pricingStatusは現行schema上、常に省略可能。**本決定はこれを必須化しない**。
- 省略が許容される場合: 十分な根拠が集まっていない新規ツール追加時、または上記5値のいずれにも該当を断定できない過渡的な状態。
- 明示的な値付けが望ましい場合: アクティブな商用ツールで、上記5値のいずれかに分類するための十分な根拠（公式価格ページ・公式ドキュメント等）が既に他フィールド（`pricingSourceUrl`/`pricingSourceNote`/`japanBilling.pricingNote`等）に存在するにもかかわらずpricingStatusが未設定の場合。この状態は将来の監査（audit-only）の対象とすべきギャップとして扱う。
- 推測でconfirmed/partialを埋めるより、根拠が不十分ならunconfirmedにするか未設定のまま残す方を常に優先する（憶測による値付け禁止）。

## 根拠の優先順位（evidence hierarchy）

1. 公式価格ページ
2. 公式の製品/ヘルプ/請求ドキュメント
3. 公式アカウント/請求UI上の証拠（安全に取得できる場合）
4. 既に公式情報に基づいてrepository内に記録済みの証拠（`pricingSourceUrl`/`pricingSourceNote`/`japanBilling`等の既存フィールド）
5. 二次情報（補強のみ、単独では最終根拠にしない）

この順序は既存repositoryの実務（`pricingSourceUrl`優先、二次情報は補足注記に留める運用）と一致させたものであり、新たなルールの発明ではない。

## verifiedAt/lastReviewedとの関係（freshness）

- pricingStatusの値そのものは、情報の「鮮度」を永続的には証明しない。confirmedであっても検証時点が古ければ再検証の対象になり得る。
- 価格情報を更新した場合は、関連する検証メタデータ（`lastReviewed`/`verifiedAt`/`japanBilling.pricingCheckedAt`等）も同時に更新することが望ましい。pricingStatusのみを変更し検証日を放置しない。
- 古い証拠を「confirmedと記録されているから現在も正しい」という理由だけで現行とみなさない。個別タスクで再検証が必要と判断した場合はVERIFY/HOLDを使う。
- 本決定は固定の再検証間隔（例: 90日ごと）を新設しない。repository内にそのような固定間隔ルールは現時点で確認できないため、発明しない。

## 特殊ケース

| ケース | 適用 |
|---|---|
| 無料専用サービス | 固定の単一価格が存在しないため、原則`no_fixed_price`。ただし無料プランの制約が明確に判明していれば、その旨は別フィールド（`freePlanNote`等）で記録し、pricingStatus自体は価格の有無の分類に専念する |
| OSS/自己ホスト型ツール | ローカル実行が無料でもクラウドAPI等の有料経路が別途存在する場合、両者を実テストせずに断定しない。両経路の実態が未検証ならpartial/unconfirmedを優先しconfirmedにしない（stable-diffusionが該当例） |
| エンタープライズ/カスタム価格 | `no_fixed_price`が原則。ただし個人向け固定プランが併存する場合はそのプランのみを対象にpartial/confirmedを検討し、`no_fixed_price`を安易に全体へ適用しない |
| サービス終了/大幅変更 | `service_changed`。noindex/sitemap除外は別判断（上記参照） |
| 地域/通貨のあいまいさ | 金額自体は判明していても請求通貨・地域差が未確定ならpartial（synthesiaが該当例） |
| anti-bot/HTTPブロックにより価格ページ確認不可 | 確認不可の事実をVERIFY_REQUIREDとして記録し、確認できるまでunconfirmedのまま維持するか未設定を維持する。断定的な値を推測で入れない（kling-aiが該当例） |
| クレジット/使用量制課金 | ベース価格・クレジット単価等が公式に明示されていればpartial/confirmedを検討。専用料金ページ自体が確認できない、通貨が未確定等の場合はVERIFY_REQUIRED（tensor-artが該当例） |
| 公式価格ページが一時的にアクセス不可 | 一時的な障害と断定できない限り、直近の検証済み値を維持しつつ次回タスクで再確認する旨をHOLD/VERIFYとして記録する。アクセス不可を理由に値を書き換えない |

## 判定ロジック（future agent向け）

1. 対象ツールの価格に関する権威ある一次情報が、直接または既存フィールド経由で入手できるか？ できなければ→ unconfirmedまたは未設定のまま。
2. 主要な価格情報（プラン・金額帯）は判明しているが、一部の周辺要素（通貨・地域・プラン網羅性）が未確定か？ → partial。
3. 表示中の主張全体が十分な根拠で裏付けられているか？ → confirmed。
4. そもそも単一の意味ある固定価格が存在しない構造か？ → no_fixed_price。
5. サービス自体が終了・大幅変更済みで通常分類が意味を持たないか？ → service_changed。
6. 上記いずれにも自信を持って当てはめられない場合、推測で値を入れず、unconfirmedまたは未設定を維持する。

## validatorとの関係（現状維持）

- `scripts/validate-data.mjs`は現在、pricingStatus未設定を許容し、設定時のみenum外値をERROR判定する。**本決定はこの挙動を変更しない**。
- pricingStatusを必須項目にする、あるいは特定条件（例: アクティブ商用ツールかつ根拠フィールドあり→必須）で警告を出すようにするには、`scripts/validate-data.mjs`の変更を伴う**別タスク**が必要。本決定はその実施を決定するものではなく、必要性の記録のみを行う。

## 2026-08-13監査（7ツール）の紐付け

`docs/audits/pricing-status-missing-fields-audit-2026-08-13.md`の分類は、本ポリシーの評価基準（evidence hierarchy・partial/unconfirmed境界）と整合する。今回はDB変更を行わない。

- SAFE_TO_SET_FROM_CURRENT_EVIDENCE（likely_value: partial、将来の個別タスクで値付け候補）:
  - d-id
  - heygen
  - synthesia
- VERIFY_REQUIRED（値付け前に追加検証が必要）:
  - invideo-ai
  - kling-ai
  - stable-diffusion
  - tensor-art

## How to apply

- 新規ツール追加時・既存ツールの価格情報更新時は、上記「判定ロジック」に従ってpricingStatusを分類する。
- 根拠が不十分な場合は推測せず、unconfirmedまたは未設定のまま次回監査に委ねる。
- pricingStatusの値のみを変更する場合でも、根拠となった検証日（`lastReviewed`/`verifiedAt`/`japanBilling.pricingCheckedAt`）を同時に更新する。
- schema必須化・validator強化を行いたい場合は、本決定を変更するのではなく、別の決定文書または別タスクとして提起する。
