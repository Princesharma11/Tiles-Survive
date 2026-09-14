import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import ReforgeStudio from "@/components/tools/reforge/ReforgeStudio";
import OddsTables from "@/components/tools/reforge/OddsTables";

/* ------------------------------------------------------------------ */
/*  ReforgeSimulator — /gear-reforge page body.                        */
/* ------------------------------------------------------------------ */

export default function ReforgeSimulator() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-40">
      <SectionHeader
        eyebrow="Gear Lab // Patch 2.6.0"
        title="The alloy reforge"
        accent="simulator."
        description="Reforge Hammers are one of the rarest currencies in Tiles Survive! — misroll a locked line and it's weeks of Arcadian Conquest down the drain. Simulate infinite rolls, lock lines, grade every stat against the exact hero wearing it, and A/B your live gear — all before a single real hammer moves."
      />

      <ReforgeStudio />

      <OddsTables />

      {/* Why simulate + cross-links */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border-[3px] border-ink bg-pine p-6 text-cream shadow-[0_5px_0_0_#0e271f] sm:p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
            Field manual // why simulate first
          </p>
          <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
            Hammers are scarcer than adhesives.
          </h3>
          <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-cream/80">
            <p>
              Reforging only opens on <strong className="text-gold">Alloy-quality</strong> gear — the
              three Special Stat slots that unlock at 2★, 4★ and 6★. Every reroll spends Reforge
              Hammers you could have spent on your main march. This tool mirrors the whole system:
              slot-locked stat pools, Common → Legendary tiers, Standard (1🔨) vs Advanced (25🔨,
              Epic/Legendary-only) rolls, and the exponential lock multiplier.
            </p>
            <p>
              The evaluator enforces the one rule veteran accounts live by:{" "}
              <strong className="text-gold">synergy over rarity</strong>. A Legendary{" "}
              <em>Rover Marksman HP%</em> on a <em>Stalwart Guard</em> tank is a trap roll — 0%
              synergy, zero value, no matter how orange it glows. Grade the hero first, roll second.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">
            Keep optimizing ⟶
          </h3>
          <CrossLink href="/tier-list" emoji="🏆" title="Hero Tier List" note="Who deserves the alloy in the first place" />
          <CrossLink href="/hero-meta-calc" emoji="🧪" title="Hero Meta Calc" note="Pairings & troop ratio math" />
          <CrossLink href="/guides" emoji="📖" title="Survival Codex" note="The full guide library" />
        </div>
      </div>

      {/* methodology note */}
      <p className="mt-10 rounded-2xl border-2 border-dashed border-ink/20 bg-white/70 px-4 py-3 text-center text-xs font-bold leading-relaxed text-ink-faint">
        Simulation model: community-measured drop weights for patch 2.6.0 (Alloy reforge) — tier odds
        55 / 28 / 13 / 4 on Standard, 72 / 28 Epic/Legendary on Advanced, lock multipliers ×1 / ×4 / ×16,
        Arcadian store valued at ~150 🔨 per week. FunPlus publishes no official odds; treat the
        ledger as a planning estimate, not a promise. Your session persists locally in this browser.
      </p>
    </section>
  );
}

function CrossLink({
  href,
  emoji,
  title,
  note,
}: {
  href: string;
  emoji: string;
  title: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border-[3px] border-ink bg-white p-4 shadow-[0_4px_0_0_#2d2a26] transition-transform hover:-translate-y-1"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border-[3px] border-ink bg-paper text-2xl" aria-hidden>
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg font-extrabold text-ink">{title}</span>
        <span className="block text-xs font-bold text-ink-soft">{note}</span>
      </span>
      <span className="ml-auto font-display text-xl text-ink-faint transition-transform group-hover:translate-x-1" aria-hidden>
        ⟶
      </span>
    </Link>
  );
}
