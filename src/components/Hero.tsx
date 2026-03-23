import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import InquiryBar, { InquiryState } from "./InquiryBar";

const HERO_IMAGE = getCloudinaryUrl(
  "seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-51",
  { width: 1920 }
);

const proofPoints = [
  "Flexible lease terms",
  "Utilities included",
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pt-20 pb-8">
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-white leading-tight max-w-3xl">
          Flexible luxury living in Dubai
        </h1>
        <p className="mt-4 font-sans text-lg md:text-xl text-white/90">
          Fully serviced apartments for 1–12 month stays
        </p>

        {/* Proof points */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {proofPoints.map((point) => (
            <span
              key={point}
              className="font-sans text-sm text-white/80"
            >
              {point}
            </span>
          ))}
        </div>
      </div>

      {/* Inquiry bar — pinned to bottom of hero */}
      <div className="relative z-10 mt-auto">
        <InquiryBar values={inquiryValues} onChange={onInquiryChange} onCTA={onInquiryCTA} />
      </div>
    </section>
  );
}
