import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seraya Living — Flexible Luxury Living in Dubai",
  description:
    "Fully serviced luxury apartments in Dubai for extended stays of 1–12 months. No yearly lease required. Prime locations, utilities included, concierge support.",
  openGraph: {
    title: "Seraya Living — Flexible Luxury Living in Dubai",
    description:
      "Fully serviced luxury apartments in Dubai for extended stays of 1–12 months.",
    siteName: "Seraya Living",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
