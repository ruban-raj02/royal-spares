import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bikes, getBikeBySlug } from "@/lib/data";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { BikeHero } from "@/components/bike/bike-hero";
import { BikeCatalog } from "@/components/bike/bike-catalog";
import { VinDecoderBanner } from "@/components/bike/vin-decoder-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);

  return {
    title: `${bike.name} Spares Catalog (${bike.years}) — RoyalSpares.in`,
    description: `${bike.title}. ${bike.subtitle}`,
    openGraph: {
      title: `${bike.name} Spares Catalog`,
      description: bike.subtitle,
      images: [{ url: bike.img }],
    },
  };
}

export function generateStaticParams() {
  return bikes.map((b) => ({ slug: b.slug }));
}

export default async function BikeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);

  if (!bike) {
    notFound();
  }

  return (
    <>
      <Header />
      <TrustStrip />

      <main className="shell section !pt-4 pb-20 md:pb-28">
        {/* Hero Section (Breadcrumb, Inventory, Spec Strip & Schematics Card) */}
        <BikeHero bike={bike} />

        {/* Catalog Main View (Assemblies, Filters Sidebar, Product Grid / List) */}
        <BikeCatalog bike={bike} />

        {/* Bottom VIN Decoder & Precision Guarantee Banner */}
        <VinDecoderBanner garageSync={bike.garageSync} />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
