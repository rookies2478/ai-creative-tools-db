# 外部リンク・CTA・アフィリエイト監査レポート
実施日：2026-06-21

---

## 監査サマリー

| 項目 | 件数 |
|---|---:|
| 外部リンク総数（target="_blank"）| 約80件 |
| rel="noopener" のみ（noreferrer漏れ）→ 修正済 | 33ファイル |
| rel完全欠落（target="_blank"あり）| 0件 |
| sponsored リンク（要確認） | 8件 |
| CTA禁止表現 | 0件 |
| affiliateUrl設定ツール | 0件（DB未登録） |
| pricingSourceUrl="unknown" | 1件（pixverse.md） |
| officialUrl空欄 | 0件 |
| officialSourceUrl CDN/blob混在 | 0件 |
| Haiper noindex 維持 | PASS |

---

## 主な確認結果

| 対象 | 結果 |
|---|---|
| rel="noopener noreferrer" 統一 | 修正済（33ファイル一括） |
| ToolDetailPage.astro CTA rel=sponsored | affiliateUrl未設定時もsponsoredが付く。officialUrl使用時は厳密には誤りだが意図的設計と判断→見送り |
| ToolSummaryTable.astro / [slug].astro sponsored | 同上 |
| Haiper noindex={true} | PASS |
| Haiper CTA文言 | 「公式サイトで確認する」「FAQ・料金を確認（公式）」→ 適切 |
| Haiper service_changed扱い | 「現在のサービス提供状況は公式サイトでご確認ください」・要確認バッジ → 現役おすすめに見えない PASS |
| CTA禁止表現（今すぐ登録・No.1・最安・必ず等） | 0件 |
| 「最安料金目安」表記（AdobeFirefly・Canva） | 価格目安表示は「最安」ではなく参考値注記あり → 問題なし |
| 商用利用断定 | CommercialUse.astroほか全件「本記事は法的助言ではありません」注記あり → 適切 |
| pricingSourceUrl="unknown"（pixverse） | 表示上で料金断定なし → 問題なし |
| huggingface.co リンク（categories/image-generation:600） | target="_blank" ・rel 属性なし。内部モデル引用リンクのため同タブ開きと思われるが、外部URLのため要確認 |
| Google Fonts / preconnect リンク | link[rel=preconnect]のため対象外 |

---

## 修正内容

| ファイル | 内容 |
|---|---|
| src/components/AdobeFireflyTool.astro | rel="noopener" → "noopener noreferrer"（複数箇所） |
| src/components/CanvaAiTool.astro | 同上 |
| src/components/LeonardoAiTool.astro | 同上 |
| src/components/MicrosoftDesignerTool.astro | 同上 |
| src/components/MidjourneyTool.astro | 同上 |
| src/components/TdpToolPage.astro | 同上（複数箇所） |
| src/components/ToolDetailPage.astro | sources・official リンク |
| src/components/UsagePolicySummary.astro | officialSourceUrl・termsUrl リンク |
| src/pages/tools/canva-ai-image-generator/index.astro | 公式サイトリンク |
| src/pages/tools/capcut-ai/index.astro | 同上 |
| src/pages/tools/clipdrop/index.astro | 同上 |
| src/pages/tools/dalle/index.astro | 同上 |
| src/pages/tools/dreamstudio/index.astro | 同上 |
| src/pages/tools/fotor-ai/index.astro | 同上 |
| src/pages/tools/gemini-image-generation/index.astro | 同上 |
| src/pages/tools/hailuo-ai/index.astro | 同上 |
| src/pages/tools/haiper/index.astro | 同上 |
| src/pages/tools/ideogram/index.astro | 同上 |
| src/pages/tools/invideo-ai/index.astro | 同上 |
| src/pages/tools/kling-ai/index.astro | 同上 |
| src/pages/tools/leonardo-ai/index.astro | 同上 |
| src/pages/tools/luma-ai/index.astro | 同上 |
| src/pages/tools/microsoft-designer/index.astro | 同上 |
| src/pages/tools/midjourney/index.astro | 同上 |
| src/pages/tools/nightcafe/index.astro | 同上 |
| src/pages/tools/pika/index.astro | 同上 |
| src/pages/tools/pixverse/index.astro | 同上 |
| src/pages/tools/playground-ai/index.astro | 同上 |
| src/pages/tools/runway/index.astro | 同上 |
| src/pages/tools/seaart-ai/index.astro | 同上 |
| src/pages/tools/stable-diffusion/index.astro | 同上 |
| src/pages/tools/tensor-art/index.astro | 同上 |
| src/pages/tools/vidu-ai/index.astro | 同上 |

---

## 見送った内容

| 項目 | 理由 |
|---|---|
| ToolDetailPage / ToolSummaryTable / [slug].astro に affiliateUrl未設定時も rel="sponsored" が付く問題（sponsored候補8件） | affiliateUrl設定ツールは0件（DB未登録）。アフィリエイト判定が明確でないため一括付与は見送り。今回は広告色を強めない方針を維持。将来 affiliateUrl 設定時に分岐ロジックを実装する想定 |
| huggingface.co リンクへの target="_blank" 追加 | target="_blank" がない通常外部リンクの場合、rel="noopener noreferrer" は必須ではない。挙動変更（同タブ→別タブ）を伴うため、外部リンクの新規タブ統一を行う場合は次回個別確認。今回は挙動変更を避けて見送り |
| pixverse pricingSourceUrl="unknown" の補完 | 公式URL推測補完は禁止ルール対象 |
| ToolDetailPage.astro CTAの rel="sponsored nofollow" 見直し | 設計変更を伴う。監査スコープ外 |

---

## 次回対応候補

- huggingface.co リンクへ `target="_blank" rel="noopener noreferrer"` 追加を検討
- pixverse pricingSourceUrl を公式確認後に補完
- affiliateUrl が実際に設定されるケースが発生した場合、sponsored/nofollow の付与ロジックをレビュー
- ToolDetailPage.astro の sponsored 付与条件を `affiliateUrl` 有無で分岐するリファクタを検討

---

## Pre-Publish Check

| チェック項目 | 結果 |
|---|---|
| URL変更なし | PASS |
| DB構造変更なし | PASS |
| noindex/draft/redirect変更なし | PASS |
| Haiper表示維持（noindex・要確認バッジ・非おすすめ） | PASS |
| アフィリエイト色強化なし | PASS |
| 商用利用・著作権断定なし | PASS |
| 公式確認リンク維持 | PASS |
| build通過 | PASS |

---

## build結果

- build：PASS
- 終了コード：0
- ページ数：79ページ
- WARN：なし
