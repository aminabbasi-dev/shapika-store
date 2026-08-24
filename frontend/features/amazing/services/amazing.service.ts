// services/amazing.service.ts

import { Product } from "@/shared/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAmazingProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products/amazing`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch amazing products");
  }

  return response.json();
}