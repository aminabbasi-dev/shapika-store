"use client";

import { CartItems } from "./CartItems";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

import { useCart } from "../hooks/use-cart";

export function CartPage() {
  const { data: cart, isLoading, isError } = useCart();

  if (isLoading) {
    return <div className="p-8">در حال دریافت سبد خرید...</div>;
  }

  if (isError || !cart) {
    return <div className="p-8">دریافت سبد خرید با خطا مواجه شد.</div>;
  }

  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto grid gap-8 p-6 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="mb-6 text-2xl font-bold">سبد خرید</h1>

        <CartItems items={cart.items} />
      </section>

      <CartSummary cart={cart} />
    </div>
  );
}
