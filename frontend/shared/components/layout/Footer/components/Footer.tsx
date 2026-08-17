// src/shared/components/layout/footer/components/Footer.tsx
import { cn } from "@/shared/utils/cn";
import { ScrollToTop } from "./ScrollToTop";
import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterSocial } from "./FooterSocial";
import { FooterCopyright } from "./FooterCopyright";
import { footerLinks } from "../data/footer-data";

interface FooterProps {
  className?: string;
  showScrollTop?: boolean;
}

export function Footer({ className, showScrollTop = true }: FooterProps) {
  return (
    <footer className={cn("bg-white text-gray-600", className)}>
      <hr />
      {/* دکمه بازگشت به بالا */}
      {showScrollTop && <ScrollToTop />}

      {/* محتوای اصلی فوتر */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ستون اول - برند */}
          <FooterBrand />

          {/* ستون دوم - محصولات */}
          <FooterLinks title="محصولات" links={footerLinks.product} />

          {/* ستون سوم - شرکت */}
          <FooterLinks title="شرکت" links={footerLinks.company} />

          {/* ستون چهارم - پشتیبانی و شبکه‌های اجتماعی */}
          <div>
            <FooterLinks
              title="پشتیبانی"
              links={footerLinks.support}
              className="mb-6"
            />
            <FooterSocial />
          </div>
        </div>

        {/* کپی‌رایت */}
        <FooterCopyright />
      </div>
    </footer>
  );
}
