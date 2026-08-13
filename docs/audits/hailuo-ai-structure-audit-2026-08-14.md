# Hailuo AI 構造監査（実装前）

- audit_date: 2026-08-14
- task_file: docs/tasks/active/2026-08-14-hailuo-ai-structure-audit.md
- production: NOT_DEPLOYED（本監査は構造確認のみ、実装なし）

## 1. ルート / STATIC_OVERRIDES

`src/pages/tools/[slug].astro` 12行目:
```
const STATIC_OVERRIDES = new Set([... 'hailuo-ai', ...]);
return tools.filter((entry) => !STATIC_OVERRIDES.has(entry.slug))...
```
`hailuo-ai`はSTATIC_OVERRIDESに含まれるため、`[slug].astro`の`getStaticPaths`が明示的にフィルタで除外している。よって`/tools/hailuo-ai/`は動的ルートでは生成されず、専用ルート`src/pages/tools/hailuo-ai/index.astro`が単独で該当パスを所有する（kling-ai・stable-diffusionと同一パターン）。

## 2. 回答（Q1〜Q20）

| # | 質問 | 回答 |
|---|---|---|
| 1 | /tools/hailuo-ai/を描画するルート | `src/pages/tools/hailuo-ai/index.astro`（専用ページ） |
| 2 | STATIC_OVERRIDES除外か | Yes |
| 3 | titleの制御元 | `index.astro` 38行目 `<BaseLayout title="...">` ハードコード |
| 4 | meta descriptionの制御元 | `index.astro` 39行目 `<BaseLayout description="...">` ハードコード |
| 5 | H1の制御元 | `index.astro` 60行目 `headingHtml` propハードコード |
| 6 | intro/leadの制御元 | `index.astro` 61行目 `lead` propハードコード |
| 7 | 料金の制御元 | `index.astro`内`specs`/`basicInfo`/`quickTable`/`pricing` propの複数箇所にハードコード（`hailuo-ai.md`の`lowestPaidPlan`等は不使用） |
| 8 | 無料プラン情報の制御元 | 同上（`specs`/`basicInfo`/`quickTable`/`pricing`にハードコード）。`hailuo-ai.md`の`freePlanNote`は不使用 |
| 9 | 商用利用情報の制御元 | `index.astro`内`specs`/`basicInfo`/`commercial`/`checklist`/`faqs`にハードコード。`hailuo-ai.md`の`commercialUseNote`/`usagePolicy`は不使用（kling-aiと異なり`usagePolicy` propすら渡されていない、後述） |
| 10 | 日本語対応情報の制御元 | `index.astro`内`specs`/`basicInfo.lang`/`quickTable`/`language`にハードコード。`hailuo-ai.md`の`japaneseUi`/`japanesePrompt`は不使用 |
| 11 | FAQの制御元 | `index.astro` 236〜246行目 `faqs={[...]}` prop（**8件**）。`hailuo-ai.md`の`faqs:`（frontmatter、8件）は不使用・dead |
| 12 | CTAテキスト/URLの制御元 | `index.astro` 70〜71行目 `primaryCta`/`secondaryCta` propハードコード（`https://hailuoai.video`、`https://hailuoai.video/doc/terms-of-service.html`） |
| 13 | サンプル動画/画像の制御元 | `src/data/generatedVideos.ts`（`pageSlug: 'hailuo-ai'`でフィルタ）→`index.astro` 11〜13行目で取得し`sampleVideo`に使用。DBドリブン（唯一のDB連携箇所） |
| 14 | SoftwareApplication JSON-LDの制御元 | `index.astro` 25〜33行目 ハードコード（`hailuo-ai.md`不使用） |
| 15 | VideoObject JSON-LDの制御元 | **存在しない**。kling-aiと異なり、`index.astro`の`jsonLdEntries`にVideoObjectブロックが一切実装されていない（BreadcrumbList+SoftwareApplicationの2件のみ）。`sampleVideo`propは`ToolDetailPage.astro`内で`GeneratedVideoSample`コンポーネントによる視覚的レンダリングのみに使われ、構造化データ化されていない |
| 16 | 内部リンク/関連コンテンツの制御元 | `index.astro`内`relatedTools`（ハードコード3件）、`nextReads`（**ハードコード9件**、kling-aiと異なり`buildNextReads()`関数不使用）、`conditions`（**ハードコード7件**、`buildConditionTags()`不使用） |
| 17 | hailuo-ai.mdから来る値 | `japanBilling`（丸ごとprop）、`lastReviewed`/`nextReviewDue`/`verifiedAt`（fallback付き）のみ。`usagePolicy`はpropとして渡されていない（kling-aiは渡していた） |
| 18 | ハードコード/他所でoverrideされる値 | title/meta/H1/lead/specs/basicInfo/quickTable/pricing/commercial/language/watermark/checklist/faqs/CTA/relatedTools/versusTable/selectTable/nextReads/conditions/SoftwareApplication JSON-LD（すべて`index.astro`内ハードコード） |
| 19 | drift可能性のある重複事実あり | Yes（後述セクション参照） |
| 20 | dead/unrendered frontmatterあり | Yes（後述FAQ監査、および本文Markdown全体） |

## 3. ページコンテンツマップ

| セクション | 描画元 | 編集元 | DB連携 | リスク |
|---|---|---|---|---|
| title/meta | index.astro BaseLayout props | index.astro | No | 低 |
| H1 (headingHtml) | index.astro | index.astro | No | 低 |
| lead | index.astro | index.astro | No | 低 |
| specs（6項目バッジ） | index.astro | index.astro | No | 中（basicInfo/quickTableと重複） |
| basicInfo | index.astro | index.astro | No | 中（specs/quickTable/pricing/commercialと重複） |
| pricing（表） | index.astro | index.astro | No | 中（specs/basicInfo/quickTableと重複） |
| commercial（本文＋points） | index.astro | index.astro | No | 中（specs/basicInfo/faqs/checklistと重複） |
| 日本語対応 | index.astro（specs/basicInfo.lang/quickTable/language） | index.astro | No | 中（4箇所重複） |
| FAQ | index.astro `faqs[]` prop（8件） | index.astro | No | 高（hailuo-ai.mdに別FAQ8件が死んだデータとして存在、混同リスク） |
| CTA | index.astro primaryCta/secondaryCta | index.astro | No | 低 |
| sources | index.astro `sources[]` prop | index.astro | No | 低（hailuo-ai.mdの`sources`/`sourceRefs`も別途存在するが不使用） |
| サンプル動画 | generatedVideos.ts → index.astro | 両方 | Yes | 中（VideoObject JSON-LD未実装、構造化データとしては未活用） |
| 関連リンク（nextReads/conditions） | index.astro ハードコード | index.astro | No | 中（kling-aiは`toolRelatedLinks.ts`のDBドリブン関数経由だが、hailuo-aiは全ハードコード。他ツールページ変更時の手動同期漏れリスク） |
| relatedTools（カード3件） | index.astro ハードコード | index.astro | No | 低〜中 |
| BreadcrumbList/SoftwareApplication | index.astro | index.astro | No | 低 |
| freshness（lastChecked/nextCheck/verifiedDate） | hailuo-ai.md → index.astro（fallback付き） | hailuo-ai.md | Yes | 低 |
| usagePolicy | **未使用**（propとして渡されていない） | - | No | - |

## 4. FAQ監査

- **ライブFAQ件数: 8件**（`index.astro` 236〜245行目 `faqs={[...]}`）。
- **重要: big-keyword-seo-priority-2026-08-13.md（38行目・113行目）は「FAQ 0件」と記載しているが、これは誤り。** 同監査は`.md`本文の`###`見出し数のみを数えており、`index.astro`側の実ライブFAQ（8件）を確認していなかった（同監査29〜30行目に「次フェーズで実装対象を選ぶ際は.mdではなくastroコンポーネント側のデータソースを確認する必要がある」と自己記録あり、本監査でこれを確認・訂正）。
- `hailuo-ai.md` frontmatterの`faqs:`（YAMLリスト、8件、`question`/`answer`形式）は**完全にdead data**。`index.astro`はこのフィールドを一切参照していない。
- `hailuo-ai.md`本文Markdown（`## Hailuo AIとは`以下の全セクション）も同様に**dead**。`entry.render()`や`<Content />`は使用されていない。

## 5. SEO監査アラインメント（big-keyword-seo-priority-2026-08-13.mdより抜粋）

監査原文（106〜114行目）:
> 具体的強化領域: 冒頭定義・第一印象セクションの強化／FAQ新規追加（0件）／japaneseUi=falseの実態再検証（未確認のまま弱みとして放置しない）／商用利用セクションの明確化／内部リンク（動画生成カテゴリ・比較記事）。

| 推奨事項 | 対象ファイル | 対象フィールド | 実装リスク |
|---|---|---|---|
| 冒頭定義・第一印象セクションの強化 | src/pages/tools/hailuo-ai/index.astro | `headingHtml`（60行目）/`lead`（61行目） | 低。現行leadは既に「Hailuo AIとは何か」を最初の文で説明しており（"Hailuo AI（MiniMax運営）はテキストや画像からAI動画を生成するツールです"）、監査原文が想定するほど弱くない可能性がある。強化は文言洗練レベルで十分 |
| FAQ新規追加（監査原文は「0件」と誤認するが実際は8件） | src/pages/tools/hailuo-ai/index.astro | `faqs={[...]}` prop（236〜246行目） | 低。既存8件に非重複で追加するのみ。ただしkling-ai（9→11件）と異なり、「Hailuo AIとは何ですか？」「Hailuo AIでは何ができますか？」に相当する総称的質問が現状ない点は実際の伸び代 |
| japaneseUi=falseの実態再検証 | src/content/tools/hailuo-ai.md（`japaneseUi: false`）＋src/pages/tools/hailuo-ai/index.astro（表示文言4箇所） | `japaneseUi`/`japanesePrompt`（.md）、`specs`/`basicInfo.lang`/`quickTable`/`language`（astro） | 高。事実の再検証（実際にサービスを触っての確認）が必要な作業であり、本SEOタスクのスコープ外にすべき。事実変更なしでの表現強化のみなら中リスク |
| 商用利用セクションの明確化 | src/pages/tools/hailuo-ai/index.astro | `commercial`（lead/points）、`basicInfo`の商用利用項目 | 中。現行は既にコンテンツライセンス条項の注意喚起を含み比較的深い。事実変更なしでの深掘りは可能だが`specs`/`basicInfo`/`quickTable`との整合を保つ必要 |
| 内部リンク強化（動画生成カテゴリ・比較記事） | src/pages/tools/hailuo-ai/index.astro | `nextReads`（252〜262行目、既に9件ハードコードで比較的充実）、`about[]`本文 | 低。既に`/categories/video-generation/`・`/comparisons/ai-video-generation-sample-comparison/`等を含む。Hailuo AI単体の比較記事（例: runway-vs-hailuo-ai等）は存在しないため新規リンク先候補は限定的 |

title/meta強化の推奨は監査原文に明記なし。現行titleは「Hailuo AIの使い方・料金・商用利用まとめ｜AIクリエイティブナビ」で、使い方・料金・商用利用をカバーしているが「Hailuo AIとは」の定義訴求がタイトルに含まれていない。kling-ai・stable-diffusionと同様、ブランド単体＋情報意図への拡張余地がある（実装は次タスク）。

## 6. カニバリゼーション評価

- `src/pages/comparisons`・`src/pages/guides`・`src/pages`全体を検索した結果、`hailuo`を含む専用ページは`src/pages/tools/hailuo-ai/`の1件のみ。
- Hailuo AI単体を対象とする比較記事（例: runway-vs-hailuo-ai）・独立解説記事は存在しない。
- `hailuo-ai.md`本文内の「RunwayやPikaとの違い」セクションはdead dataであり、ライブページには反映されていない。

**カニバリリスク: LOW**。`/tools/hailuo-ai/`はHailuo AI単体キーワードの正本ページとして問題なく機能する。新規スタンドアロン記事は不要。

## 7. 動画/実例監査

- サンプル動画: あり（`generatedVideos.ts`の`hailuo-ai-tool-video-output-01.mp4`、`pageSlug: 'hailuo-ai'`、`sampleType: 'tool-video-output'`、`isSameToolAsPage: true`）
- poster/thumbnail: あり（`hailuo-ai-tool-video-output-01-poster.webp`）
- VideoObject JSON-LD: **なし**（kling-aiと異なり未実装）
- generatedVideos.ts連携: あり（`sampleVideo` propとして視覚的表示のみ）
- duration/name/uploadDate: 動画メタデータ自体はgeneratedVideos.tsに存在するが、VideoObject構造化データとして出力されていないため検索エンジンには伝わらない
- verifiedSummary: kling-aiは`verifiedSummary` propを使用しているが、hailuo-aiの`index.astro`には`verifiedSummary`propが渡されていない（未実装）
- 既存比較/サンプルページ: `/comparisons/ai-video-generation-sample-comparison/`にHailuo AIが含まれる可能性あり（nextReadsのdescから示唆、本監査では未確認）

**評価**: **ADEQUATE〜WEAK**。サンプル動画データ自体はDB連携済みで視覚的には表示されるが、VideoObject構造化データが欠落しており、kling-aiと比較して動画の検索エンジン向け訴求力が弱い。verifiedSummaryも未実装。将来の強化余地だが、本監査のスコープ外（次タスクで判断）。

## 8. 構造化データ監査

- SoftwareApplication: name/operatingSystem/applicationCategory/description/url。price/rating/reviewフィールドなし（適切）。
- BreadcrumbList: 3階層、正常。
- FAQPage: `ToolDetailPage.astro` 401〜412行目で`faqs[]` propから自動生成と確認済み（`faqs.length > 0`条件付き）。
- VideoObject: **なし**（未実装、上記7節参照）。
- 重複スキーマ: なし。
- price/rating等の未検証フィールド追加: なし。

## 9. 重複事実によるdriftリスク（詳細）

商用利用・無料枠・透かし・日本語対応の4トピックが、`specs`・`basicInfo`・`quickTable`・`pricing`・`commercial`・`checklist`・`faqs`・`versusTable`の最大8箇所に分散して独立にハードコードされている（kling-aiより1箇所多い、`versusTable`にも比較値が含まれるため）。今回の監査では値の不一致は検出されなかったが、将来の部分編集で1箇所だけ更新すると内部矛盾が生じるリスクは高い。

また、`nextReads`/`conditions`がkling-aiのように`toolRelatedLinks.ts`のDBドリブン関数（`buildNextReads`/`buildConditionTags`）を使わず全ハードコードである点も、他ツールページの内部リンク体系変更時の同期漏れリスクとして記録する（本監査は指摘のみ、リファクタリングは提案しない）。

## Next Step

**実装可能。最小編集対象ファイルは`src/pages/tools/hailuo-ai/index.astro`の1ファイルのみ**（kling-ai・stable-diffusionと同一パターン）。`src/content/tools/hailuo-ai.md`は編集してもライブページに影響しないため、原則対象外とする。

次タスクの実装スコープ候補（優先順）:
1. title/meta強化（ブランド単体＋情報意図への拡張）
2. FAQ非重複追加（「Hailuo AIとは何ですか？」等の総称的質問）
3. lead文言の軽微な洗練（現状も既に定義から始まっており大幅改修は不要）
4. 内部リンクは既に比較的充実しているため追加は最小限に留める

japaneseUi実態の再検証は本SEOタスクのスコープ外として明確に切り離すことを推奨する（別タスク）。VideoObject追加・verifiedSummary追加も本タスクのスコープ外（構造変更を伴うため）。
