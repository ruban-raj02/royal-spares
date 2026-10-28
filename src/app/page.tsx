import { Header, TrustStrip } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { Finder } from "@/components/home/finder";
import { ShopByBike, Categories, PopularParts, KnowHow } from "@/components/home/sections";
import { Footer, CartBar, BottomNav } from "@/components/home/footer-and-bars";

export default function HomePage() {
  return (
    <>
      <Header />
      <TrustStrip />
      <main>
        <Hero />
        <Finder />
        <ShopByBike />
        <Categories />
        <PopularParts />
        <KnowHow />
      </main>
      <Footer />
      <CartBar />
      <BottomNav />
    </>
  );
}
