---
task_id: "add-d-id-generated-video"
created_at: "2026-07-28"
status: DONE
completed_at: "2026-07-28"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "ユーザーがD-IDのFree Trialで生成し、Windowsダウンロードフォルダへ保存したAIアバター動画をリポジトリへ取り込み、既存Kling AI等と同じ仕組みでD-ID個別ページへ表示する。"

non_goals:
  - 動画を再生成しない
  - 動画本体を編集・トリミング・再エンコードしない
  - 音声・透かしを削除しない
  - 既存動画エントリを変更しない
  - 他ツールページを変更しない
  - モデル名・音声モデル名・無料クレジット制度・商用利用可否を推測しない
  - D-IDの通常Text to Videoベンチマーク（video-tool-benchmark-v1）とアバター動画を同一比較として扱わない
  - 本番反映しない

target_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/d-id/index.astro
  - public/videos/generated/tools/d-id-tool-video-output-01.mp4
  - public/videos/generated/tools/d-id-tool-video-output-01-poster.webp
  - docs/tasks/active/add-d-id-generated-video.md
  - docs/tasks/completed/2026-07-28-add-d-id-generated-video.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/completed/2026-07-28-add-vidu-ai-generated-video.md

unknowns:
  - D-IDの具体的な生成モデル名・音声モデル名
  - 商用利用可否（Free Trial出力分）
  - 実ピクセル寸法1920x1920とSAR/DARメタデータ上の16:9表記の不一致の原因
  - 音声内容が実際に想定台本と一致するかの再生確認（管理者側では未実施）

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
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - Downloads内の正しいD-ID動画を特定
  - provenanceをユーザー実機確認として記録
  - 元動画を無編集でコピー
  - poster作成
  - generatedVideos.tsへ1件登録
  - D-ID個別ページへ表示
  - 他ツール変更なし
  - build/data/scope/diff全PASS
  - 本番反映なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

ユーザーがD-IDのFree Trialでアバター動画を生成し、Windowsのダウンロードフォルダへ保存済み。既存のKling AI・Pika・Runway・Luma AI・PixVerse・CapCut AI・Hailuo AI・Vidu AIと同じ独自動画サンプルの仕組みでD-IDページへ掲載する。D-IDは静止画とテキスト台本からのAIアバター動画であり、他ツールの共通ベンチマークプロンプト（video-tool-benchmark-v1）によるText to Video比較とは条件が異なるため比較対象外（comparisonEligible: false）として扱う。

## Implementation Notes

- Downloads配下の動画ファイル（.mp4/.webm/.mov/.mkv）を拡張子検索した結果、作業当日（2026-07-28）に作成された唯一の候補は `Untitled video.mp4`（3,836,799 bytes）。他の候補（過去日付のVID/MOV/webm）は作業時刻と無関係のため除外。
- ffprobe実測: container mov/mp4、video_codec h264 (High profile)、audio_codec aac (stereo, 44.1kHz)、coded 1920x1920、duration 12.24秒、fps 25。ファイルのSAR/DARメタデータはdisplay_aspect_ratio 16:9を示しており、実ピクセル寸法（正方形）と表示比率メタデータに不一致がある（原因不明、要確認としてusageNoteに明記）。
- フレーム抽出（n=10,60,150,270）で画面全体に繰り返し表示される「D-iD」の透かしを目視確認（フルスクリーン透かし）。人物はD-ID提供と見られるストックアバターで、実在の著名人ではないと判断。黒画面・破損なし、各フレームで口の動きが自然に変化しており音声との連動が見られる。
- 音声トラックの言語内容（日本語で指定台本どおりか）は管理者側で再生確認していないため unknown として記録。ユーザーからの明示（D-ID生成・日本語台本使用）をprovenanceの主根拠とする。
- public/videos/generated/tools/d-id-tool-video-output-01.mp4へ無編集コピー（バイト数一致を確認、3,836,799 bytes）。Downloads側の元ファイルは無変更・無削除。
- poster: 抽出フレーム（n=60、1920x1920、透かし含む・黒画面や不自然表情ではない）をwebp化（品質82、約179KB）。cwebp未使用のためffmpeg libwebpで実施。
- generatedVideos.tsへ1件追加。promptVersionは新規`avatar-video-sample-v1`を使用（型はstringで制約なし、既存sampleType/comparisonEligible等の型は変更せず、既存の'tool-video-output'を流用）。durationSecは実測12.24秒から整数12。usageNoteに実機確認・Free Trial・比較対象外の理由・実測値・フルスクリーン透かし・音声言語内容未確認（unknown）・モデル名未確認・商用利用未確認の旨を明記。
- src/pages/tools/d-id/index.astroへgeneratedVideosのimportとfind処理、sampleVideo propを既存Hailuo AI等のページと同一パターンで追加。他のprops・レイアウト・料金・説明文は無変更。
- npm run build: 92ページ PASS（既存ページ数と同数）。npm run validate:data: Errors 0 / Warnings 0 / Verify 0。
