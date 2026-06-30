export const metadata = {
  title: "How It Works",
  description: "Learn the three-step process to permanently preserving your memories.",
};

import Image from "next/image";

export default function HowItWorksPage() {
  return (
    <>
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">How Memora Works</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">A seamless workflow designed to get out of your way.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />

            <div className="space-y-24">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#050505] items-center justify-center z-10" />
                <div className="md:w-32 flex-shrink-0 text-zinc-500 font-medium md:text-right pt-1">01 / Capture</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Upload from anywhere</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">Drop your photos, videos, or audio recordings into Memora. Our edge network uploads your files securely and instantly encrypts them on your device.</p>
                  <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-white/10">
                    <Image src="/capture-mockup.png" alt="Memora Upload Interface" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#050505] items-center justify-center z-10" />
                <div className="md:w-32 flex-shrink-0 text-zinc-500 font-medium md:text-right pt-1">02 / Enrich</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Add the context</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">A photo without context loses its meaning over time. Add the location, the people you were with, and a journal entry describing how you felt.</p>
                  <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-white/10">
                    <Image src="/enrich-mockup.png" alt="Memora Metadata Enrichment" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#050505] items-center justify-center z-10" />
                <div className="md:w-32 flex-shrink-0 text-zinc-500 font-medium md:text-right pt-1">03 / Relive</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Find it instantly</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">Years later, simply search for "Paris rain" or "Sarah's birthday". Memora understands the context of your memories and surfaces exactly what you're looking for.</p>
                  <div className="w-full aspect-video relative rounded-xl overflow-hidden border border-white/10">
                    <Image src="/relive-mockup.png" alt="Memora Semantic Search" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
