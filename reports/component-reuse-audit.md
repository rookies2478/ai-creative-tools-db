# コンポーネント再利用監査レポート

実施日：2026-06-21
最終更新：2026-06-21（getCategoryLabel・getPlatformLabel 共通化 実施済み）

## 対象コンポーネント

| コンポーネント | 主な使用箇所 | 役割 |
|---|---|---|
| ToolCard.astro | HomePickupFeed, RelatedTools | ホーム・関連ツール用デコレーティブカード |
| ToolsListCard.astro | /tools/index.astro | /tools/ 一覧・フィルター用カード（data-* 属性付き） |
| ToolSummaryTable.astro | 各ツール詳細ページ | 個別ツール詳細テーブル（全フィールド表示） |
| CompareTablePreview.astro | HomeComparisonTable | トップページ・ガイド内の簡易比較表 |
| SamePromptImageComparison.astro | adobe-firefly-vs-microsoft-designer, canva-ai-vs-adobe-firefly | Aスキーム同一プロンプト画像比較専用 |

---

## 1. 表示ロジック重複確認

### 1-1. freePlan ラベル

4コンポーネントで独立実装。テキスト揺れあり。

| コンポーネント | true | false | 'limited' | 'unknown' |
|---|---|---|---|---|
| ToolCard.astro | 無料枠あり | 無料枠なし | 無料枠：条件付き | 無料枠：要公式確認 |
| ToolsListCard.astro | あり | なし | 条件付き | 要公式確認 |
| ToolSummaryTable.astro | あり | なし | 条件付き | 要公式確認 |
| CompareTablePreview.astro | あり | なし | 条件付き | 要公式確認 |
| labelDictionary.ts (getFreePlanLabel) | あり | なし | 条件付き | 要公式確認 |

**問題**: ToolCard.astro のテキストが他3つと異なる（「無料枠あり」vs「あり」）。CSSクラスも ring-1 ring-inset 系 vs green-100 系で乖離。

### 1-2. commercialUse ラベル

| コンポーネント | 実装方式 |
|---|---|
| ToolCard.astro | cuBadge()：独自関数（ring-1 ring-inset 系CSS） |
| ToolsListCard.astro | commercialLabel()：独自関数（CSSクラスなし、テキストのみ） |
| ToolSummaryTable.astro | commercialUseDetail()：独自関数（badge + desc の構造体） |
| CompareTablePreview.astro | cuBadge()：独自関数（ring-1 ring-inset 系CSS） |
| labelDictionary.ts | COMMERCIAL_LABELS：全フィールド定義済み（未使用） |

**問題**: labelDictionary.ts に COMMERCIAL_LABELS が存在するが、どのコンポーネントも import していない。ToolSummaryTable の commercialUseDetail は構造・テキストが dictionary とほぼ同じ。

### 1-3. watermark ラベル

| コンポーネント | 実装 |
|---|---|
| ToolCard.astro | wmBadge() 独自 |
| ToolsListCard.astro | wmLabel() 独自 |
| ToolSummaryTable.astro | fourStateBadge() 独自 |
| CompareTablePreview.astro | wmBadge() 独自 |
| labelDictionary.ts | getWatermarkLabel() 定義済み（未使用） |

### 1-4. 日本語対応ラベル

| コンポーネント | 実装 |
|---|---|
| ToolCard.astro | jpBadge(ui, prompt) 独自 |
| ToolsListCard.astro | jaLabel(ui, prompt) 独自 |
| ToolSummaryTable.astro | triLabel(val) で ui/prompt を別セル表示 |
| CompareTablePreview.astro | jpBadge(ui, prompt) 独自 |
| labelDictionary.ts | getTriLabel() / getJapaneseFilterValue() 定義済み（未使用） |

### 1-5. categoryLabel

| コンポーネント | 'both' の表示 |
|---|---|
| ToolCard.astro | 「画像・動画」 ← **揺れ** |
| ToolsListCard.astro | 「画像・動画」 ← **揺れ** |
| ToolSummaryTable.astro | 「画像・動画生成」 |
| labelDictionary.ts (getCategoryLabel) | 「画像・動画生成」 |

### 1-6. platformLabels

| コンポーネント | desktop | local |
|---|---|---|
| ToolCard.astro | Desktop | Local |
| ToolsListCard.astro | Desktop | Local |
| ToolSummaryTable.astro | **デスクトップ** | **ローカル** |

**修正済み（2026-06-21）** → getPlatformLabel を labelDictionary.ts に追加し、3コンポーネントで統一（デスクトップ/ローカル/スマホ/ブラウザ 等の日本語表示に統一）。

### 1-7. DISCLAIMER_NOTE（免責テキスト）

CompareTablePreview.astro（L95）と ToolSummaryTable.astro（L294）に同一文字列がハードコード。
labelDictionary.ts に `DISCLAIMER_NOTE` として定義済みだが import されていない。

**今回修正済み** → 下記「修正内容」参照。

---

## 2. labelDictionary.ts 適用状況

### 使用中
| コンポーネント | import | 用途 |
|---|---|---|
| ToolsListCard.astro | COMMERCIAL_PLAN_SUMMARIES, getAttributionLabel | 商用条件サマリー・表記ラベル補足 |

### 未使用（定義だけある）
| エクスポート | 定義済み | 実際の使用 |
|---|---|---|
| getFreePlanLabel | ○ | × 4コンポーネントとも独自実装 |
| COMMERCIAL_LABELS | ○ | × ToolSummaryTable が独自に同等実装 |
| getWatermarkLabel | ○ | × 4コンポーネントとも独自実装 |
| getTriLabel | ○ | × ToolSummaryTable のみ同等実装（別名） |
| getCategoryLabel | ○ | **ToolCard・ToolsListCard：import 済み（2026-06-21実施）**。ToolSummaryTable・[slug].astro は独自実装のまま（今回スコープ外） |
| getPlatformLabel | ○（2026-06-21追加） | **ToolCard・ToolsListCard・ToolSummaryTable：全3コンポーネントで使用（2026-06-21実施）** |
| DISCLAIMER_NOTE | ○ | **今回差し替え済み（2コンポーネント）** |
| LEGAL_DISCLAIMER | ○ | × 未使用 |
| INPUT_MATERIAL_LABELS | ○ | × ToolsListCard が独自の inputMaterialLabel() を実装 |
| COMMERCIAL_BREAKDOWN_LABELS | ○ | × 未使用 |

---

## 3. 共通化候補

### A：すぐ共通化してよい

| 対象 | 内容 | 推奨対応 |
|---|---|---|
| DISCLAIMER_NOTE | 2コンポーネントに同一文字列ハードコード | **今回実施済み** |
| getCategoryLabel | ToolCard/ToolsListCard が「画像・動画」で揺れ | import 差し替え（1行変更） |

### B：慎重に共通化

| 対象 | 内容 | 理由 |
|---|---|---|
| freePlan/watermark/商用ラベル関数 | 4コンポーネントで独自実装 | CSSクラスが emerald-50（ring付き）vs green-100 で意図的に異なる可能性。スマホ表示確認要 |
| COMMERCIAL_LABELS → ToolSummaryTable | commercialUseDetail の badge/desc 構造が同等 | desc テキストに微差あり。統一前に diff 確認要 |
| INPUT_MATERIAL_LABELS | ToolsListCard が独自 inputMaterialLabel() | cls 名（imr-low 等）が labelDictionary の定義と対応。差し替え可能だが CSS クラス実態を確認してから |

### C：共通化しない

| 対象 | 理由 |
|---|---|
| SamePromptImageComparison | Aスキーム画像比較専用。他コンポーネントと構造が根本的に異なる。誤認リスクあり |
| ToolCard の freeBadge テキスト（「無料枠あり」系）| カード文脈で「無料枠あり」という文脈説明テキストが必要。「あり」への統一はUI的に情報量が落ちる |
| ToolsListCard の badgeMap | スラッグ固有のブランドカラー。汎用化する性質でない |

---

## 4. 修正内容

### 実施済み

| ファイル | 内容 |
|---|---|
| src/components/CompareTablePreview.astro | DISCLAIMER_NOTE を labelDictionary から import に差し替え |
| src/components/ToolSummaryTable.astro | DISCLAIMER_NOTE を labelDictionary から import に差し替え |
| src/components/ToolCard.astro | ローカル catLabel 関数を削除 → getCategoryLabel import に差し替え（「画像・動画」→「画像・動画生成」揺れ解消） |
| src/components/ToolsListCard.astro | ローカル catLabel 定義を削除 → getCategoryLabel import に差し替え（同上） |
| src/data/labelDictionary.ts | getPlatformLabel() 追加（desktop→デスクトップ / local→ローカル / mobile→スマホ / browser→ブラウザ 等） |
| src/components/ToolCard.astro | ローカル platformLabels 削除 → getPlatformLabel import に差し替え（Desktop→デスクトップ / Local→ローカル 揺れ解消） |
| src/components/ToolsListCard.astro | 同上（platformLabels 削除・getPlatformLabel 使用） |
| src/components/ToolSummaryTable.astro | ローカル platformLabels 削除 → getPlatformLabel import に差し替え（既に日本語だったが一元化） |

### 次回対応候補

| 優先度 | 内容 |
|---|---|
| ~~高~~ ~~getCategoryLabel import 差し替え~~ | **実施済み（2026-06-21）** |
| ~~高~~ ~~platformLabels 表記揺れ解消~~ | **実施済み（2026-06-21）** getPlatformLabel を labelDictionary.ts に追加・3コンポーネントで使用 |
| 中 | getFreePlanLabel / getWatermarkLabel を各コンポーネントへ適用（CSS統一が前提） |
| 中 | ToolSummaryTable の commercialUseDetail を COMMERCIAL_LABELS に差し替え（desc diff 確認後） |
| 低 | LEGAL_DISCLAIMER / COMMERCIAL_BREAKDOWN_LABELS の実際の使用先検討 |
| 見送り | commercialUse / freePlan / watermark / japaneseUi の大規模共通化（CSS乖離・スマホ表示確認が必要） |
| 見送り | SamePromptImageComparison の共通化（Aスキーム専用。誤認リスクあり） |

---

## 5. Pre-Publish Check

| 項目 | 結果 |
|---|---|
| URL変更 | なし |
| DB構造変更 | なし |
| noindex/draft/redirect変更 | なし |
| 商用利用・著作権の断定 | なし |
| Haiper表示 | 変更なし |
| labelDictionary安全表現 | 維持 |
| スマホ表示影響 | なし（文字列差し替えのみ） |
