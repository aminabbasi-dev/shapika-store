// src/features/categories/hooks/use-categories.ts

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category.service";
import { categoryKeys } from "./category-keys";

// دریافت همه کتگوری‌ها
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: categoryService.getAll,
    staleTime: 5 * 60 * 1000, // ۵ دقیقه - داده تا ۵ دقیقه تازه در نظر گرفته می‌شود
  });
}

// دریافت یک کتگوری با آیدی
export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryService.getById(id),
    enabled: !!id, // فقط اگر id وجود داشت، کوئری اجرا شود
    staleTime: 5 * 60 * 1000,
  });
}
