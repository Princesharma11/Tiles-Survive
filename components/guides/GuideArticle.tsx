import Image from "next/image";
import Link from "next/link";
import type { GuideCallout, GuideContent } from "@/data/guideContent";
import type { Guide as GuideMeta } from "@/data/guides";
import { guides } from "@/data/guides";
import { site } from "@/data/site";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  GuideArticle — the long-form /guides/[slug] renderer.              */
/*  Server component: every paragraph ships in the HTML for SEO,       */
/*  FAQ uses native <details> so it works without hydration.           */
/* ------------------------------------------------------------------ */

const CALLOUT_STYLE = {
  tip: {
    wrap: "border-leaf-deep/50 bg-leaf/10",
    label: "text-leaf-deep",
    icon: "💡",
    name: "FIELD TIP",
  },
  warn: {
    wrap: "border-[#d64545]/50 bg-[#d64545]/5",
    label: "text-[#c23c3c]",
    icon: "⚠️",
    name: "WARNING",
  },
  meta: {
    wrap: "border-ember-deep/50 bg-flame/10",
    label: "text-ember-deep",
    icon: "🎯",
    name: "META CALL",
  },
} as const;

export default function GuideArticle({
  guide,
  content,
}: {
  guide: GuideMeta;
  content: GuideContent;
}) {
  const related = guides
    .filter((g) => g.slug !== guide.slug)
    .sort((a, b) => (b.category === guide.category ? 1 : 0) - (a.category === guide.category ? 1 : 0))
    .slice(0, 3);

  const published = new Date(guide.updated);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.seoTitle,
    description: content.seoDescription,
    datePublished: published.toISOString(),
    dateModified: published.toISOString(),
    inLanguage: "en",
    mainEntityOfPage: `${site.url}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    about: {
      "@type": "VideoGame",
      name: "Tiles Survive!",
      publisher: { "@type": "Organization", name: "FunPlus" },
      genre: ["4X", "Strategy", "Survival"],
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${site.url}/guides/${guide.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="relative mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pt-36">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
            <li><Link href="/" className="hover:text-ember-deep">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/guides" className="hover:text-ember-deep">Survival Codex</Link></li>
            <li aria-hidden>/</li>
            <li className="text-ink-soft">{guide.category}</li>
          </ol>
        </nav>

        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border-[3px] border-ink bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cream">
              {guide.category}
            </span>
            <span className="rounded-full border-2 border-ink/20 bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              {guide.level}
            </span>
            <span className="rounded-full border-2 border-ink/20 bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              ⏱ {guide.readTime}
            </span>
            <span className="rounded-full border-2 border-leaf-deep/40 bg-leaf/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-leaf-deep">
              ✓ Updated {guide.updated} · {site.patch}
            </span>
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold leading-relaxed text-ink-soft">
            {guide.excerpt}
          </p>
        </header>

        {/* Scene banner */}
        <div className="relative mb-12 h-56 overflow-hidden rounded-3xl border-[3px] border-ink shadow-[0_6px_0_0_#2d2a26] sm:h-72">
          <Image
            src={guide.image}
            alt={`${guide.title} — Tiles Survive guide scene`}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1152px"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* TOC rail */}
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-28 rounded-3xl border-[3px] border-ink bg-white p-5 shadow-[0_5px_0_0_#2d2a26]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ember-deep">
                In this guide
              </p>
              <ol className="mt-3 space-y-2">
                {content.sections.map((sec, i) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="flex gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-ember-deep"
                    >
                      <span className="font-mono text-[10px] text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                      {sec.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="flex gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-ember-deep">
                    <span className="font-mono text-[10px] text-ink-faint">FAQ</span>
                    Field questions
                  </a>
                </li>
              </ol>
            </nav>
          </aside>

          {/* Body */}
          <div className="min-w-0 max-w-3xl">
            {/* Intro */}
            <div className="space-y-4 border-l-[6px] border-gold pl-5">
              {content.intro.map((p, i) => (
                <p key={i} className="text-lg font-semibold leading-relaxed text-ink">
                  {p}
                </p>
              ))}
            </div>

            {/* Sections */}
            {content.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="mt-12 scroll-mt-28">
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {sec.heading}
                </h2>
                {sec.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-4 text-base font-semibold leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 rounded-2xl border-2 border-ink/10 bg-white px-4 py-2.5 text-sm font-bold leading-relaxed text-ink shadow-[0_2px_0_0_rgba(45,42,38,0.15)]">
                        <span aria-hidden className="mt-0.5 text-ember">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {sec.callout && <Callout callout={sec.callout} />}
                {sec.table && <FieldTable table={sec.table} />}
              </section>
            ))}

            {/* Takeaways */}
            <section id="takeaways" className="mt-14 scroll-mt-28">
              <div className="rounded-3xl border-[3px] border-ink bg-pine p-6 text-cream shadow-[0_5px_0_0_#0e271f] sm:p-8">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
                  Field notes // tl;dr
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                  Burn this into the map table
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {content.takeaways.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm font-bold leading-relaxed text-cream/90">
                      <span aria-hidden className="font-mono text-gold">{String(i + 1).padStart(2, "0")}</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Tool cross-links */}
            {content.relatedTools && content.relatedTools.length > 0 && (
              <section className="mt-10">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ember-deep">
                  Put it to work
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {content.relatedTools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-center gap-4 rounded-2xl border-[3px] border-ink bg-white p-4 shadow-[0_4px_0_0_#2d2a26] transition-transform hover:-translate-y-1"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg font-extrabold text-ink">{tool.label}</span>
                        <span className="block text-xs font-bold text-ink-soft">{tool.note}</span>
                      </span>
                      <span aria-hidden className="font-display text-xl text-ink-faint transition-transform group-hover:translate-x-1">⟶</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section id="faq" className="mt-14 scroll-mt-28">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Field questions
              </h2>
              <div className="mt-4 space-y-3">
                {content.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border-[3px] border-ink bg-white shadow-[0_3px_0_0_#2d2a26] [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-display text-base font-extrabold text-ink">
                      {f.q}
                      <span aria-hidden className="shrink-0 text-ember transition-transform group-open:rotate-45">＋</span>
                    </summary>
                    <p className="px-4 pb-4 text-sm font-semibold leading-relaxed text-ink-soft">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Related guides */}
            <section className="mt-14">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                Keep reading the codex
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((g) => (
                  <Link
                    key={g.id}
                    href={`/guides/${g.slug}`}
                    className="group rounded-2xl border-[3px] border-ink/15 bg-white p-4 shadow-[0_3px_0_0_rgba(45,42,38,0.2)] transition-all hover:-translate-y-1 hover:border-ink"
                  >
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-ember-deep">
                      {g.category} · {g.readTime}
                    </span>
                    <span className="mt-1 block font-display text-base font-extrabold leading-snug text-ink">
                      {g.title}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/guides"
                className="mt-6 inline-block rounded-2xl border-[3px] border-ink bg-gradient-to-b from-gold to-flame px-5 py-2.5 font-display text-sm font-extrabold text-ink shadow-[0_3px_0_0_#2d2a26] transition-transform hover:-translate-y-0.5"
              >
                📖 All 8 field guides
              </Link>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}

/* ------------------------------ bits ------------------------------ */

function Callout({ callout }: { callout: GuideCallout }) {
  const style = CALLOUT_STYLE[callout.kind];
  return (
    <aside className={cn("mt-5 rounded-2xl border-[3px] p-4", style.wrap)}>
      <p className={cn("font-mono text-[9px] font-bold uppercase tracking-[0.22em]", style.label)}>
        {style.icon} {style.name}
      </p>
      <p className="mt-1.5 font-display text-base font-extrabold text-ink">{callout.title}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-soft">{callout.text}</p>
    </aside>
  );
}

function FieldTable({ table }: { table: { columns: string[]; rows: string[][] } }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border-[3px] border-ink shadow-[0_3px_0_0_#2d2a26]">
      <table className="w-full border-collapse text-left font-mono text-[11px] font-bold">
        <thead>
          <tr className="bg-ink text-cream">
            {table.columns.map((c) => (
              <th key={c} className="px-3 py-2.5 uppercase tracking-wider">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-paper/60"}>
              {row.map((cell, j) => (
                <td key={j} className={cn("px-3 py-2.5 text-ink-soft", j === 0 && "font-extrabold text-ink")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
