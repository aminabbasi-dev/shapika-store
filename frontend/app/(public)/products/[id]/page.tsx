import { notFound } from "next/navigation";
import ProductPage from "@/features/product/components/ProductPage/ProductPage";
import { getProductById } from "@/features/product/services/product.service";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductPage product={product} />;
}
