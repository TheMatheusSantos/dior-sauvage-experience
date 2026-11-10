import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NOTES = [
  {
    id: '01',
    type: 'Top Note',
    name: 'Reggio Bergamot',
    desc: 'An intense, zesty freshness. Harvested in Calabria exclusively for Dior to ensure a unique, peppery signature.',
    img: '', 
    highlight: 'Citric & Radiant',
    svg: (
      <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-20 stroke-white fill-none stroke-[0.5]">
        <circle cx="50" cy="50" r="40" />
        <path d="M50 10 V90 M10 50 H90 M22 22 L78 78 M22 78 L78 22" strokeWidth="0.1" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: '02',
    type: 'Heart Note',
    name: 'Sichuan Pepper',
    desc: 'The spice that dictates the unique character of Sauvage. A mineral and incisive vibration.',
    img: '',
    highlight: 'Mineral & Raw',
    svg: (
      <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-20 stroke-white fill-none stroke-[0.5]">
        <circle cx="30" cy="30" r="4" /> <circle cx="70" cy="40" r="4" />
        <circle cx="40" cy="70" r="4" /> <circle cx="60" cy="20" r="4" />
        <circle cx="20" cy="60" r="4" /> <circle cx="80" cy="80" r="4" />
      </svg>
    )
  },
  {
    id: '03',
    type: 'Base Note',
    name: 'Noble Lavender',
    desc: 'A sun-drenched trail, providing a woody and aromatic finish that lingers with eternal elegance.',
    img: '',
    highlight: 'Solar & Woody',
    svg: (
      <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-20 stroke-white fill-none stroke-[0.5]">
        <path d="M50 90 V20 M40 80 L50 70 L60 80 M40 60 L50 50 L60 60 M40 40 L50 30 L60 40" />
      </svg>
    )
  }
];

export default function FragranceNotes() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger to account for Hero pinning
    ScrollTrigger.refresh();

    // Reveal Title
    gsap.fromTo('.notes-header', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Cards Animation
    gsap.fromTo('.note-card-inner', 
      { opacity: 0, scale: 0.95, y: 50 },
      { 
        opacity: 1, 
        scale: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.notes-grid',
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 md:py-40 px-6 md:px-20 bg-[#010103] overflow-hidden z-[70]"
      style={{ isolation: 'isolate' }}
    >
      {/* Background Texture Overlay - Handled by App.jsx, but keeping a fallback layer if needed */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="notes-header mb-20 md:mb-32 max-w-2xl text-center md:text-left">
          <p className="text-accent text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase mb-4 md:mb-6 font-medium">Olfactory Architecture</p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display uppercase tracking-[-0.02em] leading-[0.95] md:leading-[0.9] text-white">
            Noble & <br className="hidden md:block"/>
            <span className="text-white/60 italic font-light">Impetuous Composition</span>
          </h2>
          <p className="mt-6 md:mt-8 text-white/50 font-body text-xs md:text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            An ode to the wild nature, where each ingredient is selected for its pure potency and raw elegance.
          </p>
        </header>

        <div className="notes-grid grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {NOTES.map((note) => (
            <div key={note.id} className="note-card-inner group relative">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-700 group-hover:bg-white/[0.04]">
                {/* Image Container with Parallax Effect */}
                <div className="relative aspect-[4/5] overflow-hidden m-4 rounded-[2rem] bg-white/[0.03] flex items-center justify-center">
                  <img 
                    src={note.img} 
                    alt={note.name} 
                    width="600"
                    height="750"
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 relative z-10"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  
                  {/* Fail-Safe Digital Specimen */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {note.svg}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#010103] via-[#010103]/20 to-transparent z-20" />
                  
                  {/* Floating Highlight Label */}
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                    <span className="text-[9px] uppercase tracking-widest text-white/80 font-medium">
                      {note.highlight}
                    </span>
                  </div>
                </div>

                <div className="p-8 pt-2">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-accent/60 font-bold">{note.type}</span>
                    <span className="text-3xl font-display text-white/5 italic">{note.id}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wide group-hover:text-accent transition-colors duration-500 text-white">
                    {note.name}
                  </h3>
                  <div className="h-[1px] w-12 bg-white/20 my-6 group-hover:w-full transition-all duration-700" />
                  <p className="text-sm text-white/80 leading-relaxed font-light">
                    {note.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
