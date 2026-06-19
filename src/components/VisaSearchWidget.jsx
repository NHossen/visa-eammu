"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeftRight, X, Clock, Search } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const RECENT_KEY  = "visa_recent_countries";
const MAX_RECENT  = 5;

// Shown immediately on focus (before any typing)
const POPULAR_COUNTRIES = [
  { code: "BD", name: "Bangladesh",     flag: "https://flagcdn.com/w80/bd.png" },
  { code: "PK", name: "Pakistan",       flag: "https://flagcdn.com/w80/pk.png" },
  { code: "IN", name: "India",          flag: "https://flagcdn.com/w80/in.png" },
  { code: "NG", name: "Nigeria",        flag: "https://flagcdn.com/w80/ng.png" },
  { code: "PH", name: "Philippines",    flag: "https://flagcdn.com/w80/ph.png" },
  { code: "CA", name: "Canada",         flag: "https://flagcdn.com/w80/ca.png" },
  { code: "GB", name: "United Kingdom", flag: "https://flagcdn.com/w80/gb.png" },
  { code: "US", name: "United States",  flag: "https://flagcdn.com/w80/us.png" },
  { code: "AU", name: "Australia",      flag: "https://flagcdn.com/w80/au.png" },
  { code: "DE", name: "Germany",        flag: "https://flagcdn.com/w80/de.png" },
];

const VISA_STATUS_META = {
  "visa required":   { color: "#DC2626", light: "#FFF5F5", label: "Visa Required",   slug: "visa-required"   },
  "e-visa":          { color: "#2563EB", light: "#EFF6FF", label: "E-Visa",          slug: "e-visa"          },
  "visa on arrival": { color: "#059669", light: "#ECFDF5", label: "Visa on Arrival", slug: "visa-on-arrival" },
  "eta":             { color: "#7C3AED", light: "#F5F3FF", label: "ETA",             slug: "eta"             },
  "no admission":    { color: "#B45309", light: "#FFFBEB", label: "No Admission",    slug: "no-admission"    },
  "visa free":       { color: "#16A34A", light: "#F0FDF4", label: "Visa Free",       slug: "visa-free"       },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function resolveVisaStatus(rawStatus) {
  if (rawStatus == null || rawStatus === "") return null;
  const key = String(rawStatus).trim().toLowerCase();
  if (/^\d+$/.test(key)) {
    return {
      ...VISA_STATUS_META["visa free"],
      label: `Visa-Free · ${key} day${key === "1" ? "" : "s"}`,
      slug: "visa-free",
    };
  }
  return VISA_STATUS_META[key] || { color: "#10b981", light: "#ecfdf5", label: rawStatus, slug: "visa-required" };
}

function extractGuideSlug(url) {
  if (!url) return null;
  const part = url.split("/visa-guides/")[1];
  if (!part) return null;
  return part.split("?")[0].split("#")[0].trim() || null;
}

function createSlug(str) {
  return (str || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Recent-searches helpers (localStorage) ───────────────────────────────────
function getRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch { return []; }
}

function saveRecent(country) {
  try {
    const list = [country, ...getRecent().filter(c => c.code !== country.code)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch {}
}

// ─── VisaCountryInput ─────────────────────────────────────────────────────────
// Calls /api/suggest (our server-side proxy) instead of the eammu API directly.
function VisaCountryInput({ label, placeholder, value, onChange, excludeCode }) {
  const [query,       setQuery]       = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentList,  setRecentList]  = useState([]);
  const [open,        setOpen]        = useState(false);
  const [focused,     setFocused]     = useState(false);
  const [busy,        setBusy]        = useState(false);
  const ref     = useRef(null);
  const inputRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Debounced suggest fetch
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }
    const t = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await fetch(`/api/suggest?q=${encodeURIComponent(query)}`);
        const d = await r.json();
        setSuggestions((d.suggestions || []).filter(s => s.code !== excludeCode));
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setBusy(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [query, excludeCode]);

  // On focus - always open with recents + popular countries
  const handleFocus = () => {
    setFocused(true);
    if (!query) {
      const recent = getRecent().filter(c => c.code !== excludeCode);
      setRecentList(recent);
      setOpen(true);
    }
  };

  const pick = (country) => {
    saveRecent(country);
    onChange(country);
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    setFocused(false);
  };

  const clear = () => {
    onChange(null);
    setQuery("");
    setSuggestions([]);
    const recent = getRecent().filter(c => c.code !== excludeCode);
    setRecentList(recent);
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Popular countries filtered to exclude already-selected
  const popularFiltered = POPULAR_COUNTRIES.filter(c => c.code !== excludeCode);

  // What to show in the dropdown
  const showingSuggestions = query.length > 0 && suggestions.length > 0;
  const showingDefault     = query.length === 0; // recents + popular
  const showDropdown       = open && (showingSuggestions || showingDefault);

  return (
    <div ref={ref} className="relative w-full">
      {/* Input box */}
      <div
        className={`flex items-center gap-2.5 border rounded-xl px-3.5 py-2.5 bg-white transition-all duration-150 cursor-text ${
          focused
            ? "border-yellow-400 shadow-[0_0_0_3px_rgba(250,204,21,0.15)]"
            : "border-slate-200 hover:border-slate-300"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Icon / Flag */}
        <div className="shrink-0 w-6 flex items-center justify-center">
          {value?.flag
            ? <img src={value.flag} alt="" className="w-6 h-4 object-cover rounded-sm shadow-sm" />
            : <Search size={14} className="text-slate-300" />
          }
        </div>

        {/* Text stack */}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black tracking-widest text-[#c9941f] uppercase leading-none mb-0.5">
            {label}
          </p>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent text-[#1e3a4f] font-semibold text-sm outline-none w-full placeholder:text-slate-300 leading-snug"
            placeholder={placeholder}
            value={value ? value.name : query}
            onChange={(e) => {
              if (value) clear();
              setQuery(e.target.value);
              if (e.target.value.length === 0) {
                const recent = getRecent().filter(c => c.code !== excludeCode);
                setRecentList(recent);
                setOpen(true);
              }
            }}
            onFocus={handleFocus}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Spinner / Clear */}
        {busy && (
          <span className="w-3.5 h-3.5 border-2 border-slate-100 border-t-yellow-400 rounded-full animate-spin shrink-0" />
        )}
        {value && !busy && (
          <button
            onMouseDown={(e) => { e.preventDefault(); clear(); }}
            aria-label="Clear"
            className="shrink-0 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={10} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">

          {/* ── Search results ── */}
          {showingSuggestions && (
            <>
              <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-slate-50">
                <Search size={10} className="text-slate-300" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Results</span>
              </div>
              <ul className="max-h-52 overflow-y-auto py-1">
                {suggestions.map((s) => (
                  <li
                    key={s.code}
                    onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-yellow-50 transition-colors group"
                  >
                    {s.flag
                      ? <img src={s.flag} alt="" className="w-6 h-4 object-cover rounded-sm shrink-0 shadow-sm" />
                      : <span className="w-6 h-4 bg-slate-100 rounded-sm shrink-0" />
                    }
                    <span className="flex-1 text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 truncate">{s.name}</span>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-slate-400 shrink-0 uppercase tracking-wide">{s.code}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* ── Default view: Recents + Popular ── */}
          {showingDefault && (
            <div className="max-h-72 overflow-y-auto">

              {/* Recent searches */}
              {recentList.length > 0 && (
                <>
                  <div className="px-3 pt-2 pb-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock size={10} className="text-yellow-400" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Recent Searches</span>
                    </div>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        localStorage.removeItem(RECENT_KEY);
                        setRecentList([]);
                      }}
                      className="text-[9px] font-bold text-slate-300 hover:text-red-400 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="py-1">
                    {recentList.map((s) => (
                      <li
                        key={s.code}
                        onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-yellow-50 transition-colors group"
                      >
                        <div className="relative shrink-0">
                          {s.flag
                            ? <img src={s.flag} alt="" className="w-6 h-4 object-cover rounded-sm shadow-sm" />
                            : <span className="w-6 h-4 bg-slate-100 rounded-sm block" />
                          }
                          <Clock size={8} className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full" />
                        </div>
                        <span className="flex-1 text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 truncate">{s.name}</span>
                        <span className="text-[10px] font-bold text-slate-300 group-hover:text-slate-400 shrink-0 uppercase">{s.code}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mx-3 border-t border-slate-50" />
                </>
              )}

              {/* Popular countries */}
              <div className="px-3 pt-2 pb-1 flex items-center gap-1.5">
                <span className="text-[9px]">🌍</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Popular Countries</span>
              </div>
              <ul className="py-1">
                {popularFiltered.map((s) => (
                  <li
                    key={s.code}
                    onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                    className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-yellow-50 transition-colors group"
                  >
                    <img src={s.flag} alt="" className="w-6 h-4 object-cover rounded-sm shrink-0 shadow-sm" />
                    <span className="flex-1 text-[13px] font-semibold text-slate-700 group-hover:text-slate-900 truncate">{s.name}</span>
                    <span className="text-[10px] font-bold text-slate-300 group-hover:text-slate-400 shrink-0 uppercase">{s.code}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const tabs = [
  { id: "visa",       label: "Visa"        },
  { id: "processing", label: "Processing"  },
  { id: "study",      label: "Study Abroad"},
];

const FLAGS = {
  Bangladesh:       "🇧🇩",
  Canada:           "🇨🇦",
  "United States":  "🇺🇸",
  "United Kingdom": "🇬🇧",
  UAE:              "🇦🇪",
  Australia:        "🇦🇺",
  Germany:          "🇩🇪",
  France:           "🇫🇷",
  India:            "🇮🇳",
  Pakistan:         "🇵🇰",
};

// ─── Main widget ──────────────────────────────────────────────────────────────
export default function VisaSearchWidget() {
  const [activeTab, setActiveTab] = useState("visa");

  // Visa tab
  const [visaPassport,    setVisaPassport]    = useState(null);
  const [visaDestination, setVisaDestination] = useState(null);
  const [visaResult,      setVisaResult]      = useState(null);
  const [visaLoading,     setVisaLoading]     = useState(false);
  const [visaError,       setVisaError]       = useState("");

  // Static tabs
  const [passport,    setPassport]    = useState("Bangladesh");
  const [destination, setDestination] = useState("Canada");
  const swap = () => { const t = passport; setPassport(destination); setDestination(t); };

  // Pre-fill via proxy
  useEffect(() => {
    const fetchDefault = async (name) => {
      try {
        const r = await fetch(`/api/suggest?q=${encodeURIComponent(name)}`);
        const d = await r.json();
        return (d.suggestions || []).find(s => s.name.toLowerCase() === name.toLowerCase())
          || (d.suggestions || [])[0]
          || null;
      } catch { return null; }
    };
    Promise.all([fetchDefault("Bangladesh"), fetchDefault("Canada")]).then(([pp, dd]) => {
      if (pp) setVisaPassport(pp);
      if (dd) setVisaDestination(dd);
    });
  }, []);

  const checkVisa = useCallback(async () => {
    if (!visaPassport || !visaDestination) return;
    setVisaLoading(true);
    setVisaError("");
    setVisaResult(null);
    try {
      const r = await fetch(
        `/api/suggest?q=_passport_check_`, // placeholder — use real passport endpoint below
      );
      // ── Real call to eammu passport endpoint (via your own proxy if needed) ──
      // For now we call it client-side as before; wrap in /api/passport if desired
      const res = await fetch(
        `https://api.eammu.com/api/v1/passport?from=${encodeURIComponent(visaPassport.name)}&to=${encodeURIComponent(visaDestination.name)}&api_key=${process.env.NEXT_PUBLIC_EAMMU_API_KEY}`
      );
      if (!res.ok) throw new Error();
      setVisaResult(await res.json());
    } catch {
      setVisaError("Visa details not available. Please contact info@eammu.com");
    } finally {
      setVisaLoading(false);
    }
  }, [visaPassport, visaDestination]);

  // Derived slugs
  const visaStatusMeta = resolveVisaStatus(visaResult?.visa_status);
  const visaGuideSlug  = visaResult
    ? extractGuideSlug(visaResult.visa_guide_url) || visaStatusMeta?.slug || "visa-required"
    : null;
  const visaRouteSlug  = visaResult
    ? `${createSlug(visaPassport?.name || "")}-visa-for-${createSlug(visaDestination?.name || "")}`
    : null;
  const visaGuideHref  = visaResult && visaGuideSlug
    ? `/visa-checker/${visaRouteSlug}/${visaGuideSlug}`
    : `/visa/visa-guide/${createSlug(visaDestination?.name || "canada")}-visa-for-${createSlug(visaPassport?.name || "bangladesh")}`;

  return (
    <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 -mt-5 lg:-mt-10">
      <div className="max-w-6xl mx-auto relative">

        {/* ── Floating tab bar ── */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 z-30 bg-white border border-slate-100 rounded-full p-1 shadow-sm flex items-center gap-0.5 whitespace-nowrap">
          {tabs.map((t) => {
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all duration-200 uppercase tracking-wider ${
                  isSelected
                    ? "bg-[#1e3a4f] text-white"
                    : "text-[#1e3a4f]/60 hover:text-[#1e3a4f] hover:bg-slate-50"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── Main card ── */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/5 pt-9 pb-16 px-4 sm:px-6 border border-slate-100">

          {/* ══ VISA TAB ══ */}
          {activeTab === "visa" && (
            <div className="flex flex-col gap-3 w-full">

              {/* Heading — left aligned, compact */}
              <div className="flex flex-col gap-0.5">
                <h2 className="text-base sm:text-lg font-black text-[#1e3a4f] leading-tight tracking-tight">
                  Check Your Visa Requirements
                </h2>
                <p className="text-[11px] text-slate-400 font-medium leading-none">
                  Before you fly — instant results for 200+ countries
                </p>
              </div>

              {/* Selectors row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                <div className="flex-1 min-w-0">
                  <VisaCountryInput
                    label="YOUR PASSPORT"
                    placeholder="e.g. Bangladesh"
                    value={visaPassport}
                    onChange={(c) => { setVisaPassport(c); setVisaResult(null); }}
                    excludeCode={visaDestination?.code}
                  />
                </div>

                {/* Swap */}
                <div className="shrink-0 flex justify-center sm:block">
                  <button
                    onClick={() => {
                      const tmp = visaPassport;
                      setVisaPassport(visaDestination);
                      setVisaDestination(tmp);
                      setVisaResult(null);
                    }}
                    aria-label="Swap countries"
                    className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#c9941f] hover:border-[#c9941f]/50 hover:bg-yellow-50 transition-all active:scale-95 rotate-90 sm:rotate-0"
                  >
                    <ArrowLeftRight size={13} />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <VisaCountryInput
                    label="DESTINATION"
                    placeholder="e.g. Canada"
                    value={visaDestination}
                    onChange={(c) => { setVisaDestination(c); setVisaResult(null); }}
                    excludeCode={visaPassport?.code}
                  />
                </div>
              </div>

              {/* Error */}
              {visaError && (
                <p className="text-[11px] text-red-500 font-medium">{visaError}</p>
              )}

              {/* Result card */}
              {visaResult && (() => {
                const meta  = visaStatusMeta;
                const color = meta?.color || "#10b981";
                const light = meta?.light || "#ecfdf5";
                const label = meta?.label || visaResult.visa_status;

                return (
                  <div
                    className="rounded-xl border-2 p-3 flex items-center gap-3 w-full"
                    style={{ borderColor: color, background: light }}
                  >
                    {/* From */}
                    <div className="flex flex-col items-center gap-1 shrink-0 w-14">
                      {visaResult.from?.passport_cover
                        ? <img src={visaResult.from.passport_cover} alt="" className="w-9 h-12 object-cover rounded-lg shadow" />
                        : visaResult.from?.flag
                          ? <img src={visaResult.from.flag} alt="" className="w-10 h-7 object-cover rounded shadow" />
                          : null
                      }
                      {visaResult.from?.flag && visaResult.from?.passport_cover && (
                        <img src={visaResult.from.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                      )}
                      <span className="text-[9px] font-bold text-slate-500 text-center leading-tight w-full truncate">
                        {visaResult.from?.name}
                      </span>
                    </div>

                    {/* Centre */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                      <span
                        className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white whitespace-nowrap shadow-sm"
                        style={{ background: color }}
                      >
                        {label}
                      </span>
                      <div className="flex items-center gap-1.5 w-full px-2">
                        <div className="flex-1 h-px opacity-30" style={{ background: color }} />
                        <span className="text-sm" style={{ color }}>✈</span>
                        <div className="flex-1 h-px opacity-30" style={{ background: color }} />
                      </div>
                    </div>

                    {/* To */}
                    <div className="flex flex-col items-center gap-1 shrink-0 w-14">
                      {visaResult.to?.passport_cover
                        ? <img src={visaResult.to.passport_cover} alt="" className="w-9 h-12 object-cover rounded-lg shadow" />
                        : visaResult.to?.flag
                          ? <img src={visaResult.to.flag} alt="" className="w-10 h-7 object-cover rounded shadow" />
                          : null
                      }
                      {visaResult.to?.flag && visaResult.to?.passport_cover && (
                        <img src={visaResult.to.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                      )}
                      <span className="text-[9px] font-bold text-slate-500 text-center leading-tight w-full truncate">
                        {visaResult.to?.name}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ══ PROCESSING TAB ══ */}
          {activeTab === "processing" && (
            <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
              <div className="w-full lg:flex-1">
                <FieldDropdown label="YOUR PASSPORT" value={passport} onChange={setPassport} onClear={() => setPassport("")} options={Object.keys(FLAGS)} />
              </div>
              <div className="shrink-0 z-10 -my-1 lg:my-0">
                <button onClick={swap} aria-label="Swap" className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#c9941f] hover:border-[#c9941f]/50 transition-all active:scale-95 rotate-90 lg:rotate-0">
                  <ArrowLeftRight size={12} />
                </button>
              </div>
              <div className="w-full lg:flex-1">
                <FieldDropdown label="DESTINATION" value={destination} onChange={setDestination} onClear={() => setDestination("")} options={Object.keys(FLAGS)} />
              </div>
              <div className="w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
                <button className="w-full lg:w-auto bg-[#b48c42] hover:bg-[#a17c37] active:scale-[0.98] text-white font-bold text-sm px-10 py-3 rounded-full transition-all duration-200 whitespace-nowrap tracking-wide">
                  Search
                </button>
              </div>
            </div>
          )}

          {/* ══ STUDY ABROAD TAB ══ */}
          {activeTab === "study" && (
            <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
              <div className="w-full lg:flex-1">
                <FieldDropdown label="YOUR PASSPORT" value={passport} onChange={setPassport} onClear={() => setPassport("")} options={Object.keys(FLAGS)} />
              </div>
              <div className="shrink-0 z-10 -my-1 lg:my-0">
                <button onClick={swap} aria-label="Swap" className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-[#c9941f] hover:border-[#c9941f]/50 transition-all active:scale-95 rotate-90 lg:rotate-0">
                  <ArrowLeftRight size={12} />
                </button>
              </div>
              <div className="w-full lg:flex-1">
                <FieldDropdown label="DESTINATION" value={destination} onChange={setDestination} onClear={() => setDestination("")} options={Object.keys(FLAGS)} />
              </div>
              <div className="w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
                <button className="w-full lg:w-auto bg-[#b48c42] hover:bg-[#a17c37] active:scale-[0.98] text-white font-bold text-sm px-10 py-3 rounded-full transition-all duration-200 whitespace-nowrap tracking-wide">
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Overlapping CTA (visa tab only) ── */}
        {activeTab === "visa" && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center w-full px-6 z-10">
            <a
              href={visaResult ? visaGuideHref : undefined}
              onClick={(e) => {
                if (!visaResult && !visaLoading) {
                  e.preventDefault();
                  checkVisa();
                }
              }}
              className="w-full sm:w-72 bg-[#FFC107] hover:bg-yellow-400 text-[#1e3a4f] py-3.5 rounded-xl font-black text-sm uppercase shadow-xl shadow-yellow-200/60 text-center active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              {visaLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#1e3a4f]/20 border-t-[#1e3a4f] rounded-full animate-spin" />
                  Checking…
                </>
              ) : visaResult ? (
                "View Full Visa Guide →"
              ) : (
                "Check Visa Now"
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FieldDropdown (Processing + Study tabs) ──────────────────────────────────
function FieldDropdown({ label, value, onChange, onClear, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-3 border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white hover:border-slate-300 transition-all cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        {value && (
          <span className="text-xl leading-none shrink-0">{FLAGS[value]}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black tracking-widest text-[#c9941f] uppercase mb-0.5 leading-none">{label}</p>
          <p className="text-[#1e3a4f] font-semibold text-sm truncate leading-snug">{value || "Select Country"}</p>
        </div>
        {value && (
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            aria-label="Clear"
            className="shrink-0 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X size={10} />
          </button>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1 w-full min-w-[240px] max-h-60 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1 overflow-y-auto">
            {options.map((opt) => {
              const isCurrent = opt === value;
              return (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`flex items-center gap-3 w-full px-3.5 py-2.5 text-sm transition-colors text-left ${
                    isCurrent ? "bg-yellow-50 text-[#7e6029] font-bold" : "text-slate-700 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span className="text-lg leading-none">{FLAGS[opt]}</span>
                  <span className="flex-1">{opt}</span>
                  {isCurrent && <span className="text-yellow-600 text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}