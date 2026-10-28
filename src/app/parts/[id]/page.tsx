import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getPartByIdOrSlug, parts } from "@/lib/data";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { ProductGallery } from "@/components/pdp/product-gallery";
import { ProductBuyBox } from "@/components/pdp/product-buy-box";
import { MicroficheSchematic } from "@/components/pdp/microfiche-schematic";
import { CompatibilityMatrix } from "@/components/pdp/compatibility-matrix";
import { TechSpecsAndContents } from "@/components/pdp/tech-specs-and-contents";
import { FrequentlyBoughtTogether } from "@/components/pdp/frequently-bought-together";
import { WorkshopReviews } from "@/components/pdp/workshop-reviews";
import { StickyBottomBar } from "@/components/pdp/sticky-bottom-bar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const part = getPartByIdOrSlug(id);
  if (!part) return { title: "Part Not Found — RoyalSpares.in" };

  return {
    title: `${part.name} (OEM #${part.oem}) — RoyalSpares.in`,
    description: `${part.headline}. ${part.sub}. ${part.description}`,
    openGraph: {
      title: `${part.name} (OEM #${part.oem})`,
      description: part.description,
      images: [{ url: part.img }],
    },
  };
}

export function generateStaticParams() {
  return parts.flatMap((p) => [
    { id: p.id },
    { id: p.slug },
    { id: p.oem.replace(/\//g, "-") },
  ]);
}

export default async function PartDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const part = getPartByIdOrSlug(id);

  if (!part) {
    notFound();
  }

  return (
    <>
      <Header />
      <TrustStrip />

      <main className="shell section !pt-4 pb-24 md:pb-32">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-6">
          <ol className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[12px] md:text-[13px] text-mute">
            {part.breadcrumbs.map((crumb, idx) => {
              const isLast = idx === part.breadcrumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1.5 whitespace-nowrap">
                  {idx > 0 && <ChevronRight className="size-3 text-mute/60" />}
                  {isLast ? (
                    <span className="font-mono font-medium text-ink bg-well px-1.5 py-0.5 rounded border border-line">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-ink transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Top Fold: Gallery (Left) + Buy Box (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Column (6 cols on lg) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ProductGallery part={part} />
          </div>

          {/* Buy Box Column (6 cols on lg) */}
          <div className="lg:col-span-6">
            <ProductBuyBox part={part} />
          </div>
        </div>

        {/* Section 1: Exploded Microfiche CAD & Torque Standards */}
        <MicroficheSchematic part={part} />

        {/* Section 2: Verified Vehicle Compatibility Matrix */}
        <CompatibilityMatrix part={part} />

        {/* Section 3: Detailed Technical Specs & Inside Factory Package */}
        <TechSpecsAndContents part={part} />

        {/* Section 4: Frequently Bought Together Bundle */}
        <FrequentlyBoughtTogether part={part} />

        {/* Section 5: Verified Workshop Reviews & Manual Download */}
        <WorkshopReviews part={part} />
      </main>

      <Footer />
      <StickyBottomBar part={part} />
      <BottomNav />
    </>
  );
}
