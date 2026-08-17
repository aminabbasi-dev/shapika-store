// src/shared/components/layout/footer/components/FooterSocial.tsx
"use client";

import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import * as si from "simple-icons";

// تعریف مستقیم آیکون‌ها
const socialLinks = [
  { title: "تلگرام", href: "#", icon: si.siTelegram },
  { title: "اینستاگرام", href: "#", icon: si.siInstagram },
  { title: "واتس اپ", href: "#", icon: si.siWhatsapp },
];

interface FooterSocialProps {
  className?: string;
}

export function FooterSocial({ className }: FooterSocialProps) {
  return (
    <div className={cn(className)}>
      <h4 className="text-white font-semibold text-sm mb-3">
        ما را دنبال کنید
      </h4>
      <div className="flex gap-3 flex-wrap">
        {socialLinks.map(({ title, href, icon }) => (
          <Link
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-primary p-2 rounded-full transition-all hover:scale-110"
            aria-label={title}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white fill-current"
            >
              <path d={icon.path} />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
