"use client";

import { useState } from "react";
import { MemoryVault } from "@/components/MemoryVault";
import { ClientMemory } from "@/lib/data";

interface Collection {
  name: string;
  count: number;
  cover: string | null;
  memories: ClientMemory[];
}

export function CollectionsClient({ collections }: { collections: Collection[] }) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", ...collections.map(c => c.name)];

  return (
    <div className="space-y-12">
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar border-b border-white/5 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab 
                ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20" 
                : "text-white/50 border border-transparent hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render Collections */}
      <div className="space-y-20">
        {collections
          .filter(c => activeTab === "All" || activeTab === c.name)
          .map((collection) => (
          <section key={collection.name} className="space-y-6">
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-serif text-white">{collection.name}</h2>
                <p className="text-white/50 text-sm mt-1">{collection.count} {collection.count === 1 ? 'memory' : 'memories'}</p>
              </div>
            </div>
            <MemoryVault memories={collection.memories} />
          </section>
        ))}
      </div>
    </div>
  );
}
