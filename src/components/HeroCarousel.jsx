"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?q=80&w=1600&auto=format&fit=crop",
    label: "USA Visa",
    heading: "Your USA Visa, handled.",
    subheading: "B1/B2 tourist & business visa with expert guidance from start to finish",
  },
  {
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    label: "Student Visa",
    heading: "Study abroad, stress-free.",
    subheading: "We handle your student visa so you can focus on your future",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    label: "Tourist Visa",
    heading: "The world is waiting for you.",
    subheading: "Fast tourist visa processing for 100+ destinations worldwide",
  },
  {
    image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=1600&auto=format&fit=crop",
    label: "Appointment Booking",
    heading: "Skip the embassy queue.",
    subheading: "We secure your visa appointment slot — confirmed within 24 hours",
  },
  {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1600&auto=format&fit=crop",
    label: "Free Visa Consultation",
    heading: "Not sure which visa you need?",
    subheading: "Get a free consultation with our certified visa experts today",
  },
  {
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop",
    label: "Schengen Visa",
    heading: "Explore all of Europe.",
    subheading: "One Schengen visa — 26 countries, unlimited memories",
  },
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop",
    label: "Travel Booking",
    heading: "Flights, hotels & more.",
    subheading: "Complete travel packages tailored to your destination and budget",
  },
  {
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
    label: "Work Visa",
    heading: "Your career knows no borders.",
    subheading: "Work visa assistance for UAE, UK, Canada, Europe and beyond",
  },
  {
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop",
    label: "Family Visa",
    heading: "Reunite with your loved ones.",
    subheading: "Spouse, dependent & family reunion visas made simple",
  },
  {
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1600&auto=format&fit=crop",
    label: "Transit Visa",
    heading: "Layover? We've got you.",
    subheading: "Quick transit visa processing so your connection never gets complicated",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a === slides.length - 1 ? 0 : a + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActive((a) => (a === 0 ? slides.length - 1 : a - 1));
  const next = () => setActive((a) => (a === slides.length - 1 ? 0 : a + 1));

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[380px] lg:px-36 overflow-hidden">

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt={s.heading} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1117]/80 via-[#0a1117]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1117]/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Text — slides in/out */}
      <div className="relative z-10 h-full flex flex-col justify-center pl-14 sm:pl-16 lg:pl-[240px] pr-6 sm:pr-20">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute left-14 sm:left-16 lg:left-[240px] right-6 sm:right-20 transition-all duration-600 ${
              i === active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[#FACC15] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                Eammu Holidays
              </p>
              <span className="text-white/30 text-[10px] hidden sm:inline">·</span>
              <span className="hidden sm:inline bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#FACC15] text-[9px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full">
                {s.label}
              </span>
            </div>
            <h1 className="text-white font-bold text-xl sm:text-3xl lg:text-[42px] tracking-tight leading-tight max-w-lg">
              {s.heading}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm lg:text-base mt-2 sm:mt-3 max-w-sm">
              {s.subheading}
            </p>
            <a
              href="https://eammu.com"
              className="mt-3 sm:mt-4 inline-block text-white text-xs sm:text-sm font-medium underline underline-offset-4 hover:text-[#FACC15] transition-colors w-fit"
            >
              Apply now
            </a>
          </div>
        ))}
      </div>

      {/* Controls — anchored bottom-right */}
      <div className="absolute bottom-12 right-4 sm:bottom-12 sm:right-8 z-10 flex items-center gap-2">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors bg-black/20 backdrop-blur-sm"
        >
          <ChevronLeft size={12} className="sm:hidden" />
          <ChevronLeft size={14} className="hidden sm:block" />
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-4 sm:w-5 h-1.5 sm:h-2 bg-[#FACC15]"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/25 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors bg-black/20 backdrop-blur-sm"
        >
          <ChevronRight size={12} className="sm:hidden" />
          <ChevronRight size={14} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
}