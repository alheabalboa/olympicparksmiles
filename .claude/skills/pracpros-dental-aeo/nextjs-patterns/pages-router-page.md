# Pages Router Page Pattern

This file specifies the exact structure the skill produces when writing or rewriting a Pages Router page (`pages/<route>.{tsx,jsx,ts,js,mdx}`). It assumes the project uses the `pages/` directory.

The skill never restructures the route. It only rewrites the content inside the page component and ensures `<Head>`, schema, and shared component imports are correct.

---

## Detection

A project is Pages Router if `pages/` exists and contains at least one of:

- `pages/_app.{tsx,jsx,ts,js}`
- `pages/_document.{tsx,jsx,ts,js}`
- `pages/index.{tsx,jsx,ts,js,mdx}`

If both `pages/` and `app/` exist, App Router takes precedence per Next.js's own routing rules. The skill warns the user via the run report when the project is in dual-router state.

---

## File anatomy

A typical optimized Pages Router page has these sections in order:

```tsx
// 1. Imports
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { MicroAnswer } from "@/components/MicroAnswer";
import { ExpertQuote } from "@/components/ExpertQuote";
import { FAQBlock } from "@/components/FAQBlock";

// 2. (Optional) types
type Props = { /* ... */ };

// 3. Schema constant
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    /* ... see references/07-schema-generation.md ... */
  ],
};

// 4. FAQ data constant
const faqs = [
  {
    question: "How long do dental implants last at Bright Smiles Dental in Calgary?",
    answer: "In our practice, the 2,400+ implants Dr. Sarah Chen has placed since 2010...",
  },
  // 4 to 8 entity-specific FAQs
];

// 5. Page component (default export)
export default function DentalImplantsPage(props: Props) {
  return (
    <>
      <Head>
        <title>Dental Implants in Calgary | Bright Smiles Dental — 98.7% Success Rate</title>
        <meta
          name="description"
          content="Dr. Sarah Chen, AAID Fellow, has placed 2,400+ dental implants in Calgary since 2010. From $3,500 CAD. Same-day consultations available."
        />
        <link rel="canonical" href="https://brightsmilesdental.ca/dental-implants" />
        <meta property="og:title" content="Dental Implants in Calgary | Bright Smiles Dental" />
        <meta property="og:description" content="AAID Fellow on staff. 2,400+ implants placed. From $3,500 CAD." />
        <meta property="og:url" content="https://brightsmilesdental.ca/dental-implants" />
        <meta property="og:site_name" content="Bright Smiles Dental" />
        <meta property="og:locale" content="en-CA" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Head>

      <JsonLd data={schema} />

      <article>
        <h1>Dental Implants in Calgary at Bright Smiles Dental</h1>

        <MicroAnswer
          practiceName="Bright Smiles Dental"
          city="Calgary"
          service="dental implants"
          quantitative="2,400+ placed since 2010"
          differentiator="AAID Fellow on staff, same-day consultations"
        />

        <h2>How does the dental implant procedure work at Bright Smiles Dental?</h2>
        <p>{/* 40-80 word direct answer + expansion */}</p>

        {/* ... more H2 sections ... */}

        <ExpertQuote
          doctorName="Dr. Sarah Chen"
          credentials="DDS, MAGD, FAAID"
          quote="Most candidates can be evaluated in a single CBCT-supported consultation..."
        />

        <FAQBlock pageUrl="https://brightsmilesdental.ca/dental-implants" faqs={faqs} />

        <p className="text-sm text-muted-foreground mt-12">
          Last medically reviewed: May 2026 by Dr. Sarah Chen, DDS, MAGD, FAAID.
        </p>
      </article>
    </>
  );
}

// 6. (Optional) data fetching - preserved from original file
// export async function getStaticProps() { ... }
// export async function getServerSideProps() { ... }
// export async function getStaticPaths() { ... }
```

---

## Key differences from App Router

| Concern | App Router | Pages Router |
|---|---|---|
| Title and meta | `metadata` export object | `<Head>` from `next/head` inside the JSX |
| Default rendering | Server Component | Client-side React (with optional SSR/SSG via data fetching) |
| Layout | `app/layout.tsx` | `pages/_app.tsx` |
| Document HTML shell | Auto-generated | `pages/_document.tsx` |
| Data fetching | `async` Server Components, `fetch()` with caching | `getStaticProps`, `getServerSideProps`, `getStaticPaths` |

---

## What the skill preserves from the original file

1. **`getStaticProps`, `getServerSideProps`, `getStaticPaths`** — preserved exactly. The skill rewrites the JSX inside the component body, not these functions.
2. **Component props typing** — preserved exactly.
3. **Imports unrelated to content** (analytics, feature flags, hooks) — preserved exactly.
4. **Existing `<Head>` tags that don't conflict** — preserved if they add value (e.g., specific verification meta tags, custom Open Graph images). Conflicting tags (duplicate title, duplicate description) are removed.
5. **Custom layout overrides** (the `Page.getLayout` pattern) — preserved exactly.

---

## What the skill rewrites

1. The `<Head>` block — title, description, canonical, OpenGraph, robots tags.
2. The JSX body of the default export's component function.
3. The `schema` constant.
4. The `faqs` constant.
5. Image alt text on `<Image>` and `<img>` tags inside the rewritten body.
6. Internal link anchor text and href values (only for cluster/silo links it adds; existing links are left alone).

---

## `<Head>` rules

The skill follows these rules when generating the `<Head>` block:

1. **Title under 60 characters.** Format: `[Service] in [City] | [Practice] — [Quantitative hook]`.
2. **Description under 155 characters.** Includes a quantitative hook and a CTA element.
3. **Canonical link** uses the full URL from `practice.website_url + page.path`.
4. **OpenGraph locale** is `en-US` or `en-CA` based on `_derived.locale`.
5. **Twitter card tags** are added by default:
   ```tsx
   <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:title" content="..." />
   <meta name="twitter:description" content="..." />
   ```
6. **No duplicate tags.** Skill scans the existing `<Head>` and removes tags it's about to replace.

---

## JSON-LD placement

In Pages Router, JSON-LD can go inside `<Head>` (as a `<script>` tag) or in the body. The skill places `<JsonLd>` outside `<Head>` because the `<JsonLd>` component renders a `<script type="application/ld+json">` that works equally well from anywhere in the document. This:

- Keeps `<Head>` clean for meta tags only.
- Avoids the React quirk where deeply-nested children of `<Head>` from `next/head` sometimes don't merge cleanly.
- Matches the App Router pattern, so the same `<JsonLd>` component works in both routers.

If the developer prefers schema in `<Head>`, they can wrap `<JsonLd>` inside `<Head>` themselves — both work.

---

## Edge cases

### `pages/_app.tsx` and `pages/_document.tsx`

These are not content pages. The skill never optimizes them, but it does check them for one thing: that they don't strip `<Head>` content from child pages. If `_document.tsx` has a malformed `<Head>` setup that prevents page-level `<Head>` from rendering, the skill flags it:

```
[CRITICAL] pages/_document.tsx may strip page-level <Head> tags.
           Verify that <Head> children from page files render in the HTML output.
```

### `pages/api/*`

API routes. Never optimized.

### `pages/index.tsx`

The homepage. Treated as `homepage` page type per `references/03-page-types.md`.

### Custom 404 (`pages/404.tsx`) and 500 pages

Treated as system pages. Skipped:

```
[SKIP] pages/404.tsx — Next.js system page, not optimized.
```

### `getInitialProps` (legacy)

If the page uses the legacy `getInitialProps` instead of `getStaticProps` or `getServerSideProps`, the skill preserves it but flags it:

```
[LEGACY] pages/services.tsx uses getInitialProps.
         Recommend migrating to getStaticProps or getServerSideProps.
         Skill did not modify the data-fetching method.
```

### Catch-all routes (`[...slug].tsx`)

Treated as dynamic. Per the audit edge case in `references/12-eeat-audit.md`, the skill optimizes the static scaffold (Head, schema generation function, JSX wrapper) but leaves the dynamic content slot alone.

---

## File extension handling

Same rules as App Router: skill matches the original file's extension and never converts between `.tsx`, `.jsx`, `.ts`, `.js`, or `.mdx`.

---

## Migration awareness

The Pages Router is now a legacy pattern in Next.js 15+. The skill does not push the user to migrate. It optimizes whatever router the project uses today. The run report mentions the App Router as a future option but does not require it.
