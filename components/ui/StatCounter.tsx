"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  StatCounter — counts up when scrolled into view.                   */
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
      duration: 1.8,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(2, "0")),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="px-4 text-center sm:px-6">
      <p className="font-display text-2xl font-bold text-gold-400 sm:text-3xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-steel-400">
        {label}
      </p>
    </div>
  );
}

export default StatCounter;
