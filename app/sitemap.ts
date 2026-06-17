import type { MetadataRoute } from "next";
import { zineIssues } from "@/content/zine";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://destructor666.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/zine`, lastModified: new Date() },
    ...zineIssues.map((issue) => ({
      url: `${base}/zine/${issue.slug}`,
      lastModified: new Date(issue.date),
    })),
  ];
}
