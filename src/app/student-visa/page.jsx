// app/student-visa/page.jsx
// /student-visa — Main landing page
// Site: visa.eammu.com

import { Suspense } from "react";
import StudentVisaPageClient from "./StudentVisaPageClient";

export const metadata = {
  title: "Student Visa Guide 2026 — Check Requirements by Passport & Destination | Visa Express",
  description:
    "Check student visa requirements for your passport and destination country. Find out if you need a student visa, e-visa, or ETA for studying abroad. Powered by Eammu Holidays — IATA-accredited visa consultancy.",
  keywords: [
    "student visa requirements",
    "student visa check by passport",
    "study abroad visa",
    "student visa Bangladesh",
    "student visa guide 2026",
    "international student visa",
    "study in Canada visa",
    "study in UK visa",
    "study in Australia visa",
    "Eammu Holidays student visa",
  ].join(", "),
  alternates: { canonical: "https://visa.eammu.com/student-visa" },
  openGraph: {
    title: "Student Visa Guide 2026 — Check by Passport & Destination",
    description:
      "Instantly check student visa requirements for your nationality and destination. Expert guidance from Eammu Holidays.",
    url: "https://visa.eammu.com/student-visa",
    siteName: "Visa Express Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Visa Guide 2026 | Visa Express Hub",
    description: "Check student visa requirements by passport and destination country.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Student Visa Guide 2026",
  description:
    "Check student visa requirements for any passport and destination country. Powered by Eammu Holidays.",
  url: "https://visa.eammu.com/student-visa",
  publisher: {
    "@type": "Organization",
    name: "Eammu Holidays",
    url: "https://eammu.com",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://visa.eammu.com" },
      { "@type": "ListItem", position: 2, name: "Student Visa", item: "https://visa.eammu.com/student-visa" },
    ],
  },
};

export default function StudentVisaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <StudentVisaPageClient />
      </Suspense>
    </>
  );
}