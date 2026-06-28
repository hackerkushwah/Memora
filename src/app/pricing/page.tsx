import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for preserving your life's memories.",
};

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Pricing - Memora"
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Simple, transparent pricing.</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">No confusing tiers. No hidden fees. Just one plan that gives you everything you need to preserve your legacy forever.</p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} className="max-w-lg mx-auto bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-xs font-bold px-4 py-1 rounded-bl-xl">Most Popular</div>
            <h2 className="text-2xl font-semibold mb-2">The Eternal Vault</h2>
            <p className="text-zinc-400 mb-6">Everything you need to capture and organize your life.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">$9</span>
              <span className="text-zinc-500">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Unlimited entries and text', 'Up to 500GB of encrypted media storage', '4K video playback support', 'Advanced semantic search', 'Zero-knowledge encryption', 'Priority customer support'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/" className="block w-full text-center py-4 bg-white text-black rounded-xl font-medium hover:scale-105 transition-transform">
              Start your 14-day free trial
            </Link>
          </ScrollReveal>
          
          <div className="mt-24 max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions about Pricing</h2>
            </ScrollReveal>
            <div className="space-y-8 text-left">
              <ScrollReveal delay={0.1}>
                <h3 className="text-lg font-medium text-white mb-2">What happens if I exceed 500GB?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">For 99% of users, 500GB is enough for decades of curated memories. If you are a power user, we offer expansion packs at a flat rate of $2/month per additional 100GB.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h3 className="text-lg font-medium text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Yes. If you cancel, your account will enter a read-only state for 90 days, allowing you to easily export your data in open formats before it is permanently deleted.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
