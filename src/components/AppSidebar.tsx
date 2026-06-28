import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, Folder, Settings, User, Search, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Timeline", href: "/timeline", icon: Clock },
  { label: "Collections", href: "/collections", icon: Folder },
];

const bottomNavItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar({ isOpen, onClose, onOpenSearch }: { isOpen: boolean; onClose: () => void; onOpenSearch: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[#D4AF37] font-serif font-bold text-lg leading-none">M</span>
            </div>
            <span className="font-serif text-lg tracking-widest text-white font-bold uppercase">
              Memora
            </span>
          </Link>
        </div>

        {/* Global Search Button */}
        <div className="p-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-white/50 text-sm group"
          >
            <Search className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            <span className="flex-1 text-left">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 font-sans text-[10px] uppercase text-white/30 px-1.5 py-0.5 rounded bg-white/10">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
}
