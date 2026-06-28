import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Instrument_Serif, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-playfair", // Keeping the variable name playfair to avoid breaking existing styles if any, but using Instrument Serif
  weight: "400",
  subsets: ["latin"],
});

const cursive = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
});



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
        className={`${inter.variable} ${instrument.variable} ${cursive.variable} h-full antialiased dark`}
      >
      <head>
        <meta name="google-site-verification" content="sTQMpU0ds5d7tYV8NpikrwXlkP-8jtlEhUsbTgbFa-s" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8131387574460691"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-[#FFFFFF] selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
