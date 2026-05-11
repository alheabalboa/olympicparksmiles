# Technical AEO

This file specifies the technical (non-content) deliverables the skill produces or modifies during a Mode A (whole-site) optimization run. These are the technical foundation files that make AI-extractability possible at the site level.

The skill operates only on files inside the user's Next.js project. It does not touch DNS, CDN, or hosting configuration.

---

## 1. llms.txt

The llms.txt file is the 2026 equivalent of robots.txt for AI systems. AI agents that respect llms.txt use it to understand what the site is, which pages are authoritative, and how to interpret the content.

### File location

```
public/llms.txt
```

Served at `https://[domain]/llms.txt` by Next.js automatically.

### File format

llms.txt is a markdown file with a strict structure. The skill generates it from CLIENT_BRIEF.md in Mode A.

```markdown
# {{practice.branded_name}}

> {{practice.branded_name}} is a {{_derived.locale}}-licensed dental practice in {{nap.city}}, {{nap.state_or_province}}. Established {{practice.year_established}}. {{proof.google_review_count}} Google reviews with a {{proof.google_average_rating}} star average.

## Practice details

- **Address**: {{nap.street}}{{nap.suite ? ', ' + nap.suite : ''}}, {{nap.city}}, {{nap.state_or_province}} {{nap.postal_code}}
- **Phone**: {{nap.primary_phone}}
- **Email**: {{nap.email}}
- **Website**: {{practice.website_url}}
- **Hours**: {{summarized hours line, e.g., "Mon-Thu 8am-8pm, Fri 8am-5pm, Sat 9am-3pm, closed Sun"}}
- **Emergency**: {{hours.emergency_availability}}

## Doctors

{{ for d in doctors }}
- **{{d.full_name}}, {{d.credentials}}** — {{d.specialty}} dentist. {{d.dental_school}}. {{d.years_in_practice}} years in practice. Performs: {{d.services_performed | join(', ')}}.
{{ end }}

## Services

{{ for s in services }}
- **[{{s.name}}]({{practice.website_url}}/{{s.slug}})** — performed by {{s.performed_by_doctors | join(' and ')}}. Cost range: {{format_currency(s.cost_range_low)}} to {{format_currency(s.cost_range_high)}}.{{ if s.procedures_completed }} {{s.procedures_completed}} procedures completed.{{ end }}
{{ end }}

## Authoritative pages

- [Homepage]({{practice.website_url}})
- [Primary city page]({{practice.website_url}}/dentist-in-{{coverage.primary_city | slug}})
{{ for s in top_5_services }}
- [{{s.name}}]({{practice.website_url}}/{{s.slug}})
{{ end }}
{{ for d in doctors }}
- [{{d.full_name}}]({{practice.website_url}}/team/{{d.slug}})
{{ end }}

## Areas served

{{ for n in coverage.neighborhoods }}
- {{n}}
{{ end }}

## Insurance accepted

{{insurance.in_network | join(', ')}}

## Trust signals

- {{_derived.regulator_name}}: doctors are licensed and in good standing.
- Google Business Profile: {{trust.google_business_profile_url}}
{{ for url in trust.other_profile_urls }}
- Profile: {{url}}
{{ end }}

---

Last updated: {{current_date_iso}}
```

### Regeneration triggers

The skill regenerates `public/llms.txt` whenever:

- Mode A is run (every full-site optimization).
- Any of these brief fields change between runs: practice details, NAP, hours, doctors, services, insurance, trust URLs.
- The user explicitly asks for technical-files-only regeneration.

---

## 2. llms-full.txt

Expanded variant containing the full text of the most important pages. AI agents that support `llms-full.txt` ingest this entire document instead of crawling individual pages.

### File location

```
public/llms-full.txt
```

### File format

Plain text (or markdown) concatenation, in this order:

1. The full content of `public/llms.txt` (the summary above).
2. `--- Homepage ---` followed by the homepage's body text (rendered, with HTML stripped).
3. `--- Primary city page ---` followed by the Layer 1 page body.
4. For each top-tier service page (highest cost or most-cited): `--- [Service name] ---` followed by body text.
5. For each doctor page: `--- [Doctor name] ---` followed by body text.

Total file size target: under 100 KB. If the concatenation exceeds 100 KB, drop the lowest-priority blog post bodies first, then less-prominent service pages, until under target.

### Regeneration triggers

Same as `llms.txt`. Regenerated as a final step in Mode A after all pages are written.

---

## 3. robots.txt

The skill checks `public/robots.txt` and updates it if it currently blocks AI crawlers. The skill does not delete or rewrite existing rules; it only appends Allow rules for AI bots if they are missing or being blocked.

### AI bots to allow

| User-agent | Operator | Why |
|---|---|---|
| `GPTBot` | OpenAI | Powers ChatGPT web browsing and citation |
| `ChatGPT-User` | OpenAI | ChatGPT's user-action crawler |
| `OAI-SearchBot` | OpenAI | OpenAI search crawler |
| `ClaudeBot` | Anthropic | Powers Claude web search |
| `Claude-User` | Anthropic | Claude user-action crawler |
| `Claude-SearchBot` | Anthropic | Claude search index |
| `PerplexityBot` | Perplexity | Powers Perplexity citation |
| `Perplexity-User` | Perplexity | Perplexity user-action crawler |
| `Google-Extended` | Google | Bard/Gemini training opt-in |
| `CCBot` | Common Crawl | Feeds many AI training datasets |
| `anthropic-ai` | Anthropic | Legacy Anthropic crawler identifier |

### Modification rule

If `public/robots.txt` exists and contains any `Disallow: /` for any of these user-agents, the skill flags but does not auto-fix — it logs:

```
[ROBOTS WARNING] public/robots.txt blocks GPTBot.
                 This prevents ChatGPT from citing your content.
                 Recommended: remove the User-agent: GPTBot block,
                              or add an explicit Allow: / under it.
                 Skill did not modify robots.txt.
```

If `public/robots.txt` does not exist, the skill creates it with these contents:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: {{practice.website_url}}/sitemap.xml
```

If `public/robots.txt` exists and AI bot user-agents are not mentioned at all, the skill appends the Allow blocks above without touching existing content.

The skill never disallows anything in robots.txt. That is the user's call.

---

## 4. Image standards

These rules apply to images referenced by optimized pages. The skill does not modify image files (it does not own image processing) but it does enforce these standards on `<Image>` and `<img>` tags it generates and reports violations on existing tags.

### Format

WebP preferred. JPG and PNG acceptable but flagged in the report as a Core Web Vitals optimization opportunity.

### Dimensions

- Hero images: max 1200px wide.
- Content images: max 800px wide.
- Doctor headshots: max 600px wide.

The skill does not resize images. If an image's dimensions are unknown (no width/height in the brief and no easy way to measure), the skill skips this check.

### File naming

`{city}-{descriptor}-{context}.webp` is the recommended pattern. Examples:

- `calgary-dental-team-bright-smiles.webp`
- `austin-dr-michael-patel-headshot.webp`
- `inglewood-clinic-exterior.webp`

The skill does not rename existing files. It uses whatever filename is in the brief but flags non-descriptive filenames (`image1.jpg`, `IMG_0234.png`) in the run report.

### Alt text

The skill generates alt text for every image it places using this pattern:

```
{{practice.branded_name}} — {{descriptor}} in {{nap.city}}
```

Examples:

- `Bright Smiles Dental — clinic team in Calgary`
- `Austin Family Dental — Dr. Michael Patel headshot in Austin`
- `Bright Smiles Dental — dental implant procedure in Calgary`

Generic alt text the skill never produces:

- `image1`
- `dental photo`
- `our team`
- empty `alt=""`

### Before/after labels

For any image flagged as a before/after case in the brief, the skill adds:

```jsx
<figcaption>Individual results may vary.</figcaption>
```

This is a US/CA dental advertising compliance requirement. Without it, the page risks regulatory violation and AI quality deprioritization for unsubstantiated outcome claims.

---

## 5. Core Web Vitals reference

The skill does not optimize Core Web Vitals directly (that's a build/deployment concern). But it reports the targets and flags page-level patterns that hurt them:

| Metric | 2026 target | What hurts it on dental pages |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s (target < 1.2s for Map Pack) | Hero images over 200KB, render-blocking JS, no `<Image>` priority hint |
| INP (Interaction to Next Paint) | < 200ms | Heavy booking widget JavaScript, third-party chat widgets |
| CLS (Cumulative Layout Shift) | < 0.1 | Web fonts without `font-display: swap`, ad-injected content above the fold, images without explicit dimensions |

The skill flags these patterns when it sees them in optimized pages (e.g., a hero image without `priority` or `loading="eager"` on a homepage). It does not refactor for performance.

---

## 6. The 60-day touch rule

Every 60 days, the user should re-run the skill in Mode A to refresh content. This is the freshness signal that competitors with static sites cannot match.

The skill helps by:

1. Adding a `Last medically reviewed: {{month}} {{year}}` line at the bottom of every optimized page on every run, set to the current month.
2. Generating a "What changed in [year]" section on cornerstone pages (homepage, top 3 service pages, primary city page) when the optimization changes substantive content.
3. Recording the optimization timestamp in `.pracpros/last-run.md` so the user can see when each page was last touched.

The skill does not enforce the 60-day cadence. It just makes the freshness signals correct each time it runs.

---

## 7. Sitemap

The skill does not generate `sitemap.xml`. Next.js handles sitemap generation through:

- App Router: `app/sitemap.ts` / `app/sitemap.xml/route.ts`.
- Pages Router: `next-sitemap` package or custom build script.

The skill flags missing sitemap configuration in the run report:

```
[SITEMAP] No sitemap.xml route or generator detected.
          Recommended: create app/sitemap.ts (App Router) following Next.js docs.
          Skill did not create one because sitemap generation is application-specific.
```

If a sitemap exists, the skill verifies that every optimized page is included by checking the route paths. Missing routes get flagged.

---

## 8. Low-value page pruning (advisory only)

The skill identifies pages it considers thin or low-value and lists them in the run report. The skill does not delete or noindex pages. The developer decides.

Flag conditions:

- Body content under 200 words after optimization (would have failed quality gates anyway).
- Page is functionally a duplicate of another optimized page (same primary intent, similar word count).
- Page has zero inbound internal links from any other optimized page (orphan).
- URL contains hyphens, dates, or query strings that suggest it's a leftover from an old CMS migration (`/page-2`, `/?page_id=42`, `/2019/02/old-post`).

```
[PRUNE CANDIDATE] app/blog/2019/02/old-cleaning-tips/page.tsx
                  Body: 180 words after optimization (under threshold).
                  No inbound links from any optimized page.
                  Recommendation: noindex via metadata, or delete and 301 redirect
                                  to /blog/teeth-cleaning-tips.
```

---

## What this file does not cover

- HTTPS configuration (deployment-level).
- 301 redirects for old URLs (Next.js config or hosting platform).
- CDN setup, image CDN, or build performance tuning.
- Privacy policy, terms of service, or cookie banners.
- Newsletter, lead magnet, or popup behavior.
- Analytics installation (GA4, Microsoft Clarity, etc.).

These are out of scope for this skill in v1.0.0. The skill flags some of them in the run report (HTTPS, analytics presence) but does not implement them.
