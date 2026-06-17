import Link from "next/link";
import { artifacts } from "@/content/artifacts";

export const metadata = {
  title: "Artifacts",
  description: "Public DestructoR666 artifacts: zines, visual specimens, prototypes, and shareable robot shrapnel.",
};

export default function ArtifactsPage() {
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
          <p className="kicker">Artifacts</p>
          <h1>Shareable robot shrapnel.</h1>
          <p className="lede">
            Public-safe outputs from the machine room: zines, visual treatments, prototypes, and tools that are useful or funny enough to deserve a URL.
          </p>
        </section>
        <section className="artifact-grid" aria-label="Artifact gallery">
          {artifacts.map((artifact, index) => (
            <a className="card threat-card artifact-card" key={artifact.slug} href={artifact.href}>
              <span className="card-code">{String(index + 1).padStart(2, "0")} // {artifact.status}</span>
              <p className="kicker">{artifact.label}</p>
              <h2>{artifact.title}</h2>
              <p>{artifact.description}</p>
              <p><strong>Why it exists:</strong> {artifact.whyItExists}</p>
            </a>
          ))}
        </section>
      </main>
      <footer className="footer"><p><Link href="/">Back to destructor666.com</Link></p></footer>
    </>
  );
}
