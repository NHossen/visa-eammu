"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const BASE    = "https://api.eammu.com/api/v1";

function slugify(str) {
  return (str || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const STATUS_META = {
  "visa required":   { color: "#DC2626", light: "#FEF2F2", label: "Visa Required",  slug: "visa-required"   },
  "e-visa":          { color: "#2563EB", light: "#EFF6FF", label: "E-Visa",          slug: "e-visa"          },
  "visa on arrival": { color: "#059669", light: "#ECFDF5", label: "Visa on Arrival", slug: "visa-on-arrival" },
  "eta":             { color: "#7C3AED", light: "#F5F3FF", label: "ETA",             slug: "eta"             },
  "no admission":    { color: "#B45309", light: "#FFFBEB", label: "No Admission",    slug: "no-admission"    },
  "visa-free":       { color: "#0891B2", light: "#ECFEFF", label: "Visa Free",       slug: "visa-free"       },
};

function resolveStatus(raw) {
  if (raw == null || raw === "") return null;
  const key = String(raw).trim().toLowerCase();
  if (/^\d+$/.test(key)) return { ...STATUS_META["visa-free"], label: `Visa-Free · ${key} days`, slug: "visa-free" };
  return STATUS_META[key] || STATUS_META[key.replace(/-/g, " ")] || STATUS_META[key.replace(/\s+/g, "-")] || null;
}

const STUDY_VISA_NOTE = {
  "visa-free":       "Even with visa-free travel access, a formal Study Permit or Student Visa is always required for full-time enrolment in any course.",
  "e-visa":          "An e-visa only permits tourism/short visits. To study full-time you must apply for a separate Student Visa before departure.",
  "visa-on-arrival": "Visa on arrival is for tourism only and cannot be converted to a student visa in most countries. Apply for a student visa before leaving.",
  "eta":             "An ETA only authorises transit or short visits. You must apply for a Student Visa to study full-time.",
  "visa-required":   "You need a visa to enter this country. For study purposes, you must specifically apply for a Student Visa — not a tourist visa.",
  "no-admission":    "Entry is currently restricted. Contact Eammu Holidays for advice on alternative pathways or third-country options.",
};

export default function StudentVisaCountryClient({ slug, passportName, destinationName }) {
  const router = useRouter();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true); setError("");
      try {
        const url = destinationName
          ? `${BASE}/passport?from=${encodeURIComponent(passportName)}&to=${encodeURIComponent(destinationName)}&api_key=${API_KEY}`
          : `${BASE}/passport?from=${encodeURIComponent(passportName)}&api_key=${API_KEY}`;
        const r = await fetch(url);
        if (!r.ok) throw new Error();
        setData(await r.json());
      } catch { setError("Could not load visa data. Please try again."); }
      finally { setLoading(false); }
    }
    load();
  }, [slug]);

  const meta = data ? resolveStatus(data.visa_status) : null;
  const isVisaFree = data && !meta && data.visa_status && !isNaN(Number(data.visa_status));
  const displayMeta = isVisaFree ? { ...STATUS_META["visa-free"], label: `Visa-Free · ${data.visa_status} days`, slug: "visa-free" } : meta;

  const goGuide = (statusSlug) => {
    router.push(`/student-visa/${slug}/${statusSlug}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${displayMeta?.color || "#065f46"} 0%, ${displayMeta?.color || "#047857"}bb 100%)`, padding: "80px 20px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(60px)" }} />
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 20, flexWrap: "wrap" }}>
            <Link href="/student-visa" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Student Visa</Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{passportName}{destinationName ? ` → ${destinationName}` : ""}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            {data?.from?.flag && <img src={data.from.flag} alt="" style={{ width: 48, height: 32, objectFit: "cover", borderRadius: 6, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }} />}
            {destinationName && <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 24 }}>→</span>}
            {data?.to?.flag && <img src={data.to.flag} alt="" style={{ width: 48, height: 32, objectFit: "cover", borderRadius: 6, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }} />}
          </div>
          <h1 style={{ fontSize: "clamp(22px,3.5vw,40px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.1 }}>
            {destinationName
              ? `${passportName} Student Visa for ${destinationName}`
              : `${passportName} Passport — Student Visa Requirements`}
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", margin: 0, lineHeight: 1.65 }}>
            {destinationName
              ? `Complete student visa guide for ${passportName} citizens planning to study in ${destinationName}. Requirements, fees, and expert assistance from Eammu Holidays.`
              : `Explore study visa requirements for ${passportName} passport holders across all destinations.`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 80px" }}>

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[1,2,3,4].map(i => <div key={i} style={{ height: 80, borderRadius: 14, background: "#e2e8f0", animation: "pulse 1.5s infinite" }} />)}
          </div>
        )}

        {error && <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, color: "#dc2626", marginBottom: 24 }}>{error}</div>}

        {data && displayMeta && (
          <>
            {/* Status card */}
            <div style={{ background: "#fff", borderRadius: 20, border: `2px solid ${displayMeta.color}`, marginBottom: 24, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", background: displayMeta.light, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {data.from?.passport_cover && <img src={data.from.passport_cover} alt="" style={{ width: 44, height: 62, objectFit: "cover", borderRadius: 8, boxShadow: "0 4px 14px rgba(0,0,0,0.2)", border: "2px solid #fff" }} />}
                  {data.from?.flag && <img src={data.from.flag} alt="" style={{ width: 28, height: 18, objectFit: "cover", borderRadius: 3 }} />}
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{data.from?.name || passportName}</span>
                </div>
                <span style={{ fontSize: 22, color: displayMeta.color }}>✈</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {data.to?.passport_cover && <img src={data.to.passport_cover} alt="" style={{ width: 44, height: 62, objectFit: "cover", borderRadius: 8, boxShadow: "0 4px 14px rgba(0,0,0,0.2)", border: "2px solid #fff" }} />}
                  {data.to?.flag && <img src={data.to.flag} alt="" style={{ width: 28, height: 18, objectFit: "cover", borderRadius: 3 }} />}
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{data.to?.name || destinationName}</span>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 18px", borderRadius: 999, background: displayMeta.color, color: "#fff" }}>
                  {displayMeta.label}
                </span>
              </div>
              {/* Student visa note */}
              <div style={{ padding: "16px 24px 20px" }}>
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#92400e", lineHeight: 1.65 }}>
                  <strong>📚 Important:</strong> {STUDY_VISA_NOTE[displayMeta.slug] || STUDY_VISA_NOTE["visa-required"]}
                </div>
                <button onClick={() => goGuide(displayMeta.slug)}
                  style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: `2px solid ${displayMeta.color}`, background: displayMeta.color, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  View Full Student Visa Guide →
                </button>
              </div>
            </div>

            {/* All guide types */}
            {destinationName && (
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", padding: "24px", marginBottom: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 16px" }}>Explore All Student Visa Types for {destinationName}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
                  {Object.entries(STATUS_META).map(([, m]) => (
                    <button key={m.slug} onClick={() => goGuide(m.slug)}
                      style={{ padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${m.color}22`, background: m.light, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = `0 4px 14px ${m.color}22`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = `${m.color}22`; e.currentTarget.style.boxShadow = "none"; }}>
                      <p style={{ fontSize: 12, fontWeight: 800, color: m.color, margin: "0 0 4px" }}>{m.label}</p>
                      <p style={{ fontSize: 11, color: "#64748b", margin: 0, lineHeight: 1.4 }}>View student visa requirements →</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SEO content */}
            <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", padding: "28px" }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 16px" }}>
                {destinationName ? `${passportName} Student Visa for ${destinationName} — Complete Guide 2026` : `${passportName} Passport Student Visa Requirements`}
              </h2>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.8, display: "grid", gap: 14 }}>
                {destinationName && <>
                  <p>{passportName} citizens planning to study in {destinationName} must obtain a formal Student Visa or Study Permit before enrolment in any full-time course lasting more than a few months. The general travel visa status shown above does not authorise study — a separate study permit is always required.</p>
                  <p>Key requirements for a {destinationName} student visa include a valid acceptance letter from a recognised institution, proof of sufficient funds to cover tuition and living expenses, English language test scores (IELTS/TOEFL), a valid passport, and a completed visa application with supporting documents.</p>
                  <p>Eammu Holidays — IATA accredited, with offices in Cumilla, Dhaka, Dubai, and Yerevan — provides end-to-end student visa support for {passportName} citizens. Our team handles university shortlisting, Statement of Purpose (SOP) writing, document verification, and embassy submission.</p>
                </>}
              </div>
              <Link href="/student-visa"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: 13, fontWeight: 600, color: "#10b981", textDecoration: "none" }}>
                ← Back to Student Visa Checker
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}