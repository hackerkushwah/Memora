"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { UploadModal } from "@/components/UploadModal";
import { MemoryVault } from "@/components/MemoryVault";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ClientMemory } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Sparkles, Brain, 
  Search, Lock, Heart, FileImage, FileText, 
  CheckCircle2, Star, PlayCircle, ChevronDown
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "🎓 College", "❤️ Us", "📸 Moments", "✈️ Travel", "🌙 Unforgettable", "✨ Forever"];

const FADE_UP: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER: any = {
  hidden: { opacity: 0 },
  show: { transition: { staggerChildren: 0.1 } }
};

export default function HomeClient({ initialMemories }: { initialMemories: ClientMemory[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // 3D Transforms based on scrollYProgress (0 to 1)
  const textX1 = useTransform(scrollYProgress, [0, 1], ["20%", "-100%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["-80%", "50%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  const img1Z = useTransform(scrollYProgress, [0, 1], [-1200, 600]);
  const img1Y = useTransform(scrollYProgress, [0, 1], [500, -1000]);
  const img1Rotate = useTransform(scrollYProgress, [0, 1], [-10, 5]);

  const img2Z = useTransform(scrollYProgress, [0, 0.8], [-2000, 400]);
  const img2RotateY = useTransform(scrollYProgress, [0, 0.8], [30, -30]);
  const img2Y = useTransform(scrollYProgress, [0, 0.8], [-800, 800]);

  const img3Scale = useTransform(scrollYProgress, [0, 0.9], [0.3, 2.5]);
  const img3Opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const img3RotateZ = useTransform(scrollYProgress, [0.2, 0.9], [0, 15]);

  const img4Z = useTransform(scrollYProgress, [0.1, 0.9], [-3000, 1500]);
  const img4X = useTransform(scrollYProgress, [0.1, 0.9], [800, -500]);

  const tunnelOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // If user has memories, they shouldn't just see the landing page, 
  // but for the sake of the requirement, the landing page is public marketing.
  // Actually, if we have initialMemories.length > 0, we could show the vault directly 
  // or let them scroll. Let's make the vault accessible at the top or bottom, 
  // or use a separate Dashboard view. The request asks for a Landing Page Redesign.
  // We'll keep the landing page as the primary marketing material.

  return (
    <>
      <Navbar onUploadClick={() => setIsUploadOpen(true)} />

      {/* 3D TUNNEL CONTAINER - 500vh tall to allow deep scrolling */}
      <div ref={scrollRef} className="relative w-full h-[500vh] bg-black">
        {/* Sticky viewport that renders the 3D scene */}
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center [perspective:1200px]">
          <motion.div style={{ opacity: tunnelOpacity }} className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            
            {/* Background Base with faint noise overlay */}
            <div className="absolute inset-0 bg-[#020005]" />
            
            {/* Royal Ambient Glows */}
            <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-[#3C1053] opacity-30 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#0A192F] opacity-40 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="absolute inset-0 bg-white/5 mix-blend-overlay noise-overlay" />

            {/* BACKGROUND TEXT */}
            <motion.div 
              style={{ x: textX1, scale: textScale, z: -1000 }} 
              className="absolute top-[30%] left-0 whitespace-nowrap opacity-20 pointer-events-none"
            >
              <h1 className="font-serif text-[20vw] text-white font-black tracking-tighter mix-blend-overlay">
                THE ETERNAL BATCH • 2026
              </h1>
            </motion.div>

            {/* 3D IMAGE 4 */}
            <motion.div 
               style={{ z: img4Z, x: img4X }} 
               className="absolute right-[-10%] top-1/4 w-[40vw] md:w-[25vw] will-change-transform transform-gpu"
            >
              <img src="/3d_4.png" alt="Memory Segment 4" className="w-full h-auto rounded-xl shadow-lg md:shadow-[0_0_80px_rgba(255,255,255,0.03)] grayscale border border-white/5 transform-gpu" />
            </motion.div>

            {/* 3D IMAGE 2 */}
            <motion.div 
               style={{ z: img2Z, rotateY: img2RotateY, y: img2Y }} 
               className="absolute right-[5%] top-[10%] w-[45vw] md:w-[30vw] opacity-90 will-change-transform transform-gpu"
            >
              <img src="/3d_2.png" alt="Memory Segment 2" className="w-full h-auto rounded-3xl shadow-xl md:shadow-[0_20px_100px_rgba(255,255,255,0.06)] grayscale border border-white/10 transform-gpu" />
            </motion.div>

            {/* 3D IMAGE 1 */}
            <motion.div 
               style={{ z: img1Z, y: img1Y, rotateZ: img1Rotate }} 
               className="absolute left-[2%] md:left-[10%] top-[60%] w-[55vw] md:w-[35vw] will-change-transform transform-gpu"
            >
              <img src="/3d_1.png" alt="Memory Segment 1" className="w-full h-auto rounded-2xl shadow-xl md:shadow-[0_0_80px_rgba(255,255,255,0.08)] opacity-95 border border-zinc-800 transform-gpu" />
            </motion.div>

            {/* FOREGROUND TEXT */}
            <motion.div 
              style={{ x: textX2, z: 300 }} 
              className="absolute top-[55%] right-0 whitespace-nowrap opacity-90 pointer-events-none flex items-center"
            >
              <h2 className="text-[10vw] font-black drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] text-[#D4AF37] mix-blend-screen flex items-baseline gap-[2vw]">
                <span className="font-serif tracking-[0.2em] uppercase">PROOF THAT WE LIVED</span>
              </h2>
            </motion.div>

            {/* 3D IMAGE 3 */}
            <motion.div 
               style={{ scale: img3Scale, opacity: img3Opacity, rotateZ: img3RotateZ }} 
               className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none will-change-transform transform-gpu"
            >
              <img src="/3d_3.png" alt="Memory Segment 3" className="w-[90vw] md:w-[60vw] rounded-3xl shadow-2xl md:shadow-[0_0_150px_rgba(255,255,255,0.1)] grayscale opacity-90 border border-white/20 transform-gpu" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute bottom-[5%] z-50 flex flex-col items-center gap-3 opacity-60"
            >
              <span className="text-white text-xs tracking-[0.4em] uppercase font-bold">Scroll to Dive</span>
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.div>

          </motion.div>
        </div>
      </div>

      <main className="w-full bg-[#050505] text-white selection:bg-white/20 relative z-20 border-t border-white/10">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
          
          <motion.div 
            initial="hidden" animate="show" variants={STAGGER}
            className="max-w-4xl mx-auto z-10"
          >
            <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide uppercase mb-8">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-zinc-300">The New Standard for Digital Memories</span>
            </motion.div>

            <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">
              Preserve your life, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">beautifully organized.</span>
            </motion.h1>

            <motion.p variants={FADE_UP} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Memora is the premium digital vault for your most precious moments. Capture, organize, and instantly find memories without the clutter of traditional cloud storage.
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Start your vault
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link 
                href="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium transition-colors hover:bg-white/5 flex items-center justify-center gap-2"
              >
                See how it works
                <PlayCircle className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div variants={FADE_UP} className="mt-12 flex items-center justify-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500/70" /> End-to-end encryption</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500/70" /> No ads. Ever.</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500/70" /> Cancel anytime</span>
            </motion.div>
          </motion.div>

          {/* Product Preview Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto mt-20 relative z-10"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_rgba(255,255,255,0.03)] overflow-hidden">
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-[#050505]">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <div className="aspect-video bg-[url('/mockup.png')] bg-cover bg-center opacity-80" />
            </div>
          </motion.div>
        </section>

        {/* PROBLEM STATEMENT */}
        <section className="py-24 px-6 bg-[#050505] border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-semibold mb-8 tracking-tight text-white">The problem with our digital lives.</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-6">
                We take more photos and write more notes than any generation in history. Yet, when we want to find a specific memory, we're forced to scroll through endless camera rolls filled with screenshots, receipts, and duplicated images.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                Our most precious moments are scattered across different clouds, lost in a sea of irrelevant data. We are preserving data, but we are losing our memories.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-32 px-6 bg-[#020202]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">Three steps to eternity.</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">We stripped away the complexity so you can focus on what matters: the memory itself.</p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
              
              {[
                { step: "01", title: "Capture securely", desc: "Upload photos, videos, or text directly into your encrypted vault.", icon: Lock },
                { step: "02", title: "Organize intuitively", desc: "Tag, categorize, and build timelines that make sense to your brain.", icon: Brain },
                { step: "03", title: "Relive instantly", desc: "Search across thousands of memories in milliseconds.", icon: Zap }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={0.2 + (i * 0.1)} className="relative z-10 bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <item.icon className="w-6 h-6 text-zinc-300" />
                  </div>
                  <div className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-widest">Step {item.step}</div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHY MEMORA */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-semibold mb-12 tracking-tight">Why switch to Memora?</h2>
            </ScrollReveal>
            
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <ScrollReveal delay={0.1} className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8">
                <h3 className="text-red-400 font-medium mb-4 flex items-center gap-2">Traditional Storage</h3>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li className="flex gap-2"><span className="text-red-500/50">✕</span> Cluttered folders</li>
                  <li className="flex gap-2"><span className="text-red-500/50">✕</span> Hard to search</li>
                  <li className="flex gap-2"><span className="text-red-500/50">✕</span> Mixed with work files</li>
                  <li className="flex gap-2"><span className="text-red-500/50">✕</span> Privacy concerns</li>
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="bg-green-500/5 border border-green-500/10 rounded-2xl p-8">
                <h3 className="text-green-400 font-medium mb-4 flex items-center gap-2">Memora</h3>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-2"><span className="text-green-500/50">✓</span> Beautiful, visual timelines</li>
                  <li className="flex gap-2"><span className="text-green-500/50">✓</span> Instant semantic search</li>
                  <li className="flex gap-2"><span className="text-green-500/50">✓</span> Dedicated strictly to life</li>
                  <li className="flex gap-2"><span className="text-green-500/50">✓</span> Absolute privacy</li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-32 px-6 bg-[#020202]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">Built for permanence.</h2>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { title: "Universal Search", benefit: "Find any memory instantly.", desc: "Stop scrolling endlessly. Search by emotion, location, or content.", example: '"That sunset in Kyoto last summer"', icon: Search },
                { title: "Bank-Grade Encryption", benefit: "Your life remains yours.", desc: "We utilize zero-knowledge architecture. Not even we can see your files.", example: "Secured with AES-256 standards", icon: Shield },
                { title: "Rich Media Support", benefit: "Capture the whole story.", desc: "Combine photos, videos, and journal entries into single cohesive memories.", example: "A photo + the story behind it", icon: FileImage },
                { title: "Curated Timelines", benefit: "See your life in context.", desc: "Memories automatically organize themselves into beautiful chronological journeys.", example: "View '2023' as a seamless story", icon: Heart }
              ].map((f, i) => (
                <ScrollReveal key={i} delay={i * 0.1} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">{f.title}</h3>
                    <div className="text-[#D4AF37] text-sm font-medium mb-2">{f.benefit}</div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">{f.desc}</p>
                    <div className="bg-white/5 border border-white/10 rounded text-xs text-zinc-500 px-3 py-1.5 inline-block font-mono">Example: {f.example}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IS IT FOR */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-semibold mb-16 tracking-tight">Designed for every life.</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Students", desc: "Archive college years, late nights, and milestones." },
                { title: "Families", desc: "Build a digital heirloom for the next generation." },
                { title: "Creators", desc: "Store inspiration and behind-the-scenes moments." },
                { title: "Couples", desc: "A private space for your shared journey." }
              ].map((persona, i) => (
                <ScrollReveal key={i} delay={0.1 + (i * 0.1)} className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/5 text-left">
                  <h3 className="text-lg font-medium mb-2">{persona.title}</h3>
                  <p className="text-sm text-zinc-400">{persona.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* VAULT / DASHBOARD AREA */}
        {initialMemories.length > 0 && (
          <section className="py-32 px-6 bg-[#050505]" id="vault">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl font-semibold mb-6">Your Vault</h2>
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat 
                          ? 'bg-white text-black' 
                          : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <MemoryVault memories={activeCategory === "All" ? initialMemories : initialMemories.filter(m => m.category === activeCategory)} />
            </div>
          </section>
        )}

        {/* FAQ SECTION */}
        <section className="py-32 px-6 bg-[#0A0A0A] border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">Frequently Asked Questions</h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-zinc-400 text-lg">Everything you need to know about Memora and how it protects your data.</p>
              </ScrollReveal>
            </div>
            <div className="space-y-6">
              {[
                { q: "Is my data truly private?", a: "Yes. Memora uses AES-256 end-to-end encryption. Your data is encrypted before it leaves your device, meaning not even our team can access your memories." },
                { q: "What happens if I want to leave?", a: "Your memories are yours. You can export your entire vault in standard formats (ZIP, JSON, JPG) with a single click at any time." },
                { q: "How is Memora different from standard cloud storage?", a: "Those platforms are built to store everything—including receipts, screenshots, and duplicates. Memora is purpose-built strictly for curated, meaningful memories, enriched with context and stories." },
                { q: "Do you compress my photos?", a: "No. We believe in preserving the exact quality of your memories. Original files are stored securely without compression." },
                { q: "Is there a free tier?", a: "We offer a 14-day free trial so you can experience the platform. After that, we charge a simple flat fee. We never sell ads, and we never sell your data." },
              ].map((faq, i) => (
                <ScrollReveal key={i} delay={0.2 + (i * 0.1)} className="bg-[#050505] border border-white/5 p-6 rounded-2xl">
                  <h3 className="text-lg font-medium text-white mb-2">{faq.q}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 px-6 bg-gradient-to-b from-[#020202] to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">Ready to preserve your legacy?</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-zinc-400 mb-10">Join thousands of users who trust Memora with their most precious moments.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="px-10 py-5 bg-white text-black rounded-full font-medium text-lg transition-transform hover:scale-105"
              >
                Start your vault
              </button>
            </ScrollReveal>
          </div>
        </section>

      </main>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
}
