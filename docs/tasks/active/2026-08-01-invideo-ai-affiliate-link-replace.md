---
task_id: "2026-08-01-invideo-ai-affiliate-link-replace"
created_at: "2026-08-01"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "InVideo AIの公開アフィリエイトURLを、遷移先エラーになる旧リンク（https://invideo.sjv.io/c/7531370/883681/12258）から、Impactの Create a link で作成し正常遷移を確認済みの新リンク（https://invideo.sjv.io/enByKZ）へ1件だけ差し替える。"

non_goals:
  - 新しい設計の導入
  - 他ツールの変更
  - CTAロジック変更
  - disclosure変更
  - resolveToolOutboundLink()の変更
  - 本番反映
  - URLの加工・短縮・パラメータ追加

target_files:
  - src/data/toolAffiliateLinks.ts
  - src/data/affiliatePrograms.ts
  - docs/tasks/active/2026-08-01-invideo-ai-affiliate-link-replace.md
  - docs/tasks/completed/2026-08-01-invideo-ai-affiliate-link-replace.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/affiliate-link-architecture.md
  - docs/tasks/completed/2026-08-01-invideo-ai-affiliate-enable.md
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
  - toolAffiliateLinks.tsのinvideo-aiエントリのurlがhttps://invideo.sjv.io/enByKZに差し替わり、旧URLがファイル内に残っていない
  - toolSlug/provider/enabled/approvalStatus/disclosureRequired/verifiedAtは既存値のまま維持され、重複エントリが生成されない
  - affiliatePrograms.tsのinvideo-aiレコードのverifiedAtとnotesのみ更新され、報酬率・Cookie期間等の未確認情報は無変更
  - resolveToolOutboundLink({toolSlug:'invideo-ai', ...})がlinkType:affiliate, url:新URL, rel:'sponsored nofollow noopener noreferrer', disclosureRequired:trueを返す
  - npm run validate:affiliate-links と npm run build がPASSする
  - 旧URL文字列がリポジトリの現行設定ファイル（src/data配下）から検索してヒットしない

forbidden_operations:
  - PRODUCTION_DEPLOY
  - src/utils/resolveToolOutboundLink.tsの変更
  - src/pages/tools/invideo-ai/index.astroの変更
  - src/components/ToolDetailPage.astroの変更
  - src/layouts/BaseLayout.astroの変更
  - package.jsonの変更
  - scripts/validate-affiliate-links.mjsの変更
  - src/content/tools/*.mdの変更
  - 他ツールページ・comparisons・categories・ToolSummaryTable.astro・[slug].astro・privacy-policy・disclaimerの変更
---

# Task

## Background

2026-08-01に有効化したInVideo AIアフィリエイトpilotの公開URL（Impact Copy Link由来）が遷移先で「Something went wrong」エラーを返すことが判明。ユーザーがImpactの「Create a link」機能で新しいディープリンクを作成し、正常遷移することを確認済みのため、公開データのURLのみを差し替える。

## Implementation Notes

- toolAffiliateLinks.tsのurlフィールドのみ書き換え、他フィールドは無変更。
- affiliatePrograms.tsはverifiedAtとnotesのみ更新。
