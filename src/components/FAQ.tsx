"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";
import FadeIn from "./FadeIn";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-brand-bg py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-12">
            Frequently asked questions
          </h2>
        </FadeIn>

        <div className="max-w-3xl divide-y divide-brand-body/10">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="flex items-center justify-between w-full py-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-sans text-base font-medium text-brand-body pr-8">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  className={`flex-none text-brand-heading transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="font-sans text-sm text-brand-body/70 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
