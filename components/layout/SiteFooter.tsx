import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  SiteFooter — comms console + fan-project disclaimer.               */
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
    heading: "NETWORK",
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
    <footer className="relative border-t border-white/5 bg-abyss/60">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-400">
              Stop guessing. Start conquering. Command intelligence for the
              tile-based 4X survival battlefield of{" "}
              <span className="text-steel-200">Tiles Survive!</span>
            </p>
            <p className="mt-6 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.28em] text-mint-400">
              <span aria-hidden className="size-1.5 animate-blip rounded-full bg-mint-400" />
              ALL SYSTEMS OPERATIONAL
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="font-mono text-[11px] tracking-[0.32em] text-gold-500">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-steel-300 transition-colors hover:text-gold-300"
                    >
                      <span
                        aria-hidden
                        className="size-1 rounded-full bg-steel-500 transition-colors group-hover:bg-gold-500"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-xs leading-relaxed text-steel-500">
            © {year} {site.name}. Fan-made companion project — not affiliated
            with, endorsed by, or sponsored by FunPlus. Tiles Survive! is a
            trademark of FunPlus International AG.
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-steel-500">
            FORGED IN THE VOID // {site.patch}
          </p>
        </div>
      </div>
    </footer>
  );
}
