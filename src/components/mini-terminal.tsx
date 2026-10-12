"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import { useTheme } from "next-themes";
import { Terminal, X, Minus, Sparkles, Send } from "lucide-react";
import { playClick, playKeypress, playSuccess } from "@/lib/sound";

interface TerminalHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

function MatrixEffect() {
  const [lines, setLines] = React.useState<string[]>([]);
  React.useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const katakana = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ101010101";
      const line = Array.from({ length: 24 }, () =>
        katakana[Math.floor(Math.random() * katakana.length)]
      ).join(" ");
      setLines((prev) => [...prev.slice(-6), line]);
      if (count > 12) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] text-emerald-400 leading-tight space-y-0.5 select-none py-1">
      <div className="text-accent font-semibold pb-1">[INITIALIZING MATRIX PROTOCOL...]</div>
      {lines.map((l, i) => (
        <div key={i} className="tracking-widest opacity-90">{l}</div>
      ))}
      {lines.length >= 6 && (
        <div className="text-foreground/70 pt-1 text-[11px]">
          🟢 Wake up, Neo... matrix stream completed.
        </div>
      )}
    </div>
  );
}

export function MiniTerminal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const [history, setHistory] = React.useState<TerminalHistoryItem[]>([
    {
      id: "init",
      command: "init",
      output: (
        <div className="space-y-1 text-foreground/80">
          <p className="text-accent font-semibold">
            {siteData.owner.handle} developer console v2.5
          </p>
          <p className="text-foreground/60 text-[11px]">
            Type <span className="text-accent font-bold">help</span> to see available commands or press <kbd className="px-1 py-0.5 rounded bg-surface-muted text-accent border border-surface-border">`</kbd> to dismiss.
          </p>
        </div>
      ),
    },
  ]);
  const [commandIndex, setCommandIndex] = React.useState<number>(-1);
  const [commandList, setCommandList] = React.useState<string[]>([]);
  const { setTheme, resolvedTheme } = useTheme();

  const terminalEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Listen to keyboard backtick ` and custom event
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (e.key === "`" && !isInput) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-mini-terminal", handleToggle);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-mini-terminal", handleToggle);
    };
  }, []);

  // Auto focus input when opened
  React.useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, isMinimized]);

  // Scroll to bottom on output update
  React.useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    setCommandList((prev) => [...prev, cmd]);
    setCommandIndex(-1);

    const lower = cmd.toLowerCase();
    let outputContent: React.ReactNode;

    if (lower === "hire-me" || lower === "sudo hire-me") {
      playSuccess();
    } else {
      playClick();
    }

    switch (lower) {
      case "help":
        outputContent = (
          <div className="space-y-1.5 text-foreground/80 font-mono text-xs">
            <p className="text-accent">Available commands:</p>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <div><strong className="text-foreground">help</strong> - list commands</div>
              <div><strong className="text-foreground">about</strong> - summary of background</div>
              <div><strong className="text-foreground">projects</strong> - list projects</div>
              <div><strong className="text-foreground">skills</strong> - list tech stack</div>
              <div><strong className="text-foreground">neofetch</strong> - system specs & ASCII</div>
              <div><strong className="text-foreground">matrix</strong> - enter the Matrix</div>
              <div><strong className="text-foreground">quote</strong> - engineering wisdom</div>
              <div><strong className="text-foreground">theme</strong> - switch light/dark mode</div>
              <div><strong className="text-foreground">contact</strong> - reach out</div>
              <div><strong className="text-foreground">clear</strong> - clear screen</div>
              <div className="col-span-2"><strong className="text-emerald-400">sudo hire-me</strong> - fast-track hiring</div>
            </div>
          </div>
        );
        break;

      case "about":
        outputContent = (
          <div className="space-y-1 text-foreground/80 text-[11px] leading-relaxed">
            <p><strong className="text-accent">{siteData.owner.name}</strong> ({siteData.owner.handle})</p>
            <p>{siteData.owner.role} • {siteData.owner.location}</p>
            <p className="text-foreground/60">{siteData.owner.bio}</p>
          </div>
        );
        break;

      case "projects":
        outputContent = (
          <div className="space-y-1.5 text-[11px]">
            <p className="text-accent font-semibold">Indexed Projects:</p>
            {siteData.projects.map((p) => (
              <div key={p.slug} className="flex items-center justify-between">
                <span>▸ {p.title} ({p.category})</span>
                <a
                  href={`/projects/${p.slug}`}
                  className="text-accent underline hover:text-emerald-300"
                >
                  /projects/{p.slug}
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        outputContent = (
          <div className="space-y-1 text-[11px]">
            <p className="text-accent font-semibold">Core Stack:</p>
            <p className="text-foreground/80">Frontend: React 19, Next.js App Router, TypeScript, Tailwind CSS</p>
            <p className="text-foreground/80">Backend: Node.js, Express, Next.js Route Handlers, REST APIs</p>
            <p className="text-foreground/80">Database: PostgreSQL, MongoDB, Prisma ORM</p>
            <p className="text-foreground/80">DevOps: Git, GitHub, Vercel, Linux</p>
          </div>
        );
        break;

      case "contact":
        outputContent = (
          <div className="space-y-1 text-[11px]">
            <p className="text-accent font-semibold">Connect with {siteData.owner.handle}:</p>
            <p>GitHub: <a href={siteData.socials.github} target="_blank" className="underline text-accent">{siteData.socials.github}</a></p>
            <p>LinkedIn: <a href={siteData.socials.linkedin} target="_blank" className="underline text-accent">{siteData.socials.linkedin}</a></p>
            <p>X: <a href={siteData.socials.x} target="_blank" className="underline text-accent">{siteData.socials.x}</a></p>
          </div>
        );
        break;

      case "theme":
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        outputContent = (
          <p className="text-amber-400 text-[11px]">
            Theme updated to {nextTheme.toUpperCase()} mode.
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "neofetch":
        outputContent = (
          <div className="space-y-2 text-[11px] font-mono">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <pre className="text-accent text-[10px] leading-tight select-none">
{`  _   _____ _     _ _   _ _ 
 | | / ____| |   (_) | (_) |
 | |( (___ | |__  _| |_ _| |
 | | \\___ \\| '_ \\| | __| | |
 |_| ____) | | | | | |_| | |
    |_____/|_| |_|_|\\__|_|_|`}
              </pre>
              <div className="space-y-0.5 text-foreground/80 leading-snug">
                <p><span className="text-accent font-bold">{siteData.owner.handle}</span>@<span className="text-accent font-bold">portfolio</span></p>
                <div className="h-px bg-surface-border my-1" />
                <p><span className="text-accent font-semibold">OS:</span> Windows 11 / Linux (WSL2)</p>
                <p><span className="text-accent font-semibold">Host:</span> {siteData.owner.name}&apos;s Workspace</p>
                <p><span className="text-accent font-semibold">Kernel:</span> Next.js 16.4.0 (Turbopack)</p>
                <p><span className="text-accent font-semibold">Uptime:</span> 2023 - Present (Active)</p>
                <p><span className="text-accent font-semibold">Shell:</span> zsh 5.9 / powershell</p>
                <p><span className="text-accent font-semibold">Editor:</span> VS Code / Cursor</p>
                <p><span className="text-accent font-semibold">Stack:</span> TypeScript, React 19, Prisma, PostgreSQL</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-3 h-2 rounded-xs bg-slate-800 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-rose-500 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-emerald-400 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-amber-400 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-sky-400 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-purple-400 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-teal-400 inline-block" />
              <span className="w-3 h-2 rounded-xs bg-slate-200 inline-block" />
            </div>
          </div>
        );
        break;

      case "matrix":
        outputContent = <MatrixEffect />;
        break;

      case "quote":
      case "curl quote":
        const quotes = [
          { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
          { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
          { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
          { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
          { text: "Controlling complexity is the essence of computer programming.", author: "Brian Kernighan" },
        ];
        const picked = quotes[Math.floor(Math.random() * quotes.length)];
        outputContent = (
          <div className="p-2.5 rounded border border-surface-border bg-surface-muted/60 space-y-1 text-[11px]">
            <p className="italic text-foreground/90">&ldquo;{picked.text}&rdquo;</p>
            <p className="text-accent text-[10px] font-semibold text-right">— {picked.author}</p>
          </div>
        );
        break;

      case "sudo hire-me":
      case "hire-me":
        outputContent = (
          <div className="p-3 rounded border border-emerald-500/40 bg-emerald-500/10 space-y-1.5 text-xs text-foreground">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>[AUTHENTICATION SUCCESSFUL] Superuser privilege granted!</span>
            </div>
            <p className="text-foreground/90 leading-relaxed text-[11px]">
              🚀 Offer protocol initialized. Let&apos;s build impactful software together!
            </p>
            <p className="text-[11px] font-mono text-accent">
              Redirecting you to the contact section in 3 seconds...
            </p>
          </div>
        );
        setTimeout(() => {
          const contactSec = document.querySelector("#contact");
          if (contactSec) contactSec.scrollIntoView({ behavior: "smooth" });
        }, 1500);
        break;

      default:
        outputContent = (
          <p className="text-rose-400 text-[11px]">
            command not found: {cmd}. Type <strong className="text-accent underline cursor-pointer" onClick={() => executeCommand("help")}>help</strong> for a list of commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: cmd,
        output: outputContent,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playClick();
      if (commandList.length === 0) return;
      const nextIdx = commandIndex === -1 ? commandList.length - 1 : Math.max(0, commandIndex - 1);
      setCommandIndex(nextIdx);
      setInputVal(commandList[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      playClick();
      if (commandIndex === -1) return;
      const nextIdx = commandIndex + 1;
      if (nextIdx >= commandList.length) {
        setCommandIndex(-1);
        setInputVal("");
      } else {
        setCommandIndex(nextIdx);
        setInputVal(commandList[nextIdx] || "");
      }
    } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
      playKeypress();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Interactive Developer Terminal"
      className="fixed bottom-4 right-4 z-50 w-full max-w-lg rounded-xl border border-accent/40 bg-surface/95 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-xs flex flex-col transition-all duration-200"
      style={{ maxHeight: isMinimized ? "42px" : "380px" }}
    >
      {/* Terminal Title Bar */}
      <div className="px-3.5 py-2.5 bg-surface-muted/90 border-b border-surface-border flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] font-bold text-foreground/80">
            k5hitij@portfolio: ~ (zsh)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 rounded text-foreground/50 hover:text-foreground hover:bg-surface transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
            className="p-1 rounded text-foreground/50 hover:text-rose-400 hover:bg-surface transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Scrollable output area */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 max-h-72 bg-[#090b0e]/90 text-foreground/90 font-mono">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.command !== "init" && (
                  <div className="flex items-center gap-2 text-foreground/50 text-[11px]">
                    <span className="text-accent">&gt;</span>
                    <span className="text-foreground/90">{item.command}</span>
                  </div>
                )}
                <div>{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt Input Line */}
          <div className="p-2.5 border-t border-surface-border bg-surface-muted/60 flex items-center gap-2">
            <span className="text-accent font-bold pl-1">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type help, projects, sudo hire-me..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-foreground/40 outline-none font-mono"
            />
            <button
              type="button"
              onClick={() => executeCommand(inputVal)}
              className="p-1 rounded text-accent hover:bg-surface transition-colors"
              title="Submit command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
