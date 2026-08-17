"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {HeaderActions} from "./HeaderActions";
import DesktopSearch from "./DesktopSearch";
import {MobileSearch} from "./MobileSearch";

export function Header() {
  const [opacity, setOpacity] = useState(0.95); // شفافیت اولیه نزدیک به بک‌گراند بادی

  useEffect(() => {
    const maxScroll = 300; // حداکثر اسکرول که اثر کامل شود
    const minOpacity = 0.8; // حد پایین شفافیت، نزدیک رنگ بادی

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // محاسبه شفافیت تدریجی بر اساس میزان اسکرول
      const newOpacity =
        0.95 - ((0.95 - minOpacity) * Math.min(scrollY, maxScroll)) / maxScroll;
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 shadow-sm transition-all duration-150 backdrop-blur-md bg-stone-50"

    >
      <div className="max-w-screen-xl container mx-auto px-4 py-3">
        {/* ردیف اصلی — RTL */}
        <div className="flex items-center justify-between gap-4">
          {/* لوگو + نام — چپ (اولین آیتم) */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="sm:inline text-2xl text-logo-gradient">
              شاپیکا
            </span>
          </Link>

          {/* جستجو دسکتاپ — وسط */}
          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <DesktopSearch />
          </div>

          {/* آیکون‌ها — راست (آخرین آیتم) */}
          <div className="flex items-center gap-2">
            <HeaderActions />
          </div>
        </div>

        {/* جستجو موبایل */}
        <div className="md:hidden mt-3">
          <MobileSearch />
        </div>
      </div>
    </header>
  );
}
