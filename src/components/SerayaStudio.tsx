"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const PIECES = [
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_r6tg69r6tg69r6tg_ral8bk", { width: 1000, height: 1200, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — marble coffee table",
  },
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_2hf0ru2hf0ru2hf0_nmz0ny", { width: 1000, height: 1200, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — stone side table",
  },
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_q01mqnq01mqnq01m_kjzzdk", { width: 1000, height: 1200, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — sofa",
  },
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_spzk7mspzk7mspzk_qdkjld", { width: 1000, height: 1200, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — piece 4",
  },
  {
    src: getCloudinaryUrl("Seraya_Studio__Gemini_3_Nano_Banana_Pro__2026-03-20_13-14-44_1_kb1hk5", { width: 1000, height: 1200, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — piece 5",
  },
];

export default function SerayaStudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = -top;
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const index = Math.min(PIECES.length - 1, Math.floor(progress * PIECES.length));
      setActiveIndex(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-brand-body">

      {/* ── Desktop: scroll-pinned ── */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: `${PIECES.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex overflow-hidden">

          {/* Left: text */}
          <div className="w-5/12 flex flex-col justify-center px-12 xl:px-20 flex-none">
            <p className="font-sans text-[10px] uppercase tracking-widest text-white/40 mb-4">
              Seraya Studio
            </p>
            <h2 className="font-serif text-3xl xl:text-4xl font-medium text-white leading-snug mb-6">
              Every piece, yours to live with
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Every object in your residence is a Seraya Studio original — designed in-house and crafted locally in Dubai. Our residences are a living collection: stay among the pieces, and take home anything that moves you. Bespoke commissions welcome.
            </p>
            <a
              href="https://seraya-studio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm text-white/80 hover:text-white transition-colors duration-200 border-b border-white/20 hover:border-white pb-0.5 w-fit mb-14"
            >
              Explore Seraya Studio <span aria-hidden="true">→</span>
            </a>

            {/* Progress indicator */}
            <div className="flex items-center gap-3">
              {PIECES.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    height: 1,
                    width: i === activeIndex ? 32 : 14,
                    background: i === activeIndex ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
              <span className="font-sans text-[10px] text-white/30 ml-1 tabular-nums">
                {activeIndex + 1} / {PIECES.length}
              </span>
            </div>
          </div>

          {/* Right: crossfading images */}
          <div className="flex-1 relative">
            {PIECES.map((piece, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  className="object-cover"
                  sizes="58vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: swipe carousel ── */}
      <div className="md:hidden py-16">
        <div className="px-3 mb-8">
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/40 mb-4">
            Seraya Studio
          </p>
          <h2 className="font-serif text-3xl font-medium text-white leading-snug mb-4">
            Every piece, yours to live with
          </h2>
          <p className="font-sans text-sm text-white/60 leading-relaxed mb-4">
            Every object in your residence is a Seraya Studio original — designed in-house and crafted locally in Dubai.
          </p>
          <a
            href="https://seraya-studio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-white/80 border-b border-white/20 pb-0.5 w-fit"
          >
            Explore Seraya Studio <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Horizontal scroll-snap carousel */}
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pl-3 pr-6 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {PIECES.map((piece, i) => (
            <div
              key={i}
              className="snap-center flex-none relative overflow-hidden"
              style={{ width: "72vw", aspectRatio: "3/4" }}
            >
              <Image
                src={piece.src}
                alt={piece.alt}
                fill
                className="object-cover"
                sizes="72vw"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
