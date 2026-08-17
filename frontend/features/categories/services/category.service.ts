
import { apiClient } from '@/shared/lib/api-client';
import type { Category} from '../types/category.types';

export const categoryService = {
  // دریافت همه کتگوری‌ها
  getAll: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>('/categories')
    return data;
  },

  // دریافت یک کتگوری با آیدی
  getById: async (id: string): Promise<Category> => {
    const { data } = await apiClient.get<Category>(`/categories/${id}`);
    return data;
  },

};