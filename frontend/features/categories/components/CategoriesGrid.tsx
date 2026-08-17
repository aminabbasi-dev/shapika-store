// src/features/categories/components/CategoriesGrid.tsx
"use client";

import { cn } from "@/shared/utils/cn";
import { CategoryCircle, CategoryItem } from "./CategoryCircle";

interface CategoriesGridProps {
  categories: CategoryItem[];
  size?: "sm" | "md" | "lg";
  columns?: 4 | 5 | 6 | 8 | 10;
  className?: string;
  showCount?: boolean;
}

const columnClasses = {
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
  8: "grid-cols-2 sm:grid-cols-4 md:grid-cols-8",
  10: "grid-cols-3 sm:grid-cols-5 md:grid-cols-10",
};

export function CategoriesGrid({
  categories,
  size = "md",
  columns = 6,
  className,
  showCount = true,
}: CategoriesGridProps) {
  return (
    <div
      className={cn(
        "grid  gap-6 p-3 md:gap-8 justify-items-center",
        columnClasses[columns],
        className,
      )}
    >
      {categories.map((category) => (
        <CategoryCircle
          key={category.id}
          category={category}
          size={size}
          showCount={showCount}
        />
      ))}
    </div>
  );
}
