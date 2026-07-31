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

## Result

PASS

## Summary

- `src/data/toolAffiliateLinks.ts`: invideo-aiエントリのurlを`https://invideo.sjv.io/c/7531370/883681/12258`から`https://invideo.sjv.io/enByKZ`へ1件のみ差し替え。toolSlug/provider/enabled/approvalStatus/disclosureRequired/verifiedAtは無変更、重複エントリなし。
- `src/data/affiliatePrograms.ts`: invideo-aiレコードのnotes（プログラム内・トップレベル両方）を「デフォルトのCopy Linkが遷移先エラーになったため、ImpactのCreate a linkで作成した正常動作リンクへ差し替えた」事実へ更新。verifiedAtは2026-08-01のまま維持（同日差し替えのため日付変更なし）。commissionType/commissionValue/cookieDays/japanEligible/mediaEligible/sourceTypeは未確認情報のため無変更。
- resolveToolOutboundLink.ts・invideo-ai/index.astro・ToolDetailPage.astro等は無変更。ソースコードトレースにより、invideo-aiが新URLでlinkType:affiliate、rel:'sponsored nofollow noopener noreferrer'、disclosureRequired:trueへ解決されることを確認。他28ツールは無変更。
- 旧URL文字列（7531370/883681/12258）はsrc/data配下から検索してヒットせず消滅を確認。docs内の過去タスク履歴・LATEST.mdの記録としては残存（許容範囲、事実として保持）。

## Changed Files

- 変更: `src/data/affiliatePrograms.ts`, `src/data/toolAffiliateLinks.ts`
- 新規→移動: `docs/tasks/active/2026-08-01-invideo-ai-affiliate-link-replace.md` → `docs/tasks/completed/2026-08-01-invideo-ai-affiliate-link-replace.md`
- 更新: `docs/tasks/LATEST.md`

## Checks

- task validation: PASS
- validate:affiliate-links: PASS
- build: PASS（92ページ）
- diff check: PASS（CRLF警告のみ）
- scope validation: PASS
- secrets check: PASS
- generated HTML直接確認: 未実施（dist/への直接アクセスが本環境権限でブロック。過去タスクと同一制約。ソーストレースとbuild成功で代替）

## Git

- branch: master
- commit: 0592aa8「Replace InVideo AI affiliate link」+ completed移動・LATEST更新の追加commit
- push: 実施
- origin sync: push後に確認
- working tree: push後clean

## Production

- state: NOT_DEPLOYED

## Next

GitHub Actions成功確認後、本番反映し、新しいCTAリンク（https://invideo.sjv.io/enByKZ）の正常遷移をブラウザで確認する。
