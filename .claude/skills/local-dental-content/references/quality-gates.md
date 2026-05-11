# Quality Gates

No page gets delivered until every gate passes. These are the final checkpoints that separate A+ content from average content.

Run every checklist in this file before handing off. If even one item fails, rewrite the offending section. Do not rationalize exceptions. Do not ship partial passes.

---

## 1. AEO Quality Checklist (Service Pages)

Every service money page must pass all of these before delivery.

- [ ] **Micro-Answer block present** (40 to 80 words, directly under H1)
- [ ] **Micro-Answer contains all 4 entities**: practice name + service + city + differentiator
- [ ] **Micro-Answer contains at least one quantitative hook** (procedure count, success rate, years, cost)
- [ ] **TL;DR summary box** near top (3 to 5 bullet points)
- [ ] **All H2s written as complete questions** (no declarative H2s)
- [ ] **Each H2 section answers its question in the first 40 to 80 words** (passage-level retrieval)
- [ ] **FAQPage schema mapped** for all FAQ items (noted in Schema Notes section)
- [ ] **Expert quote block present** with doctor full name and credentials
- [ ] **Expert quote contains clinical insight** (not marketing language)
- [ ] **Every claim includes quantitative data** (no soft marketing language)
- [ ] **Internal link suggestions included** (city page, related services, doctor page, cost page)
- [ ] **Booking CTA visible above the fold AND at the bottom**
- [ ] **Entity reinforcement check passed**:
  - Practice name in intro, body, and conclusion/CTA
  - Doctor name with credentials in body and expert quote
  - City in H1, at least one H2, and throughout body
  - FAQs follow [Practice Name] + [Service] + [City] formula
- [ ] **Zero em dashes** (search `—` in the document)
- [ ] **Zero AI transition phrases** (see human-writing-rules.md banned list)
- [ ] **Word count meets minimum** (900 words for service pages)
- [ ] **Schema Notes section** present at end of document

---

## 2. AEO Quality Checklist (Homepages)

- [ ] H1 is entity-rich (city + specialty + practice name)
- [ ] Hero subheading contains at least one quantitative differentiator
- [ ] All 10 required sections present (see page-types.md Section 2)
- [ ] AEO Micro-Answer Block has 3 to 5 Q&A pairs (each 40 to 60 words)
- [ ] Services grid has 6 to 10 services with internal links to money pages
- [ ] Testimonials tied to specific services with first name + city
- [ ] NAP in footer, contact section, and schema
- [ ] Google Map embedded on contact/location section
- [ ] Word count meets 700 minimum
- [ ] Zero em dashes
- [ ] Zero AI transition phrases
- [ ] Schema Notes section present

---

## 3. AEO Quality Checklist (Blog / Informational Posts)

- [ ] H1 is question-format (preferred) or directly addresses user intent
- [ ] First 60 to 80 words contain direct answer to title question
- [ ] TL;DR block (3 to 5 bullets) near top
- [ ] 5 to 8 H2 sub-questions
- [ ] Each H2 section includes: expert explanation + clinical insight + quantitative data
- [ ] Practitioner Commentary section present
- [ ] Micro-Answer block near end
- [ ] FAQ section with entity-specific questions
- [ ] Citations to ADA, CDC, AAP, or peer-reviewed studies where appropriate
- [ ] "Last Medically Reviewed" date + reviewing doctor
- [ ] Clinic name, doctor name, or local service context mentioned at least once (entity reinforcement)
- [ ] At least 2 internal links to money pages + 1 to primary city page
- [ ] Word count meets 1,000 minimum
- [ ] Zero em dashes
- [ ] Zero AI transition phrases
- [ ] Schema Notes section present

---

## 4. AEO Quality Checklist (Doctor / About Pages)

- [ ] H1 follows `[Dr. Full Name], [Credentials] | [Specialty] Dentist in [City]` format
- [ ] Real professional photo (never stock, never AI-generated)
- [ ] Professional summary (60 to 100 words, entity-rich, includes quantitative proof point)
- [ ] Education section with dental school + graduation year
- [ ] Services performed list with internal links to each service page
- [ ] Professional memberships and affiliations
- [ ] Treatment philosophy / patient care approach section
- [ ] Languages spoken (if more than English)
- [ ] Quantitative proof points (procedures, years, success rate)
- [ ] Patient testimonials specific to this doctor (2 to 3)
- [ ] Internal links to location page + top service pages
- [ ] Bio is genuine and unique (not templated)
- [ ] Word count meets 500 minimum
- [ ] Zero em dashes
- [ ] Zero AI transition phrases
- [ ] Schema Notes flags Person schema with knowsAbout, memberOf, sameAs

---

## 5. AEO Quality Checklist (Location / City Pages)

- [ ] H1 follows `Dentist in [City/Neighborhood] | [Practice Name]` format
- [ ] Unique city-specific intro (100 to 150 words, references real neighborhoods and landmarks)
- [ ] Micro-Answer block (40 to 80 words) declaring why the practice is the top choice in that area
- [ ] Services overview with internal links to money pages
- [ ] Text-based directions from neighborhood or landmark
- [ ] Embedded Google Map
- [ ] City-specific testimonials (3 to 5)
- [ ] Neighborhoods served list with internal links where dedicated pages exist
- [ ] Expert quote specific to serving this city or community
- [ ] Proximity Trigger for neighborhood pages ("Just 3 blocks from [landmark]")
- [ ] At least 3 references to actual local landmarks
- [ ] Word count meets 700 minimum (primary city) or 300 to 500 (neighborhood spoke)
- [ ] Not copy-paste from other location pages
- [ ] Zero em dashes
- [ ] Zero AI transition phrases
- [ ] Schema Notes section present

---

## 6. Thin Content Audit (All Page Types)

Run this 4-check audit on every page. All 4 must pass. Any failure blocks delivery.

### Check 1: Word Count Meets Minimum for Page Type

- Service / Money Page: **900 words minimum**
- Homepage: **700 words minimum**
- Blog / Informational: **1,000 words minimum**
- Doctor / About Page: **500 words minimum**
- Location / City Page (primary): **700 words minimum**
- Location / City Page (neighborhood spoke): **300 to 500 words**

If under minimum, expand with additional cluster entities, FAQs, or practitioner insight. Do not pad with filler.

### Check 2: Entity Cluster Coverage Complete

For service pages: the page must cover at least 8 of the cluster entities defined in `dental-content-clusters.md`. Missing more than 2 cluster entities triggers a thin content flag.

For blog posts: the post must cover the specific sub-topic in depth (not just the definition).

For homepages, doctor pages, and location pages: the required sections from `page-types.md` must all be present.

### Check 3: No Boilerplate or Duplicate Blocks

Scan the content for:

- [ ] Repeated paragraphs with only the service name swapped.
- [ ] Generic sections that could appear on any dental site.
- [ ] Duplicate content across pages on the same site (neighborhood pages are common offenders).
- [ ] Copy-paste "Why Choose Us" blocks that lack entity specificity.

If found, rewrite with unique, entity-specific content.

### Check 4: At Least 2 Value-Add Elements Present

Every page must include at least 2 of these:

- **Practice stats** (procedure counts, success rates, years in practice)
- **Doctor commentary** (practitioner insight sentences or quotes)
- **Local context** (neighborhood references, local landmarks, community ties)
- **Original framing** (angle that differentiates from competitor content)
- **Unique quantitative data** (practice-specific research, outcomes, pricing)

Pages with zero value-add elements are thin content regardless of word count.

---

## 7. Human Sense Validation

Before marking any page complete, run this validation. If any item fails, rewrite the offending section.

- [ ] **Sentence length variation present** (mix of 5-10 word, 15-20 word, and occasional 25-35 word sentences)
- [ ] **No three sentences in a row with the same structure**
- [ ] **Conversational expert tone throughout** (reads like a senior dental copywriter, not an LLM)
- [ ] **Practitioner insight injected** at least once per major section
- [ ] **Natural paragraph flow** (no robotic transitions)
- [ ] **Zero em dashes** (search `—` to confirm)
- [ ] **Zero AI transition phrases** (scan for: "Furthermore", "Additionally", "Moreover", "In conclusion", "Comprehensive", "Leverage", "Navigate", "Delve", "Tailored", "Robust", "Seamless", full list in human-writing-rules.md)
- [ ] **Professional hedging used** instead of absolutes (unless medically accurate)
- [ ] **Answers are 40 to 80 words and extractable** at the top of each section
- [ ] **Quantitative data in each major section**
- [ ] **Local entities confirmed in first 100 words** (practice, doctor, city, service)
- [ ] **Read aloud test passed** (sounds like a real human wrote it)

---

## 8. Entity Reinforcement Final Pass

Use this test on every page before delivery.

### The "Any Clinic" Test

Read each paragraph. Ask: could this exact paragraph appear on a competitor's website if you just swapped the clinic name?

- If **yes**: rewrite with specifics (local landmark, doctor insight, clinic-specific tech, quantitative proof point).
- If **no**: keep.

Every paragraph must fail the "Any Clinic" test (meaning it is unmistakably about this specific practice).

### Entity Appearance Count

Count the appearances of each required entity. Compare against minimums.

| Entity | Minimum Count (Service Page) | Minimum Count (Homepage) | Minimum Count (Blog) | Minimum Count (Location Page) |
|---|---|---|---|---|
| Practice name | 4 (intro, body x2, CTA) | 5+ | 2 | 4 |
| Doctor name + credentials | 2 (body + expert quote) | 1 | 1 | 1 |
| City | 5+ (H1, H2, body x3+) | 3+ | 1 | 6+ |
| Primary service | 5+ | 3+ (in services grid) | 3+ | 3+ |

Pages below minimums must be rewritten.

---

## 9. Schema Notes Section (Required in Every Delivery)

Every content delivery must end with a "Schema Notes" section. This is the handoff to the Dev team for structured data deployment.

### Required Contents

**For all page types:**

- [ ] Schema types required for this specific page (list all: LocalBusiness, Dentist, Service, Person, FAQPage, BreadcrumbList, etc.)
- [ ] Key fields to populate (with values where known, "pending client confirmation" where not)
- [ ] Internal link targets (full list)
- [ ] Meta title (under 60 characters, includes city and service)
- [ ] Meta description (under 155 characters, includes quantitative hook and CTA)
- [ ] Suggested URL slug following Phase 4 GEO-silo pattern
- [ ] Visual treatment notes for Micro-Answer block (light grey background, 2px border, padding)

**For service pages, additional:**

- [ ] Service schema with `provider` property referencing doctor Person `@id` (Dentist-to-Procedure linking per Phase 7.9)
- [ ] FAQPage schema for all FAQ items
- [ ] areaServed property with city/neighborhoods
- [ ] priceRange property with cost range

**For doctor pages, additional:**

- [ ] Person schema with full fields: name, jobTitle, hasCredential, knowsAbout (linking to services), memberOf (associations), sameAs (profile links), image, worksFor (referencing Dentist @id)

**For homepages, additional:**

- [ ] MedicalBusiness + Dentist + LocalBusiness nested structure
- [ ] hasOfferCatalog with all services
- [ ] openingHoursSpecification with full hours
- [ ] sameAs array with all verified external profiles (GBP, Facebook, Instagram, Healthgrades, Yelp, etc.)
- [ ] Aggregate rating if compliant

**For blog posts, additional:**

- [ ] Article schema with Author (Person @id referencing doctor)
- [ ] FAQPage schema if FAQs present
- [ ] datePublished and dateModified
- [ ] medicalAudience

**For location pages, additional:**

- [ ] LocalBusiness schema with unique geo coordinates
- [ ] areaServed with neighborhoods listed
- [ ] BreadcrumbList reflecting hierarchy

---

## 10. Pre-Delivery Checklist Summary (Master)

Before marking any content complete, run through this master checklist.

### Content Completeness
- [ ] All required sections for the page type present (per page-types.md)
- [ ] Word count meets minimum
- [ ] Cluster entity coverage complete (for service pages)
- [ ] No duplicate or boilerplate sections

### AEO / GEO Signals
- [ ] Micro-Answer block (40 to 80 words) under H1
- [ ] All H2s are complete questions
- [ ] Each H2 section answers its question in first 40 to 80 words
- [ ] Named entities in every key paragraph
- [ ] Quantitative data in every major section
- [ ] Expert quote block with doctor attribution
- [ ] Entity-specific FAQs using [Practice] + [Service] + [City] formula

### Human Writing Standards
- [ ] Zero em dashes (search `—`)
- [ ] Zero AI transition phrases
- [ ] Sentence length variation
- [ ] Practitioner insight per major section
- [ ] Professional hedging instead of absolutes
- [ ] Voice matches senior dental copywriter

### Entity Reinforcement
- [ ] Practice name, doctor, city, service in first 100 words
- [ ] Every paragraph passes "Any Clinic" test
- [ ] Entity appearance counts meet minimums

### Schema and Handoff
- [ ] Schema Notes section present and complete
- [ ] Internal link targets listed
- [ ] Meta title and description provided
- [ ] URL slug suggestion provided
- [ ] Any pending client data flagged clearly

### Final Validation
- [ ] Read aloud: sounds natural and expert
- [ ] Optional: AI detector score 90%+ human

---

## 11. Rejection Criteria (What Blocks Delivery)

Any one of these blocks delivery. Do not ship content with any of these issues.

1. **Any em dash present** in the content body.
2. **Any banned AI transition phrase** present.
3. **Micro-Answer missing or incomplete** (not 40 to 80 words, missing entity, no differentiator).
4. **Any H2 that is not a complete question.**
5. **Generic FAQs** that do not follow the [Practice] + [Service] + [City] formula.
6. **Expert quote missing or not attributed** to a real doctor with credentials.
7. **Word count below minimum** for page type.
8. **No quantitative data** in the Micro-Answer or major sections.
9. **Page could be about any clinic** (fails "Any Clinic" test on multiple paragraphs).
10. **No Schema Notes section** at the end.
11. **Copy-paste content** across locations, neighborhoods, or similar pages on the same site.
12. **Medical claims without attribution** to the doctor (YMYL violation).
13. **Fabricated entity data** (numbers, outcomes, credentials that were not provided by the client).

If any rejection criterion is met, rewrite before delivery. Do not rationalize shipping subpar work.

---

## 12. Delivery Format

When all gates pass, deliver in this structure:

```markdown
# [Exact H1]

> **Quick Answer:** [40 to 80 word Micro-Answer block]

> **TL;DR**
> - Bullet 1 (quantitative)
> - Bullet 2 (entity-specific)
> - Bullet 3 (differentiator)
> - Bullet 4 (local)
> - Bullet 5 (CTA-adjacent)

[Opening paragraph with all 4 local entities in first 100 words]

## [Question-format H2]

[40 to 80 word direct answer. Then expansion paragraphs with practitioner insight and quantitative data.]

### [Optional H3 sub-section label]

[Content]

## [Next question-format H2]

...

## Frequently asked questions about [service] in [city]

### Does [Practice Name] offer [specific thing] for [service] in [City]?

[40 to 80 word answer with entities]

### [Next entity-specific FAQ]

...

> **Expert Insight:**
> "[Clinical insight quote]"
> Dr. [Full Name], [Credentials]

## Book your [service] consultation at [Practice Name] in [City]

[CTA paragraph with phone, address, booking link, hours]

---

## Schema Notes

### Schema Types to Apply
- [List all required]

### Key Fields
- [Field: value or "pending client confirmation"]

### Internal Links
- [Link target]: [anchor text suggestion]

### Meta Title
[Under 60 characters]

### Meta Description
[Under 155 characters with quantitative hook and CTA]

### URL Slug
[/service-city pattern]

### Visual Treatment
- Micro-Answer block: light grey background, 2px left border, 16-24px padding
- TL;DR block: accent border, icon optional
- Expert Quote block: pull-quote style, italic, doctor photo if available

### Dentist-to-Procedure Linking (Service Pages Only)
- Service schema provider property references Dr. [Name] Person @id: `[domain]/#dr-[slug]`
```

This is the standard delivery format. Every deliverable follows it. No exceptions.
