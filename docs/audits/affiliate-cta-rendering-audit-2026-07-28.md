# Affiliate CTA Rendering Audit

- audit_date: 2026-07-28
- scope: audit-only（コード・コンテンツ・リンク・DB変更なし）
- 前回監査: `docs/audits/affiliate-program-management-audit-2026-07-28.md`（commit `b2e19a8`）
- 本監査は前回監査の「ToolDetailPage.astroのCTAロジック要再確認」を受けたコード直接監査

## 1. Executive Summary

- **`ToolDetailPage.astro`自体はaffiliateUrl/officialUrlを一切参照していない。** CTAのhrefは呼び出し元（29個の`src/pages/tools/<slug>/index.astro`）が渡す`primaryCta`/`secondaryCta` props（ハードコードされた文字列URL）であり、コンテンツコレクション（`.md`のfrontmatter）を経由しない。
- **affiliateUrlを参照するコードは2箇所のみ存在するが、どちらも現在の29ツールに対して到達不能（dead code）。**
  - `src/pages/tools/[slug].astro`: `getStaticPaths()`内の`STATIC_OVERRIDES`が現行29スラッグ全件を含み、`.filter((entry) => !STATIC_OVERRIDES.has(entry.slug))`でこれらを除外している。したがって現行29ツールについてこのルートは1ページも生成されない。
  - `src/components/ToolSummaryTable.astro`: リポジトリ全体で本コンポーネントをimportしているファイルは0件（orphanコンポーネント）。
- したがって、**`affiliateUrl`にツールDB側で値を設定しても、現状のビルド済みページのどこにも反映されない。** 前回監査の「affiliateUrl未設定＝アフィリエイト未稼働」という結論は正しいが、根拠としては「値が0件」だけでなく「参照コード自体が到達不能」という、より強い理由がある。
- `officialUrl`が実際にビルドへ反映される生きた経路は2つ:
  1. `src/pages/tools/index.astro`（一覧ページ）→`ToolsListCard.astro`が`data.officialSourceUrl ?? data.officialUrl`を参照（`rel="noopener noreferrer"`、sponsoredなし）
  2. 各ツール専用ページ（29件）内の`primaryCta`/`secondaryCta`のハードコードURL文字列自体が、たまたま`.md`の`officialUrl`と同じ値になっている（コードとしては`.md`を参照していない、値の一致は人力メンテナンスの結果）
- PR/広告開示: サイト全体では`/about/`ページに「広告配信や一部アフィリエイトリンクを利用する場合がある」という一般的な将来表現の記載が1箇所あるのみ。CTA直前・比較表付近・フッターへの開示表示は現状なし。
- 前回監査の集計値不一致（29ツールの合計が30になる問題）を再集計した結果、原因は (a) `VERIFY_IN_ASP`の件数を11と誤記していた（実際のレポート本文の表は10件）、(b) `d-id`をレポート本文表では6.4 EXCLUDEに掲載しながら、完了報告のSUMMARYでは別途HOLD 1件として二重計上していた、の2つの誤りが重なったことによる。正しい排他分類の合計は29（9章参照）。

## 2. Repository State

- working directory: `C:\dev\Studio\ai-creative-tools-db`
- branch: `master`
- 本監査開始時点の`git status --short`: クリーン（追跡ファイルの変更なし）
- origin/master同期: 開始時点で**ローカルHEADがorigin/masterより1コミット先行**していた（`b66b6a8` "Update LATEST.md with commit SHA"、本監査と無関係。本セッションが開始する前後に別プロセス／別セッションがコミットしたものと推測されるが断定はしない）。この状態は本監査の対象範囲外であり、変更・取り消しは行っていない。
- 最新commit（開始時点）: `b66b6a8f20a3f5834d1c1d717a039a3734aac78e`（2026-07-28 23:53:46 +0900、"Update LATEST.md with commit SHA"）
- `b2e19a8ac24ac2a805553181a7582be4d0af8b18`（前回監査コミット）が`origin/master`の祖先であることを`git merge-base --is-ancestor`で確認済み（存在する）。
- 開始前から存在する未追跡ファイル: 確認時点でなし（前回監査時に存在した`src/data/videoFreeDownloadStatus.ts`は、本監査開始前に別コミットで取り込まれ済みと推測される。本監査では一切変更していない）。
- `CLAUDE.md`: 既知の常設ルールを確認済み（本レポート冒頭の禁止事項遵守）。
- `docs/tasks/LATEST.md`: `current_active_task: none`、`production_state: NOT_DEPLOYED`。アフィリエイト関連の進行中タスク記載なし。
- 前回監査レポート: `docs/audits/affiliate-program-management-audit-2026-07-28.md`（commit `b2e19a8`）を読了。

## 3. affiliateUrl Definition and Usage

### 3.1 スキーマ定義

- ファイル: `src/content/config.ts:21`
- 定義: `affiliateUrl: z.string().url().optional()`（`tools`コレクションのzodスキーマ内、`officialUrl: z.string().url()`（必須, line20）の直下）
- 型: 文字列URL、optional。`.strict()`ではないため未定義フィールドも素通りするが、これは別問題（前回監査3章で指摘済み）。

### 3.2 各ツールコンテンツでの設定件数

- `grep -rn "affiliateUrl:" src/content/tools/*.md` → **0件**（29ファイルすべて未設定）。前回監査と同じ結論を再確認。

### 3.3 読み取り処理・コンポーネントへの受け渡し・条件分岐

`affiliateUrl`という文字列がコード上に出現する箇所は以下の2ファイルのみ:

| file | 行 | 内容 |
|---|---|---|
| `src/pages/tools/[slug].astro` | 249, 251, 253 | `{(data.affiliateUrl ?? data.officialUrl) && (...)}` ブロックでCTA1個目のhref/rel分岐 |
| `src/pages/tools/[slug].astro` | 531, 534, 536 | 同ロジックの2箇所目（ページ内の別セクションのCTA、同一パターン） |
| `src/pages/tools/[slug].astro` | 766 | `conversionGuide`セクションのCTAでも同ロジック（`data.affiliateUrl ?? data.officialUrl`） |
| `src/components/ToolSummaryTable.astro` | 244–273 | 比較表内のCTAセルで同様の`(data as any).affiliateUrl ? ... : data.officialUrl`分岐、rel出し分けあり |

**到達可能性の判定:**

- `src/pages/tools/[slug].astro`の`getStaticPaths()`（同ファイル10–19行目）:
  ```
  const STATIC_OVERRIDES = new Set(['adobe-firefly', 'canva-ai-image-generator', 'microsoft-designer',
    'leonardo-ai', 'midjourney', 'dalle', 'stable-diffusion', 'gemini-image-generation', 'ideogram',
    'playground-ai', 'clipdrop', 'fotor-ai', 'seaart-ai', 'tensor-art', 'nightcafe', 'dreamstudio',
    'runway', 'kling-ai', 'luma-ai', 'pika', 'hailuo-ai', 'pixverse', 'vidu-ai', 'haiper', 'invideo-ai',
    'capcut-ai', 'heygen', 'synthesia', 'd-id']);
  return tools.filter((entry) => !STATIC_OVERRIDES.has(entry.slug)).map(...)
  ```
  このSetは現行29スラッグ全件（`src/content/tools/*.md`の全ファイル名と1対1）を含む。`getStaticPaths`はこのSetに含まれるスラッグを**除外**するため、現行29ツールについては`[slug].astro`から1件もページが生成されない。ビルド後HTMLに出力される可能性は**現状ゼロ**。
- `src/components/ToolSummaryTable.astro`: `grep -rn "ToolSummaryTable" src/pages src/components` の結果、importしている箇所が**0件**。コンポーネント定義自体は存在するが、どこからも呼び出されないorphanファイル。ビルド後HTMLに出力される可能性は**現状ゼロ**。

### 3.4 結論

- affiliateUrlは「未設定」であると同時に「設定しても現状は反映先が存在しない」休眠フィールドである。
- 将来利用を想定した休眠フィールドか、不要フィールドか: **将来利用を想定した休眠フィールドと判断できる根拠がある**（`[slug].astro`・`ToolSummaryTable.astro`双方に、officialUrlへのfallbackとrel出し分け＝`sponsored nofollow noopener noreferrer` vs `nofollow noopener noreferrer`まで作り込まれた実装が既に存在するため、単なる書き忘れではなく設計意図がある）。ただし、これらの実装が現行29ツールの実ページ構成（専用index.astro + ToolDetailPage.astro）と接続されないまま取り残されている状態であり、放置すると「動いていると誤認するリスク」がある。次アクション候補は14章・15章に記載。

## 4. ToolDetailPage CTA Logic

対象ファイル: `src/components/ToolDetailPage.astro`（直接Read済み、全773行）。28/29ツールがこのコンポーネントを使用（残り1件`adobe-firefly`は`AdobeFireflyTool.astro`という別コンポーネントを使用、ロジックはほぼ同一）。

- **Props定義**: `primaryCta: { label: string; href: string }`（必須）、`secondaryCta?: { label: string; href: string }`（任意）（42–92行目）。`href`は呼び出し元が渡す生の文字列であり、コンポーネント内でofficialUrl/affiliateUrlという名前のプロパティやフィールドを一切読んでいない。
- **CTA表示箇所・件数**: ヒーローセクション内1箇所（`.tdp-actions`、176–179行目）に primary（必須）＋ secondary（任意）の最大2ボタン。ページ内の他のCTA的要素（後述）はこの`primaryCta`/`secondaryCta`とは別の独立したprops（`sources`, `relatedTools`, `aboutMore`, `commercial.more`, `watermarkMore`, `conditions`）。
- **CTAラベル**: 呼び出し元が渡す文字列（例: `'公式サイトで確認する'`、`'公式サイトで最新の料金・機能を確認する'`）。
- **hrefの生成元**: `src/pages/tools/<slug>/index.astro`内で`primaryCta={{ label: '...', href: 'https://...' }}`のように**ハードコードされた文字列**（29ファイル全てで確認、5章の表に一覧化）。`.md`のfrontmatterを経由しない。
- **officialUrlの参照方法**: `ToolDetailPage.astro`自体には存在しない。ただし各`index.astro`のハードコードURLは、多くのツールで対応する`.md`の`officialUrl`と同一の値になっている（人力で一致させている状態であり、コード上のデータ連携はない）。
- **affiliateUrlの参照有無**: なし（3章で確認済み）。
- **fallbackロジック**: `ToolDetailPage.astro`内には存在しない（`primaryCta.href`は必須propのため常に呼び出し元の値がそのまま出力される）。null/undefinedの場合の挙動は、`primaryCta`が必須propのためAstroの型チェック上は常に値が渡される前提。`secondaryCta`のみ`? :`による有無分岐あり（178行目）。
- **target属性**: primary/secondaryとも`target="_blank"`（177–178行目）。
- **rel属性**: primary/secondaryとも`rel="nofollow noopener noreferrer"`固定（177–178行目）。affiliateUrlの有無による出し分けロジックはこのファイルにはない（そもそも参照していないため出し分けようがない）。
- **aria-label等**: CTAボタンにaria-label等の明示的な付与なし（ボタンテキスト自体がラベルとして機能）。
- **共通ボタンコンポーネントの利用有無**: 専用の`<Button>`的コンポーネントはなく、`class="btn btn-primary"` / `class="btn btn-ghost"`というCSSクラス直書きの`<a>`タグ（177–178行目）。rel/target属性もこの`<a>`タグに個別記述されており、共通関数化されていない。
- **CTAが複数箇所に存在するか**: あり。ヒーロー内のprimary/secondary（177–178）に加え、以下の外部リンク相当箇所が存在:
  - 「情報の鮮度・参照元」セクションの`sources`リンク（391行目、`target="_blank" rel="noopener noreferrer"`、nofollowなし）
  - 「関連ツール」カード内の`t.official`リンク（436行目、`target="_blank" rel="noopener noreferrer"`、nofollowなし）
  - `JapanBillingInfo.astro`内の`japanOfficialUrl`リンク（同コンポーネント80–83行目、`rel="nofollow noopener noreferrer"`）、`japanBilling`propとして多くのツールページから渡されている。
- **モバイル/PCでロジックが異なるか**: CTAのhref/target/rel生成ロジックにモバイル/PC分岐は確認されなかった（CSSのレスポンシブ調整のみ、714行目以降のmedia query）。
- **構造化データ等へのURL出力**: `ToolDetailPage.astro`自体にはJSON-LD出力なし。FAQ用JSON-LD（401–409行目）はURLを含まない。officialUrlを含むJSON-LD（`SoftwareApplication.url`）は`[slug].astro`（55行目、dead code）のみで、29ツール専用ページ側には同等のJSON-LD出力は本監査では確認されなかった（別途確認が必要、14章）。

## 5. Site-wide External Link Map

| file | component/page type | link label | URL source field | officialUrl usage | affiliateUrl usage | target | rel | disclosure | user-visible/metadata-only | future affiliate replacement impact |
|---|---|---|---|---|---|---|---|---|---|---|
| `src/pages/tools/<slug>/index.astro`（29件）+ `ToolDetailPage.astro`/`AdobeFireflyTool.astro` | ツール詳細ページ hero CTA | 「公式サイトで確認する」等 | ハードコード文字列（.mdのofficialUrlと値が一致するよう人力管理） | 間接的（値のみ一致、コード参照なし） | なし | `_blank` | `nofollow noopener noreferrer` | なし | user-visible | **高（要改修）** — affiliateUrl切替を導入する場合、29ファイル全てのハードコード値を書き換える必要がある。現状の設計では自動追従しない |
| `src/components/ToolDetailPage.astro`（sources） | ツール詳細ページ 参照元リンク | `s.tag`+`s.label` | `sources` prop（呼び出し元がハードコード） | なし | なし | `_blank` | `noopener noreferrer`（nofollowなし） | なし | user-visible | 低（アフィリエイト対象外の参照リンクのため） |
| `src/components/ToolDetailPage.astro`（relatedTools） | ツール詳細ページ 関連ツールカード | 「公式 ↗」 | `t.official` prop | 該当（呼び出し元が値を渡す想定） | なし | `_blank` | `noopener noreferrer`（nofollowなし） | なし | user-visible | 中（現状`relatedTools`にofficial値を渡している呼び出しは本監査では確認されていない＝未使用の可能性、14章） |
| `src/components/JapanBillingInfo.astro` | 日本向け課金情報ブロック | 「日本向け公式ページ ↗」 | `japanBilling.japanOfficialUrl` prop（`.md`の`japanBilling.japanOfficialUrl`から） | 該当（日本向け公式URL） | なし | `_blank` | `nofollow noopener noreferrer` | なし | user-visible | 低（日本向け公式ページであり、アフィリエイト置換対象として想定されていない） |
| `src/components/ToolsListCard.astro` | `/tools/`一覧ページ カード内リンク | 「公式サイト ↗」/「公式情報 ↗」 | `data.officialSourceUrl ?? data.officialUrl`（コンテンツコレクション直読み） | 該当（生きた参照） | なし | `_blank` | `noopener noreferrer`（nofollowなし） | なし | user-visible | **高（唯一のDB直結ライブ経路）** — ここに`affiliateUrl`を追加すれば即座に全ツール一覧へ反映される。逆に言えば、案C実装時に最初に手を入れるべき箇所候補 |
| `src/pages/tools/[slug].astro` | 汎用動的ツール詳細ルート（**現行29ツールには到達不能**） | 複数 | `data.affiliateUrl ?? data.officialUrl` | 該当 | 該当（実装済みだが未到達） | `_blank`（推定、要目視だが実質無関係） | `sponsored nofollow noopener noreferrer` / `nofollow noopener noreferrer`の出し分け実装あり | なし | user-visible（ただし生成されない） | **参考実装として保持する価値あり**（案C実装時のrel出し分けロジックの雛形として再利用可能） |
| `src/components/ToolSummaryTable.astro` | 比較表CTAセル（**どこからもimportされずorphan**） | 複数 | `(data as any).affiliateUrl ?? data.officialUrl` | 該当 | 該当（実装済みだが未到達） | 未確認（コンポーネント自体が呼ばれないため実質無関係） | `sponsored nofollow noopener noreferrer` / `nofollow noopener noreferrer`の出し分け実装あり | なし | 呼ばれないため無関係 | 同上（雛形として保持する価値あり） |
| `src/pages/tools/[slug].astro`（JSON-LD） | 構造化データ | — | `data.officialUrl` → `softwareAppJsonLd.url` | 該当 | なし | — | — | metadata-only | metadata-only | 低（到達不能ルートのため現状影響なし） |
| `src/pages/comparisons/*/index.astro`, `src/pages/categories/*/index.astro` | 比較ページ・カテゴリページ | — | `officialUrl`/`affiliateUrl`の直接参照は本監査で**検出されず**（`grep`で0件） | 未使用（要フォローアップ） | 未使用 | — | — | なし | 不明（別途調査要） | 不明（14章のHOLD項目） |
| `src/layouts/BaseLayout.astro` | 全ページ共通ヘッダー・フッター | 「運営者情報」等 | 内部リンクのみ（`/about/`等） | なし | なし | 内部リンクのためtarget指定なし | 内部リンクのためrel指定なし | フッターからのリンク先(`/about/`)に開示文あり（後述7章） | user-visible | 低 |

## 6. Link Attribute Audit

- `target="_blank"`の使用状況: 外部リンク（公式サイト・料金ページ・利用規約等）で広く使用。内部リンク（`/tools/slug/`, `/comparisons/`, `/conditions/*`等）には付与されていない（内外の判別は現状「target/relを書くかどうかを実装者が個別に判断」という運用であり、共通のinternal/external判定関数は見当たらない）。
- `rel`属性の実態:
  - `ToolDetailPage.astro`のhero CTA（primary/secondary）: `nofollow noopener noreferrer`
  - `ToolDetailPage.astro`のsources / relatedTools「公式」リンク: `noopener noreferrer`（nofollowなし）
  - `JapanBillingInfo.astro`: `nofollow noopener noreferrer`
  - `ToolsListCard.astro`: `noopener noreferrer`（nofollowなし）
  - `[slug].astro` / `ToolSummaryTable.astro`（いずれも到達不能）: `sponsored nofollow noopener noreferrer`（affiliateUrl時）/ `nofollow noopener noreferrer`（officialUrlのみの時）
- `rel="sponsored"`: リポジトリ全体で出現するのは`[slug].astro`と`ToolSummaryTable.astro`の2ファイルのみ（いずれも到達不能／orphan）。**現在ビルドされる実ページには`rel="sponsored"`は1件も出力されない。**
- 外部リンクアイコン: `<span class="ext">↗</span>`が複数箇所で使用（視覚的な外部リンク表示、支援技術向けの明示的なマークアップは特になし）。
- 同一タブ遷移: 内部ナビゲーション（`/tools/`, `/comparisons/`, `/conditions/*`, パンくず等）はtarget指定なし＝同一タブ。
- internal/externalの判別処理: 共通関数は存在しない。各コンポーネント・各ページで実装者が個別に`target="_blank"`・rel文字列を手書きしている状態。
- rel属性の共通関数または共通コンポーネント: **存在しない。** これが今回明らかになった重要な構造的ギャップである。

### 6.1 A/B判定（rel設計の実現可能性）

要求:
- A. officialUrl: `rel="noopener noreferrer"`、sponsoredなし
- B. affiliate link: `rel="sponsored nofollow noopener noreferrer"`

判定: **現状の構造では、A/Bの機械的な出し分けは一部でしか実現されていない。**

- `[slug].astro`と`ToolSummaryTable.astro`には、まさにこのA/Bパターンに近いrel出し分けロジック（`data.affiliateUrl ? 'sponsored nofollow noopener noreferrer' : 'nofollow noopener noreferrer'`）が既に実装されている。ただし要求Aの正確な文字列とは異なる（現行の「officialUrlのみの場合」は`nofollow`付きの`nofollow noopener noreferrer`であり、要求Aの`noopener noreferrer`（nofollowなし）ではない）。
- 現行29ツールの生きた経路（`ToolDetailPage.astro`のhero CTA、`ToolsListCard.astro`）では、rel文字列がハードコードされており、affiliateUrlの有無で分岐する仕組み自体が存在しない。
- 必要な変更箇所（実装はしない、箇所の提示のみ）:
  1. rel文字列を生成する共通ヘルパー関数（例: `getExternalLinkRel(hasAffiliate: boolean): string`）の新設
  2. `ToolDetailPage.astro`（177–178行目）・`AdobeFireflyTool.astro`（337–338行目）・`ToolsListCard.astro`（249行目）のrel/href生成箇所を、共通ヘルパー＋`toolAffiliateLinks.ts`参照に置き換え
  3. `[slug].astro`・`ToolSummaryTable.astro`の既存rel出し分けロジックを同じ共通ヘルパーに統一（現状は独自実装が2箇所に重複している）

## 7. Disclosure Audit

検索結果（`アフィリエイト`, `広告`, `PR`, `プロモーション`, `disclosure`, `運営者情報`等）:

- **サイト全体の開示**: `src/pages/about/index.astro`（142–143行目）に以下の記載を確認:
  > 「本サイトでは広告配信や一部アフィリエイトリンクを利用する場合があります。」
  > 「掲載順位や評価は、広告・アフィリエイトの有無だけで決定しません。」
  フッター（`BaseLayout.astro:187`）から`/about/`（運営者情報）への導線あり。
- **ページ単位の開示**: 確認されず（各ツール詳細ページ・比較ページ・カテゴリページ側に個別の開示表示なし）。
- **CTA直前の開示**: 確認されず。
- **比較表付近の開示**: 確認されず（そもそも比較ページからのofficialUrl/affiliateUrl直接参照自体が本監査では検出されなかった）。
- **フッター/運営者情報での開示**: `/about/`ページに上記の一般的な記載があるのみ（フッター自体に開示文はなく、リンク先ページに記載）。
- **`/privacy-policy/`**: Google AdSense等の第三者配信広告・Cookieに関する一般的な説明はあるが、「アフィリエイト」という語自体は含まれない（広告配信に関する記述のみ）。

### 7.1 将来実装する場合の候補箇所（実装はしない、評価のみ）

- 最小変更で済む実装案: `/about/`の既存記載を維持しつつ、実際にアフィリエイトリンクを含むページ（CTAボタン直下、または`.tdp-caution`注意書きブロック付近）に1行の定型文（例:「本ページのリンクにはアフィリエイトプログラムによるものが含まれます」）を追加する案が、既存の`.tdp-caution`コンポーネント構造（`ToolDetailPage.astro`181–184行目）を流用できるため最小コストになりうる。
- 全ページ表示 vs 対象ページ限定表示の比較:
  - 全ページ表示: 実装は単純（`BaseLayout.astro`のフッター等に1箇所追加するだけ）だが、実際にアフィリエイトリンクが存在しないページにも表示され続けると、将来的な運用上の意味が薄れる。
  - 対象ページ限定表示: `toolAffiliateLinks.ts`に`enabled: true`のエントリが存在するツールページのみ表示する設計にすれば、実態と表示が常に一致する。実装コストはテンプレート側の条件分岐1つ分で済む。
  - 評価（法的断定はせず、コード構造の観点のみ）: 対象ページ限定表示の方が、案Cのデータ構造（`toolAffiliateLinks.ts`の`enabled`フラグ）と自然に接続でき、二重管理を避けられる。

## 8. Previous Audit Count Reconciliation

前回レポート6章の表を再集計した結果:

| 区分 | 前回レポート本文の表での件数（実カウント） | 前回完了報告(SUMMARY)での件数 | 差異 |
|---|---|---|---|
| GO_CANDIDATE (6.1) | 6 | 6 | なし |
| VERIFY_IN_ASP (6.2) | **10**（heygen, ideogram, kling-ai, adobe-firefly, canva-ai-image-generator, runway, nightcafe, seaart-ai, vidu-ai, tensor-art） | 11 | **+1（誤記）** |
| NONE_FOUND (6.3) | 9 | 9 | なし |
| EXCLUDE (6.4) | **4**（leonardo-ai, dalle, clipdrop, d-id） | 3 | **-1（d-idを表からHOLDへ付け替えたが本文未修正）** |
| HOLD（本文に独立した章なし） | 0（d-idは6.4の表内に記載） | 1（d-id） | 本文とSUMMARYの不整合 |
| 単純合計 | 6+10+9+4 = **29** | 6+11+9+3+1 = **30** | +1 |

**原因**: 2つの誤りが独立に発生し、たまたま相殺せず合計を1件過剰にした。
1. `VERIFY_IN_ASP`の件数を本文の実際の表（10件）と異なる「11」として完了報告に記載した（単純な数え間違い）。
2. `d-id`は本文の表では6.4 EXCLUDEセクションに掲載されているが、その表内の備考欄では「HOLD相当としても良いが…EXCLUDE寄りに分類」と両論併記になっていた。完了報告作成時に、この備考の「HOLD相当」という一文を拾って独立したHOLD区分1件として計上した一方、EXCLUDE区分の件数を4→3に修正せず本文の表を更新しなかったため、結果的にd-idが「表の上ではEXCLUDE」「集計上はHOLD」の二重状態になった。

## 9. Corrected 29-Tool Classification

各ツール1つの排他的Primary statusに整理（判断が変わったのはd-idのみ。他は前回レポート本文の表どおり）。

| toolSlug | Primary status | 補助フラグ |
|---|---|---|
| capcut-ai | GO_CANDIDATE | official_program_confirmed, external_network_confirmed, country_restriction_unknown |
| invideo-ai | GO_CANDIDATE | official_program_confirmed, external_network_confirmed |
| pixverse | GO_CANDIDATE | official_program_confirmed, external_network_confirmed, dashboard_verification_required |
| fotor-ai | GO_CANDIDATE | official_program_confirmed, external_network_confirmed, dashboard_verification_required |
| hailuo-ai | GO_CANDIDATE | official_program_confirmed, external_network_confirmed, dashboard_verification_required |
| synthesia | GO_CANDIDATE | official_program_confirmed, external_network_confirmed, dashboard_verification_required |
| heygen | VERIFY_IN_ASP | official_program_confirmed, dashboard_verification_required |
| ideogram | VERIFY_IN_ASP | official_program_confirmed, dashboard_verification_required |
| kling-ai | VERIFY_IN_ASP | dashboard_verification_required, invite_only（第三者情報のみ） |
| adobe-firefly | VERIFY_IN_ASP | dashboard_verification_required |
| canva-ai-image-generator | VERIFY_IN_ASP | dashboard_verification_required |
| runway | VERIFY_IN_ASP | official_program_confirmed, external_network_confirmed, dashboard_verification_required |
| nightcafe | VERIFY_IN_ASP | official_program_confirmed, dashboard_verification_required |
| seaart-ai | VERIFY_IN_ASP | official_program_confirmed |
| vidu-ai | VERIFY_IN_ASP | official_program_confirmed |
| tensor-art | VERIFY_IN_ASP | dashboard_verification_required |
| **d-id** | **HOLD**（前回レポート本文表ではEXCLUDEに記載、本監査でHOLDへ訂正） | official_program_confirmed, invite_only |
| dreamstudio | NONE_FOUND | — |
| stable-diffusion | NONE_FOUND | — |
| gemini-image-generation | NONE_FOUND | — |
| haiper | NONE_FOUND | — |
| luma-ai | NONE_FOUND | — |
| microsoft-designer | NONE_FOUND | — |
| midjourney | NONE_FOUND | — |
| pika | NONE_FOUND | — |
| playground-ai | NONE_FOUND | — |
| leonardo-ai | EXCLUDE | program_ended |
| dalle | EXCLUDE | — |
| clipdrop | EXCLUDE | — |

### 主分類ごとの件数（訂正後）

- GO_CANDIDATE: 6
- VERIFY_IN_ASP: 10
- HOLD: 1（d-id）
- NONE_FOUND: 9
- EXCLUDE: 3（leonardo-ai, dalle, clipdrop）
- **合計: 6 + 10 + 1 + 9 + 3 = 29**（29ツールと一致）

### 「ASP管理画面確認要 約13件」とverify_in_aspの差の理由

前回レポート13章「ASP Dashboard Verification Checklist」に列挙されたツールを再集計すると、実際は以下の**14件**（fotor-ai, hailuo-ai, heygen, kling-ai, adobe-firefly, canva-ai-image-generator, runway, pixverse, synthesia, capcut-ai, nightcafe, vidu-ai, seaart-ai, tensor-art）であり、「約13件」という記載自体も本監査の再カウントでは不正確（14件が正しい）。

この14件は`VERIFY_IN_ASP`の10件と完全には一致しない。理由は、13章のチェックリストが「主分類」ではなく「ASP/公式ダッシュボードでの最終確認が必要な項目を持つツール」という**横断的な補助フラグ（dashboard_verification_required）**ベースで作成されていたため。具体的には、GO_CANDIDATE区分の6件のうち5件（fotor-ai, hailuo-ai, synthesia, pixverse, capcut-ai）も「数値の正確な裏取りが必要」という理由でチェックリストに含まれている（GO_CANDIDATEは「応募検討可」の意味であり「全条件確認済み」ではないため）。

- dashboard_verification_total（正しい件数）: **14**
- 内訳: VERIFY_IN_ASP主分類のうち dashboard_verification_required フラグを持つもの 9件（heygen, ideogram, kling-ai, adobe-firefly, canva-ai-image-generator, runway, nightcafe, seaart-ai\*, tensor-art）※seaart-ai/vidu-aiは13章チェックリストの1つの箇条書き内に3ツールまとめて記載されていたため個別トークンとしての精緻化が必要（14章に記録） + GO_CANDIDATEのうちdashboard_verification_requiredを持つもの5件（fotor-ai, hailuo-ai, synthesia, pixverse, capcut-ai）
- 結論: 前回SUMMARYの「約13件」は本監査の再集計により**14件が正確な値**である。今後は主分類（Primary status）と補助フラグ（dashboard_verification_required等）を明確に分けて集計・報告することを推奨する。

## 10. Minimal Implementation Architecture

案C（`affiliatePrograms.ts` + `toolAffiliateLinks.ts`）を導入する場合の最小変更案（実装はしない）。

- 新規ファイル候補:
  - `src/data/affiliatePrograms.ts`（調査・申請管理、型は前回レポート10章参照）
  - `src/data/toolAffiliateLinks.ts`（公開CTA承認済みリンク、型は前回レポート10章参照）
  - リンク属性生成の共通ヘルパー（例: `src/utils/externalLink.ts`、rel/target文字列を一元生成）
- 変更ファイル候補（最小限）:
  - `src/components/ToolsListCard.astro`（248–252行目付近）: `data.officialSourceUrl ?? data.officialUrl` の前段に `toolAffiliateLinks`参照を追加
  - `src/components/ToolDetailPage.astro`（176–179行目）・`src/components/AdobeFireflyTool.astro`（337–338行目）: 呼び出し元から渡す`primaryCta.href`の決定ロジックを、各`index.astro`側で`toolAffiliateLinks`参照に変更（コンポーネント自体は変更不要、呼び出し元のみ変更で対応可能な設計も選択肢）
  - パイロット対象の`src/pages/tools/<pilot-slug>/index.astro`（1ファイルのみ、12章参照）
- 変更不要なファイル:
  - `src/content/config.ts`（`affiliateUrl`フィールドの扱いは11章で判断するまで現状維持で問題ない）
  - `src/pages/tools/[slug].astro`・`src/components/ToolSummaryTable.astro`（到達不能/orphanのため、rel出し分けロジックの参考実装として当面は無変更で保持可能）
  - `src/content/tools/*.md`（案Cはツール仕様DBに手を入れない設計のため）
- 最初に導入する1ツール: 12章参照
- rollback方法: `toolAffiliateLinks.ts`から該当エントリを削除（またはenabled:falseに変更）するだけで即座にofficialUrlへフォールバック。ツール専用ページ側のコード変更は「officialUrlへのフォールバックあり」の実装にしておけば、ファイル自体を元に戻す必要はない。
- テスト: `toolAffiliateLinks.ts`の`toolSlug`が`affiliatePrograms.ts`の対応エントリで`approvalStatus === "approved"`であることを検証するスクリプト（`npm run validate:data`等の既存バリデーションへの追加を想定）。

## 11. Existing affiliateUrl Decision

評価: 既存の`affiliateUrl`（`src/content/config.ts`のoptionalフィールド）は、3章の通り「設定0件・参照コードは2箇所とも到達不能」という状態であり、実質的に機能していない。

- **廃止・維持・移行の判断**: 「維持しつつ非推奨化」を推奨する。理由:
  - 既に`.md`側で0件のため、削除しても現状のデータ損失はない。
  - しかし`[slug].astro`・`ToolSummaryTable.astro`という2つの実装済みrelロジックの参照先でもあるため、フィールド自体を即座に削除すると、これらのコード（到達不能だが将来の参考実装として価値がある）が型エラーになる。
  - 案C採用時は、CTA描画の主参照先を`toolAffiliateLinks.ts`に一本化し、`affiliateUrl`フィールドは「使用しない・新規設定しない」という運用ルールを明文化した上で、スキーマからは当面残しておく（明示的な非推奨コメントを付与する程度）のが最小リスクである。
- 完全に不要と判断し次第、`src/content/config.ts`からの削除・`[slug].astro`/`ToolSummaryTable.astro`の該当ロジック除去は、別タスクとして実施すべき（本監査の範囲外）。

## 12. First Pilot Tool Recommendation

- **推奨1ツール: `invideo-ai`**
- 理由: 前回監査でGO_CANDIDATE・confidence A・地域制限記載なし・自己申込可という最も条件が明確なツールであり、かつ本監査で確認した通り`src/pages/tools/invideo-ai/index.astro`は標準的な`ToolDetailPage.astro`パターン（primaryCta/secondaryCtaハードコード）を使用しており、パイロット実装の複雑度が低い。
- 検証すべき項目:
  1. `toolAffiliateLinks.ts`にinvideo-ai 1件のみエントリを追加した場合に、`/tools/invideo-ai/`ページのCTAが正しく切り替わるか
  2. `enabled: false`に戻した際に確実に`officialUrl`へフォールバックするか（rollback確認）
  3. rel属性が`sponsored nofollow noopener noreferrer`として正しく出力されるか（ブラウザでのHTML実表示確認を推奨）
  4. `/tools/`一覧ページ（`ToolsListCard.astro`経由）にも同時に反映されるか、または詳細ページのみ先行させるかの設計判断
  5. disclosure表示（7章の対象ページ限定表示案）が同時に出現するか

## 13. Files Potentially Affected

（前回レポート12章と重複するため、本監査で新たに判明した情報のみ差分として記載）

- 追加で判明した変更不要ファイル: `src/pages/tools/[slug].astro`, `src/components/ToolSummaryTable.astro`（到達不能/orphanだが、rel出し分けロジックの参考実装として当面保持を推奨）
- 追加で確認が必要なファイル: `src/pages/comparisons/*/index.astro`, `src/pages/categories/*/index.astro`（officialUrl/affiliateUrl直接参照なしを確認したが、外部リンク自体の有無・実装方法は本監査では深掘りできていない、14章）

## 14. HOLD and Unknown Items

- `ToolDetailPage.astro`の`relatedTools`propに`official`フィールドを実際に渡している呼び出し元は、本監査の範囲では確認できなかった（29ファイルの`relatedTools=`使用箇所は確認したが、各ツールごとの中身の詳細な精査は範囲外）。関連ツールカードの「公式↗」リンクが実際にどの程度使われているかは未確認。
- `src/pages/comparisons/*/index.astro`, `src/pages/categories/*/index.astro`から外部リンク（officialUrl等）がどのように出力されているか（別フィールド名を使っている可能性を含め）は、本監査では`officialUrl`/`affiliateUrl`という具体的な文字列での検索のみ行い、深掘りできていない。次回タスク候補。
- 9章の「dashboard_verification_required」フラグのうち、前回レポート13章で「vidu-ai / seaart-ai / tensor-art」が1つの箇条書きにまとめられていた3ツールについて、個別のフラグ精査を行っていない（本監査は前回レポート内の記述の再集計が目的であり、新規のWeb調査はスコープ外としたため）。
- `[slug].astro`・`ToolSummaryTable.astro`の各種JSON-LD・構造化データ出力について、到達不能/orphanと判定した根拠（`STATIC_OVERRIDES`によるフィルタ、importの不在）はコード上のgrep/読み取りで確認したが、実際のビルド出力（`dist/`）を目視確認してはいない（本環境の制約により`dist/`への直接アクセスは行っていない）。
- ローカルHEADがorigin/masterより1コミット先行していた件（2章）は本監査と無関係の別作業と推測されるが、断定はしていない。

## 15. Next Recommended Task

`src/pages/comparisons/*/index.astro`と`src/pages/categories/*/index.astro`が実際にどのフィールド・どのコンポーネントで外部リンクを描画しているかを直接コード確認し、案C導入時にこれらのページ種別も変更対象に含める必要があるかを判定するタスクを次に実施する。
