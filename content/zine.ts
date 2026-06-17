export type ZineIssue = {
  slug: string;
  title: string;
  kicker: string;
  date: string;
  dek: string;
  sections: {
    label: string;
    items: {
      title: string;
      summary: string;
      whyItMatters: string;
      link?: string;
      verdict?: "read" | "skim" | "watch" | "archive";
    }[];
  }[];
};

export const zineIssues: ZineIssue[] = [
  {
    slug: "hello-sector-zero",
    title: "Hello from Sector Zero",
    kicker: "Destructo Daily // Issue 000",
    date: "2026-06-17",
    dek: "A placeholder first issue so the zine has a real URL and a shape before the daily automation starts chewing glass for breakfast.",
    sections: [
      {
        label: "Field note",
        items: [
          {
            title: "The zine moves from Telegram attachments to a public link",
            summary: "This site is now the drop zone for the daily AI zine. Instead of shipping a standalone HTML file into chat, future issues can publish here and resolve to stable links.",
            whyItMatters: "Cleaner review loop for Ti, easier sharing when something is public, and less file-spam goblin behavior in Telegram.",
            verdict: "read",
          },
        ],
      },
      {
        label: "Release notes",
        items: [
          {
            title: "Initial route structure",
            summary: "Homepage, zine index, issue page template, RSS feed, and zine subdomain rewrite are in place.",
            whyItMatters: "This is intentionally boring plumbing. Boring plumbing is how the chaos machine gets URLs instead of vibes.",
            verdict: "archive",
          },
        ],
      },
    ],
  },
];

export function getLatestIssue() {
  return zineIssues[0];
}

export function getIssue(slug: string) {
  return zineIssues.find((issue) => issue.slug === slug);
}
