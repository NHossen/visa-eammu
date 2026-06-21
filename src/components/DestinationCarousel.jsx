"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const visaServices = [
  {
    city: "USA Visa",
    badge: "B1/B2 Tourist & Business",
    price: "$185",
    miles: "Processing: 2–4 weeks",
    href: "https://eammu.com",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "Schengen Visa",
    badge: "26 European Countries",
    price: "$90",
    miles: "Processing: 10–15 days",
    href: "https://eammu.com/schengen-visa",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "UK Visa",
    badge: "Tourist & Business Entry",
    price: "$127",
    miles: "Processing: 3–5 weeks",
    href: "https://eammu.com",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "Canada Visa",
    badge: "Visitor Visa — eTA",
    price: "$100",
    miles: "Processing: 2–8 weeks",
    href: "/visa/canada",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "Australia Visa",
    badge: "Tourist eVisa — Subclass 600",
    price: "$145",
    miles: "Processing: 1–4 weeks",
    href: "https://eammu.com",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "Japan Visa",
    badge: "Short-stay Tourist Visa",
    price: "$35",
    miles: "Processing: 5–7 business days",
    href: "https://eammu.com",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "Visa Appointment",
    badge: "Embassy Slot Booking",
    price: "$49",
    miles: "Confirmation: 24–48 hrs",
    href: "https://eammu.com",
    image:
      "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=1400&auto=format&fit=crop",
  },
  {
    city: "Dubai Visa",
    badge: "30 / 60 / 90-day Tourist",
    price: "$75",
    miles: "Processing: 3–5 business days",
    href: "https://eammu.com",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1400&auto=format&fit=crop",
  },
];

const AUTOPLAY_DELAY = 3500;

export default function VisaCarousel() {
  const [center, setCenter] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);

  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const len = visaServices.length;

  const prev = useCallback(() => setCenter((c) => (c - 1 + len) % len), [len]);
  const next = useCallback(() => setCenter((c) => (c + 1) % len), [len]);

  useEffect(() => {
    if (isPaused) return;
    autoplayRef.current = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(autoplayRef.current);
  }, [isPaused, next]);

  const pauseTemporarily = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const handlePrev = () => { pauseTemporarily(); prev(); };
  const handleNext = () => { pauseTemporarily(); next(); };

  // Side cards: center them instead of navigating.
  // Center card: let the Link navigate normally.
  const handleCardClick = (i, e) => {
    if (isDragging.current) {
      e.preventDefault();
      return;
    }
    if (i !== center) {
      e.preventDefault();
      pauseTemporarily();
      setCenter(i);
    }
    // i === center → no preventDefault, Link navigates to visa.href
  };

  const onPointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    isDragging.current = false;
  };
  const onPointerMove = (e) => {
    if (dragStartX.current === null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (Math.abs(x - dragStartX.current) > 8) isDragging.current = true;
  };
  const onPointerUp = (e) => {
    if (dragStartX.current === null) return;
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const diff = dragStartX.current - x;
    if (Math.abs(diff) > 40) {
      diff > 0 ? handleNext() : handlePrev();
    }
    dragStartX.current = null;
  };

  return (
    <section className="select-none py-14 w-full">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-2 mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-white text-3xl lg:text-4xl font-light">
            Visa Services{" "}
            <span className="text-[#C9A84C] font-bold">Worldwide</span>
          </h2>
          <p className="text-white/50 text-sm mt-1 tracking-wide">
            Expert visa assistance for your journey
          </p>
        </div>
        <button className="text-white text-sm border-b border-white/40 pb-0.5 hover:border-white transition-colors hidden sm:block">
          View all
        </button>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto overflow-hidden">
        <div
          className="relative h-[360px] sm:h-[440px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={() => { dragStartX.current = null; }}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {visaServices.map((visa, i) => {
            let offset = i - center;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;

            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const isCenter = offset === 0;

            const SPREAD = 240;
            const translateX = offset * SPREAD;
            const scale = isCenter ? 1 : abs === 1 ? 0.8 : 0.64;
            const translateY = abs === 0 ? 0 : abs === 1 ? 16 : 32;
            const zIndex = 20 - abs * 5;
            const opacity = abs > 1 ? 0.6 : 1;

            return (
              <Link
                key={visa.city}
                href={visa.href}
                onClick={(e) => handleCardClick(i, e)}
                className="absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  willChange: "transform",
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ${
                    isCenter
                      ? "w-[260px] sm:w-[340px] lg:w-[400px] h-[320px] sm:h-[400px] lg:h-[460px]"
                      : "w-[200px] sm:w-[260px] lg:w-[300px] h-[260px] sm:h-[330px] lg:h-[380px]"
                  }`}
                >
                  <img
                    src={visa.image}
                    alt={visa.city}
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  {/* Top badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white/90 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full tracking-wide">
                      {visa.badge}
                    </span>
                  </div>

                  {/* Visa icon stamp — top right */}
                  {isCenter && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#C9A84C]/90 backdrop-blur-sm text-black text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase">
                        VISA
                      </span>
                    </div>
                  )}

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3
                      className={`text-white font-bold leading-tight ${
                        isCenter
                          ? "text-2xl sm:text-3xl lg:text-4xl"
                          : "text-lg sm:text-xl lg:text-2xl"
                      }`}
                    >
                      {visa.city}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mt-1.5">
                      Fee from{" "}
                      <span className="text-[#FACC15] font-bold text-sm sm:text-base">
                        {visa.price}
                      </span>{" "}
                      <span className="text-white/50">· {visa.miles}</span>
                    </p>
                  </div>

                  {/* Active ring for center card */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C9A84C]/40 pointer-events-none" />
                  )}
                </div>
              </Link>
            );
          })}

          {/* Left / Right nav buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/25 active:scale-95 transition-all"
            aria-label="Previous visa"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/25 active:scale-95 transition-all"
            aria-label="Next visa"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {visaServices.map((_, i) => (
          <button
            key={i}
            onClick={() => { pauseTemporarily(); setCenter(i); }}
            aria-label={`Go to ${visaServices[i].city}`}
            className={`transition-all duration-300 rounded-full ${
              i === center
                ? "w-6 h-2.5 bg-[#C9A84C]"
                : "w-2.5 h-2.5 bg-white/25 hover:bg-white/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}