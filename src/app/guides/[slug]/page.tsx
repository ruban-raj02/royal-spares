import type { Metadata } from "next";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { GuideDetail } from "@/components/guides/guide-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Technical Guide (${slug}) — RoyalSpares.in`,
    description:
      "Factory OEM engineering specifications, verified fitment diagrams, and workshop procedures.",
  };
}

export function generateStaticParams() {
  return [
    { slug: "j-series-349cc-engine-architecture" },
    { slug: "understanding-microfiche-schemes" },
    { slug: "j-series-10000-km-service-checklist" },
    { slug: "chain-tensioning-sprocket-maintenance" },
  ];
}

export default async function GuideSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

  return (
    <>
      <Header />
      <TrustStrip />

      <main className="pb-24 lg:pb-12">
        <GuideDetail />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

