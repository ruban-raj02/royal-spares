"use client";
import Link from "next/link";
import { House, Bike, Search, ShoppingBag, User, ArrowRight } from "lucide-react";
import { footerCols, inr } from "@/lib/data";
import { useCart } from "@/components/cart";
import { Logo } from "./header";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas pb-28 md:pb-24 lg:pb-0">
      <div className="shell py-10 lg:py-14">
        <div className="lg:hidden">
          <Logo />
          <p className="mt-3 max-w-sm text-[13px] text-mute">
            Independent distributor of genuine Royal Enfield spare parts and exploded technical schematics. Direct dispatch nationwide.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {footerCols.map((c, i) => (
            <nav
              key={c.title}
              aria-label={c.title}
              className={`${i >= 3 ? "hidden lg:block" : i === 0 ? "hidden lg:block" : ""} mt-8 lg:mt-0`}
            >
              <h3 className="mono-spec !text-ink">{c.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link href="/parts/p1" className="text-[13px] text-mute hover:text-ink">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          {/* mobile-only compact columns */}
          <nav className="mt-8 lg:hidden">
            <h3 className="mono-spec !text-ink">Support &amp; orders</h3>
            <ul className="mt-3 space-y-2 text-[13px] text-mute">
              <li>Track My Order</li>
              <li>Fitment Guarantee</li>
              <li>Returns &amp; Exchange</li>
              <li>Mechanic Trade Portal</li>
            </ul>
          </nav>
          <nav className="mt-8 lg:hidden">
            <h3 className="mono-spec !text-ink">Gear hubs</h3>
            <ul className="mt-3 space-y-2 text-[13px] text-mute">
              <li>Chennai Hub (HQ)</li>
              <li>Bengaluru Hub</li>
              <li>Delhi NCR Cargo</li>
              <li>Mumbai Air Depot</li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 font-mono text-[11px] text-mute md:flex-row md:justify-between">
          <p>© 2026 RoyalSpares.in. Precision OEM Motorcycle Components. All Royal Enfield model names and marks belong to Eicher Motors Ltd.</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-stock" />
            Dispatch: Active · 256-bit encrypted checkout
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Mobile + tablet: sticky checkout bar once something is in the bag. */
export function CartBar() {
  const { last, count, setIsOpen } = useCart();
  if (!last) return null;
  return (
    <div className="fixed inset-x-0 bottom-[76px] z-40 px-3 md:bottom-4 md:px-8 lg:hidden" role="status">
      <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-card border border-line bg-ink p-2 pl-3 text-white shadow-[0_4px_12px_rgba(0,0,0,.04)] md:border-line md:bg-canvas md:text-ink">
        <span className="grid size-6 place-items-center rounded-full bg-heritage text-[11px] font-medium text-white">
          {count}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
          {last.name}
          <span className="ml-2 font-mono text-[12px] opacity-70">{inr(last.price)}</span>
        </span>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex h-10 items-center gap-1.5 rounded-control bg-heritage px-4 text-[13px] font-medium text-white cursor-pointer"
        >
          Checkout <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

/** Mobile only. */
export function BottomNav() {
  const { count, setIsOpen } = useCart();

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-offset/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5">
        <li>
          <Link
            href="/"
            className="relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-ink"
          >
            <House className="size-5" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/bikes/classic-350"
            className="relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] text-mute hover:text-ink"
          >
            <Bike className="size-5" />
            Bikes
          </Link>
        </li>
        <li>
          <Link
            href="/categories/brakes-hydraulics"
            className="relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] text-mute hover:text-ink"
          >
            <Search className="size-5" />
            Parts
          </Link>
        </li>
        <li>
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex h-16 w-full flex-col items-center justify-center gap-1 text-[11px] text-mute"
          >
            <ShoppingBag className="size-5" />
            Bag
            {count > 0 && (
              <span className="absolute right-[28%] top-2 grid size-4 place-items-center rounded-full bg-heritage text-[10px] text-white">
                {count}
              </span>
            )}
          </button>
        </li>
        <li>
          <Link
            href="/account"
            className="relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] text-mute"
          >
            <User className="size-5" />
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
