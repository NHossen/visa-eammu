"use client";

import { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  CalendarCheck,
  MessageCircle,
  Globe,
  Tag,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Plane,
  Users,
  ArrowRightLeft,
} from "lucide-react";

const navItems = [
  { label: "Check Tourist Visa", icon: Globe },
  { label: "Student Visa",       icon: GraduationCap },
  { label: "Work Visa",          icon: Briefcase },
  { label: "Family Visa",        icon: Users },
  { label: "Transit Visa",       icon: ArrowRightLeft },
  { label: "Appointment",        icon: CalendarCheck },
  { label: "Travel Booking",     icon: Plane },
  { label: "Visa Offers",        icon: Tag },
  { label: "Free Consult",       icon: MessageCircle },
  { label: "Help",               icon: HelpCircle },
];

export default function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    // hidden on mobile/tablet, always visible on lg+
    <aside
      className={`
        hidden lg:flex
        fixed top-0 left-0 h-full z-[80]
        bg-[#0b151e]/90 backdrop-blur-xl
        border-r border-white/8
        flex-col
        transition-all duration-300 ease-out
        ${collapsed ? "w-[72px]" : "w-[200px]"}
      `}
      style={{
        boxShadow: "4px 0 32px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* ── Logo ── */}
      <div className={`flex items-center py-5 transition-all duration-300 ${collapsed ? "justify-center px-0" : "px-4"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/eammu_white_logo.webp"
          alt="Eammu Holidays"
          className={`object-contain transition-all duration-300 ${collapsed ? "w-9 h-9" : "w-32 h-10"}`}
        />
      </div>

      <div className="h-px bg-white/6 mx-3 mb-1" />

      {/* ── Nav items ── */}
      <nav className="flex-1 px-2 mt-2 space-y-0.5 overflow-y-auto scrollbar-none">
        {navItems.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            title={collapsed ? label : undefined}
            className={`
              group flex items-center gap-3 py-2.5 rounded-xl
              text-white/65 hover:text-white hover:bg-white/7
              transition-all duration-150
              ${collapsed ? "justify-center px-0" : "px-3"}
            `}
          >
            <Icon
              size={18}
              className="shrink-0 group-hover:text-[#FACC15] transition-colors duration-150"
            />
            {!collapsed && (
              <span className="text-[13px] font-medium leading-none">{label}</span>
            )}
          </a>
        ))}
      </nav>

      {/* ── CTA card (expanded only) ── */}
      {!collapsed && (
        <div className="mx-3 mb-4 mt-2 rounded-xl bg-[#FACC15]/8 border border-[#FACC15]/18 px-4 py-3">
          <p className="text-[#FACC15] text-xs font-semibold">Free Visa Check</p>
          <p className="text-white/45 text-[11px] mt-0.5 leading-snug">
            Talk to an expert — no charge
          </p>
          <a
            href="#"
            className="mt-2 inline-block text-[#FACC15] text-[11px] font-semibold underline underline-offset-2 hover:text-white transition-colors"
          >
            Book now →
          </a>
        </div>
      )}

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="
          absolute top-[72px] -right-3
          w-6 h-6 flex items-center justify-center
          rounded-full bg-[#1a2d3a] border border-white/12
          text-white/60 hover:text-white hover:bg-[#243d4d]
          transition-all duration-150 shadow-lg shadow-black/30
        "
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>
    </aside>
  );
}