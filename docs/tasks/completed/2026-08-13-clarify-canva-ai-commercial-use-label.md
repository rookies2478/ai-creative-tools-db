---
task_id: "clarify-canva-ai-commercial-use-label"
created_at: "2026-08-13"
status: DONE
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "/comparisons/free-ai-image-generators/ のCanva AI画像生成行freePlanCommercialを、公式一次情報(Canva AI Product Terms)に基づいた短く安全な表示へ修正する"

non_goals:
  - Canva DB正本変更
  - paidPlanCommercial変更
  - Microsoft Designer変更
  - Clipdrop変更
  - Adobe Firefly変更
  - NightCafe等の他ツール変更
  - 比較表構造変更
  - 列追加
  - getCollection/getEntry化
  - 共通コンポーネント化
  - title変更
  - meta変更
  - H1変更
  - 本文変更
  - 内部リンク変更
  - CSS変更
  - schema変更
  - URL変更
  - 本番反映

target_files:
  - src/pages/comparisons/free-ai-image-generators/index.astro

reference_files:
  - docs/tasks/LATEST.md
  - src/content/tools/canva-ai-image-generator.md

unknowns: []

required_checks:
  - npm run build
  - git diff --check
  - git diff --name-only
  - 新文言grep
  - 旧文言の対象行内不在
  - 権利関係注意の存在確認
  - 他ツール行差分なし
  - paidPlanCommercial差分なし
  - DB差分なし
  - secret check

acceptance_criteria:
  - 変更ファイルは1件のみ(src/pages/comparisons/free-ai-image-generators/index.astro)
  - Canva AI画像生成行のfreePlanCommercialのみ変更（既存commercialNoteフィールドへ権利関係注意を追加）
  - 商用利用と著作権成立・排他的権利・第三者権利保証を混同していない
  - 旧表示「条件付き（公式未明記）」が対象行から消える
  - 他ツール行・paidPlanCommercial・DB無変更
  - build成功
  - diff check成功
  - secret露出なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

過去の公式情報監査で、Canva AI画像生成のAI出力利用条件がCanva AI Product Terms(https://www.canva.com/policies/ai-product-terms/、本文直接確認済み、evidence strength: HIGH)に明記されていることを確認済み。無料・有料プランで商用利用許可を分ける明確な規定は確認されなかった一方、商用利用可能であることと「著作権が成立する」「排他的権利を持てる」「第三者権利を侵害しない」「Canvaが権利を保証する」は別論点であることが判明した。過去監査判定はCOMPARISON_ONLY・DB_FIRSTではない・implementation risk: LOWで、対象は/comparisons/free-ai-image-generators/のCanva行のみ。

## Implementation Notes

- 対象ページのCanva行にはfreePlanCommercial/paidPlanCommercial/commercialNoteの3フィールドが存在し、権利注意は既存commercialNoteフィールドへ分離可能な構造だった（新規フィールド追加は不要）。
- 変更前:
  freePlanCommercial: '条件付き（公式未明記）'
  commercialNote: 'AI生成コンテンツであることの明示が条件とされている場合あり。プランや用途によって条件が異なります。最新情報は公式サイトをご確認ください。'
- 変更後:
  freePlanCommercial: '可'
  commercialNote: '利用規約（Canva AI Product Terms）上は商用利用可能とされていますが、著作権の成立・排他的権利・第三者権利を侵害しないことをCanvaが保証するものではありません。AI生成コンテンツであることの明示が条件とされている場合あり。最新情報は公式サイトをご確認ください。'
- paidPlanCommercial（'条件付き（Canvaライセンス確認）'）は無変更。
- 新しい意味・条件の推測追加はせず、既存監査結果の範囲内で表現のみ整理した。

## Result Schema

```
RESULT: PASS

SUMMARY:
- 修正内容: /comparisons/free-ai-image-generators/ のCanva AI画像生成行freePlanCommercialを「条件付き（公式未明記）」から「可」へ変更し、既存commercialNoteフィールドへ著作権成立・排他的権利・第三者権利・Canva保証は別論点である旨の注意を追加。
- 公式根拠: Canva AI Product Terms（https://www.canva.com/policies/ai-product-terms/、本文直接確認済み、evidence strength: HIGH）
- 採用表示: freePlanCommercial='可' + commercialNoteへ権利関係注意（既存注記フィールドが分離可能な構造だったため案B相当を採用）
- 他項目への影響: paidPlanCommercial・他ツール行・DB正本・title/meta/H1/本文/内部リンク/比較表構造は無変更。

IMPLEMENTATION:
- target_file: src/pages/comparisons/free-ai-image-generators/index.astro
- tool: Canva AI画像生成
- field: freePlanCommercial + commercialNote
- previous_value: freePlanCommercial='条件付き（公式未明記）', commercialNote='AI生成コンテンツであることの明示が条件とされている場合あり。プランや用途によって条件が異なります。最新情報は公式サイトをご確認ください。'
- revised_value: freePlanCommercial='可', commercialNote='利用規約（Canva AI Product Terms）上は商用利用可能とされていますが、著作権の成立・排他的権利・第三者権利を侵害しないことをCanvaが保証するものではありません。AI生成コンテンツであることの明示が条件とされている場合あり。最新情報は公式サイトをご確認ください。'
- note: 商用利用可否と権利保証（著作権成立・排他的権利・第三者権利非侵害）を明確に区別
- official_source: https://www.canva.com/policies/ai-product-terms/（確認日: 過去監査時点、本タスクでは再確認せず既存監査結果を採用）
- field_structure: 既存commercialNoteフィールドが分離可能な構造のため新規フィールド追加なし

UNCHANGED:
- DB正本: 無変更（src/content/tools配下への変更なし、git diff --name-only -- src/content/tools/で確認）
- paidPlanCommercial: 無変更（'条件付き（Canvaライセンス確認）'のまま）
- Microsoft Designer: 無変更
- Clipdrop: 無変更（本ページに行なし、対象外）
- Adobe Firefly: 無変更
- 他ツール行（DALL·E/Stable Diffusion/Leonardo AI/Fotor AI/Midjourney/Gemini画像生成/Brand Studio/Ideogram/NightCafe/Playground AI/SeaArt AI/Tensor Art）: 無変更
- title/meta/H1/本文/internal links/comparison structure: 無変更

CHECKS:
- build: PASS（92ページ、エラーなし）
- diff_check: PASS（対象1行のみ、CRLF警告のみ）
- scope_validation: PASS（変更ファイル1件のみ）
- new_text_present: PASS（freePlanCommercial='可'、commercialNoteに権利注意文言を確認）
- old_text_absent: PASS（Canva行から「条件付き（公式未明記）」消滅を確認）
- rights_caveat_present: PASS（著作権成立・排他的権利・第三者権利・Canva保証の非該当を明記）
- other_rows_unchanged: PASS（diffでCanva行1行のみの変更を確認）
- DB_unchanged: PASS
- generated_HTML: NOT_VERIFIED（dist/への直接アクセスが本環境権限でブロックのため）
- desktop_visual: NOT_VERIFIED
- mobile_visual: NOT_VERIFIED
- secret_check: PASS

CHANGED_FILES:
1 file
- src/pages/comparisons/free-ai-image-generators/index.astro

GIT:
- commit: d6b59cb "Clarify Canva AI commercial-use label"
- push: 完了（d73d56a..d6b59cb master -> master）
- origin_sync: 完了（ahead/behind 0/0）

PRODUCTION:
NOT_DEPLOYED

LATEST_UPDATED:
yes

NEXT:
本番へ手動反映し、/comparisons/free-ai-image-generators/ のCanva AI画像生成の無料プラン商用利用表示を確認する。Clipdrop・Adobe FireflyはHOLD継続。
```

## Production Verification (2026-08-13 追記)

本番URL（https://aicreative-db.com/comparisons/free-ai-image-generators/）へcurlで直接HTTPリクエストし、HTML構造上のCanva行表示・commercialNote・title/H1/canonical/robotsを確認。視覚的レイアウト崩れ（PC/スマホの実表示）はテキストベース確認のツールでは検証不可のためNOT_VERIFIED。HTML構造上の異常（テーブル行・列崩れ）はなし。

```
RESULT: PASS

SUMMARY:
- 本番反映結果: /comparisons/free-ai-image-generators/ にCanva AI画像生成の新しい商用利用表示が反映済み（HTTP 200）。
- Canva表示: 無料プラン商用利用列（※1）が「可」に変更、旧表示「条件付き（公式未明記）」はページ全体から検出されず。
- 権利関係注意: 商用利用メモ列（※2）に「利用規約（Canva AI Product Terms）上は商用利用可能とされていますが、著作権の成立・排他的権利・第三者権利を侵害しないことをCanvaが保証するものではありません」の趣旨を確認。
- 他ツールへの影響: Microsoft Designer行（「不可（個人利用限定）」）他ツール行に変化なし。
- 視覚確認可否: curl/HTML取得のみのため視覚確認不可。HTML構造（テーブルの行・列並び）に異常なし。

REPOSITORY_STATE:
- branch: master
- latest_commit_before: 46e4361
- origin_sync_before: 完了（ahead/behind 0/0）
- working_tree_before: clean

PRODUCTION_CHECK:
- URL: https://aicreative-db.com/comparisons/free-ai-image-generators/
- HTTP_status: 200
- Canva_freePlanCommercial: '可'（無料プラン商用列に検出）
- old_value_absent: true（「条件付き（公式未明記）」はページ全体で検出されず）
- rights_caveat_present: true（著作権成立・排他的権利・第三者権利非侵害・Canva非保証・公式確認推奨の趣旨を全て確認）
- paidPlanCommercial_unchanged: true（この比較表テンプレートはpaidPlanCommercial列自体を描画しない仕様。ソース側の値も無変更を確認済み）
- Microsoft_Designer_unchanged: true（「不可（個人利用限定）」のまま）
- other_rows_unchanged: true（DALL·E/Stable Diffusion/Leonardo AI/Fotor AI等の表示に変化なし）
- title: 一致（"無料AI画像生成ツール比較表｜14ツールの無料枠・透かし・商用利用条件を横断確認 | AIクリエイティブナビ"、意図しない変更なし）
- H1: 一致（"無料プランで比較するAI画像生成ツール"、意図しない変更なし）
- canonical: 一致（https://aicreative-db.com/comparisons/free-ai-image-generators/、意図しない変更なし）
- noindex: absent（<meta name="robots">タグ自体が検出されず、index可能な状態を維持）
- HTML_structure: PASS（テーブルの列数・行数・thead/tbody構造に異常なし）
- desktop_visual: NOT_VERIFIED
- mobile_visual: NOT_VERIFIED

CHANGED_FILES:
- completed task: docs/tasks/completed/2026-08-13-clarify-canva-ai-commercial-use-label.md（本追記）
- LATEST: docs/tasks/LATEST.md（production_state更新）

CHECKS:
- diff_check: PASS
- scope_validation: PASS（docsのみ）
- secret_check: PASS

GIT:
- commit: (この後のcommitハッシュを参照)
- push: 完了予定
- origin_sync: 完了予定

PRODUCTION:
DEPLOYED

LATEST_UPDATED:
yes

NEXT:
本番確認PASS後、Clipdrop・Adobe FireflyはHOLD継続。次回正式14日GSC runでStable Diffusion / Runway / バナー比較 / Luma / Viduを再評価する。
```
