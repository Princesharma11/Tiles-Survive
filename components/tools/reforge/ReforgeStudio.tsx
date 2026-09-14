"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { POOL_BY_SLOT, REFORGE_ECONOMY } from "@/data/gearReforge";
import { HEROES } from "@/data/heroMeta";
import {
  autoRoll,
  evaluateGear,
  lockedCount,
  rollCost,
  rollGear,
  type ForgeContext,
  type GearRoll,
  type ReforgeMethod,
  type RollCondition,
} from "@/lib/tools/reforgeEngine";
import SetupStage, { suggestRole, type Baseline } from "./SetupStage";
import ForgePanel, { type AutoReadout } from "./ForgePanel";
import EvaluatorPanel from "./EvaluatorPanel";
import CostLedger from "./CostLedger";
import VaultPanel, { type VaultEntry } from "./VaultPanel";

/* ------------------------------------------------------------------ */
/*  ReforgeStudio — owns the whole simulated session: context, gear,   */
/*  hammer ledger, vault. Persists to localStorage between visits.     */
/* ------------------------------------------------------------------ */

const STORE_KEY = "tts-reforge-v1";
const SPIN_MS = 620;

interface StoredSession {
  ctx?: Partial<ForgeContext>;
  method?: ReforgeMethod;
  gear?: GearRoll | null;
  baseline?: Baseline;
  hammers?: number;
  rolls?: number;
  vault?: VaultEntry[];
}

function validGear(g: unknown): g is GearRoll {
  if (!g || typeof g !== "object") return false;
  const gear = g as GearRoll;
  return (
    Array.isArray(gear.lines) &&
    gear.lines.length === 3 &&
    gear.lines.every((l) => l && typeof l.statId === "string" && typeof l.value === "number" && typeof l.locked === "boolean")
  );
}

export default function ReforgeStudio() {
  const [ctx, setCtx] = useState<ForgeContext>({
    role: "DPS",
    troop: "Guard",
    faction: "Stalwart",
    slot: "helmet",
  });
  const [presetHeroId, setPresetHeroId] = useState<string | null>(null);
  const [method, setMethod] = useState<ReforgeMethod>("standard");
  const [gear, setGear] = useState<GearRoll | null>(null);
  const [baseline, setBaseline] = useState<Baseline>([null, null, null]);
  const [hammers, setHammers] = useState(0);
  const [rolls, setRolls] = useState(0);
  const [vault, setVault] = useState<VaultEntry[]>([]);
  const [rolling, setRolling] = useState(false);
  const [autoResult, setAutoResult] = useState<AutoReadout | null>(null);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* -------- persistence -------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw) as StoredSession;
        if (d.ctx) {
          setCtx((prev) => ({ ...prev, ...d.ctx, slot: d.ctx?.slot ?? prev.slot }));
        }
        if (d.method === "standard" || d.method === "advanced") setMethod(d.method);
        if (validGear(d.gear)) setGear(d.gear);
        if (Array.isArray(d.baseline) && d.baseline.length === 3) setBaseline(d.baseline as Baseline);
        if (typeof d.hammers === "number") setHammers(d.hammers);
        if (typeof d.rolls === "number") setRolls(d.rolls);
        if (Array.isArray(d.vault)) setVault(d.vault.slice(0, 12));
      }
    } catch {
      /* corrupted store — start fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ ctx, method, gear, baseline, hammers, rolls, vault })
      );
    } catch {
      /* storage full/blocked — session-only mode */
    }
  }, [hydrated, ctx, method, gear, baseline, hammers, rolls, vault]);

  useEffect(() => () => {
    if (spinTimer.current) clearTimeout(spinTimer.current);
  }, []);

  /* -------- derived -------- */
  const locks = lockedCount(gear);
  const advancedUnlocked = hammers >= REFORGE_ECONOMY.advancedUnlockAt;
  const nextCost = rollCost(method, locks);
  const evaluation = useMemo(() => evaluateGear(gear, ctx), [gear, ctx]);

  /* -------- handlers -------- */
  const patchCtx = (patch: Partial<ForgeContext>) => {
    if (patch.troop || patch.faction) setPresetHeroId(null);
    if (patch.slot) {
      // switching slots invalidates the rolled gear + mismatched baseline rows
      setGear(null);
      setAutoResult(null);
      const pool = POOL_BY_SLOT[patch.slot];
      setBaseline(([r0, r1, r2]) => {
        const keep = (row: typeof r0) => (row && pool.some((s) => s.id === row.statId) ? row : null);
        return [keep(r0), keep(r1), keep(r2)] as typeof baseline;
      });
    }
    setCtx((prev) => ({ ...prev, ...patch }));
  };

  const handlePresetHero = (id: string | null) => {
    setPresetHeroId(id);
    const hero = HEROES.find((h) => h.id === id);
    if (hero) {
      setCtx((prev) => ({
        ...prev,
        troop: hero.heroClass,
        faction: hero.faction,
        role: suggestRole(hero.role),
      }));
    }
  };

  const toggleLock = (i: number) => {
    setGear((g) => {
      if (!g) return g;
      const lines = g.lines.map((l, idx) => (idx === i ? { ...l, locked: !l.locked } : l));
      if (lines.filter((l) => l.locked).length > REFORGE_ECONOMY.maxLocks) return g;
      return { lines };
    });
  };

  const doReforge = () => {
    if (rolling || !hydrated) return;
    const cost = rollCost(method, locks);
    const result = rollGear(gear, ctx, method, advancedUnlocked);
    setAutoResult(null);
    setRolling(true);
    spinTimer.current = setTimeout(() => {
      setGear(result);
      setHammers((h) => h + cost);
      setRolls((r) => r + 1);
      setRolling(false);
    }, SPIN_MS);
  };

  const doAutoRoll = (cond: RollCondition) => {
    if (rolling || !hydrated) return;
    const result = autoRoll(gear, ctx, method, advancedUnlocked, cond);
    setGear(result.gear);
    setHammers((h) => h + result.hammers);
    setRolls((r) => r + result.rolls);
    setAutoResult({ ...result, cond });
  };

  const saveToVault = () => {
    if (!gear) return;
    const entry: VaultEntry = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      at: new Date().toISOString(),
      ctx: { ...ctx },
      lines: gear.lines.map((l) => ({ ...l })),
      grade: evaluation.grade,
    };
    setVault((v) => [entry, ...v].slice(0, 12));
  };

  const deleteVaultEntry = (id: string) => {
    setVault((v) => v.filter((e) => e.id !== id));
    setCompareId((c) => (c === id ? null : c));
  };

  /* -------- render -------- */
  return (
    <div className="space-y-8">
      <SetupStage
        ctx={ctx}
        onCtx={patchCtx}
        presetHeroId={presetHeroId}
        onPresetHero={handlePresetHero}
        baseline={baseline}
        onBaseline={setBaseline}
        gear={gear}
      />

      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        <ForgePanel
          ctx={ctx}
          gear={gear}
          onToggleLock={toggleLock}
          method={method}
          onMethod={setMethod}
          advancedUnlocked={advancedUnlocked}
          nextCost={nextCost}
          rolling={rolling}
          onReforge={doReforge}
          onAutoRoll={doAutoRoll}
          autoResult={autoResult}
          onSaveToVault={saveToVault}
          vaultCount={vault.length}
        />
        <div className="flex flex-col gap-6">
          <EvaluatorPanel ctx={ctx} gear={gear} evaluation={evaluation} />
          <CostLedger
            hammers={hammers}
            rolls={rolls}
            nextCost={nextCost}
            locks={locks}
            method={method}
            advancedUnlocked={advancedUnlocked}
          />
        </div>
      </div>

      <VaultPanel
        vault={vault}
        compareId={compareId}
        onCompare={setCompareId}
        onDelete={deleteVaultEntry}
        baseline={baseline}
        ctx={ctx}
        hasGear={!!gear}
        onSave={saveToVault}
      />
    </div>
  );
}
