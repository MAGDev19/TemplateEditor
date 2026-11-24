import { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import type { CarouselProps } from './Carousel.types';

export const Carousel = ({
  slides,
  autoPlay = true,
  intervalMs = 4000,
  pauseOnHover = true,
  infinite = true,
  showIndicators = true,
  showArrows = true,
  showCounter = false,
  height = '350px',
  onSlideChange,
  className,
  ...props
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      let newIdx = index;
      if (newIdx < 0) {
        newIdx = infinite ? total - 1 : 0;
      } else if (newIdx >= total) {
        newIdx = infinite ? 0 : total - 1;
      }
      setCurrentIndex(newIdx);
      if (onSlideChange) {
        onSlideChange(newIdx);
      }
    },
    [infinite, total, onSlideChange]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying && total > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, intervalMs);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total, intervalMs, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => pauseOnHover && setIsPlaying(false)}
      onMouseLeave={() => pauseOnHover && autoPlay && setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={clsx(
        'relative group overflow-hidden rounded-2xl bg-[#121212] text-white shadow-xl border border-[#CDCDCD] dark:border-slate-700 outline-none select-none',
        className
      )}
      style={{ height }}
      {...props}
    >
      {/* Slides track */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full flex-shrink-0 relative">
            {slide.content}
          </div>
        ))}
      </div>

      {/* Prev / Next Chevrons */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Anterior slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-black/60 text-[#FF644B] hover:bg-white backdrop-blur-md border border-[#CDCDCD] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 shadow-md cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Siguiente slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-black/60 text-[#FF644B] hover:bg-white backdrop-blur-md border border-[#CDCDCD] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 shadow-md cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>
        </>
      )}

      {/* Bottom Bar: Indicators & Counter */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 px-4 z-10">
        {/* Slide Counter */}
        {showCounter && (
          <div className="px-3 py-1 text-xs font-bold rounded-full bg-[#00000040] backdrop-blur-md text-white border border-white/20">
            {currentIndex + 1} / {total}
          </div>
        )}

        {/* Indicators */}
        {showIndicators && total > 1 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00000040] backdrop-blur-md border border-white/20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Ir al slide ${idx + 1}`}
                className={clsx(
                  'h-2 rounded-full transition-all duration-300 cursor-pointer',
                  idx === currentIndex ? 'w-8 bg-[#FF644B] shadow-sm' : 'w-2.5 bg-white/40 hover:bg-white/80'
                )}
              />
            ))}
          </div>
        )}

        {/* Play / Pause Toggle */}
        {autoPlay && (
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
            className="w-7 h-7 rounded-full bg-[#00000040] hover:bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs transition-transform hover:scale-110 cursor-pointer"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-[10px]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
