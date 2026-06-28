import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Search, Shield, Zap, Image as ImageIcon, Heart, Smartphone } from "lucide-react";

export const metadata = {
  title: "Features",
  description: "Explore the powerful features that make Memora the ultimate digital vault.",
};

export default function FeaturesPage() {
  const features = [
    {
      title: "Universal Semantic Search",
      desc: "Find memories based on context, emotion, or exact content. Stop relying on exact filenames.",
      icon: Search,
      img: "bg-blue-500/10",
      color: "text-blue-400"
    },
    {
      title: "Zero-Knowledge Encryption",
      desc: "Your data is encrypted locally before it ever reaches our servers. We literally cannot see your memories.",
      icon: Shield,
      img: "bg-green-500/10",
      color: "text-green-400"
    },
    {
      title: "Lightning Fast Playback",
      desc: "Optimized media delivery ensures your 4K videos and raw photos load instantly, anywhere in the world.",
      icon: Zap,
      img: "bg-yellow-500/10",
      color: "text-yellow-400"
    },
    {
      title: "Rich Journaling",
      desc: "A memory is more than an image. Attach unlimited text to provide context to your future self.",
      icon: Heart,
      img: "bg-red-500/10",
      color: "text-red-400"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-24">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Everything you need.<br/>Nothing you don't.</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Memora is deliberately constrained. We don't have social feeds or likes. We only build features that help you preserve and recall your life.</p>
            </ScrollReveal>
          </div>

          <div className="space-y-32">
            {features.map((feature, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 space-y-6">
                  <ScrollReveal delay={0.1}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.img}`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <h2 className="text-3xl font-semibold tracking-tight">{feature.title}</h2>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <p className="text-lg text-zinc-400 leading-relaxed">{feature.desc}</p>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.2} className="flex-1 w-full aspect-video rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
                  <div className={`absolute inset-0 opacity-20 ${feature.img} blur-3xl rounded-full scale-150`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <feature.icon className={`w-16 h-16 ${feature.color} opacity-80`} />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
