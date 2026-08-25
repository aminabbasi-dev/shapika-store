
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cart.api";

import type {
  AddCartItemPayload,
  UpdateCartItemPayload,
} from "../types/cart.type";

export const cartKeys = {
  all: ["cart"] as const,

  detail: () =>
    [...cartKeys.all, "detail"] as const,
};

export function useCart() {
  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: getCart,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: AddCartItemPayload,
    ) => addCartItem(payload),

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      );
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      payload,
    }: {
      productId: string;
      payload: UpdateCartItemPayload;
    }) =>
      updateCartItem(productId, payload),

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      );
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      removeCartItem(productId),

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      );
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,

    onSuccess: (cart) => {
      queryClient.setQueryData(
        cartKeys.detail(),
        cart,
      );
    },
  });
}
