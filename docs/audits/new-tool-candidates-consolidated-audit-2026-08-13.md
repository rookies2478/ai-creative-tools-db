# Consolidated New Tool Candidate Audit

- audited_at: 2026-08-13
- audit_type: AUDIT-ONLY（DB追加・ページ作成・本番反映は本タスクの対象外）
- scope: 新規候補10件の追加可否判定・優先順位確定

## Executive Summary

10候補を監査し、ADD_NOW 3件（Photoroom, Creatify, Recraft）、HOLD 6件、REJECT 1件（Picsart AI）と判定した。

最大の発見: **Freepik AI は2026年4月28日付で「Magnific」へ正式リブランド済み**。候補名「Freepik AI」は現存ブランドとして存在しない。追加検討する場合は新ブランド名を正本として扱う必要があり、リブランド直後のため HOLD とした。

次点の発見: Google Flow は SEO適合度が10候補中最高（HIGH、日本語記事での言及実績あり）だが、Google AIサブスクリプション内蔵型でアフィリエイトプログラムが存在せず、単体購入不可・料金体系の変動リスクが高い。Veo/Imagen/Geminiのラッパー製品である点も、DB上の記録単位として要検討。

最も明確な追加候補は Photoroom（EC商品写真ニッチ、`ec-product-image` ユースケースページと直結、公式アフィリエイト確認済み、商用利用条件が明文化）。

## Current Site Baseline

（2026-08-13時点、`src/content/tools/` 実測）

- ツール数: 29件（`src/content/tools/*.md`）
- カテゴリ: `image` / `video` / `both`（`src/content/config.ts` `category` enum）
- カテゴリページ: `src/pages/categories/` — avatar-video, design, image-generation, video-editing, video-generation, voice-narration の6ハブ
- 専用ツールページ: `src/pages/tools/` に29ツール中一部が個別 `.astro` ディレクトリ（[slug].astro の動的ルートと併用）
- 比較ページ: `src/pages/comparisons/` に17ページ（dalle-vs-midjourney, runway-vs-kling-ai 等の個別比較 + サンプル比較記事群）
- ユースケースページ: `src/pages/use-cases/` — ad-banner, ec-product-image, sns-post-image, youtube, shorts, faceless-video 等13ページ
- ガイドページ: `src/pages/guides/` — 料金・商用利用・日本語対応・クレジット制等10ページ
- コンテンツスキーマ: `src/content/config.ts` — pricingModel/commercialUse/japaneseUi/japanesePrompt/watermark/sources/sourceRefs/pricingDecision/usagePolicy等、tri-state（true/'partial'/'unknown'）方式で厳格に管理
- アフィリエイト構造: `docs/decisions/affiliate-link-architecture.md`（案C、2026-07-29決定）。調査層 `src/data/affiliatePrograms.ts` と公開層 `src/data/toolAffiliateLinks.ts` を分離。`enabled:true` かつ `approvalStatus:"approved"` のみ公開解決。現状 InVideo AI 1件のみpilot実装、他29ツールはofficialUrlへfallback。**`src/content/tools/*.md` の `affiliateUrl` フィールドは休眠・新規設定禁止。**

新規候補追加時は必ずこの案Cフローに従う（`affiliatePrograms.ts`調査記録→ASP承認後`toolAffiliateLinks.ts`登録）。

## Evaluation Method

各候補につき公式ソース（公式サイト・料金ページ・利用規約・ヘルプセンター）を優先して調査。不確実な事実は VERIFY/HOLD と明記し断定しない。100点満点スコアは以下配点:

- Search/SEO fit: 25
- Distinctiveness from current DB: 20
- Internal-link/content expansion: 15
- Commercial/affiliate potential: 15
- Official-source verifiability: 10
- Japanese-user relevance: 10
- Maintenance simplicity: 5

## Candidate Comparison Table

| Rank | Tool | Type | Main category | SEO fit | Overlap | Affiliate status | Maintenance risk | Score/100 | Decision |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Photoroom | 単体SaaS(商品写真) | image (EC) | HIGH | LOW | CONFIRMED_ACTIVE (Awin, 20%) | LOW-MEDIUM | 85 | ADD_NOW |
| 2 | Creatify | 単体SaaS(UGC広告動画) | video (ad) | HIGH | LOW | CONFIRMED_ACTIVE (Rewardful, 料率VERIFY) | LOW-MEDIUM | 75 | ADD_NOW |
| 3 | Recraft | 単体(ベクター/デザイン生成) | image (design/vector) | MEDIUM-HIGH | LOW | UNCLEAR（紹介制度のみ確認） | LOW-MEDIUM | 67 | ADD_NOW |
| 4 | Freepik AI(→Magnific) | 統合スイート | image/video/both | MEDIUM-HIGH(混乱リスクあり) | MODERATE | CONFIRMED_ACTIVE | HIGH | 60 | HOLD |
| 4 | Google Flow | Google製品ラッパー | video | HIGH | MODERATE | NO_PROGRAM_FOUND | HIGH | 60 | HOLD |
| 6 | Krea AI | 単体(マルチモデル) | image/video | MEDIUM | MODERATE | CONFIRMED_ACTIVE(条件不明瞭) | MEDIUM | 58 | HOLD |
| 7 | OpenArt | 統合スイート | image/video | MEDIUM-HIGH | HIGH | CONFIRMED_ACTIVE | MEDIUM | 52 | HOLD |
| 7 | LTX Studio | 単体(映像制作ワークフロー) | video | MEDIUM-HIGH | MODERATE | UNCLEAR(未発見) | MEDIUM-HIGH | 52 | HOLD |
| 9 | Higgsfield AI | アグリゲーター | video/image | MEDIUM | HIGH | CONFIRMED_ACTIVE | HIGH | 44 | HOLD |
| 10 | Picsart AI | 統合スイート内機能 | image/video | MEDIUM | HIGH | UNCLEAR | MEDIUM-HIGH | 41 | REJECT |

## Individual Candidate Audits

### 1. Freepik AI（→ Magnific、2026-04-28リブランド）

**A.** 正式名称は現在「Magnific」（旧Freepik）。公式サイト magnific.com。運営元 Freepik Company S.L.（スペイン・マラガ）。ストック素材+画像/動画/音声生成+アップスケールを束ねる統合スイート。DB追加する場合は新ブランド名を正本とし、旧名との対応関係を明記する必要あり。
Source: [prnewswire.com](https://www.prnewswire.com/news-releases/freepik-becomes-magnific-hits-230m-arr-and-introduces-the-no-collar-creative-economy-302755376.html), [thenextweb.com](https://thenextweb.com/news/freepik-rebrands-as-magnific)（2026-08-13アクセス）

**B.** ACTIVE。リブランドは事業縮小でなく統合・再launch（$230M ARR発表）。日本地域制限は未確認。料金ページにJPY表示あり。

**C.** 画像生成、動画生成、音声生成、アップスケール（Magnific+Topaz）、2.5億点超のストック素材、API、コラボ機能「Spaces」。ベクター/ロゴ特化機能は未確認。

**D.** Premium ¥1,950/月（年24万クレジット）、Premium+ ¥4,875/月、Pro ¥31,650/月。クレジット制、有効期限1年。無料プラン詳細（リブランド後の正確な制限）は VERIFY。
Source: [magnific.com/pricing](https://magnific.com/pricing)（2026-08-13アクセス）

**E.** 有料プランに「Commercial AIライセンス」明記。無料プランの商用利用条件は VERIFY/HOLD。

**F.** JPY価格表示あり＝ローカライズ実施の兆候。日本語UI/プロンプト/ドキュメント対応は VERIFY/HOLD（未確認）。

**G.** SEO適合度 MEDIUM-HIGH。ただしリブランド直後で「Freepik AI」検索需要と新ブランド名の齟齬が生じる過渡期。「FreepikがMagnificに改名」自体がコンテンツ機会。

**H.** 既存DBとの重複: Canva AI画像生成・Adobe Firefly・Leonardo AIと機能重複あり（統合スイート型のため）。MODERATE。

**I.** internal link候補: `image-generation`カテゴリ、`design`カテゴリ、既存比較記事群。

**J.** 比較記事候補: Freepik AI(Magnific) vs Canva AI、Magnific vs Adobe Firefly。

**K.** CONFIRMED_ACTIVE — 公式アフィリエイトページ確認済み [magnific.com/affiliates](https://www.magnific.com/affiliates)。旧Freepik時代はSovrn Commerce経由の報告もあるが料率は未公式確認。

**L.** HIGH — 2026年中盤の名称・ドメイン・料金ページ全面リブランドは、DBが最も避けたい種類の不安定性。今後もブランド統合が続く可能性。

**M.** スコア60/100: SEO15 + 独自性10 + 内部リンク10 + アフィリエイト14 + 検証可能性4 + 日本語適合6 + 保守簡易性1。

---

### 2. Krea AI

**A.** krea.ai。単体AI創作プラットフォーム（画像/動画/3D生成、リアルタイムキャンバス）。運営元 Krea AI/Krea Inc.。単一プロダクトとして構造的に整合的。

**B.** ACTIVE。Creator Partner Program再開が公式Xで発表（継続投資の兆候）。日本地域制限は未確認。

**C.** 画像生成、image-to-image、動画生成、3D生成、LoRA学習、リアルタイム生成キャンバス。ベクター/ロゴ、アバター動画機能は未確認。

**D.** 無料プラン: 約100 compute units/日（カード登録不要、二次情報源、公式ページ直接fetch失敗のためVERIFY）。Basic $9/月、Pro $35/月、Individual Max $105/月。正確な数値はVERIFY必須。

**E.** Basicプランで「商用ライセンス」付与との二次情報あり。DB登録前に公式ページ再確認必須（VERIFY）。

**F.** 日本語対応情報は未発見。VERIFY/HOLD。

**G.** SEO適合度 MEDIUM。リアルタイム・マルチモデル生成のニッチはあるが、既存DB（Leonardo AI/Playground AI/Stable Diffusion）ほどの日本語ブランド認知はない。

**H.** 重複: Leonardo AI、Playground AI、Stable Diffusionと機能重複。MODERATE。

**I.** internal link候補: `image-generation`カテゴリ、`video-generation`カテゴリ。

**J.** 比較記事候補: Krea AI vs Leonardo AI、Krea AI vs Playground AI。

**K.** CONFIRMED_ACTIVE（Creator Partner Program、公式 [krea.ai/cpp](https://www.krea.ai/cpp)）。ただしクリエイター向け特典プログラムの性質が強く、通常のコミッション型アフィリエイトかは要確認（VERIFY）。

**L.** MEDIUM — マルチモデル束ね型で対応モデルの追加/削除が頻繁。ブランド自体は安定（リネームリスクなし）。

**M.** スコア58/100: SEO15 + 独自性12 + 内部リンク9 + アフィリエイト10 + 検証可能性5 + 日本語適合4 + 保守簡易性3。

---

### 3. Recraft

**A.** recraft.ai。ベクター/SVG生成に特化したAIデザインツール。ロゴ・ブランドスタイル一貫性が差別化点。運営元は VERIFY（Recraft Inc/B.V.、未確定）。現行DBに存在しないベクター生成という明確な機能差があり、単体レコードとして構造的に強く適合。

**B.** ACTIVE。2026年も継続的なブログ更新・紹介キャンペーンあり。日本地域制限は未確認。

**C.** ラスター画像生成、**ベクター/SVG生成**、ロゴ/デザイン生成、背景除去、inpainting/outpainting、API。動画・アバター機能なし。

**D.** 無料プラン存在（詳細クレジット数はVERIFY、二次情報で50クレジット/日）。有料プランは年払い約20%割引。正確なティア名・価格はVERIFY（公式fetchで表全体は未取得）。

**E.** **公式ページで確認済み（強い根拠）**: 無料プランの画像はRecraftが所有し公開表示され、商用利用不可。有料プラン加入中に生成した画像は解約後も所有権・商用利用権が継続。条件付きだが極めて明文化された商用利用ポリシー。
Source: [recraft.ai/pricing](https://www.recraft.ai/pricing)（2026-08-13アクセス）

**F.** 日本語対応情報は未発見。VERIFY/HOLD。

**G.** SEO適合度 MEDIUM-HIGH。ベクター/SVG/ロゴ生成は現行DBに直接競合なし、「Recraft 使い方/商用利用/ロゴ」等の独自ロングテール獲得余地あり。

**H.** 重複: LOW。現行29ツールにベクター生成特化ツールは存在しない。

**I.** internal link候補: `design`カテゴリ（直結）、`ai-image-commercial-use-checklist`ガイド。

**J.** 比較記事候補: Recraft vs Adobe Firefly、Recraft vs Canva AI（ロゴ生成観点）。

**K.** 公式紹介制度確認 — [recraft.ai/docs/plans-and-billing/referral-program](https://www.recraft.ai/docs/plans-and-billing/referral-program)（クレジット付与型、紹介1件200クレジット・上限4,000クレジット/20件）。これは現金コミッション型アフィリエイトではなくユーザー紹介制度。標準的なアフィリエイトプログラムとしては **UNCLEAR**（別途パートナー向けページの存在も示唆されるが内容未確認）。

**L.** LOW-MEDIUM — ブランド安定、商用利用ポリシーが明文化されている点は他候補より優位。クレジット制のため中程度の価格変動リスクあり。

**M.** スコア67/100: SEO18 + 独自性18 + 内部リンク10 + アフィリエイト6 + 検証可能性7 + 日本語適合4 + 保守簡易性4。

---

### 4. Google Flow

**A.** Google DeepMind/Google Labs製フィルムメイキングツール。labs.google/flow。Veo（動画）・Imagen（画像）・Gemini（プロンプト）を統合したプロダクトUI。シーンビルダー・カメラコントロール・アセット管理・コミュニティギャラリー（Flow TV）を備え、単なるVeoのAPIデモではなく実質的な独立プロダクトと判断。ただし記録単位としてはVeo/Imagen/Geminiのラッパーである点を明記すべき。
Source: [blog.google](https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/)（2026-08-13アクセス）

**B.** ACTIVE。米国先行ローンチから日本を含む地域へ展開済み（Google AI Plus/Pro/Ultraプラン経由、2026年3月時点で日本アクセス確認と二次情報にあり）。Veo 3はVeo 3.1へ移行済み（2026年5月頃）。日本でのクレジット追加購入不可（月次リセットまたは上位プラン待ち、2026年5月時点情報）。**運用時点での最新状況は要再確認**。
Source（二次情報、公式再確認推奨）: [miralab.co.jp](https://miralab.co.jp/media/flow/), [genai-ai.co.jp](https://genai-ai.co.jp/ai-kanri/blog/cc-google-flow-veo/)

**C.** テキスト→動画、マルチショットシーン構築、カメラコントロール、ネイティブ音声（台詞/SE/環境音）、テキスト→画像（Imagen経由）、アセット管理。画像編集・ベクター・アバター機能はなし。

**D.** Google AIサブスクリプション内蔵、単体販売なし。グローバル: 無料枠約50クレジット/日、AI Pro $19.99/月（1,000クレジット）、AI Ultra $249.99/月（25,000クレジット）。日本: AI Plus ¥725/月（プロモ、通常¥1,200）、AI Pro ¥2,900/月（Ultraの正確なJP価格はVERIFY）。

**E.** 二次情報ではAI Pro以上で商用利用可、無料/Plusは不明瞭。公式Google生成AI追加利用規約での確認が必要（VERIFY）。

**F.** UI: Google製品として日本語ローカライズの可能性高いが未直接確認（VERIFY）。プロンプト: Gemini経由で日本語入力可能性あるが未確認。ドキュメント: Google Japan公式サポートページ存在の可能性。**すべてVERIFY扱い**、断定しない。

**G.** SEO適合度 **HIGH**。「Google Flow 使い方」「Veo3.1 料金」「Google Flow 商用利用」等で日本語ブログの言及実績あり、実需要の裏付けあり。「Google FlowとVeoの違い」自体が検索トピックになりうる。

**H.** 重複: Runway/Kling AI/Pika/Luma AIと機能重複あるが、Google製品としての独自のブランド検索需要あり。MODERATE。

**I.** internal link候補: `video-generation`カテゴリ、Runway/Kling AI等との比較記事、`gemini-image-generation`ツールページ（関連製品として）。

**J.** 比較記事候補: Google Flow vs Runway、Google Flow vs Kling AI。

**K.** **NO_PROGRAM_FOUND** — Google AIサブスクリプションは通常アフィリエイトネットワーク経由で販売されない。アフィリエイト/紹介プログラム未発見。

**L.** HIGH — Google AIサブスクリプション階層に組み込まれ料金体系変動が速い（Veo3→3.1、プロモ価格、日本でのクレジット追加購入制限が進化中）。地域展開もまだ流動的。「Flow」という名称自体が他の無関係製品と混同されやすい。

**M.** スコア60/100: SEO23 + 独自性12 + 内部リンク12 + アフィリエイト0 + 検証可能性5 + 日本語適合7 + 保守簡易性1。

---

### 5. Photoroom

**A.** photoroom.com。商品写真特化の単体SaaS（背景除去、商品写真編集、バッチ処理）。運営元 Photoroom（フランス発スタートアップ）。ユーザー向け標準製品として単体レコード追加に構造的に適合。

**B.** ACTIVE、実績十分。撤退・終了の兆候なし。

**C.** 背景除去、商品写真生成/レタッチ、バッチエクスポート、テンプレート、AI背景生成、一部テキスト→画像背景生成、自動化ワークフロー用API。主軸は画像編集/商品写真、動画・アバター・ベクター/ロゴ機能なし。

**D.** フリーミアム — Free（月250エクスポート、透かしあり、非商用）、Pro $7.50/月、Max $20.99/月、Ultra（新設）$82.50/月〜、Enterprise個別見積。有料プランは公正利用ポリシー下で「無制限」手動エクスポート。API別料金（$0.01/画像、パートナープラン規模時）。
Source: [Photoroom Help Center](https://help.photoroom.com/en/collections/12478554-plans-and-pricing), [eesel.ai](https://www.eesel.ai/blog/photoroom-pricing)（2026-08-13アクセス）

**E.** **公式ヘルプセンターで明確に確認**: 無料プランは「個人的・非商用目的」限定、商用利用には有料プラン必須。条件付きだが極めて明文化されており検証可能性が高い。
Source: [Photoroom Help Center — Free accounts and commercial use](https://help.photoroom.com/en/articles/12523455-free-accounts-and-commercial-use)（2026-08-13アクセス）

**F.** 日本語対応（UI/プロンプト/ドキュメント）は本監査では未直接確認。VERIFY推奨（グローバルEC事業者向け製品のためローカライズの可能性は高い）。

**G.** SEO適合度 **HIGH**。EC/商品画像ニッチで「Photoroom 使い方」「Photoroom 料金」「Photoroom 商用利用」の独自検索意図が見込まれ、既存の`ec-product-image`ユースケースページと直結する。

**H.** 重複: LOW。現行DB29ツールに商品写真特化ツールは存在しない（Canva AI/Fotor AIは汎用デザインツールで領域が異なる）。

**I.** internal link候補: `use-cases/ec-product-image`（既存ページと直結）、`design`カテゴリ、`ad-banner`ユースケース。

**J.** 比較記事候補: Photoroom vs Canva AI（商品写真観点）、Photoroom vs Fotor AI。

**K.** **CONFIRMED_ACTIVE** — Awin経由の公式アフィリエイトプログラム。photoroom.com/affiliates、affiliate.photoroom.com。Max/Ultraプラン（月払い・年払い）およびPro年払いで20%コミッション、Cookie 30日。本監査中最も強いアフィリエイト根拠。
Sources: [photoroom.com/affiliates](https://www.photoroom.com/affiliates), [Awin merchant profile](https://ui.awin.com/merchant-profile/121800)（2026-08-13アクセス）

**L.** LOW-MEDIUM — 料金ティアが公式に明確に文書化されており、製品スコープが狭く安定（商品写真領域）。Ultraティアは「新設」のため今後変動の可能性はある。

**M.** スコア85/100: SEO22 + 独自性17 + 内部リンク14 + アフィリエイト14 + 検証可能性9 + 日本語適合5 + 保守簡易性4。

---

### 6. Higgsfield AI

**A.** higgsfield.ai。Kling/Veo/Sora/Nano Banana等サードパーティモデルを束ねる画像/動画生成プラットフォーム＋独自機能（Soul IDキャラクター一貫性、カメラコントロール、広告/UGC制作、吹替）。**モデルアグリゲーター/マルチツールスイート**であり、単一の差別化モデルではない。実在の単体消費者向けプロダクトとして構造上は追加可能だが、「他社モデルへの統一クレジットプールでのアクセス」が中核価値であるため、既存DB（Kling AI、Runway等）との重複リスクが高い。

**B.** ACTIVE。2026年を通じてプラン変更が複数回報告されている（二次情報、DB登録前に公式で現行ティア構造を直接確認要）。

**C.** 画像生成、動画生成（マルチモデル）、キャラクター一貫性（Soul ID）、カメラコントロール、商用広告制作ツール、吹替/音声動画、Webサイトビルダー/マーケティングスタジオ機能あり。広範なマルチパーパススイート。

**D.** クレジット制、年払いティア。Starter 約$15/月（200クレジット）、二次情報では最低$9/月からも、Ultra $99/月（3,000クレジット超、9,000まで拡張可）。使用モデルにより消費クレジット大幅変動（基本15-25、Sora2/Veo3.1等プレミアム40-70）。**本監査で公式ページの直接確認は未完了、料金はVERIFY**、二次情報間で数値に不一致あり。

**E.** 本監査では公式利用規約未確認。VERIFY。

**F.** 未確認。VERIFY。

**G.** SEO適合度 MEDIUM。「Higgsfield 使い方/料金」のブランド検索は一定存在するが、需要の相当割合は基盤モデル固有の検索（例:「Kling AI 使い方」）に流れる可能性が高い（リセラー/アグリゲーター層のため）。

**H.** 重複: **HIGH**。Kling AI、Runway等が既にDBに存在し、Higgsfieldの主要価値提案（他社モデルへの統一アクセス）と機能的に大きく重なる。

**I.** internal link候補: `video-generation`カテゴリ、Kling AI/Runway比較記事群。

**J.** 比較記事候補: Higgsfield AI vs Kling AI（アグリゲーター vs 直接契約の切り口）。

**K.** **CONFIRMED_ACTIVE** — FirstPromoter経由の公式アフィリエイトプログラム。別途「Creator Partnership Program」（クレジット/早期アクセス中心で現金コミッションでない可能性）も存在。正確なコミッション率は本監査で未確認（VERIFY）。
Sources: [higgsfield.ai/creator-partnership-program](https://higgsfield.ai/creator-partnership-program), [startuphub.ai](https://www.startuphub.ai/startups/higgsfield/affiliate-program)（2026-08-13アクセス）

**L.** HIGH — 2026年を通じ料金/プランが繰り返し変更（複数の第三者トラッカー報告）、マルチモデル束ね型のため基盤モデル（Kling、Veo、Sora等）の変更のたびに機能セットが変動、既存DBツールとの重複が大きく、本監査対象中最も保守が困難な部類。

**M.** スコア44/100: SEO12 + 独自性6 + 内部リンク8 + アフィリエイト10 + 検証可能性4 + 日本語適合3 + 保守簡易性1。

---

### 7. OpenArt

**A.** openart.ai。運営元法人名は公開ページ上で未確認（VERIFY）。画像+動画生成、LoRA学習、ワークフロー機能を備えたマルチモデル創作スイート。単一モデルのラッパーではなくスイート型。DB構造上はLeonardo AI/Playground AIと同種のレコードとして追加可能。

**B.** ACTIVE、撤退兆候なし。日本地域制限の明示的情報は未発見。

**C.** テキスト→画像、image-to-image、LoRA/モデル学習、動画生成（Seedance 2.5、FLUX 3等を参照）、ワークフロー/テンプレート。ベクター/ロゴ特化機能は未確認。

**D.** Source: [openart.ai/pricing](https://openart.ai/pricing)（2026-08-13アクセス）。無料プラン存在（正確な無料クレジット数は料金ページに詳細記載なくVERIFY）。有料: Starter $13/月、Plus $27/月、Pro $44/月（「Most Popular」表示）、Wonder $175/月（いずれも年払い表示価格）。クレジット制、追加クレジット購入可。

**E.** Plus以上で商用利用権付与（料金ページおよび規約要約による）。Starter/Free以下は非商用のみ。**条件付き/プラン依存**として分類。

**F.** 日本語UI/プロンプト/ドキュメント/出力いずれも根拠未発見。**UNKNOWN/VERIFY**。

**G.** SEO適合度 MEDIUM-HIGH。マルチ機能スイートのため「使い方/料金/商用利用」系検索を呼び込みやすいが、既存DBのLeonardo AI/Playground AIと機能重複が大きく独自性が薄まる。

**H.** 重複: **HIGH**。Leonardo AI、Playground AIと機能的に大きく重なる。

**I.** internal link候補: `image-generation`カテゴリ、`video-generation`カテゴリ。

**J.** 比較記事候補: OpenArt vs Leonardo AI、OpenArt vs Playground AI。

**K.** **CONFIRMED_ACTIVE** — 公式ページ確認: openart.ai/programs/affiliate、openart.ai/programs/cpp（Creative Partner Program）。第三者アグリゲーター（affcaptain.com）は20%継続コミッションを主張するが公式ページでの料率確認は未完了（VERIFY）。

**L.** MEDIUM — モデル名の入れ替わりが頻繁（Seedance 2.5、FLUX 3のような命名は基盤モデルの高速な差し替えを示唆）、無料プランのクレジット詳細が不明瞭。

**M.** スコア52/100: SEO16 + 独自性8 + 内部リンク9 + アフィリエイト11 + 検証可能性5 + 日本語適合3 + 保守簡易性2 ≒ 52。

---

### 8. Creatify

**A.** creatify.ai。運営元 Creatify Labs Inc.（G2掲載情報）。商品URL→動画広告生成に特化した単体プロダクト（自称「AI Ad Agent for Video」）。汎用創作スイートではなく明確なニッチ（広告クリエイティブ/UGC動画）。単体レコードとして構造的に強く適合。

**B.** ACTIVE、資金調達実績あり（Series A $15.5M、2025-05-28付プレスリリース）。撤退兆候なし。
Source: businesswire.com（2025-05-28付、2026-08-13アクセス確認）

**C.** 商品URL→動画広告生成、AIアバター/俳優（Proプランで最大1,500種）、自動スクリプト生成、多言語ナレーション、バッチモード、競合広告トラッキング。**広告クリエイティブ+UGC風広告**が主軸で、汎用画像/動画生成ではない。

**D.** Source: [creatify.ai/pricing](https://creatify.ai/pricing)（2026-08-13アクセス）。無料プラン: 10クレジット/月（動画広告約2本または画像広告20本相当）、透かしあり。Starter $39/月（100クレジット）、Pro $99/月（300〜5,000クレジット、最大5席）、Enterprise個別見積。クレジット制、年払い最大50%割引、クレジット繰越なし。

**E.** 料金ページ上に商用利用の明示的記載は未発見（VERIFY）。ただし広告生成という製品性質上、商用利用が暗黙の前提と考えられる。**不明瞭/VERIFY**として分類。

**F.** 日本語対応情報は未発見。**UNKNOWN**。多言語ナレーション機能から日本語音声出力の可能性は示唆されるが、日本語特化機能としては未確認。

**G.** SEO適合度 **HIGH**。「UGC広告 AI」「ECサイト 広告動画 AI」等、現行DBでカバーされていないニッチな検索意図がある。最も近い既存ツール（InVideo AI、CapCut AI）はUGC広告特化ではなく差別化余地あり。

**H.** 重複: LOW。InVideo AI/CapCut AIとの機能的近さはあるが、UGC広告特化という軸は現行DBに存在しない。

**I.** internal link候補: `use-cases/ad-banner`（既存ページと直結）、`invideo-ai-vs-capcut-ai`比較記事（関連文脈として）。

**J.** 比較記事候補: Creatify vs InVideo AI、Creatify vs CapCut AI（UGC広告特化の切り口）。

**K.** **CONFIRMED_ACTIVE** — 公式ページ確認: creatify.ai/affiliate、help.creatify.ai記事。Rewardful経由運用（二次情報）。25%継続コミッションとの第三者情報複数あり（taprefer.com、aiaffiliateprograms.ai）が、公式ページでの料率直接確認は未完了（VERIFY、プログラム存在自体は確認済み）。

**L.** LOW-MEDIUM — スコープが狭く安定的なポジショニング、料金体系も3ティア+Enterpriseとシンプル。

**M.** スコア75/100: SEO20 + 独自性17 + 内部リンク13 + アフィリエイト12 + 検証可能性6 + 日本語適合3 + 保守簡易性4。

---

### 9. LTX Studio

**A.** 運営元 Lightricks（Facetune、Videoleap開発元、約$150M調達との二次情報）。公式ドメインが **ltx.studio → ltx.io/studio へ移行済み**（DB登録前にドメイン正本を要確認）。ストーリーボード/脚本ベースのAI映画制作プラットフォーム。Runway/Kling/Pika/Luma AIのようなモデル中心ツールと異なり、**ワークフロー中心**の位置づけで単体レコードとしての差別化根拠あり。

**B.** ACTIVE。ltx.io/studio/pricingへの直接fetchは技術的エラーで失敗（撤退の証拠ではない）。help.ltx.io、ltx.io/llm-info等の検索結果でActiveを裏付け。日本地域制限の情報は未発見。

**C.** テキスト/脚本→動画、ストーリーボードビルダー、Canvas、動画エディタ、ショット間キャラクター一貫性、カメラコントロール、吹替、字幕、コラボ機能。**動画生成+動画編集+ストーリーボード/映画制作ワークフロー**という想定プロファイルと一致。

**D.** 二次情報集約（[ltx.io/studio/pricing](https://ltx.io/studio/pricing)への直接fetch未達、**DB登録前に直接確認必須**）: 無料枠800クレジット（買い切り、商用利用不可）、Lite $15/月（年払い$12）、Standard $35/月（年払い$28）、Pro最大$125/月。EU/フランス価格は別建て（€12/28/100）。地域別価格差は保守リスクとして注記。

**E.** **公式ヘルプセンターで確認**: 商用利用ライセンスはStandardプラン（$35/月）以上から付与。Free/Lite除外。条件付き/プラン依存として明確に分類可能。
Source: [help.ltx.io/hc/en-us/articles/32046651702290](https://help.ltx.io/hc/en-us/articles/32046651702290)（2026-08-13アクセス）

**F.** 日本語対応情報は本パスで未発見。**UNKNOWN/VERIFY**。

**G.** SEO適合度 MEDIUM-HIGH。「AI 映画制作」「絵コンテ AI」等、モデル中心の既存DBツール（Runway/Kling/Pika/Luma AI）とは異なるワークフロー特化の検索意図を獲得できる可能性。

**H.** 重複: MODERATE。動画生成という軸ではRunway等と重なるが、ストーリーボード/脚本ワークフロー中心という点で差別化余地あり。

**I.** internal link候補: `video-generation`カテゴリ、Runway/Kling AI関連比較記事（切り口の違いとして言及）。

**J.** 比較記事候補: LTX Studio vs Runway（ワークフロー vs モデル中心の切り口）。

**K.** **UNCLEAR** — 本パスの検索ではアフィリエイト/パートナー/紹介プログラム未発見。「見つからなかった」であり「存在しない」の確証ではない。DB登録検討時はltx.ioフッター/ヘルプセンターの直接確認が必要。

**L.** MEDIUM-HIGH — 地域別価格差（US/EU）が既に存在、ドメイン移行（ltx.studio→ltx.io/studio）というブランド/URL不安定性が既に観測済み、Canvas+Storyboard+Editor+吹替の多機能バンドルで追跡範囲が広い。

**M.** スコア52/100: SEO16 + 独自性13 + 内部リンク10 + アフィリエイト3 + 検証可能性5 + 日本語適合3 + 保守簡易性2。

---

### 10. Picsart AI

**A.** picsart.com（エンタープライズ/パートナー向けpicsart.io併用）。運営元 Picsart, Inc.。**「Picsart AI」は独立製品ではなく、Picsart本体（写真/動画編集+AI機能15種以上）に内蔵されたAI機能群**。標準的な単一機能AIツールではない。「Picsart AI」単体でのレコード追加は構造的に不自然 — 追加する場合はCanva AIと同様「Picsart（AI機能）」として広範な汎用エディタの一部と明記する必要がある。

**B.** ACTIVE、大規模（公式料金ページで「世界1.3億人超のクリエイター/事業者」との記載）。撤退兆候なし。日本地域ブロックの証拠なし、料金ページにJPY表示あり（Pro ¥1,000/月年払い、Ultra ¥6,082/月・席あたり年払い）。日本語UI対応は未確認。
Source: [picsart.com/pricing/](https://picsart.com/pricing/)（2026-08-13アクセス）

**C.** AI画像生成、背景除去、オブジェクト除去、アップスケール、一括/バッチ編集、プレミアムテンプレート/ストック素材、広告バリエーション生成＋ローカライズ、広告パフォーマンス追跡（Ultraプラン）、加えて非AIのコア写真/動画編集機能。ベクター/ロゴ特化、アバター動画、音声生成は未確認。

**D.** 無料プラン存在（AI生成は週5回程度との二次情報、正確な数値はVERIFY）。公式JPY価格: Pro ¥1,000/月（年払い）、Ultra ¥6,082/月・席（年払い）。第三者情報のUSD価格（Pro $7-15/月、Ultra最大$45/月）と数値の食い違いあり — **地域/請求サイクル依存の可能性、要VERIFY**。Enterprise個別見積。サブスクリプション+クレジット制ハイブリッド。

**E.** **条件付き/素材ごと判定**。公式ヘルプセンターによれば、通常のPicsartストック素材は明示的に「Commercial Use」タグ付けされない限り個人/非商用利用限定。AI生成画像は商用利用可能とされるが、著作権所有・非侵害の保証はPicsart側が明示的に否認。
Sources: [support.picsart.com — AI commercial use](https://support.picsart.com/hc/en-us/articles/9814385860381-Are-images-generated-through-AI-available-for-commercial-use), [support.picsart.com — Commercial use](https://support.picsart.com/hc/en-us/articles/360004480318-Commercial-use)（2026-08-13アクセス）

**F.** 日本語UI/プロンプト/ドキュメントいずれも本パスで未確認。**VERIFY**。JPYローカライズ価格は日本市場意識の弱いシグナル。

**G.** SEO適合度 MEDIUM。「Picsart」自体は日本でも古くから知られる汎用写真編集ブランドであり、AI特化検索意図が非AI製品の検索意図と混在しやすい。「Picsart AI機能」として独自ポジションを確立・上位表示させるのは既存の汎用イメージゆえに困難。

**H.** 重複: **HIGH**。既存DBのCanva AI画像生成、Fotor AI、Microsoft Designerと「汎用デザインスイート+AI機能」という軸で強く重複。

**I.** internal link候補: `design`カテゴリ（Canva AI/Fotor AIと並置になるが差別化困難）。

**J.** 比較記事候補: 特筆すべき独自の切り口が見出しにくい（Canva AI/Fotor AIとの三つ巴になり読者への価値が薄い）。

**K.** 公式ページ picsart.com/affiliates/ を直接fetchした結果、これは通常のリンク型アフィリエイトではなく**クリエイター向けエンゲージメント報酬プログラム（Earn）**であることが判明。別途 picsart.com/ai-partners-program/（早期アクセス）、picsart.io/partners/（代理店/ソリューション/技術/学術/スタートアップ向けパートナー種別）が存在するが、いずれも比較サイト向けの成果報酬型リンクプログラムとしては未確認。第三者アグリゲーター（FlexOffers等）ではコミッション1-4%・Cookie30日との情報もあるが公式一次情報では未確認。**総合判定: UNCLEAR**。

**L.** MEDIUM-HIGH — 多機能バンドル型のため機能/料金追跡が困難、JPY公式価格とUSD二次情報の不一致は地域/頻繁な価格変更を示唆、商用利用条件が素材ごとの個別判定でありDB上の単純な一値表現になじまない、「Picsart AI」という概念自体がスイート内機能でありスコープ境界が不安定。

**M.** スコア41/100: SEO11 + 独自性6 + 内部リンク8 + アフィリエイト5 + 検証可能性5 + 日本語適合4 + 保守簡易性2。

## Recommended First Implementation Batch

**ADD_NOW（優先度順）:**

1. **Photoroom** — EC商品写真という明確なニッチ、既存`ec-product-image`ユースケースページと直結、商用利用条件が公式に明文化、アフィリエイト確認済み（Awin 20%）。最有力候補。
2. **Creatify** — UGC広告動画という現行DB未カバーのニッチ、`ad-banner`ユースケースページと直結、アフィリエイト確認済み。
3. **Recraft** — ベクター/SVG生成という現行DBに存在しない機能軸、商用利用ポリシーが明文化。アフィリエイトはUNCLEAR（紹介制度のみ）につき、追加時はアフィリエイトなし（officialUrlのみ）を前提とする。

いずれも追加時は日本語対応（UI/プロンプト/ドキュメント）を個別に一次情報で再確認すること（本監査ではすべてVERIFY/HOLD）。

## HOLD Candidates

- **Freepik AI（→Magnific）**: リブランド直後（2026-04-28）。ブランド名の安定を待って再監査すべき。
- **Google Flow**: SEO適合度は最高クラスだがアフィリエイトプログラムなし、Google AIサブスクリプション内蔵で単体管理が難しい。料金体系安定を待って再検討。
- **Krea AI**: 料金・日本語対応の一次情報確認が不十分。VERIFY項目解消後に再評価。
- **OpenArt**: Leonardo AI/Playground AIとの重複が大きい。差別化要素の追加調査が必要。
- **LTX Studio**: ドメイン移行（ltx.studio→ltx.io/studio）の安定待ち、アフィリエイト有無の直接確認が必要。
- **Higgsfield AI**: Kling AI/Runway等との重複が大きいアグリゲーター型。料金体系の変動が激しく、直接契約先ツールとの共存メリットが薄い。

## REJECT Candidates

- **Picsart AI**: 「Picsart AI」は独立プロダクトではなくPicsart本体の内蔵機能群。Canva AI/Fotor AI/Microsoft Designerと強く重複し、単体レコードとしての独自の検索意図・比較記事価値が乏しい。

## Missing Candidate Observations

（最大5件、深掘り監査は実施せず言及のみ）

1. **ElevenLabs**（音声生成）— 現行DBに音声/ナレーション専用ツールが1件も存在しない（`voice-narration`カテゴリページはあるが対応ツールなし）。DB構造上のギャップとして今後の監査候補。
2. **Sora（OpenAI）**— 動画生成の主要プレイヤーとして言及されるが、単体ユーザー向け製品としての位置づけ（ChatGPT/Sora appとの関係）を含め別途整理が必要。
3. **Veo（Google、単体）**— Google Flow経由のラッパー機能とは別に、Veoモデル自体を単体エントリとして扱うべきかは本監査のGoogle Flow評価と併せて要検討。
4. **Topaz Labs**— アップスケール特化ツールとして、現行DBのアップスケール機能保有ツール群との差別化観点で今後の検討候補。
5. **Adobe Firefly Video**— 既存「Adobe Firefly」エントリが画像中心の記述である場合、Firefly動画機能の独立記載要否は別途確認価値あり。

## Sources

主要な一次情報（各候補監査セクション内に個別記載、本セクションは横断的な参照先の再掲）:

- Freepik AI/Magnific: [prnewswire.com](https://www.prnewswire.com/news-releases/freepik-becomes-magnific-hits-230m-arr-and-introduces-the-no-collar-creative-economy-302755376.html), [magnific.com/pricing](https://magnific.com/pricing), [magnific.com/affiliates](https://www.magnific.com/affiliates)
- Krea AI: [krea.ai/cpp](https://www.krea.ai/cpp)
- Recraft: [recraft.ai/pricing](https://www.recraft.ai/pricing), [recraft.ai/docs/plans-and-billing/referral-program](https://www.recraft.ai/docs/plans-and-billing/referral-program)
- Google Flow: [blog.google](https://blog.google/innovation-and-ai/products/google-flow-veo-ai-filmmaking-tool/), [miralab.co.jp](https://miralab.co.jp/media/flow/), [genai-ai.co.jp](https://genai-ai.co.jp/ai-kanri/blog/cc-google-flow-veo/)
- Photoroom: [help.photoroom.com — pricing](https://help.photoroom.com/en/collections/12478554-plans-and-pricing), [help.photoroom.com — commercial use](https://help.photoroom.com/en/articles/12523455-free-accounts-and-commercial-use), [photoroom.com/affiliates](https://www.photoroom.com/affiliates), [Awin merchant profile](https://ui.awin.com/merchant-profile/121800)
- Higgsfield AI: [higgsfield.ai/creator-partnership-program](https://higgsfield.ai/creator-partnership-program)
- OpenArt: [openart.ai/pricing](https://openart.ai/pricing)
- Creatify: [creatify.ai/pricing](https://creatify.ai/pricing), businesswire.com Series A press release（2025-05-28付）
- LTX Studio: [help.ltx.io — commercial use](https://help.ltx.io/hc/en-us/articles/32046651702290)
- Picsart AI: [picsart.com/pricing/](https://picsart.com/pricing/), [support.picsart.com — AI commercial use](https://support.picsart.com/hc/en-us/articles/9814385860381-Are-images-generated-through-AI-available-for-commercial-use), [support.picsart.com — Commercial use](https://support.picsart.com/hc/en-us/articles/360004480318-Commercial-use)

すべて2026-08-13アクセス確認。VERIFY/HOLDマークされた項目は本監査時点で一次情報による確認が未完了であり、DB登録前に再確認が必須。
