"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, MapPin, ScanLine, Truck, ArrowRight, X, Bike, ChevronDown } from "lucide-react";
import { useCart } from "@/components/cart";
import { parts, inr } from "@/lib/data";
import { BikeModelSwitchModal } from "@/components/bike/bike-model-switch-modal";

interface NavItem {
  name: string;
  href: string;
  prefix?: string;
}

const navItems: NavItem[] = [
  { name: "Shop by bike", href: "/bikes/classic-350", prefix: "/bikes" },
  { name: "Spare parts", href: "/parts/p1", prefix: "/parts" },
  { name: "Categories", href: "/categories/brakes-hydraulics", prefix: "/categories" },
  { name: "OEM part finder", href: "/#finder", prefix: "/#finder" },
  { name: "Guides", href: "/guides", prefix: "/guides" },
  { name: "Delivery info & PIN lookup", href: "#" },
];
const chips = [
  { label: "Classic 350", href: "/bikes/classic-350" },
  { label: "Chain Sprocket Kit", href: "/parts/p1" },
  { label: "Brake Pads", href: "/parts/p2" },
  { label: "Sherpa Oil Filter", href: "/parts/p3" },
  { label: "Hunter 350", href: "/bikes/hunter-350" },
  { label: "Clutch Cable", href: "/parts/p4" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-baseline gap-1 text-lg font-semibold tracking-tight group">
      royalspares<span className="text-sm font-normal text-mute">.in</span>
      <span className="ml-1 hidden rounded border border-line px-1 text-[10px] font-medium text-mute lg:inline group-hover:border-ink">
        RE
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { count, setIsOpen } = useCart();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Collapse mobile extras (delivery strip + chips) on scroll-down, reveal on scroll-up */
  useEffect(() => {
    const THRESHOLD = 40; // px scrolled before we toggle
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > THRESHOLD && y > lastScrollY.current) {
        setMobileCollapsed(true);
      } else if (y < lastScrollY.current) {
        setMobileCollapsed(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchResults = query.trim()
    ? parts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.oem.toLowerCase().includes(query.toLowerCase()) ||
          p.fits.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-offset/80 backdrop-blur-xl">
      {/* Top row */}
      <div className="shell flex h-14 items-center gap-4 lg:h-16 lg:gap-8">
        <Logo />

        {/* Desktop search bar with live dropdown */}
        <div ref={containerRef} className="relative mx-auto hidden max-w-xl flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mute" aria-hidden />
            <input
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="h-10 w-full rounded-[10px] border border-line bg-well pl-9 pr-8 text-[13px] outline-none placeholder:text-mute focus:border-ink focus:bg-canvas transition-colors"
              placeholder="Search parts, bike model or OEM number (e.g. 570547/C, Chain Kit, ByBre)…"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isFocused && searchResults.length > 0 && (
            <div className="absolute top-12 inset-x-0 rounded-card border border-line bg-canvas shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2 py-1 text-[11px] font-medium text-mute">
                Matching Genuine Parts ({searchResults.length})
              </div>
              <ul className="space-y-1 mt-1">
                {searchResults.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/parts/${p.id}`}
                      onClick={() => {
                        setIsFocused(false);
                        setQuery("");
                      }}
                      className="flex items-center justify-between p-2 rounded-control hover:bg-well transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-9 rounded-md bg-white border border-line overflow-hidden p-0.5 shrink-0 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.img} alt={p.name} className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-ink truncate">{p.name}</p>
                          <p className="text-[11px] text-mute truncate">
                            OEM #{p.oem} · {p.fits}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pl-2">
                        <p className="text-[13px] font-semibold text-ink">{inr(p.price)}</p>
                        <span className="text-[10px] text-stock font-medium">In stock</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right action icons */}
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          {/* Select Bike Desktop Trigger */}
          <button
            onClick={() => setIsBikeModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 rounded-control border border-line bg-well px-3 py-1.5 text-[12px] font-medium text-ink hover:border-ink cursor-pointer"
          >
            <Bike className="size-3.5 text-heritage" />
            <span>Select Bike</span>
            <ChevronDown className="size-3 text-mute" />
          </button>

          <Link href="/help" className="hidden px-2 text-[13px] text-mute hover:text-ink lg:block">
            Help
          </Link>
          <Link href="/account" className="hidden items-center gap-1.5 px-2 text-[13px] text-mute hover:text-ink lg:flex">
            <User className="size-4" />
            Account
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`Bag, ${count} items`}
            className="relative grid size-10 place-items-center cursor-pointer text-ink hover:text-heritage transition-colors"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-heritage text-[10px] font-medium text-white">
                {count}
              </span>
            )}
          </button>
          <Link href="/account" aria-label="Account" className="grid size-8 place-items-center rounded-full bg-ink text-[11px] font-medium text-white lg:hidden">
            RS
          </Link>
        </div>
      </div>

      {/* Desktop/tablet nav */}
      <nav aria-label="Primary" className="hidden border-t border-line/60 md:block">
        <div className="shell flex h-11 items-center gap-6 overflow-x-auto no-scrollbar text-[13px]">
          {navItems.map((item) => {
            const isActive =
              mounted && item.prefix && item.prefix !== "/#finder"
                ? pathname?.startsWith(item.prefix)
                : false;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`whitespace-nowrap transition-colors ${
                  isActive
                    ? "font-semibold text-white bg-heritage px-2.5 py-1 rounded-md"
                    : "text-mute hover:text-ink font-medium"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <span className="ml-auto hidden whitespace-nowrap text-[12px] text-mute xl:inline">
            PIN Code Delivery Check &amp; Verification
          </span>
        </div>
      </nav>

      {/* Mobile: search (always visible) + collapsible delivery strip & chips */}
      <div className="md:hidden">
        {/* Collapsible delivery strip */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileCollapsed ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="shell flex items-center justify-between border-t border-line/60 py-2 text-[12px]">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-heritage" />
              Deliver to: <b className="font-medium">560001 (Bengaluru)</b>
            </span>
            <span className="flex items-center gap-1 text-mute">
              <Truck className="size-3.5" />
              Same-Day Dispatch
            </span>
          </div>
        </div>

        {/* Search bar — always visible / sticky */}
        <div className="shell py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mute" aria-hidden />
            <input
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-control border border-line bg-canvas pl-9 pr-10 text-sm outline-none placeholder:text-mute focus:border-ink"
              placeholder="Search parts, bike model or OEM…"
            />
            <ScanLine className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-mute" aria-hidden />
          </div>

          {/* Mobile search results preview */}
          {query.trim() && searchResults.length > 0 && (
            <div className="mt-2 rounded-card border border-line bg-canvas shadow-lg p-2">
              {searchResults.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/parts/${p.id}`}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between py-2 border-b border-line/50 last:border-none"
                >
                  <span className="text-[13px] font-medium text-ink truncate">{p.name}</span>
                  <span className="text-[13px] font-semibold text-ink shrink-0 ml-2">{inr(p.price)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Collapsible chip tags */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileCollapsed ? "max-h-0 opacity-0 pb-0" : "max-h-14 opacity-100"
          }`}
        >
          <div className="shell flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {chips.map((c, i) => (
              <Link
                key={c.label}
                href={c.href}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                  i === 0 ? "border-ink bg-well font-medium" : "border-line bg-canvas text-mute hover:text-ink"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>

      {/* Bike Model Switch Modal — rendered outside header to escape its stacking context */}
      <BikeModelSwitchModal
        isOpen={isBikeModalOpen}
        onClose={() => setIsBikeModalOpen(false)}
        currentSlug="classic-350"
      />
    </>
  );
}

export function TrustStrip() {
  return (
    <div className="hidden border-b border-line bg-canvas md:block">
      <div className="shell flex h-9 items-center gap-x-4 overflow-hidden whitespace-nowrap text-[12px] text-mute">
        <span>Direct warehouse inventory</span>
        <span className="text-line">·</span>
        <span>Royal Enfield genuine spares</span>
        <span className="text-line">·</span>
        <span>Guaranteed fitment</span>
        <span className="text-line">·</span>
        <span>Dispatched within 24 hours</span>
      </div>
    </div>
  );
}
