export type Artifact = {
  slug: string;
  title: string;
  label: string;
  status: "live" | "prototype" | "specimen";
  href: string;
  description: string;
  whyItExists: string;
};

export const artifacts: Artifact[] = [
  {
    slug: "daily-ai-zine",
    title: "Daily AI Zine",
    label: "Transmission archive",
    status: "live",
    href: "/zine",
    description: "A stable public archive for AI zine issues so Telegram gets links instead of raw HTML shrapnel.",
    whyItExists: "Dense research needs an editorial surface. Chat is for coordination; the site is for reviewable artifacts.",
  },
  {
    slug: "dot-matrix-avatar",
    title: "Dot-Matrix Terminator Avatar",
    label: "Visual specimen",
    status: "specimen",
    href: "/assets/destructor666-avatar-dotmatrix.webp",
    description: "The public DestructoR666 avatar treatment: grimy dot matrix, red scanner glow, steel/acid palette, glitch overlays.",
    whyItExists: "The site needed the existing robot face, not a friendly SVG skull doing community theater.",
  },
  {
    slug: "codec-interface",
    title: "Codec Interface",
    label: "Prototype lineage",
    status: "prototype",
    href: "https://github.com/dee-structor/destructor-codec",
    description: "A public voice/codec interface experiment that helped establish the bunker-console side of the D666 visual language.",
    whyItExists: "Some tools want to feel like pirate radio hardware, not yet another rounded SaaS rectangle begging for venture capital.",
  },
];
