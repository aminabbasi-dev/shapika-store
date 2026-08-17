// src/features/categories/components/CategoryIcon.tsx
"use client";

import {
  Laptop,
  Shirt,
  Home,
  Book,
  Coffee,
  Car,
  Camera,
  Gamepad,
  Music,
  Dumbbell,
  Plane,
  Heart,
  Smartphone,
  Watch,
  Footprints,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Gem,
  Bike,
  HelpCircle,
  type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Laptop,
  Shirt,
  Home,
  Book,
  Coffee,
  Car,
  Camera,
  Gamepad,
  Music,
  Dumbbell,
  Plane,
  Heart,
  Smartphone,
  Watch,
  Footprints,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Gem,
  Bike,
  HelpCircle,
};

interface CategoryIconProps {
  name: string;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export function CategoryIcon({ 
  name, 
  className, 
  color, 
  strokeWidth = 1.5 
}: CategoryIconProps) {
  const Icon = iconMap[name] || HelpCircle;
  
  return (
    <Icon 
      className={className} 
      color={color} 
      strokeWidth={strokeWidth}
    />
  );
}