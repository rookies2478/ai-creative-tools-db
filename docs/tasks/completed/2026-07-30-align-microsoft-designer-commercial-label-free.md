---
task_id: "align-microsoft-designer-commercial-label-free"
created_at: "2026-07-30"
status: DONE
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "/comparisons/free-ai-image-generators/ のMicrosoft Designer行のfreePlanCommercial/paidPlanCommercial表示を、DB正本(src/content/tools/microsoft-designer.md commercialUse=\"no\")に合わせて修正する"

non_goals:
  - Microsoft Designer以外の行の変更
  - Clipdropの変更
  - DB正本の変更
  - 比較表構造の変更
  - 列名変更
  - getCollection/getEntryへの置換
  - 共通コンポーネント化
  - title変更
  - meta description変更
  - H1変更
  - 本文変更
  - 内部リンク変更
  - CSS変更
  - URL変更
  - 本番反映

target_files:
  - src/pages/comparisons/free-ai-image-generators/index.astro

reference_files:
  - docs/tasks/LATEST.md
  - src/content/tools/microsoft-designer.md
  - docs/tasks/completed/2026-07-30-align-microsoft-designer-commercial-label.md
  - docs/tasks/completed/2026-07-30-align-microsoft-designer-commercial-label-ec.md

unknowns: []

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - git diff --name-only
  - npm run validate:scope

acceptance_criteria:
  - 変更ファイルは1件のみ(src/pages/comparisons/free-ai-image-generators/index.astro)
  - Microsoft Designer行のfreePlanCommercial/paidPlanCommercialのみが変更されている
  - DB正本は変更されていない
  - 他ツール行は変更されていない
  - build成功
  - diff check成功
  - scope validation成功
  - 秘密情報露出なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

比較ページのハードコード値とDB正本の不一致監査で、/comparisons/free-ai-image-generators/ のMicrosoft Designer行のfreePlanCommercial/paidPlanCommercialが旧値「要確認」のまま残存していることが判明した（UNKNOWN_MISMATCH）。DB正本(src/content/tools/microsoft-designer.md commercialUse="no"、verifiedAt/lastReviewed 2026-07-12、Microsoft Designer利用規約でtrade or commerceの過程での利用は認められないと明記)と矛盾する。同じDB正本に基づき /comparisons/ad-banner-ai-tools/ と /comparisons/ec-product-image-ai-tools/ は既に「個人利用限定（商用不可）」表記へ修正済み。

## Paid Plan Interpretation

対象ページの paidPlanCommercial は全29ツール行共通のハードコード列であり、"対象外"等の非該当値を持つ行は存在しない（Canva AI画像生成・Adobe Firefly・DALL·E等すべて具体的な値を保持）。ページ内・DB正本のいずれにも「Microsoft Designerに有料プラン自体が存在しない」との記載はなく、単に比較表の形式的な共通列として値を持たせているのみと判断。よって freePlanCommercial と paidPlanCommercial の両方をDB正本に合わせて修正した（HOLDには該当しない）。

## Implementation Notes

- 変更前: `freePlanCommercial: '要確認', paidPlanCommercial: '要確認'`
- 変更後: `freePlanCommercial: '不可（個人利用限定）', paidPlanCommercial: '不可（個人利用限定）'`
- 対象は該当行1件のみ（157行目）。他ツール行・列構造・commercialNoteは変更しない。

## Result Schema

```
RESULT: PASS

SUMMARY:
/comparisons/free-ai-image-generators/ のMicrosoft Designer行のfreePlanCommercial・
paidPlanCommercialを「要確認」から「不可（個人利用限定）」へ修正。
根拠はDB正本(src/content/tools/microsoft-designer.md commercialUse="no"、
verifiedAt/lastReviewed 2026-07-12)。/comparisons/ad-banner-ai-tools/・
/comparisons/ec-product-image-ai-tools/で既に修正済みの表現と統一。
他ツール行・DB正本・title/meta/H1/本文/内部リンク/比較表構造は変更なし。

CHANGED_FILES:
1 file
- src/pages/comparisons/free-ai-image-generators/index.astro

CHECKS:
- task_validation: PASS
- build: PASS（92ページ）
- diff_check: PASS（対象1行のみ）
- scope_validation: PASS
- new_text_present: PASS（ソース差分で確認）
- old_values_absent_in_target_row: PASS（Microsoft Designer行から「要確認」消滅）
- other_rows_unchanged: PASS（NightCafe等の「要確認」は維持、他行差分なし）
- DB_unchanged: PASS
- generated_HTML: NOT_VERIFIED（dist/への直接アクセスが本環境権限でブロック、過去タスクと同様の制約）
- visual_check: NOT_VERIFIED（PC/スマホ実表示確認は未実施）
- secret_check: PASS

GIT:
- commit: (このタスク完了に伴うcommitハッシュを参照。docs/tasks/LATEST.mdの最新記録を参照)
- push: 完了

PRODUCTION:
DEPLOYED

LATEST_UPDATED:
yes

NEXT:
Clipdrop商用利用表示について公式情報audit-onlyを実施する。
```

## Production Verification (2026-07-30)

- URL: https://aicreative-db.com/comparisons/free-ai-image-generators/
- HTTP status: 200
- freePlanCommercial新文言「不可（個人利用限定）」: Microsoft Designer行のfai-td-note列（editability「◯（テンプレート連携）」直前）に1件検出
- paidPlanCommercial: このページのテンプレート（src/pages/comparisons/free-ai-image-generators/index.astro）はfreePlanCommercialのみをtableRows.map内でレンダリングしており、paidPlanCommercialはデータ配列上に保持されるのみで元々HTML出力されない仕様（本タスクの変更前から不変）。よってpaidPlanCommercialの文言はHTML上で直接確認できないが、ソースコード上は同じ新文言に修正済みであることを確認済み（データ正本として保持）。
- 旧値「要確認」: Microsoft Designer行のfreePlanCommercial列（fai-td-note）からは消滅。ページ内に残る他の「要確認」はwatermark列（DALL·E/Leonardo AI/Ideogram/NightCafe/Playground AI/SeaArt AI/Tensor Art等、多数のツールで共通）およびGemini画像生成・Brand Studio等のfreePlanCommercial列で、いずれも本タスクの対象外・無関係であることを確認
- title: 「無料AI画像生成ツール比較表｜14ツールの無料枠・透かし・商用利用条件を横断確認 | AIクリエイティブナビ」変更なし
- H1: 「無料プランで比較するAI画像生成ツール」変更なし
- canonical: https://aicreative-db.com/comparisons/free-ai-image-generators/ 正しい
- HTML structure: PASS（table 1件、行列構造に異常なし）
- desktop_visual: NOT_VERIFIED（curl/HTML取得のみのため視覚確認は未実施）
- mobile_visual: NOT_VERIFIED（curl/HTML取得のみのため視覚確認は未実施）

判定: PASS（本番反映確認済み）。commit 8287ee0が本番へ正しく反映されていることを確認。paidPlanCommercialがHTML非表示である点はテンプレート仕様であり不具合ではない。

## Verification Detail

- 新文言「不可（個人利用限定）」: 対象ページ157行目に2件（freePlanCommercial/paidPlanCommercial）検出
- 旧値「要確認」: Microsoft Designer行からは消滅。NightCafe/Playground AI/SeaArt AI/Tensor Art等の他行の「要確認」はそのまま残存（意図した通り、無変更）
- Clipdrop: 本ページに行自体が存在しないため対象外（無関係）
- 他ツール行（Canva AI画像生成/Adobe Firefly/DALL·E/Stable Diffusion/Leonardo AI/Fotor AI/Gemini画像生成/Brand Studio/Ideogram等）: grep差分なし、変更なし確認
- DB正本(src/content/tools/microsoft-designer.md): git diff --name-only で対象外、無変更確認
- build: PASS（92ページ、エラーなし）
- diff_check: PASS（git diff --check exit 0、CRLF警告のみ）
- scope_validation: PASS（変更ファイル1件のみ）
- generated_HTML(dist)確認: 本環境のサンドボックス権限でdist/への直接読み取りがブロックされ、生成HTML内の文言直接確認は不可（過去タスクと同様の制約）。ソース差分(grep)確認とbuild成功ログで代替。
- visual_check(PC/スマホ表示崩れ): NOT_VERIFIED（ブラウザでの視覚確認は本タスクでは未実施）
- secret_check: PASS（対象ファイルにAPIキー・SECRET・PRIVATE_KEY等の露出なし）
