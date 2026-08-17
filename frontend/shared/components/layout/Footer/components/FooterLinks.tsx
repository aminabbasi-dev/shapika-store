// src/shared/components/layout/footer/components/FooterLinks.tsx
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

interface FooterLinksProps {
  title: string;
  links: { title: string; href: string }[];
  className?: string;
}

export function FooterLinks({ title, links, className }: FooterLinksProps) {
  return (
    <div className={cn(className)}>
      <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="hover:font-bold transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
