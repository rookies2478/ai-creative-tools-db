# project-spec.md

> このファイルはMVP実装の基準仕様。勝手に逸脱禁止。

---

## 1. プロジェクト概要

- **サイト名**：AI画像生成・動画生成ツール比較DB
- **目的**：AI画像生成・動画生成ツールを比較できるDB型SEOメディアの構築
- **収益方針**：AdSense主軸
- **目標**：12〜15ヶ月で月10万円以上
- **初期方針**：AI画像生成ツール中心、動画生成ツールは主要ツールのみ
- **最終方針**：AIクリエイティブツール総合DBへ拡張

---

## 2. MVP範囲

- 初期ページ数：15ページ前後
- 初期ツール数：10件前後
- CMS：**なし**
- 外部DB：**なし**
- 検索機能：**なし**
- 口コミ機能：**なし**
- 会員機能：**なし**
- 自動スクレイピング：**なし**
- 出力：**静的HTML**

---

## 3. 技術スタック

- Astro
- TypeScript
- Tailwind CSS
- Astro Content Collections
- 静的HTML出力
- ConoHa WINGで静的公開

**禁止：必要性が明確でないnpmパッケージの追加**

---

## 4. 確定URL設計

> **この設計は確定。今後変更禁止。**

| URL | ページ内容 |
|---|---|
| `/` | トップページ |
| `/tools/` | AI画像生成・動画生成ツール一覧 |
| `/tools/[slug]/` | 各ツール詳細ページ |
| `/categories/free/` | 無料で使えるAI画像生成ツール |
| `/categories/commercial-use/` | 商用利用OKのAI画像生成ツール |
| `/categories/japanese/` | 日本語対応AI画像生成ツール |
| `/categories/no-watermark/` | 透かしなしAI画像生成ツール |
| `/guides/commercial-use-copyright/` | AI画像生成の商用利用・著作権ガイド |

### URL設計の禁止事項

- URL階層を変更しない
- `/tool/` のような単数形URLを作らない
- `/ai-tools/` など別の一覧URLを作らない
- `/category/` のような単数形カテゴリURLを作らない
- `/blog/` や `/articles/` を初期MVPに追加しない
- `/guides/commercial-use-copyright/` を別URLに変更しない
- カテゴリURLのslugを変更しない
- 実装都合でURLを増やさない

---

## 5. 初期ページ構成

### 固定ページ

| パス | ページ |
|---|---|
| `/` | トップページ |
| `/tools/` | ツール一覧 |
| `/categories/free/` | 無料カテゴリ |
| `/categories/commercial-use/` | 商用利用カテゴリ |
| `/categories/japanese/` | 日本語対応カテゴリ |
| `/categories/no-watermark/` | 透かしなしカテゴリ |
| `/guides/commercial-use-copyright/` | 商用利用・著作権ガイド |

### 動的ページ

| パス | 生成元 |
|---|---|
| `/tools/[slug]/` | Content Collections `tools` collection |

---

## 6. 初期ツール候補

優先10件前後：

1. Midjourney
2. Adobe Firefly
3. Stable Diffusion
4. DALL·E
5. Canva AI画像生成
6. Leonardo AI
7. Runway
8. Pika
9. Kling AI
10. （必要に応じて画像生成ツール1件追加）

**方針：ツール数より「正確な公式情報・lastReviewed・免責文」を優先。無理に増やさない。**

---

## 7. Content Collections設計

`src/content/tools/` 以下に `.md` または `.mdx` で管理。

```ts
// tools collection schema
{
  name: string;
  slug: string;
  category: "image" | "video" | "both";
  officialUrl: string;
  freePlan: boolean | "limited" | "unknown";
  lowestPaidPlan?: string;
  currency?: "JPY" | "USD" | "EUR" | "unknown";
  commercialUse: "yes" | "no" | "limited" | "unknown";
  commercialUseNote: string;
  japaneseUi: boolean | "partial" | "unknown";
  japanesePrompt: boolean | "partial" | "unknown";
  watermark: "yes" | "no" | "limited" | "unknown";
  bestFor: string[];
  strengths: string[];
  weaknesses: string[];
  lastReviewed: string;       // ISO 8601 (例: "2026-05-04")
  nextReviewDue: string;      // ISO 8601
  sources: {
    title: string;
    url: string;
  }[];
}
```
