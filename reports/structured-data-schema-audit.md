# 構造化データ（JSON-LD / schema.org）監査レポート

実施日：2026-06-20  
対象：aicreative-db.com（Astroプロジェクト）

---

## 1. 現在実装されているschema一覧

| schema @type | 実装場所 | 出力方法 |
|---|---|---|
| FAQPage | トップ・カテゴリ・ユースケース・比較・ツール詳細（一部） | BaseLayout jsonLd prop / ToolFAQ / GuideFAQ コンポーネント inline |
| Article | 比較記事12本 | ComparisonVsArticle → BaseLayout jsonLd prop |
| SoftwareApplication | ツール詳細 全26件 | BaseLayout jsonLd prop |
| BreadcrumbList | ツール詳細 全26件・比較記事11本 | BaseLayout jsonLd prop（SoftwareApplication/Articleと配列でセット） |
| ItemList | /tools/ リスト | BaseLayout jsonLd prop |
| Organization | 比較記事のみ（Article.author / publisher にネスト） | Article schema 内部 |
| WebSite | **未実装** | — |
| WebPage / CollectionPage | **未実装** | — |
| Person | 使用なし（方針上不要） | — |
| Product / Review / AggregateRating | 使用なし（方針上正しい） | — |

---

## 2. ページタイプ別の現状

| ページタイプ | 件数 | 現在のschema | 評価 |
|---|---|---|---|
| ツール詳細（静的）| 26 | BreadcrumbList + SoftwareApplication | ✅ 良好 |
| ツール詳細（動的[slug]） | 0（全26件がSTATIC_OVERRIDESに含まれるため） | — | — |
| /tools/ リスト | 1 | ItemList | ✅ 良好 |
| 比較記事 | 11 | Article + BreadcrumbList + FAQPage | ✅ 良好 |
| カテゴリページ | 6 | FAQPage + BreadcrumbList（@graph） | ✅ 実装済み（2026-06-20） |
| ユースケースページ | 12 | FAQPage + BreadcrumbList（@graph） | ✅ 実装済み（2026-06-20） |
| ガイド記事 | 5 | 不明（要確認） | ⚠️ 要調査 |
| トップページ | 1 | FAQPage のみ | ⚠️ WebSite / Organization 未実装 |
| /tools/index.astro | 1 | ItemList | ✅ 良好 |

---

## 3. FAQ schema確認

### 3.1 実装パターン

| パターン | 使用箇所 | 安全性 |
|---|---|---|
| ToolFAQ.astro（コンポーネント） | ツール詳細ページ（faqs フィールドあり） | ✅ 表示と同一data使用・問題なし |
| GuideFAQ.astro（コンポーネント） | ガイド記事 | ✅ 表示と同一data使用・問題なし |
| BaseLayout jsonLd prop（インライン生成） | カテゴリ・ユースケース・比較 | ✅ ページ内ハードコード・同一内容 |
| HomeFaq.astro | トップページ | ⚠️ FAQ UIはあるがschemaはBaseLayout経由で別出力（一致確認済み） |

### 3.2 FAQ schema安全性チェック

- [x] FAQ本文がページ上に表示されている（全パターンで確認）
- [x] schema専用Q&Aは存在しない
- [x] ToolFAQ：`faqs` propsをそのまま表示とschema両方に使用 → 乖離不可
- [x] GuideFAQ：`items` propsをそのまま表示とschema両方に使用 → 乖離不可
- [x] `acceptedAnswer.text` にHTMLタグなし（テキスト直値）
- ✅ **商用利用断定チェック実施済み（2026-06-20）**：カテゴリ6件・ユースケース12件・比較記事・コンポーネント全件grep確認。修正必須の断定表現なし。詳細は §3.3 参照。

### 3.3 FAQ回答内断定表現チェック（2026-06-20実施）

**検索した禁止表現**
- 商用利用できます（文末断定）/ 著作権的に問題ありません / 安全です / 自由に使えます / 著作権的にクリア / 許可されています（回答断定形）

**確認範囲**
- `src/pages/categories/` 6ページ
- `src/pages/use-cases/` 12ページ
- `src/pages/comparisons/` 11ページ
- `src/components/` （ToolFAQ・GuideFAQ・CommercialUse・AdobeFireflyTool・CanvaAiTool・LeonardoAiTool 等）
- `src/content/tools/*.md` 全26件
- `src/content/guides/*.md` 全件

**修正必須（分類A）：なし**

全FAQ回答は以下のいずれかのヘッジ表現で適切に処理済み：
- 「とされています」（公式情報の引用形）
- 「できる場合があります」
- 「条件が異なります」「プランによる」
- 「最新情報は公式サイトをご確認ください」
- 「本記事は法的助言ではありません」

**問題なし（分類C）として確認した表現**
- 「商用利用できますか？」（FAQ質問文 q: フィールド）→ 全件で質問形式
- 「そのまま使える場合もありますが」（ad-banner/youtube-thumbnail） → 編集ワークフロー文脈で商用権利断定ではない
- 「商用利用が案内されています」「商用利用できるとされています」 → 公式情報引用形で断定なし

**FAQPage schema一致確認**
- カテゴリ6件・ユースケース12件：`faqJsonLd` の @graph 内 FAQPage は `faqs` 配列を直接 `.map()` で生成 → 表示とschemaの乖離不可能な構造
- コンポーネント（ToolFAQ/GuideFAQ）：props をそのまま表示とschema両方に使用 → 乖離不可
- hidden FAQ（schemaのみ）：存在しない

**残課題：なし**（今回全件確認完了）

---

## 4. SoftwareApplication schema 詳細確認

### 4.1 現在使用フィールド

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ツール名",
  "operatingSystem": "Web",
  "applicationCategory": "DesignApplication | MultimediaApplication",
  "description": "shortDescription（あれば）",
  "url": "officialUrl（あれば）"
}
```

### 4.2 フィールド評価

| フィールド | 現状 | 判断 |
|---|---|---|
| name | ✅ 実装 | OK |
| operatingSystem | ✅ "Web" 固定 | OK（Webサービスとして正確） |
| applicationCategory | ✅ video→MultimediaApplication / image→DesignApplication | OK |
| description | ✅ shortDescriptionから（任意） | OK |
| url | ✅ officialUrlから（任意） | OK |
| offers / price | ❌ 未実装 | **正しい判断** |
| aggregateRating | ❌ 未実装 | **正しい判断**（実レビュー機能なし） |
| review | ❌ 未実装 | **正しい判断** |

→ SoftwareApplication schema は現状で**適切な最小実装**。追加フィールドは不要。

---

## 5. 重複schema出力の確認

- **重複なし**（同一pageで同一@typeが複数 `<script>` タグに出ていない）
- ToolFAQ.astro は inline `<script>` 出力。BaseLayout jsonLd prop も使えば FAQPage が2重になる恐れがあるが、ツール詳細ページでは現状どちらか片方のみ使用されている
- 比較ページ：Article + FAQPage を1つの配列でBaseLayout jsonLd prop に渡す → 問題なし
- ツール詳細：BreadcrumbList + SoftwareApplication を1配列 → 問題なし

---

## 6. 現在未実装・追加候補schema

### 追加してよいschema（優先度付き）

| schema | 対象 | 優先度 | 注意点 |
|---|---|:---:|---|
| WebSite | トップページのみ | 高 | `url` と `name` のみ。SearchAction は任意。内部検索機能がなければ省略 |
| BreadcrumbList | ~~カテゴリページ6件~~（✅完了）・ユースケース12件 | 中 | カテゴリ6件は2026-06-20実装済み。ユースケース12件が残り候補 |
| Organization | トップページに独立スキーマ | 低 | 現在Article内のみにネスト。logo URL確認が前提 |

### 追加しない方がよいschema

| schema | 理由 |
|---|---|
| Product | ソフトウェアツールにProductは不適切。SoftwareApplicationで十分 |
| AggregateRating | 実レビュー機能なし → 追加禁止 |
| Review | 同上 |
| NewsArticle | 比較記事は報道記事ではなくArticleで適切 |
| Person | 著者が個人でなくOrganization → 現状で正確 |

---

## 7. 実装リスク

| リスク | 該当箇所 | 対処 |
|---|---|---|
| FAQ回答内に商用利用断定 | カテゴリ・ユースケースのFAQ（全件目視未実施） | 次回、FAQ回答テキストを全件確認 |
| ToolFAQ と BaseLayout 両方出力による FAQPage 二重化 | ツール詳細ページ（将来追加時） | 追加時に片方のみ使うルールを維持 |
| BreadcrumbList item URL の末尾スラッシュ不統一 | 比較・ツール詳細間 | 現状すべて末尾スラッシュあり（確認済み） |
| SoftwareApplication に offers を誤って追加 | 将来の実装者 | offers/price は公式情報confirmed以外は追加禁止 |

---

## 8. 次回の最小実装案

### Step 1（推奨・低リスク）
**トップページに WebSite schema 追加**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AIクリエイティブナビ",
  "url": "https://aicreative-db.com/"
}
```

- `src/pages/index.astro` の faqJsonLd を配列にして WebSite schema を追加
- リスク：ほぼなし

### Step 2（中優先）
**~~カテゴリページに BreadcrumbList 追加~~** ✅ 2026-06-20 完了

- カテゴリ6件（video-generation / image-generation / video-editing / avatar-video / design / voice-narration）
- FAQPage と BreadcrumbList を @graph 配列にまとめて出力
- FAQPage schema 既存維持・重複なし・build 79ページ PASS

**~~ユースケース12件に BreadcrumbList 追加~~** ✅ 2026-06-20 完了

- ユースケース12件（ad-banner / ai-image-use-case-comparison / anime-illustration / blog-eyecatch / ec-product-image / faceless-video / realistic-photo / shorts / sns-blog-eyecatch / sns-post-image / youtube / youtube-thumbnail）
- FAQPage と BreadcrumbList を @graph 配列にまとめて出力
- 2段階構造：ホーム → 各ユースケース（/use-cases/ indexは親URLとして架空リンクにならないよう省略）
- FAQPage schema 既存維持・重複なし・build 79ページ PASS

**次回候補：FAQ回答内の商用利用断定チェック**

- カテゴリ・ユースケース全18ページのFAQ回答テキストを全件目視確認
- schema上の誤断定リスク排除が目的

### Step 3（低優先）
**トップページに Organization schema 追加**

- logo URL（`/favicon.svg` または OGP画像）を確認してから実装
- WebSite と配列でまとめて出力可能

---

## 9. 実施済み修正

| 日付 | 内容 | ファイル |
|---|---|---|
| 2026-06-20 | WebSite schema をトップページへ最小追加（name + url のみ） | src/pages/index.astro |

**追加したschema**：
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AIクリエイティブナビ",
  "url": "https://aicreative-db.com/"
}
```

**未実装（方針）**：
- SearchAction：追加しない（内部検索機能なし）
- Organization：ロゴURL・運営者情報確認後の候補

**次回候補**：カテゴリ / ユースケースページへの BreadcrumbList 追加（18ページ）

---

## 10. build結果

- 実行日：2026-06-20
- 終了コード：0
- ページ数：**79ページ**
- WARN：なし
- 判定：**PASS**

---

## サマリー

| 項目 | 評価 |
|---|---|
| schema実装全体 | 良好（6 @type、主要ページ網羅） |
| SoftwareApplication | 適切な最小実装。offers/rating なし → 正しい |
| FAQPage | 表示とschemaが同一dataから生成 → 安全 |
| 重複schema | なし |
| 未実装で推奨 | WebSite（トップ）・BreadcrumbList（カテゴリ/UC） |
| 今回実装 | なし（監査のみ） |
