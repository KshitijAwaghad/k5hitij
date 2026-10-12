"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export function TimelineSection() {
  const [filter, setFilter] = React.useState<"all" | "experience" | "education">("all");

  const filteredTimeline =
    filter === "all"
      ? siteData.timeline
      : siteData.timeline.filter((item) => item.type === filter);

  return (
    <section id="timeline" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <span>{"// journey & milestones"}</span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Experience & Education
            </h2>
            <p className="text-sm font-mono text-foreground/60 max-w-xl">
              Chronological track of engineering projects, coursework, and technical responsibilities.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 p-1 rounded-lg border border-surface-border bg-surface-muted/50 font-mono text-xs self-start md:self-auto">
            {(["all", "experience", "education"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded transition-all capitalize ${
                  filter === t
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface"
                }`}
              >
                {t === "all" ? "All Timeline" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-surface-border ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-8">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Indicator */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center transition-all ${
                  item.isCurrent
                    ? "border-accent ring-4 ring-accent/10"
                    : "border-surface-border group-hover:border-accent"
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.isCurrent ? "bg-accent" : "bg-foreground/40 group-hover:bg-accent"
                  }`}
                />
              </div>

              {/* Timeline Card */}
              <div className="p-6 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm space-y-4 hover:border-surface-border/90 transition-all">
                {/* Header: Title, Type Badge, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border/60">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.type === "experience" ? (
                        <Briefcase className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-sky-400" />
                      )}
                      <h3 className="text-base sm:text-lg font-bold font-sans text-foreground">
                        {item.role}
                      </h3>
                    </div>
                    <div className="text-xs font-mono text-accent">
                      {item.organization}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-foreground/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-foreground/40" />
                      <span>{item.period}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-foreground/40" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                  {item.description.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent text-xs mt-1">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Associated Skills */}
                {item.skills && item.skills.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5 border-t border-surface-border/40">
                    {item.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[10px] font-mono border border-surface-border bg-surface-muted/50 text-foreground/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
