# Client Brief — Dental Practice

> The skill discovers **services, doctors, and hours from your codebase first.** This brief covers only what code can't carry: practice identity, address, insurance, financing, differentiators, proof points, and trust URLs.
>
> If code extraction can't fill a service's cost range, a doctor's credentials, or a day's hours, the skill writes a `CLIENT_BRIEF_FILL.md` stub at your project root listing each gap. Fill it once, re-run the skill, and optimization proceeds.
>
> **Locale is auto-detected from the address.** US states resolve to US locale (USD, US insurance pool, state dental board). Canadian provinces resolve to CA locale (CAD, CA insurance pool, provincial dental college). Anywhere else causes a hard stop.

---

## 1. Practice Identity

```yaml
practice:
  legal_name: ""              # required — exact legal name (e.g., "Bright Smiles Dental LLC")
  branded_name: ""            # required — name used on the site (e.g., "Bright Smiles Dental")
  website_url: ""             # required — full URL with https:// and no trailing slash
  year_established: 0         # required — integer (e.g., 2010); drives "since 20XX" trust hooks
```

---

## 2. NAP (Name, Address, Phone)

```yaml
nap:
  street: ""                  # required (e.g., "123 Main Street")
  suite: ""                   # optional (e.g., "Suite 200")
  city: ""                    # required (e.g., "Austin" or "Calgary")
  state_or_province: ""       # required — 2-letter code (US: TX, CA, NY, etc. — CA: AB, BC, ON, QC, etc.)
  postal_code: ""             # required (US: 5-digit ZIP — CA: A1A 1A1)
  primary_phone: ""           # required — E.164 format (e.g., "+1-512-555-0100")
  email: ""                   # required
```

---

## 3. Location Coverage

```yaml
coverage:
  primary_city: ""            # required — main city served (must match nap.city)
  neighborhoods:              # required — at least 1; list neighborhoods/areas served
    - ""
    - ""
```

---

## 4. Insurance and Financing

> Insurance plans are validated against the locale's pool. US briefs listing CA insurers (and vice versa) generate a warning in the run report.

```yaml
insurance:
  in_network:                 # required — at least 1
    # US examples: "Delta Dental", "Cigna", "Aetna", "MetLife", "Guardian", "Blue Cross Blue Shield", "Humana", "United Healthcare"
    # CA examples: "Manulife", "Sun Life", "Canada Life", "Green Shield Canada", "Pacific Blue Cross", "Desjardins", "Empire Life"
    - ""

financing:
  partners:                   # required — at least 1
    # US examples: "CareCredit", "Sunbit", "LendingClub", "Cherry"
    # CA examples: "Dentalcard", "PayBright", "iFinance"
    - ""
  in_house_membership: false  # required — true if practice runs its own membership plan
```

---

## 5. Differentiators

> Required, minimum 3. These are the "Why" in every Micro-Answer. Be specific. Avoid soft language.

```yaml
differentiators:
  - ""                        # e.g., "Open until 11pm Monday through Thursday"
  - ""                        # e.g., "Same-day dental implants for qualifying patients"
  - ""                        # e.g., "Punjabi, Hindi, and English spoken"
```

---

## 6. Proof Points

> Used across the site for trust hooks and Micro-Answers. Every number here can be cited by AI systems if it appears on a page with proper attribution.

```yaml
proof:
  patients_served: 0          # optional — lifetime patient count (use a number you can defend)
  google_review_count: 0      # required
  google_average_rating: 0.0  # required — decimal (e.g., 4.9)
  # years_in_business is auto-derived from practice.year_established
```

---

## 7. Trust Signals (sameAs schema array)

> Every URL here gets included in JSON-LD `sameAs` arrays for the practice. Doctor-level URLs are discovered from the codebase or filled via CLIENT_BRIEF_FILL.md per doctor.

```yaml
trust:
  google_business_profile_url: ""  # required
  facebook_url: ""                 # optional
  instagram_url: ""                # optional
  yelp_url: ""                     # optional
  other_profile_urls:              # optional — Healthgrades, RateMDs, Zocdoc, Vitals, BBB, etc.
    - ""
```

---

## What's NOT in this brief (and where it comes from)

| Data | Source |
|---|---|
| Services offered, slugs, names | Discovered from `app/<slug>/page.tsx` or `pages/<slug>.tsx` route directories |
| Service cost ranges | Extracted from existing service page text; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |
| Service technology used | Extracted from existing service page text; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |
| Service procedures completed | Extracted from existing service page text; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |
| Doctors, names, credentials | Discovered from team page H1s and existing JSON-LD |
| Doctor specialties, schools, years | Extracted from doctor page text; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |
| Doctor profile URLs (LinkedIn, etc.) | Extracted from existing doctor page links; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |
| Hours mon-sun | Discovered from existing JSON-LD, footer component, or contact page; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |
| Emergency availability | Extracted from contact page text; gap-filled via `CLIENT_BRIEF_FILL.md` if missing |

If your codebase has none of this (e.g., placeholder pages with no real content), the fill stub will be longer. That's expected.

---

## 8. Auto-Derived (do not fill)

The skill computes these from the data above. Do not fill them. Listed here for reference only.

- `_derived.locale`: `US` or `CA`, from `nap.state_or_province`.
- `_derived.currency`: `USD` or `CAD`.
- `_derived.country`: `US` or `CA`.
- `_derived.regulator_name`: e.g., `Texas State Board of Dental Examiners` (US) or `Royal College of Dental Surgeons of Ontario` (CA).
- `_derived.regulator_url`: official regulator website.
- `_derived.years_in_business`: current year minus `practice.year_established`.
- `_derived.locale_insurance_pool`: list of valid insurer names for the locale, used for validation.

---

## Validation rules the skill applies at parse time

The skill stops the run with a clear error message if any of these fail:

1. Any field marked `required` is blank or `PENDING`.
2. `nap.state_or_province` does not resolve to a US state or Canadian province.
3. `practice.year_established` is in the future.

The skill logs warnings (does not stop) for:

- Insurance plan names not in the locale's valid pool.
- Missing optional fields that would strengthen the page (review counts, patients_served, additional profile URLs).

Service-, doctor-, and hours-related validation runs after code extraction in Step 4 of the workflow, not during brief parsing.

---

## How the skill uses this brief

| Field | Used in |
|---|---|
| `practice.branded_name` | H1 patterns, intro paragraphs, FAQs, schema |
| `nap.city + coverage.neighborhoods` | H1 patterns, neighborhood pages, location schema |
| `proof.google_*` | Social proof on homepage, schema AggregateRating |
| `differentiators` | Micro-Answer "Why" component, hero subheadings |
| `insurance.in_network` | Insurance sections on every money page, FAQs |
| `trust.*` | sameAs arrays in Dentist schema |

Service- and doctor-driven content (cost sections, expert quotes, performing-doctor labels, education sections) is built from data discovered in code and merged with values from the fill stub.

---

## Where to put this file

Save this file as `CLIENT_BRIEF.md` in the **root of your Next.js project**, alongside `package.json` and `next.config.js`. The skill reads from `<project_root>/CLIENT_BRIEF.md` on every run.
