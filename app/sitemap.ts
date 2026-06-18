import type { MetadataRoute } from "next";
import { getIssueHref, zineIssues } from "@/content/zine";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://destructor666.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/zine`, lastModified: new Date() },
    ...zineIssues.map((issue) => ({
      url: new URL(getIssueHref(issue), base).toString(),
      lastModified: new Date(issue.date),
    })),
  ];
}
