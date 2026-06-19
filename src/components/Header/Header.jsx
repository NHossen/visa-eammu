"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Globe, ChevronDown, Menu, X, 
  Plane, GraduationCap, FileText, Clock,
  BookOpen, Compass, Sparkles, ArrowRight,
  MapPin, Shield, Zap
} from "lucide-react";

// ─── Nav data ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    label: "Visa",
    icon: Globe,
    color: "#16a34a",
    accent: "#dcfce7",
    mega: true,
    groups: [
      {
        heading: "Check Requirements",
        items: [
          { icon: Zap,      label: "Visa Checker",       sub: "Instant results for 200+ countries", href: "/visa" },
          { icon: MapPin,   label: "Visa on Arrival",    sub: "No appointment needed",              href: "/visa/visa-on-arrival" },
          { icon: Shield,   label: "E-Visa Countries",   sub: "Apply fully online",                 href: "/visa/e-visa" },
        ],
      },
      {
        heading: "Guides & Info",
        items: [
          { icon: FileText, label: "Visa Guides",        sub: "Step-by-step country guides",        href: "/visa/guides" },
          { icon: Clock,    label: "Processing Times",   sub: "Real-time processing tracker",       href: "/travel-resources/visa-processing-time-tracker" },
          { icon: BookOpen, label: "Document Templates", sub: "SOP, NOC, cover letters",            href: "/travel-resources" },
        ],
      },
    ],
    featured: {
      label: "Passport Index 2025",
      sub: "See how powerful your passport is",
      href: "/passport-index",
      bg: "from-green-500 to-emerald-600",
    },
  },
  {
    label: "Study Abroad",
    icon: GraduationCap,
    color: "#7c3aed",
    accent: "#ede9fe",
    mega: true,
    groups: [
      {
        heading: "Find Programs",
        items: [
          { icon: Compass,      label: "Study Destinations",  sub: "Top universities worldwide",         href: "/study-abroad" },
          { icon: BookOpen,     label: "Scholarships",        sub: "Fully funded opportunities",         href: "/scholarships" },
          { icon: GraduationCap,label: "Student Visa",        sub: "How to apply step-by-step",          href: "/study-abroad/student-visa" },
        ],
      },
      {
        heading: "Resources",
        items: [
          { icon: FileText, label: "SOP Generator",      sub: "AI-powered statement of purpose",    href: "/travel-resources/travel-document-generator" },
          { icon: Shield,   label: "Visa Checklist",     sub: "Never miss a document",              href: "/travel-resources/visa-checklist-generator" },
          { icon: Clock,    label: "Intake Deadlines",   sub: "Fall, Spring & Summer 2025",         href: "/study-abroad/deadlines" },
        ],
      },
    ],
    featured: {
      label: "Top 10 Countries for 2025",
      sub: "Best destinations for international students",
      href: "/study-abroad/top-destinations",
      bg: "from-violet-500 to-purple-700",
    },
  },
  {
    label: "Flights",
    icon: Plane,
    color: "#2563eb",
    accent: "#dbeafe",
    mega: false,
    href: "/flights",
  },
  {
    label: "Resources",
    icon: FileText,
    color: "#b45309",
    accent: "#fef3c7",
    mega: false,
    href: "/travel-resources",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

// ─── MegaMenu ────────────────────────────────────────────────────────────────
function MegaMenu({ item, visible }) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] transition-all duration-200 pointer-events-none
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2"}`}
      style={{ zIndex: 100 }}
    >
      {/* Arrow */}
      <div className="flex justify-center -mb-px relative z-10">
        <div className="w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45 shadow-sm" />
      </div>

      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-[1fr_1fr_200px]">

          {/* Groups */}
          {item.groups.map((group, gi) => (
            <div key={gi} className="p-4 border-r border-slate-50 last:border-0">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3 px-1">
                {group.heading}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((it, ii) => {
                  const Icon = it.icon;
                  return (
                    <Link
                      key={ii}
                      href={it.href}
                      className="group flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                        style={{ background: item.accent, color: item.color }}
                      >
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-800 group-hover:text-slate-900 leading-tight">
                          {it.label}
                        </p>
                        <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">
                          {it.sub}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Featured card */}
          <Link
            href={item.featured.href}
            className={`group bg-gradient-to-br ${item.featured.bg} p-4 flex flex-col justify-between`}
          >
            <div>
              <Sparkles size={16} className="text-white/60 mb-3" />
              <p className="text-[13px] font-black text-white leading-snug">
                {item.featured.label}
              </p>
              <p className="text-[11px] text-white/70 mt-1 leading-snug">
                {item.featured.sub}
              </p>
            </div>
            <div className="flex items-center gap-1 text-white/80 group-hover:text-white mt-4 transition-colors">
              <span className="text-[11px] font-bold">Explore</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}

// ─── Mobile drawer item ───────────────────────────────────────────────────────
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  if (!item.mega) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.accent, color: item.color }}>
          <Icon size={17} />
        </div>
        <span className="font-bold text-[15px] text-slate-800">{item.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.accent, color: item.color }}>
            <Icon size={17} />
          </div>
          <span className="font-bold text-[15px] text-slate-800">{item.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="ml-12 mb-2 flex flex-col gap-0.5">
          {item.groups.flatMap(g => g.items).map((it, i) => {
            const SubIcon = it.icon;
            return (
              <Link
                key={i}
                href={it.href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <SubIcon size={14} className="text-slate-400 shrink-0" />
                <span className="text-[13px] font-semibold text-slate-600">{it.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeMenu, setActiveMenu]   = useState(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [hoverIdx,   setHoverIdx]     = useState(null);
  const scrolled = useScrolled(12);
  const closeTimer = useRef(null);

  // Close mobile on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Prevent body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openMenu  = (id) => { clearTimeout(closeTimer.current); setActiveMenu(id); };
  const delayClose = () => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120); };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] py-0"
            : "bg-white/80 backdrop-blur-sm py-0"
        }`}
      >
        {/* ── Thin top accent bar ── */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-8 h-8">
                {/* Animated globe rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md group-hover:shadow-yellow-300/50 transition-shadow" />
                <div className="absolute inset-[3px] rounded-full bg-[#1e3a4f] flex items-center justify-center">
                  <Globe size={14} className="text-yellow-400" />
                </div>
                {/* Orbit ring */}
                <div className="absolute -inset-1 rounded-full border border-yellow-400/20 group-hover:border-yellow-400/50 transition-colors" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[17px] font-black text-[#1e3a4f] tracking-tight">
                  ea<span className="text-yellow-500">mmu</span>
                </span>
                <span className="text-[8px] font-bold text-slate-400 tracking-[0.2em] uppercase -mt-0.5">
                  Travel Smart
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {NAV_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.label;

                if (!item.mega) {
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group"
                      onMouseEnter={() => setHoverIdx(idx)}
                      onMouseLeave={() => setHoverIdx(null)}
                    >
                      <Icon size={14} className="transition-transform group-hover:scale-110" style={{ color: item.color }} />
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => openMenu(item.label)}
                    onMouseLeave={delayClose}
                  >
                    <button
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-bold transition-all ${
                        isActive
                          ? "text-slate-900 bg-slate-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Icon
                        size={14}
                        className="transition-transform"
                        style={{ color: isActive ? item.color : undefined }}
                      />
                      {item.label}
                      <ChevronDown
                        size={12}
                        className={`text-slate-400 transition-transform duration-200 ${isActive ? "rotate-180" : ""}`}
                      />
                      {/* Active indicator dot */}
                      {isActive && (
                        <span
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: item.color }}
                        />
                      )}
                    </button>

                    <MegaMenu item={item} visible={isActive} />
                  </div>
                );
              })}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              {/* Visa checker CTA */}
              <Link
                href="/visa"
                className="hidden sm:flex items-center gap-2 bg-[#1e3a4f] hover:bg-[#162d3e] text-white text-[12px] font-black px-4 py-2 rounded-full transition-all active:scale-95 group"
              >
                <Zap size={13} className="text-yellow-400 group-hover:animate-pulse" />
                <span>Check Visa</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="lg:hidden relative w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <span className={`absolute transition-all duration-200 ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}>
                  <X size={18} className="text-slate-700" />
                </span>
                <span className={`absolute transition-all duration-200 ${mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}>
                  <Menu size={18} className="text-slate-700" />
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[min(340px,90vw)] bg-white z-50 lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="h-[2.5px] w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300" />
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <Globe size={13} className="text-white" />
            </div>
            <span className="text-[16px] font-black text-[#1e3a4f]">
              ea<span className="text-yellow-500">mmu</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Drawer nav */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item, idx) => (
            <MobileNavItem key={idx} item={item} onClose={() => setMobileOpen(false)} />
          ))}
        </div>

        {/* Drawer footer CTA */}
        <div className="px-4 pb-6 pt-3 border-t border-slate-50">
          <Link
            href="/visa"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#1e3a4f] text-white font-black text-sm py-3.5 rounded-xl transition-all active:scale-95"
          >
            <Zap size={15} className="text-yellow-400" />
            Check Visa Requirements
          </Link>
          <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
            Free · Instant · 200+ countries
          </p>
        </div>
      </div>
    </>
  );
}