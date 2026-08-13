---
task_id: "2026-08-13-stable-diffusion-pricing-reverification"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true

goal: "src/content/tools/stable-diffusion.mdのpricingStatus未設定について、docs/decisions/pricing-status-classification-policy.mdに基づき、まずDBエントリが表す価格主体（ローカル/オープンモデル・Stability AI API・ホスト型製品・混在）を明確化し、その上で現行の公式一次情報を再検証してconfirmed/partial/unconfirmed/no_fixed_price/service_changed/VERIFY_REQUIREDのいずれが妥当かをAUDIT ONLYで判定する。通常のSaaS型pricingStatus分類がそもそも適切かというDBモデリング上の論点も明示する。stable-diffusion以外のVERIFY_REQUIRED対象（tensor-art）は調査・変更しない。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - src/content/tools/stable-diffusion.mdの変更
  - tensor-artの調査・変更
  - pricingStatusの値付け
  - schema変更
  - validator変更
  - UI変更
  - 本番デプロイ
  - パッケージ/依存関係変更

target_files:
  - docs/tasks/active/2026-08-13-stable-diffusion-pricing-reverification.md
  - docs/tasks/completed/2026-08-13-stable-diffusion-pricing-reverification.md
  - docs/audits/stable-diffusion-pricing-reverification-2026-08-13.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - src/content/tools/stable-diffusion.md

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
  - "現行DBの価格主体（ローカル/オープンモデル・API・ホスト型製品・混在）を明確化する"
  - "ローカル/オープンモデルの価格解釈とStability AI API/クラウド価格を分離して検証する"
  - "公式一次情報のみを用いて現状を再検証する"
  - "現行DBと公式情報を比較する"
  - "pricingStatus推奨値（またはVERIFY_REQUIRED）を1つ提示する"
  - "DBモデリング上の曖昧さが存在する場合は明示する（POLICY_OR_MODELING_ISSUE）"
  - "値を推測しない"
  - "src/content/tools/stable-diffusion.mdを変更しない"
  - "他のtool DBファイルを変更しない"

result: >
  stable-diffusion限定でpricingStatus再検証をAUDIT ONLYで実施。まずDBエントリの価格主体を特定し、
  ローカル/オープンモデル（ライセンス条件付き無料）、Stability AI API（Platform、有償従量課金）、
  非公式実装ドキュメント参照（AUTOMATIC1111/ComfyUI、価格主体ではない）の3層が1レコードに混在
  していることを確認。japanBilling.pricingNoteが既にこの混在を「単一の有料サービスではない」と
  明示的に宣言済みであることも確認した。公式ライセンスページ（stability.ai/license）はWebFetchで
  正常に取得でき、Community License（SD 3.5 Suite/SDXL Turbo/Core Models対象、年間収益100万ドル
  未満は無料・商用利用可、100万ドル以上はEnterprise License要問い合わせ）を公式に確認できた。
  一方Stability AI Platform料金ページ（platform.stability.ai/pricing）はReact SPA＋Cloudflareボット
  検知チャレンジで保護されており、WebFetch・curl直接アクセスいずれでも価格情報を抽出できず
  （claude-in-chromeブラウザ拡張も本セッション未接続）、API側の現行価格は今回も未検証のまま。
  現行DBの中心的主張（ローカル無料実行・ライセンス条件・収益しきい値）は今回の検証結果と一致し、
  API側の$20/月表記は既に「2026年6月時点の公式案内」と時点付きでヘッジされ断定されていないため、
  docs/decisions/pricing-status-classification-policy.mdのpartial定義（主要情報は判明・一部周辺
  要素が未確定）に該当すると判断し、recommended_status=partialとした。同時に、単一のpricingStatus
  値では「ローカルは確認できたがAPIは未検証」という混在状態を正確に表現できないという構造的な
  DBモデリング上の課題をPOLICY_OR_MODELING_ISSUEとして明示し、レコード分割等の構造変更は本タスク
  の範囲外として別タスクでの意思決定を推奨した。REQUIRED変更なし。OPTIONAL: pricingSourceNoteへ
  Cloudflareチャレンジによる技術的制約の記録。src/content/tools/stable-diffusion.mdは無変更、
  tensor-artは未調査・未変更。詳細はdocs/audits/stable-diffusion-pricing-reverification-2026-08-13.md
  参照。validate:task PASS、git diff --check PASS、validate:scope PASS。
---
