import { CategoryVerticalMenu } from "@/features/categories/components/CategoryVerticalMenu/CategoryVerticalMenu";
import { Footer } from "@/shared/components/layout/Footer";
import { Header } from "@/shared/components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-100">
      <Header />
      <CategoryVerticalMenu />
      {children}
      <Footer />
    </div>
  );
}
