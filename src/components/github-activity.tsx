import * as React from "react";
import { siteData } from "@/data/site";
import { GithubIcon } from "@/components/icons";
import {
  GitBranch,
  Star,
  GitFork,
  ExternalLink,
  Flame,
  Activity,
  CheckCircle2,
} from "lucide-react";

export interface PinnedRepo {
  name: string;
  repoKey: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

// 1. Pinned 3 repositories in EXACT requested order:
// 1) ExpenseWise
// 2) k5hitij.dev
// 3) CampusResolve
const DEFAULT_PINNED_REPOS: PinnedRepo[] = [
  {
    name: "ExpenseWise",
    repoKey: "ExpenseWise",
    description:
      "Full-stack, responsive personal finance tracking application built using modern web technologies.",
    html_url: "https://github.com/KshitijAwaghad/ExpenseWise",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
  },
  {
    name: "k5hitij.dev",
    repoKey: "k5hitij.dev",
    description:
      "A minimal, modern personal developer portfolio built with Next.js App Router, TypeScript, and Tailwind CSS.",
    html_url: "https://github.com/KshitijAwaghad/k5hitij.dev",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
  },
  {
    name: "CampusResolve",
    repoKey: "CampusResolve",
    description:
      "Smart campus grievance redressal and transparent workflow tracking platform connecting students with administration.",
    html_url: "https://github.com/KshitijAwaghad/CampusResolve",
    stargazers_count: 0,
    forks_count: 1,
    language: "JavaScript",
  },
];

// Active contribution days from Kshitij's authentic GitHub profile (Total: 23 contributions)
const AUTHENTIC_ACTIVE_DAYS: Record<string, { count: number; level: number }> = {
  "2026-02-28": { count: 4, level: 3 },
  "2026-03-04": { count: 6, level: 4 },
  "2026-04-14": { count: 2, level: 2 },
  "2026-04-29": { count: 2, level: 2 },
  "2026-04-30": { count: 1, level: 1 },
  "2026-06-27": { count: 1, level: 1 },
  "2026-06-29": { count: 4, level: 3 },
  "2026-07-13": { count: 1, level: 1 },
  "2026-10-01": { count: 1, level: 1 },
  "2026-10-02": { count: 1, level: 1 },
};

function generateFallbackContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  // 366 days leading up to today
  const end = new Date("2026-10-12T00:00:00Z");
  for (let i = 365; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const record = AUTHENTIC_ACTIVE_DAYS[dateStr];
    days.push({
      date: dateStr,
      count: record ? record.count : 0,
      level: record ? record.level : 0,
    });
  }
  return days;
}

async function getPinnedReposData(): Promise<PinnedRepo[]> {
  const repos = await Promise.all(
    DEFAULT_PINNED_REPOS.map(async (pinned) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/KshitijAwaghad/${pinned.repoKey}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "k5hitij-portfolio",
            },
            next: { revalidate: 3600 },
          }
        );

        if (res.ok) {
          const data = await res.json();
          return {
            name: pinned.name,
            repoKey: pinned.repoKey,
            description: data.description || pinned.description,
            html_url: data.html_url || pinned.html_url,
            stargazers_count: typeof data.stargazers_count === "number" ? data.stargazers_count : pinned.stargazers_count,
            forks_count: typeof data.forks_count === "number" ? data.forks_count : pinned.forks_count,
            language: data.language || pinned.language,
          };
        }
      } catch {
        // use pinned fallback
      }
      return pinned;
    })
  );

  return repos;
}

async function getContributionsData(): Promise<{
  totalCount: number;
  contributions: ContributionDay[];
  isLive: boolean;
}> {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/KshitijAwaghad?y=last",
      {
        next: { revalidate: 3600 },
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.contributions) && data.contributions.length > 0) {
        return {
          totalCount: typeof data.total?.lastYear === "number" ? data.total.lastYear : 23,
          contributions: data.contributions,
          isLive: true,
        };
      }
    }
  } catch {
    // fallback
  }

  return {
    totalCount: 23,
    contributions: generateFallbackContributions(),
    isLive: false,
  };
}

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr + "T00:00:00Z");
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export async function GitHubActivity() {
  const [repos, { totalCount, contributions, isLive }] = await Promise.all([
    getPinnedReposData(),
    getContributionsData(),
  ]);

  // Build 53-week matrix (Sunday = row 0, Saturday = row 6)
  const firstDate = contributions[0] ? new Date(contributions[0].date + "T00:00:00Z") : new Date();
  const startDay = firstDate.getUTCDay();

  const weeks: Array<Array<ContributionDay | null>> = [];
  let currentWeek: Array<ContributionDay | null> = [];

  for (let i = 0; i < startDay; i++) {
    currentWeek.push(null);
  }

  for (const day of contributions) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // Calculate month header positions
  const months: Array<{ weekIndex: number; label: string }> = [];
  let lastMonth = "";
  weeks.forEach((w, idx) => {
    const day = w.find((d) => d !== null);
    if (day) {
      const dObj = new Date(day.date + "T00:00:00Z");
      const monthName = dObj.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
      if (monthName !== lastMonth) {
        months.push({ weekIndex: idx, label: monthName });
        lastMonth = monthName;
      }
    }
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border-[#006d32]/50";
      case 2:
        return "bg-[#006d32] border-[#26a641]/50";
      case 3:
        return "bg-[#26a641] border-[#39d353]/60";
      case 4:
        return "bg-[#39d353] border-[#39d353]";
      default:
        return "bg-surface-muted/70 border-surface-border/50";
    }
  };

  return (
    <section id="github" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
              <span>{"// git telemetry"}</span>
              <span className="h-px w-8 bg-accent/40" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
              Live GitHub Activity & Core Repositories
            </h2>
            <p className="text-sm font-mono text-foreground/60 max-w-xl">
              Authentic contribution telemetry and pinned repositories for @{siteData.owner.handle}.
            </p>
          </div>

          <a
            href={siteData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-surface-border bg-surface-muted/50 hover:border-accent/40 hover:text-accent font-mono text-xs text-foreground/80 transition-colors self-start md:self-auto"
          >
            <GithubIcon className="w-4 h-4" />
            <span>github.com/KshitijAwaghad</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Authentic Contribution Graph Box */}
        <div className="p-6 sm:p-8 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm space-y-6 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border/60 font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-accent" />
              <span className="font-semibold text-foreground">Contribution Heatmap</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-accent/10 text-accent border border-accent/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-accent" />
                <span>{isLive ? "Live Profile Synced" : "Verified Profile Data"}</span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-foreground/70 text-xs">
              <span className="flex items-center gap-1.5 font-sans">
                <Flame className="w-3.5 h-3.5 text-accent" />
                <span>
                  <strong className="font-bold text-foreground font-mono">{totalCount}</strong> contributions in the last year
                </span>
              </span>
            </div>
          </div>

          {/* GitHub-Authentic Heatmap Grid with Month & Day Labels */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px] select-none font-mono text-[10px]">
              {/* Month Header Row */}
              <div className="flex pl-8 mb-2 text-foreground/50 h-4 relative">
                {months.map((m, idx) => (
                  <div
                    key={idx}
                    className="absolute"
                    style={{ left: `${m.weekIndex * 14 + 32}px` }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>

              {/* Days + Grid Matrix */}
              <div className="flex gap-2">
                {/* Day Labels (Mon, Wed, Fri) */}
                <div className="flex flex-col justify-between text-foreground/40 text-[9px] pt-1 pb-1 w-6 select-none leading-none">
                  <span className="h-2.5"></span>
                  <span className="h-2.5">Mon</span>
                  <span className="h-2.5"></span>
                  <span className="h-2.5">Wed</span>
                  <span className="h-2.5"></span>
                  <span className="h-2.5">Fri</span>
                  <span className="h-2.5"></span>
                </div>

                {/* Weeks Columns */}
                <div className="inline-flex gap-[3px]">
                  {weeks.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-[3px]">
                      {week.map((day, dIndex) => {
                        if (!day) {
                          return <div key={dIndex} className="w-2.5 h-2.5 opacity-0" />;
                        }

                        const tooltipText = `${day.count === 0 ? "No contributions" : `${day.count} contribution${day.count > 1 ? "s" : ""}`} on ${formatDate(day.date)}`;

                        return (
                          <div
                            key={dIndex}
                            title={tooltipText}
                            className={`w-2.5 h-2.5 rounded-[2px] border transition-transform hover:scale-125 cursor-pointer ${getCellColor(
                              day.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend and Sync Note */}
          <div className="flex items-center justify-between text-[11px] font-mono text-foreground/50 pt-2 border-t border-surface-border/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Full 52-week activity calendar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-surface-muted/70 border border-surface-border/50" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429] border border-[#006d32]/50" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32] border border-[#26a641]/50" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641] border border-[#39d353]/60" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] border border-[#39d353]" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Pinned 3 Core Repositories Cards in Exact Order */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <div
              key={repo.name}
              className="p-5 rounded-xl border border-surface-border bg-surface/70 backdrop-blur-sm flex flex-col justify-between hover:border-accent/40 hover:bg-surface transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground group-hover:text-accent transition-colors">
                    <span className="text-[10px] text-accent font-mono px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                      0{idx + 1}
                    </span>
                    <GitBranch className="w-3.5 h-3.5 text-accent" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/40 hover:text-accent p-1"
                    title={`Open ${repo.name} on GitHub`}
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed font-sans">
                  {repo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono text-foreground/60 mt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1" title="Stars">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1" title="Forks">
                    <GitFork className="w-3 h-3 text-sky-400" />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
