"use client";

import { useEffect, useRef, useState } from "react";
import LogoImage from "./LogoImage";

const WA_URL =
  "https://wa.me/13322841002?text=Hi%2C%20I%27m%20interested%20in%20Seraya%20Living";

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const mobileContactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileContactRef.current && !mobileContactRef.current.contains(e.target as Node)) {
        setMobileContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = transparent && !scrolled;
  const textColor = isTransparent ? "text-white" : "text-brand-heading";
  const logoFilter = isTransparent ? "brightness(0) invert(1)" : "none";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-brand-bg shadow-sm"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between h-16">
          <a
            href="#residences"
            className={`font-sans text-[13px] font-medium uppercase tracking-widest ${textColor} -ml-5 px-5 py-2.5 hover:bg-brand-cta/20 transition-colors duration-200`}
          >
            Discover residences
          </a>

          <a href="#" className="flex items-center">
            <LogoImage width={120} height={44} invertToWhite={isTransparent} />
          </a>

          <div className="relative group">
            <button className={`font-sans text-[13px] font-medium uppercase tracking-widest ${textColor} -mr-5 px-5 py-2.5 bg-transparent hover:bg-brand-cta/20 transition-colors duration-200`}>
              Contact us
            </button>
            <div className="absolute left-0 right-0 top-full bg-brand-bg shadow-[0_8px_32px_rgba(45,23,15,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 font-sans text-sm text-brand-body hover:bg-brand-bg-alt transition-colors duration-150 text-center"
              >
                WhatsApp
              </a>
              <a
                href="mailto:hello@serayastays.com"
                className="block px-4 py-3 font-sans text-sm text-brand-body hover:bg-brand-bg-alt transition-colors duration-150 text-center"
              >
                E-mail
              </a>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="relative flex md:hidden items-center justify-between h-14">
          <a
            href="#residences"
            className={`font-sans text-[11px] font-medium uppercase tracking-widest ${textColor} hover:opacity-50 transition-opacity duration-200`}
          >
            Residences
          </a>

          <a href="#" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <LogoImage width={90} height={34} invertToWhite={isTransparent} />
          </a>

          <div ref={mobileContactRef} className="relative">
            <button
              onClick={() => setMobileContactOpen(!mobileContactOpen)}
              className={`font-sans text-[11px] font-medium uppercase tracking-widest ${textColor} px-2 py-2 bg-transparent hover:bg-brand-cta/20 transition-colors duration-200`}
            >
              Contact
            </button>
            {mobileContactOpen && (
              <div
                className="absolute right-0 top-full w-36 bg-brand-bg z-50"
                style={{ boxShadow: "0 8px 32px rgba(45,23,15,0.12)", border: "1px solid rgba(199,117,87,0.2)" }}
              >
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileContactOpen(false)}
                  className="block px-4 py-3 font-sans text-sm text-brand-body hover:bg-brand-bg-alt transition-colors text-center"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:hello@serayastays.com"
                  onClick={() => setMobileContactOpen(false)}
                  className="block px-4 py-3 font-sans text-sm text-brand-body hover:bg-brand-bg-alt transition-colors text-center"
                >
                  E-mail
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
