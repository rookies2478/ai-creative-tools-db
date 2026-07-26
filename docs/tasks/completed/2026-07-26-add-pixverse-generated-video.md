---
task_id: "add-pixverse-generated-video"
created_at: "2026-07-26"
status: DONE
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "Register the user's PixVerse-generated video (Text to Video, shared benchmark prompt) into the existing generatedVideos sample structure and display it on the PixVerse tool page, following the same pattern as Kling AI / Luma AI / Pika / Runway."

non_goals:
  - 動画の再生成
  - 動画内容の編集・トリミング・色調補正・アップスケール・フレーム補間
  - 透かしの削除
  - 既存のKling AI、Luma AI、Pika、Runway動画の変更
  - 既存動画のprompt本文の書き換え
  - 他ツールページの変更
  - 本番反映
  - ユーザーの未追跡ZIPや分析ファイルのcommit

target_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/pixverse/index.astro
  - public/videos/generated/tools/pixverse-tool-video-output-01.mp4
  - public/videos/generated/tools/pixverse-tool-video-output-01-poster.webp
  - docs/tasks/active/add-pixverse-generated-video.md
  - docs/tasks/completed/2026-07-26-add-pixverse-generated-video.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - src/data/generatedVideos.ts
  - src/pages/tools/kling-ai/index.astro
  - src/components/GeneratedVideoSample.astro
  - src/components/ToolDetailPage.astro

unknowns:
  - 元動画の生成日時（ファイルの更新日時をgeneratedAtとして採用）
  - PixVerseのモデル詳細バージョン（ファイル名の"V6"のみ確定情報として採用）

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
  - Downloads内の正しいPixVerse動画（PixVerse_V6_Image_Text_360P_A_cinematic_5secon.mp4）を特定
  - 動画をリポジトリへコピー（元ファイルは無変更・無削除）
  - poster画像を実際の正常フレームから作成
  - generatedVideos.tsへPixVerseエントリを1件追加（既存4件は無変更）
  - promptは既存共通プロンプトを原文のまま記録
  - durationSec・resolutionはffprobeの実測値を記録
  - PixVerse個別ページで動画セクションが表示される
  - build成功
  - validate:data成功
  - validate:scope成功
  - 本番反映しない

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

ユーザーがPixVerseで既存の動画比較共通プロンプトを使用してText to Video動画を生成し、Windowsのダウンロードフォルダへ保存済み。Kling AI、Luma AI、Pika、Runwayと同じ独自動画サンプルの仕組みでPixVerseページへ掲載する。

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

## Result

status: DONE

Windowsダウンロードフォルダから`PixVerse_V6_Image_Text_360P_A_cinematic_5secon.mp4`（更新日時2026-07-26、他候補動画なし）を特定。ffprobeで実測: h264/aac, 640x360, 5.04秒, 24fps, 音声トラックあり。フレーム抽出で右上に"PixVerse.ai"透かしを目視確認。

元ファイルはコピーのみ（Downloads側は無変更・無削除）。`public/videos/generated/tools/pixverse-tool-video-output-01.mp4`へ配置。正常フレーム（frame_1）からposter画像を作成し`pixverse-tool-video-output-01-poster.webp`として保存（16KB、既存poster群と同水準）。

`src/data/generatedVideos.ts`へ既存4件と同形式でPixVerseエントリを1件追加（既存4件は無変更）。promptは共通ベンチマーク文を原文のまま記録。durationSec=5・resolution="640x360"はffprobe実測値。model名は確実なバージョン以上の詳細が確認できないため「PixVerse V6（モデル詳細要確認）」と記録。usageNoteに透かし・音声トラック有無・無料枠生成である旨を記載。

`src/pages/tools/pixverse/index.astro`にimport追加・`pixverseSampleVideo`検索・`sampleVideo`prop渡しを、Kling AIページと同一パターンで追加。

## Changed Files

count: 5

- src/data/generatedVideos.ts（PixVerseエントリ1件追加、既存4件無変更）
- src/pages/tools/pixverse/index.astro（import・変数・propの3箇所追加のみ、他は無変更）
- public/videos/generated/tools/pixverse-tool-video-output-01.mp4（新規）
- public/videos/generated/tools/pixverse-tool-video-output-01-poster.webp（新規）
- docs/tasks/active/add-pixverse-generated-video.md → docs/tasks/completed/2026-07-26-add-pixverse-generated-video.md（移動）

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS（exit 0、CRLF警告のみ）
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 0, Verify: 0, Files checked: 29）
- publish check: 未実行（対象外・任意）
- preview: サンドボックス権限によりdist/配下の直接読み取り・ブラウザ表示確認が不可。build成功・コード配線が既存4パターン（Kling AI等）と同一であることの確認で代替。実ブラウザでの再生確認は未実施（要人手確認）。
- GitHub Actions: 変更なし

## Git

- branch: master
- commit: (push後に確定)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED
- working tree: target_files以外の変更なし（事前存在の未追跡ファイルも無変更）

## Production

- state: NOT_DEPLOYED

## Next

本番反映候補としてPixVerseページ変更を含める。次に独自動画を追加する候補ツールはHailuo AI・Pixverse以外の未登録ツール（要確認）。ブラウザでの実際の再生・モバイル幅表示は人手確認推奨。
