import FadeIn from "./FadeIn";

export default function InquiryCTA({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="inquiry-form" className="bg-brand-bg-alt py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6 text-center">
        <FadeIn>
          <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent mb-5">
            Get started
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-heading mb-5 leading-snug">
            Find your residence in Dubai.
          </h2>
          <p className="font-sans text-sm text-brand-body/60 max-w-sm mx-auto mb-10 leading-relaxed">
            Tell us what you need and we&apos;ll be in touch shortly with a curated selection.
          </p>
          <button
            onClick={onCTA}
            className="inline-flex items-center gap-3 bg-brand-cta text-white font-sans font-medium text-sm px-10 py-4 rounded-none hover:bg-[#3D2710] transition-colors duration-200"
          >
            Request availability
            <span aria-hidden="true">→</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
