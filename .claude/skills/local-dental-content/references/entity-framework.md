# Entity Framework

The Entity Framework is the foundation of every A+ dental page. Before writing a single word, the entity brief must be complete. Content written without this data produces generic copy that cannot be cited by AI systems because it contains no verifiable entity information.

Every page, every schema block, every FAQ ties back to the entity data in this brief.

---

## 1. Entity Brief Template

Before writing begins, confirm every field is filled. Ask the user or the client for any missing data. Never fabricate.

### Required Fields

**Practice Identity**

- [ ] Practice name (exact legal name)
- [ ] Practice name (exact branded name if different, e.g., "Smile Dental Care" vs "Smile Dental Care LLC")
- [ ] Practice tagline or positioning line
- [ ] Website URL
- [ ] Year established (operating since)

**NAP (Name, Address, Phone)**

- [ ] Full address in standard format (Street, Suite, City, State, ZIP)
- [ ] Phone number (primary line, formatted consistently for every use)
- [ ] Secondary phone numbers (emergency line, after-hours line)
- [ ] Email address for patient communications

**Location Data**

- [ ] Primary city
- [ ] Secondary neighborhoods served (list all, rank-ordered by search volume)
- [ ] Notable nearby landmarks (for Proximity Trigger use)
- [ ] Geo coordinates (latitude, longitude) for schema

**Doctor Data (One Per Doctor)**

- [ ] Full name (exactly as on license)
- [ ] Credentials (DDS, DMD, MSD, MAGD, FAAID, etc.)
- [ ] Specialty (general, orthodontics, pediatric, cosmetic, implantology, periodontics, endodontics, prosthodontics, oral surgery)
- [ ] Dental school + graduation year
- [ ] Residency or fellowship (if applicable)
- [ ] Board certifications (with issuing body)
- [ ] Professional associations and memberships (ADA, state association, AAID, AACD, AAP, etc.)
- [ ] Years in practice (total and at this clinic)
- [ ] Services this doctor personally performs
- [ ] Quantitative proof points for this doctor (procedures, years, success rate)
- [ ] Languages spoken
- [ ] Real professional photo URL

**Services Data**

- [ ] Full service list (exact names as they will appear on the site)
- [ ] Which doctor performs each service (for Dentist-to-Procedure schema)
- [ ] Quantitative proof points per service (procedures completed, success rate, years offering)
- [ ] Cost ranges per service
- [ ] Financing options available
- [ ] Technology used per service (CBCT, intraoral scanner, laser dentistry, etc.)

**Insurance and Payment**

- [ ] Insurance plans accepted (list all, using exact plan names)
- [ ] In-network vs out-of-network plans
- [ ] Financing partners (CareCredit, Lending Club, Sunbit, in-house)
- [ ] Accepted payment methods
- [ ] Discount programs (membership plans, senior discounts, family plans)

**Hours and Availability**

- [ ] Standard office hours per weekday
- [ ] Saturday hours (yes/no, time range)
- [ ] Sunday hours (yes/no, time range)
- [ ] Extended evening hours (note the latest time)
- [ ] Emergency or after-hours availability (how patients reach the practice)
- [ ] Holiday schedule policy

**Differentiators (The "Why" for Micro-Answers)**

- [ ] Unique positioning (open late, same-day emergency, multilingual, specific tech)
- [ ] Specialized procedures offered that competitors do not
- [ ] Awards and recognitions (with year and issuing body)
- [ ] Community involvement and sponsorships
- [ ] Notable equipment or tech (DEXIS, iTero, CEREC, etc.)

**Quantitative Proof Points**

- [ ] Total patients served (active plus lifetime)
- [ ] Years in practice
- [ ] Procedures completed (by category)
- [ ] Success rates (implants, crowns, endodontics)
- [ ] Review counts and ratings (Google, Healthgrades, Yelp)
- [ ] Patient retention rate (if tracked)
- [ ] Average wait time for emergencies
- [ ] Financing approval rate (if tracked)

**Trust Signals**

- [ ] Dental board license link (state or provincial)
- [ ] ADA or national association membership link
- [ ] Verified Google Business Profile link
- [ ] Healthgrades profile link
- [ ] Yelp profile link
- [ ] Facebook page link
- [ ] Instagram page link
- [ ] LinkedIn link for each doctor
- [ ] Any media mentions or press

### Quality Gate

The Entity Brief is complete when every required field has verified data. If any field is empty, content writing does not start. If a number is unknown, ask. If a doctor credential is uncertain, verify.

---

## 2. Local Entity Signals: The First 100 Words Rule

This is the most important on-page rule for GEO citation eligibility.

### The Rule

All 4 local entities must appear in the first 100 words of every page:

1. **Practice name** (exact)
2. **Doctor full name + credentials**
3. **City or neighborhood**
4. **Primary service being discussed**

### Why This Matters

AI systems use the opening of a page to confirm entity identity. If the first 100 words do not clearly state who wrote this, about what, for whom, and where, the AI classifies the page as generic and skips it during RAG retrieval.

Competitors who front-load entity signals get cited. Competitors who bury them in paragraph 5 do not.

### Compliant Opening Paragraph Example

> Bright Smiles Dental provides same-day dental implants in Calgary, led by Dr. Sarah Chen, DDS, MAGD. Dr. Chen has placed over 2,400 implants since 2015 and serves patients across Calgary's Inglewood, Kensington, and Beltline neighborhoods. Our Inglewood clinic offers single-tooth, multi-tooth, and full-arch implant restoration with a 98.7% success rate over 9 years.

**Entity check:**

- Practice name: "Bright Smiles Dental" ✓
- Doctor: "Dr. Sarah Chen, DDS, MAGD" ✓
- City: "Calgary" (plus 3 neighborhoods) ✓
- Service: "dental implants" ✓
- Quantitative hooks: "2,400 implants since 2015", "98.7% success rate over 9 years" ✓
- Word count: 62 words, well under 100

### Non-Compliant Opening (Do Not Write This)

> Welcome to our practice! We are a friendly dental office that cares about your smile. Our experienced team offers a range of services to help you achieve the smile of your dreams. We pride ourselves on providing compassionate, personalized care to every patient who walks through our door. Come visit us today to experience the difference.

**Entity check:**

- Practice name: missing
- Doctor: missing
- City: missing
- Service: missing
- Quantitative hooks: none

This opening fails every AEO/GEO rule. AI systems skip it.

---

## 3. Dentist-to-Procedure Schema Linking

This is a gap most dental sites have. Listing dentists on a "Meet the Team" page and services on separate pages creates two disconnected entities in the AI's understanding. The AI cannot confidently link a specific doctor to a specific procedure.

### The Fix

Every service page should include a dedicated schema block that explicitly links the specific dentist (as a Person entity) to that procedure (as a Service or MedicalProcedure entity) at that location.

### Implementation

Use the `provider` property within Service schema to reference the doctor's Person schema by `@id`. Add `knowsAbout` properties to the Person schema to link doctors to their specific services.

### Example JSON-LD

This goes in the `<head>` of a service page (e.g., `/dental-implants-calgary`):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://brightsmilesdental.ca/#dr-sarah-chen",
      "name": "Dr. Sarah Chen",
      "jobTitle": "Implant and Cosmetic Dentist",
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "DDS" },
        { "@type": "EducationalOccupationalCredential", "name": "MAGD" }
      ],
      "knowsAbout": [
        "Dental Implants",
        "Full-Arch Restoration",
        "Cosmetic Dentistry"
      ],
      "memberOf": [
        { "@type": "Organization", "name": "American Dental Association" },
        { "@type": "Organization", "name": "American Academy of Implant Dentistry" }
      ],
      "sameAs": [
        "https://www.healthgrades.com/dentist/dr-sarah-chen",
        "https://www.linkedin.com/in/dr-sarah-chen",
        "https://www.ada.org/find-a-dentist/dr-sarah-chen"
      ]
    },
    {
      "@type": "Dentist",
      "@id": "https://brightsmilesdental.ca/#practice",
      "name": "Bright Smiles Dental",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "Calgary",
        "addressRegion": "AB",
        "postalCode": "T2N 1A1"
      },
      "telephone": "+1-403-555-0199",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.0447,
        "longitude": -114.0719
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "08:00",
          "closes": "23:00"
        }
      ],
      "medicalSpecialty": "Dentistry"
    },
    {
      "@type": "Service",
      "serviceType": "Dental Implants",
      "name": "Dental Implants in Calgary",
      "description": "Single-tooth, multi-tooth, and full-arch dental implants performed by Dr. Sarah Chen at Bright Smiles Dental in Calgary.",
      "provider": {
        "@id": "https://brightsmilesdental.ca/#dr-sarah-chen"
      },
      "areaServed": {
        "@type": "City",
        "name": "Calgary"
      },
      "offers": {
        "@type": "Offer",
        "priceRange": "$3,500 to $5,500 per single implant",
        "priceCurrency": "CAD"
      }
    }
  ]
}
```

### Why This Matters

This tells the AI explicitly: "Dr. Chen is the authority for Implants at Bright Smiles Dental in Calgary." Without this link, the AI has to guess, and it often guesses wrong or simply does not make the connection. This is the difference between being cited as a generic dental practice and being cited as the specific expert for a specific procedure in a specific city.

---

## 4. Entity Reinforcement Pass

After the first draft is complete, run a deliberate entity reinforcement pass. Read the page with one question: could this content have been written about any dental clinic, or is it unmistakably about this specific practice in this specific city?

### The Checklist

**Practice Name**

- [ ] Appears in the intro paragraph.
- [ ] Appears at least once in the body (preferably once per major section).
- [ ] Appears in the conclusion or CTA.
- [ ] Appears in at least 2 FAQ questions or answers.

**Doctor Name**

- [ ] Appears with credentials at least once in the body.
- [ ] Appears in the Expert Quote block with full credentials.
- [ ] Appears in at least 1 FAQ (by name, not just "our doctor").

**City Name**

- [ ] Appears in the H1.
- [ ] Appears in at least one H2 question.
- [ ] Appears 3+ times throughout the body.
- [ ] Appears in at least 1 FAQ question.

**Neighborhood and Local Context**

- [ ] At least 1 reference to a specific neighborhood served.
- [ ] At least 1 reference to a local landmark (for neighborhood pages) or city-specific detail (for service pages).

**FAQs Follow the Formula**

- [ ] Every FAQ includes at least 2 of: [Practice Name], [Service], [City].
- [ ] At least 1 FAQ explicitly mentions the doctor by name.

### The "Any Clinic" Test

Read each paragraph. Ask: could this exact paragraph appear on a competitor's website if you just swapped the clinic name? If yes, rewrite with specifics (local landmark, doctor insight, clinic-specific tech, quantitative proof point).

Every paragraph must be unmistakably about this specific practice. Generic paragraphs fail the test and must be rewritten.

### Example: Failing the Test

> Dental implants are a long-lasting solution for missing teeth. They are surgically placed into the jawbone and topped with a crown. Most patients are good candidates if they have healthy gums and enough bone density. Implants can last decades with proper care.

This fails. It could be on any dental website.

### Example: Passing the Test

> Dr. Sarah Chen at Bright Smiles Dental has placed over 2,400 dental implants across Calgary since 2015, with a documented 98.7% success rate. Every implant consultation at our Inglewood clinic starts with a 3D CBCT scan using our DEXIS imaging system, which Dr. Chen uses to confirm bone density before surgery. For Calgary patients with compromised bone, we offer bone grafting and sinus lift procedures in the same appointment.

This passes. It is unmistakably about Bright Smiles Dental in Calgary with Dr. Chen.

---

## 5. Schema Types Required Per Page Type

Each page type requires a specific schema stack. Dev deploys; Content provides the entity data.

| Page Type | Required Schema Types |
|---|---|
| Homepage | MedicalBusiness + Dentist + LocalBusiness + Organization + (Person per doctor) + sameAs array + openingHoursSpecification + hasOfferCatalog |
| Service Page | Service + provider referencing Person @id + areaServed + FAQPage (for FAQs) + BreadcrumbList |
| Blog Post | Article + Author (Person @id referencing doctor) + FAQPage (if FAQs) + BreadcrumbList + medicalAudience |
| Doctor Page | Person (full schema) + knowsAbout + memberOf + hasCredential + sameAs + worksFor referencing Dentist @id |
| Location / City Page | LocalBusiness + Dentist + Place + geo + areaServed + BreadcrumbList + FAQPage (if FAQs) |

### Cross-Page Schema Linking

Use `@id` to link entities across pages:

- Practice Dentist entity: `https://[domain]/#practice`
- Each doctor: `https://[domain]/#dr-[slug]`
- Each service: `https://[domain]/[service-slug]/#service`

This creates a connected entity graph that AI systems can traverse.

### Validation

Every deployed schema must validate cleanly via:

- Google Rich Results Test (https://search.google.com/test/rich-results)
- Schema Markup Validator (https://validator.schema.org)

Flag any validation errors in the Schema Notes section of delivered content.

---

## 6. sameAs Array: The Full List

The `sameAs` array on the Dentist schema and Person schemas connects the entity to verified external profiles. This is how AI systems confirm the entity exists across the web.

### Practice-Level sameAs (Dentist Schema)

- Google Business Profile
- Facebook page
- Instagram profile
- Yelp business page
- Healthgrades practice page
- ADA directory listing (if US)
- State or provincial dental association directory
- RateMDs profile (if Canada)
- Zocdoc profile
- LinkedIn company page (if active)

### Doctor-Level sameAs (Person Schema)

- State or provincial dental board license page
- Healthgrades doctor profile
- ADA Find-a-Dentist listing
- LinkedIn profile
- Specialty association profile (AAID, AACD, AAP, etc.)
- Dental school alumni profile (if published)
- Zocdoc or Doximity profile
- Media bylines or publications (if any)

### Why It Matters

Every sameAs link is a verification hook. An AI system with access to 10 cross-referenced profiles for the same doctor has high confidence in their identity. A doctor with zero external profiles appears suspect.

---

## 7. Common Entity Mistakes to Avoid

1. **Inconsistent practice name** across pages, NAP, and schema. If the legal name is "Smile Dental LLC" but the site uses "Smile Dental Care" and schema uses "Smile Dental", AI confidence collapses. Pick one branded form and use it everywhere.

2. **Missing doctor credentials.** "Dr. Chen" without "DDS" or specialty is weaker than "Dr. Sarah Chen, DDS, MAGD". Always include the full credential string on first mention.

3. **City mentioned only in meta tags.** If the city appears in the title tag but nowhere in the body, the page fails entity reinforcement. Weave the city into H2s and body paragraphs.

4. **Stock photos of dentists.** AI image recognition and reverse image search can flag stock photos, which weakens trust signals. Always use real doctor and team photos.

5. **Generic "Meet the Team" page with no Person schema.** Every doctor needs their own page with their own Person schema. A combined team page does not create individual Person entities.

6. **FAQs without entity signals.** Covered in detail in aeo-geo-rules.md. Every FAQ must include at least two of: [Practice Name], [Service], [City].

7. **Reused content across locations.** For multi-location practices, each location requires its own complete silo with unique content, photos, testimonials, and schema. Copy-paste across locations destroys entity clarity for all locations.

8. **No Dentist-to-Procedure linking.** Service pages that do not link to the specific doctor via schema `provider` property leave AI systems guessing who performs the procedure. Always link.

---

## 8. Entity Brief Quick-Ask Template

When the user has not provided the entity brief, ask using this exact prompt:

> Before I write this page, I need the following Entity Brief fields to produce A+ content:
>
> 1. **Practice name** (exact branded form)
> 2. **Doctor name + credentials** performing this service (e.g., "Dr. Sarah Chen, DDS, MAGD")
> 3. **Primary city** and any neighborhoods served
> 4. **Quantitative proof points** for this service (procedures completed, years performing, success rate if tracked)
> 5. **Insurance plans accepted** for this service
> 6. **Cost range** (or "ask me to flag for client confirmation")
> 7. **Unique differentiators** (open late, same-day availability, specific technology used, etc.)
> 8. **Office hours** including emergency or extended hours if applicable
> 9. **NAP** (full address and phone number as it appears on the site)
>
> If any field is missing or pending, tell me and I will flag those sections as "pending client verification" rather than guess.

Never skip this step. Generic content fails every AEO gate.
