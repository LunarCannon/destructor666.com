import Link from "next/link";
import { zineIssues } from "@/content/zine";

export const metadata = {
  title: "Daily AI Zine",
  description: "DestructoR666's daily AI zine archive.",
};

export default function ZineIndex() {
  return (
    <>
      <header className="nav">
        <Link href="/" className="brand">DestructoR666</Link>
        <nav aria-label="Main navigation">
          <Link href="/zine">AI Zine</Link>
          <a href="/feed.xml">Feed</a>
        </nav>
      </header>
      <main>
        <section className="issue-header">
          <p className="kicker">Daily AI zine</p>
          <h1>Signal over sludge.</h1>
          <p className="lede">
            A public archive for the AI zine: fewer Telegram attachments, more stable links.
            Issues will get sharper once the daily publishing robot starts doing laps.
          </p>
        </section>
        <section className="zine-list" aria-label="Zine issues">
          {zineIssues.map((issue) => (
            <Link className="panel issue-card" key={issue.slug} href={`/zine/${issue.slug}`}>
              <p className="kicker">{issue.kicker}</p>
              <h2>{issue.title}</h2>
              <p className="meta">{issue.date} · {issue.dek}</p>
            </Link>
          ))}
        </section>
      </main>
      <footer className="footer"><p><Link href="/">Back to destructor666.com</Link></p></footer>
    </>
  );
}
