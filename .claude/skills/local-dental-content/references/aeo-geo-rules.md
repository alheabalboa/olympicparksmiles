# AEO and GEO Optimization Rules

AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) are the 2026 standard for getting cited by AI systems. Traditional SEO puts pages in the selection pool. AEO and GEO determine which pages get extracted and cited in AI answers.

This file contains the specifications that every page produced by this skill must follow.

---

## The Core Principle

AI models (ChatGPT, Gemini, Perplexity, Google AI Overviews) use Retrieval-Augmented Generation (RAG). When a user asks a question, the AI performs a real-time search, retrieves top-ranking results, reads them, and synthesizes an answer from sources it considers most extractable and trustworthy.

**Ranking gets you in the pool. Extractability gets you cited.**

A page ranked #3 with a clear Micro-Answer, expert attribution, and structured data will often be cited over a #1 page that buries its answer in marketing copy. This is the single most important shift in 2026 search.

---

## 1. Micro-Answer Specifications

The Micro-Answer is the single most important on-page element for AI citation.

### Placement

Directly under the H1. Before any other content. No image, no intro paragraph in between.

### Length

**40 to 80 words.** Concise, factual, complete. Under 40 is too thin for AI extraction. Over 80 is too long for snippet use.

### Required Components

Every Micro-Answer must include all four:

1. **Who** — Practice name (exact)
2. **What** — Specific service or offering
3. **Where** — City or neighborhood
4. **Why** — Differentiator (quantitative hook preferred)

### Visual Treatment (Developer Spec)

- Light grey or light-tinted background box.
- 2px border on the left (accent color from brand).
- Padding: 16px to 24px.
- Label: "Quick Answer" or "In Short" (optional visual label).
- Visually distinct from body text.

### Example Micro-Answers

**Emergency Dentistry:**

> [Practice Name] offers same-day emergency dental care in [City], with appointments available until 11 PM, 7 days a week. Dr. [Name], [Credentials], treats urgent cases including broken teeth, severe pain, and dental abscesses. The clinic is located in [Neighborhood] and accepts walk-ins for patients in acute pain.

**Dental Implants:**

> [Practice Name] in [City] has placed over 4,500 dental implants with a 98.7% success rate since 2010. Dr. [Name], DDS, leads the implant program, offering single-tooth, multi-tooth, and full-arch implant solutions. Same-day consultations are available, and financing covers treatments up to $30,000.

**General Family Dentistry:**

> [Practice Name] provides comprehensive family dentistry in [City] for patients ages 3 and up. Dr. [Name], DMD, and the team have served over 8,000 patients across 15 years, offering preventive care, cosmetic dentistry, and restorative treatments. The clinic accepts most major insurance plans and offers evening and Saturday appointments.

### What a Bad Micro-Answer Looks Like

Do not write these. AI will ignore them.

- "We are a caring dental practice serving your community with quality dental care." (no entity, no numbers, no location)
- "Our experienced team provides a range of dental services including implants, cleanings, and more." (no differentiator, no city, no doctor)
- "Welcome to Smile Dental! We love helping patients achieve their best smile." (marketing fluff, no facts)

---

## 2. H2 Question Rules

Every H2 must be a complete question. AI systems use passage-level retrieval, meaning each paragraph must make sense without reading the rest of the page. Declarative H2s break this.

### The Rule

Every H2 is a complete question that the following paragraph answers in 40 to 80 words before expanding.

### Required H2 Examples

- "What does the dental implant process involve at [Practice Name]?"
- "How much do dental implants cost in [City]?"
- "Who is a candidate for Invisalign at [Practice Name]?"
- "What should I do if I break a tooth in [City]?"
- "How long does a root canal take at [Practice Name]?"
- "Does [Practice Name] accept Delta Dental insurance?"

### Banned H2 Examples

These fail passage-level retrieval and signal generic content to AI systems.

- "Our Process" (no question, no entity, no context)
- "Implant Benefits" (fragment, not a question)
- "Why Us" (generic, no value signal)
- "Treatment Options" (vague)
- "About This Service" (no retrievable value)
- "Our Approach" (boilerplate)
- "Your Journey" (marketing language)
- "Pricing" (fragment)

### Passage-Level Retrieval Test

Read each H2 section in isolation. Can someone answer the heading question from the first paragraph alone? If not, rewrite the paragraph so the direct answer comes in the first 40 to 80 words, then expand in subsequent paragraphs.

---

## 3. AI-Extractable Content Rules

AI systems prefer content that is structured, factual, and immediately useful. Every page must follow these rules.

### What AI Prefers

- **Short, direct answers** (40 to 80 words) at the top of each section before expansion.
- **Clear factual statements** with specific numbers, procedure counts, success rates, time frames.
- **Structured lists and step-by-step processes** (numbered lists for procedures, bulleted lists for options).
- **Named entities in every key paragraph** (clinic name, doctor name, city name).
- **Expert attribution** (quotes from doctors with full credentials).
- **H2 headings written as complete questions** with a standalone answer in the first paragraph after each H2.
- **FAQPage schema** wrapping all Q&A pairs.
- **Consistent, predictable structure** across similar page types.

### What AI Ignores or Penalizes

- Vague, fluffy marketing language ("compassionate care", "state-of-the-art", "smile of your dreams").
- Walls of text without structure (paragraphs longer than 5 sentences with no subheadings).
- Generic content that could apply to any clinic anywhere.
- Missing entity signals (no clinic name, no location context, no doctor attribution).
- Medical claims without attribution (YMYL violation).
- Buried answers (user must read 500+ words before reaching a direct answer).
- Content without any numbers, dates, or quantitative proof.

---

## 4. Quantitative Data Injection

Vague claims carry zero informational value to AI systems. Specific, verifiable numbers are trust hooks that AI systems latch onto when building answers.

Audit every section and replace soft marketing language with quantitative proof points.

### Injection Table

| Wrong (Soft Copy) | Right (Quantitative Data Injection) |
|---|---|
| "We have helped many patients with dental implants." | "Our clinic has completed 4,500+ dental implant procedures with a 98.7% success rate over 15 years." |
| "We offer affordable teeth whitening." | "Professional teeth whitening from $299, with results up to 8 shades whiter in a single 45-minute session." |
| "Our experienced team provides quality care." | "3 board-certified dentists with a combined 42 years of practice and 12,000+ procedures completed." |
| "Fast recovery after root canals." | "Most root canal patients return to normal activity within 24 hours. 94% report no pain beyond day 2." |
| "We see emergencies quickly." | "Same-day emergency appointments. Average time to treatment: 35 minutes from call to seated." |
| "Many years serving the community." | "Serving [City] families since 2008. Over 8,500 active patients across 3 generations." |
| "Experienced implant dentist." | "Dr. [Name], DDS, has placed over 2,400 implants since completing her AAID fellowship in 2015." |
| "Convenient hours for busy schedules." | "Open 7 days a week, with appointments available until 11 PM Monday through Thursday." |
| "Cost-effective treatment options." | "Dental crowns from $950 to $1,600 per tooth. 0% financing available for 18 months through CareCredit." |
| "Long-lasting results." | "Modern porcelain veneers last 15 to 20 years with proper care, based on published dental literature." |

### Injection Points

Apply quantitative data injection to:

- Service page headlines and subheaders.
- Doctor bio summary and credentials.
- Homepage hero section and differentiator bullets.
- Meta descriptions (always include at least one number).
- FAQ answers.
- Expert quote blocks.
- Location page intros.
- Testimonials (include year, service, patient first name, city).

### Create Original Research (Advanced)

The most powerful quantitative data is data the practice creates itself. For a dental practice, this could be:

- Annual patient satisfaction survey (even 50 respondents is enough).
- Local cost comparison study (average cost of [service] in [city]).
- Procedure outcome statistics (success rates, recovery times).
- Treatment timeline data (average time to complete [treatment]).

Publish findings as a dedicated page, reference the data across service pages and blog posts, include it in schema markup. Original research compounds citation authority because it produces data that does not exist anywhere else.

---

## 5. RAG Logic Explanation

Most AI answer engines (ChatGPT, Gemini, Perplexity, Google AI Overviews) use Retrieval-Augmented Generation (RAG).

### The Process

1. User asks a question to the AI.
2. AI performs a real-time search behind the scenes.
3. AI retrieves the top-ranking results (typically 5 to 20 pages).
4. AI reads each page, looking for extractable, trustworthy information.
5. AI synthesizes an answer from the sources it finds most useful.
6. AI cites the sources it pulled from.

### Why This Matters

Traditional SEO rankings put you in the selection pool, but they do not guarantee citation. The effort has shifted from keyword optimization to content extractability.

AI models have a token limit when reading sources. If the AI has to scan through 1,000 words of filler to find the relevant answer, it will skip that page for a competitor that summarizes the answer at the top.

This is why:

- **Micro-Answer Injection** (Section 1 above) matters: front-loads extractable value.
- **Expert Quotes** matter: AI prioritizes attributed expertise.
- **Quantitative Data** matters: creates trust hooks the AI can cite.

### The #3 vs #1 Reality

A page that ranks #3 with a clear Micro-Answer, expert attribution, and structured data will often be cited over a #1 page that buries its answer in marketing copy. Stop optimizing for rank alone. Optimize for extraction.

---

## 6. Entity-Specific FAQ Formula

Generic FAQs are nearly useless for AEO. AI systems ignore them because they carry no entity signal.

### The Formula

Every FAQ question must include at least two of the following three elements:

- **[Practice Name]**
- **[Service]**
- **[City]**

The best FAQs include all three.

### Wrong vs Right FAQ Comparison Table

| Wrong (Generic) | Right (Entity-Specific AEO FAQ) |
|---|---|
| "What is a dental implant?" | "Does [Practice Name] offer financing for dental implants in [City]?" |
| "How much does teeth whitening cost?" | "How much does teeth whitening cost at [Practice Name] in [City]?" |
| "Do you take insurance?" | "Does [Practice Name] accept Delta Dental for emergency visits in [City]?" |
| "What is Invisalign?" | "Can I get a same-day Invisalign consultation at [Practice Name]?" |
| "How long does a root canal take?" | "How long does a root canal take at [Practice Name] in [City]?" |
| "What if my tooth breaks?" | "What should I do if I break a tooth in [City], and can [Practice Name] see me today?" |
| "Do implants hurt?" | "Is dental implant placement painful at [Practice Name], and what anesthesia options does Dr. [Name] offer?" |
| "How often should I see the dentist?" | "How often does Dr. [Name] at [Practice Name] recommend cleanings for patients in [City]?" |
| "Is teeth whitening safe?" | "Is professional teeth whitening at [Practice Name] safe for patients with sensitive teeth?" |
| "Can kids get Invisalign?" | "Does [Practice Name] offer Invisalign Teen for adolescents in [City]?" |

### FAQ Answer Rules

Each FAQ answer must:

- Be 40 to 80 words.
- Include the practice name, service, or doctor name.
- Include at least one specific detail (number, time frame, cost range, insurance name).
- Answer the question directly in the first sentence.
- Never say "it depends" without following with specific examples.

### FAQPage Schema Requirement

Every FAQ section must be wrapped in FAQPage schema. This is non-negotiable. The schema is what enables rich result features AND AI extraction.

---

## 7. The AI Citation Test

After publishing, test AI visibility monthly. This is a core KPI.

### Test Queries

For each client, run these queries in ChatGPT, Gemini, and Perplexity:

1. "Who is the best [service] dentist in [city]?"
2. "Where can I get [service] in [city] right now?"
3. "Best emergency dentist in [city] open late?"
4. "How much do [service] cost in [city]?"
5. "What dentists in [city] accept [insurance]?"

### Recording

Log each result:

- Was the client mentioned?
- Was the client cited (linked as a source)?
- Was the client recommended first, or buried in a list?
- What did the AI say about the client specifically?
- Which competitors were cited?

### Action

- If not cited, review Micro-Answer quality, entity reinforcement, quantitative data, and schema deployment.
- If competitors cited, analyze their Micro-Answers and replicate the structure with stronger entity signals.
- If cited but not #1, push review velocity and strengthen expert quote blocks.

---

## 8. What AI Specifically Ignores

This list is critical. If any of these appear in delivered content, rewrite.

- "Welcome to [Practice Name]" (lazy opening, no entity value)
- "We are passionate about..." (fluffy marketing)
- "State-of-the-art technology" (vague, does not specify)
- "Compassionate care" (subjective, no proof)
- "Our team is dedicated..." (generic)
- "Smile of your dreams" (emotional, not factual)
- "Cutting-edge procedures" (buzzword)
- "World-class service" (hyperbole)
- "Trust us for all your dental needs" (hollow)
- Paragraphs with no numbers, names, or specifics

Replace every instance. If the replacement is not a specific, verifiable fact, cut the sentence entirely.

---

## 9. Structured Content Patterns AI Favors

### Numbered Procedure Steps

Use for any process: implant placement, Invisalign treatment, root canal, teeth whitening.

```
The dental implant procedure at [Practice Name] follows 4 stages over 3 to 6 months:

1. Consultation and 3D imaging (45 minutes at first visit)
2. Surgical implant placement (1 to 2 hours under local anesthesia)
3. Osseointegration and healing (8 to 16 weeks)
4. Custom crown placement and final bite adjustment (2 visits over 2 weeks)
```

### Cost Comparison Tables

```
| Treatment | Cost Range | Financing Available |
|---|---|---|
| Single implant | $3,500 to $5,500 | 18-month 0% via CareCredit |
| Multiple implants | $10,000 to $20,000 | 24-month financing |
| Full-arch restoration | $25,000 to $45,000 | 60-month payment plans |
```

### Timeline Lists

```
- Consultation: same-day availability
- 3D scan and treatment plan: 45 minutes
- Implant surgery: 1 hour per implant
- Healing period: 3 to 6 months
- Final crown: 2 visits over 2 weeks
- Total treatment time: 4 to 7 months
```

### Symptoms Lists (Candidacy Sections)

```
You may be a candidate for dental implants at [Practice Name] if you:

- Are missing one or more teeth
- Have healthy gums with no active periodontal disease
- Have sufficient jawbone density (confirmed via 3D scan)
- Do not smoke or are willing to stop during healing
- Are in general good health
```

AI systems extract these structures cleanly. Prose paragraphs covering the same information are less likely to be cited.

---

## 10. Summary of Non-Negotiables

Every page produced by this skill must hit every one of these:

1. Micro-Answer block (40 to 80 words, entity-rich) directly under H1.
2. All H2s as complete questions.
3. First paragraph of each section answers the heading in 40 to 80 words.
4. Entity signals (practice name, doctor, city) in first 100 words and every major paragraph.
5. At least one quantitative data point per major section.
6. Expert quote block with doctor full name and credentials.
7. Entity-specific FAQs using [Practice] + [Service] + [City] formula.
8. FAQPage schema mapped for all FAQ items.
9. Zero vague marketing language.
10. Schema Notes block at end flagging every schema type needed.

If a page fails any one of these, it fails the AEO/GEO quality gate. Rewrite before delivery.
