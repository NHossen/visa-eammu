import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://visa.eammu.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Eammu: Travel Agency dubai",
  },
  description:
    "Eammu Holidays – trusted travel agency in Dubai offering visa check, visa on arrival, tourist visa, student visa & holiday packages to USA, Europe, UK, Schengen, India and worldwide. Fast, reliable, expert guidance.",
  keywords: [
    "visa checker",
    "travel agency Dubai",
    "Eammu Holidays",
    "tourist visa",
    "Schengen visa",
    "USA visa",
    "Europe visa",
    "UK visa",
    "India visa",
    "visa on arrival",
    "passport visa requirements",
    "holiday packages Dubai",
    "Bangladesh travel agency",
    "visa consultancy",
    "online visa check",
  ],
  authors: [{ name: "Eammu Holidays", url: BASE_URL }],
  creator: "Eammu Holidays",
  publisher: "Eammu Holidays",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": `${BASE_URL}/en-US`,
      "en-AE": `${BASE_URL}/en-AE`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: BASE_URL,
    siteName: "Eammu Holidays",
    title: "Visa Checker & Travel Services | Eammu Holidays",
    description:
      "Check visa requirements for 200+ countries instantly. Eammu Holidays – Dubai's trusted travel & visa consultancy. UAE, USA, Schengen, UK, India & more.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Eammu Holidays – Visa Checker & Travel Agency Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Checker & Travel Services | Eammu Holidays",
    description:
      "Check visa requirements for 200+ countries. Dubai travel agency offering tourist, student & Schengen visa services.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@eammuholidays",
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN",
    // yandex: "YOUR_YANDEX_TOKEN",
    // bing: "YOUR_BING_TOKEN",
  },
  category: "travel",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Eammu Holidays",
  url: "https://www.eammu.com",
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  description:
    "Eammu Holidays is a Dubai-based travel agency providing visa check, visa consultancy, and holiday packages for UAE, USA, Europe, UK, Schengen, India, and worldwide destinations.",
  foundingLocation: {
    "@type": "Place",
    name: "Dubai, UAE",
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Cumilla",
      addressCountry: "BD",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Bengali", "Arabic"],
  },
  sameAs: [
    "https://www.eammu.com",
    "https://visa.eammu.com",
    // Add Facebook, Instagram, LinkedIn URLs here
  ],
  areaServed: ["AE", "BD", "US", "GB", "IN", "EU"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Visa & Travel Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Visa Checker" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tourist Visa Assistance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Student Visa Assistance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Schengen Visa Assistance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Holiday Packages" } },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Eammu Holidays Visa Checker",
  url: BASE_URL,
  description: "Free visa checker tool for 200+ countries. Powered by Eammu Holidays, Dubai.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/visa-checker?from={passport}&to={destination}`,
    },
    "query-input": "required name=passport required name=destination",
  },
  publisher: {
    "@type": "Organization",
    name: "Eammu Holidays",
    url: "https://www.eammu.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href={BASE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a1628" />
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TopNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}