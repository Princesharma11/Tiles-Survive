"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { Feature } from "@/data/features";
import { springPop, springSoft } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  FeatureCard — sticker game panel: real world-scene art header,     */
/*  ink outline, hard edge. Expands on hover (tap on mobile) to        */
/*  reveal the tool's loadout with springy height animation.           */
/* ------------------------------------------------------------------ */

export default function FeatureCard({ feature }: { feature: Feature }) {
  const [expanded, setExpanded] = useState(false);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, ${feature.chipColor}22, transparent 70%)`;

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 44, rotate: -1 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: springPop,
        },
      }}
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onTap={() => setExpanded((v) => !v)}
      onMouseMove={handleMove}
      whileHover={reduce ? undefined : { y: -10, rotate: 0.4 }}
      transition={springSoft}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-[0_5px_0_0_#2d2a26,0_22px_40px_-18px_rgba(45,42,38,0.4)]"
      data-expanded={expanded}
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: spotlight, opacity: expanded ? 1 : 0 }}
      />

      {/* Art header */}
      <div className="relative h-48 overflow-hidden border-b-[3px] border-ink">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent"
        />
        {/* Module chip */}
        <span
          className="absolute left-4 top-4 rounded-full border-[3px] border-ink px-3 py-1 font-display text-[11px] font-extrabold tracking-[0.14em] text-ink shadow-[0_3px_0_0_#2d2a26]"
          style={{ background: feature.chipColor }}
        >
          MODULE {feature.index}
        </span>
        {/* Status badge */}
        <span
          className={`absolute right-4 top-4 rounded-full border-[3px] border-ink px-3 py-1 font-display text-[11px] font-extrabold tracking-[0.14em] shadow-[0_3px_0_0_#2d2a26] ${
            feature.status === "LIVE"
              ? "bg-leaf text-white"
              : "bg-gold text-ink"
          }`}
        >
          {feature.status === "LIVE" ? "● LIVE" : "◆ BETA"}
        </span>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink">
          {feature.title}
        </h3>
        <p
          className="mt-0.5 font-display text-sm font-bold"
          style={{ color: feature.chipColor }}
        >
          {feature.tagline}
        </p>

        <p className="mt-3 text-base font-semibold leading-relaxed text-ink-soft">
          {feature.description}
        </p>

        {/* Expandable loadout */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ ...springSoft, opacity: { duration: 0.25 } }}
          className="overflow-hidden"
        >
          <div className="pt-4">
            <ul className="space-y-2 rounded-2xl border-2 border-dashed border-ink/20 bg-paper/60 p-4">
              {feature.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2.5 text-sm font-bold text-ink"
                >
                  <span
                    aria-hidden
                    className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink text-[9px]"
                    style={{ background: feature.chipColor }}
                  >
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-paper px-3 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-ink-soft">
              {feature.meta.toUpperCase()}
            </span>
            <Link
              href={feature.href}
              className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-gradient-to-b from-flame to-ember px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_3px_0_0_#a03f10] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              Open
              <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <p
            className="mt-3 text-center font-display text-[11px] font-bold uppercase tracking-[0.25em] text-ink-faint transition-opacity duration-200"
            style={{ opacity: expanded ? 0 : 1 }}
          >
            Hover to expand // tap on mobile
          </p>
        </div>
      </div>
    </motion.article>
  );
}
