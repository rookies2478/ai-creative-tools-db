---
task_id: "2026-08-13-apply-sd-tensorart-pricing-corrections"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: false

goal: "docs/audits/stable-diffusion-pricing-reverification-2026-08-13.mdおよびdocs/audits/tensor-art-pricing-reverification-2026-08-13.mdで監査済みのpricingStatus: partial判定をstable-diffusion/tensor-artに適用する。加えてtensor-artのトップレベルcurrency: unknownをUSDへ修正する（同ファイルjapanBilling.billingCurrency: USDおよび公式イベントページ確認済みのUSD建て価格と整合させる）。invideo-ai/kling-aiは変更しない。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - invideo-aiの変更
  - kling-aiの変更
  - Stable Diffusionのスキーマ/モデリング再設計
  - 新規フィールド追加
  - 監査で明示的に要求された以外のsource変更
  - 価格金額変更
  - プラン名変更
  - freePlan変更
  - 商用利用フィールド変更
  - 今回の事実変更に必要な場合を除きverifiedAt更新なし
  - 新規Web調査
  - validator変更
  - 本番デプロイ

target_files:
  - src/content/tools/stable-diffusion.md
  - src/content/tools/tensor-art.md
  - docs/tasks/active/2026-08-13-apply-sd-tensorart-pricing-corrections.md
  - docs/tasks/completed/2026-08-13-apply-sd-tensorart-pricing-corrections.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/audits/stable-diffusion-pricing-reverification-2026-08-13.md
  - docs/audits/tensor-art-pricing-reverification-2026-08-13.md

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
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "stable-diffusion.mdにpricingStatus: \"partial\"が追加される"
  - "tensor-art.mdにpricingStatus: \"partial\"が追加される"
  - "tensor-art.mdのトップレベルcurrencyがunknownからUSDへ変更される"
  - "tensor-art.mdのjapanBilling.billingCurrency: USDは無変更"
  - "上記2ファイル以外のsrc/content/tools/*.mdは変更されない"
  - "invideo-ai.md/kling-ai.mdは無変更"
  - "validate:data PASS"
  - "build PASS"
  - "validate:publish PASS（既存Warningsのみ許容）"

result: >
  stable-diffusion.mdへpricingModel行直後に`pricingStatus: "partial"`を1行追加（他フィールド無変更）。
  tensor-art.mdへ`pricingModel: "subscription_credit"`行直後に`pricingStatus: "partial"`を1行追加、
  かつトップレベル`currency: "unknown"`を`currency: "USD"`へ変更（既存`japanBilling.billingCurrency:
  "USD"`は無変更、両者の内部矛盾を解消）。いずれの値付けも実装前にdocs/audits/
  stable-diffusion-pricing-reverification-2026-08-13.mdおよびdocs/audits/
  tensor-art-pricing-reverification-2026-08-13.mdの監査結論・pricing-status-classification-policy.md
  の判定基準と一致することを再確認済み。invideo-ai.md/kling-ai.mdおよび他27ツールのmdファイルは無変更
  （git status --shortで確認）。verifiedAt/lastReviewedは今回の指示どおり更新せず維持。
  validate:task PASS。validate:data PASS（Errors 0, Warnings 4=既存microsoft-designer/
  midjourney/runway/stable-diffusionのreview-overdue、本タスク無関係）。build 92ページ PASS。
  validate:publish PASS（Errors 0, Warnings 4=既存long-meta-description、本タスク無関係）。
  git diff --check PASS（CRLF警告のみ、エラーなし）。validate:scope PASS。

  【Production Verification 2026-08-13】ユーザーによる手動デプロイ完了報告を受け、
  commit b06c093反映後の本番2URLを検証。https://aicreative-db.com/tools/stable-diffusion/
  ・https://aicreative-db.com/tools/tensor-art/ ともHTTP 200（リダイレクトなし）、
  canonical・title・H1いずれも正常（旧値と一致、崩れなし）、noindex等のrobots meta付与なし。
  各ページ内「料金」関連セクションは崩れなくレンダリングされ、USD/円表記も正常表示（tensor-artの
  currency修正by本タスクに起因する表示エラーなし）。JSON-LD 3ブロックとも正常parse（WebSite/
  BreadcrumbList+SoftwareApplication配列/FAQPage、パースエラーなし。構造化データ自体は本タスクで
  無変更）。主要外部リンク（stable-diffusion: stability.ai/license、platform.stability.ai/pricing、
  huggingface.co license等／tensor-art: tensor.art本体、terms-of-service-new、event/proupdate、
  purchase/vip等）出力確認、明らかな壊れ表記なし。ブラウザ実描画（PC/スマホ視覚確認）は本セッション
  未接続のためNOT_VERIFIED、HTML/HTTP検証のみで代替。internal pricingStatusフィールド自体はUIで
  意図的に非表示のため未検証（想定通り）。結論: 両URLとも本番反映健全、PRODUCTION_STATE=DEPLOYED。
---
