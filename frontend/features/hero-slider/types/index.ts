// src/features/hero-slider/types/index.ts
export interface Slide {
  _id: string;
  image: string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
  credit?: string;
}

export interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: string;
}