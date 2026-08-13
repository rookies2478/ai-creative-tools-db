---
task_id: "2026-08-13-pricing-status-classification-policy"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "docs/decisions/配下に、pricingStatus（confirmed/partial/unconfirmed/no_fixed_price/service_changed）の分類・欠落・根拠優先順位・鮮度ポリシーを定義する正式決定文書を1件作成する。2026-08-13完了済みの7ツール監査（docs/audits/pricing-status-missing-fields-audit-2026-08-13.md）に基づき、既存repository動作（scripts/validate-data.mjsのenum/missing挙動）と矛盾しない形で明文化する。"

forbidden_operations:
  - PRODUCTION_DEPLOY

non_goals:
  - pricingStatusの追加・変更
  - pricing・source内容の再検証・Web調査
  - src/content/tools/*.mdの変更
  - schema変更（src/content/config.ts）
  - validator変更（scripts/validate-data.mjs）
  - UI変更
  - reports/の整理
  - 本番デプロイ
  - パッケージ/依存関係変更

target_files:
  - docs/tasks/active/2026-08-13-pricing-status-classification-policy.md
  - docs/tasks/completed/2026-08-13-pricing-status-classification-policy.md
  - docs/decisions/pricing-status-classification-policy.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/audits/pricing-status-missing-fields-audit-2026-08-13.md
  - docs/tasks/completed/2026-08-13-pricing-status-missing-fields-audit.md
  - scripts/validate-data.mjs
  - docs/decisions/affiliate-link-architecture.md
  - docs/decisions/current-governance-documents.md
  - src/content/tools/d-id.md
  - src/content/tools/heygen.md
  - src/content/tools/synthesia.md

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
  - "1件の決定文書がdocs/decisions/配下に作成される"
  - "5値（confirmed/partial/unconfirmed/no_fixed_price/service_changed）が全て定義される"
  - "missing/undefinedの扱いが定義される"
  - "根拠の優先順位が定義される"
  - "verifiedAtとの鮮度関係が定義される"
  - "特殊ケースが網羅される"
  - "現行validator挙動が正確に記述される（必須化しない）"
  - "src/content/tools/*.mdを一切変更しない"
  - "値を新規に確定・付与しない"
  - "7ツール監査への参照リンクを含む"

result: >
  docs/decisions/pricing-status-classification-policy.md を新規作成し、pricingStatusの5値
  （confirmed/partial/unconfirmed/no_fixed_price/service_changed）の定義、missing/undefined
  ポリシー（現行schema非必須・推測禁止）、evidence hierarchy（公式価格ページ＞公式ドキュメント＞
  安全な公式UI証拠＞既存repository証拠＞二次情報）、verifiedAt/lastReviewedとの鮮度関係
  （confirmedでも古い検証は再検証対象、固定間隔は新設せず）、特殊ケース8種（無料専用/OSS自己ホスト/
  エンタープライズ/サービス終了/地域通貨/anti-bot/クレジット制/一時アクセス不可）、判定ロジック6手順、
  現行validator挙動（scripts/validate-data.mjsのcheckEnum()はundefinedを許容・値がある場合のみenum外
  ERROR、本決定は必須化しない）、2026-08-13の7ツール監査結果の紐付け（d-id/heygen/synthesia＝
  SAFE_TO_SET_FROM_CURRENT_EVIDENCE・partial候補、invideo-ai/kling-ai/stable-diffusion/tensor-art＝
  VERIFY_REQUIRED）を記載した。src/content/tools/*.md・schema・validatorは一切変更していない。
  値の新規付与は行っていない。validate:task PASS、git diff --check PASS、validate:scope PASS。
