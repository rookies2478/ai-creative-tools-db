# Active Task: AI Creative DB contact email unification

## Goal
Update publicly displayed AI Creative DB contact email from contact@aicreative-db.com to contact@movance.jp while preserving the old account for Fotor and historical correspondence.

## target_files
- src/pages/contact/index.astro
- docs/tasks/active/2026-10-18-contact-email-unification.md

## reference_files
- src/pages/contact/index.astro
- CLAUDE.md

## required_checks
- npm run validate:task
- npm run build
- npm run validate:publish
- npm run validate:scope

## Constraints
No DNS, mail server, affiliate URL, authentication, or deployment configuration changes. No edits to historical Fotor ownership verification documents.
