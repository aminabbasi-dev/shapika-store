// src/shared/components/layout/footer/data/footer-data.ts

import * as si from 'simple-icons';

export const footerLinks = {
  product: [
    { title: "محصولات", href: "/products" },
    { title: "ویژگی‌ها", href: "/features" },
    { title: "قیمت‌ها", href: "/pricing" },
    { title: "نسخه آزمایشی", href: "/demo" },
  ],
  company: [
    { title: "درباره ما", href: "/about" },
    { title: "وبلاگ", href: "/blog" },
    { title: "مشاغل", href: "/careers" },
    { title: "تماس با ما", href: "/contact" },
  ],
  support: [
    { title: "راهنما", href: "/help" },
    { title: "پشتیبانی", href: "/support" },
    { title: "قوانین", href: "/terms" },
    { title: "حریم خصوصی", href: "/privacy" },
  ],
};

export const socialLinks = [
  { title: "تلگرام", href: "#", icon: si.siTelegram },
  { title: "اینستاگرام", href: "#", icon: si.siInstagram },
];

export const contactInfo = {
  address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  phone: "۰۲۱-۱۲۳۴۵۶۷۸",
  email: "info@shapika.com",
  brandName: "فروشگاه شاپیکا",
  description: "ارائه‌دهنده بهترین محصولات تکنولوژی , پوشاک  با کیفیت بالا و قیمت مناسب.",
};