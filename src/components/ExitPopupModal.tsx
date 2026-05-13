"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { track } from "@vercel/analytics";

interface ExitPopupModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

const label = "block font-sans text-[10px] font-medium text-brand-body/50 uppercase tracking-widest mb-1.5";
const inputBase = "w-full bg-white font-sans text-base text-brand-body placeholder-brand-body/40 rounded-none px-4 py-3 outline-none focus:ring-1 focus:ring-brand-accent/50";
const inputStyleOk = { border: "1px solid rgba(199, 117, 87, 0.5)" } as const;
const inputStyleErr = { border: "1px solid #B00020" } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

export default function ExitPopupModal({ open, onClose, onSubmitted }: ExitPopupModalProps) {
  const headingId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const pushedStateRef = useRef(false);

  const validate = useCallback((fields?: Partial<{ name: string; email: string; phone: string }>) => {
    const v = { name, email, phone, ...fields };
    const next: Errors = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!v.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(v.email.trim())) next.email = "Please enter a valid email.";
    if (!v.phone.trim()) next.phone = "Please enter your phone number.";
    return next;
  }, [name, email, phone]);

  // Mount / unmount with slide animation. Entrance animation requires setState
  // in effect (mount → next frame → animate); the rule is a perf hint, not a bug.
  useEffect(() => {
    if (open && !mounted) {
      previousFocusRef.current = document.activeElement;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      try { track("exit_popup_shown"); } catch {}
      if (!pushedStateRef.current) {
        window.history.pushState({ serayaExitPopup: true }, "");
        pushedStateRef.current = true;
      }
    } else if (!open && mounted) {
      setVisible(false);
      const t = window.setTimeout(() => {
        setMounted(false);
        setName(""); setEmail(""); setPhone("");
        setErrors({}); setTouched({});
        setSubmitting(false); setSubmitted(false);
      }, 260);
      const prev = previousFocusRef.current;
      if (prev instanceof HTMLElement) {
        try { prev.focus({ preventScroll: true }); } catch { prev.focus(); }
      }
      return () => window.clearTimeout(t);
    }
  }, [open, mounted]);

  // Pop the history state we pushed when modal closes
  useEffect(() => {
    if (!mounted && pushedStateRef.current) {
      // History was either popped by user (back button) or we need to clean up
      // If still on our pushed state, go back to remove it
      if (typeof window !== "undefined" && window.history.state?.serayaExitPopup) {
        window.history.back();
      }
      pushedStateRef.current = false;
    }
  }, [mounted]);

  const handleDismiss = useCallback(() => {
    if (!submitted) {
      try { track("exit_popup_dismissed"); } catch {}
    }
    onClose();
  }, [submitted, onClose]);

  // popstate (back button) closes modal
  useEffect(() => {
    if (!mounted) return;
    const onPop = () => {
      pushedStateRef.current = false; // user already popped our state
      handleDismiss();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [mounted, handleDismiss]);

  // Focus the heading on open for screen readers
  useEffect(() => {
    if (visible && !submitted) {
      headingRef.current?.focus();
    }
  }, [visible, submitted]);

  // Focus trap + ESC
  useEffect(() => {
    if (!mounted) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleDismiss();
        return;
      }
      if (e.key !== "Tab") return;
      const container = containerRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mounted, handleDismiss]);

  // Auto-close 4s after success
  useEffect(() => {
    if (!submitted) return;
    const t = window.setTimeout(() => onClose(), 4_000);
    return () => window.clearTimeout(t);
  }, [submitted, onClose]);

  const handleBlur = (field: "name" | "email" | "phone") => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setTouched({ name: true, email: true, phone: true });
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          whatsapp: phone.trim(),
          source: "exit_popup",
        }),
      });
      try { track("exit_popup_submitted"); } catch {}
    } catch {
      // Non-blocking; show success regardless (silent failure preferable to user-blocking error here)
    }
    setSubmitting(false);
    setSubmitted(true);
    onSubmitted?.();
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none"
      aria-hidden={!visible}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 pointer-events-auto ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={handleDismiss}
      />

      {/* Sheet */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className={`relative bg-brand-bg w-full max-w-xl pointer-events-auto transition-transform duration-[260ms] ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ boxShadow: "0 -8px 32px rgba(45, 23, 15, 0.18)" }}
      >
        <div className="px-6 pt-7 pb-7 sm:px-8 sm:pt-8 sm:pb-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                className="font-serif text-2xl font-medium text-brand-heading outline-none"
              >
                {submitted ? "Thank you." : "See the full portfolio."}
              </h2>
              {!submitted && (
                <p className="font-sans text-sm text-brand-body/60 mt-2 leading-relaxed">
                  Leave your details and we&apos;ll send it your way.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close"
              className="mt-1 w-9 h-9 flex items-center justify-center rounded-none hover:bg-brand-bg-alt transition-colors flex-none"
            >
              <X size={18} strokeWidth={1.5} className="text-brand-body/50" />
            </button>
          </div>

          {/* Body */}
          {submitted ? (
            <div className="flex flex-col items-start py-2">
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{ border: "1px solid rgba(199, 117, 87, 0.4)", background: "rgba(199, 117, 87, 0.06)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18" className="text-brand-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-sans text-sm text-brand-body/70 leading-relaxed">
                We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <label htmlFor={`${headingId}-name`} className={label}>Name</label>
                <input
                  id={`${headingId}-name`}
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (touched.name) setErrors(validate({ name: e.target.value }));
                  }}
                  onBlur={() => handleBlur("name")}
                  placeholder="Your name"
                  className={inputBase}
                  style={touched.name && errors.name ? inputStyleErr : inputStyleOk}
                  aria-invalid={!!(touched.name && errors.name)}
                  aria-describedby={touched.name && errors.name ? `${headingId}-name-err` : undefined}
                />
                {touched.name && errors.name && (
                  <p id={`${headingId}-name-err`} className="font-sans text-xs mt-1.5" style={{ color: "#B00020" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${headingId}-phone`} className={label}>Phone</label>
                <input
                  id={`${headingId}-phone`}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (touched.phone) setErrors(validate({ phone: e.target.value }));
                  }}
                  onBlur={() => handleBlur("phone")}
                  placeholder="+971 50 123 4567"
                  className={inputBase}
                  style={touched.phone && errors.phone ? inputStyleErr : inputStyleOk}
                  aria-invalid={!!(touched.phone && errors.phone)}
                  aria-describedby={touched.phone && errors.phone ? `${headingId}-phone-err` : undefined}
                />
                {touched.phone && errors.phone && (
                  <p id={`${headingId}-phone-err`} className="font-sans text-xs mt-1.5" style={{ color: "#B00020" }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${headingId}-email`} className={label}>Email</label>
                <input
                  id={`${headingId}-email`}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) setErrors(validate({ email: e.target.value }));
                  }}
                  onBlur={() => handleBlur("email")}
                  placeholder="you@email.com"
                  className={inputBase}
                  style={touched.email && errors.email ? inputStyleErr : inputStyleOk}
                  aria-invalid={!!(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? `${headingId}-email-err` : undefined}
                />
                {touched.email && errors.email && (
                  <p id={`${headingId}-email-err`} className="font-sans text-xs mt-1.5" style={{ color: "#B00020" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full bg-brand-cta text-white font-sans font-medium text-sm py-4 rounded-none hover:bg-[#3D2710] disabled:opacity-40 transition-colors flex items-center justify-center"
              >
                {submitting ? "Sending…" : "Send"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
