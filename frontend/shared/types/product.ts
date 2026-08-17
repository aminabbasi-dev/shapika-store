import { CategoryInProduct } from "./category-in-product.interface";

export interface Product {
  _id: string;
  title: string;
  description: string;
  categories: CategoryInProduct[];
  price: number;
  discount: number;
  stock: number;
  image: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
}
