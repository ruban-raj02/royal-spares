import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/data";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { CategoryPageContainer } from "@/components/category/category-page-container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  return {
    title: `${category.title} — RoyalSpares.in`,
    description: `${category.subtitle} ${category.standards}`,
    openGraph: {
      title: `${category.title} — RoyalSpares.in`,
      description: category.subtitle,
    },
  };
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategorySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <TrustStrip />

      <main className="shell section !pt-4 pb-20 md:pb-28">
        <CategoryPageContainer category={category} />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
