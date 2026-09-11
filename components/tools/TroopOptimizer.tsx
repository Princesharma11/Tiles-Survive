"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import EnemyIntelPanel from "./EnemyIntelPanel";
import OptimizerDashboard from "./OptimizerDashboard";
import HeroPairingPanel from "./HeroPairingPanel";
import {
  computeRecommendation,
  type Comp,
  type Faction,
  type TroopType,
} from "@/lib/tools/troopOptimizer";
import { popIn } from "@/lib/animations/variants";

/* ------------------------------------------------------------------ */
/*  TroopOptimizer — orchestrates the full blueprint:                  */
/*  Phase 1 scout input → Phase 2 engine → Phase 3 dashboard →         */
/*  Phase 4 hero pairing. All math is pure (lib/tools/troopOptimizer). */
/* ------------------------------------------------------------------ */

const DEFAULT_ENEMY: Comp = { guards: 33, gunners: 34, marksmen: 33 };

export default function TroopOptimizer() {
  const [capacity, setCapacity] = useState(150_000);
  const [enemy, setEnemy] = useState<Comp>(DEFAULT_ENEMY);
  const [faction, setFaction] = useState<Faction | "unknown">("unknown");

  /** Interconnected sliders: the two untouched types absorb the change
      proportionally, so the composition always sums to exactly 100. */
  const handleEnemyChange = (type: TroopType, value: number) => {
    setEnemy((prev) => {
      const v = Math.min(100, Math.max(0, value));
      const others = (Object.keys(prev) as TroopType[]).filter((t) => t !== type);
      const restTotal = 100 - v;
      const curSum = others.reduce((s, t) => s + prev[t], 0);
      const next = { ...prev, [type]: v } as Comp;
      if (curSum <= 0) {
        for (const t of others) next[t] = restTotal / others.length;
      } else {
        for (const t of others) next[t] = restTotal * (prev[t] / curSum);
      }
      return next;
    });
  };

  const result = useMemo(
    () => computeRecommendation(enemy, capacity),
    [enemy, capacity]
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Phase banner */}
      <motion.p
        variants={popIn}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center gap-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-ink-faint sm:text-left"
      >
        <span className="rounded-full border-2 border-ink/15 bg-white px-2.5 py-0.5 text-ember-deep">
          Phase 1
        </span>
        Scout report
        <span aria-hidden>→</span>
        <span className="rounded-full border-2 border-ink/15 bg-white px-2.5 py-0.5 text-ember-deep">
          Phase 2–3
        </span>
        Counter solution
        <span aria-hidden>→</span>
        <span className="rounded-full border-2 border-ink/15 bg-white px-2.5 py-0.5 text-ember-deep">
          Phase 4
        </span>
        Hero pairing
      </motion.p>

      <div className="grid items-start gap-6 lg:grid-cols-[380px_1fr]">
        <EnemyIntelPanel
          capacity={capacity}
          onCapacity={setCapacity}
          enemy={enemy}
          onEnemyChange={handleEnemyChange}
          onPreset={(comp) => setEnemy(comp)}
          faction={faction}
          onFaction={setFaction}
        />
        <OptimizerDashboard
          result={result}
          enemy={enemy}
          capacity={capacity}
        />
      </div>

      {/* Phase 4 */}
      <div>
        <motion.h2
          variants={popIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-4 font-display text-2xl font-extrabold uppercase tracking-tight text-ink"
        >
          Hero pairing <span className="text-sunset">for this march</span>
        </motion.h2>
        <HeroPairingPanel result={result} faction={faction} />
      </div>
    </div>
  );
}
