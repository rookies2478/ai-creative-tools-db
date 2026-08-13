---
task_id: "2026-08-13-image-generation-scripts-safety-fixes"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "監査(docs/audits/image-generation-scripts-audit-2026-08-13.md)で承認された scripts/generate-reference-image.mjs と scripts/generate-sample-image.mjs の安全性fix。ハードコード認証情報パス除去(HF_TOKEN_FILE必須化)・上書きガード(--force)追加・generate-sample-image.mjsのWebP変換修正。"

non_goals:
  - scripts/generate-reference-images.mjs の削除・変更
  - package.json 変更
  - npm wrapper追加
  - 画像生成の実行
  - generatedImages.ts / DB / スキーマ変更
  - 本番デプロイ

target_files:
  - scripts/generate-reference-image.mjs
  - scripts/generate-sample-image.mjs
  - docs/tasks/active/2026-08-13-image-generation-scripts-safety-fixes.md
  - docs/tasks/completed/2026-08-13-image-generation-scripts-safety-fixes.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/audits/image-generation-scripts-audit-2026-08-13.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - node --check scripts/generate-reference-image.mjs
  - node --check scripts/generate-sample-image.mjs
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - HF_TOKEN_FILE環境変数必須・ハードコードpathフォールバックなし
  - トークンファイル欠落/不在時はfail-fast、値は出力しない
  - 既存出力ファイルは--force無しで上書きされない
  - --forceで明示的上書き許可
  - generate-sample-image.mjsの.webp出力がsharpで実際にWebP変換される
  - scripts/generate-reference-images.mjs無変更
  - package.json無変更
  - ライブAPI呼び出しなし

forbidden_operations:
  - PRODUCTION_DEPLOY
  - LIVE_IMAGE_GENERATION
  - PLURAL_SCRIPT_DELETE_OR_MODIFY
  - PACKAGE_JSON_MODIFY
---

# Task

## Background

監査 docs/audits/image-generation-scripts-audit-2026-08-13.md で generate-reference-image.mjs(canonical)・generate-sample-image.mjs(manual)を保持対象と判定。両スクリプトともハードコードトークンpath既定値・上書きガード欠如の問題を確認。sample-image.mjsはさらにWebP変換なしでraw bytesを.webpとして保存していた。

## Implementation Notes

- HF_TOKEN_FILE未設定 → 即エラー終了、値非表示
- ファイル不在 → パスのみ報告、内容非表示
- --force 未指定で出力先存在 → 中断
- sample-image.mjs は sharp 経由で明示的webp変換を追加(reference-image.mjsと同パターン)

## Result Schema

```
RESULT: PASS

SUMMARY:
generate-reference-image.mjs / generate-sample-image.mjs の両方でハードコードトークンpathフォールバックを除去しHF_TOKEN_FILE必須化、上書きガード(--force)追加。generate-sample-image.mjsはsharp経由の明示的WebP変換を追加（従来はraw bytesを.webpとして保存していた）。

CHANGED_FILES:
2 (scripts/generate-reference-image.mjs, scripts/generate-sample-image.mjs)

CHECKS:
- task_validation: PASS
- build: N/A（スクリプトはAstro build対象外、リポジトリルールによりbuild必須ではないため未実施）
- diff_check: PASS（CRLF警告のみ）
- scope_validation: PASS
- data_quality: N/A
- publish_check: N/A
- preview: N/A
- github_actions: N/A

GIT:
- commit: 別途記載（LATEST.md参照）
- push: 別途記載
- origin_sync: 別途記載

PRODUCTION:
NOT_DEPLOYED（ローカルユーティリティのみ、対象外）

LATEST_UPDATED:
yes

NEXT:
単数版canonicalが複数版を完全代替すると判断できる場合、generate-reference-images.mjs削除は別task。
```

### 実施内容詳細

**generate-reference-image.mjs**
- `C:\dev\Studio\huggingface.co_API.txt` 既定値フォールバック除去。`HF_TOKEN_FILE`未設定→即エラー終了（値非表示）。
- ファイル不在→パスのみ報告し終了。
- 引数パースを`--force`対応に変更、不明引数は拒否。
- 出力先存在時は`--force`なしで中断。target選択・prompt・出力パス・model・sharp WebP変換・retry挙動は無変更。

**generate-sample-image.mjs**
- 同様に`HF_TOKEN_FILE`必須化・ハードコードpath除去。
- `--force`引数対応・不明引数拒否・上書きガード追加。
- `sharp`をimportし、API応答bufferを明示的に`.resize(1200,675,{fit:'cover'}).webp({quality:85})`変換してから保存するよう修正（従来はraw bytesをそのまま`.webp`として書き込んでいた）。他（prompt/model/provider/出力パス/manual-only性質）は無変更。

### テスト方法（ライブAPI呼び出しなし）

1. `HF_TOKEN_FILE`未設定で両スクリプト実行→即fail、値非表示を確認。
2. `HF_TOKEN_FILE`に存在しないパスを指定→ファイルパスのみ報告してfail確認。
3. 実在する出力先（両ターゲットとも既存ファイルあり）に対し`--force`なしで実行→上書きガードが発火し中断、書き込みなしを確認（ガードはネットワーク呼び出し前に評価されるため実際のAPI通信は発生していない）。
4. `--bogus`不明引数を渡し拒否されることを確認。
5. sharpのWebP変換はNode合成PNGフィクスチャ（10x10単色画像、ネットワーク不使用）に対し`resize→webp`変換を実行し、出力先頭バイトが`RIFF`/`WEBP`マジックであることを確認（generate-sample-image.mjsの変換コードと同一パターン）。
6. `node --check`で両スクリプトの構文検証PASS。
7. テストで使用した一時トークンファイル・一時fixtureはスクラッチディレクトリのみに作成し、テスト後すべて削除済み。追跡対象ファイル・生成画像アセットへの書き込みは一切発生していない。

### plural script (generate-reference-images.mjs) 処置

無変更（read-onlyでの比較参照のみ）。単数版canonicalが対象選択・SDK使用・上書きガード・トークン安全性の面で優位なため、将来的に複数版を完全代替できる可能性は高いが、実際の出力差分の網羅的検証は本taskの範囲外のため`uncertain`寄りの`yes`寄り判定に留め、削除は別task判断とする。
