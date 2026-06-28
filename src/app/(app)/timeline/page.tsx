import { getMyMemories } from "@/actions/memory-actions";

import { Image as ImageIcon, Calendar, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  const memories = await getMyMemories();
  
  // Sort memories by date descending
  const sortedMemories = [...memories].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <header className="text-center sm:text-left">
        <h1 className="font-serif text-4xl md:text-5xl text-white">Timeline</h1>
        <p className="text-white/50 mt-3 text-lg">A chronological journey through your preserved memories.</p>
      </header>

      {sortedMemories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-[#0A0A0A] rounded-3xl">
          <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-medium text-white mb-2">Your timeline is empty</h2>
          <p className="text-white/40 max-w-sm">Capture your first memory to start building your chronological legacy.</p>
        </div>
      ) : (
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-16 py-8">
          {sortedMemories.map((memory, index) => {
            let dateStr = "Unknown Date";
            if (memory.date) {
              const d = new Date(memory.date);
              dateStr = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(d);
            }
            
            return (
              <div key={memory.id} className="relative pl-8 sm:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-[10px] h-[10px] rounded-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:scale-150 transition-transform duration-300" />
                
                <div className="mb-4">
                  <span className="text-[#D4AF37] font-medium tracking-wider text-sm uppercase flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {dateStr}
                  </span>
                </div>
                
                <div className="bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors rounded-3xl overflow-hidden flex flex-col md:flex-row group-hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)]">
                  {memory.thumbnailUrl ? (
                    <div className="md:w-1/3 aspect-video md:aspect-auto relative overflow-hidden">
                      <img 
                        src={memory.thumbnailUrl} 
                        alt={memory.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {memory.imageUrls && memory.imageUrls.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-1 rounded border border-white/10">
                          +{memory.imageUrls.length - 1}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="md:w-1/3 aspect-video md:aspect-auto bg-zinc-900 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-zinc-700" />
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                    {memory.category && (
                      <div className="mb-3">
                        <span className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-white/70 uppercase tracking-wider">
                          {memory.category}
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-serif text-white mb-3">{memory.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">{memory.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
