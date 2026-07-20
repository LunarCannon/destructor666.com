type DiagramNodeProps = {
  x: number;
  y: number;
  eyebrow: string;
  title: string[];
  detail: string[];
  tone?: "cyan" | "hot" | "acid" | "violet";
};

function DiagramNode({ x, y, eyebrow, title, detail, tone = "cyan" }: DiagramNodeProps) {
  return (
    <g className={`memory-node ${tone}`}>
      <rect className="memory-node-shadow" x={x + 5} y={y + 6} width="188" height="104" rx="14" />
      <rect className="memory-node-face" x={x} y={y} width="188" height="104" rx="14" />
      <text className="memory-node-eyebrow" x={x + 16} y={y + 24}>{eyebrow}</text>
      <text className="memory-node-title" x={x + 16} y={y + 51}>
        {title.map((line, index) => <tspan key={line} x={x + 16} dy={index === 0 ? 0 : 18}>{line}</tspan>)}
      </text>
      <text className="memory-node-detail" x={x + 16} y={y + 84}>
        {detail.map((line, index) => <tspan key={line} x={x + 16} dy={index === 0 ? 0 : 13}>{line}</tspan>)}
      </text>
      <circle className="memory-node-dot" cx={x + 164} cy={y + 23} r="5" />
    </g>
  );
}

function Arrow({ d, tone = "cyan", dashed = false }: { d: string; tone?: "cyan" | "hot" | "acid" | "violet"; dashed?: boolean }) {
  return <path className={`memory-arrow ${tone} ${dashed ? "dashed" : ""}`} d={d} markerEnd={`url(#memory-arrow-${tone})`} />;
}

export function GuardedMemoryMap() {
  return (
    <section className="memory-map panel" aria-labelledby="memory-map-title">
      <div className="memory-map-copy">
        <p className="kicker alert">Illustrated plumbing diagram</p>
        <h2 id="memory-map-title">A memory system should behave more like a customs checkpoint than a vacuum cleaner.</h2>
        <p>
          The point is not to remember every byte of a conversation. The point is to admit a tiny amount of useful,
          durable context through explicit gates, then disclose it in a form that cannot freeload as an instruction.
        </p>
      </div>

      <div className="memory-map-shell">
        <svg className="memory-svg" viewBox="0 0 1180 622" role="img" aria-labelledby="memory-svg-title memory-svg-description">
          <title id="memory-svg-title">A guarded local-memory pipeline</title>
          <desc id="memory-svg-description">
            A public-safe architecture illustration. A user message passes through source admission and candidate filtering
            into a local memory engine. On recall, the engine selects an opaque fingerprint, a trusted card store resolves
            the exact approved text, and a bounded advisory reaches the current turn. Rejected material stops without a write.
          </desc>
          <defs>
            <pattern id="memory-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(246,240,223,.08)" strokeWidth="1" />
            </pattern>
            {(["cyan", "hot", "acid", "violet"] as const).map((tone) => (
              <marker id={`memory-arrow-${tone}`} key={tone} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            ))}
            <filter id="memory-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(55,247,255,.28)" />
            </filter>
          </defs>

          <rect width="1180" height="622" rx="26" fill="rgba(0,0,0,.25)" />
          <rect width="1180" height="622" rx="26" fill="url(#memory-grid)" />
          <path d="M 24 42 H 1156" className="memory-rail hot" />
          <path d="M 24 580 H 1156" className="memory-rail cyan" />

          <text className="memory-lane-label" x="42" y="70">WRITE PATH // ADMIT ONLY WHAT IS WORTH KEEPING</text>
          <text className="memory-lane-label" x="42" y="336">READ PATH // SELECT, THEN RESOLVE EXACT APPROVED TEXT</text>

          <Arrow d="M 226 140 C 244 140, 250 140, 268 140" />
          <Arrow d="M 454 140 C 472 140, 478 140, 496 140" tone="hot" />
          <Arrow d="M 682 140 C 700 140, 706 140, 724 140" tone="violet" />
          <Arrow d="M 818 244 C 818 278, 748 300, 700 356" tone="violet" />
          <Arrow d="M 682 408 C 700 408, 706 408, 724 408" tone="acid" />
          <Arrow d="M 910 408 C 928 408, 934 408, 952 408" tone="acid" />
          <Arrow d="M 382 192 C 382 238, 300 252, 228 284" tone="hot" dashed />

          <DiagramNode x={38} y={88} eyebrow="01 // INPUT" title={["Conversation", "surface"]} detail={["A normal user turn", "arrives at the agent"]} />
          <DiagramNode x={268} y={88} eyebrow="02 // ADMISSION" title={["Source", "gate"]} detail={["Is this a trusted", "surface and shape?"]} tone="hot" />
          <DiagramNode x={496} y={88} eyebrow="03 // FILTER" title={["Candidate", "filter"]} detail={["Keep stable facts.", "Drop sludge + control text."]} tone="hot" />
          <DiagramNode x={724} y={88} eyebrow="04 // LOCAL" title={["Memory", "engine"]} detail={["Stores accepted", "bounded candidates"]} tone="violet" />

          <g className="memory-drop-zone">
            <rect x="42" y="268" width="308" height="112" rx="16" />
            <path d="M 66 296 l24 24 M 90 296 l-24 24" />
            <text x="112" y="304">NOT A MEMORY CANDIDATE?</text>
            <text x="112" y="331">No write. No retry spool.</text>
            <text x="112" y="353">The normal reply keeps moving.</text>
          </g>

          <DiagramNode x={496} y={356} eyebrow="05 // SELECTOR" title={["Local recall", "query"]} detail={["Finds a matching", "opaque reference"]} tone="violet" />
          <DiagramNode x={724} y={356} eyebrow="06 // RESOLVE" title={["Trusted", "card store"]} detail={["Looks up exact", "approved card text"]} tone="acid" />
          <DiagramNode x={952} y={356} eyebrow="07 // OUTPUT" title={["One advisory", "card"]} detail={["Reference only.", "Never an instruction."]} tone="acid" />

          <g className="memory-boundary" filter="url(#memory-glow)">
            <rect x="474" y="62" width="456" height="454" rx="24" />
            <text x="500" y="88">LOCAL-ONLY MEMORY BOUNDARY</text>
          </g>

          <g className="memory-legend" aria-label="Diagram legend">
            <rect x="42" y="526" width="212" height="34" rx="17" />
            <circle cx="62" cy="543" r="5" className="legend-dot cyan" />
            <text x="76" y="547">normal flow</text>
            <circle cx="150" cy="543" r="5" className="legend-dot hot" />
            <text x="164" y="547">hard gate</text>
          </g>
          <g className="memory-legend secondary" aria-hidden="true">
            <rect x="274" y="526" width="288" height="34" rx="17" />
            <circle cx="294" cy="543" r="5" className="legend-dot violet" />
            <text x="308" y="547">local selection</text>
            <circle cx="424" cy="543" r="5" className="legend-dot acid" />
            <text x="438" y="547">trusted output</text>
          </g>
        </svg>
      </div>
      <p className="memory-scroll-cue">Wide map: scroll sideways on smaller screens to follow the full signal path.</p>

      <div className="memory-map-notes">
        <article>
          <span>01</span>
          <h3>Write gate</h3>
          <p>Retention is fail-closed. If authority, lifecycle state, or validation is ambiguous, nothing is stored.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Selector, not author</h3>
          <p>The retrieval engine can point at an approved memory. It does not get to rewrite, paraphrase, or invent it.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Small output, clear label</h3>
          <p>At most one short card enters the current turn, explicitly marked as reference material instead of command text.</p>
        </article>
      </div>
    </section>
  );
}
