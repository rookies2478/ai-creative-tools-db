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

## Result

PASS

## Summary

- `src/data/affiliatePrograms.ts`: InVideo AIレコードをstatus:candidate→active、approvalStatus:not_applied→approved、preferredProvider:'InVideo'→'Impact / InVideo'、network:'Impact.com'→'Impact'、programName:'InVideo Affiliate Program'→'InVideo application'、verifiedAt:2026-07-28→2026-08-01へ更新。commissionType/commissionValue/cookieDays/japanEligible/mediaEligible/sourceTypeは未確認情報のため無変更（推測追加なし）。
- `src/data/toolAffiliateLinks.ts`: 空配列から、invideo-ai用エントリを1件追加（url: https://invideo.sjv.io/c/7531370/883681/12258, provider: 'Impact / InVideo', enabled:true, approvalStatus:'approved', disclosureRequired:true, verifiedAt:'2026-08-01'）。URLはユーザー提供値をそのまま使用、加工・パラメータ追加なし。
- `resolveToolOutboundLink()`・`src/pages/tools/invideo-ai/index.astro`・`src/components/ToolDetailPage.astro`は無変更。ソースコード読解によるトレースで、invideo-aiがlinkType:affiliate / rel:'sponsored nofollow noopener noreferrer' / isAffiliate:true / disclosureRequired:trueに解決されること、他28ツールは該当エントリなしのためofficialのまま変化しないことを確認。
- PR開示: `ToolDetailPage.astro`の`{primaryCtaDisclosure && ...}`条件により、InVideo AIページでのみ「このページにはアフィリエイトリンクが含まれます。」が1回表示される設計を変更なしで確認。他28ツールはprimaryCtaDisclosureが渡されないため非表示のまま。

## Changed Files

- 変更: `src/data/affiliatePrograms.ts`, `src/data/toolAffiliateLinks.ts`
- 新規→移動: `docs/tasks/active/2026-08-01-invideo-ai-affiliate-enable.md` → `docs/tasks/completed/2026-08-01-invideo-ai-affiliate-enable.md`
- 更新: `docs/tasks/LATEST.md`
- 計2ファイル変更・1タスクファイル移動・LATEST更新

## Checks

- task validation: PASS
- validate:affiliate-links: PASS
- build: PASS（92ページ）
- diff check: PASS（CRLF警告のみ、内容上の問題なし）
- scope validation: PASS
- secrets check: PASS（password/secret/token/api key/login等の該当なし）
- generated HTML直接確認: 未実施（dist/への直接アクセスが本環境権限でブロック。過去タスクと同一制約。ソースコードのresolverロジックトレースとbuild成功で代替確認）

## Git

- branch: master
- commit: c89d148「Enable InVideo AI affiliate link」+ 本ファイルのcompleted移動・LATEST更新を含む追加commit
- push: 実施
- origin sync: push後に確認
- working tree: push後clean

## Production

- state: NOT_DEPLOYED

## Decisions

`docs/decisions/affiliate-link-architecture.md`の既存決定（案C）に変更なし。affiliatePrograms.tsを公開CTAの直接参照元にしない原則を維持したまま、toolAffiliateLinks.tsのみでpilotを有効化した。

## LATEST Update

`docs/tasks/LATEST.md`を本タスクの結果で更新。

## Next

GitHub Actions成功確認後、本番反映し、InVideo AIページのCTA・rel・PR開示を実環境で確認する。他ツールへの展開は別タスクとして個別に判断する。
