"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerSchema } from "../validations/authSchema";
import { RegisterFormState } from "../types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  try {
    // ۱. گرفتن داده‌ها از فرم
    const rawData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone_number: formData.get("phone_number") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      acceptTerms: formData.get("acceptTerms") === "on",
    };

    // ۲. اعتبارسنجی با Zod
    const validation = registerSchema.safeParse(rawData);
    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // ۳. ارسال درخواست به بک‌اند
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: rawData.first_name,
        last_name: rawData.last_name,
        email: rawData.email,
        phone_number: rawData.phone_number || undefined,
        password: rawData.password,
      }),
    });

    // ۴. پردازش پاسخ
    const data = await response.json();

    if (!response.ok) {
      return {
        errors: {
          general:
            data.message ||
            data.error ||
            `خطا در ثبت‌نام (کد: ${response.status})`,
        },
        timestamp: new Date(),
      };
    }

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders.length === 0) {
      return {
        errors: {
          general: "توکن احراز هویت دریافت نشد.",
        },
      };
    }

    const accessTokenCookie = setCookieHeaders.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    if (!accessTokenCookie) {
      return {
        errors: {
          general: "توکن احراز هویت دریافت نشد.",
        },
      };
    }

    const accessToken = accessTokenCookie.split(";")[0].split("=")[1];

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ← باید true باشد
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ← کلیدی!
      path: "/",
      maxAge: 15 * 60,
    });

    redirect("/");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    // خطای اتصال به سرور
    return {
      errors: {
        general: "خطایی در ورود به حساب کاربری رخ داد.",
      },
    };
  }
}
