# AI Creative DB — repository execution rules

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
