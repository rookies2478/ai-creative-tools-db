# docs/tasks/active/

進行中タスクを1件だけ置くディレクトリ。

- 保存対象: 現在実行中のtaskファイル（YAML frontmatter付きMarkdown、`TEMPLATE.md`準拠）1件のみ。
- 保存しないもの: 完了済みタスク（`docs/tasks/completed/` へ移動）、生ログ、認証情報、複数タスクの同時保持。
- このREADME.mdはtask件数のカウント対象外。
- 別タスクを優先する場合は、現在のactive taskを`docs/tasks/paused/`へ移してから新しいtaskをactiveへ置く（詳細: [docs/tasks/paused/README.md](../paused/README.md)）。
- 複数のactive taskは例外なく禁止。
- 未完了のtaskを検証回避目的で`docs/tasks/completed/`へ移してはならない。
- pausedタスクを再開する場合は、active/ が空であることを確認してから1件だけ移動し、`npm run validate:task` を再実行する。
