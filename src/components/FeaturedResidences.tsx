import { apartments } from "@/data/apartments";
import ApartmentCard from "./ApartmentCard";
import FadeIn from "./FadeIn";

export default function FeaturedResidences({ onInquiryCTA }: { onInquiryCTA?: () => void }) {
  return (
    <section id="residences" className="bg-brand-bg py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-12">
            Our residences
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
          <div className="mt-12 flex justify-center">
            <button
              onClick={onInquiryCTA}
              className="inline-flex items-center gap-3 bg-brand-cta text-white font-sans font-medium text-sm px-8 py-4 hover:bg-[#3D2710] transition-colors duration-200"
            >
              Inquire now
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
