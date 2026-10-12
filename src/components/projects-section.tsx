"use client";

import * as React from "react";
import Link from "next/link";
import { siteData, Project } from "@/data/site";
import { GithubIcon } from "@/components/icons";
import {
  ExternalLink,
  ArrowRight,
  FolderGit2,
  Sparkles,
} from "lucide-react";

export function ProjectsSection() {
  const [filter, setFilter] = React.useState<string>("all");

  const featuredProjects = siteData.projects.filter((p) => p.featured);

  const filterOptions = ["all", "featured", "Full-Stack", "Web Application", "Systems"];

  const getFilteredList = () => {
    if (filter === "all") return siteData.projects;
    if (filter === "featured") return featuredProjects;
    return siteData.projects.filter((p) => p.category === filter);
  };

  const displayedProjects = getFilteredList();

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <span>{"// engineering work"}</span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Featured Systems & Applications
            </h2>
            <p className="text-sm font-mono text-foreground/60 max-w-xl">
              Production prototypes, full-stack architectures, and web tools built with clean TypeScript.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-surface-border bg-surface-muted/50 font-mono text-xs self-start md:self-auto">
            {filterOptions.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded transition-all capitalize ${
                  filter === f
                    ? "bg-foreground text-background font-semibold shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm overflow-hidden flex flex-col justify-between hover:border-accent/40 hover:shadow-xl transition-all duration-300">
      <div>
        {/* Card Header / Preview Bar */}
        <div className="px-5 py-3 border-b border-surface-border bg-surface-muted/40 flex items-center justify-between font-mono text-xs text-foreground/60">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-3.5 h-3.5 text-accent" />
            <span>src/projects/{project.slug}</span>
          </div>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/25">
              <Sparkles className="w-2.5 h-2.5" />
              <span>featured</span>
            </span>
          )}
        </div>

        {/* Visual Preview / Schematic Area */}
        <div className="p-6 bg-gradient-to-b from-surface-muted/30 to-surface/20 border-b border-surface-border/50 relative group-hover:bg-accent/5 transition-colors">
          <div className="rounded-lg border border-surface-border/80 bg-background/90 p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-foreground/40 text-[11px] pb-1 border-b border-surface-border/40">
              <span>status: active</span>
              <span>category: {project.category}</span>
            </div>
            <div className="text-foreground/90 font-medium">
              &gt; {project.title}
            </div>
            <p className="text-foreground/60 text-[11px] line-clamp-2 leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-6 space-y-4">
          <div className="space-y-1.5">
            <Link
              href={`/projects/${project.slug}`}
              className="text-lg font-bold font-sans text-foreground group-hover:text-accent transition-colors flex items-center justify-between"
            >
              <span>{project.title}</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
            </Link>
            <p className="text-xs font-mono text-accent/80 font-medium">
              Role: {project.role}
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Tag Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[11px] font-mono border border-surface-border bg-surface-muted/50 text-foreground/75"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 border-t border-surface-border/70 bg-surface-muted/30 flex items-center justify-between gap-3 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-foreground/80 hover:text-accent flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* External links - hidden if not available */}
        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded border border-surface-border bg-surface text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
              title="View Repository on GitHub"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded border border-surface-border bg-surface text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
              title="Open Live Deployment"
              aria-label={`Open ${project.title} live deployment`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
