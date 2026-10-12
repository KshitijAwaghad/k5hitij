"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { User, GraduationCap, Calendar, MapPin } from "lucide-react";

export function About() {
  const educationItem =
    siteData.timeline.find((t) => t.type === "education") || siteData.timeline[0];

  return (
    <section id="about" className="py-8 md:py-12 border-t border-surface-border/60 scroll-mt-14">
      {/* Anchor for education navigation */}
      <div id="education" className="scroll-mt-14" />

      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-1.5 mb-6">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// background & education"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Engineering & Academic Background
          </h2>
          <p className="text-sm font-mono text-foreground/60 max-w-xl">
            Developer philosophy, architectural focus areas, and foundational computer engineering coursework.
          </p>
        </div>

        {/* 2-Column Responsive Grid: About (Left) + Education (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          {/* Left Column: Engineering Profile */}
          <div className="p-5 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-foreground/60 pb-2.5 border-b border-surface-border/60">
                <User className="w-4 h-4 text-accent" />
                <span className="font-semibold text-foreground">Engineering Profile</span>
                <span className="text-muted ml-auto font-mono text-[11px]">@{siteData.owner.handle}</span>
              </div>

              <div className="space-y-2 text-foreground/80 leading-relaxed text-xs sm:text-sm font-normal">
                <p>
                  I&apos;m <strong className="text-foreground font-semibold">{siteData.owner.name}</strong>, a full-stack developer based in {siteData.owner.location}.
                </p>
                <p className="text-xs text-foreground/75 leading-relaxed">
                  {siteData.owner.bio}
                </p>
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="pt-3 border-t border-surface-border/60 grid grid-cols-3 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-lg border border-surface-border/80 bg-surface-muted/40 space-y-1">
                <span className="text-accent font-bold block text-[10px]">01. TYPE SAFETY</span>
                <p className="text-foreground/70 font-sans text-[11px] leading-tight">
                  End-to-end schema integrity from DB to UI.
                </p>
              </div>
              <div className="p-2.5 rounded-lg border border-surface-border/80 bg-surface-muted/40 space-y-1">
                <span className="text-accent font-bold block text-[10px]">02. MODERN REACT</span>
                <p className="text-foreground/70 font-sans text-[11px] leading-tight">
                  Server components & zero-layout shift.
                </p>
              </div>
              <div className="p-2.5 rounded-lg border border-surface-border/80 bg-surface-muted/40 space-y-1">
                <span className="text-accent font-bold block text-[10px]">03. SYSTEMS</span>
                <p className="text-foreground/70 font-sans text-[11px] leading-tight">
                  Relational indexing & clean API ergonomics.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Background (Education) */}
          {educationItem && (
            <div className="p-5 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-all">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-surface-border/60">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    <div>
                      <h3 className="text-sm font-bold font-sans text-foreground">
                        {educationItem.role}
                      </h3>
                      <span className="text-xs font-mono text-accent">
                        {educationItem.organization}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-foreground/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-foreground/40" />
                      <span>{educationItem.period}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-foreground/40" />
                      <span>{educationItem.location}</span>
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5 text-xs text-foreground/80 leading-relaxed font-sans">
                  {educationItem.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-accent text-[10px] mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coursework Tags */}
              {educationItem.skills && educationItem.skills.length > 0 && (
                <div className="pt-2.5 flex flex-wrap gap-1.5 border-t border-surface-border/40 font-mono text-[11px]">
                  <span className="text-foreground/50 text-[10px] mr-1 self-center">Coursework:</span>
                  {educationItem.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border border-surface-border bg-surface-muted/50 text-foreground/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
