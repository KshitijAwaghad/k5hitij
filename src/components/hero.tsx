"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { ArrowRight, Mail, Copy, Check, Terminal as TerminalIcon, Sparkles } from "lucide-react";

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

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(tsCodeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background glow orb */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typed terminal intro & positioning */}
          <div className="lg:col-span-7 space-y-6">
            {/* Terminal prompt badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-surface-border bg-surface-muted/60 font-mono text-xs text-foreground/80">
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
            <div className="p-3.5 rounded-lg border border-accent/25 bg-accent/5 max-w-xl flex items-center justify-between gap-3 text-xs font-mono">
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
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background font-mono text-xs font-semibold hover:bg-accent hover:text-black transition-all shadow-sm group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-surface-border bg-surface hover:bg-surface-muted hover:border-accent/40 text-foreground font-mono text-xs font-medium transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>Contact Me</span>
              </a>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-mini-terminal"))}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-md border border-surface-border/70 text-foreground/60 hover:text-foreground font-mono text-xs transition-colors"
                title="Launch Mini Terminal"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>` terminal</span>
              </button>
            </div>
          </div>

          {/* Right Column: Code Editor Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-surface-border bg-surface/90 backdrop-blur-md shadow-2xl overflow-hidden transition-all hover:border-accent/30 group">
              {/* Window Title Bar */}
              <div className="px-4 py-2.5 bg-surface-muted/70 border-b border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-foreground/60 flex items-center gap-1.5">
                    <span className="text-accent text-[11px]">TS</span>
                    <span>developer.config.ts</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyCode}
                  className="p-1 rounded text-foreground/50 hover:text-foreground hover:bg-surface transition-colors"
                  title="Copy code snippet"
                  aria-label="Copy TypeScript code snippet"
                >
                  {copiedCode ? (
                    <Check className="w-3.5 h-3.5 text-accent" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Code Body with Syntax Highlighting */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto select-text bg-[#0a0c10]/80">
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

              {/* Status bar */}
              <div className="px-4 py-2 bg-surface-muted/50 border-t border-surface-border flex items-center justify-between text-[11px] font-mono text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>TypeScript 5.x • UTF-8</span>
                </span>
                <span>Ln 16, Col 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
