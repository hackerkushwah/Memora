import { Navbar } from "@/components/Navbar";
import { BookOpen, UploadCloud, Shield, Lock, Wrench, Mail } from "lucide-react";

export const metadata = {
  title: "Help Center",
  description: "Get support and learn how to make the most of Memora.",
};

const CATEGORIES = [
  { icon: BookOpen, title: "Getting Started", desc: "Learn the basics of creating your vault and navigating the interface." },
  { icon: UploadCloud, title: "Uploading Media", desc: "Supported formats, bulk uploads, and organization tips." },
  { icon: Shield, title: "Security", desc: "How we encrypt and protect your most valuable memories." },
  { icon: Lock, title: "Privacy", desc: "Our zero-knowledge architecture and data policies." },
  { icon: Wrench, title: "Troubleshooting", desc: "Solutions for common issues and errors." },
  { icon: Mail, title: "Contact Support", desc: "Get in touch with our human support team." }
];

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">How can we help?</h1>
            <p className="text-zinc-400 text-lg">Search our knowledge base or browse categories below.</p>
            <div className="mt-8 max-w-xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Search for answers..." 
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-full px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer">
                <cat.icon className="w-6 h-6 text-zinc-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">{cat.title}</h3>
                <p className="text-sm text-zinc-500">{cat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">Still need help?</h2>
            <p className="text-zinc-400 mb-6">Our support team is available 24/7 to assist you.</p>
            <button className="px-6 py-3 bg-white text-black rounded-full font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
