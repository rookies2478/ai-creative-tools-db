---
task_id: "2026-08-01-invideo-ai-affiliate-enable"
created_at: "2026-08-01"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "InVideo AIの承認済みアフィリエイトURL（Impact/InVideo, https://invideo.sjv.io/c/7531370/883681/12258）を公開用データへ登録し、既存resolveToolOutboundLink()経由でInVideo AIページのprimary CTAに反映する。"

non_goals:
  - 他28ツールの変更
  - resolveToolOutboundLink()の設計変更
  - src/components/ToolDetailPage.astroの設計変更
  - src/pages/tools/invideo-ai/index.astroの構造変更
  - secondaryCta / sources / relatedTools / comparisons / categoriesの変更
  - 既存src/content/tools/*.md の affiliateUrl フィールドの使用
  - 新規ASP調査
  - 本番反映
  - URLの加工・短縮・パラメータ追加

target_files:
  - src/data/affiliatePrograms.ts
  - src/data/toolAffiliateLinks.ts
  - docs/tasks/active/2026-08-01-invideo-ai-affiliate-enable.md
  - docs/tasks/completed/2026-08-01-invideo-ai-affiliate-enable.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/affiliate-link-architecture.md
  - docs/tasks/completed/2026-07-29-invideo-ai-affiliate-pilot.md
  - src/utils/resolveToolOutboundLink.ts
  - scripts/validate-affiliate-links.mjs

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run validate:affiliate-links
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - toolAffiliateLinks.tsにinvideo-ai用エントリが1件だけ追加され、enabled:true / approvalStatus:approved / url:https://invideo.sjv.io/c/7531370/883681/12258 / disclosureRequired:true / verifiedAt:2026-08-01である
  - affiliatePrograms.tsのinvideo-aiレコードがstatus:active / approvalStatus:approved / verifiedAt:2026-08-01に更新され、未確認の報酬率等の推測追加がない
  - resolveToolOutboundLink({toolSlug:'invideo-ai', officialUrl})がlinkType:affiliate、rel:'sponsored nofollow noopener noreferrer'、isAffiliate:trueを返す
  - 他28ツールのresolveToolOutboundLink()結果がofficialのまま変化しない
  - npm run validate:affiliate-links がPASSする
  - npm run build がPASSする

forbidden_operations:
  - PRODUCTION_DEPLOY
  - src/utils/resolveToolOutboundLink.tsの変更
  - src/pages/tools/invideo-ai/index.astroの変更
  - src/components/ToolDetailPage.astroの変更
  - package.jsonの変更
  - 他ツールページ・comparisons・categories・src/content/tools/*.mdの変更
---

# Task

## Background

InVideo AIのアフィリエイトpilot（案C）は3a08335で実装済み。resolveToolOutboundLink()はtoolAffiliateLinks.tsにenabled:true/approvalStatus:approvedのエントリがある場合のみaffiliateへ解決する設計。InVideo applicationがImpact上でapprovedとなり、承認済みトラッキングリンクを取得済みのため、公開データを登録してpilotを有効化する。

## Implementation Notes

- affiliatePrograms.tsは調査・申請管理層のまま維持し、公開CTAから直接参照しない設計を変更しない。
- toolAffiliateLinks.tsに1件追加するのみで、resolveToolOutboundLink()・index.astro・ToolDetailPage.astroは無変更。
