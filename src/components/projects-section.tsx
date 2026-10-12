"use client";

import * as React from "react";
import Link from "next/link";
import { siteData, Project } from "@/data/site";
import { GithubIcon } from "@/components/icons";
import { ExternalLink, ArrowRight, FolderGit2, Sparkles } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-8 md:py-12 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-1.5 mb-6">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// featured work"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Selected Projects
          </h2>
          <p className="text-sm font-mono text-foreground/60 max-w-xl">
            Key full-stack applications with architecture breakdowns and live source repositories.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteData.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm overflow-hidden flex flex-col justify-between hover:border-accent/40 hover:shadow-lg transition-all duration-300">
      <div>
        {/* Card Header */}
        <div className="px-4 py-2.5 border-b border-surface-border bg-surface-muted/40 flex items-center justify-between font-mono text-xs text-foreground/60">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-3.5 h-3.5 text-accent" />
            <span className="truncate">{project.slug}</span>
          </div>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/25">
              <Sparkles className="w-2.5 h-2.5" />
              <span>featured</span>
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2.5">
          <Link
            href={`/projects/${project.slug}`}
            className="text-base font-bold font-sans text-foreground group-hover:text-accent transition-colors flex items-center justify-between"
          >
            <span>{project.title}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
          </Link>

          <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed">
            {project.tagline}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[10px] font-mono border border-surface-border bg-surface-muted/50 text-foreground/75"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 py-2.5 border-t border-surface-border/70 bg-surface-muted/20 flex items-center justify-between gap-3 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-foreground/80 hover:text-accent flex items-center gap-1 transition-colors font-medium text-[11px]"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3 h-3" />
        </Link>

        {/* External links */}
        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-surface-border bg-surface text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
              title="View on GitHub"
              aria-label={`Open ${project.title} on GitHub`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-surface-border bg-surface text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
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
