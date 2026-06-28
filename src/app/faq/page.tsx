import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to all your questions about Memora's features, security, and pricing.",
};

const faqs = [
  { q: "What exactly is Memora?", a: "Memora is a premium digital vault designed specifically for preserving and organizing personal memories, including photos, videos, and journal entries, in a highly secure environment." },
  { q: "How is it different from Google Drive or iCloud?", a: "Unlike generic cloud storage, Memora is optimized for visual timelines, emotional context, and storytelling. We also offer zero-knowledge encryption, meaning we cannot read your data." },
  { q: "Is my data secure?", a: "Yes. We use AES-256 bit end-to-end encryption. Your memories are encrypted on your device before they ever reach our servers." },
  { q: "Can I share my memories?", a: "Currently, Memora is designed as a private vault. In the future, we plan to introduce secure, link-based sharing for specific trusted individuals." },
  { q: "What happens if I want to leave?", a: "You can export your entire vault (media and text) at any time in a standard, open format. Your data is yours." },
  { q: "Do you offer a mobile app?", a: "Memora is built as a Progressive Web App (PWA) which means it works beautifully on any mobile device directly through your browser, without needing an app store." },
  { q: "Are my photos compressed?", a: "No. We believe in preserving the full fidelity of your memories. We store the original file in its native resolution without downsampling." },
  { q: "Can I search for people or objects?", a: "Yes. Our semantic search engine runs locally on your device to index your metadata and text, allowing you to search contextually." },
  { q: "What happens to my vault if I pass away?", a: "We are currently developing a Legacy Protocol which will allow you to designate a trusted heir who can gain access to your vault in the future." },
  { q: "Does Memora use my data to train AI?", a: "Absolutely not. We do not use your personal memories to train any public AI models. Any AI features we provide run strictly locally on your own data." }
];

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Frequently Asked Questions</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-zinc-400">Everything you need to know about the product and billing.</p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={0.1 + (i * 0.05)}>
                <details className="group bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-medium text-lg text-zinc-200">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-zinc-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
