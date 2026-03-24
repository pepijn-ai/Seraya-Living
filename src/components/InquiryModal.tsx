"use client";

import { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";
import type { InquiryState } from "./InquiryBar";

const WA_NUMBER = "13322841002";
const MONTHS = [1, 2, 3, 6, 9, 12];
const BEDROOMS = ["1", "2", "3", "4+"];
const AREAS = ["Downtown", "Business Bay", "Marina", "Creek Harbour"];
const CURRENCIES = [
  { label: "AED", value: "AED" },
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
];

function formatDate(value: string): string {
  if (!value) return "—";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [y, m, d] = value.split("-");
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
}

function buildWAMessage(f: FormData): string {
  const stayLine =
    f.stayMode === "flexible"
      ? "Duration: Flexible"
      : f.stayMode === "months" && f.stayMonths
      ? `Duration: ${f.stayMonths} month${f.stayMonths > 1 ? "s" : ""}`
      : f.moveOut
      ? `Move-out: ${formatDate(f.moveOut)}`
      : "Duration: Flexible";

  const bedroomsLine =
    f.bedrooms.length > 0
      ? `Bedrooms: ${f.bedrooms.join(", ")} bed`
      : "Bedrooms: Flexible";

  const areasLine =
    f.areas.length > 0 ? `Area: ${f.areas.join(", ")}` : "Area: Flexible";

  const budgetLine =
    f.budget ? `Budget: ${f.currency} ${Number(f.budget).toLocaleString()}` : null;

  const lines = [
    "Hi, I'm interested in Seraya Living and would like to receive curated apartment options.",
    "",
    `Move-in: ${f.moveIn ? formatDate(f.moveIn) : "Flexible"}`,
    stayLine,
    bedroomsLine,
    areasLine,
    budgetLine,
    f.guests ? `Guests: ${f.guests}` : null,
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.callNumber ? `Call: ${f.callNumber}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
}

interface FormData {
  moveIn: string;
  stayMode: "months" | "date" | "flexible";
  stayMonths: number | null;
  moveOut: string;
  bedrooms: string[];
  areas: string[];
  budget: string;
  currency: string;
  guests: string;
  name: string;
  email: string;
  callNumber: string;
  whatsapp: string;
}

const defaultForm = (): FormData => ({
  moveIn: "",
  stayMode: "months",
  stayMonths: null,
  moveOut: "",
  bedrooms: [],
  areas: [],
  budget: "",
  currency: "AED",
  guests: "",
  name: "",
  email: "",
  callNumber: "",
  whatsapp: "",
});

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: InquiryState;
}

export default function InquiryModal({ open, onClose, initialValues }: InquiryModalProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>(defaultForm());

  useEffect(() => {
    if (open) {
      setStep(0);
      setSubmitted(false);
      setForm((prev) => ({ ...prev, moveIn: initialValues.moveIn || prev.moveIn }));
    }
  }, [open, initialValues]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleArr = (field: "bedrooms" | "areas", val: string) => {
    setForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

  const handleWhatsApp = () => {
    fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, channel: "whatsapp" }),
    }).catch(() => {});
    window.open(buildWAMessage(form), "_blank");
    setSubmitted(true);
  };

  const handleEmail = async () => {
    await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, channel: "email" }),
    }).catch(() => {});
    setSubmitted(true);
  };

  if (!open) return null;

  const stepTitles = ["When are you moving?", "Your preferences", "Your details", "Review your inquiry"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-brand-bg w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 24px 64px rgba(45, 23, 15, 0.25)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-0">
          <div>
            {!submitted && (
              <p className="font-sans text-[10px] uppercase tracking-widest text-brand-body/40 mb-1">
                Step {step + 1} of 4
              </p>
            )}
            <h2 className="font-serif text-2xl font-medium text-brand-heading">
              {submitted ? "We'll be in touch" : stepTitles[step]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mt-1 w-9 h-9 flex items-center justify-center rounded-none hover:bg-brand-bg-alt transition-colors flex-none"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} className="text-brand-body/50" />
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="flex gap-1.5 px-8 mt-5 mb-7">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-none transition-all duration-300 ${
                  i <= step ? "bg-brand-heading" : "bg-brand-body/15"
                }`}
              />
            ))}
          </div>
        )}

        {/* Body */}
        <div className="px-8 pb-8">
          {submitted ? (
            <SuccessState onClose={onClose} />
          ) : step === 0 ? (
            <Step1 form={form} set={set} onNext={() => setStep(1)} />
          ) : step === 1 ? (
            <Step2
              form={form}
              set={set}
              toggleArr={toggleArr}
              onBack={() => setStep(0)}
              onNext={() => setStep(2)}
            />
          ) : step === 2 ? (
            <Step3
              form={form}
              set={set}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          ) : (
            <Step4
              form={form}
              onBack={() => setStep(2)}
              onWhatsApp={handleWhatsApp}
              onEmail={handleEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const label = "block font-sans text-[10px] font-medium text-brand-body/50 uppercase tracking-widest mb-1.5";
const input = "w-full bg-white font-sans text-base text-brand-body placeholder-brand-body/40 rounded-none px-4 py-3 outline-none focus:ring-1 focus:ring-brand-accent/50";
const inputStyle = { border: "1px solid rgba(199, 117, 87, 0.5)" };

function Chip({
  label: text,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-none font-sans text-sm transition-all duration-150 ${
        selected
          ? "bg-brand-body text-white"
          : "bg-white text-brand-body hover:bg-brand-bg-alt"
      }`}
      style={selected ? {} : { border: "1px solid rgba(199, 117, 87, 0.4)" }}
    >
      {text}
    </button>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

function Step1({
  form,
  set,
  onNext,
}: {
  form: FormData;
  set: <K extends keyof FormData>(f: K, v: FormData[K]) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Move-in date */}
      <div>
        <p className={label}>Move-in date</p>
        <CustomDatePicker
          value={form.moveIn}
          onChange={(v) => set("moveIn", v)}
          placeholder="Select date"
        />
      </div>

      {/* Stay length */}
      <div>
        <p className={label}>Length of stay</p>

        {/* Mode toggle */}
        <div
          className="flex rounded-none overflow-hidden mb-4"
          style={{ border: "1px solid rgba(199, 117, 87, 0.4)" }}
        >
          {(["months", "date", "flexible"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => set("stayMode", mode)}
              className={`flex-1 py-2.5 font-sans text-xs transition-colors duration-150 ${
                form.stayMode === mode
                  ? "bg-brand-body text-white"
                  : "bg-white text-brand-body/60 hover:text-brand-body"
              }`}
            >
              {mode === "months" ? "By months" : mode === "date" ? "By end date" : "I'm flexible"}
            </button>
          ))}
        </div>

        {form.stayMode === "months" && (
          <div className="flex flex-wrap gap-2">
            {MONTHS.map((m) => (
              <Chip
                key={m}
                label={`${m} mo`}
                selected={form.stayMonths === m}
                onClick={() => set("stayMonths", form.stayMonths === m ? null : m)}
              />
            ))}
          </div>
        )}

        {form.stayMode === "date" && (
          <CustomDatePicker
            value={form.moveOut}
            onChange={(v) => set("moveOut", v)}
            placeholder="Select move-out date"
            inline
          />
        )}

        {form.stayMode === "flexible" && (
          <p className="font-sans text-sm text-brand-body/50 italic">
            No problem — we'll discuss dates with you directly.
          </p>
        )}
      </div>

      <button
        onClick={onNext}
        className="mt-1 w-full bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] transition-colors flex items-center justify-center gap-2"
      >
        Continue <span aria-hidden="true">→</span>
      </button>

      <p className="text-center font-sans text-xs text-brand-body/40 -mt-3">
        Preferences and details are optional
      </p>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

function Step2({
  form,
  set,
  toggleArr,
  onBack,
  onNext,
}: {
  form: FormData;
  set: <K extends keyof FormData>(f: K, v: FormData[K]) => void;
  toggleArr: (field: "bedrooms" | "areas", val: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Bedrooms */}
      <div>
        <p className={label}>Bedrooms — select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {BEDROOMS.map((b) => (
            <Chip
              key={b}
              label={`${b} bed`}
              selected={form.bedrooms.includes(b)}
              onClick={() => toggleArr("bedrooms", b)}
            />
          ))}
          <Chip
            label="I'm flexible"
            selected={form.bedrooms.length === 0}
            onClick={() => set("bedrooms", [])}
          />
        </div>
      </div>

      {/* Area */}
      <div>
        <p className={label}>Preferred area — select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <Chip
              key={a}
              label={a}
              selected={form.areas.includes(a)}
              onClick={() => toggleArr("areas", a)}
            />
          ))}
          <Chip
            label="I'm flexible"
            selected={form.areas.length === 0}
            onClick={() => set("areas", [])}
          />
        </div>
      </div>

      {/* Budget */}
      <div>
        <p className={label}>Budget per month (optional)</p>
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            placeholder="e.g. 25000"
            className={`${input} flex-1 min-w-0`}
            style={inputStyle}
          />
          <div className="w-24 flex-none">
            <CustomSelect
              value={form.currency}
              onChange={(v) => set("currency", v)}
              options={CURRENCIES}
            />
          </div>
        </div>
      </div>

      {/* Guests */}
      <div>
        <p className={label}>Number of guests (optional)</p>
        <input
          type="number"
          min={1}
          max={20}
          value={form.guests}
          onChange={(e) => set("guests", e.target.value)}
          placeholder="e.g. 2"
          className={input}
          style={inputStyle}
        />
      </div>

      <div className="flex gap-3 mt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-sm text-brand-body/50 hover:text-brand-body transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] transition-colors flex items-center justify-center gap-2"
        >
          Continue <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

function Step3({
  form,
  set,
  onBack,
  onNext,
}: {
  form: FormData;
  set: <K extends keyof FormData>(f: K, v: FormData[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const canSubmit = form.name && form.email && form.whatsapp;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className={label}>Full name *</p>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Your name"
          className={input}
          style={inputStyle}
        />
      </div>

      <div>
        <p className={label}>Email address *</p>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@email.com"
          className={input}
          style={inputStyle}
        />
      </div>

      <div>
        <p className={label}>Number to call (optional)</p>
        <input
          type="tel"
          value={form.callNumber}
          onChange={(e) => set("callNumber", e.target.value)}
          placeholder="+971 XX XXX XXXX"
          className={input}
          style={inputStyle}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <p className={`${label} mb-0`}>WhatsApp number *</p>
          {form.callNumber && !form.whatsapp && (
            <button
              type="button"
              onClick={() => set("whatsapp", form.callNumber)}
              className="font-sans text-xs text-brand-accent hover:text-brand-heading transition-colors"
            >
              Same as call number ↑
            </button>
          )}
        </div>
        <input
          type="tel"
          required
          value={form.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          placeholder="+971 XX XXX XXXX"
          className={input}
          style={inputStyle}
        />
      </div>

      <div className="flex gap-3 mt-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-sm text-brand-body/50 hover:text-brand-body transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!canSubmit}
          className="flex-1 bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
        >
          Continue <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

// ─── Step 4 (Review) ──────────────────────────────────────────────────────────

function Step4({
  form,
  onBack,
  onWhatsApp,
  onEmail,
}: {
  form: FormData;
  onBack: () => void;
  onWhatsApp: () => void;
  onEmail: () => void;
}) {
  const MONTHS_LABEL = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmt = (v: string) => {
    if (!v) return "—";
    const [y, m, d] = v.split("-");
    return `${d} ${MONTHS_LABEL[parseInt(m) - 1]} ${y}`;
  };

  const stayLabel =
    form.stayMode === "flexible"
      ? "Flexible"
      : form.stayMode === "months" && form.stayMonths
      ? `${form.stayMonths} month${form.stayMonths > 1 ? "s" : ""}`
      : form.moveOut
      ? `Until ${fmt(form.moveOut)}`
      : "Flexible";

  const rows: { label: string; value: string }[] = [
    { label: "Move-in", value: fmt(form.moveIn) || "Flexible" },
    { label: "Duration", value: stayLabel },
    { label: "Bedrooms", value: form.bedrooms.length > 0 ? form.bedrooms.join(", ") + " bed" : "Flexible" },
    { label: "Area", value: form.areas.length > 0 ? form.areas.join(", ") : "Flexible" },
    ...(form.budget ? [{ label: "Budget", value: `${form.currency} ${Number(form.budget).toLocaleString()}` }] : []),
    ...(form.guests ? [{ label: "Guests", value: form.guests }] : []),
    { label: "Name", value: form.name },
    { label: "Email", value: form.email },
    { label: "WhatsApp", value: form.whatsapp },
    ...(form.callNumber ? [{ label: "Call", value: form.callNumber }] : []),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div style={{ border: "1px solid rgba(199, 117, 87, 0.2)" }}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between gap-4 px-4 py-3 ${i > 0 ? "border-t" : ""}`}
            style={i > 0 ? { borderColor: "rgba(199, 117, 87, 0.15)" } : {}}
          >
            <span className="font-sans text-[10px] uppercase tracking-widest text-brand-body/40 pt-0.5 flex-none">
              {row.label}
            </span>
            <span className="font-sans text-sm text-brand-body text-right">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-sans text-sm text-brand-body/50 hover:text-brand-body transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> Back
          </button>
          <button
            onClick={onWhatsApp}
            className="flex-1 bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] transition-colors flex items-center justify-center gap-2"
          >
            Send inquiry <span aria-hidden="true">→</span>
          </button>
        </div>
        <button
          onClick={onEmail}
          className="w-full text-center font-sans text-xs text-brand-body/40 hover:text-brand-body/70 transition-colors py-1"
        >
          Or submit by email instead
        </button>
      </div>
    </div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 bg-brand-bg-alt flex items-center justify-center mx-auto mb-6">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22" className="text-brand-heading">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className="font-sans text-sm text-brand-body/60 max-w-xs mx-auto leading-relaxed mb-8">
        Your inquiry has been received. We will review your preferences and be in contact shortly.
      </p>
      <button
        onClick={onClose}
        className="font-sans text-sm text-brand-heading hover:text-brand-accent transition-colors"
      >
        Back to Seraya Living
      </button>
    </div>
  );
}
