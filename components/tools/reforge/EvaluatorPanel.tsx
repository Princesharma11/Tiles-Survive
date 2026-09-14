"use client";

import { STAT_TIER_META, statById } from "@/data/gearReforge";
import {
  fmtLineValue,
  type ForgeContext,
  type GearEval,
  type GearRoll,
} from "@/lib/tools/reforgeEngine";
import { cn } from "@/lib/utils/cn";
import { GRADE_PLATE, GradeChip, Panel, PanelLabel, TierChip } from "./parts";

/* ------------------------------------------------------------------ */
/*  EvaluatorPanel — the "Synergy Over Rarity" grading brain.          */
/*  Trap detection, role-fit grades and the final verdict.             */
/* ------------------------------------------------------------------ */

const STAR_SLOTS = ["2★", "4★", "6★"];

export default function EvaluatorPanel({
  ctx,
  gear,
  evaluation,
}: {
  ctx: ForgeContext;
  gear: GearRoll | null;
  evaluation: GearEval;
}) {
  const lock = evaluation.verdict.kind === "LOCK";

  return (
    <Panel className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <PanelLabel>Strategy Evaluator</PanelLabel>
          <p className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink-faint">
            RULE #1 — SYNERGY OVER RARITY
          </p>
        </div>
        {/* overall grade plate */}
        <span
          className={cn(
            "grid size-16 shrink-0 place-items-center rounded-2xl border-[3px] font-display text-4xl font-extrabold",
            GRADE_PLATE[evaluation.grade]
          )}
          aria-label={`Overall gear grade ${evaluation.grade}`}
        >
          {evaluation.grade}
        </span>
      </div>

      {/* context reminder */}
      <p className="mt-3 inline-block rounded-full border-2 border-ink/15 bg-paper px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-soft">
        {ctx.role} · {ctx.troop} · {ctx.faction} · {ctx.slot}
      </p>

      {/* verdict banner */}
      <div
        className={cn(
          "mt-4 rounded-2xl border-[3px] p-4",
          lock
            ? "border-leaf-deep bg-leaf/15 text-leaf-deep"
            : gear
              ? "border-[#d64545] bg-[#d64545]/10 text-[#c23c3c]"
              : "border-ink/20 bg-paper/60 text-ink-soft"
        )}
        role="status"
      >
        <p className="font-display text-lg font-extrabold tracking-tight">
          {lock ? "🏆" : gear ? "🔁" : "⏳"} {evaluation.verdict.title}
        </p>
        <p className="mt-1 text-xs font-bold leading-relaxed">{evaluation.verdict.reason}</p>
      </div>

      {/* per-line breakdown */}
      <ul className="mt-4 space-y-2">
        {(gear?.lines ?? []).map((line, i) => {
          const stat = statById(line.statId);
          if (!stat) return null;
          const ev = evaluation.perLine[i];
          return (
            <li
              key={i}
              className={cn(
                "flex items-start gap-2.5 rounded-xl border-2 p-2.5",
                ev.trap ? "border-[#d64545]/60 bg-[#d64545]/5" : "border-ink/10 bg-paper/50"
              )}
            >
              <span className="mt-0.5 font-mono text-[9px] font-bold text-ink-faint">{STAR_SLOTS[i]}</span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-display text-[13px] font-extrabold text-ink">{stat.name}</span>
                  <span className="font-mono text-xs font-extrabold text-ink-soft">
                    {fmtLineValue(stat, line)}
                  </span>
                  <TierChip tier={line.tier} />
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[11px] font-bold leading-snug",
                    ev.trap ? "text-[#c23c3c]" : "text-ink-soft"
                  )}
                >
                  {ev.trap ? `TRAP ROLL. High rarity, but 0% synergy. Reroll. (${stat.name} does nothing for a ${ctx.faction} ${ctx.troop}.)` : ev.note}
                </span>
              </span>
              <GradeChip grade={ev.grade} className="mt-0.5" />
            </li>
          );
        })}
        {!gear && (
          <li className="rounded-xl border-2 border-dashed border-ink/15 p-3 text-center font-display text-xs font-extrabold text-ink-faint">
            No lines to grade yet — hit REFORGE.
          </li>
        )}
      </ul>

      {/* scoring footnote */}
      <p className="mt-4 border-t-2 border-dashed border-ink/10 pt-3 font-mono text-[9px] font-bold uppercase leading-relaxed tracking-wide text-ink-faint">
        Grade = role fit (S/A/B/C) × tier value ({STAT_TIER_META.common.mult}–{STAT_TIER_META.legendary.mult}).
        Faction/troop-tagged stats that don&apos;t match this hero score 0 — rarity never beats synergy.
      </p>
    </Panel>
  );
}
