# ロゴ素材利用管理

`public/logos/` に画像を配置する前に、このファイルで利用条件を確認してください。

**原則：** 公式ブランドアセット配布ページが確認でき、利用条件を満たせる場合のみ画像を配置する。条件が不明・許諾不要ではない場合は `ToolLogo.astro` のフォールバック表示（頭文字）を維持する。

---

## ステータス分類

| status | 意味 |
|---|---|
| `approved-source-found` | 公式配布元が確認でき、ガイドラインの範囲内で利用可と判断できる |
| `guideline-review-needed` | 公式ガイドラインが存在するが、利用条件を詳細確認してから判断が必要 |
| `permission-needed` | 明示的な許諾・特定ライセンスが必要と考えられる。原則フォールバック |
| `fallback-only` | 公式ブランドアセット配布ページが未確認。フォールバック表示を維持する |

---

## ロゴ利用状況一覧

| toolName | slug | logoFileName | officialLogoSource | usageStatus | notes | lastChecked |
|---|---|---|---|---|---|---|
| Midjourney | `midjourney` | `midjourney.svg` | https://www.midjourney.com/ | `fallback-only` | 明確な公式ブランドアセット配布ページが確認できるまで、ロゴは使用せずフォールバック表示。 | 2026-05-05 |
| Adobe Firefly | `adobe-firefly` | `adobe-firefly.svg` | https://www.adobe.com/legal/permissions/trademarks.html | `permission-needed` | Adobeの製品ロゴは特定ライセンスや許可がない場合は使用できない可能性が高い。原則フォールバック表示を推奨。 | 2026-05-05 |
| Stable Diffusion / Stability AI | `stable-diffusion` | `stable-diffusion.svg` | https://stability.ai/ | `fallback-only` | 明確な公式ブランドアセット配布ページが確認できるまで、ロゴは使用せずフォールバック表示。 | 2026-05-05 |
| DALL·E / OpenAI | `dalle` | `dalle.svg` | https://openai.com/brand/ | `guideline-review-needed` | OpenAIのロゴ利用条件に従う。DALL·E単体ロゴが公式に利用可能かは別途確認。許可範囲が不明な場合はフォールバック表示。 | 2026-05-05 |
| Canva AI画像生成 | `canva-ai-image-generator` | `canva-ai-image-generator.svg` | https://www.canva.dev/docs/connect/guidelines/brand/ | `permission-needed` | 外部コミュニケーションや自サイトのブランドのように見える使い方は避ける。許諾条件を満たせない場合はフォールバック表示。 | 2026-05-05 |
| Leonardo AI | `leonardo-ai` | `leonardo-ai.svg` | https://leonardo.ai/ | `fallback-only` | 明確な公式ブランドアセット配布ページが確認できるまで、ロゴは使用せずフォールバック表示。 | 2026-05-05 |
| Runway | `runway` | `runway.svg` | https://runwayml.com/brand-guidelines | `guideline-review-needed` | 公式ブランドガイドラインと利用条件を確認したうえで、許可範囲内で使用する。 | 2026-05-05 |
| Pika | `pika` | `pika.svg` | https://pika.art/ | `fallback-only` | 明確な公式ブランドアセット配布ページが確認できるまで、ロゴは使用せずフォールバック表示。 | 2026-05-05 |
| Kling AI | `kling-ai` | `kling-ai.svg` | https://kling.ai/ | `fallback-only` | 明確な公式ブランドアセット配布ページが確認できるまで、ロゴは使用せずフォールバック表示。 | 2026-05-05 |

---

## ツール別詳細

### Midjourney
- **usageStatus:** `fallback-only`
- **確認先:** https://www.midjourney.com/
- **判断根拠:** 公式ブランドアセット配布ページ・ブランドガイドラインが確認できていない。
- **対応:** 配布ページと利用条件が確認できるまで `ToolLogo.astro` フォールバック（頭文字 M）を維持する。

---

### Adobe Firefly
- **usageStatus:** `permission-needed`
- **確認先:** https://www.adobe.com/legal/permissions/trademarks.html
- **判断根拠:** Adobeの商標・製品ロゴは特定のライセンスや書面による許可がない場合、外部サイトでの使用が認められない可能性が高い。
- **対応:** 原則フォールバック（頭文字 A）を維持する。Adobeの許諾プロセスを経た場合のみ画像を配置する。

---

### Stable Diffusion / Stability AI
- **usageStatus:** `fallback-only`
- **確認先:** https://stability.ai/
- **判断根拠:** Stability AIの公式ブランドアセット配布ページが確認できていない。
- **対応:** 配布ページと利用条件が確認できるまでフォールバック（頭文字 S）を維持する。

---

### DALL·E / OpenAI
- **usageStatus:** `guideline-review-needed`
- **確認先:** https://openai.com/brand/
- **判断根拠:** OpenAI公式ブランドページが存在する。ただし、OpenAIロゴとDALL·E単体ロゴの利用可否・条件は個別に確認が必要。
- **対応:** ブランドページの利用条件を精査し、許可範囲内であることを確認してから配置する。条件が満たせない場合はフォールバック（頭文字 D）を維持する。

---

### Canva AI画像生成
- **usageStatus:** `permission-needed`
- **確認先:** https://www.canva.dev/docs/connect/guidelines/brand/
- **判断根拠:** Canvaのブランドガイドラインは外部コミュニケーションやパートナー向けに制限が設けられている。自サイトのブランドのように見える形での使用は禁止されている可能性がある。
- **対応:** 許諾条件を満たせない場合はフォールバック（頭文字 C）を維持する。

---

### Leonardo AI
- **usageStatus:** `fallback-only`
- **確認先:** https://leonardo.ai/
- **判断根拠:** 公式ブランドアセット配布ページが確認できていない。
- **対応:** 配布ページと利用条件が確認できるまでフォールバック（頭文字 L）を維持する。

---

### Runway
- **usageStatus:** `guideline-review-needed`
- **確認先:** https://runwayml.com/brand-guidelines
- **判断根拠:** Runwayは公式ブランドガイドライン・アセットページを公開している。利用条件の詳細確認が必要。
- **対応:** ブランドガイドラインを精査し、許可範囲内であることを確認してから配置する。確認完了後 `ToolLogo.astro` の `hasLogo` セットに `runway` を追加する。

---

### Pika
- **usageStatus:** `fallback-only`
- **確認先:** https://pika.art/
- **判断根拠:** 公式ブランドアセット配布ページが確認できていない。
- **対応:** 配布ページと利用条件が確認できるまでフォールバック（頭文字 P）を維持する。

---

### Kling AI
- **usageStatus:** `fallback-only`
- **確認先:** https://kling.ai/
- **判断根拠:** 公式ブランドアセット配布ページが確認できていない。
- **対応:** 配布ページと利用条件が確認できるまでフォールバック（頭文字 K）を維持する。

---

## ロゴを追加する手順

ロゴを `public/logos/` に配置してよいと判断した場合：

1. このファイルの `usageStatus` を `approved-source-found` に更新する
2. `notes` に利用条件の確認内容・確認日を追記する
3. `lastChecked` を更新する
4. `public/logos/{slug}.svg`（または `.png`）を配置する
5. `src/components/ToolLogo.astro` の `hasLogo` セットに slug を追加する
6. `npm run build` を実行して確認する

---

## 禁止事項

- 非公式アイコンサイト（Iconify・Font Awesome・Flaticon等）から取得したロゴを配置しない
- 公式ロゴに似せた自作SVGを作成しない
- 外部URL直リンクで画像を表示しない（必ず `public/logos/` に配置）
- `usageStatus` が `fallback-only` または `permission-needed` のままロゴを配置しない

---

_このファイルはロゴ素材の利用管理台帳です。ロゴを追加・変更するたびに更新してください。_
