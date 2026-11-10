import { Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#010103] py-12 md:py-24 px-6 border-t border-white/5 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">
        <div className="relative w-full md:w-auto">
          {/* DIOR Background Text - Fixed Clipping & Accessibility */}
          <h2 className="text-[15vw] md:text-8xl font-display uppercase tracking-architectural opacity-5 select-none absolute -bottom-4 md:-bottom-8 -left-4 md:-left-10 leading-none" aria-hidden="true">
            Dior
          </h2>
          
          <div className="relative z-10 pt-8 md:pt-0">
            <h3 className="text-[8px] md:text-[10px] tracking-ultra-widest uppercase text-white/40 mb-6 font-medium">Explore the Universe</h3>
            <ul className="space-y-4 font-display text-xl md:text-2xl uppercase tracking-widest text-white/90">
              <li className="hover:text-accent transition-colors cursor-pointer">Fragrance</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Makeup</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Skincare</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Collection Privée</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-8 md:gap-12 relative z-10">
          <div className="flex gap-8 md:gap-6">
            <a href="#" aria-label="Follow Dior on Instagram">
              <Instagram className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
            </a>
            <a href="#" aria-label="Follow Dior on Twitter">
              <Twitter className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
            </a>
            <a href="#" aria-label="Follow Dior on Facebook">
              <Facebook className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent transition-all duration-500 bg-white/5"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="text-[8px] md:text-[10px] tracking-widest uppercase text-white/20 font-light">
            © 2026 Parfums Christian Dior. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
