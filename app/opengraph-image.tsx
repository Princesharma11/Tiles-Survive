import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  Open Graph image — generated at build time by Vercel (next/og).    */
/*  1200×630 social card: void backdrop, gold tiles, wordmark.         */
/* ------------------------------------------------------------------ */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #04060c 0%, #0b1220 55%, #131c10 100%)",
          position: "relative",
        }}
      >
        {/* Tile motif */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 110,
            width: 84,
            height: 84,
            background: "#f5b942",
            borderRadius: 14,
            opacity: 0.85,
            transform: "rotate(12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 120,
            width: 64,
            height: 64,
            border: "3px solid #ff5c33",
            borderRadius: 12,
            opacity: 0.7,
            transform: "rotate(-14deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 140,
            right: 240,
            width: 40,
            height: 40,
            border: "2px solid #57e6c5",
            borderRadius: 8,
            opacity: 0.5,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            letterSpacing: "0.5em",
            color: "#9dacc6",
            marginBottom: 18,
          }}
        >
          [ COMMAND INTELLIGENCE ]
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#e8edf6",
            letterSpacing: "-0.02em",
          }}
        >
          TITAN
          <span style={{ color: "#f5b942" }}>TILES</span>
          SURVIVE
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            padding: "12px 34px",
            border: "2px solid rgba(245,185,66,0.45)",
            borderRadius: 10,
            fontSize: 30,
            color: "#ffe1a1",
            letterSpacing: "0.14em",
          }}
        >
          STOP GUESSING. START CONQUERING.
        </div>
      </div>
    ),
    size
  );
}
