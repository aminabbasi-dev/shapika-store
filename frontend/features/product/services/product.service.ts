// features/product/services/product.service.ts

import { ProductDetails } from "../types/product-details.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductById(
 id: string,
): Promise<ProductDetails | null> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}
