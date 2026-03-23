"use client";

import { useState, useEffect } from "react";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";

const DURATION_OPTIONS = [1, 2, 3, 6, 9, 12].map((m) => ({
  label: `${m} month${m > 1 ? "s" : ""}`,
  value: `${m} month${m > 1 ? "s" : ""}`,
}));
const BEDROOM_OPTIONS = [
  { label: "Studio", value: "Studio" },
  { label: "1 bedroom", value: "1" },
  { label: "2 bedrooms", value: "2" },
  { label: "3 bedrooms", value: "3" },
  { label: "4+ bedrooms", value: "4+" },
];
const AREA_OPTIONS = [
  { label: "No preference", value: "" },
  { label: "Downtown", value: "Downtown" },
  { label: "Business Bay", value: "Business Bay" },
  { label: "Marina", value: "Marina" },
  { label: "Creek Harbour", value: "Creek Harbour" },
];
const BUDGET_OPTIONS = [
  { label: "Under AED 20,000", value: "Under AED 20,000" },
  { label: "AED 20,000 – 30,000", value: "AED 20,000 – 30,000" },
  { label: "AED 30,000 – 40,000", value: "AED 30,000 – 40,000" },
  { label: "AED 40,000+", value: "AED 40,000+" },
];

interface InquiryFormProps {
  moveIn?: string;
}

export default function InquiryForm({ moveIn = "" }: InquiryFormProps) {
  const [form, setForm] = useState({
    moveIn,
    duration: "",
    bedrooms: "",
    area: "",
    budget: "",
    guests: "",
    name: "",
    email: "",
    whatsapp: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (moveIn) setForm((prev) => ({ ...prev, moveIn }));
  }, [moveIn]);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white font-sans text-sm text-brand-body placeholder-brand-body/40 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-brand-accent/50";
  const inputStyle = { border: "1px solid rgba(199, 117, 87, 0.5)" };

  if (status === "success") {
    return (
      <section id="inquiry-form" className="bg-brand-bg-alt py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-4">
            Thank you!
          </h2>
          <p className="font-sans text-base text-brand-body/70 max-w-md mx-auto">
            We&apos;ve received your inquiry and will send you curated apartment
            options within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry-form" className="bg-brand-bg-alt py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-3">
          Request apartment options
        </h2>
        <p className="font-sans text-sm text-brand-body/70 mb-10 max-w-xl">
          Tell us what you&apos;re looking for and we&apos;ll send you a curated
          selection within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Move-in date */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Move-in date
              </label>
              <CustomDatePicker
                value={form.moveIn}
                onChange={(v) => set("moveIn", v)}
                placeholder="Select date"
              />
            </div>

            {/* Stay duration */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Stay duration
              </label>
              <CustomSelect
                value={form.duration}
                onChange={(v) => set("duration", v)}
                options={DURATION_OPTIONS}
                placeholder="Select duration"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Bedrooms
              </label>
              <CustomSelect
                value={form.bedrooms}
                onChange={(v) => set("bedrooms", v)}
                options={BEDROOM_OPTIONS}
                placeholder="Select"
              />
            </div>

            {/* Area preference */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Area preference
              </label>
              <CustomSelect
                value={form.area}
                onChange={(v) => set("area", v)}
                options={AREA_OPTIONS}
                placeholder="No preference"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Budget range (optional)
              </label>
              <CustomSelect
                value={form.budget}
                onChange={(v) => set("budget", v)}
                options={BUDGET_OPTIONS}
                placeholder="Select budget"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Number of guests
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={form.guests}
                onChange={(e) => set("guests", e.target.value)}
                placeholder="e.g. 2"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Full name */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Full name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                Email address *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@email.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* WhatsApp */}
            <div className="md:col-span-2">
              <label className="block font-sans text-xs font-medium text-brand-body/60 mb-1.5 uppercase tracking-wide">
                WhatsApp number *
              </label>
              <input
                type="tel"
                required
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="+971 XX XXX XXXX"
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>

          {status === "error" && (
            <p className="mt-4 font-sans text-sm text-red-600">
              Something went wrong. Please try again or contact us on WhatsApp.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 inline-flex items-center gap-3 bg-brand-cta text-white font-sans font-medium text-sm px-8 py-4 rounded-lg hover:bg-[#3D2710] disabled:opacity-60 transition-colors duration-200"
          >
            {status === "loading" ? "Sending…" : "Request apartment options"}
            {status !== "loading" && <span aria-hidden="true">→</span>}
          </button>
        </form>
      </div>
    </section>
  );
}
