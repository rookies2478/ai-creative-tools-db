# docs/tasks/paused/

## Purpose

Temporarily store valid but incomplete tasks that are not the current active task.

## Rules

- docs/tasks/active/ may contain only one task file.
- docs/tasks/paused/ may contain multiple paused tasks.
- A paused task is not completed.
- Code and asset changes may remain in the working tree while the task is paused.
- A paused task must include a pause reason and resume condition.
- A paused task must not be implemented, staged, committed, or pushed until it is moved back to active.
- Only one paused task may be resumed at a time.
- Move the current active task to paused before activating another task.
- Never move an unfinished task to completed solely to satisfy validation.
- Never allow multiple active tasks as an exception.

## 補足（日本語）

- `docs/tasks/active/` は常に1件のみ。優先度の高い別タスクへ切り替える場合は、現行taskをここへ移動してからactiveへ新規taskを置く。
- pausedのtaskファイルは既存の`docs/tasks/active/`のYAML frontmatter形式（`TEMPLATE.md`準拠）を維持し、以下を追加で記載する。
  - `status: PAUSED`
  - `pause_reason`（一時停止の理由）
  - `resume_condition`（再開の条件）
  - `preserved_changes`（保持中の未commit差分ファイル一覧）
- pausedのtaskはcompletedではない。resume条件を満たし、activeへ戻し、required_checksを再実行してから初めてcompletedへ移動できる。
- pausedのtaskをそのままcompletedへ移動することは禁止。

## State transitions

**ACTIVE → PAUSED**
- 別タスクを優先するため
- 現在の差分を保持したまま
- pause_reasonとresume_conditionを記録

**PAUSED → ACTIVE**
- docs/tasks/active/ が空であること
- resume_conditionを確認済みであること
- 1件だけ移動すること
- 移動後 `npm run validate:task` を実行すること

**ACTIVE → COMPLETED**
- required_checks全PASS
- commit可能な状態
- task成果が完了していること

**禁止される遷移**
- 未完了のACTIVE → COMPLETED
- PAUSEDから再開・検証せずにCOMPLETEDへ移動
- 複数のPAUSEDタスクを同時にACTIVEへ移動
