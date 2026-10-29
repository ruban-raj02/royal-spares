import type { Metadata } from "next";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { GuideDetail } from "@/components/guides/guide-detail";

export const metadata: Metadata = {
  title: "Decoding J-Series 349cc Engine: Architecture & Valve Tolerances — RoyalSpares.in",
  description:
    "Technical engineering whitepaper on Royal Enfield J-Series 349cc SOHC engine metallurgy, oil circuitry, tappet clearances, and factory fastener torque specifications.",
  openGraph: {
    title: "Decoding J-Series 349cc Engine: Architecture & Valve Tolerances",
    description: "Verified factory workshop manual specifications and torque matrix.",
    images: [{ url: "/images/classic-350.avif" }],
  },
};

export default function GuidesPage() {
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

