---
task_id: "clarify-heygen-free-download-limitation"
created_at: "2026-07-27"
status: DONE
completed_at: "2026-07-27"
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: true
official_verification_required: false

goal: "HeyGenについて、無料で動画作成できても実機確認では無料版で動画ファイルをダウンロードできなかったことをDB正本と関連表示に正確に反映する。"

non_goals:
  - HeyGenの独自動画を追加する
  - 画面録画をサンプルとして使用する
  - 有料プランを契約する
  - 他ツールの表記を変更する
  - レイアウトを変更する
  - 本番反映する

target_files:
  - src/content/tools/heygen.md
  - src/pages/tools/heygen/index.astro
  - src/pages/categories/avatar-video/index.astro
  - src/pages/comparisons/avatar-video-ai-tools/index.astro
  - docs/tasks/active/clarify-heygen-free-download-limitation.md
  - docs/tasks/completed/2026-07-27-clarify-heygen-free-download-limitation.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - docs/tasks/completed/2026-07-26-clarify-synthesia-free-download-limitation.md

unknowns:
  - すべてのアカウント・地域で常に無料ダウンロード不可かどうか（実機確認は今回の検証環境に限る）

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
  - git diff --name-only

acceptance_criteria:
  - HeyGenの無料生成可能という事実を維持する
  - 実機確認では無料ダウンロードできなかったことを明記する
  - 独自動画を登録しない
  - 他ツールの表記を無変更に保つ
  - build成功
  - data validation成功
  - scope validation成功
  - diff check成功

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

ユーザーがHeyGen無料プランを実機確認した結果、無料で動画作成は可能だが、無料プランでは生成動画をダウンロードできないことが判明した。これにより「独自動画ファイルを保存してツールページへ掲載する」という目的は満たせない。公式情報だけではダウンロード可否を確定できていなかったが、実際の利用環境では無料ダウンロード不可だった。

この結果はユーザーの検証環境での実機確認として扱い、全アカウント・全地域で永久に同じと断定する表現は避ける。

## Result

status: DONE

src/content/tools/heygen.md（DB正本）のfreePlanNote・weaknesses・limitations・faqs・本文に、「無料で動画作成は可能だが、今回の実機確認では動画ファイルを無料でダウンロードできなかった」ことを追記。永続的・普遍的な断定は避け、「今回の実機確認では」という限定表現を使用した。

src/pages/tools/heygen/index.astro（専用ページ）のspecs／basicInfo／cons／limits／quickTable／pricing table／faqsを同内容に同期。src/pages/categories/avatar-video/index.astro のHeyGen行を「要確認」から「無料作成可／無料ダウンロード不可」＋注記に更新。src/pages/comparisons/avatar-video-ai-tools/index.astro の比較表free列とFAQ回答も同様に更新（従来「○（動画最大1分・クレジットカード不要）」のみでダウンロード制限の記載がなかったため）。

「無料プランあり」「無料で動画生成可能」だけで終わる表現は残さず、いずれも同じ表示領域または直近の注記にダウンロード不可の情報を含めた。

## Changed Files

count: 4

- src/content/tools/heygen.md
- src/pages/tools/heygen/index.astro
- src/pages/categories/avatar-video/index.astro
- src/pages/comparisons/avatar-video-ai-tools/index.astro

## Checks

- task validation: PASS
- build: PASS（92ページ）
- data quality (validate:data): PASS
- scope validation: PASS
- diff check: PASS

## Git

- branch: master
- commit: (push後に確定)
- push: 実施予定
- working tree: 上記4ファイル + タスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED

## Next

Hailuo AIの無料プラン・ダウンロード可否の実機確認。
