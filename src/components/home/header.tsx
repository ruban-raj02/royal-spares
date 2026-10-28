"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, MapPin, ScanLine, Truck, ArrowRight, X, Bike, ChevronDown } from "lucide-react";
import { useCart } from "@/components/cart";
import { parts, inr } from "@/lib/data";
import { BikeModelSwitchModal } from "@/components/bike/bike-model-switch-modal";

const nav = ["Shop by bike", "Spare parts", "Categories", "OEM part finder", "Guides", "Delivery info & PIN lookup"];
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
      <span className="ml-1 hidden rounded border border-line px-1 font-mono text-[10px] text-mute lg:inline group-hover:border-ink">
        RE
      </span>
    </Link>
  );
}

export function Header() {
  const { count, setIsOpen } = useCart();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
              <div className="px-2 py-1 text-[11px] font-mono text-mute uppercase">
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
                          <p className="text-[11px] text-mute font-mono truncate">
                            OEM #{p.oem} · {p.fits}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 pl-2">
                        <p className="text-[13px] font-semibold text-ink">{inr(p.price)}</p>
                        <span className="text-[10px] text-stock font-mono">In stock</span>
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
          {nav.map((n, i) => (
            <Link
              key={n}
              href={
                i === 0
                  ? "/bikes/classic-350"
                  : i === 1
                  ? "/parts/p1"
                  : i === 2
                  ? "/categories/brakes-hydraulics"
                  : i === 3
                  ? "/#finder"
                  : "#"
              }
              className={`whitespace-nowrap ${
                i === 2
                  ? "font-semibold text-white bg-heritage px-2.5 py-1 rounded-md"
                  : i === 0
                  ? "font-medium text-ink"
                  : "text-mute hover:text-ink"
              }`}
            >
              {n}
            </Link>
          ))}
          <span className="ml-auto hidden whitespace-nowrap font-mono text-[11px] text-mute xl:inline">
            PIN Code Delivery Check <span className="mx-2 text-line">|</span> CATALOG V4.0.2
          </span>
        </div>
      </nav>

      {/* Bike Model Switch Modal */}
      <BikeModelSwitchModal
        isOpen={isBikeModalOpen}
        onClose={() => setIsBikeModalOpen(false)}
        currentSlug="classic-350"
      />

      {/* Mobile: delivery strip, search, chips */}
      <div className="md:hidden">
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
        <div className="shell pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mute" aria-hidden />
            <input
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-control border border-line bg-canvas pl-9 pr-10 text-sm outline-none placeholder:text-mute focus:border-ink"
              placeholder="Search parts, bike model or OEM number…"
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
    </header>
  );
}

export function TrustStrip() {
  return (
    <div className="hidden border-b border-line bg-canvas md:block">
      <div className="shell flex h-9 items-center gap-x-4 overflow-hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.04em] text-mute">
        <span>Factory direct inventory</span>
        <span className="text-line">·</span>
        <span>Royal Enfield genuine spares</span>
        <span className="text-line">·</span>
        <span>Guaranteed fitment</span>
        <span className="text-line">·</span>
        <span>Dispatched within 24h</span>
      </div>
    </div>
  );
}
