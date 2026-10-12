import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteData } from "@/data/site";
import { GithubIcon } from "@/components/icons";
import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return siteData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = siteData.projects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} - Case Study | ${siteData.owner.name}`,
      description: project.tagline,
    };
  });
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = siteData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-container mx-auto px-4 sm:px-6 space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-foreground/60 hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>&lt;-- Back to all projects</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="space-y-4 pb-8 border-b border-surface-border/70">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/60">
            <span className="text-accent uppercase tracking-wider font-semibold">
              {"// case study"}
            </span>
            <span>•</span>
            <span>Category: {project.category}</span>
            {project.featured && (
              <>
                <span>•</span>
                <span className="text-accent flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured Project
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-sans">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-foreground/80 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>

          {/* Metadata Row: Role, Tech, Links */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg border border-surface-border bg-surface-muted/40 space-y-1">
              <span className="text-foreground/50 block text-[11px]">MY ROLE</span>
              <span className="text-foreground font-medium">{project.role}</span>
            </div>

            {/* Project Links (only show if present) */}
            <div className="flex items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-surface-border bg-surface hover:border-accent/40 hover:text-accent font-mono text-xs transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-black font-mono text-xs font-semibold hover:bg-emerald-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live App</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Tech Stack Banner */}
        <div className="p-4 rounded-xl border border-surface-border bg-surface/50 font-mono text-xs flex flex-wrap items-center gap-2">
          <span className="text-foreground/50 uppercase tracking-wider text-[11px] mr-2">
            Technologies:
          </span>
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded border border-accent/20 bg-accent/5 text-foreground/90"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Section 1: Problem Statement & Context */}
        <section className="space-y-4">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>01. The Problem</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
          <h2 className="text-2xl font-bold font-sans text-foreground">
            Core Problem & Motivation
          </h2>
          <div className="p-6 rounded-xl border border-surface-border bg-surface/70 leading-relaxed text-foreground/80 space-y-3">
            <p>{caseStudy.problem}</p>
          </div>
        </section>

        {/* Section 2: My Role & Responsibilities */}
        <section className="space-y-4">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>02. Engineering Role</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
          <h2 className="text-2xl font-bold font-sans text-foreground">
            Architecture & Implementation Role
          </h2>
          <div className="p-6 rounded-xl border border-surface-border bg-surface/70 leading-relaxed text-foreground/80 space-y-3">
            <p>{caseStudy.roleDetails}</p>
          </div>
        </section>

        {/* Section 3: System Architecture Diagram (SVG Topology) */}
        <section className="space-y-4">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>03. System Architecture</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
          <h2 className="text-2xl font-bold font-sans text-foreground">
            Topological Architecture & Data Flow
          </h2>
          <div className="p-6 rounded-xl border border-surface-border bg-surface/70 space-y-6">
            <p className="text-sm font-mono text-foreground/70">
              {caseStudy.architectureSummary}
            </p>

            {/* Mermaid-Style Clean SVG Architectural Flow */}
            <div className="p-6 rounded-lg border border-surface-border/80 bg-background/90 overflow-x-auto">
              <svg
                viewBox="0 0 840 180"
                className="w-full min-w-[700px] h-auto font-mono text-xs select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Node 1: Client */}
                <rect x="20" y="45" width="180" height="90" rx="8" fill="#111317" stroke="#10b981" strokeWidth="1.5" />
                <text x="110" y="75" textAnchor="middle" fill="#f1f5f9" fontWeight="bold" fontSize="12">Next.js Client</text>
                <text x="110" y="95" textAnchor="middle" fill="#10b981" fontSize="10">React 19 Hydration</text>
                <text x="110" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Optimistic UI State</text>

                {/* Arrow 1 */}
                <line x1="200" y1="90" x2="270" y2="90" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                <polygon points="270,90 262,85 262,95" fill="#10b981" />
                <text x="235" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">JSON / RPC</text>

                {/* Node 2: API Gateway */}
                <rect x="280" y="45" width="180" height="90" rx="8" fill="#111317" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="370" y="75" textAnchor="middle" fill="#f1f5f9" fontWeight="bold" fontSize="12">API Route Handlers</text>
                <text x="370" y="95" textAnchor="middle" fill="#38bdf8" fontSize="10">Zod Schema Validation</text>
                <text x="370" y="115" textAnchor="middle" fill="#64748b" fontSize="9">Auth & Middleware</text>

                {/* Arrow 2 */}
                <line x1="460" y1="90" x2="530" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" />
                <polygon points="530,90 522,85 522,95" fill="#38bdf8" />
                <text x="495" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">SQL / Prisma</text>

                {/* Node 3: Database & Cache */}
                <rect x="540" y="25" width="180" height="60" rx="8" fill="#111317" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="630" y="52" textAnchor="middle" fill="#f1f5f9" fontWeight="bold" fontSize="11">PostgreSQL DB</text>
                <text x="630" y="68" textAnchor="middle" fill="#fbbf24" fontSize="9">Indexed Ledger Records</text>

                <rect x="540" y="95" width="180" height="60" rx="8" fill="#111317" stroke="#a855f7" strokeWidth="1.5" />
                <text x="630" y="122" textAnchor="middle" fill="#f1f5f9" fontWeight="bold" fontSize="11">Summary Cache / Store</text>
                <text x="630" y="138" textAnchor="middle" fill="#a855f7" fontSize="9">Fast Aggregations</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 4: Key Features */}
        <section className="space-y-4">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>04. Implementation</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
          <h2 className="text-2xl font-bold font-sans text-foreground">
            Key Architectural Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-surface-border bg-surface/70 space-y-2 hover:border-surface-border/90 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Feature 0{i + 1}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Challenges & Lessons Learned */}
        <section className="space-y-4">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>05. Engineering Retrospective</span>
            <span className="h-px w-6 bg-accent/40" />
          </div>
          <h2 className="text-2xl font-bold font-sans text-foreground">
            Challenges Encountered & Key Takeaways
          </h2>
          <div className="p-6 rounded-xl border border-surface-border bg-surface/70 space-y-4">
            <div className="space-y-3 font-mono text-xs">
              {caseStudy.challengesLearned.map((chal, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-surface-border/80 bg-surface-muted/40 flex items-start gap-3"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-foreground font-semibold">Challenge 0{i + 1}:</span>
                    <p className="text-foreground/80 leading-relaxed font-sans text-sm">
                      {chal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-surface-border flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-foreground/80 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Projects</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-black font-mono text-xs font-semibold hover:bg-emerald-400 transition-colors"
          >
            <span>Discuss this project</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
