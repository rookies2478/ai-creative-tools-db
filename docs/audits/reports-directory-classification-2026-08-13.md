# reports/ 現行ファイル棚卸し（2026-08-13）

作成日: 2026-08-13
対象: `reports/`配下 現行53ファイル（.md 32件・.csv 21件、README.md除く）
方針: 外部会話履歴（ChatGPT/旧Claude Code監査）の分類は一切前提としない。全件をリポジトリ内で新規に照合した結果のみを記録する。
reports/本体・DB・sitemap・validator・アプリケーションソースは本監査で無変更。

## 前提条件の確認

- 対象ファイルは全て2026-06-17〜2026-06-22作成。当時のDB対象は`src/content/tools/`全26件。
- 現行DB（2026-08-13時点）は29件（`ls src/content/tools/*.md | wc -l` = 29）。
- 現行`npm run validate:data`結果: Errors 0 / Warnings 4（review-overdue 4件、旧reportsの内容とは無関係）/ Verify 0。
- 現行`npm run build`: 92ページ PASS。
- 現行`npm run validate:publish`: HTML 92件・sitemap URL 90件、Errors 0 / Warnings 4（long-meta-description、旧reportsの内容とは無関係）。
- pricingStatus未設定ツール（現行）: `d-id.md, heygen.md, invideo-ai.md, kling-ai.md, stable-diffusion.md, synthesia.md, tensor-art.md`（7/29件）。旧reports（26ツール時点、18件未設定と記録）とは対象・件数が異なり単純比較不可。これは現行状態から独立して確認した現在の未解決項目として扱う（下記OPEN_BACKLOG参照）。
- サンプル照合（midjourney.md）: `sources:`フィールドに構造化ソース一覧が既存、`officialSourceUrl`・`verifiedAt`(2026-07-11、旧reports作成日より後)・`pricingStatus: confirmed`済み。旧reportsのCSVマスターリスト作成時点(2026-06-19)より新しい検証データがDB本体に既に存在することを確認。

## 分類の定義

- OPEN_BACKLOG: 現行リポジトリで未解決の項目を含む。
- MIGRATE_THEN_DELETE: 恒久的に使える方法論・独自ソース証跡があり、現行運用体系へ移行してから削除すべき。
- ARCHIVE: 実施済み/現状に照らして陳腐化しているが、監査履歴として保存価値がある。
- DELETE_CANDIDATE: 独自の恒久的価値がなく重複・陳腐化・一時的。削除は本タスクでは未承認。
- REVIEW: 安全に判定できない。

---

## 分類結果一覧

### カテゴリ: 内部リンク・比較表・UI監査（実施済み・恒久性低）

| path | 種別 | 目的 | 分類 | 根拠 |
|---|---|---|---|---|
| category-condition-internal-link-audit.md/.csv | 監査 | カテゴリ・条件ページ内部導線チェック | ARCHIVE | 2026-06-22実施済み。導線構造は後続タスク（conditions DB化 2026-06-22、Phase 2-B 2026-06-23）で再構築済み。CSVはmd記載表の生データのみで独自データなし。 |
| internal-link-audit.md/.csv | 監査 | 内部リンク切れ0件確認 | ARCHIVE | リンク切れ0件・修正0件のスナップショット。現行は`validate:publish`が内部リンク切れを継続監視（Errors 0）。 |
| mobile-comparison-table-audit.md/.csv | 監査 | スマホ比較表可読性 | ARCHIVE | 2026-06-21実施済み、対象比較ページは後続リニューアル(2026-06-10 comparisons-redesign等)で構造変更済み。 |
| mobile-filter-table-audit.md | 監査 | /tools/絞り込みUIスマホ対応 | ARCHIVE | 修正実施済み・DB/URL変更なし。/tools/は2026-06-08に再デザイン済みで前提構造が変化。 |
| tools-filter-cta-mobile-audit.md/.csv | 監査 | 絞り込み・CTA・比較表スマホ | ARCHIVE | 全項目PASSまたは修正済みの記録。/tools/再デザイン後の現行UIとは前提が異なる。 |
| tool-detail-cta-link-audit.md/.csv | 監査 | ツール詳細CTA・関連導線 | ARCHIVE | 26ツール時点で全件PASS。現行29ツールは専用ページ化（tool-page-redesign 5バッチ 2026-06-11）で構造自体が刷新済み。 |
| tool-detail-summary-audit.md | 監査 | ツール詳細6点サマリー構造調査 | ARCHIVE | ToolSummaryTable未使用等の構造分析。専用ページ化で前提コンポーネント構成が変化。 |
| component-reuse-audit.md/.csv | 監査 | コンポーネント再利用状況 | ARCHIVE | 実施済み（getCategoryLabel等共通化）。その後多数のコンポーネント新規追加（ToolDetailPage.astro等）があり現状と一致しない。 |
| performance-image-cwv-audit.md/.csv | 監査 | 画像容量・CWV | ARCHIVE | 2026-06-21時点のpublic/images/22件の容量調査。画像資産は以後の作例記事追加等で大幅増加しており現状を反映していない。再実施が必要なら新規タスク。 |
| external-link-cta-audit.md/.csv | 監査 | 外部リンク・rel属性・アフィリエイト | ARCHIVE | rel欠落0件・禁止表現0件の時点記録。affiliateUrl 0件だった状態は2026-07-29以降invideo-ai pilotで変化しており前提が古い。 |
| same-prompt-comparison-audit.md/.csv | 監査 | generatedImages.ts棚卸し(22件時点) | ARCHIVE | generatedImages.tsは2026-06-13リファクタ（sourceToolSlug追加等）で再構成済み。件数・構造前提が現行と不一致。 |
| condition-page-content-quality-audit.md/.csv | 監査 | 条件ページ本文品質 | ARCHIVE | FAQ・関連リンク強化実施済み。条件ページは2026-06-22 DBドリブン化で構造自体が刷新済み。 |
| haiper-condition-display-audit.md/.csv | 監査 | Haiper条件ページ表示統一 | ARCHIVE | 表示統一実施済み。条件ページはDBドリブン化済みで個別ハードコード前提が解消。 |
| label-dictionary-audit.md | 監査 | ラベル辞書一覧化 | ARCHIVE | 2026-06-19スナップショット。ラベル変換ロジックは以後複数回変更（conditions DB化等）されており最新ラベル一覧としては古い。 |
| release-note-latest.md | 記録 | 2026-06-21時点リリースノート | ARCHIVE | 単発リリースノート。commit履歴・completed tasksが正となる。 |
| post-deploy-check.md | 監査 | 反映後チェック(21URL) | ARCHIVE | 単発本番確認記録。以後の本番確認は各completed taskのProduction Verification節で個別管理されている。 |
| post-deploy-check-latest.md | 監査 | 反映後チェック(2026-06-21) | ARCHIVE | 同上。 |
| final-publication-check.md | 監査 | 公開前最終確認(2026-06-22) | ARCHIVE | 現行は`ai-creative-db-pre-publish-check`スキルが同種チェックを担う。 |
| operation-checklist.md | チェックリスト | 運用チェックリスト(2026-06-22版) | ARCHIVE | CLAUDE.md「正式文書」節で運用ルールVer4.0が正本と規定済み。本ファイルは旧版チェックリストで、DB要確認バックログへの参照リンクも旧reports/db-verification-backlog.mdを指すのみ。 |

### カテゴリ: pricingStatus・料金・ソース監査

| path | 種別 | 目的 | 分類 | 根拠 |
|---|---|---|---|---|
| db-verification-backlog.md/.csv | 監査 | 26ツールDB要確認項目一覧 | ARCHIVE | 現行`validate:data`（Errors 0・Warnings 4）が同種チェックを自動化・継続実施しており、本ファイルの手動一覧は静的スナップショットとして陳腐化。ただし現行7ツールのpricingStatus未設定は独立に確認した別のOPEN_BACKLOGとして下記に記載（本ファイルの記述内容とは対応付けしていない）。 |
| pricing-status-completion-summary.md | 記録 | pricingStatus整理完了サマリー(26ツール) | ARCHIVE | 完了記録。以後DB拡張(29ツール)・複数ツールのpricingStatus更新（例: gemini画像生成2026-06-19 confirmed化、日本課金監査2026-07-13等）で内容が古い。 |
| pricing-status-explicitness-audit.md/.csv | 監査 | pricingStatus未設定18件の明示化提案 | ARCHIVE | 提案時点(26ツール中18件未設定)。現行は29ツール中7件未設定であり対象集合が変化、1:1対応不可のため個別提案内容はそのまま適用できない。恒久情報としては現行DBの`pricingStatus`フィールド自体が正となっている。 |
| pricing-status-remaining-audit.md/.csv | 監査 | pricingStatus未設定残数再集計 | ARCHIVE | 同上、26ツール時点の再集計。現行はvalidate:dataが継続監視。 |
| tool-pricing-audit-final-summary.md | 記録 | 料金・根拠URL監査最終サマリー(26ツール) | ARCHIVE | 監査完了記録。DBは以後複数回verifiedAt更新済みで内容が陳腐化。 |
| tool-pricing-citation-master-list.md/.csv | データ | 26ツール分の料金・引用URLマスターリスト | ARCHIVE | サンプル照合(midjourney)で現行DBの`sources:`・`officialSourceUrl`・`verifiedAt`が本リストより新しい検証済み値を保持していることを確認。現行DB自体が本リストの後継データとして機能しており独自の恒久価値は薄い。 |
| tool-pricing-display-source-map.md/.csv | 監査 | discrepancyFlag集計(26ツール) | ARCHIVE | usd-overseas/unknown等のフラグ集計スナップショット。現行は日本課金監査(2026-07-13、全29ツールjapanBilling追加)で上位互換の管理体制に移行済み。 |
| tool-pricing-next-actions.md | 記録 | needsReview対応アクションリスト(26ツール) | ARCHIVE | 優先度A/B/C対応済みの記録。対象ツール数・DB構造が現行と異なる。 |
| tool-pricing-source-audit.md/.csv | 監査 | 料金USD偏り・引用URL確認(26ツール) | ARCHIVE | 「高優先度移行元」として申告されていたが、サンプル照合の結果、現行DBの`sources`/`officialSourceUrl`/`verifiedAt`フィールドが本ファイルの情報より新しく上位互換であることを確認。恒久的に移行すべき未反映の独自データは検出できなかった。方法論（USD偏りチェック・evidenceLevel分類）自体は現行の日本課金監査(2026-07-13)・validate:dataで実質的に継承済み。 |
| tool-source-url-list.md/.csv | データ | 26ツール141件URL一覧・evidenceLevel分類 | ARCHIVE | 同上。現行DBの`sources:`フィールド（各ツールmdファイル内、title+url構造）がツールごとの一次情報源を保持しており、本リストの後継として機能している。CSVの141件が現行DBの`sources`件数と完全一致するかは未検証だが、サンプル(midjourney)ではDB側がより新しい検証日を持つため優位。 |

### カテゴリ: 構造化データ・sitemap/build

| path | 種別 | 目的 | 分類 | 根拠 |
|---|---|---|---|---|
| structured-data-schema-audit.md | 監査 | JSON-LD/schema.org実装監査(2026-06-20、26ツール) | ARCHIVE | 「高優先度移行元」として申告。commit `7f70cd4`でVideoObject/SoftwareApplication構造化データの自動検証（`scripts/validate-publish.mjs`のcheckVideoObject/checkSoftwareApplication）が実装され、本ファイルが指摘していた「手動確認のみで自動検証がない」というギャップは解消済み。FAQPage/Article/BreadcrumbListの自動検証は`7f70cd4`以前から既存（既存チェックとして共存）。本ファイルの恒久的価値（方法論）はすでにコードへ移行済みのため、追加の移行作業は不要と判断。 |
| sitemap-build-diff-audit.md/.csv | 監査 | sitemap vs build差分(2026-06-21、79ページ時点、2〜3件差分) | ARCHIVE | 現行`npm run validate:publish`で HTML 92件・sitemap URL 90件・Errors 0を確認（差分は既知の非sitemap対象ページ、validate:publishが継続監視済みでエラー扱いなし）。旧報告時点の差分件数とは前提ページ数が異なり単純比較不可だが、現行は自動検証がErrors 0で通過しているため「未解決の差分」としては再現しない。 |

---

## OPEN_BACKLOG（現行リポジトリで独立に確認した未解決項目）

いずれも上記reportsファイルの記述内容そのものではなく、本監査で現行DBを直接照合して確認した現在時点の状態。

| source_report | issue | affected_tool_or_area | current_repository_evidence | severity | recommended_future_task |
|---|---|---|---|---|---|
| （db-verification-backlog.md系列から着想、現行DB直接照合で再確認） | pricingStatusフィールド未設定 | d-id, heygen, invideo-ai, kling-ai, stable-diffusion, synthesia, tensor-art（7/29ツール） | `grep -rL "pricingStatus" src/content/tools/*.md` で7件検出（2026-08-13実行） | LOW | pricingStatus明示化の可否を個別audit-onlyタスクで再調査（DB変更は別タスク） |
| （sitemap-build-diff-audit.mdから着想、現行build/validate:publishで再確認） | build 92ページに対しsitemap URL 90件（2件差分） | サイト全体 | `npm run validate:publish`実行結果（HTML 92件・sitemap URL 90件・Errors 0） | LOW | validate:publishがErrors 0で通過しているため新規異常ではない可能性が高いが、92と90の差分2件が意図的な非sitemap対象ページか未確認。次回audit-onlyタスクで対象2ページを特定推奨。 |

上記以外に、reports/内の記述を根拠にした新規のOPEN_BACKLOGは検出しなかった（全ファイルが2026-06時点の26ツール構成を前提としており、現行29ツール・後続の多数のcompleted taskによって前提構造自体が変化しているため）。

---

## VIDEOOBJECT / 構造化データ 突合結果

- 旧`structured-data-schema-audit.md`（2026-06-20）が指摘していた「FAQPage/Article/SoftwareApplication/BreadcrumbListは実装済みだが自動検証が存在しない」というギャップのうち、VideoObject/SoftwareApplicationについては commit `7f70cd4`（2026-08-13-videoobject-structured-data-validation）で解消済み。
- 具体的に追加された自動検証: `checkVideoObject`（name/description/uploadDate/duration必須非空、thumbnailUrl、contentUrl or embedUrl必須、uploadDate日付妥当性、duration ISO8601形式）、`checkSoftwareApplication`（name/url必須）、同一ページ内typeCounts経由の重複検出（duplicate-videoobject・duplicate-softwareapplication）。
- FAQPage/BreadcrumbListの自動検証の有無は本監査では未再確認（`7f70cd4`のスコープ外、別途確認が必要）。

---

## CSVとMarkdownの関係

抽出した21件のCSVは全件、対応するMarkdownレポートの表データをそのままCSV化したものであり、目視確認した範囲（先頭行・サマリー行）ではMarkdown側に記載のない追加行・追加フィールドは検出しなかった。全件が上記対応するMarkdownと同一のARCHIVE判定。個別ファイルの完全な行単位diffは実施していない（52件の全文比較は本タスクのスコープでは非実施、必要なら追加audit推奨）。

---

## まとめ

| 分類 | 件数 |
|---|---|
| OPEN_BACKLOG（reports由来ファイル） | 0 |
| MIGRATE_THEN_DELETE | 0 |
| ARCHIVE | 53（README.md除く全件） |
| DELETE_CANDIDATE | 0 |
| REVIEW | 0 |

外部履歴が主張していた「MIGRATE→DELETE_AFTER_MIGRATION 3件」（tool-pricing-source-audit.md・tool-source-url-list.md・structured-data-schema-audit.md）について本監査で個別に再検証した結果、いずれも恒久的な独自情報は既に現行DB・現行validatorへ移行済みであることを確認したため、追加の移行作業なしでARCHIVE判定とした。

将来の削除・アーカイブ実施は別タスクで、reports/フォルダ全体を`docs/audits/`（既存の恒久監査保存先）またはリポジトリの正式アーカイブ場所へ移動する形で検討することを推奨する（本タスクでは移動・削除は実施しない）。
