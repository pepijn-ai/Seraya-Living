import FadeIn from "./FadeIn";

const steps = [
  {
    number: "01",
    title: "Share your requirements",
    body: "Dates, preferences, and budget.",
  },
  {
    number: "02",
    title: "Receive curated options",
    body: "We handpick residences matched to your needs.",
  },
  {
    number: "03",
    title: "Choose and confirm",
    body: "Select your residence and sign digitally. No paperwork, no agency fees.",
  },
  {
    number: "04",
    title: "Move in",
    body: "Your residence is ready from the moment you arrive.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-bg-alt py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-16">
            How it works
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className={`p-8 flex flex-col gap-4 ${i > 0 ? "md:border-l border-brand-body/10" : ""}`}>
                <span className="font-serif text-3xl font-medium text-brand-heading/25">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-medium text-brand-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-body/60 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
