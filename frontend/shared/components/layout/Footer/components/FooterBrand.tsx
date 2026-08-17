// src/shared/components/layout/footer/components/FooterBrand.tsx
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { contactInfo } from "../data/footer-data";
import { cn } from "@/shared/utils/cn";

interface FooterBrandProps {
  className?: string;
}

export function FooterBrand({ className }: FooterBrandProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Link href="/" className="block">
        <h2 className="text-2xl font-bold text-white">
          {contactInfo.brandName.split(" ")[0]}
          <span className="text-primary">
            {contactInfo.brandName.split(" ")[1]}
          </span>
        </h2>
      </Link>
      <p className="text-sm leading-relaxed">{contactInfo.description}</p>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span>{contactInfo.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary shrink-0" />
          <span>{contactInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <span>{contactInfo.email}</span>
        </div>
      </div>
    </div>
  );
}
