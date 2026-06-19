// app/api/suggest/route.js
// Proxies requests to eammu /suggest so the API key stays server-side.
// Usage: GET /api/suggest?q=ban

import { NextResponse } from "next/server";

const EAMMU_BASE = "https://api.eammu.com/api/v1";
const EAMMU_KEY  = process.env.EAMMU_API_KEY; // server-only env var (no NEXT_PUBLIC_)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const upstream = await fetch(
      `${EAMMU_BASE}/suggest?q=${encodeURIComponent(q)}&api_key=${EAMMU_KEY}`,
      { next: { revalidate: 60 } } // cache identical queries for 60s
    );

    if (!upstream.ok) {
      return NextResponse.json({ suggestions: [] }, { status: upstream.status });
    }

    const data = await upstream.json();
    return NextResponse.json({ suggestions: data.suggestions || [] });
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}