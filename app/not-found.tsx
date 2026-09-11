import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.38em] text-ember-400">
        [ SIGNAL LOST // 404 ]
      </p>
      <h1 className="mt-6 font-display text-6xl font-bold uppercase italic tracking-tight text-steel-100 sm:text-8xl">
        Tile not <span className="text-gradient-gold">found.</span>
      </h1>
      <p className="mt-6 max-w-md text-steel-300">
        This sector is still under fog. Either the scouts haven&apos;t mapped
        it yet, or you took a wrong turn at the last cross-State rally.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 items-center rounded-lg border border-gold-500/40 bg-gold-500/5 px-6 font-display text-[13px] uppercase tracking-[0.16em] text-gold-300 transition-all hover:border-gold-500 hover:bg-gold-500/10 hover:shadow-glow"
      >
        Return to HQ
      </Link>
    </section>
  );
}
