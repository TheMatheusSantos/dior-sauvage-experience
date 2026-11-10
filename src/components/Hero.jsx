import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240; // Total de frames que o FFMPEG vai gerar
const currentFrame = (index) => `/frames/frame_${index.toString().padStart(3, '0')}.jpg`;

export default function Hero({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollObj = useRef({ frame: 0 });
  const imagesCache = useRef(new Map());
  const loadingQueue = useRef(new Set());

  // Determination of adaptive payload (120 frames for mobile to cut network load)
  const isMobile = useRef(window.innerWidth <= 1100);
  const EFFECTIVE_FRAME_COUNT = isMobile.current ? 121 : 240;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });

    // High-Performance Tuning
    const CRITICAL_FRAMES = 1; // Minimal set for LCP boost
    const MAX_CACHE_SIZE = isMobile.current ? 40 : 80; 

    const preloadFrame = async (index) => {
      // Logic adjustment for mobile adaptive frames
      const realIndex = isMobile.current ? (index * 2) - 1 : index;
      if (index < 1 || index > EFFECTIVE_FRAME_COUNT || imagesCache.current.has(index) || loadingQueue.current.has(index)) return;
      
      loadingQueue.current.add(index);
      const img = new Image();
      img.src = currentFrame(Math.min(240, realIndex));

      try {
        await img.decode();
        imagesCache.current.set(index, img);

        // Hybrid Handoff: Hide index.html proxy image once first canvas frame is ready
        if (index === 1) {
          renderFrame(1);
          const proxy = document.getElementById('lcp-proxy');
          if (proxy) proxy.style.opacity = '0';
          setTimeout(() => proxy?.remove(), 800);
        }
        
        if (imagesCache.current.size > MAX_CACHE_SIZE) {
          const keys = Array.from(imagesCache.current.keys());
          const furthest = keys.reduce((prev, curr) => 
            Math.abs(curr - scrollObj.current.frame) > Math.abs(prev - scrollObj.current.frame) ? curr : prev
          );
          imagesCache.current.delete(furthest);
        }
      } catch (e) {
        console.warn(`Frame ${index} failed`);
      } finally {
        loadingQueue.current.delete(index);
      }
    };

    const loadInitialBatch = async () => {
      await preloadFrame(1);
      setIsLoaded(true);

      const backgroundLoad = async () => {
        for (let i = 2; i <= EFFECTIVE_FRAME_COUNT; i++) {
          await preloadFrame(i);
          setLoadProgress(Math.floor((i / EFFECTIVE_FRAME_COUNT) * 100));
          await new Promise(r => setTimeout(r, isMobile.current ? 30 : 10));
        }
      };
      backgroundLoad();
    };

    const renderFrame = (index) => {
      const img = imagesCache.current.get(index);
      if (!img) {
        preloadFrame(index);
        return;
      }
      
      const { width, height } = canvas;
      const vWidth = img.naturalWidth;
      const vHeight = img.naturalHeight;
      const vRatio = vWidth / vHeight;
      const cRatio = width / height;

      let drawWidth, drawHeight, drawX, drawY;

      if (isMobile.current) {
        if (vRatio > cRatio) {
          drawHeight = height; drawWidth = height * vRatio;
        } else {
          drawWidth = width; drawHeight = width / vRatio;
        }
      } else {
        if (vRatio > cRatio) {
          drawWidth = width; drawHeight = width / vRatio;
        } else {
          drawHeight = height; drawWidth = height * vRatio;
        }
      }
      
      drawX = (width - drawWidth) / 2;
      drawY = (height - drawHeight) / 2;

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      
      const preloadRange = isMobile.current ? 5 : 10;
      for(let i = 1; i <= preloadRange; i++) {
        preloadFrame(index + i);
        preloadFrame(index - i);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(dpr, dpr);
      renderFrame(scrollObj.current.frame || 1);
    };

    const setupScrubEngine = () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: false,
        scrub: isMobile.current ? 0.5 : 0.8,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            EFFECTIVE_FRAME_COUNT,
            Math.max(1, Math.floor(self.progress * (EFFECTIVE_FRAME_COUNT - 1)) + 1)
          );
          
          scrollObj.current.frame = frameIndex;
          renderFrame(frameIndex);

          if (self.progress > 0.96) {
            onComplete && onComplete(true);
          } else {
            onComplete && onComplete(false);
          }
        },
      });
    };

    if (!isLoaded) {
      loadInitialBatch();
    } else {
      resizeCanvas();
      setupScrubEngine();
    }

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, onComplete]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#010103]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Sauvage cinematic bottle animation"
        role="img"
      />

      {/* Narrative Overlays - Responsive Typography */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
        <div className="text-center max-w-4xl">
          <p className="text-accent text-[8px] md:text-[10px] tracking-[0.6em] md:tracking-[0.8em] uppercase mb-4 md:mb-8 opacity-60">The Essence of Wild</p>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-display uppercase tracking-tighter leading-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Sauvage
          </h1>
          <p className="mt-4 md:mt-8 text-white/30 text-[9px] md:text-xs tracking-widest md:tracking-ultra-widest uppercase italic font-light">
            An act of creation inspired by <br/> wide-open spaces
          </p>
        </div>
      </div>

      {!isLoaded && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-transparent" role="status" aria-live="polite">
          <div className="flex flex-col items-center gap-12 w-64 mt-60">
            <h2 className="text-[10px] tracking-ultra-widest uppercase opacity-40">Extracting Essence</h2>
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden" role="progressbar" aria-valuenow={loadProgress} aria-valuemin="0" aria-valuemax="100">
              <div 
                className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
