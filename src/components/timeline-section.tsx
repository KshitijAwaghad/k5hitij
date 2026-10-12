"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function TimelineSection() {
  const educationItem = siteData.timeline.find((t) => t.type === "education") || siteData.timeline[0];

  if (!educationItem) return null;

  return (
    <section id="education" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// education & academics"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Academic Background
          </h2>
          <p className="text-sm font-mono text-foreground/60 max-w-xl">
            Formal coursework and foundational computer science studies.
          </p>
        </div>

        {/* Education Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm space-y-4 hover:border-surface-border/90 transition-all max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border/60">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-bold font-sans text-foreground">
                  {educationItem.role}
                </h3>
              </div>
              <div className="text-xs font-mono text-accent font-medium">
                {educationItem.organization}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-foreground/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-foreground/40" />
                <span>{educationItem.period}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-foreground/40" />
                <span>{educationItem.location}</span>
              </span>
            </div>
          </div>

          {/* Description Bullets */}
          <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed font-sans">
            {educationItem.description.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent text-xs mt-1">▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Core Coursework Tags */}
          {educationItem.skills && educationItem.skills.length > 0 && (
            <div className="pt-3 flex flex-wrap gap-1.5 border-t border-surface-border/40 font-mono text-xs">
              <span className="text-foreground/50 text-[11px] mr-1 self-center">Coursework:</span>
              {educationItem.skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono border border-surface-border bg-surface-muted/50 text-foreground/75"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
