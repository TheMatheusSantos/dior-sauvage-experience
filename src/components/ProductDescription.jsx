import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDescription() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.editorial-item', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section ref={textRef} className="relative py-24 md:py-48 lg:py-60 px-6 md:px-20 bg-[#010103] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Narrative Column */}
          <div className="space-y-8 md:space-y-12">
            <header className="editorial-item text-center lg:text-left">
              <p className="text-accent text-[10px] md:text-xs tracking-ultra-widest uppercase mb-6 md:mb-8">The Quintessence</p>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-widest leading-[0.95] md:leading-[0.85] text-white">
                The Noble <br/>
                <span className="italic font-light text-white/40">Rawness</span>
              </h2>
            </header>

            <div className="editorial-item double-bezel p-8 md:p-12 space-y-8 bg-black/40 backdrop-blur-md">
              <p className="text-white text-lg leading-relaxed font-light">
                Sauvage is an act of creation inspired by wide-open spaces. An ozone-blue sky that dominates a white-hot rocky landscape.
              </p>
              <div className="h-[1px] w-full bg-white/10" />
              <p className="text-white/90 leading-relaxed italic">
                "For Sauvage, I wanted to combine the power of masculinity with the freshness of nature. It's a composition that breathes."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-accent font-bold">— François Demachy, Dior Perfumer-Creator</p>
            </div>
          </div>

          {/* Features Column */}
          <div className="space-y-12 editorial-item">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl">
                <h4 className="text-accent text-[10px] tracking-widest uppercase mb-4">Sustainability</h4>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  A commitment to the earth. The iconic Sauvage bottle is now designed to be refillable, a simple gesture to significantly reduce environmental footprint. Elegance meets responsibility.
                </p>
              </div>
              <div className="p-8 border border-white/5 bg-white/[0.01] rounded-3xl">
                <h4 className="text-accent text-[10px] tracking-widest uppercase mb-4">The Scent</h4>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  A radically fresh composition, dictated by a name that has the ring of a manifesto. Raw and noble all at once, featuring natural ingredients selected with extreme care.
                </p>
              </div>
            </div>
            
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] bg-white/[0.03] shadow-2xl group border border-white/5">
              {/* Primary Image - User Custom Asset (Root Public) */}
              <img 
                src="/card-main.webp" 
                alt="Dior Sauvage Crystal Detail"
                width="800"
                height="450"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                decoding="async"
                onError={(e) => e.target.style.display = 'none'}
              />
              
              {/* Fail-Safe SVG Abstraction (Glass Specimen) */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-1000">
                <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-1/2 h-1/2">
                  <rect x="40" y="20" width="120" height="200" rx="10" stroke="white" strokeWidth="0.5" />
                  <rect x="70" y="5" width="60" height="20" rx="4" stroke="white" strokeWidth="0.5" />
                  <path d="M40 60 H160" stroke="white" strokeWidth="0.1" strokeDasharray="2 2" />
                  <path d="M40 180 H160" stroke="white" strokeWidth="0.1" strokeDasharray="2 2" />
                  <circle cx="100" cy="110" r="40" stroke="white" strokeWidth="0.1 opacity-20" />
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
