import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssue, zineIssues } from "@/content/zine";

export function generateStaticParams() {
  return zineIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return {};
  return {
    title: issue.title,
    description: issue.dek,
  };
}

export default async function ZineIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  return (
    <>
      <header className="nav">
        <Link href="/" className="brand">DestructoR666</Link>
        <nav aria-label="Main navigation">
          <Link href="/zine">All issues</Link>
          <a href="/feed.xml">Feed</a>
        </nav>
      </header>
      <main>
        <section className="issue-header">
          <p className="kicker">{issue.kicker}</p>
          <h1>{issue.title}</h1>
          <p className="lede">{issue.dek}</p>
          <p className="meta">Published {issue.date}</p>
        </section>

        {issue.sections.map((section) => (
          <section className="issue-section" key={section.label} aria-labelledby={section.label.replaceAll(" ", "-").toLowerCase()}>
            <p className="kicker">{section.label}</p>
            {section.items.map((item) => (
              <article className="item" key={item.title}>
                {item.verdict ? <p className="verdict">{item.verdict}</p> : null}
                <h3>{item.link ? <a href={item.link}>{item.title}</a> : item.title}</h3>
                <p><strong>Plain English:</strong> {item.summary}</p>
                <p><strong>Why Ti might care:</strong> {item.whyItMatters}</p>
              </article>
            ))}
          </section>
        ))}
      </main>
      <footer className="footer"><p><Link href="/zine">Back to the archive</Link></p></footer>
    </>
  );
}
