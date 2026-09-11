"use client";

import TitanButton from "@/components/ui/TitanButton";
import Reveal from "@/components/motion/Reveal";
import { SwordsIcon, CrosshairIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  CallToArms — final conversion panel of the homepage.               */
/* ------------------------------------------------------------------ */

export default function CallToArms() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-6 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold-500/20 bg-panel/50 px-6 py-16 text-center backdrop-blur-md sm:px-12 md:py-24">
          {/* Inner atmosphere */}
          <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_80%_at_50%_50%,black,transparent)]" />
          <div aria-hidden className="absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[110px]" />

          <p className="relative font-mono text-[11px] tracking-[0.38em] text-gold-500">
            [ 04 // DEPLOY ]
          </p>
          <h2 className="relative mx-auto mt-5 max-w-2xl font-display text-3xl font-bold uppercase italic leading-[1.05] tracking-tight text-steel-100 sm:text-5xl">
            The map doesn&apos;t wait for the <span className="text-gradient-gold">unprepared.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-steel-300">
            Every tile you contest without a plan is troops you&apos;ll retrain
            tomorrow. Open the war room, run the numbers, and march with
            certainty.
          </p>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <TitanButton href="/war-room" size="lg" icon={<SwordsIcon className="size-[18px]" />}>
              Enter War Room
            </TitanButton>
            <TitanButton href="/tier-list" variant="ghost" size="lg" icon={<CrosshairIcon className="size-[18px]" />}>
              Scout The Meta
            </TitanButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
