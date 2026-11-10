import { useState, useCallback, lazy, Suspense } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';

// Lazy load below-the-fold components to boost Lighthouse score
const ProductDescription = lazy(() => import('./components/ProductDescription'));
const FragranceNotes = lazy(() => import('./components/FragranceNotes'));
const Campaign = lazy(() => import('./components/Campaign'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [isHeroComplete, setIsHeroComplete] = useState(false);

  // Estabilizar o callback para evitar que o Hero reinicie o ScrollTrigger desnecessariamente
  const handleHeroComplete = useCallback((val) => {
    setIsHeroComplete(val);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#010103] text-primary selection:bg-accent selection:text-white font-body overflow-x-hidden">
        {/* Cinematic Grain Overlay - Optimized Local Pattern */}
        <div className="texture-noise fixed inset-0 pointer-events-none z-[999] opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Level 1: The Pinned Experience (Underneath) */}
        <div className="relative z-[1] w-full h-[100dvh]">
          <Hero onComplete={handleHeroComplete} />
        </div>

        {/* Level 2: The Content Discovery - Vertical Slide Effect */}
        <div className="relative z-[20] mt-[300vh] bg-[#010103] shadow-[0_-20vh_40vh_rgba(0,0,0,1)]">
          <Suspense fallback={<div className="h-screen bg-black" />}>
            <ProductDescription />
            <FragranceNotes />
            <Campaign />
            <Footer />
          </Suspense>
        </div>
      </main>
    </SmoothScroll>
  );
}
