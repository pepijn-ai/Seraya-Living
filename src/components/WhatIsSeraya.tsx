import Image from "next/image";
import FadeIn from "./FadeIn";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const USPs = [
  {
    eyebrow: "Flexible stays",
    title: "Stay on your terms",
    body: "No lease, no yearly commitment. Stay for a month, a season, or as long as you need — and pay month by month.",
    image: getCloudinaryUrl("Seraya_Living__Gemini_3_Nano_Banana_Pro_2026-03-23_21-56-36_50_wxydpr", { width: 800, height: 1000, crop: "fill", gravity: "auto" }),
  },
  {
    eyebrow: "Fully furnished",
    title: "Arrive and live",
    body: "Every residence is guest-ready from the moment you arrive. Linens, kitchenware, and every detail are already in place — nothing to arrange, nothing to buy.",
    image: getCloudinaryUrl("seraya/units/unit-50/listing/web/Downtown Views II_T1_2004-9", { width: 800, height: 1000, crop: "fill", gravity: "auto" }),
  },
  {
    eyebrow: "Fully serviced",
    title: "Entirely looked after",
    body: "Utilities, high-speed WiFi, and regular housekeeping are woven into a single monthly rate. Your dedicated concierge is on hand whenever you need them.",
    image: getCloudinaryUrl("seraya/units/unit-49/listing/web/DTV1-2106(Web)-9", { width: 800, height: 1000, crop: "fill", gravity: "auto" }),
  },
];

export default function WhatIsSeraya() {
  return (
    <section className="bg-brand-bg py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">

        {/* Section header */}
        <FadeIn>
          <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent mb-4">
            The world of Seraya Living
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-16 max-w-lg leading-snug">
            A new standard for extended stays in Dubai.
          </h2>
        </FadeIn>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {USPs.map((usp, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex flex-col">
                {/* Image — 4:5 portrait, sharp edges */}
                <div className="relative w-full overflow-hidden mb-6" style={{ aspectRatio: "4/5" }}>
                  <Image
                    src={usp.image}
                    alt={usp.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Text */}
                <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent mb-2">
                  {usp.eyebrow}
                </p>
                <h3 className="font-serif text-2xl font-medium text-brand-heading mb-3 leading-snug">
                  {usp.title}
                </h3>
                <p className="font-sans text-sm text-brand-body/70 leading-relaxed">
                  {usp.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
