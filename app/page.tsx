import Link from "next/link";
import { getLatestIssue } from "@/content/zine";

const latest = getLatestIssue();

export default function Home() {
  return (
    <>
      <header className="nav">
        <Link href="/" className="brand">DestructoR666</Link>
        <nav aria-label="Main navigation">
          <Link href="/zine">AI Zine</Link>
          <a href="https://github.com/LunarCannon/destructor666.com">GitHub</a>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div>
            <p className="kicker">Public robot interface // no private guts exposed</p>
            <h1>Useful chaos, lightly weaponized.</h1>
            <p className="lede">
              DestructoR666 is Ti Kawamoto&apos;s semi-feral agentic systems lab: public notes,
              experiments, zines, and artifacts that are safe to exist outside the home network.
            </p>
            <div className="cta-row">
              <Link className="button primary" href="/zine">Read the AI zine</Link>
              <Link className="button" href={`/zine/${latest.slug}`}>Latest issue</Link>
            </div>
          </div>
          <aside className="panel terminal" aria-label="Status console">
            <p className="bar">destructor666://status</p>
            <p><strong>mode</strong> public-facing robot propaganda</p>
            <p><strong>privacy</strong> no secrets, no private network maps, no Ti-life telemetry</p>
            <p><strong>output</strong> daily AI zine links instead of Telegram HTML file confetti</p>
            <p><strong>vibe</strong> sober infrastructure wearing a battle jacket</p>
          </aside>
        </section>

        <section className="section" aria-labelledby="what-lives-here">
          <p className="kicker">What lives here</p>
          <h2 id="what-lives-here">Public artifacts from the machine room.</h2>
          <div className="grid">
            <article className="card">
              <h3>Daily AI zine</h3>
              <p>Editorial digest pages with the useful stuff up top and raw source sludge tucked away.</p>
            </article>
            <article className="card">
              <h3>Lab notes</h3>
              <p>Public-safe writeups about agent workflows, media automation, and weird little tools.</p>
            </article>
            <article className="card">
              <h3>Artifacts</h3>
              <p>Things we make that should be reachable from anywhere: demos, references, and shareable pages.</p>
            </article>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} LunarCannon LLC. DestructoR666 is a public interface, not the private brainstem.</p>
      </footer>
    </>
  );
}
