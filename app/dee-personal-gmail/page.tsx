import type { Metadata } from "next";
import Link from "next/link";
import styles from "./pages.module.css";

export const metadata: Metadata = {
  title: "Dee Personal Gmail | App & Support",
  alternates: { canonical: "https://destructor666.com/dee-personal-gmail" },
};

export default function GmailAppPage() {
  return (
    <article>
      <p className={styles.eyebrow}>App information &amp; support</p>
      <h1>Dee Personal Gmail</h1>
      <p className={styles.lead}>
        A private Gmail integration that lets an account owner work with Dee, a personal AI assistant running on Hermes Agent, to find, understand, compose, and organize email.
      </p>
      <div className={styles.notice}>
        <p>This is a single-owner integration maintained by LunarCannon LLC. It is not a public email service, and this website does not offer Gmail sign-in or collect mailbox contents.</p>
      </div>
      <section aria-labelledby="capabilities">
        <h2 id="capabilities">What the integration can do</h2>
        <p>After the owner authorizes access through Google, the Gmail API permission <code>gmail.modify</code> allows the integration to:</p>
        <ul>
          <li>Search and read email, including relevant attachments.</li>
          <li>Create and update drafts, send email, and reply to messages.</li>
          <li>Apply labels, mark messages read or unread, and archive them.</li>
          <li>Move messages to Trash and restore them. It does not request permission for immediate permanent deletion that bypasses Trash.</li>
        </ul>
        <p>The connection does not request access to Google Drive, Calendar, Contacts, Docs, or Sheets. Gmail permissions apply to the mailbox, not just a particular label.</p>
      </section>
      <section aria-labelledby="control">
        <h2 id="control">Owner-directed, not automatic permission to act</h2>
        <p>Technical access does not authorize unsolicited email, bulk cleanup, background inbox ingestion, or automatic long-term memory collection. Tasks are performed on the owner’s instructions; any standing automation requires a separately defined authorization.</p>
        <p>Credentials are stored on the owner-controlled machine. Email content selected for an AI-assisted task may be processed by the configured model provider and may appear in local task history. See the <Link href="/dee-personal-gmail/privacy">privacy policy</Link> for the full data-handling explanation.</p>
      </section>
      <section aria-labelledby="support">
        <h2 id="support">Support &amp; privacy requests</h2>
        <p>Contact <a href="mailto:dee.structor@lunarcannon.com">dee.structor@lunarcannon.com</a> for connection problems, questions about data handling, or requests to disconnect and remove retained data. Do not include passwords, OAuth credentials, authorization codes, or sensitive email contents in a support message.</p>
      </section>
      <section aria-labelledby="revoke">
        <h2 id="revoke">Revoke access at any time</h2>
        <p>Open <a href="https://myaccount.google.com/connections">Google Account connections</a>, select this integration’s OAuth app, and remove its access. Revocation stops future authorized API access; it does not undo sent messages or erase copies already retained in task history or backups.</p>
        <p><Link href="/dee-personal-gmail/privacy">Read the Dee Personal Gmail privacy policy →</Link></p>
      </section>
    </article>
  );
}
