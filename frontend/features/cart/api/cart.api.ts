import { apiClient } from "@/shared/lib/api-client";

import type {
  AddCartItemPayload,
  Cart,
  UpdateCartItemPayload,
} from "../types/cart.type";

export async function getCart(): Promise<Cart> {
  const { data } = await apiClient.get<Cart>("/carts");
  console.log({ dataa: data });
  return data;
}

export async function addCartItem(payload: AddCartItemPayload): Promise<Cart> {
  const { data } = await apiClient.post<Cart>("/carts/items", payload);

  return data;
}

export async function updateCartItem(
  productId: string,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  const { data } = await apiClient.patch<Cart>(
    `/carts/items/${productId}`,
    payload,
  );

  return data;
}

export async function removeCartItem(productId: string): Promise<Cart> {
  const { data } = await apiClient.delete<Cart>(`/carts/items/${productId}`);

  return data;
}

export async function clearCart(): Promise<Cart> {
  const { data } = await apiClient.delete<Cart>("/carts");

  return data;
}
