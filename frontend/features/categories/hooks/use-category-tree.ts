// src/features/categories/hooks/use-category-tree.ts
import { useMemo } from "react";
import { useCategories } from "./use-categories";
import { Category } from "../types/category.types";

interface UseCategoryTreeReturn {
  // داده‌ها
  categories: Category[];
  rootCategories: Category[];
  isLoading: boolean;
  error: Error | null;

  // توابع کمکی (بیزنس لاجیک)
  getChildren: (parentId: string) => Category[];
  getCategoryById: (id: string) => Category | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getPath: (id: string) => Category[]; // مسیر از ریشه تا دسته‌بندی
  buildTree: (parentId?: string | null) => Category[]; // ساخت درخت
}

export function useCategoryTree(): UseCategoryTreeReturn {
  const { data, isLoading, error } = useCategories();

  // همه دسته‌بندی‌ها (لیست تخت)
  const categories = useMemo(() => data || [], [data]);

  // ✅ ریشه‌ها (دسته‌بندی‌های بدون والد)
  const rootCategories = useMemo(() => {
    return categories.filter((cat: Category) => !cat.parentId);
  }, [categories]);

  // ✅ دریافت زیرمجموعه‌های یک دسته‌بندی
  const getChildren = useMemo(
    () => (parentId: string) => {
      return categories.filter((cat: Category) => cat.parentId === parentId);
    },
    [categories],
  );

  // ✅ دریافت دسته‌بندی با آیدی
  const getCategoryById = useMemo(
    () => (id: string) => {
      return categories.find((cat: Category) => cat._id === id);
    },
    [categories],
  );

  // ✅ دریافت دسته‌بندی با اسلاگ
  const getCategoryBySlug = useMemo(
    () => (slug: string) => {
      return categories.find((cat: Category) => cat.slug === slug);
    },
    [categories],
  );

  // ✅ دریافت مسیر از ریشه تا دسته‌بندی (برای breadcrumb)
  const getPath = useMemo(
    () =>
      (id: string): Category[] => {
        const path: Category[] = [];
        let currentId: string | undefined = id;

        while (currentId) {
          const category = getCategoryById(currentId);
          if (!category) break;
          path.unshift(category);
          currentId = category.parentId || undefined;
        }

        return path;
      },
    [getCategoryById],
  );

  // ✅ ساخت درخت دسته‌بندی‌ها
  const buildTree = useMemo(
    () =>
      (parentId: string | null = null): Category[] => {
        const children = categories.filter(
          (cat: Category) => cat.parentId === parentId,
        );

        return children.map((category: Category) => ({
          ...category
        }));
      },
    [categories],
  );

  return {
    // داده‌ها
    categories,
    rootCategories,
    isLoading,
    error: error as Error | null,

    // توابع بیزنس لاجیک
    getChildren,
    getCategoryById,
    getCategoryBySlug,
    getPath,
    buildTree,
  };
}
