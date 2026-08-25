import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">محصول پیدا نشد</h1>

      <p className="mt-3 text-gray-500">
        محصول موردنظر وجود ندارد یا حذف شده است.
      </p>

      <Link href="/" className="mt-6 rounded-lg bg-black px-6 py-3 text-white">
        بازگشت به صفحه اصلی
      </Link>
    </main>
  );
}
