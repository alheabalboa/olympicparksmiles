# E-E-A-T and Content Gap Audit

This is the audit logic the skill runs against every existing page in Step 4b of the workflow. The audit produces a gap list. Every gap that fails becomes a rewrite target during Step 4c through 4j.

Optimization without audit is just rewriting. Real E-E-A-T optimization means: read what's there, identify what's missing, then add it.

---

## How the audit runs

For each existing page:

1. Read the file. Extract every text node (H1, H2, H3, paragraphs, list items, blockquotes, image alt text, link anchor text, JSON-LD if present, metadata export if present).
2. For each audit category below, run the checks. Mark each check pass / fail / skip.
3. Build a gap list of every failed check.
4. The gap list drives the rewrite. The skill does not rewrite passing checks (preserve what's working).

The audit is non-destructive — it only reads. Writes happen only after the rewrite step that uses the gap list.

---

## Category 1: Experience signals

Real-world, first-hand knowledge signals. Phase 1.4 of the master guide maps Experience to Phase 6 (reviews), Phase 11 (community), and Phase 12 (patient-experience video). For page content specifically:

| Check | Pass condition | Failure response |
|---|---|---|
| Real patient testimonials present | At least 1 testimonial with first name + city + service | Inject 1 to 3 testimonials from a TESTIMONIALS section in CLIENT_BRIEF (if not present in brief, skill flags but cannot fabricate; user must add) |
| Practitioner insight per major section | Each H2 section has at least 1 sentence beginning "In our practice...", "What we see most often...", "Based on the X we've placed...", or similar | Add insight from `services[].procedures_completed` and `doctors[].years_in_practice` |
| First-person clinical observations | At least 1 sentence framed from the doctor's perspective | Generate from doctor's experience data in brief |
| Real photos used (not stock) | Image filenames or alt text patterns suggest real photos (not generic stock terms like "smiling-woman.jpg") | Flag in run report; skill cannot replace photos |

**Note.** TESTIMONIALS is not currently a required field in CLIENT_BRIEF.md. If the user wants the skill to inject real testimonials, they must add them manually. If absent, the skill omits the testimonial section rather than fabricate. v1.1 may add a structured testimonials field.

---

## Category 2: Expertise signals

Doctor credentials, attribution, and citation of authoritative sources. YMYL content (dental is YMYL) demands every clinical claim be attributable.

| Check | Pass condition | Failure response |
|---|---|---|
| Doctor full name + credentials in body | At least 1 full mention like "Dr. Sarah Chen, DDS, MAGD" | Inject in intro paragraph and expert quote block |
| Medical claims have doctor attribution | Every clinical claim cites a doctor by name OR cites a recognized authority (ADA, CDC, peer-reviewed) | Rewrite unattributed claims with attribution |
| Authoritative source citation | At least 1 reference to ADA, CDC, AAP, AAID, or a peer-reviewed source where the topic warrants | Inject citation when discussing general medical facts (not practice-specific) |
| "Last Medically Reviewed" date present | Footer or header shows "Last medically reviewed: [Month Year]" with reviewing doctor name | Add at page bottom, with current month/year and the appropriate doctor from `services[].performed_by_doctors` |
| Doctor schema (Person) present on doctor pages | Person JSON-LD with `knowsAbout`, `memberOf`, `hasCredential`, `sameAs` | Generate per `references/07-schema-generation.md` |

---

## Category 3: Authoritativeness signals

Practice and entity recognition. Phase 1.4 maps Authoritativeness to Phase 4 (GEO-silo), Phase 9 (link flow), Phase 14 (off-site authority). For on-page content:

| Check | Pass condition | Failure response |
|---|---|---|
| Practice name in first 100 words | Exact `practice.branded_name` appears in opening | Rewrite intro paragraph |
| Practice name in 3+ places on page | Body, FAQ, conclusion, expert quote, etc. | Inject naturally where missing |
| City name in H1 | `coverage.primary_city` in the H1 | Rewrite H1 |
| City name in at least 1 H2 | One H2 contains the city | Rewrite an H2 to include city |
| City name in body 3+ times | Throughout body | Inject naturally |
| Service name in H1 + first paragraph (service pages only) | Both | Rewrite |
| Internal link to doctor page | Service pages link to performing doctor's page | Add per linking rules |
| Internal link to primary city page | Every page links to Layer 1 page | Add per linking rules |
| Internal link to related services | Service pages link to 2 to 3 cluster siblings | Add per linking rules |
| External authoritative links | At least 1 outbound link to an authority (ADA, CDC, peer-reviewed journal, regulator) | Inject 1 contextual outbound link to e.g. ADA implant info or regulator's verification page |

---

## Category 4: Trustworthiness signals

The most important E-E-A-T pillar for YMYL. Trust is on-page and site-level.

| Check | Pass condition | Failure response |
|---|---|---|
| NAP visible | NAP is in page footer, header, or contact section (or via shared layout that the skill can verify exists in `app/layout.tsx`) | Flag if not findable in layout; skill cannot inject into a layout file unless it's in the optimization scope |
| HTTPS | `practice.website_url` starts with `https://` | Flag if `http://`, recommend migration |
| Privacy policy link | Any link to `/privacy` or similar | Flag if not findable; suggest creating |
| "Individual results may vary" on before/after content | Required label per dental advertising guidelines | Inject as `<figcaption>` on before/after images or below related blocks |
| No guaranteed-outcome language | No instances of "guaranteed", "100% success", "perfect smile guaranteed" | Replace with hedged language ("most patients experience...", "in our practice we typically see...") |
| Doctor license/profile verification link present | Doctor pages link to one or more of `doctor.profile_urls` (e.g., LinkedIn, ADA directory, state board verification page) | Inject in doctor bio if any profile URL is available; flag if none |
| Practice license/regulator link | Page references `_derived.regulator_name` and links to `_derived.regulator_url` | Inject in footer or about section if missing on doctor pages |

---

## Category 5: Content cluster gaps

Per `references/05-content-clusters.md`, every service page must cover at least 8 cluster entities for that service. The audit checks cluster coverage by scanning H2s, H3s, and prominent body content for each cluster entity name and synonym.

| Check | Pass condition | Failure response |
|---|---|---|
| What is [service]? | Section explains the service | Add H2 + 40 to 80 word answer |
| Who is a candidate? | Section covers candidacy criteria | Add H2 |
| How does the procedure work? | Section explains step-by-step | Add H2 + numbered list |
| Cost range stated | Specific numeric cost range present | Add H2: "How much does [service] cost in [city]?" with range from brief |
| Treatment timeline | Recovery/healing or process duration stated | Add H2 |
| Success/survival rate stated | Either practice-specific or industry-published (with citation) | Add to relevant section |
| Aftercare and maintenance | Covered | Add H2 |
| Comparison to alternatives | At least 1 alternative discussed | Add H2 or section |
| Failure causes / risks | Honest discussion of risks | Add H2 (YMYL requirement) |
| Insurance and financing | Covered | Add H2 |

The skill targets minimum 8 of these 10 per service page. Hitting all 10 is preferred and pushes content past 1,200 words naturally.

---

## Category 6: AEO/GEO structural gaps

Per `references/01-aeo-geo-rules.md`. These are the structural elements that drive AI extractability.

| Check | Pass condition | Failure response |
|---|---|---|
| Micro-Answer block under H1 | 40 to 80 word block with all 4 entities and a quantitative hook, directly under H1 | Generate per CLIENT_BRIEF |
| All H2s phrased as questions | Every H2 ends in `?` | Rewrite declarative H2s ("Our Process" → "How does [Practice] perform [service]?") |
| Each H2 answered in first 40 to 80 words | Direct answer before expansion | Restructure first paragraph of each section |
| FAQs use entity-specific formula | Every FAQ contains 2+ of: practice name, service, city | Rewrite generic FAQs to entity-specific |
| FAQ answers are 40 to 80 words | Per FAQ | Rewrite oversized or undersized FAQ answers |
| Quantitative data per major section | At least 1 number per H2 section | Inject from CLIENT_BRIEF data |
| Expert quote block present | At least 1 doctor-attributed quote block | Generate from `doctors[]` |
| Expert quote contains clinical insight | Not marketing fluff | Regenerate |
| TL;DR block on service pages and blog posts | 3 to 5 bullets near top | Generate |
| FAQPage schema | JSON-LD FAQPage block present and well-formed | Generate per `references/07-schema-generation.md` |

---

## Category 7: Technical / metadata gaps

| Check | Pass condition | Failure response |
|---|---|---|
| Meta title present | `<title>` or Next.js `metadata.title` | Generate |
| Meta title under 60 chars + entity-rich | Includes city + service or city + practice | Rewrite |
| Meta description present | `metadata.description` | Generate |
| Meta description under 155 chars + quantitative hook | Specific number plus CTA | Rewrite |
| OpenGraph tags | `metadata.openGraph` populated | Generate |
| Canonical URL | `metadata.alternates.canonical` set | Generate |
| Image alt text follows entity pattern | `[Practice] — [descriptor] in [City]` format on every image | Rewrite generic alt text |
| Internal anchor text varies | No exact-match repetition for the same destination across more than 2 source pages | Flag in run report (cross-page check, not single-page) |
| JSON-LD schema present and valid | Page-type-appropriate schema embedded via `<JsonLd>` | Generate per `references/07-schema-generation.md` |

---

## Category 8: Human writing gaps

Per `references/04-human-writing-rules.md`.

| Check | Pass condition | Failure response |
|---|---|---|
| Zero em dashes | No `—` characters in body | Rewrite every instance |
| Zero banned AI phrases | No "Furthermore", "Additionally", "It is important to note", "delve", "leverage", etc. | Rewrite every instance |
| Sentence length variation | Mix of short / medium / long sentences | Restructure if 6+ consecutive sentences are within 2 words of each other |
| Practitioner insight per major section | At least 1 sentence per H2 section that sounds like the doctor speaking | Add (already in Category 1) |
| Professional hedging | "often", "typically", "in many cases" used; "always", "guaranteed", "never" avoided | Rewrite absolutes |
| No inspirational conclusions | No "Your smile awaits!", "Your dream smile is one call away!", etc. | Replace with factual closing |

---

## Audit output format

For each page, the audit produces a structured object the rewrite step consumes:

```yaml
audit_result:
  file: app/services/dental-implants/page.tsx
  page_type: service
  passes: 47           # number of audit checks passed
  fails: 12            # number that need rewrite
  skips: 3             # not applicable to this page type
  gaps:
    - category: experience
      check: practitioner_insight_per_section
      severity: high
      sections_affected: [H2_2, H2_4, H2_5]
      action: inject_practitioner_insight_using_doctors[0]_data
    - category: aeo
      check: micro_answer_block
      severity: critical
      action: generate_micro_answer_under_H1
    - category: schema
      check: faqpage_schema
      severity: high
      action: generate_faqpage_schema_from_existing_faqs
    # ... 9 more gaps
  notes:
    - "Existing page has strong content cluster coverage (8 of 10 entities)"
    - "Existing schema is incomplete: Service block missing provider link"
    - "H1 is 'Dental Implants Service' — needs city + practice name"
```

---

## Severity levels

| Level | Meaning | Behavior |
|---|---|---|
| critical | Page cannot be A+ without this | Always fixed, even if nothing else changes |
| high | Materially affects AI citation likelihood | Always fixed |
| medium | Affects polish or completeness | Fixed unless it would conflict with higher-priority rules |
| low | Nice-to-have | Logged in run report but only fixed if all other gaps are also being addressed |

Critical examples: missing Micro-Answer, no JSON-LD, declarative H1 without entity, em dash present.

Low examples: meta description exactly 156 chars instead of under 155, alt text good but not perfect entity format.

---

## When the audit reports zero gaps

A page with zero gaps already meets A+ standards and the skill leaves it untouched. The run report records:

```
[CLEAN] app/team/dr-sarah-chen/page.tsx — already A+, no rewrite needed.
```

This is rare for an unaudited site. After 1 to 2 optimization passes most pages reach this state, and subsequent monthly runs will leave them alone.

---

## Audit edge cases

### Page is a redirect or has no real content

If the file is just a redirect (`redirect()` call in App Router) or contains no rendered text, the audit returns:

```
[SKIP] app/old-implants/page.tsx — redirect to /dental-implants. Not optimized.
```

### Page is dynamic with fetched content

If the page renders content from a CMS, database, or API that the skill cannot resolve at audit time, it logs:

```
[DYNAMIC] app/blog/[slug]/page.tsx — content depends on runtime data fetch.
          Skill cannot audit dynamic content. The static surrounding scaffold
          (metadata, schema, layout) was audited and optimized as appropriate.
```

The skill optimizes the surrounding scaffold (metadata, schema generation function, JSX wrapper) but leaves the dynamic content slot alone.

### Page is `not-found.tsx`, `error.tsx`, `loading.tsx`

System pages, not real content. Skipped:

```
[SKIP] app/not-found.tsx — Next.js system page, not optimized.
```

### Page is in `(group)` or `_private` route

Route groups and private routes still produce real pages. Audited normally.
