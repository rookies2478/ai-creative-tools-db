---
task_id: "2026-08-13-remove-duplicate-reference-images-script"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "scripts/generate-reference-image.mjs(singular)がscripts/generate-reference-images.mjs(plural)の全機能を代替することを確認し、確認できた場合のみplural版を削除する。"

non_goals:
  - scripts/generate-reference-image.mjs 変更
  - scripts/generate-sample-image.mjs 変更
  - package.json 変更
  - 画像生成の実行
  - generatedImages.ts / DB / スキーマ変更
  - 本番デプロイ

target_files:
  - scripts/generate-reference-images.mjs
  - docs/tasks/active/2026-08-13-remove-duplicate-reference-images-script.md
  - docs/tasks/completed/2026-08-13-remove-duplicate-reference-images-script.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/audits/image-generation-scripts-audit-2026-08-13.md
  - docs/tasks/completed/2026-08-13-image-generation-scripts-safety-fixes.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - node --check scripts/generate-reference-image.mjs
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - plural版の全3出力がsingular版のtarget選択で完全網羅されることを確認
  - 同一出力パス・同等prompt・同一model/webp変換・同一retry挙動を確認
  - リポジトリ内でplural版へのactive依存が存在しないことを確認
  - 条件を満たす場合のみscripts/generate-reference-images.mjsを削除
  - singular script無変更
  - ライブAPI呼び出しなし

forbidden_operations:
  - PRODUCTION_DEPLOY
  - LIVE_IMAGE_GENERATION
  - SINGULAR_SCRIPT_MODIFY
  - SAMPLE_SCRIPT_MODIFY
  - PACKAGE_JSON_MODIFY
---

# Task

## Background

先行監査・safety-fix taskでsingular版がcanonical、plural版がDEPRECATE候補と判定済み。本taskで機能的完全代替を最終確認し、確認できれば削除する。

## Result Schema

```
RESULT: PASS

SUMMARY:
scripts/generate-reference-image.mjs(singular)がscripts/generate-reference-images.mjs(plural)の全3出力を機能的に完全代替することを確認。リポジトリ内にplural版へのactive依存なし（package.json/CI/README/sourceにヒットなし、docs内の言及は全て監査・完了task記録のhistorical referenceのみ）。plural版を削除。

CHANGED_FILES:
2 (scripts/generate-reference-images.mjs 削除, docs/tasks/LATEST.md)

CHECKS:
- task_validation: PASS
- reference_check: PASS（active依存なし）
- node_check: PASS（singular script構文検証OK）
- diff_check: PASS
- scope_validation: PASS
- build_if_required: N/A（スクリプト削除のみ、Astro build範囲外）

GIT:
- commit: 別途記載（LATEST.md参照）
- push: 別途記載

PRODUCTION:
NOT_DEPLOYED（ローカルスクリプト削除のみ、対象外）

LATEST_UPDATED:
yes

NEXT:
なし（画像生成スクリプト整理完了）
```

### 機能比較詳細（全3出力）

| # | plural target/out | singular target key | prompt | model/provider | webp変換 | retry |
|---|---|---|---|---|---|---|
| 1 | public/images/generated/categories/image-generation-reference-visual-01.webp | `image-generation` | 同一意図（抽象カラフルデジタルアート、16:9）※文言微差あるが同一カテゴリ・同一スタイル意図 | FLUX.1-schnell（plural: raw fetch api-inference.huggingface.co／singular: InferenceClient SDK, provider hf-inference）同一モデル | sharp resize(1200x675,cover)+webp(quality85) 同一 | 3回, 5秒待機 同一 |
| 2 | public/images/generated/categories/video-generation-reference-visual-01.webp | `video-generation` | 同一意図（夜景シネマティック、16:9） | 同上 | 同一 | 同一 |
| 3 | public/images/generated/guides/free-ai-image-tools-reference-visual-01.webp | `free-ai-image-tools` | 同一意図（明るいミニマルワークスペース、16:9） | 同上 | 同一 | 同一 |

出力パスは3件とも完全一致。B-scheme reference-visual意味論（sampleType:'reference-visual', comparisonEligible:false）はいずれもgeneratedImages.ts側の登録に依存し、両スクリプトとも生成後の手動登録前提で不変。plural独自の機能・出力は確認されず。

### リポジトリ参照チェック結果

`generate-reference-images` 文字列ヒット4件、全てdocs配下（LATEST.md／2件のcompleted task／1件のaudit doc）＝historical/audit referenceのみ。package.json・.github/workflows・README.md・アプリケーションソースにヒットなし＝active dependencyなし。

### 実行安全性

ライブAPI呼び出し・画像生成は一切実施していない。削除はファイル削除のみで、singular script・sample script・package.json・生成画像アセット・メタデータは無変更。
