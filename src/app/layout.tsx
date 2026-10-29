import type { Metadata, Viewport } from "next";
import { Geist, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "RoyalSpares.in — Genuine Royal Enfield spare parts",
  description:
    "Factory OEM specifications, verified fitment diagrams and door-to-door delivery across India.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
