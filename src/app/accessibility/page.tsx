import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Accessibility Statement",
  description: "Memora is committed to digital accessibility for everyone.",
};

export default function AccessibilityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Accessibility Statement - Memora"
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">Accessibility Statement</h1>
            <p className="text-xl text-zinc-400">Our commitment to inclusive design.</p>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 prose-headings:text-white">
            <p>Memora is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
            
            <h2>Measures to Support Accessibility</h2>
            <p>Memora takes the following measures to ensure accessibility:</p>
            <ul>
              <li>Include accessibility as part of our mission statement.</li>
              <li>Integrate accessibility into our procurement practices.</li>
              <li>Provide continual accessibility training for our staff.</li>
            </ul>

            <h2>Conformance Status</h2>
            <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Memora is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.</p>

            <h2>Feedback</h2>
            <p>We welcome your feedback on the accessibility of Memora. Please let us know if you encounter accessibility barriers on Memora:</p>
            <ul>
              <li>E-mail: <code>accessibility@memora.app</code></li>
            </ul>
            <p>We try to respond to feedback within 2 business days.</p>
          </div>
        </div>
      </main>
    </>
  );
}
