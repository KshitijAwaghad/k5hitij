"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { User, BookOpen, Compass } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// about"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Engineering Background & Direction
          </h2>
          <p className="text-sm font-mono text-foreground/60 max-w-xl">
            A developer who values maintainable code, type safety, and clean human interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bio card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl border border-surface-border bg-surface/60 backdrop-blur-sm space-y-4 shadow-sm hover:border-surface-border/80 transition-colors">
              <div className="flex items-center gap-3 text-xs font-mono text-foreground/60 pb-2 border-b border-surface-border/60">
                <User className="w-4 h-4 text-accent" />
                <span>whoami.md</span>
              </div>

              <div className="space-y-4 text-foreground/80 leading-relaxed text-sm sm:text-base">
                <p>
                  I&apos;m <strong className="text-foreground font-semibold">{siteData.owner.name}</strong> ({siteData.owner.handle}), a full-stack developer based in {siteData.owner.location}.
                </p>
                <p>
                  {siteData.owner.bio}
                </p>
                <p className="text-sm text-foreground/70">
                  Whether writing transactional SQL schemas, designing type-safe Next.js route handlers, or refining sub-second client interactions, I believe in building systems that remain reliable under real workloads.
                </p>
              </div>

              {/* Core Philosophy bullets */}
              <div className="pt-4 border-t border-surface-border/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="flex items-start gap-2 text-foreground/75">
                  <span className="text-accent">▸</span>
                  <span>End-to-End Type Safety</span>
                </div>
                <div className="flex items-start gap-2 text-foreground/75">
                  <span className="text-accent">▸</span>
                  <span>Semantic & Accessible Web</span>
                </div>
                <div className="flex items-start gap-2 text-foreground/75">
                  <span className="text-accent">▸</span>
                  <span>Optimistic, Low-Latency UI</span>
                </div>
                <div className="flex items-start gap-2 text-foreground/75">
                  <span className="text-accent">▸</span>
                  <span>Pragmatic Git Architecture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: What I'm Learning Now */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-surface-border bg-surface/60 backdrop-blur-sm space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                <div className="flex items-center gap-2 font-mono text-xs text-foreground/80">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="font-semibold">{"// currently learning"}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                  Q4 2024 / 2025
                </span>
              </div>

              <p className="text-xs text-foreground/60 leading-relaxed">
                Active technical topics I am studying and implementing in experimental prototypes:
              </p>

              <div className="space-y-3 font-mono text-xs">
                {siteData.owner.learningNow.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-surface-border/80 bg-surface-muted/40 flex items-start gap-3 hover:border-accent/30 transition-colors group"
                  >
                    <span className="text-accent font-bold text-xs mt-0.5">
                      0{index + 1}.
                    </span>
                    <span className="text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="p-4 rounded-xl border border-surface-border/70 bg-surface/30 font-mono text-xs space-y-2">
              <div className="flex items-center gap-2 text-foreground/50">
                <Compass className="w-3.5 h-3.5 text-accent" />
                <span>Current Status</span>
              </div>
              <p className="text-foreground/80 text-[11px] leading-relaxed">
                Actively seeking software engineering internships and open-source collaborations. Fast learner, comfortable working across the entire TypeScript and Node ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
