"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronDown,
  Check,
  Plus,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  X,
  Truck,
} from "lucide-react";
import { BikeDetail, CatalogPartItem, getBikeCatalogParts, inr } from "@/lib/data";
import { useCart } from "@/components/cart";

export function BikeCatalog({ bike }: { bike: BikeDetail }) {
  const { add } = useCart();
  const allParts = useMemo(() => getBikeCatalogParts(bike.slug), [bike.slug]);

  // States
  const [selectedAssembly, setSelectedAssembly] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isReadyDispatchOnly, setIsReadyDispatchOnly] = useState(false);
  const [selectedTrims, setSelectedTrims] = useState<string[]>(["All Editions (2021-2025)"]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(12500);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<"recommended" | "price-asc" | "price-desc" | "discount">("recommended");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter options definitions
  const trimOptions = [
    { name: "All Editions (2021-2025)", count: 48 },
    { name: "Dark Stealth / Gunmetal", count: 12 },
    { name: "Halcyon Series", count: 11 },
    { name: "Signals (Dual ABS)", count: 10 },
    { name: "Chrome Bronze / Red", count: 10 },
    { name: "Redditch Series", count: 5 },
  ];

  const brandOptions = [
    "Royal Enfield Genuine",
    "Rolon Chain Co.",
    "ByBre (Brembo India)",
    "Endurance Engineering",
    "Bosch Automotive",
  ];

  // Filtering logic
  const filteredParts = useMemo(() => {
    return allParts.filter((item) => {
      // Assembly
      if (selectedAssembly !== "all" && item.assembly !== selectedAssembly) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.oem.toLowerCase().includes(q) ||
          item.specLabel.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Ready dispatch
      if (isReadyDispatchOnly && !item.isQuickShip) return false;

      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) return false;

      // Price
      if (item.price > priceMax) return false;

      return true;
    });
  }, [allParts, selectedAssembly, searchQuery, isReadyDispatchOnly, selectedBrands, priceMax]);

  // Sorting logic
  const sortedParts = useMemo(() => {
    const list = [...filteredParts];
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "discount") {
      list.sort((a, b) => b.discountPct - a.discountPct);
    }
    return list;
  }, [filteredParts, sortOption]);

  const resetFilters = () => {
    setSelectedAssembly("all");
    setSearchQuery("");
    setIsReadyDispatchOnly(false);
    setSelectedTrims(["All Editions (2021-2025)"]);
    setSelectedBrands([]);
    setPriceMax(12500);
  };

  const handleToggleTrim = (trim: string) => {
    if (trim === "All Editions (2021-2025)") {
      setSelectedTrims(["All Editions (2021-2025)"]);
    } else {
      setSelectedTrims((prev) => {
        const cleaned = prev.filter((t) => t !== "All Editions (2021-2025)");
        return cleaned.includes(trim)
          ? cleaned.filter((t) => t !== trim)
          : [...cleaned, trim];
      });
    }
  };

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Assembly Filter Tabs (Desktop, Tablet, Mobile) */}
      <div className="no-scrollbar overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max">
          {bike.assemblies.map((asm) => {
            const isActive = selectedAssembly === asm.id;
            return (
              <button
                key={asm.id}
                onClick={() => {
                  setSelectedAssembly(asm.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 rounded-control px-3.5 py-2 text-[13px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-ink text-white shadow-sm"
                    : "bg-canvas border border-line text-mute hover:border-ink hover:text-ink"
                }`}
              >
                <span>{asm.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[11px] ${
                    isActive ? "bg-white/20 text-white" : "bg-well text-mute"
                  }`}
                >
                  {asm.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Search & Controls Bar */}
      <div className="space-y-3">
        {/* Mobile Search Input */}
        <div className="relative md:hidden">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mute" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${bike.name} parts (e.g. sprocket, gasket)...`}
            className="field h-11 pl-10 pr-4 text-[13px] rounded-control"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mute hover:text-ink"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Action Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-canvas p-3 md:px-5">
          {/* Left: Filter Trigger (Mobile/Tablet) + Result Count */}
          <div className="flex items-center gap-3">
            {/* Mobile/Tablet Filter Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-1.5 rounded-control border border-line bg-well px-3 py-1.5 text-[12px] font-medium text-ink hover:border-ink cursor-pointer"
            >
              <SlidersHorizontal className="size-3.5 text-heritage" />
              <span>Filters</span>
              {(selectedBrands.length > 0 || isReadyDispatchOnly || priceMax < 12500) && (
                <span className="grid size-4 place-items-center rounded-full bg-heritage text-[9px] font-bold text-white">
                  {selectedBrands.length + (isReadyDispatchOnly ? 1 : 0) + (priceMax < 12500 ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Desktop Verified count */}
            <span className="text-[13px] md:text-[14px] font-semibold text-ink">
              {sortedParts.length} Verified Components
            </span>

            {/* Desktop Active Filter Chips */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="rounded-full bg-well border border-line px-2.5 py-0.5 font-mono text-[11px] text-mute flex items-center gap-1">
                {bike.platformTag}
                <Check className="size-3 text-stock" />
              </span>
              {isReadyDispatchOnly && (
                <span className="rounded-full bg-stock/10 border border-stock/20 px-2.5 py-0.5 font-mono text-[11px] text-stock flex items-center gap-1">
                  Depot Stock
                  <button onClick={() => setIsReadyDispatchOnly(false)} className="hover:text-ink">
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {(isReadyDispatchOnly || selectedBrands.length > 0) && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-link hover:underline ml-1 cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Right: View Mode Toggle & Sort Dropdown */}
          <div className="flex items-center gap-2">
            {/* Desktop Grid / List view toggle */}
            <div className="hidden md:flex items-center rounded-control border border-line bg-well p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`grid size-7 place-items-center rounded-md transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-canvas shadow-sm text-ink" : "text-mute hover:text-ink"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`grid size-7 place-items-center rounded-md transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-canvas shadow-sm text-ink" : "text-mute hover:text-ink"
                }`}
                aria-label="List view"
              >
                <List className="size-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="field h-9 appearance-none truncate pr-8 pl-3 text-[12px] rounded-control font-medium bg-canvas cursor-pointer"
              >
                <option value="recommended">Sort: OEM Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Savings (%)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-mute" />
            </div>

            {/* OEM Validated Badge on Mobile/Tablet */}
            <span className="hidden sm:inline-flex lg:hidden items-center gap-1 font-mono text-[11px] text-stock font-medium bg-stock/10 px-2.5 py-1 rounded">
              <ShieldCheck className="size-3" /> 100% OEM Validated
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Catalog Layout: Left Sidebar + Right Products List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Filters (Desktop Only, 3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 rounded-card border border-line bg-canvas p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <span className="mono-spec text-[11px] font-bold text-ink">FILTERS</span>
            <button
              onClick={resetFilters}
              className="text-[12px] text-mute hover:text-ink flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>

          {/* Trim Edition Filter */}
          <div className="space-y-2.5">
            <h4 className="mono-spec text-[10px] text-ink font-semibold">
              TRIM EDITION ({bike.platformTag})
            </h4>
            <div className="space-y-1.5 text-[13px]">
              {trimOptions.map((opt) => (
                <label
                  key={opt.name}
                  className="flex items-center justify-between text-mute hover:text-ink cursor-pointer select-none py-0.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={selectedTrims.includes(opt.name)}
                      onChange={() => handleToggleTrim(opt.name)}
                      className="size-4 accent-heritage rounded cursor-pointer"
                    />
                    <span className="truncate">{opt.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-mute/80 pl-2">{opt.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ready to Dispatch Filter */}
          <div className="pt-3 border-t border-line/70">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isReadyDispatchOnly}
                onChange={(e) => setIsReadyDispatchOnly(e.target.checked)}
                className="mt-0.5 size-4 accent-heritage rounded cursor-pointer"
              />
              <div>
                <span className="text-[13px] font-medium text-ink block">Ready to Dispatch</span>
                <span className="text-[11px] text-mute font-mono block">Bangalore Depot Only</span>
              </div>
            </label>
          </div>

          {/* Major Assembly Filter */}
          <div className="pt-3 border-t border-line/70 space-y-2.5">
            <h4 className="mono-spec text-[10px] text-ink font-semibold">MAJOR ASSEMBLY</h4>
            <div className="space-y-1.5 text-[13px]">
              {bike.assemblies
                .filter((a) => a.id !== "all")
                .map((asm) => (
                  <label
                    key={asm.id}
                    className="flex items-center justify-between text-mute hover:text-ink cursor-pointer select-none py-0.5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedAssembly === asm.id}
                        onChange={() => setSelectedAssembly(asm.id)}
                        className="size-4 accent-heritage rounded cursor-pointer"
                      />
                      <span className="truncate">{asm.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-mute/80">{asm.count}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Top-1 OEM Brand Filter */}
          <div className="pt-3 border-t border-line/70 space-y-2.5">
            <h4 className="mono-spec text-[10px] text-ink font-semibold">TOP-1 OEM BRAND</h4>
            <div className="space-y-1.5 text-[13px]">
              {brandOptions.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-mute hover:text-ink cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleToggleBrand(brand)}
                    className="size-4 accent-heritage rounded cursor-pointer"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-3 border-t border-line/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="mono-spec text-[10px] text-ink font-semibold">PRICE RANGE</span>
              <span className="font-mono text-[11px] text-ink font-semibold">
                {inr(185)} – {inr(priceMax)}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={12500}
              step={250}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-heritage cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-mute">
              <span>{inr(185)}</span>
              <span>{inr(12500)}</span>
            </div>
          </div>
        </aside>

        {/* Right Content: Products Grid / List (lg: 9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {sortedParts.length === 0 ? (
            <div className="py-20 text-center rounded-panel border border-line bg-canvas p-8">
              <p className="text-[16px] font-semibold text-ink">No matching motorcycle components found</p>
              <p className="text-[13px] text-mute mt-1 max-w-sm mx-auto">
                Try clearing your search query or reset the filter criteria to browse all genuine spares.
              </p>
              <button onClick={resetFilters} className="btn-secondary h-10 px-4 mt-4 text-[13px] cursor-pointer">
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop & Tablet Product Cards Grid (Images 1 & 2) */}
              <div
                className={`hidden md:grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {sortedParts.map((item) => (
                  <article
                    key={item.id}
                    className="card card-hover flex flex-col justify-between p-4 bg-canvas group transition-all"
                  >
                    <div>
                      {/* Top Bar: OEM Ref + Badge */}
                      <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
                        <Link
                          href={`/parts/${item.partId}`}
                          className="text-mute group-hover:text-ink font-semibold truncate hover:underline"
                        >
                          REF # {item.oem}
                        </Link>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            item.tagType === "sealed"
                              ? "bg-stock/15 text-stock"
                              : item.tagType === "low-stock"
                              ? "bg-danger/15 text-danger"
                              : "bg-well text-mute border border-line"
                          }`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Product Image Stage */}
                      <Link
                        href={`/parts/${item.partId}`}
                        className="relative mt-3 aspect-[4/3] w-full rounded-xl bg-well/40 p-2 overflow-hidden flex items-center justify-center border border-line/60 group-hover:border-ink/30 transition-colors"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-full w-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute bottom-2 left-2 rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[9px] text-white backdrop-blur">
                          {item.specLabel}
                        </span>
                      </Link>

                      {/* Title & Description */}
                      <Link href={`/parts/${item.partId}`} className="block mt-3">
                        <h3 className="text-[14px] font-semibold text-ink line-clamp-1 leading-snug group-hover:text-heritage transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-[12px] text-mute line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Fitment Status */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-stock font-medium">
                        <Check className="size-3.5 text-stock shrink-0" />
                        <span className="truncate">{item.fitmentLabel}</span>
                      </div>
                    </div>

                    {/* Pricing & Add to Bag */}
                    <div className="mt-4 pt-3 border-t border-line/70">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[18px] font-bold text-ink">{inr(item.price)}</span>
                          <span className="ml-2 font-mono text-[12px] text-mute line-through">
                            {inr(item.mrp)}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-mute">{item.stockText}</span>
                      </div>

                      <button
                        onClick={() =>
                          add({
                            id: item.partId,
                            name: item.name,
                            price: item.price,
                            img: item.img,
                            oem: item.oem,
                          })
                        }
                        className="btn-primary w-full h-10 mt-2.5 text-[13px] font-semibold gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="size-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Mobile Product List (Clean Horizontal Tiles, Image 3) */}
              <div className="md:hidden space-y-3">
                {sortedParts.slice(0, mobileVisibleCount).map((item) => (
                  <article
                    key={item.id}
                    className="rounded-card border border-line bg-canvas p-3.5 shadow-sm space-y-2.5"
                  >
                    <div className="flex gap-3">
                      {/* Left Thumbnail with OEM badge */}
                      <Link
                        href={`/parts/${item.partId}`}
                        className="relative size-20 rounded-xl bg-well/50 border border-line p-1.5 shrink-0 flex items-center justify-center overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.img}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                        <span className="absolute top-1 left-1 rounded bg-canvas border border-line px-1 py-0.2 font-mono text-[8px] font-bold text-mute">
                          OEM
                        </span>
                      </Link>

                      {/* Right Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-semibold text-mute truncate">
                            OEM # {item.oem}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded bg-stock/15 px-1.5 py-0.2 font-mono text-[9px] font-bold text-stock uppercase">
                            <span className="size-1.5 rounded-full bg-stock" /> Match
                          </span>
                        </div>

                        <Link href={`/parts/${item.partId}`} className="block mt-0.5">
                          <h4 className="text-[13px] font-bold text-ink line-clamp-1 leading-snug">
                            {item.name}
                          </h4>
                        </Link>

                        <p className="text-[11px] text-mute truncate mt-0.5">{item.specLabel}</p>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-[15px] font-bold text-ink">{inr(item.price)}</span>
                          <span className="font-mono text-[11px] text-mute line-through">
                            {inr(item.mrp)}
                          </span>
                          <span className="rounded bg-stock/10 px-1 py-0.2 font-mono text-[10px] font-bold text-stock">
                            {item.discountPct}% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Add Action */}
                    <div className="pt-2 border-t border-line/60 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="flex items-center gap-1 font-mono text-[10px] text-stock font-medium">
                          <Zap className="size-3 text-stock fill-stock" /> Next Day Delivery
                        </p>
                        <p className="font-mono text-[10px] text-mute truncate mt-0.5">
                          {item.stockDepot}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          add({
                            id: item.partId,
                            name: item.name,
                            price: item.price,
                            img: item.img,
                            oem: item.oem,
                          })
                        }
                        className="btn-primary h-8 px-3 text-[12px] font-semibold shrink-0 cursor-pointer"
                      >
                        <Plus className="size-3" /> Add
                      </button>
                    </div>
                  </article>
                ))}

                {/* Mobile Progress Bar & Load Next */}
                <div className="pt-4 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-well overflow-hidden">
                      <div
                        className="h-full bg-ink rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (mobileVisibleCount / sortedParts.length) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-mute">
                      Showing {Math.min(mobileVisibleCount, sortedParts.length)} of {sortedParts.length} parts
                    </span>
                  </div>

                  {mobileVisibleCount < sortedParts.length && (
                    <button
                      onClick={() => setMobileVisibleCount((prev) => prev + 10)}
                      className="btn-secondary w-full h-11 text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Load Next 10 Parts</span>
                      <ChevronDown className="size-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Desktop & Tablet Pagination (Images 1 & 2) */}
              <div className="hidden md:flex items-center justify-between border-t border-line pt-5 font-mono text-[12px] text-mute">
                <span>Showing 1 to {sortedParts.length} of {sortedParts.length} Parts (Page 1 of 1)</span>
                <div className="flex items-center gap-1">
                  <button className="grid size-8 place-items-center rounded-control border border-line bg-canvas text-mute hover:border-ink cursor-pointer">
                    &lt;
                  </button>
                  <button className="grid size-8 place-items-center rounded-control bg-ink text-white font-semibold">
                    1
                  </button>
                  <button className="grid size-8 place-items-center rounded-control border border-line bg-canvas text-mute hover:border-ink cursor-pointer">
                    2
                  </button>
                  <button className="grid size-8 place-items-center rounded-control border border-line bg-canvas text-mute hover:border-ink cursor-pointer">
                    &gt;
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Mobile & Tablet Filter Drawer / Sheet */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-sm bg-canvas shadow-2xl flex flex-col border-l border-line">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-heritage" />
                  <h3 className="text-[16px] font-semibold text-ink">Catalog Filters</h3>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div>
                  <h4 className="mono-spec text-[11px] text-ink font-semibold mb-2">TRIM EDITION</h4>
                  <div className="space-y-2 text-[13px]">
                    {trimOptions.map((opt) => (
                      <label key={opt.name} className="flex items-center justify-between text-mute">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedTrims.includes(opt.name)}
                            onChange={() => handleToggleTrim(opt.name)}
                            className="size-4 accent-heritage rounded"
                          />
                          {opt.name}
                        </span>
                        <span className="font-mono text-[11px] text-mute/80">{opt.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-line/60">
                  <label className="flex items-center gap-2 text-[13px] font-medium text-ink">
                    <input
                      type="checkbox"
                      checked={isReadyDispatchOnly}
                      onChange={(e) => setIsReadyDispatchOnly(e.target.checked)}
                      className="size-4 accent-heritage rounded"
                    />
                    Ready to Dispatch (Depot Only)
                  </label>
                </div>

                <div className="pt-3 border-t border-line/60">
                  <h4 className="mono-spec text-[11px] text-ink font-semibold mb-2">OEM BRANDS</h4>
                  <div className="space-y-2 text-[13px]">
                    {brandOptions.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 text-mute">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleToggleBrand(brand)}
                          className="size-4 accent-heritage rounded"
                        />
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-line/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono-spec text-[11px] text-ink font-semibold">MAX PRICE</span>
                    <span className="font-mono text-[12px] font-bold text-ink">{inr(priceMax)}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={12500}
                    step={250}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-heritage"
                  />
                </div>
              </div>

              <div className="border-t border-line p-4 bg-offset flex gap-2">
                <button
                  onClick={resetFilters}
                  className="btn-secondary flex-1 h-11 text-[13px] font-medium cursor-pointer"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="btn-primary flex-1 h-11 text-[13px] font-medium cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
