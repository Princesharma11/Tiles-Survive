"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  findSynergy,
  HEROES,
  heroById,
  SYNERGY_PAIRS,
  type Hero,
} from "@/data/heroMeta";
import { popIn, springSoft } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  SynergyTracker — pick two heroes, see how their kits interact.     */
/* ------------------------------------------------------------------ */

function Monogram({ hero, size = "md" }: { hero: Hero; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl border-2 border-ink font-display font-extrabold text-white",
        size === "md" ? "size-12 text-lg" : "size-10 text-base"
      )}
      style={{ background: hero.accent }}
      aria-hidden
    >
      {hero.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function SynergyTracker() {
  const [aId, setAId] = useState("nikola");
  const [bId, setBId] = useState("tara");

  const roster = useMemo(() => [...HEROES].sort((x, y) => y.score - x.score), []);
  const a = heroById(aId)!;
  const b = heroById(bId)!;
  const synergy = useMemo(
    () => (aId === bId ? null : findSynergy(aId, bId)),
    [aId, bId]
  );

  const HeroOption = ({ hero }: { hero: Hero }) => (
    <span className="flex items-center gap-2">
      <span className="relative size-8 shrink-0 overflow-hidden rounded-lg border-2 border-ink bg-paper">
        {hero.portrait ? (
          <Image src={hero.portrait} alt="" fill sizes="32px" className="object-cover" />
        ) : (
          <span
            className="grid size-full place-items-center font-display text-[10px] font-extrabold text-white"
            style={{ background: hero.accent }}
          >
            {hero.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-sm font-extrabold text-ink">
          {hero.name}
        </span>
        <span className="block font-mono text-[9px] font-bold uppercase tracking-wide text-ink-faint">
          {hero.tier}-tier · {hero.role}
        </span>
      </span>
    </span>
  );

  return (
    <motion.div
      variants={popIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-[0_6px_0_0_#2d2a26,0_30px_50px_-20px_rgba(45,42,38,0.4)]"
    >
      <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-40" />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-ember-deep">
              🧪 Synergy Tracker
            </p>
            <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink">
              Do their kits <span className="text-sunset">compound?</span>
            </h3>
          </div>
          <p className="rounded-full border-2 border-dashed border-ink/25 px-3 py-1 font-mono text-[10px] font-bold text-ink-faint">
            {SYNERGY_PAIRS.length} documented pairs · community-tested estimates
          </p>
        </div>

        {/* Pickers */}
        <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              Hero A
            </span>
            <select
              value={aId}
              onChange={(e) => setAId(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-ink bg-paper/70 px-3 py-2.5 font-display text-sm font-bold text-ink focus:border-ember focus:outline-none"
            >
              {roster.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.tier}-tier {h.heroClass})
                </option>
              ))}
            </select>
            <span className="mt-2 block rounded-2xl border-[3px] border-ink bg-white p-2 shadow-[0_3px_0_0_#2d2a26]">
              <HeroOption hero={a} />
            </span>
          </label>

          <span
            aria-hidden
            className="mx-auto grid size-12 place-items-center rounded-full border-[3px] border-ink bg-gradient-to-b from-gold to-flame font-display text-xl font-extrabold text-ink shadow-[0_3px_0_0_#2d2a26]"
          >
            ✕
          </span>

          <label className="block">
            <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
              Hero B
            </span>
            <select
              value={bId}
              onChange={(e) => setBId(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-ink bg-paper/70 px-3 py-2.5 font-display text-sm font-bold text-ink focus:border-ember focus:outline-none"
            >
              {roster.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.tier}-tier {h.heroClass})
                </option>
              ))}
            </select>
            <span className="mt-2 block rounded-2xl border-[3px] border-ink bg-white p-2 shadow-[0_3px_0_0_#2d2a26]">
              <HeroOption hero={b} />
            </span>
          </label>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${aId}-${bId}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springSoft}
            className="mt-6"
          >
            {aId === bId ? (
              <p className="rounded-2xl border-[3px] border-dashed border-ink/25 bg-paper/60 px-4 py-5 text-center font-display text-sm font-extrabold text-ink-soft">
                🪞 Same hero twice — even Rosie can&apos;t synergy with herself.
                Pick two different heroes.
              </p>
            ) : synergy ? (
              <div className="relative overflow-hidden rounded-2xl border-[3px] border-ink bg-pine p-5 text-cream shadow-[0_4px_0_0_#2d2a26]">
                <div aria-hidden className="bg-tilegrid absolute inset-0 opacity-10" />
                <div className="relative flex flex-wrap items-center gap-3">
                  <span className="rounded-full border-2 border-cream/40 bg-cream/10 px-3 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-gold">
                    Synergy detected
                  </span>
                  <p className="font-display text-xl font-extrabold sm:text-2xl">
                    {synergy.title}
                  </p>
                  <span className="ml-auto flex items-center gap-0.5" aria-label={`${synergy.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-base leading-none",
                          i < synergy.rating ? "opacity-100" : "opacity-25"
                        )}
                        aria-hidden
                      >
                        ⭐
                      </span>
                    ))}
                  </span>
                </div>
                <p className="relative mt-3 max-w-2xl font-semibold leading-relaxed text-cream/85">
                  {synergy.effect}
                </p>
                <p className="relative mt-4 inline-block rounded-xl border-2 border-ink bg-gradient-to-b from-gold to-flame px-3.5 py-1.5 font-display text-sm font-extrabold text-ink shadow-[0_3px_0_0_#2d2a26]">
                  📈 {synergy.math}
                </p>
                <p className="relative mt-3 font-mono text-[10px] font-bold text-cream/45">
                  {a.name} × {b.name} · estimates from community fight logs —
                  in-game numbers vary by gear and Behemoth.
                </p>
              </div>
            ) : (
              <p className="rounded-2xl border-[3px] border-dashed border-ink/25 bg-paper/60 px-4 py-5 text-center font-display text-sm font-extrabold text-ink-soft">
                🤔 No notable documented synergy between {a.name} and{" "}
                {b.name} — safe to field together, just unremarkable. Try{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAId("nikola");
                    setBId("tara");
                  }}
                  className="text-ember-deep underline decoration-dotted underline-offset-2 hover:text-ember"
                >
                  Nikola + Tara
                </button>
                .
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
