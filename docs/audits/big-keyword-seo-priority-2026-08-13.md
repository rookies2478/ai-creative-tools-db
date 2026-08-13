# Big Keyword SEO Priority Audit

- audit_date: 2026-08-13
- task_file: docs/tasks/active/2026-08-13-big-keyword-seo-priority-audit.md
- production: NOT_DEPLOYED（本監査は選定のみ、実装なし）

## Executive Summary

12ツールを検索需要・GSC実績・SERP到達可能性・ページ品質・カニバリリスク・編集記事適合度の6軸で採点した。PRIORITY_NOW = **stable-diffusion / kling-ai / hailuo-ai**（同点1位×2＋僅差3位）。上位ボリューム5ツールのうちphotoroomとadobe-firefliaはGSCデータ不足・SERP難度（Adobe公式ドメイン優位）のためHOLDへ後退した。単純なボリューム順（stable-diffusion→photoroom→adobe-firefly→kling-ai→hailuo-ai）とは異なる結論。

## Data Sources

1. docs/decisions/search-volume-data-governance.md
2. docs/seo-research/ai-tools-search-volume-master.xlsx（MASTER_SUMMARY, BIG_KEYWORD_RANKINGシート、全12件RESEARCHED、調査期間2025-07〜2026-06）
3. docs/analytics/gsc/2026-08-13（17日間 07-27〜08-12、property全体、query-pages/sitemapsは今回未取得）
4. src/content/tools/*.md（12ツール frontmatter + 本文）
5. src/pages/tools/[slug].astro（STATIC_OVERRIDES構成）
6. WebSearch（ライブJapan Google SERPの直接観測ではなく近似代替。下記「限界事項」参照）

reports/配下は参照せず（履歴アーカイブ扱い）。

## Methodology

PHASE 1〜13の指示に従い、以下の順でデータ収集・採点した。データ収集はサブエージェント（読み取り専用、no file writes）に委任し、SERP近似観測は本エージェントがWebSearchで実施。詳細な採点式はPHASE 8のスコアリング内訳を参照。

### 限界事項（先出し）

- **ライブSERP**: Chrome拡張が接続不可のため、Japan Google検索結果の直接ブラウジングによる順位確認は実施できなかった。代替としてWebSearch（米国リージョン想定、日本語クエリ）で上位に出てくる編集記事の傾向を確認した。これは「公式サイトが何位か」を確定する精度はなく、**独立編集記事の存在有無・多寡の傾向のみ**を示す近似データである。5大ボリュームツール（stable-diffusion/photoroom/adobe-firefly/kling-ai/hailuo-ai）のみ確認し、残り7ツールはSERP列を「未観測（推定MODERATE）」とした。
- **GSC**: 17日間・property全体データ。ブランドクエリ単独の行が取得できないツールが大半（NO_GSC_DATAと明記）。ページ単位（/tools/<slug>/）の指標はほぼ全ツールで取得できたが、非ブランドのテールクエリ（「〜商用利用」等）が混在しており、厳密なブランド検索専用の実績ではない。
- **ページレンダリングの罠**: stable-diffusion / adobe-firefly / kling-ai / hailuo-ai / luma-ai / pika / runway / pixverse / vidu-ai の9ツールは`src/pages/tools/[slug].astro`のSTATIC_OVERRIDESに指定され、`ToolDetailPage.astro`経由でレンダリングされる。`.md`本文のFAQ見出し（`###`）が0件でも、実際のライブページにFAQブロックが存在するかどうかは本監査では未検証。次フェーズで実装対象を選ぶ際は、`.md`ではなくastroコンポーネント側のデータソースを確認する必要がある。

## 12-Tool Opportunity Matrix

| Rank | Tool | Brand Volume | GSC Page Position | Impressions | CTR | SERP Difficulty | Intent | Page Strength | Score | Decision |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | stable-diffusion | 500,000 | 12.48 | 287 | 0.70% | MODERATE（オープンだが大手JP AI媒体が強い） | MIXED（インフォメーショナル優位） | ADEQUATE | 73 | PRIORITY_NOW |
| 1 | kling-ai | 50,000 | 9.74 | 42 | 0% | OPEN（JP AI媒体多数：WEEL/aismiley/miralab等） | MIXED | THIN（FAQ 0件） | 73 | PRIORITY_NOW |
| 3 | hailuo-ai | 50,000 | 19.61 | 46 | 2.17%(clicks1) | OPEN（JP AI媒体多数） | MIXED | THIN（FAQ 0件、japaneseUi=false） | 68 | PRIORITY_NOW |
| 4 | pixverse | 5,000 | 7.4 | 207 | 1.45% | 未観測（推定MODERATE） | MIXED（商用利用クエリでpos3.67・CTR0%） | THIN（FAQ 0件） | 65 | WATCH |
| 5 | luma-ai | 5,000 | 7.27 | 154 | 0.65% | 未観測（推定MODERATE） | MIXED（「luma 手数料」新規クエリ） | ADEQUATE | 62 | WATCH |
| 6 | vidu-ai | 5,000 | 8.24 | 87 | 1.15% | 未観測（推定MODERATE） | MIXED（商用利用クエリでpos7・CTR0%、既存GSC文書でもN1候補） | THIN（FAQ 0件） | 60 | WATCH |
| 7 | pika | 5,000 | 6.08 | 12 | 0% | 未観測（推定MODERATE） | データ不十分 | THIN（FAQ 0件） | 50 | HOLD |
| 8 | photoroom | 50,000 | NO_GSC_DATA | — | — | MODERATE（アプリ/ストア型ナビゲーショナル強め） | MIXED | ADEQUATE | 48 | HOLD |
| 9 | recraft | 5,000 | NO_GSC_DATA | — | — | 未観測 | データ不十分 | THIN | 44 | HOLD |
| 9 | adobe-firefly | 50,000 | 15.33 | 3 | — | HARD（Adobe公式ドメイン優位） | ナビゲーショナル優位 | ADEQUATE | 44 | HOLD |
| 11 | runway | 5,000 | 10.83 | 47 | 0% | 未観測（推定HARD、国際大手） | MIXED | THIN | 42 | HOLD |
| 11 | creatify | 500 | NO_GSC_DATA | — | — | 未観測（推定OPEN、低競合） | データ不十分 | THIN | 42 | HOLD |

（brand volumeはworkbookの実値を再確認済み。参照値からの乖離は0件。）

## GSC Review

latest valid dataset: `docs/analytics/gsc/2026-08-13`（17日間、07-27〜08-12、property全体、パーシャル：query-pages/sitemaps未取得）。14日データが利用不可のため、この17日データを最新の比較可能データとして採用（28日・3ヶ月と混在させていない）。

- **ブランドクエリ単独行**: stable-diffusion（impr36/pos2.06/clicks0）とluma-ai（impr7/pos2.57/clicks0）のみ検出。他10ツールはNO_GSC_DATA（テールクエリのみ、または皆無）。
- **ページ実績の目立つ動き**:
  - pixverse: ページ全体pos7.4/impr207/CTR1.45%（12ツール中最良CTR）だが「pixverse 商用利用」単独ではpos3.67・CTR0% — 大きなCTR改善余地。
  - vidu-ai: 同様に「vidu ai 商用利用」pos7・CTR0%。既存GSC文書でもN1候補として既記載。
  - runway: 「runway 商用利用」がpos8.08→12.92へ悪化傾向（既存GSC文書でHOLD済み扱い）。新規強化より先に悪化原因の確認が必要。
  - hailuo-ai: ページpos19.61と全ツール中最も低順位。ボリューム・SERPの開放度に対してGoogle実績が最も見劣りする＝伸び余地が最大。
- **NO_GSC_DATAツール**: photoroom / recraft / creatify / adobe-firefly（ブランドクエリ単独） / kling-ai（同） / hailuo-ai（同） / pika（同） / runway（同） / pixverse（同） / vidu-ai（同）。ブランドクエリ単独行はstable-diffusion・luma-aiの2件のみ検出。

## SERP Review

WebSearch近似観測（限界事項参照）で5大ボリュームツールのみ確認：

| Tool | 観測傾向 | 判定 |
|---|---|---|
| stable-diffusion | 単一の公式サイトが存在しない分散エコシステム（AUTOMATIC1111/DreamStudio/Civitai等）。tech-camp/aismiley/miralab/genai-ai/kurokumasoft等の大手JP AI媒体が多数上位に出る。インフォメーショナル優位。 | MODERATE（オープンだが強い媒体が競合） |
| kling-ai | WEEL/aismiley/miralab/ai-revolution/aipicks/ai-reboot/uravation/coinninja等、独立編集記事が多数出現。 | OPEN |
| hailuo-ai | aismiley/tech-camp/WEEL/ai-gallery/romptn/ai-review等、独立編集記事多数。 | OPEN |
| photoroom | aipicks/ai-review/assist-all/en-code/realiser等の独立媒体はあるが、実アプリ・ストア型のナビゲーショナル要素が強い。 | MODERATE |
| adobe-firefly | WEEL/miralab/romptn/ai-front-trend等の独立記事はあるが、adobe.com自体のドメイン権威が支配的。 | HARD |

残り7ツール（luma-ai/recraft/pika/runway/pixverse/vidu-ai/creatify）はライブSERP未観測。スコアリングではSERP列を推定MODERATEとして扱い、確度が低いことをスコアに反映（該当ツールのSERP到達可能性スコアは中位止まり）。

## Top Search-Volume Tools（PHASE 10 特別検討）

- **stable-diffusion**: 500,000というブランド検索ボリュームは、ホスト型SaaSブランドと同質のものではない。「Stable Diffusion」は分散エコシステム（ローカル環境構築・複数UI・複数ホスティングサービス）を指すエコシステム/ジェネリック性の強いキーワードであり、単一プロダクトのブランド需要として過大評価すべきではない。本監査ではsearch demand軸で満点(25)を与えず discount（20/25）した。それでもGSC実績（pos12.48・impr287）とSERPの開放度（大手媒体はいるが公式ドメイン一強ではない）により総合1位を維持。
- **Adobe Firefly**: Adobeという強力な自社ドメイン権威が競合として直接効いてくる。JP独立媒体は存在するが、SERP到達可能性を大きく下げた（HARD）。GSCも実績データが乏しい（impr3のみ）。結果としてHOLD。
- **Photoroom**: アプリ/製品としてのナビゲーショナル・EC/写真加工系のインフォメーショナル意図が混在。独立媒体は多いが、GSCデータが全く取得できておらず（NO_GSC_DATA）実績評価ができないためHOLD。
- **Kling AI / Hailuo AI**: いずれも日本語AIメディアが既に多数上位表示されている（独立編集記事に対してオープンなSERP）。この2つはPRIORITY_NOWに採用。特にHailuo AIはSERPの開放度に対しGSCページ順位が最も低く（pos19.61）、伸び余地が最大。

## PRIORITY_NOW

### 1. stable-diffusion
- target keyword: 「stable diffusion」
- canonical URL: /tools/stable-diffusion/
- monthly search volume: 500,000（要注意：エコシステム/ジェネリック性の強いキーワード、単純なSaaSブランドと同質評価しない）
- 現在のGSC状況: ページpos12.48・impr287・clicks2・CTR0.70%（17日間）。ブランドクエリ単独はpos2.06・impr36だがclicks0。
- SERP opportunity: MODERATE。単一の公式サイトが存在しない分散エコシステムのため、公式ドメイン一強ではない。大手JP AI媒体（tech-camp/aismiley/miralab等）が上位に多いが、包括的な比較・実例・料格整理を伴う独立コンテンツで対抗可能。
- why now: 検索ボリュームは最大級かつGoogleはすでにページを認識（pos12・impr287）。上位10位入りできればクリックの大幅増が見込める。SERPが公式一強でないため独立記事の相対的な勝ち筋がある。
- 具体的強化領域: FAQ拡充（現行7件、比較・料格・商用利用範囲の深掘り）／冒頭定義の明確化（「Stable Diffusionとはエコシステムである」旨を含め、単体ツールではない点を正しく説明）／内部リンク強化（動画生成・画像生成カテゴリページから）／実例（生成画像）の追加。
- カニバリ回避: 新規の「Stable Diffusionとは」記事を別途作らない。既存の/tools/stable-diffusion/を強化する。

### 2. kling-ai
- target keyword: 「kling ai」
- canonical URL: /tools/kling-ai/
- monthly search volume: 50,000
- 現在のGSC状況: ページpos9.74・impr42・clicks0（17日間）。ブランドクエリ単独データはNO_GSC_DATA（テールクエリのみ検出）。
- SERP opportunity: OPEN。WEEL/aismiley/miralab/ai-revolution/aipicks等、独立JP AI媒体が多数上位表示。
- why now: すでにpos10近辺まで来ており、わずかな強化でtop10入りが狙える。ページ側はFAQ0件・japaneseUi=partialとコンテンツの深さに明確な伸び余地がある。
- 具体的強化領域: FAQ新規追加（料格/商用利用/無料枠/安全性など、既に強い媒体が扱っているトピック）／japaneseUi実態の再検証と明記強化／料格・商用利用セクションの深掘り／内部リンク（動画生成カテゴリ・比較記事）。
- カニバリ回避: 新規スタンドアロン「Kling AIとは」記事は作らない。/tools/kling-ai/を正本として強化。

### 3. hailuo-ai
- target keyword: 「hailuo ai」
- canonical URL: /tools/hailuo-ai/
- monthly search volume: 50,000
- 現在のGSC状況: ページpos19.61・impr46・clicks1（17日間）。ブランドクエリ単独データはNO_GSC_DATA。
- SERP opportunity: OPEN。aismiley/tech-camp/WEEL/ai-gallery/romptn/ai-review等の独立JP AI媒体が多数上位表示。
- why now: SERPの開放度（独立媒体が多数ランクイン）に対して、当該ページの現在順位（pos19.61）が12ツール中最も見劣りする。開放的なSERPで実績が伴っていないという「取り残されているギャップ」が最大の伸び余地。
- 具体的強化領域: 冒頭定義・第一印象セクションの強化／FAQ新規追加（0件）／japaneseUi=falseの実態再検証（未確認のまま弱みとして放置しない）／商用利用セクションの明確化／内部リンク（動画生成カテゴリ・比較記事）。
- カニバリ回避: 新規スタンドアロン記事は作らない。/tools/hailuo-ai/を正本として強化。

## WATCH

- **pixverse**（score 65）: 「pixverse 商用利用」がpos3.67なのにCTR0%という即効性の高いタイトル/メタ改善余地があるが、ブランド検索ボリューム自体が5,000と小さく、PRIORITY_NOWの3件と比べ優先度は一段落ちる。次サイクルの有力候補。
- **luma-ai**（score 62）: page pos7.27・impr154に対しCTR0.65%と低い。タイトル/スニペット改善だけで即効性のある伸びが期待できる。
- **vidu-ai**（score 60）: 既存GSC文書でもCTR改善のN1候補として記載済み。次サイクル優先候補。

## HOLD

- **pika**（50）: pos6.08と良好だがimpr12と母数が小さく実績を確定できない。
- **photoroom**（48）: NO_GSC_DATA。データが揃うまで判断保留。
- **recraft**（44）: NO_GSC_DATA、SERP未観測。判断材料不足。
- **adobe-firefly**（44）: Adobe公式ドメイン優位でSERP到達可能性が低い。GSC実績もimpr3のみ。
- **runway**（42）: 「runway 商用利用」の順位悪化トレンド（pos8.08→12.92）があり、新規強化より先に悪化原因の切り分けが必要。
- **creatify**（42）: ブランドボリューム500と最小、NO_GSC_DATA。

## Recommended SEO Actions（PRIORITY_NOWのみ・非実装）

| Tool | 主な改善領域 |
|---|---|
| stable-diffusion | FAQ拡充、冒頭定義の精緻化（エコシステムである旨）、内部リンク強化、実例追加 |
| kling-ai | FAQ新規追加、japaneseUi実態再検証、料格/商用利用セクション深掘り、内部リンク強化 |
| hailuo-ai | 冒頭定義強化、FAQ新規追加、japaneseUi実態再検証、商用利用セクション明確化、内部リンク強化 |

いずれも既存の`/tools/<slug>/`（9ツールはSTATIC_OVERRIDES経由のToolDetailPage.astro、stable-diffusion含む）を対象とし、新規スタンドアロン記事は作らない（カニバリゼーション回避）。

## Risks and Limitations

1. ライブJapan Google SERPの直接観測ができなかった（Chrome拡張未接続）。WebSearchによる近似は「独立記事の存在傾向」の代替に過ぎず、実際の順位・公式サイトの占有位置は未確定。
2. GSCデータは17日間・property全体のパーシャルデータ。ブランドクエリ単独の行が取得できたのはstable-diffusionとluma-aiのみで、他10ツールは非ブランドテールクエリまたはNO_GSC_DATA。
3. FAQ見出し0件と判定した9ツール（STATIC_OVERRIDES対象）は、実際のライブページのFAQブロックが`.md`ではなく別データソース経由で表示されている可能性があり、本監査では未検証。次フェーズ実装前に必ずastroコンポーネント側を確認する必要がある。
4. stable-diffusionの500,000ボリュームはエコシステム/ジェネリック性が強く、単純な優先度シグナルとして扱っていない（discount済み）。
5. スコアはすべて本監査内の相対採点であり、絶対的な優先順位を保証するものではない。次回GSCデータ（14日データが取得可能になった時点）で再検証が必要。

## Next Step

**stable-diffusionページ（/tools/stable-diffusion/）の強化を最優先で着手する。** ただしkling-ai・hailuo-aiとほぼ同点であり、実装リソースが1件のみなら、STATIC_OVERRIDES経由のToolDetailPage.astro側データ構造を先に確認してから着手する。実装はまだ行わない。
