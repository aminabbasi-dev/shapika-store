"use server";

import { cookies } from "next/headers";

import type {
  AddCartItemPayload,
  Cart,
  UpdateCartItemPayload,
} from "../types/cart.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("احراز هویت انجام نشده است");
  }

  return accessToken;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      Cookie: `accessToken=${accessToken}`,

      ...options.headers,
    },

    cache: "no-store",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);

    throw new Error(
      data?.message || "خطا در ارتباط با سرور",
    );
  }

  return response.json();
}

/**
 * دریافت سبد خرید
 */
export async function getCartAction(): Promise<Cart> {
  return request<Cart>("/carts");
}

/**
 * افزودن محصول به سبد خرید
 */
export async function addCartItemAction(
  payload: AddCartItemPayload,
): Promise<Cart> {
  return request<Cart>("/carts/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * تغییر تعداد محصول
 */
export async function updateCartItemAction(
  productId: string,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  return request<Cart>(
    `/carts/items/${productId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

/**
 * حذف محصول از سبد خرید
 */
export async function removeCartItemAction(
  productId: string,
): Promise<Cart> {
  return request<Cart>(
    `/carts/items/${productId}`,
    {
      method: "DELETE",
    },
  );
}

/**
 * خالی کردن سبد خرید
 */
export async function clearCartAction(): Promise<Cart> {
  return request<Cart>("/carts", {
    method: "DELETE",
  });
}