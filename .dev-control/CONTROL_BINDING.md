# AI Creative DB — Development Control Binding

**Status: PREPARATION ONLY — TARGET NOT REGISTERED OR ENABLED.**
This file is a prerequisite for onboarding, not permission to run autonomous tasks.

## Source of authority
- Target: `rookies2478/ai-creative-tools-db`; default branch: `master`.
- Worker: `rookies2478/dev-control-worker` (Windows bounded Claude Code executor).
- Strategy/Control Plane: `rookies2478/strategy-os` / `00_システム/Development-Control-Plane.md`.
- Target governance (higher priority for content and scope): `CLAUDE.md`, `docs/decisions/current-governance-documents.md`, and current single `docs/tasks/active/*.md`.
- Roles: GPT Supervisor; Claude Code Executor; Human owns meaningful approvals, merge, release, deployment and external account writes.
- Public site: `https://aicreative-db.com/`; GitHub branch/CI is not evidence of live production state.

## Worker profile and limits
- Planned profile: `rookies2478/dev-control-worker/config/ai-creative-tools-db.json`, base `master`, branch prefix `claude/aicdb-issue-`.
- `queue.enabled: false` in preparation; registry **contains no AI Creative DB entry** at drafting time.
- Planned bounds: one task per invocation, max 6 changed files and 180 changed lines, 40-minute Claude timeout, USD 8 per task.
- `allowedUrlHosts: []` means loopback-only QA network. No production browsing by worker; public-site fact checking is performed by Supervisor/Human outside the executor.
- Build adapter: `npm ci` and `npm run build`, with target's full validation workflow additionally required in active task. No dependency installation/updates, external API access or CI/deploy configuration changes as an executor task.

## Required eligibility — all must hold
1. Worker is explicitly registered and `enabled:true` via a *separate Human-approved* registry/activation PR, after Windows installation sync and required labels exist.
2. This binding and `AGENTS.md` are present on `master` and compatible with the currently installed worker's Control Binding checker.
3. Issue is OPEN, with a narrow and deterministic `Execution Contract`.
4. Trusted actor `rookies2478` applies `claude:ready` after an up-to-date trusted `Supervisor Gate` comment that says `RESULT: PASS` and `NEXT: EXECUTE` with no `RISK: HIGH/CRITICAL` or `HUMAN_ACTION: required`.
5. No existing `docs/tasks/active/*.md` task conflicts with this Issue; the active task must name exactly the intended target and reference files. **Never overwrite an unrelated active task, bypass validation or move unfinished tasks to completed.**
6. Windows worker DryRun, Rehearsal, label inventory, guard and wrapper postvalidation have been independently checked. A failed check is `NEEDS_HUMAN` and must not publish.

## Worker change boundaries
- Allowed: only low-risk, deterministic edits clearly listed in the active task and not under any profile `restrictedPaths`.
- Prohibited even if a task incorrectly lists them: `CLAUDE.md`, `AGENTS.md`, `.dev-control/**`, `.github/**`, `package*.json`, `astro.config.mjs`, `public/**`, `src/data/**`, `src/content/tools/**`, `src/components/**`, `src/layouts/**`, `docs/analytics/**`, `docs/decisions/**`, `docs/tasks/LATEST.md`, `docs/tasks/completed/**`, secrets, keys, legal/disclosure pages, canonical/indexing endpoints and production deployment settings. The profile may contain additional restrictions.
- Changes to affiliate programs or URLs, earnings/commissions, rankings, commercial licensing/rights, pricing, GA4/GSC/Clarity configuration, credentials or production content need **separate Human review**; restricted paths are not relaxed by Issue text.
- Do not create READY labels, edit the worker registry or enable the target as a side effect of merging this binding.

## Verification and evidence
- Local checks (as applicable): `npm run validate:task`, `npm run build`, `npm run validate:data`, `npm run validate:publish`, `npm run validate:affiliate-links`, `npm run validate:scope`, `git diff --check`.
- The wrapper additionally checks clean working tree, changed paths and lines, forbidden operations, secrets and an independent build before PR push.
- Executor PASS may generate a branch/PR and Evidence only, never an automatic merge/release. Non-PASS, incomplete evidence or worker failures must fail closed.
- Report GitHub merged status, Windows workspace status and site production state separately. GSC/GA4 real event receipts remain `NOT_VERIFIED` without direct account evidence.

## Staged onboarding
1. Merge target-side `AGENTS.md` and this binding in a reviewed, test-passing PR; close the corresponding active task through its normal separately scoped lifecycle.
2. Review the disabled worker profile PR #55 with current Windows regression tests (including existing PR #54 missing-label fail-closed change).
3. Separately register the target in the worker registry as `enabled:false` after explicit Human approval and repeat DryRun.
4. Create required workflow labels and verify label inventory. None of these acts as a READY work item.
5. Only after independent Rehearsal, guard check, and explicit later Human approval, change registry `enabled:true`, synchronize the installed Windows worker and consider one bounded issue.
6. Production deployment always remains manual.
