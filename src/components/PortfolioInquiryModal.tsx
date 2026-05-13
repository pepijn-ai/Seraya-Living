"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface PortfolioInquiryModalProps {
  open: boolean;
  onClose: () => void;
}

const label = "block font-sans text-[10px] font-medium text-brand-body/50 uppercase tracking-widest mb-1.5";
const input = "w-full bg-white font-sans text-base text-brand-body placeholder-brand-body/40 rounded-none px-4 py-3 outline-none focus:ring-1 focus:ring-brand-accent/50";
const inputStyle = { border: "1px solid rgba(199, 117, 87, 0.5)" };

export default function PortfolioInquiryModal({ open, onClose }: PortfolioInquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim() && email.trim() && phone.trim() && !submitting;

  const handleClose = () => {
    onClose();
    // Reset after close animation so reopening starts fresh
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setSubmitted(false);
      setSubmitting(false);
    }, 200);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp: phone, source: "portfolio" }),
      });
    } catch {
      // Non-blocking — still show thank-you. Pepijn reads the inbox; the failure mode
      // (no email arrives) is recoverable and rare, and silently failing the user is worse.
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div
        className="relative bg-brand-bg w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 24px 64px rgba(45, 23, 15, 0.25)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-0">
          <div>
            <h2 className="font-serif text-2xl font-medium text-brand-heading">
              {submitted ? "We'll be in touch" : "See the full portfolio"}
            </h2>
            {!submitted && (
              <p className="font-sans text-sm text-brand-body/60 mt-2 max-w-sm leading-relaxed">
                Share your details and we&apos;ll be in touch with a curated selection.
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="mt-1 w-9 h-9 flex items-center justify-center rounded-none hover:bg-brand-bg-alt transition-colors flex-none"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} className="text-brand-body/50" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pt-7 pb-8">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6">
              <div
                className="w-14 h-14 flex items-center justify-center mb-6"
                style={{ border: "1px solid rgba(199, 117, 87, 0.4)", background: "rgba(199, 117, 87, 0.06)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" className="text-brand-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-sans text-sm text-brand-body/70 max-w-[280px] leading-relaxed mb-10">
                Thank you. We&apos;ll be in touch shortly with a curated selection of residences.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] transition-colors"
              >
                Back to Seraya Living
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                <p className={label}>Full name</p>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={input}
                  style={inputStyle}
                />
              </div>

              <div>
                <p className={label}>Email address</p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={input}
                  style={inputStyle}
                />
              </div>

              <div>
                <p className={label}>Phone number</p>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className={input}
                  style={inputStyle}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="mt-1 w-full bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? "Sending…" : <>Request the portfolio <span aria-hidden="true">→</span></>}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
