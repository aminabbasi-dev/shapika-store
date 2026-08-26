import {
  addCartItemAction,
  clearCartAction,
  getCartAction,
  removeCartItemAction,
  updateCartItemAction,
} from "../actions/cart.actions";

import type {
  AddCartItemPayload,
  Cart,
  UpdateCartItemPayload,
} from "../types/cart.type";

/**
 * دریافت سبد خرید
 */
export async function getCart(): Promise<Cart> {
  return getCartAction();
}

/**
 * افزودن محصول به سبد خرید
 */
export async function addCartItem(
  payload: AddCartItemPayload,
): Promise<Cart> {
  return addCartItemAction(payload);
}

/**
 * تغییر تعداد محصول
 */
export async function updateCartItem(
  productId: string,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  return updateCartItemAction(
    productId,
    payload,
  );
}

/**
 * حذف محصول
 */
export async function removeCartItem(
  productId: string,
): Promise<Cart> {
  return removeCartItemAction(productId);
}

/**
 * خالی کردن سبد خرید
 */
export async function clearCart(): Promise<Cart> {
  return clearCartAction();
}