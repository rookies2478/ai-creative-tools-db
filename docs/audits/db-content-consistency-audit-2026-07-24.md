# DBコンテンツ整合性監査 2026-07-24

読み取り専用監査。修正は一切実施していない。

## 1. 結論

- **RESULT: HOLD**（P0 1件・P1 7件を含む実質的な値の矛盾を検出。一次情報未確認の断定も複数あり。修正着手前に本報告書のレビューを推奨）
- 検査ツール数: **29 / 29**（`src/content/tools/*.md` 全件）
- 検査関連ファイル数: 約120件（tools/*.md 29、pages/tools/*/index.astro 29、pages/categories/* 6、pages/conditions/* 4、pages/comparisons/* 抽出調査、content/guides/* 抽出調査、components/* 抽出調査、data/*.ts 4）
- 検査ページ種別: ツール詳細ページ／ツール一覧・カード／比較記事／ガイド記事／条件別ページ／カテゴリページ／FAQ／共通コンポーネント／構造化データ（JSON-LD）
- 検出件数合計: **44件**（個別データ不一致）＋ **5件**（DB設計・構造上のメタ課題、A-H分類対象外）
- **修正は実施していない**（全エージェント読み取り専用で調査、ファイル変更ゼロ）

## 2. DB正本の構造

### 正本ファイル
- **`src/content/tools/*.md`（29件）** — 各ツールのfrontmatterがDB正本。`src/content/config.ts`のzodスキーマで型定義。
- `verifiedAt`/`officialSourceUrl`は**29/29件で充足**（欠落なし、良好）。

### 補助データファイル
| ファイル | 役割 | DB正本との関係 |
|---|---|---|
| `src/data/generatedImages.ts` / `generatedVideos.ts` | 生成サンプル画像・動画メタデータ | 独立。`sourceToolSlug`でtools/*.mdと紐付くのみ、値の重複管理なし |
| `src/data/toolRelatedLinks.ts` | ツールページの関連リンク・条件タグ | 独立（リンク構造のみ） |
| `src/data/labelDictionary.ts` | バッジ表示用ラベル文言・型定義 | **`config.ts`のenum(CommercialUse/WatermarkState/FreePlan/TriState)と値集合を別ファイルで再宣言（二重管理）** |

### 各フィールドの利用先
- `src/pages/tools/<slug>/index.astro`（29件全存在）→ 28件が`ToolDetailPage.astro`、1件(adobe-firefly)のみ`AdobeFireflyTool.astro`。いずれも`getCollection('tools')`経由でDB値を参照。
- `src/pages/conditions/*`（commercial-use, free, japanese, no-watermark）→ **全4件`getCollection`使用、DBドリブン化済み**（過去のconditions-db-refactor通り）。
- `src/pages/categories/*`（6件）→ **image-generation, video-generationの2件のみ`getCollection`使用**。**avatar-video, design, video-editing, voice-narationの4件はハードコード配列**（DB更新が反映されない構造）。
- `src/pages/comparisons/*`（サンプル調査分）→ **`getCollection`不使用、価格・機能比較表を記事内に直接ハードコード**。DB更新時の反映漏れが最も起きやすい箇所。

### 二重管理箇所
1. `labelDictionary.ts`の型・値集合と`config.ts`のzod enumの重複定義
2. `src/components/CanvaAiTool.astro`, `LeonardoAiTool.astro`, `MicrosoftDesignerTool.astro`, `MidjourneyTool.astro`, `TdpToolPage.astro` — **どこからも参照されていないオーファンコンポーネント**。旧世代の専用ページ実装の残骸で、古いデータを保持したまま放置。誤って再利用されるリスク。

### 正本が不明確な箇所
- カテゴリページ4件・比較記事群は「DBを見て手で書いた」ハードコード値であり、DB更新のたびに手動同期が必要。正本はtools/*.mdで一意だが、**反映プロセスが保証されていない**。

## 3. 問題件数の分類

| 分類 | 件数 |
|---|---:|
| A. 表記ゆれ | 3 |
| B. 明確な値の矛盾 | 9 |
| C. DB未登録 | 0 |
| D. 記事未反映 | 9 |
| E. DB側が古い可能性 | 1 |
| F. 記事側が古い可能性 | 7 |
| G. 意味が曖昧 | 7 |
| H. 一次情報確認が必要 | 8 |
| **合計** | **44** |

（別途、DB設計上のメタ課題5件は分類対象外、第7章に記載）

重要度内訳: **P0=1／P1=7／P2=13／P3=23**（合計44）

## 4. 全件一覧

| ID | 重要度 | 分類 | ツール | DB項目 | DBの値 | 表示・記事の値 | ファイル | 行番号 | 問題点 | 推奨対応 |
|---|---|---|---|---|---|---|---|---:|---|---|
| AUD-01 | P0 | B | DreamStudio | freePlan | `"limited"`（Trial 1000クレジット） | 「無料プランなし（×）」 | `src/content/tools/dreamstudio.md`(6,35) / `src/pages/categories/image-generation/index.astro`(129), `src/components/Free.astro`(172), `src/components/JapaneseAiToolsGuide.astro`(122), `src/components/WatermarkCreditGuide.astro`(122) | 129/172/122/122 | 無料Trialが存在するのに4ファイルで「無料プランなし」と断定。誤情報の中で最も実害が大きい | 4ファイルとも「Trial 1000cr（使い切り）」に統一修正 |
| AUD-02 | P1 | B/F | Leonardo AI | commercialUse系note | 2026-01改定で無料プランでも非独占ライセンスで商用利用可（所有権はLeonardo保持） | 「無料プランは商用利用不可」（更新前の記述） | `src/pages/tools/leonardo-ai/index.astro`(79-81,118-124,165-169,245-246), `src/pages/categories/image-generation/index.astro`(118), `src/pages/comparisons/midjourney-vs-leonardo-ai/index.astro`(32,59,145,204,242), `src/pages/comparisons/free-ai-image-generators/index.astro`(152) | 各所 | DB更新（2026-06-15）が4ファイル・5箇所に未反映。逆方向の案内になっている | 一次情報再確認の上、4ファイルを最新条件に統一 |
| AUD-03 | P1 | B | Pika | notBestFor / features.maxVideoDuration | `maxVideoDuration:"5秒・10秒"` | notBestForで「最大10〜25秒程度」 | `src/content/tools/pika.md`(43 vs 62) | 43/62 | **DB内部で矛盾**。frontmatter自体の整合性不備 | 一次情報確認の上、DB内で値を統一 |
| AUD-04 | P1 | B/D | Pika | features.videoExtend | `false`（Pikaframes未記載） | Pikaframesを最大25秒対応の主要機能として複数箇所で明記 | `src/content/tools/pika.md`(41) vs `src/pages/tools/pika/index.astro`(103,108,139,178,206) | 41/各所 | DBでは非対応扱いの機能が記事では主力機能として説明されユーザー誤認の恐れ | Pikaframes提供状況を一次情報で確認しDB/記事を統一 |
| AUD-05 | P1 | E/H | Pika | 無料プランクレジット数 | 「公式に明記なし」（未確定） | 「月80クレジット程度」と15箇所以上で断定 | `src/content/tools/pika.md`(33,178) vs `src/pages/tools/runway/index.astro`(258), `src/pages/comparisons/runway-vs-pika/index.astro`, `src/pages/guides/video-generation-credit-cost-comparison/index.astro`, `src/components/WatermarkCreditGuide.astro`, `src/components/CommercialUseCopyright.astro` 他 | 各所 | DBが未確定としている数値が多数ファイルで独自に断定・拡散。最大級の横展開漏れ | 一次情報で確定後、DB→全箇所へ一括反映 |
| AUD-06 | P1 | B/F/D | Synthesia | freePlan/commercialUse/japaneseUi | Basic無料プラン(月10分・透かしあり)/`commercialUse:"limited"`/`japaneseUi:"unknown"` | カテゴリ一覧が全項目「要確認」プレースホルダーのまま | `src/content/tools/synthesia.md`(6,9,11) vs `src/pages/categories/avatar-video/index.astro`(59) | 59 | ツールページ・比較記事は具体値を持つのにカテゴリ一覧のみ未更新。情報粒度がページ間で大きく食い違う | カテゴリ一覧をツールページ・比較記事と同じ具体値に更新 |
| AUD-07 | P1 | B | HeyGen | japaneseUi | `"unknown"` | カテゴリ一覧で`ja:'対応'`と断定表示（同列の他3ツールは「要確認」） | `src/content/tools/heygen.md`(11) vs `src/pages/categories/avatar-video/index.astro`(58) | 58 | 未確認の項目を対応済みと誤って断定。同一表内で扱いが不統一 | `ja:'対応'`→`'要確認'`に修正 |
| AUD-08 | P1 | B/F | Canva AI画像生成 | 料金（月額/年額） | JPY化済み（¥1,180/月〜、2026-07-13の日本課金監査で更新） | 比較記事が旧USD表記「$15/月〜」「$120/年」のまま | `src/pages/tools/canva-ai-image-generator/index.astro`(69,87-88,133,155) vs `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`(51) | 51 | 同一サイト内で通貨・金額表記が食い違う | 比較記事の料金セルをJPY最新値に更新 |
| AUD-09 | P2 | B | Tensor.Art | japanesePrompt | `true` | UIバッジ「△ 一部対応」 | `src/content/tools/tensor-art.md`(11) vs `src/pages/tools/tensor-art/index.astro`(98,140) | 98/140 | 完全対応(true)と一部対応(partial表示)の不一致 | 値をpartial型に変更するかバッジをokに統一 |
| AUD-10 | P2 | B/G | Clipdrop | japanesePrompt | `false`（非対応確定） | バッジ「要公式確認」（中立表現） | `src/content/tools/clipdrop.md`(11) vs `src/pages/tools/clipdrop/index.astro`(89) | 89 | 非対応の断定が読者に伝わらない | 値を"unknown"にするかバッジを非対応表記に統一 |
| AUD-11 | P2 | B | NightCafe | japanesePrompt | `true` | バッジ「△ 一部対応」 | `src/content/tools/nightcafe.md`(11) vs `src/pages/tools/nightcafe/index.astro`(98) | 98 | AUD-09と同型の不一致 | 同上の統一方針を適用 |
| AUD-12 | P2 | H | Vidu AI | usagePolicy.termsUrl | `https://www.vidu.com/terms` | `https://www.vidu.com/terms-of-service` | `src/content/tools/vidu-ai.md`(78,88,98) vs `src/pages/tools/vidu-ai/index.astro`(66,227) | 66/227 | 同一ツールの規約URLがファイル間で異なる。リンク切れリスク | 正しいURLを一次情報で確認し統一 |
| AUD-13 | P2 | D | PixVerse | japaneseUi | `true`（日本語UI完全対応） | ガイド記事FAQでPixVerse自体への言及が欠落 | `src/content/tools/pixverse.md`(11) vs `src/pages/guides/video-generation-credit-cost-comparison/index.astro`(299-303) | 299-303 | 強みである日本語UI対応が読者に伝わっていない | FAQにPixVerse日本語UI対応を追記 |
| AUD-14 | P2 | D | Luma AI | paidPlanNote | Pro $90/月・Ultra $300/月（既知） | 「上位プランは要公式確認」 | `src/content/tools/luma-ai.md`(42) vs `src/pages/tools/luma-ai/index.astro`(146-155) | 146-155 | 既知の価格情報が記事に反映されていない | DBの既知価格を記事に反映 |
| AUD-15 | P2 | F | InVideo AI | commercialUse | `"paid-only"`（確定） | カテゴリ一覧`commercial:'要確認'` | `src/content/tools/invideo-ai.md`(9) vs `src/pages/categories/video-generation/index.astro`(111) | 111 | 確定情報がカテゴリ一覧で「要確認」のまま | 確定値に更新 |
| AUD-16 | P2 | F | Hailuo AI | commercialUse/freePlan/lowestPaidPlan | 全てconfirmed（$14.99/月〜等） | カテゴリ一覧が全項目「要確認/要公式確認」 | `src/content/tools/hailuo-ai.md`(6,7,11) vs `src/pages/categories/video-generation/index.astro`(103) | 103 | 最も確度の高いデータの一つが未反映 | カテゴリ一覧を確定値に更新 |
| AUD-17 | P2 | D | Canva AI画像生成 | faqs | 9件 | ツールページfaqs propは8件（1件欠落） | `src/content/tools/canva-ai-image-generator.md`(144-162) vs `src/pages/tools/canva-ai-image-generator/index.astro`(241-250) | 144-162/241-250 | DB上のFAQが1件欠落して表示 | 欠落FAQをページに追加 |
| AUD-18 | P2 | E | Canva AI画像生成 | 料金全般 | JPY更新済み | オーファンコンポーネント`CanvaAiTool.astro`が旧$15/月・古いcheckedDateを保持 | `src/components/CanvaAiTool.astro` | 全体 | 未参照ファイルだが古いデータ残置（再利用時のリスク） | 未使用確認の上、削除または明示的にdeprecated化 |
| AUD-19 | P2 | F | Kling AI | japanBilling.providerCountry | 「運営法人はシンガポール、開発元は中国Kuaishou系（要公式確認）」（2026-07-13更新） | ツールページ4箇所で「運営＝中国Kuaishou」と断定 | `src/content/tools/kling-ai.md`(158-159) vs `src/pages/tools/kling-ai/index.astro`(32,117,142,245) | 32/117/142/245 | 監査更新後のニュアンスがツールページに未反映 | 4箇所を最新の表現に統一 |
| AUD-20 | P2 | D | Playground AI | japaneseUi | `false`（非対応確定） | カテゴリ一覧`jp:'要確認'` | `src/content/tools/playground-ai.md`(9) vs `src/pages/categories/image-generation/index.astro`(127) | 127 | 確定済み非対応情報が未反映 | `'非対応'`に修正 |
| AUD-21 | P2 | B | DreamStudio | japaneseUi | `false` | `Free.astro`のみ`'unknown'`（他ファイルは「非対応」で統一） | `src/content/tools/dreamstudio.md`(9) vs `src/components/Free.astro`(86) | 86 | 同一DB値に対しファイル間で表現が割れている | `Free.astro`を「非対応」に統一 |
| AUD-22 | P3 | H | NightCafe | japanBilling.pricingUrl | `/pricing`ページURL | sourceRefsではブログ記事URLを料金一次情報として使用、`/pricing`への言及なし | `src/content/tools/nightcafe.md`(123) vs (36-37) | 123/36-37 | `/pricing`ページの実在・内容が未確認のまま参照 | `/pricing`の実在確認、根拠を明記 |
| AUD-23 | P3 | H | CapCut AI | japanBilling.providerCountry | 「中国（配信法人はシンガポール）」 | 他ツールは単純な国名表記（表記粒度の差） | `src/content/tools/capcut-ai.md`(131-132) | 131-132 | 致命的でないが粒度不統一 | 表記ガイドライン化を検討 |
| AUD-24 | P3 | G | Runway | japanesePrompt | `"partial"` | 本文で「精度は公式情報で確認できていない」と弱い表現 | `src/content/tools/runway.md`(171) vs `src/pages/tools/runway/index.astro`(253) | 171/253 | partialの判定根拠が本文で明示されていない | 根拠をnoteに追記 |
| AUD-25 | P3 | F | Vidu AI | japaneseUi | `false`（確定） | カテゴリ一覧`jp:'要確認'` | `src/content/tools/vidu-ai.md`(11) vs `src/pages/categories/video-generation/index.astro`(105) | 105 | 確定情報が古いプレースホルダーのまま | 確定値に更新 |
| AUD-26 | P3 | D | PixVerse | japaneseUi | `true` | 「日本語対応3区分ガイド」にPixVerse行なし（Vidu AI/Kling AI等は掲載） | `src/pages/guides/japanese-support-three-types/index.astro` | - | 網羅性の欠如 | PixVerse行を追加検討 |
| AUD-27 | P3 | G | PixVerse | japanesePrompt | `"unknown"` | `prompt:'－'`表示（他のunknownツールは`△`表記で統一） | `src/content/tools/pixverse.md`(12) vs `src/components/Japanese.astro`(97) | 97 | 記号ルールが不統一 | unknown系の表示記号を統一 |
| AUD-28 | P3 | H | Luma AI | ライセンス条件 | DB未記載 | 記事に独自のライセンス条件URLを追加 | `src/pages/tools/luma-ai/index.astro`(235) | 235 | DBにないURLが記事側で独自追加 | 一次情報確認しDBにも反映するか出典明記 |
| AUD-29 | P3 | G | D-ID | japanesePrompt | `"unknown"` | 比較記事で音声対応言語数（119言語）と混同されうる書き方 | `src/content/tools/d-id.md`(12) vs `src/pages/comparisons/avatar-video-ai-tools/index.astro`(40) | 40 | 「プロンプト対応」と「音声対応言語数」の意味混同リスク | 表現を分離 |
| AUD-30 | P3 | F | DALL·E | lastReviewed | `"2026-06-15"` | カテゴリ一覧`date:'2026-06-10'` | `src/content/tools/dalle.md` vs `src/pages/categories/image-generation/index.astro`(120) | 120 | 5日のズレ（内容矛盾はなし） | 日付をDB最新値に合わせる |
| AUD-31 | P3 | F | Microsoft Designer | 全般 | 現行値（commercialUse:no, freePlan:limited, watermark:unknown+C2PA） | オーファンコンポーネントが「条件あり」「無料枠あり」「要確認」の古い値を保持 | `src/content/tools/microsoft-designer.md`(9-10,13,92-93,196-198) vs `src/components/MicrosoftDesignerTool.astro`(12-13,15,22-24,34-37) | 各所 | 未参照コンポーネントに古いデータが残置 | 未使用確認の上、削除または注記 |
| AUD-32 | P3 | F | Microsoft Designer | commercialUse | 確定（非商用限定） | カテゴリ一覧`'要確認'` | `src/pages/categories/image-generation/index.astro`(122) | 122 | 他ツール行も同様の定型文言で個別欠陥ではない | カテゴリページ一括棚卸しを推奨 |
| AUD-33 | P3 | A | Canva AI画像生成 | name | `"Canva AI画像生成"` | 比較記事で「Canva AI」と短縮表記 | `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro` | - | 表記ゆれ（実害小） | 表記統一ルールに従い修正 |
| AUD-34 | P3 | D | HeyGen | lowestPaidPlan | Creator $29/月（既知） | ツールページで「要確認」に丸め | `src/content/tools/heygen.md` vs `src/pages/tools/heygen/index.astro` | - | 意図的な簡略化の可能性あり、優先度低 | 意図確認の上、既知なら反映 |
| AUD-35 | P3 | D/G | Playground AI | commercialUse | 詳細確定情報あり（limited、無料は非商用限定） | カテゴリ一覧`commercial:'要確認'` | `src/pages/categories/image-generation/index.astro`(127) | 127 | 粒度が粗い | カテゴリページ一括棚卸しを推奨 |
| AUD-36 | P3 | G | SeaArt AI | freePlan | `true`（確定） | カテゴリ一覧`freeCount:'△あり（要確認）'` | `src/content/tools/seaart-ai.md`(6) vs `src/pages/categories/image-generation/index.astro`(145) | 145 | 確定情報が曖昧表現のまま | 「あり」に更新 |
| AUD-37 | P3 | A | DreamStudio | name | `"Brand Studio（旧DreamStudio）"` | 4ファイルで単に`"DreamStudio"` | `src/components/Free.astro`(172), `JapaneseAiToolsGuide.astro`(122), `WatermarkCreditGuide.astro`(122), `src/pages/categories/image-generation/index.astro`(129) | 各所 | 名称移行の周知が徹底されていない | 表記統一（優先度低） |
| AUD-38 | P3 | G | Gemini画像生成 | freePlan | `true` | ツールページbadge「限定的」、他コンポーネントは「あり」で統一 | `src/pages/tools/gemini-image-generation/index.astro`(68) vs `src/components/Free.astro`(102), `JapaneseAiToolsGuide.astro`(124), `WatermarkCreditGuide.astro`(174) | 68/各所 | 粒度不統一 | 表現を統一 |
| AUD-39 | P3 | A | DALL·E | name表記 | `"DALL·E"`（中点） | ハイフン表記「DALL-E」が残存 | `src/content/guides/commercial-use-cost-comparison.md`, `src/content/tools/nightcafe.md`, 対応する`src/pages/guides/commercial-use-cost-comparison/index.astro`, `src/pages/tools/nightcafe/index.astro` | 各所 | 表記ゆれ（中点表記が45ファイルで多数派） | ハイフン表記をDB正本の中点表記に統一 |
| AUD-40 | P3 | H | Kling AI | 透かし文字列 | - | `generatedVideos.ts`(50), 比較記事内に「KlingAI 3.0」（詰め表記） | `src/data/generatedVideos.ts`(50), `src/pages/comparisons/ai-video-generation-sample-comparison/index.astro`(8) | 50/8 | 製品内バージョン表記そのものの可能性あり、断定不可 | 実際の透かし文言を現物確認の上、要否判断 |
| AUD-41 | P3 | H | 全般（構造） | Free.astro等の一律「要確認」表示 | ツールにより確定値あり | Haiper等一部ツールで一律「要確認」表記が残る | `src/pages/categories/*` | - | 意図的な保守的表示の可能性が高く必須修正ではない | 対応不要（記録のみ） |
| AUD-42 | P3 | H | 各種 | 専用astroページのmd本文非表示 | md本文に手書き情報あり | Synthesia/Gemini画像生成/HeyGen等の専用astroページはmd本文をレンダリングせずprops手動指定 | `src/pages/tools/{synthesia,gemini-image-generation,heygen}/index.astro` | - | 更新時に本文とpropsの手動同期が必要（既知の構造的リスク、過去メモ`prod-check-avatar-video-2026-07-11`参照） | 更新チェックリスト運用の徹底 |
| AUD-43 | P3 | D | 各種 | ページ構造 | - | Gemini画像生成の専用ページはmd本文と一致していたが構造リスクは残る | `src/pages/tools/gemini-image-generation/index.astro` | - | 実害なしだが将来リスク | 運用ルールの継続 |
| AUD-44 | P3 | H | 全般 | japanesePrompt/japaneseUi "partial"の判定基準 | スキーマにコメントなし | 担当者により解釈が揺れる可能性 | `src/content/config.ts`(4) | 4 | tri-state「partial」の意味定義がスキーマに明文化されていない | スキーマコメントで基準を明文化 |

## 5. ツール別監査結果

| ツール | 監査対象ファイル | 一致していた項目 | 不一致項目 | 一次情報確認が必要な項目 | 判定 |
|---|---|---|---|---|---|
| midjourney | md/astro/comparisons | 全項目 | なし | なし | PASS |
| stable-diffusion | md/astro/comparisons | 全項目（ライセンス条件含む） | なし | なし | PASS |
| ideogram | md/astro | 全項目 | なし | なし | PASS |
| leonardo-ai | md/astro/categories/comparisons×2 | 機能・料金 | 商用利用条件（AUD-02） | 2026年1月改定の一次情報再確認 | NEEDS_FIX |
| fotor-ai | md/astro | 全項目 | なし | なし | PASS |
| tensor-art | md/astro | 料金・商用利用 | japanesePrompt表現（AUD-09） | なし | NEEDS_FIX |
| clipdrop | md/astro | 商用利用・料金 | japanesePrompt表現（AUD-10） | なし | NEEDS_FIX |
| nightcafe | md/astro | 商用利用・料金 | japanesePrompt表現（AUD-11） | pricingUrl（AUD-22） | NEEDS_FIX |
| capcut-ai | md/astro | 全主要項目 | なし（軽微な粒度差のみ、AUD-23） | providerCountry表現 | PASS |
| runway | md/astro/comparisons×2 | 料金・機能・商用利用 | なし（軽微） | japanesePrompt partialの根拠（AUD-24） | PASS |
| vidu-ai | md/astro/categories | 大半 | 規約URL（AUD-12）、japaneseUi（AUD-25） | 規約URL確定 | VERIFY |
| pixverse | md/astro/guides | 商用利用等 | japaneseUi未反映（AUD-13,26）、記号不統一（AUD-27） | なし | NEEDS_FIX |
| luma-ai | md/astro | 大半 | 上位プラン価格未反映（AUD-14） | 追加ライセンスURL（AUD-28） | NEEDS_FIX |
| pika | md/astro/comparisons/guides | 一部 | **DB内部矛盾**（AUD-03）、Pikaframes矛盾（AUD-04）、無料クレジット数横展開（AUD-05） | 無料クレジット数・Pikaframes提供状況 | NEEDS_FIX（優先度高） |
| d-id | md/astro/comparisons | 大半 | なし（軽微、AUD-29） | なし | PASS |
| haiper | md/astro/categories | 大半 | なし（意図的な簡略表記のみ） | なし | PASS |
| invideo-ai | md/astro/categories/comparisons | 大半 | カテゴリ一覧未反映（AUD-15） | なし | NEEDS_FIX |
| hailuo-ai | md/astro/categories | 大半 | カテゴリ一覧未反映（AUD-16） | なし | NEEDS_FIX |
| dalle | md/astro/categories/comparisons | 大半 | 日付ズレのみ（AUD-30） | dall-e-3廃止日は一致確認済み | PASS |
| adobe-firefly | md/astro(専用コンポーネント)/categories/comparisons×3 | 全項目 | なし | なし | PASS |
| microsoft-designer | md/astro/categories/オーファンコンポーネント | 実使用ページは整合 | オーファンコンポーネントの古い値（AUD-31,32） | なし | NEEDS_FIX（軽微） |
| canva-ai-image-generator | md/astro/comparisons/オーファンコンポーネント | 機能 | 旧USD表記（AUD-08）、FAQ欠落（AUD-17）、オーファンコンポーネント（AUD-18）、表記ゆれ（AUD-33） | なし | NEEDS_FIX |
| kling-ai | md/astro | 料金・商用利用・透かし | 運営国表記が古い（AUD-19） | 開発元/運営法人の一次情報 | NEEDS_FIX |
| heygen | md/astro/categories | 大半 | カテゴリ一覧の日本語UI誤表記（AUD-07） | 価格の丸め方針（AUD-34） | NEEDS_FIX |
| playground-ai | md/astro/categories | 大半 | カテゴリ一覧未反映（AUD-20,35） | なし | NEEDS_FIX |
| seaart-ai | md/astro/categories | 大半 | カテゴリ一覧の曖昧表現（AUD-36） | なし | PASS |
| synthesia | md/astro/categories/comparisons | ツールページ・比較記事 | カテゴリ一覧が未更新プレースホルダー（AUD-06） | なし | NEEDS_FIX |
| dreamstudio | md/astro/categories/components×3 | ツール専用ページ | **無料プラン誤表記**（AUD-01）、japaneseUi不一致（AUD-21）、名称表記ゆれ（AUD-37） | なし | NEEDS_FIX（最優先） |
| gemini-image-generation | md/astro/components | 大半 | freePlanバッジのニュアンス差（AUD-38） | なし | PASS |

（29/29ツール全件記載済み、DB登録数と一致）

## 6. 横断的な表記ゆれ

| 推奨統一表記 | 使用中の別表記 | 出現ファイル数 | 推奨理由 |
|---|---|---:|---|
| DALL·E（中点） | DALL-E（ハイフン） | 4 | DB正本(`dalle.md`)のname値が中点表記、かつ45ファイル中の多数派 |
| Canva AI画像生成 | Canva AI（短縮） | 1 | DB正本nameとの整合 |
| Brand Studio（旧DreamStudio） | DreamStudio（単独） | 4 | 名称移行の周知徹底 |
| Kling AI（スペースあり） | KlingAI（詰め表記、透かし文字列内） | 2 | ツール名自体は統一済み。透かし文字列は現物確認要（AUD-40） |

その他（Midjourney/MidJourney、Stable Diffusion系、D-ID、ClipDrop/Clipdrop、CapCut/Capcut、InVideo/Invideo、SeaArt/Sea Art、Vidu、Haiper等）は**全文grep上、実質的な表記ゆれは検出されず良好**。

## 7. DB設計上の問題

1. **同じ情報の二重管理**: `labelDictionary.ts`が`config.ts`のzod enum（CommercialUse/WatermarkState/FreePlan/TriState）の値集合を別ファイルで再宣言。schema変更時の追随漏れリスク。
2. **オーファンコンポーネント5件**（`CanvaAiTool.astro`, `LeonardoAiTool.astro`, `MicrosoftDesignerTool.astro`, `MidjourneyTool.astro`, `TdpToolPage.astro`）— どこからも参照されず、古いデータを保持したまま残置。誤って再利用されるリスク（AUD-18, AUD-31の温床）。
3. **フィールド不足**: `freeTrial`フィールドが存在せず、`freePlan`(boolean/'limited'/'unknown')のみで「無料プランあり」と「無料トライアル（期間限定）」を区別できない設計。DreamStudio（AUD-01）はこの設計上の弱さが誤表記の一因。
4. **true/falseで表現しきれない項目**: `commercialUse`はenum5値だが、「プランにより異なる」と「用途（人物・ロゴ等）により異なる」が`limited`一値に集約され、詳細は別フィールド`usagePolicy.commercialUseByPlan`に依存する二層構造（29件全部で後者が埋まっているかは未確認）。
5. **unknownとfalseの混同**: DreamStudio（AUD-21）、Clipdrop（AUD-10）で、DB上は`false`（非対応確定）なのに一部ファイルが`unknown`扱いにする逆方向の混同も確認。
6. **japaneseUi/japanesePromptの定義不足**: tri-state（boolean/'partial'/'unknown'）は型として明確だが、「partial」の判定基準がスキーマにコメントされておらず（AUD-44）、担当者依存になり得る。
7. **commercialUseの粒度不足**: Leonardo AI（AUD-02）のように規約改定で条件が変わった場合、note文言の手動更新に依存し、関連ページへの反映が保証されない。
8. **更新日・出典URL不足**: `verifiedAt`/`officialSourceUrl`自体は29/29件で充足済み（良好）。ただし個別フィールドレベルの出典（例: japanBilling.pricingUrl vs 実際参照したブログURL）にズレがある例あり（AUD-22）。
9. **記事側に直書きされている値**: `src/pages/categories/{avatar-video,design,video-editing,voice-narration}/index.astro`（4件）と`src/pages/comparisons/*`（サンプル調査で全件）が`getCollection`不使用でハードコード。DB更新の反映漏れの根本原因（AUD-01, 06, 07, 08, 15, 16, 20, 25, 30, 32, 35, 36など多数がここに起因）。
10. **DBから自動表示すべき値**: 上記4カテゴリページ・比較記事群の価格・機能テーブルはDB(`getCollection('tools')`)から動的生成する設計に寄せるべき。

## 8. 推奨修正順序

### P0（最優先・一次情報確認後に即修正）
- AUD-01（DreamStudio無料プラン誤表記）: **記事側を修正**（DB側が正しい可能性が高いが、DBの"limited"の定義自体も再確認推奨）

### P1
- AUD-02（Leonardo AI商用利用、記事側古い可能性）: 一次情報確認後、**記事側を修正**
- AUD-03（Pika DB内部矛盾）: **DB側を修正**（一次情報で確定要）
- AUD-04（Pika Pikaframes矛盾）: 一次情報確認後、**DB・記事の両方**を確定情報に合わせる
- AUD-05（Pika無料クレジット数）: 一次情報確認が最優先。確定後**DB→記事へ一括反映**
- AUD-06（Synthesiaカテゴリ一覧）: **記事側を修正**
- AUD-07（HeyGen日本語UI誤表記）: **記事側を修正**（DBのunknownが正）
- AUD-08（Canva AI旧USD表記）: **記事側を修正**

### P2
- 各カテゴリページ・ツールページの「要確認」プレースホルダーの棚卸し（AUD-09〜21のうち大半）: **記事側をDB確定値に合わせて更新**
- Canva AI FAQ欠落（AUD-17）・オーファンコンポーネント（AUD-18）: **記事側修正／コンポーネント削除検討**
- Kling AI運営国表記（AUD-19）: 一次情報確認後、**記事側を修正**

### P3
- 表記ゆれ統一（AUD-33, 37, 39など）: **記事側を表記統一**
- スキーマのコメント整備・オーファンコンポーネント削除・粒度統一等の設計改善: **DB設計/運用ルール側の改善**

## 9. 次回修正用の作業単位

- **Task 1: P0の一次情報確認** — DreamStudioの無料Trial条件を公式サイトで再確認（AUD-01）
- **Task 2: P0の修正** — 確認後、4ファイルの無料プラン表記を統一
- **Task 3: ツール名・会社名の表記統一** — AUD-33, 37, 39, 横断表記ゆれ表（第6章）に基づき一括修正
- **Task 4: 料金情報の整合** — AUD-05, 08, 14, 16の料金関連未反映を一次情報確認の上、記事へ反映
- **Task 5: 商用利用・権利情報の整合** — AUD-02, 04, 06, 19の商用利用・権利条件を一次情報確認の上、DB/記事を統一
- **Task 6: 日本語対応等の定義整理** — AUD-09〜13, 20, 21, 25〜27を対象に、japaneseUi/japanesePromptの定義をスキーマに明文化した上で表記統一
- **Task 7: DBフィールド追加** — `freeTrial`フィールドの新設検討、`usagePolicy.commercialUseByPlan`の29件充足状況確認
- **Task 8: 記事直書き値のDB参照化** — カテゴリページ4件（avatar-video, design, video-editing, voice-narration）と比較記事群を`getCollection('tools')`ベースに段階的移行
- **Task 9: 全体再監査** — Task 1〜8完了後、本監査を再実施し残存件数を確認

## 検証結果

- DB登録ツール数（29）とツール別監査結果数（29）は一致 ✅
- 全ツールが監査済み ✅
- 検出件数（44）と分類別件数合計（3+9+0+9+1+7+7+8=44）は一致 ✅
- 重要度合計（1+7+13+23=44）も一致 ✅
- 全件一覧（AUD-01〜AUD-44）に重複IDなし ✅
- 全行にファイルパスを記載、行番号は判明分すべて記載（横断的な構造課題など行番号がなじまない項目は「-」表記） ✅
- node_modules、dist、バックアップファイル（.bak、zipファイル等）は調査対象・結果に含めていない ✅
- コード変更は発生していない（全エージェント読み取り専用） ✅
- 本報告書以外のファイルは変更していない ✅
