---
task_id: "2026-08-13-kling-ai-pricing-reverification"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true

goal: "src/content/tools/kling-ai.mdのpricingStatus未設定について、docs/decisions/pricing-status-classification-policy.mdに基づき現行の公式一次情報を再検証し、confirmed/partial/unconfirmed/no_fixed_price/service_changed/VERIFY_REQUIREDのいずれが妥当かをAUDIT ONLYで判定する。旧HTTP 446アクセス不可問題を現状で再評価する。kling-ai以外のVERIFY_REQUIRED対象（stable-diffusion/tensor-art）は調査・変更しない。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - src/content/tools/kling-ai.mdの変更
  - stable-diffusion/tensor-artの調査・変更
  - pricingStatusの値付け
  - schema変更
  - validator変更
  - UI変更
  - 本番デプロイ
  - パッケージ/依存関係変更

target_files:
  - docs/tasks/active/2026-08-13-kling-ai-pricing-reverification.md
  - docs/tasks/completed/2026-08-13-kling-ai-pricing-reverification.md
  - docs/audits/kling-ai-pricing-reverification-2026-08-13.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - src/content/tools/kling-ai.md

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
  - "kling.ai公式料金/規約ページ等の公式一次情報を再検証する"
  - "旧HTTP 446アクセス不可問題を現状で明示的に再評価する"
  - "現行DBのpricing関連フィールドと公式情報を比較する"
  - "pricingStatus推奨値（またはVERIFY_REQUIRED）を1つ提示する"
  - "値を推測しない"
  - "将来のREQUIRED/OPTIONAL/NO_CHANGEを明示する"
  - "取得元URL・確認日を記録する"
  - "src/content/tools/kling-ai.mdを変更しない"
  - "他のtool DBファイルを変更しない"

result: >
  kling.ai公式料金ページ・ユーザーポリシーページをWebFetchで再取得したところ、旧問題どおり
  HTTP 446 Unknown Statusが再現した。標準UA付きcurlで同URLへ直接アクセスするとHTTP 200が返る
  ことを確認したが、取得したHTML本文はSPA（クライアントサイドレンダリング）構造で<body>直下が
  ほぼ空、価格・プラン名・クレジット数等のテキストは静的HTMLに含まれていなかった。claude-in-chrome
  ブラウザ拡張は本セッション未接続のため、JSレンダリング後の実際の価格情報を取得する手段がない。
  結論として旧HTTP 446問題は「WebFetch固有のブロック＋SPA構造による恒常的な抽出不能」という、
  より正確な性質を保ったまま未解消。現行DB（src/content/tools/kling-ai.md）の表現は元々「第三者
  情報源」「要公式確認」を明示し過大な断定を避けており、今回の検証結果と矛盾しない。
  docs/decisions/pricing-status-classification-policy.mdの特殊ケース表「anti-bot/HTTPブロックに
  より価格ページ確認不可」（kling-aiが該当例と明記済み）に完全一致するため、
  recommended_status=VERIFY_REQUIREDを維持。REQUIRED変更なし。OPTIONAL: pricingSourceUrl/
  pricingSourceNoteフィールドへ今回の技術的制約の詳細を記録、将来のブラウザレンダリング環境での
  再確認。NO_CHANGE: pricingModel/freePlan/currency/lowestPaidPlan表現/commercialUseNote/
  pricingDecision.pricingNote/本文料金表とその参考情報明示/sourceRefs・sources。
  src/content/tools/kling-ai.mdは無変更。stable-diffusion/tensor-artは未調査・未変更。
  詳細はdocs/audits/kling-ai-pricing-reverification-2026-08-13.md参照。
  validate:task PASS、git diff --check PASS、validate:scope PASS。
---
