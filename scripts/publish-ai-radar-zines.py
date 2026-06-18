#!/usr/bin/env python3
"""Publish generated AI Radar zines into destructor666.com.

This keeps Telegram lightweight: the daily cron can generate the local HTML, this
script copies every available issue into /public/zines/<slug>/, regenerates the
typed zine index data, and returns the latest public URL.
"""
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import shutil
from pathlib import Path
from typing import Any

REPO = Path(__file__).resolve().parents[1]
AI_OUT = Path.home() / ".hermes" / "ai-radar" / "out"
SITE = "https://destructor666.com"


def js(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False)


def ts_string(value: str) -> str:
    return js(value or "")


def strip(value: str, limit: int = 220) -> str:
    value = re.sub(r"\s+", " ", value or "").strip()
    if len(value) > limit:
        return value[: limit - 1].rstrip() + "…"
    return value


def date_from_name(path: Path) -> str | None:
    m = re.match(r"ai-radar-zine-(\d{4}-\d{2}-\d{2})\.json$", path.name)
    return m.group(1) if m else None


def load_issues() -> list[dict[str, Any]]:
    issues: list[dict[str, Any]] = []
    for json_path in sorted(AI_OUT.glob("ai-radar-zine-*.json"), reverse=True):
        date = date_from_name(json_path)
        if not date:
            continue
        html_path = json_path.with_suffix(".html")
        if not html_path.exists():
            continue
        payload = json.loads(json_path.read_text(encoding="utf-8"))
        items = payload.get("items", [])
        articles = [i for i in items if i.get("kind") not in {"release", "commit"} and i.get("source") != "GitHub"]
        updates = [i for i in items if i not in articles]
        top = articles[:3]
        slug = f"ai-radar-{date}"
        title = f"DestructoR666 AI Digest · {date}"
        dek = (
            f"Signal Rag distilled {len(items)} AI/agent leads into "
            f"{len(articles)} articles/research/opinions, {len(updates)} releases/updates, "
            "radar stats, and collector logs."
        )
        issues.append(
            {
                "date": date,
                "slug": slug,
                "title": title,
                "kicker": f"AI Radar // {date}",
                "dek": dek,
                "href": f"/zines/{slug}/",
                "html_path": html_path,
                "items": items,
                "articles": articles,
                "updates": updates,
                "top": top,
            }
        )
    return issues


def publish_html(issue: dict[str, Any]) -> None:
    slug = issue["slug"]
    dest_dir = REPO / "public" / "zines" / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / "index.html"
    text = Path(issue["html_path"]).read_text(encoding="utf-8")
    canonical = f'{SITE}/zines/{slug}/'
    text = re.sub(r'<link rel="canonical" href="[^"]+">\n?', "", text)
    title_match = re.search(r"<title>.*?</title>", text, re.S)
    canonical_tag = f'<link rel="canonical" href="{html.escape(canonical)}">'
    if title_match:
        text = text[: title_match.end()] + "\n" + canonical_tag + text[title_match.end():]
    else:
        text = canonical_tag + "\n" + text
    dest.write_text(text, encoding="utf-8")


def issue_to_ts(issue: dict[str, Any]) -> str:
    top = issue["top"]
    items_ts = []
    for idx, item in enumerate(top):
        verdict = "read" if idx == 0 else "skim"
        items_ts.append(
            "          {\n"
            f"            title: {ts_string(item.get('title', 'Untitled'))},\n"
            f"            summary: {ts_string(strip(item.get('plain') or item.get('summary') or 'No summary from source.', 260))},\n"
            f"            whyItMatters: {ts_string(strip(item.get('why') or 'Potentially useful signal for agent workflows, model ops, or private/local tooling.', 260))},\n"
            f"            link: {ts_string(item.get('url', ''))},\n"
            f"            verdict: {ts_string(verdict)},\n"
            "          }"
        )
    if not items_ts:
        items_ts.append(
            "          {\n"
            "            title: \"Open the full hosted zine\",\n"
            "            summary: \"The complete AI Radar issue is published as a stable page.\",\n"
            "            whyItMatters: \"This keeps the daily digest out of Telegram file-attachment purgatory.\",\n"
            f"            link: {ts_string(issue['href'])},\n"
            "            verdict: \"read\",\n"
            "          }"
        )
    items_joined = ",\n".join(items_ts)
    return f"""  {{
    slug: {ts_string(issue['slug'])},
    title: {ts_string(issue['title'])},
    kicker: {ts_string(issue['kicker'])},
    date: {ts_string(issue['date'])},
    dek: {ts_string(issue['dek'])},
    href: {ts_string(issue['href'])},
    sections: [
      {{
        label: "Editor picks",
        items: [
{items_joined},
        ],
      }},
      {{
        label: "Full issue",
        items: [
          {{
            title: "Open the full hosted zine",
            summary: "The complete self-contained AI Radar HTML issue is published as a stable page on destructor666.com.",
            whyItMatters: "Daily digests should resolve to URLs, not raw HTML files in Telegram.",
            link: {ts_string(issue['href'])},
            verdict: "read",
          }},
        ],
      }},
    ],
  }}"""


def write_generated(issues: list[dict[str, Any]]) -> None:
    body = ",\n".join(issue_to_ts(issue) for issue in issues)
    content = (
        "import type { ZineIssue } from \"./zine\";\n\n"
        "// Generated by scripts/publish-ai-radar-zines.py. Do not edit by hand.\n"
        "export const generatedZineIssues: ZineIssue[] = [\n"
        f"{body}\n"
        "];\n"
    )
    (REPO / "content" / "generatedZines.ts").write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--latest-only", action="store_true", help="Publish available issues but print only the latest URL")
    args = parser.parse_args()

    issues = load_issues()
    if not issues:
        raise SystemExit(f"No AI Radar zine JSON/HTML pairs found in {AI_OUT}")
    for issue in issues:
        publish_html(issue)
    write_generated(issues)
    latest = issues[0]
    print(json.dumps({
        "published_count": len(issues),
        "latest_slug": latest["slug"],
        "latest_url": f"{SITE}{latest['href']}",
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
