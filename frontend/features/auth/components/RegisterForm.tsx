"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { registerAction } from "../actions/registerAction";
import { AuthToggle } from "./AuthToggle";
import { PasswordStrength } from "./PasswordStrength";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { RegisterFormState } from "../types/auth.types";
import { toast } from "sonner";

const initialState: RegisterFormState = {
  errors: {},
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const [showPassword, togglePassword] = usePasswordToggle();
  const [showConfirmPassword, toggleConfirmPassword] = usePasswordToggle();
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // نمایش خطاهای سرور به صورت Toast
  useEffect(() => {
    if (state.errors?.general) {
      toast.error(state.errors.general, {
        className: "!bg-gray-100 !text-red-500",
      });
    }
  }, [state]);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          شاپیکا{" "}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          به خانواده بزرگ ما بپیوندید
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {/* نام کامل */}
        <div>
          <Input
            name="first_name"
            type="text"
            placeholder="نام"
            required
            error={state.errors?.first_name?.[0]}
            className="w-full"
          />
        </div>

        <div>
          <Input
            name="last_name"
            type="text"
            placeholder="نام خانوادگی"
            required
            error={state.errors?.last_name?.[0]}
            className="w-full"
          />
        </div>

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

        {/* شماره موبایل (اختیاری) */}
        <div>
          <Input
            name="phone_number"
            type="tel"
            placeholder="شماره موبایل (اختیاری)"
            dir="ltr"
            error={state.errors?.phone_number?.[0]}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
            مثلاً: 989120000000+
          </p>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {/* نمایش قدرت رمز */}
          {password && <PasswordStrength password={password} />}
        </div>

        {/* تکرار رمز عبور */}
        <div>
          <div className="relative">
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="تکرار رمز عبور"
              dir="ltr"
              required
              error={state.errors?.confirmPassword?.[0]}
              className="w-full pl-10"
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showConfirmPassword ? "مخفی کردن رمز" : "نمایش رمز"}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* قوانین و خبرنامه */}
        <div className="space-y-2">
          <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <span>
              <span className="text-red-500">*</span> شرایط و قوانین را
              <Link
                href="/terms"
                className="text-blue-600 hover:underline mx-1"
              >
                مطالعه کرده‌ام
              </Link>
              و می‌پذیرم
            </span>
          </label>
          {state.errors?.acceptTerms?.[0] && (
            <p className="text-red-500 text-sm">
              {state.errors.acceptTerms[0]}
            </p>
          )}
        </div>

        {/* دکمه ثبت‌نام */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !acceptTerms}
          variant="primary"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>در حال ثبت‌نام...</span>
            </div>
          ) : (
            "ثبت‌نام"
          )}
        </Button>

        {/* تغییر به ورود */}
        <AuthToggle mode="register" />
      </form>
    </div>
  );
}

// آیکون‌ها
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
