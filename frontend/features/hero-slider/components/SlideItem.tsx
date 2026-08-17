// src/features/hero-slider/components/SlideItem.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Slide } from "../types";
import { cn } from "@/shared/utils/cn";

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
  className?: string;
}

export function SlideItem({ slide, isActive, className }: SlideItemProps) {
  const content = (
    <>
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        className="object-cover"
        priority={isActive}
        sizes="100vw"
        quality={85}
        loading={isActive ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgAA//Z"
      />

      {/* اوورلی گرادیانتی */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* محتوای متنی */}
      {(slide.title || slide.description) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            {slide.title && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 animate-fade-in-up drop-shadow-2xl">
                {slide.title}
              </h1>
            )}
            {slide.description && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto opacity-90 animate-fade-in-up animation-delay-200 drop-shadow-lg">
                {slide.description}
              </p>
            )}
            {slide.credit && (
              <p className="text-xs sm:text-sm opacity-60 mt-4 animate-fade-in-up animation-delay-400 drop-shadow">
                {slide.credit}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "relative min-w-full h-full flex-shrink-0 transition-opacity duration-700",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0",
        className,
      )}
    >
      {slide.link ? (
        <Link href={slide.link} className="block w-full h-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
