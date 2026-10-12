"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import {
  Mail,
  Send,
  FileDown,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = React.useState<string>("");
  const [copiedEmail, setCopiedEmail] = React.useState<boolean>(false);

  const cleanEmail = siteData.owner.email.replace("TODO: add real email (e.g. ", "").replace(")", "");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(cleanEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedbackMsg(data.error || "An error occurred. Please try again.");
      } else {
        setStatus("success");
        setFeedbackMsg(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setStatus("error");
      setFeedbackMsg("Failed to connect to the server. Please email directly.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// initiate handshake"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Get In Touch & Collaborate
          </h2>
          <p className="text-sm font-mono text-foreground/60 max-w-xl">
            Open to software engineering internships, technical collaborations, or discussing architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts & Resume */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Email Card */}
            <div className="p-6 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                <span className="font-mono text-xs text-foreground/60 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>direct_communication</span>
                </span>
                <span className="text-[10px] font-mono text-accent">Active Channel</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-foreground/50 block">EMAIL ADDRESS:</span>
                <div className="flex items-center justify-between p-3 rounded-lg border border-surface-border bg-surface-muted/60 font-mono text-xs">
                  <span className="text-foreground/90 truncate mr-2">{cleanEmail}</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded text-foreground/60 hover:text-accent hover:bg-surface transition-colors"
                    title="Copy Email"
                    aria-label="Copy Email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${cleanEmail}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-surface border border-surface-border hover:border-accent/50 text-foreground font-mono text-xs font-medium hover:text-accent transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Compose in Mail App</span>
                </a>
              </div>
            </div>

            {/* Resume Download Card */}
            <div className="p-6 rounded-xl border border-accent/25 bg-accent/5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground font-bold">
                  <FileDown className="w-4 h-4 text-accent" />
                  <span>Resume & Credentials</span>
                </div>
                <span className="text-[10px] text-accent">PDF Format</span>
              </div>

              <p className="text-foreground/70 text-[11px] font-sans leading-relaxed">
                Download verified background summary, technical qualifications, and academic coursework.
              </p>

              <a
                href={siteData.owner.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-accent text-black font-mono text-xs font-semibold hover:bg-emerald-400 transition-colors shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-xl border border-surface-border bg-surface/70 space-y-3 font-mono text-xs">
              <span className="text-foreground/50 text-[11px] uppercase tracking-wider block">
                Connect Across Networks:
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href={siteData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-surface-border hover:border-accent/40 text-foreground/80 hover:text-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub: /KshitijAwaghad</span>
                  </div>
                  <span>↗</span>
                </a>

                <a
                  href={siteData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-surface-border hover:border-accent/40 text-foreground/80 hover:text-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn: /in/kshitijawaghad</span>
                  </div>
                  <span>↗</span>
                </a>

                <a
                  href={siteData.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-surface-border hover:border-accent/40 text-foreground/80 hover:text-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <XIcon className="w-4 h-4" />
                    <span>X: @k5hitij_5</span>
                  </div>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl border border-surface-border bg-surface/80 backdrop-blur-sm space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
                <div className="flex items-center gap-2 font-mono text-xs text-foreground/80">
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span className="font-semibold">send_message.sh</span>
                </div>
                <span className="text-[11px] font-mono text-foreground/50">
                  Encrypted & Direct
                </span>
              </div>

              {/* Status Banner */}
              {status === "success" && (
                <div className="p-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 flex items-start gap-3 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold">Transmission Successful!</p>
                    <p className="text-foreground/80 font-sans text-xs">{feedbackMsg}</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-lg border border-rose-500/40 bg-rose-500/10 flex items-start gap-3 text-xs font-mono text-rose-400">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold">Transmission Failed</p>
                    <p className="text-foreground/80 font-sans text-xs">{feedbackMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="contact-name" className="text-foreground/70 block">
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Linus Torvalds"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border bg-surface-muted/60 text-foreground placeholder:text-foreground/40 outline-none focus:border-accent font-mono text-xs transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="contact-email" className="text-foreground/70 block">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border bg-surface-muted/60 text-foreground placeholder:text-foreground/40 outline-none focus:border-accent font-mono text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5 font-mono text-xs">
                  <label htmlFor="contact-subject" className="text-foreground/70 block">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship Inquiry / System Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border bg-surface-muted/60 text-foreground placeholder:text-foreground/40 outline-none focus:border-accent font-mono text-xs transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5 font-mono text-xs">
                  <label htmlFor="contact-message" className="text-foreground/70 block">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team opportunity, or inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-surface-border bg-surface-muted/60 text-foreground placeholder:text-foreground/40 outline-none focus:border-accent font-mono text-xs transition-colors resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-md bg-foreground text-background font-mono text-xs font-semibold hover:bg-accent hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
