export default function CollectionsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl text-white">Collections</h1>
        <p className="text-white/50 mt-2">Organize your memories into beautiful albums.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Collections */}
        {[
          { name: "Travel & Adventures", count: 12, cover: "/demo2.jpg" },
          { name: "Family Archive", count: 48, cover: "/demo3.jpg" },
          { name: "Daily Journal", count: 124, cover: "/demo1.jpg" }
        ].map((c, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 cursor-pointer">
            <img src={c.cover} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-xl font-medium text-white mb-1">{c.name}</h3>
              <p className="text-sm text-white/50">{c.count} Memories</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
