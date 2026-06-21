# ツール詳細ページ 6点サマリー 監査レポート

作成日: 2026-06-20

---

## 1. 既存構造の確認結果

### コンポーネント体系

| コンポーネント | 用途 | specsグリッド |
|---|---|---|
| `ToolDetailPage.astro` | 汎用詳細ページ（25ツール以上） | `repeat(5, 1fr)` 固定 |
| `AdobeFireflyTool.astro` | adobe-firefly 専用 | `repeat(5, 1fr)` 固定 |
| `ToolSummaryTable.astro` | 存在するが**どのページでも未使用** | — |
| `[slug].astro` | STATIC_OVERRIDES 以外の動的ルート | ToolDetailPage不使用（独自レイアウト）|

### 現状の specs 表示（5点）

ToolDetailPage.astro の `specs[]` プロップがHEROすぐ下の横並びバーに表示されている。

現在の5点：
1. 商用利用
2. 無料枠
3. 料金目安
4. 透かし
5. 日本語UI

`最終確認日` は HEROのメタ（`tdp-checked` スパン）に既に表示されている。  
`入力素材リスク` は `basicInfo` 以降に個別記述されているが、HEROのspecsには**未表示**。

---

## 2. 対象6ツールの項目充足状況

| slug | freePlan | pricingText/lowestPaidPlan | commercialUse | inputMaterialRisk | watermark | lastReviewed | verifiedAt |
|---|---|---|---|---|---|---|---|
| adobe-firefly | limited | 1,580円/月〜 | paid-only | 未定義 | limited | 2026-06-19 | 2026-06-19 |
| midjourney | false | $10/月〜 | limited | 未定義 | no | 2026-06-06 | 2026-06-08 |
| dalle | limited | ChatGPT Plus等 | ok | **medium** (usagePolicy有) | limited | 2026-06-15 | 2026-06-15 |
| stable-diffusion | true | ローカル無料/API別途 | limited | **high** (usagePolicy有) | limited | 2026-06-06 | 2026-06-08 |
| leonardo-ai | limited | $10/月〜 | limited | 未定義（limitationsに記述） | unknown | 2026-06-15 | 2026-06-15 |
| gemini-image-generation | true | Google AIプランによる | limited | 未定義 | yes | 2026-06-13 | 2026-06-13 |

### 表示できる項目（現状）

- freePlan → `freePlanBadge()` ロジック対応済み、specsに表示済み
- lowestPaidPlan / pricingText → specsの「料金目安」に表示済み
- commercialUse → specsの「商用利用」に表示済み
- watermark → specsの「透かし」に表示済み
- japaneseUi → specsの「日本語UI」に表示済み
- lastReviewed → HEROの`tdp-checked`に表示済み

### 追加できる項目（要実装）

- `inputMaterialRisk`：dalle・stable-diffusionはDB定義あり。その他は「要確認」で表示可能
- 6点目として全ツールに「入力素材」を追加することが安全に可能

### 要確認の項目

- `attribution / credit / 表記義務`：DBに専用フィールドなし。`commercialUseNote` や `watermarkCondition` に含まれる場合あり。専用項目追加はDB変更が必要→今回対象外
- `officialSourceUrl`：全6ツールで定義済み（表示はsources欄で対応）

---

## 3. 推奨実装案

| 案 | 判断 | 理由 |
|---|---|---|
| **案A：全ツール自動表示** | **採用** | 各ページのspecsに「入力素材」を手動追加するだけ。DB変更なし。崩れリスクが低い。 |
| 案B：代表6件のみ試験導入 | 不要 | 案Aが十分安全なため案Bは不要 |

### 実装方法（案A詳細）

1. `ToolDetailPage.astro` と `AdobeFireflyTool.astro` の `tdp-specgrid` を  
   `repeat(5, 1fr)` → `repeat(auto-fit, minmax(148px, 1fr))` に変更（6項目対応）

2. 対象6ページのspecsに6点目「入力素材」を追加：

| slug | 追加バッジ | 根拠 |
|---|---|---|
| adobe-firefly | `cond / 別途確認` | usagePolicy未定義。安全側で要確認 |
| midjourney | `cond / 別途確認` | usagePolicy未定義。安全側で要確認 |
| dalle | `cond / 注意あり` | inputMaterialRisk: "medium" |
| stable-diffusion | `na / 要注意` | inputMaterialRisk: "high" |
| leonardo-ai | `cond / 別途確認` | usagePolicy未定義。limitationsに記述 |
| gemini-image-generation | `cond / 別途確認` | usagePolicy未定義。安全側で要確認 |

3. 断定表現なし。安全性保証として扱わない。

---

## 4. 全体展開（26件）への可否

- 今回の変更（グリッドをauto-fit化）は全ページ共通コンポーネントへの変更なので、他ツール（runway, kling-ai等）のspecsは5項目のまま問題なく表示される
- 6点目「入力素材」は代表6件のspecsのみに追加（他ツールページは今回対象外）
- 全26件への展開は次回タスクとして設定可能

---

## 5. 次回の全体展開可否

- **可能**。グリッドのauto-fit化で6項目以上でも自動対応。
- 各ツールのDB（.mdファイル）に `usagePolicy.inputMaterialRisk` が定義されていれば自動表示、なければ「要確認」で対応できる。
- 全26件展開時は `[slug].astro` 動的ルートへの適用も検討。

---

## 6. inputMaterialRisk 表示ロジック（確定版）

2026-06-20 DB全件確認の結果、ラベルマッピングを確定した。

| DB値 | specs表示ラベル | Mark |
|---|---|---|
| `low` | 別途確認 | `cond` |
| `medium` | 注意あり | `cond` |
| `high` | 要注意 | `na` |
| `unknown` / undefined | 要公式確認 | `cond` |
| DB定義なし（haiper等 service_changed） | 表示なし（specs追加しない） | — |

> 未定義を `low`（別途確認）と同じ表示にしない。未確認情報は「要公式確認」で区別する。

---

## 7. 代表6ツール 再確認結果（2026-06-20）

| slug | DB inputMaterialRisk | specsラベル（修正後） |
|---|---|---|
| adobe-firefly | low | 別途確認 ✓ |
| midjourney | medium | 注意あり ✓ |
| dalle | medium | 注意あり ✓ |
| stable-diffusion | high | 要注意 ✓ |
| leonardo-ai | medium | 注意あり ✓ |
| gemini-image-generation | medium | 注意あり ✓ |

---

## 8. 全26ツール 6点サマリー対応状況

### 6点サマリー実装済み（25件）

2026-06-20 第2回展開にて残り19件を追加。合計25件で6点サマリー完了。

| slug | DB inputMaterialRisk | specsラベル | 備考 |
|---|---|---|---|
| adobe-firefly | low | 別途確認 | AdobeFireflyTool.astro使用 |
| midjourney | medium | 注意あり | |
| dalle | medium | 注意あり | |
| stable-diffusion | high | 要注意 | |
| leonardo-ai | medium | 注意あり | |
| gemini-image-generation | medium | 注意あり | |
| runway | medium | 注意あり | 2026-06-20追加 |
| kling-ai | medium | 注意あり | 2026-06-20追加 |
| luma-ai | medium | 注意あり | 2026-06-20追加 |
| pika | medium | 注意あり | 2026-06-20追加 |
| hailuo-ai | medium | 注意あり | 2026-06-20追加 |
| pixverse | medium | 注意あり | 2026-06-20追加 |
| vidu-ai | high | 要注意 | 2026-06-20追加 |
| invideo-ai | medium | 注意あり | 2026-06-20追加 |
| capcut-ai | medium | 注意あり | 2026-06-20追加 |
| ideogram | medium | 注意あり | 2026-06-20追加 |
| playground-ai | medium | 注意あり | 2026-06-20追加 |
| clipdrop | medium | 注意あり | 2026-06-20追加 |
| fotor-ai | medium | 注意あり | 2026-06-20追加 |
| seaart-ai | medium | 注意あり | 2026-06-20追加 |
| tensor-art | high | 要注意 | 2026-06-20追加 |
| nightcafe | medium | 注意あり | 2026-06-20追加 |
| dreamstudio | medium | 注意あり | 2026-06-20追加 |
| microsoft-designer | medium | 注意あり | 2026-06-20追加 |
| canva-ai-image-generator | medium | 注意あり | 2026-06-20追加 |

### 保留（1件）

| slug | 理由 |
|---|---|
| haiper | service_changed状態。DBにinputMaterialRisk定義なし。specsに「入力素材」を追加しない。現在の「要確認（旧FAQ情報あり）」表記を維持。 |

---

## 付記

- ToolSummaryTable.astroは未使用状態。今後の活用余地あり（カテゴリ一覧ページ等への組み込み）。
- labelDictionary.tsは存在しない（直接関数として各コンポーネント内で定義）。
- 全26件の一括展開は次回タスク。上記の「次回specsラベル」が確定版ラベルマッピング。
