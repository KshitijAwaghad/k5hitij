"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { Layout, Server, Database, Wrench, Layers, CheckCircle2 } from "lucide-react";
import { playKeypress, playClick } from "@/lib/sound";

export function TechStack() {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");

  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <Layout className="w-4 h-4 text-emerald-400" />,
    Backend: <Server className="w-4 h-4 text-sky-400" />,
    Database: <Database className="w-4 h-4 text-amber-400" />,
    "Tools & DevOps": <Wrench className="w-4 h-4 text-purple-400" />,
  };

  const categories = ["all", ...siteData.skills.map((s) => s.category)];

  const filteredSkills =
    activeCategory === "all"
      ? siteData.skills
      : siteData.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-8 md:py-12 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-1.5">
            <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <span>{"// skills & technologies"}</span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Technical Stack & Tooling
            </h2>
            <p className="text-sm font-mono text-foreground/60 max-w-xl">
              Languages, libraries, and architectural platforms I work with. Zero arbitrary percentage meters.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-surface-border bg-surface-muted/50 font-mono text-xs self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1 rounded transition-all capitalize ${
                  activeCategory === cat
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSkills.map((catGroup) => (
            <div
              key={catGroup.category}
              className="p-4 sm:p-5 rounded-xl border border-surface-border bg-surface/60 backdrop-blur-sm space-y-3.5 hover:border-surface-border/90 hover:bg-surface/80 transition-all group"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-surface-border/60">
                <div className="flex items-center gap-2.5 font-mono text-sm font-semibold text-foreground">
                  {categoryIcons[catGroup.category] || <Layers className="w-4 h-4 text-accent" />}
                  <span>{catGroup.category}</span>
                </div>
                <span className="text-[11px] font-mono text-foreground/50">
                  {catGroup.skills.length} tools
                </span>
              </div>

              {/* Tag Chips with Contextual Proof Tooltips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {catGroup.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => playKeypress()}
                    className={`relative group/chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs border transition-all cursor-default select-none ${
                      skill.featured
                        ? "border-accent/30 bg-accent/5 text-foreground hover:border-accent hover:bg-accent/15"
                        : "border-surface-border bg-surface-muted/60 text-foreground/80 hover:border-surface-border/80 hover:text-foreground hover:bg-surface-muted"
                    }`}
                  >
                    {skill.featured && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block shrink-0 animate-pulse" />
                    )}
                    <span>{skill.name}</span>

                    {/* Contextual Proof Tooltip on Hover */}
                    {skill.usage && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[240px] px-2.5 py-1.5 rounded-md bg-[#090c10] border border-accent/40 text-foreground shadow-2xl text-[10px] font-sans leading-snug pointer-events-none opacity-0 translate-y-1 group-hover/chip:opacity-100 group-hover/chip:translate-y-0 transition-all z-30">
                        <div className="text-[9px] font-mono text-accent uppercase tracking-wider mb-0.5 font-bold">
                          Project Proof:
                        </div>
                        <p className="text-foreground/90">{skill.usage}</p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#090c10]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note on Proficiency */}
        <div className="mt-5 p-3.5 rounded-lg border border-surface-border/60 bg-surface-muted/30 flex items-center justify-between gap-4 font-mono text-xs text-foreground/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>Hover any tool to view concrete repository proof • Green dot indicates daily-driver</span>
          </div>
          <span className="hidden sm:inline text-[11px]">Strict TypeScript • No arbitrary 90% bars</span>
        </div>
      </div>
    </section>
  );
}
