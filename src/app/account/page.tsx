import type { Metadata } from "next";
import { Header, TrustStrip } from "@/components/home/header";
import { Footer, BottomNav } from "@/components/home/footer-and-bars";
import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "Your Account & Orders — RoyalSpares.in",
  description:
    "Manage your genuine Royal Enfield spare parts orders, track live BlueDart shipments, update delivery addresses, and view factory invoice documentation.",
  openGraph: {
    title: "Account & Active Garage Orders — RoyalSpares.in",
    description: "Manage your genuine Royal Enfield spare parts orders and active garage.",
  },
};

export default function AccountPage() {
  return (
    <>
      <Header />
      <TrustStrip />

      <main>
        <AccountDashboard />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}

