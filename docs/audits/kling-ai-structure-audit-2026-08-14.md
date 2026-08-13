# Kling AI 構造監査（実装前）

- audit_date: 2026-08-14
- task_file: docs/tasks/active/2026-08-14-kling-ai-structure-audit.md
- production: NOT_DEPLOYED（本監査は構造確認のみ、実装なし）

## 1. ルート / STATIC_OVERRIDES

`src/pages/tools/[slug].astro` 12行目:
```
const STATIC_OVERRIDES = new Set([... 'kling-ai', ...]);
return tools.filter((entry) => !STATIC_OVERRIDES.has(entry.slug))...
```
`kling-ai` はSTATIC_OVERRIDESに含まれるため、`[slug].astro`の`getStaticPaths`が明示的にフィルタで除外している。よって `/tools/kling-ai/` は動的ルートでは生成されず、専用ルート `src/pages/tools/kling-ai/index.astro` が単独で該当パスを所有する（優先順位の競合ではなく、動的ルート側が最初から対象外）。stable-diffusionと同一パターン。

## 2. 回答（Q1〜Q20）

| # | 質問 | 回答 |
|---|---|---|
| 1 | /tools/kling-ai/を描画するルート | `src/pages/tools/kling-ai/index.astro`（専用ページ） |
| 2 | STATIC_OVERRIDES除外か | Yes（`[slug].astro`のgetStaticPathsが除外） |
| 3 | titleの制御元 | `index.astro` 63行目 `<BaseLayout title="...">` ハードコード |
| 4 | meta descriptionの制御元 | `index.astro` 64行目 `<BaseLayout description="...">` ハードコード |
| 5 | H1の制御元 | `index.astro` 85行目 `headingHtml` propハードコード |
| 6 | intro/leadの制御元 | `index.astro` 86行目 `lead` propハードコード |
| 7 | 料金の制御元 | `index.astro` 内`specs`/`basicInfo`/`quickTable`/`pricing` propの複数箇所にハードコード（`kling-ai.md`の`lowestPaidPlan`等は不使用） |
| 8 | 無料プラン情報の制御元 | 同上（`specs`/`basicInfo`/`quickTable`/`pricing`にハードコード）。`kling-ai.md`の`freePlanNote`は不使用 |
| 9 | 商用利用情報の制御元 | `index.astro`内`specs`/`basicInfo`/`commercial`/`checklist`/`faqs`にハードコード。`kling-ai.md`の`commercialUseNote`/`usagePolicy`は一部のみ使用（後述） |
| 10 | 日本語対応情報の制御元 | `index.astro`内`specs`/`basicInfo.lang`/`quickTable`/`language`にハードコード。`kling-ai.md`の`japaneseUi`/`japanesePrompt`は不使用（値は一致しているが独立記述） |
| 11 | FAQの制御元 | `index.astro` 263〜273行目 `faqs={[...]}` prop（9件）。`kling-ai.md`の`faqs:`（frontmatter、10件）は不使用・dead |
| 12 | CTAテキスト/URLの制御元 | `index.astro` 95〜96行目 `primaryCta`/`secondaryCta` propハードコード（`https://kling.ai`、`https://kling.ai/membership/membership-plan`） |
| 13 | サンプル画像/動画の制御元 | `src/data/generatedVideos.ts`（`pageSlug: 'kling-ai'`でフィルタ）→`index.astro` 12〜21行目で取得し`sampleVideo`/VideoObjectに使用。DBドリブン（唯一のDB連携箇所） |
| 14 | SoftwareApplication JSON-LDの制御元 | `index.astro` 33〜41行目 ハードコード（`kling-ai.md`不使用） |
| 15 | VideoObject JSON-LDの制御元 | `index.astro` 44〜57行目。`generatedVideos.ts`から取得した`klingAiSampleVideo`のファイルパス・poster完全一致を条件に生成（name/description一部は動的、uploadDate/duration/width/heightはハードコード） |
| 16 | 内部リンク/関連コンテンツの制御元 | `index.astro`内`relatedTools`（ハードコード3件）、`nextReads={buildNextReads('kling-ai')}`・`conditions`（`buildConditionTags('kling-ai')`）は`src/data/toolRelatedLinks.ts`のDBドリブン関数経由 |
| 17 | kling-ai.mdから来る値 | `japanBilling`（丸ごとprop）、`lastReviewed`/`nextReviewDue`/`verifiedAt`（fallback付き）、`usagePolicy`（prop、ただし`index.astro`内`usagePolicySdNote`等のoverrideなし＝そのまま渡すのみ） |
| 18 | ハードコード/他所でoverrideされる値 | title/meta/H1/lead/specs/basicInfo/quickTable/pricing/commercial/language/watermark/checklist/faqs/CTA/relatedTools/versusTable/selectTable/SoftwareApplication JSON-LD（すべて`index.astro`内ハードコード） |
| 19 | drift可能性のある重複事実あり | Yes（後述セクション参照） |
| 20 | dead/unrendered frontmatterあり | Yes（後述FAQ監査、および本文Markdown全体） |

## 3. ページコンテンツマップ

| セクション | 描画元 | 編集元 | DB連携 | リスク |
|---|---|---|---|---|
| title/meta | index.astro BaseLayout props | index.astro | No | 低（単一箇所） |
| H1 (headingHtml) | index.astro | index.astro | No | 低 |
| lead | index.astro | index.astro | No | 低 |
| specs（6項目バッジ） | index.astro | index.astro | No | 中（basicInfo/quickTableと重複） |
| basicInfo | index.astro | index.astro | No | 中（specs/quickTable/pricing/commercialと重複） |
| pricing（表） | index.astro | index.astro | No | 中（specs/basicInfo/quickTableと重複） |
| commercial（本文＋points） | index.astro | index.astro | No | 中（specs/basicInfo/faqs/checklistと重複） |
| 日本語対応 | index.astro（specs/basicInfo.lang/quickTable/language） | index.astro | No | 中（4箇所重複、kling-ai.mdの`japaneseUi`/`japanesePrompt`とも独立） |
| FAQ | index.astro `faqs[]` prop | index.astro | No | 高（kling-ai.mdに別FAQ10件が死んだデータとして存在、混同リスク） |
| CTA | index.astro primaryCta/secondaryCta | index.astro | No | 低 |
| sources | index.astro `sources[]` prop | index.astro | No | 低（kling-ai.mdの`sourceRefs`/`sources`も別途存在するが不使用） |
| サンプル動画/VideoObject | generatedVideos.ts → index.astro | 両方（データはts、生成ロジックはastro） | Yes | 低（唯一のDB連携、整合済み） |
| 関連リンク（nextReads/conditions） | toolRelatedLinks.ts → index.astro | 両方 | Yes | 低 |
| relatedTools（カード3件） | index.astro ハードコード | index.astro | No | 低〜中（他ツールページ変更時に手動同期漏れリスク） |
| BreadcrumbList/SoftwareApplication | index.astro | index.astro | No | 低 |
| freshness（lastChecked/nextCheck/verifiedDate） | kling-ai.md → index.astro（fallback付き） | kling-ai.md | Yes | 低 |
| usagePolicy | kling-ai.md → index.astro（そのままprop渡し） | kling-ai.md | Yes | 低（ただしToolDetailPage側での実際のレンダリング有無は本監査未確認） |

## 4. FAQ監査

- **ライブFAQ件数: 9件**（`index.astro` 263〜272行目 `faqs={[...]}`）。
- `kling-ai.md` frontmatterの`faqs:`（YAMLリスト、10件、`question`/`answer`形式）は**完全にdead data**。`index.astro`はこのフィールドを一切参照していない（`d?.faqs`のような参照なし）。
- `kling-ai.md`本文Markdown（`## Kling AIとは？`以下の全セクション）も同様に**dead**。`index.astro`は`entry.render()`や`<Content />`を使用しておらず、本文は一切ライブページに反映されない。stable-diffusion監査時と同一パターン。

## 5. SEO監査アラインメント（big-keyword-seo-priority-2026-08-13.mdより抜粋）

監査原文（該当セクション）:
> 具体的強化領域: FAQ新規追加（料格/商用利用/無料枠/安全性など、既に強い媒体が扱っているトピック）／japaneseUi実態の再検証と明記強化／料格・商用利用セクションの深掘り／内部リンク（動画生成カテゴリ・比較記事）。

| 推奨事項 | 対象ファイル | 対象フィールド | 実装リスク |
|---|---|---|---|
| FAQ新規追加 | src/pages/tools/kling-ai/index.astro | `faqs={[...]}` prop（263〜273行目） | 低。既存9件に追加するのみ、JSON-LD自動生成は`faqs[]`基準のため構造変化なし |
| japaneseUi実態の再検証・明記強化 | src/pages/tools/kling-ai/index.astro（表示文言） | `specs`/`basicInfo.lang`/`quickTable`/`language`の4箇所（すべて「部分対応」表記で統一済み） | 中。4箇所の重複表記を一貫して更新する必要があり、1箇所だけ変更すると内部矛盾が発生する。事実の再検証自体は別タスク（本タスクはSEO文言強化のみのスコープなら事実変更なしで表現を強化） |
| 料金・商用利用セクションの深掘り | src/pages/tools/kling-ai/index.astro | `pricing`（table/notes）、`commercial`（lead/points）、`commercialExtra`（未使用、stable-diffusionにはあるがkling-aiには現状なし） | 中。事実変更なしでの深掘りは可能だが、`specs`/`basicInfo`/`quickTable`との整合を保つ必要 |
| 内部リンク強化（動画生成カテゴリ・比較記事） | src/pages/tools/kling-ai/index.astro | `aboutMore`（既存: `/categories/video-generation/`）、`about[]`本文への追加リンク、`commercial.more`（既存: `/guides/commercial-use-copyright/`） | 低。既存ルートのみ追加（`/comparisons/runway-vs-kling-ai/`は既に`toolRelatedLinks.ts`経由でnextReadsに含まれている可能性が高いため重複リンク化に注意） |

title/meta強化の推奨は監査原文に明記なし（stable-diffusionと異なりkling-aiはPRIORITY_NOWの「主な改善領域」表に記載なし）だが、現行titleは「Kling AIの商用利用条件と無料枠｜有料プランと確認ポイント」で商用利用意図に偏っており、ビッグキーワード「Kling AI」の定義・情報意図（とは・料金・無料）をカバーしていない。stable-diffusion同様に混合意図への拡張余地がある（実装は次タスク）。

## 6. カニバリゼーション評価

- 検索: `src/pages/comparisons`配下で`kling`を含むのは`src/pages/comparisons/runway-vs-kling-ai/`の1件のみ。
- `/tools/kling-ai/`単体を対象とする競合ページ（「Kling AIとは」記事等）は存在しない。
- `runway-vs-kling-ai`比較記事は異なる検索意図（Runway対Kling AI比較）を扱っており、`/tools/kling-ai/`のブランド単体意図と重複しない。

**カニバリリスク: LOW**。`/tools/kling-ai/`はKling AI単体キーワードの正本ページとして問題なく機能する。新規スタンドアロン記事は不要。

## 7. 動画/実例監査

- サンプル動画: あり（`generatedVideos.ts`の`kling-ai-tool-video-output-01.mp4`、`pageSlug: 'kling-ai'`、`sampleType: 'tool-video-output'`、`isSameToolAsPage: true`）
- poster/thumbnail: あり（`kling-ai-tool-video-output-01-poster.webp`）
- VideoObject JSON-LD: あり（`index.astro` 44〜57行目、ファイルパス完全一致を条件に条件付き生成）
- generatedVideos.ts連携: あり（唯一のDB連携ポイント）
- duration/name/uploadDate: あり（duration: PT5S、uploadDate: 2026-06-24、name: "Kling AI実例動画｜Kling AI 2.0"）
- 既存比較/サンプルページ: `/comparisons/runway-vs-kling-ai/`のみ

**評価**: サンプル動画・VideoObjectは既に整備済みで、stable-diffusion（静止画のみ・VideoObjectなし）と異なり動画系の構造化データは既に強い状態。追加のSEO差別化余地は動画そのものの追加より、FAQ/title/meta/内部リンクのテキスト面の強化にある。

## 8. 構造化データ監査

- SoftwareApplication: name/operatingSystem/applicationCategory/description/url。price/rating/reviewフィールドなし（適切）。
- BreadcrumbList: 3階層、正常。
- FAQPage: `ToolDetailPage.astro`内で`faqs[]` propから自動生成と推定（stable-diffusionと同一コンポーネント、本監査ではToolDetailPage.astro内部のFAQPage生成ロジック行番号までは未読了だが、stable-diffusion完了タスクで確認済みの挙動と同一構造）。
- VideoObject: 条件付き生成（ファイルパス完全一致チェックあり、誤発行防止済み）。
- 重複スキーマ: なし。
- price/rating等の未検証フィールド追加: なし。

## 9. 重複事実によるdriftリスク（詳細）

商用利用・無料枠・透かし・日本語対応の4トピックが、`specs`・`basicInfo`・`quickTable`・`pricing`・`commercial`・`checklist`・`faqs`の最大7箇所に分散して独立にハードコードされている（stable-diffusionと同一の構造的パターン）。今回の監査では値の不一致は検出されなかったが、将来の部分編集で1箇所だけ更新すると内部矛盾が生じるリスクは高い。本監査はこれを記録するのみで、データアーキテクチャの変更は提案しない。

## Next Step

**実装可能。最小編集対象ファイルは`src/pages/tools/kling-ai/index.astro`の1ファイルのみ**（stable-diffusionと同一パターン）。`src/content/tools/kling-ai.md`は編集してもライブページに影響しないため、原則対象外とする（`usagePolicy`/`lastReviewed`等の限定フィールドのみ影響あり、今回のSEO強化スコープでは変更不要と想定）。次タスクでtitle/meta/FAQ/内部リンクの強化を実装する。
