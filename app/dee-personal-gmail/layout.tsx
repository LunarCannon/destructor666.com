import type { Metadata } from "next";
import Link from "next/link";
import styles from "./pages.module.css";

export const metadata: Metadata = {
  title: "Dee Personal Gmail",
  description: "App information, support, and privacy disclosures for the private Dee Personal Gmail integration.",
  openGraph: {
    title: "Dee Personal Gmail",
    description: "A private, owner-directed Gmail integration. App information, support, and privacy disclosures.",
    url: "https://destructor666.com/dee-personal-gmail",
    type: "website",
  },
};

export default function GmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#gmail-content">Skip to content</a>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">DestructoR666</Link>
        <nav aria-label="Gmail integration documentation">
          <Link href="/dee-personal-gmail">App &amp; support</Link>
          <Link href="/dee-personal-gmail/privacy">Privacy</Link>
        </nav>
      </header>
      <main className={styles.content} id="gmail-content">{children}</main>
      <footer className={styles.footer}>
        <p>Dee Personal Gmail · Private integration · Maintained by LunarCannon LLC</p>
        <p><a href="mailto:dee.structor@lunarcannon.com">Contact support</a> · <Link href="/dee-personal-gmail/privacy">Privacy policy</Link></p>
      </footer>
    </div>
  );
}
