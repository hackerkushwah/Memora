export const metadata = {
  title: "Changelog",
  description: "Recent updates and improvements to the Memora platform.",
};

export default function ChangelogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Changelog - Memora"
  };

  return (
    <>
      <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-20">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Changelog</h1>
            <p className="text-xl text-zinc-400">Everything we've shipped recently.</p>
          </div>

          <div className="space-y-16">
            <div>
              <div className="flex items-baseline gap-4 mb-4">
                <h2 className="text-2xl font-semibold">Performance Upgrades & iOS Improvements</h2>
                <span className="text-sm text-zinc-500">June 15, 2026</span>
              </div>
              <div className="prose prose-invert text-zinc-300">
                <ul>
                  <li><strong>Improved:</strong> The semantic search engine now returns results 40% faster on mobile devices.</li>
                  <li><strong>Fixed:</strong> Resolved an issue where uploading large 4K video files on iOS Safari would sometimes time out.</li>
                  <li><strong>Added:</strong> New "On This Day" widget that surfaces memories exactly one, two, or five years ago.</li>
                </ul>
              </div>
            </div>
            
            <div className="h-px bg-white/10 w-full" />
            
            <div>
              <div className="flex items-baseline gap-4 mb-4">
                <h2 className="text-2xl font-semibold">Bulk Export & End-to-End Encryption Audits</h2>
                <span className="text-sm text-zinc-500">May 02, 2026</span>
              </div>
              <div className="prose prose-invert text-zinc-300">
                <ul>
                  <li><strong>Added:</strong> You can now export your entire vault in a single ZIP file containing your media and a structured JSON file of your journal entries.</li>
                  <li><strong>Security:</strong> Completed our third-party cryptographic audit with zero critical vulnerabilities found. The full report is available upon request.</li>
                  <li><strong>Improved:</strong> Image compression for thumbnails has been optimized to reduce bandwidth usage without compromising quality.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
