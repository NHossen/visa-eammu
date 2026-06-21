// src/components/Footer.jsx
// visa.eammu.com — Eammu Holidays
// Tailwind CSS · Next.js App Router · Dubai-first SEO · Fully responsive

import Link from "next/link";

// ── Data ─────────────────────────────────────────────────────────────────────

const VISA_SERVICES = [
  { label: "Free Visa Checker Tool",         href: "/visa-checker" },
  { label: "Dubai & UAE Visa Guide",         href: "/visa-checker/bangladesh-visa-for-united-arab-emirates/visa-required" },
  { label: "Europe Schengen Visa",           href: "/visa-checker/bangladesh-visa-for-germany/visa-required" },
  { label: "USA Visa Requirements",          href: "/visa-checker/bangladesh-visa-for-united-states/visa-required" },
  { label: "Canada Visa Guide",              href: "/visa-checker/bangladesh-visa-for-canada/visa-required" },
  { label: "UK Visa Requirements",           href: "/visa-checker/bangladesh-visa-for-united-kingdom/visa-required" },
  { label: "E-Visa Countries List",          href: "/visa-checker" },
  { label: "Visa on Arrival Countries",      href: "/visa-checker" },
  { label: "Visa-Free Travel Guide",         href: "/visa-checker" },
  { label: "Embassy Appointment Help",       href: "/resources/embassy" },
];

const TOP_DESTINATIONS = [
  { label: "Dubai Visa — UAE",               href: "/visa-checker/bangladesh-visa-for-united-arab-emirates" },
  { label: "Schengen Visa — Europe",         href: "/resources/schengen-visa-guide" },
  { label: "USA B1/B2 Tourist Visa",         href: "/visa-checker/bangladesh-visa-for-united-states" },
  { label: "Canada Tourist & PR Visa",       href: "/visa-checker/bangladesh-visa-for-canada" },
  { label: "UK Standard Visitor Visa",       href: "/visa-checker/bangladesh-visa-for-united-kingdom" },
  { label: "Malaysia Visa on Arrival",       href: "/visa-checker/bangladesh-visa-for-malaysia" },
  { label: "Turkey E-Visa Online",           href: "/visa-checker/bangladesh-visa-for-turkey" },
  { label: "Australia ETA & Tourist Visa",   href: "/visa-checker/bangladesh-visa-for-australia" },
  { label: "Thailand Visa on Arrival",       href: "/visa-checker/bangladesh-visa-for-thailand" },
  { label: "Singapore Visa Requirements",    href: "/visa-checker/bangladesh-visa-for-singapore" },
];

const COMPANY_LINKS = [
  { label: "About Eammu Holidays",           href: "/about" },
  { label: "Our Global Offices",             href: "/offices" },
  { label: "Travel Resources & Guides",      href: "https://eammu.com/travel-resources" },
  { label: "Visa Rejection Help",            href: "https://eammu.com/visa-rejection" },
  { label: "Financial Documents Guide",      href: "https://eammu.com/travel-resources" },
  { label: "Scholarships Abroad",            href: "https://eammu.com/scholarships" },
  { label: "Blog & Travel Tips",             href: "https://eammu.com/blogs" },
  { label: "Contact Us",                     href: "https://eammu.com/contact" },
];

const OFFICES = [
  {
    flag:    "🇦🇪",
    country: "UAE — Dubai & Abu Dhabi",
    address: "Sharjah · Abu Dhabi",
    detail:  "Primary hub — Dubai visa, UAE residence & travel services",
    primary: true,
  },
  {
    flag:    "🇧🇩",
    country: "Bangladesh",
    address: "Dhaka · Cumilla",
    detail:  "Head office — visa applications for all destinations",
    primary: false,
  },
  {
    flag:    "🇦🇲",
    country: "Armenia",
    address: "Yerevan",
    detail:  "Europe & CIS region visa consulting",
    primary: false,
  },
];

const VISA_STATUS_TYPES = [
  { label: "Visa Required",   color: "#dc2626" },
  { label: "E-Visa",          color: "#2563eb" },
  { label: "Visa on Arrival", color: "#059669" },
  { label: "ETA",             color: "#7c3aed" },
  { label: "Visa Free",       color: "#10b981" },
  { label: "No Admission",    color: "#b45309" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer",       href: "/disclaimer" },
  { label: "Sitemap",          href: "/sitemap.xml" },
];

const SOCIAL_LINKS = [
  { icon: "fb", label: "Facebook",  href: "https://facebook.com/eammu" },
  { icon: "ig", label: "Instagram", href: "https://instagram.com/eammu" },
  { icon: "wa", label: "WhatsApp",  href: "https://wa.me/8801631312524" },
  { icon: "yt", label: "YouTube",   href: "https://youtube.com/@eammu" },
  { icon: "li", label: "LinkedIn",  href: "https://linkedin.com/company/eammu" },
];

const SEO_KEYWORDS = [
  "Dubai Visa Consultancy",
  "UAE Visa Services",
  "Schengen Visa Bangladesh",
  "USA Visa Agent Dubai",
  "Canada Visa Consultant",
  "UK Visa Help",
  "Bangladesh Passport Visa Check",
  "Travel Agency Dubai",
  "Visa on Arrival Guide",
  "E-Visa Application Help",
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SocialIcon({ type }) {
  const icons = {
    fb: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    ig: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
    wa: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.486a.5.5 0 0 0 .611.611l5.628-1.478A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.523-5.176-1.433l-.371-.218-3.843 1.008 1.027-3.748-.24-.385A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    yt: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="#0a1628" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
    li: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  };
  return icons[type] || null;
}

function FooterLinkList({ links }) {
  return (
    <ul className="space-y-2.5">
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="group flex items-center gap-2 text-[13px] text-slate-400 hover:text-[#ffcc00] transition-colors duration-150"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity shrink-0"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ColTitle({ children }) {
  return (
    <p className="text-[11px] font-medium tracking-widest uppercase text-white mb-4">
      {children}
    </p>
  );
}

// ── Main Footer ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-slate-400" aria-label="Eammu Holidays site footer">

      {/* ── Dubai CTA strip ────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] bg-[#005a31]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-slate-300 text-center sm:text-left">
            <span className="text-[#ffcc00] font-medium">🇦🇪 Dubai & UAE Visa Services</span>
            {" — "}
            Expert visa consultancy for expats, tourists, and business travelers in the UAE.
          </p>
          <a
            href="https://wa.me/8801631312524"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[12px] font-medium text-[#0a1628] bg-[#ffcc00] hover:bg-yellow-300 transition-colors px-4 py-2 rounded-lg whitespace-nowrap"
          >
            WhatsApp Us Now →
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 pb-0">

        {/* ── Main grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1.1fr_1fr] gap-10 lg:gap-12 pb-12 border-b border-white/[0.08]">

          {/* ── Brand column ─────────────────────────────────────────── */}
          <div>
            <span className="inline-block text-[10px] font-medium tracking-[0.14em] uppercase text-[#005a31] bg-[#005a31]/20 px-3 py-1 rounded mb-4">
              Licensed Visa & Travel Consultancy
            </span>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#005a31] flex items-center justify-center shrink-0">
                <span className="text-[#ffcc00] font-bold text-base leading-none">E</span>
              </div>
              <div>
                <div className="text-[18px] font-medium text-white tracking-tight leading-tight">
                  Eammu Holidays
                </div>
                <div className="text-[10px] text-slate-500 tracking-wide">visa.eammu.com</div>
              </div>
            </div>

            {/* SEO-rich brand description */}
            <p className="text-[13px] leading-[1.8] text-slate-400 mb-5">
              Eammu Holidays is a{" "}
              <span className="text-slate-300">licensed visa and travel consultancy</span> headquartered
              in <span className="text-slate-300">Dubai, UAE</span>, with offices in Sharjah, Abu Dhabi,
              Dhaka, Cumilla, and Yerevan. We specialise in{" "}
              <span className="text-slate-300">
                Dubai visa applications, UAE residence visa, Europe Schengen visa, USA tourist visa,
                Canada visitor visa, and UK Standard Visitor Visa
              </span>{" "}
              for Bangladeshi, Indian, Pakistani, and South Asian passport holders. Our free{" "}
              <span className="text-slate-300">online visa checker</span> covers 261+ countries
              with instant results — no sign-up required.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: "✓", label: "Licensed in UAE & BD" },
                { icon: "🔒", label: "100% Secure" },
                { icon: "◷", label: "24/7 Support" },
                { icon: "★", label: "Dubai Based" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] rounded-md px-2.5 py-1.5"
                >
                  <span className="text-[#ffcc00] text-[10px]">{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-2 mb-6">
              {SOCIAL_LINKS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/[0.09] bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#005a31] transition-all duration-150"
                >
                  <SocialIcon type={icon} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              <a
                href="mailto:info@eammu.com"
                className="flex items-center gap-2 text-[13px] text-slate-400 hover:text-[#ffcc00] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 text-slate-500">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                info@eammu.com
              </a>
              <a
                href="https://wa.me/8801631312524"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-slate-400 hover:text-[#ffcc00] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.486a.5.5 0 0 0 .611.611l5.628-1.478A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.523-5.176-1.433l-.371-.218-3.843 1.008 1.027-3.748-.24-.385A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                +880 163 131 2524
              </a>
              <a
                href="https://eammu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-slate-400 hover:text-[#ffcc00] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 text-slate-500">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                eammu.com
              </a>
            </div>
          </div>

          {/* ── Visa Services ────────────────────────────────────────── */}
          <div>
            <ColTitle>Visa Services</ColTitle>
            <FooterLinkList links={VISA_SERVICES} />
          </div>

          {/* ── Top Destinations ─────────────────────────────────────── */}
          <div>
            <ColTitle>Top Destinations</ColTitle>
            <FooterLinkList links={TOP_DESTINATIONS} />
          </div>

          {/* ── Company ──────────────────────────────────────────────── */}
          <div>
            <ColTitle>Company</ColTitle>
            <FooterLinkList links={COMPANY_LINKS} />
          </div>
        </div>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.07] border-b border-white/[0.08]">
          {[
            { num: "261+",    label: "Countries in visa checker" },
            { num: "67,000+", label: "Passport routes tracked" },
            { num: "5+",      label: "Years of visa expertise" },
            { num: "3",       label: "Countries with offices" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-[#0a1628] text-center py-7 px-4">
              <div className="text-2xl font-medium text-[#ffcc00] mb-1">{num}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Offices ──────────────────────────────────────────────────── */}
        <div className="py-8 border-b border-white/[0.08]">
          <p className="text-[11px] font-medium tracking-widest uppercase text-slate-500 mb-5">
            Our Offices
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* UAE — Primary / highlighted */}
            <div className="flex items-start gap-3 bg-[#005a31]/10 border border-[#005a31]/30 rounded-xl p-4 lg:col-span-1">
              <span className="text-2xl leading-none mt-0.5">🇦🇪</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-[13px] font-medium text-white leading-snug">UAE — Dubai</div>
                  <span className="text-[9px] font-medium tracking-wider uppercase text-[#005a31] bg-[#005a31]/20 px-1.5 py-0.5 rounded">
                    Primary
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Sharjah · Abu Dhabi</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Dubai visa, UAE residence &amp; tourist visa services
                </div>
              </div>
            </div>

            {/* Bangladesh */}
            <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <span className="text-2xl leading-none mt-0.5">🇧🇩</span>
              <div>
                <div className="text-[13px] font-medium text-white leading-snug">Bangladesh</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Dhaka · Cumilla</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Head office — all visa &amp; travel services
                </div>
              </div>
            </div>

            {/* Armenia */}
            <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <span className="text-2xl leading-none mt-0.5">🇦🇲</span>
              <div>
                <div className="text-[13px] font-medium text-white leading-snug">Armenia</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Yerevan</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Europe &amp; CIS region visa consulting
                </div>
              </div>
            </div>

            {/* Online */}
            <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <div className="w-7 h-7 rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffcc00" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-medium text-white leading-snug">Global Online</div>
                <div className="text-[11px] text-slate-400 mt-0.5">visa.eammu.com</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Free visa checker — 261+ countries, instant results
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEO description block ─────────────────────────────────────── */}
        <div className="py-8 border-b border-white/[0.08]">
          <p className="text-[11px] font-medium tracking-widest uppercase text-slate-500 mb-4">
            About Eammu Holidays — visa.eammu.com
          </p>

          {/* Three SEO paragraphs targeting Dubai, Europe, US/Canada/UK */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-[11px] font-medium text-[#ffcc00] uppercase tracking-wider mb-2">
                🇦🇪 Dubai & UAE Visa Services
              </p>
              <p className="text-[12px] text-slate-500 leading-[1.85]">
                <span className="text-slate-300 font-medium">Eammu Holidays Dubai</span> is the UAE's
                trusted visa consultancy for Bangladeshi, Indian, Pakistani, and South Asian expats
                and tourists. We assist with{" "}
                <span className="text-slate-400">Dubai tourist visa, UAE visit visa, transit visa,
                UAE residence visa, and Emirates ID renewal</span>. Our Sharjah and Abu Dhabi offices
                serve walk-in clients across the UAE with fast, reliable visa processing and
                embassy document support.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-[#ffcc00] uppercase tracking-wider mb-2">
                🌍 Europe, USA & Canada Visa
              </p>
              <p className="text-[12px] text-slate-500 leading-[1.85]">
                We specialise in{" "}
                <span className="text-slate-400">Schengen visa applications for France, Germany,
                Italy, Spain, and the Netherlands</span>, as well as{" "}
                <span className="text-slate-400">USA B1/B2 tourist visa, Canada visitor visa and
                PR pathways, and UK Standard Visitor Visa</span> for South Asian passport holders.
                Our consultants prepare financial documentation, travel history summaries, and
                embassy cover letters — significantly improving visa approval rates.
              </p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-[#ffcc00] uppercase tracking-wider mb-2">
                🌐 Free Visa Checker Tool
              </p>
              <p className="text-[12px] text-slate-500 leading-[1.85]">
                <span className="text-slate-300 font-medium">visa.eammu.com</span> is a free online
                passport visa checker covering <span className="text-slate-400">261+ countries and
                67,000+ passport–destination combinations</span>. Instantly check if you need a
                visa, e-visa, visa on arrival, ETA, or can travel visa-free — for any passport
                nationality. Trusted by travelers from Bangladesh, India, Pakistan, Nepal, Sri Lanka,
                and the Philippines planning trips to Dubai, Europe, the USA, Canada, and the UK.
              </p>
            </div>
          </div>

          {/* Visa type pills */}
          <div className="flex flex-wrap gap-2">
            {VISA_STATUS_TYPES.map(({ label, color }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-[11px] text-slate-500 px-3 py-1 rounded-full border border-white/[0.07] bg-white/[0.03]"
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── SEO keyword tags ─────────────────────────────────────────── */}
        <div className="py-5 border-b border-white/[0.06]">
          <div className="flex flex-wrap gap-2">
            {SEO_KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="text-[11px] text-slate-600 px-2.5 py-1 rounded border border-white/[0.05] bg-white/[0.02]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          <p className="text-[12px] text-slate-600 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Eammu Holidays. All rights reserved.
            {" · "}
            <a href="https://eammu.com" className="hover:text-slate-400 transition-colors">eammu.com</a>
            {" · "}
            <a href="https://visa.eammu.com" className="hover:text-slate-400 transition-colors">visa.eammu.com</a>
            {" · "}
            <span className="text-slate-700">Dubai, UAE &amp; Bangladesh</span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[12px] text-slate-600 hover:text-slate-400 transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}