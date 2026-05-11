# Page Type Structures

This file defines the exact required structure for every dental page type. Use the section that matches the page type identified in Step 0 of the SKILL.md workflow. Do not apply a generic structure across all page types.

Every section includes: H1 pattern, required elements in order, word count minimum, H2 question patterns, and what success looks like.

---

## 1. Service / Money Page Structure

Service pages are the highest-value conversion pages on the site. They target queries like "dental implants [city]", "emergency dentist [city]", "invisalign [city]". These must be built to be cited by AI systems AND to convert patients.

### H1 Pattern

`[Service] in [City] | [Practice Name] | Dr. [Name], [Credentials]`

Alternative variants (use the one that reads most naturally):

- `[Service] in [City] at [Practice Name]`
- `Same-Day [Service] in [City] | [Practice Name]`
- `[City]'s Trusted [Service] Specialist | [Practice Name]`

### Opening Paragraph (First 100 Words)

All 4 local entities must appear in the first 100 words:

1. Practice name
2. Doctor name + credentials
3. City or neighborhood
4. Primary service

Include at least one quantitative hook (procedure count, success rate, years in practice).

### Required Section Order

Do not reorder. Do not skip. Do not substitute.

1. **H1** (entity-rich)
2. **Micro-Answer block** (40 to 80 words, directly under H1, light background box)
3. **TL;DR summary box** (3 to 5 bullet points, near top)
4. **H2: What is [service]? / Why do I need [service]?** (definition + clinical context)
5. **H2: Who is a candidate for [service] at [Practice Name]?** (symptoms, conditions, ideal patient profile)
6. **H2: What does the [service] process involve at [Practice Name]?** (step-by-step procedure, local specifics)
7. **H2: How much does [service] cost in [City]?** (transparent price ranges + financing)
8. **H2: What does recovery from [service] look like?** (recovery timeline, aftercare, clinical insight)
9. **H2: Does [Practice Name] accept insurance for [service]?** (insurance detail, financing alternatives)
10. **H2: Frequently asked questions about [service] in [City]** (3 to 5 entity-specific FAQs, each answer 40 to 80 words)
11. **Expert Quote block** (attributed to the treating doctor with full credentials)
12. **Internal link block** (related services, doctor page, city page, cost page)
13. **CTA block** (booking + phone + address)
14. **Schema Notes** (at bottom, for developer handoff)

### H2 Question Patterns (Use These)

- "What is [service] and when is it needed?"
- "Who should consider [service] at [Practice Name]?"
- "How does [Practice Name] perform [service]?"
- "How much does [service] cost in [City]?"
- "What is recovery like after [service]?"
- "Does insurance cover [service] at [Practice Name]?"
- "How long does [service] last?"
- "Is [service] painful?"
- "What happens if [service] is not treated?"

### Banned H2 Patterns

Do not use declarative H2s. These fail passage-level AI retrieval.

- "Our Process"
- "Benefits of Implants"
- "Why Choose Us"
- "About This Service"
- "Treatment Options"
- "Your Journey"

### Word Count Minimum

**900 words**, not counting the Schema Notes block. Pages under 900 words on YMYL dental topics fail the thin content audit.

### Quality Signals

- Every major section has quantitative data.
- Every major section contains at least one practitioner insight sentence.
- Every major section names the practice, doctor, or city (entity reinforcement).
- FAQPage schema wraps every FAQ item.
- Expert quote block includes doctor full name + credentials + clinical insight (not marketing fluff).
- CTA is specific to the service (not "Contact us today").

---

## 2. Homepage Structure

The homepage is the entity identity page for the practice. It does not target specific service + city queries (those are money pages). It establishes the brand, entity identity, and trust signals for both human visitors and AI systems.

### H1 Pattern

Entity-rich, includes city + specialty + practice name.

Examples:

- `[Practice Name] | Trusted Dentist in [City]`
- `[Practice Name] | [City]'s Family and Cosmetic Dentist`
- `Comprehensive Dentistry in [City] at [Practice Name]`

### Required Sections (10 Total)

1. **Hero Section** with H1 (entity-rich) + subheading (value proposition with differentiators) + primary CTA (Book Appointment) + secondary CTA (Call Now)
2. **Why Choose Us** (Phase 1 differentiators: years in practice, review rating, patient volume, extended hours, emergency availability, quantitative badges)
3. **Services Overview** (grid of 6 to 10 primary services, each linking to its dedicated money page)
4. **Social Proof** (aggregate rating, best review snippets tied to specific services, award logos, dental board verification)
5. **Meet the Doctor** (summary bio with link to full doctor authority page, credentials listed, quantitative proof points)
6. **Insurance and Financing** (list of major insurance accepted, financing partners, no-insurance options)
7. **Location and Hours** (NAP, embedded Google Map, full office hours including extended/emergency)
8. **Before / After Gallery** (only for practices with consent-backed real cases; otherwise replace with real team photos)
9. **AEO Micro-Answer Block** (3 to 5 Q&A pairs, each 40 to 60 words, covering: "What makes [Practice] different?", "Does [Practice] see emergencies?", "What insurance does [Practice] accept?", "Where is [Practice] located?")
10. **Final CTA block** (Book Online + Call Now + click-to-call phone + address + clinic photo)

### Homepage-Specific Rules

- Do not write a long "about us" narrative on the homepage. That belongs on the Doctor/About page.
- Hero subheading must include at least one quantitative differentiator ("15 years serving [City], 4.9 stars from 600+ patients").
- Services grid must use clickable cards with internal links, not static text.
- Every testimonial quoted must tie to a real service and include a first name + city + service context.

### Word Count Minimum

**700 words** across all sections combined.

### H2 Question Patterns for AEO Micro-Answer Block

- "What makes [Practice Name] different from other dentists in [City]?"
- "Does [Practice Name] accept walk-in emergencies?"
- "What insurance plans does [Practice Name] accept?"
- "Where is [Practice Name] located in [City]?"
- "How do I book an appointment at [Practice Name]?"

---

## 3. Blog / Informational Page Structure

Blog posts exist to capture informational intent, feed internal linking authority to money pages, and demonstrate topical depth. Every blog post must link to at least two money pages and the primary city authority page.

### Title Pattern

Question format is strongly preferred. It aligns with how users speak to AI and voice assistants.

Examples:

- "How Long Do Dental Implants Last?"
- "What Should I Do for a Broken Tooth?"
- "Is Teeth Whitening Safe for Sensitive Teeth?"
- "Invisalign vs Braces: Which Is Right for You?"

### Required Elements in Order

1. **H1** (question-format title)
2. **Direct answer summary** (first 60 to 80 words, answers the title question completely)
3. **TL;DR box** (3 to 5 bullets)
4. **Introduction paragraph** (short, 2 to 3 sentences, sets context)
5. **5 to 8 H2 sub-questions** (each H2 is a specific sub-question, each answer section includes expert explanation + clinical insight + at least one quantitative data point)
6. **Practitioner Commentary section** (H2: "What [Dr. Name] sees clinically in [City]") with 2 to 3 paragraphs of clinical perspective from the treating doctor
7. **Micro-Answer block** (40 to 80 words, entity-rich, near the end, summarizing the main answer with practice name)
8. **FAQ section** (3 to 5 entity-specific FAQs with citation references where appropriate: ADA, CDC, AAP, peer-reviewed studies)
9. **Internal Link block** (link to relevant money pages, doctor page, city page)
10. **Soft CTA** (book consultation, not aggressive selling)
11. **Last Medically Reviewed** date + reviewer doctor name
12. **Schema Notes**

### Blog-Specific Rules

- Every blog post must mention the clinic name, doctor name, or local service context at least once (entity reinforcement per Phase 8.4).
- Paragraphs stay at 3 to 4 sentences maximum.
- Include "What Changed in [Year]" section at the top of cornerstone articles when content has been refreshed (signals freshness to AI).
- Reference ADA, CDC, or peer-reviewed studies by name when citing general medical facts. This improves E-E-A-T signals for YMYL.
- Never give specific medical advice without attribution to the doctor.

### Word Count Minimum

**1,000 words**.

### H2 Question Patterns

- "What causes [condition]?"
- "How is [condition] treated?"
- "Can [condition] be prevented?"
- "When should I see a dentist for [condition]?"
- "How long does [treatment] take to heal?"
- "Is [treatment] safe during pregnancy / for children / for seniors?"
- "What does [treatment] cost on average?"

---

## 4. Doctor / About Page Structure

Doctor pages create distinct Person entities that search engines and AI systems associate with expertise. These pages are critical for E-E-A-T (expertise + authoritativeness) and for Dentist-to-Procedure schema linking.

### H1 Pattern

`[Dr. Full Name], [Credentials] | [Specialty] Dentist in [City]`

Examples:

- `Dr. Sarah Chen, DDS | Implant and Cosmetic Dentist in Calgary`
- `Dr. Michael Patel, DMD, MSD | Pediatric Dentist in Austin`

### Required Elements in Order

1. **H1** (full name + credentials + specialty + city)
2. **Real professional photo** (never stock, never AI-generated)
3. **Professional summary** (1 paragraph, 60 to 100 words, entity-rich, includes years in practice + specialty focus + quantitative proof point)
4. **H2: Education and credentials** (dental school, residency, board certifications, continuing education highlights)
5. **H2: Services performed by Dr. [Name] at [Practice Name]** (list with internal links to each service page)
6. **H2: Professional memberships and affiliations** (ADA, state association, specialty boards, charity/community involvement)
7. **H2: What patients can expect from Dr. [Name]** (treatment philosophy, communication style, patient care approach)
8. **H2: Languages spoken** (listed if more than English)
9. **Quantitative proof points block** (procedures completed, years in practice, patient satisfaction metric, specific fellowships or certifications)
10. **Patient testimonials specific to this doctor** (2 to 3, tied to real services)
11. **Internal link block** (location page, top service pages, booking page)
12. **CTA block** (book with Dr. [Name])
13. **Schema Notes** — specifically flag Person schema with knowsAbout (linking doctor to each service), memberOf (associations), sameAs (verified profile links)

### Doctor Page Specific Rules

- Bio must be genuine and unique to this doctor. No templated "Dr. Smith is passionate about dentistry" boilerplate.
- Include at least one quantitative proof point ("over 1,200 implants placed since 2018").
- Mention the specific dental school and graduation year.
- If fellowship-trained or board-certified in a specialty, state it clearly with the issuing body.
- Link the doctor to every service they personally perform. This drives Dentist-to-Procedure schema.
- Include sameAs references to: state dental board license page, Healthgrades, LinkedIn, ADA directory, Zocdoc, Doximity.

### Word Count Minimum

**500 words**.

### H2 Question Patterns (Optional Variants)

- "Where did Dr. [Name] train?"
- "What dental services does Dr. [Name] perform?"
- "What is Dr. [Name]'s approach to patient care?"
- "How long has Dr. [Name] practiced in [City]?"
- "What languages does Dr. [Name] speak?"

---

## 5. Location / City Page Structure

Location pages target queries like "dentist in [city]", "dentist in [neighborhood]", "dentist near [landmark]". Two sub-types exist: the **Primary City Authority Page** (Layer 1 in the GEO-silo, e.g., `/dentist-in-[city]`) and the **Neighborhood Spoke Page** (Layer 3, e.g., `/dentist-in-[neighborhood]`).

### H1 Patterns

Primary City Authority Page:

- `Dentist in [City] | [Practice Name]`
- `[Practice Name] | Trusted [City] Dentist`

Neighborhood Spoke Page:

- `Dentist in [Neighborhood] | [Practice Name]`
- `Dentist Near [Landmark] | [Practice Name]`

### Required Elements in Order

1. **H1** (city or neighborhood + practice name)
2. **Unique city-specific intro** (100 to 150 words, references actual city context: real neighborhoods, real landmarks, local patient demographics, community history)
3. **Micro-Answer block** (40 to 80 words, declares why the practice is the top choice in that specific city or neighborhood)
4. **H2: Services offered at [Practice Name] in [City]** (services grid with internal links to money pages)
5. **H2: Where is [Practice Name] located in [City]?** (address + embedded Google Map + parking details + public transit notes)
6. **H2: Directions to [Practice Name] from [Neighborhood/Landmark]** (text-based directions: "From Main Street, head east for 2 miles, turn right on Oak Avenue...")
7. **H2: What patients in [City] say about [Practice Name]** (3 to 5 real testimonials from patients in that city or neighborhood, tied to specific services)
8. **H2: Neighborhoods and areas served** (list of all neighborhoods, each with internal link if dedicated neighborhood page exists)
9. **H2: Why patients in [City] choose [Practice Name]** (local differentiators, years serving the area, community involvement, local awards)
10. **Expert Quote** (doctor quote specifically about serving this city or community)
11. **Internal link block** (primary city page, top service pages, doctor pages)
12. **CTA block** (book online + phone + address)
13. **Schema Notes**

### Location Page Specific Rules (CRITICAL)

- **Never copy-paste between location pages.** Each must be uniquely written with actual local context.
- Include the **Proximity Trigger** for neighborhood pages: "Just 3 blocks from [High School Name]" or "2 minutes from [landmark]".
- Reference 3 or more actual neighborhood landmarks (schools, parks, shopping centers, transit stops).
- City-specific testimonials are required, not generic ones.
- For multi-location clients: each location requires its own complete silo (Phase 16). No copy-paste across locations. Unique staff, photos, testimonials, and local context per location.

### Word Count Minimums

- Primary City Authority Page: **700 words**
- Neighborhood Spoke Page: **300 to 500 words** (300 is floor; 500+ is preferred)

### H2 Question Patterns

- "Where is [Practice Name] located?"
- "How do I get to [Practice Name] from [Neighborhood]?"
- "What services does [Practice Name] offer in [City]?"
- "What makes [Practice Name] the top choice in [Neighborhood]?"
- "Does [Practice Name] serve patients outside [City]?"

---

## Universal Rules (Apply to Every Page Type)

Regardless of page type, the following apply:

1. **One H1 per page.** Never multiple H1s.
2. **Every H2 is a complete question.** Never declarative.
3. **Micro-Answer block under H1** for every page (homepage uses AEO Micro-Answer Block section instead).
4. **TL;DR summary box** near the top on service pages and blog posts.
5. **Expert quote block** with doctor full name + credentials on every service page and relevant blog.
6. **Entity reinforcement** check: could this be any clinic? If yes, rewrite.
7. **Internal links** in every page to related money pages, city page, doctor page.
8. **CTA visible above the fold and at the bottom.**
9. **Schema Notes block** at the end of every delivery.
10. **Zero em dashes. Zero AI transition phrases. Zero generic claims.**

---

## Page Type Decision Examples

**User says:** "Write a page for dental implants in Calgary for Dr. Chen at Bright Smiles Dental."
→ Service / Money Page. H1: `Dental Implants in Calgary | Bright Smiles Dental | Dr. Sarah Chen, DDS`. Follow Section 1.

**User says:** "We need a homepage for a new clinic called Austin Family Dental."
→ Homepage. Follow Section 2. Clarify services, doctors, and differentiators before writing.

**User says:** "Write a blog post titled 'How long do dental implants last?' for a Calgary clinic."
→ Blog / Informational. Follow Section 3. Confirm which clinic (for entity reinforcement) and which money page to link to.

**User says:** "Write an about page for Dr. Patel at Austin Family Dental."
→ Doctor / About Page. Follow Section 4. Request full credentials, school, specializations, and photo.

**User says:** "We need a page for the West Hills neighborhood."
→ Location / City Page (Neighborhood Spoke). Follow Section 5, using neighborhood sub-type rules.
