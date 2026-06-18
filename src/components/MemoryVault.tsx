"use client";

import { ClientMemory } from "@/lib/data";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";

interface Props {
  memories: ClientMemory[];
}

export function MemoryVault({ memories }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {memories.map((memory, index) => (
          <Link key={memory.id} href={`/memory/${memory.id}`} className="block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10">
                {memory.imageUrls && memory.imageUrls.length > 1 && (
                  <div className="absolute top-3 right-3 z-10 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 rounded border border-white/20">
                    +{memory.imageUrls.length - 1} Photos
                  </div>
                )}
                <img
                  src={memory.thumbnailUrl}
                  alt={memory.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform-gpu grayscale opacity-70 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 pointer-events-none">
                  <h3 className="text-white text-glow font-serif text-lg tracking-wide">
                    {memory.title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-sans flex items-center justify-between mt-1">
                    <span>{memory.uploadedBy}</span>
                    <Lock className="w-3 h-3 text-zinc-500" />
                  </p>
                  {memory.category && (
                    <span className="mt-3 inline-block bg-white/10 border border-white/20 px-2 py-0.5 rounded text-[10px] font-semibold text-white uppercase tracking-wider w-max">
                      {memory.category}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Stack Info Below */}
              <div className="mt-4 px-1">
                <h3 className="text-white font-serif text-lg truncate group-hover:text-[#D4AF37] transition-colors">{memory.title}</h3>
                {memory.description && (
                  <p className="text-zinc-400 text-sm line-clamp-2 mt-1.5 leading-relaxed">
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
