# Reference Precedence Order

When two reference files appear to conflict on the same rule, this file determines which one wins. Read this file first whenever the skill encounters a conflict between guidelines.

---

## The order, highest priority first

1. **`12-eeat-audit.md`** — E-E-A-T and Google quality rater rules. YMYL content trumps everything else. If the E-E-A-T audit demands doctor attribution on a medical claim, attribute it, even if another rule would have allowed an unattributed version.

2. **`04-human-writing-rules.md`** — Em dash ban, AI transition phrase blacklist, sentence variation. These are absolute. No other rule justifies an em dash or a banned phrase. Ever.

3. **`09-locale-handling.md`** — Locale-specific data (currency, insurance, regulators). Locale wins over examples in other reference files. If `01-aeo-geo-rules.md` shows a Calgary example with CAD pricing but the active locale is US, render in USD.

4. **`02-entity-framework.md`** — Entity reinforcement rules (first 100 words, every paragraph, FAQ formula). These are the AI citation eligibility floor. A page that meets every other rule but fails entity reinforcement is not A+.

5. **`01-aeo-geo-rules.md`** — Micro-Answer, H2-as-question, FAQ structure, quantitative data injection. Core AEO/GEO mechanics. These are the optimization rules per page.

6. **`03-page-types.md`** — Per-page-type structure (section order, word counts, H2 patterns). These are templates for *how* the optimization expresses itself. They yield to E-E-A-T, locale, entity, and AEO rules above.

7. **`05-content-clusters.md`** — Topical depth minimums per service. Yields to all rules above. If a cluster entity would force an em dash to express, drop the em dash and rephrase, do not add the em dash.

8. **`06-quality-gates.md`** — Pre-delivery checklists. Gates are gates, but they enforce the rules from files 1 to 7. They do not introduce new rules.

9. **`07-schema-generation.md`** — JSON-LD generation. Schema yields to content. If a schema field cannot be filled because the brief does not have it, omit the field rather than fabricate a value.

10. **`08-internal-linking-silo.md`** — Internal linking architecture. Yields to content quality. Do not jam an unnatural link into a paragraph just because the silo rules call for one. Find a more natural anchor or skip the link.

11. **`10-technical-aeo.md`** — llms.txt, image standards, robots.txt, freshness rules. Site-level concerns. Yields to per-page content quality.

12. **`11-ai-citation-tracking.md`** — Test query playbook. Output deliverable, not a content rule. Lowest priority for conflict resolution.

---

## Common conflicts and their resolutions

### Conflict: cluster coverage demands a section, but E-E-A-T demands doctor attribution

**Resolution.** Write the section, attribute every clinical claim in it to the relevant doctor. Cluster coverage is satisfied by the section's existence; E-E-A-T is satisfied by the attribution. No conflict in practice.

### Conflict: page-type word count minimum is met, but entity reinforcement requires more practice-name mentions

**Resolution.** Add the entity mentions naturally. Word count is a floor, not a ceiling. Adding entity reinforcement is always allowed and always preferred over leaving entity mentions out to stay close to the minimum.

### Conflict: AEO rule says use a quantitative hook, but the brief does not have the relevant number

**Resolution.** Use a published industry range with a clear source citation, never fabricate. Example: instead of "98.7% success rate at our practice" (data not in brief), write "industry-published 95 to 98 percent 10-year survival rate per dental literature" and cite. Flag the missing practice-specific data in the run report.

### Conflict: locale handling shows USD pricing, but a brief field accidentally has CAD-shaped pricing

**Resolution.** Locale wins. The skill renders in the locale's currency. If the cost ranges in the brief look implausible for the locale (e.g., a US brief with CAD-typical pricing), flag in the run report but render at face value. The user must fix the brief.

### Conflict: page-type structure calls for an Insurance section, but the brief lists no in-network plans

**Resolution.** Stop and require `insurance.in_network` to be filled in the brief. This is a required field. The page cannot be A+ without an honest answer to "what insurance does this practice accept."

### Conflict: schema requires a field, brief does not have it

**Resolution.** Omit the field. Do not fabricate. Schema validators tolerate optional fields being absent; they do not tolerate fabricated data. Flag the missing field in the run report so the user can add it later.

### Conflict: internal linking rule demands a link to a related service page, but that service page does not exist in the project

**Resolution.** Skip the link. Internal links go only to pages that exist in the project. The skill never links to imaginary pages.

### Conflict: human writing rule banned phrase appears inside a real testimonial quote from CLIENT_BRIEF

**Resolution.** Quoted patient testimonials are sacrosanct. If a real review uses banned language, keep the quote as written, attribute it correctly. The em dash ban and AI phrase blacklist apply to skill-generated prose, not to direct quotes from real humans.

### Conflict: a doctor in the brief speaks Mandarin, but locale is US-Texas — does the multilingual differentiator make sense?

**Resolution.** Yes. Multilingual differentiators apply in any locale. The brief is the source of truth for what the practice offers. The skill does not edit out a real differentiator because it seems unusual for the locale.

---

## How the skill handles unresolvable conflicts

If two rules conflict and this file does not provide a clear resolution, the skill stops the run on that page and writes a flag in the run report:

```
[CONFLICT] page: app/services/dental-implants/page.tsx
  Rule A (file: 03-page-types.md, section X): demands Y
  Rule B (file: 02-entity-framework.md, section Z): demands NOT Y
  Action: page skipped, original file not modified.
  Recommendation: open this file path in your editor and resolve manually,
                  or update one of the reference files to clarify the rule.
```

This never happens in practice if the precedence order is followed. It exists as a safety net.
