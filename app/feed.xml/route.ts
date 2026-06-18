import { getIssueHref, zineIssues } from "@/content/zine";

export function GET() {
  const site = "https://destructor666.com";
  const items = zineIssues.map((issue) => {
    const url = new URL(getIssueHref(issue), site).toString();
    return `
    <item>
      <title><![CDATA[${issue.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(issue.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description><![CDATA[${issue.dek}]]></description>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>DestructoR666 Daily AI Zine</title>
      <link>${site}/zine</link>
      <description>Daily AI zine archive from DestructoR666.</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
