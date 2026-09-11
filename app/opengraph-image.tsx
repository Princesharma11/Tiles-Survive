import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  Open Graph image — generated at build time by Vercel (next/og).    */
/*  Warm adventure palette matching the game world.                    */
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
          background: "linear-gradient(160deg, #fde7c8 0%, #fbd9a8 55%, #f6c445 100%)",
          position: "relative",
        }}
      >
        {/* Tiles */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 110,
            width: 88,
            height: 88,
            background: "#6fae3e",
            border: "5px solid #2d2a26",
            borderRadius: 20,
            transform: "rotate(-10deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 120,
            width: 70,
            height: 70,
            background: "#f07d2e",
            border: "5px solid #2d2a26",
            borderRadius: 18,
            transform: "rotate(12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 130,
            right: 250,
            width: 44,
            height: 44,
            background: "#ed5ca8",
            border: "4px solid #2d2a26",
            borderRadius: 12,
            transform: "rotate(18deg)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#2fa39b",
            border: "5px solid #2d2a26",
            borderRadius: 999,
            padding: "10px 30px",
            fontSize: 26,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 26,
          }}
        >
          FAN-MADE COMPANION
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#2d2a26",
            letterSpacing: "-0.02em",
          }}
        >
          Titan
          <span style={{ color: "#d9631e" }}>Tiles</span>
          Survive
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            padding: "14px 36px",
            background: "#2d2a26",
            borderRadius: 18,
            fontSize: 30,
            fontWeight: 700,
            color: "#ffb03a",
            letterSpacing: "0.08em",
          }}
        >
          STOP GUESSING. START CONQUERING.
        </div>
      </div>
    ),
    size
  );
}
