// src/features/hero-slider/types/index.ts
export interface Slide {
  id: string | number;
  image: string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
  credit?: string; // نام عکاس
}

export interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: string;
}