"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema } from "../validations/authSchema";
import type { LoginFormState } from "../types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation.data),
    });

    if (!response.ok) {
      const data = await response.json();

      return {
        errors: {
          general: data.message || "خطا در ورود به حساب کاربری",
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

    console.error("Login error:", error);

    return {
      errors: {
        general: "خطایی در ورود به حساب کاربری رخ داد.",
      },
    };
  }
}
