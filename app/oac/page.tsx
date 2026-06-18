import Link from "next/link";
import { OacArchitectureMap } from "./OacArchitectureMap";

export const metadata = {
  title: "OAC Architecture Map",
  description: "A public-safe interactive visual map of the Omnichannel Agent Continuity layer.",
};

const principles = [
  {
    label: "Continuity without sludge",
    text: "Compact event summaries carry the thread. Raw transcripts stay out of the default path.",
  },
  {
    label: "Privacy by surface",
    text: "A Signal DM, Telegram group, CLI session, and cron job do not get the same disclosure budget.",
  },
  {
    label: "Boring failure mode",
    text: "If the layer times out, errors, or is disabled, the agent keeps responding with no OAC context.",
  },
];

const pipeline = [
  ["01", "Record", "Write compact turn summaries into a local append-only ledger and rolling state."],
  ["02", "Resolve", "Map explicit sender aliases and likely topics without guessing strangers in group chats."],
  ["03", "Filter", "Apply surface policy and sensitivity tiers before anything crosses rooms."],
  ["04", "Brief", "Inject a bounded Markdown continuity brief into only the current user message."],
];

export default function OacArchitecturePage() {
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
          <Link href="/oac">OAC Map</Link>
        </nav>
      </header>

      <main>
        <section className="issue-header oac-hero">
          <p className="kicker alert">OAC visual map // public-safe topology</p>
          <h1>Omnichannel Agent Continuity.</h1>
          <p className="lede">
            One agent, many rooms, less amnesia. OAC is the small local layer that remembers
            the live thread across surfaces without spraying private context everywhere like
            a confetti cannon full of bad decisions.
          </p>
          <div className="cta-row">
            <a className="button primary" href="#map">Open the map</a>
            <a className="button danger" href="#rules">Read the rules</a>
          </div>
        </section>

        <section className="oac-principles" aria-label="OAC principles">
          {principles.map((item) => (
            <article className="card" key={item.label}>
              <span className="card-code">//</span>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <div id="map">
          <OacArchitectureMap />
        </div>

        <section className="section" id="rules" aria-labelledby="oac-rules-title">
          <p className="kicker">Operating rules</p>
          <h2 id="oac-rules-title">The map is useful because the rules are boring.</h2>
          <div className="oac-rule-grid">
            <article className="terminal-card">
              <p className="bar">oac://hot-path</p>
              <p><strong>record</strong> compact summaries only</p>
              <p><strong>state</strong> current focus, questions, decisions, promises</p>
              <p><strong>brief</strong> surface-filtered, max-char bounded markdown</p>
              <p><strong>inject</strong> current user turn, not system prompt cache</p>
            </article>
            <div className="oac-pipeline">
              {pipeline.map(([step, title, body]) => (
                <article key={step}>
                  <span>{step}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section oac-boundary" aria-labelledby="oac-boundary-title">
          <p className="kicker alert">Public mask boundary</p>
          <h2 id="oac-boundary-title">What this page intentionally does not show.</h2>
          <p>
            No secrets, no private chat IDs, no exact host paths, no live hook wiring, no provider keys,
            and no operational rituals that turn a helpful diagram into a treasure map for goblins.
            This is the architecture pattern, not the private brainstem.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p><Link href="/">Back to destructor666.com</Link> · OAC map is public-safe by design.</p>
      </footer>
    </>
  );
}
