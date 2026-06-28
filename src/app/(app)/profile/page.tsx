"use client";

import { useSupabaseSession } from "@/lib/useSupabaseSession";
import { useEffect, useState } from "react";
import { ClientMemory } from "@/lib/data";
import { getMyMemories } from "@/actions/memory-actions";
import { MemoryVault } from "@/components/MemoryVault";
import { Loader2, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoading } = useSupabaseSession();
  const [myMemories, setMyMemories] = useState<ClientMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else if (user?.email) {
        // Security: Use getMyMemories which filters server-side and strips sensitive fields
        getMyMemories().then((memories) => {
          setMyMemories(memories);
          setLoading(false);
        });
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => router.push("/")} 
          className="mb-8 flex items-center gap-2 text-zinc-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Go Back</span>
        </button>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16 bg-zinc-900/40 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Profile" className="relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.2)] object-cover" />
          ) : (
            <div className="relative z-10 w-28 h-28 md:w-32 md:h-32 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <User className="w-12 h-12 text-zinc-400" />
            </div>
          )}
          
          <div className="text-center md:text-left relative z-10">
            <h3 className="font-cursive text-2xl md:text-3xl text-[#D4AF37] mb-1 -rotate-2">Welcome back,</h3>
            <h1 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500 tracking-wide mb-2 text-glow">
              {user?.user_metadata?.full_name || user?.user_metadata?.name || "Vault Member"}
            </h1>
            <p className="text-zinc-400 font-sans tracking-[0.2em] uppercase text-xs md:text-sm bg-black/20 inline-block px-4 py-1.5 rounded-full border border-white/5">
              {user?.email}
            </p>
          </div>
          
          <div className="md:ml-auto text-center relative z-10 bg-black/40 px-8 py-6 rounded-3xl border border-white/5 backdrop-blur-sm">
            <div className="text-5xl font-serif text-[#D4AF37] mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">{myMemories.length}</div>
            <div className="text-xs text-white/70 uppercase tracking-widest font-bold">Stacks Vaulted</div>
          </div>
        </div>

        {/* User's Stacks */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-white flex items-center gap-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Your Legacy</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/50 via-zinc-800 to-transparent ml-4" />
          </h2>
          
          {myMemories.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-zinc-800 rounded-2xl">
              <p className="text-zinc-500">You haven't vaulted any memories yet.</p>
            </div>
          ) : (
            <div className="pt-6">
              <MemoryVault memories={myMemories} />
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
