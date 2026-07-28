---
task_id: "add-video-free-download-status-data"
created_at: "2026-07-28"
status: DONE
completed_at: "2026-07-28"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: true
official_verification_required: false

goal: "動画生成AI13ツールの無料生成・無料ダウンロード実機確認結果を管理する正本データ（src/data/videoFreeDownloadStatus.ts）を新設し、既存の無料条件ページ（/conditions/free/）へ横断比較セクションを追加する。新規記事は作成しない。"

non_goals:
  - 新規記事を作成しない
  - /comparisons/ai-video-generation-sample-comparison/を変更しない
  - /comparisons/avatar-video-ai-tools/を変更しない
  - 個別ツールページを変更しない
  - generatedVideos.tsを変更しない
  - title・H1・URL・canonicalを変更しない
  - 無料条件を公式の永久保証として断定しない
  - 画質・動き・生成品質の比較を追加しない
  - 動画を埋め込まない
  - poster一覧を追加しない
  - ランキングを作らない
  - 本番反映しない

target_files:
  - src/data/videoFreeDownloadStatus.ts
  - src/pages/conditions/free/index.astro
  - docs/tasks/active/add-video-free-download-status-data.md
  - docs/tasks/completed/2026-07-28-add-video-free-download-status-data.md
  - docs/tasks/LATEST.md

reference_files:
  - src/content/tools/kling-ai.md
  - src/content/tools/luma-ai.md
  - src/content/tools/pika.md
  - src/content/tools/runway.md
  - src/content/tools/pixverse.md
  - src/content/tools/capcut-ai.md
  - src/content/tools/hailuo-ai.md
  - src/content/tools/vidu-ai.md
  - src/content/tools/d-id.md
  - src/content/tools/heygen.md
  - src/content/tools/synthesia.md
  - src/content/tools/invideo-ai.md
  - src/content/tools/haiper.md
  - src/data/generatedVideos.ts
  - src/components/Free.astro
  - src/components/ComparisonFootnote.astro
  - docs/tasks/LATEST.md
  - docs/tasks/completed/2026-07-26-clarify-synthesia-free-download-limitation.md
  - docs/tasks/completed/2026-07-26-verify-synthesia-free-download.md
  - docs/tasks/completed/2026-07-27-clarify-heygen-free-download-limitation.md
  - docs/tasks/completed/2026-07-26-add-pixverse-generated-video.md

unknowns:
  - Kling AI・Pika・Runway・Luma AIの「無料ダウンロード」自体が明示的に確認された記録がリポジトリ内に不足しているため、freeDownloadをnot-confirmedとした
  - InVideo AIの生成失敗はユーザーからの申告のみでdocs/tasks/completed/配下に裏付けるtaskが存在しないため、not-confirmedとした
  - カード登録要否（cardRequired）はHeyGen・Synthesia以外は明示記録がないためunknown

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
  - npm run validate:data
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - 動画13ツールの無料生成・無料ダウンロード実機結果を管理する正本データを新設
  - Free Trialと恒常的な無料枠を区別
  - 無料生成可否と無料ダウンロード可否を分離
  - 実機確認日を表示
  - 未確認項目を断定しない（not-confirmed/unknown/not-applicableで表現）
  - /conditions/free/へ動画ツール専用セクションを追加
  - 既存作例比較記事・アバター比較記事と役割を重複させない（画質比較・動画埋め込みなし）
  - generatedVideos.ts無変更
  - build/data/scope/diff全PASS
  - 本番反映なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

新規記事案「無料で動画を作ってダウンロードできるAIは？」についてのカニバリ監査（別task）の結果、UPDATE_EXISTING判定となった。新規記事を作らず、動画生成AIの無料生成・無料ダウンロード実機結果を正本データ化し、既存の`/conditions/free/`ページへ横断比較セクションとして追加した。

## 実施内容

- `src/data/videoFreeDownloadStatus.ts`を新設。`VideoFreePlanType`（ongoing-free-plan/free-trial/limited-free-access/paid-only/service-unavailable/unknown）・`HandsOnStatus`（confirmed/not-confirmed/failed/not-applicable/unknown）・`VideoFreeDownloadStatus`型を定義し、動画系13ツール（kling-ai, luma-ai, pika, runway, pixverse, capcut-ai, hailuo-ai, vidu-ai, d-id, heygen, synthesia, invideo-ai, haiper）分のレコードを登録。
- 根拠と判定内訳:
  - Kling AI: freeGeneration=confirmed（generatedVideos.ts usageNote「無料プランで生成したため透かし（KlingAI 3.0）」）、freeDownload=not-confirmed（ダウンロード自体が無料である明記なし）
  - Pika・Runway・Luma AI: usageNoteに無料プランでの生成である旨の明記がないため freeGeneration/freeDownload とも not-confirmed
  - PixVerse・CapCut AI・Hailuo AI・Vidu AI: docs/tasks/completed/配下のユーザー実機確認task・generatedVideos.ts usageNoteの明示記述により freeGeneration/freeDownload とも confirmed（evidenceType: user-hands-on）
  - D-ID: Free Trialでの生成・ダウンロードをユーザー実機確認済み（confirmed／confirmed、planType: free-trial）
  - HeyGen: 無料生成はconfirmed、無料ダウンロードは実機確認で不可と判明したためfailed（evidenceType: user-hands-on）
  - Synthesia: 無料生成はconfirmed（公式Basicプラン）、無料ダウンロードは公式pricingページのWebFetch確認結果に基づきfailed（evidenceType: official）
  - InVideo AI: 本タスク背景でのユーザー申告（生成未完了）はあるが、裏付けるdocs/tasks/completed/配下のtaskが存在しないため、freeGeneration/freeDownloadともnot-confirmedとし、evidenceNoteに正式task作成を推奨する旨を記録
  - Haiper: src/content/tools/haiper.md記載の2025年2月コンシューマー向けサービスシャットダウンを根拠にplanType=service-unavailable、freeGeneration/freeDownloadともnot-applicable
- `src/pages/conditions/free/index.astro`へ、既存の`<Free>`コンポーネント（画像・動画横断の無料プラン一覧）はそのまま維持しつつ、その直後に新規セクション「動画生成AIの無料生成・無料ダウンロード実機確認」を追加。無料プラン種別・無料生成・無料ダウンロード・カード登録・透かし・確認日・詳細リンクを列とする独立テーブルをインラインscoped styleで実装し、`ComparisonFootnote`コンポーネントを流用した。
- `Free.astro`本体・既存の無料プラン一覧テーブル・FAQ・関連リンクは無変更。`generatedVideos.ts`・個別ツールページ・他の比較記事（ai-video-generation-sample-comparison・avatar-video-ai-tools）は無変更。
- title・H1・canonical・breadcrumb・JSON-LDは無変更。

## Checks結果

- validate:task: PASS
- npm run build: PASS（92ページ、警告0件）
- validate:data: PASS（Errors 0/Warnings 0/Verify 0）
- validate:scope: PASS（並行セッションが作成した`docs/audits/affiliate-program-management-audit-2026-07-28.md`が一時的に未追跡状態で検出されたが、本タスクとは無関係な別セッションの成果物であることを確認しpreexisting_untracked_filesへ記録。その後、当該ファイルは別セッションによって既にcommit・push済みであることを確認した）
- git diff --check: PASS（staged差分でCRLF警告のみ、実質的な問題なし）
- git diff --name-only: `src/pages/conditions/free/index.astro`（変更）・`src/data/videoFreeDownloadStatus.ts`（新規）の2件のみ変更を確認

## 本番反映

本番反映は行っていない。
