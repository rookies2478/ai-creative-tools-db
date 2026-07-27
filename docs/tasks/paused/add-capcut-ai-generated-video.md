---
task_id: "add-capcut-ai-generated-video"
created_at: "2026-07-27"
status: PAUSED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "ユーザーがCapCut AIで生成しDownloadsへ保存した動画をリポジトリへ登録し、CapCut AI個別ページに表示する"

non_goals:
  - 動画を再生成しない
  - 動画本体を編集しない
  - 音声・透かしを削除しない
  - 既存動画エントリ・他ツールページを変更しない
  - 本番反映しない

target_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/capcut-ai/index.astro
  - public/videos/generated/tools/capcut-ai-tool-video-output-01.mp4
  - public/videos/generated/tools/capcut-ai-tool-video-output-01-poster.webp
  - docs/tasks/completed/2026-07-27-add-capcut-ai-generated-video.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md

unknowns:
  - CapCut AI側のモデルバージョン詳細

preexisting_untracked_files: []

pause_reason: "Clarity MCP analysis is the current priority. The CapCut generated-video code, assets, and provenance passed audit, but final validation and commit have not been completed."

resume_condition: "Resume after the Clarity MCP connector is switched to the aicreative-db.com project and the first valid Clarity analysis run is completed or formally closed."

preserved_changes:
  - src/data/generatedVideos.ts
  - src/pages/tools/capcut-ai/index.astro
  - public/videos/generated/tools/capcut-ai-tool-video-output-01.mp4
  - public/videos/generated/tools/capcut-ai-tool-video-output-01-poster.webp

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - CapCut AI生成動画1件をgeneratedVideos.tsへ登録
  - CapCut AI個別ページにサンプル動画が表示される
  - 既存動画・他ツールページ無変更
  - build / validate:data / validate:scope PASS

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

ユーザーが実機でCapCut AIで動画生成・無料ダウンロードしたことを確認したため、既存のKling AI/Pika/Runway/Luma AI/PixVerseと同じ独自動画サンプル方式でCapCut AIページへ登録する。

## Current state (as of pause)

- Code audit passed.
- Asset audit passed.
- Provenance audit passed.
- validate:task and remaining required checks are not complete.
- No commit has been created.
