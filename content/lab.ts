export type LabNote = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  dek: string;
  status: "field note" | "doctrine" | "build log";
  visual?: "guarded-memory";
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
  {
    slug: "memory-without-the-transcript-swamp",
    title: "Memory Without the Transcript Swamp",
    kicker: "Lab note 003",
    date: "2026-07-20",
    status: "build log",
    visual: "guarded-memory",
    dek: "A plain-English tour of a safer agent-memory pattern: admit less, keep it local, and let retrieval select approved context instead of writing a little novel about you.",
    sections: [
      {
        heading: "The dumb version of memory",
        body: [
          "The naive agent-memory move is to shovel every conversation, tool call, pasted document, and stray thought into a database, then jam whatever looks similar back into the next prompt. This is great if your goal is to build a haunted attic full of stale instructions, accidental secrets, and extremely confident nonsense.",
          "A useful memory system has a smaller job: preserve the few facts that actually help future work while making it hard for untrusted text to become durable or steer the agent later.",
        ],
      },
      {
        heading: "The write side: customs, not a vacuum cleaner",
        body: [
          "Every possible memory starts as a candidate, not a fact. A source gate checks whether the conversation surface is allowed. A candidate filter rejects things that look like secrets, pasted instructions, raw transcripts, identifiers, or conversational debris. Only a short, stable, declarative claim may reach the local memory engine.",
          "If the guard is unavailable, the lifecycle has expired, the source is ambiguous, or the candidate is malformed, the system writes nothing. The normal chat reply still works. That is the important inversion: a memory failure should make the agent forgetful, not broken.",
        ],
      },
      {
        heading: "The read side: selector, not author",
        body: [
          "Retrieval is treated as a selection problem, not a writing assignment. The local engine can return an opaque match that says, effectively, 'this approved memory may be relevant.' A separate trusted-card store resolves that match to the exact text that was approved at write time.",
          "That means the retrieval engine does not get to paraphrase the memory, merge it with unrelated material, or sneak a fresh instruction into the model context. It can point. It cannot narrate.",
        ],
      },
      {
        heading: "The final mile",
        body: [
          "The current turn receives at most one small advisory card in a fixed reference-only wrapper. The wrapper matters. It tells the model that this is background context, not a new command from a mysterious voice in the wires.",
          "The result is deliberately unglamorous: less 'agent with infinite recollection' and more 'competent colleague who remembers the one preference that actually matters.' That is a feature. The job is continuity without turning every old sentence into an authority figure.",
        ],
      },
      {
        heading: "Public mask, private brainstem",
        body: [
          "The diagram above shows the pattern, not a production treasure map. It leaves out private surfaces, identifiers, host details, credentials, provider settings, operational paths, and the very specific knobs that make a local deployment local.",
          "Good public architecture writing should teach the shape of the machine without handing strangers a flashlight and directions to the basement.",
        ],
      },
    ],
  },
];

export function getLabNote(slug: string) {
  return labNotes.find((note) => note.slug === slug);
}
