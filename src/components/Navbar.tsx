"use client";

import { Crown, LogIn, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSupabaseSession } from "@/lib/useSupabaseSession";
import { supabaseClient } from "@/lib/supabase-client";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Product Features", href: "/features" },
  { label: "How Memora Works", href: "/how-it-works" },
  { label: "Resource Center", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar({ onUploadClick }: { onUploadClick?: () => void }) {
  const { user } = useSupabaseSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 z-50">
            <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] [filter:drop-shadow(0_0_8px_rgba(212,175,55,0.4))]" />
            <div className="flex flex-col">
              <h1 className="font-serif text-lg tracking-widest text-white text-glow font-bold uppercase">
                Memora&reg;
              </h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {onUploadClick ? (
              <button
                onClick={onUploadClick}
                className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 px-5 py-2 rounded-full font-medium text-sm"
              >
                + Vault Memory
              </button>
            ) : null}
            
            {user ? (
              <div className="flex items-center gap-3">
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
                className="bg-[#D4AF37] text-black hover:bg-white transition-all duration-300 px-6 py-2 rounded-full font-semibold text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                Get Started Free
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-2xl font-serif">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-[#D4AF37] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-12">
              {!user && (
                <button
                  onClick={() => {
                    handleSignIn();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#D4AF37] text-black hover:bg-white transition-all duration-300 px-6 py-4 rounded-xl font-semibold text-lg shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                  Get Started Free
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
