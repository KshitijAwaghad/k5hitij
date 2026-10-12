"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { Terminal, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("toggle-mini-terminal"));
  };

  return (
    <footer className="w-full border-t border-surface-border/60 bg-surface/30 mt-24 py-12 transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10">
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
              <span className="text-accent">&gt;</span>
              <span>{siteData.owner.handle}</span>
            </div>
            <p className="text-xs text-foreground/60 max-w-sm leading-relaxed">
              {siteData.owner.role} based in {siteData.owner.location}. Dedicated to type-safe systems, responsive interfaces, and performant web architecture.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-foreground/50">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for internships & collaborations</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground/50">
              {"// Navigation"}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-foreground/70">
              {siteData.navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Terminal */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground/50">
              {"// Connect & Terminal"}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-surface-border bg-surface-muted/50 text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-surface-border bg-surface-muted/50 text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteData.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-surface-border bg-surface-muted/50 text-foreground/70 hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="X (Twitter) profile"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={openTerminal}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border border-surface-border bg-surface-muted text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Launch interactive terminal</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-surface-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-foreground/50">
          <p>© {new Date().getFullYear()} {siteData.owner.name}. Crafted with Next.js, TypeScript & Tailwind.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
