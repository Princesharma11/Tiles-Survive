import Link from "next/link";
import { TitanMark } from "./Logo";
import { site } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  SiteFooter — night camp: deep pine, warm lanterns.                 */
/* ------------------------------------------------------------------ */

const columns = [
  {
    heading: "TOOLS",
    links: [
      { label: "Arcadian War Room", href: "/war-room" },
      { label: "Hero Meta Calc", href: "/hero-meta-calc" },
      { label: "Gear Reforge Sim", href: "/gear-reforge" },
      { label: "Troop Optimizer", href: "/hero-meta-calc" },
    ],
  },
  {
    heading: "INTEL",
    links: [
      { label: "Tier List v6.2", href: "/tier-list" },
      { label: "Survival Codex", href: "/guides" },
      { label: "Patch Watch", href: "/guides" },
      { label: "Event Calendar", href: "/guides" },
    ],
  },
  {
    heading: "CAMP",
    links: [
      { label: "Discord Uplink", href: "#" },
      { label: "YouTube Briefings", href: "#" },
      { label: "State Chat", href: "#" },
      { label: "Contribute Data", href: "#" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-pine-deep text-cream">
      {/* Warm campfire glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-ember/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="group flex w-fit items-center gap-2.5"
              aria-label="TitanTilesSurvive — home"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl border-[3px] border-cream/80 bg-gradient-to-b from-leaf to-leaf-deep shadow-[0_3px_0_0_rgba(255,249,240,0.85)] transition-transform duration-300 group-hover:-rotate-6">
                <TitanMark className="size-7" />
              </span>
              <span className="font-display text-lg font-extrabold leading-none tracking-tight text-cream">
                Titan<span className="text-flame">Tiles</span>
                <span className="block text-[11px] font-bold tracking-[0.3em] text-cream/60">
                  SURVIVE HQ
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-base font-semibold leading-relaxed text-cream/70">
              Stop guessing. Start conquering. Command intelligence for the
              tile-based 4X survival world of{" "}
              <span className="text-gold">Tiles Survive!</span>
            </p>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border-2 border-cream/20 bg-cream/5 px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.22em] text-leaf">
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-leaf" />
              ALL LANTERNS LIT
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="inline-block rounded-lg bg-cream/10 px-3 py-1 font-display text-xs font-bold tracking-[0.25em] text-gold">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2.5 text-base font-semibold text-cream/75 transition-all hover:translate-x-1 hover:text-gold"
                    >
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-cream/30 transition-colors group-hover:bg-flame"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t-2 border-cream/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm font-semibold text-cream/50">
            © {year} {site.name}. Fan-made companion project — not affiliated
            with, endorsed by, or sponsored by FunPlus. Tiles Survive! is a
            trademark of FunPlus International AG. Game art used as references
            for the community.
          </p>
          <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-cream/40">
            FORGED AT THE FURNACE // {site.patch}
          </p>
        </div>
      </div>
    </footer>
  );
}
