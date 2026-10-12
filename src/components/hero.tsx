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
  RotateCw,
} from "lucide-react";
import { playClick, playSuccess, playKeypress } from "@/lib/sound";

const emptySubscribe = () => () => {};

interface TerminalScriptLine {
  prefix: string;
  prefixColor: string;
  text: string;
  textColor: string;
  detail?: string;
  detailColor?: string;
}

const TERMINAL_SCRIPT: TerminalScriptLine[] = [
  {
    prefix: "$",
    prefixColor: "text-accent font-bold",
    text: "bun run build --target=developer",
    textColor: "text-foreground font-semibold",
  },
  {
    prefix: "•",
    prefixColor: "text-foreground/40",
    text: "Parsing TypeScript 5.8 AST & checking type contracts...",
    textColor: "text-foreground/75",
    detail: "✔ 0 errors (strict mode)",
    detailColor: "text-emerald-400/90",
  },
  {
    prefix: "✔",
    prefixColor: "text-emerald-400 font-bold",
    text: `Initialized developer: ${siteData.owner.name} (@${siteData.owner.handle})`,
    textColor: "text-emerald-400 font-medium",
    detail: `✔ Status: ${siteData.owner.statusBadge}`,
    detailColor: "text-foreground/70",
  },
  {
    prefix: "✔",
    prefixColor: "text-sky-400 font-bold",
    text: "Resolving verified project workspaces...",
    textColor: "text-sky-300",
    detail: "▸ ExpenseWise, k5hitij.dev, CampusResolve",
    detailColor: "text-foreground/75",
  },
  {
    prefix: "✔",
    prefixColor: "text-purple-400 font-bold",
    text: "Syncing GitHub telemetry: 23 commits verified in 2026",
    textColor: "text-foreground/80",
  },
  {
    prefix: "✨",
    prefixColor: "text-accent font-bold",
    text: "Compilation successful (Exit code 0). Operational & open for hire.",
    textColor: "text-accent font-semibold",
  },
];

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

  // Terminal typewriter state - starts automatically on mount
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);

  // Left column typed terminal prompt effect
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

  const effectiveLineIndex = prefersReducedMotion ? TERMINAL_SCRIPT.length : currentLineIndex;
  const effectiveIsDone = prefersReducedMotion ? true : isDone;

  // Terminal card automatic letter-by-letter typing effect
  React.useEffect(() => {
    if (prefersReducedMotion || isDone) return;

    if (currentLineIndex >= TERMINAL_SCRIPT.length) return;

    const currentLine = TERMINAL_SCRIPT[currentLineIndex];

    if (currentCharIndex < currentLine.text.length) {
      const charTimer = setTimeout(() => {
        // Subtle audio feedback every few characters or on space
        if (currentCharIndex % 3 === 0 || currentLine.text[currentCharIndex] === " ") {
          playKeypress();
        }
        setCurrentCharIndex((prev) => prev + 1);
      }, 22);
      return () => clearTimeout(charTimer);
    } else {
      // Line complete
      if (currentLineIndex === TERMINAL_SCRIPT.length - 1) {
        const doneTimer = setTimeout(() => {
          setIsDone(true);
          playSuccess();
        }, 320);
        return () => clearTimeout(doneTimer);
      }

      // Move to next line after brief pause
      const lineDelay = currentLineIndex === 0 ? 400 : 320;
      const nextLineTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(nextLineTimer);
    }
  }, [currentLineIndex, currentCharIndex, isDone, prefersReducedMotion]);

  const handleReplay = () => {
    playClick();
    setIsDone(false);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  };

  const copyLog = async () => {
    try {
      const fullText = TERMINAL_SCRIPT.map(
        (l) => `${l.prefix} ${l.text}${l.detail ? `\n   ${l.detail}` : ""}`
      ).join("\n");
      await navigator.clipboard.writeText(fullText);
      playSuccess();
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // ignore
    }
  };

  const activeCommand = prefersReducedMotion ? fullCommand : typedCommand;
  const isContentVisible = prefersReducedMotion || showContent;

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

          {/* Right Column: Live Animated Typewriter Compilation Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border border-surface-border bg-surface/90 backdrop-blur-md shadow-2xl overflow-hidden transition-all hover:border-accent/30 group">
              {/* Window Title Bar */}
              <div className="px-3.5 py-2.5 bg-surface-muted/90 border-b border-surface-border flex items-center justify-between gap-2 select-none">
                {/* Window Dots & Title */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-foreground/75 font-semibold">
                    k5hitij@portfolio: ~/runtime (zsh)
                  </span>
                </div>

                {/* Right Controls: Status Badge, Replay, Copy */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      effectiveIsDone
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/25"
                        : "text-amber-400 bg-amber-500/10 border border-amber-500/25 animate-pulse"
                    }`}
                  >
                    {!effectiveIsDone && <RotateCw className="w-2.5 h-2.5 animate-spin" />}
                    <span>{effectiveIsDone ? "[OK] Exit 0" : "compiling..."}</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleReplay}
                    disabled={!effectiveIsDone}
                    className="p-1 rounded text-foreground/50 hover:text-accent hover:bg-surface transition-colors disabled:opacity-40 cursor-pointer"
                    title="Replay animation"
                    aria-label="Replay compilation sequence"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={copyLog}
                    className="p-1 rounded text-foreground/50 hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                    title="Copy terminal log"
                    aria-label="Copy terminal log"
                  >
                    {copiedCode ? (
                      <Check className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terminal Body with Letter-by-Letter Animated Stream */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto select-text bg-[#07090e] min-h-[310px] flex flex-col justify-between">
                <div className="space-y-2.5 font-mono text-[11px]">
                  {/* Previously completed lines */}
                  {TERMINAL_SCRIPT.slice(0, effectiveLineIndex).map((step, idx) => (
                    <div key={idx} className="space-y-0.5 animate-fade-in">
                      <div className={`flex items-start gap-2 ${step.textColor}`}>
                        <span className={`${step.prefixColor} shrink-0 select-none`}>
                          {step.prefix}
                        </span>
                        <span>{step.text}</span>
                      </div>
                      {step.detail && (
                        <div className={`pl-5 text-[10.5px] ${step.detailColor || "text-foreground/60"}`}>
                          {step.detail}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Currently typing line */}
                  {effectiveLineIndex < TERMINAL_SCRIPT.length && (
                    <div className="space-y-0.5">
                      <div
                        className={`flex items-start gap-2 ${TERMINAL_SCRIPT[effectiveLineIndex].textColor}`}
                      >
                        <span
                          className={`${TERMINAL_SCRIPT[effectiveLineIndex].prefixColor} shrink-0 select-none`}
                        >
                          {TERMINAL_SCRIPT[effectiveLineIndex].prefix}
                        </span>
                        <span>
                          {TERMINAL_SCRIPT[effectiveLineIndex].text.slice(0, currentCharIndex)}
                          <span className="inline-block w-2 h-3.5 bg-accent animate-pulse align-middle ml-0.5" />
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Terminal idle prompt when done */}
                  {effectiveIsDone && (
                    <div className="flex items-center gap-2 text-foreground/40 text-[11px] pt-1">
                      <span className="text-accent">&gt;</span>
                      <span className="inline-block w-2 h-3.5 bg-accent/60 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Footer status line inside terminal */}
                <div className="pt-3 mt-3 border-t border-surface-border/40 flex items-center justify-between text-[10px] font-mono text-foreground/50 select-none">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        effectiveIsDone ? "bg-accent" : "bg-amber-400 animate-pulse"
                      }`}
                    />
                    <span>{effectiveIsDone ? "Node.js 20.x • Bun Runtime" : "Streaming compiler output..."}</span>
                  </span>
                  <span>UTF-8 • Exit 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
