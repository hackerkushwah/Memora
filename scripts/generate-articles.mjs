import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src', 'app', 'resources');

if (!fs.existsSync(SRC_DIR)) {
  fs.mkdirSync(SRC_DIR, { recursive: true });
}

const articles = [
  { slug: "digital-decluttering-guide", title: "The Ultimate Guide to Digital Decluttering in 2026", category: "Digital Organization" },
  { slug: "ai-memory-organization", title: "How AI is Changing the Way We Organize Memories", category: "AI" },
  { slug: "productivity-vs-permanence", title: "Productivity vs Permanence: Finding the Balance", category: "Productivity" },
  { slug: "building-a-second-brain", title: "Building a Second Brain for Your Personal Life", category: "Personal Knowledge" },
  { slug: "psychology-of-digital-hoarding", title: "The Psychology of Digital Hoarding", category: "Memory" },
  { slug: "legacy-planning-digital-assets", title: "Legacy Planning: What Happens to Your Digital Assets?", category: "Digital Organization" },
  { slug: "semantic-search-explained", title: "Semantic Search Explained: Finding What You Feel", category: "AI" },
  { slug: "journaling-for-mental-clarity", title: "Journaling for Mental Clarity and Emotional Permanence", category: "Memory" },
  { slug: "future-of-cloud-storage", title: "The Future of Cloud Storage is Zero-Knowledge", category: "Digital Organization" },
  { slug: "cognitive-offloading", title: "Cognitive Offloading: Why You Shouldn't Rely on Your Brain", category: "Personal Knowledge" },
  { slug: "preserving-family-history", title: "How to Preserve Your Family History Digitally", category: "Memory" },
  { slug: "minimalist-digital-workflow", title: "A Minimalist Digital Workflow for Creatives", category: "Productivity" },
  { slug: "metadata-matters", title: "Why Metadata Matters More Than the Photo Itself", category: "Digital Organization" },
  { slug: "overcoming-photo-fatigue", title: "Overcoming Photo Fatigue in the Smartphone Era", category: "Productivity" },
  { slug: "the-ethics-of-ai-memories", title: "The Ethics of AI in Personal Memory Management", category: "AI" }
];

const indexContent = 'import { Navbar } from "@/components/Navbar";\n' +
'import Link from "next/link";\n' +
'\n' +
'export const metadata = {\n' +
'  title: "Resource Center",\n' +
'  description: "Expert insights on digital organization, AI, and preserving personal history.",\n' +
'};\n' +
'\n' +
'const ARTICLES = ' + JSON.stringify(articles, null, 2) + ';\n' +
'\n' +
'export default function ResourcesPage() {\n' +
'  return (\n' +
'    <>\n' +
'      <Navbar />\n' +
'      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">\n' +
'        <div className="max-w-5xl mx-auto px-6">\n' +
'          <div className="mb-20 text-center">\n' +
'            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Resource Center</h1>\n' +
'            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Expert insights on digital organization, AI, and preserving personal history.</p>\n' +
'          </div>\n' +
'\n' +
'          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">\n' +
'            {ARTICLES.map((article, i) => (\n' +
'              <Link key={i} href={"/resources/" + article.slug} className="group bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">\n' +
'                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-4 block">{article.category}</span>\n' +
'                <h3 className="text-xl font-medium mb-4 group-hover:text-zinc-300 transition-colors">{article.title}</h3>\n' +
'                <div className="text-sm text-zinc-500 flex items-center justify-between">\n' +
'                  <span>Read Article &rarr;</span>\n' +
'                  <span>5 min read</span>\n' +
'                </div>\n' +
'              </Link>\n' +
'            ))}\n' +
'          </div>\n' +
'        </div>\n' +
'      </main>\n' +
'    </>\n' +
'  );\n' +
'}\n';

fs.writeFileSync(path.join(SRC_DIR, 'page.tsx'), indexContent);

const lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\nNeque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?\n\nQuis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\nEt harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.\n\nItaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

articles.forEach(article => {
  const articleDir = path.join(SRC_DIR, article.slug);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }

  const p1 = lipsum.split("\\n\\n")[0] || lipsum;
  const p2 = lipsum.split("\\n\\n")[1] || lipsum;
  const p3 = lipsum.split("\\n\\n")[2] || lipsum;
  const p4 = lipsum.split("\\n\\n")[3] || lipsum;
  const p5 = lipsum.split("\\n\\n")[4] || lipsum;

  const content = 'import { Navbar } from "@/components/Navbar";\n' +
'\n' +
'export const metadata = {\n' +
'  title: ' + JSON.stringify(article.title) + ',\n' +
'  description: "A comprehensive guide on " + ' + JSON.stringify(article.title.toLowerCase()) + ' + " from the Memora experts.",\n' +
'};\n' +
'\n' +
'export default function ArticlePage() {\n' +
'  const schema = {\n' +
'    "@context": "https://schema.org",\n' +
'    "@type": "Article",\n' +
'    "headline": ' + JSON.stringify(article.title) + ',\n' +
'    "author": {\n' +
'      "@type": "Organization",\n' +
'      "name": "Memora"\n' +
'    },\n' +
'    "publisher": {\n' +
'      "@type": "Organization",\n' +
'      "name": "Memora",\n' +
'      "logo": {\n' +
'        "@type": "ImageObject",\n' +
'        "url": "https://memora.app/icon.png"\n' +
'      }\n' +
'    },\n' +
'    "datePublished": "2026-06-26",\n' +
'    "dateModified": "2026-06-26"\n' +
'  };\n' +
'\n' +
'  return (\n' +
'    <>\n' +
'      <Navbar />\n' +
'      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">\n' +
'        <script\n' +
'          type="application/ld+json"\n' +
'          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}\n' +
'        />\n' +
'        <article className="max-w-3xl mx-auto px-6">\n' +
'          <header className="mb-12">\n' +
'            <div className="flex items-center gap-4 text-sm font-medium text-zinc-500 mb-6">\n' +
'              <span className="text-[#D4AF37]">' + article.category + '</span>\n' +
'              <span>•</span>\n' +
'              <span>5 min read</span>\n' +
'            </div>\n' +
'            <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight mb-8">\n' +
'              ' + article.title + '\n' +
'            </h1>\n' +
'            <div className="w-full h-px bg-white/10" />\n' +
'          </header>\n' +
'\n' +
'          <div className="prose prose-invert prose-lg max-w-none text-zinc-300 prose-headings:text-white prose-a:text-[#D4AF37]">\n' +
'            <p className="lead text-xl text-zinc-400 mb-8">\n' +
'              This comprehensive article dives deep into the nuances of ' + article.title.toLowerCase() + ', exploring the psychology, the technology, and the practical steps you can take today.\n' +
'            </p>\n' +
'            \n' +
'            <h2>Table of Contents</h2>\n' +
'            <ul>\n' +
'              <li><a href="#introduction">Introduction</a></li>\n' +
'              <li><a href="#core-concepts">Core Concepts</a></li>\n' +
'              <li><a href="#practical-application">Practical Application</a></li>\n' +
'              <li><a href="#conclusion">Conclusion</a></li>\n' +
'            </ul>\n' +
'\n' +
'            <h2 id="introduction">Introduction</h2>\n' +
'            <p>' + p1 + '</p>\n' +
'            <p>' + p2 + '</p>\n' +
'\n' +
'            <h2 id="core-concepts">Core Concepts</h2>\n' +
'            <p>' + p3 + '</p>\n' +
'            <p>' + p4 + '</p>\n' +
'\n' +
'            <h2 id="practical-application">Practical Application</h2>\n' +
'            <p>' + p5 + '</p>\n' +
'            <p>' + p1 + '</p>\n' +
'            \n' +
'            <h2 id="conclusion">Conclusion</h2>\n' +
'            <p>In conclusion, mastering these principles will transform how you interact with your digital life. Preserving your memories deliberately ensures they outlast the fleeting nature of modern platforms.</p>\n' +
'          </div>\n' +
'        </article>\n' +
'      </main>\n' +
'    </>\n' +
'  );\n' +
'}\n';

  fs.writeFileSync(path.join(articleDir, 'page.tsx'), content);
});

console.log('Successfully generated resources pages.');
