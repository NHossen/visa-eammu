// app/student-visa/[slug]/page.jsx
// e.g. /student-visa/bangladesh-to-canada
import { Suspense } from "react";
import StudentVisaCountryClient from "./Studentvisacountryclient";


const SITE_URL = "https://eammu.com";

function parseSlug(raw) {
  const s = decodeURIComponent(raw || "");
  const toTitle = t => t.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const m = s.match(/^(.+?)-to-(.+)$/);
  if (m) return { passport: toTitle(m[1]), destination: toTitle(m[2]) };
  return { passport: toTitle(s), destination: null };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { passport, destination } = parseSlug(slug);
  return {
    title: destination
      ? `${passport} Student Visa for ${destination} — Requirements & Guide 2026 | Eammu Holidays`
      : `${passport} Passport — Student Visa Requirements | Eammu Holidays`,
    description: destination
      ? `Complete student visa guide for ${passport} citizens studying in ${destination}. Requirements, IELTS scores, fees, processing times, and step-by-step application process.`
      : `Student visa requirements for ${passport} passport holders across all study destinations.`,
    alternates: { canonical: `${SITE_URL}/student-visa/${slug}` },
    openGraph: {
      title: destination ? `${passport} Student Visa for ${destination} | Eammu Holidays` : `${passport} — Student Visa Requirements`,
      description: `Study visa requirements, documents, fees and expert guidance for ${passport} citizens.`,
      url: `${SITE_URL}/student-visa/${slug}`,
      siteName: "Eammu Holidays",
    },
  };
}

export default async function StudentVisaCountryPage({ params }) {
  const { slug } = await params;
  const { passport, destination } = parseSlug(slug);
  return (
    <Suspense fallback={null}>
      <StudentVisaCountryClient slug={slug} passportName={passport} destinationName={destination} />
    </Suspense>
  );
}