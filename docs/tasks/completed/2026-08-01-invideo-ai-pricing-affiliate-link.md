---
task_id: "2026-08-01-invideo-ai-pricing-affiliate-link"
created_at: "2026-08-01"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "InVideo AIページのsecondary CTA「料金プランを確認（公式）」のリンク先だけを、承認済みの料金ページ用アフィリエイトリンク（https://invideo.sjv.io/JkQeKe）へ変更する。primary CTAは無変更。"

non_goals:
  - primary CTAの変更
  - CTAラベルの変更
  - sources / relatedTools / japanBilling / comparisons / categoriesの変更
  - 他28ツールの変更
  - PR開示ロジックの変更（既存条件で1回表示のまま）
  - 本番反映

target_files:
  - src/data/toolAffiliateLinks.ts
  - src/utils/resolveToolOutboundLink.ts
  - src/pages/tools/invideo-ai/index.astro
  - src/components/ToolDetailPage.astro
  - scripts/validate-affiliate-links.mjs
  - docs/tasks/active/2026-08-01-invideo-ai-pricing-affiliate-link.md
  - docs/tasks/completed/2026-08-01-invideo-ai-pricing-affiliate-link.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/affiliate-link-architecture.md
  - docs/tasks/completed/2026-08-01-invideo-ai-affiliate-link-replace.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run validate:affiliate-links
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - toolAffiliateLinks.tsにtoolSlug:invideo-ai/placement:pricingの新規エントリが1件追加され、既存primaryエントリ（enByKZ）は無変更
  - resolveToolOutboundLink()がplacement引数を受け付け、未指定時はprimary相当の既存動作を維持する
  - resolveToolOutboundLink({toolSlug:'invideo-ai', officialUrl, placement:'pricing'})がurl:https://invideo.sjv.io/JkQeKe, linkType:affiliate, rel:'sponsored nofollow noopener noreferrer'を返す
  - InVideo AIページのsecondaryCta.hrefが新URLになり、primaryCtaは無変更
  - PR開示はページ内で1回のみ表示される（primary/secondary両方がaffiliateでも重複しない）
  - npm run validate:affiliate-links と npm run build がPASSする
  - 他28ツールのCTA・resolver結果に変化がない

forbidden_operations:
  - PRODUCTION_DEPLOY
  - src/data/affiliatePrograms.tsの変更（今回のデータは既存placement概念で十分管理可能なため不要と判断。必要になった場合はHOLD）
  - 他ツールページ・comparisons・categories・sources・relatedTools・privacy-policy・disclaimer・BaseLayout・package.jsonの変更
---

# Task

## Background

InVideo AIのprimary CTAは既にImpact承認済みリンク（https://invideo.sjv.io/enByKZ）で稼働中。今回は同ツールのsecondary CTA「料金プランを確認（公式）」だけを、Impactで別途作成された料金ページ専用アフィリエイトリンク（https://invideo.sjv.io/JkQeKe）へ切り替える。既存のtoolAffiliateLinks.tsは1ツール1URL（toolSlugのみキー）の構造のため、同一ツールで複数用途（primary/pricing）を安全に管理できるよう、placementフィールドを追加する最小拡張を行う。

## Implementation Notes

- ToolAffiliateLink型にplacement?: 'primary' | 'pricing'を追加（省略時は'primary'として扱う後方互換）。
- resolveToolOutboundLink()にplacement引数（省略可、デフォルト'primary'）を追加し、toolSlug+placementで検索するよう拡張。
- validate-affiliate-links.mjsの重複チェックキーをtoolSlugのみからtoolSlug+placementへ変更。
- ToolDetailPage.astroのsecondaryCta型にoptionalなrelを追加し、指定時はそれを使用（未指定時は従来のnofollow noopener noreferrerを維持し他28ツールへ影響なし）。

## Result

PASS

## Summary

- `src/data/toolAffiliateLinks.ts`: `LinkPlacement`型（'primary'|'pricing'）と`ToolAffiliateLink.placement?`（省略時'primary'扱い）を追加。既存invideo-aiエントリへ`placement:'primary'`を明示付与し無変更維持、新規に`placement:'pricing'`（url: https://invideo.sjv.io/JkQeKe、他フィールドはprimaryと同値）を1件追加。
- `src/utils/resolveToolOutboundLink.ts`: 引数に`placement?: 'primary'|'pricing'`（デフォルト`'primary'`）を追加し、検索条件を`toolSlug`+`(placement ?? 'primary')`の一致へ拡張。既存の呼び出し（placement省略）は従来どおりprimaryエントリに解決され後方互換。
- `scripts/validate-affiliate-links.mjs`: 重複チェックキーを`toolSlug`単独から`toolSlug:placement`へ変更（placement省略時は'primary'扱い）。
- `src/components/ToolDetailPage.astro`: `secondaryCta`型へoptionalな`rel`を追加し、指定時はそれを使用（未指定時は従来の`'nofollow noopener noreferrer'`を維持）。他28ツールは`rel`を渡していないため無影響。
- `src/pages/tools/invideo-ai/index.astro`: `resolveToolOutboundLink({toolSlug:'invideo-ai', officialUrl:'https://invideo.io/pricing/', placement:'pricing'})`を追加呼び出しし、`secondaryCta`のhref/relをその結果へ接続。official fallback URL（https://invideo.io/pricing/）はコード上に維持。primaryCtaは無変更。
- PR開示ロジック（`primaryCtaDisclosure`）は無変更。primary/pricing両方がaffiliate判定でも、開示表示はprimary側の条件1箇所のみに紐づくため重複表示なし。
- 他28ツール・comparisons・categories・sources・relatedTools・affiliatePrograms.ts・privacy-policy・disclaimer・BaseLayout・package.jsonは無変更。

## Changed Files

- 変更: `src/data/toolAffiliateLinks.ts`, `src/utils/resolveToolOutboundLink.ts`, `scripts/validate-affiliate-links.mjs`, `src/components/ToolDetailPage.astro`, `src/pages/tools/invideo-ai/index.astro`
- 新規→移動: `docs/tasks/active/2026-08-01-invideo-ai-pricing-affiliate-link.md` → `docs/tasks/completed/2026-08-01-invideo-ai-pricing-affiliate-link.md`
- 更新: `docs/tasks/LATEST.md`

## Checks

- task validation: PASS
- validate:affiliate-links: PASS
- build: PASS（92ページ、error/warning無し）
- diff check: PASS（CRLF警告のみ）
- scope validation: PASS
- secrets check: PASS
- generated HTML直接確認: 未実施（dist/への直接アクセスが本環境権限でブロック。過去タスクと同一制約。ソースコードトレースとbuild成功で代替確認）

## Git

- branch: master
- commit: f91ef71「Add InVideo AI pricing affiliate link」+ completed移動・LATEST更新の追加commit
- push: 実施
- origin sync: push後に確認
- working tree: push後clean

## Production

- state: NOT_DEPLOYED

## Next

GitHub Actions成功確認後、本番反映し、primary/secondary両CTAの正常遷移とPR開示表示（1回のみ）をブラウザで確認する。
