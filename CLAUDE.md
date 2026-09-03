# Seraya Living — Claude Code instructions

## Project context
Standalone Next.js landing page for **Seraya Living** — luxury mid-term rental brand in Dubai, sub-brand of Seraya. **Inquiry-only**, no booking engine; conversions go to WhatsApp or email. Lives at `living.serayastays.com`. GitHub: `pepijn-ai/Seraya-Living`. Audience: corporate relocators, digital nomads, 1–12 month furnished stays.

Also read `AGENTS.md` (repo root): this Next version diverges from training data — check `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Stack
- **Framework:** Next.js 16.2.1 (App Router, TypeScript 5), npm
- **Styling:** Tailwind CSS v4 — tokens in `@theme` in `globals.css`
- **Fonts:** Cormorant Garamond + DM Sans via `next/font/google` (`--font-cormorant` / `--font-dm-sans` → `font-serif` / `font-sans`)
- **Email:** Resend via `/api/inquiry` (`nodemailer` is an unused legacy dep — zero imports)
- **Images/video:** Cloudinary (cloud `dce1arrhg`) + `next/image`; **Hero is video with an image fallback**
- **Carousel:** embla-carousel-react · **Icons:** lucide-react, always `strokeWidth={1.5}` · **Forms:** vanilla React
- **PDF:** `brochure-print.mjs` (puppeteer devDep) renders `localhost:3000/brochure` to A4 PDF — dev server must be running

## Commands
- `npm run dev` → http://localhost:3000 · `npm run build` · `npm run lint`
- Deploy: push to `main` → Vercel auto-deploys; manual `npx vercel --prod`

## Architecture map
```
src/
  app/
    layout.tsx          Fonts, metadata, OG/Twitter, JSON-LD (LodgingBusiness), Search Console tag
    page.tsx            Landing page — renders 18 children (see Page structure)
    api/inquiry/        Single API route — Resend email (all three inquiry sources)
    brochure/           Standalone broker page (~985 LoC, decoupled, real Cloudinary images)
    brochure-clean/     Variant (~968 LoC) — UNTRACKED in git, as is brochure-print.mjs
    robots.ts sitemap.ts  (sitemap hardcodes https://living.serayastays.com)
  components/           InquiryModal, PortfolioInquiryModal, ExitPopupModal, GuestServices,
                        CustomDatePicker, CustomSelect, Hero, Navbar, Footer, sections…
                        (InquiryForm.tsx is DEAD CODE — zero importers)
  data/apartments.ts    5 landing units (Seraya 32, 49, 37, 29, 47) — FeaturedResidences source
  data/brochureUnits.ts 23-unit dataset for the brochure pages (propertyFinderUrl, views,
                        landscape/portrait/story images; mixes Cloudinary IDs + local paths)
  lib/                  cloudinary.ts (getCloudinaryUrl), useExitIntent.ts, formatPrice.ts
```

## Page structure (actual render order in `page.tsx`)
Navbar · Hero · WhatIsSeraya · SocialProof · HowItWorks · **FeaturedResidences** · IncludedServices · **GuestServices** · Locations · **SerayaStudio** · InquiryCTA (`id="inquiry-form"`) · FAQ · Footer · WhatsAppButton · InquiryBarStickyController · InquiryModal · PortfolioInquiryModal · ExitPopupModal

## Key patterns

**Three inquiry entry points, one API route.** All POST `/api/inquiry`; the route's `source` field (`portfolio` / `exit_popup` / default) sets the email subject prefix via `buildSubjectPrefix()`:
- `InquiryModal` (703 LoC) — primary 3-step flow; final step offers WhatsApp deep link (primary) or email submit. `WA_NUMBER` at top.
- `PortfolioInquiryModal` (160 LoC) — name/email/phone only; **FeaturedResidences' CTA opens this one**, not the main modal.
- `ExitPopupModal` (346 LoC) — driven by `src/lib/useExitIntent.ts` (156 LoC): `[data-exit-target]` selector + `markEngaged`/`markSubmitted`/`dismiss` suppression. Easy to break silently — exercise the popup after touching modal open/close logic.

**Inquiry email is self-notification.** From AND to are `hello@serayastays.com` — Pepijn's inbox. There is no customer-facing confirmation email; don't propose changes assuming the customer receives one.

**Hardcoded constants — still duplicated, no shared module.** Update ALL sites when touching:
- WhatsApp `13322841002`: `WhatsAppButton.tsx`, `Navbar.tsx`, `Footer.tsx`, `InquiryModal.tsx`
- `hello@serayastays.com`: `layout.tsx`, `api/inquiry` (×2), `Navbar.tsx` (×2), `Footer.tsx` (×2)
- Cloud `dce1arrhg`: `lib/cloudinary.ts`, `Hero.tsx`, `SerayaStudio.tsx`, `next.config.ts` (remotePatterns)

**Sticky inquiry bar.** IntersectionObserver on `#hero` AND `#inquiry-form`; bar shows only when both are out of viewport. New sections near the top can interfere.

**Custom inputs over native.** Always `CustomDatePicker` (use its `inline` prop inside modals) and `CustomSelect`; never `<input type="date">` or `<select>`.

**Cloudinary.** Always `f_auto,q_auto` via `getCloudinaryUrl()`. Apartment images: `seraya/units/unit-XX/listing/web/<filename>`. Exceptions: Seraya 29 / Urban Oasis images live at root level; `SerayaStudio.tsx` intentionally uses `c_pad,b_rgb:2D170F` (brand-bg square pad) — don't normalize to the helper.

**Hero.** `<video>` with Cloudinary MP4 (`seraya-hero-sharp_qsw01y.mp4`) over a `next/image` poster fallback (`HERO_IMAGE`). Keep both layers.

**Brochure pages are decoupled.** Both read `brochureUnits.ts`, not `apartments.ts`. Treat as separate work items; landing changes don't propagate.

## Design notes
Living uses the main Seraya design system — canonical reference: `~/.claude/references/seraya-design-system.md` (read when working on UI or copy). The `seraya-brand-design` skill applies here too — load it for customer-facing UI work. Key local values: `max-w-[1400px]`, `px-3 md:px-6`, `py-20 md:py-28`, alternate `brand-bg` (#FCFAF6) / `brand-bg-alt` (#F7F1E8), input border `1px solid rgba(199,117,87,0.5)`. Global Seraya rules apply: no rounded corners, no black, no native inputs, CSS transitions only, no card shadows.

## Gotchas
- **No tests, no CI** — verify by loading the page.
- `RESEND_API_KEY` unset → `/api/inquiry` logs to console instead of sending. Production must have it in Vercel env.
- **Phone mismatch:** JSON-LD `telephone` is `+971532841002` (UAE); WhatsApp uses `13322841002` (US prefix). Confirm intent before reconciling.
- **Untracked working-tree state:** `brochure-clean/`, `brochure-print.mjs`, and an `Images ` folder (trailing space) are not in git; commit or clean deliberately.
- `tailwind.config.ts` exists but tokens live in `globals.css` `@theme` — don't add tokens to the config file.

## Environment variables
`RESEND_API_KEY` (inquiry email) · `NEXT_PUBLIC_SITE_URL` (metadataBase, defaults to https://living.serayastays.com — note `sitemap.ts` hardcodes it instead)

## Related systems
Post-inquiry tenant interaction (CRM, onboarding, contracts) lives in Seraya OS / Mission Control (`~/mission-control`) — inquiries from this site land in its Living CRM.
