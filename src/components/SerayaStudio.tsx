import Image from "next/image";
import FadeIn from "./FadeIn";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const PIECES = [
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_r6tg69r6tg69r6tg_ral8bk", { width: 800, height: 800, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — marble coffee table",
  },
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_2hf0ru2hf0ru2hf0_nmz0ny", { width: 800, height: 800, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — stone side table",
  },
  {
    src: getCloudinaryUrl("Gemini_Generated_Image_q01mqnq01mqnq01m_kjzzdk", { width: 800, height: 800, crop: "fill", gravity: "auto" }),
    alt: "Seraya Studio — sofa",
  },
];

export default function SerayaStudio() {
  return (
    <section className="bg-brand-body py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">

        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-white/40 mb-4">
                Seraya Studio
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-white max-w-md leading-snug">
                Every piece, yours to live with
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="font-sans text-sm text-white/60 leading-relaxed mb-4">
                Every object in your residence is a Seraya Studio original — designed in-house and crafted locally in Dubai. Our residences are a living collection: stay among the pieces, and take home anything that moves you. Bespoke commissions welcome.
              </p>
              <a
                href="https://seraya-studio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm text-white/80 hover:text-white transition-colors duration-200 border-b border-white/20 hover:border-white pb-0.5"
              >
                Explore Seraya Studio <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Three product images */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {PIECES.map((piece, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
