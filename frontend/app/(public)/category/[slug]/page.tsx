interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">
        دسته‌بندی: {slug}
      </h1>
    </main>
  );
}