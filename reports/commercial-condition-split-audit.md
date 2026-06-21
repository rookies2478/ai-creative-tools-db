# 商用条件分解表示 監査レポート

作成日: 2026-06-20  
最終更新: 2026-06-20（Phase 2 inputMaterialRisk 試験導入）  
対象ツール数: 26  
目的: 「商用」1列表示を4軸に分解できるか、根拠が安全な範囲で判定する

---

## 1. 現在の表示構造

### ToolsListCard.astro
- `commercialUse` フィールド1本を参照し `commercialLabel()` で1ラベルに変換
- 表示ラベル: 案内あり / 有料プラン向け / 条件あり / 非対応 / 要公式確認
- filterフラグ `data-commercial` は `1`（案内あり）か `0` の2値のみ
- スマホ幅では `cond` スパンが横並びになり、列追加は縦積みになるため崩れリスクは低い

### ToolSummaryTable.astro
- 同様に `commercialUse` 1列
- `<table>` 形式のため横列追加はスマホで横スクロールが発生する

### CompareTablePreview.astro
- 軽量プレビュー表。列追加は慎重に判断が必要

---

## 2. 4軸の根拠棚卸し

### 軸1: 無料プランでの商用条件

専用フィールドなし。`commercialUse=paid-only` のツールは「無料プランでは制限あり（要確認）」と推定できる。  
それ以外は `commercialUse` と `freePlan` の組み合わせからの推定になるため**根拠として断定不可**。

表示可能な判定:
- `paid-only` → 「無料プランでは制限あり（要確認）」: 7件
- それ以外 → 「要公式確認」: 19件

**→ 独立した列として安全に表示するにはDBに `freePlanCommercial` フィールドが必要。今回は追加しない。**

### 軸2: 有料プランでの商用条件

`commercialUse` がほぼそのまま「有料プランでの条件」に近い。ただし `ok` / `limited` は有料/無料の区別を含まない。  
現在の `commercialUse` 分布:

| 値 | 件数 | ツール |
|---|---:|---|
| ok | 1 | dalle |
| paid-only | 7 | adobe-firefly, hailuo-ai, invideo-ai, kling-ai, luma-ai, pixverse, vidu-ai |
| limited | 15 | canva-ai, capcut-ai, dreamstudio, fotor-ai, gemini-image-generation, ideogram, leonardo-ai, microsoft-designer, midjourney, nightcafe, pika, playground-ai, runway, stable-diffusion, tensor-art |
| unknown | 3 | clipdrop, haiper, seaart-ai |
| no | 0 | — |

**→ 既存の `commercialUse` 列で表示可能。新列不要。**

### 軸3: 入力素材の注意 (inputMaterialRisk)

フィールド `inputMaterialRisk` が存在する。

| 値 | 件数 | ツール |
|---|---:|---|
| low | 1 | adobe-firefly |
| medium | 21 | canva-ai, capcut-ai, clipdrop, dalle, dreamstudio, fotor-ai, gemini-image-generation, hailuo-ai, ideogram, invideo-ai, kling-ai, leonardo-ai, luma-ai, microsoft-designer, midjourney, nightcafe, pika, pixverse, playground-ai, runway, seaart-ai |
| high | 3 | stable-diffusion, tensor-art, vidu-ai |
| 未設定 | 1 | haiper（service_changed・現在のサービス状態不確実のため未設定維持） |

全26件中25件に値が設定された。  
ただし `low/medium/high` はリスク段階であり、「商用可/不可」とは別軸。  
**→ 「入力素材の注意」補助ラベルとして表示可能。haiper（1件）のみ非表示継続。**

### 軸4: 透かし (watermark)

全26件に値が入っている。

| 値 | 件数 | ツール |
|---|---:|---|
| no（透かしなし） | 2 | midjourney, nightcafe |
| yes（透かしあり） | 2 | fotor-ai, gemini-image-generation |
| limited（プランによって異なる） | 12 | adobe-firefly, capcut-ai, dalle, hailuo-ai, invideo-ai, kling-ai, luma-ai, pika, pixverse, runway, stable-diffusion, vidu-ai |
| unknown（要確認） | 10 | canva-ai, clipdrop, dreamstudio, haiper, ideogram, leonardo-ai, microsoft-designer, playground-ai, seaart-ai, tensor-art |

**→ 既存フィールドで全件表示可能。現在 ToolsListCard でも表示済み。**

---

## 3. 4軸ごとの表示可否サマリー

| 軸 | フィールド | 表示可否 | 根拠が揃う件数 | 備考 |
|---|---|---|---:|---|
| 無料プランでの商用条件 | なし（要新設） | 今回は不可 | 7/26 | paid-only のみ推定可 |
| 有料プランでの商用条件 | commercialUse | 可（既存列） | 26/26 | 現在表示中 |
| 入力素材の注意 | inputMaterialRisk | 条件付き可 | 25/26 | 未設定1件（haiper）は「非表示」 |
| 透かし | watermark | 可（既存列） | 26/26 | 現在表示中 |

---

## 4. 推奨実装案

| 案 | 評価 | 理由 |
|---|---|---|
| **案A（補足列として「商用条件の確認ポイント」を追加）** | **推奨** | 既存列を壊さず、`inputMaterialRisk` を補助ラベルとして追加できる。スマホ崩れリスクが最小 |
| 案B（テーブルに4列追加） | 非推奨 | `freePlanCommercial` フィールド未整備。スマホでの横スクロール増大 |
| 案C（カード内に4軸ラベル展開） | 次候補 | ToolsListCard の `cond` スパン群に `inputMaterialRisk` を1件追加するだけで実現可能 |

---

## 5. 次回実装候補（案Aベース）

### フェーズ1（今回の結論: レポートのみ）
- UIは変更しない
- `inputMaterialRisk` 未設定の14ツールを公式調査で埋める

### フェーズ2（次回）
- ToolsListCard の `cond` スパンに `入力素材` 軸を追加（`inputMaterialRisk` 利用）
- 未設定は「要確認」ラベルで表示

### フェーズ3（要DB設計）
- `freePlanCommercial` / `paidPlanCommercial` フィールドをDBスキーマに追加
- 26ツール全件を公式確認したうえで入力
- ToolsListCard / ToolSummaryTable の「商用」列を2列に分解

---

## 6. 保留・要確認

| slug | 理由 |
|---|---|
| clipdrop | commercialUse=unknown・inputMaterialRisk未設定 |
| haiper | commercialUse=unknown・freePlan=false・inputMaterialRisk未設定 |
| seaart-ai | commercialUse=unknown・inputMaterialRisk未設定 |
| dalle | inputMaterialRisk=medium（2026-06-20更新済み） |
| dreamstudio | inputMaterialRisk=medium（2026-06-20更新済み） |
| fotor-ai | inputMaterialRisk=medium（2026-06-20更新済み） |
| gemini-image-generation | inputMaterialRisk=medium（2026-06-20更新済み） |
| capcut-ai | inputMaterialRisk未設定 |
| invideo-ai | inputMaterialRisk未設定 |
| microsoft-designer | inputMaterialRisk=medium（2026-06-20更新済み） |
| nightcafe | inputMaterialRisk未設定 |
| pixverse | inputMaterialRisk未設定 |
| playground-ai | inputMaterialRisk未設定 |
| tensor-art | inputMaterialRisk=high（2026-06-20更新済み） |

---

## 7. Pre-Publish Check

- [x] 商用利用を断定していない（「案内あり」「条件あり」「要確認」のみ使用）
- [x] unknown/要確認を推測で埋めていない
- [x] 既存URLを変更していない
- [x] ツール一覧スマホ崩れなし（UI変更なし）
- [x] 公式未確認項目を「公式案内あり」にしていない
- [x] 件数の矛盾なし（26件 = 1+7+15+3+0）

---

---

## Phase 2 実施記録（2026-06-20）

### 実施内容

`inputMaterialRisk` 補足ラベルを ToolsListCard に試験導入（案A：設定済みツールのみ表示）。

#### 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `src/data/labelDictionary.ts` | `InputMaterialRisk` 型・`INPUT_MATERIAL_LABELS`・`getInputMaterialLabel()` を追加 |
| `src/components/ToolsListCard.astro` | `inputMaterialLabel()` 関数・`imrLabel` 変数・`tool-imr` div を追加 |
| `src/styles/tools-page.css` | `.tool-imr`・`.imr-badge`・`.imr-low/.imr-med/.imr-high` スタイルを追加 |

#### ToolSummaryTable

変更なし。テーブル列追加はスマホ横スクロール増大のリスクがあるため今回は見送り。

#### ToolCard

変更なし。カードが既に4バッジ+料金+プラットフォームで詰まっているため今回は見送り。

### 表示ルール

| inputMaterialRisk | 表示ラベル | 表示対象 |
|---|---|---|
| low | 入力素材：別途確認 | adobe-firefly（1件） |
| medium | 入力素材：注意あり | canva-ai, dalle, dreamstudio, fotor-ai, gemini-image-generation, hailuo-ai, ideogram, kling-ai, leonardo-ai, luma-ai, microsoft-designer, midjourney, pika, runway（14件） |
| high | 入力素材：要注意 | stable-diffusion, tensor-art, vidu-ai（3件） |
| 未設定（8件） | **非表示**（案A） | 推測補完しない |

### Phase 3（2026-06-20）実施：優先6件の inputMaterialRisk 設定

| slug | inputMaterialRisk | 根拠URL |
|---|---|---|
| dalle | medium | https://openai.com/policies/usage-policies |
| gemini-image-generation | medium | https://policies.google.com/terms/generative-ai/use-policy |
| fotor-ai | medium | https://support.fotor.com/hc/en-us/articles/900006654446-Commercial-Use |
| microsoft-designer | medium | https://www.microsoft.com/servicesagreement |
| tensor-art | high | https://tensor.art/about/terms-of-service-new |
| dreamstudio | medium | https://stability.ai/acceptable-use-policy |

### Phase 4（2026-06-20）実施：残り8件の inputMaterialRisk 設定

| slug | inputMaterialRisk | 更新有無 | 根拠URL |
|---|---|---|---|
| capcut-ai | medium | ✅更新 | https://www.capcut.com/clause/terms-of-service |
| clipdrop | medium | ✅更新 | https://clipdrop.co/terms-visitor |
| haiper | — | 未設定維持 | service_changed・現在のサービス状態不確実 |
| invideo-ai | medium | ✅更新 | https://invideo.io/terms-and-conditions/ |
| nightcafe | medium | ✅更新 | https://help.nightcafe.studio/portal/en/kb/articles/does-the-license-allow-me-to-sell-my-creations-or-use-them-for-commercial-purposes |
| pixverse | medium | ✅更新 | https://pixverse.ai/en/terms-of-service |
| playground-ai | medium | ✅更新 | https://playground.com/terms |
| seaart-ai | medium | ✅更新 | SeaArt AI 利用規約（公式・2025年8月版） |

### 残る未設定

haiper（1件）のみ。service_changed 状態のため現在のサービス状態が不確実。

### Phase 3 候補（次回）

- 上記14件の `inputMaterialRisk` を公式調査で設定
- ToolCard への追加表示
- `freePlanCommercial` フィールド設計・全26件調査

---

---

## Phase 5（UI補助ラベル）実施記録（2026-06-21）

### 目的

ツール一覧カードで「商用条件・入力素材・表記/透かし」を判断しやすくする。  
列追加ではなく補助ラベル方式で最小実装。

### 実施内容

#### 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `src/data/labelDictionary.ts` | `CommercialBreakdownLabel`・`COMMERCIAL_BREAKDOWN_LABELS`・`AttributionLabel`・`getAttributionLabel()` を追加 |
| `src/components/ToolsListCard.astro` | 重複 `USAGE_POLICY_SUMMARIES` 削除→`COMMERCIAL_PLAN_SUMMARIES` import化、`getAttributionLabel()` 追加、`tool-imr` に attribution badge を追加 |
| `src/components/ToolSummaryTable.astro` | 商用行に補足テキスト「入力素材・第三者素材は別途確認」追加（B案） |
| `src/styles/tools-page.css` | `.tool-imr` に `flex/gap` 追加、`.attr-limited/.attr-unknown/.attr-note` スタイル追加 |

#### 追加表示ルール（ToolsListCard）

| watermark値 | attributionラベル |
|---|---|
| limited | 表記/透かし：プランによって異なる（amber） |
| unknown | 表記/透かし：要公式確認（slate light） |
| no | 表記条件：公式確認を推奨（slate） |
| yes | 非表示（cond グリッドで「透かしあり」表示済み） |

#### 変更しなかった内容

| 項目 | 理由 |
|---|---|
| ToolCard.astro | 既に4バッジ+料金+プラットフォームで詰まっている。スマホ崩れリスク |
| ToolSummaryTable 列追加 | スマホ横スクロール増大。B案（補足テキスト）で対応 |
| haiper の inputMaterialRisk | service_changed 状態・不確実のため未設定維持 |
| freePlanCommercial 新フィールド | 公式情報が揃っていない。断定リスクあり |

#### 表示確認（特記）

| ツール | 表示状態 |
|---|---|
| Adobe Firefly | 商用:有料プラン向け / 入力素材:別途確認 / 表記/透かし:プランによって異なる |
| Hailuo AI | 商用:有料プラン向け / 入力素材:注意あり / 表記/透かし:プランによって異なる |
| SeaArt AI | 商用:要公式確認 / 入力素材:注意あり / 表記/透かし:要公式確認 |
| PixVerse | 商用:有料プラン向け / 入力素材:注意あり / 表記/透かし:プランによって異なる |
| Haiper | 商用:要公式確認 / imrラベル:非表示 / 表記/透かし:要公式確認（service_changed表示維持） |
| DreamStudio | 商用:条件あり / 入力素材:注意あり / 表記/透かし:要公式確認 |
| stable-diffusion | 商用:条件あり / 入力素材:要注意 / 表記条件:プランによって異なる |

### Pre-Publish Check

- [x] 既存URL変更なし
- [x] noindex/draft/redirect変更なし
- [x] DB構造変更なし
- [x] 商用利用・著作権を断定していない
- [x] unknown を断定表示していない
- [x] スマホ表示崩れなし（flex-wrap採用）
- [x] haiper を現役おすすめに見せていない
- [x] build PASS（79ページ・WARN なし・終了コード0）

---

---

## Phase 1 最終確認（2026-06-21）

### 確認内容

- 対象ページ：/tools/（26ツール一覧）
- 修正ファイル：なし（表示確認のみ）
- レポート更新：本セクション追記のみ
- DB修正：なし
- URL変更：なし
- noindex/draft/redirect変更：なし

### 表示確認

| ページ / ツール | 結果 |
|---|---|
| /tools/ 26ツール表示 | ✅ 正常 |
| 補助ラベル表示 | ✅ 正常（imr/attribution） |
| カード崩れ | ✅ なし |

### 重点ツール確認

| ツール | 確認結果 |
|---|---|
| Adobe Firefly | 商用:有料プラン向け / 入力素材:別途確認 / 表記/透かし:プランによって異なる ✅ |
| Hailuo AI | 商用:有料プラン向け / 入力素材:注意あり / 表記/透かし:プランによって異なる ✅ |
| SeaArt AI | 商用:要公式確認 / 入力素材:注意あり / 表記/透かし:要公式確認 ✅ |
| PixVerse | 商用:有料プラン向け / 入力素材:注意あり / 表記/透かし:プランによって異なる ✅ |
| DreamStudio | 商用:条件あり / 入力素材:注意あり / 表記/透かし:要公式確認 ✅ |
| Haiper | 商用:要公式確認 / imrラベル:非表示（service_changed）/ 表記/透かし:要公式確認 ✅ |

### ラベル確認

| 確認項目 | 結果 |
|---|---|
| 「商用利用できます」等の断定表現 | ✅ なし |
| unknown/unconfirmed/partial の断定表示 | ✅ なし |
| 「要公式確認」「条件あり」等の推奨表現 | ✅ 使用 |
| Haiper を現役おすすめ扱いにしていない | ✅ 確認 |

### 採用方針の記録

- 列追加ではなく補助ラベル方式（案A）を採用
- ToolSummaryTable は列追加せず補足テキストに留めた
- ToolCard はスマホ崩れリスクのため見送り
- freePlanCommercial 新設は公式情報不足のため見送り
- Haiper の inputMaterialRisk は service_changed のため未設定維持
- 残課題：無料商用 / 有料商用の厳密分解は公式情報が揃ってから

### build結果

- build: PASS
- 終了コード: 0
- ページ数: 79
- WARN: なし

---

*本レポートは法的助言ではありません。商用利用条件は各ツールの公式利用規約をご確認ください。*
