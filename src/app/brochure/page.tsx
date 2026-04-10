import "./brochure.css";
import Image from "next/image";
import { brochureUnits, type BrochureUnit } from "@/data/brochureUnits";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// ---- Asset IDs ---------------------------------------------------------

const COVER_IMAGE = "Seraya_Living__Gemini_3_Nano_Banana_Pro__2026-03-30_16-48-38_compressed_zwdeli";

// WhatIsSeraya USP images (same as website)
const USP_IMAGES = [
  {
    eyebrow: "Flexible stays",
    title: "Stay on your terms",
    body: "No long-term commitment required. Stay for a month, a season, or longer — with lease terms tailored to your timeline.",
    cloudinaryId: "Seraya_Living__Gemini_3_Nano_Banana_Pro_2026-03-23_21-56-36_50_wxydpr",
  },
  {
    eyebrow: "Fully furnished",
    title: "Arrive and live",
    body: "Every residence is fully furnished and guest-ready from the moment you arrive. Linens, kitchenware, and every detail already in place.",
    cloudinaryId: "Seraya_Living__Gemini_3_Nano_Banana_Pro__2026-03-24_11-20-14_qxthmy",
  },
  {
    eyebrow: "Fully serviced",
    title: "Entirely looked after",
    body: "Utilities, high-speed Wi-Fi, and regular housekeeping woven into a single monthly rate. Your dedicated concierge is on hand whenever you need them.",
    cloudinaryId: "Seraya_Living__Gemini_3_Nano_Banana_Pro__2026-03-24_12-25-09_iupbu0",
  },
];

// Included services (from IncludedServices component)
const SERVICES = [
  {
    category: "Your residence",
    items: ["Seraya Studio furnishings", "Fully equipped kitchen", "Hotel-grade linens", "Utilities & Wi-Fi arrangeable"],
  },
  {
    category: "Your service",
    items: ["On-demand housekeeping", "Dedicated concierge", "24/7 support", "On-call maintenance"],
  },
  {
    category: "Your building",
    items: ["Pool & gym access", "Dedicated parking", "Prime locations across Dubai"],
  },
];

// How it works steps (adapted for broker/relocation context)
const STEPS = [
  { number: "01", title: "Share your requirements", body: "Dates, preferences, and budget." },
  { number: "02", title: "Receive curated options",  body: "We match your preferences to the right residences within our collection." },
  { number: "03", title: "Choose and confirm",       body: "Select your residence and sign digitally." },
  { number: "04", title: "Move in",                  body: "Your residence is ready from the moment you arrive." },
];

// Neighbourhood thumbnails
const NEIGHBOURHOODS = [
  { label: "Downtown Dubai",   cloudinaryId: "9d5739d2a13d92248076143c162aa9c31f1b1fb0_1_jzg1lx" },
  { label: "Business Bay",     cloudinaryId: "Seraya_Living__Gemini_3.1_Flash_Nano_Banana_2__2026-03-24_16-41-16-compressed_mwjqw0" },
  { label: "Dubai Marina",     cloudinaryId: "91010544-compressed_gs4vkj" },
  { label: "Creek Harbour",    cloudinaryId: "4d23ebf46b6de45f467862014c653bef_raftqk" },
];

// Area order + metadata (image + one-line mood)
const AREA_ORDER = ["Downtown", "Business Bay", "Dubai Marina", "Creek Harbour"];

// Actual total residences per area (across full portfolio, not just brochure selection)
const AREA_TOTAL: Record<string, number> = {
  "Downtown":      34,
  "Business Bay":  9,
  "Dubai Marina":  6,
  "Creek Harbour": 1,
};

const AREA_META: Record<string, { cloudinaryId: string; mood: string }> = {
  "Downtown":      { cloudinaryId: "9d5739d2a13d92248076143c162aa9c31f1b1fb0_1_jzg1lx",                                         mood: "At the heart of the city" },
  "Business Bay":  { cloudinaryId: "Seraya_Living__Gemini_3.1_Flash_Nano_Banana_2__2026-03-24_16-41-16-compressed_mwjqw0",      mood: "Waterfront living, steps from the business core" },
  "Dubai Marina":  { cloudinaryId: "91010544-compressed_gs4vkj",                                                                mood: "Life along the water" },
"Creek Harbour": { cloudinaryId: "4d23ebf46b6de45f467862014c653bef_raftqk",                                                   mood: "A new Dubai, taking shape on the water" },
};

// ---- Helpers -----------------------------------------------------------

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function PageFooter() {
  return (
    <div className="page-footer">
      <p className="font-sans" style={{ fontSize: "7pt", color: "rgba(45,23,15,0.35)" }}>
        living.serayastays.com
      </p>
    </div>
  );
}

// ---- Page 1: Cover -----------------------------------------------------
function CoverPage() {
  return (
    <div className="brochure-page">
      <div className="relative w-full h-full">
        <Image
          src={getCloudinaryUrl(COVER_IMAGE, { width: 1240 })}
          fill
          className="object-cover"
          alt="Seraya Living"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(45,23,15,0.05) 0%, rgba(45,23,15,0.05) 40%, rgba(45,23,15,0.72) 100%)",
          }}
        />

        {/* Logo — top center, like navbar */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-[12mm]">
          <Image
            src="/images/seraya-living-logo.png"
            width={160}
            height={44}
            alt="Seraya Living"
            className="brightness-0 invert"
            priority
          />
        </div>

        {/* Headline + subtext + proof points + logos — all anchored to bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-[18mm]"
          style={{ paddingTop: "6mm" }}
        >
          {/* Headline */}
          <h1 className="font-serif font-medium text-white leading-tight text-center mb-[3mm] px-[18mm]" style={{ fontSize: "40pt" }}>
            Residences made for<br />extended living
          </h1>
          <p className="font-sans text-center mb-[7mm]" style={{ fontSize: "13pt", color: "rgba(252,250,246,0.72)" }}>
            Fully serviced, fully furnished, on your terms
          </p>

          {/* Proof points */}
          <div className="flex items-center justify-center mb-[5mm]" style={{ gap: "6mm" }}>
            {["Flexible lease terms", "All-inclusive", "Prime locations", "Concierge support"].map((point, i) => (
              <div key={point} className="flex items-center" style={{ gap: "6mm" }}>
                {i > 0 && (
                  <span className="font-sans" style={{ color: "rgba(252,250,246,0.35)", fontSize: "11pt" }}>·</span>
                )}
                <p className="font-sans uppercase tracking-widest" style={{ fontSize: "8.5pt", color: "rgba(252,250,246,0.75)" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center" style={{ borderTop: "1px solid rgba(252,250,246,0.12)", paddingTop: "5mm" }}>
            <p className="font-sans uppercase tracking-widest mb-[4mm]" style={{ fontSize: "8pt", color: "rgba(252,250,246,0.38)" }}>
              As featured in
            </p>
            <div className="flex items-center justify-center gap-[10mm]">
              {/* Fixed-height containers so all logos appear the same size */}
              <div style={{ height: "32px", width: "140px", position: "relative" }}>
                <Image src="/images/press/conde-nast.png"          fill alt="Condé Nast"          className="brightness-0 invert opacity-65 object-contain" />
              </div>
              <div style={{ height: "32px", width: "140px", position: "relative" }}>
                <Image src="/images/press/conde-nast-traveler.png" fill alt="Condé Nast Traveler" className="brightness-0 invert opacity-65 object-contain" />
              </div>
              <div style={{ height: "32px", width: "140px", position: "relative" }}>
                <Image src="/images/press/forbes.png"              fill alt="Forbes"              className="brightness-0 invert opacity-65 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Page 2: About (single-column) ------------------------------------
function AboutPage() {
  return (
    <div className="brochure-page flex flex-col" style={{ background: "#fcfaf6" }}>
      <div className="flex flex-col flex-1 overflow-hidden" style={{ padding: "14mm 15mm 0" }}>

        {/* Eyebrow + headline */}
        <p className="font-sans uppercase tracking-widest mb-[4mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
          Seraya Living
        </p>
        <h1 className="font-serif font-medium leading-tight mb-[4mm]" style={{ fontSize: "40pt", color: "#5E301F" }}>
          Fully serviced residences,<br />on your terms
        </h1>
        <div className="w-[16mm] h-[2px] mb-[6mm]" style={{ background: "#C77557" }} />

        {/* Body + key points side by side */}
        <div className="grid grid-cols-2 mb-[8mm]" style={{ gap: "12mm" }}>
          <div>
            <p className="font-sans leading-relaxed mb-[4mm]" style={{ fontSize: "12pt", color: "rgba(45,23,15,0.72)" }}>
              A collection of fully serviced residences across Dubai's finest
              neighbourhoods. Each home is furnished by Seraya Studio and looked
              after throughout — so from the moment you arrive, everything is
              already in place.
            </p>
            <p className="font-sans leading-relaxed" style={{ fontSize: "12pt", color: "rgba(45,23,15,0.72)" }}>
              Utilities, high-speed Wi-Fi, and regular housekeeping can be woven
              into a single monthly rate — with a dedicated concierge on hand
              whenever you need them.
            </p>
          </div>
          <div style={{ borderLeft: "1px solid rgba(199,117,87,0.25)", paddingLeft: "12mm" }}>
            {[
              "Monthly terms from 30 days — no annual commitment",
              "No annual cheques, pay month by month",
              "50+ residences across Downtown, Marina, Business Bay and Creek Harbour",
              "Utilities, Wi-Fi and housekeeping can be bundled into your monthly rate",
              "Move in within days — fully furnished, every detail in place",
              "24/7 support and dedicated concierge",
            ].map((point) => (
              <div key={point} className="flex items-start gap-[3mm] mb-[3.5mm]">
                <div
                  className="flex-none mt-[1.5mm]"
                  style={{ width: "4px", height: "4px", background: "#C77557", borderRadius: "50%" }}
                />
                <p className="font-sans" style={{ fontSize: "11.5pt", color: "rgba(45,23,15,0.75)" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Wide landscape image */}
        <div className="mb-[8mm]">
          <div className="relative overflow-hidden flex-none" style={{ height: "80mm" }}>
            <Image
              src={getCloudinaryUrl("seraya/units/unit-36/listing/web/Vida Marina-2401(Web)-24", { width: 1200, height: 500, crop: "fill", gravity: "auto" })}
              fill
              className="object-cover"
              alt="Seraya Living residence"
            />
          </div>
          <p className="font-sans mt-[1.5mm]" style={{ fontSize: "7pt", color: "rgba(45,23,15,0.35)" }}>
            Seraya 36 — Dubai Marina
          </p>
        </div>

      </div>

      <PageFooter />
    </div>
  );
}

// ---- Page 3: USP cards + Locations ------------------------------------
function USPPage() {
  return (
    <div className="brochure-page flex flex-col" style={{ background: "#fcfaf6" }}>
      <div className="flex flex-col flex-1 px-[15mm] pt-[12mm] pb-[0] overflow-hidden">

        {/* Header */}
        <div className="mb-[6mm]">
          <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "8.5pt", color: "#C77557" }}>
            The world of Seraya Living
          </p>
          <h2 className="font-serif font-medium leading-tight" style={{ fontSize: "28pt", color: "#5E301F" }}>
            A new way to live in Dubai
          </h2>
        </div>

        {/* 3-column USP cards */}
        <div className="grid grid-cols-3" style={{ gap: "6mm" }}>
          {USP_IMAGES.map((usp) => (
            <div key={usp.title} className="flex flex-col overflow-hidden">
              {/* Portrait image — moderate height */}
              <div className="relative overflow-hidden flex-none" style={{ height: "75mm" }}>
                <Image
                  src={getCloudinaryUrl(usp.cloudinaryId, { width: 500, height: 560, crop: "fill", gravity: "auto" })}
                  fill
                  className="object-cover object-top"
                  alt={usp.title}
                />
              </div>
              {/* Text */}
              <div className="flex-none pt-[3.5mm]" style={{ borderTop: "1px solid rgba(199,117,87,0.25)", marginTop: "4mm" }}>
                <p className="font-sans uppercase tracking-widest mb-[2mm]" style={{ fontSize: "8pt", color: "#C77557" }}>
                  {usp.eyebrow}
                </p>
                <h3 className="font-serif font-medium leading-snug mb-[2mm]" style={{ fontSize: "14pt", color: "#5E301F" }}>
                  {usp.title}
                </h3>
                <p className="font-sans leading-relaxed" style={{ fontSize: "11pt", color: "rgba(45,23,15,0.68)" }}>
                  {usp.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(199,117,87,0.18)", margin: "7mm 0 5mm" }} />

        {/* Locations */}
        <div>
          <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "7.5pt", color: "#C77557" }}>
            Locations
          </p>
          <div className="grid grid-cols-2" style={{ gap: "3mm" }}>
            {NEIGHBOURHOODS.map((loc) => (
              <div key={loc.label}>
                <div className="relative overflow-hidden" style={{ height: "55mm" }}>
                  <Image
                    src={getCloudinaryUrl(loc.cloudinaryId, { width: 700 })}
                    fill
                    className="object-cover"
                    alt={loc.label}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      padding: "8mm 4mm 3mm",
                      background: "linear-gradient(to bottom, transparent, rgba(45,23,15,0.6))",
                    }}
                  >
                    <p className="font-sans uppercase tracking-widest" style={{ fontSize: "7pt", color: "rgba(252,250,246,0.9)" }}>
                      {loc.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PageFooter />
    </div>
  );
}

// ---- Shared guest services data ----------------------------------------
const GUEST_SERVICE_IMAGES = [
  "seraya-chauffeur-compressed_ccpwzz",
  "Seraya_Living__Gemini_3_Nano_Banana_Pro__2026-03-24_14-30-04_as3wu9",
  "seraya-chef-compressed_twprbq",
];
const GUEST_SERVICE_LABELS = ["Private chauffeur", "Dedicated concierge", "Private chef"];
const GUEST_SERVICE_TAGS = ["Private chauffeur", "Private chef", "Tours & excursions", "Car rental", "Grocery delivery", "Restaurant reservations"];

// ---- Page 3 V2: USP cards + apartment image ----------------------------
function USPPageV2() {
  return (
    <div className="brochure-page flex flex-col" style={{ background: "#fcfaf6" }}>
      <div className="flex flex-col flex-1 px-[15mm] pt-[12mm] pb-[0] overflow-hidden">

        {/* Header */}
        <div className="mb-[5mm]">
          <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
            The world of Seraya Living
          </p>
          <h2 className="font-serif font-medium leading-tight" style={{ fontSize: "32pt", color: "#5E301F" }}>
            A new way to live in Dubai
          </h2>
        </div>

        {/* 3-column USP cards */}
        <div className="grid grid-cols-3 mb-[6mm]" style={{ gap: "6mm" }}>
          {USP_IMAGES.map((usp) => (
            <div key={usp.title} className="flex flex-col overflow-hidden">
              <div className="relative overflow-hidden flex-none" style={{ height: "68mm" }}>
                <Image
                  src={getCloudinaryUrl(usp.cloudinaryId, { width: 500, height: 560, crop: "fill", gravity: "auto" })}
                  fill className="object-cover object-top" alt={usp.title}
                />
              </div>
              <div className="flex-none pt-[3mm]" style={{ borderTop: "1px solid rgba(199,117,87,0.25)", marginTop: "3.5mm" }}>
                <p className="font-sans uppercase tracking-widest mb-[1.5mm]" style={{ fontSize: "9pt", color: "#C77557" }}>
                  {usp.eyebrow}
                </p>
                <h3 className="font-serif font-medium leading-snug mb-[1.5mm]" style={{ fontSize: "15pt", color: "#5E301F" }}>
                  {usp.title}
                </h3>
                <p className="font-sans leading-relaxed" style={{ fontSize: "11pt", color: "rgba(45,23,15,0.68)" }}>
                  {usp.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Wide apartment image */}
        <div className="relative overflow-hidden flex-none" style={{ height: "80mm" }}>
          <Image
            src="/images/units/unit-29/img-1.jpg"
            fill className="object-cover object-bottom" alt="Seraya 29"
          />
        </div>
        <p className="font-sans mt-[1.5mm]" style={{ fontSize: "7pt", color: "rgba(45,23,15,0.35)" }}>
          Seraya 29 — Business Bay
        </p>

      </div>
      <PageFooter />
    </div>
  );
}

// ---- Page 4 V2: Locations + Included in every stay ---------------------
function ServicesPageV2() {
  return (
    <div className="brochure-page flex flex-col overflow-hidden" style={{ background: "#fcfaf6" }}>
      <div className="flex flex-col flex-1 px-[15mm] pt-[12mm] pb-[8mm] overflow-hidden">

        {/* Locations */}
        <div className="mb-[6mm]">
          <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
            Locations
          </p>
          <h2 className="font-serif font-medium leading-tight mb-[5mm]" style={{ fontSize: "30pt", color: "#5E301F" }}>
            Dubai's finest neighbourhoods
          </h2>
          <div className="grid grid-cols-2" style={{ gap: "3mm" }}>
            {NEIGHBOURHOODS.map((loc) => (
              <div key={loc.label}>
                <div className="relative overflow-hidden" style={{ height: "58mm" }}>
                  <Image
                    src={getCloudinaryUrl(loc.cloudinaryId, { width: 700 })}
                    fill className="object-cover" alt={loc.label}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ padding: "10mm 5mm 4mm", background: "linear-gradient(to bottom, transparent, rgba(45,23,15,0.72))" }}
                  >
                    <p className="font-sans uppercase tracking-widest" style={{ fontSize: "8pt", color: "#FCFAF6", letterSpacing: "0.12em" }}>
                      {loc.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(199,117,87,0.18)", marginBottom: "6mm" }} />

        {/* Included in every stay */}
        <div className="flex-1">
          <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
            Included in every stay
          </p>
          <h2 className="font-serif font-medium leading-tight mb-[5mm]" style={{ fontSize: "28pt", color: "#5E301F" }}>
            Everything taken care of
          </h2>
          <div className="grid grid-cols-3" style={{ gap: "8mm" }}>
            {SERVICES.map((group) => (
              <div key={group.category}>
                <div style={{ borderTop: "2px solid #C77557", paddingTop: "3mm", marginBottom: "3mm" }}>
                  <p className="font-sans uppercase tracking-widest" style={{ fontSize: "9pt", color: "#C77557" }}>
                    {group.category}
                  </p>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li key={item} className="font-sans" style={{ fontSize: "11pt", color: "rgba(45,23,15,0.78)", padding: "2mm 0", borderBottom: "1px solid rgba(45,23,15,0.08)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
      <PageFooter />
    </div>
  );
}

// ---- Page 5 V2: Guest Services + How it works --------------------------
function GuestServicesHowItWorksPage() {
  return (
    <div className="brochure-page flex flex-col overflow-hidden" style={{ background: "#fcfaf6" }}>

      {/* Top: Guest Services */}
      <div className="flex flex-col px-[15mm] pt-[12mm] pb-[7mm]" style={{ flex: "0 0 auto" }}>
        <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
          Guest services
        </p>
        <h2 className="font-serif font-medium leading-tight mb-[3mm]" style={{ fontSize: "30pt", color: "#5E301F" }}>
          Every wish, attended to
        </h2>
        <p className="font-sans leading-relaxed mb-[3mm]" style={{ fontSize: "11pt", color: "rgba(45,23,15,0.68)", maxWidth: "140mm" }}>
          Your dedicated Seraya concierge is with you from the moment you arrive.
          Whether you need a private driver at the door, a chef for an evening in,
          or the city explored entirely on your terms — every detail is arranged
          discreetly and without fuss.
        </p>
        <div className="flex flex-wrap mb-[5mm]" style={{ gap: "2mm 5mm" }}>
          {GUEST_SERVICE_TAGS.map((tag) => (
            <span key={tag} className="font-sans uppercase tracking-widest" style={{ fontSize: "8.5pt", color: "rgba(45,23,15,0.40)" }}>
              {tag}
            </span>
          ))}
        </div>
        {/* 3 portrait images */}
        <div className="grid grid-cols-3" style={{ gap: "3mm", height: "68mm" }}>
          {GUEST_SERVICE_IMAGES.map((id, i) => (
            <div key={id} className="flex flex-col">
              <div className="relative flex-1 overflow-hidden">
                <Image
                  src={getCloudinaryUrl(id, { width: 500, height: 600, crop: "fill", gravity: "auto" })}
                  fill className="object-cover" alt={GUEST_SERVICE_LABELS[i]}
                />
              </div>
              <p className="font-sans uppercase tracking-widest mt-[2mm]" style={{ fontSize: "8.5pt", color: "rgba(45,23,15,0.40)" }}>
                {GUEST_SERVICE_LABELS[i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: How it works — dark */}
      <div
        className="flex flex-col px-[15mm] pt-[12mm] pb-[12mm] mt-auto"
        style={{ background: "#2D170F", flex: "0 0 auto" }}
      >
        <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
          The process
        </p>
        <h2 className="font-serif font-medium leading-tight mb-[6mm]" style={{ fontSize: "28pt", color: "#FCFAF6" }}>
          How it works
        </h2>
        <div className="grid grid-cols-2" style={{ gap: "0" }}>
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex items-start gap-[5mm]"
              style={{
                padding: i < 2 ? "0 10mm 6mm 0" : "6mm 10mm 0 0",
                borderLeft: i % 2 === 1 ? "1px solid rgba(252,250,246,0.12)" : "none",
                paddingLeft: i % 2 === 1 ? "10mm" : "0",
                borderTop: i >= 2 ? "1px solid rgba(252,250,246,0.12)" : "none",
              }}
            >
              <span className="font-serif font-medium flex-none" style={{ fontSize: "26pt", color: "rgba(252,250,246,0.2)", lineHeight: 1 }}>
                {step.number}
              </span>
              <div>
                <h3 className="font-serif font-medium leading-snug mb-[1.5mm]" style={{ fontSize: "14pt", color: "#FCFAF6" }}>
                  {step.title}
                </h3>
                <p className="font-sans leading-relaxed" style={{ fontSize: "11pt", color: "rgba(252,250,246,0.55)" }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Page 4: Services + How it works -----------------------------------
function ServicesPage() {
  return (
    <div className="brochure-page flex flex-col overflow-hidden" style={{ background: "#fcfaf6" }}>

      {/* Top half: Everything taken care of */}
      <div className="flex-1 flex flex-col px-[15mm] pt-[12mm] pb-[8mm]" style={{ background: "#fcfaf6" }}>
        <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "8.5pt", color: "#C77557" }}>
          Included in every stay
        </p>
        <h2 className="font-serif font-medium leading-tight mb-[8mm]" style={{ fontSize: "26pt", color: "#5E301F" }}>
          Everything taken care of
        </h2>

        <div className="grid grid-cols-3 flex-1" style={{ gap: "8mm" }}>
          {SERVICES.map((group) => (
            <div key={group.category}>
              <div style={{ borderTop: "2px solid #C77557", paddingTop: "4mm", marginBottom: "4mm" }}>
                <p className="font-sans uppercase tracking-widest" style={{ fontSize: "8pt", color: "#C77557" }}>
                  {group.category}
                </p>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-sans"
                    style={{
                      fontSize: "10pt",
                      color: "rgba(45,23,15,0.78)",
                      padding: "2.5mm 0",
                      borderBottom: "1px solid rgba(45,23,15,0.08)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom half: How it works — dark section */}
      <div
        className="flex flex-col px-[15mm] pt-[10mm] pb-[10mm]"
        style={{ background: "#2D170F", flex: "0 0 auto", minHeight: "115mm" }}
      >
        <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "8.5pt", color: "#C77557" }}>
          The process
        </p>
        <h2 className="font-serif font-medium leading-tight mb-[8mm]" style={{ fontSize: "26pt", color: "#FCFAF6" }}>
          How it works
        </h2>

        <div className="grid grid-cols-4 flex-1" style={{ gap: "0" }}>
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col gap-[4mm]"
              style={{
                padding: "0 7mm 0 0",
                borderLeft: i > 0 ? "1px solid rgba(252,250,246,0.12)" : "none",
                paddingLeft: i > 0 ? "7mm" : "0",
              }}
            >
              <span className="font-serif font-medium" style={{ fontSize: "28pt", color: "rgba(252,250,246,0.2)" }}>
                {step.number}
              </span>
              <div>
                <h3 className="font-serif font-medium leading-snug mb-[2mm]" style={{ fontSize: "13pt", color: "#FCFAF6" }}>
                  {step.title}
                </h3>
                <p className="font-sans leading-relaxed" style={{ fontSize: "11pt", color: "rgba(252,250,246,0.55)" }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Page 5: Seraya Studio ---------------------------------------------
const STUDIO_IMAGES: string[] = [
  "/images/seraya-studio/coffee-table-3q.jpg",    // main large image
  "/images/seraya-studio/coffee-table-beige.jpg", // top-right stacked
  "/images/seraya-studio/side-table-dark.jpg",    // bottom-right stacked
];

function StudioPage() {
  return (
    <div className="brochure-page flex flex-col overflow-hidden" style={{ background: "#2D170F" }}>
      <div className="flex flex-col flex-1 px-[15mm] pt-[12mm] pb-[0] overflow-hidden">

        {/* Header */}
        <div className="mb-[8mm]">
          <p className="font-sans uppercase tracking-widest mb-[3mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
            Seraya Studio
          </p>
          <h2 className="font-serif font-medium leading-tight mb-[5mm]" style={{ fontSize: "32pt", color: "#FCFAF6" }}>
            Every piece,<br />yours to live with
          </h2>
          <div className="w-[16mm] h-[2px]" style={{ background: "#C77557" }} />
        </div>

        {/* Asymmetric image grid: large left (3fr) + 2 stacked right (2fr) */}
        <div className="flex gap-[4mm] flex-1 overflow-hidden mb-[8mm]" style={{ maxHeight: "130mm" }}>
          {/* Large left */}
          <div className="relative overflow-hidden" style={{ flex: "3" }}>
            {STUDIO_IMAGES[0] ? (
              <Image
                src={getCloudinaryUrl(STUDIO_IMAGES[0], { width: 900 })}
                fill className="object-cover" alt="Seraya Studio"
              />
            ) : (
              <div className="w-full h-full" style={{ background: "rgba(252,250,246,0.06)" }} />
            )}
          </div>
          {/* Two stacked right */}
          <div className="flex flex-col gap-[4mm]" style={{ flex: "2" }}>
            <div className="relative overflow-hidden flex-1">
              {STUDIO_IMAGES[1] ? (
                <Image
                  src={getCloudinaryUrl(STUDIO_IMAGES[1], { width: 500 })}
                  fill className="object-cover" alt="Seraya Studio detail"
                />
              ) : (
                <div className="w-full h-full" style={{ background: "rgba(252,250,246,0.06)" }} />
              )}
            </div>
            <div className="relative overflow-hidden flex-1">
              {STUDIO_IMAGES[2] ? (
                <Image
                  src={getCloudinaryUrl(STUDIO_IMAGES[2], { width: 500 })}
                  fill className="object-cover" alt="Seraya Studio detail"
                />
              ) : (
                <div className="w-full h-full" style={{ background: "rgba(252,250,246,0.06)" }} />
              )}
            </div>
          </div>
        </div>

        {/* Body text — full width */}
        <p className="font-sans leading-relaxed mb-[4mm]" style={{ fontSize: "12pt", color: "rgba(252,250,246,0.65)", maxWidth: "120mm" }}>
          Every residence features original Seraya Studio pieces, designed
          in-house and crafted locally in Dubai. Each piece is available to
          order — or created to your specification.
        </p>
        <a
          href="https://www.seraya-studio.com/"
          className="font-sans font-medium"
          style={{ fontSize: "11pt", color: "#C77557", textDecoration: "underline", textUnderlineOffset: "2px", letterSpacing: "0.01em" }}
        >
          Explore Seraya Studio →
        </a>

      </div>

      {/* Footer — light on dark */}
      <div className="page-footer" style={{ borderTop: "1px solid rgba(252,250,246,0.1)", background: "#2D170F" }}>
        <p className="font-sans" style={{ fontSize: "7pt", color: "rgba(252,250,246,0.3)" }}>
          living.serayastays.com
        </p>
      </div>
    </div>
  );
}

// ---- Closing Page ------------------------------------------------------
function ClosingPage() {
  return (
    <div className="brochure-page">
      <div className="relative w-full h-full">
        <Image
          src={getCloudinaryUrl(COVER_IMAGE, { width: 1240 })}
          fill
          className="object-cover object-center"
          alt="Seraya Living"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(45,23,15,0.55) 0%, rgba(45,23,15,0.3) 50%, rgba(45,23,15,0.75) 100%)",
          }}
        />

        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[20mm]">
          <Image
            src="/images/seraya-living-logo.png"
            width={150}
            height={42}
            alt="Seraya Living"
            className="brightness-0 invert mb-[10mm]"
          />
          <p className="font-serif font-medium text-white leading-snug mb-[5mm]" style={{ fontSize: "28pt" }}>
            A new rhythm of living
          </p>
          <div style={{ width: "16mm", height: "1px", background: "rgba(199,117,87,0.6)", marginBottom: "8mm" }} />
          <p className="font-sans text-white leading-relaxed mb-[10mm]" style={{ fontSize: "12pt", color: "rgba(252,250,246,0.75)", maxWidth: "120mm" }}>
            To check availability, request rates, or explore the full portfolio — speak with your agent or visit us directly.
          </p>
          <a
            href="https://living.serayastays.com"
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: "9pt", color: "rgba(252,250,246,0.85)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            living.serayastays.com
          </a>
        </div>
      </div>
    </div>
  );
}

// ---- Area Divider Page -------------------------------------------------
function AreaDividerPage({ area }: { area: string }) {
  const meta = AREA_META[area];
  const total = AREA_TOTAL[area] ?? 0;
  return (
    <div className="brochure-page" style={{ background: "#2D170F" }}>
      <div className="relative w-full h-full">
        {/* Background image */}
        <Image
          src={getCloudinaryUrl(meta.cloudinaryId, { width: 1240 })}
          fill
          className="object-cover opacity-40"
          alt={area}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(45,23,15,0.3) 0%, rgba(45,23,15,0.75) 100%)" }}
        />

        {/* Content — bottom anchored */}
        <div className="absolute bottom-0 left-0 right-0 px-[15mm] pb-[18mm]">
          <p className="font-sans uppercase tracking-widest mb-[4mm]" style={{ fontSize: "10pt", color: "#C77557" }}>
            Seraya Living · {area}
          </p>
          <h2 className="font-serif font-medium leading-tight mb-[4mm]" style={{ fontSize: "46pt", color: "#FCFAF6" }}>
            {area}
          </h2>
          <div className="w-[16mm] h-[2px] mb-[5mm]" style={{ background: "#C77557" }} />
          <p className="font-sans mb-[6mm]" style={{ fontSize: "13pt", color: "rgba(252,250,246,0.65)" }}>
            {meta.mood}
          </p>
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: "8.5pt", color: "rgba(252,250,246,0.35)" }}>
            {total} {total === 1 ? "residence" : "residences"} across {area}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Property Page — Variant E layout ----------------------------------
// hero landscape (105mm) + [portrait 50% | 2× landscape stacked 50%] (135mm) + info (50mm) + footer (7mm) = 297mm
function PropertyPage({ unit }: { unit: BrochureUnit }) {
  const hero       = unit.images.landscape[0];
  const leftPortrait = unit.images.portrait[0];
  const rightTop   = unit.images.landscape[1];
  const rightBot   = unit.images.landscape[2] ?? unit.images.story?.[0];

  return (
    <div className="brochure-page flex flex-col">

      {/* All images in one flex-col — 2px white gap runs consistently throughout */}
      <div className="flex flex-col flex-none overflow-hidden" style={{ height: "240mm", gap: "2px" }}>

        {/* Hero: full-width landscape */}
        <div className="relative overflow-hidden flex-none" style={{ height: "105mm" }}>
          {hero ? (
            <Image src={getCloudinaryUrl(hero, { width: 1400 })} fill className="object-cover" alt={unit.name} priority />
          ) : (
            <div className="unit-img-placeholder-1 w-full h-full" />
          )}
        </div>

        {/* Bottom row: portrait left (50%) + 2 landscapes stacked right (50%) */}
        <div className="flex flex-1 overflow-hidden" style={{ gap: "2px" }}>
          {/* Left portrait */}
          <div className="relative overflow-hidden" style={{ flex: "0 0 50%" }}>
            {leftPortrait ? (
              <Image src={getCloudinaryUrl(leftPortrait, { width: 700 })} fill className="object-cover" alt={unit.name} />
            ) : (
              <div className="unit-img-placeholder-2 w-full h-full" />
            )}
          </div>
          {/* Right: 2 landscapes stacked */}
          <div className="flex-1 flex flex-col" style={{ gap: "2px" }}>
            <div className="relative flex-1 overflow-hidden">
              {rightTop ? (
                <Image src={getCloudinaryUrl(rightTop, { width: 700 })} fill className="object-cover" alt={unit.name} />
              ) : (
                <div className="unit-img-placeholder-3 w-full h-full" />
              )}
            </div>
            <div className="relative flex-1 overflow-hidden">
              {rightBot ? (
                <Image src={getCloudinaryUrl(rightBot, { width: 700 })} fill className="object-cover" alt={unit.name} />
              ) : (
                <div className="unit-img-placeholder-1 w-full h-full" />
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Info — 50mm */}
      <div
        className="flex-none flex items-start justify-between gap-4"
        style={{ height: "50mm", borderTop: "2px solid #C77557", padding: "5mm 12mm 0" }}
      >
        {/* Left: area + name + building */}
        <div className="flex-none">
          <p className="font-sans uppercase tracking-widest mb-[2mm] whitespace-nowrap" style={{ fontSize: "10.5pt", color: "#C77557" }}>
            {unit.area}
          </p>
          <h3 className="font-serif font-medium leading-none mb-[1.5mm] whitespace-nowrap" style={{ fontSize: "30pt", color: "#5E301F" }}>
            {unit.name}
          </h3>
          <p className="font-sans whitespace-nowrap" style={{ fontSize: "11pt", color: "rgba(45,23,15,0.45)" }}>
            {unit.building}
          </p>
        </div>

        {/* Centre: specs */}
        <div
          className="flex items-start gap-[7mm]"
          style={{ borderLeft: "1px solid rgba(199,117,87,0.25)", borderRight: "1px solid rgba(199,117,87,0.25)", padding: "0 10mm" }}
        >
          {unit.bedrooms > 0 && (
            <div>
              <p className="font-sans uppercase tracking-widest mb-[1.5mm]" style={{ fontSize: "9pt", color: "#C77557" }}>Bedrooms</p>
              <p className="font-sans" style={{ fontSize: "14pt", color: "rgba(45,23,15,0.85)" }}>{unit.bedrooms}</p>
            </div>
          )}
          <div>
            <p className="font-sans uppercase tracking-widest mb-[1.5mm]" style={{ fontSize: "9pt", color: "#C77557" }}>Size</p>
            <p className="font-sans whitespace-nowrap" style={{ fontSize: "14pt", color: "rgba(45,23,15,0.85)" }}>{unit.sqm} m²</p>
          </div>
          <div>
            <p className="font-sans uppercase tracking-widest mb-[1.5mm]" style={{ fontSize: "9pt", color: "#C77557" }}>Guests</p>
            <p className="font-sans" style={{ fontSize: "14pt", color: "rgba(45,23,15,0.85)" }}>{unit.guests}</p>
          </div>
        </div>

        {/* Right: price or PF link */}
        <div className="flex-none text-right">
          {unit.priceFrom > 0 ? (
            <>
              <p className="font-sans uppercase tracking-widest mb-[1.5mm]" style={{ fontSize: "9pt", color: "#C77557" }}>From</p>
              <p className="font-serif font-medium whitespace-nowrap" style={{ fontSize: "24pt", color: "#5E301F" }}>
                AED {unit.priceFrom.toLocaleString()}
              </p>
              <p className="font-sans" style={{ fontSize: "10.5pt", color: "rgba(45,23,15,0.45)" }}>/ month</p>
            </>
          ) : unit.propertyFinderUrl ? (
            <>
              <p className="font-sans uppercase tracking-widest mb-[2mm]" style={{ fontSize: "9pt", color: "#C77557" }}>More info &amp; images</p>
              <a href={unit.propertyFinderUrl} className="font-sans font-medium" style={{ fontSize: "12pt", color: "#5E301F", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                View on Property Finder →
              </a>
            </>
          ) : (
            <>
              <p className="font-sans uppercase tracking-widest mb-[2mm]" style={{ fontSize: "9pt", color: "#C77557" }}>More info &amp; images</p>
              <p className="font-sans font-medium" style={{ fontSize: "12pt", color: "rgba(45,23,15,0.45)" }}>
                View on Property Finder →
              </p>
            </>
          )}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
// ---- Main Export -------------------------------------------------------
export default function BrochurePage() {
  const EXCLUDE_IDS = new Set(["seraya-6", "seraya-10"]);
  const unitsByArea = AREA_ORDER
    .map(area => ({ area, units: brochureUnits.filter(u => u.area === area && !EXCLUDE_IDS.has(u.id)) }))
    .filter(g => g.units.length > 0);

  return (
    <div className="brochure-wrapper">
      <CoverPage />
      <AboutPage />
      <USPPageV2 />
      <ServicesPageV2 />
      <GuestServicesHowItWorksPage />
      <StudioPage />
      {unitsByArea.map(({ area, units }) => (
        <div key={area}>
          <AreaDividerPage area={area} />
          {units.map((unit) => (
            <PropertyPage key={unit.id} unit={unit} />
          ))}
        </div>
      ))}
      <ClosingPage />
    </div>
  );
}
