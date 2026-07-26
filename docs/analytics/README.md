# Analytics 運用基盤

## 目的

Google Search Console（GSC）とMicrosoft Clarityの分析結果を、再現可能かつ検証可能な形でリポジトリに蓄積するための保存構造・テンプレート集。人間とClaude Codeが同じ構造・同じルールで運用できることを目的とする。

本ドキュメントはストレージ構造とガバナンスルールのみを定義する。GSC/Clarityの取得スクリプト・API接続・認証情報の実装は後続タスクで扱う。

## GSCとClarityの役割分担

- **GSC**: 検索クエリ・掲載順位・クリック率・インプレッション等、検索流入の定量データを扱う。
- **Clarity**: GSCで見つかった候補ページについて、実際のユーザー行動（クリック・スクロール・離脱等）を確認するために使う。

GSCの数値とClarityの行動データは性質が異なるため、分析要約内で混同しないこと。

## raw と analysis-summary の違い

- `raw/`: 取得した生データ（CSV/JSON）。**Gitで管理しない**（`.gitignore`で除外済み）。
- `analysis-summary.md`: rawを参照して作成した分析結果・実装判断の記録。**Gitで管理する**。

rawはローカル環境にのみ保持し、分析結果と判断根拠だけをリポジトリに残す。

## secretの扱い

manifest・summaryのいずれにも、token・credential・cookie・session identifier・APIキー等のsecretを一切保存しない。取得方式（manual／API／MCP）は後続タスクで定義する。

## Latest成功runの識別方法

同一日に複数runがある場合、以下の条件をすべて満たすrunを「latest成功run」とする。

- `manifest.status == "success"`
- `completed_at` が存在する
- `required_datasets` がすべて `present: true`
- `validation.errors` が0件
- 同日に成功runが複数ある場合は `completed_at` が最も新しいものを採用する

failed／partialなrunはlatest成功runとして扱わない。latest専用のシンボリックリンクは作らず、manifestを走査して判定する運用とする。

## failed runの扱い

`status: "failed"` のrunはmanifestとして残してよいが、analysis-summaryの`source_run`には使用しない。原因調査のためrawが残っている場合のみ参照する。

## partial runの扱い

一部datasetのみ取得できた場合は `status: "partial"` とし、`required_datasets`のうち欠けているものを明記する。partial runを実装判断の根拠にする場合は、analysis-summaryの`data_quality`欄でその旨を明記しHOLD判断を検討する。

## 同日複数runの扱い

同日に複数回runを実行した場合、それぞれ`run-HHMMSS`ディレクトリで区別する。manifestの`completed_at`で新旧を判定する。

## 本番反映との関係

本ドキュメント群およびanalytics run自体は本番デプロイと無関係。分析結果を元にした実装判断（コンテンツ修正等）は別タスクとして通常のtask管理フローに従う。

## task管理との連携

分析結果に基づく実装は、本ディレクトリのanalysis-summaryを`reference_files`として参照する専用のactive taskを作成して行う。analytics run自体はactive task化しない（データ取得・保存作業のため）。

## decisionsへ残す条件

分析結果が既存の方針判断（`docs/decisions/`）を変更する場合、または恒久的なルール変更を伴う場合は、`docs/decisions/`に決定記録を残す。単発の実装判断はanalysis-summary内に留める。

## HOLD基準

以下に該当する場合、実装判断をHOLDする。

- データ件数が少なく統計的に断定できない
- GSCのmetadata変更（プロパティ設定変更等）直後で数値が安定していない
- Clarityのセッション数が極端に少ない
- rawとmanifestの内容が不一致
- 取得期間の連続性が確認できない

## データ品質確認

analysis-summary作成前に、rawファイルの行数・期間の連続性・欠損の有無を確認し、`data_quality`欄に記録する。

## 削除・retentionについて

raw削除・ローテーション自動化は本タスクの対象外。後続タスクで定義する。
