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

export const metadata: Metadata = {
  title: "Memora | Proof That We Lived",
  description: "Memora - The Eternal Batch. Preserve moments. Relive emotions. Forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cursive.variable} h-full antialiased dark`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8131387574460691"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col bg-pure-black text-white">
        {children}
      </body>
    </html>
  );
}
