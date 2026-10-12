import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteData } from "@/data/site";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return siteData.notes.map((note) => ({
    slug: note.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const note = siteData.notes.find((n) => n.slug === slug);
    if (!note) return { title: "Note Not Found" };
    return {
      title: `${note.title} | ${siteData.owner.name}`,
      description: note.excerpt,
    };
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = siteData.notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/#notes"
            className="inline-flex items-center gap-2 font-mono text-xs text-foreground/60 hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>&lt;-- Back to notes</span>
          </Link>
        </div>

        {/* Note Header */}
        <header className="space-y-4 pb-6 border-b border-surface-border">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-foreground/60">
            <span className="text-accent uppercase tracking-wider font-semibold">
              {"// technical write-up"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{note.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-accent">
              <Clock className="w-3 h-3" />
              <span>{note.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
            {note.title}
          </h1>

          <p className="text-base text-foreground/80 leading-relaxed font-sans italic border-l-2 border-accent pl-4 py-1">
            {note.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-xs font-mono border border-surface-border bg-surface-muted text-foreground/75"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Note Content Body */}
        <div className="prose dark:prose-invert max-w-none text-foreground/90 font-sans leading-relaxed space-y-6 text-base">
          {note.content?.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="text-xl font-bold font-sans text-foreground pt-4 text-emerald-400"
                >
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n- ").map((item) => item.replace("- ", ""));
              return (
                <ul key={index} className="space-y-2 list-none pl-2 font-mono text-sm">
                  {items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent">▸</span>
                      <span className="text-foreground/80">{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d+\. /)) {
              const items = paragraph.split(/\n\d+\. /).map((item) => item.replace(/^\d+\. /, ""));
              return (
                <ol key={index} className="space-y-2 list-none pl-2 font-mono text-sm">
                  {items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-semibold">{i + 1}.</span>
                      <span className="text-foreground/80">{it}</span>
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index} className="text-foreground/85 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Note Footer */}
        <footer className="pt-8 border-t border-surface-border flex items-center justify-between text-xs font-mono text-foreground/60">
          <Link
            href="/#notes"
            className="hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All articles</span>
          </Link>

          <span>By {siteData.owner.name}</span>
        </footer>
      </div>
    </article>
  );
}
