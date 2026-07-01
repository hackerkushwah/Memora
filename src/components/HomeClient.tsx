"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Lock, Search, Folder, Shield, Zap, Heart, CheckCircle2, Play, ChevronDown, Clock, Brain, Camera, Layout, Crown } from "lucide-react";
import Link from "next/link";
import { ClientMemory } from "@/lib/data";
import { MemoryVault } from "./MemoryVault";
import { supabaseClient } from "@/lib/supabase-client";

const faqs = [
  { q: "What is Memora?", a: "Memora is an intelligent, encrypted digital memory vault designed to preserve your photos, videos, and journal entries with emotional context, ensuring your memories last forever." },
  { q: "How is it different from Google Photos or iCloud?", a: "Unlike traditional galleries that dump thousands of photos into an endless grid, Memora focuses on curation, emotional storytelling, and absolute privacy with zero-knowledge encryption." },
  { q: "Is my data secure?", a: "Yes. Your data is encrypted locally on your device before it ever reaches our servers using AES-256 encryption. We cannot view, scan, or sell your memories." },
  { q: "Can I search my memories?", a: "Absolutely. Memora features a powerful, semantic search engine that lets you find memories based on context, dates, emotions, and people." },
  { q: "Who owns my data?", a: "You do. You retain 100% ownership of everything you upload. You can export your entire vault in open formats at any time." },
  { q: "Do you compress my photos?", a: "No. We believe your memories should remain pristine. We store the original, full-resolution files without any lossy compression." },
  { q: "Is there a mobile app?", a: "Memora is a Progressive Web App (PWA). It installs directly from your browser to your home screen and behaves exactly like a native app." },
  { q: "What happens to my vault if I pass away?", a: "We are actively developing a Legacy Protocol that acts as a cryptographic dead-man's switch, releasing your vault to designated heirs." },
];

const testimonials = [
  { quote: "Memora entirely changed how I view my digital life. I used to feel overwhelmed by my 30,000 photos. Now, I have a curated vault of my most precious memories.", author: "Sarah Jenkins", role: "Photographer" },
  { quote: "The semantic search is mind-blowing. I searched for 'that rainy day in London' and it instantly found a journal entry and photo from 5 years ago.", author: "David Chen", role: "Software Engineer" },
  { quote: "Finally, a platform that respects my privacy. The zero-knowledge encryption gives me the peace of mind to truly journal honestly.", author: "Emily Rivera", role: "Writer & Mother" }
];

const personaContent: Record<string, string> = {
  Students: "Organize lecture notes, capture fleeting study insights, and build a lifelong knowledge base without the clutter of traditional apps.",
  Professionals: "Securely store meeting summaries, project milestones, and career achievements with zero-knowledge encryption for complete privacy.",
  Families: "Preserve precious family milestones, record audio memories of grandparents, and pass down a beautifully organized digital legacy.",
  Creators: "Build a second brain of inspiration, capture raw ideas on the go, and easily retrieve past concepts using powerful semantic search.",
  Researchers: "Log daily observations, securely maintain sensitive field notes, and connect disparate ideas over time with intuitive organization."
};

export function HomeClient({ initialMemories }: { initialMemories: ClientMemory[] }) {
  const [activePersona, setActivePersona] = useState<string>("Students");
  
  const handleSignIn = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

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
    <main className="w-full flex flex-col bg-[#050505] text-[#FFFFFF] overflow-x-hidden selection:bg-white/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      {/* 1. CINEMATIC VIDEO HERO */}
      <section className="relative w-full min-h-[100vh] flex items-center pt-20 lg:pt-0 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
            style={{ filter: "brightness(0.6) contrast(1.2)" }}
          >
            {/* Using a high-quality abstract cinematic placeholder video */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505]"></div>
          <div className="absolute inset-0 bg-[#050505]/40 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-6">
                Every memory deserves a place that <span className="italic text-white/80">lasts forever.</span>
              </h1>
              <p className="text-lg md:text-xl text-[#B3B3B3] font-light leading-loose max-w-lg">
                Memora helps you preserve memories, organize your life, and rediscover meaningful moments with an intelligent digital memory vault.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-6 pt-4 w-full"
            >
              <button onClick={handleSignIn} className="w-full sm:w-auto bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold hover:bg-[#F3D56D] transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all backdrop-blur-md text-center flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Interactive product preview beside hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block relative h-[600px] w-full perspective-1000"
          >
            <div className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl p-6 transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-700 ease-out flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Search className="w-5 h-5 text-white/70" /></div>
                  <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-white/5 rounded-2xl overflow-hidden relative group">
                  <img src="/poster1.png" alt="Memory" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <p className="text-sm font-medium">Summer 2026</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 flex-1 flex flex-col justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-3"><Lock className="w-4 h-4 text-[#D4AF37]" /></div>
                    <div className="h-3 w-3/4 bg-white/20 rounded-full mb-2"></div>
                    <div className="h-3 w-1/2 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 flex-1">
                    <div className="h-full w-full border border-dashed border-white/20 rounded-xl flex items-center justify-center">
                      <p className="text-xs text-white/40 uppercase tracking-widest">+ Add Memory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="w-full py-24 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl text-center mb-16">Why people preserve memories</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1} className="bg-[#111111] border border-white/10 rounded-3xl p-10 hover:bg-white/[0.03] transition-colors">
              <Heart className="w-8 h-8 text-rose-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">Emotional Value</h3>
              <p className="text-[#B3B3B3] leading-relaxed">
                Photos without context lose their meaning. We help you capture the feelings, thoughts, and stories behind the image, preserving the true essence of the moment.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="bg-[#111111] border border-white/10 rounded-3xl p-10 hover:bg-white/[0.03] transition-colors">
              <Shield className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">Absolute Privacy</h3>
              <p className="text-[#B3B3B3] leading-relaxed">
                In an era of data harvesting, your memories should remain yours. Zero-knowledge encryption ensures that nobody—not even us—can view your personal history.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} className="bg-[#111111] border border-white/10 rounded-3xl p-10 hover:bg-white/[0.03] transition-colors">
              <Folder className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-xl font-medium mb-4">Digital Legacy</h3>
              <p className="text-[#B3B3B3] leading-relaxed">
                Build an organized, elegant archive of your life's work that can be safely passed down to future generations without relying on fragile social media platforms.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. HOW MEMORA WORKS */}
      <section className="w-full py-32 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-24">
              <span className="text-[#D4AF37] text-sm uppercase tracking-widest font-bold mb-4 block">The Process</span>
              <h2 className="font-serif text-4xl md:text-6xl mb-6">How Memora Works</h2>
              <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">A seamless, three-step journey to immortalizing your experiences.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-32">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <ScrollReveal className="order-2 md:order-1">
                <div className="w-full rounded-3xl overflow-hidden border border-white/10 relative bg-[#111111] aspect-square group">
                  <img src="/step1.png" alt="Memora Upload Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="order-1 md:order-2 space-y-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-serif">1</div>
                <h3 className="text-3xl font-medium">Capture memories</h3>
                <p className="text-[#B3B3B3] text-lg leading-relaxed">
                  Upload photos, videos, and documents. Write journal entries while the emotion is still fresh. Memora securely encrypts everything before it leaves your device.
                </p>
                <ul className="space-y-3 text-[#B3B3B3]">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> High-resolution photos</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Rich-text journal entries</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Important life documents</li>
                </ul>
              </ScrollReveal>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <ScrollReveal className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-serif">2</div>
                <h3 className="text-3xl font-medium">Organize automatically</h3>
                <p className="text-[#B3B3B3] text-lg leading-relaxed">
                  Say goodbye to chaotic folders. Build beautifully structured collections, chronologically precise timelines, and contextual categories that make sense to you.
                </p>
                <ul className="space-y-3 text-[#B3B3B3]">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Smart collections</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Intuitive categorization</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Chronological timelines</li>
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="w-full rounded-3xl overflow-hidden border border-white/10 relative bg-[#111111] aspect-square group">
                  <img src="/step2.png" alt="Memora Collections Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <ScrollReveal className="order-2 md:order-1">
                <div className="w-full rounded-3xl overflow-hidden border border-white/10 relative bg-[#111111] aspect-square group">
                  <img src="/step3.png" alt="Memora Search Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="order-1 md:order-2 space-y-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-serif">3</div>
                <h3 className="text-3xl font-medium">Rediscover instantly</h3>
                <p className="text-[#B3B3B3] text-lg leading-relaxed">
                  When you want to look back, powerful semantic search and AI assistance help you pinpoint exact moments and feelings out of thousands of entries.
                </p>
                <ul className="space-y-3 text-[#B3B3B3]">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Powerful semantic search</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> Fluid timeline scrubbing</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white/50" /> AI-assisted rediscovery</li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT SHOWCASE */}
      <section className="w-full py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-6xl mb-6">Designed for clarity.</h2>
              <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">Experience a distraction-free interface where your memories take center stage. No clutter, no ads, just you and your history.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#111111] p-2 md:p-6 mb-32">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <img src="/mockup.png" alt="Memora Dashboard" className="w-full h-auto rounded-xl md:rounded-2xl border border-white/5" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. WHO IS MEMORA FOR */}
      <section className="w-full py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl text-center mb-16">Who is Memora for?</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-16">
            {Object.keys(personaContent).map((persona, i) => (
              <ScrollReveal key={persona} delay={0.1 + (i * 0.1)} className="flex flex-col items-center justify-center text-center space-y-4">
                <button 
                  onClick={() => setActivePersona(persona)}
                  className="group flex flex-col items-center focus:outline-none"
                  aria-pressed={activePersona === persona}
                >
                  <div className={`w-20 h-20 rounded-full bg-[#111111] border flex items-center justify-center transition-all duration-300 ${activePersona === persona ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-110' : 'border-white/10 group-hover:border-white/30'}`}>
                    <UserIcon className={`w-8 h-8 transition-colors duration-300 ${activePersona === persona ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-white'}`} />
                  </div>
                  <span className={`font-medium transition-colors duration-300 mt-4 ${activePersona === persona ? 'text-[#D4AF37]' : 'text-white/70 group-hover:text-white'}`}>{persona}</span>
                </button>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <div className="glassmorphism p-8 md:p-12 rounded-3xl border border-white/10 min-h-[160px] flex items-center justify-center transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-serif relative z-10" key={activePersona}>
                {personaContent[activePersona]}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. WHY MEMORA */}
      <section className="w-full py-32 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">The problem with the modern camera roll.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-[#B3B3B3] leading-relaxed">
              We take more photos today than at any point in human history, yet we remember less. Traditional photo galleries have become chaotic dumping grounds for screenshots, receipts, and duplicate selfies. 
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white leading-relaxed font-serif italic">
              Memora solves this by forcing you to be intentional. We are a sanctuary, not a dumping ground.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. FEATURES */}
      <section className="w-full py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-medium">Zero-Knowledge Encryption</h3>
              <div className="space-y-4 text-[#B3B3B3]">
                <p><strong className="text-white">What it does:</strong> Encrypts your data locally before uploading.</p>
                <p><strong className="text-white">Why it matters:</strong> Prevents unauthorized access, data mining, and surveillance.</p>
                <p><strong className="text-white">Example:</strong> Your private journal entries are mathematically impossible for anyone but you to read.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="space-y-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-medium">Semantic AI Search</h3>
              <div className="space-y-4 text-[#B3B3B3]">
                <p><strong className="text-white">What it does:</strong> Understands the context and meaning of your entries.</p>
                <p><strong className="text-white">Why it matters:</strong> Lets you search by concept rather than exact keywords.</p>
                <p><strong className="text-white">Example:</strong> Search "the day I felt truly happy at the beach" and instantly find the memory.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. PUBLIC CONTENT (Education) */}
      <section className="w-full py-32 bg-black border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl mb-8">Educating the Future</h2>
            <p className="text-[#B3B3B3] text-lg leading-relaxed mb-12">
              We believe in open knowledge. Memora provides extensive public resources on cognitive offloading, building a second brain, and the psychology of digital memory preservation to help everyone build a better relationship with their past.
            </p>
            <Link href="/resources" className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
              Explore the Resource Center <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>



      {/* 9. FAQ */}
      <section className="w-full py-32 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={0.05 * Math.min(i, 10)}>
                <details className="group bg-[#050505] border border-white/5 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-medium text-lg text-white/90">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-[#B3B3B3] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="w-full py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-5xl mb-4">Loved by Storytellers</h2>
              <span className="text-xs text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">Trusted Worldwide</span>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={0.1 * i} className="bg-[#111111] border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
                <p className="text-lg text-white/80 italic mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{t.author}</div>
                    <div className="text-sm text-white/40">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="w-full py-40 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white/10 via-[#050505] to-[#050505]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-10">
          <ScrollReveal>
            <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-8" />
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">Begin your eternal archive today.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-xl text-[#B3B3B3]">Join Memora and ensure your stories are never lost.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 w-full">
              <button onClick={handleSignIn} className="w-full sm:w-auto bg-[#D4AF37] text-black px-10 py-5 rounded-full font-bold hover:bg-[#F3D56D] transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

// Simple fallback icon for Who Is Memora For section to avoid complex imports
function UserIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
