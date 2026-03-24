import { apartments } from "@/data/apartments";
import ApartmentCard from "./ApartmentCard";
import FadeIn from "./FadeIn";

export default function FeaturedResidences({ onInquiryCTA }: { onInquiryCTA?: () => void }) {
  return (
    <section id="residences" className="bg-brand-bg py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent mb-4">
            A selection of our residences
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-12">
            Crafted for extended living
          </h2>
        </FadeIn>

        {/* Top row — 3 equal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {apartments.slice(0, 3).map((apartment, i) => (
            <FadeIn key={apartment.id} delay={i * 80}>
              <ApartmentCard apartment={apartment} aspectClass="aspect-[4/3]" />
            </FadeIn>
          ))}
        </div>

        {/* Bottom row — 2 larger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {apartments.slice(3).map((apartment, i) => (
            <FadeIn key={apartment.id} delay={i * 80}>
              <ApartmentCard apartment={apartment} aspectClass="aspect-[4/3]" />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="font-sans text-sm text-brand-body/60 text-center">
              50+ residences across Dubai — one to four-bedroom penthouses.
            </p>
            <button
              onClick={onInquiryCTA}
              className="inline-flex items-center gap-3 bg-brand-cta text-white font-sans font-medium text-sm px-8 py-4 hover:bg-[#3D2710] transition-colors duration-200"
            >
              Inquire to see the full portfolio
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
