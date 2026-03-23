import LogoImage from "./LogoImage";

const WA_URL =
  "https://wa.me/13322841002?text=Hi%2C%20I%27m%20interested%20in%20Seraya%20Living";

export default function Footer() {
  return (
    <footer className="bg-brand-body text-white py-12">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <div>
            <LogoImage width={120} height={48} invertToWhite />
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-sans text-sm text-white/80">
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
