import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Shield, Lock, EyeOff, Server } from "lucide-react";

export const metadata = {
  title: "Security & Privacy",
  description: "Learn how Memora protects your most precious memories with military-grade encryption.",
};

export default function SecurityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Security & Privacy at Memora",
    "description": "Learn how Memora protects your most precious memories with military-grade encryption."
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-20">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Security is our foundation.</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Your memories are your most intimate data. We treat them with the utmost respect and highest cryptographic standards available.</p>
            </ScrollReveal>
          </header>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <ScrollReveal delay={0.1} className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5">
              <Shield className="w-8 h-8 text-green-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">Zero-Knowledge Architecture</h3>
              <p className="text-zinc-400 leading-relaxed">Your data is encrypted on your device before it ever reaches our servers. We do not have the keys to decrypt your files. If we are ever compromised, your data remains mathematically impossible to read.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5">
              <Lock className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">AES-256 Encryption</h3>
              <p className="text-zinc-400 leading-relaxed">All data at rest is encrypted using AES-256, the same encryption standard used by banks and the military. Data in transit is secured via TLS 1.3 to prevent any interception.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5">
              <EyeOff className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">No Tracking, No Ads</h3>
              <p className="text-zinc-400 leading-relaxed">We do not track your behavior within the app for advertising purposes. We do not sell your data to third parties. Our business model is simple: you pay for secure storage, and we provide it.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.4} className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5">
              <Server className="w-8 h-8 text-yellow-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">Redundant Backups</h3>
              <p className="text-zinc-400 leading-relaxed">Your encrypted blobs are replicated across multiple geographic regions to ensure that even in the event of a natural disaster, your memories are safe and retrievable.</p>
            </ScrollReveal>
          </div>
          
          <div className="prose prose-invert max-w-none text-zinc-300">
            <h2>Vulnerability Disclosure</h2>
            <p>If you are a security researcher and believe you have found a vulnerability in our systems, please contact our security team immediately at <code>security@memora.app</code>. We take all reports seriously and will investigate them promptly.</p>
          </div>
        </div>
      </main>
    </>
  );
}
