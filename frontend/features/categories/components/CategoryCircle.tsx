// src/features/categories/components/CategoryCircle.tsx
"use client";

import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { CategoryIcon } from "./CategoryIcon";

export interface CategoryItem {
  id: string | number;
  title: string;
  iconName: string;
  href: string;
  color?: string;
  bgColor?: string;
  count?: number;
}

interface CategoryCircleProps {
  category: CategoryItem;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
}

const sizeClasses = {
  sm: {
    container: "w-16 h-16",
    icon: "w-6 h-6",
    text: "text-xs",
  },
  md: {
    container: "w-24 h-24",
    icon: "w-10 h-10",
    text: "text-sm",
  },
  lg: {
    container: "w-14 h-14",
    icon: "w-14 h-14",
    text: "text-sm",
  },
};

export function CategoryCircle({
  category,
  size = "md",
  className,
  showCount = true,
}: CategoryCircleProps) {
  const sizeClass = sizeClasses[size];

  return (
    <Link
      href={category.href}
      className={cn(
        "group flex flex-col items-center gap-2",
        "transition-all duration-300 hover:scale-105",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full flex items-center justify-center",
          "transition-all duration-300",
          "shadow-md hover:shadow-xl",
          sizeClass.container,
          category.bgColor || "bg-primary/10 hover:bg-primary/20",
          "border-2 border-transparent hover:border-primary/30",
        )}
        style={{
          backgroundColor: category.bgColor || undefined,
        }}
      >
        <CategoryIcon
          name={category.iconName}
          className={cn(
            sizeClass.icon,
            "transition-all duration-300 p-2",
            category.color || "text-white group-hover:scale-110",
          )}
          color={category.color}
        />
      </div>

      <span
        className={cn(
          "font-normal text-center",
          sizeClass.text,
          "text-gray-700 group-hover:text-primary transition-colors",
        )}
      >
        {category.title}
        {showCount && category.count !== undefined && (
          <span className="text-xs text-gray-400 block">
            {category.count} مورد
          </span>
        )}
      </span>
    </Link>
  );
}
