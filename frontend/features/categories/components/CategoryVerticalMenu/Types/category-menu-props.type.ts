import { Category } from "./category.type";

export interface CategoryMenuProps {
  selectedCategory: Category;
  categories: Category[];
  getChildren: (id: string) => Category[];
  // pathname: string;
  hoveredCategory: string | null;
  setHoveredCategory: (id: string | null) => void;
  isLoading: boolean;
  error: unknown;
}
