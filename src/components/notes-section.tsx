"use client";

import * as React from "react";
import Link from "next/link";
import { siteData } from "@/data/site";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function NotesSection() {
  const latestNotes = siteData.notes.slice(0, 3);

  return (
    <section id="notes" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <span>{"// technical thoughts"}</span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Engineering Notes & Write-ups
            </h2>
            <p className="text-sm font-mono text-foreground/60 max-w-xl">
              Perspectives on TypeScript patterns, optimistic UI architectures, and pragmatic workflows.
            </p>
          </div>

          <span className="text-xs font-mono text-foreground/50 self-start md:self-auto">
            {siteData.notes.length} published articles
          </span>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNotes.map((note) => (
            <article
              key={note.slug}
              className="p-6 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm flex flex-col justify-between hover:border-accent/40 hover:bg-surface transition-all group"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 pb-2 border-b border-surface-border/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-foreground/40" />
                    <span>{note.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-accent" />
                    <span>{note.readTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="text-base font-bold font-sans text-foreground group-hover:text-accent transition-colors line-clamp-2 block"
                  >
                    {note.title}
                  </Link>

                  <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed font-sans">
                    {note.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border/60 mt-4 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border border-surface-border bg-surface-muted/50 text-foreground/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/notes/${note.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline pt-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
