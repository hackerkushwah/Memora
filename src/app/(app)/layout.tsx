"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { QuickCaptureFab } from "@/components/QuickCaptureFab";
import { SearchModal } from "@/components/SearchModal";
import { useSupabaseSession } from "@/lib/useSupabaseSession";
import { redirect } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isLoading } = useSupabaseSession();

  if (!isLoading && !user) {
    redirect("/");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex overflow-hidden">
      {/* Desktop Sidebar */}
      <AppSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <AppHeader 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      <QuickCaptureFab />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
