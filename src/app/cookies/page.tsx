import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Cookie Policy",
  description: "Information about how Memora uses cookies.",
};

export default function CookiesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - Memora"
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Cookie Policy</h1>
            <p className="text-xl text-zinc-400">Last updated: June 2026</p>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 prose-headings:text-white">
            <p>At Memora, we respect your privacy and aim to be transparent about the technologies we use. This policy explains how we use cookies and similar tracking technologies on our website and application.</p>
            
            <h2>What are cookies?</h2>
            <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work or function more efficiently, as well as to provide reporting information.</p>

            <h2>How we use cookies</h2>
            <p>We use cookies primarily to ensure the core functionality of the Memora application. Because we prioritize your privacy, we intentionally avoid third-party advertising or tracking cookies.</p>
            <ul>
              <li><strong>Essential Cookies:</strong> These are required for the operation of our platform. They include, for example, cookies that enable you to log into secure areas of our service and maintain your session securely.</li>
              <li><strong>Functional Cookies:</strong> These are used to recognize you when you return to our platform. This enables us to personalize our content for you and remember your preferences (e.g., your choice of language or region).</li>
            </ul>

            <h2>No Advertising Cookies</h2>
            <p>We strictly do not use advertising or retargeting cookies. Your memories and your browsing behavior are never sold to advertisers.</p>

            <h2>Managing Cookies</h2>
            <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set essential cookies, you may worsen your overall user experience and lose the ability to access your Memora vault securely.</p>
          </div>
        </div>
      </main>
    </>
  );
}
