import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cursive = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
});

import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://memora.app"),
  title: {
    default: "Memora | Proof That We Lived",
    template: "%s | Memora",
  },
  description: "Memora - The Eternal Batch. Preserve your most precious moments and relive emotions forever. A digital vault for your memories.",
  keywords: ["memories", "digital vault", "journal", "preserve moments", "photo storage"],
  openGraph: {
    title: "Memora | Proof That We Lived",
    description: "Preserve your most precious moments and relive emotions forever. A digital vault for your memories.",
    url: "https://memora.app",
    siteName: "Memora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memora | Proof That We Lived",
    description: "Preserve your most precious moments and relive emotions forever.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://memora.app/#organization",
        "name": "Memora",
        "url": "https://memora.app",
        "logo": "https://memora.app/icon.png"
      },
      {
        "@type": "WebSite",
        "@id": "https://memora.app/#website",
        "url": "https://memora.app",
        "name": "Memora",
        "publisher": {
          "@id": "https://memora.app/#organization"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${cursive.variable} h-full antialiased dark`}
    >
      <head>
        <meta name="google-site-verification" content="sTQMpU0ds5d7tYV8NpikrwXlkP-8jtlEhUsbTgbFa-s" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8131387574460691"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-pure-black text-white selection:bg-white/20 selection:text-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
