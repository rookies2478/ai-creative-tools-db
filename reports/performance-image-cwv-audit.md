# パフォーマンス・画像容量・Core Web Vitals 監査レポート

実施日: 2026-06-21

---

## 画像容量サマリー

| 項目 | 件数 / 値 |
|---|---:|
| 画像総数（public/images/） | 22 |
| 1MB超 | 0（Phase 1 圧縮後） |
| 500KB超（1MB未満） | 1 |
| 300KB超（500KB未満） | 0 |
| 300KB以下 | 20 |
| ogp.png | 940KB（1ファイル別扱い） |

### 監査時点の300KB超画像詳細（Phase 1 前）

| ファイル | 容量（監査時） | 現在の容量 | 用途 | 分類 |
|---|---:|---:|---|---|
| stable-diffusion-tool-output-home-01.webp | 1,920KB | **136KB**（圧縮済み） | トップFVショーケース | Bスキーム（home-01） |
| adobe-firefly-tool-output-home-01.webp | 1,899KB | **175KB**（圧縮済み） | トップFVショーケース | Bスキーム（home-01） |
| leonardo-ai-tool-output-home-01.webp | 765KB | 765KB（見送り） | トップFVショーケース | Bスキーム（home-01） |
| ogp.png | 940KB | 940KB（見送り） | OGP画像 | 通常 |

> **分類注記**: `stable-diffusion-reference-visual-01.webp`（271KB）は 300KB 未満のため **300KB以下** に正しく分類。監査時の「300KB超（500KB未満）: 2」は誤りであり、正しくは 0。

---

## 重大問題

### FV画像に `loading="lazy"` → LCP 直撃（修正済み）

- **対象**: `HomeHeroAnimated.astro` gen-img（3枚）
- **問題**: ファーストビューにある 3 枚（最大1.9MB）に `loading="lazy"` が設定されており、ブラウザがこれらを遅延読み込み対象と判断、LCP スコアを悪化させる。
- **修正**: `loading="lazy"` → `loading="eager"` に変更。
- **CLS補足**: `.gen-card` に `aspect-ratio: 2/3` + `.gen-img` が `position:absolute; inset:0` のため CLS は抑制済み。width/height 属性は不要。

---

## width/height 不足

| ファイル | 場所 | 対応 |
|---|---|---|
| `categories/image-generation/index.astro:593` | `.cig-refvisual .img > img` | `width="1200" height="675"` 追加済み（容器に aspect-ratio:16/9 済みで CLS なし、補強） |
| `HomeHeroAnimated.astro:102` | gen-img | position:absolute で width/height 不要。対応不要。 |

---

## lazy loading 確認

| ファイル | 状況 | 判定 |
|---|---|---|
| HomeHeroAnimated gen-img | `loading="eager"` に修正済み | OK |
| GeneratedSampleImage.astro | `loading="lazy"` | OK（FV外） |
| SamePromptImageComparison.astro | `loading="lazy"` | OK（FV外） |
| AdobeFireflyTool.astro サンプル | `loading="lazy"` | OK |
| ToolDetailPage.astro サンプル | `loading="lazy"` | OK |
| image-generation refvisual | `loading="lazy"` | OK（FV外、ページ下部） |
| [slug].astro サンプル | `loading="lazy"` | OK |
| ToolLogo.astro | width/height あり | OK |

---

## CSS/JS 確認

| 項目 | 状況 | 判定 |
|---|---|---|
| global.css | 286行 / 8.4KB | 適正 |
| tool-detail.css | 487行 / 22KB | 適正 |
| tools-page.css | 281行 / 16.9KB | 適正 |
| `client:*` ディレクティブ | 使用なし（静的サイト） | OK |
| localStorage / お気に入り残骸 | 未検出 | OK |
| フィルターUI JS | tools-page内インラインのみ | OK |

---

## レイアウト安定性（コードレビュー観点）

| 確認項目 | 状況 | 判定 |
|---|---|---|
| HomeHeroAnimated FV | gen-card aspect-ratio:2/3 でスペース確保 | OK |
| HomeCriteriaStrip / HomePurposeCards | CSS grid/flex、モバイル対応あり | OK（目視不可のためコード確認） |
| /tools/ フィルターチップ | tools-page.css overflow-x:auto | OK |
| SamePromptImageComparison | width="640" height="360" + 640:360=16:9 | OK |
| AdSense 余白 | 明示的なads用スペースなし | 要確認（AdSense未実装） |

---

## Haiper 確認

| 項目 | 状況 |
|---|---|
| ページ存在 | `/tools/haiper/index.astro` あり |
| noindex | `noindex={true}` 設定済み |
| sitemap 除外 | `SITEMAP_EXCLUDED_PATHS` に `/tools/haiper/` あり |
| service_changed 表示 | 全スペックに「要確認」バッジ、リードに警告文あり |
| おすすめ感 | なし（現役推薦表示なし） |

→ 全項目維持確認済み。

---

## ogp.png について

- 容量: 940KB
- 用途: OGP 共通画像
- 問題: 大きいが画像圧縮は禁止範囲。報告のみ。

---

## 修正内容

| ファイル | 修正内容 |
|---|---|
| `src/components/HomeHeroAnimated.astro:102` | `loading="lazy"` → `loading="eager"`（FV画像3枚） |
| `src/pages/categories/image-generation/index.astro:593` | `width="1200" height="675" decoding="async"` 追加 |

---

## 見送り項目

| 項目 | 理由 |
|---|---|
| ogp.png の圧縮（940KB） | PNG level9で19%削減（763KB）にとどまり30%未満。見送り |
| leonardo-ai-tool-output-home-01.webp（765KB）圧縮 | JPEG源→WebP二重劣化リスク。q75で36%削減だが品質目視不可につき見送り |
| FV画像に fetchpriority="high" 追加 | loading="eager" 修正で十分。追加効果は限定的 |
| stable-diffusion-reference-visual-01.webp（271KB）圧縮 | 300KB未満・問題なし |

---

## 画像圧縮実施結果（2026-06-21）

### 発見事項

`.webp` 拡張子のファイルが実際には PNG / JPEG 形式で格納されていた。
実WebP形式への変換により劇的な容量削減を達成。

**今後の対応方針**: 画像追加時は拡張子だけでなく実ファイル形式（`file` コマンドまたは hex magic bytes）を確認すること。拡張子が `.webp` でも内部が PNG/JPEG の場合は WebP 変換で 90% 以上の削減が見込める。

| ファイル | 元形式 | 変換後 |
|---|---|---|
| stable-diffusion-tool-output-home-01.webp | PNG (1024×1024) | WebP q82 |
| adobe-firefly-tool-output-home-01.webp | PNG (1376×768) | WebP q82 |

### 容量比較

| ファイル | beforeKB | afterKB | reduction | 判断 |
|---|---:|---:|---:|---|
| stable-diffusion-tool-output-home-01.webp | 1,919 | 136 | -93% | 採用 |
| adobe-firefly-tool-output-home-01.webp | 1,898 | 175 | -91% | 採用 |
| leonardo-ai-tool-output-home-01.webp | 765 | — | — | 見送り |
| ogp.png | 940 | — | — | 見送り |

### 表示確認（コード・参照パス確認）

| ページ | 確認内容 | 結果 |
|---|---|---|
| `/` | HomeHeroAnimated FVショーケース3枚 | 参照パス変更なし・build PASS |
| `/categories/image-generation/` | refvisual参照なし | OK |
| `/comparisons/canva-ai-vs-adobe-firefly/` | adobe-firefly-tool-output-home-01.webp 参照なし | OK |
| `/tools/adobe-firefly/` | adobe-firefly-tool-output-01.webp（別ファイル）使用 | OK |

- A/Bスキーム（sampleType）変更：**なし**
- URL変更：**なし**（同一ファイル名上書き）
- DB構造変更：**なし**

---

## 次回対応候補

- ogp.png を WebP対応環境で 200KB 以下に最適化（OGP WebP非対応SNS要確認）
- leonardo-ai-tool-output-home-01.webp の実機目視確認後に圧縮判断
- `fetchpriority="high"` を FV の最初の gen-card 画像に付与（Astro テンプレートで index 条件分岐）
- pixverse / invideo-ai の japanesePrompt/UI 実テスト

---

## build 結果

| 項目 | 値 |
|---|---|
| build コマンド | `npm run build` |
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| 結果 | PASS |
