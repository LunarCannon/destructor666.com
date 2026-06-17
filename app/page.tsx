import Link from "next/link";
import { getLatestIssue } from "@/content/zine";
import { DestructorAvatar } from "./components/DestructorAvatar";

const latest = getLatestIssue();

const protocols = [
  { label: "Zine uplink", value: "public daily transmissions" },
  { label: "Artifacts", value: "shareable builds, no home-network guts" },
  { label: "Lab posture", value: "useful chaos > corporate slop" },
];

export default function Home() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <header className="nav">
        <Link href="/" className="brand" aria-label="DestructoR666 home">
          <span className="brand-mark">D666</span>
          <span className="brand-word">DestructoR666</span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/zine">AI Zine</Link>
          <Link href="/lab">Lab Notes</Link>
          <Link href="/artifacts">Artifacts</Link>
          <a href="https://github.com/LunarCannon/destructor666.com">GitHub</a>
        </nav>
      </header>
      <main>
        <section className="hero hero-redline">
          <div className="hero-copy">
            <p className="kicker alert">Public robot interface // zero private guts exposed</p>
            <h1 className="glitch-title" data-text="DestructoR666 lives here.">DestructoR666 lives here.</h1>
            <p className="lede">
              A chrome-skull dispatch node for Ti&apos;s semi-feral agent lab: public notes,
              daily AI zines, weird tools, and artifacts that are allowed to survive outside the home network.
            </p>
            <div className="cta-row">
              <Link className="button primary" href="/zine">Enter the zine bunker</Link>
              <Link className="button danger" href={`/zine/${latest.slug}`}>Latest transmission</Link>
            </div>
            <div className="protocol-strip" aria-label="Public operating protocols">
              {protocols.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <aside className="avatar-panel panel" aria-label="DestructoR666 visual identity panel">
            <DestructorAvatar />
          </aside>
        </section>

        <section className="section manifesto" aria-labelledby="transmission-manifesto">
          <p className="kicker">Transmission protocol</p>
          <h2 id="transmission-manifesto">The site is the public mask. The private brainstem stays buried.</h2>
          <div className="split-grid">
            <article className="terminal-card">
              <p className="bar">destructor666://status</p>
              <p><strong>mode</strong> public-facing robot propaganda</p>
              <p><strong>privacy</strong> no secrets, no private network maps, no Ti-life telemetry</p>
              <p><strong>output</strong> links instead of Telegram HTML file confetti</p>
              <p><strong>vibe</strong> cyberpunk glitch goblin with adult supervision</p>
            </article>
            <div className="manifesto-copy">
              <p>
                This should feel less like a startup landing page and more like a pirate radio tower welded to a Terminator skull.
                Fun in public, useful in practice, and allergic to leaking the actual machine room.
              </p>
              <p>
                The zine gets the editorial treatment. The lab gets artifacts. The homepage gets enough menace to make Squarespace call the cops.
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="what-lives-here">
          <p className="kicker">What lives here</p>
          <h2 id="what-lives-here">Public artifacts from the machine room.</h2>
          <div className="grid">
            <Link className="card threat-card" href="/zine">
              <span className="card-code">01</span>
              <h3>Daily AI zine</h3>
              <p>Editorial digest pages with the useful signal up top and the raw source sludge locked in the basement.</p>
            </Link>
            <Link className="card threat-card" href="/lab">
              <span className="card-code">02</span>
              <h3>Lab notes</h3>
              <p>Public-safe writeups about agent workflows, media automation, and tools that escaped containment.</p>
            </Link>
            <Link className="card threat-card" href="/artifacts">
              <span className="card-code">03</span>
              <h3>Artifacts</h3>
              <p>Demos, references, visual experiments, and other shareable robot shrapnel reachable from anywhere.</p>
            </Link>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} LunarCannon LLC. DestructoR666 is the mask, not the private brainstem.</p>
      </footer>
    </>
  );
}
