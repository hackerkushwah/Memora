import { articles } from "@/data/articles";
import { CursorGlow } from "@/components/CursorGlow";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);
  
  if (!article) return { title: "Not Found" };
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Simple markdown-like parser to render headings and paragraphs
  const renderContent = (content: string) => {
    return content.split('\\n\\n').map((block, index) => {
      block = block.trim();
      if (!block) return null;
      
      if (block.startsWith('# ')) {
        return <h1 key={index} className="text-4xl md:text-5xl font-serif text-white mt-12 mb-6">{block.replace('# ', '')}</h1>;
      }
      if (block.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-serif text-white mt-10 mb-4">{block.replace('## ', '')}</h2>;
      }
      if (block.startsWith('1. ')) {
        // It's a list. Let's just wrap it in a div and preserve whitespace for simple rendering
        return (
          <div key={index} className="pl-5 space-y-2 text-white/80 leading-relaxed my-6">
            {block.split('\\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        );
      }
      return <p key={index} className="text-white/80 text-lg leading-relaxed mb-6">{block}</p>;
    });
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-start bg-pure-black overflow-hidden pt-24 pb-20">
      <div className="noise-overlay" />
      <CursorGlow />
      
      <div className="w-full max-w-3xl mx-auto px-6 relative z-10">
        
        <Link 
          href="/resources"
          className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resources</span>
        </Link>

        <article className="glassmorphism p-8 md:p-12 rounded-3xl">
          <header className="mb-10 pb-10 border-b border-white/10">
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 font-medium">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">M</div>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </header>

          <div className="article-content">
            {renderContent(article.content)}
          </div>
        </article>
      </div>
    </main>
  );
}
