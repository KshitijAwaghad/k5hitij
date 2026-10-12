"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import {
  Mail,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteData.owner.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" className="py-8 md:py-12 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-1.5 mb-6 text-center max-w-xl mx-auto">
          <div className="font-mono text-xs text-accent uppercase tracking-wider inline-flex items-center gap-2">
            <span>{"// get in touch"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Let&apos;s Connect & Build
          </h2>
          <p className="text-xs sm:text-sm font-mono text-foreground/60 leading-relaxed">
            Open to software engineering internships and collaborative projects. Drop a line or connect on socials.
          </p>
        </div>

        {/* Compact, High-Signal Contact Bar */}
        <div className="max-w-2xl mx-auto rounded-xl border border-surface-border bg-surface/80 backdrop-blur-sm p-5 sm:p-6 space-y-4 shadow-sm">
          {/* Email Click-to-Copy Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-accent/20 bg-accent/5 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-foreground/50 text-[11px] block">DIRECT EMAIL:</span>
              <span className="text-foreground font-semibold text-sm sm:text-base">
                {siteData.owner.email}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-surface-border bg-surface text-foreground hover:border-accent hover:text-accent transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteData.owner.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-accent text-black font-semibold hover:bg-emerald-400 transition-colors"
                title="Compose email in Gmail"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Compose</span>
              </a>
            </div>
          </div>

          {/* Resume and Socials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Resume Button */}
            <a
              href={siteData.owner.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-lg border border-surface-border bg-surface hover:border-accent/40 hover:bg-surface-muted transition-all font-mono text-xs group"
              title="Open Resume in new tab"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-accent" />
                <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  View Resume (PDF)
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Social Links Row */}
            <div className="flex items-center justify-between p-2 rounded-lg border border-surface-border bg-surface font-mono text-xs">
              <a
                href={siteData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded hover:text-accent hover:bg-surface-muted transition-colors flex items-center gap-1.5 text-foreground/80"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="text-[11px]">GitHub</span>
              </a>

              <a
                href={siteData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded hover:text-accent hover:bg-surface-muted transition-colors flex items-center gap-1.5 text-foreground/80"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="text-[11px]">LinkedIn</span>
              </a>

              <a
                href={siteData.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded hover:text-accent hover:bg-surface-muted transition-colors flex items-center gap-1.5 text-foreground/80"
                title="X (Twitter)"
              >
                <XIcon className="w-4 h-4" />
                <span className="text-[11px]">X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
