# Latest Project State

- updated_at: 2026-07-26
- latest_commit: 41c7bde (Add GitHub shared context and task validation foundation) — 本ファイル更新時点（本タスクcommit前）のHEAD。本タスク（implement-validate-data）のcommit SHAはcommit実行後にGIT欄で別途報告する。
- branch: master
- origin_sync: SYNCED (rev-list 0 0 at HEAD 41c7bde)
- working_tree: implement-validate-data実装完了、全required_checks PASS。commit前（許可範囲内のファイルのみ変更、未追跡の事前存在ファイルは変更なし）
- preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html
- latest_completed_task: docs/tasks/completed/2026-07-26-implement-validate-data.md（結果: PASS、implementation_status: PASS、repository_data_status: FAIL_WITH_EXISTING_VIOLATIONS、commit後にSHA確定）
- production_state: NOT_DEPLOYED
- current_phase: search-traffic-launch
- current_plan: AIクリエイティブナビ 計画書 Ver2.0
- current_operations: AIクリエイティブナビ 運用ルール Ver4.0
- next_candidate: Fix validated tool-data violations in a separate scoped task.

## Notes

- bootstrap-github-shared-context（commit 41c7bde）でGitHub共有コンテキスト・構造化タスク・task/scope validation・build専用GitHub Actionsを導入済み。
- implement-validate-data（本タスク）でscripts/validate-data.mjsを新規実装。src/content/tools/*.md全29件に対しERROR/WARNING/VERIFYの3分類で検証。外部通信・secret参照なし。DB・src・config.tsは無変更。
- validate:dataは既存DBに対しERROR 5件・WARNING 3件を検出（validatorの誤判定ではなく実データの既存問題）。詳細はdocs/tasks/completed/2026-07-26-implement-validate-data.mdを参照。
- commit SHAは実行前の時点では確定しないため、未確定の値は記載しない。commit・push後の確定SHAはタスク完了報告のGIT欄で報告する。
