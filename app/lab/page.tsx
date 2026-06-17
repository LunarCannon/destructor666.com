import Link from "next/link";
import { labNotes } from "@/content/lab";

export const metadata = {
  title: "Lab Notes",
  description: "Public-safe DestructoR666 field notes about agent workflows, zines, artifacts, and useful chaos.",
};

export default function LabIndex() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <header className="nav">
        <Link href="/" className="brand">
          <span className="brand-mark">D666</span>
          <span className="brand-word">DestructoR666</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/zine">AI Zine</Link>
          <Link href="/lab">Lab Notes</Link>
          <Link href="/artifacts">Artifacts</Link>
        </nav>
      </header>
      <main>
        <section className="issue-header wide-header">
          <p className="kicker">Lab notes</p>
          <h1>Field reports from the robot bunker.</h1>
          <p className="lede">
            Public-safe notes on agent workflows, zine logic, design taste, and experiments that can be discussed without exposing the private brainstem.
          </p>
        </section>
        <section className="zine-list" aria-label="Lab notes">
          {labNotes.map((note) => (
            <Link className="panel issue-card lab-card" key={note.slug} href={`/lab/${note.slug}`}>
              <p className="kicker">{note.kicker} // {note.status}</p>
              <h2>{note.title}</h2>
              <p className="meta">{note.date} · {note.dek}</p>
            </Link>
          ))}
        </section>
      </main>
      <footer className="footer"><p><Link href="/">Back to destructor666.com</Link></p></footer>
    </>
  );
}
