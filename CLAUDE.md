# CLAUDE.md

このファイルは常設の安全ルールのみを記載する。運用手順の全文はここに転載しない。

## 正式文書

- 方針判断: `AIクリエイティブナビ_計画書_Ver2.0_検索流入立ち上げ・独自検証統合版.docx`
- 作業手順: `AIクリエイティブナビ_運用ルール_Ver4.0_GitHub共有コンテキスト・構造化タスク統合版.docx`
- 旧計画書v1.1・旧運用ルールVer3.7は正式版として併用しない（参照禁止）。詳細は [docs/decisions/current-governance-documents.md](docs/decisions/current-governance-documents.md)。

## 常設ルール

1. 読むのは active task と、そこで明示された reference_files だけに限定する。
2. 優先順位は次の順とする: user instruction > active task > operations rules > decisions > CLAUDE.md > repository state。
3. 変更するのは active task の target_files に列挙されたファイルだけ。
4. 不明な事実を推測で補完しない。
5. 不明・未確認・停止が必要な場合は VERIFY / HOLD / BLOCKED を使う。
6. 明示的な承認がない限り、URL構造・DBスキーマ・比較ロジック・アフィリエイトリンク・認証情報・デプロイ設定・本番システムを変更しない。
7. 実装前に `npm run validate:task` を実行する。
8. 実装後に required_checks と `npm run validate:scope` を実行する。
9. いずれかのチェックが失敗した場合、commit・pushしない。
10. 本番環境へは一切デプロイしない（本番反映は人間が手動で行う）。
11. 結果報告は下記の固定結果スキーマで行う。
12. `src/content/tools/*.md` をツールDBの正本として扱うが、active taskが明示的に許可しない限り変更しない。
13. secretの値を表示・検査しない（`.env`、認証JSON、鍵ファイルの内容を読まない）。
14. GitHub上の状態（commit/push/CI）と本番環境の状態は常に分離して報告する。

## 固定結果スキーマ

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
