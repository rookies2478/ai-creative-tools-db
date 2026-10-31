---
task_id: "2026-10-31-stable-diffusion-api-pricing"
created_at: "2026-10-31"
status: COMPLETED
completed_at: "2026-10-31"
merge_pr: 17
merge_sha: "18fc0591f8798fe577f3cd8794501479c0e6f1af"
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: true
official_verification_required: true

goal: "Stability AI現行公式API料金がクレジット従量課金であることを一次資料で確認し、Stable Diffusion専用ページとツールDB正本の旧い$20/月・6,000 credits表記のみを整合修正する。"

non_goals:
  - "SEO title/meta、見出し構造、canonical、URL、内部リンクの変更"
  - "個別モデルのライセンスや商用利用規約の改変"
  - "料金比較ロジック、他ツール、Affiliate・CTA、デプロイ設定の変更"
  - "収益・クリック改善を断定"
  - "本番公開"

target_files:
  - docs/tasks/active/2026-10-31-stable-diffusion-api-pricing.md
  - docs/tasks/completed/2026-10-31-stable-diffusion-api-pricing.md
  - docs/tasks/LATEST.md
  - docs/audits/stable-diffusion-api-pricing-2026-10-31.md
  - src/pages/tools/stable-diffusion/index.astro
  - src/content/tools/stable-diffusion.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/TEMPLATE.md
  - docs/decisions/current-governance-documents.md
  - src/pages/tools/stable-diffusion/index.astro
  - src/content/tools/stable-diffusion.md
  - docs/audits/gpt-creative-2026-10-31.md

unknowns:
  - "一般公開ページとGitHub変更の本番反映差分（別作業）"
  - "従量単価は今後変動しうるため、実価格の継続監視は別タスク"
  - "API料金変更がSEO CTRに与える効果は不明"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "公式料金 https://platform.stability.ai/pricing のcredits従量課金が確認済み"
  - "ページとMarkdownの$20/月・6,000クレジット表記が同時に消える"
  - "ローカル無料（ハードウェア費用別）とAPI有料従量の説明は維持"
  - "料金のみの確認日を更新し、他の規約・機能の日付は変えない"
  - "CTA・URL・title/meta・ライセンス・Affiliate等は無変更"
  - "必須検証・差分監査PASS後のPRを人間レビューに回す"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Issue #16。GSCのstable-diffusion系「料金/費用」クエリの実測（2026-10月、約85 impressions、順位10-11位）は改善候補だが、本件はSEOテストではなく**情報正確性の修正**。

一次資料（2026-10-31確認）
- https://platform.stability.ai/pricing : API使用は credits 制。1 credit=$0.01。画像生成はモデル/処理ごとに必要creditsが異なる。価格は変更されうる。
- https://platform.stability.ai/docs/getting-started : 初回25 free credits。追加creditsは課金。
- https://stability.ai/license : モデルライセンスは現行記述を保持。今回変更しない。

実装範囲：
- `src/pages/tools/stable-diffusion/index.astro` の旧$20/月・6,000 credits表記があるbasicInfo, quickTable, pricing.rowsだけを修正。
- `src/content/tools/stable-diffusion.md` のpaidPlanNote、料金節、pricingSourceNote等の関連文字列と「料金だけ」の検証日を修正。全体lastReviewed等の他分野検証日は変更しない。
- APIの単位課金の最低額や定期プランを断定しない（optional: 1 credit=$0.01として根拠を明示）。無料25creditsはAPI新規アカウント特典で、ローカル無料との混同を避ける。
- docs/auditsにbefore/after, 公式ソース, リスク, チェックを記録。

既存のmasterにはactive taskがなく、本ブランチのactive task1件だけで作業する。GPTはGitHub差分の作成とPRまで実施し、ローカルCLIの必須検証はClaude Codeに引き継ぐ。CIにないvalidate:task/validate:scope/validate:affiliate-linksをPASSと推測しない。

RESULT: PASS（公式料金検証と修正完了、PR #17 masterへマージ済み）
CHANGED_FILES: target_filesのみ
CHECKS: Claude Code local validate:task/build(95 pages)/validate:data/validate:publish/validate:affiliate-links/validate:scope/git diff --check PASS; preview HTML旧料金0件、新料金確認、公式リンク維持。GitHub Build run 41172694111 SUCCESS。実ブラウザ目視は未実施。
GIT: PR head 9c3736618dae9bc0b76c57aec6712b6eb948e6bd -> master squash merge 18fc0591f8798fe577f3cd8794501479c0e6f1af
PRODUCTION: NOT_DEPLOYED by GPT; production release remains human-only
LATEST_UPDATED: yes（本完了処理PRで同期）
NEXT: human-only production release status check; future GSC price/fee query analysis is a separate scoped task


## Final release boundary
- Source changes were checked with official Stability AI API docs (the pricing URL redirects to docs.stability.ai/pricing) and independently passed Claude Code local checks plus GitHub Actions run 41172694111.
- The HTML preview had no Stable Diffusion legacy $20/month, 6,000-credit text, and still linked the official pricing page.
- No manual production deploy by GPT; Cloudflare Pages status was reported PASS by Claude Code but public live-site rollout remains unverified.
- This record is an archival docs update, not a new source-code modification.
