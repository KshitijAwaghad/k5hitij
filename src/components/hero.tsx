"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import {
  ArrowRight,
  Mail,
  Copy,
  Check,
  Sparkles,
  FileText,
  ArrowUpRight,
  Play,
  RotateCw,
  Terminal,
} from "lucide-react";
import { playClick, playSuccess } from "@/lib/sound";

const emptySubscribe = () => () => {};

export function Hero() {
  const fullCommand = "whoami --verbose";
  const prefersReducedMotion = React.useSyncExternalStore(
    emptySubscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  const [typedCommand, setTypedCommand] = React.useState("");
  const [showContent, setShowContent] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"config" | "package" | "output">("config");
  const [runTimestamp, setRunTimestamp] = React.useState<string>("just now");

  // Typing effect for the terminal prompt
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowContent(true), 150);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const activeCommand = prefersReducedMotion ? fullCommand : typedCommand;
  const isContentVisible = prefersReducedMotion || showContent;

  const tsCodeSnippet = `const developer: Developer = {
  name: "${siteData.owner.name}",
  handle: "${siteData.owner.handle}",
  role: "${siteData.owner.role}",
  location: "${siteData.owner.location}",
  status: "${siteData.owner.statusBadge}",
  primaryStack: [
    "TypeScript",
    "React 19",
    "Next.js App Router",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS"
  ],
  passion: "High-performance systems & accessible UI",
  availableForHire: true
};`;

  const packageJsonSnippet = `{
  "name": "${siteData.owner.handle}",
  "version": "2.5.0",
  "role": "${siteData.owner.role}",
  "pinnedRepos": [
    "ExpenseWise",
    "k5hitij.dev",
    "CampusResolve"
  ],
  "engines": {
    "node": ">=20.0.0",
    "next": "16.4.0",
    "typescript": "^5.0.0"
  },
  "dependencies": {
    "react": "^19.0.0",
    "tailwindcss": "^3.4.1",
    "prisma": "^5.10.0"
  }
}`;

  const handleRun = () => {
    playSuccess();
    setActiveTab("output");
    setRunTimestamp(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  };

  const copyCode = async () => {
    try {
      const content =
        activeTab === "package"
          ? packageJsonSnippet
          : activeTab === "output"
          ? "Execution log: Exit Code 0"
          : tsCodeSnippet;
      await navigator.clipboard.writeText(content);
      playSuccess();
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative pt-8 pb-10 md:pt-12 md:pb-14 overflow-hidden">
      {/* Background glow orb */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Typed terminal intro & positioning */}
          <div className="lg:col-span-7 space-y-4">
            {/* Terminal prompt badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-surface-border bg-surface-muted/60 font-mono text-xs text-foreground/80">
              <span className="text-accent">&gt;</span>
              <span className="text-foreground/90 font-medium">{activeCommand}</span>
              <span className="inline-block w-2 h-4 bg-accent animate-pulse" aria-hidden="true" />
            </div>

            {/* Main Headlines */}
            <div className={`space-y-3 transition-opacity duration-500 ${isContentVisible ? "opacity-100" : "opacity-90"}`}>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full-Stack Software Developer</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-sans leading-[1.1]">
                Hello, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-accent">
                  {siteData.owner.name}
                </span>
                .
              </h1>
              <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-xl font-normal">
                {siteData.owner.headline}
              </p>
            </div>

            {/* Status callout badge */}
            <div className="p-3 rounded-lg border border-accent/25 bg-accent/5 max-w-xl flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-foreground/90 font-medium">
                  {siteData.owner.statusBadge}
                </span>
              </div>
              <span className="text-foreground/50 hidden sm:inline text-[11px]">
                {siteData.owner.location}
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background font-mono text-xs font-semibold hover:bg-accent hover:text-black transition-all shadow-sm group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-surface-border bg-surface hover:bg-surface-muted hover:border-accent/40 text-foreground font-mono text-xs font-medium transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>Contact Me</span>
              </a>

              <a
                href={siteData.owner.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-surface-border bg-surface hover:bg-surface-muted hover:border-accent/40 text-foreground font-mono text-xs font-medium transition-all group"
                title="Open Resume in new tab"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code Editor Card with Tabs & Run console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-surface-border bg-surface/90 backdrop-blur-md shadow-2xl overflow-hidden transition-all hover:border-accent/30 group">
              {/* Window Title Bar & Tabs */}
              <div className="px-3 py-2 bg-surface-muted/80 border-b border-surface-border flex items-center justify-between gap-2">
                {/* Window buttons & Tab list */}
                <div className="flex items-center gap-2 overflow-x-auto">
                  <div className="flex items-center gap-1.5 pr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Tab 1: TS Config */}
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveTab("config");
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                      activeTab === "config"
                        ? "bg-surface text-foreground border border-surface-border font-semibold shadow-xs"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    <span className="text-accent font-bold text-[10px]">TS</span>
                    <span>config.ts</span>
                  </button>

                  {/* Tab 2: Package JSON */}
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveTab("package");
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                      activeTab === "package"
                        ? "bg-surface text-foreground border border-surface-border font-semibold shadow-xs"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    <span className="text-amber-400 font-bold text-[10px]">{}</span>
                    <span>package.json</span>
                  </button>

                  {/* Tab 3: Runtime Output */}
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveTab("output");
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 transition-colors ${
                      activeTab === "output"
                        ? "bg-surface text-emerald-400 border border-emerald-500/30 font-semibold shadow-xs"
                        : "text-foreground/50 hover:text-accent"
                    }`}
                  >
                    <Terminal className="w-3 h-3 text-accent" />
                    <span>console</span>
                  </button>
                </div>

                {/* Right Actions: Run Button & Copy Button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleRun}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-black font-mono text-[10px] font-bold transition-all shadow-xs"
                    title="Execute TypeScript runtime"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Run ▶</span>
                  </button>

                  <button
                    type="button"
                    onClick={copyCode}
                    className="p-1 rounded text-foreground/50 hover:text-foreground hover:bg-surface transition-colors"
                    title="Copy active snippet"
                    aria-label="Copy active code"
                  >
                    {copiedCode ? (
                      <Check className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tab 1: TypeScript Config Body */}
              {activeTab === "config" && (
                <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto select-text bg-[#0a0c10]/80 min-h-[300px]">
                  <div className="table w-full">
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right w-6">01</span>
                      <span className="table-cell text-foreground/80">
                        <span className="text-purple-400">interface</span>{" "}
                        <span className="text-amber-300">Developer</span> &#123;
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">02</span>
                      <span className="table-cell text-foreground/80 pl-4">
                        name: <span className="text-emerald-400">string</span>; role: <span className="text-emerald-400">string</span>;
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">03</span>
                      <span className="table-cell text-foreground/80 pl-4">
                        primaryStack: <span className="text-emerald-400">string</span>[]; availableForHire: <span className="text-emerald-400">boolean</span>;
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">04</span>
                      <span className="table-cell text-foreground/80">&#125;</span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">05</span>
                      <span className="table-cell">&nbsp;</span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">06</span>
                      <span className="table-cell text-foreground/80">
                        <span className="text-rose-400">const</span>{" "}
                        <span className="text-blue-400">developer</span>:{" "}
                        <span className="text-amber-300">Developer</span> = &#123;
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">07</span>
                      <span className="table-cell pl-4">
                        <span className="text-sky-300">name</span>:{" "}
                        <span className="text-emerald-300">&quot;{siteData.owner.name}&quot;</span>,
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">08</span>
                      <span className="table-cell pl-4">
                        <span className="text-sky-300">handle</span>:{" "}
                        <span className="text-emerald-300">&quot;{siteData.owner.handle}&quot;</span>,
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">09</span>
                      <span className="table-cell pl-4">
                        <span className="text-sky-300">role</span>:{" "}
                        <span className="text-emerald-300">&quot;{siteData.owner.role}&quot;</span>,
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">10</span>
                      <span className="table-cell pl-4">
                        <span className="text-sky-300">location</span>:{" "}
                        <span className="text-emerald-300">&quot;{siteData.owner.location}&quot;</span>,
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">11</span>
                      <span className="table-cell pl-4">
                        <span className="text-sky-300">primaryStack</span>: [
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">12</span>
                      <span className="table-cell pl-8 text-emerald-300">
                        &quot;TypeScript&quot;, &quot;Next.js&quot;, &quot;React&quot;,
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">13</span>
                      <span className="table-cell pl-8 text-emerald-300">
                        &quot;PostgreSQL&quot;, &quot;Tailwind CSS&quot;, &quot;Node.js&quot;
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">14</span>
                      <span className="table-cell pl-4">],</span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">15</span>
                      <span className="table-cell pl-4">
                        <span className="text-sky-300">availableForHire</span>:{" "}
                        <span className="text-amber-400">true</span>
                      </span>
                    </div>
                    <div className="table-row text-foreground/30 select-none">
                      <span className="table-cell pr-4 text-right">16</span>
                      <span className="table-cell text-foreground/80">&#125;;</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Package JSON Body */}
              {activeTab === "package" && (
                <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto select-text bg-[#0a0c10]/80 min-h-[300px]">
                  <div className="space-y-1">
                    <p className="text-foreground/80">&#123;</p>
                    <p className="pl-4 text-foreground/80">
                      <span className="text-sky-300">&quot;name&quot;</span>: <span className="text-emerald-300">&quot;{siteData.owner.handle}&quot;</span>,
                    </p>
                    <p className="pl-4 text-foreground/80">
                      <span className="text-sky-300">&quot;version&quot;</span>: <span className="text-emerald-300">&quot;2.5.0&quot;</span>,
                    </p>
                    <p className="pl-4 text-foreground/80">
                      <span className="text-sky-300">&quot;role&quot;</span>: <span className="text-emerald-300">&quot;{siteData.owner.role}&quot;</span>,
                    </p>
                    <p className="pl-4 text-foreground/80">
                      <span className="text-sky-300">&quot;pinnedRepos&quot;</span>: [
                    </p>
                    <p className="pl-8 text-emerald-300">&quot;ExpenseWise&quot;, &quot;k5hitij.dev&quot;, &quot;CampusResolve&quot;</p>
                    <p className="pl-4 text-foreground/80">],</p>
                    <p className="pl-4 text-foreground/80">
                      <span className="text-sky-300">&quot;dependencies&quot;</span>: &#123;
                    </p>
                    <p className="pl-8 text-foreground/70">
                      <span className="text-amber-300">&quot;next&quot;</span>: <span className="text-emerald-300">&quot;16.4.0&quot;</span>,
                    </p>
                    <p className="pl-8 text-foreground/70">
                      <span className="text-amber-300">&quot;react&quot;</span>: <span className="text-emerald-300">&quot;^19.0.0&quot;</span>,
                    </p>
                    <p className="pl-8 text-foreground/70">
                      <span className="text-amber-300">&quot;typescript&quot;</span>: <span className="text-emerald-300">&quot;^5.0.0&quot;</span>,
                    </p>
                    <p className="pl-8 text-foreground/70">
                      <span className="text-amber-300">&quot;prisma&quot;</span>: <span className="text-emerald-300">&quot;^5.10.0&quot;</span>,
                    </p>
                    <p className="pl-8 text-foreground/70">
                      <span className="text-amber-300">&quot;tailwindcss&quot;</span>: <span className="text-emerald-300">&quot;^3.4.1&quot;</span>
                    </p>
                    <p className="pl-4 text-foreground/80">&#125;</p>
                    <p className="text-foreground/80">&#125;</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Runtime Output Console */}
              {activeTab === "output" && (
                <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto select-text bg-[#06080b] min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center gap-2 text-foreground/50 pb-1 border-b border-surface-border/40">
                      <span className="text-accent">&gt;</span>
                      <span className="text-foreground/90">bun run developer.config.ts</span>
                      <span className="text-accent ml-auto text-[10px]">[OK] 0 errors</span>
                    </div>

                    <p className="text-foreground/60 pt-1">
                      [runtime] Next.js 16.4.0 (Turbopack) • Engine Node.js 20.x
                    </p>
                    <p className="text-emerald-400">
                      ✔ Developer Initialized: <strong>{siteData.owner.name}</strong> (@{siteData.owner.handle})
                    </p>
                    <p className="text-foreground/80">
                      ✔ Status: <span className="text-accent font-semibold">{siteData.owner.statusBadge}</span>
                    </p>

                    <div className="pt-1.5 space-y-0.5 text-foreground/85">
                      <p className="text-sky-300">✔ Pinned Core Projects Loaded:</p>
                      <p className="pl-4 text-foreground/75">▸ ExpenseWise [Next.js, Prisma, PostgreSQL]</p>
                      <p className="pl-4 text-foreground/75">▸ k5hitij.dev [Next.js App Router, Tailwind, cmdk]</p>
                      <p className="pl-4 text-foreground/75">▸ CampusResolve [React, Express, MongoDB]</p>
                    </div>

                    <p className="text-foreground/80 pt-1">
                      ✔ Telemetry: <strong>23 commits synced</strong> with @KshitijAwaghad (2026)
                    </p>
                    <p className="text-accent pt-1 font-semibold">
                      ✨ System operational. Ready for engineering collaborations.
                    </p>
                  </div>

                  {/* Rerun quick bar */}
                  <div className="pt-3 border-t border-surface-border/40 flex items-center justify-between text-[10px] text-foreground/50">
                    <span>Executed: {runTimestamp}</span>
                    <button
                      type="button"
                      onClick={handleRun}
                      className="inline-flex items-center gap-1 text-accent hover:underline font-mono"
                    >
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>Rerun code</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Status bar */}
              <div className="px-4 py-2 bg-surface-muted/50 border-t border-surface-border flex items-center justify-between text-[11px] font-mono text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>
                    {activeTab === "config"
                      ? "TypeScript 5.x • UTF-8"
                      : activeTab === "package"
                      ? "JSON • UTF-8 • 18 dependencies"
                      : "Bun / Node Runtime • Exit code: 0"}
                  </span>
                </span>
                <span>
                  {activeTab === "config"
                    ? "Ln 16, Col 2"
                    : activeTab === "package"
                    ? "Ln 22, Col 1"
                    : "12ms"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
