---
audit_id: "sitemap-build-diff-2026-08-13"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
scope: "build 92ページ対sitemap URL 90件の2件差分の特定・意図確認のみ（audit only、実装変更なし）"
---

# sitemap 2ページ差分 監査結果

## 背景

2026-08-13のreports-directory-fresh-auditで独立に観測された「build 92ページ対sitemap URL 90件」の2件差分（対象ページ未特定、LOW）を、本監査で特定した。

## 現在の実測値

- HEAD: `0b294d7`（監査開始時点、working_tree clean、origin_sync 完了）
- build page数: 92（`npm run build`実行結果、astro出力ログの実ファイル数と一致）
- sitemap URL数: 90（`src/pages/sitemap.xml.ts`のロジックから算出: STATIC_PATHS 62件 + tools collection 29件 − SITEMAP_EXCLUDED_PATHS 1件（`/tools/haiper/`）＝90）
- sitemap生成方式: build時にAstro APIルート（`src/pages/sitemap.xml.ts`）が動的生成。複数sitemapファイルは存在しない（`sitemap.xml`のみ、`robots.txt`は別ファイルで対象外）。

備考: `dist/`配下への直接アクセスは本環境権限でブロックされているため（過去タスクと同様の制約）、build実行時の標準出力ログ（全92出力ファイルパスを含む）から built page一覧を復元し、正規化して照合した。

## 差分の特定

built page（92）から STATIC_PATHS ∪ tools（91件）を除いた残り1件、および STATIC_PATHS ∪ tools（91件）から sitemap（90件）を除いた残り1件、計2件が差分。

| path | 種別 | sitemap収録 | 理由 |
|---|---|---|---|
| `/404.html` | エラーページ（Astro標準の404ハンドラ） | 含まれない | sitemap.xml.tsのSTATIC_PATHS/tools collectionいずれにも記載なし（意図的に対象外） |
| `/tools/haiper/` | ツール詳細ページ | 含まれない | `src/pages/sitemap.xml.ts`内`SITEMAP_EXCLUDED_PATHS`に明示登録され除外 |

## 各ページの詳細

### `/404.html`

- source route: Astroの標準404ルート（`src/pages/404.astro`、プロジェクト内に存在）
- purpose: HTTP 404エラー時に返す汎用エラーページ
- noindex: 未確認（Astro標準の404ページとして検索エンジンにインデックスされるべきでない性質のページ）
- canonical: 該当なし（エラーページ）
- explicit_exclusion: sitemap.xml.ts側での明示記載はない（そもそも404ページをsitemapに含める設計になっていない＝暗黙的除外）
- internally_linked: 通常のナビゲーションからは意図的にリンクされない
- classification: **INTENTIONAL_EXCLUSION**
- evidence: 404ページをsitemapに含めることはWeb標準的なSEOプラクティスに反する。一般的なAstroプロジェクトでも404ページはsitemap生成対象から除外するのが標準。
- recommendation: 変更不要。現状の暗黙的除外のままで問題ない。

### `/tools/haiper/`

- source route: `src/pages/tools/haiper/index.astro`（専用ページ、`[slug].astro`の動的ルートではなく個別ファイル）
- purpose: Haiper（動画生成AIツール）の詳細ページ
- noindex: `src/pages/tools/haiper/index.astro:38` で `noindex={true}` が明示設定済み
- canonical: 未詳細確認（noindexが優先されるため本監査のスコープでは追加確認不要と判断）
- explicit_exclusion: `src/pages/sitemap.xml.ts`の`SITEMAP_EXCLUDED_PATHS = new Set(['/tools/haiper/'])`で明示的に除外
- internally_linked: `/tools/`一覧・カテゴリページ等から通常のツール同様にリンクされている（DB上は存在するツールのため）
- explicit_exclusion根拠: `src/content/tools/haiper.md`に記載の通り、Haiperのコンシューマー向けWebアプリは2025年2月にシャットダウン済み。公式サイトで生成機能・料金ページを確認できない状態（2026年7月確認時点）
- classification: **INTENTIONAL_EXCLUSION**
- evidence: ページ本文のnoindexメタとsitemap側の明示除外リストが一致しており、矛盾がない。サービス終了ツールを検索インデックス対象から外す運用判断として一貫している。
- recommendation: 変更不要。現状のnoindex + sitemap除外の組み合わせは索引ポリシーとして整合的。

## SITEMAP_NOT_BUILT（sitemap側のみに存在するURL）

なし（sitemap 90件は全てbuilt 92件の部分集合として確認済み）。

## 索引ポリシー整合性

| path | sitemap | robots/noindex | canonical | 整合性 |
|---|---|---|---|---|
| `/404.html` | 除外 | エラーページ（索引意図なし） | 該当なし | consistent |
| `/tools/haiper/` | 除外 | noindex=true | 未追加確認 | consistent |

矛盾（indexableなのにsitemap欠落等）は検出されなかった。

## 結論

build 92ページとsitemap 90件の差分2件は両方とも**意図的な除外**であり、現在の索引ポリシーと矛盾がない。修正の必要なし。

## 変更範囲

本監査でアプリケーションソース・sitemap設定・robots/noindex設定・DB・比較ロジックは一切変更していない。
