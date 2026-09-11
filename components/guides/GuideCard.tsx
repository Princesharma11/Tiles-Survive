import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, getIcon } from "@/components/ui/icons";
import type { Guide } from "@/data/guides";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/*  GuideCard — codex entry with real world-scene art header.          */
/* ------------------------------------------------------------------ */

const levelColor: Record<Guide["level"], { bg: string; text: string }> = {
  RECRUIT: { bg: "bg-teal", text: "text-white" },
  VETERAN: { bg: "bg-flame", text: "text-ink" },
  COMMANDER: { bg: "bg-berry", text: "text-white" },
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
  const level = levelColor[guide.level];

  return (
    <Link
      href={`/guides#${guide.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-white shadow-[0_4px_0_0_#2d2a26,0_18px_34px_-18px_rgba(45,42,38,0.35)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_0_0_#2d2a26,0_26px_44px_-18px_rgba(45,42,38,0.45)]",
        className
      )}
    >
      {/* Scene art header */}
      <div className="relative h-40 overflow-hidden border-b-[3px] border-ink">
        <Image
          src={guide.image}
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, 350px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Icon token */}
        <span className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border-[3px] border-ink bg-white/90 text-ember shadow-[0_4px_0_0_#2d2a26] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="size-7" />
        </span>

        <span className="absolute left-3 top-3 flex gap-2">
          <span
            className={cn(
              "rounded-full border-[3px] border-ink px-2.5 py-0.5 font-display text-[10px] font-extrabold tracking-[0.14em] shadow-[0_2px_0_0_#2d2a26]",
              level.bg,
              level.text
            )}
          >
            {guide.level}
          </span>
        </span>
        <span className="absolute bottom-3 right-3 rounded-full border-[3px] border-ink bg-white/90 px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink shadow-[0_2px_0_0_#2d2a26]">
          {guide.readTime}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] font-bold tracking-[0.24em] text-ember-deep">
          {guide.category.toUpperCase()}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-extrabold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-ember-deep">
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-relaxed text-ink-soft">
          {guide.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-ink/15 pt-3.5">
          <span className="font-mono text-[10px] font-bold text-ink-faint">
            {guide.updated.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-wide text-ink transition-colors group-hover:text-ember">
            Read
            <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
