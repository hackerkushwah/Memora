import { getMemories } from "@/actions/memory-actions";
import { MemoryVault } from "@/components/MemoryVault";

export default async function DashboardPage() {
  const memories = await getMemories();
  const safeMemories = memories.map(({ passwordHash, ownerEmail, ...safe }) => safe);

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-white">Welcome back</h1>
          <p className="text-white/50 mt-1">Here is a look at your recent memories.</p>
        </div>
      </header>
      
      {/* Stats Widgets can go here */}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Recent Memories</h2>
        </div>
        <MemoryVault memories={safeMemories} />
      </section>
    </div>
  );
}
