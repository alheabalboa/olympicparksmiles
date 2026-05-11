# Internal Linking and the GEO-Silo

This file specifies the site architecture the skill enforces during optimization, the authority flow model for internal links, and how the skill walks the optimized pages to inject links following that flow.

---

## Why this matters

AI systems and search engines read internal linking as a topological signal. A site where the homepage links to neighborhood pages which link to service pages which link back to the homepage is a tight, navigable entity graph. A site where every page links to the homepage and nothing else is a star pattern that signals weak topical depth.

The skill's job is to optimize the graph, not just the pages.

---

## The five-layer GEO-Silo

Every dental Next.js project the skill operates on conforms to this layered model. The skill infers each page's layer during page-type detection (Step 3 of the workflow) and links accordingly.

| Layer | Purpose | URL pattern | Examples |
|---|---|---|---|
| **0 — Homepage** | Root entity page. Everything links back here. | `/` | `app/page.tsx` |
| **1 — Primary City Authority** | Geographic anchor. Targets broadest local intent. | `/dentist-in-[city]` | `app/dentist-in-calgary/page.tsx` |
| **2 — Service + City Money Pages** | High-intent revenue pages. One per service. | `/[service]-[city]` or `/services/[service]` | `app/dental-implants-calgary/page.tsx` |
| **3 — Neighborhood Spoke Pages** | Proximity expansion for near-me. | `/dentist-in-[neighborhood]` or `/dentist-near-[landmark]` | `app/dentist-in-inglewood/page.tsx` |
| **4 — Content Cluster (Blog)** | Topical authority posts supporting money pages. | `/blog/[slug]` | `app/blog/how-long-do-implants-last/page.tsx` |

Plus standard pages outside the layered structure:

- `/about`, `/contact`, `/team/[doctor-slug]`, `/financing`, `/insurance`, `/for-patients`

These are entity-supporting pages, not GEO-silo nodes. They are still optimized but do not participate in the layered link flow.

---

## The Authority Flow Model

These are the directional internal links the skill enforces during the linking pass (Step 6 of the workflow). Every existing page in the project gets these links injected if (a) the target page exists and (b) the source page does not already link to it.

| From | To | Why |
|---|---|---|
| Blog post (Layer 4) | Most relevant service page (Layer 2) | Feeds blog authority to the revenue page |
| Blog post (Layer 4) | Primary city page (Layer 1) | Geographic anchor reinforcement |
| Cost page | Service page + financing page | Commercial intent journey |
| Comparison page (X vs Y) | Both compared service pages | Bidirectional cluster authority |
| Symptom or problem post | Solution service page | Funnel toward revenue |
| Neighborhood page (Layer 3) | Primary city page (Layer 1) | Authority concentration |
| Neighborhood page (Layer 3) | Emergency service page | Emergency intent often local |
| Doctor page (`/team/[slug]`) | Every service page they perform | Builds Dentist-to-Procedure |
| Doctor page | Location page | Doctor lives at a location |
| Service page (Layer 2) | Doctor page of treating doctor | Reciprocal Dentist-to-Procedure |
| Service page (Layer 2) | Related service pages (cluster siblings) | Topical depth |
| Service page (Layer 2) | Primary city page (Layer 1) | Geographic anchor |
| Service page (Layer 2) | Top 2 supporting blog posts in cluster | Topical depth |
| Homepage (Layer 0) | All Layer 1 city pages | Top-of-funnel routing |
| Homepage (Layer 0) | Top 6 to 10 service pages | Service discovery |
| Homepage (Layer 0) | Doctor pages | Trust + entity |
| All pages | Primary city page (Layer 1) | Concentrates geographic authority |

---

## Anchor text rules

AI systems and search engines read anchor text as a relevance signal. Bad anchor text patterns trigger spam filters. Good anchor text reinforces the destination page's primary topic.

### Rules

1. **Vary anchor text.** No exact-match repetition. If five blog posts link to the dental implants page, anchor text should vary: "dental implants", "dental implant procedure", "implant placement", "tooth implants", "our implant program at [Practice Name]". Never five posts with identical anchor `dental implants`.

2. **Use descriptive phrases, not generic.** `our implant page` and `learn more` and `click here` are penalty signals. Replace with specific descriptive phrases.

3. **Include entity signals where natural.** `Dr. Sarah Chen's implant page` or `our Calgary implants service` reinforces entities. Do not force this where it would read unnaturally.

4. **Anchor in body context, not in lists.** A link inside a paragraph carries more authority than one in a sidebar bullet list. Skill prefers in-body links.

5. **Maximum 1 link per 100 words of body content.** Over-linking dilutes signal and reads spammy. Under-linking misses authority opportunities. Target 1 to 3 internal links per major page section.

6. **Never link to the page you are on.** Skill checks for this before injecting.

### Anchor text generation per source page type

| Source page type | Sample varied anchors for "dental implants" link |
|---|---|
| Blog post | "dental implants", "implant procedure", "implant placement at [Practice]", "Dr. [Name]'s implant program" |
| Service page (sibling) | "our implants service", "implants at [Practice]", "single-tooth implants" |
| Doctor page | "Dr. [Name]'s implant work", "implant placements" |
| Cost page | "the implant procedure", "implants at [Practice]" |
| Neighborhood page | "implants at our [neighborhood] clinic", "implants in [city]" |
| Homepage | "Dental Implants" (clean nav anchor on the homepage) |

---

## Internal linking pass (Step 6 of the workflow)

After all pages are optimized in Step 5, the skill runs the internal linking pass:

```
1. Build a graph of all optimized pages: layer, page type, primary service slug,
   doctor slugs, neighborhood, current outbound links.

2. For each page, check the Authority Flow Model table.
   For each row matching the page's type, identify the target page if it exists
   in the project. If it doesn't exist, skip.

3. For each missing required link:
   a. Find a natural placement in body text (last 30% of relevant section preferred).
   b. Generate varied anchor text from the table above.
   c. Inject the link as JSX: <Link href="/target-route">anchor text</Link>.
   d. Re-validate the page passes quality gates with the new link.
   e. If quality gates fail, skip this link and log.

4. Audit for:
   - Orphan pages (no inbound links from any other page in the project).
   - Dead-end pages (no outbound links anywhere).
   - Anchor exact-match overuse (same anchor pointing to the same page from
     more than 2 source pages — flag and rewrite).

5. Report all changes in .pracpros/last-run.md.
```

---

## Page consolidation rules

These rules apply when the skill notices structural problems during optimization. The skill never deletes pages, but it flags consolidation candidates in the run report:

### Flag: duplicate intent across multiple pages

If two pages target the same query (`/emergency-dentist` and `/urgent-care` both targeting "emergency dentist [city]"), this is duplicate intent. The skill flags both pages with:

```
[CONSOLIDATION] Two pages target the same primary intent:
  app/emergency-dentist/page.tsx
  app/urgent-care/page.tsx
  Recommendation: pick one canonical URL, redirect the other.
                  Pick the URL with stronger inbound links and better word count.
```

The skill does not auto-redirect or auto-merge. The developer decides.

### Flag: thin page that should be merged

If a service page has under 600 words and another page already covers the same service better, flag for merging:

```
[CONSOLIDATION] app/whitening-special/page.tsx (420 words) appears to be a
                thin variant of app/teeth-whitening/page.tsx (1,840 words).
                Recommendation: redirect to the longer canonical page.
```

### Flag: orphan pages

Pages with zero inbound internal links from other optimized pages:

```
[ORPHAN] app/services/snap-on-smile/page.tsx has no inbound internal links.
         No service page, blog post, doctor page, or homepage links to it.
         Either add links from related pages, or evaluate whether the page
         should be removed from the sitemap.
```

---

## Minimum viable sitemap (for reference, not enforced)

A competitive single-location dental site requires roughly 30 pages. The skill does not require a project to meet this minimum, but the run report compares the project against it:

| Page type | Recommended count |
|---|---|
| Homepage | 1 |
| Primary city authority page | 1 |
| Service + city money pages | 6 to 8 (emergency, implants, ortho, cosmetic, general, children, dentures, whitening as applicable) |
| Neighborhood spoke pages | 5 to 10 |
| Doctor authority pages | 1 per doctor (typically 2 to 4) |
| Standard pages | 4 to 6 (about, contact, financing, insurance, for-patients, why-us) |
| Blog cluster posts | 8 to 12 (2 per major service cluster) |

The run report calls out the project's count vs. these benchmarks so the developer knows where the site is thin architecturally. The skill does not create missing pages — that is the optimization-only constraint.

---

## URL structure assertions

The skill validates URL patterns during page-type detection and flags structural issues:

- Service pages use `/[service]-[city]` or `/services/[service]` consistently — flag if mixed.
- Neighborhood pages use `/dentist-in-[neighborhood]` consistently.
- Doctor pages use `/team/[slug]` or `/dr-[slug]` consistently.
- No trailing slashes vs. trailing slashes mixed within one site.

These are reported as warnings, not stops. The developer fixes routing in Next.js config; the skill optimizes whatever URL structure it finds.
