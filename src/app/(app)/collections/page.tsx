import { getMemories } from "@/actions/memory-actions";
import { Folder, Image as ImageIcon } from "lucide-react";
import { MemoryVault } from "@/components/MemoryVault";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const memories = await getMemories();
  
  // Group memories by category
  const categoriesMap = new Map<string, typeof memories>();
  
  memories.forEach(memory => {
    const cat = memory.category || "Uncategorized";
    if (!categoriesMap.has(cat)) {
      categoriesMap.set(cat, []);
    }
    categoriesMap.get(cat)!.push(memory);
  });
  
  const collections = Array.from(categoriesMap.entries()).map(([name, items]) => {
    // Find the first memory with a thumbnail to use as cover
    const coverMemory = items.find(m => m.thumbnailUrl);
    return {
      name,
      count: items.length,
      cover: coverMemory?.thumbnailUrl || null,
      memories: items
    };
  });

  return (
    <div className="space-y-12">
      <header className="text-center sm:text-left">
        <h1 className="font-serif text-4xl md:text-5xl text-white">Collections</h1>
        <p className="text-white/50 mt-3 text-lg">Your memories, beautifully organized by theme.</p>
      </header>

      {collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-[#0A0A0A] rounded-3xl">
          <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
            <Folder className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-medium text-white mb-2">No collections yet</h2>
          <p className="text-white/40 max-w-sm">When you upload memories with tags, they will automatically be grouped here.</p>
        </div>
      ) : (
        <div className="space-y-20">
          {collections.map((collection) => (
            <section key={collection.name} className="space-y-6">
              <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-2xl font-serif text-white">{collection.name}</h2>
                  <p className="text-white/50 text-sm mt-1">{collection.count} {collection.count === 1 ? 'memory' : 'memories'}</p>
                </div>
              </div>
              <MemoryVault memories={collection.memories.map(({ passwordHash, ownerEmail, ...safe }) => safe)} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
