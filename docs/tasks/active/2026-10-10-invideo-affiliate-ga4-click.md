---
task_id: "2026-10-10-invideo-affiliate-ga4-click"
created_at: "2026-10-10"
status: READY
risk: LOW
current_phase: affiliate-conversion-validation
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "既存InVideo AIのHeroと料金CTAにGA4計測属性を付与し承認済みアフィリエイト送客を他ツールと同じイベントで測れるようにする"

non_goals:
  - "外部ASPアカウントの審査・収益を推測しない"
  - "Affiliate URLと現在の価格・利用規約・SEO・レイアウトを変更しない"

target_files:
  - "src/pages/tools/invideo-ai/index.astro"
  - "docs/tasks/active/2026-10-10-invideo-affiliate-ga4-click.md"
  - "docs/tasks/LATEST.md"

reference_files:
  - "CLAUDE.md"
  - "docs/tasks/TEMPLATE.md"
  - "docs/tasks/LATEST.md"
  - "docs/tasks/completed/2026-09-24-ga4-outbound-cta-tracking-fotor-runway.md"
  - "src/pages/tools/invideo-ai/index.astro"
  - "src/pages/tools/fotor-ai/index.astro"
  - "src/pages/tools/runway/index.astro"
  - "src/components/ToolDetailPage.astro"
  - "src/layouts/BaseLayout.astro"
  - "src/utils/resolveToolOutboundLink.ts"
  - "src/data/toolAffiliateLinks.ts"

unknowns:
  - "実ASPアカウントの最新承認状態・売上は未確認"
  - "実GA4へのイベント到達は未検証"
  - "ローカルAstro Preview実クリックは未検証"

preexisting_untracked_files: []

required_checks:
  - "npm run validate:task"
  - "npm run build"
  - "npm run validate:affiliate-links"
  - "npm run validate:scope"
  - "git diff --check"
  - "preview: InVideo primary and pricing CTA emits expected data-outbound-type, tool-name, cta-position and affiliate_click event payload"

acceptance_criteria:
  - "InVideo primary CTAにoutboundType: outboundLink.linkTypeとctaPosition: heroがある"
  - "InVideo pricing CTAにoutboundType: pricingOutboundLink.linkTypeとctaPosition: pricingがある"
  - "URL・rel・CTAラベル・広告開示・デザインが変わらない"
  - "affiliateとofficial fallbackをURLやクリック計測で正しく区別する"
  - "required_checksが実行環境でPASSしレビュー完了後にのみmerge判断する"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - URL_CHANGE
  - AFFILIATE_PROGRAM_CHANGE
  - PR_MERGE
---
# Task

## Background
Issue: https://github.com/rookies2478/ai-creative-tools-db/issues/1
現行master `dd0f8d9b61aa29a53d16a8c01aaf1c4858b0ed82` ではInVideo AIのみCTAイベントdata属性未接続。Fotor/Runwayは計測属性あり。主/料金リンクは`resolveToolOutboundLink()`で選ばれ、現行マスターの承認済み`toolAffiliateLinks`2件を参照する。

## Implementation Notes
既存CTAのhref、rel、ラベル、開示は触らず `outboundType` と `ctaPosition` の4propだけ追加。
Local checkout / dependencies / browser not available from present GPT sandbox; therefore `validate:task`, `npm build`, `validate:scope`, `preview` should remain **NOT_RUN** until actual CI/local evidence is recorded. Any GitHub-only change remains draft / unmerged. Never mark a skipped check PASS.

## Definition of Done
README/Task operations rulesを尊重。必要QAがPASSになればTaskをcompletedに移動し、LATESTを更新する。現時点はActiveのまま保持する。
