"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, X, Loader2, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMyMemories } from "@/actions/memory-actions";
import Link from "next/link";

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [memories, setMemories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getMyMemories().then(data => {
        setMemories(data);
        setLoading(false);
      });
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredMemories = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return memories.filter(m => 
      m.title?.toLowerCase().includes(lowerQuery) ||
      m.description?.toLowerCase().includes(lowerQuery) ||
      m.category?.toLowerCase().includes(lowerQuery) ||
      (m.tags && m.tags.some((t: string) => t.toLowerCase().includes(lowerQuery)))
    );
  }, [query, memories]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/5 shrink-0">
              <Search className="w-5 h-5 text-white/40 mr-3" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search memories, locations, tags..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 text-lg"
              />
              <button onClick={onClose} className="p-1 rounded-md text-white/40 hover:bg-white/10 hover:text-white transition-colors ml-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1">
              {loading && !memories.length ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
                </div>
              ) : query.trim() === "" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-white/40">
                  <Search className="w-10 h-10 mb-4 opacity-20" />
                  <p>Start typing to search your vault.</p>
                </div>
              ) : filteredMemories.length > 0 ? (
                <div className="space-y-2">
                  {filteredMemories.map(memory => (
                    <Link
                      key={memory.id}
                      href={`/memory/${memory.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-black border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {memory.thumbnailUrl ? (
                          <img src={memory.thumbnailUrl} alt={memory.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-white/20" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate group-hover:text-[#D4AF37] transition-colors">{memory.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-white/50 mt-1 truncate">
                          {memory.category && <span className="bg-white/10 px-1.5 py-0.5 rounded">{memory.category}</span>}
                          {memory.description && <span className="truncate">{memory.description}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-white/40">
                  <p>No memories found matching "{query}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
