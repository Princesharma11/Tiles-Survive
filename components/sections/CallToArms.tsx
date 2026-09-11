"use client";

import TitanButton from "@/components/ui/TitanButton";
import Reveal from "@/components/motion/Reveal";
import LazyHeroCanvas from "@/components/three/LazyHeroCanvas";
import { SwordsIcon, TrophyIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  CallToArms — grand finale: the living 3D tile world (floating      */
/*  island rendered in R3F, warm palette) under a giant invite.        */
/* ------------------------------------------------------------------ */

export default function CallToArms() {
  return (
    <section className="relative overflow-hidden border-t-[3px] border-ink bg-gradient-to-b from-[#fde7c8] via-[#fbd9a8] to-ember/90 pb-28 pt-10">
      {/* 3D floating island — lazily mounted, pointer-transparent */}
      <div aria-hidden className="absolute inset-0 opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black)]">
        <LazyHeroCanvas />
      </div>

      {/* Soft scrims for legibility */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_58%,rgba(255,249,240,0.85),transparent_70%)]" />

      <Reveal className="relative z-10 mx-auto max-w-4xl px-5 pt-40 text-center sm:px-8 md:pt-52">
        <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ember-deep shadow-[0_3px_0_0_#2d2a26]">
          <span aria-hidden>🌋</span> The world is alive
        </span>

        <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[1.0] tracking-tight sm:text-6xl">
          <span className="text-stroked block text-cream drop-shadow-[0_6px_0_rgba(45,42,38,0.25)]">
            The map doesn&apos;t wait
          </span>
          <span className="text-stroked text-sunset block">for the unprepared.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl rounded-2xl border-2 border-ink/10 bg-cream/75 p-4 text-lg font-bold leading-relaxed text-ink backdrop-blur-sm">
          Every tile you contest without a plan is troops you&apos;ll retrain
          tomorrow. Open the war room, run the numbers, march with certainty.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <TitanButton href="/war-room" size="xl" icon={<SwordsIcon className="size-5" />}>
            Enter War Room
          </TitanButton>
          <TitanButton href="/tier-list" variant="paper" size="xl" icon={<TrophyIcon className="size-5" />}>
            Scout The Meta
          </TitanButton>
        </div>
      </Reveal>
    </section>
  );
}
