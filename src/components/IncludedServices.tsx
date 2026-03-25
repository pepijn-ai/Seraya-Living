import FadeIn from "./FadeIn";

const groups = [
  {
    category: "Your residence",
    items: [
      "Seraya Studio furnishings",
      "Fully equipped kitchen",
      "Hotel-grade linens",
      "All utilities & WiFi",
    ],
  },
  {
    category: "Your service",
    items: [
      "Monthly housekeeping",
      "Dedicated concierge",
      "24/7 support",
      "On-call maintenance",
    ],
  },
  {
    category: "Your building",
    items: [
      "Pool & gym access",
      "Dedicated parking",
      "Welcome provisions",
    ],
  },
];

export default function IncludedServices() {
  return (
    <section className="bg-brand-bg py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-16">
            Included in every stay
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {groups.map((group, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div>
                <div className="border-t-2 border-brand-accent pt-4 mb-6">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-brand-accent">
                    {group.category}
                  </p>
                </div>
                <ul>
                  {group.items.map((item, j) => (
                    <li
                      key={j}
                      className="font-sans text-sm text-brand-body py-3 border-b border-brand-body/10 last:border-b-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
