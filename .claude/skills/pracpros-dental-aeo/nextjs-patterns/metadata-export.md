# Metadata Export

This file specifies how the skill generates the `metadata` export (App Router) or the equivalent `<Head>` block (Pages Router) for every optimized page.

The metadata is the AI-extractable summary that appears in search results, social shares, and AI tool source previews. Bad metadata loses citations even when body content is perfect.

---

## Field-by-field specification

### `title`

| Constraint | Value |
|---|---|
| Maximum length | 60 characters (Google truncates around 600 pixels, ~60 chars typical) |
| Format | `[Service or Topic] in [City] \| [Practice] — [Quantitative or trust hook]` |
| Required entities | At least 2 of: practice name, city, service, doctor name |
| Required hook | A specific number or differentiator |

**Examples by page type:**

| Page type | Title example |
|---|---|
| Homepage | `Bright Smiles Dental — Calgary's Top-Rated Family Dentist (847 Reviews)` |
| Service | `Dental Implants in Calgary \| Bright Smiles — 98.7% Success Rate` |
| Cost page | `Dental Implant Cost in Calgary 2026 \| From $3,500 CAD` |
| Doctor | `Dr. Sarah Chen, DDS, MAGD, FAAID \| AAID Fellow in Calgary` |
| Neighborhood | `Inglewood Dentist \| Bright Smiles — Open Until 11pm` |
| Blog | `How Long Do Dental Implants Last? \| Calgary Implant Dentist` |
| FAQ-style | `Is Dental Implant Surgery Painful? \| Calgary Implant Specialist` |
| Emergency | `Emergency Dentist Calgary \| Same-Day Appointments \| Bright Smiles` |

**Anti-patterns to avoid:**

- Title repeats the practice name 3 times.
- Title is generic: "Dental Services" or "About Us".
- Title is missing the city.
- Title is over 70 characters (gets truncated).
- Title uses ALL CAPS or excessive punctuation.

### `description`

| Constraint | Value |
|---|---|
| Maximum length | 155 characters |
| Required elements | Quantitative hook, value proposition, optional implicit CTA |
| Tone | Direct, specific, benefits-clear |

**Examples by page type:**

| Page type | Description example |
|---|---|
| Homepage | `Bright Smiles Dental in Calgary: AAID Fellow, 5,400+ active patients, 847 Google reviews. Open until 11pm Mon-Thu. Direct billing.` |
| Service | `Dr. Sarah Chen has placed 2,400+ dental implants in Calgary since 2010. AAID Fellow. From $3,500 CAD. Same-day consultations.` |
| Cost page | `Dental implants at Bright Smiles Calgary range from $3,500 to $5,500 CAD. Direct billing to Manulife, Sun Life, Pacific Blue Cross.` |
| Doctor | `Dr. Sarah Chen is a Calgary AAID Fellow with 2,400+ implants placed since 2010. DDS, MAGD, FAAID. Speaks English, Mandarin, Cantonese.` |
| Emergency | `Same-day emergency dental care in Calgary. Average 30-minute time to treatment. Open until 11pm Mon-Thu. (403) 555-0188.` |

**Anti-patterns to avoid:**

- Description is the first sentence of the body content.
- Description has no number, no specific claim.
- Description is over 160 characters.
- Description starts with "Welcome to..." or "We are...".

### `alternates.canonical`

Every optimized page sets a canonical URL.

```tsx
alternates: {
  canonical: "https://brightsmilesdental.ca/dental-implants",
}
```

Rules:
- Always full URL with `https://`.
- No trailing slash unless the site uses trailing slashes consistently (skill detects from sitemap or robots; defaults to no trailing slash).
- For paginated pages, points to the unpaginated canonical when appropriate.
- For dynamic routes, the canonical is the resolved URL, not the template.

### `openGraph`

```tsx
openGraph: {
  title: "Dental Implants in Calgary | Bright Smiles Dental",
  description: "AAID Fellow on staff. 2,400+ implants placed. From $3,500 CAD.",
  url: "https://brightsmilesdental.ca/dental-implants",
  siteName: "Bright Smiles Dental",
  locale: "en-CA",
  type: "website",
  images: [
    {
      url: "https://brightsmilesdental.ca/og/dental-implants.webp",
      width: 1200,
      height: 630,
      alt: "Bright Smiles Dental — dental implants in Calgary",
    },
  ],
},
```

Rules:
- `title` and `description` may be slightly different from `metadata.title` and `metadata.description` — Open Graph allows more flexibility (no strict 60-char limit on OG titles, though staying close is good).
- `siteName` is `practice.branded_name` from CLIENT_BRIEF.
- `locale` is `en-US` for US locale, `en-CA` for CA locale.
- `type` is `website` for most pages, `article` for blog posts.
- `images` array: include if the page has a hero image. The skill recommends the URL pattern `/og/[slug].webp` but does not generate the image. Flag missing OG images in the run report.

### `robots`

```tsx
robots: { index: true, follow: true }
```

Default for all optimized pages. The skill does not noindex pages.

Exceptions where the skill flags but does not auto-noindex:

- Pages flagged as `[PRUNE CANDIDATE]` per `references/10-technical-aeo.md`.
- Thank-you / confirmation pages (`/thank-you`, `/booking-confirmed`) — these should be noindex but the skill leaves their existing config alone.

### `twitter` (App Router) / Twitter `<meta>` (Pages Router)

```tsx
twitter: {
  card: "summary_large_image",
  title: "Dental Implants in Calgary | Bright Smiles Dental",
  description: "AAID Fellow on staff. 2,400+ implants placed. From $3,500 CAD.",
  images: ["https://brightsmilesdental.ca/og/dental-implants.webp"],
},
```

Same content rules as OpenGraph. The skill always sets `card: "summary_large_image"` because dental practices benefit from visual share previews.

### `keywords`

The skill **does not** set the `keywords` meta tag. Google has not used it as a ranking signal since 2009. The Next.js `metadata.keywords` field exists, but the skill leaves it empty/undefined. If the original page had a `keywords` value, the skill removes it as part of metadata cleanup.

### `authors` / `creator` (App Router)

Used on blog posts and doctor pages.

```tsx
authors: [{ name: "Dr. Sarah Chen", url: "https://brightsmilesdental.ca/team/dr-sarah-chen" }],
creator: "Dr. Sarah Chen",
publisher: "Bright Smiles Dental",
```

For pages without a clear author (homepage, service pages), the skill omits `authors` and `creator` and sets only `publisher` to the practice name.

### `verification`

Preserved if it exists in the original page. The skill never adds Google Search Console or Bing verification tokens itself — those are project-level concerns owned by the developer.

### `alternates.languages`

If the project supports multiple locales (e.g., en-US plus es-US for a bilingual practice, or en-CA plus fr-CA for a Quebec practice), the skill preserves existing `alternates.languages` declarations but does not add new ones. v1.0.0 is single-locale per page; multi-locale support is reserved for v1.1.

---

## App Router export pattern

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://brightsmilesdental.ca"),
  title: "Dental Implants in Calgary | Bright Smiles Dental — 98.7% Success Rate",
  description: "Dr. Sarah Chen, AAID Fellow, has placed 2,400+ dental implants in Calgary since 2010. From $3,500 CAD. Same-day consultations available.",
  alternates: {
    canonical: "https://brightsmilesdental.ca/dental-implants",
  },
  openGraph: {
    title: "Dental Implants in Calgary | Bright Smiles Dental",
    description: "AAID Fellow on staff. 2,400+ implants placed. From $3,500 CAD.",
    url: "https://brightsmilesdental.ca/dental-implants",
    siteName: "Bright Smiles Dental",
    locale: "en-CA",
    type: "website",
    images: [
      {
        url: "/og/dental-implants.webp",
        width: 1200,
        height: 630,
        alt: "Bright Smiles Dental — dental implants in Calgary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Implants in Calgary | Bright Smiles Dental",
    description: "AAID Fellow on staff. 2,400+ implants placed. From $3,500 CAD.",
    images: ["/og/dental-implants.webp"],
  },
  robots: { index: true, follow: true },
};
```

`metadataBase` is set once on every page. With `metadataBase` set, all relative URLs in `openGraph.images`, `twitter.images`, and similar fields are resolved against the base URL.

---

## App Router `generateMetadata` pattern (dynamic routes)

For dynamic routes like `app/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return {
    title: `${post.title} | Bright Smiles Dental Calgary`,
    description: post.metaDescription,
    alternates: {
      canonical: `https://brightsmilesdental.ca/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://brightsmilesdental.ca/blog/${slug}`,
      siteName: "Bright Smiles Dental",
      locale: "en-CA",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: ["Dr. Sarah Chen"],
    },
  };
}
```

The skill keeps the existing `generateMetadata` signature, including the Promise-based params API for Next.js 15+. The skill rewrites the title/description templates and the OpenGraph block but preserves the data-fetching call.

---

## Pages Router `<Head>` pattern

See `nextjs-patterns/pages-router-page.md` for the equivalent `<Head>` structure. Same content, different syntax.

---

## Title-case vs sentence-case

The skill defaults to **title case** for titles (`Dental Implants in Calgary`) and **sentence case** for descriptions (`Dr. Sarah Chen has placed 2,400+ dental implants...`).

In CA locale, certain words follow Canadian conventions (no automatic Americanization of "centre" to "center" in titles).

---

## Pre-write validation

Before writing the metadata block, the skill runs these checks. Failure means regenerate:

- `title.length <= 60`
- `description.length <= 155`
- title contains city OR service OR practice name (at least 2)
- title contains at least one specific number, year, percentage, or differentiator
- description contains at least one specific number
- description does not start with "Welcome", "We are", or "Our"
- canonical URL starts with `https://`
- canonical URL host matches `practice.website_url`'s host
- openGraph.locale matches `_derived.locale` mapping (`en-US` or `en-CA`)
- robots is `{ index: true, follow: true }` (unless explicit prune)

If any check fails after 3 regeneration attempts, the page is skipped and logged.
