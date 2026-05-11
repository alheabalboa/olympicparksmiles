# App Router Page Pattern

This file specifies the exact structure the skill produces when writing or rewriting an App Router page (`app/<route>/page.{tsx,jsx,ts,js,mdx}`). It assumes the project uses the `app/` directory.

The skill never restructures the route. It only rewrites the content inside the page component and ensures the metadata export, schema, and shared component imports are correct.

---

## Detection

A project is App Router if `app/` exists and contains at least one of:

- `app/page.{tsx,jsx,ts,js,mdx}` (root page).
- `app/layout.{tsx,jsx,ts,js}` (root layout).
- `app/not-found.{tsx,jsx,ts,js}`.

If both `app/` and `pages/` exist, App Router takes precedence per Next.js's own routing rules.

---

## File anatomy

A typical optimized App Router page has six sections in this order:

```tsx
// 1. Imports
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MicroAnswer } from "@/components/MicroAnswer";
import { ExpertQuote } from "@/components/ExpertQuote";
import { FAQBlock } from "@/components/FAQBlock";
import Link from "next/link";
import Image from "next/image";

// 2. Metadata export (see metadata-export.md for full specification)
export const metadata: Metadata = {
  title: "Dental Implants in Calgary | Bright Smiles Dental — 98.7% Success Rate",
  description: "Dr. Sarah Chen, AAID Fellow, has placed 2,400+ dental implants in Calgary since 2010. From $3,500 CAD. Same-day consultations available.",
  alternates: { canonical: "https://brightsmilesdental.ca/dental-implants" },
  openGraph: {
    title: "Dental Implants in Calgary | Bright Smiles Dental",
    description: "AAID Fellow on staff. 2,400+ implants placed. From $3,500 CAD.",
    url: "https://brightsmilesdental.ca/dental-implants",
    siteName: "Bright Smiles Dental",
    locale: "en-CA",
    type: "website",
  },
  robots: { index: true, follow: true },
};

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
    answer: "In our practice, the 2,400+ implants Dr. Sarah Chen has placed since 2010 show...",
  },
  // 4 to 8 entity-specific FAQs
];

// 5. Page component (default export)
export default function DentalImplantsPage() {
  return (
    <>
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

        <h2>How much do dental implants cost in Calgary?</h2>
        <p>{/* 40-80 word answer with cost range from brief */}</p>

        <FAQBlock pageUrl="https://brightsmilesdental.ca/dental-implants" faqs={faqs} />

        <p className="text-sm text-muted-foreground mt-12">
          Last medically reviewed: May 2026 by Dr. Sarah Chen, DDS, MAGD, FAAID.
        </p>
      </article>
    </>
  );
}

// 6. (Optional) revalidate / dynamic exports - preserved from original file
// export const revalidate = 86400;  // if the original had this, keep it
```

---

## What the skill preserves from the original file

The skill never overwrites these — they go back into the rewritten file untouched:

1. **`generateMetadata` instead of `metadata`** — if the original used the dynamic form, the skill keeps it dynamic and rewrites the body of the function instead.
2. **Dynamic route params (`{ params }: { params: { slug: string } }`)** — preserved exactly. The skill rewrites the JSX inside, not the function signature.
3. **Server-side data fetching (`fetch()`, `cache()`, `unstable_cache()`)** — preserved exactly.
4. **`searchParams` handling** — preserved exactly.
5. **Authentication checks (`auth()`, `redirect()`, `notFound()`)** — preserved exactly.
6. **`generateStaticParams`** — preserved exactly.
7. **Route segment configs (`revalidate`, `dynamic`, `dynamicParams`, `fetchCache`, `runtime`, `preferredRegion`)** — preserved exactly.
8. **Custom imports unrelated to content** (analytics, feature flags, A/B testing) — preserved exactly.

The skill is a content optimizer. The scaffolding is the developer's.

---

## What the skill rewrites

1. The `metadata` object (or the return value of `generateMetadata`).
2. The JSX returned by the default export's component function — specifically the H1, H2s, paragraphs, expert quote blocks, FAQ blocks, and where they're imported from.
3. The `schema` constant.
4. The `faqs` constant.
5. Image alt text on `<Image>` and `<img>` tags inside the rewritten body.
6. Internal link anchor text and href values (only for cluster/silo links it adds; existing links are left alone).

---

## Server vs Client Components

Next.js App Router defaults pages to Server Components. The skill assumes Server Component unless:

- The original file has `"use client"` at the top.
- The original file uses `useState`, `useEffect`, `onClick`, or other client-only APIs.

If the page is a Client Component:

- The `metadata` export is **not allowed** in client components. The skill checks for this conflict. If the original page is `"use client"` and exports `metadata`, that's broken Next.js — the skill flags it but does not auto-fix (could break the developer's intent).
- The `JsonLd` component is server-rendered safely from inside a client page (it just renders a `<script>` tag).
- Recommendation in the run report: move `metadata` to a parent layout.tsx or convert the page to a Server Component if possible.

If the original page contains a mix of server logic and a `"use client"` interactive widget:

- The widget should be a separate child component.
- The skill keeps the widget where it is and rewrites only the surrounding server-component prose.

---

## Where `<JsonLd>` goes in the JSX tree

Place `<JsonLd>` as the first child inside the returned fragment, before any visible markup:

```tsx
return (
  <>
    <JsonLd data={schema} />
    <article>
      {/* visible content */}
    </article>
  </>
);
```

It can also go inside the `<head>` via the App Router `metadata.other` field, but the component approach is cleaner and supports both routers.

---

## Loading metadata from CLIENT_BRIEF

The skill does not import from CLIENT_BRIEF.md at runtime. It reads the brief at skill-execution time and bakes the values into the page file as literals:

```tsx
// CORRECT — values baked in at optimization time:
export const metadata: Metadata = {
  title: "Dental Implants in Calgary | Bright Smiles Dental — 98.7% Success Rate",
  // ...
};
```

```tsx
// WRONG — never generated by the skill:
import { brief } from "@/lib/client-brief";  // does not exist
export const metadata: Metadata = {
  title: `${brief.services[0].name} in ${brief.nap.city}`,
};
```

The user updates CLIENT_BRIEF.md and re-runs the skill to refresh the literals. This keeps the optimized pages dependency-free at build time.

---

## File extension handling

| Extension | Behavior |
|---|---|
| `.tsx` (most common) | Default. Skill produces `.tsx` for new code blocks it inserts. |
| `.jsx` | Skill produces `.jsx` (no type imports). |
| `.ts` | Treated like `.tsx` since pages return JSX. |
| `.js` | Treated like `.jsx`. |
| `.mdx` | Skill rewrites the markdown content + frontmatter; `<JsonLd>` and shared components imported in the MDX file via `import` lines at the top. |

The skill matches the original file's extension. It does not convert `.jsx` to `.tsx` or vice versa.

---

## Edge cases

### Page exports `default async function`

App Router supports async Server Components. The skill preserves the `async` and any `await` calls in the function body.

```tsx
export default async function ServicePage({ params }: { params: { slug: string } }) {
  const data = await fetch(/* ... */);
  return (
    <>
      <JsonLd data={schema} />
      {/* rewritten body using data and brief literals */}
    </>
  );
}
```

### Page is empty or near-empty (stub)

If the original `page.tsx` returns only a placeholder (`<h1>Coming soon</h1>` or similar), the skill treats it as a stub and rewrites it from scratch using brief data. Logged in the run report:

```
[STUB REWRITE] app/services/sleep-apnea/page.tsx had 18 words of body content.
               Treated as stub and rewritten from CLIENT_BRIEF data.
               Review the output before deploying.
```

### Page imports from an MDX file

If the page is `app/blog/[slug]/page.tsx` that imports MDX content from `content/blog/`, the skill optimizes the MDX file instead of the page wrapper. The page wrapper (which is just a renderer) is left alone.

### File uses CSS modules or styled-components

CSS imports and styled-component definitions are preserved. The skill does not change className strings unless adding new content that needs styling. New styling additions use Tailwind classes if Tailwind is detected in the project (presence of `tailwind.config.{js,ts}`); otherwise the skill uses plain class names that the developer can style.

### File uses `next/dynamic` for code splitting

Preserved. Skill optimizes content of components that are dynamically imported separately, in their own files.
