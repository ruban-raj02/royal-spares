import type { Metadata } from "next";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { CartPageContent } from "@/components/cart/cart-page-content";

export const metadata: Metadata = {
  title: "Shopping Bag — RoyalSpares.in",
  description:
    "Review verified Royal Enfield OEM spare parts, check express delivery to your PIN code, and complete secure checkout.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <TrustStrip />

      <main>
        <CartPageContent />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

