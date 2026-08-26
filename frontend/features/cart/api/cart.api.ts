import type {
  AddCartItemPayload,
  Cart,
  UpdateCartItemPayload,
} from "../types/cart.type";

export async function getCart(): Promise<Cart> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("دریافت سبد خرید ناموفق بود");
  }

  return response.json();
}

export async function addCartItem(payload: AddCartItemPayload): Promise<Cart> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/carts/items`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error("افزودن محصول به سبد خرید ناموفق بود");
  }

  return response.json();
}

export async function updateCartItem(
  productId: string,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/carts/items/${productId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error("ویرایش سبد خرید ناموفق بود");
  }

  return response.json();
}

export async function removeCartItem(productId: string): Promise<Cart> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/carts/items/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("حذف محصول از سبد خرید ناموفق بود");
  }

  return response.json();
}

export async function clearCart(): Promise<Cart> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خالی کردن سبد خرید ناموفق بود");
  }

  return response.json();
}
