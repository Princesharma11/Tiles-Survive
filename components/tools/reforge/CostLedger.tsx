"use client";

import { REFORGE_ECONOMY } from "@/data/gearReforge";
import {
  hammerTranslation,
  type ReforgeMethod,
} from "@/lib/tools/reforgeEngine";
import { cn } from "@/lib/utils/cn";
import { Panel, PanelLabel } from "./parts";

/* ------------------------------------------------------------------ */
/*  CostLedger — the persistent hammer economy readout.                */
/*  Counts every simulated hammer and translates it into real effort.  */
/* ------------------------------------------------------------------ */

export default function CostLedger({
  hammers,
  rolls,
  nextCost,
  locks,
  method,
  advancedUnlocked,
}: {
  hammers: number;
  rolls: number;
  nextCost: number;
  locks: number;
  method: ReforgeMethod;
  advancedUnlocked: boolean;
}) {
  const sunkWarning =
    locks >= 2 && hammers >= REFORGE_ECONOMY.sunkWarnThreshold;

  const unlockProgress = Math.min(1, hammers / REFORGE_ECONOMY.advancedUnlockAt);

  return (
    <Panel className="p-6">
      <PanelLabel>Resource Ledger</PanelLabel>

      {/* headline counter */}
      <div className="mt-3 flex items-end gap-3">
        <p className="font-mono text-5xl font-extrabold tabular-nums leading-none text-ink">
          {hammers.toLocaleString()}
        </p>
        <p className="pb-1 font-display text-sm font-extrabold uppercase tracking-wide text-ember-deep">
          🔨 Reforge Hammers
        </p>
      </div>
      <p className="mt-2 text-xs font-bold leading-relaxed text-ink-soft">
        You have consumed{" "}
        <span className="text-ink">{hammers.toLocaleString()} Reforge Hammers</span>. This is
        equivalent to {hammerTranslation(hammers)}.
      </p>

      {/* quick stats */}
      <dl className="mt-4 grid grid-cols-3 gap-2">
        <Stat label="Reforges" value={rolls.toLocaleString()} />
        <Stat label="Next roll" value={`${nextCost.toLocaleString()} 🔨`} />
        <Stat
          label="Method"
          value={method === "advanced" ? "Advanced" : "Standard"}
        />
      </dl>

      {/* advanced unlock progress */}
      {!advancedUnlocked && (
        <div className="mt-4">
          <div className="flex justify-between font-mono text-[9px] font-bold uppercase tracking-wider text-ink-faint">
            <span>Advanced reforge</span>
            <span>
              {hammers}/{REFORGE_ECONOMY.advancedUnlockAt} 🔨
            </span>
          </div>
          <div className="mt-1 h-3 overflow-hidden rounded-full border-[3px] border-ink bg-paper">
            <div
              className="h-full rounded-full bg-gradient-to-r from-flame to-ember transition-all duration-500"
              style={{ width: `${unlockProgress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* sunk-cost warning */}
      {sunkWarning && (
        <p
          className="mt-4 rounded-2xl border-[3px] border-ember-deep/60 bg-flame/20 p-3 text-xs font-extrabold leading-relaxed text-ember-deep"
          role="alert"
        >
          ⚠️ Warning: the cost to reroll with {locks} locked stats
          ({nextCost.toLocaleString()} 🔨 per click) is severely depleting your
          resources. Consider accepting an A-tier stat here instead of chasing
          perfection.
        </p>
      )}

      {/* lock cost table */}
      <div className="mt-4 overflow-hidden rounded-xl border-2 border-ink/15">
        <table className="w-full border-collapse text-center font-mono text-[10px] font-bold">
          <thead>
            <tr className="bg-ink text-cream">
              <th className="px-2 py-1.5 text-left uppercase tracking-wider">Locked</th>
              <th className="px-2 py-1.5 uppercase tracking-wider">Cost ×</th>
              <th className="px-2 py-1.5 uppercase tracking-wider">⚒ Std</th>
              <th className="px-2 py-1.5 uppercase tracking-wider">🔥 Adv</th>
            </tr>
          </thead>
          <tbody>
            {REFORGE_ECONOMY.lockMultipliers.map((mult, i) => (
              <tr key={i} className={cn("bg-white text-ink-soft", i === locks && "bg-gold/30 text-ink")}>
                <td className="px-2 py-1 text-left">{i} line{i === 1 ? "" : "s"}</td>
                <td className="px-2 py-1">×{mult}</td>
                <td className="px-2 py-1">{REFORGE_ECONOMY.standardBase * mult} 🔨</td>
                <td className="px-2 py-1">{REFORGE_ECONOMY.advancedBase * mult} 🔨</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-wide text-ink-faint">
        Arcadian Conquest store ≈ {REFORGE_ECONOMY.arcadianHammersPerWeek} 🔨/week —
        the ledger translates every simulated hammer into that grind.
      </p>
    </Panel>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border-2 border-ink/15 bg-paper/60 px-2 py-2 text-center">
      <dt className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm font-extrabold tabular-nums text-ink">{value}</dd>
    </div>
  );
}
