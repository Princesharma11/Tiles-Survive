"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  LazyHeroCanvas — the performance firewall.                         */
/*                                                                     */
/*  • three.js / R3F / drei are code-split behind next/dynamic         */
/*    (ssr: false) — zero 3D code in the initial JS payload.           */
/*  • Actual mount is deferred to browser idle time so hydration       */
/*    and LCP complete first.                                          */
/*  • A CSS-only fallback stage crossfades in instantly, and also      */
/*    serves permanently for users preferring reduced motion.          */
/* ------------------------------------------------------------------ */

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function LazyHeroCanvas() {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 400);
    const id = idle(() => setReady(true));
    return () => {
      if (typeof window.cancelIdleCallback === "function" && typeof id === "number") {
        window.cancelIdleCallback(id);
      } else if (typeof id === "number") {
        window.clearTimeout(id);
      }
    };
  }, [reduceMotion]);

  const showCanvas = ready && !reduceMotion;

  return (
    <div className="absolute inset-0" aria-hidden>
      <AnimatePresence mode="wait">
        {showCanvas ? (
          <motion.div
            key="canvas"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <HeroCanvas />
          </motion.div>
        ) : (
          <motion.div
            key="fallback"
            className="hero-fallback absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Tactical grid overlay shared by both stages */}
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(75%_65%_at_50%_45%,black,transparent)]" />
    </div>
  );
}
