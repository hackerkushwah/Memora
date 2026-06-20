import { CursorGlow } from "@/components/CursorGlow";
import Link from "next/link";
import { ArrowRight, Shield, Heart, Zap } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about Memora, our mission to preserve human memories, and why we created the eternal digital vault.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black overflow-hidden pt-24 pb-20">
      <div className="noise-overlay" />
      <CursorGlow />
      
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10 flex flex-col space-y-24">
        
        {/* Hero Section */}
        <section className="space-y-6 text-center mt-12">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs font-medium tracking-wider uppercase mb-4">
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
            Proof That <span className="font-cursive text-white/80 font-light">We Lived</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Memora is not just another photo app. It is an eternal digital vault designed to preserve your most profound moments and the raw emotions attached to them.
          </p>
        </section>

        {/* Mission */}
        <section className="glassmorphism p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <h2 className="text-3xl font-serif text-white mb-6 relative z-10">Our Mission</h2>
          <p className="text-white/70 leading-relaxed text-lg relative z-10">
            In an era of fleeting content and infinite scrolling, we are losing our history. Our mission is to create a sanctuary where memories are treated with the reverence they deserve. We built Memora to ensure that decades from now, you can return to a specific moment and feel exactly what you felt then.
          </p>
        </section>

        {/* Features / Benefits */}
        <section>
          <h2 className="text-3xl font-serif text-white mb-10 text-center">Why Memora?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white">Absolute Privacy</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Your memories are locked behind advanced encryption. You hold the keys to your vault.
              </p>
            </div>
            <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white">Emotion First</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We focus on the feeling behind the photo, encouraging meaningful journaling alongside your media.
              </p>
            </div>
            <div className="glassmorphism p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:bg-white/[0.05] transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white">Timeless Design</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                A minimal, distraction-free environment that puts your precious moments at the center stage.
              </p>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="text-center space-y-8 pb-12">
          <h2 className="text-3xl font-serif text-white">The Future Vision</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            We envision a world where digital legacy is inherited, not lost in the cloud. We are continuously working on making Memora the definitive way to pass down stories to the next generation.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors mt-4"
          >
            <span>Start Your Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </main>
  );
}
