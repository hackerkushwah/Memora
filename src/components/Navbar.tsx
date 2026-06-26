"use client";

import { Crown, LogIn, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useSupabaseSession } from "@/lib/useSupabaseSession";
import { supabaseClient } from "@/lib/supabase-client";
import Link from "next/link";

export function Navbar({ onUploadClick }: { onUploadClick?: () => void }) {
  const { user } = useSupabaseSession();

  const handleSignIn = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-40 px-3 sm:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between glassmorphism rounded-full px-4 sm:px-6 py-3">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] [filter:drop-shadow(0_0_8px_rgba(212,175,55,0.4))]" />
          <div className="flex flex-col">
            <h1 className="font-serif text-base sm:text-lg tracking-widest text-white text-glow font-bold uppercase">
              Memora
            </h1>
            <span className="text-[0.6rem] sm:text-xs text-zinc-400 tracking-[0.2em] uppercase mt-0.5">
              Proof That We Lived
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {onUploadClick ? (
            <button
              onClick={onUploadClick}
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-500 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm shrink-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">+ Vault Memory</span>
              <span className="sm:hidden">+ Vault</span>
            </button>
          ) : (
            <Link
              href="/"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-500 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm shrink-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">+ Vault Memory</span>
              <span className="sm:hidden">+ Vault</span>
            </Link>
          )}
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/profile" className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors">
                <img src={user.user_metadata?.avatar_url || ""} alt="Profile" className="w-8 h-8 rounded-full border border-white/20" />
              </Link>
              <button
                onClick={() => supabaseClient.auth.signOut()}
                className="text-zinc-400 hover:text-red-400 transition-colors p-2"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-2 bg-[#D4AF37] text-black hover:bg-white transition-all duration-500 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
