import LogoImage from "./LogoImage";

const WA_URL =
  "https://wa.me/13322841002?text=Hi%2C%20I%27m%20interested%20in%20Seraya%20Living";

export default function Footer() {
  return (
    <footer className="bg-brand-body text-white py-12 pb-36 md:pb-12">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <div>
            <LogoImage width={120} height={48} invertToWhite />
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 font-sans text-sm text-white/80">
            <a
              href="mailto:hello@serayastays.com"
              className="hover:text-white transition-colors"
            >
              hello@serayastays.com
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp us
            </a>
            <a
              href="https://booking.serayastays.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Visit Seraya Stays →
            </a>
            <a
              href="https://www.instagram.com/serayastays/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seraya on Instagram"
              className="hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="font-sans text-xs text-white/40">
            © 2026 Seraya Living. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
