"use client";

import * as React from "react";
import Link from "next/link";
import { siteData } from "@/data/site";
import { ThemeToggle } from "./theme-toggle";
import { Terminal, Command, Menu, X, ArrowUpRight } from "lucide-react";

const emptySubscribe = () => () => {};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isMac = React.useSyncExternalStore(
    emptySubscribe,
    () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent),
    () => false
  );

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("toggle-mini-terminal"));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border/60 bg-background/85 backdrop-blur-md transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground hover:text-accent transition-colors group"
          >
            <span className="text-accent">&gt;</span>
            <span>{siteData.owner.handle}</span>
            <span className="text-muted text-xs hidden sm:inline group-hover:text-foreground transition-colors">
              .dev
            </span>
          </Link>

          {/* Availability Beacon */}
          <div
            className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono border border-accent/20 bg-accent/5 text-emerald-400"
            title="Available for internships and contracts"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span>open to work</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-foreground/75">
          {siteData.navLinks.slice(0, 5).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Terminal Toggle Button */}
          <button
            type="button"
            onClick={openTerminal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono border border-surface-border/80 bg-surface-muted/60 text-foreground/80 hover:text-accent hover:border-accent/40 transition-colors"
            title="Toggle Mini Terminal (or press ` backtick)"
            aria-label="Open mini terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px]">terminal</span>
            <kbd className="text-[10px] text-foreground/50 border border-surface-border px-1 rounded bg-background">`</kbd>
          </button>

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={openPalette}
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-mono border border-surface-border/80 bg-surface-muted/50 text-foreground/80 hover:text-foreground hover:border-accent/50 hover:bg-surface-muted transition-all"
            aria-label="Open command palette"
          >
            <Command className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline text-[11px]">Command</span>
            <kbd className="inline-flex items-center gap-0.5 text-[10px] text-foreground/60 border border-surface-border px-1.5 py-0.5 rounded bg-background">
              <span>{isMac ? "⌘" : "Ctrl"}</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md text-foreground/80 hover:text-foreground hover:bg-surface-muted border border-surface-border/80"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-surface-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2 font-mono text-sm">
            {siteData.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-foreground/80 hover:text-accent transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-muted">→</span>
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-surface-border flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTerminal();
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-foreground/80 hover:text-accent"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Open Mini Terminal</span>
            </button>
            <a
              href={siteData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-foreground/80 hover:text-accent"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
