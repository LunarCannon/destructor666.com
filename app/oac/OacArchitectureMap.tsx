"use client";

import { KeyboardEvent, useMemo, useState } from "react";

type NodeKind = "surface" | "gateway" | "hook" | "store" | "engine" | "policy" | "output" | "artifact";

type FlowNode = {
  id: string;
  title: string;
  titleLines: string[];
  subtitleLines: string[];
  kind: NodeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  details: string;
  bullets: string[];
};

type FlowLink = {
  from: string;
  to: string;
  label: string;
  kind?: "normal" | "guard" | "artifact";
};

const nodes: FlowNode[] = [
  {
    id: "surfaces",
    title: "Surfaces",
    titleLines: ["Surfaces"],
    subtitleLines: ["Telegram · Signal · SMS", "CLI · cron · voice"],
    kind: "surface",
    x: 36,
    y: 78,
    w: 214,
    h: 112,
    details: "Every room where the agent speaks starts as a surface. OAC treats the room itself as part of the context because a group chat, Signal DM, CLI, and cron job have wildly different disclosure rules.",
    bullets: ["Captures platform, channel/thread, sender, modality, and query", "Voice is a modality, not infrastructure OAC owns", "Low-trust rooms get less detail by default"],
  },
  {
    id: "gateway",
    title: "Gateway / agent shell",
    titleLines: ["Gateway /", "agent shell"],
    subtitleLines: ["model turn owns reply"],
    kind: "gateway",
    x: 326,
    y: 78,
    w: 214,
    h: 112,
    details: "OAC sits beside the agent runtime instead of replacing it. The gateway asks for a compact continuity brief before the turn, then records a compact summary after the turn.",
    bullets: ["No separate chat bot fleet", "No always-on daemon required", "If OAC fails, the turn continues without extra context"],
  },
  {
    id: "hook",
    title: "Gateway hook adapter",
    titleLines: ["Gateway hook", "adapter"],
    subtitleLines: ["agent:start / agent:end"],
    kind: "hook",
    x: 616,
    y: 78,
    w: 214,
    h: 112,
    details: "The hook adapter is the tiny translation layer between Hermes gateway events and OAC commands. It is deliberately boring: bounded timeouts, no delivery side effects, no network calls, and an env kill switch.",
    bullets: ["Builds context on agent:start", "Records compact turns on agent:start and agent:end", "Fails open on disable, timeout, unsupported events, and errors"],
  },
  {
    id: "identity",
    title: "Identity + topic stitcher",
    titleLines: ["Identity + topic", "stitcher"],
    subtitleLines: ["aliases · token match"],
    kind: "engine",
    x: 164,
    y: 290,
    w: 214,
    h: 118,
    details: "Continuity starts with knowing who is speaking and which thread they are continuing. OAC does this deterministically, not by letting an LLM guess identities in a group chat like a haunted intern.",
    bullets: ["Aliases map surface/channel/sender to canonical users", "Topic IDs or token overlap continue active threads", "Unresolved identity means no cross-channel context"],
  },
  {
    id: "store",
    title: "Local OAC store",
    titleLines: ["Local OAC", "store"],
    subtitleLines: ["ledger + rolling state"],
    kind: "store",
    x: 454,
    y: 290,
    w: 214,
    h: 118,
    details: "The store is intentionally inspectable: compact event summaries in an append-only ledger plus a small rolling state file for live focus, questions, decisions, promises, tasks, policies, aliases, and topics.",
    bullets: ["Compact summaries, not raw transcript lake", "Append-only ledger plus rolling state", "File lock + atomic writes keep the gremlin from eating itself"],
  },
  {
    id: "privacy",
    title: "Privacy filter",
    titleLines: ["Privacy filter"],
    subtitleLines: ["surface policy", "sensitivity tiers"],
    kind: "policy",
    x: 744,
    y: 290,
    w: 214,
    h: 118,
    details: "The privacy filter decides what can cross from one room into another. Sensitive detail can exist without being repeated into the wrong surface.",
    bullets: ["Public / private / sensitive / secret tiers", "Low-trust channels get redacted presence markers", "Sensitive context routes back to safer surfaces before action"],
  },
  {
    id: "digest",
    title: "Digest synthesizer",
    titleLines: ["Digest", "synthesizer"],
    subtitleLines: ["structured operating pic"],
    kind: "engine",
    x: 246,
    y: 502,
    w: 214,
    h: 118,
    details: "The synthesizer builds a short deterministic digest from the ledger and rolling state. It keeps only the bits useful for the next turn: safe events, decisions, contradictions, stale notes, and open loops.",
    bullets: ["No vector DB required", "No embeddings required", "Deterministic proof artifacts make smoke tests possible"],
  },
  {
    id: "brief",
    title: "Continuity brief",
    titleLines: ["Continuity", "brief"],
    subtitleLines: ["bounded Markdown", "current user turn"],
    kind: "output",
    x: 536,
    y: 502,
    w: 214,
    h: 118,
    details: "The final product is a tiny prompt-ready brief. Crucially, it is appended to the current user message instead of welded into the cached system prompt.",
    bullets: ["Prompt-cache friendly", "Max-char bounded", "Context, not instruction"],
  },
  {
    id: "smoke",
    title: "Smoke + sync lanes",
    titleLines: ["Smoke + sync", "lanes"],
    subtitleLines: ["proof + safe backfill"],
    kind: "artifact",
    x: 826,
    y: 502,
    w: 214,
    h: 118,
    details: "The support lanes keep OAC honest: local cross-channel smoke tests verify the privacy promises, while conservative state sync can backfill compact summaries without importing everything.",
    bullets: ["Forbidden-string checks catch leakage", "State sync skips tool/cron/internal sludge", "Reports prove fail-open and redaction behavior"],
  },
];

const links: FlowLink[] = [
  { from: "surfaces", to: "gateway", label: "incoming turn" },
  { from: "gateway", to: "hook", label: "gateway event" },
  { from: "hook", to: "identity", label: "resolve speaker" },
  { from: "identity", to: "store", label: "record / read" },
  { from: "store", to: "privacy", label: "surface-safe slice", kind: "guard" },
  { from: "privacy", to: "digest", label: "allowed detail", kind: "guard" },
  { from: "digest", to: "brief", label: "render markdown" },
  { from: "brief", to: "gateway", label: "inject current turn", kind: "artifact" },
  { from: "store", to: "smoke", label: "prove behavior", kind: "artifact" },
  { from: "smoke", to: "privacy", label: "leak checks", kind: "guard" },
];

const kindLabel: Record<NodeKind, string> = {
  surface: "surface",
  gateway: "runtime",
  hook: "hook",
  store: "store",
  engine: "engine",
  policy: "guardrail",
  output: "brief",
  artifact: "proof lane",
};

function centerRight(node: FlowNode) {
  return { x: node.x + node.w, y: node.y + node.h / 2 };
}

function centerLeft(node: FlowNode) {
  return { x: node.x, y: node.y + node.h / 2 };
}

function centerBottom(node: FlowNode) {
  return { x: node.x + node.w / 2, y: node.y + node.h };
}

function centerTop(node: FlowNode) {
  return { x: node.x + node.w / 2, y: node.y };
}

function pathForLink(link: FlowLink) {
  const from = nodes.find((node) => node.id === link.from)!;
  const to = nodes.find((node) => node.id === link.to)!;

  if (from.y < to.y - 80) {
    const start = centerBottom(from);
    const end = centerTop(to);
    const mid = (start.y + end.y) / 2;
    return `M ${start.x} ${start.y} C ${start.x} ${mid}, ${end.x} ${mid}, ${end.x} ${end.y}`;
  }

  if (from.y > to.y + 80) {
    const start = centerTop(from);
    const end = centerBottom(to);
    const mid = (start.y + end.y) / 2;
    return `M ${start.x} ${start.y} C ${start.x} ${mid}, ${end.x} ${mid}, ${end.x} ${end.y}`;
  }

  const start = centerRight(from);
  const end = centerLeft(to);
  const bend = Math.max(48, Math.abs(end.x - start.x) * 0.38);
  return `M ${start.x} ${start.y} C ${start.x + bend} ${start.y}, ${end.x - bend} ${end.y}, ${end.x} ${end.y}`;
}

function labelPosition(link: FlowLink) {
  const from = nodes.find((node) => node.id === link.from)!;
  const to = nodes.find((node) => node.id === link.to)!;
  return {
    x: (from.x + from.w / 2 + to.x + to.w / 2) / 2,
    y: (from.y + from.h / 2 + to.y + to.h / 2) / 2 - 8,
  };
}

function nodeAriaLabel(node: FlowNode) {
  return `${node.title}: ${node.subtitleLines.join(" ")}`;
}

export function OacArchitectureMap() {
  const [activeId, setActiveId] = useState("brief");
  const activeNode = useMemo(() => nodes.find((node) => node.id === activeId) ?? nodes[0], [activeId]);

  function handleKey(event: KeyboardEvent<SVGGElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveId(id);
    }
  }

  return (
    <section className="oac-interactive panel" aria-labelledby="oac-map-title">
      <div className="oac-map-copy">
        <p className="kicker alert">Interactive architecture map</p>
        <h2 id="oac-map-title">Click a module. Follow the continuity current.</h2>
        <p>
          OAC is the anti-amnesia layer: compact cross-channel state, strict disclosure boundaries,
          and no raw transcript swamp. The map below shows the hot path from incoming message to
          surface-filtered brief.
        </p>
      </div>

      <div className="oac-map-shell" aria-label="Interactive OAC architecture diagram">
        <svg className="oac-svg" viewBox="0 0 1080 680" role="img" aria-labelledby="oac-svg-title oac-svg-desc">
          <title id="oac-svg-title">Omnichannel Agent Continuity architecture map</title>
          <desc id="oac-svg-desc">
            A visual flow showing surfaces, gateway, hook adapter, identity and topic stitching,
            local store, privacy filter, digest synthesizer, continuity brief, and smoke lanes.
          </desc>
          <defs>
            <pattern id="oacGrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(246,240,223,.08)" strokeWidth="1" />
            </pattern>
            <marker id="arrowHot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--hot)" />
            </marker>
            <marker id="arrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--cyan)" />
            </marker>
            <marker id="arrowAcid" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--acid)" />
            </marker>
            <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="rgba(255,32,78,.34)" />
            </filter>
          </defs>

          <rect width="1080" height="680" rx="30" fill="rgba(0,0,0,.28)" />
          <rect width="1080" height="680" rx="30" fill="url(#oacGrid)" />
          <path d="M 24 44 H 1056" stroke="rgba(255,32,78,.25)" strokeDasharray="7 10" />
          <path d="M 24 646 H 1056" stroke="rgba(55,247,255,.20)" strokeDasharray="7 10" />

          {links.map((link) => {
            const pos = labelPosition(link);
            const isGuard = link.kind === "guard";
            const isArtifact = link.kind === "artifact";
            return (
              <g className={`oac-link ${isGuard ? "guard" : ""} ${isArtifact ? "artifact" : ""}`} key={`${link.from}-${link.to}`}>
                <path
                  d={pathForLink(link)}
                  markerEnd={isGuard ? "url(#arrowHot)" : isArtifact ? "url(#arrowAcid)" : "url(#arrowCyan)"}
                />
                <text x={pos.x} y={pos.y} textAnchor="middle">{link.label}</text>
              </g>
            );
          })}

          {nodes.map((node) => {
            const selected = node.id === activeNode.id;
            return (
              <g
                key={node.id}
                className={`oac-node ${node.kind} ${selected ? "selected" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={nodeAriaLabel(node)}
                onClick={() => setActiveId(node.id)}
                onKeyDown={(event) => handleKey(event, node.id)}
                filter={selected ? "url(#nodeGlow)" : undefined}
              >
                <rect className="node-bg" x={node.x} y={node.y} width={node.w} height={node.h} rx="16" />
                <rect className="node-face" x={node.x} y={node.y} width={node.w} height={node.h} rx="16" />
                <text className="node-kind" x={node.x + 18} y={node.y + 27}>{kindLabel[node.kind]}</text>
                <text className="node-title" x={node.x + 18} y={node.y + 53}>
                  {node.titleLines.map((line, index) => (
                    <tspan key={line} x={node.x + 18} dy={index === 0 ? 0 : 17}>{line}</tspan>
                  ))}
                </text>
                <text className="node-subtitle" x={node.x + 18} y={node.y + (node.titleLines.length > 1 ? 88 : 82)}>
                  {node.subtitleLines.map((line, index) => (
                    <tspan key={line} x={node.x + 18} dy={index === 0 ? 0 : 14}>{line}</tspan>
                  ))}
                </text>
                <circle cx={node.x + node.w - 24} cy={node.y + 26} r="6" />
              </g>
            );
          })}
        </svg>
      </div>

      <aside className={`oac-node-panel ${activeNode.kind}`} aria-live="polite">
        <div>
          <p className="kicker">Selected module // {kindLabel[activeNode.kind]}</p>
          <h3>{activeNode.title}</h3>
          <p>{activeNode.details}</p>
        </div>
        <ul>
          {activeNode.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </aside>
    </section>
  );
}
