# 画像生成スクリプト監査（audit only）

- date: 2026-08-13
- HEAD時点: d5bbc75
- target: scripts/generate-reference-image.mjs, scripts/generate-reference-images.mjs, scripts/generate-sample-image.mjs
- 変更: なし（監査のみ）

## Part A/B — スクリプト個別比較

| 項目 | generate-reference-image.mjs（単数） | generate-reference-images.mjs（複数） | generate-sample-image.mjs |
|---|---|---|---|
| 目的 | target引数1件を指定して参照画像1枚生成 | images[]配列3件を全件一括生成 | stable-diffusion専用サンプル画像1枚固定生成 |
| CLI | `node ... <target>`（image-generation / video-generation / free-ai-image-tools） | 引数なし、常に3件全部実行 | 引数なし、常に固定1件 |
| HTTPクライアント | `@huggingface/inference` InferenceClient | 生fetch（`api-inference.huggingface.co`、旧エンドポイント） | 生fetch（`router.huggingface.co/hf-inference`、新エンドポイント） |
| モデル | black-forest-labs/FLUX.1-schnell | 同左 | 同左 |
| トークン | `HF_TOKEN_FILE` env → 既定 `C:\dev\Studio\huggingface.co_API.txt` | 同左（コメントで秘匿注意あり） | 同左（`hf_`prefix検証あり） |
| 出力先 | public/images/generated/{categories,guides}/...-reference-visual-01.webp | 同上3件一括 | public/images/generated/tools/stable-diffusion-reference-visual-01.webp |
| WebP変換 | sharp resize+webp | sharp resize+webp | **なし**。APIレスポンスの生バイト列をそのまま`.webp`拡張子で保存（実体がwebpとは限らない） |
| 上書きガード | なし（存在確認は保存後の検証のみ） | なし | なし |
| リトライ | 3回、5秒間隔 | 3回、5秒間隔 | なし（1回失敗で即exit） |
| トークン漏洩防止 | エラーメッセージ内でtoken文字列を`[REDACTED]`置換 | 同左 | 値そのものをログ出力しない設計（"Token loaded: OK"のみ） |
| 対象範囲 | カテゴリ/ガイド用reference-visual 3種 | 同じ3種を一括 | stable-diffusionツール固定1種のみ |
| npm統合 | なし | なし | なし |

## 実行可否確認

- `C:\dev\Studio\huggingface.co_API.txt` は現状も**存在する**（内容未読、値未表示）。
- 3スクリプトとも同一のハードコードパスをデフォルト参照。`HF_TOKEN_FILE`環境変数で上書き可能な設計は3件とも共通で既にある。
- devDependencies に `@huggingface/inference`・`sharp` あり → 単数版・複数版は依存関係を満たす。sample-image版はsharp不使用のため依存不要。

## REFERENCE_SCRIPT_COMPARISON（単数 vs 複数）

- 重複ロジック: トークン読込・出力パス構成・prompt文言（ほぼ同一3種）・sharpによるwebp変換（単数版のみ実施、複数版はsharp呼ぶが同じ処理）・リトライ処理
- 単数版だけの利点: target引数で1件だけ選んで再生成可能（複数版は全件強制実行のため、1件だけ差し替えたい時に無駄なAPI呼び出し3回が発生）、公式SDK（`@huggingface/inference`）使用で将来のAPI仕様変更に追従しやすい
- 複数版だけの利点: 秘匿情報の扱いに関する注意コメントが冒頭にある（単数版にはない）。ただし機能的優位ではない
- HTTPクライアント差: 複数版は`api-inference.huggingface.co`という旧エンドポイントへ直接fetch。sample-image版は新エンドポイント`router.huggingface.co/hf-inference`を使用。単数版はSDK任せ（内部で新エンドポイント使用と推定、要確認）。**エンドポイント不統一は将来の障害要因**
- 一方が他方を機能的に完全に上回るか: ほぼ単数版が優位（対象を絞れる、SDK経由、コード量同等）。複数版に単数版へ移行すべき独自ロジックはない
- 移行前に必要な作業: 複数版の「秘匿注意コメント」を単数版へ移植する程度で十分。機能移植は不要

## CREDENTIAL_POLICY

- 現状リスク: 3スクリプトとも既定パスが`C:\dev\Studio\huggingface.co_API.txt`というWindows固有・作業者PC固有の絶対パスにハードコードされている。リポジトリ外ファイルのためGit漏洩はしていないが、他環境（CI、別PC、別OS）では動作しない
- 該当ファイルは実在確認済み（内容・値は未読・未表示、指示通り）
- ログ出力: 3スクリプトともtoken値の生ログ出力なし（置換処理 or 非表示設計）。安全
- 推奨: 現状の「環境変数`HF_TOKEN_FILE`で上書き可能、既定値はローカル固定パス」という設計自体は許容範囲（新シークレット管理システムは不要）。ただし既定値をハードコードせず、`HF_TOKEN_FILE`未設定時はエラーで停止する方式へ変更する方が安全（絶対パスのハードコードを削除し、必須環境変数化）
- コマンドライン引数でのtoken受け渡しは3件とも行っていない（安全）

## OVERWRITE_POLICY

- 現状: 3スクリプトとも既存ファイルの存在チェックをせず、無条件で`writeFileSync`により上書きする。保存後の存在確認はあるが「上書きしてよいか」の事前確認はない
- 推奨: 既定で「対象ファイルが既に存在する場合は失敗」し、明示的な`--force`指定時のみ上書き許可する方式。現行のsample-media運用（tool-outputは実際の生成物を手動キャプチャして`comparisonEligible`等のメタデータとセットでgeneratedImages.tsに登録する運用）と整合させるには、無断上書きより「安全に倒して人間の確認を挟む」方が既存運用の慎重さと合う
- 必須ではないが望ましい追加: 生成メタデータ（生成日時・モデル・promptVersion）をファイルと同時にJSON等で残せると、generatedImages.ts手動登録時の突合が楽になる（現状は完全に手動転記）

## SAMPLE_SCHEME_MAPPING（A/B判定）

`src/data/generatedImages.ts`のsampleType定義（'reference-visual' | 'tool-output'）を正本として判定。

| スクリプト | 出力scheme | 現行登録状況 | comparisonEligible妥当性 |
|---|---|---|---|
| generate-reference-image.mjs | B（reference-visual固定） | categories/guides用3件がsampleType:'reference-visual', comparisonEligible:false で正しく登録済み | 一致、問題なし |
| generate-reference-images.mjs | B（同上、単数版と同一出力） | 同上（出力パスが同一のため単数版と同じレコードを上書き生成するだけ） | 一致 |
| generate-sample-image.mjs | B（ファイル名が`-reference-visual-`） | `stable-diffusion-reference-visual-01.webp`としてsampleType:'reference-visual', comparisonEligible:false で正しく登録済み（generatedImages.ts:27-33） | 一致、A（tool-output）との誤認は現状なし |

- 誤分類リスク: スクリプト自体はsampleType/comparisonEligibleを書き込まない。分類はgeneratedImages.tsへの**手動登録**に依存している。現状3スクリプトの出力は全てB（reference-visual）としてのみ使われており、A（tool-output、実ツール生成物）とは名前空間（`-tool-output-`接尾辞）で区別されている。誤混入は現状確認されなかったが、**スクリプトのファイル名がB用途に限定される命名（`-reference-visual-`固定）である点自体がガード**になっている
- generate-sample-image.mjsは名称が"sample"だが実体はB scheme（reference-visual）専用。名称と実体の乖離があり将来の混同要因

## NPM_INTEGRATION

package.json現状: 画像生成系npm scriptは0件（analytics系・validate系のみ登録済み）。

| 提案 | 対象 | 用途 | 通常運用者に安全か | credential要否 | overwrite挙動 | 備考 |
|---|---|---|---|---|---|---|
| （提案）`media:generate-reference` | generate-reference-image.mjs（fix後） | reference-visual個別再生成 | 要credential・要API課金のため非安全、manual専用のまま推奨 | 要 | fix後は要`--force` | 現状は未整備のままでも実害なし。整備するなら最小限のラッパーに留める |
| （非推奨）plural版の統合 | generate-reference-images.mjs | 廃止予定 | - | - | - | npm登録しない |
| （提案しない）sample-image | generate-sample-image.mjs | stable-diffusion固定1件専用の historical script | 非安全（tool固定・overwrite無防備） | 要 | なし | npm化せずmanual-only維持を推奨 |

- 結論: 現状npm wrapperは無くても支障なし。将来単数版をfixした後、`media:generate-reference`のような1本化コマンドを追加する価値はあるが、緊急性なし。sample-image系はnpm化しない方が良い（誤操作防止）

## PERSISTED_AUDIT

- completed_task: docs/tasks/completed/2026-08-13-image-generation-scripts-final-audit.md
- audit_document: 本ファイル（docs/audits/image-generation-scripts-audit-2026-08-13.md）
- LATEST.md: current_active_task更新・previous_completed_task追記済み
