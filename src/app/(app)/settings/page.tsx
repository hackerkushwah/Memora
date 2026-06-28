"use client";

import { useSupabaseSession } from "@/lib/useSupabaseSession";

export default function SettingsPage() {
  const { user } = useSupabaseSession();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl text-white">Settings</h1>
        <p className="text-white/50 mt-2">Manage your account and preferences.</p>
      </header>

      <div className="max-w-2xl bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 sm:p-10">
        <h2 className="text-xl font-medium mb-6">Account Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-white/50 mb-2">Email Address</label>
            <input 
              type="text" 
              disabled 
              value={user?.email || "Loading..."} 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70"
            />
            <p className="text-xs text-[#D4AF37] mt-2">Connected via Google SSO</p>
          </div>

          <div>
            <label className="block text-sm text-white/50 mb-2">Data Export</label>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-sm text-white">
              Request Full Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
