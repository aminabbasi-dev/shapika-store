"use client";

import { useClearCart } from "../hooks/use-cart";

import type { Cart } from "../types/cart.type";

interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const clearMutation = useClearCart();

  return (
    <aside className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">خلاصه سفارش</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span>تعداد کالا</span>
          <span>{cart.totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>جمع کل</span>

          <span>{cart.subtotal.toLocaleString()} تومان</span>
        </div>

        <div className="flex justify-between border-t pt-4 font-bold">
          <span>قابل پرداخت</span>

          <span>{cart.totalPrice.toLocaleString()} تومان</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => clearMutation.mutate()}
        disabled={clearMutation.isPending}
        className="mt-6 w-full rounded-lg border p-3"
      >
        {clearMutation.isPending ? "در حال حذف..." : "خالی کردن سبد"}
      </button>
    </aside>
  );
}
