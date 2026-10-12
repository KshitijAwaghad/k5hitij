"use client";

import * as React from "react";
import { siteData } from "@/data/site";
import {
  Layers,
  Server,
  Database,
  Cpu,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export function ArchitectureDiagram() {
  const featuredProject = siteData.projects.find((p) => p.featured) || siteData.projects[0];
  const nodes = featuredProject.caseStudy.architectureNodes || [];

  const [selectedNodeId, setSelectedNodeId] = React.useState<string>(nodes[0]?.id || "client");

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "client":
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case "api":
        return <Server className="w-4 h-4 text-sky-400" />;
      case "db":
        return <Database className="w-4 h-4 text-amber-400" />;
      case "cache":
        return <Zap className="w-4 h-4 text-purple-400" />;
      default:
        return <Cpu className="w-4 h-4 text-accent" />;
    }
  };

  if (nodes.length === 0) return null;

  return (
    <section id="architecture" className="py-16 md:py-24 border-t border-surface-border/60 scroll-mt-14">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
            <span>{"// systems architecture"}</span>
            <span className="h-px w-8 bg-accent/40" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-sans">
            Interactive System Topology: {featuredProject.title}
          </h2>
          <p className="text-sm font-mono text-foreground/60 max-w-2xl leading-relaxed">
            Click on any architectural component below to inspect its role, data flow constraints, and trade-off rationales.
          </p>
        </div>

        {/* Interactive Diagram Canvas & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Diagram Visual Nodes Map */}
          <div className="lg:col-span-7 rounded-xl border border-surface-border bg-surface/80 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
              <span className="font-mono text-xs text-foreground/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span>topology_canvas.v1 [interactive]</span>
              </span>
              <span className="text-[11px] font-mono text-foreground/50">
                Click a node to inspect
              </span>
            </div>

            {/* Nodes Layout Grid with Connectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 relative">
              {nodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`text-left p-4 rounded-lg border font-mono transition-all relative group ${
                      isSelected
                        ? "border-accent bg-accent/10 shadow-lg shadow-accent/5 ring-1 ring-accent"
                        : "border-surface-border bg-surface-muted/50 hover:border-surface-border/90 hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.type)}
                        <span className="text-xs font-bold text-foreground">
                          {node.label}
                        </span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded border border-surface-border bg-surface text-foreground/60">
                        Node 0{index + 1}
                      </span>
                    </div>

                    <div className="text-[11px] text-foreground/60 line-clamp-1 mb-2">
                      {node.sublabel}
                    </div>

                    <div className="text-[10px] text-accent/90 flex items-center gap-1 font-mono">
                      <span>Tech: {node.tech.split(",")[0]}</span>
                    </div>

                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent shadow" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Topology Flow Indicator */}
            <div className="p-3 rounded-lg border border-surface-border/60 bg-surface-muted/30 font-mono text-xs text-foreground/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-accent">&gt;</span>
                <span className="text-[11px]">Flow: Client ──► Route Handler ──► Postgres / Cache</span>
              </div>
              <span className="text-[10px] text-accent uppercase font-semibold">Active</span>
            </div>
          </div>

          {/* Right: Architectural Inspector Panel */}
          <div className="lg:col-span-5 rounded-xl border border-accent/30 bg-surface/90 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div className="flex items-center gap-2 font-mono text-xs text-accent">
                  {getNodeIcon(selectedNode.type)}
                  <span className="font-semibold">{"// node_inspector"}</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-muted border border-surface-border text-foreground/70">
                  {selectedNode.type.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-sans text-foreground">
                  {selectedNode.label}
                </h3>
                <p className="font-mono text-xs text-foreground/60 mt-0.5">
                  {selectedNode.sublabel}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-1 font-mono text-xs">
                <span className="text-foreground/50 text-[11px] uppercase tracking-wider block">
                  Implementation Stack:
                </span>
                <div className="p-2 rounded bg-surface-muted border border-surface-border text-accent text-xs">
                  {selectedNode.tech}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-1.5 font-mono text-xs">
                <span className="text-foreground/50 text-[11px] uppercase tracking-wider block">
                  System Function:
                </span>
                <p className="text-foreground/80 leading-relaxed font-sans text-sm">
                  {selectedNode.description}
                </p>
              </div>

              {/* Design Rationale */}
              <div className="space-y-1.5 font-mono text-xs pt-2 border-t border-surface-border/60">
                <span className="text-accent text-[11px] uppercase tracking-wider font-semibold block flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  <span>Design Decision & Trade-off:</span>
                </span>
                <p className="text-foreground/75 leading-relaxed font-sans text-xs bg-surface-muted/40 p-3 rounded-lg border border-surface-border/60">
                  {selectedNode.rationale}
                </p>
              </div>
            </div>

            {/* Case study link */}
            <div className="pt-4 border-t border-surface-border">
              <a
                href={`/projects/${featuredProject.slug}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline group"
              >
                <span>Read complete {featuredProject.title} case study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
