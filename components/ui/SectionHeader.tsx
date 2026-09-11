"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import Reveal from "@/components/motion/Reveal";

/* ------------------------------------------------------------------ */
/*  SectionHeader — HUD eyebrow + display title + description.         */
/* ------------------------------------------------------------------ */

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string; // highlighted tail of the title
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const words = accent ? title.split(" " + accent) : [title];

  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <motion.p
          variants={fadeUp}
          className={cn(
            "mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-gold-500",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden className="inline-block size-1.5 animate-blip rounded-full bg-gold-500" />
          {eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl font-bold uppercase italic leading-[1.05] tracking-tight text-steel-100 sm:text-4xl lg:text-5xl"
        >
          {words[0]}
          {accent && (
            <>
              {" "}
              <span className="text-gradient-gold">{accent}</span>
            </>
          )}
        </motion.h2>
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-steel-300"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </Reveal>
  );
}

export default SectionHeader;
