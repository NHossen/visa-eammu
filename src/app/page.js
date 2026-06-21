import SidebarNav from "../components/SidebarNav";
import TopNavbar from "../components/TopNavbar";
import HeroCarousel from "../components/HeroCarousel";
import VisaSearchWidget from "../components/VisaSearchWidget";
import DestinationCarousel from "../components/DestinationCarousel";

const BASE_URL = "https://visa.eammu.com";

export const metadata = {
  title: "Visa Checker Travel Agency Dubai – Check Visa Requirements for 200+ Countries | Eammu Holidays",
  description:
    "Instantly check visa requirements for any country. Eammu Holidays – Dubai's trusted travel agency for tourist visa, Schengen visa, USA visa, UK visa, student visa, and holiday packages from UAE, Bangladesh & India.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Visa Checker Travel Agency Dubai – Check Visa Requirements for 200+ Countries | Eammu Holidays",
    description:
      "Free visa checker for 200+ countries. Check tourist visa, on-arrival, e-visa requirements instantly. Trusted by travelers from Dubai, Bangladesh, India & worldwide.",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Eammu Holidays Visa Checker – Dubai Travel Agency",
      },
    ],
  },
};

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Visa Checker | Eammu Holidays",
  url: BASE_URL,
  description:
    "Check visa requirements for 200+ countries. Free visa checker tool powered by Eammu Holidays, Dubai's trusted travel and visa consultancy.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ],
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Eammu Visa Checker",
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online visa checker tool to find out if you need a visa, visa on arrival, or e-visa for any destination worldwide.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I check visa requirements for a country?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Eammu Holidays free visa checker tool – select your passport country and destination country to instantly see if you need a visa, visa on arrival, or e-visa.",
      },
    },
    {
      "@type": "Question",
      name: "Does Eammu Holidays provide visa services in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Eammu Holidays is a Dubai-based travel agency offering full visa assistance for tourist visas, student visas, Schengen visas, USA visas, UK visas, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Can I apply for a Schengen visa through Eammu Holidays?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Eammu Holidays provides Schengen visa consultation and application support from Dubai, UAE and Bangladesh offices.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries can Bangladeshi passport holders visit without a visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bangladeshi passport holders can visit several countries visa-free or on arrival including Bhutan, Nepal, Maldives, and others. Use our visa checker to get the full current list instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Does Eammu Holidays offer holiday packages from Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Eammu Holidays offers curated holiday packages from Dubai to Europe, Southeast Asia, USA, UK, India, and many other destinations.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-[#0a1628]">
        <SidebarNav />
        <TopNavbar />

        <main className="lg:pl-0" id="main-content" aria-label="Eammu Holidays Visa Checker">
          {/* H1 visually hidden but present for SEO */}
          <h1 className="sr-only">
            Travel Agency Dubai - Eammu Holidays | Tourist, Schengen, USA, UK Visa
          </h1>

          <HeroCarousel />
          <VisaSearchWidget />
          <DestinationCarousel />
        </main>
      </div>
    </>
  );
}