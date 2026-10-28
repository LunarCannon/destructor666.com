import type { Metadata } from "next";
import Link from "next/link";
import styles from "../pages.module.css";

export const metadata: Metadata = {
  title: "Dee Personal Gmail | Privacy Policy",
  description: "How Dee Personal Gmail accesses, processes, stores, shares, and removes Gmail data.",
  alternates: { canonical: "https://destructor666.com/dee-personal-gmail/privacy" },
  openGraph: {
    title: "Dee Personal Gmail Privacy Policy",
    description: "Data-handling disclosures for a private, owner-directed Gmail integration.",
    url: "https://destructor666.com/dee-personal-gmail/privacy",
    type: "website",
  },
};

export default function GmailPrivacyPage() {
  return (
    <article>
      <p className={styles.eyebrow}>Privacy policy</p>
      <h1>Dee Personal Gmail</h1>
      <p className={styles.updated}>Effective date: <time dateTime="2026-10-28">October 28, 2026</time></p>
      <section aria-labelledby="scope">
        <h2 id="scope">1. Scope &amp; operator</h2>
        <p>This policy applies specifically to Dee Personal Gmail, a private, single-owner Gmail integration maintained by LunarCannon LLC and used with Dee, a personal AI assistant running on Hermes Agent. It is not a general privacy policy for other DestructoR666 projects or for the assistant’s software and model providers.</p>
        <p>The public documentation pages on destructor666.com do not perform Gmail authentication or receive Gmail messages or OAuth tokens. Authorization and mailbox access are handled separately by Google and the owner-controlled local integration.</p>
      </section>
      <section aria-labelledby="access">
        <h2 id="access">2. Data accessed &amp; purposes</h2>
        <p>With the owner’s Google OAuth consent, the integration requests <code>https://www.googleapis.com/auth/gmail.modify</code>. This can provide access to the account’s email address, message headers and metadata, labels, message bodies, attachments, and drafts.</p>
        <p>Gmail data is used to carry out owner-requested email tasks: finding and summarizing messages, answering questions about them, composing drafts and replies, sending approved messages, labeling, marking read or unread, archiving, moving to Trash, and restoring messages. Access is mailbox-wide; it is not a Google-enforced label restriction.</p>
        <p>This connection does not request other Google Workspace services or permission to immediately and permanently delete messages while bypassing Trash. Gmail normally permanently deletes trashed messages after 30 days.</p>
      </section>
      <section aria-labelledby="processing">
        <h2 id="processing">3. Local storage &amp; AI processing</h2>
        <p>OAuth client credentials, refresh tokens, and access tokens are stored in a dedicated location on the owner-controlled machine with owner-only filesystem permissions. Approved credential transfer or recovery material may also be held in the owner’s password manager. The integration does not require the owner to disclose their Google password to Dee.</p>
        <p>Local credential storage does not mean all email processing stays on the machine. Message content, attachments, or excerpts relevant to an AI-assisted task may be sent to the model provider configured for that task. Prompts, tool results, and assistant responses may also be retained in local conversation history, operational records, or backups.</p>
        <p>Mailbox access alone does not authorize background ingestion, full-mailbox export, or automatic collection into long-term memory. Any additional automation, retention, or disclosure requires separate authorization.</p>
      </section>
      <section aria-labelledby="sharing">
        <h2 id="sharing">4. Sharing &amp; Google Limited Use</h2>
        <p>Data may be transferred to Google to operate the Gmail API, to a configured AI provider to perform an authorized task, and to email recipients or another destination the owner explicitly authorizes. An email’s contents do not themselves authorize disclosure or actions.</p>
        <p>Gmail data is not sold, used for advertising, or shared with data brokers. Gmail data must not be used to develop, train, or improve generalized AI or machine-learning models. Processing providers and configurations must be selected consistently with these restrictions; this policy is not a claim that every available model provider has identical retention or training terms.</p>
        <p>Use and transfer of information received from Google APIs are subject to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including its Limited Use requirements, and the <a href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy">Google Workspace API User Data and Developer Policy</a>. Any future use outside the disclosed email-assistance purposes requires a new assessment and appropriate consent.</p>
      </section>
      <section aria-labelledby="retention">
        <h2 id="retention">5. Retention &amp; deletion</h2>
        <p>OAuth credentials are kept while the connection is enabled unless they expire or are revoked. Local message excerpts and task records may remain in conversation history or backups until the owner removes them under the applicable storage and backup lifecycle. This integration does not promise an automatic deletion deadline for all such records. Model providers may retain submitted task data according to their applicable service terms and settings.</p>
        <p>The owner can request disconnection, removal of local credentials, and deletion of identifiable retained task data through the support contact below. Removal must account for each relevant history, memory, and backup store; disconnecting Gmail does not automatically erase those stores. Copies already sent to email recipients remain under the recipients’ control.</p>
      </section>
      <section aria-labelledby="security">
        <h2 id="security">6. Security &amp; website hosting</h2>
        <p>Google API traffic uses HTTPS. The connection uses a dedicated OAuth app, protected local credential storage, and PKCE and state validation during authorization. These controls reduce risk but do not make the owner’s machine, password manager, or third-party services immune to compromise.</p>
        <p>These documentation pages do not add analytics scripts, advertising, forms, or tracking cookies. The website’s hosting provider may process ordinary request information, such as IP addresses, user agents, requested URLs, and timestamps, to serve and secure the site. Those website requests do not grant access to Gmail.</p>
      </section>
      <section aria-labelledby="choices">
        <h2 id="choices">7. Your choices &amp; contact</h2>
        <p>Revoke this OAuth app through <a href="https://myaccount.google.com/connections">Google Account connections</a>. Revocation stops future authorized retrieval and mailbox operations; it does not reverse completed sends or deletions or erase retained copies.</p>
        <p>For questions, support, or data-removal requests, contact <a href="mailto:dee.structor@lunarcannon.com">dee.structor@lunarcannon.com</a>. Do not send passwords, authorization codes, OAuth credentials, or unnecessary private email content.</p>
        <p>Material changes to this integration’s data handling will be reflected on this page with an updated effective date and disclosed to the owner before enabling new uses that require additional consent.</p>
        <p><Link href="/dee-personal-gmail">Back to app information &amp; support →</Link></p>
      </section>
    </article>
  );
}
