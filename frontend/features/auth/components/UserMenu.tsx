"use client";

import { useEffect, useRef, useState } from "react";
import { UserRoundCog } from "lucide-react";
import { UserMenuItem } from "./UserMenuItem";
import { useAuthStore } from "../store/auth.store";
import { logoutAction } from "../actions/logoutAction";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);



  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    setIsOpen(false);

    clearUser();

    await logoutAction();

  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="منوی کاربر"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer hover:bg-gray-100 hover:scale-110 transition"
      >
        <UserRoundCog className="text-blue-500" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border bg-white shadow-lg">
          <div className="py-1">
            <UserMenuItem href="/profile">پروفایل</UserMenuItem>

            <UserMenuItem href="/orders">سفارش‌های من</UserMenuItem>

            <UserMenuItem href="/wishlist">علاقه‌مندی‌ها</UserMenuItem>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2 text-right text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              خروج از حساب کاربری
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
