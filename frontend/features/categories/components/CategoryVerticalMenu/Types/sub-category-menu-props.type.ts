import { Category } from "./category.type";

export interface SubCategoryMenuProps {
  subCategories:Category[];
  isLoading: boolean;
  error: unknown;
}
