// app/student-visa/[slug]/[statusSlug]/page.jsx
// e.g. /student-visa/bangladesh-to-canada/visa-required
import { Suspense } from "react";
import StudentVisaGuideClient from "./Studentvisaguideclient";


const SITE_URL = "https://eammu.com";

function parseSlug(raw) {
  const s = decodeURIComponent(raw || "");
  const toTitle = t => t.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const m = s.match(/^(.+?)-to-(.+)$/);
  if (m) return { passport: toTitle(m[1]), destination: toTitle(m[2]) };
  return { passport: toTitle(s), destination: null };
}

const STATUS_LABELS = {
  "visa-required":   "Student Visa Required",
  "e-visa":          "E-Visa for Study",
  "visa-on-arrival": "Visa on Arrival (Study)",
  "eta":             "ETA for Study",
  "visa-free":       "Visa-Free Study Access",
  "no-admission":    "No Admission",
};

export async function generateMetadata({ params }) {
  const { slug, statusSlug } = await params;
  const { passport, destination } = parseSlug(slug);
  const statusLabel = STATUS_LABELS[statusSlug] || "Student Visa Guide";
  return {
    title: destination
      ? `${passport} Student Visa for ${destination} — ${statusLabel} Guide 2026 | Eammu Holidays`
      : `${statusLabel} — Student Visa Guide | Eammu Holidays`,
    description: destination
      ? `Complete ${statusLabel} guide for ${passport} citizens studying in ${destination}. Documents, fees, processing time, IELTS requirements, SOP tips, and expert assistance.`
      : `${statusLabel} student visa guide with requirements, fees, and step-by-step application process.`,
    alternates: { canonical: `${SITE_URL}/student-visa/${slug}/${statusSlug}` },
    openGraph: {
      title: destination ? `${passport} → ${destination} ${statusLabel} | Eammu Holidays` : `${statusLabel} Student Visa`,
      description: `Study visa requirements and expert guidance for ${passport} citizens.`,
      url: `${SITE_URL}/student-visa/${slug}/${statusSlug}`,
      siteName: "Eammu Holidays",
    },
  };
}

export default async function StudentVisaGuidePage({ params }) {
  const { slug, statusSlug } = await params;
  const { passport, destination } = parseSlug(slug);
  return (
    <Suspense fallback={null}>
      <StudentVisaGuideClient
        slug={slug}
        statusSlug={statusSlug}
        passportName={passport}
        destinationName={destination}
      />

    </Suspense>

  );
}