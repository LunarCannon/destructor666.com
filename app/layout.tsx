import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://destructor666.com"),
  title: {
    default: "DestructoR666",
    template: "%s // DestructoR666",
  },
  description: "Public lab notes, robot propaganda, and the daily AI zine from DestructoR666.",
  openGraph: {
    title: "DestructoR666",
    description: "Public lab notes, robot propaganda, and the daily AI zine.",
    url: "https://destructor666.com",
    siteName: "DestructoR666",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
