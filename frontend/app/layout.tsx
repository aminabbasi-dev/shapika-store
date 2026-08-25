import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/features/auth/components/AuthProvider";
import { getCurrentUser } from "@/features/auth/utils/authHelpers";

const vazirmatn = localFont({
  src: "../public/fonts/vazirmatn/Vazirmatn-Regular.woff2",
});

export const metadata: Metadata = {
  title: "shapika",
  description: "فروشگاه حرفه‌ای با Next.js و Tailwind",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.className} antialiased min-h-screen`}>
        <QueryProvider>
          <AuthProvider user={user}>
            <main>{children}</main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
