import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Campaign() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.campaign-image', 
      { scale: 1.2, filter: 'grayscale(100%) brightness(0.5)' },
      { 
        scale: 1, filter: 'grayscale(0%) brightness(1)',
        duration: 3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black overflow-hidden z-30">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.dior.com/on/demandware.static/-/Library-Sites-DiorSharedLibrary/default/dwc3911ab9/images/beauty/01-FRAGRANCES/2025/SAUVAGE-10-YEARS-2025/PLPs/DIOR_COM_SAUVAGE_ELIXIR_25_INSTIT_3000x2250px.jpg" 
          alt="Sauvage Landscape"
          width="3000"
          height="2250"
          className="campaign-image w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Manifesto Overlay */}
      <div className="relative z-10 w-full h-full flex items-center justify-center py-24 md:py-48 lg:py-60 px-6">
        <div className="max-w-4xl text-center">
          <p className="text-accent text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">The Highland Manifesto</p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-widest leading-[0.95] md:leading-[0.85] mb-12 md:mb-20">
            In the wild, <br className="hidden sm:block"/> 
            <span className="text-white/40 italic font-body lowercase tracking-normal">everything lies ahead</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="double-bezel">
              <p className="text-white/60 leading-relaxed">
                Conceived as an ode to nature, Sauvage is an act of creation inspired by the great outdoors. 
                Compositions marked by raw freshness, combining power and nobility. 
                Raw and alive, sensual and mysterious, refined and intoxicating.
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <button className="group relative w-fit mt-auto py-4 px-8 border border-white/20 rounded-full overflow-hidden transition-all duration-700 hover:border-accent">
                <span className="relative z-10 text-[10px] tracking-ultra-widest uppercase group-hover:text-black">Explore the Campaign</span>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-accent group-hover:h-full transition-all duration-700 ease-in-out" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Archetype Images */}
      <div className="absolute top-[20%] right-[10%] w-64 aspect-[3/4] opacity-40 mix-blend-screen pointer-events-none hidden md:block">
        <img 
          src="https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw0df82930/Y0996460/Y0996460_C099600755_E01_GHC.jpg?sw=800" 
          alt="Sauvage Bottle Archetype" 
          width="800"
          height="1066"
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
          style={{ transform: 'translateY(100px)' }}
        />
      </div>
    </section>
  );
}
