"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { MemoryVault } from "@/components/MemoryVault";
import { UploadModal } from "@/components/UploadModal";
import { ClientMemory } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Mouse } from "lucide-react";

const CATEGORIES = ["All", "🎓 College", "❤️ Us", "📸 Moments", "✈️ Travel", "🌙 Unforgettable", "✨ Forever"];

export default function HomeClient({ initialMemories }: { initialMemories: ClientMemory[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const vaultRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToVault = () => {
    vaultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // 3D Transforms based on scrollYProgress (0 to 1)

  // Text flowing horizontally
  const textX1 = useTransform(scrollYProgress, [0, 1], ["20%", "-100%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["-80%", "50%"]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.9]);

  // Image 1: Bottom Left, floats UP and Towards camera
  const img1Z = useTransform(scrollYProgress, [0, 1], [-1200, 600]);
  const img1Y = useTransform(scrollYProgress, [0, 1], [500, -1000]);
  const img1Rotate = useTransform(scrollYProgress, [0, 1], [-10, 5]);

  // Image 2: Top Right, floats down and heavily rotates
  const img2Z = useTransform(scrollYProgress, [0, 0.8], [-2000, 400]);
  const img2RotateY = useTransform(scrollYProgress, [0, 0.8], [30, -30]);
  const img2Y = useTransform(scrollYProgress, [0, 0.8], [-800, 800]);

  // Image 3: Center deep camera zoom
  const img3Scale = useTransform(scrollYProgress, [0, 0.9], [0.3, 2.5]);
  const img3Opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const img3RotateZ = useTransform(scrollYProgress, [0.2, 0.9], [0, 15]);

  // Image 4: Right middle, shoots past camera extremely fast
  const img4Z = useTransform(scrollYProgress, [0.1, 0.9], [-3000, 1500]);
  const img4X = useTransform(scrollYProgress, [0.1, 0.9], [800, -500]);

  const tunnelOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <>
      <Navbar onUploadClick={() => setIsUploadOpen(true)} />

      {/* 3D TUNNEL CONTAINER - 500vh tall to allow deep scrolling */}
      <div ref={scrollRef} className="relative w-full h-[500vh] bg-black">
        
        {/* Sticky viewport that renders the 3D scene */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center [perspective:1200px]">
          
          <motion.div style={{ opacity: tunnelOpacity }} className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            
            {/* Background Base with faint noise overlay */}
            <div className="absolute inset-0 bg-[#020005]" />
            
            {/* Royal Ambient Glows */}
            <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-[#3C1053] opacity-30 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#0A192F] opacity-40 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="absolute inset-0 bg-white/5 mix-blend-overlay noise-overlay" />

            {/* BACKGROUND TEXT (Weaving behind objects) */}
            <motion.div 
              style={{ x: textX1, scale: textScale, z: -1000 }} 
              className="absolute top-[30%] left-0 whitespace-nowrap opacity-20 pointer-events-none"
            >
              <h1 className="font-serif text-[20vw] text-white font-black tracking-tighter mix-blend-overlay">
                THE ETERNAL BATCH • 2026
              </h1>
            </motion.div>

            {/* 3D IMAGE 4 (Deepest, flying in from right space) */}
            <motion.div 
               style={{ z: img4Z, x: img4X }} 
               className="absolute right-[-10%] top-1/4 w-[40vw] md:w-[25vw] will-change-transform transform-gpu"
            >
              <img src="/3d_4.png" alt="Memory Segment 4" className="w-full h-auto rounded-xl shadow-lg md:shadow-[0_0_80px_rgba(255,255,255,0.03)] grayscale border border-white/5 transform-gpu" />
            </motion.div>

            {/* 3D IMAGE 2 (Top Right, complex rotation) */}
            <motion.div 
               style={{ z: img2Z, rotateY: img2RotateY, y: img2Y }} 
               className="absolute right-[5%] top-[10%] w-[45vw] md:w-[30vw] opacity-90 will-change-transform transform-gpu"
            >
              <img src="/3d_2.png" alt="Memory Segment 2" className="w-full h-auto rounded-3xl shadow-xl md:shadow-[0_20px_100px_rgba(255,255,255,0.06)] grayscale border border-white/10 transform-gpu" />
            </motion.div>

            {/* 3D IMAGE 1 (Bottom Left, rising to camera) */}
            <motion.div 
               style={{ z: img1Z, y: img1Y, rotateZ: img1Rotate }} 
               className="absolute left-[2%] md:left-[10%] top-[60%] w-[55vw] md:w-[35vw] will-change-transform transform-gpu"
            >
              <img src="/3d_1.png" alt="Memory Segment 1" className="w-full h-auto rounded-2xl shadow-xl md:shadow-[0_0_80px_rgba(255,255,255,0.08)] opacity-95 border border-zinc-800 transform-gpu" />
            </motion.div>

            {/* FOREGROUND TEXT (Weaving in front of objects) */}
            <motion.div 
              style={{ x: textX2, z: 300 }} 
              className="absolute top-[55%] right-0 whitespace-nowrap opacity-90 pointer-events-none flex items-center"
            >
              <h2 className="text-[10vw] font-black drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] text-[#D4AF37] mix-blend-screen flex items-baseline gap-[2vw]">
                <span className="font-serif tracking-[0.2em] uppercase">PROOF THAT WE LIVED</span>
              </h2>
            </motion.div>

            {/* 3D IMAGE 3 (Center Emerging from void to engulf screen) */}
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

      {/* FINAL CTA (Triggered at bottom of 500vh) */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center bg-[#070211] z-20 border-t border-purple-900/30">
        <div className="absolute inset-0 bg-[url('/mockup.png')] bg-cover bg-center grayscale opacity-10" />
        
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="relative z-10 text-center px-4"
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl">
             Explore The Vault
          </h2>
          <p className="font-sans text-zinc-400 text-xs md:text-sm tracking-[0.4em] uppercase mb-12">
             Beyond this point, memories are eternal.
          </p>
          <button
             onClick={scrollToVault}
             className="group relative px-12 py-5 bg-white text-black font-sans text-sm font-bold tracking-[0.2em] uppercase overflow-hidden hover:scale-105 transition-transform"
          >
             <span className="relative z-10 group-hover:text-white transition-colors duration-500">Access Database</span>
             <div className="absolute inset-0 bg-black transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
             <div className="absolute inset-0 border border-white" />
          </button>
        </motion.div>
      </section>

      {/* VAULT SECTION */}
      <section ref={vaultRef} className="w-full min-h-screen bg-gradient-to-b from-[#070211] to-[#000000] pt-24 pb-32 relative z-20">
        <div className="text-center mb-16 px-6">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
          >
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.7)] mb-8 tracking-wide font-light">Proof That We Lived</h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                      : 'bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-12 h-[1px] bg-white mx-auto opacity-30" />
          </motion.div>
        </div>
        <MemoryVault memories={activeCategory === "All" ? initialMemories : initialMemories.filter(m => m.category === activeCategory)} />
      </section>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
}
