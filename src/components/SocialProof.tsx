import Image from "next/image";
import FadeIn from "./FadeIn";

const LOGOS = [
  { src: "/images/press/airbnb.png",             alt: "Airbnb",              height: 52 },
  { src: "/images/press/forbes.png",             alt: "Forbes Middle East",  height: 52 },
  { src: "/images/press/conde-nast.png",         alt: "Condé Nast",          height: 42 },
  { src: "/images/press/conde-nast-traveler.png",alt: "Condé Nast Traveler", height: 56 },
];

export default function SocialProof() {
  return (
    <section>
      {/* Quote block — full-width image with text overlay */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
        <Image
          src="/images/press/dunes.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={90}
          priority
        />
        {/* Subtle dark overlay on the left where text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* Quote text */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-3 md:px-6">
            <FadeIn>
              <blockquote className="max-w-xl">
                <p className="font-serif text-2xl md:text-4xl font-medium text-white leading-snug mb-6">
                  &ldquo;Seraya provides all the highlights of a hotel booking within the unmatched comfort of a self-contained residence.&rdquo;
                </p>
                <cite className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/70 not-italic">
                  Condé Nast
                </cite>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Logo strip */}
      <div className="bg-brand-bg border-t border-brand-body/8 py-5">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {LOGOS.map((logo) => (
                <div key={logo.alt} className="relative flex items-center" style={{ height: logo.height }}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    height={logo.height}
                    width={logo.height * 4}
                    className="object-contain w-auto"
                    style={{ maxHeight: logo.height }}
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
