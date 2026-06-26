import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Why Memora?",
  description: "The philosophy behind why we built a dedicated space for memories.",
};

export default function WhyMemoraPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-20">
            <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-8">The Philosophy of Memory</h1>
            <div className="w-20 h-1 bg-white/20 mb-8" />
            <p className="text-xl text-zinc-400 leading-relaxed">
              We take more photos than any generation in history, yet we remember less. Our digital lives are scattered across generic cloud drives, social media feeds, and forgotten hard drives.
            </p>
          </div>

          <article className="prose prose-invert prose-lg max-w-none text-zinc-300">
            <h2 className="text-3xl font-semibold text-white mt-12 mb-6">The Problem with "The Cloud"</h2>
            <p>
              Traditional cloud storage was built for files, not feelings. When you upload a photo of your wedding alongside your tax returns and PDF receipts, the context is lost. The cloud is a filing cabinet, not a photo album.
            </p>

            <h2 className="text-3xl font-semibold text-white mt-12 mb-6">The Problem with Social Media</h2>
            <p>
              Social media was built for performance, not permanence. We curate our lives for an audience, optimizing for engagement rather than truth. When the platform dies, or the algorithm changes, our memories are held hostage.
            </p>

            <h2 className="text-3xl font-semibold text-white mt-12 mb-6">Our Solution</h2>
            <p>
              Memora is a dedicated space. It is a digital sanctuary where you are the only audience. We built this because we believe that human memory is fragile, and the technology we use to preserve it should be deliberate, secure, and beautiful.
            </p>
            <p>
              When you open Memora, you shouldn't feel like you're opening a spreadsheet. You should feel like you're opening a cherished leather-bound journal.
            </p>
          </article>
        </div>
      </main>
    </>
  );
}
