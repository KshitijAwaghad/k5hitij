"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { siteData } from "@/data/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import {
  Search,
  FolderGit2,
  Sun,
  Moon,
  Copy,
  Terminal,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, []);

  const navigateTo = (url: string) => {
    setOpen(false);
    if (url.startsWith("http") || url.startsWith("mailto:")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${url}`);
      }
    } else {
      router.push(url);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteData.owner.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1000);
    } catch {
      // fallback
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  const openTerminal = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-mini-terminal"));
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-surface-border bg-surface/95 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-xs transition-all animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command Palette" className="w-full">
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border">
            <Search className="w-4 h-4 text-accent shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search sections, projects, actions..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 outline-none font-mono"
            />
            <kbd className="px-1.5 py-0.5 rounded border border-surface-border bg-surface-muted text-[10px] text-foreground/50">
              ESC
            </kbd>
          </div>

          {/* List Area */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-8 text-center text-xs text-foreground/50 font-mono">
              No matching commands or sections found.
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group heading="QUICK ACTIONS" className="text-[10px] text-foreground/40 uppercase tracking-wider px-2 pt-2">
              <Command.Item
                onSelect={toggleTheme}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  {resolvedTheme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-sky-400" />
                  )}
                  <span className="font-sans text-xs font-medium">Toggle Theme</span>
                </div>
                <span className="text-[10px] text-foreground/40 font-mono">
                  {resolvedTheme === "dark" ? "Switch to Light" : "Switch to Dark"}
                </span>
              </Command.Item>

              <Command.Item
                onSelect={openTerminal}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span className="font-sans text-xs font-medium">Open Interactive Mini Terminal</span>
                </div>
                <kbd className="text-[10px] text-foreground/40 border border-surface-border px-1 rounded bg-background">`</kbd>
              </Command.Item>

              <Command.Item
                onSelect={copyEmail}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span className="font-sans text-xs font-medium">
                    {copied ? "Copied Email Address!" : "Copy Email Address"}
                  </span>
                </div>
                <span className="text-[10px] text-foreground/40 font-mono">Clipboard</span>
              </Command.Item>
            </Command.Group>

            {/* Navigation */}
            <Command.Group heading="NAVIGATION" className="text-[10px] text-foreground/40 uppercase tracking-wider px-2 pt-2">
              {siteData.navLinks.map((item) => (
                <Command.Item
                  key={item.label}
                  onSelect={() => navigateTo(item.href)}
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-accent">&gt;</span>
                    <span className="font-sans text-xs font-medium">{item.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </Command.Item>
              ))}
            </Command.Group>

            {/* Projects */}
            <Command.Group heading="CASE STUDIES" className="text-[10px] text-foreground/40 uppercase tracking-wider px-2 pt-2">
              {siteData.projects.map((p) => (
                <Command.Item
                  key={p.slug}
                  onSelect={() => navigateTo(`/projects/${p.slug}`)}
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <FolderGit2 className="w-4 h-4 text-accent" />
                    <div>
                      <span className="font-sans text-xs font-medium block">{p.title}</span>
                      <span className="text-[10px] text-foreground/50 block font-mono">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-accent">View →</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* External Social Profiles */}
            <Command.Group heading="LINKS & SOCIALS" className="text-[10px] text-foreground/40 uppercase tracking-wider px-2 pt-2">
              <Command.Item
                onSelect={() => navigateTo(siteData.socials.github)}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4" />
                  <span className="font-sans text-xs font-medium">GitHub Profile</span>
                </div>
                <ExternalLink className="w-3 h-3 text-foreground/40" />
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo(siteData.socials.linkedin)}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4" />
                  <span className="font-sans text-xs font-medium">LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3 h-3 text-foreground/40" />
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo(siteData.socials.x)}
                className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <XIcon className="w-4 h-4" />
                  <span className="font-sans text-xs font-medium">X (formerly Twitter)</span>
                </div>
                <ExternalLink className="w-3 h-3 text-foreground/40" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Bar */}
          <div className="px-4 py-2 border-t border-surface-border bg-surface-muted/50 flex items-center justify-between text-[11px] text-foreground/50 font-mono">
            <span>Use ↑↓ to navigate, Enter to select</span>
            <span>ESC to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
