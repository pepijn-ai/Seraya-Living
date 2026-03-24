import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import InquiryBar, { InquiryState } from "./InquiryBar";

const HERO_IMAGE = getCloudinaryUrl(
  "seraya-hero-compressed_h0j3rr",
  { width: 2560, quality: "auto:best" }
);

const proofPoints = [
  "Flexible lease terms",
  "All-inclusive",
  "Prime locations",
  "Concierge support",
];

interface HeroProps {
  inquiryValues: InquiryState;
  onInquiryChange: (v: InquiryState) => void;
  onInquiryCTA: () => void;
}

export default function Hero({ inquiryValues, onInquiryChange, onInquiryCTA }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Seraya Living luxury apartment"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-20">
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-white leading-tight max-w-3xl">
          A new rhythm of living
        </h1>
        <p className="mt-4 font-sans text-lg md:text-xl text-white/90">
          Extended stays in fully serviced Dubai residences.
        </p>
      </div>

      {/* Proof points — anchored above inquiry bar */}
      <div className="relative z-10 flex items-center justify-center flex-wrap gap-x-3 gap-y-1 pb-8 px-8">
        {proofPoints.map((point, i) => (
          <span key={point} className="flex items-center gap-3">
            <span className="font-sans text-[10px] uppercase tracking-widest text-white/70">{point}</span>
            {i < proofPoints.length - 1 && (
              <span className="text-brand-accent text-[10px]">·</span>
            )}
          </span>
        ))}
      </div>

      {/* Inquiry bar — pinned to bottom of hero */}
      <div className="relative z-10">
        <InquiryBar values={inquiryValues} onChange={onInquiryChange} onCTA={onInquiryCTA} />
      </div>
    </section>
  );
}
