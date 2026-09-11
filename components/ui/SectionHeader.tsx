"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeUp, springPop, staggerContainer } from "@/lib/animations/variants";
import Reveal from "@/components/motion/Reveal";

/* ------------------------------------------------------------------ */
/*  SectionHeader — expedition signpost: wooden badge + big title.     */
/* ------------------------------------------------------------------ */

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string; // highlighted tail of the title
  description?: string;
  align?: "left" | "center";
  dark?: boolean; // on dark (pine) sections
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  dark = false,
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
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.span
          variants={fadeUp}
          className={cn(
            "mb-5 inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.22em]",
            dark
              ? "border-cream/30 bg-cream/10 text-gold"
              : "border-ink/15 bg-white text-ember-deep shadow-[0_2px_0_0_rgba(45,42,38,0.15)]"
          )}
        >
          <span aria-hidden className="text-base leading-none">
            ⛺
          </span>
          {eyebrow}
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className={cn(
            "font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.4rem]",
            dark ? "text-cream" : "text-ink"
          )}
        >
          {words[0]}
          {accent && (
            <>
              {" "}
              <span className="text-sunset">{accent}</span>
            </>
          )}
        </motion.h2>

        {description && (
          <motion.p
            variants={fadeUp}
            transition={springPop}
            className={cn(
              "mt-4 text-lg font-semibold leading-relaxed",
              dark ? "text-cream/75" : "text-ink-soft"
            )}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </Reveal>
  );
}

export default SectionHeader;
