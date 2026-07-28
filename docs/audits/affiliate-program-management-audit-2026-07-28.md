# Affiliate Program Management Audit

- audit_date: 2026-07-28
- scope: audit-only（コード・コンテンツ・リンク・DB変更なし）
- author: Claude Code (audit session)

## 1. Executive Summary

- 現在、リポジトリ内に稼働中のアフィリエイト実装は存在しない。`src/content/tools/*.md`（29件）のうち `affiliateUrl` を設定しているツールは **0件**。外部ASP（A8.net/afb/ValueCommerce/AccessTrade/Impact/PartnerStack等）との連携コードも0件。
- 公開Web調査の結果、29ツール中、公式一次情報で確認できた「即応募可能な有料コミッション型アフィリエイトプログラム」は少数（CapCut、Synthesia、PixVerse、InVideo AI など）。多くは「終了済み」「招待制」「クリエイター向け非金銭プログラム」「他社ブランドとの混同」など、単純な「アフィリエイトあり/なし」では扱えない。
- 推奨データ構造は **案C（調査管理層とCTA公開層の分離）**。理由: 未承認・未確認情報を誤って公開CTAに露出させるリスクを構造的に防げる。
- 本タスクでは実装を行わず、本レポート1件のみを新規作成する。

## 2. Repository State

- working directory: `C:\dev\Studio\ai-creative-tools-db`
- branch: `master`
- git status --short: クリーン（追跡ファイルの変更なし）
- 開始前から存在する未追跡ファイル: `src/data/videoFreeDownloadStatus.ts`（本タスクで作成したものではない。変更・削除していない）
- origin/master同期: `git rev-list --left-right --count origin/master...HEAD` → `0 0`（完全同期）
- 最新commit: `b93463afb30a79595a1a54add8b1bcf98840a235` "Update LATEST.md with commit SHA"（2026-07-28 23:31:59 +0900）
- `docs/tasks/LATEST.md`: current_active_task = none、production_state = NOT_DEPLOYED、current_phase = search-traffic-launch。アフィリエイト関連の進行中タスクの記載なし。
- `docs/decisions/`配下は `README.md` と `current-governance-documents.md` の2件のみ。アフィリエイト/リンク構造に関する既存decisionなし（今後案Cを採用する場合、新規decision化が必要）。
- 既存の関連レポート（本監査以前から存在）:
  - `reports/external-link-cta-audit.md`（2026-06-21）: 外部リンク・rel属性・CTA監査。affiliateUrl未設定であることを既に記録。
  - `reports/tool-detail-cta-link-audit.md`（2026-06-22）: 当時のCTAロジック（`affiliateUrl ?? officialUrl`）を記録。ただし本監査時点の`ToolDetailPage.astro`を直接grepしたところ `affiliateUrl`/`officialUrl`/`sponsored` の文字列は同ファイルに見当たらず（後述4章）。ロジックが以降のリファクタで移動/変更された可能性があり、要再確認。

## 3. Current Tool Database

- `src/content/tools/*.md` 件数: **29件**（全スラッグ: adobe-firefly, canva-ai-image-generator, capcut-ai, clipdrop, d-id, dalle, dreamstudio, fotor-ai, gemini-image-generation, hailuo-ai, haiper, heygen, ideogram, invideo-ai, kling-ai, leonardo-ai, luma-ai, microsoft-designer, midjourney, nightcafe, pika, pixverse, playground-ai, runway, seaart-ai, stable-diffusion, synthesia, tensor-art, vidu-ai）
- `officialUrl`: 全29件に設定あり（必須フィールド、`z.string().url()`）
- `affiliateUrl`: スキーマ上は定義済み（`src/content/config.ts` optional）だが、**全29件で未設定（0件）**
- CTA/外部リンク用フィールド: `officialUrl`, `officialSourceUrl`, `sourceRefs[].url`, `usagePolicy.officialSourceUrl`/`termsUrl`, `japanBilling.japanOfficialUrl`/`pricingUrl`/`sourceUrls[]` など、用途別に分かれている。料金・公式URL・関連URLとアフィリエイト情報の混在は確認されなかった。
- スキーマ統一性: **不統一**。フロントマターのキー数はファイルにより34〜43個とばらつきがある。
  - 主な差異要因: `notFor`, `needsReview`, `pricingSourceNote`, `pricingSourceUrl`, `pricingStatus` の5フィールドが一部の`.md`に存在するが、`src/content/config.ts`のzodスキーマには未定義（schemaが`.strict()`でないため素通り、バリデーション対象外）。アフィリエイト設計を追加する際は、このスキーマ・実データの乖離を先に解消しておくことが望ましい（本監査の範囲外、次タスク候補として14章に記載）。

## 4. Current Outbound Link Architecture

- CTA/外部リンクを描画する主なコンポーネント: `src/components/ToolDetailPage.astro`, `ToolSummaryTable.astro`, `ToolCard.astro`, `TdpToolPage.astro`, `src/pages/tools/[slug].astro`、および個別ツール専用の `AdobeFireflyTool.astro` / `MidjourneyTool.astro` / `LeonardoAiTool.astro`。
- **要再確認事項**: 2026-06-22付レポートは `ToolDetailPage.astro` に `affiliateUrl ?? officialUrl` のCTAロジックと `rel="sponsored nofollow noopener noreferrer"`（アフィリエイト時）/ `rel="noopener noreferrer"`（通常時）の出し分けがあると記録しているが、本監査で同ファイルを直接grepした結果、`affiliateUrl`・`officialUrl`・`sponsored` のいずれの文字列も一致しなかった。コンポーネントが名称変更・リファクタされた可能性があり、**現状のCTAロジックは未確定**として扱う。次回タスクで同ファイルを直接Readして再確認することを推奨（14章）。
- 外部ASP・トラッキングネットワークのコード上の統合: **0件**。`a8.net`, `afb`, `valuecommerce`, `accesstrade`, `moshimo`, `impact`, `partnerstack`, `firstpromoter`, `rewardful`, `tapfiliate`, `awin`, `shareasale`, `utm_`, `ref=`, `via=`, `aff=` はリポジトリ全体で一致なし。
- `rel="noopener"`/`rel="nofollow"` 等はrel属性として複数の`.astro`ファイル・ページに存在するが、これは既存の外部リンク衛生（2026-06-21監査で是正済み）によるもので、実際のアフィリエイト計測とは無関係。
- URLの直書き: フロントマターの`officialUrl`等フィールド経由が基本。本文Markdown内への外部URL直書きの網羅的grep（フロントマター除外）は本監査では未実施（follow-up候補）。
- リダイレクト用URL・独自中継URL: 発見なし。
- PR表記・アフィリエイト表記（disclosure）: リポジトリ内に専用コンポーネント・定型文は発見できず（アフィリエイトが稼働していないため未実装と推測される。断定はしない）。

## 5. Existing Affiliate or Referral Links

- 現時点で「アフィリエイトリンク」としてDB・コードに設定されているものは **0件**。
- 全29ツールとも `officialUrl` のみが公式サイトへの導線として使用されている（確認できた範囲）。
- 同一ツールに複数リンク先（例: 公式サイト用と成果リンク用）が併存しているケースはなし。

## 6. Tool-by-Tool Affiliate Program Matrix

凡例:
- `confidence`: A=公式一次情報で確認 / B=提携ネットワーク公開ページで確認 / C=第三者情報のみ / D=推定・未確認
- `recommendedStatus`: GO_CANDIDATE / VERIFY_IN_ASP / HOLD / NONE_FOUND / EXCLUDE
- ASP管理画面ログインが必要な情報は「公開情報では未確認」として扱い、confirmedにしていない。

### 6.1 GO_CANDIDATE（公式一次情報で確認、応募検討可）

| toolSlug | provider | programType | network | commission | cookie | confidence | 備考 |
|---|---|---|---|---|---|---|---|
| capcut-ai | CapCut (ByteDance) | official_affiliate | Impact | 最大35%リカーリング、上限$15,000 | 未記載 | A | **公式ページが対象国をUS/UK/DE/FRのみと明記。日本拠点サイトは対象外の可能性が高い** → 実質EXCLUDE寄りでVERIFY_IN_ASP必須 |
| invideo-ai | InVideo | official_affiliate | Impact.com | 月額プラン初月50%／年額プラン初年25%（リカーリングなし） | 120日 | A | 公開・自己申込可、条件明記 |
| pixverse | PixVerse | official_affiliate | Impact | 12ヶ月30%リカーリング（月$5,000超で35%へ自動昇格）、2段階サブアフィリエイト20% | 90日 | B | 最低支払額・日本対象可否は未公開（要ASP確認） |
| fotor-ai | Fotor | official_affiliate | ShareASale / Impact（併用可） | 公式ページ表記「最大60%」（別ソースで35%初回+25%更新の記載もあり数値は要再確認） | 45日 | A | 日本対象可否・最低支払額は未記載 |
| hailuo-ai | Hailuo AI (MiniMax) | official_affiliate | Impact.com | 10〜30%（上限記載なし） | 明記なし | A | 最低支払$10。DB記載URL(hailuoai.com)と公式プログラムURL(hailuoai.video)のドメイン差異を要確認 |
| synthesia | Synthesia | official_affiliate | Rewardful | Starter/Creatorプラン25%、初回12ヶ月 | 60日 | A | 日本対象可否・支払方法は非公開 |

### 6.2 VERIFY_IN_ASP（プログラム自体は確認できたが、金額・適用条件等の最終確認が必要）

| toolSlug | provider | programType | network | 状況 |
|---|---|---|---|---|
| heygen | HeyGen | creator（Social Creator Program） | 未確認（第三者情報のみRewardful説あり） | 公式ページで35%/3ヶ月・30日cookie確認。ただしフォロワー5,000人以上が応募条件で、テキスト系メディアサイトには不向きの可能性 |
| ideogram | Ideogram AI | creator（Creators Club内蔵） | 自社運営 | プログラムの存在は公式確認、報酬率・cookie等の詳細は非公開（応募後開示） |
| kling-ai | Kling AI (Kuaishou) | referral / creator | 自社運営 | 公式URL(`kling.ai/app/commission-share`)がフェッチ不可（HTTPエラー）。第三者情報では招待制の可能性 |
| adobe-firefly | Adobe | creator（ウェイトリスト制）/ 一般Adobeアフィリエイト | Partnerize（一般プログラム、第三者情報） | Firefly専用ページはウェイトリスト段階、詳細未確認。一般Adobeプログラムの数値は第三者情報のみで確度低い |
| canva-ai-image-generator | Canva | creator/referral（Canvassador） | Impact（第三者情報） | 公式ヘルプページはJSレンダリングのため内容取得できず。報酬率は第三者情報間で30%リカーリング/$150CPS/$36一括など不一致あり、いずれも未確認 |
| runway | Runway AI | official_affiliate | Awin | 公式アフィリエイトポータル(`affiliates.runwayml.com`)の実在は確認。ただし具体的な報酬率(20%/12ヶ月)・cookie(30日)・最低支払額($50)は第三者集約サイト由来で未確認 |
| nightcafe | NightCafe Studio | partner（招待・応募制） | 自社運営 | 公式ページで「フォロワー1万人以上」の応募条件と最大10%は確認。支払方法・cookie等は非公開 |
| seaart-ai | SeaArt AI | creator（Creator Incentive Program / Creative Partner Program） | 自社運営 | 金銭コミッション型ではなくボーナスプール分配型。メディアサイト向け成果報酬とは性質が異なる |
| vidu-ai | Vidu AI | creator（Creative Partner Program 2.0） | 自社運営 | クレジット付与型。応募フォーム（Googleフォーム）経由でのみ詳細開示、未応募のため条件不明 |
| tensor-art | Tensor.Art | creator（モデル制作者向け収益分配） | 自社運営 | メディアサイト向けリンク型アフィリエイトではなく、モデル投稿者向け収益化制度。要件不一致の可能性大 |

### 6.3 NONE_FOUND（公開情報で公式プログラムを確認できず）

| toolSlug | provider | 備考 |
|---|---|---|
| dreamstudio | Stability AI | `stability.ai/partners`は技術/クラウド提携のみ記載。個人向けアフィリエイトなし |
| stable-diffusion | Stability AI | 同上。似た名称の無関係サード parties（Stability World AI）と混同注意 |
| gemini-image-generation | Google | Google Gemini（暗号資産取引所）やGoogle Cloudアフィリエイトと混同されやすいが、Gemini画像生成（Google製品）向けの公式プログラムは未発見 |
| haiper | Haiper AI | 公式サイトに導線なし。第三者ブログの言及のみで裏付けなし |
| luma-ai | Luma AI (Dream Machine) | 「Creative Partner」は共同制作機能であり金銭アフィリエイトではない。「Inner Circle」ページは本監査で内容未確認（follow-up要） |
| microsoft-designer | Microsoft | Microsoft Designer専用のプログラムは確認できず。一般Microsoftアフィリエイト（Impact経由）にDesignerが対象製品として明記されているかは未確認 |
| midjourney | Midjourney | 公式サイト・Discord運営のため一般的な意味でのアフィリエイトページ自体が存在しない。類似名の第三者ツール（PixelDojo/legnext等）との混同に注意 |
| pika | Pika Labs (pika.art) | 招待制Creative Partner ProgramとAPI Partner Programのみ。**類似名の別会社「pika.style」の30%アフィリエイトと混同しないこと**（無関係の別製品） |
| playground-ai | Playground AI | 「Become a Creator」はテンプレート販売の収益分配であり、リンク型アフィリエイトではない |

### 6.4 EXCLUDE（終了済み・対象外が明確）

| toolSlug | provider | 理由 |
|---|---|---|
| leonardo-ai | Leonardo AI (Canva傘下) | 公式ヘルプセンターに「2026年4月7日にプログラム終了、新規応募受付なし」と明記。過去実績（60%初月・30日cookie）は参考情報としてのみ扱う |
| dalle | OpenAI | 公式にアフィリエイト/リファラルプログラムなし。複数第三者情報が一致して「制度なし」と結論 |
| clipdrop | Clipdrop（Jasper傘下） | 公式サイト直接確認で導線なし。第三者の言及1件のみで裏付けなし |
| d-id | D-ID | 公式規約（`d-id.com/affiliate-terms/`）で制度自体は存在確認（confidence A）だが、**招待制で公開応募窓口なし**。2023年付の規約で現行有効性も未確認のためHOLD相当としても良いが、応募自体ができないためEXCLUDE寄りに分類 |

## 7. Public Information Limitations

- ASP管理画面ログイン後にしか見えない情報（正確な報酬率、cookie日数、支払方法、地域制限の一部）は、本監査では「公開情報では未確認」として扱い、confirmedにしていない。該当ツール: fotor-ai（正確な%）、hailuo-ai（cookie日数）、heygen（正式network名）、runway（数値全般）、synthesia（支払方法）、pixverse（最低支払額・JP対象可否）ほか多数。
- 第三者アグリゲーター（openaffiliate.dev、adskull.io、各種アフィリエイト紹介ブログ）由来の数値は、公式ページと矛盾する場合が複数見つかった（例: Canva、HeyGen、Runway）。第三者情報のみの場合はconfidence C/Dとし、公式情報と明確に区別している。
- ブランド混同リスクを2件確認: (1) Pika.art（本DB対象） vs Pika.style（無関係の別製品、独自の30%アフィリエイトあり）。(2) Gemini画像生成（Google） vs Geminiという名の暗号資産取引所。いずれも取り違えないよう6章に明記。
- 一部の公式ページがフェッチ時にタイムアウト/JSスタブとなり内容を直接確認できなかった（Adobe Firefly、Canva、Kling AI）。これらはconfidence C/Dに留め、再取得が必要。

## 8. Data Architecture Options

### 案A: `src/content/tools/*.md` にアフィリエイト項目を追加

- 既存DBの責務との整合性: 低い。ツール仕様の正本にビジネス運用情報（審査状況・報酬率）が混入し、責務が曖昧化する。
- 公開情報と内部運用情報の分離: なし。同一ファイル内に混在するため分離不可能。
- 誤公開リスク: 高い。`.md`はビルド時にそのまま読み込まれるため、未承認情報が誤って公開ページに露出する可能性がある。
- 更新頻度への対応: 悪い。ツール仕様更新のたびにアフィリエイト情報も巻き込まれ、diffが肥大化する。
- TypeScript型安全性: 弱い（zod optionalで緩い）。
- 将来のツール追加への対応: 可能だが密結合になる。
- ASP変更時の差し替えやすさ: 悪い（ツールファイルごとに手修正）。
- CTAコンポーネントとの接続性: 既存`officialUrl`同様に直結できるが、責務混在のデメリットが上回る。
- Git管理: 既に`.md`はGit管理下にあるため技術的には可能だが、審査中・未承認の情報をGit履歴に残すこと自体がリスク。
- 保守性・実装コスト: 実装コストは最小だが、長期保守性は低い。
- 29ツール規模への適合: 現状規模では動くが、責務分離の原則に反する。

### 案B: `src/data/affiliatePrograms.ts` を新設し、toolSlugで紐づけ

- 既存DBの責務との整合性: 改善（ツール仕様と分離）。
- 公開情報と内部運用情報の分離: 部分的。1ファイルに調査・審査・公開可否が同居するため、「未承認だが誤ってCTAに参照されるリスク」は残る。
- 誤公開リスク: 中程度。CTAコンポーネントが実装次第でapproval状態を無視して参照してしまう可能性がある。
- 更新頻度への対応: 良い（ツールDBと独立更新可能）。
- TypeScript型安全性: 高い（型定義可能）。
- 将来のツール追加への対応: 良い。
- ASP変更時の差し替えやすさ: 良い。
- CTAコンポーネントとの接続性: 良いが、上記の誤公開リスクに注意が必要。
- Git管理: 調査中案件の実質未承認情報がそのままGitに残る点は案Aと同様の懸念が残る。
- 審査状況や報酬条件の管理: 1層構造のため、statusフィールドで表現するしかなく、公開ロジックとの結合度が高い。
- 保守性: 中〜良好。
- 実装コスト: 中程度。

### 案C: 2層分離（`affiliatePrograms.ts` = 調査・申請管理／`toolAffiliateLinks.ts` = 公開CTA承認済みリンク）

- 既存DBの責務との整合性: 最も良い。ツール仕様DB・調査管理・公開CTAの3層が明確に分離される。
- 公開情報と内部運用情報の分離: 構造的に強制できる（公開CTA側は「承認済み」データのみ参照するファイルとして独立）。
- 誤公開リスク: 最も低い。CTAコンポーネントは`toolAffiliateLinks.ts`のみを参照する設計にすれば、未承認情報が公開面に出ることは構造上起きない。
- 更新頻度への対応: 良い。調査側は頻繁に更新しても公開側に影響しない。
- TypeScript型安全性: 高い（2つの型を明確に分離可能、7章参照）。
- 将来のツール追加への対応: 良い。
- ASP変更時の差し替えやすさ: 最も良い。調査側のprovider/networkを差し替えても、公開側は「承認済みURLの差し替え」のみで完結。
- CTAコンポーネントとの接続性: 良い。参照先を1ファイルに限定できるため実装・レビューが容易。
- Git管理に置いてよい情報／置くべきでない情報: 調査ファイルはGit管理下でよい（本監査のような公開情報ベースの調査ログのため、秘密情報を含めない前提）。ただし将来ASP発行のトラッキングID等を含める場合は環境変数化を検討すべき。
- 審査状況や報酬条件の管理: `approvalStatus`により明確に管理可能。
- 保守性: 良好。
- 実装コスト: 3案中もっとも高い（ファイル2つ・型2つ・CTA参照ロジックの見直しが必要）。
- 29ツール規模への適合: 過剰スペックではなく、将来のツール追加・ASP複数化にも耐えうる適正規模。

### 比較まとめ

| 評価軸 | 案A | 案B | 案C |
|---|---|---|---|
| 責務分離 | 低 | 中 | 高 |
| 誤公開リスク | 高 | 中 | 低 |
| 型安全性 | 低 | 高 | 高 |
| ASP差し替え容易性 | 低 | 高 | 最高 |
| 実装コスト | 最低 | 中 | 高 |
| 29ツール規模適合 | 過小設計 | 妥当 | 妥当（将来性重視） |

## 9. Recommended Architecture

**推奨案: 案C**（`src/data/affiliatePrograms.ts` + `src/data/toolAffiliateLinks.ts` の2層分離）。

理由:
1. 本監査で判明した通り、29ツールの実態は「confirmed」「招待制」「終了済み」「他社ブランドとの混同」など多様で、誤って未承認情報を公開CTAに使うリスクが現実的に高い。案Cの構造的分離がこのリスクを最も低減する。
2. 現行`ToolDetailPage.astro`のCTAロジックが本監査時点で不確定（4章）であり、これを機にCTA参照先を単一の「承認済みのみ」ファイルに限定する設計は、今後の保守性・レビュー容易性を大きく高める。
3. 29ツール規模・今後のツール追加ペースを踏まえても、案Cの実装コストは許容範囲であり、過剰設計ではない。

ただし、本タスクでは実装しない。

## 10. Proposed Type Schema（型定義案のみ、実装しない）

### 10.1 調査・案件管理側（`src/data/affiliatePrograms.ts` 想定）

```typescript
type AffiliateResearchStatus =
  | "active"
  | "candidate"
  | "verify"
  | "hold"
  | "none"
  | "rejected"
  | "ended";

type ApprovalStatus =
  | "not_applied"
  | "applied"
  | "approved"
  | "rejected"
  | "suspended"
  | "ended";

interface AffiliateProgramCandidate {
  toolSlug: string;
  status: AffiliateResearchStatus;
  preferredProvider?: string;
  programs: AffiliateProgramEntry[];
  verifiedAt?: string;
  notes?: string;
}

interface AffiliateProgramEntry {
  provider: string;
  network?: string;
  programName?: string;
  publicApplicationUrl?: string;
  affiliateUrl?: string;
  commissionType?: "one_time" | "recurring" | "fixed" | "percentage" | "credit" | "unknown";
  commissionValue?: string;
  cookieDays?: number;
  japanEligible?: "yes" | "no" | "unknown";
  mediaEligible?: "yes" | "no" | "unknown";
  approvalStatus: ApprovalStatus;
  sourceUrl?: string;
  sourceType: "official" | "network" | "third_party";
  verifiedAt?: string;
  notes?: string;
}
```

### 10.2 公開CTA側（`src/data/toolAffiliateLinks.ts` 想定）

```typescript
interface PublishedAffiliateLink {
  toolSlug: string;
  url: string;
  provider: string;
  enabled: boolean;
  disclosureRequired: boolean;
  rel: string; // e.g. "sponsored noopener noreferrer"
  verifiedAt: string;
}
```

### 10.3 公開ルールの評価

「公開CTAは `approvalStatus === "approved"` かつ `enabled === true` の案件だけを参照できる設計」を推奨する。

- 理由: `toolAffiliateLinks.ts`自体を「approved確定後にのみ追記される」ファイルとして運用すれば、コンポーネント側は存在チェックのみでよく、承認ロジックの二重管理を避けられる。
- 追加で、`toolAffiliateLinks.ts`にエントリが存在しないtoolSlugは自動的に`officialUrl`へフォールバックする設計（現行`officialUrl`優先ロジックの温存）が望ましい。
- CI側で「`toolAffiliateLinks.ts`に存在するtoolSlugは、対応する`affiliatePrograms.ts`のapprovalStatusがapprovedであること」を検証するテストを追加すれば、二重管理のズレを防げる（実装は本タスク範囲外）。

## 11. Publication Safety Rules

- 調査中・未承認の案件情報（`affiliatePrograms.ts`側）はCTAコンポーネントから直接参照禁止とする設計を推奨。
- 公開CTA（`toolAffiliateLinks.ts`）にエントリを追加する行為自体を「承認済みの記録」として扱い、Pull Request等でのレビュー対象にする。
- 秘密情報（ASPログインID/パスワード/APIキー/トラッキングID等）はいかなる場合もGit管理対象に含めない。トラッキングパラメータが必要な場合は環境変数または別途の非公開設定として扱う（本監査では該当情報を扱っていない）。
- 本レポート自体も公開情報のみで構成しており、ASP管理画面情報・秘密情報は一切含まない。

## 12. Migration Impact

実装する場合の影響範囲候補（本タスクでは変更しない）:

- 新規作成候補: `src/data/affiliatePrograms.ts`, `src/data/toolAffiliateLinks.ts`
- 既存データファイル: `src/content/config.ts`（`affiliateUrl`フィールドの扱い方針を再定義する場合）
- ツール詳細ページ: `src/pages/tools/[slug].astro`, `src/components/ToolDetailPage.astro`, `TdpToolPage.astro`, 個別専用ページ（`AdobeFireflyTool.astro`等）
- CTAコンポーネント: `ToolSummaryTable.astro`, `ToolCard.astro`
- 比較ページ: `src/pages/comparisons/*/index.astro`（CTAリンクを使用する箇所）
- 条件別ページ: `src/pages/conditions/*/index.astro`（該当する場合）
- disclosure / PR表記: 新規コンポーネントの追加が必要になる可能性（現状未実装のため）
- テスト: `validate:data` / `validate:scope` 等の既存バリデーションスクリプトへの拡張
- build / validation: `npm run validate:task`, `npm run validate:scope`, CI（`.github/workflows/build.yml`）
- docs / decision: `docs/decisions/` に新規decision文書が必要（案C採用を正式化する場合）

## 13. ASP Dashboard Verification Checklist

以下は「公開情報のみでは確定できず、ASP管理画面または直接応募での確認が必要」な項目一覧（ログイン・申請は本監査では実施していない）。

- fotor-ai: 正確な報酬率（35% vs 60%の食い違い解消）、最低支払額
- hailuo-ai: cookie日数、公式ドメイン(hailuoai.com vs hailuoai.video)の整合性
- heygen: 正式なnetwork名、支払方法の最終確認、フォロワー条件が本サイトに適合するか
- ideogram: Creators Club応募後に開示される報酬率・cookie
- kling-ai: `kling.ai/app/commission-share`の実ページ内容（本監査ではフェッチ不可）、招待制か否か
- adobe-firefly: Fireflyウェイトリストの現況、一般Adobeプログラム(Partnerize)の日本対象可否
- canva-ai-image-generator: Canvassador応募可否（クローズ中との第三者情報あり）、正確な報酬率
- runway: Awin経由の正確な報酬率・cookie・最低支払額
- pixverse: 正確な最低支払額、日本拠点サイトの対象可否
- synthesia: 支払方法、日本拠点サイトの対象可否
- capcut-ai: 日本拠点サイトが対象国(US/UK/DE/FR)外でも応募可能か、Impact上での実際の扱い
- nightcafe: フォロワー1万人条件下での支払方法・cookie
- vidu-ai / seaart-ai / tensor-art: 各プログラムがそもそも「メディアサイト向けリンク型アフィリエイト」として機能するか、応募して初めて判明する条件

## 14. Recommended Application Priority

公開情報ベースの一次評価として、応募検討の優先順位案（最終判断はASP確認後に行うこと）:

1. `invideo-ai` — 条件明記・自己申込可・地域制限記載なし。最も着手しやすい。
2. `pixverse` — 条件明記・自己申込可・cookie90日と長め。最低支払額のみ要確認。
3. `synthesia` — 条件明記・25%/60日。日本対象可否のみ要確認。
4. `fotor-ai` — 条件明記だが報酬率の食い違いを解消してから。
5. `hailuo-ai` — ドメイン整合性を確認してから。
6. `capcut-ai` — 対象国にJPが含まれないため、日本拠点サイトとしての適格性を先に確認する必要あり（優先度は下げるがEXCLUDE確定でもない）。

その他（heygen, ideogram, kling-ai, adobe-firefly, canva-ai-image-generator, runway, nightcafe, seaart-ai, vidu-ai, tensor-art）はVERIFY_IN_ASPまたは条件不一致の可能性ありのため、優先度は上記より下。

## 15. HOLD / Unknown Items

- `ToolDetailPage.astro`の現行CTA/rel属性ロジックが本監査時点で確定できず（4章）。次回タスクで直接確認要。
- 未追跡ファイル `src/data/videoFreeDownloadStatus.ts` は本監査と無関係（既存の別作業由来と推測されるが、断定はしない。本監査では一切触れていない）。
- `notFor`, `needsReview`, `pricingSourceNote`, `pricingSourceUrl`, `pricingStatus` の5フィールドがzodスキーマ未定義のまま実データに存在する件（3章）。アフィリエイト設計とは別課題だが、スキーマ健全性の観点で次タスク候補。
- d-id: 招待制プログラムの規約が2026-06-27時点で「2023年6月付」表記のままで、現行有効性は未確認。
- adobe-firefly, canva-ai-image-generator, kling-ai: 公式ページのフェッチが本監査中にタイムアウト/JSスタブとなり、内容を直接確認できていない。再取得が必要。

## 16. Next Recommended Task

`ToolDetailPage.astro`（および関連CTAコンポーネント）を直接Readして、現行のCTA/外部リンク描画ロジック（`affiliateUrl`参照有無、rel属性の出し分け）を再確認し、2026-06-22付レポートとの乖離を解消する調査タスクを次に実施する。これにより、案C実装時にCTA接続点を正確に設計できる。

## 17. 訂正（2026-07-29追記）

- 訂正理由: `docs/audits/affiliate-cta-rendering-audit-2026-07-28.md`（commit未定、本追記と同時にコミット）にて、本レポート6章の集計値を再検証した結果、以下の誤りが判明したため訂正する。
- 訂正箇所:
  1. 6章の29ツール分類について、単純合計が30になっていた（6.1:6 + 6.2:10 + 6.3:9 + 6.4:4 = 実際は29のはずが、完了報告のSUMMARYでは6.2を11件と誤記し、d-idを6.4表内に記載したまま完了報告では別途HOLD 1件として二重計上したため、合計が30と誤って報告された）。
  2. 正しい排他的分類（Primary status）は: GO_CANDIDATE 6 / VERIFY_IN_ASP 10 / HOLD 1（d-id） / NONE_FOUND 9 / EXCLUDE 3（leonardo-ai, dalle, clipdrop）＝**合計29**。d-idは6.4表に記載していたが、招待制で公開応募窓口がなく現行有効性も未確認という性質上、EXCLUDEではなくHOLDに分類するのが適切と判断し、本訂正で正式にHOLD区分へ移す（6.4の記載自体は経緯の記録として残し、削除はしない）。
  3. 「ASP管理画面確認要 約13件」という完了報告の記載も、再集計の結果**14件**が正確な値であった（詳細は`affiliate-cta-rendering-audit-2026-07-28.md`8章参照）。
  4. `ToolDetailPage.astro`のCTAロジックについて15章で「本監査時点で確定できず」としていた点は、`affiliate-cta-rendering-audit-2026-07-28.md`4章で直接コード確認済み。結論: `ToolDetailPage.astro`自体はofficialUrl/affiliateUrlを一切参照せず、CTAのhrefは呼び出し元がハードコードした文字列。affiliateUrlを参照するコード（`[slug].astro`、`ToolSummaryTable.astro`）は現行29ツールに対して到達不能（dead code / orphanコンポーネント）であることが判明した。
- 本訂正は上記4点のみを対象とし、6章の各ツールの調査内容（プログラムの有無・報酬率等の一次情報）自体は変更しない。
