"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LogoImage from "./LogoImage";

const WA_URL =
  "https://wa.me/13322841002?text=Hi%2C%20I%27m%20interested%20in%20Seraya%20Living";

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            className={`font-sans text-[13px] font-medium uppercase tracking-widest ${textColor} px-5 py-2.5 hover:bg-brand-cta/20 transition-colors duration-200`}
          >
            Discover residences
          </a>

          <a href="#" className="flex items-center">
            <LogoImage width={120} height={44} invertToWhite={isTransparent} />
          </a>

          <div className="relative group">
            <button className={`font-sans text-[13px] font-medium uppercase tracking-widest ${textColor} px-5 py-2.5 bg-transparent hover:bg-brand-cta/20 transition-colors duration-200`}>
              Contact us
            </button>
            <div className="absolute right-0 top-full w-40 bg-brand-bg shadow-[0_8px_32px_rgba(45,23,15,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
          <a href="#" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <LogoImage width={90} height={34} invertToWhite={isTransparent} />
          </a>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={textColor}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={textColor}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-brand-bg border-t border-brand-body/10 px-6 py-4 flex flex-col gap-4">
          <a
            href="#residences"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-sm text-brand-heading"
          >
            Discover residences
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-sm text-brand-heading"
          >
            WhatsApp
          </a>
          <a
            href="mailto:hello@serayastays.com"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-sm text-brand-heading"
          >
            E-mail
          </a>
        </div>
      )}
    </nav>
  );
}
