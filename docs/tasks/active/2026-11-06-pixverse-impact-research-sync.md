---
task_id: "2026-11-06-pixverse-impact-research-sync"
created_at: "2026-11-06"
status: READY
risk: MEDIUM
current_phase: affiliate-evidence-reconciliation
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "既に操作者が確認したPixVerse Impact契約を研究用メタデータだけに同期し、未検証の紹介リンクを本番公開しない"
non_goals:
  - 公開用のアフィリエイトURL・CTA・トラッキングを有効化すること
  - Impactにログイン、銀行情報を変更、自己アフィリエイト注文、メールを送信すること
  - 認証済み操作者の証拠をGPTの直接確認と偽ること
target_files:
  - docs/tasks/active/2026-11-06-pixverse-impact-research-sync.md
  - src/data/affiliatePrograms.ts
  - docs/tasks/completed/2026-11-06-pixverse-impact-research-sync.md
  - docs/tasks/LATEST.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/TEMPLATE.md
  - src/data/affiliatePrograms.ts
  - src/data/toolAffiliateLinks.ts
  - docs/tasks/LATEST.md
unknowns:
  - PixVerse固有URLの終点への実リンク遷移は未検証
  - 日本居住パブリッシャーの受取資格・送金方法は未検証
  - オーガニックSEO比較記事やX媒体による紹介許可は未検証
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
  - operator-reported Impact承認・30パーセント・90日last-click等を正確に記録
  - 古いWAITING_REPLY/リンク未取得の誤記を削除
  - 日本の購入者適格と日本居住パブリッシャーの支払適格を混同しない
  - toolAffiliateLinks.tsと本番公開CTA・計測・DNSは一切変更しない
  - 正式な確認事項をIssue #36に記録し、次のゲートを明記する
  - 研究メタデータ同期後、完了タスクをアーカイブしactiveを空にする
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# PixVerse: Impact operator evidence → research metadata only

## Source
- [Issue #36](https://github.com/rookies2478/ai-creative-tools-db/issues/36), operator-authenticated Impact browser review, 2026-11-05 10:15 JST and follow-ups. GPT did not log in again.
- Impact PixVerse Affiliate program 49478, approved, contract effective 2026-08-02.
- Contract: Online Sale 30%, Deposit 30%, Renewal 30% up to 12 renewals/customer; 90-day last click. Action lock 27 days, normal approval payout timing varies.
- Partner confirmed paid subscriptions from Japan are commission-eligible 2026-10-12.
- Personal Link Creator URL obtained 2026-11-05, but final redirect not tested. No self-click or public activation.
- Unknown: Japan resident publisher payout eligibility, site review/X promotional media policy, actual redirect and user account finance settings. Do not store Impact Account ID or banking information.

## Scope and release
Only `src/data/affiliatePrograms.ts` PixVerse research record. Public `src/data/toolAffiliateLinks.ts` unchanged. No terms beyond operator evidence, no 35% bonus assumption, no claimed income.
