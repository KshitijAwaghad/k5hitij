"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { User } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// about"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Engineering Background
          </h2>
        </div>

        {/* Concise About Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-mono text-foreground/60 pb-3 border-b border-surface-border/60">
            <User className="w-4 h-4 text-accent" />
            <span>{siteData.owner.handle} {"// profile summary"}</span>
          </div>

          <div className="space-y-3 text-foreground/80 leading-relaxed text-sm sm:text-base font-normal max-w-3xl">
            <p>
              I&apos;m <strong className="text-foreground font-semibold">{siteData.owner.name}</strong>, a full-stack developer based in {siteData.owner.location}.
            </p>
            <p className="text-sm text-foreground/75">
              {siteData.owner.bio}
            </p>
          </div>

          {/* Core Focus Areas */}
          <div className="pt-4 border-t border-surface-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg border border-surface-border/80 bg-surface-muted/40 space-y-1">
              <span className="text-accent font-bold">01. Type Safety</span>
              <p className="text-foreground/70 font-sans text-xs">
                End-to-end schema contracts from DB to client hydration.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-surface-border/80 bg-surface-muted/40 space-y-1">
              <span className="text-accent font-bold">02. Modern React</span>
              <p className="text-foreground/70 font-sans text-xs">
                Server components, low-latency UI, and clean state handling.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-surface-border/80 bg-surface-muted/40 space-y-1">
              <span className="text-accent font-bold">03. Systems Mindset</span>
              <p className="text-foreground/70 font-sans text-xs">
                Relational indexing, API ergonomics, and pragmatic git workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
