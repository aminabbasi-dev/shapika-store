// src/features/hero-slider/components/HeroSlider.tsx
"use client";

import { useRef } from "react";
import { HeroSliderProps } from "../types";
import { useSlider } from "../hooks/useSlider";
import { SlideItem } from "./SlideItem";
import { cn } from "@/shared/utils/cn";

// دکمه‌های ناوبری
function NavigationButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-20",
        "bg-white/10 backdrop-blur-sm hover:bg-white/25",
        "text-white p-2 sm:p-3 rounded-full",
        "transition-all duration-300 hover:scale-110",
        "border border-white/20",
        direction === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6",
      )}
      aria-label={`اسلاید ${direction === "left" ? "قبلی" : "بعدی"}`}
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

// نشانگرهای پایین صفحه
function Indicators({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={cn(
            "transition-all duration-500 rounded-full",
            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50",
            index === current
              ? "bg-white w-8 sm:w-10 h-2 sm:h-2.5"
              : "bg-white/40 hover:bg-white/60 w-2 sm:w-2.5 h-2 sm:h-2.5",
          )}
          aria-label={`رفتن به اسلاید ${index + 1}`}
        />
      ))}
    </div>
  );
}

export function HeroSlider({
  slides,
  autoPlayInterval = 5000,
  className,
  showControls = true,
  showIndicators = true,
}: HeroSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { currentIndex, goToNext, goToPrev, goToSlide } = useSlider({
    totalSlides: slides.length,
    interval: autoPlayInterval,
    autoPlay: true,
  });

  return (
    <section
      ref={sliderRef}
      className={cn("relative w-full h-105", "overflow-hidden", className)}
      aria-label="اسلایدر تصاویر"
    >
      {/* کانتینر اسلایدها */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <SlideItem
            key={slide.id}
            slide={slide}
            isActive={index === currentIndex}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "z-10" : "z-0",
            )}
          />
        ))}
      </div>

      {/* دکمه‌های کنترل */}
      {showControls && slides.length > 1 && (
        <>
          <NavigationButton direction="left" onClick={goToPrev} />
          <NavigationButton direction="right" onClick={goToNext} />
        </>
      )}

      {/* نشانگرها */}
      {showIndicators && slides.length > 1 && (
        <Indicators
          total={slides.length}
          current={currentIndex}
          onSelect={goToSlide}
        />
      )}
    </section>
  );
}
