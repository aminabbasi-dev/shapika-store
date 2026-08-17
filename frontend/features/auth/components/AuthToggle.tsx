// features/auth/components/AuthToggle.tsx

import Link from 'next/link';

interface AuthToggleProps {
  mode: 'login' | 'register';
}

export function AuthToggle({ mode }: AuthToggleProps) {
  if (mode === 'login') {
    return (
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        حساب کاربری ندارید؟{' '}
        <Link
          href="/register"
          className="text-blue-600 hover:underline font-medium dark:text-blue-400"
        >
          ثبت‌نام کنید
        </Link>
      </p>
    );
  }

  return (
    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
      قبلاً ثبت‌نام کرده‌اید؟{' '}
      <Link
        href="/login"
        className="text-blue-600 hover:underline font-medium dark:text-blue-400"
      >
        وارد شوید
      </Link>
    </p>
  );
}