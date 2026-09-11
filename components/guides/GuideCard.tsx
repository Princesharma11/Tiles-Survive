import Link from "next/link";
import { ArrowRightIcon, getIcon } from "@/components/ui/icons";
import type { Guide } from "@/data/guides";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  GuideCard — codex entry card with gradient art header.             */
/*  Shared by the homepage carousel and the /guides explorer.          */
/* ------------------------------------------------------------------ */

const levelColor: Record<Guide["level"], string> = {
  RECRUIT: "border-mint-400/40 bg-mint-400/10 text-mint-400",
  VETERAN: "border-gold-500/40 bg-gold-500/10 text-gold-400",
  COMMANDER: "border-ember-500/40 bg-ember-500/10 text-ember-400",
};

export default function GuideCard({
  guide,
  index,
  className,
}: {
  guide: Guide;
  index?: number;
  className?: string;
}) {
  const Icon = getIcon(guide.icon);

  return (
    <Link
      href={`/guides#${guide.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/70 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-glow",
        className
      )}
    >
      {/* Gradient art header — zero image payload */}
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${guide.art.from} 0%, ${guide.art.to} 70%)`,
        }}
      >
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
          style={{
            background: `radial-gradient(60% 70% at 50% 55%, ${guide.art.glow}26, transparent 70%)`,
          }}
        />
        {typeof index === "number" && (
          <span className="absolute left-4 top-3 font-display text-4xl font-bold italic text-white/10">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="relative grid size-16 place-items-center rounded-2xl border border-white/15 bg-void/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold-500/50">
          <Icon className="size-8" style={{ color: guide.art.glow }} />
        </span>

        <span className="absolute bottom-3 left-4 flex gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-[0.22em]",
              levelColor[guide.level]
            )}
          >
            {guide.level}
          </span>
          <span className="rounded-full border border-white/10 bg-void/40 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.22em] text-steel-300">
            {guide.readTime}
          </span>
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] tracking-[0.3em] text-gold-500">
          {guide.category.toUpperCase()}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-tight text-steel-100 transition-colors duration-300 group-hover:text-gold-300">
          {guide.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-steel-400">
          {guide.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-mono text-[10px] tracking-[0.18em] text-steel-500">
            UPDATED {guide.updated.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-steel-300 transition-colors group-hover:text-gold-400">
            READ
            <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
