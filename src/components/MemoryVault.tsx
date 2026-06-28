"use client";

import { ClientMemory } from "@/lib/data";
import { motion } from "framer-motion";
import { Lock, Plus, BookOpen, Compass, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UploadModal } from "@/components/UploadModal";

interface Props {
  memories: ClientMemory[];
}

export function MemoryVault({ memories }: Props) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const demoMemories: ClientMemory[] = [
    { id: "d1", title: "Our Wedding Day", description: "The most magical day of our lives. Surrounded by family and friends under the old oak tree.", category: "✨ Forever", imageUrls: ["/demo1.jpg"], thumbnailUrl: "/demo1.jpg", uploadedBy: "demo", date: "2026-06-28" },
    { id: "d2", title: "Trip to Kyoto", description: "Walking through the bamboo forest at dawn. The light was incredible.", category: "✈️ Travel", imageUrls: ["/demo2.jpg"], thumbnailUrl: "/demo2.jpg", uploadedBy: "demo", date: "2026-06-28" },
    { id: "d3", title: "College Graduation", description: "Four years of hard work finally paid off. Mom and Dad were so proud.", category: "🎓 College", imageUrls: ["/demo3.jpg"], thumbnailUrl: "/demo3.jpg", uploadedBy: "demo", date: "2026-06-28" },
    { id: "d4", title: "First Apartment", description: "It's small and the heater barely works, but it's ours.", category: "📸 Moments", imageUrls: ["/demo4.jpg"], thumbnailUrl: "/demo4.jpg", uploadedBy: "demo", date: "2026-06-28" }
  ];

  if (memories.length === 0 && !isDemoMode) {
    return (
      <div className="w-full max-w-5xl mx-auto pt-12 pb-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">Welcome to Memora</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">Your vault is currently empty. Start building your digital legacy by capturing your first memory today.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="w-full md:w-auto px-8 py-4 bg-[#D4AF37] text-black font-medium rounded-full hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <Plus className="w-5 h-5" />
            Upload First Memory
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Quick Start Guide */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 flex flex-col justify-center min-h-[300px]">
            <h3 className="text-lg font-medium mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-zinc-400" /> Quick Start Guide</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Upload Media</p>
                  <p className="text-xs text-zinc-500">Add up to 10 photos or videos per memory.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Add Context</p>
                  <p className="text-xs text-zinc-500">Write the story behind the moment.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">Categorize</p>
                  <p className="text-xs text-zinc-500">Use tags to easily find it later.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/5 rounded-2xl p-8 flex flex-col justify-center min-h-[300px]">
             <h3 className="text-lg font-medium mb-4">A blank canvas for your life.</h3>
             <p className="text-zinc-400 text-sm leading-relaxed mb-6">Memora is designed to be intentional. There is no auto-sync cluttering your vault with screenshots and receipts. Every memory here is one you chose to preserve.</p>
             <div className="w-full h-px bg-white/10 mb-6" />
             <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Ready when you are.</p>
          </div>
        </div>

        <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      </div>
    );
  }

  const displayMemories = isDemoMode ? demoMemories : memories;

  return (
    <>
      {isDemoMode && (
        <div className="w-full bg-[#0A0A0A] border-b border-white/10 p-4 mb-8 flex flex-col sm:flex-row items-center justify-between px-6 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-300">You are viewing the Demo Vault</span>
          </div>
          <button onClick={() => setIsDemoMode(false)} className="text-sm text-zinc-400 hover:text-white mt-4 sm:mt-0 underline underline-offset-4">
            Exit Demo
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6">
        {displayMemories.map((memory, index) => {
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              className="relative cursor-pointer flex flex-col h-full group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] group-hover:border-white/10">
                {memory.imageUrls && memory.imageUrls.length > 1 && (
                  <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded border border-white/10">
                    +{memory.imageUrls.length - 1}
                  </div>
                )}
                {memory.thumbnailUrl ? (
                  <img
                    src={memory.thumbnailUrl}
                    alt={memory.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform-gpu transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <ImageIcon className="w-8 h-8 text-zinc-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Overlay Info on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    {memory.category && (
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded text-[10px] font-semibold text-white uppercase tracking-wider">
                        {memory.category}
                      </span>
                    )}
                    <Lock className="w-3 h-3 text-zinc-400 ml-auto" />
                  </div>
                </div>
              </div>
              
              {/* Stack Info Below */}
              <div className="mt-4 px-1 flex-grow">
                <h3 className="text-white font-medium text-lg leading-tight group-hover:text-zinc-300 transition-colors">{memory.title}</h3>
                {memory.description && (
                  <p className="text-zinc-500 text-sm line-clamp-2 mt-2 leading-relaxed">
                    {memory.description}
                  </p>
                )}
              </div>
            </motion.div>
          );

          if (isDemoMode || memory.id.startsWith("d")) {
            return (
              <div key={memory.id} onClick={() => alert("Please sign up to view full memory details in your own vault!")} className="block group">
                {content}
              </div>
            );
          }

          return (
            <Link key={memory.id} href={`/memory/${memory.id}`} className="block group">
              {content}
            </Link>
          );
        })}
      </div>
    </>
  );
}
