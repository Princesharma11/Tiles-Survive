"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  StatCounter — counts up when scrolled into view (sticker style).   */
/* ------------------------------------------------------------------ */

export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(2, "0")),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="px-4 text-center sm:px-6">
      <p className="font-display text-3xl font-extrabold text-ink">
        {display}
        <span className="text-ember">{suffix}</span>
      </p>
      <p className="mt-0.5 font-mono text-[10px] font-bold tracking-[0.22em] text-ink-soft">
        {label}
      </p>
    </div>
  );
}

export default StatCounter;
