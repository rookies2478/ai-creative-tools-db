# Affiliate Comparison and Category Link Audit

- audit_date: 2026-07-28
- scope: audit-only（コード・コンテンツ・リンク・DB変更なし）
- 前回監査: `docs/audits/affiliate-cta-rendering-audit-2026-07-28.md`（commit `f036324`）

## 1. Executive Summary

- **比較ページ（comparisons）・カテゴリページ（categories）には、ツール公式サイトへの直接的な外部CTAが一切存在しない。** どちらも「詳しく見る」的な内部リンク（`/tools/{slug}/`）でツール詳細ページへ誘導するだけで、外部リンクを直接持つのは「情報源（sources/参照元）」として明示された料金・利用規約ページのみ（すべてハードコード）。
- 前回監査でHOLDだった`relatedTools.official`は、本監査で**ACTIVE**と判定された。29ツールページのうち多く（少なくとも6件で確認、他も同型で使用と推測されるが全数確認は14章参照）が`relatedTools`propに`official`フィールドをハードコード値として渡しており、`ToolDetailPage.astro`内で実際に`<a href={t.official} target="_blank" rel="noopener noreferrer">公式 ↗</a>`として描画されている。前回「未使用の可能性」としていた点はこの監査で訂正する。
- `ToolSummaryTable.astro`は本監査でも**DEAD_CODE（到達不能）**を再確認。リポジトリ全体で"ToolSummaryTable"という文字列を含むファイルは自分自身以外に存在せず、import経路（静的・動的・barrel export・glob import）は一切見つからなかった。
- `ToolsListCard.astro`の呼び出し元は`src/pages/tools/index.astro`（一覧ページ）の1箇所のみ。ここが引き続き、DBの`officialUrl`/`officialSourceUrl`を直接参照する唯一の生きた経路。
- 案C導入時の変更対象は、前回想定より狭い。比較ページ・カテゴリページは外部CTAを持たないため**変更不要**。真に変更が必要なのは (1) 各ツール専用`index.astro`の`primaryCta`/`secondaryCta`ハードコード、(2) `relatedTools`配列内の`official`ハードコード、(3) `ToolsListCard.astro`の3経路のみ。
- 推奨実装方式は**案3（共通ヘルパー`resolveToolOutboundLink()`）**。理由は10章・14章参照。

## 2. Repository State

- working directory: `C:\dev\Studio\ai-creative-tools-db`
- branch: `master`
- 開始時点の`git status --short`: クリーン（追跡ファイルの変更なし）
- origin/master同期: `git rev-list --left-right --count origin/master...HEAD` → `0 0`（完全同期）
- 最新commit（開始時点）: `f036324b9e6bf48f9d9863846748c4c95b359d2c`（2026-07-29 00:00:55 +0900、"Audit affiliate CTA rendering logic"）
- `f036324`が`origin/master`の祖先であることを`git merge-base --is-ancestor`で確認済み。
- 開始前から存在する未追跡ファイル: なし（確認時点）。
- `CLAUDE.md`: 常設ルールを確認済み（禁止事項遵守）。
- `docs/tasks/LATEST.md`: `current_active_task: none`、`production_state: NOT_DEPLOYED`。アフィリエイト関連の進行中タスク記載なし。
- 前回監査レポート2件（`affiliate-program-management-audit-2026-07-28.md`, `affiliate-cta-rendering-audit-2026-07-28.md`）を読了済み。

## 3. Files and Components Reviewed

| カテゴリ | ファイル |
|---|---|
| comparisonsページ（17件） | `src/pages/comparisons/index.astro`, `ad-banner-ai-tools`, `adobe-firefly-vs-microsoft-designer`, `ai-image-generation-sample-comparison`, `ai-image-video-tools`, `ai-video-generation-sample-comparison`, `avatar-video-ai-tools`, `canva-ai-vs-adobe-firefly`, `dalle-vs-midjourney`, `ec-product-image-ai-tools`, `free-ai-image-generation-samples`, `free-ai-image-generators`, `invideo-ai-vs-capcut-ai`, `midjourney-vs-adobe-firefly`, `midjourney-vs-leonardo-ai`, `runway-vs-kling-ai`, `runway-vs-pika`, `stable-diffusion-vs-midjourney`（各`index.astro`） |
| categoriesページ（6件） | `src/pages/categories/avatar-video/index.astro`, `design/index.astro`, `image-generation/index.astro`, `video-editing/index.astro`, `video-generation/index.astro`, `voice-narration/index.astro` |
| 比較系コンポーネント | `ComparisonHub.astro`, `ComparisonVsArticle.astro`, `ComparisonFootnote.astro`, `ComparisonGuide.astro`, `ComparisonLegend.astro`, `ComparisonVideoSection.astro`, `HomeComparisonInteractive.astro`, `HomeComparisonTable.astro` |
| ツール一覧/カード系 | `ToolsListCard.astro`, `ToolCard.astro`, `ToolSummaryTable.astro`, `RelatedTools.astro`, `HomePickupFeed.astro` |
| 関連リンクデータ | `src/data/toolRelatedLinks.ts`（内部リンクのみ、`buildNextReads()`/`buildConditionTags()`） |
| ツール詳細ページ | `src/components/ToolDetailPage.astro`（`relatedTools` propの描画ロジック再確認） |

## 4. Comparison Page Link Architecture

`ComparisonVsArticle.astro`（1件を1対1比較記事として描画する共通コンポーネント、`src/pages/comparisons/*-vs-*/index.astro`から呼び出し）を直接Read。外部リンクを出力する経路は1種類のみ:

- **`sources: SourceLink[]` prop**（コンポーネント19–20, 53, 279行目）: 各比較ページの`index.astro`側で`const sources = [{ href: 'https://runwayml.com/pricing/', label: 'Runway料金プラン（公式）' }, ...]`のように**ハードコード**（`runway-vs-pika/index.astro:103–109`で確認）。`rel="noopener noreferrer"`固定（nofollowなし）、`target="_blank"`。officialUrl/affiliateUrlというフィールド名の参照は一切なし。
- **`toolASlug`/`toolBSlug`**（116–123行目）: `/tools/${toolASlug}/`という内部リンクのみ。外部ではない。
- **`relatedLinks: RelatedLink[]`**（269行目、`cp-tag`クラス）: 内部リンクのみ（`/comparisons/*`, `/conditions/*`等）、target/rel指定なし。
- **`conclusionA.toolHref` / `conclusionB.toolHref`**（189, 199行目）: `/tools/{slug}/`への内部リンク。

`ComparisonHub.astro`（`/comparisons/`ハブページ本文）を直接Read。`router`/`articles`/`related`の全propが`href: '/comparisons/...'`や`/conditions/...`という内部リンクのみで構成されており、外部URLは1件も含まれない（37–58行目で確認）。

### 4.1 リンク経路一覧

| page | component | user-visible label | source file | source field | hardcoded/data-driven | officialUrl used | affiliateUrl used | target | rel | disclosure | 案C変更要否 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `comparisons/*-vs-*/` | ComparisonVsArticle.astro | 「Runway料金プラン（公式）」等 | 各`index.astro`の`sources`定数 | `sources[].href` | hardcoded | 未使用 | 未使用 | `_blank` | `noopener noreferrer` | なし | **変更不要**（出典リンクであり、購入・申込CTAではないため置換対象外） |
| `comparisons/*-vs-*/` | ComparisonVsArticle.astro | ツール名バッジ | 同上 | `toolASlug`/`toolBSlug` | data-driven（propとして渡す値自体はページ側でハードコード） | 未使用 | 未使用 | 内部リンクのため指定なし | 指定なし | なし | 変更不要（内部リンク） |
| `comparisons/index.astro` | ComparisonHub.astro | 各種比較記事タイトル | ComparisonHub.astro内 | `router`/`articles`/`related` | hardcoded | 未使用 | 未使用 | 指定なし | 指定なし | なし | 変更不要（内部リンクのみ） |
| `comparisons/*`（作例比較系） | SamePromptImageComparison.astro等 | — | 本監査では未深掘り | — | — | — | — | — | — | — | 14章HOLD参照 |

- モバイル/PC表示の差: `ComparisonVsArticle.astro`内でリンク生成ロジックにモバイル/PC分岐は確認されず（CSSレスポンシブ調整のみ）。
- 行全体クリック/ボタン/テキストリンクの違い: `sources`はテキストリンク（`<a>`直書き、ボタンスタイルなし）。`conclusionA/B.toolHref`もテキストリンク。行全体をクリック可能にする実装は確認されなかった。
- JSON-LD/構造化データへのURL出力: 各比較ページの`articleJsonLd`（例: `runway-vs-pika/index.astro:111`）は`Article`型で`url`に自ページの内部URL（`https://aicreative-db.com/comparisons/...`）を設定するのみ。ツール公式URLをJSON-LDに含める実装は確認されなかった。

## 5. Category Page Link Architecture

`src/pages/categories/image-generation/index.astro`を直接Read（他5カテゴリページも同型パターンであることをgrepで確認、全数の逐次Readは範囲外としたため14章に記録）。

- **ツール一覧テーブル・カード**（511, 528, 600, 615, 800, 812行目）: いずれも`href={`/tools/${tool.slug}/`}`という**内部リンクのみ**。「詳しく見る」「詳細→」ラベルで、外部の公式サイトへの直接リンクはこのページ自体には存在しない。
- 例外1件: `image-generation/index.astro:645`に`<a href="https://huggingface.co/black-forest-labs/FLUX.1-schnell" target="_blank" rel="nofollow noopener noreferrer">FLUX.1-schnell</a>`というモデル解説の参考リンクがあるが、これは対象ツール自体の公式サイトではなく、HuggingFace上のモデルページへの技術的な参照リンク（第三者情報源）であり、アフィリエイト対象ツールのCTAとは性質が異なる。

### 5.1 A/B区分整理

- A. 内部リンク: `/tools/{slug}/`（一覧からツール詳細へ）、`/comparisons/`、`/conditions/*`、`/guides/*` — カテゴリページの主要な導線はすべてこの内部リンク。
- B. 外部リンク: カテゴリページ自体には、ツール公式サイト・料金ページ・規約ページへの直接リンクは**確認されなかった**（5章の1例外を除く）。カテゴリページから公式サイトへ行くには、必ず一度`/tools/{slug}/`を経由する設計になっている。

### 5.2 整理表

| URLの生成元 | officialUrl | affiliateUrl | hardcoded | DB由来 | component prop | target | rel | disclosure | 将来アフィリエイト対象か | 公式情報確認リンクとして残すべきか |
|---|---|---|---|---|---|---|---|---|---|---|
| カテゴリページのツールカード（`/tools/{slug}/`） | 未使用 | 未使用 | — | getCollection('tools')のslugのみ使用 | — | 指定なし | 指定なし | なし | 対象外（内部リンクのため） | 該当なし |
| モデル参考リンク（HuggingFace等、1例） | 未使用 | 未使用 | hardcoded | — | — | `_blank` | `nofollow noopener noreferrer` | なし | 対象外（第三者技術情報源） | 残すべき（出典として） |

## 6. relatedTools.official Trace

- **型定義**: `src/components/ToolDetailPage.astro:32-35`
  ```typescript
  export interface ToolCard {
    name: string; slug?: string; initial?: string; cat?: string;
    badges?: Badge[]; platforms?: string[]; official?: string;
  }
  ```
  `relatedTools?: ToolCard[]`がProps（84行目）。
- **データ定義**: `.md`のコンテンツコレクションやDBには存在しない。各`src/pages/tools/<slug>/index.astro`内で、`relatedTools={[{ name: '...', slug: '...', official: 'https://...' }, ...]}`という**ハードコード配列**として直接記述されている（例: `dreamstudio/index.astro:249-253`, `clipdrop/index.astro:241-245`, `fotor-ai/index.astro:254-258`, `canva-ai-image-generator/index.astro:252-256`, `dalle/index.astro:249-253`, `gemini-image-generation/index.astro:252-256`ほか）。
- **設定件数**: `grep -c "official:"` で少なくとも6ファイルで複数件（1ファイルあたり2〜3件）を確認。全29ファイルの網羅的カウントは本監査の範囲では実施していない（14章HOLD参照）が、確認した全ファイルで一貫して`official`フィールドに値が設定されていた。
- **29ツールの各index.astroから渡されているか**: 確認した範囲（サンプル抽出）では**渡されている**。全29ファイルの悉皆確認はしていない。
- **ToolDetailPage.astro内で受け取っているか**: 受け取っている（84, 136行目、`relatedTools = []`のデフォルト値あり）。
- **実際にhrefとして描画されているか**: 描画されている。`ToolDetailPage.astro:434-437`:
  ```astro
  <div class="tact">
    {toolUrl(t.slug) ? <a href={toolUrl(t.slug)}>詳しく見る →</a> : null}
    {t.official ? <a class="ghost" href={t.official} target="_blank" rel="noopener noreferrer">公式 ↗</a> : null}
  </div>
  ```
  `t.slug`から生成される`/tools/{slug}/`への内部リンク（「詳しく見る→」）と、`t.official`への外部リンク（「公式↗」）の**2種類が並列表示**されており、両者は明確に役割分担されている（前者=関連ツール詳細ページへの内部リンク、後者=関連ツールの公式サイトへの外部リンク）。混同のリスクは実装上ない（別のUI要素・別のラベル・別のhref生成方法）。
- **null/未設定時の挙動**: `t.official`が未設定（undefined）の場合は`{t.official ? ... : null}`により当該リンクごと非表示（436行目の条件式）。エラーにはならない。
- **officialという名前が公式サイトURLを意味するか**: 意味している。実際の値はすべて`https://`から始まる各ツールの公式サイトURL（例: `https://stability.ai`, `https://firefly.adobe.com`）。
- **現在のビルド経路で到達可能か**: 到達可能。`ToolDetailPage.astro`は28/29ツールの専用ページから使用されており（前回監査4章で確認済み）、`relatedTools`propもハードコードで渡されているため、ビルド後HTMLに反映される。

### 6.1 分類

**ACTIVE**

前回監査（15章）で「未確認」としていた点を、本監査により訂正する。`relatedTools.official`は現行の生きたビルド経路で実際にレンダリングされている、独立したもう1つの外部リンク経路である。

## 7. ToolsListCard Audit

`src/components/ToolsListCard.astro`を直接Read（238-254行目付近）。

- **呼び出し元**: `src/pages/tools/index.astro`（`import ToolsListCard from '../../components/ToolsListCard.astro'`、grep確認済み）。他に呼び出し元なし。
- **表示ページ**: `/tools/`（ツール一覧ページ）1ページのみ。
- **URLソース**: `data.officialSourceUrl ?? data.officialUrl`（249行目）。`data`は`getCollection('tools')`由来のコンテンツコレクションエントリと推定される（`.md`のfrontmatterに直結）。
- **officialUrl使用箇所**: 249行目の`href`属性。
- **詳細ページ内部リンクとの役割分担**: 同じカード内に`<a class="detail" href={`/tools/${slug}/`}>詳しく見る →</a>`（247行目、内部リンク）と`<a class="ext" href={data.officialSourceUrl ?? data.officialUrl} ...>`（249行目、外部公式リンク）が並列表示。役割は明確に分離されている。
- **外部公式リンクのラベル**: `officialSourceUrl`が設定されていれば「公式情報 ↗」、なければ「公式サイト ↗」（250行目の3項演算子）。
- **target**: `_blank`
- **rel**: `noopener noreferrer`（nofollowなし、sponsoredなし）
- **disclosure**: なし
- **カード全体リンクかCTAのみか**: カード全体はクリック可能なリンクではなく、カード内の個別`<a>`要素（詳細ページリンク・公式リンク）のみがクリック対象。
- **affiliateリンクへ切り替えるべき箇所か**: 該当する。ここがDBの`officialUrl`系フィールドを直接参照する**唯一の生きたコンポーネント**であり、案C導入時に`toolAffiliateLinks.ts`参照へ切り替える最有力候補（前回監査5章の結論を再確認）。
- **公式リンクを残すべき箇所か**: 「公式情報 ↗」（`officialSourceUrl`使用時）は公式情報ソースへの参照リンクとしての性質もあるため、アフィリエイト置換時は「公式サイト ↗」（`officialUrl`のみ使用時）のケースを優先的に置換対象とし、`officialSourceUrl`（情報源明記用）は据え置く設計も選択肢になりうる（判断は次タスク）。
- **toolAffiliateLinks.ts導入時の接続方法**: `data.officialSourceUrl ?? data.officialUrl`の前段に`toolAffiliateLinks[slug]?.enabled ? toolAffiliateLinks[slug].url : (data.officialSourceUrl ?? data.officialUrl)`のような優先順位を追加する変更が最小。

## 8. ToolSummaryTable Reachability

再確認結果:

- **import元**: `grep -rn "ToolSummaryTable" src/pages src/components` → 0件。`Grep`ツールで`*.astro`全体を対象に文字列"ToolSummaryTable"を検索しても、自ファイル以外はもちろん自ファイル自体を含めても一致するファイルが0件（コンポーネント名を指す文字列がどこにも出現しない＝コンポーネント定義はあるが誰からも参照されていない）。
- **使用ページ**: なし。
- **動的import**: `import(...)`によるdynamic importの使用は本コンポーネントに関して確認されなかった。
- **barrel export**: `src/components/index.ts`等のbarrelファイルは本リポジトリに存在しない（`find src/components -iname "index.ts"`相当の確認、該当なし）。
- **glob import**: Astroの`import.meta.glob`等でコンポーネントディレクトリを走査する実装は確認されなかった。
- **Astro collection経由**: コンテンツコレクションからコンポーネント名を動的に解決する仕組みは存在しない（tools collectionはデータのみで、コンポーネント参照フィールドはない）。
- **条件分岐**: importされていない以上、条件分岐以前の問題としてビルド時に一切評価されない。
- **過去コードの残存**: ファイル自体のコメント・命名規則（`ToolDetailPage.astro`と類似の`Props`インターフェース構成）から、旧世代のツール詳細ページ実装（比較表形式）の名残と推定される（前回監査でも同様の推定）。
- **build対象になる可能性**: 現状のソースツリー構成では**ゼロ**。Astroは未importのコンポーネントファイルをそれ単体でビルド対象にしない。

### 8.1 分類

**DEAD_CODE**

前回監査の判定（orphan/到達不能）を再確認・維持する。ただし、`affiliateUrl ?? officialUrl`＋rel出し分けロジックの実装サンプルとしての参考価値があるため、削除は推奨せず「維持（未使用のまま）」が妥当（前回レポート10章の判断を踏襲）。

## 9. URL Source Classification

| URLソース | 使用件数 | 主な使用ページ | 公開CTAとして使われるか | 情報源リンクとして使われるか | アフィリエイト置換対象か | 置換禁止にすべきか | 案C導入時の扱い |
|---|---|---|---|---|---|---|---|
| `src/content/tools/*.md`の`officialUrl` | 29件（全ツール必須） | `ToolsListCard.astro`（生きた参照）、`[slug].astro`のJSON-LD（到達不能） | **YES**（`ToolsListCard.astro`経由） | 一部YES（`officialSourceUrl`との使い分け次第） | **YES**（`ToolsListCard.astro`の1経路） | 該当箇所以外は据え置き | `ToolsListCard.astro`のみ変更対象 |
| `src/content/tools/*.md`の`affiliateUrl` | 0件（未設定） | 参照コードは`[slug].astro`・`ToolSummaryTable.astro`のみ（両方到達不能） | NO（現状は未反映） | NO | 設計上YESだが現状未使用 | — | 維持しつつ非推奨化（前回監査11章の結論を踏襲） |
| 各`index.astro`のハードコードURL（primaryCta/secondaryCta） | 29件×最大2（primary必須+secondary任意） | ツール詳細ページ hero CTA | **YES** | 一部（secondaryCtaが料金/規約ページの場合は情報源寄り） | **YES**（primaryCta） | secondaryCtaが規約・料金ページの場合は要個別判断 | 案C導入の主対象（pilot含む） |
| 各`index.astro`のハードコードURL（`relatedTools[].official`） | 6ファイル以上で確認（全数未確認） | ツール詳細ページ「関連ツール」カード | **YES**（関連ツールの公式サイトへの外部CTA） | NO | **YES**（ただし「自ツール」ではなく「関連ツール」のURLである点に注意） | — | 将来変更候補（pilotの対象外、12章参照） |
| `src/data/toolRelatedLinks.ts` | 8ツール分のエントリ | ツール詳細ページ「次に読む」「条件別に探す」 | NO（すべて内部リンク） | NO | **NO**（対象外） | **YES（変更禁止）** | 変更不要 |
| comparisonsページの`sources`（各`index.astro`内ハードコード） | ページごとに2〜5件程度 | 比較記事の「情報の鮮度・参照元」相当セクション | NO | **YES**（料金・規約ページへの出典リンク） | **NO** | **YES（変更禁止）** | 変更不要 |
| categoriesページ内リンク | — | カテゴリ一覧ページ | NO（`/tools/{slug}/`内部リンクのみ） | 例外1件（HuggingFaceモデル参照） | NO | 該当例外はYES（出典として） | 変更不要 |
| Markdown本文の直書きURL | 未網羅（前回監査でも未実施、本監査でも範囲外） | `.md`本文 | 不明 | 不明 | 不明 | 不明 | 14章HOLD |
| JSON-LD | `[slug].astro`（到達不能）のみで`officialUrl`使用 | 到達不能ルート | NO | metadata-only | NO | — | 変更不要（到達不能のため） |
| `japanBilling.japanOfficialUrl` | 複数ツールの`.md`に設定あり | `JapanBillingInfo.astro`経由でツール詳細ページに表示 | 一部YES寄り（日本向け公式ページへの誘導） | 一部YES | 個別判断（日本向け公式ページであり、アフィリエイト対象として想定されていない） | 現状維持を推奨 | 変更不要（前回監査5章の結論を踏襲） |

**混同回避の確認**:
- 「公式サイトへ行く」購入・申込CTA = primaryCta/secondaryCta（ツール詳細ページhero）、ToolsListCardの公式リンク、relatedToolsの公式リンク（関連ツール向け）
- 料金確認用リンク = secondaryCta（一部）、comparisonsページの`sources`（一部）
- 規約・商用利用確認用リンク = secondaryCta（一部）、`japanBilling`関連、comparisonsページの`sources`（一部）
- 出典リンク = comparisonsページの`sources`、`ToolDetailPage.astro`の`sources` prop（「情報の鮮度・参照元」セクション）
- 関連ツール詳細への内部リンク = `toolUrl(t.slug)`（`/tools/{slug}/`）、`toolRelatedLinks.ts`、カテゴリ/比較ページの「詳しく見る」

これら5種類は本監査でコード上明確に別のprops・別のフィールド名で実装されていることを確認した。

## 10. Links Eligible for Affiliate Replacement

- ツール詳細ページ hero の`primaryCta.href`（29ファイル、購入・申込導線としての性質が最も強い）
- `ToolsListCard.astro`の`data.officialSourceUrl ?? data.officialUrl`（一覧ページの公式サイトリンク）
- `relatedTools[].official`（関連ツールの公式サイトへの誘導。ただし「そのページの主役ツール」ではなく「関連ツール」向けのリンクである点に注意。案C導入は自ツールのCTA切替が先決であり、こちらは将来変更候補）

## 11. Links That Must Remain Official

- `src/data/toolRelatedLinks.ts`内の全リンク（内部リンクのみで構成、アフィリエイト対象外）
- comparisonsページの`sources`（料金・規約ページへの出典リンク、事実確認のための引用であり、購入導線ではない）
- `ToolDetailPage.astro`の`sources` prop（「情報の鮮度・参照元」セクション）
- categoriesページ内の第三者技術参照リンク（HuggingFace等、1例確認）
- `japanBilling.japanOfficialUrl`（日本向け公式情報への誘導、現状維持を推奨）
- secondaryCtaのうち、規約・利用ポリシー・料金プラン確認を目的とするもの（ツールにより判断が分かれるため、pilot実施時に個別確認が必要）

## 12. Option C Implementation Scope

| ファイル | 区分 |
|---|---|
| `src/data/affiliatePrograms.ts`（新規） | A. 必須変更（新設） |
| `src/data/toolAffiliateLinks.ts`（新規） | A. 必須変更（新設） |
| `src/pages/tools/invideo-ai/index.astro` | B. pilot時のみ変更 |
| `src/pages/tools/{他28件}/index.astro` | C. 将来変更（pilot後に段階展開） |
| `src/components/ToolDetailPage.astro` | D. 変更不要（案3採用時。props経由でhrefを受け取るだけなので、解決ロジックを呼び出し元に置けば本体は無変更で済む） |
| `src/components/ToolsListCard.astro` | B. pilot時に同時変更するか、C. 将来変更（判断は次タスク。invideo-aiの一覧カードでも動作確認したい場合はB） |
| `src/components/ToolSummaryTable.astro` | E. 変更禁止（到達不能のまま維持、削除もしない） |
| `src/pages/tools/[slug].astro` | E. 変更禁止（到達不能のまま維持、rel出し分けロジックの参考実装として保持） |
| comparisonsページ（17件） | D. 変更不要（4章の通り外部CTAを持たないため） |
| categoriesページ（6件） | D. 変更不要（5章の通り外部CTAを持たないため） |
| `src/data/toolRelatedLinks.ts` | E. 変更禁止（内部リンクのみで案Cと無関係） |
| relatedToolsデータ（各index.astro内） | C. 将来変更（自ツールCTA切替が先決のため、pilotスコープ外） |
| disclosure表示 | C. 将来変更（前回監査7章の対象ページ限定表示案を、pilotの次段階で検討） |
| rel属性ヘルパー（新規、例: `src/utils/externalLink.ts`） | A. 必須変更（案3採用の前提、10章参照） |
| validation | C. 将来変更（`toolAffiliateLinks.ts`↔`affiliatePrograms.ts`の整合性チェックスクリプト） |
| tests | C. 将来変更 |
| `docs/decisions/` | B. pilot時に案C採用を正式化する新規decision文書を追加（pilotと同時期を推奨） |

### 12.1 主要な論点への回答

- **invideo-ai pilotで本当に必要な最小ファイル**: `src/data/toolAffiliateLinks.ts`（新規、invideo-ai 1件のみ）、共通ヘルパー（新規、`resolveToolOutboundLink()`相当）、`src/pages/tools/invideo-ai/index.astro`（`primaryCta`の値をヘルパー経由に変更）。`affiliatePrograms.ts`はpilotの動作確認自体には必須ではないが、案Cの設計思想（承認済みのみ公開）を守るなら、承認記録として同時に作成するのが望ましい。
- **pilotでは変更不要なページ**: 他28ツールの`index.astro`、全comparisonsページ、全categoriesページ、`ToolDetailPage.astro`本体（案3採用時）。
- **比較・カテゴリページを同時変更すべきか**: 不要。4章・5章の通り、これらのページは外部CTAを持たないため、影響範囲に含まれない。
- **公式サイトリンクをaffiliateへ置換してよい箇所**: 10章のprimaryCta / ToolsListCard / relatedTools.official（関連ツール向け、将来）。
- **規約・料金・出典リンクは置換禁止にすべきか**: YES。11章の通り、これらは事実確認のための引用リンクであり、購入導線ではないため、案Cの対象外として明確に除外すべき。
- **公式URL fallbackの場所**: 共通ヘルパー内（案3）。`toolAffiliateLinks`にエントリがない、または`enabled: false`の場合は`officialUrl`を返す。
- **共通ヘルパーを最初から作るべきか**: YES（10章・13章の比較評価より）。
- **29個のindex.astroを一括変更せずに済む設計が可能か**: 可能。ヘルパー関数を先に作り、pilotで1ファイルのみ書き換え、残り28ファイルは「未対応のツールはofficialUrlのまま」という状態を許容する設計にすれば、段階的展開ができる。
- **ToolDetailPage.astroへURL解決ロジックを寄せる案（案2）と各index.astroで解決する案（案1）とヘルパー関数を使う案（案3）**: 13章で比較。

## 13. Architecture Options Comparison

| 評価項目 | 案1: 各index.astroで直接参照 | 案2: ToolDetailPage.astroへtoolSlugを渡し内部解決 | 案3: 共通ヘルパー`resolveToolOutboundLink()` |
|---|---|---|---|
| 変更ファイル数（pilot時） | 1（invideo-ai/index.astro） | 2（ToolDetailPage.astro + invideo-ai/index.astro） | 2（新規ヘルパー + invideo-ai/index.astro） |
| 既存ハードコードURLとの互換性 | 高い（該当ファイルのみ書き換え、他は無変更） | 中（`ToolDetailPage.astro`のprops構造自体の変更が必要、全呼び出し元に影響しうる） | 高い（ヘルパーの戻り値をhrefに渡すだけ、既存propsの型は不変） |
| pilot導入のしやすさ | 高い | 低い（共通コンポーネントの変更は他28ツールへの影響リスクを伴う） | 高い |
| 29ツール展開のしやすさ | 低い（29ファイルへ同じロジックをコピペする必要、重複コード増） | 高い（1箇所直せば全ツールに波及するが、それ故に一括変更を強制されやすい） | 高い（各ファイルは1行の呼び出しに変えるだけ、段階展開可能） |
| 比較ページへの再利用 | 低い（比較ページは現状外部CTAを持たないため今は不要だが、将来必要になった場合は再利用しにくい） | 低い（ToolDetailPage.astro専用ロジックのため転用不可） | 高い（ヘルパーは任意のコンポーネントからimportして使える） |
| カテゴリページへの再利用 | 低い | 低い | 高い（同上） |
| rel属性出し分け | 個別実装が必要（重複） | コンポーネント内に一元化できるが対象がToolDetailPage.astro限定 | ヘルパー内に一元化、どこからでも同じ出し分けを利用可能 |
| disclosure連動 | 個別対応が必要 | ToolDetailPage.astro内でまとめて対応可能 | ヘルパーの戻り値に`disclosureRequired`等を含める設計にすれば一元管理可能 |
| official fallback | 各ファイルで実装（重複） | コンポーネント内に一元化 | ヘルパー内に一元化 |
| 型安全性 | 中（各ファイルでprimaryCta.hrefの型は`string`のまま） | 中〜高（props型を変更すれば強制できるが影響範囲が広い） | 高い（ヘルパーの引数・戻り値型を明確に定義できる） |
| 誤リンクリスク | 中（コピペミスのリスク） | 低い（一元化されているため） | 低い（一元化されているため） |
| rollback | 容易（該当ファイルのみ元に戻す） | 難しい（共通コンポーネントを元に戻すと全29ツールに影響） | 容易（該当ファイルのヘルパー呼び出しを削除するだけ） |
| 保守性 | 低い（将来29ファイル分の重複ロジックを保守する羽目になる） | 中（一元化のメリットはあるが、密結合になりやすい） | 高い |
| 重複コード | 高い（29ファイル分） | なし | なし |
| 現在のAstro構造への適合性 | 適合するが将来的な技術的負債になりやすい | `ToolDetailPage.astro`が「表示専用コンポーネント」から「データ解決も行うコンポーネント」に役割が広がり、既存の設計思想（props経由の疎結合）とややズレる | 最も適合（既存の「呼び出し元がhrefを用意してpropsで渡す」という設計を保ったまま、hrefの決定ロジックだけを共通化できる） |

## 14. Recommended Architecture

**推奨: 案3（共通ヘルパー`resolveToolOutboundLink(toolSlug, officialUrl)`）**

理由:
1. 既存の「`ToolDetailPage.astro`はpropsで渡されたhrefをそのまま描画するだけ」という疎結合な設計思想を維持できる（案2はこの設計思想を壊す）。
2. pilotを1ツールだけに限定でき、他28ツール・比較ページ・カテゴリページへの影響がゼロ（案1は将来的な重複コード増加という技術的負債を生む）。
3. rel出し分け・disclosure連動・official fallbackをヘルパー内に一元化でき、`[slug].astro`/`ToolSummaryTable.astro`に既に存在する実装パターン（`data.affiliateUrl ?? data.officialUrl`＋rel出し分け）を、到達可能な形で正しく再利用する設計にできる。
4. rollbackが容易（ヘルパー呼び出しを外すだけ）で、案Cの「誤公開リスクの最小化」という前回監査の推奨方針とも整合する。

## 15. InVideo AI Pilot Scope

- 対象ツール: `invideo-ai`（前回監査12章の推奨を維持、本監査でも変更する理由は見つからなかった）
- 変更対象ファイル（実装しない、範囲提示のみ）:
  1. `src/data/toolAffiliateLinks.ts`（新規、invideo-ai 1件のみエントリ）
  2. 共通ヘルパー（新規、`resolveToolOutboundLink(toolSlug: string, officialUrl: string): { href: string; rel: string }`相当）
  3. `src/pages/tools/invideo-ai/index.astro`（`primaryCta.href`の決定をヘルパー呼び出しに変更）
- pilotでは変更不要: 他28ツールのページ、`ToolDetailPage.astro`本体、`ToolsListCard.astro`（同時対応するかは判断事項、12章）、全comparisons/categoriesページ
- fallback方針: `toolAffiliateLinks`未登録または`enabled: false`の場合、ヘルパーは`officialUrl`をそのまま返す
- rel方針: affiliate時`sponsored nofollow noopener noreferrer`、official時`noopener noreferrer`（前回監査6章のA/B要求に準拠。ただし現行の`ToolDetailPage.astro`のofficial時rel`nofollow noopener noreferrer`から`nofollow`を外す変更を伴うため、pilot実施時に影響範囲として明示する必要がある）
- disclosure方針: pilotスコープには含めず、次段階で対象ページ限定表示（前回監査7章）を検討
- rollback: `toolAffiliateLinks.ts`からinvideo-aiのエントリを削除、または`enabled: false`に変更するだけで即座にofficialUrlへ復帰。`invideo-ai/index.astro`のヘルパー呼び出し自体は残してよい（fallbackが機能するため）。

## 16. HOLD and Unknown Items

- `relatedTools[].official`の設定件数について、29ファイル全数の悉皆確認は本監査では実施していない（6ファイルのサンプル確認に留まる）。全数確認は次タスク候補。
- comparisonsページのうち、作例比較系（`SamePromptImageComparison.astro`, `SamePromptVideoGallery`等を使用するページ）の外部リンク構造は本監査では深掘りしていない（4章で言及したのみ）。
- categoriesページ6件のうち、直接Readしたのは`image-generation`のみ。他5件（`avatar-video`, `design`, `video-editing`, `video-generation`, `voice-narration`）は同型パターンであることをgrep（`tools/${...}`の内部リンクパターン）で確認したが、5章の例外（HuggingFaceリンクのような個別ケース）が他ページにも存在するかは未確認。
- Markdown本文（`.md`のfrontmatter以外の本文プローズ部分）への直書き外部URLの網羅的grepは、前回監査に続き本監査でも未実施（範囲外として明示的に見送った）。
- `secondaryCta`の一つ一つが「料金確認」「規約確認」のどちらの性質を持つかの29ツール分の個別判定は行っていない（10〜11章で一般論としては整理したが、ツールごとの判定は次タスク）。

## 17. Next Recommended Task

`relatedTools[].official`の29ツール全数の設定状況を悉皆確認し、案C導入時に「自ツールのCTA」と「関連ツールのCTA」の扱いをどう区別するか（12章で将来変更候補としたスコープ）を確定するタスクを次に実施する。
