import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SocialProofCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export const SocialProofCarousel: React.FC<SocialProofCarouselProps> = ({ 
  images, 
  autoPlayInterval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, images.length, autoPlayInterval]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Swipe detection for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div 
      className="relative w-full mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main carousel container */}
      <div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-[#4ade80]/30 shadow-[0_0_40px_rgba(74,222,128,0.2)]"
        style={{ 
          aspectRatio: '16/9',
          maxHeight: '500px'
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            <img
              src={images[currentIndex]}
              alt={`Prova social ${currentIndex + 1}`}
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                // Fallback for missing images
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="flex flex-col items-center justify-center h-full text-center p-8">
                    <div class="text-6xl mb-4">💰</div>
                    <p class="text-white font-bold text-lg mb-2">Prova Social ${currentIndex + 1}</p>
                    <p class="text-slate-400 text-sm">Imagem será carregada em breve</p>
                  </div>
                `;
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - Desktop */}
        <div className="hidden sm:block">
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full p-3 transition-all hover:scale-110 active:scale-95 border border-[#4ade80]/30 z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full p-3 transition-all hover:scale-110 active:scale-95 border border-[#4ade80]/30 z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Gradient overlays for better visibility */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentIndex
                ? 'bg-[#4ade80] w-8 h-3 shadow-[0_0_12px_rgba(74,222,128,0.6)]'
                : 'bg-slate-600 hover:bg-slate-500 w-3 h-3'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center mt-3 sm:mt-4">
        <p className="text-slate-400 text-xs sm:text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* Swipe hint for mobile - shows briefly on first load */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 sm:hidden pointer-events-none"
      >
        <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full border border-[#4ade80]/30">
          ← Deslize para ver mais →
        </div>
      </motion.div>
    </div>
  );
};
