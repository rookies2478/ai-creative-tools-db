---
task_id: "add-d-id-sample-to-avatar-video-comparison"
created_at: "2026-07-28"
status: DONE
completed_at: "2026-07-28"
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "既存のアバター動画生成AI比較記事（/comparisons/avatar-video-ai-tools/）へ、D-IDの独自生成動画サンプル（Free Trial・日本語台本・全画面透かしあり）を実例として追加する。Text to Video比較とは分離して掲載する。"

non_goals:
  - D-ID動画をText to Video比較へ追加しない
  - comparisonEligibleを変更しない
  - generatedVideos.tsを変更しない
  - 動画・posterを変更しない
  - 動画を再生成しない
  - 他ツールの動画を追加しない
  - HeyGen・Synthesiaに独自動画があるように見せない
  - D-IDの商用利用可否を断定しない
  - title・URL・canonicalを変更しない
  - 本番反映しない

target_files:
  - src/pages/comparisons/avatar-video-ai-tools/index.astro
  - docs/tasks/active/add-d-id-sample-to-avatar-video-comparison.md
  - docs/tasks/completed/2026-07-28-add-d-id-sample-to-avatar-video-comparison.md
  - docs/tasks/LATEST.md

reference_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/d-id/index.astro
  - src/content/tools/d-id.md
  - src/components/GeneratedVideoSample.astro
  - src/components/ToolDetailPage.astro
  - docs/tasks/LATEST.md

unknowns:
  - D-IDの商用利用可否（プランにより異なる可能性、要確認のまま）
  - Free Trialの無料枠が恒常的か将来変更されるか

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
  - D-ID独自動画をアバター動画比較記事へ追加
  - Free Trialと明記
  - 日本語台本使用を明記
  - 全画面透かしを明記
  - 無料ダウンロード確認を明記
  - Text to Video比較対象外と明記
  - comparisonEligibleは変更しない
  - generatedVideos.ts無変更
  - D-ID個別ページへ内部リンク
  - 他ツール情報無変更
  - build/data/scope/diff全PASS
  - 本番反映なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

`src/data/generatedVideos.ts`にD-IDのFree Trial実例動画（sourceToolSlug: d-id, sampleType: tool-video-output, comparisonEligible: false）が既に登録済み。個別ページ`/tools/d-id/`には既に表示済みだが、アバター動画比較記事`/comparisons/avatar-video-ai-tools/`にはD-IDの独自動画実例が未掲載だったため、今回追加した。

## 実施内容

- `src/pages/comparisons/avatar-video-ai-tools/index.astro`へ`GeneratedVideoSample`コンポーネントと`generatedVideos`のimportを追加。
- `dIdSampleVideo`を`pageSlug === 'd-id' && sampleType === 'tool-video-output' && isSameToolAsPage`条件で取得（d-id個別ページと同じ抽出ロジック）。該当1件のみであることを確認済み。
- 「3ツールの位置づけ早見」セクションと比較表の間に「D-IDの日本語アバター動画実例」セクションを新規追加。
  - Free Trial使用、D-ID提供ストックアバター使用、日本語台本、約12秒、全画面「D-iD」透かし、無料トライアルでダウンロード確認済み、Text to Video比較とは生成方式が異なる旨、1本のみの確認結果である旨を明記。
  - D-ID個別ページ（`/tools/d-id/`）への内部リンクを設置。
  - 禁止表現（D-IDが最も高品質／最も自然／無料で商用利用可能／恒常的に無料／HeyGen・Synthesiaより優れている／3ツール同一条件比較）は使用していない。
- title・H1・canonical・breadcrumb・JSON-LD基本構造・比較表・FAQ・他ツール（HeyGen・Synthesia）の記述は無変更。
- `generatedVideos.ts`・動画ファイル・poster・`GeneratedVideoSample.astro`は無変更（既存コンポーネントで正方形動画がobject-fit: containによりレイアウト崩れなく表示可能なため、コンポーネント変更不要と判断）。

## Checks結果

- validate:task: PASS
- npm run build: PASS（92ページ、警告0件）
- validate:data: PASS（Errors 0/Warnings 0/Verify 0）
- validate:scope: PASS
- git diff --check: PASS（CRLF警告のみ、実質的な問題なし）
- git diff --name-only: `src/pages/comparisons/avatar-video-ai-tools/index.astro`のみ変更を確認
- D-ID動画ファイル・poster存在確認: 済み（`public/videos/generated/tools/d-id-tool-video-output-01.mp4`・`-poster.webp`）
- 生成HTMLでの直接確認: 本環境の権限制約により`dist/`への直接アクセス不可のため未実施（過去タスクと同様の制約）。ソースコードレベルでD-ID動画参照・内部リンク・Free Trial表記・透かし表記の存在は確認済み。
- ブラウザでの実表示確認（1440px/768px/375px・正方形動画比率・controls・autoplayなし・音声・console error）: 未実施。理由：本セッションでブラウザ自動化未使用。次回持ち越し候補として記録。

## 本番反映

本番反映は行っていない。
