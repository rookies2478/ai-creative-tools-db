# 同一プロンプト比較 監査レポート

実施日: 2026-06-21

---

## 1. generatedImages.ts 棚卸し

総数: **22件**

| 分類 | 件数 |
|---|---:|
| Aスキーム（sampleType: "tool-output"） | 17 |
| Bスキーム（sampleType: "reference-visual"） | 5 |
| comparisonEligible: true | 14 |
| promptVersion: image-tool-benchmark-v1 | 17 |
| promptVersion: home-showcase-v1 | 3 |
| promptVersion: reference-visual-v1 | 5 |

---

## 2. Aスキーム画像一覧

### home-showcase-v1（comparisonEligible: false）

| toolSlug | file | promptVersion | comparisonEligible | pageSlug | 表示中ページ | 再利用候補 |
|---|---|---|---|---|---|---|
| adobe-firefly | adobe-firefly-tool-output-home-01.webp | home-showcase-v1 | false | home | トップページ | 不可 |
| leonardo-ai | leonardo-ai-tool-output-home-01.webp | home-showcase-v1 | false | home | トップページ | 不可 |
| stable-diffusion | stable-diffusion-tool-output-home-01.webp | home-showcase-v1 | false | home | トップページ | 不可 |

### image-tool-benchmark-v1（comparisonEligible: true）

| toolSlug | file | promptVersion | comparisonEligible | pageSlug | 表示中ページ | 再利用候補 | model状態 |
|---|---|---|---|---|---|---|---|
| adobe-firefly | adobe-firefly-tool-output-01.webp | image-tool-benchmark-v1 | true | adobe-firefly | /tools/adobe-firefly/ | ◎ | 確定 |
| leonardo-ai | leonardo-ai-tool-output-01.webp | image-tool-benchmark-v1 | true | leonardo-ai | /tools/leonardo-ai/ | ◎ | 確定 |
| stable-diffusion | stable-diffusion-tool-output-01.webp | image-tool-benchmark-v1 | true | stable-diffusion | /tools/stable-diffusion/ | ◎ | 確定 |
| canva-ai-image-generator | canva-ai-image-generator-tool-output-01.webp | image-tool-benchmark-v1 | true | canva-ai-image-generator | /tools/canva-ai-image-generator/ | ◎ | 確定 |
| fotor-ai | fotor-ai-tool-output-01.webp | image-tool-benchmark-v1 | true | fotor-ai | /tools/fotor-ai/ | ◎ | 確定 |
| gemini-image-generation | gemini-image-generation-tool-output-01.webp | image-tool-benchmark-v1 | true | gemini-image-generation | /tools/gemini-image-generation/ | ◎ | 確定 |
| dalle | dalle-tool-output-01.webp | image-tool-benchmark-v1 | true | dalle | /tools/dalle/ | ◎ | 確定 |
| dreamstudio | dreamstudio-tool-output-01.webp | image-tool-benchmark-v1 | true | dreamstudio | /tools/dreamstudio/ | ◎ | 確定 |
| ideogram | ideogram-tool-output-01.webp | image-tool-benchmark-v1 | true | ideogram | /tools/ideogram/ | ◎ | **要確認** |
| microsoft-designer | microsoft-designer-tool-output-01.webp | image-tool-benchmark-v1 | true | microsoft-designer | /tools/microsoft-designer/ | ◎ | 確定 |
| nightcafe | nightcafe-tool-output-01.webp | image-tool-benchmark-v1 | true | nightcafe | /tools/nightcafe/ | ◎ | **要確認** |
| playground-ai | playground-ai-tool-output-01.webp | image-tool-benchmark-v1 | true | playground-ai | /tools/playground-ai/ | ◎ | **要確認** |
| seaart-ai | seaart-ai-tool-output-01.webp | image-tool-benchmark-v1 | true | seaart-ai | /tools/seaart-ai/ | ◎ | **要確認** |
| tensor-art | tensor-art-tool-output-01.webp | image-tool-benchmark-v1 | true | tensor-art | /tools/tensor-art/ | ◎ | **要確認** |

---

## 3. Bスキーム画像一覧・安全確認

| file | pageSlug | provider | isSameToolAsPage | comparisonEligible | 安全確認 |
|---|---|---|---|---|---|
| stable-diffusion-reference-visual-01.webp | stable-diffusion | Hugging Face (FLUX.1-schnell) | false | false | ✅ |
| image-generation-reference-visual-01.webp | categories/image-generation | Hugging Face (FLUX.1-schnell) | false | false | ✅ |
| video-generation-reference-visual-01.webp | categories/video-generation | Hugging Face (FLUX.1-schnell) | false | false | ✅ |
| free-ai-image-tools-reference-visual-01.webp | guides/free-ai-image-tools | Hugging Face (FLUX.1-schnell) | false | false | ✅ |
| midjourney-reference-visual-01.webp | midjourney | Meta AI | false | false | ✅ |

### Bスキーム安全確認詳細

| 確認項目 | 結果 |
|---|---|
| 「AI生成サンプル（参考）」として caption 記載 | ✅ 全件OK |
| 特定ツールの実例のように見せていない | ✅ isSameToolAsPage: false 全件 |
| 比較記事の主比較材料になっていない | ✅ comparisonEligible: false 全件 |
| tool-output と混同されていない | ✅ sampleType: reference-visual 全件 |
| sourceToolSlug が不自然でない | ✅ B-scheme は undefined or 対象ツール外 |
| 実在人物・著名人・ブランド・ロゴを含まない | ✅ negativePrompt で全件除外済み |

**注意点**: `midjourney-reference-visual-01.webp` は provider が "Meta AI" で Midjourney 本体の出力ではない。B-scheme・isSameToolAsPage: false 設定は正しい。ただし model フィールドが "要確認" のまま。

---

## 4. 同一プロンプト比較に使える条件（定義）

### 使える条件
- sampleType: "tool-output"
- promptVersion: "image-tool-benchmark-v1"
- comparisonEligible: true
- sourceToolSlug が掲載ツールと一致
- prompt / negativePrompt が記録済み
- model / provider / modelUrl が記録済み（"要確認" 除く）
- generatedAt / reviewedAt が記録済み
- 実在人物・著名人・ブランド・ロゴを含まない

### 使わない条件
- sampleType: "reference-visual"
- comparisonEligible: false
- model: "要確認"（比較記事での使用は保留推奨）
- home-showcase-v1 画像
- Bスキーム・参考ビジュアル

---

## 5. 同一プロンプト比較候補ページ

### 比較記事

| 候補ページ | 優先度 | 使える画像 | 理由 |
|---|---|---|---|
| /comparisons/canva-ai-vs-adobe-firefly/ | **A** | canva-ai-image-generator ✓, adobe-firefly ✓ | 両ツールともimage-tool-benchmark-v1・comparisonEligible: true |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | **A** | adobe-firefly ✓, microsoft-designer ✓ | 両ツールともimage-tool-benchmark-v1・comparisonEligible: true |
| /comparisons/dalle-vs-midjourney/ | **B** | dalle ✓, midjourney=Bスキームのみ | midjourney のAスキーム画像なし・比較として片方のみ |
| /comparisons/midjourney-vs-adobe-firefly/ | **B** | adobe-firefly ✓, midjourney=Bスキームのみ | midjourney のAスキーム画像なし |
| /comparisons/stable-diffusion-vs-midjourney/ | **B** | stable-diffusion ✓, midjourney=Bスキームのみ | midjourney のAスキーム画像なし |
| /comparisons/midjourney-vs-leonardo-ai/ | **B** | leonardo-ai ✓, midjourney=Bスキームのみ | midjourney のAスキーム画像なし |

### カテゴリページ

| 候補ページ | 優先度 | 使える画像 | 理由 |
|---|---|---|---|
| /categories/image-generation/ | **B** | Bスキームのみ（image-generation-reference-visual-01） | 参考ビジュアルしかない・横展開は不可 |
| /categories/video-generation/ | **C** | Bスキームのみ | 動画ツールのAスキーム画像ゼロ |

### 個別ツールページ

| ツール | 優先度 | 状態 |
|---|---|---|
| /tools/adobe-firefly/ | 既実装 | Aスキーム表示済み |
| /tools/leonardo-ai/ | 既実装 | Aスキーム表示済み |
| /tools/stable-diffusion/ | 既実装 | Aスキーム表示済み |
| /tools/canva-ai-image-generator/ | 既実装 | Aスキーム表示済み |
| /tools/fotor-ai/ | 既実装 | Aスキーム表示済み |
| /tools/gemini-image-generation/ | 既実装 | Aスキーム表示済み |
| /tools/dalle/ | 既実装 | Aスキーム表示済み |
| /tools/dreamstudio/ | 既実装 | Aスキーム表示済み |
| /tools/ideogram/ | 既実装 | Aスキーム表示済み（model: 要確認） |
| /tools/microsoft-designer/ | 既実装 | Aスキーム表示済み |
| /tools/nightcafe/ | 既実装 | Aスキーム表示済み（model: 要確認） |
| /tools/playground-ai/ | 既実装 | Aスキーム表示済み（model: 要確認） |
| /tools/seaart-ai/ | 既実装 | Aスキーム表示済み（model: 要確認） |
| /tools/tensor-art/ | 既実装 | Aスキーム表示済み（model: 要確認） |
| /tools/midjourney/ | Bスキームのみ | Aスキーム画像なし |

---

## 6. 実装優先度分類

### A：すぐ実装候補
- /comparisons/canva-ai-vs-adobe-firefly/
- /comparisons/adobe-firefly-vs-microsoft-designer/

両比較記事とも：両ツールのAスキーム画像が揃っている・同一promptVersion・comparisonEligible: true・比較検索意図と合致。

### B：保留（追加Aスキーム画像作成後）
- /comparisons/dalle-vs-midjourney/（midjourney Aスキーム不足）
- /comparisons/midjourney-vs-adobe-firefly/（midjourney Aスキーム不足）
- /comparisons/stable-diffusion-vs-midjourney/（midjourney Aスキーム不足）
- /comparisons/midjourney-vs-leonardo-ai/（midjourney Aスキーム不足）
- /categories/image-generation/（複数ツール横断Aスキームセット未整備）

### C：実装しない（今回）
- /categories/video-generation/（動画ツールAスキーム画像ゼロ）
- /comparisons/runway-vs-pika/
- /comparisons/runway-vs-kling-ai/
- /comparisons/invideo-ai-vs-capcut-ai/

---

## 7. 不足しているAスキーム画像

| toolSlug | 必要理由 | 優先度 |
|---|---|---|
| midjourney | 比較記事4本（vs-adobe-firefly/vs-dalle/vs-stable-diffusion/vs-leonardo-ai）全滞留の原因 | **高** |
| runway | /comparisons/runway-vs-pika/・runway-vs-kling-ai/ に必要 | 中 |
| pika | /comparisons/runway-vs-pika/ に必要 | 中 |
| kling-ai | /comparisons/runway-vs-kling-ai/ に必要 | 中 |
| invideo-ai | /comparisons/invideo-ai-vs-capcut-ai/ に必要 | 中 |
| capcut-ai | /comparisons/invideo-ai-vs-capcut-ai/ に必要 | 中 |

### model: "要確認" のAスキーム画像（比較記事利用前に要解決）

| toolSlug | 影響 |
|---|---|
| ideogram | model未確定のまま比較記事に使うのは保留推奨 |
| nightcafe | 同上 |
| playground-ai | 同上 |
| seaart-ai | 同上 |
| tensor-art | 同上 |

---

## 8. Pre-Publish Check

| 確認項目 | 結果 |
|---|---|
| A/Bスキーム混同なし | ✅ |
| Bスキーム画像をツール実例にしていない | ✅ |
| 比較記事でBスキームを主比較材料にしていない | ✅ |
| 1枚の画像で性能を断定していない | ✅（caption・usageNoteで明記） |
| 既存URLを変更していない | ✅（今回は監査のみ） |
| 新規ページを作っていない | ✅（今回は監査のみ） |
| DB構造を大きく変更していない | ✅（今回は監査のみ） |

---

## 9. 実装済み（2026-06-21）

### A判定2記事への同一プロンプト比較ブロック実装

| 記事 | 実装状態 |
|---|---|
| /comparisons/canva-ai-vs-adobe-firefly/ | ✅ 実装済み |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | ✅ 実装済み |

**使用画像：**

| 記事 | toolSlug | sampleType | promptVersion | comparisonEligible |
|---|---|---|---|---|
| canva-ai-vs-adobe-firefly | canva-ai-image-generator | tool-output | image-tool-benchmark-v1 | true |
| canva-ai-vs-adobe-firefly | adobe-firefly | tool-output | image-tool-benchmark-v1 | true |
| adobe-firefly-vs-microsoft-designer | adobe-firefly | tool-output | image-tool-benchmark-v1 | true |
| adobe-firefly-vs-microsoft-designer | microsoft-designer | tool-output | image-tool-benchmark-v1 | true |

**確認事項：**
- Bスキーム画像使用なし ✅
- promptVersion が同一（image-tool-benchmark-v1） ✅
- comparisonEligible: true 全件 ✅
- ツール性能断定なし（免責文掲載） ✅
- 商用利用・著作権断定なし ✅
- 実在人物・著名人・ブランド・ロゴ含まず ✅
- 新規コンポーネント：SamePromptImageComparison.astro（1件） ✅
- 既存URL変更なし ✅
- build：79ページ PASS・WARN無し ✅

### 保留対象

| ページ | 理由 |
|---|---|
| /comparisons/dalle-vs-midjourney/ | midjourney AスキームDB未収録 |
| /comparisons/midjourney-vs-adobe-firefly/ | 同上 |
| /comparisons/stable-diffusion-vs-midjourney/ | 同上 |
| /comparisons/midjourney-vs-leonardo-ai/ | 同上 |

---

## 10. Phase 1 最終確認（2026-06-21）

### 表示確認

| ページ | 結果 |
|---|---|
| /comparisons/canva-ai-vs-adobe-firefly/ | ✅ 比較ブロック実装・Aスキーム2枚・PC/スマホ対応 |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | ✅ 比較ブロック実装・Aスキーム2枚・PC/スマホ対応 |

### 注意文・安全確認

| 確認項目 | 結果 |
|---|---|
| 同じプロンプト条件で作成した画像サンプルである旨の記載 | ✅ spic-lead に明記 |
| 画像は比較の参考材料である旨の記載 | ✅ 明記 |
| 1枚の結果だけでツール性能を断定しない旨の記載 | ✅ spic-lead・spic-footer-note 両方に明記 |
| 料金・商用利用条件はプランや用途によって異なる旨の記載 | ✅ spic-lead に明記 |
| 最新情報は公式サイト確認の旨の記載 | ✅ spic-lead・spic-footer-note に明記 |
| 断定表現なし（高性能・優れている・商用利用できます等） | ✅ コード内に該当なし |
| 「本記事は法的助言ではありません」記載 | ✅ spic-footer-note に明記 |
| Bスキーム画像使用なし | ✅ sampleType: tool-output のみ |
| promptVersion 同一 | ✅ image-tool-benchmark-v1 全件 |
| comparisonEligible: true 全件 | ✅ |
| スマホ表示対応（1カラム切り替え） | ✅ @media max-width:640px |
| 横スクロール・画像崩れなし | ✅ overflow:hidden / width:100% / height:auto |

### build確認

- build：PASS
- 終了コード：0
- ページ数：79
- WARN：なし

---

## 11. 次回実施候補

優先順：

1. **model: 要確認 5件の解決**（ideogram/nightcafe/playground-ai/seaart-ai/tensor-art）
2. **動画ツール6本のAスキーム生成**（runway/pika/kling-ai/invideo-ai/capcut-ai）

---

## 12. Midjourney 除外確定（2026-06-21）

### 方針

- Midjourneyは有料利用が必要で、管理者が実際に出力した `tool-output` 画像が存在しない
- 現時点でMidjourneyのAスキーム画像は作成しない
- 今後実際にMidjourneyで画像を作成した場合のみAスキーム化を再検討する

### 対象外確定記事

| 記事 | 理由 |
|---|---|
| /comparisons/dalle-vs-midjourney/ | midjourney Aスキーム画像なし・有料版未使用のため作成予定なし |
| /comparisons/midjourney-vs-adobe-firefly/ | 同上 |
| /comparisons/stable-diffusion-vs-midjourney/ | 同上 |
| /comparisons/midjourney-vs-leonardo-ai/ | 同上 |

### generatedImages.ts Midjourney画像確認

| 確認項目 | 結果 |
|---|---|
| sampleType | ✅ reference-visual（Bスキーム） |
| comparisonEligible | ✅ false |
| isSameToolAsPage | ✅ false |
| sourceToolSlug | ✅ undefined |
| caption | ✅「AI生成サンプル（参考）。Midjourneyの公式出力・代表結果・実例ではありません。」 |
| 比較記事に同一プロンプトブロック追加なし | ✅ 4記事とも未実装・追加しない |
| Bスキーム画像を主比較材料にしていない | ✅ |
| 画像でMidjourney性能を断定していない | ✅ |

**Midjourney画像はBスキーム・参考ビジュアルとしてのみ扱う。tool-output / Aスキーム / 公式出力 / 代表結果として扱わない。**
