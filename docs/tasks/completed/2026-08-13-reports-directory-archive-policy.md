# Task Result

## Goal

reports/配下53ファイルの現状（historical/archive）を明文化する恒久ポリシーを新規作成し、現行source-of-truth優先順位・reports参照可否・将来の出力先・削除条件をCLAUDE.mdの優先順位と矛盾しない形で規定する。

## Result

PASS

## Summary

`docs/operations/reports-directory-policy.md`を新規作成し、reports/配下現行53ファイル（`docs/audits/reports-directory-classification-2026-08-13.md`でARCHIVE 53件と確定済み）を恒久的にhistorical/archiveとして扱う運用ポリシーを正式化した。現行source-of-truth優先順位（user instruction > active task > operations/decisions > LATEST.md > 現行コード/DB > 公式ソース > 現行audit > reports）、reports参照可能な場面（歴史的経緯調査・新旧比較・スコープ限定監査に限定、通常タスクでの一括読み込み禁止）、陳腐化警告（旧ツール数を前提とした結論は現行状態で再検証必須）、今後の運用アウトプット出力先（docs/audits・docs/research・docs/operations・docs/decisions・docs/tasks/completed・docs/analytics）、エージェント振る舞い、削除ポリシー（本タスクでは削除承認せず、将来はスコープ限定監査＋クリーンアップタスクが必要）を明文化。`reports/README.md`は現状不存在のため新規作成せず、`docs/operations/reports-directory-policy.md`を単一の正本とした。`docs/operations/README.md`へ本ポリシーへのポインタを1行追加。reports/配下53ファイルは無移動・無削除・無改名・無変更。

## Changed Files

count: 4
- docs/operations/reports-directory-policy.md（新規）
- docs/operations/README.md（ポインタ1行追加）
- docs/tasks/active/2026-08-13-reports-directory-archive-policy.md → docs/tasks/completed/へ移動
- docs/tasks/completed/2026-08-13-reports-directory-archive-policy.md（本ファイル、新規）
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: N/A（対象外、ドキュメントのみのため未実施）
- diff check: PASS
- scope validation: PASS
- data quality: N/A
- publish check: N/A
- preview: N/A
- GitHub Actions: 未確認（push後に確認推奨）

## Git

- branch: master
- commit: (下記GIT欄で確定)
- push: 実施
- origin sync: 実施後確認
- working tree: clean（本コミット前時点）

## Production

- state: NOT_DEPLOYED（ドキュメントのみのため対象外）
- checked URLs: なし

## Decisions

- `reports/README.md`は存在しないため新規作成せず、`docs/operations/reports-directory-policy.md`を唯一の正本とした（重複文書を作らないため）。
- reports/配下ファイル自体は一切変更・移動・削除しない（本タスクのスコープ外、ユーザー指示どおり）。

## LATEST Update

済み

## Next

通常のSEO/GSC改善作業へ復帰。他のリポジトリクリーンアップ項目が明示的に特定された場合のみ対応。

---
成功時も生ログ全文は保存しない。失敗時も原因特定に必要な最小限の情報だけを記載する。
