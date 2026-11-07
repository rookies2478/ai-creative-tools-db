# MOVANCE shared Growth Loop — AI Creative DB (2026-11-07 routing reconciliation)

**Canonical routing:** `rookies2478/movance-growth-loop` is the first/sole routine GSC, GA4, Clarity, search-intent and SEO analytics engine for this site (Strategy OS PR #275, Core PR #46). No parallel standalone analytics app/collector by default. Distinct task or explicit owner exception required for an alternative.

**Evidence and HOLD:**
- Site registry `sites/ai-creative-db.json`: `enabled:true`, GSC `sc-domain:aicreative-db.com` status VERIFIED; permission and read-only W45 PASS occurred **2026-11-02** using prior local credential route (58 current / 74 previous page rows).
- Site's GA4 canonical tag `G-YTH7GM5ZGT` is historical production evidence, **not** Core GA4 query access; Core property registration is missing (NOT_CONFIGURED).
- Site Clarity `wo9noh1ex6` tag has historical evidence, **not** verified Core API token/query access (NOT_CONFIGURED).
- Core cloud GitHub Actions OIDC/WIF runtime is **UNVERIFIED**, owned by `rookies2478/movance-growth-loop` Issue #44. Do not describe old local GSC runs as a cloud success, or missing query rows as zero.
- Fotor Page-only historical GSC (2026-08-07..11-04) does not prove brand/nonbrand Query×Page split; sitewide Issue #71 stays open.
- No credentials, GA4/Clarity setup, user permissions, measurements or site application settings changed by this PR.

---

# Growth Loop — AIクリエイティブナビのサイト別状態（2026-11-06）

> 共通Coreの運用手順は `rookies2478/movance-growth-loop/docs/OPERATIONS.md` を参照。本ファイルはサイト固有の証拠・制約のみを記す。以前の2026-11-01レコードにあった `enabled:false` / GSC `NOT_VERIFIED` は、2026-11-02実行証拠により陳腐化したため更新した。

## 現行の接続・運用状態

| 項目 | 現行の確認結果 | 根拠・留意点 |
|---|---|---|
| Core登録 | **VERIFIED / enabled:true** | `rookies2478/movance-growth-loop/sites/ai-creative-db.json`（2026-11-06 GitHub master read-back） |
| GSC | **VERIFIED** — `sc-domain:aicreative-db.com` | Core登録は siteFullUser の権限確認済み・GSC専用読み取り実行のPASSを記録（2026-11-02） |
| W45 Growth Loop | **PASS / 実行済み** | [本repo Issue #40](https://github.com/rookies2478/ai-creative-tools-db/issues/40)。期間2026-10-03..10-30（現行）対2026-09-05..10-02（前期）。ページ行58/74、確定データ遅延あり |
| GSCレガシー取り込み | 別系統の古い記録 | `docs/analytics/gsc/` の従来スクリプト/手動輸入と共通Coreの最新PASSを混同しない。2026-08時点の古い手動データを『最新』と呼ばない |
| GA4 | 計測タグ**本番検証済み**、共通Coreは未登録 | `G-YTH7GM5ZGT` は canonical hostnameでのみロード（PR #29）。CoreにGA4プロパティ未登録。CoreでGA4指標を取得済みとは主張しない |
| Clarity | 本番タグ存在、Core集計は **NOT_CONFIGURED** | プロジェクト `wo9noh1ex6`、旧解析は低品質。W45では tokenRef未設定のため未評価＝ゼロではない |
| アフィリエイト | **InVideo AI + Fotor AI 公開済み** | `src/data/toolAffiliateLinks.ts`の承認済み有効エントリ。InVideo primary/pricing、Fotor primary/pricing（PR #51） |
| PixVerse | **承認済み・公開CTAはHOLD** | [Issue #36](https://github.com/rookies2478/ai-creative-tools-db/issues/36)。Impact契約と個別Link Creator URLは操作者確認済み。最終リダイレクト、媒体の掲載条件、国内パブリッシャー支払条件は未確認 |
| Runway | **提携審査状態 UNKNOWN** | [Issue #38](https://github.com/rookies2478/ai-creative-tools-db/issues/38)。個人承認・コードは未確認。普通の製品メールを承認と扱わない |
| 本番コンテンツ | 38ツールのDB + 比較記事群 | PR #56 / #58 / #60 / #62を統合。最終公開検証 [102 URL PASS](https://github.com/rookies2478/ai-creative-tools-db/actions/runs/42151021534) |

## W45 SEO候補の処理状況

共通Core実行（2026-11-02）のREADY 4候補は [Issue #40の2026-11-05コメント](https://github.com/rookies2478/ai-creative-tools-db/issues/40) により**対応済み**と確認。二重にタイトルだけ変更しない。

- `/tools/luma-ai/`: PR #52。モデル／無料枠／利用条件を公式根拠で更新。title/descriptionに推測的な変更を加えない。
- `/tools/tensor-art/`: PR #53。日次クレジット・Pro料金・モデル依存ライセンスを再確認。ブランド検索比率が高く、情報系クエリの十分な証拠がないためCTR目的の見出し修正は保留。
- `/tools/stable-diffusion/`: PR #54。Stability Community License・Core Modelsを更新。API料金は別監査済みで据え置き。

**NEXT:** 次の週次確定データを待ち、GSCの新しいページ別・必要ならクエリ別根拠で次の1ページを選択する。GSCデータの再実行は既存Coreで行い、重複する収集ツールを新設しない。

## 運用・鮮度（公開品質の制約）

- [Issue #48](https://github.com/rookies2478/ai-creative-tools-db/issues/48) が週次コンテンツ鮮度チェックのローリング管理。初回予定は**2026-11-09（月）JST**。既存スクリプト `scripts/generate-freshness-queue.mjs` を利用。
- 2026-11-02歴史スナップショットは39件中35件OVERDUEだったが、その後新規6ツール登録や複数記事レビューが行われた。**旧件数を現行の件数とみなさない**。初回実行で新たな実測値を記録。
- 日付が期限切れだからといって料金・規約が誤っているとは限らない。商用・料金・透かし情報は出典確認を伴って見直し、`lastReviewed` / `nextReviewDue`を日付だけ更新しない。
- 外部リンク・アフィリエイト・公式料金・権利情報には、人間の公開許可と公式の一次資料が必要。自動リンク有効化、収益額の推測、自己購入は不可。

## 次の優先順位

1. **収益化ギャップ:** PixVerseの最新Impact契約は確認済みだが、`affiliatePrograms.ts`の研究メタデータが古い。公開リンクは変えずに研究記録を別スコープで整合させる。最後の媒体条件と遷移先確認は [#36](https://github.com/rookies2478/ai-creative-tools-db/issues/36) に残す。
2. **週次GSC:** 次回の週次実測後、新たなREADY候補を優先し、既に完了した3ページの重複作業を避ける。
3. **独自作例:** 新規6ツールの一部に実機生成サンプルなし。制作アカウント・許諾・モデル・日付・設定・実出力を証拠として揃えるまでは、第三者画像やGPT生成画像を当該製品の作例と偽装しない。
4. **収益計測:** GA4/Clarityの共通Core登録は別途読み取り資格情報とアカウント権限を確認し、データ不在をゼロと扱わない。

## 運用上の境界

- サイト側は `/tools/`, `/comparisons/`, `/use-cases/`, `/guides/` を持つ。静的ツール詳細にハードコードがあり、正本Markdownの更新だけでは見出し/FAQの更新が保証されない。
- GA4/Clarityを設定変更する場合はホスト制限と既存同意・タグ構成を維持。プロダクトの評価・著作権・法的条件は公式ソースの日付を示す。
- Coreは `riskGate: manual-only`。GSC候補・公開PR・本番反映は別のゲートとして証跡を残す。
