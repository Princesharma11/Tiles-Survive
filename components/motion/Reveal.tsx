"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  Reveal — drop-in scroll-reveal wrapper (whileInView, fires once).  */
/* ------------------------------------------------------------------ */

export interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
