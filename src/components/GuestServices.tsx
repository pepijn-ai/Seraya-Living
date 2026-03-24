import Image from "next/image";
import FadeIn from "./FadeIn";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Left: chauffeur, Center: concierge/housekeeping, Right: chef (placeholder until ready)
const IMAGE_LEFT   = getCloudinaryUrl("seraya-chauffeur-compressed_ccpwzz", { width: 800, height: 1000, crop: "fill", gravity: "auto" });
const IMAGE_CENTER = getCloudinaryUrl("Seraya_Living__Gemini_3_Nano_Banana_Pro__2026-03-24_14-30-04_as3wu9", { width: 800, height: 1000, crop: "fill", gravity: "auto" });
const IMAGE_RIGHT  = getCloudinaryUrl("seraya-chef-compressed_twprbq", { width: 800, height: 1000, crop: "fill", gravity: "auto" });

export default function GuestServices() {
  return (
    <section className="bg-brand-bg-alt py-16 md:py-20">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">

        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent mb-4">
              Guest services
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-6">
              Every wish, attended to
            </h2>
            <p className="font-sans text-sm text-brand-body/70 leading-relaxed">
              Your dedicated Seraya concierge is with you from the moment you arrive.
              Whether you need a private driver at the door, a chef for an evening in,
              or the city explored entirely on your terms — every detail is arranged
              discreetly and without fuss. A full range of à la carte services is
              available throughout your stay.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-x-8 gap-y-3 max-w-lg mx-auto">
              {[
                "Dedicated concierge",
                "Private chauffeur",
                "Housekeeping",
                "Private chef",
                "Tours & excursions",
                "Car rental",
              ].map((service) => (
                <span key={service} className="font-sans text-xs text-brand-body/50 uppercase tracking-wider text-center">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Staggered image trio */}
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 md:gap-5 items-start">
          {/* Left — shifted down */}
          <FadeIn delay={0}>
            <div className="relative w-full mt-8 md:mt-10 overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src={IMAGE_LEFT}
                alt="Private chauffeur service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
          </FadeIn>

          {/* Center — tallest, sits highest */}
          <FadeIn delay={100}>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src={IMAGE_CENTER}
                alt="Dedicated concierge"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
          </FadeIn>

          {/* Right — shifted down */}
          <FadeIn delay={200}>
            <div className="relative w-full mt-8 md:mt-10 overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src={IMAGE_RIGHT}
                alt="Private chef service"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
