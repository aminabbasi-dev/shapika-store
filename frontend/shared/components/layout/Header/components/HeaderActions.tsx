"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { UserMenu } from "@/features/auth/components/UserMenu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MiniCart } from "./MiniCart";
import { useRouter } from "next/navigation";
import { ThemeToggleClient } from "./ThemeToggleClient";

export function HeaderActions() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {/* حساب کاربری */}
      {user ? (
        <UserMenu />
      ) : (
        <Button
          onClick={() => router.push("/login")}
          className="border border-gray-300 rounded-lg cursor-pointer"
        >
          ثبت نام | ورود
        </Button>
      )}

      {/* سبد خرید */}
      <Link
        href="/cart"
        className="scale-150 hover:scale-160"
      >
        <MiniCart />
      </Link>

      {/* تغییر تم */}
      <ThemeToggleClient />
    </div>
  );
}