import Link from "next/link";
import {
  ShieldCheck,
  Plane,
  FileText,
  Clock,
  Globe,
  Users,
  GraduationCap,
  Briefcase,
  HeartPulse,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Quote,
  Languages,
  Award,
  Building2,
} from "lucide-react";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * SEO NOTE FOR THE DEVELOPER
 * ─────────────────────────────────────────────────────────────────────────
 * 1. This file is written as a Next.js App Router page. Save it at:
 *      app/about/page.jsx
 * 2. It is a Server Component on purpose (no "use client") so the full
 *    text is present in the initial HTML for Google to crawl — nothing
 *    here depends on client-side JavaScript to render.
 * 3. Replace every "REPLACE_ME" value below (domain, phone, email, social
 *    links, review names) with your real business details before publishing.
 * 4. The numbers in the "trust stats" and the testimonials are placeholders
 *    — swap them for your real, verifiable figures and genuine customer
 *    reviews. Don't publish unverified claims or fabricated reviews.
 * ─────────────────────────────────────────────────────────────────────────
 */

const SITE_URL = "https://www.REPLACE_ME.com"; // your live domain

export const metadata = {
  title: "About Eammu Holidays | Dubai Visa & Travel Consultants",
  description:
    "Eammu Holidays is a Dubai-based, IATA-accredited visa and travel consultancy helping UAE residents and visitors apply for UK, USA, Canada and Schengen visas with expert, end-to-end guidance.",
  keywords: [
    "Dubai visa agency",
    "visa consultants Dubai",
    "UK visa from Dubai",
    "USA visa application UAE",
    "Canada visa from Dubai",
    "Schengen visa Dubai",
    "Europe visa UAE",
    "tourist visa Dubai",
    "business visa UAE",
    "visa checker online",
    "travel agency Dubai",
    "IATA accredited travel agency UAE",
    "visa requirements UAE residents",
    "apply visa online Dubai",
  ],
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: "Eammu Holidays",
    title: "About Eammu Holidays | Dubai Visa & Travel Consultants",
    description:
      "Dubai-based visa and travel experts helping UAE residents apply for UK, USA, Canada and Schengen visas — document checklists, processing tracking and honest guidance.",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630, alt: "Eammu Holidays — Dubai Visa & Travel Consultants" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Eammu Holidays | Dubai Visa & Travel Consultants",
    description:
      "Dubai-based visa and travel experts helping UAE residents apply for UK, USA, Canada and Schengen visas.",
    images: ["/og-about.jpg"],
  },
};

// ─── Structured data (JSON-LD) ───────────────────────────────────────────
function StructuredData() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Eammu Holidays",
    url: `${SITE_URL}/about`,
    logo: `${SITE_URL}/eammu_white_logo.webp`,
    description:
      "IATA-accredited visa and travel consultancy based in Dubai, UAE, assisting with UK, USA, Canada, Schengen and UAE visa applications.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Place", name: "Schengen Area" },
    ],
    sameAs: [
      "https://www.facebook.com/REPLACE_ME",
      "https://www.instagram.com/REPLACE_ME",
      "https://www.linkedin.com/company/REPLACE_ME",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "12+", label: "Years guiding Dubai travelers" },
  { value: "50,000+", label: "Applications assisted" },
  { value: "30+", label: "Visa categories covered" },
  { value: "4", label: "Continents served — UK, USA, Canada, Europe" },
];

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "IATA-Accredited & Compliant",
    desc: "We operate as a licensed, IATA-accredited travel and visa consultancy in the UAE, following the documentation standards set by each destination's immigration authority.",
  },
  {
    icon: FileText,
    title: "Document Checklists, Not Guesswork",
    desc: "Every applicant gets a destination-specific document checklist — bank statements, sponsorship letters, travel insurance, photographs — built around the embassy's actual requirements.",
  },
  {
    icon: Clock,
    title: "Processing Time Transparency",
    desc: "We track standard and premium processing windows for the UK, USA, Canada and Schengen so you know realistically when to expect a decision before you book flights.",
  },
  {
    icon: Languages,
    title: "Multilingual Visa Consultants",
    desc: "Our Dubai team advises in English, Hindi, Urdu, Tagalog and Arabic, so nothing gets lost between your situation and the paperwork.",
  },
  {
    icon: Award,
    title: "Honest Eligibility Assessment",
    desc: "If your profile doesn't meet a destination's current visa requirements, we tell you upfront — and suggest a realistic alternative — instead of taking a fee for an application likely to be refused.",
  },
  {
    icon: Building2,
    title: "One Office, Every Step",
    desc: "Consultation, document review, application submission and travel booking happen under one roof in Dubai, so you're not juggling five different agents.",
  },
];

const DESTINATIONS = [
  {
    icon: Globe,
    name: "UK Visa from Dubai",
    href: "/visa/uk",
    body:
      "For UAE residents applying for a UK Standard Visitor Visa, business visa or short-term study visa, we prepare your financial evidence, accommodation proof and travel history summary in the format UK Visas and Immigration expects, and track your application through the VFS Global appointment in Dubai.",
  },
  {
    icon: Globe,
    name: "USA Visa Application (UAE)",
    href: "/visa/usa",
    body:
      "B1/B2 visitor visas, F1 student visas and H1B-linked travel all require a DS-160 form, a US Embassy Dubai interview slot and a clear case for non-immigrant intent. We help UAE-based applicants prepare interview answers, the DS-160 itself and the supporting financial and employment documents reviewers look for.",
  },
  {
    icon: Globe,
    name: "Canada Visa from UAE",
    href: "/visa/canada",
    body:
      "Whether you need a Canada Visitor Visa (TRV) or an Electronic Travel Authorization (ETA), we map out which one applies to your passport and travel purpose, then prepare the proof of funds, ties-to-home-country evidence and itinerary Canadian visa officers look for.",
  },
  {
    icon: Globe,
    name: "Schengen / Europe Visa Dubai",
    href: "/visa/schengen",
    body:
      "A single Schengen visa covers travel across all 26 member countries, but the application must go through the consulate of your main destination or first entry point. We help Dubai-based travelers pick the correct consulate, build a day-by-day itinerary and assemble travel insurance that meets the minimum Schengen coverage requirement.",
  },
  {
    icon: Globe,
    name: "UAE Visa Services",
    href: "/visa/uae",
    body:
      "For visitors coming into Dubai and Abu Dhabi, we also handle UAE visit visa applications, status changes and extensions — useful if you're routing through the UAE on your way to a UK, USA, Canada or European destination.",
  },
];

const WHO_WE_HELP = [
  { icon: MapPin, title: "Tourist & Leisure Travelers", desc: "Holiday itineraries and visit visas for the UK, Europe, USA and Canada, built around real travel dates." },
  { icon: Briefcase, title: "Business & Conference Travelers", desc: "Invitation-letter-based business visas with the right financial and company documentation for short-notice trips." },
  { icon: GraduationCap, title: "Students Heading Abroad", desc: "Study visa guidance for the UK, USA and Canada, including financial sponsorship and acceptance letter requirements." },
  { icon: Users, title: "Families & Visit Visas", desc: "Joint applications for families visiting relatives abroad, with consistent, cross-checked documentation for every member." },
  { icon: HeartPulse, title: "Medical Travelers", desc: "Treatment-related visa applications that need hospital appointment letters and medical financial proof handled correctly." },
  { icon: Plane, title: "Frequent Flyers & Expats", desc: "Renewals, re-applications and multiple-entry visa strategy for UAE residents who travel several times a year." },
];

const PROCESS = [
  { step: "01", title: "Free Eligibility Consultation", desc: "We review your passport, travel history and purpose of travel, and tell you honestly which visa category fits and what your realistic chances look like." },
  { step: "02", title: "Document Checklist & Collection", desc: "You get a destination-specific checklist. We review every document before it's submitted — not after a rejection." },
  { step: "03", title: "Application Preparation & Submission", desc: "Forms (DS-160, online visa applications, biometric appointment booking) are completed accurately and submitted through the correct embassy, consulate or VFS/visa centre channel." },
  { step: "04", title: "Tracking & Status Updates", desc: "We monitor your application status and keep you informed at each stage, instead of leaving you to check a portal alone." },
  { step: "05", title: "Approval & Travel Briefing", desc: "Once approved, we go through entry requirements, travel insurance and any conditions on your visa before you fly." },
];

const TESTIMONIALS = [
  { quote: "They told me exactly which bank statements I was missing before I wasted a consulate appointment. My UK visa came through in under three weeks.", name: "S. R., Dubai" /* REPLACE_ME with a real, permissioned review */ },
  { quote: "I'd been confused about whether I needed a Schengen visa from France or Italy. They worked out the right consulate and the itinerary in one meeting.", name: "A. K., Sharjah" /* REPLACE_ME with a real, permissioned review */ },
  { quote: "Honest about my US visa chances from day one instead of just taking my money. I appreciated that more than anything.", name: "M. F., Abu Dhabi" /* REPLACE_ME with a real, permissioned review */ },
];

const FAQS = [
  {
    q: "How long does a UK visa take when applying from Dubai?",
    a: "Standard UK Standard Visitor Visa processing from the UAE is typically around 15 working days from your biometric appointment, though this varies by season and can extend during peak travel periods. Priority and Super Priority services are available for an additional fee through VFS Global.",
  },
  {
    q: "Do I need an interview for a USA visitor visa from the UAE?",
    a: "Yes. B1/B2 visitor visa applicants generally attend an in-person interview at the US Embassy Dubai or Consulate General Dubai, except for limited renewal categories. We help you prepare for the interview alongside your DS-160 form and supporting documents.",
  },
  {
    q: "Can I apply for a Canada visa or ETA from Dubai?",
    a: "Yes. UAE residents holding an eligible passport may apply for either a Canada Visitor Visa (TRV) or an Electronic Travel Authorization (eTA), depending on their passport and travel purpose. We confirm which one applies to you before you apply.",
  },
  {
    q: "Which consulate should I apply to for a Schengen visa in Dubai?",
    a: "You apply through the consulate of the country that is your main destination, or, if you're visiting multiple Schengen countries for an equal length of stay, the country of first entry. We help confirm the correct consulate so your application isn't rejected on a technicality.",
  },
  {
    q: "Can Eammu Holidays guarantee my visa will be approved?",
    a: "No legitimate visa consultancy can guarantee approval — the decision always rests with the relevant embassy or consulate. What we guarantee is that your application is complete, accurate and supported by the right documentation, which materially improves your chances.",
  },
  {
    q: "What documents are usually required for a UK, USA, Canada or Schengen visa from the UAE?",
    a: "Common requirements include a valid passport, UAE residence visa copy, recent bank statements, an employment or no-objection certificate, travel insurance, a return flight itinerary and accommodation proof. Exact requirements vary by destination and visa category, which is why we issue a tailored checklist per applicant.",
  },
  {
    q: "How early should I start my visa application before traveling?",
    a: "We recommend starting at least 4 to 6 weeks before your intended travel date for the UK, USA, Canada or Schengen area, and earlier during peak seasons such as summer and December, when appointment slots and processing times both extend.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <StructuredData />

      <main className="bg-white text-slate-800">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#0a1520] pt-32 pb-20 px-4">
          <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[#FACC15]/10 blur-3xl rounded-full" />
          <div className="relative max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/40">
              <ol className="flex items-center gap-2">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white/70" aria-current="page">About</li>
              </ol>
            </nav>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/15 text-[11px] font-semibold tracking-widest uppercase text-[#FACC15]">
              <ShieldCheck size={12} /> IATA-Accredited Visa &amp; Travel Consultancy
            </span>

            <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl">
              Your Trusted Visa &amp; Travel Partner in Dubai, UAE
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
              Eammu Holidays helps Dubai and UAE residents apply for <strong className="text-white">UK</strong>,{" "}
              <strong className="text-white">USA</strong>, <strong className="text-white">Canada</strong> and{" "}
              <strong className="text-white">Schengen / Europe</strong> visas — with real document checklists, honest
              eligibility advice and visible processing-time tracking, instead of vague promises.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/visa-checker"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FACC15] hover:bg-[#f59e0b] text-[#0a1520] text-sm font-bold transition-all duration-150 shadow-md shadow-[#FACC15]/20"
              >
                Check Your Visa Eligibility <ArrowRight size={15} />
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/15 text-white text-sm font-semibold transition-all duration-150"
              >
                See Document Checklist
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-xs text-white/45 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">Who We Are</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                Built in Dubai, for people navigating visas the hard way
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
                <p>
                  Eammu Holidays started as a small Dubai travel desk handling flight and hotel bookings, and grew into
                  a full visa and travel consultancy after watching the same problem repeat itself: travelers in the
                  UAE applying for a UK, USA, Canada or Schengen visa with the wrong documents, the wrong consulate, or
                  no real sense of how long the process would take.
                </p>
                <p>
                  Today, our Dubai-based team focuses specifically on outbound visa applications for UAE residents and
                  visitors — alongside the flight and hotel bookings that go with them — so that one consultation
                  covers the paperwork, the eligibility question, and the itinerary that supports the application
                  itself.
                </p>
                <p>
                  We work with tourists, business travelers, students, families and medical travelers heading from
                  Dubai and the wider UAE to the United Kingdom, the United States, Canada and the Schengen countries
                  of Europe, and we say so plainly when a destination's current visa rules don't favor a particular
                  case — because a refused application costs you more than an honest "not yet."
                </p>
              </div>
            </div>

            {/* Signature element: route strip */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-6">
                Where We Take Your Application
              </div>
              <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-slate-300" />
                {["UAE — Home Base", "United Kingdom", "United States", "Canada", "Schengen Europe"].map((stop, i) => (
                  <div key={stop} className="relative flex items-center gap-3 py-2.5 pl-0">
                    <span
                      className={`relative z-10 w-3.5 h-3.5 rounded-full border-2 ${
                        i === 0 ? "bg-[#FACC15] border-[#FACC15]" : "bg-white border-slate-300"
                      }`}
                    />
                    <span className={`text-sm ${i === 0 ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                      {stop}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-slate-500 leading-relaxed">
                Four destinations, one Dubai-based team handling the documentation for each.
              </p>
            </div>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">Why Choose Us</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                Why travelers across Dubai and the UAE work with us
              </h2>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_US.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white border border-slate-200 p-6 hover:border-[#FACC15]/50 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-200">
                  <item.icon size={20} className="text-[#b88a00]" />
                  <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Destinations / Services ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">Visa Services</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                Visa services we specialize in for UAE-based travelers
              </h2>
              <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">
                Each destination has its own forms, consulate process and document standards. Here's what our Dubai
                team handles for each one.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {DESTINATIONS.map((d) => (
                <Link
                  key={d.name}
                  href={d.href}
                  className="group flex flex-col sm:flex-row sm:items-start gap-5 rounded-2xl border border-slate-200 p-6 hover:border-[#FACC15]/50 hover:bg-slate-50 transition-all duration-200"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#0a1520] flex items-center justify-center">
                    <d.icon size={17} className="text-[#FACC15]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
                      {d.name}
                      <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 group-hover:text-[#b88a00] transition-all" />
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who We Help ── */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">Who We Help</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                Built for every kind of traveler leaving the UAE
              </h2>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHO_WE_HELP.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <item.icon size={20} className="text-[#b88a00]" />
                  <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">How It Works</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                From first consultation to boarding your flight
              </h2>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {PROCESS.map((p) => (
                <div key={p.step} className="relative pl-1">
                  <span className="font-serif text-3xl font-bold text-slate-200">{p.step}</span>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">What Clients Say</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">From travelers we've helped</h2>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <Quote size={18} className="text-[#FACC15]" />
                  <blockquote className="mt-4 text-sm text-slate-700 leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-500">
                    {t.name}
                    <span className="inline-flex ml-2 text-[#FACC15]">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="currentColor" stroke="none" />)}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Representative client feedback. Replace with verified, permissioned reviews before publishing.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div>
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#b88a00]">FAQ</span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-slate-900">
                Common questions about visas from Dubai &amp; the UAE
              </h2>
            </div>

            <div className="mt-8 divide-y divide-slate-200">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span className="text-[15px] font-semibold text-slate-900">{f.q}</span>
                    <CheckCircle2 size={16} className="text-slate-300 group-open:text-[#FACC15] shrink-0 transition-colors" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative overflow-hidden bg-[#0a1520] py-20 px-4">
          <div className="pointer-events-none absolute -bottom-24 left-0 w-96 h-96 bg-[#FACC15]/10 blur-3xl rounded-full" />
          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Ready to start your UK, USA, Canada or Europe visa application?
            </h2>
            <p className="mt-4 text-white/65 max-w-xl mx-auto leading-relaxed">
              Talk to a Dubai-based visa consultant before you book your flights — it's the difference between
              applying once and applying twice.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/visa-checker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FACC15] hover:bg-[#f59e0b] text-[#0a1520] text-sm font-bold transition-all duration-150"
              >
                Check Visa Requirements <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+971REPLACE_ME"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/14 border border-white/15 text-white text-sm font-semibold transition-all duration-150"
              >
                Call Our Dubai Office
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}