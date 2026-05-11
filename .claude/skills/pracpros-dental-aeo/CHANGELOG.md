# Changelog

All notable changes to the pracpros-dental-aeo skill are recorded here.

The skill follows [Semantic Versioning](https://semver.org/): MAJOR.MINOR.PATCH.

- **MAJOR**: Breaking changes to CLIENT_BRIEF.md schema, file structure, or invocation contract.
- **MINOR**: New reference files, new page-type support, new schema types, new locale support.
- **PATCH**: Rule refinements, bug fixes, copy improvements that do not break existing briefs.

---

## Quarterly Review Trigger

SEO and AEO standards shift quarterly. This skill must be reviewed every 90 days. The next scheduled review is computed from the most recent release date below.

When reviewing, check at minimum:

- Google quality rater guideline updates (E-E-A-T criteria).
- Schema.org type changes or deprecations (FAQ schema scope, HowTo deprecation, MedicalProcedure changes).
- New AI search platforms gaining citation share (currently tracked: ChatGPT, Gemini, Perplexity, Google AI Overviews; watch for new entrants).
- AI bot crawler changes (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot user agents and behavior).
- Core Web Vitals metric updates (current: LCP, INP, CLS).
- llms.txt and llms-full.txt specification changes.
- US and Canadian dental insurance plan changes (additions, mergers, exits).
- US state dental board and Canadian provincial college regulator name changes.

Update reference files accordingly. Bump MINOR or PATCH per the rules above. Document every change in this file.

---

## [1.1.0] — 2026-05-06

### Changed (breaking for any project that already filled CLIENT_BRIEF.md against v1.0.0)

- **Code-first discovery.** Services, doctors, and hours now come from the codebase, not from CLIENT_BRIEF.md. The skill walks the route directory to find services and doctor pages, scans existing JSON-LD and footer/contact components for hours, and extracts what it can from page text.
- **CLIENT_BRIEF_FILL.md gap-fill stub.** When code extraction can't fill a required field (cost ranges, doctor credentials, hours days), the skill writes a fill stub at the project root listing every gap. The agency completes it once and re-runs. The stub is auto-deleted after a successful run.
- **CLIENT_BRIEF.md is half its v1.0.0 size.** Sections 4 (Doctors), 5 (Services), and 7 (Hours) removed. Trust section's `doctor_license_urls` and `doctor_linkedin_urls` removed; per-doctor profile URLs now extracted from doctor page anchor tags or filled in the stub. Brief now carries 7 sections instead of 10.
- Added `references/13-code-extraction.md` documenting service/doctor/hours discovery patterns and fill stub format.
- Updated `SKILL.md` workflow from 9 steps to 12 steps to add discovery (Step 3), gap fill (Step 4), and merge (Step 5) before page optimization begins.
- Updated `references/02-entity-framework.md` to describe the three-source merge model (code + brief + fill stub).
- Updated `references/07-schema-generation.md` Person schema sameAs to iterate `doctor.profile_urls` instead of two parallel index-aligned arrays.
- Updated `references/12-eeat-audit.md` doctor verification audit row to use any available profile URL, not specifically a license URL.

### Removed
- Brief field `doctors[]` array (now discovered from code).
- Brief field `services[]` array (now discovered from code).
- Brief field `hours.*` per-day map (now discovered from code).
- Brief field `trust.doctor_license_urls[]` (now per-doctor, extracted from page anchors or fill stub).
- Brief field `trust.doctor_linkedin_urls[]` (now per-doctor, extracted from page anchors or fill stub).

### Migration from v1.0.0

If a project already has a v1.0.0 CLIENT_BRIEF.md filled out:
1. Keep sections 1, 2, 3, 6, 8, 9, 10 (Practice, NAP, Coverage, Insurance/Financing, Differentiators, Proof, Trust).
2. Delete sections 4 (Doctors), 5 (Services), 7 (Hours).
3. From the Trust section, remove `doctor_license_urls` and `doctor_linkedin_urls`.
4. Re-run the skill. It will discover services, doctors, and hours from code and write a fill stub if any required gaps remain.

### Next review due
2026-08-06.

---

## [1.0.0] — 2026-05-06

Initial release.

### Added
- `SKILL.md` orchestrator with 9-step workflow (Step 0 through Step 8).
- `CLIENT_BRIEF.md` fillable intake template with entity, NAP, doctors array, services array, insurance, hours, differentiators, proof points, and trust signals.
- `CLIENT_BRIEF_EXAMPLE_US.md` filled US example (Calgary swapped to Austin, USD currency, US insurers).
- `CLIENT_BRIEF_EXAMPLE_CA.md` filled CA example (Calgary, CAD currency, CA insurers, RCDSO regulator).
- 13 reference files covering precedence rules, AEO/GEO rules, entity framework, page types, human writing rules, content clusters, quality gates, schema generation, internal linking silo, locale handling, technical AEO, AI citation tracking, and E-E-A-T audit.
- 5 Next.js pattern files for App Router pages, Pages Router pages, metadata export, JSON-LD script component, and shared components.
- Auto-locale detection (US or CA) from CLIENT_BRIEF address.
- Whole-site mode (Mode A) and single-page mode (Mode B).
- Atomic per-page writes with retry-on-gate-failure logic.
- Insurance locale validation as warning, not hard block.
- Run report at `.pracpros/last-run.md`.
- Shared component generation: `MicroAnswer.tsx`, `ExpertQuote.tsx`, `FAQBlock.tsx`, `JsonLd.tsx`.
- `public/llms.txt` and `public/llms-full.txt` generation in Mode A.

### Constraints
- Next.js only (App Router or Pages Router).
- US or Canada only.
- Optimization only — does not create new routes.
- 19-Phase PracPros AEO/GEO/SEO Master Guide compliance.
