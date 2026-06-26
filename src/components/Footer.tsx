import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-serif tracking-wide text-white">Memora</h2>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              The Eternal Batch. Preserve your most precious moments and relive emotions forever. Proof that we lived.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/gourav_102007?igsh=MTNrazZxZWp3cDU5Zg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://github.com/hackerkushwah" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium tracking-wide">Shortcuts</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#vault" className="text-white/60 hover:text-white text-sm transition-colors">
                  My Vault
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-white/60 hover:text-white text-sm transition-colors">
                  Profile Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium tracking-wide">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-white/60 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-white/60 hover:text-white text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/why-memora" className="text-white/60 hover:text-white text-sm transition-colors">
                  Why Memora?
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/60 hover:text-white text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/contact" className="inline-block px-4 py-2 bg-[#D4AF37] text-black hover:bg-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium tracking-wide">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-white/60 hover:text-white text-sm transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link href="/resources#guides" className="text-white/60 hover:text-white text-sm transition-colors">
                  Memory Guides
                </Link>
              </li>
              <li>
                <Link href="/resources#tips" className="text-white/60 hover:text-white text-sm transition-colors">
                  Productivity Tips
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-medium tracking-wide">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-white/60 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            &copy; {currentYear} Memora App. All rights reserved.
          </p>
          <div className="text-white/40 text-xs">
            Designed for eternity.
          </div>
        </div>
      </div>
    </footer>
  );
}
