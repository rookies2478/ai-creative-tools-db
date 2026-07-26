# Clarity Analytics 保存構造

## 用途

Microsoft Clarityは、GSCで発見した候補ページについて実際のユーザー行動（クリック・スクロール・離脱等）を確認するために使う。**Clarity単独でSEO変更を決定しない**。必ずGSCの候補（`related_gsc_analysis`）と組み合わせて判断する。

少数セッションのみを根拠に断定的な結論を出さないこと。

## 個人情報リスクについて

Clarityのsession recordingは実際のユーザー操作を録画したものであり、個人情報を含みうる。

- session recording動画自体はリポジトリへ保存しない。
- リポジトリへ保存するのは**集計結果のみ**（rage click数、scroll depth等の統計値）。
- recordingを目視確認した場合のメモ（Recording Review Notes）にも、個人を特定できる情報（氏名・メールアドレス・IPアドレス・入力フォームの内容等）を書かない。

## ディレクトリ構造

```
docs/analytics/clarity/
├─ README.md
├─ templates/
│  ├─ manifest.template.json
│  └─ analysis-summary.template.md
└─ YYYY-MM-DD/
   ├─ raw/
   │  └─ run-HHMMSS/
   │     ├─ overview.json
   │     ├─ pages.json
   │     ├─ devices.json
   │     ├─ countries.json
   │     ├─ behaviors.json
   │     └─ manifest.json
   └─ analysis-summary.md
```

`YYYY-MM-DD/raw/`配下はGitで管理しない（`.gitignore`の`docs/analytics/clarity/**/raw/`により除外）。`analysis-summary.md`のみGit管理する。

## 取得方式について

取得方式（MCP／manual export／API）は本タスクでは確定しない。いずれの方式でも、token・cookie・credentialはリポジトリに保存しない。

## 記録する主要指標

- rage click
- dead click
- quick back
- excessive scroll
- scroll depth
- session count
- page-level metrics
- device別集計
- country別集計
- 対象期間（period）
- フィルタ条件（filters）
- sampled／limited dataである旨の明示（Clarityは全量ではなくサンプリングされたデータを返す場合がある）

## GSCとの連携

分析要約（analysis-summary.md）には`related_gsc_analysis`欄で、対応するGSC分析runへの参照を必須とする。Clarity単体の分析要約は作成しない。

## manifestの`source_run`

同一runの生データを再参照できるよう、manifestには`run_id`を記録し、analysis-summaryの`source_run`欄と一致させる。
