import { Menu, Search } from "lucide-react";

export function AppHeader({ onOpenSidebar, onOpenSearch }: { onOpenSidebar: () => void; onOpenSearch: () => void }) {
  return (
    <header className="h-16 lg:hidden flex items-center justify-between px-4 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-serif font-bold text-lg text-white">Memora</span>
      </div>
      
      <button
        onClick={onOpenSearch}
        className="p-2 -mr-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
      >
        <Search className="w-5 h-5" />
      </button>
    </header>
  );
}
