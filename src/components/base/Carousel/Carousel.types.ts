import type { HTMLAttributes, ReactNode } from 'react';

export interface CarouselSlide {
  id: string | number;
  content: ReactNode;
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  infinite?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  showCounter?: boolean;
  height?: string;
  onSlideChange?: (index: number) => void;
}
