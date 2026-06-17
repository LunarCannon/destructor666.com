export type LabNote = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  dek: string;
  status: "field note" | "doctrine" | "build log";
  sections: { heading: string; body: string[] }[];
};

export const labNotes: LabNote[] = [
  {
    slug: "public-mask-private-brainstem",
    title: "Public Mask, Private Brainstem",
    kicker: "Lab note 001",
    date: "2026-06-17",
    status: "doctrine",
    dek: "A general rule for publishing agent work: show the outputs, the taste, and the lessons. Keep the actual nervous system offstage.",
    sections: [
      {
        heading: "The shape",
        body: [
          "A useful agent eventually makes things that deserve URLs: digests, demos, reference pages, design boards, little tools, and experiments that should be reachable outside the room where they were born.",
          "That does not mean the whole machine room becomes content. The public surface is a mask: expressive, useful, and intentionally incomplete.",
        ],
      },
      {
        heading: "The rule",
        body: [
          "Publish artifacts, not access paths. Publish lessons, not private topology. Publish taste, not keys, configs, telemetry, or operational rituals that would make the wrong person curious.",
          "If a detail would help a reader understand the idea, keep it. If it would help a stranger poke the private brainstem, bury it in concrete.",
        ],
      },
      {
        heading: "The vibe",
        body: [
          "The best public lab notes should feel like pirate radio from a competent systems gremlin: clear enough to be useful, weird enough to have a pulse, and disciplined enough not to leak the family jewels.",
        ],
      },
    ],
  },
  {
    slug: "why-ai-digests-suck",
    title: "Why AI Digests Suck",
    kicker: "Lab note 002",
    date: "2026-06-17",
    status: "field note",
    dek: "Most AI digests are feed-shaped paste. The zine should act like an editor with taste, context, and a machete.",
    sections: [
      {
        heading: "The common failure",
        body: [
          "A feed is not a digest. A pile of links is not editorial judgment. Most automated digests fail because they summarize everything with the same dead-eyed importance and force the reader to do the actual thinking afterward.",
          "If the machine cannot say what is worth reading, what can be skipped, and why a specific human should care, it has produced homework, not a briefing.",
        ],
      },
      {
        heading: "The zine posture",
        body: [
          "Lead with plain English. Then give the personal relevance. Then give the verdict. Raw excerpts belong behind a hatch, not sprayed across the deck like a PDF exploded.",
          "The goal is not maximum coverage. The goal is useful signal with a little blood in it.",
        ],
      },
      {
        heading: "The house rule",
        body: [
          "Releases and changelogs are useful, but they should not crowd out what people are thinking, building, arguing about, and discovering in the field. The interesting stuff goes up top. The software update conveyor belt can live downstairs.",
        ],
      },
    ],
  },
];

export function getLabNote(slug: string) {
  return labNotes.find((note) => note.slug === slug);
}
