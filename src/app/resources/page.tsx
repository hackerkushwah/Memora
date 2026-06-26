import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Resource Center",
  description: "Expert insights on digital organization, AI, and preserving personal history.",
};

const ARTICLES = [
  {
    "slug": "digital-decluttering-guide",
    "title": "The Ultimate Guide to Digital Decluttering in 2026",
    "category": "Digital Organization"
  },
  {
    "slug": "ai-memory-organization",
    "title": "How AI is Changing the Way We Organize Memories",
    "category": "AI"
  },
  {
    "slug": "productivity-vs-permanence",
    "title": "Productivity vs Permanence: Finding the Balance",
    "category": "Productivity"
  },
  {
    "slug": "building-a-second-brain",
    "title": "Building a Second Brain for Your Personal Life",
    "category": "Personal Knowledge"
  },
  {
    "slug": "psychology-of-digital-hoarding",
    "title": "The Psychology of Digital Hoarding",
    "category": "Memory"
  },
  {
    "slug": "legacy-planning-digital-assets",
    "title": "Legacy Planning: What Happens to Your Digital Assets?",
    "category": "Digital Organization"
  },
  {
    "slug": "semantic-search-explained",
    "title": "Semantic Search Explained: Finding What You Feel",
    "category": "AI"
  },
  {
    "slug": "journaling-for-mental-clarity",
    "title": "Journaling for Mental Clarity and Emotional Permanence",
    "category": "Memory"
  },
  {
    "slug": "future-of-cloud-storage",
    "title": "The Future of Cloud Storage is Zero-Knowledge",
    "category": "Digital Organization"
  },
  {
    "slug": "cognitive-offloading",
    "title": "Cognitive Offloading: Why You Shouldn't Rely on Your Brain",
    "category": "Personal Knowledge"
  },
  {
    "slug": "preserving-family-history",
    "title": "How to Preserve Your Family History Digitally",
    "category": "Memory"
  },
  {
    "slug": "minimalist-digital-workflow",
    "title": "A Minimalist Digital Workflow for Creatives",
    "category": "Productivity"
  },
  {
    "slug": "metadata-matters",
    "title": "Why Metadata Matters More Than the Photo Itself",
    "category": "Digital Organization"
  },
  {
    "slug": "overcoming-photo-fatigue",
    "title": "Overcoming Photo Fatigue in the Smartphone Era",
    "category": "Productivity"
  },
  {
    "slug": "the-ethics-of-ai-memories",
    "title": "The Ethics of AI in Personal Memory Management",
    "category": "AI"
  }
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Resource Center</h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Expert insights on digital organization, AI, and preserving personal history.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article, i) => (
              <Link key={i} href={"/resources/" + article.slug} className="group bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-4 block">{article.category}</span>
                <h3 className="text-xl font-medium mb-4 group-hover:text-zinc-300 transition-colors">{article.title}</h3>
                <div className="text-sm text-zinc-500 flex items-center justify-between">
                  <span>Read Article &rarr;</span>
                  <span>5 min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
