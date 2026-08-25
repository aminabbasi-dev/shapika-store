export function EmptyCart() {
  return (
    <div className="flex min-h-60 items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">سبد خرید شما خالی است</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید.
        </p>
      </div>
    </div>
  );
}
