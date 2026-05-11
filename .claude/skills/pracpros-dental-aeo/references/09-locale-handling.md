# Locale Handling

This file defines how the skill detects locale from CLIENT_BRIEF.md and how every locale-sensitive value is rendered. The skill supports US and Canada in v1.0.0. Anywhere else causes a hard stop in Step 0 of the workflow.

---

## Locale detection

The skill reads `nap.state_or_province` from CLIENT_BRIEF.md and matches against two lists.

### US states (locale = US)

```
AL, AK, AZ, AR, CA, CO, CT, DE, FL, GA,
HI, ID, IL, IN, IA, KS, KY, LA, ME, MD,
MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ,
NM, NY, NC, ND, OH, OK, OR, PA, RI, SC,
SD, TN, TX, UT, VT, VA, WA, WV, WI, WY,
DC
```

### Canadian provinces and territories (locale = CA)

```
AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT
```

### Anything else

Hard stop with this exact message:

```
[FATAL] CLIENT_BRIEF.md nap.state_or_province = "{value}" does not match
        any US state code or Canadian province/territory code.

        This skill (pracpros-dental-aeo v1.0.0) supports US and Canada only.

        If the practice is in the US or Canada, fix the brief value to use
        the 2-letter postal abbreviation (e.g., "TX" for Texas, "AB" for Alberta).

        If the practice is elsewhere, this skill cannot be used in v1.
```

The skill exits without writing any files.

---

## Auto-derived values

Once locale is detected, the skill computes:

| `_derived` field | US | CA |
|---|---|---|
| `locale` | `"US"` | `"CA"` |
| `country` | `"US"` | `"CA"` |
| `currency` | `"USD"` | `"CAD"` |
| `currency_symbol` | `"$"` | `"$"` (currency code disambiguates) |
| `language_tag` | `"en-US"` | `"en-CA"` |
| `regulator_name` | from US state map below | from CA province map below |
| `regulator_url` | from US state map below | from CA province map below |
| `years_in_business` | current year minus `practice.year_established` | same |
| `locale_insurance_pool` | US insurer list below | CA insurer list below |

---

## Currency rendering

### US

| Input | Rendered |
|---|---|
| `cost_range_low: 3500, cost_range_high: 5500` | `$3,500 to $5,500` |
| `cost_range_low: 175` | `$175` |
| `cost_range_low: 25000` | `$25,000` |

Number formatting: `Intl.NumberFormat("en-US", {style: "currency", currency: "USD", maximumFractionDigits: 0})`.

### CA

| Input | Rendered |
|---|---|
| `cost_range_low: 3500, cost_range_high: 5500` | `$3,500 to $5,500 CAD` |
| `cost_range_low: 175` | `$175 CAD` |

Always include `CAD` suffix on Canadian pages because patient-facing cost copy where the currency is ambiguous (especially on cross-border searches) hurts trust. The `CAD` suffix appears on first mention per page; subsequent mentions in the same section can drop the suffix.

In schema, always use `"priceCurrency": "CAD"` regardless of suffix presence in body copy.

---

## US insurance pool (locale_insurance_pool when US)

Plans valid in US briefs:

```
- Delta Dental
- Cigna
- Aetna
- MetLife
- Guardian Life
- Blue Cross Blue Shield (and state variants: Blue Cross Blue Shield of Texas, of California, etc.)
- United Healthcare
- Humana
- Anthem
- Principal Financial Group
- Ameritas
- Sun Life Financial (US division)
- Mutual of Omaha
- UnitedConcordia
- Liberty Dental
- Kaiser Permanente
- Premera Blue Cross
- HealthPartners
- Spirit Dental
- Renaissance Dental
- DentaQuest
```

A US brief listing any plan not in this list (e.g., "Manulife") gets a warning logged in the run report. The plan is rendered as written (the brief may contain valid regional plans the skill doesn't know about).

---

## CA insurance pool (locale_insurance_pool when CA)

Plans valid in CA briefs:

```
- Manulife
- Sun Life Financial
- Canada Life
- Great-West Life (legacy name for Canada Life)
- Green Shield Canada
- Pacific Blue Cross
- Alberta Blue Cross
- Saskatchewan Blue Cross
- Manitoba Blue Cross
- Medavie Blue Cross
- Ontario Blue Cross
- Desjardins Insurance
- Empire Life
- Industrial Alliance (iA Financial Group)
- SSQ Insurance (now Beneva)
- Beneva
- Equitable Life of Canada
- RBC Insurance
- TD Insurance
- Cooperators
- Johnson Insurance
- ClaimSecure
- Maximum Benefit
```

A CA brief listing a US insurer gets a warning, same handling as above.

---

## Financing partners by locale

These are not validated against a fixed list (the financing market changes faster than insurance). The skill renders whatever the brief lists. Reference for what's typical:

### US

```
- CareCredit (most common)
- Sunbit
- LendingClub Patient Solutions
- Cherry
- Affirm
- Proceed Finance
- HFD (Healthcare Finance Direct)
```

### CA

```
- Dentalcard
- PayBright (now Affirm Canada)
- iFinance Canada
- Medicard
- DentalCard Financing
- Dental Plus
```

---

## Regulator names by US state

Used in `_derived.regulator_name` for trust signals and YMYL attribution.

```yaml
AL: "Board of Dental Examiners of Alabama"
AK: "Alaska Board of Dental Examiners"
AZ: "Arizona State Board of Dental Examiners"
AR: "Arkansas State Board of Dental Examiners"
CA: "Dental Board of California"
CO: "Colorado Dental Board"
CT: "Connecticut State Dental Commission"
DE: "Delaware Board of Dentistry and Dental Hygiene"
FL: "Florida Board of Dentistry"
GA: "Georgia Board of Dentistry"
HI: "Hawaii Board of Dental Examiners"
ID: "Idaho State Board of Dentistry"
IL: "Illinois Department of Financial and Professional Regulation, Board of Dentistry"
IN: "Indiana State Board of Dentistry"
IA: "Iowa Dental Board"
KS: "Kansas Dental Board"
KY: "Kentucky Board of Dentistry"
LA: "Louisiana State Board of Dentistry"
ME: "Maine Board of Dental Practice"
MD: "Maryland State Board of Dental Examiners"
MA: "Massachusetts Board of Registration in Dentistry"
MI: "Michigan Board of Dentistry"
MN: "Minnesota Board of Dentistry"
MS: "Mississippi State Board of Dental Examiners"
MO: "Missouri Dental Board"
MT: "Montana Board of Dentistry"
NE: "Nebraska Board of Dentistry"
NV: "Nevada State Board of Dental Examiners"
NH: "New Hampshire Board of Dental Examiners"
NJ: "New Jersey State Board of Dentistry"
NM: "New Mexico Board of Dental Health Care"
NY: "New York State Board for Dentistry"
NC: "North Carolina State Board of Dental Examiners"
ND: "North Dakota State Board of Dental Examiners"
OH: "Ohio State Dental Board"
OK: "Oklahoma Board of Dentistry"
OR: "Oregon Board of Dentistry"
PA: "Pennsylvania State Board of Dentistry"
RI: "Rhode Island Board of Examiners in Dentistry"
SC: "South Carolina Board of Dentistry"
SD: "South Dakota State Board of Dentistry"
TN: "Tennessee Board of Dentistry"
TX: "Texas State Board of Dental Examiners"
UT: "Utah Dentist and Dental Hygienist Licensing Board"
VT: "Vermont Board of Dental Examiners"
VA: "Virginia Board of Dentistry"
WA: "Washington State Department of Health, Dental Quality Assurance Commission"
WV: "West Virginia Board of Dentistry"
WI: "Wisconsin Dentistry Examining Board"
WY: "Wyoming Board of Dental Examiners"
DC: "District of Columbia Board of Dentistry"
```

---

## Regulator names by Canadian province

```yaml
AB: "Alberta Dental Association and College"
BC: "BC College of Oral Health Professionals (Dental)"
MB: "Manitoba Dental Association"
NB: "New Brunswick Dental Society"
NL: "Newfoundland and Labrador Dental Board"
NS: "Provincial Dental Board of Nova Scotia"
NT: "Northwest Territories Dental Profession Registration"
NU: "Nunavut Dental Profession Registration"
ON: "Royal College of Dental Surgeons of Ontario"
PE: "Dental Council of Prince Edward Island"
QC: "Ordre des dentistes du Québec"
SK: "College of Dental Surgeons of Saskatchewan"
YT: "Yukon Dental Profession Registration"
```

---

## Date format by locale

| Context | US | CA |
|---|---|---|
| Body copy | `May 6, 2026` or `5/6/2026` | `May 6, 2026` or `2026-05-06` |
| Schema (always ISO 8601) | `2026-05-06` | `2026-05-06` |
| llms.txt | `2026-05-06` | `2026-05-06` |
| "Last Medically Reviewed" | `Last medically reviewed: May 2026` | `Last medically reviewed: May 2026` |

The skill defaults to long-form month names in body copy (`May 6, 2026`) for both locales because numeric formats (`5/6/2026` vs `6/5/2026`) cause confusion across the border.

---

## Spelling conventions

The skill uses each locale's convention in body copy:

| Concept | US | CA |
|---|---|---|
| color | color | colour |
| center | center | centre |
| program | program | program (no `programme` in dental context) |
| favorite | favorite | favourite |
| analyze | analyze | analyse |
| organization | organization | organization |
| pediatric | pediatric | pediatric (Canadian dental usage matches US) |
| anesthetic | anesthetic | anaesthetic |
| pretreatment | pretreatment | pre-treatment |

The skill uses a small spell-correction pass per locale before writing. Schema fields (`addressLocality`, etc.) are not translated — those are exact values from the brief.

---

## Phone number rendering

### US

`+1-512-555-0142` in brief becomes:
- Schema: `+1-512-555-0142` (E.164)
- Body copy: `(512) 555-0142`
- `tel:` link: `tel:+15125550142`

### CA

`+1-403-555-0188` in brief becomes:
- Schema: `+1-403-555-0188` (E.164)
- Body copy: `(403) 555-0188`
- `tel:` link: `tel:+14035550188`

Same rendering for both locales because Canada uses NANP. The visual format is identical.

---

## Insurance copy rendering

### US example

Brief lists: `["Delta Dental", "Cigna", "Aetna"]`

Body copy renders as:

```
[Practice Name] is in-network with Delta Dental, Cigna, and Aetna. We accept most
PPO plans and direct-bill insurance for verified coverage. Patients without insurance
qualify for our in-house membership plan or financing through CareCredit and Sunbit.
```

### CA example

Brief lists: `["Manulife", "Sun Life Financial", "Pacific Blue Cross"]`

Body copy renders as:

```
[Practice Name] direct-bills Manulife, Sun Life Financial, and Pacific Blue Cross.
We accept most major Canadian dental plans and submit electronic claims on behalf
of patients. Patients without coverage can use our in-house membership plan or
financing through Dentalcard and PayBright.
```

The phrasing differs by locale because:
- US uses "in-network" / "PPO" terminology.
- CA uses "direct billing" / "major plans" terminology.
- Specific financing partners differ by market.

---

## What the skill does NOT do for locale

- Does not translate to French for Quebec briefs. Quebec is supported in v1.0.0 with English content; bilingual support is reserved for v1.1.
- Does not handle metric vs imperial measurements (irrelevant for dental copy).
- Does not adjust to provincial healthcare differences (Canadian dental is mostly private, same as US, so no rendering difference needed).
- Does not provide locale-specific legal disclaimers beyond "Individual results may vary" on before/after content. Compliance copy specific to a state or provincial dental advertising regulation is the user's responsibility.

---

## Quick test for the skill at runtime

After locale detection, before any page is written, the skill should be able to render this sanity-check sentence using locale rules:

```
{{practice.branded_name}} is a {{_derived.locale}}-licensed dental practice in
{{nap.city}}, {{nap.state_or_province}}, registered with the
{{_derived.regulator_name}}. We are open {{hours.monday}} on Mondays and accept
{{insurance.in_network[0]}} insurance.
```

If any template variable is empty or any locale-specific value is missing from the maps above, the skill stops and reports the gap.
