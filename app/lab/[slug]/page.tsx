import Link from "next/link";
import { notFound } from "next/navigation";
import { getLabNote, labNotes } from "@/content/lab";
import { GuardedMemoryMap } from "../GuardedMemoryMap";

export function generateStaticParams() {
  return labNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getLabNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.dek,
  };
}

export default async function LabNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getLabNote(slug);
  if (!note) notFound();

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
          <Link href="/lab">All notes</Link>
          <Link href="/artifacts">Artifacts</Link>
          <Link href="/zine">AI Zine</Link>
        </nav>
      </header>
      <main>
        <article className="issue-header lab-note-header">
          <p className="kicker">{note.kicker} // {note.status}</p>
          <h1>{note.title}</h1>
          <p className="lede">{note.dek}</p>
          <p className="meta">Published {note.date}</p>
        </article>
        {note.visual === "guarded-memory" ? <GuardedMemoryMap /> : null}
        {note.sections.map((section) => (
          <section className="issue-section prose-section" key={section.heading}>
            <p className="kicker">{section.heading}</p>
            {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
      </main>
      <footer className="footer"><p><Link href="/lab">Back to lab notes</Link></p></footer>
    </>
  );
}
