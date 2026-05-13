"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "seraya-exit-popup-fired";
const MOBILE_QUERY = "(max-width: 768px)";

interface UseExitIntentOptions {
  /** CSS selector for the scroll-threshold element (e.g. the portfolio CTA). */
  targetSelector: string;
  /** ms to wait after threshold cross before firing. */
  delayAfterCross?: number;
  /** ms minimum since page load before firing. */
  minDelayFromLoad?: number;
  /** Skip mobile-only gate (used by future desktop trigger). */
  ignoreViewport?: boolean;
}

interface UseExitIntentResult {
  open: boolean;
  dismiss: () => void;
  markEngaged: () => void;
  markSubmitted: () => void;
}

export function useExitIntent({
  targetSelector,
  delayAfterCross = 20_000,
  minDelayFromLoad = 8_000,
  ignoreViewport = false,
}: UseExitIntentOptions): UseExitIntentResult {
  const [open, setOpen] = useState(false);
  const engagedRef = useRef(false);
  const submittedRef = useRef(false);
  const firedRef = useRef(false);
  const crossedAtRef = useRef<number | null>(null);
  const mountedAtRef = useRef<number>(0);

  const markEngaged = useCallback(() => {
    engagedRef.current = true;
  }, []);
  const markSubmitted = useCallback(() => {
    submittedRef.current = true;
  }, []);
  const dismiss = useCallback(() => {
    firedRef.current = true;
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    setOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    mountedAtRef.current = Date.now();

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        firedRef.current = true;
        return;
      }
    } catch {}

    if (!ignoreViewport && !window.matchMedia(MOBILE_QUERY).matches) return;

    let timer: number | null = null;

    const cancelFire = () => {
      if (timer != null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    const check = () => {
      timer = null;
      if (firedRef.current) return;
      if (engagedRef.current || submittedRef.current) return;
      if (crossedAtRef.current == null) return;

      const elapsedFromCross = Date.now() - crossedAtRef.current;
      const elapsedFromLoad = Date.now() - mountedAtRef.current;
      if (elapsedFromCross < delayAfterCross || elapsedFromLoad < minDelayFromLoad) {
        const wait = Math.max(
          delayAfterCross - elapsedFromCross,
          minDelayFromLoad - elapsedFromLoad
        );
        timer = window.setTimeout(check, wait);
        return;
      }

      const active = document.activeElement;
      const tag = active?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        timer = window.setTimeout(check, 2_000);
        return;
      }

      firedRef.current = true;
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      setOpen(true);
    };

    const scheduleFire = () => {
      cancelFire();
      const elapsedFromCross = crossedAtRef.current
        ? Date.now() - crossedAtRef.current
        : 0;
      const elapsedFromLoad = Date.now() - mountedAtRef.current;
      const wait = Math.max(
        delayAfterCross - elapsedFromCross,
        minDelayFromLoad - elapsedFromLoad,
        0
      );
      timer = window.setTimeout(check, wait);
    };

    let observer: IntersectionObserver | null = null;
    const attach = () => {
      const target = document.querySelector(targetSelector);
      if (!target) return false;
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          const past = entry.boundingClientRect.bottom < 0;
          if (past) {
            if (crossedAtRef.current == null) {
              crossedAtRef.current = Date.now();
              scheduleFire();
            }
          } else if (entry.isIntersecting) {
            crossedAtRef.current = null;
            cancelFire();
          }
        },
        { threshold: 0 }
      );
      observer.observe(target);
      return true;
    };

    // Target may not exist on first render (lazy hydration); retry briefly.
    if (!attach()) {
      const retry = window.setInterval(() => {
        if (attach()) window.clearInterval(retry);
      }, 250);
      window.setTimeout(() => window.clearInterval(retry), 5_000);
    }

    return () => {
      cancelFire();
      observer?.disconnect();
    };
  }, [targetSelector, delayAfterCross, minDelayFromLoad, ignoreViewport]);

  return { open, dismiss, markEngaged, markSubmitted };
}
