import { Category } from "./category.type";

export interface CategoryItemProps {
   category:Category
  // subCategory: Category;
  hoveredCategory: string | null;
  setHoveredCategory: (id: string | null) => void;
}