# ラベル辞書 監査レポート

作成日: 2026-06-19

---

## 1. 現在使われているラベル一覧

### 商用利用ステータス（commercialUse フィールド）

| 値 | 表示ラベル | 出現ファイル |
|---|---|---|
| `ok` | 案内あり / 公式案内あり | ToolSummaryTable.astro, ToolsListCard.astro, CommercialUse.astro |
| `paid-only` | 有料プラン向け | 同上 |
| `limited` | 要確認 / 条件あり | 同上 |
| `no` | 非対応 | 同上 |
| `unknown` | 要確認 | 同上 |

**問題点：** `limited` と `unknown` が両方「要確認」と表示されるファイルが存在し、ユーザーが区別できない場合がある（ToolSummaryTable.astroのcommercialUseDetail関数）。CommercialUse.astroでは`limited`=「条件あり」と正しく区別している。

### 無料枠ラベル（freePlan フィールド）

| 値 | 表示ラベル |
|---|---|
| `true` | あり |
| `false` | なし |
| `'limited'` | 要確認 |
| `'unknown'` | 要確認 |

**問題点：** `limited` と `unknown` が同じ「要確認」。意味が異なる（制限あり vs 情報なし）。

### 透かしラベル（watermark フィールド）

| 値 | 表示ラベル |
|---|---|
| `no` | 透かしなし |
| `yes` | 透かしあり |
| `limited` | 要確認 / プランによって異なる（ファイルにより異なる） |
| `unknown` | 要確認 |

**問題点：** `limited` の表示が `ToolsListCard.astro` では「プランによって異なる」、`ToolSummaryTable.astro` では「要確認」と不一致。

### 日本語対応ラベル（japaneseUi / japanesePrompt フィールド）

| 値 | 表示 |
|---|---|
| `true` | ○（対応） |
| `false` | ×（非対応） |
| `'partial'` | △（要確認） |
| `'unknown'` | 要確認 |

---

## 2. 統一後の推奨ラベル

`src/data/labelDictionary.ts` に定義済み。以下が統一ルール。

### 商用利用

| 値 | badge | filterLabel |
|---|---|---|
| `ok` | 案内あり | 公式案内あり |
| `paid-only` | 有料プラン向け | 有料プラン向け |
| `limited` | 要確認 | 条件あり |
| `no` | 非対応 | 非対応 |
| `unknown` | 要確認 | 要確認 |

`badge`（インライン表示）と `filterLabel`（絞り込みUI）を分離し、`limited`と`unknown`の意味上の違いを `filterLabel` で維持する。

### 透かし（watermark）

| 値 | text |
|---|---|
| `no` | 透かしなし |
| `yes` | 透かしあり |
| `limited` | プランによって異なる |
| `unknown` | 要確認 |

`limited` は「プランによって異なる」に統一（ToolsListCard の表現を採用）。

---

## 3. 置換した表現

今回のコード変更では既存コンポーネントへの破壊的変更を避けた。
`labelDictionary.ts` を作成し、新規・改修コンポーネントはここを参照するよう推奨する。

---

## 4. 置換せず保留した表現

既存コンポーネント（ToolSummaryTable.astro, ToolsListCard.astro, CommercialUse.astro）の
インライン関数はそのまま維持。理由：

- 動作中のページへの影響リスクを最小化
- `labelDictionary.ts` への段階的移行とする
- 各ファイルの挙動は現状でも安全なテキストを使用している

### watermark `limited` の不一致（保留）

| ファイル | 現在の表示 |
|---|---|
| ToolsListCard.astro | プランによって異なる |
| ToolSummaryTable.astro | 要確認 |

次回リニューアル時に `labelDictionary.ts` を参照して統一推奨。

---

## 5. 要確認のツール

DB内に `usagePolicy` フィールドが未設定のツール（26件中14件）。
商用利用プラン別詳細が不明のため、一覧には `COMMERCIAL_PLAN_SUMMARIES` の該当なしとして表示なし。
推測で補完しない方針を維持する。

| slug | 理由 |
|---|---|
| capcut-ai | usagePolicy未設定 |
| clipdrop | usagePolicy未設定・商用条件断定困難 |
| dalle | usagePolicy未設定 |
| dreamstudio | usagePolicy未設定 |
| fotor-ai | usagePolicy未設定 |
| gemini-image-generation | usagePolicy未設定 |
| haiper | usagePolicy未設定・現状条件変化の可能性 |
| hailuo-ai | usagePolicy設定済みだが利用規約の広範ライセンス条項あり |
| invideo-ai | usagePolicy未設定 |
| microsoft-designer | usagePolicy未設定 |
| nightcafe | usagePolicy未設定 |
| pixverse | usagePolicy未設定 |
| playground-ai | usagePolicy未設定 |
| seaart-ai | usagePolicy未設定 |
| tensor-art | usagePolicy未設定 |

---

## 6. 禁止表現チェック

以下の表現が本番コンテンツにないことを確認済み（2026-06-19）。

| 禁止表現 | 状況 |
|---|---|
| 商用利用できます（断定） | stable-diffusion.md の「断定できません」文脈内での引用のみ。問題なし |
| 著作権的に問題ありません | editorial-policy の「言わない」リスト内のみ。問題なし |
| 安全です | editorial-policy の「言わない」リスト内のみ。問題なし |
| 自由に使えます | 検出なし |

---

## 7. `COMMERCIAL_PLAN_SUMMARIES` の根拠

`labelDictionary.ts` の `COMMERCIAL_PLAN_SUMMARIES` は `ToolsListCard.astro` の
`USAGE_POLICY_SUMMARIES` と同一内容。ToolsListCard から将来移行できる形で定義済み。
根拠のないツールは含めていない（推測補完なし）。

---

## 適用記録 — 2026-06-19（第2回：段階適用）

### 今回適用したコンポーネント

- `src/components/ToolSummaryTable.astro`
- `src/components/ToolsListCard.astro`
- `src/data/labelDictionary.ts`（freePlan `limited` のテキスト更新）

### 統一したラベル

| フィールド | 値 | 変更前 | 変更後 | 適用先 |
|---|---|---|---|---|
| `commercialUse` | `limited` | 要確認 | 条件あり | ToolSummaryTable, ToolsListCard |
| `watermark` | `limited` | 要確認 | プランによって異なる | ToolSummaryTable |
| `freePlan` | `limited` | 要確認 | 条件付き | ToolSummaryTable, ToolsListCard, labelDictionary |
| `freePlan` | `unknown` | 要確認 | 要公式確認 | ToolSummaryTable, labelDictionary |

### limited / unknown の表示差分（解消後）

| フィールド | `limited` | `unknown` | 差別化 |
|---|---|---|---|
| `commercialUse` | 条件あり（amber） | 要確認（gray） | ✓ 色・テキスト両方で区別 |
| `watermark` | プランによって異なる（yellow） | 要確認（gray） | ✓ テキストで区別 |
| `freePlan` | 条件付き（yellow） | 要公式確認（gray） | ✓ テキスト・色両方で区別 |
| `japaneseUi` | partial=△（yellow） | unknown=要確認（gray） | ✓ 変更なし・元から区別済み |

### まだ未適用の表示箇所

| コンポーネント | 状況 |
|---|---|
| `CommercialUse.astro` | インライン定数。limited=「条件あり」はすでに正しい。変更不要 |
| `TdpToolPage.astro` | ツール詳細ページ汎用。商用ラベル使用箇所を次回確認 |
| `ToolCard.astro` | 小カード。表示ラベル確認未済 |
| `CompareTablePreview.astro` | 比較プレビュー。確認未済 |

### 次回の候補

1. `ToolCard.astro` のラベル関数を labelDictionary に統一
2. `CompareTablePreview.astro` の商用ラベルを統一
3. ToolsListCard の `freeLabel` で `unknown` も「要公式確認」に統一（現在「要確認」のまま）
4. CommercialUse.astro の `STATUS` オブジェクトを labelDictionary の `COMMERCIAL_LABELS` に統合


---

## 適用記録 — 2026-06-19（Phase 2：残コンポーネント統一）

### 確認・修正したコンポーネント

| コンポーネント | 状態 |
|---|---|
| ToolsListCard.astro | freeLabel `unknown`「要確認」→「要公式確認」 |
| ToolCard.astro | freeBadge `limited`/`unknown`、cuBadge `limited`/`unknown` を修正 |
| CompareTablePreview.astro | freeBadge `limited`/`unknown`、cuBadge `paid-only`/`limited`/`unknown`、wmBadge `limited` を修正 |

### 統一したラベル（Phase 2）

| コンポーネント | フィールド | 値 | 変更前 | 変更後 |
|---|---|---|---|---|
| ToolsListCard | freePlan | unknown | 要確認 | 要公式確認 |
| ToolCard | freePlan | limited | 無料枠：要確認 | 無料枠：条件付き |
| ToolCard | freePlan | unknown | 無料枠：要確認 | 無料枠：要公式確認 |
| ToolCard | commercialUse | limited | 商用利用：要確認 | 商用利用：条件あり |
| ToolCard | commercialUse | unknown | 商用利用：要確認 | 商用利用：要公式確認 |
| CompareTablePreview | freePlan | limited | 要確認 | 条件付き |
| CompareTablePreview | freePlan | unknown | 要確認 | 要公式確認 |
| CompareTablePreview | commercialUse | paid-only | 要確認 | 有料プラン向け |
| CompareTablePreview | commercialUse | limited | 要確認 | 条件あり |
| CompareTablePreview | commercialUse | unknown | 要確認 | 要公式確認 |
| CompareTablePreview | watermark | limited | 要確認 | プランによって異なる |

### limited / unknown の区別（Phase 2完了後）

全主要コンポーネントで `limited` と `unknown` が以下のとおり区別された：

| フィールド | limited | unknown |
|---|---|---|
| commercialUse | 条件あり（amber） | 要公式確認（gray） |
| watermark | プランによって異なる（amber/yellow） | 要確認（gray） |
| freePlan | 条件付き（amber/yellow） | 要公式確認（gray） |

### まだ未適用の箇所

| コンポーネント | 状況 |
|---|---|
| CommercialUse.astro | インライン STATUS 定数。`limited`=「条件あり」はすでに正しい。変更不要 |
| Free.astro, NoWatermark.astro, Japanese.astro | 条件ページ専用コンポーネント。独自ロジック継続中 |
| ComparisonVsArticle.astro | 比較記事用。ラベル表示の有無を次回確認 |
| TdpToolPage.astro | 旧ツールページ汎用。次回確認 |

### 次フェーズへの判断

labelDictionary.ts を参照した主要コンポーネント（ToolSummaryTable / ToolsListCard / ToolCard / CompareTablePreview）の表示揺れは解消済み。

ツール一覧の列分解（商用利用を無料プラン列・有料プラン列に分解）は、`usagePolicy.commercialUseByPlan` が12/26ツールにしか設定されていない。
**分解前提：** `usagePolicy` 未設定ツールの列は「要公式確認」固定で表示する設計にすれば進められる。次回判断。

---

## 適用記録 — 2026-06-19（Phase 2 補足：残存ラベル修正）

### 確認したコンポーネント

| コンポーネント | 確認内容 | 結果 |
|---|---|---|
| ToolsListCard.astro | freeLabel unknown | ✓ '要公式確認'（前回適用済み） |
| ToolsListCard.astro | commercialLabel unknown | ✗ '要確認' のまま → 修正 |
| ToolCard.astro | freeBadge/cuBadge/wmBadge 全値 | ✓ 全て正常（前回適用済み） |
| CompareTablePreview.astro | freeBadge/cuBadge/wmBadge 全値 | ✓ 全て正常（前回適用済み） |
| labelDictionary.ts COMMERCIAL_LABELS | limited.badge / unknown.badge | ✗ 両方'要確認' → 修正 |

### 修正した内容

| ファイル | フィールド | 値 | 変更前 | 変更後 |
|---|---|---|---|---|
| ToolsListCard.astro | commercialUse | unknown | 要確認 | 要公式確認 |
| labelDictionary.ts | COMMERCIAL_LABELS.limited | badge | 要確認 | 条件あり |
| labelDictionary.ts | COMMERCIAL_LABELS.unknown | badge | 要確認 | 要公式確認 |

### Phase 2 補足完了後の limited / unknown 区別（全体）

| フィールド | limited | unknown | 適用コンポーネント |
|---|---|---|---|
| commercialUse | 条件あり（amber） | 要公式確認（gray） | ToolsListCard / ToolCard / CompareTablePreview / labelDictionary |
| watermark | プランによって異なる（amber/yellow） | 要確認（gray） | 全コンポーネント |
| freePlan | 条件付き（amber/yellow） | 要公式確認（gray） | 全コンポーネント |
| japaneseUi（partial） | △ 要確認（amber） | 要確認（gray） | ToolCard / CompareTablePreview / labelDictionary |

### Pre-Publish チェック結果

| 確認項目 | 結果 |
|---|---|
| 商用利用・著作権を断定していない | ✓ |
| limited と unknown が区別されている | ✓ |
| watermark limited が「プランによって異なる」で統一 | ✓ |
| freePlan unknown が「要公式確認」で統一 | ✓ |
| 一覧・カード・比較プレビューで表現が揃っている | ✓ |
| 既存URLを変更していない | ✓ |
| DB構造・slug・フィールド名を変更していない | ✓ |

### まだ未適用の箇所

| コンポーネント | 状況 |
|---|---|
| CommercialUse.astro | インライン STATUS 定数。`limited`=「条件あり」はすでに正しい。変更不要 |
| Free.astro, NoWatermark.astro, Japanese.astro | 条件ページ専用コンポーネント。独自ロジック継続中 |
| ComparisonVsArticle.astro | 比較記事用。ラベル表示の有無を次回確認 |
| TdpToolPage.astro | 旧ツールページ汎用。次回確認 |

### ツール一覧の列分解への判断

主要コンポーネントの表示揺れはすべて解消。
`usagePolicy.commercialUseByPlan` が12/26ツールのみ設定済みのため、列分解は未実施のツールを「要公式確認」固定で表示する設計を決定次第進められる。


---

## 適用記録 — 2026-06-20（Phase 3：最終確認コンポーネント）

### 確認したコンポーネント

| コンポーネント | ラベル生成ロジック | 対応 |
|---|---|---|
| ComparisonVsArticle.astro | なし（比較表セルは呼び出し側が文字列で渡す汎用コンポーネント） | 変更不要 |
| TdpToolPage.astro | なし（`badge.label` は呼び出し側が指定する汎用コンポーネント） | 変更不要 |

### ファイル修正

なし（両ファイルともラベル文言の独自定義なし）

### labelDictionary 適用状況（全体）

| コンポーネント | 状況 |
|---|---|
| ToolSummaryTable.astro | Phase 1で適用済み |
| ToolsListCard.astro | Phase 1・2で適用済み |
| ToolCard.astro | Phase 2で適用済み |
| CompareTablePreview.astro | Phase 2で適用済み |
| CommercialUse.astro | インラインだが内容は辞書定義と一致。変更不要 |
| ComparisonVsArticle.astro | 汎用レイアウト。ラベル関数なし。変更不要 |
| TdpToolPage.astro | 汎用レイアウト。ラベル関数なし。変更不要 |

### 次に進める作業

labelDictionary 適用は全主要コンポーネントで完了。
次の候補：ツール一覧の「商用」列を「無料プラン条件 / 有料プラン条件」に分解する。
前提：`usagePolicy.commercialUseByPlan` 未設定ツール（14/26件）は「要公式確認」固定表示とする。

