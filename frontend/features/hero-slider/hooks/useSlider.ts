// src/features/hero-slider/hooks/useSlider.ts
"use client";

import { useState, useEffect, useCallback } from "react";

interface UseSliderProps {
  totalSlides: number;
  interval?: number;
  autoPlay?: boolean;
}

export function useSlider({ 
  totalSlides, 
  interval = 5000, 
  autoPlay = true 
}: UseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // تغییر خودکار
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, goToNext]);

  return {
    currentIndex,
    goToNext,
    goToPrev,
    goToSlide,
    setIsPaused,
    isPaused,
  };
}