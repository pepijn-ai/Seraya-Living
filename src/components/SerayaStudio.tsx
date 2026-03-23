import Image from "next/image";
import FadeIn from "./FadeIn";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// Placeholder images — swap these for real Seraya Studio furniture shots
const MAIN_IMAGE = getCloudinaryUrl("seraya/units/unit-49/listing/web/DTV1-2106(Web)-9", { width: 1200, height: 1400, crop: "fill", gravity: "auto" });
const DETAIL_1   = getCloudinaryUrl("seraya/units/unit-50/listing/web/Downtown Views II_T1_2004-8", { width: 800, height: 680, crop: "fill", gravity: "auto" });
const DETAIL_2   = getCloudinaryUrl("seraya/units/unit-37/listing/web/DTV1-1909(web)-51", { width: 800, height: 680, crop: "fill", gravity: "auto" });

export default function SerayaStudio() {
  return (
    <section className="bg-brand-body py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">

        {/* Header */}
        <FadeIn>
          <p className="font-sans text-[10px] uppercase tracking-widest text-white/40 mb-4">
            Seraya Studio
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-white max-w-md leading-snug">
              Every piece designed and made in-house.
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-sm md:text-right">
              Seraya Studio designs and crafts all furniture exclusively for our residences — built for the way people actually live, not for a show apartment.
            </p>
          </div>
        </FadeIn>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3">

          {/* Large image — left */}
          <FadeIn>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image
                src={MAIN_IMAGE}
                alt="Seraya Studio — custom furniture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </FadeIn>

          {/* Two stacked detail images — right */}
          <div className="flex flex-col gap-3">
            <FadeIn delay={80}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={DETAIL_1}
                  alt="Seraya Studio — detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={DETAIL_2}
                  alt="Seraya Studio — detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
