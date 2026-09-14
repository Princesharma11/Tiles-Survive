"use client";

import Image from "next/image";
import { useMemo } from "react";
import { HEROES, type Hero } from "@/data/heroMeta";
import {
  GEAR_SLOTS,
  GEAR_SLOT_ORDER,
  POOL_BY_SLOT,
  ROLE_META,
  ROLE_ORDER,
  type HeroRole,
  type StatDef,
  type StatTier,
} from "@/data/gearReforge";
import type { ForgeContext, GearRoll, RolledLine } from "@/lib/tools/reforgeEngine";
import { fmtNum } from "@/lib/tools/reforgeEngine";
import { Panel, PanelLabel, SegToggle } from "./parts";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  SetupStage — who wears the alloy, which slot, and the live        */
/*  baseline stats to compare every simulated roll against.           */
/* ------------------------------------------------------------------ */

export type BaselineRow = RolledLine | null;
export type Baseline = [BaselineRow, BaselineRow, BaselineRow];

const STAR_SLOTS = ["2★ slot", "4★ slot", "6★ slot"];

/** Rough role suggestion from the tier-list role string. */
export function suggestRole(role: string): HeroRole {
  if (/defense-break/i.test(role)) return "DPS";
  if (/frontline|fortress|tank|wall|defender|vanguard|bruiser|disruptor|shield/i.test(role)) return "Tank";
  if (/heal|sustain|support|amplif|buffer|keystone|enabler|engine/i.test(role)) return "Support";
  return "DPS";
}

interface SetupStageProps {
  ctx: ForgeContext;
  onCtx: (patch: Partial<ForgeContext>) => void;
  presetHeroId: string | null;
  onPresetHero: (id: string | null) => void;
  baseline: Baseline;
  onBaseline: (rows: Baseline) => void;
  gear: GearRoll | null;
}

export default function SetupStage({
  ctx,
  onCtx,
  presetHeroId,
  onPresetHero,
  baseline,
  onBaseline,
  gear,
}: SetupStageProps) {
  const roster = useMemo(() => [...HEROES].sort((a, b) => b.score - a.score), []);
  const presetHero = presetHeroId ? HEROES.find((h) => h.id === presetHeroId) : undefined;
  const pool = POOL_BY_SLOT[ctx.slot];

  const setRow = (i: number, row: BaselineRow) => {
    const next: Baseline = [...baseline];
    next[i] = row;
    onBaseline(next);
  };

  const copyCurrentRoll = () => {
    if (!gear) return;
    onBaseline(
      gear.lines.map((l) => ({ statId: l.statId, tier: l.tier, value: l.value, locked: false })) as Baseline
    );
  };

  return (
    <Panel className="p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <PanelLabel>Step 01 // Hero Context</PanelLabel>
          <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">
            Who wears this <span className="text-sunset">alloy?</span>
          </h3>
          <p className="mt-1 max-w-xl text-sm font-semibold text-ink-soft">
            A god roll for one hero is a trap roll for another. The evaluator
            grades every line against this exact profile.
          </p>
        </div>
        <p className="rounded-full border-2 border-dashed border-ink/25 px-3 py-1 font-mono text-[10px] font-bold text-ink-faint">
          SPECIAL SLOTS UNLOCK 2★ / 4★ / 6★
        </p>
      </div>

      {/* Quick load from roster */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <label className="block">
          <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
            Quick load from roster
          </span>
          <select
            value={presetHeroId ?? ""}
            onChange={(e) => onPresetHero(e.target.value || null)}
            className="w-full rounded-2xl border-[3px] border-ink bg-paper/70 px-3 py-2.5 font-display text-sm font-bold text-ink focus:border-ember focus:outline-none"
          >
            <option value="">— Manual setup —</option>
            {roster.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} · {h.rarity} {h.heroClass} ({h.faction})
              </option>
            ))}
          </select>
          {presetHero ? (
            <HeroChip hero={presetHero} />
          ) : (
            <p className="mt-2 px-1 text-xs font-bold text-ink-faint">
              Or set the profile by hand below.
            </p>
          )}
        </label>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          <SegRow label="Hero role">
            {ROLE_ORDER.map((r) => (
              <SegToggle key={r} active={ctx.role === r} onClick={() => onCtx({ role: r })} title={ROLE_META[r].blurb}>
                {ROLE_META[r].icon} {r}
              </SegToggle>
            ))}
          </SegRow>
          <SegRow label="Troop type">
            {(["Guard", "Gunner", "Marksman"] as const).map((t) => (
              <SegToggle key={t} active={ctx.troop === t} onClick={() => onCtx({ troop: t })}>
                {t}
              </SegToggle>
            ))}
          </SegRow>
          <SegRow label="Faction" className="sm:col-span-2">
            {(["Stalwart", "Aeronaut", "Mariner", "Rover"] as const).map((f) => (
              <SegToggle key={f} active={ctx.faction === f} onClick={() => onCtx({ faction: f })}>
                {f}
              </SegToggle>
            ))}
          </SegRow>
        </div>
      </div>

      {/* Slot selector */}
      <div className="mt-5">
        <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
          Gear slot <span className="text-ink-faint">— pools are slot-locked</span>
        </span>
        <div className="grid gap-2 sm:grid-cols-3">
          {GEAR_SLOT_ORDER.map((s) => {
            const meta = GEAR_SLOTS[s];
            const active = ctx.slot === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onCtx({ slot: s })}
                aria-pressed={active}
                className={cn(
                  "rounded-2xl border-[3px] px-4 py-3 text-left transition-all",
                  active
                    ? "border-ink bg-pine text-cream shadow-[0_4px_0_0_#0e271f]"
                    : "border-ink/20 bg-white hover:border-ink/60"
                )}
              >
                <span className="flex items-center gap-2 font-display text-sm font-extrabold">
                  <span aria-hidden className="text-lg">{meta.icon}</span>
                  {meta.label}
                </span>
                <span className={cn("mt-0.5 block font-mono text-[9px] font-bold uppercase tracking-wider", active ? "text-cream/60" : "text-ink-faint")}>
                  {meta.pool}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs font-bold text-ink-soft">{GEAR_SLOTS[ctx.slot].note}</p>
      </div>

      {/* Baseline editor */}
      <div className="mt-8 rounded-2xl border-[3px] border-dashed border-ink/25 bg-paper/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <PanelLabel className="text-ink-soft">Step 02 // Current Live Stats (Baseline)</PanelLabel>
            <p className="mt-1 text-xs font-bold text-ink-soft">
              What does your Alloy piece roll <em>right now</em>? Used for the A/B comparison — leave empty to compare against nothing.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyCurrentRoll}
              disabled={!gear}
              className={cn(
                "rounded-xl border-[3px] border-ink bg-white px-3 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-wide text-ink shadow-[0_2px_0_0_#2d2a26] transition-transform hover:-translate-y-0.5",
                !gear && "cursor-not-allowed opacity-40 hover:translate-y-0"
              )}
            >
              ⤵ Copy current roll
            </button>
            <button
              type="button"
              onClick={() => onBaseline([null, null, null])}
              className="rounded-xl border-[3px] border-ink/20 bg-white px-3 py-1.5 font-display text-[11px] font-extrabold uppercase tracking-wide text-ink-soft hover:border-ink/60"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {STAR_SLOTS.map((label, i) => (
            <BaselineRowEditor
              key={label}
              label={label}
              row={baseline[i]}
              pool={pool}
              onChange={(row) => setRow(i, row)}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ---------------------------- sub-bits ---------------------------- */

function SegRow({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function HeroChip({ hero }: { hero: Hero }) {
  return (
    <span className="mt-2 flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-white p-2 shadow-[0_3px_0_0_#2d2a26]">
      <span className="relative size-11 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-paper">
        {hero.portrait ? (
          <Image src={hero.portrait} alt="" fill sizes="44px" className="object-cover object-top" />
        ) : (
          <span className="grid size-full place-items-center font-display text-xs font-extrabold text-white" style={{ background: hero.accent }}>
            {hero.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-base font-extrabold text-ink">{hero.name}</span>
        <span className="block font-mono text-[9px] font-bold uppercase tracking-wide text-ink-faint">
          {hero.faction} · {hero.heroClass} · {hero.role}
        </span>
      </span>
    </span>
  );
}

function BaselineRowEditor({
  label,
  row,
  pool,
  onChange,
}: {
  label: string;
  row: BaselineRow;
  pool: StatDef[];
  onChange: (row: BaselineRow) => void;
}) {
  const stat = row ? pool.find((s) => s.id === row.statId) : undefined;
  const tier = row?.tier ?? "epic";
  const range = stat?.ranges[tier] ?? [0, 0];
  const value = row?.value ?? 0;

  return (
    <div className="rounded-2xl border-[3px] border-ink/15 bg-white p-3">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">{label}</p>

      <select
        value={row?.statId ?? ""}
        onChange={(e) => {
          const id = e.target.value;
          if (!id) return onChange(null);
          const s = pool.find((x) => x.id === id);
          if (!s) return onChange(null);
          const t = tier;
          const [min, max] = s.ranges[t];
          onChange({ statId: id, tier: t, value: min, locked: false });
        }}
        className="mt-1.5 w-full rounded-xl border-2 border-ink/60 bg-paper/60 px-2 py-1.5 font-display text-xs font-bold text-ink focus:border-ember focus:outline-none"
      >
        <option value="">— empty —</option>
        {pool.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {row && stat && (
        <>
          <div className="mt-2 flex items-center gap-2">
            <select
              value={tier}
              onChange={(e) => {
                const t = e.target.value as StatTier;
                const [min] = stat.ranges[t];
                onChange({ ...row, tier: t, value: min });
              }}
              className="flex-1 rounded-xl border-2 border-ink/60 bg-paper/60 px-2 py-1.5 font-mono text-[10px] font-bold uppercase text-ink focus:border-ember focus:outline-none"
            >
              <option value="common">Common</option>
              <option value="exquisite">Exquisite</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
            <span className="rounded-lg border-2 border-ink bg-gradient-to-b from-gold to-flame px-2 py-1 font-mono text-xs font-extrabold text-ink shadow-[0_2px_0_0_#2d2a26]">
              {stat.invert ? "−" : "+"}
              {fmtNum(value)}%
            </span>
          </div>
          <input
            type="range"
            min={range[0]}
            max={range[1]}
            step={0.5}
            value={value}
            onChange={(e) => onChange({ ...row, value: Number(e.target.value) })}
            className="mt-2 w-full accent-ember"
            aria-label={`${stat.name} value`}
          />
          <p className="mt-0.5 text-right font-mono text-[9px] font-bold text-ink-faint">
            tier range {stat.invert ? "−" : "+"}{fmtNum(range[0])}% … {stat.invert ? "−" : "+"}{fmtNum(range[1])}%
          </p>
        </>
      )}
    </div>
  );
}
