import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Seraya Living — Fully serviced residences for extended stays in Dubai",
  description:
    "Fully serviced, fully furnished residences in Dubai for stays of 1 month or longer. Flexible lease terms, dedicated concierge, prime locations in Downtown, Marina and Business Bay.",
  keywords: [
    "furnished apartments Dubai",
    "extended stay Dubai",
    "serviced residences Dubai",
    "monthly rentals Dubai",
    "mid-term rentals Dubai",
    "corporate housing Dubai",
    "furnished rentals Dubai",
    "long stay apartments Dubai",
    "Downtown Dubai apartment",
    "Dubai Marina apartment",
  ],
  metadataBase: new URL("https://living.serayastays.com"),
  alternates: {
    canonical: "https://living.serayastays.com",
  },
  openGraph: {
    title: "Seraya Living — Fully serviced residences for extended stays in Dubai",
    description:
      "Fully serviced, fully furnished residences in Dubai for stays of 1 month or longer. Flexible lease terms, dedicated concierge, prime locations.",
    siteName: "Seraya Living",
    url: "https://living.serayastays.com",
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "https://living.serayastays.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Seraya Living — Fully serviced residences for extended stays in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seraya Living — Fully serviced residences for extended stays in Dubai",
    description:
      "Fully serviced, fully furnished residences in Dubai for stays of 1 month or longer.",
    images: ["https://living.serayastays.com/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Seraya Living",
  description: "Fully serviced, fully furnished residences in Dubai for stays of 1 month or longer. Flexible lease terms, dedicated concierge, prime locations.",
  url: "https://living.serayastays.com",
  logo: "https://living.serayastays.com/icon.png",
  image: "https://living.serayastays.com/og-image.jpg",
  telephone: "+971532841002",
  email: "hello@serayastays.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "City", name: "Dubai" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Fully furnished" },
    { "@type": "LocationFeatureSpecification", name: "Concierge service" },
    { "@type": "LocationFeatureSpecification", name: "Flexible lease terms" },
    { "@type": "LocationFeatureSpecification", name: "On-demand housekeeping" },
  ],
  priceRange: "AED 12,000 – 28,500 / month",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans">{children}<Analytics /></body>
    </html>
  );
}
