import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "@/components/guides/GuideArticle";
import { GUIDE_CONTENT } from "@/data/guideContent";
import { guides } from "@/data/guides";

/* ------------------------------------------------------------------ */
/*  /guides/[slug] — full long-form guide pages, statically rendered   */
/*  and indexable. Article + FAQ + Breadcrumb JSON-LD inside the       */
/*  article component.                                                 */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const content = GUIDE_CONTENT[slug];
  if (!guide || !content) return {};

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: "article",
      title: content.seoTitle,
      description: content.seoDescription,
      section: guide.category,
      tags: ["Tiles Survive", guide.category, "strategy guide", "patch 2.6"],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seoTitle,
      description: content.seoDescription,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const content = GUIDE_CONTENT[slug];
  if (!guide || !content) notFound();

  return <GuideArticle guide={guide} content={content} />;
}
