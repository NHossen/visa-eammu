"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, ChevronDown, X, Globe, FileText, Shield, Clock, Star, Menu } from "lucide-react";

// ─── Visa mega-menu data ────────────────────────────────────────────────────
const VISA_CATEGORIES = [
  {
    label: "By Region",
    icon: Globe,
    items: [
      { name: "Schengen Visa",     desc: "26 European countries", href: "/visa/schengen"        },
      { name: "USA Visa",          desc: "B1/B2, F1, H1B",       href: "/visa/usa"             },
      { name: "Canada Visa",       desc: "ETA & TRV",             href: "/visa/canada"          },
      { name: "Australia Visa",    desc: "Subclass 600, 500",     href: "/visa/australia"       },
    ],
  },
  {
    label: "Visa Type",
    icon: FileText,
    items: [
      { name: "Tourist Visa",      desc: "Leisure & travel",      href: "/visa/tourist"         },
      { name: "Student Visa",      desc: "Study abroad",          href: "/visa/student"         },
      { name: "Transit Visa",      desc: "Stopover & layover",    href: "/visa/transit"         },
      { name: "Medical Visa",      desc: "Treatment abroad",      href: "/visa/medical"         },
    ],
  },
  {
    label: "Services",
    icon: Shield,
    items: [
      { name: "Visa Checker",      desc: "Check requirements",    href: "/visa-checker"         },
      { name: "Document Checklist",desc: "Know what to bring",    href: "/documents"            },
      { name: "Processing Time",   desc: "Track your application",href: "/processing-time"      },
    ],
  },
];

const NAV_LINKS = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
];

// ─── Search Overlay ──────────────────────────────────────────────────────────
function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 transition-all duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full max-w-2xl transition-all duration-300 ${
          open ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
        }`}
      >
        <div className="relative flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <Search className="absolute left-5 text-white/50 shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search destinations, visa types, countries…"
            className="w-full bg-transparent py-5 pl-14 pr-14 text-white placeholder-white/40 text-base outline-none"
          />
          <button onClick={onClose} className="absolute right-4 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <p className="mt-3 text-center text-white/30 text-xs">Press ESC to close</p>
      </div>
    </div>
  );
}

// ─── Mega Menu ───────────────────────────────────────────────────────────────
function MegaMenu({ open }) {
  return (
    <div
      className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[780px] max-w-[95vw] transition-all duration-300 origin-top ${
        open
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      }`}
      style={{ filter: open ? "drop-shadow(0 32px 60px rgba(0,0,0,0.5))" : "none" }}
    >
      <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/10 border-l border-t border-white/20 rotate-45 backdrop-blur-xl" />
      <div className="relative bg-[#0a1520]/80 backdrop-blur-2xl border border-white/15 rounded-2xl overflow-hidden p-5">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#FACC15]/8 blur-3xl rounded-full" />
        <div className="grid grid-cols-3 gap-5">
          {VISA_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center gap-2 mb-3">
                <cat.icon size={13} className="text-[#FACC15]" />
                <span className="text-[10px] font-semibold tracking-widest text-[#FACC15] uppercase">
                  {cat.label}
                </span>
              </div>
              <ul className="space-y-0.5">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex flex-col px-3 py-2 rounded-xl hover:bg-white/8 transition-colors duration-150"
                    >
                      <span className="text-[13px] font-medium text-white/90 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-white/40 group-hover:text-white/60 transition-colors">
                        {item.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Star size={11} className="text-[#FACC15]" />
            <span>IATA Accredited • Trusted by 50,000+ travelers</span>
          </div>
          <Link
            href="/visa-checker"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#FACC15] hover:text-white transition-colors"
          >
            <Clock size={11} />
            Check Visa Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Drawer ───────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 z-[160] bg-[#07111a]/95 backdrop-blur-2xl border-l border-white/10 transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-5 border-b border-white/10 shrink-0">
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 pb-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}

          <div className="px-4 py-3">
            <div className="text-[10px] font-semibold tracking-widest text-[#FACC15] uppercase mb-3">
              Visa Services
            </div>
            <div className="space-y-0.5">
              {VISA_CATEGORIES.flatMap((cat) =>
                cat.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/6 text-xs transition-all"
                  >
                    {item.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TopNavbar() {
  const [visaOpen, setVisaOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [visible, setVisible]       = useState(true);
  const visaRef                     = useRef(null);
  const closeTimer                  = useRef(null);
  const overlayOpenRef              = useRef(false);

  // Keep overlayOpenRef in sync so the scroll handler always knows
  // whether a menu/overlay is open without re-binding the listener.
  useEffect(() => {
    overlayOpenRef.current = visaOpen || searchOpen || mobileOpen;
    // Always show navbar while any overlay is open
    if (overlayOpenRef.current) setVisible(true);
  }, [visaOpen, searchOpen, mobileOpen]);

  // ── Scroll direction + idle logic ──────────────────────────────────────
  // Scroll DOWN          → hide navbar
  // Scroll UP            → show navbar
  // Within 60px of top   → always visible
  // Idle for 1.5s        → show navbar automatically
  useEffect(() => {
    let lastY      = window.scrollY;
    let idleTimer  = null;

    const clearIdle = () => {
      if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
    };

    // FIX: previously this restarted the 1.5s timer on every single
    // scroll event, so continuous scrolling down kept pushing the
    // timer back and it never fired. Now it only starts a countdown
    // if one isn't already running, so the original 1.5s timer is
    // left alone to actually complete even while scrolling continues.
    const scheduleIdle = () => {
      if (idleTimer) return; // a countdown is already running — let it finish
      idleTimer = setTimeout(() => {
        idleTimer = null;
        setVisible(true);
      }, 1500);
    };

    const handler = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 12);

      // Never hide while an overlay / menu is open
      if (overlayOpenRef.current) {
        lastY = currentY;
        return;
      }

      if (currentY <= 60) {
        // Near the top — always visible, cancel any pending idle
        clearIdle();
        setVisible(true);
      } else if (currentY > lastY) {
        // Scrolling down → hide. Idle timer starts once (on the first
        // down-tick after being visible) and is left to run out, so it
        // fires 1.5s later even if scrolling continues. Once it fires
        // and the navbar reappears, the next down-tick hides it again
        // and starts a fresh 1.5s countdown — repeating "peek" effect.
        setVisible(false);
        scheduleIdle();
      } else {
        // Scrolling up → show immediately + restart idle (keeps it visible
        // even if user stops scrolling mid-page going up)
        setVisible(true);
        scheduleIdle();
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      clearIdle();
    };
  }, []);

  // ── Cmd/Ctrl+K → open search ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleVisaEnter = () => {
    clearTimeout(closeTimer.current);
    setVisaOpen(true);
  };
  const handleVisaLeave = () => {
    closeTimer.current = setTimeout(() => setVisaOpen(false), 180);
  };

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-[100] flex justify-center pt-3 px-4 transition-all duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0 pointer-events-none"
        }`}
      >
        <nav
          className={`relative max-w-4xl flex items-center gap-1 px-3 py-2
            bg-[#0a1520]/65 backdrop-blur-2xl border border-white/12 rounded-2xl
            transition-all duration-300
            ${scrolled ? "shadow-2xl shadow-black/50 border-white/18" : "shadow-lg shadow-black/20"}
          `}
          style={{
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo — mobile only */}
          <Link href="/" className="flex lg:hidden items-center shrink-0 pl-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/eammu_white_logo.webp"
              alt="Eammu Holidays"
              className="h-7 w-auto object-contain"
            />
          </Link>
          <div className="lg:hidden w-px h-5 bg-white/10 mx-1" />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/8 text-[13px] font-medium transition-all duration-150"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/8 text-[13px] font-medium transition-all duration-150"
            >
              About
            </Link>

            {/* Visa — mega menu trigger */}
            <div
              ref={visaRef}
              className="relative"
              onMouseEnter={handleVisaEnter}
              onMouseLeave={handleVisaLeave}
            >
              <button
                onClick={() => setVisaOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                  visaOpen
                    ? "text-[#FACC15] bg-white/8"
                    : "text-white/75 hover:text-white hover:bg-white/8"
                }`}
              >
                Visa
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    visaOpen ? "rotate-180 text-[#FACC15]" : ""
                  }`}
                />
              </button>
              {visaOpen && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FACC15] animate-pulse" />
              )}
              <MegaMenu open={visaOpen} />
            </div>
          </div>

          {/* Divider — desktop only */}
          <div className="hidden lg:block w-px h-5 bg-white/10 mx-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all duration-150 group"
              title="Search (Ctrl+K)"
            >
              <Search size={15} />
              <span className="hidden md:block text-[12px] text-white/35 group-hover:text-white/50 transition-colors font-mono">
                ⌘K
              </span>
            </button>

            {/* Country pill */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-[12px] font-medium transition-all duration-150">
              <span className="text-sm leading-none">🇦🇪</span>
              <span>AE</span>
              <ChevronDown size={11} className="text-white/40" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              <Menu size={15} />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlays */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}