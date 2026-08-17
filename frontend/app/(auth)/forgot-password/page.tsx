// app/(auth)/forgot-password/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'بازیابی رمز عبور | فروشگاه دیجیتال و پوشاک',
  description: 'رمز عبور خود را بازیابی کنید',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            بازیابی رمز عبور 🔑
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
          </p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            ارسال لینک بازیابی
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            بازگشت به صفحه ورود
          </Link>
        </p>
      </div>
    </div>
  );
}