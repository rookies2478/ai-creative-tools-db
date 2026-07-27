---
task_id: "add-hailuo-ai-generated-video"
created_at: "2026-07-27"
status: DONE
completed_at: "2026-07-28"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "ユーザーがHailuo AIで共通ベンチマークプロンプトを使い生成し、Windowsダウンロードフォルダへ保存した動画をリポジトリへ取り込み、既存Kling AI等と同じ仕組みでHailuo AI個別ページへ表示する。"

non_goals:
  - 動画を再生成しない
  - 動画本体を編集・トリミング・再エンコードしない
  - 音声・透かしを削除しない
  - 既存動画エントリを変更しない
  - 他ツールページを変更しない
  - モデル名・商用利用可否を推測しない
  - 本番反映しない

target_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/hailuo-ai/index.astro
  - public/videos/generated/tools/hailuo-ai-tool-video-output-01.mp4
  - public/videos/generated/tools/hailuo-ai-tool-video-output-01-poster.webp
  - docs/tasks/active/add-hailuo-ai-generated-video.md
  - docs/tasks/completed/2026-07-27-add-hailuo-ai-generated-video.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/completed/2026-07-27-add-capcut-ai-generated-video.md

unknowns:
  - Hailuo AIの具体的な生成モデル名（Hailuo 02等）
  - 商用利用可否

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
  - Downloads内の正しいHailuo AI動画を特定
  - provenanceをユーザー実機確認として記録
  - 元動画を無編集でコピー
  - poster作成
  - generatedVideos.tsへ1件登録
  - Hailuo AI個別ページへ表示
  - 他ツール変更なし
  - build/data/scope/diff全PASS
  - 本番反映なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

ユーザーがHailuo AIで共通ベンチマークプロンプトを使用し動画生成に成功、Windows Downloadsフォルダへ保存済み。既存のKling AI・Luma AI・Pika・Runway・PixVerse・CapCut AIと同じ独自動画サンプルの仕組みでHailuo AIページへ掲載する。

途中、docs/tasks/active/ に別作業（implement-analytics-raw-rotation）由来の未コミット・未追跡の変更（docs/analytics/README.md等、package.json、scripts/analytics-rotation-lib.mjs等、task active file）が混在し、validate:task/validate:scopeが失敗する状態を検出した。ユーザーに確認のうえ、それら無関係な変更は内容を変更せず`git stash`で一時退避し、本タスクのcommit後に復元する方針とした。

## Implementation Notes

- source file: `Hailuo_Video_A cinematic 5-second video of a modern creative workspace, a laptop on a desk showing abstract color_538161416680415234.mp4`（389,241 bytes、Downloads直下で1件のみ該当・候補の複数存在なし）
- ffprobe実測: format mov/mp4、video_codec h264 (High profile)、1366x768、24fps、duration 5.875秒、音声トラックなし
- metadata内AIGCタグにContentProducer/ContentPropagator="MiniMax"の記載あり（Hailuo AI由来の補助根拠）
- フレーム抽出（n=10,60,130）で画面右下に「MINIMAX | Hailuo AI」透かしを目視確認。単一カット、黒画面・破損フレームなし、内容はプロンプト（laptop/colorful motion graphics/clean minimal interior）と一致
- provenanceはユーザーの実機確認（Hailuo AIで生成し該当ファイル名を明示）を主要根拠とし、metadataのMiniMax表記を補助根拠として記録
- public/videos/generated/tools/hailuo-ai-tool-video-output-01.mp4へ無編集コピー（Downloads側の元ファイルは無変更・無削除）
- poster: n=60フレームを1200x675（既存poster群と同一解像度・アスペクト比）へscaleしwebp化。透かし・文字追加なし
- generatedVideos.tsへ1件追加。durationSecは整数値6（既存型の慣例に合わせ切り上げ）、usageNoteに実測5.875秒を明記。comparisonEligible: false（既存Kling AI/Pika/Runway/Luma AIと同じ扱い）。モデル名は「Hailuo AI（モデル詳細要確認）」とし、Hailuo 02等の推測は行っていない。provider表記は既存hailuo-ai.mdの慣例に合わせ"Hailuo AI"（MiniMaxは運営元として本文側で言及済み）
- src/pages/tools/hailuo-ai/index.astroへgeneratedVideosのimportとfind処理、sampleVideo propを既存CapCut AIページと同一パターンで追加。他のprops・レイアウト・料金・説明文は無変更
- dist/tools/hailuo-ai/index.htmlでhailuo-ai-tool-video-output-01.mp4/poster.webpの参照を確認。他6ツール（kling-ai, luma-ai, pika, runway, pixverse, capcut-ai）のHTMLには参照0件で誤混入なしを確認
- git diff src/data/generatedVideos.tsで削除行が存在しないことを確認し、既存6件のエントリが無変更であることを検証
- dist配下ファイルへの直接アクセスが本環境権限でブロックされたため、video要素個別属性（controls/autoplay有無）・ブラウザでの実表示・mobile崩れ確認は未実施（capcut-aiタスク時と同様の制約）
