# AI Creative DB — repository execution rules

## GitHub PR lifecycle — owner policy (2026-11-25)

- **原則：PRは完成したレビュー可能な変更を提出するときだけ作る。途中保存・作業進捗のためのPRは禁止。**
- 開発の基本は Issue/Work Item → 専用branch → ローカル実装・QA → 意味ある節目でCommit → 非default branchへPush → 完成条件PASS → PR → 必要なレビュー・承認 → Merge/Release。
- Commit/Pushはセッション終了・中断・バッチ完了時に何度でも行ってよい。進捗と未完了事項はIssueに書く。PRはバックアップ場所ではない。
- PRの「完成」は、当該PRの独立した変更目的が満たされていること。無関係な機能を巨大PRにしない。
- 例外として早期の人レビューが不可欠な場合のみ、未完成・非公開条件・目的を明記したDraft PRを許す。自動マージや公開承認の代わりにしない。
- PR・Ready for review・Push・MergeがActions、Cloudflare Pages、FTP等を起動するか事前に確認し、公開ゲート・人レビュー・法務/SEO/安全検査を維持する。Mergeが本番デプロイを起動するrepoでは、Mergeを公開判断として扱う。
- **GitHub Actionsは原則禁止。** 例外時は理由、非Actions代替、想定minutes、単発/継続を説明し、ユーザーの「今回はGitHub Actionsを使ってよい」という個別の明示承認が必要。workflowの作成/変更/手動起動や暗黙の起動も同様。
- MOVANCE横断の正本候補：`rookies2478/dev-workspace-config` `workspace/WORKSPACE_RULES.md` §14。各repoのより厳格なレビュー/リリース規則を緩和しない。


## Authority
- Repository: `rookies2478/ai-creative-tools-db`. Default branch: `master`. Public site: `https://aicreative-db.com/`.
- Product and editorial authority: `AIクリエイティブナビ 計画書 Ver2.0` (strategy) and `AIクリエイティブナビ 運用ルール Ver4.0` (operations); see `docs/decisions/current-governance-documents.md`.
- Repository rules: `CLAUDE.md` and **exactly one** `docs/tasks/active/*.md` per active work item. `AGENTS.md` supplements these; it does not supersede their scope limits.
- Cross-repo Control Plane: `rookies2478/strategy-os` `00_システム/Development-Control-Plane.md`.
- Optional bounded executor: `rookies2478/dev-control-worker`; binding details: `.dev-control/CONTROL_BINDING.md`. **Not registered or enabled at the time of this binding PR.**

## Project facts and trust boundaries
- Astro static publication with dedicated tool routes, canonical database in `src/content/tools/*.md`, comparisons, first-party editorial samples and outbound affiliate/official CTA links.
- Public code, GitHub CI, Cloudflare Pages, GSC, GA4 and affiliate network statements are **different evidence sources**. Never infer a production deployment or conversion from a passing build or an outbound click.
- Prices, model availability, commercial-use rights and licenses need dated official-source verification. No invented prices, guaranteed rights, commissions, endorsements, rankings or site analytics.
- GSC/GA4 read-only analysis is distinct from external data writes. Never commit `.env`, Google credentials, tokens or raw personal/analytics exports. Local `docs/analytics/**/raw/**` and secrets must not be read or copied by the worker.
- Protected paths and operations include affiliate approval/link tables, financial/promotional claims, site tracking initialization, global DB/schema/comparison logic, legal/disclosure pages, CI and deployment settings, public assets and governance rules.

## MOVANCE Growth Loop — analytics-first routing
- For AI Creative DB and other registered MOVANCE sites, treat `rookies2478/movance-growth-loop` as the **first and sole shared engine** for GSC, GA4, Clarity-assisted site analytics, keyword/search-intent analysis and SEO/content improvement proposals. Before asserting a connector is live, read the site's current `sites/ai-creative-db.json`, shared Core run evidence, and `docs/analytics/growth-loop.md`.
- Never switch routine site measurement to standalone ChatGPT GSC/GA4 integrations, HYPD, Windsor.ai or a second site-specific collector by default. Only use an alternative for a genuinely distinct purpose or with explicit owner authorization. Preserve legacy site scripts and safe local workflows until an evidence-backed migration; do not remove them solely because the common Core exists.
- As of 2026-11-07: shared Core has **historically verified local GSC read-only** access for this site (2026-11-02 W45 page-only 58/74 rows), but GA4 **not configured in Core**, Clarity token/API **not configured**, and cloud OIDC/WIF runtime **not live-verified** (Core Issue #44). Distinguish missing/unknown from zero; do not fabricate current Query×Page, GA4 or Clarity figures.
- No credentials, token changes, raw analytics exports, new schedules, network writes, PR auto-merge or production publishing from this routing rule. Site editorial/source accuracy is still controlled by the task scope and dated official evidence.

## Development and evidence
- One scoped active task only. It must contain explicit `target_files` and `reference_files`. No multiple active tasks, no unscoped edits, no circumventing `validate:task`/`validate:scope`.
- Normal preflight: current `master`, task target files, GitHub issue, governance references, known dirty state and deploy/runtime boundary. Dedicated branch and PR for Meaningful Changes.
- Build and QA: `npm ci`, `npm run validate:task`, `npm run build`, `npm run validate:data`, `npm run validate:publish`, `npm run validate:affiliate-links`, `npm run validate:scope`, `git diff --check`. Report `NOT_RUN` or `HOLD` rather than implying success.
- `CLAUDE.md` fixed result schema is authoritative. A PR requires actual evidence and a human review; a CI success does not prove a production release.

## Worker autonomy ceiling — disabled by default
- GPT: Supervisor (planning, evidence review, gate). Claude Code worker: bounded task execution. Human: registration/enablement, meaningful merge, revenue/policy/platform authorization and production release.
- Worker may, after explicit trusted approval and all gates, prepare a bounded isolated task branch, execute permitted tests, and let its wrapper create a PR and post Evidence. It may **never** merge, deploy, push `master`, alter credentials, create/update affiliate links, change GA4/GSC or edit restricted paths.
- The worker is **not enabled** merely because these files are merged. Registry profile, target labels, Control Binding, independent Windows DryRun/Rehearsal, and separate Human-approved activation must all be completed.
- Do not label any Issue `claude:ready` before the worker is enabled, tests pass, and an Issue has a specific Execution Contract plus a trusted Supervisor Gate PASS / NEXT EXECUTE.
