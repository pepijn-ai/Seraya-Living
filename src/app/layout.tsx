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
    images: [
      {
        url: "https://res.cloudinary.com/dce1arrhg/image/upload/w_1200,h_630,c_fill,g_auto,f_auto,q_auto/seraya/units/unit-47/listing/web/Downtown%20Views%20II_T1_1901%28Web%29-51",
        width: 1200,
        height: 630,
        alt: "Seraya Living — Flexible Luxury Living in Dubai",
      },
    ],
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
