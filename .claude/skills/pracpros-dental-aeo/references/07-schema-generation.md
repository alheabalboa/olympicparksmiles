# Schema Generation

This file defines how the skill generates real JSON-LD schema for every page it optimizes. The output is a `<JsonLd>` component import in the page file, not commented-out notes.

The skill never just describes schema. It writes it.

---

## Core principles

1. **Every page gets schema.** No exceptions. A dental page without schema is invisible to AI extraction even if its body content is perfect.

2. **Schema cross-references via `@id`.** The Dentist entity has one `@id`. Each Person entity has one `@id`. Each Service entity has one `@id`. When a service references a doctor, it uses `{"@id": "..."}` not a duplicated Person object. This creates a connected entity graph the AI can traverse.

3. **Omit fields the brief does not have.** Schema validators tolerate optional fields being absent. They do not tolerate fabricated data. If `doctor.board_certifications` is empty, the `hasCredential` array is omitted, not faked.

4. **Locale-correct values.** `addressCountry` is `US` or `CA` based on locale detection. `priceCurrency` is `USD` or `CAD`. `inLanguage` is `en-US` or `en-CA`.

5. **Validate before writing.** The skill should mentally validate the generated JSON-LD before writing the file. The two test endpoints worth knowing are Google Rich Results Test (https://search.google.com/test/rich-results) and Schema Markup Validator (https://validator.schema.org). The skill flags invalid schema in the run report.

---

## `@id` convention

Use stable `@id` URIs anchored at the practice's domain:

| Entity | @id pattern | Example |
|---|---|---|
| Practice (Dentist + LocalBusiness) | `{website_url}/#practice` | `https://brightsmilesdental.ca/#practice` |
| Doctor (Person) | `{website_url}/#dr-{slug}` | `https://brightsmilesdental.ca/#dr-sarah-chen` |
| Service | `{website_url}/{service-slug}/#service` | `https://brightsmilesdental.ca/dental-implants/#service` |
| FAQ block on a page | `{page_url}/#faq` | `https://brightsmilesdental.ca/dental-implants/#faq` |
| Article (blog) | `{page_url}/#article` | `https://brightsmilesdental.ca/blog/how-long-implants-last/#article` |
| BreadcrumbList | `{page_url}/#breadcrumbs` | `https://brightsmilesdental.ca/services/#breadcrumbs` |

Doctor slug derives from `doctors[].full_name` by lowercasing, removing "Dr.", and kebab-casing. "Dr. Sarah Chen" → `dr-sarah-chen`.

---

## Schema stack per page type

| Page type | Required schemas |
|---|---|
| Homepage | `Dentist` + `LocalBusiness` (combined as `@type: ["Dentist", "LocalBusiness"]`) + `MedicalOrganization` + per-doctor `Person` array + `BreadcrumbList` |
| Service page | `Service` with `provider` `@id` reference to Person + `FAQPage` + `BreadcrumbList` |
| Doctor page | `Person` (full schema) with `knowsAbout` array linking to services + `BreadcrumbList` |
| Neighborhood page | `LocalBusiness` (with neighborhood-specific `areaServed`) + `BreadcrumbList` + `FAQPage` if FAQs present |
| Blog post | `Article` (or `BlogPosting`) with `author` `@id` reference to Person + `medicalAudience` + `FAQPage` if FAQs present + `BreadcrumbList` |

Combine all schemas for a page into a single `@graph` array in one `<JsonLd>` component to keep the page clean.

---

## Template 1: Dentist + LocalBusiness (homepage and contact)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "LocalBusiness", "MedicalOrganization"],
      "@id": "{{practice.website_url}}/#practice",
      "name": "{{practice.branded_name}}",
      "legalName": "{{practice.legal_name}}",
      "url": "{{practice.website_url}}",
      "logo": "{{practice.website_url}}/logo.png",
      "image": "{{practice.website_url}}/clinic-exterior.webp",
      "telephone": "{{nap.primary_phone}}",
      "email": "{{nap.email}}",
      "priceRange": "$$",
      "currenciesAccepted": "{{_derived.currency}}",
      "paymentAccepted": "Cash, Credit Card, Debit",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{{nap.street}}{{ if nap.suite then ', ' + nap.suite }}",
        "addressLocality": "{{nap.city}}",
        "addressRegion": "{{nap.state_or_province}}",
        "postalCode": "{{nap.postal_code}}",
        "addressCountry": "{{_derived.country}}"
      },
      "areaServed": [
        {"@type": "City", "name": "{{coverage.primary_city}}"},
        {{ for n in coverage.neighborhoods }}
        {"@type": "Place", "name": "{{n}}"}
        {{ end }}
      ],
      "openingHoursSpecification": [
        {{ for day, range in hours }}
        {{ if range != "closed" }}
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "{{day | capitalize}}",
          "opens": "{{range.split('-')[0]}}",
          "closes": "{{range.split('-')[1]}}"
        }
        {{ end }}
        {{ end }}
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "{{proof.google_average_rating}}",
        "reviewCount": "{{proof.google_review_count}}"
      },
      "sameAs": [
        "{{trust.google_business_profile_url}}",
        "{{trust.facebook_url}}",
        "{{trust.instagram_url}}",
        "{{trust.yelp_url}}"
        {{ for url in trust.other_profile_urls }}
        , "{{url}}"
        {{ end }}
      ],
      "founder": [
        {{ for d in doctors }}
        {"@id": "{{practice.website_url}}/#dr-{{d.slug}}"}
        {{ end }}
      ],
      "employee": [
        {{ for d in doctors }}
        {"@id": "{{practice.website_url}}/#dr-{{d.slug}}"}
        {{ end }}
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dental services at {{practice.branded_name}}",
        "itemListElement": [
          {{ for s in services }}
          {
            "@type": "Offer",
            "itemOffered": {"@id": "{{practice.website_url}}/{{s.slug}}/#service"}
          }
          {{ end }}
        ]
      }
    }
    {{ for d in doctors }},
    {{ /* see Template 2 — Person, repeated per doctor */ }}
    {{ end }}
  ]
}
```

Empty fields (e.g., `trust.facebook_url` blank) are filtered out before writing — the skill produces `sameAs` as a clean array of non-empty URLs.

---

## Template 2: Person (per doctor)

```json
{
  "@type": "Person",
  "@id": "{{practice.website_url}}/#dr-{{doctor.slug}}",
  "name": "{{doctor.full_name}}",
  "honorificSuffix": "{{doctor.credentials}}",
  "image": "{{practice.website_url}}{{doctor.photo_url}}",
  "url": "{{practice.website_url}}/team/{{doctor.slug}}",
  "jobTitle": "{{doctor.specialty | titlecase}} Dentist",
  "worksFor": {"@id": "{{practice.website_url}}/#practice"},
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "{{doctor.dental_school}}"
  },
  "knowsLanguage": "{{doctor.languages}}",
  "knowsAbout": [
    {{ for s in doctor.services_performed }}
    "{{s}}"
    {{ end }}
  ],
  "memberOf": [
    {{ for a in doctor.associations }}
    {"@type": "Organization", "name": "{{a}}"}
    {{ end }}
  ],
  "hasCredential": [
    {{ for c in doctor.board_certifications }}
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Board Certification",
      "name": "{{c}}"
    }
    {{ end }}
  ],
  "sameAs": [
    {{ for url in doctor.profile_urls }}
    "{{url}}"{{ if not_last }},{{ end }}
    {{ end }}
  ]
}
```

---

## Template 3: Service (with provider link)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Service", "MedicalProcedure"],
      "@id": "{{practice.website_url}}/{{service.slug}}/#service",
      "name": "{{service.name}}",
      "description": "{{first 160 chars of page Micro-Answer}}",
      "url": "{{practice.website_url}}/{{service.slug}}",
      "serviceType": "{{service.name}}",
      "category": "Dental",
      "provider": {"@id": "{{practice.website_url}}/#practice"},
      "performer": [
        {{ for doctor_name in service.performed_by_doctors }}
        {"@id": "{{practice.website_url}}/#dr-{{slug_of(doctor_name)}}"}
        {{ end }}
      ],
      "areaServed": [
        {"@type": "City", "name": "{{coverage.primary_city}}"},
        {{ for n in coverage.neighborhoods }}
        {"@type": "Place", "name": "{{n}}"}
        {{ end }}
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "{{_derived.currency}}",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "{{service.cost_range_low}}",
          "maxPrice": "{{service.cost_range_high}}",
          "priceCurrency": "{{_derived.currency}}"
        },
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "{{page.url}}/#breadcrumbs",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "{{practice.website_url}}"},
        {"@type": "ListItem", "position": 2, "name": "Services", "item": "{{practice.website_url}}/services"},
        {"@type": "ListItem", "position": 3, "name": "{{service.name}}", "item": "{{practice.website_url}}/{{service.slug}}"}
      ]
    }
  ]
}
```

The skill MAY combine Service schema with FAQPage schema (Template 4) into one `@graph` for service pages with FAQs.

---

## Template 4: FAQPage

```json
{
  "@type": "FAQPage",
  "@id": "{{page.url}}/#faq",
  "mainEntity": [
    {{ for faq in page.faqs }}
    {
      "@type": "Question",
      "name": "{{faq.question}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{faq.answer}}"
      }
    }
    {{ end }}
  ]
}
```

**Important.** Google restricted FAQ rich results in August 2023 to government and health authority sites. Dental practices are health-adjacent and most still qualify; some may not display rich results. The schema is still emitted regardless because:

- AI systems still extract from FAQPage schema even when Google does not display rich results.
- The schema costs nothing if not rendered.
- Future re-expansion is possible.

The skill does not warn the user about this restriction. Just emit the schema.

---

## Template 5: Article (for blog posts)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Article", "MedicalWebPage"],
      "@id": "{{page.url}}/#article",
      "headline": "{{page.h1}}",
      "description": "{{page.meta_description}}",
      "image": "{{page.hero_image_url}}",
      "datePublished": "{{page.date_published_iso}}",
      "dateModified": "{{page.date_modified_iso}}",
      "author": {"@id": "{{practice.website_url}}/#dr-{{author_doctor.slug}}"},
      "publisher": {"@id": "{{practice.website_url}}/#practice"},
      "mainEntityOfPage": {"@id": "{{page.url}}"},
      "inLanguage": "{{ if _derived.locale == 'US' then 'en-US' else 'en-CA' }}",
      "lastReviewed": "{{page.date_modified_iso}}",
      "reviewedBy": {"@id": "{{practice.website_url}}/#dr-{{author_doctor.slug}}"},
      "medicalAudience": [
        {"@type": "MedicalAudience", "audienceType": "Patient"}
      ],
      "about": {
        "@type": "MedicalCondition",
        "name": "{{page.primary_topic}}"
      }
    },
    {{ /* BreadcrumbList here */ }},
    {{ /* FAQPage here if FAQs present */ }}
  ]
}
```

If the post does not have an explicit author doctor, default to the doctor with the longest tenure who performs the relevant service.

---

## Template 6: BreadcrumbList (every page)

```json
{
  "@type": "BreadcrumbList",
  "@id": "{{page.url}}/#breadcrumbs",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "{{practice.website_url}}"}
    {{ for crumb in page.breadcrumbs }}
    , {"@type": "ListItem", "position": "{{loop.index + 1}}", "name": "{{crumb.name}}", "item": "{{crumb.url}}"}
    {{ end }}
  ]
}
```

---

## Generation rules

### Rule 1: One `<JsonLd>` per page

The skill generates one `<JsonLd>` import and one render call per page. Multiple schemas combine in one `@graph` array. This is cleaner than emitting three or four separate `<script>` tags.

### Rule 2: Filter empty fields before serializing

`sameAs` arrays, `board_certifications`, `technology_used`, and any optional fields that are blank strings or empty arrays must be removed from the output JSON. Trailing commas, empty arrays, and `""` values break some schema validators.

Pseudocode:

```
function clean(obj) {
  for each key in obj:
    if value is empty string or empty array or null:
      delete key
    else if value is object:
      clean(value)
  return obj
}
```

### Rule 3: Slug normalization

When converting doctor names to slugs:

1. Lowercase.
2. Strip "dr." prefix.
3. Replace spaces with hyphens.
4. Strip diacritics (e.g., "Dr. Aman Singh" → `aman-singh`, "Dr. Élise Côté" → `elise-cote`).
5. Final slug: prepend `dr-` for doctor `@id` URIs.

### Rule 4: Locale-aware fields

| Field | US value | CA value |
|---|---|---|
| `addressCountry` | `"US"` | `"CA"` |
| `priceCurrency` | `"USD"` | `"CAD"` |
| `currenciesAccepted` | `"USD"` | `"CAD"` |
| `inLanguage` | `"en-US"` | `"en-CA"` |
| `addressRegion` format | 2-letter US state | 2-letter province code |

### Rule 5: Date format

All dates in schema use ISO 8601: `2026-05-06T10:00:00-05:00`. The timezone offset matches the practice's locale (US Central as default for Texas, Mountain for Alberta, etc.). When date is not known, omit the field rather than fabricate.

### Rule 6: Validation step

Before writing the page file, the skill runs a self-check:

- `@graph` array has at least one valid entity for the page type.
- All `@id` references resolve to entities defined elsewhere in the graph or in cross-page schema.
- No empty arrays, empty strings, or null values in the final JSON.
- JSON is valid and parses cleanly.
- Schema type names match Schema.org canonical names (case-sensitive: `Dentist` not `dentist`).

If the self-check fails, the page is regenerated. After 3 retries, it is skipped and logged.

### Rule 7: How the schema gets into the page

The skill creates `components/JsonLd.tsx` once (see `nextjs-patterns/jsonld-script-component.md`) and imports it into every optimized page:

```tsx
import { JsonLd } from "@/components/JsonLd";

const schema = {
  "@context": "https://schema.org",
  "@graph": [/* generated */]
};

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      {/* page content */}
    </>
  );
}
```

For App Router, the schema can also be embedded in a Server Component or via the `metadata` export's `other` field. The skill defaults to the `<JsonLd>` component approach because it works for both routers and is easier to debug.

---

## What the skill does not generate

- **Review schema with individual review bodies.** Aggregating to `aggregateRating` only. Pulling individual reviews into schema requires per-review consent and tracking that the brief does not include.
- **HowTo schema.** Deprecated by Google in September 2023. Do not emit.
- **SpecialAnnouncement schema.** Deprecated July 2025. Do not emit.
- **VideoObject schema.** Reserved for v1.1 when video embeds become a tracked feature.
- **JobPosting, Event, or Product schemas.** Out of scope for dental practice optimization.
