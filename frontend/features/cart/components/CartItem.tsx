"use client";

import Image from "next/image";

import { Minus, Plus, Trash2 } from "lucide-react";

import { useRemoveCartItem, useUpdateCartItem } from "../hooks/use-cart";

import type { CartItem as CartItemType } from "../types/cart.type";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const product = item.product;

  const handleIncrease = () => {
    updateMutation.mutate({
      productId: product._id,
      payload: {
        quantity: item.quantity + 1,
      },
    });
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeMutation.mutate(product._id);
      return;
    }

    updateMutation.mutate({
      productId: product._id,
      payload: {
        quantity: item.quantity - 1,
      },
    });
  };

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="relative size-24 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{product.title}</h3>

        <p className="mt-2 text-sm">
          {((product.price * (100 - product.discount)) / 100).toLocaleString()}{" "}
          تومان
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={updateMutation.isPending || removeMutation.isPending}
          className="rounded border p-2"
        >
          <Minus className="size-4" />
        </button>

        <span className="min-w-8 text-center">{item.quantity}</span>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={
            updateMutation.isPending ||
            removeMutation.isPending ||
            item.quantity >= product.stock
          }
          className="rounded border p-2"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => removeMutation.mutate(product._id)}
        disabled={removeMutation.isPending}
        className="rounded p-2"
      >
        <Trash2 className="size-5" />
      </button>
    </div>
  );
}
