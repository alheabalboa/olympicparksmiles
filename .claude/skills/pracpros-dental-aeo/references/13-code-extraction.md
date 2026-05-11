# Code Extraction

This file specifies how the skill discovers services, doctors, and hours from a Next.js codebase, what it tries to extract, what falls back to a gap-fill stub, and the exact format of `CLIENT_BRIEF_FILL.md`.

The skill consumes this reference in Step 3 (discovery) and Step 4 (gap fill) of the SKILL.md workflow.

---

## 1. The three-source data model

The skill builds a single merged data set from three sources, in priority order:

1. **The codebase** — services, doctors, hours.
2. **CLIENT_BRIEF.md** — practice identity, NAP, coverage, insurance, financing, differentiators, proof, trust.
3. **CLIENT_BRIEF_FILL.md** — agency-filled stub for anything code couldn't extract cleanly.

When values conflict between code and fill stub, **fill stub wins** (the agency had a chance to verify and correct). When values conflict between code and brief, **code wins** for entities the brief doesn't carry (services, doctors, hours).

---

## 2. Service discovery

### Where to look

Walk the routing directory:

- App Router: `app/<slug>/page.{tsx,jsx,ts,js,mdx}` and `app/services/<slug>/page.*` and `app/treatments/<slug>/page.*`.
- Pages Router: `pages/<slug>.*`, `pages/services/<slug>.*`, `pages/treatments/<slug>.*`.

### How to filter (service vs non-service routes)

A route directory is a service route if **any** of these match:

- Path includes `/services/` or `/treatments/`.
- Slug matches a known dental procedure pattern (case-insensitive):
  - `dental-implants`, `implants`, `all-on-4`, `all-on-six`, `tooth-implant`
  - `invisalign`, `clear-aligners`, `braces`, `orthodontics`
  - `teeth-whitening`, `whitening`, `zoom-whitening`
  - `veneers`, `porcelain-veneers`, `composite-veneers`
  - `root-canal`, `endodontics`
  - `crowns`, `bridges`, `dentures`, `partial-dentures`
  - `cleanings`, `dental-cleaning`, `prophylaxis`, `periodontal`, `gum-disease`
  - `extractions`, `tooth-extraction`, `wisdom-teeth`
  - `tmj`, `tmj-treatment`, `jaw-pain`
  - `sleep-apnea`, `sleep-dentistry`, `sedation`, `sedation-dentistry`
  - `pediatric-dentistry`, `kids-dentistry`, `family-dentistry`
  - `cosmetic-dentistry`, `smile-makeover`
  - `emergency-dentistry`, `emergency-dental`, `same-day`
  - `bonding`, `dental-bonding`, `fillings`, `composite-fillings`

A route is **not** a service route if its slug is in this exclusion list:

- `about`, `contact`, `team`, `our-team`, `staff`, `doctors`
- `blog`, `articles`, `posts`, `news`
- `privacy`, `terms`, `legal`, `accessibility`, `sitemap`
- `careers`, `jobs`
- `book`, `booking`, `appointment`, `schedule`
- `reviews`, `testimonials`, `gallery`, `before-after`, `photos`
- `financing`, `insurance`, `payment` (these are info pages, not services)
- `locations`, `dentist-in-*`, `*-dental`, neighborhood/city pages
- Any slug starting with `dr-` (doctor pages)
- Any dynamic segment (`[slug]`, `[id]`)

### What to extract per service

For each service route, the skill extracts:

| Field | Source | Extraction method |
|---|---|---|
| `slug` | Path | Directory name |
| `name` | Page H1, fallback to metadata.title, fallback to titlecased slug | Parse JSX for first `<h1>` element; if absent, parse `metadata` export's `title`; if absent, titlecase slug |
| `cost_range_low` / `cost_range_high` | Body text | Regex patterns below |
| `technology_used` | Body text | Match against known equipment names list |
| `procedures_completed` | Body text | Regex for "X procedures" / "over X implants" / "X+ cases" |
| `performed_by_doctors` | Body text + existing JSON-LD | Match doctor names against discovered doctors list |

### Cost extraction patterns

The skill searches the page body for currency patterns. Examples that match:

```
$3,500 to $5,500
$3500-$5500
Starting at $3,500
$3,500–$5,500
between $3,500 and $5,500
ranges from $3,500 to $5,500
```

The skill extracts the lowest matched dollar amount as `cost_range_low` and the highest as `cost_range_high`. If only one number is found, both fields equal that number and the gap fill stub flags it for confirmation.

If no currency pattern is found, both fields go to the gap fill stub.

### Technology extraction patterns

The skill checks the body text for known dental equipment and software names (case-insensitive substring match):

```
CBCT, CBCT 3D imaging, cone beam, 3D imaging
iTero, iTero scanner, iTero digital scanner
CEREC, same-day crowns
DEXIS, intraoral camera
Trios scanner, 3Shape
Digital X-ray, digital radiography
Soft tissue laser, Biolase, Waterlase
Wand anesthesia, computerized anesthesia
Sirona, Planmeca
Computer-guided surgery, guided implant surgery
Microscope dentistry, surgical microscope
```

Every match becomes an entry in `technology_used`. Empty list goes to the gap fill stub for the agency to add.

### Procedures completed extraction

Regex on patterns like:

```
over 2,400 implants placed
1,800+ procedures completed
more than 1,800 cases
2,400 dental implants since 2015
```

The numeric value gets recorded. Skipped if no pattern matches.

### Performing-doctor extraction

For each service page, the skill searches the page body for the names of doctors discovered in Step 3b. Every name found becomes an entry in `performed_by_doctors`. If no doctor names appear on the page, the gap fill stub asks the agency.

---

## 3. Doctor discovery

### Where to look

Scan for doctor pages in this order:

1. `app/team/<slug>/page.*` and `app/our-team/<slug>/page.*`.
2. `app/dr-<name>/page.*` (slug starts with `dr-`).
3. `app/about/page.*` and `app/about-us/page.*` (extract any doctor blocks if present).
4. `pages/team/<slug>.*`, `pages/dr-<name>.*`, `pages/about.*`.

### How to recognize a doctor page

A page is a doctor page if **any** match:

- Path matches the patterns above.
- Page H1 starts with `Dr.`, `Doctor `, or contains a credential pattern (`, DDS`, `, DMD`, `, DDS, MAGD`, etc.).
- Page contains a `Person` schema with `@type: Person` and `jobTitle` containing "dentist", "orthodontist", or another dental specialty.

### What to extract per doctor

| Field | Source | Extraction method |
|---|---|---|
| `slug` | Path | Directory name |
| `full_name` | Page H1 | Parse `<h1>` content; strip credentials after first comma |
| `credentials` | Page H1 | Substring after first comma in H1 |
| `specialty` | Page H1 modifier or body | Regex match against specialty list |
| `dental_school` | Body text | Regex on "graduated from", "DDS from", "received her degree at", "earned his/her degree at" |
| `years_in_practice` | Body text | Regex on "X years of experience", "practicing since YYYY", "over X years" |
| `photo_url` | First `<Image>` or `<img>` on page | Parse `src` attribute |
| `languages` | Body text "languages spoken" or similar section | Match against language list |
| `associations` | Body text "Member of", "Affiliated with", "Fellow of" | Capture organization names |
| `board_certifications` | Body text "Board certified in", "Diplomate of" | Capture credential names |
| `services_performed` | Inferred from service pages mentioning this doctor | Cross-reference Step 3a output |
| `profile_urls` | Anchor tags on doctor page | Parse `<a href>` for LinkedIn, Healthgrades, RateMDs, ADA directory, etc. |

### Specialty list

Match doctor page text against:

```
general (dentist | dentistry)
orthodontics, orthodontist
pediatric (dentist | dentistry)
cosmetic (dentist | dentistry)
implant (ologist | dentist | dentistry)
periodontist, periodontics, periodontal
endodontist, endodontics
prosthodontist, prosthodontics
oral surgeon, oral surgery, OMFS, maxillofacial
TMJ specialist
sleep dentist, sleep dentistry
```

If multiple match, the H1 modifier wins. If none match and the H1 doesn't include a specialty, it goes to the gap fill stub.

### Education extraction

Regex examples (case-insensitive):

```
graduated from <X>
received her DDS from <X>
earned his degree at <X>
DDS, <X>
DMD, <X>
trained at <X>
attended <X> School of Dentistry
<X> Faculty of Dentistry
```

Capture the institution name. Goes to gap fill stub if no match.

---

## 4. Hours discovery

### Where to look (in order)

1. **Existing JSON-LD** anywhere in the project (in any `<script type="application/ld+json">` block) with `openingHoursSpecification`. Parse the structured data directly.

2. **`components/Footer.*`, `components/Hours.*`, `components/OpeningHours.*`** — common locations for a dedicated hours component. Look for explicit time blocks.

3. **`app/contact/page.*`, `pages/contact.*`** — contact pages typically list hours.

4. **Homepage hero or sticky bar** — `app/page.*` or `pages/index.*`.

### How to parse free-text hours

If the skill finds free-form text (not JSON-LD), match patterns:

```
Mon-Fri 8am-7pm, Sat 9am-3pm
Monday – Friday: 8:00 AM – 7:00 PM
Mon: 8-7, Tue: 8-7, Wed: 8-7, Thu: 8-10, Fri: 8-5, Sat: 9-2, Sun: closed
```

Normalize all matches to per-day `HH:MM-HH:MM` (24-hour) format. "Closed" days become the literal string `"closed"`.

If hours are partial (some days found, others not), partial values go into the merged data set; the gap fill stub asks for missing days only.

### Emergency availability

Search for free-form text containing any of:

```
emergency, emergency dental, same-day, after hours, 24/7, weekend emergencies
```

Capture the surrounding sentence as `hours.emergency_availability`. Goes to gap fill stub if not found and no other emergency text exists.

---

## 5. The CLIENT_BRIEF_FILL.md format

When code extraction is incomplete, the skill writes `CLIENT_BRIEF_FILL.md` at the project root. The file is structured as YAML inside markdown sections, organized by entity. Every gap shows the value the skill *did* find from code (so the agency can verify) plus a `fill:` slot for the missing data.

### Structure

```markdown
# CLIENT_BRIEF_FILL.md — Code Extraction Gaps

> The skill discovered the following from your codebase. Fill in the blanks below, then re-run the skill. Values you provide here override what was extracted from code.

## Hours

```yaml
hours:
  monday: "08:00-19:00"       # found in components/Footer.tsx
  tuesday: "08:00-19:00"      # found in components/Footer.tsx
  wednesday: ""               # NOT FOUND — please fill (e.g., "08:00-19:00" or "closed")
  thursday: "08:00-22:00"     # found in components/Footer.tsx
  friday: ""                  # NOT FOUND — please fill
  saturday: "09:00-15:00"     # found in components/Footer.tsx
  sunday: "closed"            # found in components/Footer.tsx
  emergency_availability: ""  # NOT FOUND — optional; describe emergency hours/policy
```

## Services

### dental-implants (app/dental-implants/page.tsx)

```yaml
service:
  slug: "dental-implants"
  name: "Dental Implants"             # extracted from H1
  cost_range_low: 0                   # NOT FOUND — please fill (number, no $)
  cost_range_high: 0                  # NOT FOUND — please fill
  technology_used: []                 # NOT FOUND — list equipment used
  procedures_completed: 0             # extracted: 2400
  performed_by_doctors: []            # NOT FOUND — list doctor names that perform this service
```

### invisalign (app/invisalign/page.tsx)

```yaml
service:
  slug: "invisalign"
  name: "Invisalign"                  # extracted from H1
  cost_range_low: 4500                # extracted from body
  cost_range_high: 7500               # extracted from body
  technology_used: ["iTero scanner"]  # extracted
  procedures_completed: 0             # NOT FOUND — optional
  performed_by_doctors: ["Dr. Jennifer Kim"]  # extracted
```

## Doctors

### dr-michael-patel (app/team/dr-michael-patel/page.tsx)

```yaml
doctor:
  slug: "dr-michael-patel"
  full_name: "Dr. Michael Patel"      # extracted from H1
  credentials: "DDS, MAGD"            # extracted
  specialty: "general"                # extracted
  dental_school: ""                   # NOT FOUND — please fill
  years_in_practice: 0                # NOT FOUND — please fill (integer)
  languages: ["English"]              # extracted
  associations: []                    # NOT FOUND — list professional memberships
  board_certifications: []            # NOT FOUND — optional; list board certs
  photo_url: "/team/dr-michael-patel.webp"  # extracted
  profile_urls:                       # extracted from page anchors
    - "https://linkedin.com/in/michael-patel-dds"
```

---

## How to use this file

1. Replace every value marked `NOT FOUND` with the correct data (or leave blank for optional fields).
2. Verify any values the skill *did* extract are accurate. Correct them if wrong.
3. Save the file.
4. Re-run the skill: `pracpros-dental-aeo` will re-scan code, merge with your fills, and proceed with optimization.
5. Once optimization completes successfully, the skill deletes `CLIENT_BRIEF_FILL.md` automatically.
```

### What goes in the fill stub vs not

The fill stub asks for values that are **required** for full schema generation and content quality. Optional fields (board certifications, technology used, procedures completed) are listed but not blocking — empty values are fine, the page is still optimized without them.

Required fields (block optimization if blank after fill):
- For services: `cost_range_low`, `cost_range_high`, `performed_by_doctors`
- For doctors: `dental_school`, `years_in_practice`, `associations`
- For hours: every day mon-sun

Optional fields (warning only):
- For services: `technology_used`, `procedures_completed`
- For doctors: `board_certifications`, `profile_urls` beyond what code already gave
- For hours: `emergency_availability`

---

## 6. Conflict resolution

When the same field appears in multiple sources:

| Conflict | Resolution |
|---|---|
| Code says X, fill stub says Y | **Fill stub wins.** Agency had final say. |
| Code says X, CLIENT_BRIEF.md says Y | **Code wins** for service/doctor/hours data (brief doesn't carry these). For practice/NAP/coverage data, **brief wins** (code doesn't carry these reliably). |
| Multiple service pages reference different cost ranges for the same service slug | Take the canonical service page (`/services/<slug>` over `/<slug>` if both exist). Flag in run report. |
| Multiple doctor pages list the same doctor with different credentials | Take the version under `/team/<slug>` over alternates. Flag. |
| JSON-LD hours conflict with footer text hours | **JSON-LD wins** — it's already structured and was likely set deliberately. Flag in run report. |

---

## 7. Re-run behavior

When the agency re-runs the skill after filling the stub:

1. Skill re-scans codebase fresh (the agency may have edited pages between runs).
2. Skill reads `CLIENT_BRIEF_FILL.md`.
3. Skill merges: code values for fields fill stub left blank, fill stub values for everything else.
4. If any required gaps remain after merge, the skill rewrites the fill stub with only the still-missing fields and pauses again.
5. If all required gaps are filled, optimization proceeds. After successful completion, the skill deletes `CLIENT_BRIEF_FILL.md`.

The fill stub never persists across successful runs. It's a transient gap-fill mechanism, not a configuration file.

---

## 8. What the skill does NOT extract from code

These remain in CLIENT_BRIEF.md and are never code-discovered:

- Practice legal name (often differs from branded name shown on site)
- Practice year established
- NAP details (the brief is the canonical source; site footer often has typos)
- Insurance plans accepted
- Financing partners
- Differentiators (these are positioning decisions, not facts)
- Proof point counts (Google review count, patients served)
- Trust signal URLs at the practice level (Google Business Profile, Yelp, etc.)

These are deliberately kept in the brief so they're agency-controlled, version-controlled, and not subject to extraction errors.
