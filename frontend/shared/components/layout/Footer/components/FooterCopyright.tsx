// src/shared/components/layout/footer/components/FooterCopyright.tsx
import { cn } from "@/shared/utils/cn";

interface FooterCopyrightProps {
  className?: string;
}

export function FooterCopyright({ className }: FooterCopyrightProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={cn(
        "border-t border-gray-800 mt-8 pt-6 text-center text-sm",
        className,
      )}
    >
      <p>© {currentYear} فروشگاه شاپیکا. تمامی حقوق محفوظ است.</p>
      <p className="text-gray-500 text-xs mt-1">
        طراحی و توسعه با ❤️ توسط تیم شاپیکا
      </p>
    </div>
  );
}
