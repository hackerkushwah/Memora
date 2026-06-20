import { CursorGlow } from "@/components/CursorGlow";
import { articles } from "@/data/articles";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

export const metadata = {
  title: "Resources & Articles",
  description: "Read our articles on memory preservation, digital minimalism, and personal knowledge management.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black overflow-hidden pt-24 pb-20">
      <div className="noise-overlay" />
      <CursorGlow />
      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
            Memora <span className="font-cursive text-white/80 font-light">Resources</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Insights on digital minimalism, memory preservation, and the psychology behind why we hold on to the past.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/resources/${article.slug}`}
              className="group block"
            >
              <article className="glassmorphism rounded-2xl p-6 h-full flex flex-col hover:bg-white/[0.05] transition-all border border-white/5 hover:border-white/20">
                <div className="flex items-center space-x-2 text-white/40 text-xs mb-4 uppercase tracking-wider font-medium">
                  <span className="bg-white/10 px-2 py-1 rounded-md text-white/80">{article.date}</span>
                </div>
                
                <h2 className="text-2xl font-serif text-white mb-3 group-hover:text-white/80 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-white/60 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-4 mt-auto">
                  <div className="flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
