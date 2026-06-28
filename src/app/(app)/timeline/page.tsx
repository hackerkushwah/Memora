export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl text-white">Timeline</h1>
        <p className="text-white/50 mt-2">A chronological journey through your memories.</p>
      </header>

      <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-[#0A0A0A] rounded-3xl">
        <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h2 className="text-xl font-medium text-white mb-2">Timeline View is coming soon</h2>
        <p className="text-white/40 max-w-sm">We are building a beautiful vertical timeline to scroll through your legacy day by day.</p>
      </div>
    </div>
  );
}
