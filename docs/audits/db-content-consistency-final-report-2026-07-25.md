# AIクリエイティブDB DB・コンテンツ整合性監査 最終報告書

## 1. 監査概要

- **監査対象**: AIクリエイティブDB（aicreative-db.com）全ツールページ・カテゴリページ・比較記事・ガイド記事・共通コンポーネント・content collection
- **監査期間**: 2026-07-24（監査実施・報告書作成）〜2026-07-25（AUD-34〜44対応完了・本報告書作成）
- **対象ツール数**: 29ツール
- **対象AUD数**: 44件（AUD-01〜AUD-44）
- **対象ページ数**: build時点で92ページ
- **正本DB**: `src/content/tools/*.md`（各ツールのcontent collectionエントリ）、`src/content/config.ts`（スキーマ定義）
- **監査目的**: DB（正本）と各種表示面（ツール詳細ページ、カテゴリ一覧、比較記事、ガイド、FAQ、共通コンポーネント）との間の値の不一致・矛盾・古い情報・構造的リスクを洗い出し、事実誤りを是正すること
- **最終commit**: `73499aa` Fix resolved DB consistency issues AUD-34 to AUD-44
- **最終build結果**: 92ページ生成、error 0（2026-07-25時点で`npm run build`再実行し確認済み）

## 2. 最終結論

- 監査対象AUD-01〜44の全44件について判定が完了した。
- 通常修正が必要と判断した42件（FIXED 35件・NO_CHANGE 7件として判定確定）について対応が完了している。
- 単体修正が適切でないと判断した2件（AUD-21, AUD-40）はHOLDとして保留し、今回は着手していない。
- Git状態は`origin/master`と完全同期済み（`73499aa`がpush済み、`rev-list --left-right --count origin/master...HEAD` = `0 0`）であり、本番反映の前提となる状態にある。
- サイト全体としては、監査で発見された既知の不一致・矛盾については是正済みだが、AUD-21（日本語UI対応の型設計上の構造課題）とAUD-40（Kling AI動画透かし表記の現物未確認）という2件の未解決課題が残る。「完全に問題がない」状態ではなく、既知の残存課題を認識した上での本番反映可能状態と位置づける。

## 3. 判定集計

| 判定 | 件数 | 割合 |
|---|---:|---:|
| FIXED | 35 | 79.5% |
| NO_CHANGE | 7 | 15.9% |
| HOLD | 2 | 4.6% |
| OUT_OF_SCOPE | 0 | 0.0% |
| 合計 | 44 | 100% |

## 4. 重要度別集計

| 重要度 | 件数 | FIXED | NO_CHANGE | HOLD |
|---|---:|---:|---:|---:|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 7 | 7 | 0 | 0 |
| P2 | 13 | 12 | 0 | 1 |
| P3 | 23 | 15 | 7 | 1 |
| 合計 | 44 | 35 | 7 | 2 |

P2のHOLDはAUD-21、P3のHOLDはAUD-40。

## 5. 不一致分類別集計

| 不一致分類 | 件数 | 主なAUD |
|---|---:|---|
| ハードコード未反映（カテゴリ一覧等が正本DB値を反映していない） | 11 | AUD-01, 06, 07, 14, 15, 16, 20, 25, 32, 35, 36 |
| 表記ゆれ | 8 | AUD-09, 11, 27, 30, 33, 37, 38, 39 |
| 料金更新漏れ | 4 | AUD-05, 08, 14, 34 |
| DB内部矛盾 | 3 | AUD-03, 04, 22 |
| 日本語対応区分の混同（UI/プロンプト/音声言語数） | 4 | AUD-10, 13, 21, 29 |
| 会社情報（開発元/運営法人の混同・表記粒度） | 2 | AUD-19, 23 |
| オーファンファイル | 3 | AUD-18, 26, 31 |
| URL不一致 | 1 | AUD-12 |
| FAQ未反映 | 2 | AUD-13, 17 |
| 構造的制約（スキーマ・専用ページ構造） | 4 | AUD-21, 24, 42, 43 |
| NO_CHANGE相当の設計差 | 2 | AUD-28, 41 |
| 商用利用表記 | 1 | AUD-02 |
| 根拠ドキュメント不足 | 1 | AUD-44 |
| 断定不可（現物確認要） | 1 | AUD-40 |

※分類は重複可能な観点のため、件数合計は44を超える。

## 6. AUD別最終一覧

| AUD | 重要度 | 対象 | 項目 | 判定 | 主な対応 | commit |
|---|---|---|---|---|---|---|
| AUD-01 | P0 | DreamStudio | freePlan（無料プラン表記） | FIXED | カテゴリ一覧・共通コンポーネント4ファイルを「Trial 1000クレジット（使い切り）」に統一 | ec782e1 |
| AUD-02 | P1 | Leonardo AI | commercialUse系note | FIXED | 商用利用条件の説明文を規約改定後の内容に修正（11ファイル） | fa9b7d5 |
| AUD-03 | P1 | Pika | notBestFor/maxVideoDuration矛盾 | FIXED | DB内部矛盾を解消、動画長セクション新設 | 76d362f |
| AUD-04 | P1 | Pika | features.videoExtend | FIXED | false→true（Pikaframes提供継続を確認） | 76d362f |
| AUD-05 | P1 | Pika | 無料プランクレジット数 | FIXED | 「公式に明記なし」→「月80クレジット」に更新 | 76d362f |
| AUD-06 | P1 | Synthesia | freePlan/commercialUse/japaneseUi | FIXED | カテゴリ一覧の未反映を解消 | 79bc9f1 |
| AUD-07 | P1 | HeyGen | japaneseUi | FIXED | 誤って対応済みと断定していた表記を是正 | a4f643e |
| AUD-08 | P1 | Canva AI画像生成 | 料金（通貨表記） | FIXED | 旧USD表記を日本円表記に更新 | 2bbac06 |
| AUD-09 | P2 | Tensor.Art | japanesePrompt | FIXED | true→partial | edbc8ea |
| AUD-10 | P2 | Clipdrop | japanesePrompt | FIXED | 公式FAQ確認の上、表記を是正 | 013aed9 |
| AUD-11 | P2 | NightCafe | japanesePrompt | FIXED | true→partial | 85edd1e |
| AUD-12 | P2 | Vidu AI | usagePolicy.termsUrl | FIXED | リンク切れURLを正URLに修正 | 58f56a0 |
| AUD-13 | P2 | PixVerse | japaneseUi（ガイドFAQ欠落） | FIXED | ガイド記事にFAQ追加 | bb094ba |
| AUD-14 | P2 | Luma AI | paidPlanNote（料金） | FIXED | 公式pricing確認の上、上位プラン価格を反映 | 6b30aa5 |
| AUD-15 | P2 | InVideo AI | commercialUse | FIXED | カテゴリ一覧の未反映を解消 | 6b30aa5 |
| AUD-16 | P2 | Hailuo AI | commercialUse/freePlan/lowestPaidPlan | FIXED | カテゴリ一覧の未反映を解消 | 6b30aa5 |
| AUD-17 | P2 | Canva AI画像生成 | faqs（1件欠落） | FIXED | ツール詳細ページにFAQ追加 | 6b30aa5 |
| AUD-18 | P2 | 構造（Canva AI） | オーファンコンポーネント | FIXED（削除） | `CanvaAiTool.astro`削除（参照0件確認済み） | 6b30aa5 |
| AUD-19 | P2 | Kling AI | japanBilling.providerCountry | FIXED | 開発元と運営法人の混同を是正 | 0e71884 |
| AUD-20 | P2 | Playground AI | japaneseUi | FIXED | カテゴリ一覧の未反映を解消 | 0e71884 |
| AUD-21 | P2 | DreamStudio／構造 | japaneseUi表記不一致 | **HOLD** | 型設計課題のため見送り（詳細12章） | なし |
| AUD-22 | P3 | NightCafe | japanBilling.pricingUrl | FIXED | DB内部矛盾のURLを実在URLに修正 | 0e71884 |
| AUD-23 | P3 | CapCut AI | japanBilling.providerCountry表記粒度 | NO_CHANGE | 事実誤りではなく粒度差のため見送り | なし |
| AUD-24 | P3 | Runway | japanesePrompt判定根拠 | NO_CHANGE | 根拠は本文に既存、専用フィールド化は見送り | なし |
| AUD-25 | P3 | Vidu AI | japaneseUi | FIXED | カテゴリ一覧の未反映を解消 | c1183af |
| AUD-26 | P3 | PixVerse | 日本語対応3区分ガイド未掲載 | FIXED | ガイドへの掲載を追加 | c1183af |
| AUD-27 | P3 | PixVerse | japanesePrompt記号不統一 | FIXED | 表示記号を統一 | c1183af |
| AUD-28 | P3 | Luma AI | ライセンス条件URL | NO_CHANGE | 出典URLフィールド追加はスキーマ変更に該当するため見送り | なし |
| AUD-29 | P3 | D-ID | japanesePrompt（比較記事の言語数混同） | FIXED | UI/プロンプト/音声言語数の混同を是正 | 34e12e2 |
| AUD-30 | P3 | DALL·E | lastReviewed日付ズレ | FIXED | 更新日不一致を是正 | 34e12e2 |
| AUD-31 | P3 | 構造（Microsoft Designer） | オーファンコンポーネント | FIXED（削除） | `MicrosoftDesignerTool.astro`削除 | 34e12e2 |
| AUD-32 | P3 | Microsoft Designer | commercialUse | FIXED | カテゴリ一覧の未反映を解消 | 34e12e2 |
| AUD-33 | P3 | Canva AI画像生成 | name表記ゆれ | FIXED | 表記統一 | 34e12e2 |
| AUD-34 | P3 | HeyGen | lowestPaidPlan未反映 | FIXED | ツール詳細ページに反映 | 73499aa |
| AUD-35 | P3 | Playground AI | commercialUse | FIXED | カテゴリ一覧の未反映を解消 | 73499aa |
| AUD-36 | P3 | SeaArt AI | freePlan（曖昧表現） | FIXED | カテゴリ一覧の曖昧表現を是正 | 73499aa |
| AUD-37 | P3 | DreamStudio | 名称表記ゆれ（旧名/新名） | NO_CHANGE | 大半解消済み、残る短縮表記はリスト内統一を優先し見送り | なし |
| AUD-38 | P3 | Gemini画像生成 | freePlanバッジ粒度不統一 | FIXED | 表示記号を統一 | 73499aa |
| AUD-39 | P3 | DALL·E | ハイフン表記残存 | FIXED | 30箇所を中点表記「DALL·E」に統一 | 73499aa |
| AUD-40 | P3 | Kling AI | 透かし文字列表記 | **HOLD** | 現物動画確認が必要なため見送り（詳細12章） | なし |
| AUD-41 | P3 | 構造（全般） | カテゴリページ一律「要確認」表示 | NO_CHANGE | 監査報告書自身が対応不要（記録のみ）と明記 | なし |
| AUD-42 | P3 | 構造（専用ページ） | md本文非表示構造リスク | NO_CHANGE | 個別発現例(AUD-34,38)は対症療法済み、構造自体は運用ルールで継続対応 | なし |
| AUD-43 | P3 | 構造（Gemini画像生成） | 専用ページ構造リスク | NO_CHANGE | AUD-42と同一構造課題、AUD-38でデータ乖離自体は解消済み | なし |
| AUD-44 | P3 | 全般（スキーマ） | config.ts triStateSchema定義コメント不足 | FIXED | partial定義の説明コメントを追加（型自体は無変更） | 73499aa |

## 7. 対象ツール別対応状況

| ツール | AUD | 主な対象 | 最終状態 |
|---|---|---|---|
| DreamStudio | AUD-01, 21, 37 | freePlan表記／japaneseUi型課題／名称表記 | FIXED 1・HOLD 1・NO_CHANGE 1 |
| Leonardo AI | AUD-02 | 商用利用note | FIXED |
| Pika | AUD-03, 04, 05 | DB内部矛盾／videoExtend／無料クレジット | FIXED 3 |
| Synthesia | AUD-06 | カテゴリ一覧未反映 | FIXED |
| HeyGen | AUD-07, 34 | japaneseUi／lowestPaidPlan | FIXED 2 |
| Canva AI画像生成 | AUD-08, 17, 18, 33 | 料金表記／FAQ／オーファンコンポーネント／name表記 | FIXED 4 |
| Tensor.Art | AUD-09 | japanesePrompt | FIXED |
| Clipdrop | AUD-10 | japanesePrompt | FIXED |
| NightCafe | AUD-11, 22 | japanesePrompt／pricingUrl矛盾 | FIXED 2 |
| Vidu AI | AUD-12, 25 | termsUrl／japaneseUi | FIXED 2 |
| PixVerse | AUD-13, 26, 27 | FAQ／3区分ガイド／記号統一 | FIXED 3 |
| Luma AI | AUD-14, 28 | 料金反映／ライセンスURL | FIXED 1・NO_CHANGE 1 |
| InVideo AI | AUD-15 | commercialUse | FIXED |
| Hailuo AI | AUD-16 | commercialUse/freePlan/lowestPaidPlan | FIXED |
| Kling AI | AUD-19, 40 | providerCountry／透かし表記 | FIXED 1・HOLD 1 |
| Playground AI | AUD-20, 35 | japaneseUi／commercialUse | FIXED 2 |
| CapCut AI | AUD-23 | providerCountry表記粒度 | NO_CHANGE |
| Runway | AUD-24 | japanesePrompt判定根拠 | NO_CHANGE |
| D-ID | AUD-29 | 言語数混同 | FIXED |
| DALL·E | AUD-30, 39 | lastReviewed／ハイフン表記 | FIXED 2 |
| Microsoft Designer | AUD-31, 32 | オーファンコンポーネント／commercialUse | FIXED 2 |
| SeaArt AI | AUD-36 | freePlan曖昧表現 | FIXED |
| Gemini画像生成 | AUD-38, 43 | freePlanバッジ／専用ページ構造リスク | FIXED 1・NO_CHANGE 1 |
| 全般／構造課題 | AUD-41, 42, 44 | 一律要確認表示／md非表示構造／スキーマコメント | NO_CHANGE 2・FIXED 1 |

## 8. DB変更一覧

| AUD | DBファイル | フィールド | 修正前 | 修正後 |
|---|---|---|---|---|
| AUD-03 | src/content/tools/pika.md | features.maxVideoDuration / notBestFor | 内部矛盾の記述 | 統一済みの記述 |
| AUD-04 | src/content/tools/pika.md | features.videoExtend | false | true |
| AUD-05 | src/content/tools/pika.md | freePlanNote / pricingDecision.freePlanLimitNote | 「公式に明記なし」 | 「毎月80クレジット（2026-07-24公式確認）」 |
| AUD-09 | src/content/tools/tensor-art.md | japanesePrompt | true | "partial" |
| AUD-11 | src/content/tools/nightcafe.md | japanesePrompt | true | "partial" |
| AUD-12 | src/content/tools/vidu-ai.md | usagePolicy.lastReviewed | 2026-06-15 | 2026-07-25 |
| AUD-22 | src/content/tools/nightcafe.md | pricingSourceUrl / pricingSourceNote | ブログURL | https://creator.nightcafe.studio/pricing |
| AUD-44 | src/content/config.ts | triStateSchema（コメント） | 定義コメントなし | partial定義の説明コメント追加（型自体は無変更） |

上記以外のAUDはページ・記事側のみの修正、またはNO_CHANGE/HOLDでDB変更なし。

## 9. ページ・コンポーネント変更一覧

| 種類 | ファイル | 対応AUD | 内容 |
|---|---|---|---|
| ツール詳細ページ | src/pages/tools/leonardo-ai/index.astro | AUD-02 | 商用利用note修正 |
| ツール詳細ページ | src/pages/tools/pika/index.astro | AUD-04, 05 | videoExtend／クレジット数反映 |
| ツール詳細ページ | src/pages/tools/clipdrop/index.astro, playground-ai/index.astro | AUD-10 | japanesePrompt表記是正 |
| ツール詳細ページ | src/pages/tools/vidu-ai/index.astro | AUD-12 | termsUrl修正反映 |
| ツール詳細ページ | src/pages/tools/luma-ai/index.astro | AUD-14 | paidPlanNote反映 |
| ツール詳細ページ | src/pages/tools/canva-ai-image-generator/index.astro | AUD-17 | FAQ追加 |
| ツール詳細ページ | src/pages/tools/kling-ai/index.astro | AUD-19 | providerCountry是正 |
| ツール詳細ページ | src/pages/tools/heygen/index.astro | AUD-34 | lowestPaidPlan反映 |
| ツール詳細ページ | src/pages/tools/gemini-image-generation/index.astro | AUD-38 | freePlanバッジ統一 |
| ツール詳細ページ | src/pages/tools/nightcafe/index.astro | AUD-39 | ハイフン表記統一 |
| カテゴリページ | src/pages/categories/image-generation/index.astro | AUD-01, 08, 20, 30, 32, 35, 36 | 各種未反映値の是正 |
| カテゴリページ | src/pages/categories/avatar-video/index.astro | AUD-06, 07 | freePlan/commercialUse/japaneseUi反映 |
| カテゴリページ | src/pages/categories/video-generation/index.astro | AUD-15, 16, 25 | commercialUse/freePlan/lowestPaidPlan/japaneseUi反映 |
| 比較記事 | src/pages/comparisons/midjourney-vs-leonardo-ai/index.astro, free-ai-image-generators/index.astro | AUD-02 | 商用利用note修正 |
| 比較記事 | src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro | AUD-08, 33 | 料金／name表記修正 |
| 比較記事 | src/pages/comparisons/avatar-video-ai-tools/index.astro | AUD-29 | 言語数混同是正 |
| ガイド | src/content/guides/commercial-use-cost-comparison.md ＋対応pages | AUD-02, 08, 12, 39 | 商用利用note／料金／URL／ハイフン表記 |
| ガイド | src/content/guides/free-ai-image-tools.md, japanese-ai-image-tools.md | AUD-02 | 商用利用note修正 |
| ガイド | src/pages/guides/video-generation-credit-cost-comparison/index.astro | AUD-13 | FAQ追加 |
| ガイド | src/pages/guides/japanese-support-three-types/index.astro | AUD-26 | 3区分ガイドへの掲載追加 |
| FAQ | canva-ai-image-generator/index.astro, video-generation-credit-cost-comparison/index.astro | AUD-13, 17 | FAQ追加 |
| 共通コンポーネント | src/components/Free.astro, JapaneseAiToolsGuide.astro, WatermarkCreditGuide.astro | AUD-01 | freePlan表記統一 |
| 共通コンポーネント | src/components/CommercialUseCopyright.astro, FreeAiImageTools.astro | AUD-02 | 商用利用note修正 |
| 共通コンポーネント | src/components/Japanese.astro, JapaneseAiToolsGuide.astro | AUD-09, 11, 27 | japanesePrompt表記統一 |
| config | src/content/config.ts | AUD-44 | triStateSchemaコメント追加 |
| 削除ファイル | src/components/CanvaAiTool.astro | AUD-18 | オーファンコンポーネント削除 |
| 削除ファイル | src/components/MicrosoftDesignerTool.astro | AUD-31 | オーファンコンポーネント削除 |

## 10. 削除したオーファンファイル

| ファイル | AUD | 参照件数 | 代替実装 | build影響 |
|---|---|---:|---|---|
| src/components/CanvaAiTool.astro | AUD-18 | 0（削除前に全文検索で確認） | 専用astroページ（tools/canva-ai-image-generator/index.astro）で代替済み | 削除後92ページ生成・error 0を確認済み |
| src/components/MicrosoftDesignerTool.astro | AUD-31 | 0（削除前に全文検索で確認） | 専用astroページ（tools/microsoft-designer/index.astro相当）で代替済み | 削除後92ページ生成・error 0を確認済み |

**残存確認（2026-07-25本報告書作成時に実ファイル確認）**: 元監査が言及した以下3件のオーファンコンポーネント候補は、今回のAUD-01〜44対応スコープには含まれておらず、現時点でファイルとして存在していることを確認した。
- `src/components/LeonardoAiTool.astro`
- `src/components/MidjourneyTool.astro`
- `src/components/TdpToolPage.astro`

これらは今回のバッチ対象外であり、次回監査または個別タスクでの参照有無確認・削除要否判断が必要（15章「今後の再発防止策」および16章「次に行う作業」に反映）。

## 11. NO_CHANGE項目

**AUD-23（CapCut AI／japanBilling.providerCountry表記粒度）**
- 監査指摘: 運営国の表記が他ツールと粒度が異なる
- 調査結果: 事実誤りではなく、括弧書き併記の粒度差であることを確認
- 修正しなかった理由: 同種の粒度差が他8ツールにも存在し、CapCut AI単体を直すと逆に一貫性を欠く。統一には29ツール横断のガイドライン整備が必要
- 将来見直す条件: 運営国表記フォーマットの統一ガイドライン策定時に横断対応

**AUD-24（Runway／japanesePrompt判定根拠）**
- 監査指摘: 判定根拠が専用フィールドとして構造化されていない
- 調査結果: 根拠自体は本文中に既に記載されている
- 修正しなかった理由: 根拠専用フィールド化にはconfig.tsのスキーマ変更が必要で、今回のバッチ作業ルール（大規模スキーマ変更禁止）に抵触
- 将来見直す条件: スキーマ拡張を伴う構造改善タスクとして別途計画

**AUD-28（Luma AI／ライセンス条件URL）**
- 監査指摘: DB未記載のライセンスURLが記事側にのみ存在
- 調査結果: URL自体は実在確認済み（lumalabs.ai/learning-hub/licensing）
- 修正しなかった理由: 複数出典URL管理用のフィールドがDBスキーマに存在せず、追加はスキーマ変更に該当するため見送り
- 将来見直す条件: usagePolicy配下に出典URL管理フィールドを追加する構造改善時

**AUD-37（DreamStudio／名称表記ゆれ）**
- 監査指摘: 旧名/新名の表記ゆれ
- 調査結果: 大半は既に解消済みで、残るのはサイドバー等の短縮表記のみ
- 修正しなかった理由: 同一リスト内での表記統一を優先すべきであり、単独修正は逆に不統一を招く
- 将来見直す条件: サイドバー表記ルールを横断的に見直す際に合わせて対応

**AUD-41（全般／カテゴリページ一律「要確認」表示）**
- 監査指摘: 複数ツールでカテゴリページの表示が一律「要確認」になっている
- 調査結果: 意図的な保守的表示であることを確認
- 修正しなかった理由: 監査報告書自身が「対応不要（記録のみ）」と明記している
- 将来見直す条件: 該当ツールの一次情報確認が進み次第、都度更新

**AUD-42（全般／専用astroページのmd本文非表示構造リスク）**
- 監査指摘: 専用astroページ化されたツールはmd本文の更新が表示に反映されない構造リスクがある
- 調査結果: 個別発現例（AUD-34, AUD-38）は対症療法的に修正済み
- 修正しなかった理由: 構造自体（props手動指定方式）を変更するには専用ページ実装の見直しが必要で、今回のスコープ外
- 将来見直す条件: 専用ページとmd正本の責任分担を再設計する構造改善タスク時

**AUD-43（Gemini画像生成／専用ページ構造リスク）**
- 監査指摘: AUD-42と同一の構造リスクがGemini画像生成の専用ページにも存在
- 調査結果: AUD-38でデータ乖離自体は解消済み
- 修正しなかった理由: 構造自体はAUD-42と共通の課題であり、個別対応では解決しない
- 将来見直す条件: AUD-42と同時に構造改善

## 12. HOLD項目

### AUD-21

- **対象**: DreamStudioの`japaneseUi: false`表示と、`Japanese.astro`コンポーネントの`JaStatus`型
- **現在の問題**: `JaStatus`型が`'ok' | 'partial' | 'unknown'`の3値のみで、「非対応（false）」という状態を表現できない。このためDreamStudioの`japaneseUi: false`（非対応確定）が一律「unknown（要確認）」として表示されてしまう
- **単体修正できない理由**: DreamStudio1件のみを直しても解決せず、`japaneseUi: false`が確定している他ツール（Haiper, Leonardo AI, Kling AI, Luma AI, NightCafe, Midjourney, Pika, InVideo AI, Runway, Stable Diffusion, Tensor.Art等）にも同じ構造的欠陥が及ぶため、29ツール全件の棚卸しと型定義変更が同時に必要になる
- **影響範囲**: `Japanese.astro`を参照する全ページの日本語対応表示箇所（型、マッピング、表示記号、関連ガイド記事を含む）
- **必要な将来作業**: `JaStatus`型への非対応状態の追加、29ツール全件のja値棚卸し、型・マッピング・表示記号・ガイド記述の統一
- **推奨優先度**: P2相当（実害は「非対応」が「要確認」寄りに表示される程度で、誤って「対応」と表示されるわけではないため緊急性は中程度）
- **完了条件**: 型定義変更後、29ツール全件でja表示値とDB正本値が一致することを確認し、関連ガイド記事の記述も統一されること

### AUD-40

- **対象**: Kling AIの生成動画サンプルにおける透かし文字列表記（`generatedVideos.ts`のusageNoteと`model`フィールド、および比較記事本文）
- **現在の問題**: usageNote・比較記事側は「KlingAI 3.0」（スペースなし、バージョン3.0）、`model`フィールドは「Kling AI 2.0」（スペースあり、バージョン2.0）と、スペースの有無・バージョン番号の両方が食い違っている
- **model/version差**: 製品内バージョン表記そのものである可能性と、単純な表記ゆれである可能性の両方が考えられ、テキスト情報だけでは確定できない
- **テキスト情報だけでは確定不能な理由**: 実際に動画フレーム内に写り込む透かし文字列を確認する必要があるが、WebFetch等のテキストベースツールでは動画コンテンツの実像を確認できない
- **動画現物の目視検証が必要**: Kling AIで実際に動画を生成し、透かしフレームを目視確認する作業が必要
- **検証条件**: 現物動画の透かし部分を目視確認し、正確なバージョン番号・スペース有無を特定すること
- **完了条件**: 現物確認結果に基づき、usageNote・model両フィールドおよび比較記事本文の表記を一致させること

## 13. 一次情報確認状況

| AUD | 公式情報 | 確認日 | 確認内容 | 結果 |
|---|---|---|---|---|
| AUD-02 | leonardo.ai利用規約 | 2026-07-24 | 商用利用条件の規約改定内容 | DB自体は既にverifiedAt 2026-06-15で正しく、記事側のみ是正 |
| AUD-03〜05 | pika.art/pricing | 2026-07-24 | 動画長・Pikaframes対応・無料クレジット数 | 新規確認、DB反映 |
| AUD-06 | Synthesia公式pricing | 2026-07-24 | freePlan/commercialUse/japaneseUi | 新規確認 |
| AUD-07 | HeyGen公式ヘルプ・製品概要 | 2026-07-24 | japaneseUi対応状況 | 新規確認 |
| AUD-08 | Canva公式pricing | 2026-07-24 | 料金（JS依存でWebFetch不可、既存の日本課金監査確認済み値を採用） | 既存DB確認情報の再利用 |
| AUD-09 | Tensor.Art（二次情報ベース） | 2026-07-25 | japanesePrompt実態 | 公式明示なし、二次情報で実務的判断 |
| AUD-10 | Clipdrop公式FAQ | 2026-07-25 | 「English text」明記 | 新規確認 |
| AUD-11 | NightCafe公式FAQ（二次情報含む） | 2026-07-25 | japanesePrompt実態 | 公式明示なし、実務的判断 |
| AUD-12 | Vidu AI利用規約URL | 2026-07-25 | URL到達性（200/404） | 新規確認 |
| AUD-13 | pixverse.ai/ja等 | 2026-07-25 | japaneseUi対応状況 | 新規確認 |
| AUD-14 | lumalabs.ai/pricing | 2026-07-25 | 上位プラン価格 | 新規確認 |
| AUD-15, 16, 17, 20 | — | — | — | 既存DB確認済み情報の再利用（新規確認なし） |
| AUD-19 | Kling AI公式（WebSearchのみ、公式サイト本体はHTTP 446でWebFetch不可） | 2026-07-25 | providerCountry | 二次情報ベース、完全な一次情報確認には至らず |
| AUD-22 | creator.nightcafe.studio/pricing | 2026-07-25 | URL実在確認 | 新規確認 |
| AUD-28 | lumalabs.ai/learning-hub/licensing | 2026-07-25 | URL実在確認 | 新規確認 |
| AUD-21 | Japanese.astro実装確認 | 2026-07-25 | 監査記載のファイル名誤り（Free.astro→実際はJapanese.astro）を発見 | 新規確認（構造調査） |
| AUD-40 | — | — | 動画現物の目視確認は未実施 | 未実施（HOLD理由） |

上記以外のAUDは、DB既確認済み情報の流用、または一次情報確認が不要（表記統一・URL修正のみ等）と判断したもの。

## 14. Git・build実績

- **主要commit一覧**: AUD-01〜13は個別commit、AUD-14以降はバッチcommit
- **push完了状況**: 全commit push済み。最終commit`73499aa`もpush済み
- **最終commit**: `73499aa`
- **rev-list**: `git rev-list --left-right --count origin/master...HEAD` = `0 0`
- **working tree**: clean（追跡ファイルに未コミット変更なし）
- **未追跡ファイル**: ZIP 7件（GSCエクスポート等）、`prod_check.html`（いずれも監査対応と無関係、commit対象外）
- **最終build結果**: 92ページ生成、error 0（2026-07-25、本報告書作成時に`npm run build`を再実行し確認済み）、warningなし

### commit表

| 範囲 | commit | 内容 | push |
|---|---|---|---|
| AUD-01 | ec782e1 | Fix DreamStudio free plan labeling | 済 |
| AUD-02 | fa9b7d5 | Fix Leonardo AI commercial use terms | 済 |
| AUD-03〜05 | 76d362f | Fix Pika duration and free credit data | 済 |
| AUD-06 | 79bc9f1 | Fix Synthesia category data | 済 |
| AUD-07 | a4f643e | Fix HeyGen Japanese UI labeling | 済 |
| AUD-08 | 2bbac06 | Fix outdated Canva AI pricing | 済 |
| AUD-09 | edbc8ea | Fix Tensor.Art japanesePrompt inconsistency | 済 |
| AUD-10 | 013aed9 | Fix Clipdrop japanesePrompt labeling | 済 |
| AUD-11 | 85edd1e | Fix NightCafe japanesePrompt inconsistency | 済 |
| AUD-12 | 58f56a0 | Fix Vidu AI terms URL | 済 |
| AUD-13 | bb094ba | Fix PixVerse Japanese UI coverage | 済 |
| AUD-14〜18 | 6b30aa5 | Fix DB consistency issues AUD-14 to AUD-18（10ファイル変更） | 済 |
| AUD-19〜23 | 0e71884 | Fix resolved DB consistency issues AUD-19 to AUD-23（9ファイル変更） | 済 |
| AUD-24〜28 | c1183af | Fix resolved DB consistency issues AUD-24 to AUD-28（9ファイル変更） | 済 |
| AUD-29〜33 | 34e12e2 | Fix DB consistency issues AUD-29 to AUD-33（10ファイル変更） | 済 |
| AUD-34〜44 | 73499aa | Fix resolved DB consistency issues AUD-34 to AUD-44（20ファイル変更） | 済 |

## 15. 再発防止策

1. **正本DBの値を専用ページでも参照する**
   - 問題: 専用astroページ（AUD-42, 43）はprops手動指定のため、md正本を更新してもページに反映されない
   - 対策: 専用ページの表示値をDB正本から動的取得する仕組みに置き換える、または更新時のチェックリストを整備する
   - 優先度: 中
   - 実装規模: 中〜大（専用ページ実装の見直しが必要）

2. **カテゴリ一覧のハードコード削減**
   - 問題: カテゴリページの一覧表示が個別にハードコードされ、DB値変更が反映されない（AUD-01, 06, 07, 15, 16, 20, 25, 32, 35, 36が該当）
   - 対策: カテゴリ一覧をDB正本から自動生成する構造に変更
   - 優先度: 高
   - 実装規模: 大

3. **FAQとDBの同期ルール**
   - 問題: FAQ欠落が複数箇所で発生（AUD-13, 17）
   - 対策: FAQ追加・変更時のレビューチェックリストにDB側FAQフィールドとの照合を追加
   - 優先度: 中
   - 実装規模: 小

4. **料金・商用利用・日本語対応の更新日管理**
   - 問題: 料金更新漏れ（AUD-05, 08, 14, 34）、商用利用表記の陳腐化（AUD-02）
   - 対策: `lastReviewed`等の確認日フィールドを持つ項目について、一定期間経過後にアラートを出す定期棚卸しフローを設ける
   - 優先度: 高
   - 実装規模: 中

5. **`unknown`、`false`、`partial`の明確な表示規則**
   - 問題: AUD-21の`JaStatus`型が3値のみで「非対応」を表現できず、29ツールに影響
   - 対策: 型に非対応状態を追加し、DB値と表示値のマッピング表をドキュメント化する
   - 優先度: 高
   - 実装規模: 中（スキーマ変更＋29ツール棚卸し）

6. **専用astroページとmd正本の責任分担**
   - 問題: 専用ページ化により正本と表示が分離するリスク（AUD-42, 43）
   - 対策: 専用ページ化するツールの基準と更新責任を明文化し、更新時は必ず両方を確認するルールを設ける
   - 優先度: 中
   - 実装規模: 小（ルール整備のみであれば）

7. **未使用コンポーネント検出**
   - 問題: オーファンコンポーネントが複数残存（今回削除2件、未着手3件: LeonardoAiTool.astro, MidjourneyTool.astro, TdpToolPage.astro）
   - 対策: 未参照コンポーネントを検出する仕組み（ビルド時チェックまたは定期スクリプト）を導入
   - 優先度: 中
   - 実装規模: 小〜中

8. **CIでの整合性検査**
   - 問題: DBとページの不一致が手動監査でのみ発見されている
   - 対策: DB正本値とページ表示値の主要フィールド（料金・商用利用・日本語対応等）を突合するCIチェックを追加
   - 優先度: 高
   - 実装規模: 大

9. **公式URL到達チェック**
   - 問題: リンク切れ・誤URL（AUD-12, 22, 28）
   - 対策: `usagePolicy`や`pricingSourceUrl`等のURLフィールドを定期的にHTTPステータスチェックする仕組みを導入
   - 優先度: 中
   - 実装規模: 小〜中

10. **定期監査の実施周期**
    - 問題: 今回のような44件規模の不一致が蓄積してから一括対応となった
    - 対策: 四半期ごと等、定期的な整合性監査サイクルを設け、蓄積を防ぐ
    - 優先度: 中
    - 実装規模: 小（運用ルールのみ）

## 16. 次に行う作業

1. AUD-21構造改善の設計（`JaStatus`型拡張・29ツール棚卸し）
2. AUD-40動画現物検証（Kling AI動画生成・透かしフレーム目視確認）
3. 整合性自動チェックの設計（DB正本とページ表示値の突合CI）
4. 本番反映後QA
5. 次回定期監査

※今回はこれらの実装には着手していない。また、今回の調査で新たに存在を確認した残存オーファンコンポーネント3件（LeonardoAiTool.astro, MidjourneyTool.astro, TdpToolPage.astro）の参照有無確認・削除要否判断も、次回棚卸しタスクの候補とする。

## 17. 最終判定

- **DBと主要表示の整合性**: 発見された不一致35件は是正済み。構造的な残課題（AUD-21, 42, 43）は認識した上で保留
- **料金情報**: 更新漏れ（AUD-05, 08, 14, 34）は是正済み
- **商用利用情報**: 陳腐化していた説明文（AUD-02）は是正済み
- **日本語対応情報**: 表記ゆれ・未反映は是正済み（AUD-06, 07, 09, 10, 11, 13, 20, 25, 26, 27, 29）。ただし型設計上の構造課題（AUD-21）は残存
- **会社情報**: 開発元/運営法人の混同（AUD-19）は是正済み。表記粒度差（AUD-23）は事実誤りではないため未修正
- **FAQ**: 欠落（AUD-13, 17）は是正済み
- **オーファンファイル**: 2件削除済み（AUD-18, 31）。3件が今回のスコープ外で残存確認済み（LeonardoAiTool.astro, MidjourneyTool.astro, TdpToolPage.astro）
- **構造上の残件**: AUD-21（型設計）、AUD-40（現物確認要）、AUD-42/43（専用ページ構造リスク、NO_CHANGEで運用継続）
- **本番反映可否**: Git状態は`origin/master`と完全同期（`73499aa`push済み、rev-list 0 0）、build 92ページ・error 0を確認済み。通常監査対応は完了しており、本番反映の前提条件を満たしている

- 通常監査対応: 完了
- 構造改善: 2件保留（AUD-21, AUD-40）
- build: PASS（92ページ、error 0）
- Git同期: PASS（origin/masterと完全一致）
- 本番反映準備: 完了
