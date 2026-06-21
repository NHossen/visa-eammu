"use client";

// app/student-visa/StudentVisaPageClient.jsx
// Main /student-visa page — country selector + visa status check

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const BASE = "https://api.eammu.com/api/v1";
const SITE = "https://visa.eammu.com";

// ── Static data ───────────────────────────────────────────────────────────────

const TOP_STUDY_DESTINATIONS = [
  { name: "Canada",        flag: "🇨🇦", note: "Study Permit required" },
  { name: "United Kingdom",flag: "🇬🇧", note: "Student visa (Tier 4)" },
  { name: "Australia",     flag: "🇦🇺", note: "Student visa (subclass 500)" },
  { name: "United States", flag: "🇺🇸", note: "F-1 / J-1 visa" },
  { name: "Germany",       flag: "🇩🇪", note: "National D visa" },
  { name: "Malaysia",      flag: "🇲🇾", note: "Student Pass" },
  { name: "Turkey",        flag: "🇹🇷", note: "Student residence permit" },
  { name: "Hungary",       flag: "🇭🇺", note: "Stipendium Hungaricum" },
  { name: "Poland",        flag: "🇵🇱", note: "National D visa" },
  { name: "Portugal",      flag: "🇵🇹", note: "Schengen student visa" },
  { name: "Japan",         flag: "🇯🇵", note: "College student visa" },
  { name: "South Korea",   flag: "🇰🇷", note: "D-2 student visa" },
];

const POPULAR_ROUTES = [
  { from: "Bangladesh", to: "Canada" },
  { from: "Bangladesh", to: "United Kingdom" },
  { from: "Bangladesh", to: "Malaysia" },
  { from: "Bangladesh", to: "Turkey" },
  { from: "Bangladesh", to: "Hungary" },
  { from: "India",      to: "United States" },
  { from: "India",      to: "Australia" },
  { from: "Pakistan",   to: "United Kingdom" },
  { from: "Nepal",      to: "Australia" },
  { from: "Nigeria",    to: "United Kingdom" },
];

const STATUS_META = {
  "visa required":   { color: "#DC2626", light: "#FEF2F2", label: "Visa Required",   slug: "visa-required"   },
  "e-visa":          { color: "#2563EB", light: "#EFF6FF", label: "E-Visa",           slug: "e-visa"          },
  "visa on arrival": { color: "#059669", light: "#ECFDF5", label: "Visa on Arrival",  slug: "visa-on-arrival" },
  "eta":             { color: "#7C3AED", light: "#F5F3FF", label: "ETA",              slug: "eta"             },
  "no admission":    { color: "#B45309", light: "#FFFBEB", label: "No Admission",     slug: "no-admission"    },
  "visa-free":       { color: "#0891B2", light: "#ECFEFF", label: "Visa Free",        slug: "visa-free"       },
};

const WHY_EAMMU = [
  { icon: "🎓", title: "Student Visa Specialists",     desc: "Dedicated student visa team with experience across 50+ destinations for Bangladeshi and South Asian students." },
  { icon: "📋", title: "Complete File Preparation",    desc: "We prepare every document from offer letter verification to financial proof and cover letter drafting." },
  { icon: "🌍", title: "4 Global Offices",             desc: "Bangladesh (Cumilla & Dhaka), Dubai UAE, and Yerevan Armenia — we serve students wherever you are." },
  { icon: "✅", title: "IATA Accredited",              desc: "Eammu Holidays is IATA-accredited with a proven track record of successful student visa applications." },
  { icon: "📞", title: "24/7 WhatsApp Support",        desc: "Our consultants are reachable on WhatsApp to guide you through every stage of your application." },
  { icon: "🔄", title: "Refusal Resubmission",         desc: "Had a student visa refused? We specialise in analysing refusal reasons and building stronger cases." },
];

const FAQS = [
  { q: "What is a student visa?",                    a: "A student visa is an official document that allows you to enter a foreign country specifically for the purpose of studying at a recognised educational institution. It is different from a tourist visa and usually requires an acceptance letter from your institution." },
  { q: "Do I need a student visa or can I study on a tourist visa?", a: "In most countries, studying on a tourist visa is illegal. If your course lasts more than a few weeks, you will need a proper student visa. Exceptions exist for very short courses." },
  { q: "What is the first step to get a student visa?", a: "The first step is getting an acceptance letter (offer letter) from a recognised institution in your destination country. Without this, most embassies will not process your student visa application." },
  { q: "How long does student visa processing take?", a: "Processing times vary by country: UK typically 3 weeks, Canada 8–12 weeks, Australia 4–6 weeks, USA 2–8 weeks. Always apply well in advance of your course start date." },
  { q: "Can I work while studying on a student visa?", a: "Many countries allow part-time work on a student visa (e.g. Canada allows 20 hours/week off-campus, UK allows up to 20 hours during term). Rules vary — check your destination country's specific regulations." },
  { q: "Does Eammu Holidays help with student visa applications?", a: "Yes. Eammu Holidays is an IATA-accredited travel and visa consultancy with offices in Bangladesh and UAE. We assist with document preparation, application submission, and follow-up for student visa applications across 50+ countries." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(str) {
  return (str || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function resolveStatus(raw) {
  if (!raw && raw !== 0) return null;
  const s = String(raw).trim().toLowerCase();
  if (/^\d+$/.test(s)) return { ...STATUS_META["visa-free"], label: `Visa-Free · ${s} days`, slug: "visa-free" };
  return STATUS_META[s] || STATUS_META[s.replace(/-/g, " ")] || STATUS_META[s.replace(/\s+/g, "-")] || null;
}

// ── Country suggest dropdown ──────────────────────────────────────────────────

function CountrySelect({ label, placeholder, value, onChange, excludeCode }) {
  const [query, setQuery]           = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen]             = useState(false);
  const [busy, setBusy]             = useState(false);
  const ref                         = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (query.length < 1) return;
    const t = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await fetch(`${BASE}/suggest?q=${encodeURIComponent(query)}&api_key=${API_KEY}`);
        const d = await r.json();
        setSuggestions((d.suggestions || []).filter((s) => s.code !== excludeCode));
        setOpen(true);
      } catch { setSuggestions([]); }
      finally { setBusy(false); }
    }, 200);
    return () => clearTimeout(t);
  }, [query, excludeCode]);

  const pick = (s) => { onChange(s); setQuery(""); setSuggestions([]); setOpen(false); };
  const clear = () => { onChange(null); setQuery(""); };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", borderRadius: 14, border: `2px solid ${value ? "#3b82f6" : "#e2e8f0"}`, background: "#fff", minHeight: 54, transition: "border-color 0.15s" }}>
        {value?.flag
          ? <img src={value.flag} alt="" style={{ width: 24, height: 16, objectFit: "cover", borderRadius: 3, flexShrink: 0 }} />
          : <span style={{ fontSize: 20, color: "#cbd5e1", flexShrink: 0 }}>🌍</span>
        }
        <input
          type="text"
          style={{ flex: 1, padding: "15px 0", background: "transparent", fontSize: 14, color: "#1e293b", outline: "none", border: "none", minWidth: 0 }}
          placeholder={placeholder}
          value={value ? value.name : query}
          onChange={(e) => { if (value) clear(); setQuery(e.target.value); }}
          onFocus={async () => {
            if (!value && query.length === 0) {
              setBusy(true);
              try {
                const r = await fetch(`${BASE}/suggest?q=a&api_key=${API_KEY}`);
                const d = await r.json();
                setSuggestions((d.suggestions || []).filter((s) => s.code !== excludeCode));
                setOpen(true);
              } catch {} finally { setBusy(false); }
            }
          }}
          autoComplete="off"
        />
        {busy && <span style={{ width: 16, height: 16, border: "2px solid #e2e8f0", borderTop: "2px solid #3b82f6", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />}
        {value && <button onClick={clear} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 20, padding: 2, flexShrink: 0 }}>×</button>}
      </div>
      {open && suggestions.length > 0 && (
        <ul style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.10)", zIndex: 200, maxHeight: 250, overflowY: "auto", padding: "6px 0", margin: 0, listStyle: "none" }}>
          {suggestions.map((s) => (
            <li key={s.code} onMouseDown={(e) => { e.preventDefault(); pick(s); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", fontSize: 13, color: "#334155" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              {s.flag && <img src={s.flag} alt="" style={{ width: 20, height: 13, objectFit: "cover", borderRadius: 2, flexShrink: 0 }} />}
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, marginTop: 14 }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: 0 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.45, flex: 1 }}>{q}</h3>
        <span style={{ color: "#2563eb", fontSize: 18, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>
      {open && <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, margin: "10px 0 0" }}>{a}</p>}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function StudentVisaPageClient() {
  const router  = useRouter();
  const [passport,     setPassport]     = useState(null);
  const [destination,  setDestination]  = useState(null);
  const [result,       setResult]       = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [popularData,  setPopularData]  = useState([]);

  // Load default: Bangladesh → Canada
  useEffect(() => {
    const fetchDefault = async (name) => {
      try {
        const r = await fetch(`${BASE}/suggest?q=${encodeURIComponent(name)}&api_key=${API_KEY}`);
        const d = await r.json();
        return (d.suggestions || []).find((s) => s.name.toLowerCase() === name.toLowerCase()) || null;
      } catch { return null; }
    };
    Promise.all([fetchDefault("Bangladesh"), fetchDefault("Canada")]).then(([pp, dd]) => {
      if (pp) setPassport(pp);
      if (dd) setDestination(dd);
    });
  }, []);

  // Load popular routes
  useEffect(() => {
    const load = async () => {
      const results = await Promise.all(
        POPULAR_ROUTES.slice(0, 6).map(async ({ from, to }) => {
          try {
            const r = await fetch(`${BASE}/passport?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&api_key=${API_KEY}`);
            if (!r.ok) return null;
            const d = await r.json();
            return { from: d.from, to: d.to, status: d.visa_status };
          } catch { return null; }
        })
      );
      setPopularData(results.filter(Boolean));
    };
    load();
  }, []);

  const check = async () => {
    if (!passport || !destination) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const r = await fetch(`${BASE}/passport?from=${encodeURIComponent(passport.name)}&to=${encodeURIComponent(destination.name)}&api_key=${API_KEY}`);
      if (!r.ok) throw new Error();
      setResult(await r.json());
    } catch { setError("Could not load visa data. Please try again."); }
    finally { setLoading(false); }
  };

  const goToDetail = () => {
    if (!result || !passport || !destination) return;
    const routeSlug  = `${slugify(passport.name)}-to-${slugify(destination.name)}`;
    const statusMeta = resolveStatus(result.visa_status);
    const statusSlug = statusMeta?.slug || "visa-required";
    router.push(`/student-visa/${routeSlug}/${statusSlug}`);
  };

  const goPopular = (from, to, status) => {
    const routeSlug  = `${slugify(from.name)}-to-${slugify(to.name)}`;
    const statusMeta = resolveStatus(status);
    const statusSlug = statusMeta?.slug || "visa-required";
    router.push(`/student-visa/${routeSlug}/${statusSlug}`);
  };

  const statusMeta = result ? resolveStatus(result.visa_status) : null;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f0f4ff 0%,#fafbff 55%,#f0f9ff 100%)" }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <div style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 60%,#0369a1 100%)", padding: "80px 20px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(0,0,0,0.08)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bfdbfe", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 14px", borderRadius: 999, marginBottom: 18 }}>
              🎓 Student Visa Guide 2026 — Powered by Eammu Holidays
            </span>
            <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.08 }}>
              Student Visa Requirements<br />
              <span style={{ color: "#93c5fd" }}>Check by Passport & Destination</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", margin: "0 0 32px", lineHeight: 1.75, maxWidth: 680 }}>
              Find out if you need a student visa, e-visa, or ETA for your study destination. Check your passport's entry status, then get the complete student visa guide with documents, fees, and step-by-step instructions.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, maxWidth: 640 }}>
              {[["50+","Study destinations covered"],["Free","No registration needed"],["Live Data","From Eammu API"],["IATA","Accredited consultancy"]].map(([v, l]) => (
                <div key={v} style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 14, padding: "14px 16px" }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{v}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.45, margin: 0 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 80px" }}>

          {/* ── CHECKER CARD ──────────────────────────────────────────────────── */}
          <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #e2e8f0", boxShadow: "0 4px 32px rgba(0,0,0,0.07)", padding: "32px 28px 28px", marginTop: -32, marginBottom: 32, position: "relative", zIndex: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563eb", marginBottom: 18 }}>🎓 Check Student Visa Status</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "end", marginBottom: 16 }}>
              <CountrySelect label="Your Passport / Nationality" placeholder="Select your country…" value={passport} onChange={setPassport} excludeCode={destination?.code} />
              <button
                onClick={() => { const t = passport; setPassport(destination); setDestination(t); setResult(null); }}
                title="Swap"
                style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 19, color: "#94a3b8", marginBottom: 2 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#94a3b8"; }}
              >⇄</button>
              <CountrySelect label="Study Destination Country" placeholder="Where do you want to study?" value={destination} onChange={setDestination} excludeCode={passport?.code} />
            </div>

            <button
              onClick={check}
              disabled={!passport || !destination || loading}
              style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none", cursor: passport && destination && !loading ? "pointer" : "not-allowed", background: passport && destination && !loading ? "#2563eb" : "#bfdbfe", color: passport && destination && !loading ? "#fff" : "#93c5fd", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              {loading
                ? <><span style={{ width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.35)", borderTop: "2.5px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Checking…</>
                : "Check Student Visa Status →"
              }
            </button>

            {error && <div style={{ marginTop: 14, padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, color: "#dc2626", fontSize: 13 }}>{error}</div>}

            {/* ── Result ── */}
            {result && statusMeta && (
              <div style={{ marginTop: 20, borderRadius: 18, border: `2px solid ${statusMeta.color}`, background: statusMeta.light, overflow: "hidden", animation: "fadeUp 0.3s ease" }}>
                {/* Passport covers row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "24px 28px 16px" }}>
                  {/* From */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    {result.from?.passport_cover
                      ? <img src={result.from.passport_cover} alt={result.from.name} style={{ width: 60, height: 85, objectFit: "cover", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", border: "2px solid #fff" }} />
                      : result.from?.flag && <img src={result.from.flag} alt={result.from.name} style={{ width: 40, height: 28, objectFit: "cover", borderRadius: 4 }} />
                    }
                    {result.from?.flag && <img src={result.from.flag} alt="" style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 3 }} />}
                    <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textAlign: "center", margin: 0 }}>{result.from?.name || passport?.name}</p>
                  </div>

                  {/* Status center */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 999, background: statusMeta.color, color: "#fff", whiteSpace: "nowrap" }}>
                      {statusMeta.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                      <div style={{ flex: 1, height: 1, background: statusMeta.color, opacity: 0.25 }} />
                      <span style={{ fontSize: 22, color: statusMeta.color }}>✈</span>
                      <div style={{ flex: 1, height: 1, background: statusMeta.color, opacity: 0.25 }} />
                    </div>
                    <p style={{ fontSize: 11, color: "#64748b", margin: 0, fontWeight: 600 }}>🎓 For Study Purposes</p>
                  </div>

                  {/* To */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    {result.to?.passport_cover
                      ? <img src={result.to.passport_cover} alt={result.to.name} style={{ width: 60, height: 85, objectFit: "cover", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", border: "2px solid #fff" }} />
                      : result.to?.flag && <img src={result.to.flag} alt={result.to.name} style={{ width: 40, height: 28, objectFit: "cover", borderRadius: 4 }} />
                    }
                    {result.to?.flag && <img src={result.to.flag} alt="" style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 3 }} />}
                    <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textAlign: "center", margin: 0 }}>{result.to?.name || destination?.name}</p>
                  </div>
                </div>

                {/* Note about tourist vs student visa */}
                <div style={{ padding: "0 24px 16px" }}>
                  <div style={{ padding: "10px 14px", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 10, fontSize: 12, color: "#1d4ed8", lineHeight: 1.6 }}>
                    ⚠️ <strong>Note:</strong> This shows your general passport entry status. For study purposes, a separate <strong>student visa</strong> is always required regardless of tourist visa status. Click below for the full student visa guide.
                  </div>
                </div>

                {/* CTA */}
                <div style={{ padding: "0 24px 22px" }}>
                  <button
                    onClick={goToDetail}
                    style={{ width: "100%", padding: "12px 0", borderRadius: 12, border: `2px solid ${statusMeta.color}`, background: "transparent", color: statusMeta.color, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = statusMeta.color; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = statusMeta.color; }}
                  >
                    View Full Student Visa Guide →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── TOP STUDY DESTINATIONS ───────────────────────────────────────── */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Top Study Destinations 2026</h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.7 }}>The most popular countries for international students. Select a destination above to check your specific visa status.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
              {TOP_STUDY_DESTINATIONS.map(({ name, flag, note }) => (
                <div key={name} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "16px 16px", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
                  onClick={() => {
                    const fetchAndSet = async () => {
                      const r = await fetch(`${BASE}/suggest?q=${encodeURIComponent(name)}&api_key=${API_KEY}`);
                      const d = await r.json();
                      const found = (d.suggestions || []).find(s => s.name.toLowerCase() === name.toLowerCase());
                      if (found) setDestination(found);
                    };
                    fetchAndSet();
                  }}
                >
                  <p style={{ fontSize: 24, margin: "0 0 8px" }}>{flag}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{name}</p>
                  <p style={{ fontSize: 11, color: "#2563eb", background: "#eff6ff", display: "inline-block", padding: "2px 8px", borderRadius: 999, margin: 0 }}>{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── POPULAR ROUTES ───────────────────────────────────────────────── */}
          {popularData.length > 0 && (
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Popular Student Routes</h2>
              <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.7 }}>Most searched passport and study destination combinations. Click any route for the full student visa guide.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
                {popularData.map((pair, i) => {
                  const meta = resolveStatus(pair.status);
                  return (
                    <button key={i} onClick={() => goPopular(pair.from, pair.to, pair.status)} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      {pair.from?.passport_cover
                        ? <img src={pair.from.passport_cover} alt={pair.from.name} style={{ width: 38, height: 54, objectFit: "cover", borderRadius: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.15)", flexShrink: 0 }} />
                        : pair.from?.flag && <img src={pair.from.flag} alt="" style={{ width: 32, height: 22, objectFit: "cover", borderRadius: 3, flexShrink: 0 }} />
                      }
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {pair.from?.name} → {pair.to?.name}
                        </p>
                        {meta && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: meta.light, color: meta.color }}>{meta.label}</span>}
                      </div>
                      {pair.to?.flag && <img src={pair.to.flag} alt="" style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 3, flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── WHY EAMMU ────────────────────────────────────────────────────── */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Why Choose Eammu Holidays for Student Visa?</h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.7 }}>IATA-accredited with offices in Bangladesh and UAE — we guide students from application to approval.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
              {WHY_EAMMU.map(({ icon, title, desc }) => (
                <div key={title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "20px 18px", display: "flex", gap: 14 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{title}</p>
                    <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "28px 26px", marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>Student Visa — Frequently Asked Questions</h2>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 4px", lineHeight: 1.6 }}>Common questions about student visas and how our checker works.</p>
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </section>

          {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
          <div style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e293b 100%)", borderRadius: 20, padding: "40px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, borderRadius: "50%", background: "rgba(37,99,235,0.15)", filter: "blur(60px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#60a5fa", marginBottom: 14 }}>Free Consultation</p>
              <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>Ready to Start Your Study Abroad Journey?</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 28px", lineHeight: 1.7, maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}>
                Our student visa experts will guide you from offer letter to embassy submission. Serving Bangladesh, Dubai UAE, and worldwide.
              </p>
              <a
                href="https://wa.me/8801631312524?text=Hello, I need help with a student visa application."
                target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", background: "#16a34a", color: "#fff", borderRadius: 14, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "background 0.15s" }}
              >
                💬 Apply via WhatsApp — Free Consultation
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}