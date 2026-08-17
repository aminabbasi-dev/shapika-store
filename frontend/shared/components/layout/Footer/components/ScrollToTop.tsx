// src/shared/components/layout/footer/components/ScrollToTop.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ScrollToTopProps {
  className?: string;
}

export function ScrollToTop({ className }: ScrollToTopProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScroll) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 cursor-pointer",
        "bg-primary hover:bg-primary/80",
        "text-white p-3 rounded-full",
        "shadow-lg transition-all hover:scale-110",
        className,
      )}
      aria-label="بازگشت به بالا"
    >
      <ChevronUp className="text-gray-900 w-5 h-5" />
    </button>
  );
}
