"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { loginAction } from "../actions/loginAction";
import { AuthToggle } from "./AuthToggle";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { LoginFormState } from "../types/auth.types";
import { toast } from "sonner";

const initialState: LoginFormState = {
  errors: {},
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  const [showPassword, togglePassword] = usePasswordToggle();
  const [rememberMe, setRememberMe] = useState(false);

  // نمایش پیام موفقیت اگر از صفحه ثبت‌نام آمده باشد
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   if (params.get("registered") === "true") {
  //     toast.success("ثبت‌نام شما با موفقیت انجام شد! حالا وارد شوید.");
  //   }
  // }, []);

  // نمایش خطاهای سرور به صورت Toast
  useEffect(() => {
    if (state.errors?.general) {
      toast.error(state.errors.general,{className:'!bg-gray-100 !text-red-500'});
    }
  }, [state]);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">شاپیکا</h1>
        <p className="text-gray-600 mt-2">
          برای ادامه وارد حساب کاربری خود شوید
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {/* ایمیل */}
        <div>
          <Input
            name="email"
            type="email"
            placeholder="ایمیل"
            dir="ltr"
            required
            error={state.errors?.email?.[0]}
            className="w-full"
          />
        </div>

        {/* رمز عبور */}
        <div>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              dir="ltr"
              required
              error={state.errors?.password?.[0]}
              className="w-full pl-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* گزینه‌های فرعی */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            مرا به خاطر بسپار
          </label>
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            رمز را فراموش کرده‌اید؟
          </Link>
        </div>

        {/* دکمه ورود */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          variant="primary"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>در حال ورود...</span>
            </div>
          ) : (
            "ورود"
          )}
        </Button>

        {/* تغییر به ثبت‌نام */}
        <AuthToggle mode="login" />
      </form>
    </div>
  );
}

// آیکون‌های ساده (می‌توانید از lucide-react یا heroicons استفاده کنید)
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
}
