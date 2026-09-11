import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <span className="animate-bob text-7xl" aria-hidden>
        🧭
      </span>
      <p className="mt-6 inline-block rounded-full border-[3px] border-ink bg-berry px-4 py-1 font-display text-xs font-extrabold uppercase tracking-[0.25em] text-white shadow-[0_3px_0_0_#2d2a26]">
        Signal lost // 404
      </p>
      <h1 className="mt-6 font-display text-6xl font-extrabold uppercase tracking-tight sm:text-8xl">
        <span className="text-sunset">Tile not found.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg font-bold text-ink-soft">
        This sector is still under fog. Either the scouts haven&apos;t mapped
        it yet, or you took a wrong turn at the last cross-State rally.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-14 items-center rounded-2xl border-[3px] border-ink bg-gradient-to-b from-flame to-ember px-7 font-display text-base font-extrabold uppercase tracking-wide text-white shadow-[0_5px_0_0_#a03f10] transition-all hover:-translate-y-1 hover:shadow-[0_8px_0_0_#a03f10] active:translate-y-0.5 active:shadow-[0_2px_0_0_#a03f10]"
      >
        Return to HQ
      </Link>
    </section>
  );
}
