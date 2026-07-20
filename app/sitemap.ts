import type { MetadataRoute } from "next";
import { getIssueHref, zineIssues } from "@/content/zine";
import { labNotes } from "@/content/lab";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://destructor666.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/zine`, lastModified: new Date() },
    { url: `${base}/lab`, lastModified: new Date() },
    { url: `${base}/artifacts`, lastModified: new Date() },
    { url: `${base}/oac`, lastModified: new Date() },
    ...labNotes.map((note) => ({
      url: `${base}/lab/${note.slug}`,
      lastModified: new Date(note.date),
    })),
    ...zineIssues.map((issue) => ({
      url: new URL(getIssueHref(issue), base).toString(),
      lastModified: new Date(issue.date),
    })),
  ];
}
