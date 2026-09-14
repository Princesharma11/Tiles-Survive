"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import TitanButton from "@/components/ui/TitanButton";
import StatCounter from "@/components/ui/StatCounter";
import { CrosshairIcon, SwordsIcon, ChevronDownIcon } from "@/components/ui/icons";
import { site, heroStats } from "@/data/site";
import {
  EASE_OUT_EXPO,
  lineReveal,
  popIn,
  springPop,
  staggerContainer,
} from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  HeroSection — the real Tiles Survive! world: official key art,     */
/*  parallax camera, floating hero cutouts, sticker typography.        */
/* ------------------------------------------------------------------ */

/** Floating character cutouts (official art, transparent webp). */
const CAST = [
  {
    src: "/heroes/cutout-ghost.webp",
    alt: "Ghost — Tiles Survive hero in a graffiti hoodie",
    w: 792,
    h: 880,
    className: "right-[24%] bottom-[6%] h-[46vh] opacity-95 z-[1]",
    parallax: 90,
    bob: 5.4,
    delay: 0.75,
    flip: true,
  },
  {
    src: "/heroes/cutout-lucky.webp",
    alt: "Lucky — Tiles Survive hero with pink pigtails",
    w: 641,
    h: 880,
    className: "right-[3%] top-[16%] h-[34vh] opacity-95 z-[2]",
    parallax: 140,
    bob: 6.2,
    delay: 0.95,
    flip: false,
  },
  {
    src: "/heroes/cutout-maddie.webp",
    alt: "Maddie — Tiles Survive hero with slingshot",
    w: 799,
    h: 880,
    className: "right-[6%] bottom-0 h-[58vh] z-[3]",
    parallax: 30,
    bob: 4.6,
    delay: 0.55,
    flip: false,
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 150]);
  const artScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.04, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* ---------- Layer 0: sky base (instant paint) ---------- */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#fde7c8] via-[#fbd9a8] to-[#f6e3bd]" />

      {/* ---------- Layer 1: official key art with camera drift ---------- */}
      <motion.div aria-hidden style={{ y: artY, scale: artScale }} className="absolute inset-0">
        <Image
          src="/world/keyart-wide.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </motion.div>

      {/* ---------- Layer 2: legibility scrims ---------- */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/55 to-cream/5"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent"
      />

      {/* ---------- Layer 3: floating hero cutouts ---------- */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        {CAST.map((c) => (
          <Cutout key={c.src} {...c} progress={scrollYProgress} reduce={!!reduce} />
        ))}

        {/* Meta sticker badge near Maddie */}
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.5 }}
          className="absolute bottom-[38%] right-[26%] z-[4] -rotate-6"
        >
          <motion.div
            animate={reduce ? undefined : { rotate: [-6, -2, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-3 py-1 font-display text-sm font-extrabold text-ink shadow-[0_3px_0_0_#2d2a26]"
          >
            ★ META SQUAD
          </motion.div>
        </motion.div>
      </div>

      {/* Single cutout for mobile (keeps the wow, stays clean) */}
      <motion.div
        aria-hidden
        variants={popIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.9 }}
        className="absolute bottom-0 right-0 z-[1] md:hidden"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-56 w-44"
        >
          <Image
            src="/heroes/cutout-maddie.webp"
            alt=""
            fill
            sizes="200px"
            className="object-contain object-bottom drop-shadow-[0_16px_18px_rgba(45,42,38,0.35)]"
          />
        </motion.div>
      </motion.div>

      {/* ---------- Layer 4: content ---------- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-36 sm:px-8 md:pt-40"
      >
        <motion.span
          variants={popIn}
          initial="hidden"
          animate="show"
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-ink shadow-[0_3px_0_0_#2d2a26]"
        >
          <span aria-hidden>🧭</span>
          Fan-made companion // {site.patch}
        </motion.span>

        <motion.h1
          variants={staggerContainer(0.16, 0.2)}
          initial="hidden"
          animate="show"
          className="max-w-3xl font-display text-[clamp(3rem,8.5vw,6.8rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
        >
          <span className="block overflow-hidden pb-1">
            <motion.span variants={lineReveal} className="block text-stroked text-cream drop-shadow-[0_6px_0_rgba(45,42,38,0.25)]">
              Stop Guessing.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3">
            <motion.span variants={lineReveal} className="text-stroked text-sunset block">
              Start Conquering.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-5 max-w-lg rounded-2xl border-2 border-ink/10 bg-cream/70 p-4 text-lg font-bold leading-relaxed text-ink backdrop-blur-sm sm:text-xl"
        >
          Turn raw Tiles Survive! data into decisive moves — war-room planning,
          hero meta math, and tier-tested strategy in one command deck.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: EASE_OUT_EXPO }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <TitanButton
            href="/war-room"
            size="xl"
            icon={<SwordsIcon className="size-5" />}
          >
            Enter War Room
          </TitanButton>
          <TitanButton
            href="/hero-meta-calc"
            variant="paper"
            size="xl"
            icon={<CrosshairIcon className="size-5" />}
          >
            Analyze Roster
          </TitanButton>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          variants={staggerContainer(0.1, 1.05)}
          initial="hidden"
          animate="show"
          className="mt-12 flex w-fit max-w-full flex-wrap gap-3"
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={popIn}
              className="rounded-2xl border-[3px] border-ink bg-white/85 px-5 py-2.5 shadow-[0_4px_0_0_#2d2a26] backdrop-blur-sm"
            >
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="relative z-10 mx-auto -mb-1 flex flex-col items-center gap-1"
      >
        <span className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-ink-soft">
          Scroll to explore
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="grid size-9 place-items-center rounded-full border-[3px] border-ink bg-white text-ember shadow-[0_3px_0_0_#2d2a26]"
        >
          <ChevronDownIcon className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* -------------------- parallax cutout -------------------- */

type CutoutProps = {
  src: string;
  alt: string;
  w: number;
  h: number;
  className: string;
  parallax: number;
  bob: number;
  delay: number;
  flip: boolean;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
};

function Cutout({
  src,
  alt,
  w,
  h,
  className,
  parallax,
  bob,
  delay,
  flip,
  progress,
  reduce,
}: CutoutProps) {
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : parallax]);

  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <motion.div
        variants={popIn}
        initial="hidden"
        animate="show"
        transition={{ delay }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: bob, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-full"
          style={{ aspectRatio: `${w} / ${h}` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width:1280px) 40vw, 30vw"
            className={`object-contain object-bottom drop-shadow-[0_24px_22px_rgba(45,42,38,0.4)] ${
              flip ? "scale-x-[-1]" : ""
            }`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
