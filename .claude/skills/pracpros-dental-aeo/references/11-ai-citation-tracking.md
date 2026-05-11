# AI Citation Tracking

This file specifies the AI citation test query list the skill produces as a deliverable in `.pracpros/last-run.md`. The user runs these queries manually, monthly, in ChatGPT, Gemini, and Perplexity, to verify whether their optimized pages are getting cited.

The skill does not run these queries itself. It generates the list, customized to the practice from CLIENT_BRIEF.md.

---

## Why this exists

Traditional SEO tools (Search Console, Ahrefs, Semrush) cannot tell the user whether ChatGPT cited their site. The only reliable measurement is to ask the AI directly.

This file gives the user a structured, reproducible test they can run in 15 minutes per month. Run the same queries every month. Track whether the practice is mentioned, cited (with a link), or recommended first. Compare month over month.

---

## Query template generation

The skill generates queries in 5 categories. Each category uses CLIENT_BRIEF data to produce locally-relevant queries.

### Category 1: Direct service + city

Format: `Who is the best [service] dentist in [city]?`

For each service in the brief, the skill produces one query:

```
Who is the best dental implants dentist in {{coverage.primary_city}}?
Who is the best emergency dentist in {{coverage.primary_city}}?
Who is the best Invisalign dentist in {{coverage.primary_city}}?
```

(One query per service in `services[]`.)

### Category 2: Service + neighborhood

For top 3 neighborhoods in `coverage.neighborhoods`:

```
Best dentist in {{coverage.neighborhoods[0]}}?
Best dentist in {{coverage.neighborhoods[1]}}?
Best dentist in {{coverage.neighborhoods[2]}}?
```

### Category 3: Urgent intent

```
Where can I get emergency dental care in {{coverage.primary_city}} right now?
Best emergency dentist in {{coverage.primary_city}} open late?
Same-day dentist in {{coverage.primary_city}}?
```

### Category 4: Cost intent

For top 3 services by cost (or `procedures_completed`):

```
How much do dental implants cost in {{coverage.primary_city}}?
What is the price of Invisalign in {{coverage.primary_city}}?
How much is teeth whitening in {{coverage.primary_city}}?
```

### Category 5: Insurance intent

```
What dentists in {{coverage.primary_city}} accept {{insurance.in_network[0]}}?
Best dentist in {{coverage.primary_city}} with {{insurance.in_network[1]}}?
```

### Category 6: Doctor-name intent (branded)

For each doctor:

```
Who is {{doctor.full_name}} dentist {{coverage.primary_city}}?
{{doctor.full_name}} dental implants reviews?
```

This catches branded queries the practice should already win. If the AI doesn't cite the practice for the doctor's own name, something is broken at the entity level.

---

## The recording template

The skill generates this template in `.pracpros/last-run.md` for the user to fill in monthly. The user copies it to a tracking spreadsheet or document and runs the test.

```markdown
# AI Citation Test — {{month}} {{year}}

Date run: __________
Tester: __________

For each query, run in:
- [ ] ChatGPT (with web browsing enabled)
- [ ] Gemini
- [ ] Perplexity

Record for each query and each AI:
- **Mentioned**: was {{practice.branded_name}} mentioned anywhere in the answer?
- **Cited**: was the practice cited as a source (with a link to the website)?
- **Position**: first recommendation, in a list, or only briefly noted?
- **Competitors**: which competitors were cited?

---

## Category 1 — Direct service + city

| Query | ChatGPT | Gemini | Perplexity | Notes |
|---|---|---|---|---|
| Who is the best dental implants dentist in {{coverage.primary_city}}? | | | | |
| Who is the best emergency dentist in {{coverage.primary_city}}? | | | | |
| Who is the best Invisalign dentist in {{coverage.primary_city}}? | | | | |

## Category 2 — Service + neighborhood

| Query | ChatGPT | Gemini | Perplexity | Notes |
|---|---|---|---|---|
| Best dentist in {{coverage.neighborhoods[0]}}? | | | | |
| Best dentist in {{coverage.neighborhoods[1]}}? | | | | |
| Best dentist in {{coverage.neighborhoods[2]}}? | | | | |

## Category 3 — Urgent intent

| Query | ChatGPT | Gemini | Perplexity | Notes |
|---|---|---|---|---|
| Where can I get emergency dental care in {{coverage.primary_city}} right now? | | | | |
| Best emergency dentist in {{coverage.primary_city}} open late? | | | | |
| Same-day dentist in {{coverage.primary_city}}? | | | | |

## Category 4 — Cost intent

| Query | ChatGPT | Gemini | Perplexity | Notes |
|---|---|---|---|---|
| How much do dental implants cost in {{coverage.primary_city}}? | | | | |
| What is the price of Invisalign in {{coverage.primary_city}}? | | | | |

## Category 5 — Insurance intent

| Query | ChatGPT | Gemini | Perplexity | Notes |
|---|---|---|---|---|
| What dentists in {{coverage.primary_city}} accept {{insurance.in_network[0]}}? | | | | |

## Category 6 — Branded

| Query | ChatGPT | Gemini | Perplexity | Notes |
|---|---|---|---|---|
| Who is {{doctors[0].full_name}} dentist {{coverage.primary_city}}? | | | | |

---

## Scoring legend

For each cell, use one of:

- **C** — Cited with link (best outcome)
- **M** — Mentioned by name, no link
- **L** — Listed among many options
- **N** — Not mentioned (worst outcome)
- **B** — Mentioned negatively or with bad context (rare, investigate)

---

## Action thresholds

After running the test:

| Result | Action |
|---|---|
| 80%+ Cited (C) on Category 1 | Site is performing. Maintain. |
| 50% to 80% Cited (C) on Category 1 | Strengthen Micro-Answers and entity reinforcement on the missed services. |
| Under 50% Cited on Category 1 | Major gap. Re-audit Micro-Answer quality, entity reinforcement, schema deployment, and review velocity. |
| Branded query (Category 6) returns N or B | Critical. Doctor's own name should always cite the practice. Check Person schema, sameAs array completeness, and Google Business Profile linkage. |
| Competitor consistently cited above the practice | Pull their pages and compare Micro-Answer length, FAQ structure, and quantitative data. Match or exceed. |

---

## Cadence

Run this test at the same time every month. Track results in a single spreadsheet over time. The trend line matters more than any single month's result. AI citation patterns drift with model updates, index refreshes, and competitor changes — month-over-month tracking surfaces which signal changes are working.

---

## What the skill does NOT do for citation tracking

- Does not run the queries automatically (the skill has no LLM API access in this workflow).
- Does not screen-scrape AI tool outputs (terms of service vary; manual is reliable).
- Does not integrate with paid LLM analytics tools (Profound, Otterly). If the user adopts these in v1.1+, the skill will reference but not call them.
- Does not predict citation likelihood. The skill optimizes pages; the test verifies optimization worked.
```

---

## How this query list ends up in `.pracpros/last-run.md`

After Step 8 of the workflow, the skill appends the generated test query template (with all `{{...}}` slots filled from the brief) to the run report under a heading:

```markdown
## AI Citation Test (run monthly)

Use this template every month to track AI visibility. Save results to a separate
tracking document — do not edit `.pracpros/last-run.md` (it is overwritten on every run).

[generated template here, with brief data substituted]
```

This way, every run of the skill produces a fresh, current copy of the test the user can run that month.

---

## Reading the trend over time

After 3 to 6 months of monthly tracking, the user has data the skill can use to prioritize future optimization runs. The skill does not yet ingest historical tracking data in v1.0.0, but the run report ends with this prompt:

```
Compare last month's AI citation test against this month's. If specific service
queries went from C to M (lost the link citation) or M to N (lost the mention
entirely), that service page lost AEO ground. Run the skill on just that page
in Mode B with priority on Micro-Answer + schema regeneration.
```

This closes the optimization loop.
