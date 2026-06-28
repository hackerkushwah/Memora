import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Product Roadmap",
  description: "See what we're building next for Memora.",
};

export default function RoadmapPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Product Roadmap - Memora"
  };

  return (
    <>
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">The Road Ahead</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">We are constantly improving Memora. Here is a look at what we are working on to make your digital vault even better.</p>
            </ScrollReveal>
          </div>

          <div className="space-y-12">
            <ScrollReveal delay={0.1} className="relative pl-8 border-l border-white/10">
              <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[8.5px] top-1"></div>
              <div className="text-blue-400 font-semibold mb-2 uppercase tracking-wider text-sm">Now / In Progress</div>
              <h3 className="text-2xl font-medium mb-4">AI Timeline Curation</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">We are building an intelligent agent that runs locally in your browser to analyze your entries and suggest timelines without sending your data to our servers.</p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2} className="relative pl-8 border-l border-white/10">
              <div className="absolute w-4 h-4 rounded-full bg-yellow-500 -left-[8.5px] top-1"></div>
              <div className="text-yellow-400 font-semibold mb-2 uppercase tracking-wider text-sm">Up Next (Q3 2026)</div>
              <h3 className="text-2xl font-medium mb-4">Shared Vaults</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">Allow couples and families to securely share a vault using encrypted public key sharing. You'll be able to merge memories while maintaining individual privacy controls.</p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3} className="relative pl-8 border-l border-white/10">
              <div className="absolute w-4 h-4 rounded-full bg-zinc-600 -left-[8.5px] top-1"></div>
              <div className="text-zinc-500 font-semibold mb-2 uppercase tracking-wider text-sm">Future (2027)</div>
              <h3 className="text-2xl font-medium mb-4">Legacy Protocols</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">A secure mechanism to designate heirs for your vault. In the event of your passing, a cryptographic dead-man's switch will release your memories to designated loved ones.</p>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </>
  );
}
