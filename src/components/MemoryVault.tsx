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

  if (memories.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto pt-12 pb-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">Welcome to Memora</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">Your vault is currently empty. Start building your digital legacy by capturing your first memory today.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Create First Memory Card */}
          <div 
            onClick={() => setIsUploadOpen(true)}
            className="group cursor-pointer bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium mb-2">Create new memory</h3>
            <p className="text-sm text-zinc-400">Upload photos, write a journal entry, or save a milestone.</p>
          </div>

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
        </div>

        {/* Example Memories Section */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <Compass className="w-5 h-5 text-zinc-500" />
            <h3 className="text-lg font-medium text-zinc-300">Inspiration</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-xl border border-white/5 bg-white/5 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <ImageIcon className="w-8 h-8 text-white/20 absolute z-10" />
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="w-16 h-2 bg-white/20 rounded mb-2" />
                  <div className="w-24 h-2 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6">
        {memories.map((memory, index) => (
          <Link key={memory.id} href={`/memory/${memory.id}`} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              className="relative cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A]">
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
          </Link>
        ))}
      </div>
    </>
  );
}
