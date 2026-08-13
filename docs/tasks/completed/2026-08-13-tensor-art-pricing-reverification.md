---
task_id: "2026-08-13-tensor-art-pricing-reverification"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true

goal: "src/content/tools/tensor-art.mdのpricingStatus未設定について、docs/decisions/pricing-status-classification-policy.mdに基づき現行の公式一次情報を再検証し、confirmed/partial/unconfirmed/no_fixed_price/service_changed/VERIFY_REQUIREDのいずれが妥当かをAUDIT ONLYで判定する。専用公式料金ページの有無・現行料金構造・通貨・無料枠/クレジット規則を再確認する。tensor-art以外（stable-diffusion/invideo-ai/kling-ai）は調査・変更しない。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - src/content/tools/tensor-art.mdの変更
  - stable-diffusion/invideo-ai/kling-aiの調査・変更
  - pricingStatusの値付け
  - schema変更
  - validator変更
  - UI変更
  - 本番デプロイ
  - パッケージ/依存関係変更

target_files:
  - docs/tasks/active/2026-08-13-tensor-art-pricing-reverification.md
  - docs/tasks/completed/2026-08-13-tensor-art-pricing-reverification.md
  - docs/audits/tensor-art-pricing-reverification-2026-08-13.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - src/content/tools/tensor-art.md

unknowns: []

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html

required_checks:
  - npm run validate:task
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "公式Tensor.Art料金/購入ページ等の公式一次情報を再検証する"
  - "専用の公式料金ページの有無を明示的に確認する"
  - "通貨を明示的に解決するか未解決として文書化する"
  - "無料枠/クレジット状態を確認する"
  - "現行DBのpricing関連フィールドと公式情報を比較する"
  - "pricingStatus推奨値（またはVERIFY_REQUIRED）を1つ提示する"
  - "値を推測しない"
  - "将来のREQUIRED/OPTIONAL/NO_CHANGEを明示する"
  - "取得元URL・確認日を記録する"
  - "src/content/tools/tensor-art.mdを変更しない"
  - "他のtool DBファイルを変更しない"

result: >
  tensor-art限定でpricingStatus再検証をAUDIT ONLYで実施。WebFetchツールはtensor.art公式ドメイン
  全体でHTTP 403 Forbiddenを一貫して返したが、標準UA付きcurl直接アクセスはいずれもHTTP 200を返し、
  https://tensor.art/event/proupdate（Proプラン案内の公式イベントページ）とhttps://tensor.art/about/
  terms-of-service-new（公式利用規約）についてはサーバーサイドレンダリング済みの本文を取得できた。
  proupdateページから、Daily Pass $1・Monthly Pro Subscription $9.9/月（1kクレジット）・Quarterly
  Pro $19.9（5kクレジット、割引期間終了し通常価格に復帰と明記）・Yearly Pro原価$119.9→時限オファー
  $59.9（25kクレジット、50%オフの特別オファーと明記）・Credits Pack（3k/10k、価格変更なしと記載
  だが具体額はページになし）というUSD建ての具体的価格情報を確認できた。ただしこのページはURL自体が
  イベント/お知らせ記事であり恒久的な料金ページではなく、公開日時も本文から特定できなかったため、
  特にYearlyの時限オファー価格が現在も有効かは不明。実際の購入ページ（https://tensor.art/purchase/
  vip、japanBilling.pricingUrl記載）はcurlでHTTP 200を返すもののNuxtクライアントレンダリングで
  静的HTMLに価格数値が含まれず抽出不可（claude-in-chromeブラウザ拡張も本セッション未接続）。
  terms-of-service-newページはDBのcommercialUseNote（Tensor.Art側は生成物の所有権・著作権を主張
  しない、商用利用不可モデル使用時の責任はユーザー側）と条文レベルで完全一致することを確認した。
  現行DBのトップレベルcurrency="unknown"は、同一ファイル内のjapanBilling.billingCurrency="USD"
  および今回確認したUSD建て価格表記と矛盾する内部不整合として特定した（REQUIRED候補として記録、
  今回は変更せず）。以上を踏まえ、主要な価格情報（プラン名・通貨・大まかな価格帯）は判明したが、
  取得元が恒久的料金ページでなく現行性を裏付けられない、無料枠の具体的内容が未確認、という周辺要素
  が残ることから、docs/decisions/pricing-status-classification-policy.mdのpartial定義に該当すると
  判断し、recommended_status=partialとした。REQUIRED: currency（トップレベル）を"unknown"から
  "USD"へ変更検討。OPTIONAL: pricingSourceNoteへイベントページの性質・時限オファーの現行性未確認
  である旨を追記、将来のブラウザレンダリング環境での/purchase/vip実地確認。NO_CHANGE: pricingModel
  /freePlan/freePlanNote/commercialUseNote関連/japanBilling.billingCurrency/japanBilling.pricingUrl。
  src/content/tools/tensor-art.mdは無変更、stable-diffusion/invideo-ai/kling-aiは未調査・未変更。
  詳細はdocs/audits/tensor-art-pricing-reverification-2026-08-13.md参照。
  validate:task PASS、git diff --check PASS、validate:scope PASS。
---
