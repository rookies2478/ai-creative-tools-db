# リリースノート（2026-06-21）

作成日：2026-06-21
対象ブランチ：master（未コミット変更）
build確認：79ページ / 終了コード0 / WARNなし

---

## 1. 今回の改善概要

### スマホUX改善（/tools/ フィルター・チップ）
`src/styles/tools-page.css` のスマホ向けメディアクエリ追加。
- フィルターチップ（`.filter-chips`）を横スクロール化（`overflow-x: auto`・スクロールバー非表示）
- フィルターチップのタップ領域確保（`min-height: 44px`）
- ツールバー内レイアウトをスマホで縦並び（`flex-direction: column`）
- `.tb-label`（フィルターラベル）をスマホで非表示
- `.tool-links a` のパディング調整

### 比較表スクロールヒント追加
`CompareTablePreview.astro` にスクロールヒントテキスト追加。
- `← 横にスクロールできます →`（`aria-hidden="true"`）
- スマホでのテーブル横スクロールの可視化

### 比較コンポーネント強化（ComparisonVsArticle）
- `QuickDecisionRow` インターフェース追加
- `quickDecisionRows` プロパティ追加（「先に結論テーブル」セクション）
- 比較記事で「どちらを選ぶか」の判断表を上部に掲載可能に

### 同一プロンプト比較 Phase 1（SamePromptImageComparison）
- `src/components/SamePromptImageComparison.astro` 新規追加
- 同一プロンプトで生成した画像を並べて比較するコンポーネント
- canva-ai-vs-adobe-firefly・adobe-firefly-vs-microsoft-designer で使用予定

### ToolsListCard 商用条件補助ラベル追加
- `inputMaterialLabel()` 関数追加（入力素材リスクラベル）
- `getAttributionLabel()` import・表示（表記/透かし補足）
- `imrLabel`・`attrLabel` を各ツールカードに表示
- `src/styles/tools-page.css` に `.imr-badge`・`.attr-*` スタイル追加

### ラベル表記の正確化（ToolCard / CompareTablePreview / ToolsListCard）
- `freePlan: 'limited'` → 「条件付き」表示を追加（各コンポーネント）
- `commercialUse: 'limited'` → 「条件あり」表示を追加
- `unknown` 系 → 「要公式確認」に統一（「要確認」との揺れ解消）
- `commercialUse: 'paid-only'` を CompareTablePreview でも正しく表示

### Haiper noindex・sitemap除外
- `/tools/haiper/` ページに `noindex={true}` 追加（サービス停止対応）
- `src/pages/sitemap.xml.ts` に `SITEMAP_EXCLUDED_PATHS` 追加（`/tools/haiper/` 除外）
- `src/content/tools/haiper.md` に `pricingStatus: service_changed` / `needsReview: no` 追加

### 画像容量最適化
以下2ファイルを最適化（容量削減）：
- `public/images/generated/tools/adobe-firefly-tool-output-home-01.webp`（約1.9MB → 約179KB）
- `public/images/generated/tools/stable-diffusion-tool-output-home-01.webp`（約1.9MB → 約135KB）

### コンポーネント共通化（labelDictionary.ts）
`src/data/labelDictionary.ts` 新規追加（または追記）。
- `getCategoryLabel` を ToolCard・ToolsListCard で import・使用（「画像・動画」→「画像・動画生成」揺れ解消）
- `getPlatformLabel` 追加・全3コンポーネントで使用（`Desktop/Local`→`デスクトップ/ローカル` 揺れ解消）
- `DISCLAIMER_NOTE` を CompareTablePreview・ToolSummaryTable で import（ハードコード除去）
- `COMMERCIAL_PLAN_SUMMARIES` を ToolsListCard で使用（ローカル辞書 `USAGE_POLICY_SUMMARIES` 削除）

### ツール詳細DB更新
以下ツールのコンテンツ更新（`src/content/tools/`）：
- `adobe-firefly.md`（料金・FreshnessLabel等）
- `hailuo-ai.md`（料金・機能記述）
- `pixverse.md` / `seaart-ai.md` / `tensor-art.md` / `nightcafe.md`（料金・機能記述）
- `vidu-ai.md`（料金・機能）
- その他20ツール（`verifiedAt` / `officialSourceUrl` / `FreshnessLabel` 等フィールド追加）

### ガイド・比較・カテゴリ・ユースケースページ大規模更新
- 全カテゴリページ（6件）：スマホUI・コンテンツ充実
- 全比較記事（9件）：quickDecisionRows・スクロールヒント・各種改善
- 全ユースケースページ（12件）：UI統一・内部リンク整理
- ガイド2件更新（commercial-use-cost-comparison / free-ai-image-tools / japanese-ai-image-tools）

### 運用レポート追加
`reports/` に以下を追加：
- `component-reuse-audit.md` / `.csv`
- `commercial-condition-split-audit.md` / `.csv`
- `internal-link-audit.md` / `.csv`
- `label-dictionary-audit.md`
- `mobile-filter-table-audit.md`
- `operation-checklist.md`
- `performance-image-cwv-audit.md` / `.csv`
- `post-deploy-check.md`
- `same-prompt-comparison-audit.md` / `.csv`
- `sitemap-build-diff-audit.md` / `.csv`
- `structured-data-schema-audit.md`
- `thin-duplicate-intent-audit.md` / `.csv`
- `tool-detail-summary-audit.md`
- `tool-pricing-*`（複数）

---

## 2. 技術的な変更点

### 変更された主要コンポーネント

| ファイル | 変更内容 |
|---|---|
| `src/components/ToolCard.astro` | getCategoryLabel・getPlatformLabel import、ラベル正確化 |
| `src/components/ToolsListCard.astro` | getPlatformLabel・COMMERCIAL_PLAN_SUMMARIES import、inputMaterialLabel追加、ラベル正確化 |
| `src/components/ToolSummaryTable.astro` | getPlatformLabel・DISCLAIMER_NOTE import、ローカル辞書削除 |
| `src/components/CompareTablePreview.astro` | DISCLAIMER_NOTE import、スクロールヒント追加、ラベル正確化 |
| `src/components/ComparisonVsArticle.astro` | QuickDecisionRow・quickDecisionRows 追加 |
| `src/components/AdobeFireflyTool.astro` | 料金・機能記述更新 |
| `src/components/HomeHeroAnimated.astro` | 軽微な修正 |
| `src/components/ToolDetailPage.astro` | 軽微な修正 |

### 新規追加コンポーネント

| ファイル | 内容 |
|---|---|
| `src/components/SamePromptImageComparison.astro` | 同一プロンプト比較コンポーネント（Phase 1） |
| `src/components/HomePurposeCards.astro` | ホーム用目的カード |

### 変更されたCSS

| ファイル | 変更内容 |
|---|---|
| `src/styles/tools-page.css` | スマホフィルターチップUX改善、inputMaterialRiskバッジスタイル追加 |

### 変更されたデータファイル

| ファイル | 変更内容 |
|---|---|
| `src/data/labelDictionary.ts` | 新規追加（getPlatformLabel / getCategoryLabel / COMMERCIAL_PLAN_SUMMARIES 等） |
| `src/pages/sitemap.xml.ts` | SITEMAP_EXCLUDED_PATHS 追加、haiper除外 |

### 変更された画像ファイル

| ファイル | 変更内容 |
|---|---|
| `public/images/generated/tools/adobe-firefly-tool-output-home-01.webp` | 容量最適化（約1.9MB → 約179KB） |
| `public/images/generated/tools/stable-diffusion-tool-output-home-01.webp` | 容量最適化（約1.9MB → 約135KB） |

### DB構造変更
なし（既存フィールドのみ更新・追加。スキーマ変更なし）

### URL変更
なし（既存URLは全て維持）

---

## 3. 本番反映前チェックリスト

| # | 確認項目 | 状態 |
|---|---|---|
| 1 | `npm run build` PASS | ✅ PASS |
| 2 | 終了コード0 | ✅ 0 |
| 3 | 79ページ生成 | ✅ 79ページ |
| 4 | WARNなし | ✅ なし |
| 5 | `/tools/` 表示確認（フィルターチップ・ラベル） | 要確認 |
| 6 | `/tools/haiper/` に `noindex, follow` が出力されているか | 要確認 |
| 7 | `/sitemap.xml` に合計77URL程度あるか（haiper除外後） | 要確認 |
| 8 | `/tools/haiper/` が `/sitemap.xml` に含まれていないか | 要確認 |
| 9 | Adobe Firefly料金表示が断定的でないか（「案内あり」「要確認」等） | 要確認 |
| 10 | Hailuo / SeaArt / PixVerse の料金・機能を断定していないか | 要確認 |
| 11 | 同一プロンプト比較2記事（canva-ai-vs-adobe-firefly・adobe-firefly-vs-microsoft-designer）が正常表示されるか | 要確認 |
| 12 | スマホ表示（フィルターチップが横スクロールできるか・タップ可能か） | 要確認 |
| 13 | 画像が正常表示されるか（最適化済みwebp） | 要確認 |

---

## 4. 反映後チェックリスト

本番（aicreative-db.com）で以下を確認する。

| # | URL | 確認内容 |
|---|---|---|
| 1 | `/` | トップページ正常表示・画像表示（最適化画像） |
| 2 | `/tools/` | フィルターチップ・スクロール・ラベル正常、スマホ縦スクロール確認 |
| 3 | `/categories/image-generation/` | カード表示・ラベル・リンク正常 |
| 4 | `/categories/video-generation/` | カード表示・ラベル・リンク正常 |
| 5 | `/comparisons/canva-ai-vs-adobe-firefly/` | 同一プロンプト比較・quickDecisionRows表示確認 |
| 6 | `/comparisons/adobe-firefly-vs-microsoft-designer/` | 同一プロンプト比較・quickDecisionRows表示確認 |
| 7 | `/comparisons/free-ai-image-generators/` | 比較表・スクロールヒント確認 |
| 8 | `/tools/adobe-firefly/` | FreshnessLabel・料金表示確認 |
| 9 | `/tools/haiper/` | `<meta name="robots" content="noindex, follow">` 確認 |
| 10 | `/sitemap.xml` | `/tools/haiper/` が含まれていないこと・全URL正常 |

---

## 5. 注意点・見送り事項

| 項目 | 理由・方針 |
|---|---|
| commercialUse / freePlan / watermark / japaneseUi の完全共通化 | CSS乖離（ring付き vs green-100 系）・スマホ表示確認が必要。次フェーズで実施 |
| OGP動的生成 | SNS運用開始前のため後回し |
| お気に入り機能 | 後回し |
| Programmatic SEO量産 | 行わない（薄いページ量産リスク回避） |
| MidjourneyのAスキーム画像作成 | 行わない（利用規約上のリスク） |
| Meta AI画像をMidjourneyのAスキーム扱い | 行わない（別サービスの混同を避ける） |
| ToolSummaryTable の getCategoryLabel 差し替え | 今回スコープ外（独自実装のまま・表示は正しい） |
| [slug].astro の getCategoryLabel 差し替え | 今回スコープ外 |

---

## 6. build結果

- build：PASS
- 終了コード：0
- ページ数：79ページ
- WARN：なし（git LF/CRLF警告はビルドに影響なし）
