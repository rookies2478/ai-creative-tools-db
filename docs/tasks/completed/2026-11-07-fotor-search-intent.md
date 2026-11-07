---
task_id: "2026-11-07-fotor-search-intent"
created_at: "2026-11-07"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: true
goal: "Fotorの無料枠・透かし・商用利用を機能別の公式根拠で整理して公開済み記事の検索目的別案内を改善する"
non_goals:
  - 料金額や未検証の商用権利保証・ランキングの捏造
  - URL・DBスキーマ・アフィリエイト・計測・本番の変更
target_files:
  - docs/tasks/active/2026-11-07-fotor-search-intent.md
  - docs/tasks/active/2026-11-07-jp-creative-categories.md
  - docs/tasks/paused/2026-11-07-creative-tools-expansion.md
  - docs/tasks/paused/2026-11-07-fotor-search-intent.md
  - docs/tasks/completed/2026-11-07-jp-creative-categories.md
  - docs/tasks/completed/2026-11-07-creative-tools-expansion.md
  - docs/tasks/LATEST.md
reference_files:
  - CLAUDE.md
  - AGENTS.md
  - src/content/tools/fotor-ai.md
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
unknowns:
  - GSC Query×Pageは集計全量を取得できず検索意図比率は未検証
  - 公式Commercial Useと機能別FAQの有料条件に差があり最新の契約を要確認
  - 日本の最終課金額やログイン後モデル別機能は未確認
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - node scripts/verify-fotor-intent-output.mjs
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - Fotor無料・透かし・商用利用の機能別の条件差を公式URLで区別
  - 静的オーバーライドルートのビルド済みHTMLに新しい本文が存在することをテスト
  - 新規料金額や保証の追加がなくCTA・affiliate・スキーマが不変
  - source registryの完了処理はマージ済みPR #76に保持し、本PRはその履歴を変更しない
  - 必須のtask・build・data・publish・affiliate・scopeチェックが全PASSした場合のみマージに進める
  - 本文変更の本番反映はユーザーの2026-11-07明示指示により別リリース工程で実施し、公開後SHAを検証する
  - 既存 PR #78/#79 の実装を再実装せず、公式根拠と live Fotor DOM の追加確認を別スコープで判断する
  - 過去タスクと LATEST の closeout 差分以外の本番ソースは変更しない
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Fotor SEO intent review

Parent: https://github.com/rookies2478/ai-creative-tools-db/issues/71

Use only source-grounded content, explicitly verified official differences and GSC Page-only evidence. Owner explicitly approved full release on 2026-11-07, contingent on quality gates. The unrelated official-source registry closeout was resolved by merged PR #76; do not revert it. Hosting-specific production deployment and public SHA checks are separate from this content task.

RESULT: PASS_WITH_LIMITATIONS — Fotor PR #78/#79 were already merged; remaining verification is an independent gate. Prior 2026-11-07 live responsive QA run 42350278868 passed, master Build 42360844417 passed, and production route QA 42360844176 checked 125 URLs. These do not independently prove every licensing claim or all search-query intent. No new content/CTA/deploy changes in this closeout PR.


## Reopened / 2026-11-07

- Issue #80 is closed and PR #81 / #83 are merged. Old category task and 15-tool expansion moved to completed in this same change; Fotor is the **only active task**.
- Current `src/pages/tools/fotor-ai/index.astro` includes the intent table and `commercialExtra` text from merged PR #79. Its compiled HTML regression is covered by existing CI; avoid duplicate implementation.
- Before any further editorial claim or release, read official Fotor Japan pricing, AI image generation, enhancement-specific FAQ, Commercial Use help and terms with current dates. Do not extrapolate blanket commercial permission from a generic FAQ.
- GSC 2026-08-07..11-04 Page-only: 682 impressions / 0 clicks / avg position 7.3; the Fotor-specific Query×Page split remains NOT_VERIFIED. Use existing Growth Loop for any new read-only analysis.
- CI/build and production/deployment checks are distinct. No merge, deployment, affiliate link, measurement or price edits authorized by this task reset. New content changes require a new exact-path scoped task and independent PR.


## Closeout 2026-11-07 (source + live evidence)
- Fotor article content and visible intent matrix merged in PR #78/#79; source-grounded distinction in `docs/audits/fotor-search-intent-2026-11-07.md` and issue #71 comment 6705427605.
- 2026-11-07 live responsive QA (1440px/375px) run https://github.com/rookies2478/ai-creative-tools-db/actions/runs/42350278868 passed. This verifies public copy on previous production SHA. Later master content changes did not touch Fotor page, and 125 sitemap route verification https://github.com/rookies2478/ai-creative-tools-db/actions/runs/42362566629 passed.
- Free Basic versus Pro/Pro+ rules and feature-specific exceptions cross-checked against public Japanese pricing/AI generation/one-tap-enhance and the Fotor Commercial Use support page. This is public-source verification, not an account-specific license opinion.
- Residual account-level billing/tax, login-gated licensing and GSC Query×Page are not confirmed and remain under broad SEO Issue #71 or the rolling source review Issue #48. Do not close #71 here.
- No Fotor code, affiliate URL, measurement, schema or deployment setting changed during the closeout; history stays in completed.
