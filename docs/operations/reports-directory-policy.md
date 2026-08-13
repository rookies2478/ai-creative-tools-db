# reports/ ディレクトリ運用ポリシー

作成日: 2026-08-13
根拠監査: [docs/audits/reports-directory-classification-2026-08-13.md](../audits/reports-directory-classification-2026-08-13.md)

このドキュメントは`reports/`配下の現行53ファイル（.md 32件・.csv 21件、README.md除く）の位置づけを恒久的に定義する運用ポリシーである。ファイル自体の移動・改名・削除は本ポリシーでは一切実施しない。

## 1. 現行reportsの位置づけ

`docs/audits/reports-directory-classification-2026-08-13.md`で分類済みの現行53ファイルは、すべて**historical/archive記録**である（分類結果: OPEN_BACKLOG 0 / MIGRATE_THEN_DELETE 0 / ARCHIVE 53 / DELETE_CANDIDATE 0 / REVIEW 0）。

- これらは2026-06時点（多くは26ツール構成時点）の一時点のスナップショットであり、現行DB・現行コード・現行運用の**正本ではない**。
- 価格・DB・スキーマ・sitemap・SEO・出典等いずれの内容が記載されていても、それだけを根拠に「現在も有効な事実」とみなしてはならない。
- 後日の監査で明示的に再分類されない限り、この位置づけは維持される。

## 2. 現行source-of-truthの優先順位

CLAUDE.md常設ルール2番の優先順位（user instruction > active task > operations rules > decisions > CLAUDE.md > repository state）と矛盾しない形で、現在の判断は次の順に優先する。

1. 現在のuser instruction
2. active task（`docs/tasks/active/`）
3. 現行のoperations/decisionsドキュメント（`docs/operations/`・`docs/decisions/`、方針は計画書Ver2.0・作業手順は運用ルールVer4.0が正式版。詳細は[docs/decisions/current-governance-documents.md](../decisions/current-governance-documents.md)）
4. `docs/tasks/LATEST.md`
5. 現行ソースコード・DB（`src/content/tools/*.md`等）
6. 検証が必要な場合の現行公式ソース（一次情報源）
7. 関連する現行audit（`docs/audits/`配下の最新監査）
8. `reports/`配下の履歴記録（背景情報としてのみ参照）

`reports/`は常にこの優先順位の最下位であり、上位のいずれかと矛盾する場合は上位が優先する。

## 3. reportsを参照してよい場面

`reports/`配下ファイルの参照は、以下のような**歴史的文脈の調査目的**に限定する。

- 過去の意思決定の経緯を追う
- 旧状態と現行状態を比較する
- 過去の一次情報源URLの所在を探す
- スコープを限定した歴史監査を行う

**通常の実装タスクで`reports/`全件を一括で読み込んではならない。** 必要な場合も、関連する可能性がある個別ファイルのみを対象とする。

## 4. 陳腐化の警告

`reports/`配下の多くのファイルは、旧いリポジトリ・ツール数（例: 26ツール時点）を前提として作成されている。現行のツール数・DB構造・UI構造は複数回変化しているため、reports内の結論を実装の根拠として使う場合は、**必ず現行リポジトリ状態（現行DB・現行コード・`npm run validate:data`等）に対して再検証してから使用すること**。本ポリシーは特定のツール数を恒久的な事実として固定しない。

## 5. 一括移行は不要

2026-08-13時点の新規監査（[docs/audits/reports-directory-classification-2026-08-13.md](../audits/reports-directory-classification-2026-08-13.md)）の結論として:

- reports由来の未解決backlogは0件
- 恒久的に移行すべき独自データはすべて現行DB・現行validatorへ移行済みと確認済み
- 削除候補も0件

したがって、本ポリシーの時点で**reports/配下ファイルの一括移行・一括削除・一括移動は不要**であり、実施しない。既存ファイルはアーカイブとしてそのまま`reports/`に残置する。

## 6. 今後のレポート作成先

今後の新規の運用アウトプットは、性質に応じて既存の規約に従い次の場所へ作成する（新しいディレクトリ構造は導入しない）。

| 種別 | 保存先 |
|---|---|
| 恒久的な監査結果 | `docs/audits/` |
| 再利用可能な調査・リサーチ | `docs/research/` |
| 運用ルール・補助メモ | `docs/operations/` |
| 恒久的な意思決定 | `docs/decisions/` |
| タスク完了記録 | `docs/tasks/completed/` |
| 生の分析データ（GSC等） | 既存のanalytics/raw構造（`docs/analytics/`配下） |

`reports/`は、明示的な理由がない限り、新規の現行運用レポートの保存先として使用しない。

## 7. エージェントの振る舞い

将来のClaude Codeタスクは以下に従う。

- デフォルトで`reports/`配下を全件スキャンしない。
- `reports/`内の古い記録を根拠に現行DBの事実を上書きしない。
- `reports/`内の古い記録に言及があるだけの理由で、解決済みbacklogを復活させない。
- `reports/`内の記述が現行状態と矛盾する場合はVERIFY/HOLDを使う。
- クリーンアップ・履歴に関する質問が出た場合は、まず[docs/audits/reports-directory-classification-2026-08-13.md](../audits/reports-directory-classification-2026-08-13.md)を参照する。

## 8. 削除ポリシー

本ポリシーは「reportsは永久に削除不可」とは規定しない。ただし、将来の削除には次のすべてが必要である。

- スコープを限定した監査（対象ファイルを明示）
- 独自の恒久的価値が無いことの確認
- 必要な履歴が他の場所（`docs/audits/`等）に保存済みであることの確認
- 明示的なクリーンアップタスクとしての実施

**本ポリシータスク自体は、いかなる削除も承認しない。**
