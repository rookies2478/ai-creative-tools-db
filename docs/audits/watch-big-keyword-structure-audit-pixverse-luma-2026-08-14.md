# WATCH Big-Keyword Structure Audit — PixVerse / Luma AI

- audit_date: 2026-08-14
- task_file: docs/tasks/active/2026-08-14-watch-big-keyword-structure-audit-pixverse-luma.md
- production: NOT_DEPLOYED（本監査は構造確定のみ、実装なし）
- 参照: docs/audits/big-keyword-seo-priority-2026-08-13.md（WATCH判定根拠）、docs/audits/hailuo-ai-structure-audit-2026-08-14.md・kling-ai-structure-audit-2026-08-14.md（同型監査の先行事例）

## Executive Summary

PixVerse・Luma AIとも`src/pages/tools/[slug].astro`のSTATIC_OVERRIDESに含まれ、`src/pages/tools/pixverse/index.astro`・`src/pages/tools/luma-ai/index.astro`が`ToolDetailPage.astro`を経由する専用ルートとして単独描画される（kling-ai/hailuo-ai/stable-diffusionと同一パターン）。両ページとも title/meta/H1/lead/FAQ/basicInfo/pricing/commercial/CTAはastroファイル内ハードコードで、`src/content/tools/*.md`のfaqs・本文Markdownは完全にdead data（Content未使用）。

**ライブFAQ数**: PixVerse 10件、Luma AI 9件（いずれもastro内ハードコード配列。big-keyword-seo-priority-2026-08-13.mdの「FAQ 0件」記載はhailuo-ai/kling-ai同様、`.md`本文見出し数のみを数えた誤りであり、本監査で訂正する）。

**両者の最大の構造差**:
1. **VideoObject JSON-LD**: PixVerseは実装済み（file/poster完全一致ガード付き）。**Luma AIは未実装**（サンプル動画自体はgeneratedVideos.ts経由で表示されるが、JSON-LD化されていない）。同一条件（isSameToolAsPage: true）のサンプル動画を持ちながら構造化データ化に差があり、次フェーズの明確な実装候補。
2. **nextReads/conditions**: PixVerseは全ハードコード（nextReads 9件・conditions 5件）。Luma AIは`toolRelatedLinks.ts`の`buildNextReads`/`buildConditionTags`経由のDBドリブン（nextReads 2件のみ・比較記事0件のためcategoryTagで代替）。Luma AIの内部リンクはPixVerseより明確に薄い。
3. **usagePolicy**: `.md`のusagePolicyフィールドは両ツールに存在するが、astroへの受け渡しはLuma AIのみ（`usagePolicy={d?.usagePolicy}`）。PixVerseは`.md`にusagePolicyがあるのに astro側でprop未指定のため**PixVerseのusagePolicyセクションはページに一切描画されない**（dead field）。

カニバリリスクは両ツールともLOW（専用の比較記事・独立記事なし）。

---

## PixVerse

### Route

- URL: `/tools/pixverse/`
- 描画元: `src/pages/tools/pixverse/index.astro`（専用静的ルート）
- `[slug].astro`のSTATIC_OVERRIDES（`src/pages/tools/[slug].astro:12`）に`'pixverse'`が含まれるため、`[slug].astro`の動的ルートからは除外される。dynamic route非対象、dedicated static routeとして単独ビルドされる。
- `getStaticPaths`は影響しない（STATIC_OVERRIDES対象は`tools.filter(entry => !STATIC_OVERRIDES.has(entry.slug))`で最初から除外されるため、`[slug].astro`側は`pixverse`用パスを生成しない）。

### Content Sources

| Section | Render source | Edit source | Shared? | Risk |
|---|---|---|---|---|
| title/meta | `src/pages/tools/pixverse/index.astro`（BaseLayout title/description props） | 同ファイル内ハードコード | No | Low |
| H1 (headingHtml) | 同ファイル`headingHtml` prop | 同ファイル | No | Low |
| lead | 同ファイル`lead` prop | 同ファイル | No | Low |
| specs（ヒーロー下チップ） | 同ファイル`specs` prop | 同ファイル | No | Low |
| basicInfo | 同ファイル`basicInfo` prop | 同ファイル | No | Low |
| pricing | 同ファイル`pricing` prop（table hardcode） | 同ファイル | No | Medium（`.md`のpricingModel/pricingStatusと重複記述） |
| commercial use | 同ファイル`commercial` prop | 同ファイル | No | Medium（`.md`のcommercialUseNoteと重複） |
| Japanese support | 同ファイル`language` prop・`specs`内`日本語UI`バッジ | 同ファイル | No | Medium（`.md`のjapaneseUi/japanesePromptと重複） |
| FAQ | 同ファイル`faqs` prop（10件ハードコード） | 同ファイル | No | High（`.md`のfaqs 9件と別内容で重複管理） |
| CTA | 同ファイル`primaryCta`/`secondaryCta`/`checklist` prop | 同ファイル | No | Low |
| sources | 同ファイル`sources` prop（4件） | 同ファイル | No | Low（`.md`のsources/sourceRefsと別管理だが内容は近似） |
| sample media | `generatedVideos.ts`の`pixverse`エントリ（`pageSlug: 'pixverse'`） | `src/data/generatedVideos.ts` | Shared（DB） | Low |
| internal links | 同ファイル`nextReads`/`conditions` prop（全ハードコード） | 同ファイル | No | Medium（`toolRelatedLinks.ts`未使用のため他ツールとの一元管理外） |
| structured data | 同ファイル内`jsonLdEntries`（Breadcrumb/SoftwareApplication/VideoObject条件付き） | 同ファイル | No | Low |
| freshness metadata | `d?.lastReviewed`/`d?.verifiedAt`/`d?.nextReviewDue`（`.md`から`getCollection`経由で取得） | `src/content/tools/pixverse.md` | **Shared**（唯一`.md`から直接読み込まれる値） | Low |
| usagePolicy | **未接続**（`.md`にusagePolicyフィールドがあるがastro側でprop未指定、`ToolDetailPage.astro`のusagePolicyセクションは`{usagePolicy && (...)}` のため非表示） | `src/content/tools/pixverse.md`（dead） | No | Low（表示されないだけで実害なしだが情報鮮度が二重管理される温床） |

### FAQ

- **ライブFAQソース**: `src/pages/tools/pixverse/index.astro`の`faqs` prop（10件）。`ToolDetailPage.astro`が`FAQPage` JSON-LDを`faqs.length > 0`条件で自動生成。
- **`.md` frontmatter faqs**: 9件（`src/content/tools/pixverse.md:94-112`）。
- **比較結果**: 質問文言・件数とも一致しない。`.md`側は「無料で使えますか？」「商用利用できますか？」等シンプルな質問中心の9件、astro側は同系統の質問に加え「スマホで使えますか？」「RunwayやPikaと比べて」「画像から動画（image-to-video）を作れますか？」等、より詳細・比較志向の10件。
- **判定**: `.md`のfaqsは**完全にdead**（`entry.render()`もContent呼び出しもなし、astroはgetCollectionでdataのみ参照）。

### Media

- `generatedVideos.ts`にpixverseエントリあり（`sourceToolSlug: 'pixverse'`, `isSameToolAsPage: true`, `pageSlug: 'pixverse'`, 5秒動画, 640x360）。
- `pixverseSampleVideo`として取得し`sampleVideo` propで`ToolDetailPage.astro`に渡され、`GeneratedVideoSample`コンポーネントで視覚表示。
- **VideoObject JSON-LD**: 実装済み。ただし`pixverseVideoObjectSource`はfile/posterパスの完全一致（ハードコード文字列比較）をガード条件としており、`generatedVideos.ts`側のパスが変更されると静かに欠落する脆弱な実装（`src/pages/tools/pixverse/index.astro:15-20`）。
- **分類**: **STRONG**（動画表示＋VideoObject JSON-LD＋条件ガードあり）。

### Structured Data

- BreadcrumbList: あり（astro内ハードコード、3階層）。
- SoftwareApplication: あり（astro内ハードコード、name/description/url/applicationCategory）。
- FAQPage: `ToolDetailPage.astro`が`faqs` propから自動生成（10件）。
- VideoObject: あり（条件付き、上記参照）。
- 重複ステータス: 同一ページ内で各typeは1件のみ（`validate-publish.mjs`のduplicate検出対象外）。
- 未検証価格/評価データ: SoftwareApplicationに`aggregateRating`や`offers`は含まれておらず、価格の断定表示なし。

### Internal Links

- nextReads: astro内ハードコード9件（作例比較・カテゴリ一覧・比較記事・conditions系4件・guide2件）。
- conditions: astro内ハードコード5件。
- `toolRelatedLinks.ts`には**pixverseのエントリが存在しない**（`buildNextReads('pixverse')`は空配列を返す設計だが、そもそもpixverseは呼び出していない）。

### Duplication Risks

事実の重複箇所（最大想定）:
- 商用利用（要認可）: `.md` commercialUse/commercialUseNote、astro specs/basicInfo/quickTable/pricing.notes/commercial.lead/commercial.points/checklist/faqs（約7箇所）
- 無料枠（毎日60cr）: `.md` freePlanNote、astro specs/basicInfo/quickTable/pricing.table/faqs（約5箇所）
- 透かし: `.md` watermark/watermarkCondition、astro specs/basicInfo/quickTable/watermark（約4箇所）
- 日本語UI（対応）: `.md` japaneseUi、astro specs/basicInfo/quickTable/language/faqs（約5箇所）

将来ドリフトリスク: 上記いずれも`.md`更新がライブページに反映されない構造のため、`.md`側だけ更新して安心してしまうヒューマンエラーリスクが高い（kling-ai/hailuo-ai監査と同型の既知パターン）。

### SEO Implementation Map

big-keyword-seo-priority-2026-08-13.mdのWATCH理由: score 65。「pixverse 商用利用」がpos3.67なのにCTR0%という即効性の高いタイトル/メタ改善余地があるが、ブランド検索ボリューム自体が5,000と小さくPRIORITY_NOW3件より一段落ちる。GSC: ページ全体pos7.4/impr207/CTR1.45%（12ツール中最良CTR）。SERP: 未観測（推定MODERATE）。

将来アクション候補 → 対象ファイル・フィールド・リスク:
| 将来アクション | 対象ファイル | 対象フィールド | 実装リスク |
|---|---|---|---|
| title/meta改善（「商用利用」訴求の見直し、CTR改善） | `src/pages/tools/pixverse/index.astro` | `BaseLayout` title/description prop | Low（単一ファイル） |
| FAQ追加（ブランド定義型FAQ） | 同上 | `faqs` prop配列 | Low |
| lead/headingHtmlの「PixVerseとは」定義強化 | 同上 | `headingHtml`/`lead` prop | Low |
| VideoObjectガードの堅牢化（file/poster完全一致依存の解消） | 同上 | `pixverseVideoObjectSource`ロジック | Medium（ロジック変更、他ツールとの整合確認要） |
| toolRelatedLinks.ts統合（内部リンク一元管理化） | `src/data/toolRelatedLinks.ts` + `pixverse/index.astro` | 新規エントリ追加＋astro側import変更 | Medium（構造変更、範囲拡大の恐れ） |
| usagePolicy prop接続 | `pixverse/index.astro` | `usagePolicy={d?.usagePolicy}` 追加 | Low〜Medium（新規セクション表示、レイアウト影響要確認） |

### Readiness

**IMPLEMENTATION_READY**（title/meta/FAQ/leadの軽微強化は単一ファイル・低リスクで完結可能。VideoObjectは既存実装ありのため新規追加不要）。

---

## Luma AI

### Route

- URL: `/tools/luma-ai/`
- 描画元: `src/pages/tools/luma-ai/index.astro`（専用静的ルート）
- `[slug].astro`のSTATIC_OVERRIDESに`'luma-ai'`が含まれ、動的ルートから除外（PixVerseと同一パターン）。

### Content Sources

| Section | Render source | Edit source | Shared? | Risk |
|---|---|---|---|---|
| title/meta | `src/pages/tools/luma-ai/index.astro`（BaseLayout） | 同ファイル | No | Low |
| H1 (headingHtml) | 同ファイル | 同ファイル | No | Low |
| lead | 同ファイル | 同ファイル | No | Low |
| specs | 同ファイル | 同ファイル | No | Low |
| basicInfo | 同ファイル | 同ファイル | No | Low |
| pricing | 同ファイル`pricing` prop | 同ファイル | No | Medium（`.md`のpricingModel: confirmedと重複） |
| commercial use | 同ファイル`commercial` prop | 同ファイル | No | Medium（`.md`のcommercialUseNote/usagePolicyと重複） |
| Japanese support | 同ファイル`language` prop | 同ファイル | No | Medium（`.md`のjapaneseUi: false / japanesePrompt: trueと重複） |
| FAQ | 同ファイル`faqs` prop（9件ハードコード） | 同ファイル | No | High（`.md`のfaqs 9件と類似だが別管理） |
| CTA | 同ファイル`primaryCta`/`secondaryCta`/`checklist` | 同ファイル | No | Low |
| sources | 同ファイル`sources` prop（4件） | 同ファイル | No | Low（`.md`のsourceRefs 6件・sources 6件とは別管理） |
| sample media | `generatedVideos.ts`の`luma-ai`エントリ | `src/data/generatedVideos.ts` | Shared（DB） | Low |
| internal links | `buildNextReads('luma-ai')`/`buildConditionTags('luma-ai')`経由 | `src/data/toolRelatedLinks.ts` | **Shared（DBドリブン）** | Low（PixVerseと異なり一元管理） |
| structured data | 同ファイル内`jsonLd`（Breadcrumb/SoftwareApplicationのみ） | 同ファイル | No | Medium（VideoObject欠落） |
| freshness metadata | `d?.lastReviewed`/`d?.verifiedAt`/`d?.nextReviewDue` | `src/content/tools/luma-ai.md` | Shared | Low |
| usagePolicy | `usagePolicy={d?.usagePolicy}` として**接続済み**、`ToolDetailPage.astro`内で描画 | `src/content/tools/luma-ai.md`（**live**） | **Shared（唯一usagePolicyがライブ反映される例）** | Low |

### FAQ

- **ライブFAQソース**: `src/pages/tools/luma-ai/index.astro`の`faqs` prop（9件）。
- **`.md` frontmatter faqs**: 9件（`src/content/tools/luma-ai.md:158-176`）。
- **比較結果**: 件数は一致（9件）だが、質問文言はastro側がより口語的・簡潔（例: `.md`「透かしは入りますか？」→astro「透かしはありますか？」）、内容も一部異なる（astroには「使い方を教えてください」「スマホで使えますか？」「画像から動画を作るには何を確認すべきですか？」という3問があるが`.md`側にはない。代わりに`.md`には「人物・ブランドロゴ・第三者素材を使って動画を作れますか？」がありastro側は削除〔類似FAQ「画像をアップロードして...」はPixVerse側にのみ存在〕）。件数の偶然一致であり内容は別管理。
- **判定**: `.md`のfaqsは**完全にdead**（構造はPixVerseと同一）。

### Media

- `generatedVideos.ts`にluma-aiエントリあり（`sourceToolSlug: 'luma-ai'`, `isSameToolAsPage: true`, `pageSlug: 'luma-ai'`）。
- `lumaSampleVideo`として取得し`sampleVideo` propで渡され、視覚表示はされる。
- **VideoObject JSON-LD**: **未実装**。`jsonLd`配列にはBreadcrumbListとSoftwareApplicationのみ（`src/pages/tools/luma-ai/index.astro:16-35`）。PixVerseと同条件（`isSameToolAsPage: true`のtool-video-outputエントリ）を持ちながら構造化データ化されていない。
- **分類**: **ADEQUATE**（動画表示はあるが構造化データが欠落しておりPixVerseのSTRONGに劣る）。

### Structured Data

- BreadcrumbList: あり。
- SoftwareApplication: あり。
- FAQPage: `ToolDetailPage.astro`が`faqs` propから自動生成（9件）。
- VideoObject: **なし**（上記参照）。
- 重複ステータス: 該当typeなし、重複なし。
- 未検証価格/評価データ: SoftwareApplicationにoffers/aggregateRatingなし。

### Internal Links

- nextReads: `buildNextReads('luma-ai')` → `toolRelatedLinks.ts`の`luma-ai`エントリで`comparisons: []`のため、`guides`2件（作例比較・クレジット料金比較ガイド）のみが返る。**合計2件**とPixVerse（9件ハードコード）より大幅に薄い。
- conditions: `buildConditionTags('luma-ai')` → `comparisons.length === 0`のため`categoryTag`（AI動画生成ツール一覧）が先頭に追加され、`conditionTags`2件＋`useCaseTags`1件で計4件。astro側で前後に「ツール一覧」「全ツール比較表」を追加し**表示は計6件**。
- `toolRelatedLinks.ts`に`luma-ai`専用の比較記事エントリが0件登録されているため、`/comparisons/`配下にLuma AI関連の比較記事があれば追加候補になるが、現状該当記事は存在しない（後述カニバリ調査参照）。

### Duplication Risks

- 商用利用（Plus以上）: `.md` commercialUse/commercialUseNote/usagePolicy（**live反映**）、astro specs/basicInfo/quickTable/pricing.notes/commercial.lead/commercial.points/checklist/faqs（約8箇所、usagePolicy分だけPixVerseより1つ多い）
- 無料枠（限定クレジット・非商用）: `.md` freePlanNote、astro specs/basicInfo/quickTable/pricing.table/faqs（約5箇所）
- 透かし: `.md` watermark/watermarkCondition、astro specs/basicInfo/quickTable/watermark（約4箇所）
- 日本語UI（非対応）: `.md` japaneseUi: false、astro specs/basicInfo/quickTable/language/faqs（約5箇所）

usagePolicyがLuma AIのみlive接続されているため、商用利用に関する事実がPixVerseより1箇所多く重複する。ドリフトリスクはPixVerseと同型（`.md`を更新してもastroハードコード側は自動反映されない）。

### SEO Implementation Map

big-keyword-seo-priority-2026-08-13.mdのWATCH理由: score 62。page pos7.27・impr154に対しCTR0.65%と低い。タイトル/スニペット改善だけで即効性のある伸びが期待できる。GSC: ブランドクエリ単独行が検出された数少ない1件（impr7/pos2.57/clicks0、12ツール中stable-diffusionと並ぶ2件のみ）。SERP: 未観測（推定MODERATE）。

将来アクション候補 → 対象ファイル・フィールド・リスク:
| 将来アクション | 対象ファイル | 対象フィールド | 実装リスク |
|---|---|---|---|
| title/meta改善（CTR改善、現行titleが「無料枠・料金・商用利用の注意点」でブランド定義が弱い） | `src/pages/tools/luma-ai/index.astro` | `BaseLayout` title/description prop | Low |
| headingHtml/leadに「Luma AIとは」定義を追加 | 同上 | `headingHtml`/`lead` prop | Low |
| FAQ新規追加（ブランド定義型） | 同上 | `faqs` prop配列 | Low |
| **VideoObject JSON-LD新規追加**（PixVerseと同条件のサンプル動画が既にあるため実装障壁が低い） | 同上 | `jsonLd`配列へのVideoObjectエントリ追加 | Low〜Medium（PixVerse実装をテンプレートに流用可能、file/posterガードロジックの複製が必要） |
| nextReads拡充（現状2件は薄い） | `src/data/toolRelatedLinks.ts`の`luma-ai`エントリ | `comparisons`/`guides`配列 | Medium（DBドリブンのため他ツールにも影響しうる共有ファイルの変更） |

### Readiness

**IMPLEMENTATION_READY**（title/meta/FAQ/lead強化は単一ファイル・低リスク。VideoObject追加はPixVerseの既存パターンを流用でき実装障壁が低い。nextReads拡充は共有ファイル変更のため慎重に）。

---

## Comparison

| 観点 | PixVerse | Luma AI |
|---|---|---|
| 構造的単純さ | 全ハードコード（1ファイル完結） | 一部DBドリブン（toolRelatedLinks.ts依存あり） |
| 編集リスク | 単一ファイルのみ変更で完結 | nextReads拡充時は共有ファイル変更、他ツールへの影響考慮要 |
| ページ完成度 | basicInfo/pricing/commercial等フル実装、usagePolicy未接続（dead） | 同等フル実装、usagePolicy接続済み（liveだが重複増） |
| FAQ readiness | 10件（`.md`と別管理・dead） | 9件（`.md`と別管理・dead） |
| media/example強度 | STRONG（VideoObject実装済み） | ADEQUATE（VideoObject未実装、追加余地あり） |
| structured-data完成度 | Breadcrumb/SoftwareApplication/FAQPage/VideoObject全実装 | VideoObjectのみ欠落 |
| 重複リスク | 約7箇所（商用利用中心） | 約8箇所（usagePolicy分+1） |
| 想定production file数（今後実装時） | 1ファイル（`pixverse/index.astro`）で完結可能 | 1ファイル（`luma-ai/index.astro`）＋VideoObject追加時も同ファイル内で完結可能。nextReads拡充時のみ`toolRelatedLinks.ts`が追加対象 |

**構造的に実装しやすい候補: PixVerse**（全項目が単一ファイル内で完結し、外部共有ファイルへの依存がないため変更範囲が最小）。ただしLuma AIもVideoObject追加のテンプレートがPixVerseに既に存在するため、構造難易度の差は小さい。

## Recommended Future Implementation Order

構造的readiness観点のみで整理する（最終的なSEO優先度はGSC/SERPレビュー後に別途決定）：

1. **PixVerse**: 単一ファイル完結・既存VideoObject実装済みのため、title/meta/FAQ/lead強化のみで完了できる最小スコープ。
2. **Luma AI**: title/meta/FAQ/lead強化に加えVideoObject新規追加が視野に入るが、PixVerseの既存実装をテンプレートに流用できるため大きな障壁ではない。nextReads拡充（共有ファイル変更）は必要になった場合のみ別途スコープを切る。

両者ともIMPLEMENTATION_READYであり、構造上どちらを先に着手しても大きな差はない。**最終的な着手順は本番デプロイ後のGSC/SERPレビュー結果に基づいて決定する。**

## Risks and Limitations

- ライブJapan Google SERPは本監査でも未観測（big-keyword-seo-priority-2026-08-13.md記載の制約を継承）。
- GSCは同audit記載の17日間パーシャルデータのみに依拠しており、本監査では新規取得していない。
- `.md`のfaqs/usagePolicy等が今後「live化」されるような構造変更（例: astro側で`d.faqs`を直接使う等）は本監査のスコープ外であり、提案もしていない。
