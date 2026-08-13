---
task_id: "2026-08-13-add-photoroom-creatify-recraft"
created_at: "2026-08-13"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: true
official_verification_required: true

goal: "承認済み監査（docs/audits/new-tool-candidates-consolidated-audit-2026-08-13.md）に基づき、新規ツール3件（Photoroom, Creatify, Recraft）をDB・専用ページ（動的ルート経由）・カテゴリハブ・少数の内部リンクへ追加する。"

non_goals:
  - "Magnific（旧Freepik AI）・Google Flow・Krea AI・OpenArt・LTX Studio・Higgsfield AI・Picsart AIの追加（監査でHOLD/REJECT）"
  - "toolAffiliateLinks.tsへの新規アフィリエイトエントリ追加（案Cフロー未完了のため対象外）"
  - "affiliateUrlフィールドの設定（休眠フィールド、新規設定禁止）"
  - "新規比較記事（vs記事）の作成"
  - "URL構造・DBスキーマ形状・比較ロジック・認証情報・デプロイ設定の変更"
  - "本番デプロイ"

target_files:
  - src/content/tools/photoroom.md
  - src/content/tools/creatify.md
  - src/content/tools/recraft.md
  - src/pages/categories/image-generation/index.astro
  - src/pages/use-cases/ec-product-image/index.astro
  - src/pages/use-cases/ad-banner/index.astro
  - src/pages/guides/ai-image-commercial-use-checklist/index.astro
  - docs/tasks/active/2026-08-13-add-photoroom-creatify-recraft.md
  - docs/tasks/completed/2026-08-13-add-photoroom-creatify-recraft.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/audits/new-tool-candidates-consolidated-audit-2026-08-13.md
  - docs/decisions/affiliate-link-architecture.md
  - src/content/config.ts

unknowns:
  - "Photoroom日本語UI/プロンプト/ドキュメント対応（unknown、監査でVERIFY指定）"
  - "Creatify商用利用可否の公式明記（unknown、監査でVERIFY指定）"
  - "Creatify日本語対応（unknown）"
  - "Recraft正確な料金ティア名・価格（unknown、監査でVERIFY指定、数値を断定しない）"
  - "Recraft日本語対応（unknown）"
  - "Recraft運営法人名（unknown）"

preexisting_untracked_files:
  - docs/audits/new-tool-candidates-consolidated-audit-2026-08-13.md

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - npm run validate:scope
  - npm run validate:data
  - npm run validate:publish

acceptance_criteria:
  - "3ツールのcontent/tools/*.mdがsrc/content/config.tsのzodスキーマを満たしbuildを通過する"
  - "affiliateUrlフィールドを一切設定しない（officialUrlのみ使用）"
  - "各ツールが/tools/<slug>/で正常にページ表示される（[slug].astro動的ルート経由、STATIC_OVERRIDESに追加しない）"
  - "image-generation категорияハブにphotoroom・recraftが追加表示される"
  - "ec-product-image用途ページにPhotoroom、ad-banner用途ページにCreatify、ai-image-commercial-use-checklistガイドにRecraftの内部リンクが追加される"
  - "既存29ツール・比較ロジック・アフィリエイトデータに変更がない"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - AFFILIATE_LINK_REGISTRATION
  - SCHEMA_CHANGE
  - URL_STRUCTURE_CHANGE
---

# Task

## Background

docs/audits/new-tool-candidates-consolidated-audit-2026-08-13.md（AUDIT-ONLY監査）で10候補中3件（Photoroom, Creatify, Recraft）がADD_NOW判定された。本タスクはその実装（第1バッチ）。

## Implementation Notes

- 実装順序: Photoroom → Creatify → Recraft（各ツール追加後にvalidate:data・buildを実行）
- affiliateUrlは設定しない。すべてofficialUrlのみ使用（案Cフロー未完了のため）。
- 専用astroページは新規作成せず、既存の`src/pages/tools/[slug].astro`動的ルートをそのまま使用する（STATIC_OVERRIDESセットに追加しない）。
- カテゴリハブ（image-generation）のprimaryImageSlugs配列にphotoroom・recraftを追加。Creatifyはvideo-generationカテゴリの主要比較表（テキスト→動画モデル中心の構成）とは性質が異なるため追加せず、ad-banner用途ページの内部リンクのみとする。
- 内部リンクは監査の推奨候補（ec-product-image→Photoroom、ad-banner→Creatify、ai-image-commercial-use-checklistガイド→Recraft）に限定し、他ページへの拡散は行わない。
- 不確実な事実（日本語対応・正確な料金ティア等）はunknown/要確認として記載し断定しない。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- build:
- diff_check:
- scope_validation:
- data_quality:
- publish_check:
- preview:
- github_actions:

GIT:
- commit:
- push:
- origin_sync:

PRODUCTION:
NOT_DEPLOYED | DEPLOYED | NEEDS_VERIFICATION

LATEST_UPDATED:
yes | no

NEXT:
one concrete next action
```
