"use client";

import { useEffect, useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

export interface InquiryState {
  moveIn: string;
}

interface InquiryBarProps {
  values: InquiryState;
  onChange: (values: InquiryState) => void;
  onCTA?: () => void;
  sticky?: boolean;
}

export default function InquiryBar({ values, onChange, onCTA, sticky = false }: InquiryBarProps) {
  const handleCTA = () => {
    if (onCTA) { onCTA(); return; }
    const form = document.getElementById("inquiry-form");
    if (form) form.scrollIntoView({ behavior: "smooth" });
  };

  const inner = (
    <div
      className={`bg-brand-bg-alt ${
        sticky
          ? "px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
          : "px-4 py-4 md:px-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch md:items-end justify-center gap-3">
        {/* Move-in date */}
        <div className="flex flex-col flex-1 max-w-xs min-w-0">
          <span className="font-sans text-[10px] uppercase tracking-widest text-brand-body/50 mb-1 px-1">
            Move-in date
          </span>
          <CustomDatePicker
            value={values.moveIn}
            onChange={(v) => onChange({ moveIn: v })}
            placeholder="Select your move-in date"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="flex-none bg-brand-cta text-white font-sans font-medium text-sm px-8 py-3 rounded-none hover:bg-[#3D2710] transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          Request availability
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );

  if (sticky) {
    return <div className="fixed bottom-0 left-0 right-0 z-40">{inner}</div>;
  }

  return inner;
}

export function InquiryBarStickyController({
  values,
  onChange,
  onCTA,
}: {
  values: InquiryState;
  onChange: (v: InquiryState) => void;
  onCTA?: () => void;
}) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const formEl = document.getElementById("inquiry-form");
    if (!heroEl || !formEl) return;

    const heroObs = new IntersectionObserver(
      ([e]) => setHeroVisible(e.isIntersecting),
      { threshold: 0 }
    );
    const formObs = new IntersectionObserver(
      ([e]) => setFormVisible(e.isIntersecting),
      { threshold: 0 }
    );

    heroObs.observe(heroEl);
    formObs.observe(formEl);
    return () => { heroObs.disconnect(); formObs.disconnect(); };
  }, []);

  if (heroVisible || formVisible) return null;
  return <InquiryBar values={values} onChange={onChange} onCTA={onCTA} sticky />;
}
