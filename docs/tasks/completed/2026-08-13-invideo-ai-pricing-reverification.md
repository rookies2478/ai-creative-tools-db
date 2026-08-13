---
task_id: "2026-08-13-invideo-ai-pricing-reverification"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true

goal: "src/content/tools/invideo-ai.mdのpricingStatus未設定について、docs/decisions/pricing-status-classification-policy.mdに基づき現行の公式一次情報を再検証し、confirmed/partial/unconfirmed/no_fixed_price/service_changed/VERIFY_REQUIREDのいずれが妥当かをAUDIT ONLYで判定する。invideo-ai以外のVERIFY_REQUIRED対象（kling-ai/stable-diffusion/tensor-art）は調査・変更しない。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - src/content/tools/invideo-ai.mdの変更
  - kling-ai/stable-diffusion/tensor-artの調査・変更
  - pricingStatusの値付け
  - schema変更
  - validator変更
  - UI変更
  - 本番デプロイ
  - パッケージ/依存関係変更

target_files:
  - docs/tasks/active/2026-08-13-invideo-ai-pricing-reverification.md
  - docs/tasks/completed/2026-08-13-invideo-ai-pricing-reverification.md
  - docs/audits/invideo-ai-pricing-reverification-2026-08-13.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - src/content/tools/invideo-ai.md

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
  - "invideo.io/pricing/等の公式一次情報を再検証する"
  - "現行DBのpricing関連フィールドと公式情報を比較する"
  - "pricingStatus推奨値（またはVERIFY_REQUIRED）を1つ提示する"
  - "値を推測しない"
  - "将来のREQUIRED/OPTIONAL/NO_CHANGEを明示する"
  - "取得元URL・確認日を記録する"
  - "src/content/tools/invideo-ai.mdを変更しない"
  - "他のtool DBファイルを変更しない"

result: >
  invideo.io/pricing/（公式料金ページ）・help.invideo.io記事2件（プラン/クレジット詳細、対応プラン一覧）
  をWebFetchで再取得。プラン名（Plus/Max/Generative/Elite）、クレジット月次リセット・繰越なし、
  Enterpriseはcontact sales、価格変更可能性の明記（"Model & agent prices are subject to change"）
  は確認できたが、具体的な金額（$xx/月等）・通貨断定・年払い/月払い差はJSレンダリングされる
  SPA構造のため本環境のWebFetchでは取得不能（claude-in-chromeブラウザ拡張も本セッション未接続
  のため利用不可）。現行DBの表現（「約$20/月〜」「要公式確認」等）は既に過大な断定を避けており、
  今回の再検証でも整合性が崩れる新事実は見つからなかったが、$20という数値自体の正誤を確定させる
  根拠も得られなかった。結論: recommended_status=VERIFY_REQUIRED（取得手段の制約により金額の
  confirmed/partial判定に足る根拠がないため）。REQUIRED変更なし。OPTIONAL: Enterprise=contact sales
  の追記、将来的なブラウザレンダリング環境での再確認。NO_CHANGE: pricingModel、プラン名、クレジット
  月次リセット記載、既存ヘッジ表現。src/content/tools/invideo-ai.mdは無変更。kling-ai/stable-diffusion/
  tensor-artは未調査・未変更。詳細はdocs/audits/invideo-ai-pricing-reverification-2026-08-13.md参照。
  validate:task PASS、git diff --check PASS、validate:scope PASS。
---
