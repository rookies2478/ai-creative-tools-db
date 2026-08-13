---
task_id: "videoobject-structured-data-validation"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "既存publish validator（scripts/validate-publish.mjs）にVideoObject構造化データの自動検証を追加する。現在Kling AI・PixVerseページで出力されているVideoObject JSON-LDについて、不正JSON・重複・必須フィールド欠落・意図しないページへの漏出を検出できるようにする。SoftwareApplicationについても安全な範囲で最小限の検証を同一バリデータに追加する。"

non_goals:
  - "Kling AI・PixVerseページのJSON-LD出力変更"
  - "他ツールへのVideoObject追加"
  - "動画メタデータ変更"
  - "料金・DB・アフィリエイト変更"
  - "reports/クリーンアップ"
  - "画像生成スクリプト整理"
  - "記事・CSS・UI・URL変更"
  - "本番デプロイ"

target_files:
  - scripts/validate-publish.mjs
  - docs/tasks/active/2026-08-13-videoobject-structured-data-validation.md
  - docs/tasks/completed/2026-08-13-videoobject-structured-data-validation.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - scripts/validate-publish.mjs
  - src/data/generatedVideos.ts
  - src/pages/tools/kling-ai/index.astro
  - src/pages/tools/pixverse/index.astro
  - reports/structured-data-schema-audit.md

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
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "VideoObject JSON-LDが不正JSONの場合ERRORになる"
  - "同一ページ内のVideoObject重複がERRORになる"
  - "VideoObject必須フィールド（@context/@type/name/description/thumbnailUrl/uploadDate/duration/contentUrlまたはembedUrl）欠落がERRORになる"
  - "src/data/generatedVideos.tsのsampleType==='tool-video-output' && isSameToolAsPage===trueで定義されたpageSlug集合に含まれないツールページでVideoObjectが出力された場合ERRORになる"
  - "Kling AI・PixVerseの現状出力はPASSする"
  - "既存のFAQPage/BreadcrumbList検証が引き続き動作する"
  - "SoftwareApplicationの最小限検証（@type/name/url等の必須値・重複検出）を追加する"
  - "本番ページのJSON-LD出力を一切変更しない"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - TOOL_DB_BULK_EDIT
  - PAGE_SCHEMA_REWRITE
  - AFFILIATE_LINK_CHANGE
  - REPORTS_CLEANUP
---

# Task

## Background

Phase 2監査でVideoObject構造化データがvalidate-publish.mjsの検証対象外であることが判明。現在Kling AI・PixVerseページでVideoObject JSON-LDが本番出力されているが、これを壊す変更が入っても自動検出されない状態。

## Implementation Notes

- validate-publish.mjsは既存アーキテクチャ（dist/**/*.html静的正規表現解析、外部通信なし）を踏襲する。
- VideoObjectの適格ページ判定は、src/data/generatedVideos.tsのsampleType==='tool-video-output' && isSameToolAsPage===trueで定義されるpageSlug集合をソースオブトゥルースとして正規表現抽出し、/tools/{slug}/ルートに対する漏出ガードに使う（2ツールへのハードコード決め打ちを避ける）。
- 重複検出・必須フィールドチェックはcheckJsonLdEntry内の既存パターン（checkFaqPage/checkBreadcrumbList相当）に合わせてcheckVideoObject/checkSoftwareApplicationを追加する形で実装する。

## Result Schema

```
RESULT: PASS

SUMMARY:
scripts/validate-publish.mjsにVideoObject/SoftwareApplication構造化データ検証を追加。VideoObject適格性はsrc/data/generatedVideos.tsのsampleType==='tool-video-output' && isSameToolAsPage===trueで定義されるpageSlug集合から動的抽出（2ツールへの決め打ちなし）。本番ページのJSON-LD出力は無変更。

CHANGED_FILES:
1 (target_files内のscripts/validate-publish.mjsのみ。task lifecycleファイル除く)

CHECKS:
- task_validation: PASS
- build: PASS (92 pages)
- diff_check: PASS (git diff --check問題なし)
- scope_validation: PASS
- data_quality: 対象外（DBデータ変更なし）
- publish_check: PASS (Errors: 0, Warnings: 4 = 変更前と同一の既存long-meta-description系WARNINGのみ)
- preview: 対象外
- github_actions: 未確認（push前のためCIは未走行）

NEGATIVE_TESTS:
- 隔離fixtureプロジェクト（scratchpad配下、リポジトリ外）でscripts/validate-publish.mjs・astro.config.mjs・src/data/generatedVideos.tsをコピーし、以下を検証:
  - 不正JSON（構文エラー）→ invalid-json-ld ERROR検出
  - 同一ページ内VideoObject重複（2件）→ duplicate-videoobject ERROR検出
  - VideoObject必須フィールド欠落（name空）→ invalid-videoobject-field ERROR検出
  - 適格pageSlug集合外（midjourney）へのVideoObject出力 → videoobject-scope-violation ERROR検出
- テスト後、fixtureはリポジトリ外の一時ディレクトリのため本番ソースは無変更。

GIT:
- commit: 未実行（ユーザー承認待ち）
- push: 未実行
- origin_sync: 変更前時点でahead/behind 0/0

PRODUCTION:
NOT_DEPLOYED

LATEST_UPDATED:
yes

NEXT:
git add -A && commitしユーザー承認後にpush（SoftwareApplication検証はduplicate/name/url最小チェックのみ追加済み、更なる拡張は別タスクとする）
```

## Baseline (実装前確認結果)

- VideoObject出力ページ: src/pages/tools/kling-ai/index.astro, src/pages/tools/pixverse/index.astro の2ページのみ（他29ツールページには実装なし）
- VideoObjectカウント: 各ページ1件（条件付きpush、データ一致時のみ）
- SoftwareApplication出力ページ: 30ページ（tools配下29 + [slug].astro動的ルート）、各1件
- 既存validate-publish.mjsが検証していたJSON-LD型: FAQPage, BreadcrumbList のみ
- 検証方式: dist/**/*.html静的正規表現抽出＋JSON.parse。外部通信・DOM解析なし。ビルド後dist出力に対して実行（sourceでなく生成物ベース）。

## Implementation

- checkJsonLdEntryにtypeCounts（ページ内@type別カウント、@graph配下含む）を追加
- checkVideoObject: name/description/uploadDate/duration必須非空、thumbnailUrl（string/array両対応）必須、contentUrl/embedUrlいずれか必須、uploadDateはDate.parse可能性チェック、durationはISO 8601 duration正規表現チェック
- checkSoftwareApplication: name非空、urlがhttp(s)形式で非空
- duplicate-videoobject・duplicate-softwareapplication: 同一ページ内複数出現をERROR
- videoobject-scope-violation: /tools/{slug}/ルートでVideoObjectが出現した場合、src/data/generatedVideos.tsから正規表現抽出したVIDEOOBJECT_ELIGIBLE_SLUGS（sampleType==='tool-video-output' && isSameToolAsPage===true）に含まれないslugならERROR
- 既存のFAQPage/BreadcrumbList検証・他全チェックは無変更で共存

## Future Gaps

- SoftwareApplicationのapplicationCategory/operatingSystem等の追加フィールド検証は未実施（安全側で最小限に留めた。別タスク候補）
- VideoObjectの実際のslug完全一致（現状kling-ai/pixverseのみ）までは絞り込んでいない（データ適格集合レベルの漏出ガードに留める設計。より厳密な「実装済み2件のみ許可」にするかは別途方針判断が必要）
