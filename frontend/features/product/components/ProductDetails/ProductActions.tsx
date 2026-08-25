"use client";

import {
  useAddCartItem,
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/features/cart/hooks/use-cart";

interface ProductActionsProps {
  productId: string;
  stock: number;
}

export default function ProductActions({
  productId,
  stock,
}: ProductActionsProps) {
  const { data: cart } = useCart();

  const addCartItem = useAddCartItem();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  // پیدا کردن محصول در سبد خرید
  const cartItem = cart?.items.find(
    (item) => item.product._id === productId,
  );

  const quantity = cartItem?.quantity ?? 0;

  // =========================
  // Add To Cart
  // =========================

  function handleAdd() {
    addCartItem.mutate({
      productId,
      quantity: 1,
    });
  }

  // =========================
  // Increase Quantity
  // =========================

  function handleIncrease() {
    if (!cartItem) return;

    // جلوگیری از بیشتر شدن تعداد از موجودی
    if (quantity >= stock) return;

    updateCartItem.mutate({
      productId,
      payload: {
        quantity: quantity + 1,
      },
    });
  }

  // =========================
  // Decrease / Remove
  // =========================

  function handleDecrease() {
    if (!cartItem) return;

    // اگر فقط یک عدد وجود دارد،
    // محصول کاملاً حذف می‌شود
    if (quantity === 1) {
      removeCartItem.mutate(productId);
      return;
    }

    // اگر بیشتر از یک عدد است،
    // فقط یکی کم می‌شود
    updateCartItem.mutate({
      productId,
      payload: {
        quantity: quantity - 1,
      },
    });
  }

  // =========================
  // Loading State
  // =========================

  const isPending =
    addCartItem.isPending ||
    updateCartItem.isPending ||
    removeCartItem.isPending;

  // =========================
  // Out Of Stock
  // =========================

  if (stock <= 0) {
    return (
      <button
        type="button"
        disabled
        className="mt-8 w-full rounded-xl bg-gray-300 px-6 py-4 font-bold text-white"
      >
        ناموجود
      </button>
    );
  }

  // =========================
  // Product Not In Cart
  // =========================

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        disabled={isPending}
        className="mt-8 w-full rounded-xl bg-black px-6 py-4 font-bold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {addCartItem.isPending
          ? "در حال افزودن..."
          : "افزودن به سبد خرید"}
      </button>
    );
  }

  // =========================
  // Product In Cart
  // =========================

  return (
    <div className="mt-8 flex h-14 items-center justify-between overflow-hidden rounded-xl border border-gray-200">
      {/* Increase */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= stock || isPending}
        className="flex h-full w-16 items-center justify-center text-2xl font-bold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        +
      </button>

      {/* Quantity */}
      <span className="min-w-12 text-center font-bold">
        {quantity}
      </span>

      {/* Decrease / Remove */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isPending}
        className="flex h-full min-w-20 items-center justify-center font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        {quantity === 1 ? "حذف" : "−"}
      </button>
    </div>
  );
}