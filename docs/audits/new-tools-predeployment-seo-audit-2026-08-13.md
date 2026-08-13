# New Tools Pre-Deployment SEO Audit

- date: 2026-08-13
- scope: Photoroom / Creatify / Recraft（commit 762fb8c時点のDBデータ）
- production: NOT_DEPLOYED（本監査でも本番デプロイなし）

## Executive Summary

3ツールとも既存の`src/pages/tools/[slug].astro`動的ルート経由でページ生成されており、ルート衝突・スキーマ欠落はない。監査の過程で、直近のVERIFY audit（2026-08-13）でのデータ更新が2つの既存内部リンクページに反映されていない不整合を発見し、最小限修正した：
1. `use-cases/ec-product-image`のPhotoroom行が日本語UI対応確認（`japaneseUi: true`）前の「未確認」表記のまま残っていた → 修正済み。
2. `guides/ai-image-commercial-use-checklist`のRecraft行が「解約後も所有権・商用利用権が継続する」と断定表現のまま残っており、Recraft VERIFY監査で「規約第14条との関係が一義的でない＝要確認」と判定した内容と矛盾していた → 断定表現を削除し要確認表現に修正済み。

Creatifyのフィールド・本文は無変更（対象外）。新規ツール追加・アフィリエイトリンク追加・本番デプロイは行っていない。

全体判定: **DEPLOY_READY**（残存VERIFY項目はいずれも既存の「要確認」表記で正直に扱われており、公開の妨げにはならない）

---

## Photoroom

### Route
- URL: `/tools/photoroom/`（動的ルート、STATIC_OVERRIDESに未登録、コリジョンなし）
- 静的ページファイルの重複なし。schema必須フィールド充足、build時にエラー・警告なし。

### Title / Meta
- Title: `Photoroomの商用利用・料金・無料枠を比較｜AIクリエイティブナビ`（全ツール共通テンプレート。サイト規約であり本ツール固有のキーワードスタッフィングではない）→ PASS
- Meta description: `Photoroomの特徴、料金、無料プランの有無、日本語対応、商用利用条件の確認ポイントを整理。AI画像生成ツールとしての使い方や注意点もまとめています。最新情報は公式サイトをご確認ください。`（全ツール共通テンプレートで生成、事実と矛盾なし）→ PASS

### 検索意図
- Photoroom / Photoroom 使い方 / Photoroom AI / 商品画像 AI: **HIGH**（EC商品写真の背景除去・バッチ編集という一次機能とH1・本文が完全一致）

### カニバリゼーション
- Canva AI画像生成（汎用デザイン統合）、Adobe Firefly（Adobe生態系・高品質合成）、Fotor AI（写真編集全般）と比較して、Photoroomは「EC商品写真の背景除去・バッチエクスポート」という業務特化ポジショニングが明確。
- Fotor AIとは背景除去機能で機能重複するが、Fotorは汎用写真編集＋デザインテンプレート、PhotoroomはEC実務ワークフロー特化と役割が異なる。
- 判定: **LOW**。タイトル・イントロ・内部リンクの追加調整は不要。

### Content Accuracy
- japaneseUi: true — 公式ヘルプ記事「Change the language of Photoroom」で裏付けあり。FAQ・本文の記述と一致。
- japanesePrompt: unknown — weaknesses/limitations/FAQ/本文いずれも「未確認」と一貫。断定なし。
- commercialUse: paid-only — 公式ヘルプ「Free accounts and commercial use」で裏付けあり。frontmatter・本文・FAQで矛盾なし。
- 修正前は`use-cases/ec-product-image`のPhotoroom行が古い「日本語対応は未確認」表記のままだったため、frontmatter更新後の状態と矛盾していた（本監査で修正済み、下記Changes Made参照）。

### CTA
- 使用URL: `data.officialUrl`（`https://www.photoroom.com`）。affiliateUrl未設定のため`rel="nofollow noopener noreferrer"`。アフィリエイトリンク不使用は方針通り。
- CTA文言「公式サイトで確認する」「料金・利用条件を公式サイトで確認する」は正確、過度な"無料"訴求や価格断定なし。CTAは1ページ内に複数出現するが（hero・比較表下・チェックリスト・関連ページ）、いずれも同一遷移先で内容が異なる文脈のため過剰反復とは判定しない。

### Internal Links
- Inbound: `categories/image-generation`（primaryImageSlugs配列）、`use-cases/ec-product-image`（比較行）。
- Outbound（本文）: `use-cases/ec-product-image`、`categories/image-generation`、`conditions/commercial-use`。
- 発見導線は十分。追加のリンク拡散は不要と判断。

### Structured Data
- `SoftwareApplication`（name, operatingSystem, applicationCategory="DesignApplication", description, url）+ `BreadcrumbList`。重複レコードなし、price/rating等の未確認情報は含まれていない。動的値（`data.name`, `data.officialUrl`）はfrontmatterと一致。

### Indexability
- `canonicalPath="/tools/photoroom/"`指定、`noindex`未渡し（デフォルトfalse）→ indexable。
- サイトマップ: `sitemap.xml.ts`が`getCollection('tools')`から自動生成しており、`SITEMAP_EXCLUDED_PATHS`にphotoroomは含まれない → sitemap収録確認。

### Display Risk
- Title文字数: 通常範囲内。テーブル（比較ポイント早見表）は既存コンポーネントで他ツールと同一構造、幅崩れなし。
- ブラウザでの視覚確認は本監査では未実施（環境上プレビュー未実行）。**視覚確認は保留**。

### Differentiation
「EC商品写真の背景除去・バッチエクスポートに特化した専用ツールであり、汎用デザインツール（Canva等）や高品質合成特化ツール（Firefly等）とは異なる実務ワークフロー向けの選択肢」という位置づけが明確。

### Decision
**READY**

---

## Creatify

### Route
- URL: `/tools/creatify/`（動的ルート、コリジョンなし、schema充足）

### Title / Meta
- Title: `Creatifyの商用利用・料金・無料枠を比較｜AIクリエイティブナビ` → PASS（共通テンプレート）
- Meta description: 共通テンプレート、事実と矛盾なし → PASS

### 検索意図
- Creatify / Creatify AI / AI広告動画 / UGC広告 AI: **HIGH**（商品URL→UGC風広告動画生成という一次機能とFAQ「InVideo AI・CapCut AIとの違い」が明示的にこの検索意図に応えている）

### カニバリゼーション
- InVideo AI・CapCut AI（汎用動画編集・テンプレート活用）とはCreatify自身のFAQ・本文セクションで明示的に差別化済み。
- HeyGen・D-ID・Synthesia（AIアバター動画）とは、これらが「入力素材（テキスト/画像/顔写真）からアバター動画を作る」ツールであるのに対し、Creatifyは「商品URL起点でUGC風広告クリエイティブを自動生成」する点でユースケースが異なる（研修・マーケティング動画 vs. 広告クリエイティブ量産）。
- ad-bannerページには文脈的な1段落リンクのみで、tools配列（静止画バナー特化）には追加されておらず、構造的な重複表示もない。
- 判定: **LOW**。調整不要。

### Content Accuracy
- commercialUse: unknown — frontmatter・weaknesses・limitations・FAQ・本文いずれも「明示的な記載を確認できていない」で一貫。断定なし。VERIFY audit判断（根拠不十分のため変更せず）を維持しており、正しい。
- japaneseUi/japanesePrompt: unknown — 一貫して未確認表記。
- 本ツールに関する既存内部リンクページ（ad-banner）の記述も「商用利用可否・日本語対応は公式情報のみでは確認できていない」で最新frontmatterと整合。矛盾なし。

### CTA
- 使用URL: `officialUrl`（`https://creatify.ai`）。affiliateUrl未設定。CTA文言は事実ベースで過度な訴求なし。

### Internal Links
- Inbound: `use-cases/ad-banner`（本文中の文脈的リンク1件）。`categories/video-generation`への追加は意図的に見送られている（video-generationカテゴリの主要比較表はテキスト→動画モデル中心のため、性質が異なるCreatifyを混在させない判断が過去タスクで明記されている）。
- Outbound（本文）: `use-cases/ad-banner`、`categories/video-generation`、`conditions/commercial-use`。
- 現状の限定的な内部リンクは意図的な設計判断であり、妥当。追加リンクは不要。

### Structured Data
- `SoftwareApplication`（applicationCategory="MultimediaApplication"、videoカテゴリのため）+ `BreadcrumbList`。重複なし、未確認情報の混入なし。

### Indexability
- canonical/robots正常、sitemap自動収録（除外リストに含まれない）。

### Display Risk
- 視覚確認は未実施（保留）。テーブル・FAQ構造は他ツールと同一コンポーネントのため、構造的リスクは低いと推定。

### Differentiation
「商品URLを入力するだけでUGC風の広告動画・画像広告を自動生成する、広告クリエイティブ特化ツール」という位置づけが明確で、汎用動画編集ツールともアバター動画ツールとも異なる。

### Decision
**READY**

---

## Recraft

### Route
- URL: `/tools/recraft/`（動的ルート、コリジョンなし、schema充足）

### Title / Meta
- Title: `Recraftの商用利用・料金・無料枠を比較｜AIクリエイティブナビ` → PASS（共通テンプレート）
- Meta description: 共通テンプレート、事実と矛盾なし → PASS

### 検索意図
- Recraft / Recraft AI / AIベクター生成 / SVG AI / デザインAI: **HIGH**（「現行DBで唯一ベクター/SVG生成に特化」という強みがH1・本文・strengthsで一貫して打ち出されている）

### カニバリゼーション
- Adobe Firefly・Canva AI画像生成・Microsoft Designerはいずれもラスター画像生成中心で、ベクター/SVG生成を主機能としていない。Recraftの「唯一のベクター生成特化ツール」というポジショニングは他ツールと重複しない。
- `image-generation`カテゴリハブ（primaryImageSlugs）、`guides/ai-image-commercial-use-checklist`への内部リンクは機能的にも文脈的にも整合。
- 判定: **LOW**。調整不要。

### Content Accuracy
- commercialUse: limited — 利用規約第7.1条・第7.2条に基づく正確な記述。frontmatter・usagePolicy・FAQ・本文で一貫。
- 「解約後の権利継続」は規約第14条との関係が一義的でないため要確認と正しく維持されている（frontmatter・weaknesses・limitations・FAQ・本文いずれも断定なし）。
- **不整合を発見**: `guides/ai-image-commercial-use-checklist`のRecraft行のnotesが旧版の「有料プラン加入中に生成した画像は解約後も所有権・商用利用権が継続するとされています」という断定表現のままで、VERIFY audit後のfrontmatterの「要確認」判定と矛盾していた。本監査で修正済み（Changes Made参照）。
- japaneseUi/japanesePrompt: unknown — 一貫して未確認表記。

### CTA
- 使用URL: `officialUrl`（`https://www.recraft.ai`）。affiliateUrl未設定。CTA文言は正確。紹介制度（referral program）への言及は文脈的リンクとして本文にあるが、CTAボタンとしては使用されておらず、アフィリエイトリンクの新規追加ではない。

### Internal Links
- Inbound: `categories/image-generation`（primaryImageSlugs）、`guides/ai-image-commercial-use-checklist`（比較テーブル行）。
- Outbound（本文）: `guides/ai-image-commercial-use-checklist`、`categories/image-generation`、`conditions/commercial-use`。
- 発見導線は十分。追加不要。

### Structured Data
- `SoftwareApplication`（applicationCategory="DesignApplication"）+ `BreadcrumbList`。重複なし、価格・評価等の未確認情報の混入なし。

### Indexability
- canonical/robots正常、sitemap自動収録。

### Display Risk
- 料金テーブル（4行×3列）は既存コンポーネント構造を踏襲しており崩れリスクは低い。視覚確認は未実施（保留）。

### Differentiation
「ラスター画像生成に加えてベクター（SVG）生成に対応した、現行DB唯一のツール」という位置づけが明確で、他の画像生成ツールとの差別化理由を一文で説明できる。

### Decision
**READY**

---

## Cross-Site Findings

1. **VERIFY audit後の内部リンクページ同期漏れ**（今回修正）: `src/content/tools/*.md`のfrontmatter更新は正本として扱われるが、それを参照する既存の内部リンクページ（use-cases・guides配下の静的astroファイル内のハードコード配列）は自動同期されない構造になっている。今回、Photoroomの日本語UI確認とRecraftの解約後権利継続の「要確認」化の2件が同期漏れとなっていた。将来同様のfrontmatter更新を行う際は、当該ツールを参照する全ページ（`grep -ri <slug>`で洗い出し）を同一タスクのtarget_filesに含めることを推奨。
2. Title/meta descriptionは全ツール共通テンプレートによる自動生成であり、3ツール固有のSEO問題ではない（既存26ツールと同じ設計）。
3. 3ツールともCTAはofficialUrlのみを使用しており、アフィリエイトリンクの新規追加は確認されなかった。
4. 3ツールとも構造化データ・canonical・sitemap収録は既存の動的ルートの仕組みに準拠しており、個別の追加対応は不要。

## Changes Made

以下2ファイルを、direct-related linking pageの事実整合性修正として最小限変更（新規スキーマ・新規カテゴリ・新規記事・アフィリエイトリンクの追加は一切なし）:

1. `src/pages/use-cases/ec-product-image/index.astro` — Photoroom行の `ja`（要確認→○）、`japanese`（日本語対応は未確認→UIは日本語対応を確認済み。日本語プロンプト対応は未確認）、`caution`（日本語対応の詳細は未確認です→日本語UIは対応済みですが、日本語プロンプト対応の詳細は未確認です）を、VERIFY audit（`docs/audits/new-tools-verify-audit-2026-08-13.md`）で確認済みの`japaneseUi: true`に整合させた。
2. `src/pages/guides/ai-image-commercial-use-checklist/index.astro` — Recraft行のnotesから「有料プラン加入中に生成した画像は解約後も所有権・商用利用権が継続するとされています」という断定表現を削除し、「有料サブスクリプション中に生成した画像はユーザーに著作権が譲渡されるとされていますが、解約後もこの権利が継続するかどうかは利用規約上一義的でなく要確認です」に修正。frontmatterの`commercialUseNote`・weaknesses・limitationsと同一の「要確認」判定に統一。

## Remaining Risks

- Photoroom: 日本語プロンプト対応は未確認のまま（意図的、断定していない）。
- Creatify: 商用利用可否の公式明示、日本語対応（UI/プロンプト）はいずれも未確認のまま（意図的、断定していない）。
- Recraft: 日本語対応（UI/プロンプト）、解約後の権利継続の正確な適用条件は未確認のまま（意図的、断定していない）。
- ブラウザでの実機ビジュアル確認（モバイル表示崩れ等）は本監査環境では未実施。本番デプロイ前、または可能なタイミングでの目視確認を推奨。
- 上記Cross-Site Findings 1.の「frontmatter更新と内部リンクページの非同期」は、今回3ツール分（2件）を修正したのみで、既存26ツールに同種の潜在的ズレがないかは本監査のスコープ外（未調査）。

## Deployment Readiness

- Photoroom: **READY**
- Creatify: **READY**
- Recraft: **READY**

**Overall: DEPLOY_READY**（本番デプロイ自体は人間が別途手動実施）
