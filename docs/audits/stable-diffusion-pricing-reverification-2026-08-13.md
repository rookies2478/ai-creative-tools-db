# Stable Diffusion pricingStatus再検証（AUDIT ONLY）

作成日: 2026-08-13
対象: `src/content/tools/stable-diffusion.md`
方針: DB変更なし。監査・分類・提案のみ。

---

## Part A — 現行DBエントリの価格主体の特定

通常のSaaS型ツールとして扱う前に、現行DBエントリが実際に何を指しているかを先に特定する。

### 現行フィールドの検査結果

- `officialUrl`: `https://stability.ai`（Stability AI企業サイト。特定の単一製品URLではない）
- `pricingModel`: `local_free`（ローカル無料実行を前提とした値）
- `freePlan`: `true`
- `platforms`: `["local", "api"]`（ローカル実行とAPI利用の両方を明記）
- `pricingSourceUrl`: `https://platform.stability.ai/pricing`（Stability AI Platform=APIのURL。ローカル利用の価格ページではない）
- `paidPlanNote`: 「クラウドAPI経由（Stability AI Platform）は別途課金。2026年6月時点の公式案内では$20/月で6,000クレジット等」と、ローカル無料とAPI課金を明確に別建てで記載
- `commercialUseNote`/`usagePolicy.commercialUseByPlan`: モデルバージョン（SD 1.x/2.x/SDXL＝CreativeML Open RAIL-M、SD 3.x/3.5＝Stability AI Community License）ごとにライセンスが異なる旨を明記。単一の「商用利用可否」に単純化していない
- `sourceRefs`/`sources`: 公式ライセンスページ・公式サイト・公式Platform料金ページに加え、GitHub（CompVis、AUTOMATIC1111）・ComfyUI公式ドキュメントという**非公式実装のドキュメント**も混在（Stability AI自身が提供する情報ではない、フロントエンドツールの一次ドキュメントという位置づけ）
- `japanBilling.providerName`: 「Stability AI（Stable Diffusionはオープンモデル群の名称）」と、**モデルであってサービスではない**ことを既に明記
- `japanBilling.billingCurrency`: 「利用形態により異なる（ローカル無料／API USD従量）」
- `japanBilling.pricingNote`: 「Stable Diffusionは単一の有料サービスではありません。ローカル実行は無料（ライセンス条件あり）、公式API（Stability AI Platform）は米ドル建て従量課金、各社ホスティングサービスは各社の料金体系に従います。月額サブスクリプションとしての単純比較は適切ではありません。」と**明示的に混在を宣言**している
- `japanBilling.billingCategory`: `E`（他ツールと異なる特殊区分と推測される。区分定義自体は本タスクのスコープ外のため未検証）

### 分類結果

**mixed/ambiguous（混在）**。より具体的には、DBエントリは以下3層を1レコードに統合している。

1. **open model/local use**: Stable Diffusionというオープンモデル群自体（モデルウェイト公開、ローカル実行、ライセンス条件付き）
2. **Stability AI API**: Stability AI Platform（`platform.stability.ai`）が提供する有償の生成API
3. （限定的に）**third-party implementation docs**: AUTOMATIC1111・ComfyUIという非公式フロントエンドの公式ドキュメントへの参照（価格情報ではなく技術ドキュメントとしての引用であり、価格主体としては該当しない）

DreamStudio等、Stability AI運営の別ホスト型製品への言及は本文中に一度だけ現れる（「Dream Studioなどクラウドサービス経由」）が、`pricingSourceUrl`等の正式フィールドはDreamStudioを対象としておらず、現行DBはDreamStudioを独立した価格主体として扱っていない。

**重要**: 本エントリのDB作成者自身が、この混在状態を`japanBilling.pricingNote`で明示的に自覚・宣言している。これは「通常のSaaS型ツールとして誤って単純化された」ケースではなく、「混在を認識した上で単一レコードに収めた」ケースである。

---

## Part B — 公式一次情報の再検証

### B-1. ローカル/オープンモデルのライセンス（`https://stability.ai/license`）

- URL: `https://stability.ai/license`
- 取得方法: WebFetch
- アクセス結果: **成功**（静的にレンダリングされたライセンス説明文を取得できた。Kling AIやStable Diffusion Platform料金ページと異なりSPAブロックの問題はなかった）
- 確認日: 2026-08-13
- 確認できた事実:
  - **Community License（無料）**: Stable Diffusion 3.5 Suite、SDXL Turbo、その他Core Modelsに適用
  - 個人・開発者・中小企業・団体で**年間収益が100万米ドル未満**の場合は無料（収益の発生源を問わない）
  - 商用利用は当該収益しきい値未満であれば許可される（ライセンス文言を引用: "Use of the Core Models is free for everyone, unless...you or your organization generate over USD $1M...of annual revenue"）
  - **ローカル/セルフホスト利用**は、しきい値を満たすユーザーには完全に無料・無制限
  - **Enterprise License（有料）**: 年間収益100万米ドル超の団体向け。商用利用権・実装サポート・カスタムトレーニング等のオプションを含む。価格は要問い合わせ（カスタム）
  - 派生物（ファインチューン・LoRA）は親モデルと同一条件を継承
  - このページは**SD 1.x/2.x等の旧バージョンの個別ライセンス条件には言及していない**（現行モデル群のみを詳細に説明）

### B-2. Stability AI Platform（API）料金ページ（`https://platform.stability.ai/pricing`）

- URL: `https://platform.stability.ai/pricing`
- 取得方法: WebFetch（失敗）、curl（標準UA、200だが本文なし）
- アクセス結果:
  - WebFetch: ページタイトルのみ取得、価格情報の抽出不可
  - curl直接アクセス: HTTP 200、1,644 bytesのみ。HTML本文は`<div id="app">`のみの空のReact SPAシェルで、Cloudflare Bot Management challengeスクリプト（`__CF$cv$params`、`/cdn-cgi/challenge-platform/`）が埋め込まれている
- 確認日: 2026-08-13
- 確認できた事実: **なし**（プラン名・価格・クレジット数・通貨いずれも静的に抽出不可。Cloudflareのボット検知チャレンジにより、通常のHTTPクライアントでは実際の価格コンテンツに到達できない構造と判断される）
- claude-in-chromeブラウザ拡張は本セッション未接続のため、JSレンダリング後の実地確認手段もなし

### B-3. ホスト型製品（DreamStudio等）

現行DBはDreamStudioを独立した価格主体として扱っていないため（Part A参照）、本タスクでは個別検証を行わない。

---

## Part C — ローカル/オープンモデル利用の詳細

| 項目 | 結果 |
|---|---|
| モデル入手可否 | 公式に確認済み（Community Licenseの下で公開） |
| 「無料」の意味 | モデルアクセス自体は年間収益100万ドル未満であれば無料。**GPU等の計算コストとは別**。DBの`freePlanNote`（「ローカル実行は無料（GPU搭載PCと環境構築が必要）」）は既にこの区別を明示しており、計算コストを「無料」に含めていない |
| ライセンス条件（商用利用関連） | Community License: 年間収益100万ドル未満は商用利用可、100万ドル以上はEnterprise License（カスタム価格）が必要。公式に確認済み（B-1） |
| 旧バージョン（SD1.x/2.x/SDXL、CreativeML Open RAIL-M） | 今回参照した公式ライセンスページには個別記載なし。DBの記載自体も「場合があります」等のヘッジ表現に留まり断定していないため、今回の未確認は既存の慎重な記述と矛盾しない |

---

## Part D — Stability AI API/クラウドの詳細

| 項目 | 結果 |
|---|---|
| 公式API/プラットフォームの提供有無 | 提供されていることは確実（`platform.stability.ai`ドメインの存在、DBの`paidPlanNote`・`pricingSourceUrl`も参照済み） |
| 価格メカニズム | 未確認（クレジット制との言及はDB記載のみで、今回公式一次情報からの再確認はできず） |
| 通貨 | 未確認（USD建てとのDB記載は今回検証できず） |
| 固定公開価格の存在 | 未確認（Cloudflareチャレンジによりページ内容に到達不可） |
| モデルによる価格差の有無 | 未確認 |
| ログイン要否 | 不明（チャレンジページで止まるため未到達） |
| 現行価格の断定可否 | **不可**（$20/月・6,000クレジットというDB記載はあくまで「2026年6月時点の公式案内」という時点付きの参考情報として既にヘッジされており、今回の検証でもこの数値を裏付けることも否定することもできなかった） |

---

## Part E — 現行DBとの比較

| 項目 | 評価 |
|---|---|
| pricingModel: `local_free` | ローカル利用を主軸とした値であり、B-1の公式ライセンス確認結果と矛盾しない。ただし`platforms`に`api`も含まれるため、単一の`pricingModel`値がAPI側の性質を表現できていない（後述のモデリング論点） |
| pricingNote（`japanBilling`） | 「単一の有料サービスではない」という記述はB-1・B-2の検証結果と完全に整合する。過大な断定なし |
| free_plan | `true`。B-1により、収益しきい値未満の個人・小規模利用者にとって「ローカル利用が無料」という主張は公式に裏付けられた |
| currency: `USD` | API側の通貨としては未検証（B-2）。ローカル利用には通貨の概念自体が本来不要（無料）であるため、フィールドの意味がやや曖昧 |
| verifiedAt: `2026-07-11` | 本タスクでは更新しない（指示どおり）。ライセンス面は今回2026-08-13時点で再確認でき内容が一致したため、ライセンス面に限れば`verifiedAt`は引き続き意味を持つと言える。ただしAPI価格面は前回同様未検証のままであり、API面について`verifiedAt`が「検証済み」を意味すると読むと誤解を招く |
| 総合評価 | **conceptually mixed（概念的に混在）かつappropriately hedged（十分にヘッジされている）**。事実として誤っている記載は見つからなかった。ローカル/オープンモデル経済性と商用API価格を1つの`pricingModel`/`pricingStatus`に圧縮しようとしている点が構造的な課題として残る |

---

## Part F — pricingStatus判定

### 判定ロジック適用

1. 権威ある一次情報が直接または既存フィールド経由で入手できるか？
   - ライセンス（ローカル利用の主張の根拠）→ **できる**（B-1で確認済み）
   - API価格 → **できない**（B-2、Cloudflareチャレンジにより到達不可）
2. 主要な価格情報は判明しているが周辺要素が未確定か？
   - DBが実際に主張している中心的な価格主張は「ローカル実行は無料（ライセンス条件あり）」であり、これはB-1で確認済み
   - API側の$20/月等の具体的数値は、DB自身が「2026年6月時点の公式案内」という参考情報の位置づけに留めており、確定した主張として扱っていない
   - このため、DBが実際に主張している範囲では「主要情報は判明、一部周辺要素（API側の現行価格）が未確定」という**partial**の定義に該当する

### 推奨: partial

- **confirmed**にしない理由: API側の現行価格を検証できておらず、`platforms: [local, api]`が示すとおりAPI利用もDBのスコープに含まれているため、全体としての完全な裏付けはない
- **unconfirmed**にしない理由: DBが実際に主張している中心的事実（ローカル無料実行・ライセンス条件・収益しきい値）は今回公式一次情報で確認でき、「情報自体を信頼・検証できない」状態ではない
- **no_fixed_price**にしない理由: 本タスクの指示どおり、API価格が変動するという理由だけでこの値を選ばない。またローカル利用側には「固定価格が存在しない」のではなく「（条件付きで）無料」という明確な状態があるため、no_fixed_priceの定義（固定の意味ある価格が存在しない）には正確には合致しない
- **VERIFY_REQUIRED**にしない理由: 前回監査時点（stable-diffusion-meta-description-fix、2026-07-11のlastReviewed更新）以降、ローカル/ライセンス面については本タスクで実際に公式一次情報の再確認ができ、DB記載との整合性を確認できた。「検証手段がなく判断できない」状態からは前進しているため、VERIFY_REQUIREDに留め置く必然性は薄い
- policy_basis: `docs/decisions/pricing-status-classification-policy.md`の特殊ケース表「OSS/自己ホスト型ツール」（"ローカル実行が無料でもクラウドAPI等の有料経路が別途存在する場合、両者を実テストせずに断定しない。両経路の実態が未検証ならpartial/unconfirmedを優先しconfirmedにしない（stable-diffusionが該当例）"）に基づく。本タスクでローカル側の実態確認は前進したが、API側は未検証のまま残るため、confirmedではなくpartialとする判断は同ケースの趣旨と整合する
- confidence: 中（ローカル/ライセンス面は高い確信度で確認できたが、API側は依然未検証であり、"partial"の中でも不確実性の残余が大きい）
- unresolved_details: Stability AI Platformの現行クレジット単価・プラン構成・通貨・現行の$20/月表記の正確性

---

## POLICY_OR_MODELING_ISSUE

- **exists: yes**
- **issue**: `pricingStatus`はツールDB全体で単一のenum値として運用されており（`confirmed | partial | unconfirmed | no_fixed_price | service_changed`）、1レコード1価格主体を暗黙の前提としている。しかしStable Diffusionは、(1) 無料・ライセンス条件付きのオープンモデル、(2) Stability AI運営の有償API、という**性質の異なる2つの価格主体**を1つのツールレコードに統合しており、単一の`pricingStatus`値では「ローカルは十分に確認できたが、APIは確認できていない」という状態を正確に表現できない。今回`partial`と判定したのはこの2層を平均化した折衷であり、モデリングの根本的な曖昧さを解消するものではない。
- **recommendation**: 将来的に、(a) 現状維持（`japanBilling.pricingNote`等の既存の注記で混在を説明する運用を継続し、`pricingStatus`は折衷値として扱う）か、(b) ローカル/オープンモデルとStability AI API/DreamStudioを別ツールレコードまたは別フィールド階層として分離するか、のいずれかをユーザー/運用判断者が決定する必要がある。この決定は本タスクの範囲外であり、スキーマ変更を伴う可能性があるため、別タスクとして提起することを推奨する。今回は現行の単一レコード構造を前提に`partial`を推奨するに留める。

---

## Part G — 将来のDB変更提案

### REQUIRED

なし（今回の再検証で誤りと確定した既存記載はない）

### OPTIONAL

- `pricingSourceUrl`に加え、ライセンス公式ページ（`https://stability.ai/license`）を`pricingSourceUrl`とは別の用途（licenseSourceUrl等、現行スキーマにはないフィールド）で明示的に分離すると、価格根拠とライセンス根拠の区別が今より明確になる（ただしフィールド追加はスキーマ変更を伴うため別途判断が必要）
- Stability AI Platform料金ページがCloudflareボット検知チャレンジで保護されている旨を`pricingSourceNote`に技術的制約として追記すると、次回監査者が同じ確認作業を繰り返す手間を省ける

### POLICY_OR_MODELING

- **proposed_future_decision**: Stable Diffusionのようなオープンモデル＋公式API＋サードパーティホスティングという複合的な価格構造を持つツールについて、DB設計として「1レコードに混在させたまま注記で説明する」現行方式を維持するか、レコード分割・フィールド階層化などの構造変更を行うかを決定する
- **reason**: 現行の単一`pricingStatus`値は、性質の異なる複数価格主体の検証状況を1つの折衷値に圧縮せざるを得ず、将来同様のツール（オープンモデル＋商用API併存型）が追加された場合に同じ問題が繰り返される。スキーマ変更を伴うため、本タスク（監査のみ）の範囲外の意思決定として記録する

---

## 今回のDB変更

**なし**（監査・分類・提案のみ。`src/content/tools/stable-diffusion.md`は無変更）
