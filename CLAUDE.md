# Seraya Living — Project Context for Claude Code

## What this is
A standalone Next.js landing page for **Seraya Living**, a luxury mid-term rental brand in Dubai (sub-brand of Seraya). The site is inquiry-only — no booking engine. Primary conversion is through a 3-step modal that ends with a WhatsApp CTA. Lives at `living.serayastays.com`.

**Target audience:** Corporate relocators, digital nomads, professionals seeking 1–12 month furnished apartment stays in Dubai.

**GitHub:** https://github.com/pepijn-ai/Seraya-Living
**Project root:** `/Users/pepijnhaima/Seraya-Living/`

---

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS v4 — tokens defined in `@theme` in `globals.css`, NOT in `tailwind.config.ts`
- `lucide-react` for icons (always `strokeWidth={1.5}`)
- `embla-carousel-react` for apartment image carousels
- `nodemailer` for email fallback
- `next/font/google` for fonts
- `next/image` for all images

---

## Brand & Design System

### Colors (defined in `src/app/globals.css` via `@theme`)
- `brand-bg`: #FCFAF6 — warm white, primary background
- `brand-bg-alt`: #F7F1E8 — warm cream, alternate sections
- `brand-heading`: #5E301F — deep brown, headings and icons
- `brand-body`: #2D170F — near-black brown, body text and CTAs
- `brand-cta`: #2D170F — primary button fill
- `brand-accent`: #C77557 — terracotta, borders and highlights

### Fonts
- **Serif** (`font-serif`) = Cormorant Garamond — ALL headings and display text
- **Sans** (`font-sans`) = DM Sans — body, labels, buttons, UI

### Layout
- Max content width: `max-w-[1400px] mx-auto`
- Horizontal padding: `px-3 md:px-6`
- Section vertical padding: `py-20 md:py-28`

### Aesthetic rules
- **No rounded corners anywhere** — all inputs, buttons, modals, cards are sharp (`rounded-none`)
- No drop shadows on cards (only modal overlays)
- No black (#000) — use `brand-body` (#2D170F)
- No animation libraries — CSS transitions only
- No native `<select>` or `<input type="date">` — use CustomSelect and CustomDatePicker
- Alternate sections between `brand-bg` and `brand-bg-alt`
- Icons: lucide-react, strokeWidth 1.5, never filled
- Input border: `1px solid rgba(199, 117, 87, 0.5)`
- Dropdown/modal shadow: `0 8px 32px rgba(45, 23, 15, 0.12)`

### Typography scale
| Use | Classes |
|-----|---------|
| Section heading | `font-serif text-3xl md:text-4xl font-medium text-brand-heading` |
| Card heading | `font-serif text-xl font-medium text-brand-heading` |
| Eyebrow label | `font-sans text-[10px] uppercase tracking-widest text-brand-accent` |
| Body text | `font-sans text-sm text-brand-body/70 leading-relaxed` |
| Button | `font-sans font-medium text-sm` |

### Buttons
```jsx
// Primary CTA
<button className="inline-flex items-center gap-2 bg-brand-cta text-white font-sans font-medium text-sm px-8 py-4 hover:bg-[#3D2710] transition-colors duration-200">
  Label <span aria-hidden="true">→</span>
</button>
```

---

## Page Structure (exact order from page.tsx)
1. **Navbar** — transparent at top, solid on scroll
2. **Hero** — full-screen Cloudinary image (`seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-51`), headline "Flexible luxury living in Dubai", 4 proof points, InquiryBar at bottom
3. **WhatIsSeraya** — "The world of Seraya Living", 3-col USP grid with 4:5 portrait images
4. **SocialProof** — Condé Nast quote over dunes image (`public/images/press/dunes.png`) + logo strip (Airbnb, Forbes, Condé Nast, CNT)
5. **HowItWorks** — 4-col horizontal steps with vertical dividers between columns
6. **IncludedServices** — icon grid
7. **FeaturedResidences** — 3 cards top row (aspect-[4/3]) + 2 larger bottom row (aspect-[4/3]), 5 apartments total
8. **SerayaStudio** — dark section (#2D170F bg), asymmetric grid (3fr left + 2fr right with 2 stacked), placeholder images, swap for real furniture photos
9. **Locations** — Dubai districts with images
10. **InquiryCTA** — centered CTA section, `id="inquiry-form"` (required for sticky bar IntersectionObserver)
11. **FAQ** — accordion, one open at a time
12. **Footer**
13. **WhatsAppButton** — fixed bottom right, z-60
14. **InquiryBarStickyController** — fixed bottom bar, shows when BOTH #hero and #inquiry-form are out of viewport
15. **InquiryModal** — 3-step modal, primary conversion flow

---

## Conversion Flow
- **Primary CTA everywhere** → opens `InquiryModal`
- **InquiryModal** — 3 steps:
  - Step 1: Move-in date + length of stay (by months / by end date / flexible)
  - Step 2: Bedrooms (chips), area (chips), budget (number + currency dropdown), guests
  - Step 3: Name, email, call number (optional), WhatsApp → "Send on WhatsApp" (primary) or "submit by email"
- WhatsApp number: `13322841002`
- Email fallback: POST to `/api/inquiry` → nodemailer to `hello@serayastays.com`

---

## Key Components

### CustomDatePicker
- Supports `inline` prop — renders calendar in-place (no dropdown). Use inside modals to avoid overflow clipping.
- Past dates disabled, Monday-start grid, Today shortcut

### CustomSelect
- Supports `className` prop for width control
- Use `<div className="w-24 flex-none"><CustomSelect .../></div>` to constrain width

### ImageCarousel
- Supports `aspectClass` prop (e.g. `"aspect-[4/3]"`, `"aspect-square"`)
- Default: `"aspect-[4/3]"`

### ApartmentCard
- Supports `aspectClass` prop, passed through to ImageCarousel

### InquiryBarStickyController
- Uses IntersectionObserver on `#hero` and `#inquiry-form`
- Shows sticky bottom bar only when BOTH are out of viewport

### FadeIn
- IntersectionObserver fade-in, `delay` prop in ms

---

## Cloudinary
- Cloud name: `dce1arrhg`
- Helper: `src/lib/cloudinary.ts` → `getCloudinaryUrl(publicId, options?)`
- Encodes spaces → `%20`, `(` → `%28`, `)` → `%29`
- Always uses `f_auto,q_auto`
- Remote pattern configured in `next.config.ts`

### Current apartment images
- **Seraya 32** (Marina, 3BR): `seraya/units/unit-36/listing/web/Vida Marina-2401(Web)-24` etc.
- **Seraya 49** (Downtown, 4BR): `seraya/units/unit-49/listing/web/DTV1-2106(Web)-3` etc.
- **Seraya 37** (Downtown, 1BR): `seraya/units/unit-37/listing/web/DTV1-1909(Web)-25` etc.
- **Seraya 29** (Business Bay, 3BR): `Urban_Oasis-2003_Web_-35_ushaad` etc. (root level, no folder)
- **Seraya 47** (Downtown, 2BR): `seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-51` etc.

### Press/social proof assets
Local files in `public/images/press/`:
- `dunes.png` — background image for quote section
- `airbnb.png`, `forbes.png`, `conde-nast.png`, `conde-nast-traveler.png` — logos

---

## Pending / In Progress
- USP section (WhatIsSeraya) images — replacing with AI-generated editorial images. Direction:
  - "Stay on your terms": woman from behind at floor-to-ceiling window, Dubai skyline, golden hour ✓ (approved image, needs uploading to Cloudinary)
  - "Arrive and live": styled detail shot — bed, kitchen counter, or dining table
  - "Entirely looked after": curated apartment detail, serene, dusk light

---

## Tone of Voice
Aman/Janu style — understated, confident, no marketing fluff:
- Never use "No..." (negative framing) — always positive
- Short, evocative phrases
- Possessive "your" to make it personal
- Avoid: "pricing", "package", "inclusive", "digital"

---

## Co-founder context
Ibrahim is building the onboarding flow separately. He has a full design system brief to ensure consistency — it was shared with him separately and covers all tokens, components, and rules above.
