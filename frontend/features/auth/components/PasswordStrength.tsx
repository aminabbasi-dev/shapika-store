// features/auth/components/PasswordStrength.tsx

'use client';

import { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

interface StrengthInfo {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  // محاسبه قدرت رمز با useMemo
  const strength = useMemo((): StrengthInfo => {
    let score = 0;
    
    // معیارهای قدرت رمز
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    const strengthMap: Record<number, StrengthInfo> = {
      0: { score: 0, label: 'ضعیف', color: 'bg-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
      1: { score: 1, label: 'ضعیف', color: 'bg-red-500', bgColor: 'bg-red-100 dark:bg-red-900/30' },
      2: { score: 2, label: 'متوسط', color: 'bg-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
      3: { score: 3, label: 'خوب', color: 'bg-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
      4: { score: 4, label: 'قوی', color: 'bg-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
      5: { score: 5, label: 'بسیار قوی', color: 'bg-emerald-500', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
    };

    return strengthMap[Math.min(score, 5)] || strengthMap[0];
  }, [password]);

  // اگر رمز خالی بود، هیچی رندر نکن
  if (!password) return null;

  const percentage = (strength.score / 5) * 100;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs">
        <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>
          {strength.label}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className={`w-full h-1.5 rounded-full ${strength.bgColor}`}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        رمز باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و عدد باشد
      </p>
    </div>
  );
}