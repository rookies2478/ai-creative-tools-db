# ツール詳細ページ CTA・関連導線監査

監査日：2026-06-22  
対象：src/pages/tools/ 全26件（専用index.astro・ToolDetailPage・AdobeFireflyTool等コンポーネント含む）  
方針：DB変更なし・URL変更なし・pricingStatus変更なし

---

## サマリー

| 項目 | 結果 |
|---|---|
| 公式サイトCTA | 全26件あり ✅ |
| 関連カテゴリ導線 | 全26件あり ✅ |
| 関連比較記事導線 | 全26件あり ✅ |
| 条件ページ導線 | 全26件あり ✅ |
| 外部リンク rel | 全件適切（rel="noopener noreferrer" または "sponsored nofollow noopener noreferrer"）✅ |
| Haiper noindex | ✅ |
| Haiper sitemap除外 | ✅ |
| Haiper 現役おすすめ誤認 | なし ✅ |
| 料金表示整合 | partial/unconfirmed は「要公式確認」統一 ✅ |
| 禁止表現（断定文） | 0件 ✅ |
| A/Bスキーム表示 | sampleType・isSameToolAsPage・caption 正常 ✅ |
| 修正実施 | なし（軽微ミスなし） |
| build | PASS（79ページ・終了コード0・WARNなし） |

---

## 確認詳細

### 1. 公式サイトCTA

全26件で以下のいずれかのCTAが設定されている。

- `primaryCta`（公式サイトで確認する）
- `affiliateUrl ?? officialUrl` による動的出力
- AdobeFireflyTool.astro 等専用コンポーネント内の公式リンク

rel設定：
- 通常リンク：`rel="noopener noreferrer"`
- アフィリエイトURL：`rel="sponsored nofollow noopener noreferrer"`

> `target="_blank"` は全件複数行記述。同一行に rel なしのリンクは検出されなかった。

---

### 2. 外部リンク rel 確認

| ファイル | 対象 | rel |
|---|---|---|
| [slug].astro（汎用ページ） | 公式サイトCTA | sponsored nofollow noopener noreferrer ✅ |
| [slug].astro（汎用ページ） | 公式情報ページCTA | noopener noreferrer ✅ |
| ToolDetailPage.astro | CTA / 料金確認リンク | sponsored nofollow noopener noreferrer ✅ |
| ToolCard.astro | 公式サイトリンク | noopener noreferrer ✅ |
| ToolSummaryTable.astro | 公式サイト確認リンク | sponsored nofollow noopener noreferrer ✅ |
| AdobeFireflyTool.astro 等専用コンポーネント | 公式リンク | noopener noreferrer ✅ |

**rel漏れ：0件**

---

### 3. 内部導線

| 導線種別 | 確認方法 | 結果 |
|---|---|---|
| カテゴリページ（/categories/）| 全26件ソース・コンポーネント確認 | 全件あり ✅ |
| 比較記事（/comparisons/）| 全26件ソース確認 | 全件あり ✅ |
| 条件ページ（/conditions/）| 全26件ソース確認 | 全件あり ✅ |
| ガイド（/guides/）| 専用コンポーネント・ToolDetailPage確認 | 全件あり ✅ |

> adobe-fireflyはAdobeFireflyTool.astroコンポーネントに導線を委譲。コンポーネント内に `/categories/image-generation/`・`/guides/commercial-use-copyright/`・`/conditions/no-watermark/` あり。

---

### 4. Haiper 確認

| 項目 | 確認箇所 | 結果 |
|---|---|---|
| noindex={true} | src/pages/tools/haiper/index.astro:38 | ✅ |
| BaseLayout が noindex=true 時に `<meta name="robots" content="noindex,follow">` 出力 | src/layouts/BaseLayout.astro:36 | ✅ |
| sitemap.xml.ts SITEMAP_EXCLUDED_PATHS に `/tools/haiper/` | src/pages/sitemap.xml.ts:62 | ✅ |
| 現役おすすめ誤認なし | ページ内に「現在のサービス提供状況は公式サイトでご確認ください」明記 | ✅ |
| 比較表での扱い | 「要確認」表記・現役推奨除外 | ✅ |

---

### 5. 料金表示整合

| pricingStatus | 対象slug | 表示方針 | 確認結果 |
|---|---|---|---|
| confirmed（10件） | adobe-firefly / hailuo-ai / dreamstudio / runway / midjourney / leonardo-ai / luma-ai / pika / canva-ai-image-generator / playground-ai | 確認済み金額を表示・「最新は公式確認を」注記 | ✅ |
| partial（7件） | dalle / gemini-image-generation / microsoft-designer / ideogram / nightcafe / clipdrop / fotor-ai | 「要公式確認」「公式ページ参照」統一 | ✅ |
| unconfirmed（3件） | pixverse / seaart-ai / vidu-ai | 断定金額表示なし | ✅ |
| no_fixed_price（1件） | capcut-ai | 固定月額表示なし・地域依存案内 | ✅ |
| service_changed（1件） | haiper | 現役料金として表示せず | ✅ |
| 未設定（4件） | invideo-ai / kling-ai / stable-diffusion / tensor-art | 断定金額なし（保留継続） | ✅ |

---

### 6. 禁止表現チェック

対象：src/pages/tools/ 全26ページ（専用コンポーネント含む）

| 表現 | 断定文検出 |
|---|---|
| 商用利用できます | 0件（stable-diffusion.mdは「断定できません」の否定文脈） |
| 著作権的に問題ありません | 0件 |
| 安全です | 0件 |
| 自由に使えます | 0件 |
| 著作権的にクリアです | 0件 |
| 問題ありません | 0件 |

---

### 7. 生成画像A/Bスキーム確認

| 項目 | 確認内容 | 結果 |
|---|---|---|
| sampleType 定義 | `'reference-visual'` / `'tool-output'` で明確に分類 | ✅ |
| isSameToolAsPage | ページのツールと一致する場合のみ true | ✅ |
| caption / usageNote | 「参考作例サンプル」「公式出力・代表結果を示すものではありません」明記 | ✅（58箇所） |
| home-showcase-v1 | comparisonEligible=false 固定。比較記事で単独利用しない | ✅ |
| reference-visual 型 | ページのツール出力として誤認させない別型管理 | ✅ |

---

### 8. 構造化データ確認

| スキーマ | 使用 | 不正スキーマ |
|---|---|---|
| SoftwareApplication | 使用 ✅ | aggregateRating なし ✅ |
| BreadcrumbList | 使用 ✅ | Review なし ✅ |
| FAQPage（一部） | 使用 ✅ | offers/price なし ✅ |

---

## 修正実施

**なし**（全件クリア・軽微ミス検出なし）

---

## build結果

| 項目 | 値 |
|---|---|
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| 実行日時 | 2026-06-22 |

---

## 残課題

| 項目 | 内容 | 優先度 |
|---|---|---|
| pricingStatus未設定4件 | invideo-ai / kling-ai / stable-diffusion / tensor-art。CTAは正常 | 低（保留継続） |
| unconfirmed 3件 | pixverse / seaart-ai / vidu-ai。CTAは正常 | 低（保留継続） |
| haiper noindex ブラウザ実描画確認 | ソース確認済み。実ブラウザでの `<meta name="robots">` レンダリングは次回確認 | 低 |

---

## 判定

**PASS** — 全26件の公式サイトCTA・カテゴリ/比較/条件導線・外部リンクrel・禁止表現・A/Bスキーム・Haiper除外・料金表示整合の全項目でクリア。修正なし。
