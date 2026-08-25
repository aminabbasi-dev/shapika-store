// features/product/types/product-details.type.ts

import { CategoryInProduct } from "@/shared/types/category-in-product.interface";

export interface ProductDetails {
  _id: string;
  title: string;
  description: string;
  categories: CategoryInProduct[];
  price: number;
  discount: number;
  stock: number;
  image: string;
  brand: string;
  isActive: boolean;
}
