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
  ShieldCheck,
  Zap,
  X,
  ArrowRight,
  Truck,
  FileText,
} from "lucide-react";
import {
  CategoryDetail,
  CategoryProductItem,
  getCategoryProducts,
  inr,
} from "@/lib/data";
import { useCart } from "@/components/cart";

export function CategoryCatalog({
  category,
  selectedBikeFilter,
}: {
  category: CategoryDetail;
  selectedBikeFilter: string;
}) {
  const { add } = useCart();
  const allProducts = useMemo(() => getCategoryProducts(category.slug), [category.slug]);

  // States
  const [selectedSubCat, setSelectedSubCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInStockOnly, setIsInStockOnly] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>(
    selectedBikeFilter !== "all" ? [selectedBikeFilter] : []
  );
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedMount, setSelectedMount] = useState<"all" | "front" | "rear" | "dual">("all");
  const [maxPrice, setMaxPrice] = useState(4850);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<"relevance" | "price-asc" | "price-desc" | "discount">("relevance");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState(5);

  // Filter definitions
  const modelOptions = [
    { name: "Classic 350 (J-Series)", count: 34 },
    { name: "Interceptor / GT 650", count: 21 },
    { name: "Himalayan 450 (Sherpa)", count: 18 },
    { name: "Meteor 350 / Hunter", count: 19 },
    { name: "Standard 350 / 500 (UCE)", count: 11 },
  ];

  const manufacturerOptions = [
    "ByBre (Brembo India)",
    "RE Genuine Factory",
    "Endurance Tech",
    "Bosch ABS India",
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((item) => {
      // Sub-category
      if (selectedSubCat !== "all" && item.subCategory !== selectedSubCat) return false;

      // Global bike filter from hero
      if (selectedBikeFilter !== "all" && !item.compatibleBikes.includes(selectedBikeFilter)) {
        return false;
      }

      // Sidebar bike models
      if (
        selectedModels.length > 0 &&
        !selectedModels.some((m) => item.compatibleBikes.includes(m))
      ) {
        return false;
      }

      // Manufacturer
      if (
        selectedManufacturers.length > 0 &&
        !selectedManufacturers.includes(item.manufacturer)
      ) {
        return false;
      }

      // Mount position
      if (selectedMount !== "all" && item.mountPosition !== selectedMount) return false;

      // Price
      if (item.price > maxPrice) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.oem.toLowerCase().includes(q) ||
          item.fitsText.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [
    allProducts,
    selectedSubCat,
    selectedBikeFilter,
    selectedModels,
    selectedManufacturers,
    selectedMount,
    maxPrice,
    searchQuery,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "discount") {
      list.sort((a, b) => b.discountPct - a.discountPct);
    }
    return list;
  }, [filteredProducts, sortOption]);

  const resetFilters = () => {
    setSelectedSubCat("all");
    setSearchQuery("");
    setIsInStockOnly(false);
    setSelectedModels([]);
    setSelectedManufacturers([]);
    setSelectedMount("all");
    setMaxPrice(4850);
  };

  const handleToggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const handleToggleManufacturer = (mfr: string) => {
    setSelectedManufacturers((prev) =>
      prev.includes(mfr) ? prev.filter((m) => m !== mfr) : [...prev, mfr]
    );
  };

  return (
    <div className="space-y-5">
      {/* 1. Sub-Category Selector Pills */}
      <div className="no-scrollbar overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max">
          {category.subCategories.map((sub) => {
            const isActive = selectedSubCat === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCat(sub.id)}
                className={`flex items-center gap-2 rounded-control px-3.5 py-1.5 text-[12px] md:text-[13px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-ink text-white shadow-sm"
                    : "bg-canvas border border-line text-mute hover:border-ink hover:text-ink"
                }`}
              >
                <span>{sub.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-well text-mute"
                  }`}
                >
                  {sub.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Mobile Search Input */}
      <div className="relative md:hidden">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mute" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${category.name} (e.g. pads, caliper, rotor)...`}
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

      {/* 3. Action Strip: Filter Trigger, Verified Count & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line bg-canvas p-3 md:px-5">
        <div className="flex items-center gap-3">
          {/* Mobile/Tablet Filter Button */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden flex items-center gap-1.5 rounded-control border border-line bg-well px-3 py-1.5 text-[12px] font-medium text-ink hover:border-ink cursor-pointer"
          >
            <SlidersHorizontal className="size-3.5 text-heritage" />
            <span>Filters</span>
            {(selectedModels.length > 0 ||
              selectedManufacturers.length > 0 ||
              selectedMount !== "all") && (
              <span className="grid size-4 place-items-center rounded-full bg-heritage text-[9px] font-bold text-white">
                {selectedModels.length +
                  selectedManufacturers.length +
                  (selectedMount !== "all" ? 1 : 0)}
              </span>
            )}
          </button>

          <span className="text-[13px] md:text-[14px] font-semibold text-ink">
            Showing 1-{sortedProducts.length} of {sortedProducts.length} Parts
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-stock font-mono font-medium">
            <Check className="size-3" /> Express dispatch available
          </span>
        </div>

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
              <option value="relevance">SORT: OEM Index / Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Savings (%)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-mute" />
          </div>

          <span className="hidden lg:inline-flex items-center gap-1 font-mono text-[11px] text-stock font-semibold bg-stock/10 px-2.5 py-1 rounded">
            <ShieldCheck className="size-3" /> 100% Guaranteed Fit
          </span>
        </div>
      </div>

      {/* 4. Specification Standard Notification Banner (Image 3) */}
      <div className="rounded-control border border-line/80 bg-well/60 px-4 py-2.5 flex items-center justify-between gap-3 text-[12px]">
        <div className="flex items-center gap-2 text-ink/90 min-w-0">
          <ShieldCheck className="size-4 text-heritage shrink-0" />
          <span className="truncate">
            <b className="font-semibold text-ink">Royal Enfield Factory Specification Standard:</b>{" "}
            All friction materials carry official batch serial stamps and copper-free environmental certification.
          </span>
        </div>
        <button
          onClick={() => alert("Opening Friction Data Sheet & Material Metrology Certificate")}
          className="text-link hover:underline shrink-0 font-medium text-[12px] flex items-center gap-1 cursor-pointer"
        >
          <span>Friction Data Sheet</span>
          <ArrowRight className="size-3" />
        </button>
      </div>

      {/* 5. Main Layout: Left Sidebar + Right Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar Filters (Desktop Only, 3 Cols, Image 3) */}
        <aside className="hidden lg:block lg:col-span-3 rounded-card border border-line bg-canvas p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <span className="text-[13px] font-semibold text-ink">Filters</span>
            <button
              onClick={resetFilters}
              className="text-[12px] text-mute hover:text-ink flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="size-3" /> Reset all
            </button>
          </div>

          {/* In-Stock Only */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isInStockOnly}
                onChange={(e) => setIsInStockOnly(e.target.checked)}
                className="mt-0.5 size-4 accent-heritage rounded cursor-pointer"
              />
              <div>
                <span className="text-[13px] font-medium text-ink block">In-Stock Only</span>
                <span className="text-[11px] text-mute block">Depot BLR &amp; MAA ready</span>
              </div>
            </label>
          </div>

          {/* Sub-Categories List */}
          <div className="pt-3 border-t border-line/70 space-y-2">
            <h4 className="text-[12px] text-ink font-semibold">Sub-Categories</h4>
            <div className="space-y-1.5 text-[13px]">
              {category.subCategories
                .filter((s) => s.id !== "all")
                .map((sub) => (
                  <label
                    key={sub.id}
                    className="flex items-center justify-between text-mute hover:text-ink cursor-pointer select-none py-0.5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedSubCat === sub.id}
                        onChange={() =>
                          setSelectedSubCat(selectedSubCat === sub.id ? "all" : sub.id)
                        }
                        className="size-4 accent-heritage rounded cursor-pointer"
                      />
                      <span className="truncate">{sub.name}</span>
                    </div>
                    <span className="text-[12px] text-mute/80">{sub.count}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Model Compatibility */}
          <div className="pt-3 border-t border-line/70 space-y-2">
            <h4 className="text-[12px] text-ink font-semibold">Model Compatibility</h4>
            <div className="space-y-1.5 text-[13px]">
              {modelOptions.map((opt) => (
                <label
                  key={opt.name}
                  className="flex items-center justify-between text-mute hover:text-ink cursor-pointer select-none py-0.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(opt.name)}
                      onChange={() => handleToggleModel(opt.name)}
                      className="size-4 accent-heritage rounded cursor-pointer"
                    />
                    <span className="truncate">{opt.name}</span>
                  </div>
                  <span className="text-[12px] text-mute/80">{opt.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* OEM Manufacturer */}
          <div className="pt-3 border-t border-line/70 space-y-2">
            <h4 className="text-[12px] text-ink font-semibold">OEM Manufacturer</h4>
            <div className="space-y-1.5 text-[13px]">
              {manufacturerOptions.map((mfr) => (
                <label
                  key={mfr}
                  className="flex items-center gap-2 text-mute hover:text-ink cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedManufacturers.includes(mfr)}
                    onChange={() => handleToggleManufacturer(mfr)}
                    className="size-4 accent-heritage rounded cursor-pointer"
                  />
                  <span className="truncate">{mfr}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mount Position */}
          <div className="pt-3 border-t border-line/70 space-y-2">
            <h4 className="text-[12px] text-ink font-semibold">Mount Position</h4>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <button
                type="button"
                onClick={() => setSelectedMount(selectedMount === "front" ? "all" : "front")}
                className={`py-1.5 rounded-control border text-center transition-all cursor-pointer ${
                  selectedMount === "front"
                    ? "bg-heritage text-white border-heritage"
                    : "bg-well text-mute border-line hover:border-ink"
                }`}
              >
                Front
              </button>
              <button
                type="button"
                onClick={() => setSelectedMount(selectedMount === "rear" ? "all" : "rear")}
                className={`py-1.5 rounded-control border text-center transition-all cursor-pointer ${
                  selectedMount === "rear"
                    ? "bg-heritage text-white border-heritage"
                    : "bg-well text-mute border-line hover:border-ink"
                }`}
              >
                Rear
              </button>
              <button
                type="button"
                onClick={() => setSelectedMount(selectedMount === "dual" ? "all" : "dual")}
                className={`col-span-2 py-1.5 rounded-control border text-center transition-all cursor-pointer ${
                  selectedMount === "dual"
                    ? "bg-heritage text-white border-heritage"
                    : "bg-well text-mute border-line hover:border-ink"
                }`}
              >
                Dual-Channel Setup
              </button>
            </div>
          </div>

          {/* Price Bracket Slider */}
          <div className="pt-3 border-t border-line/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-ink font-semibold">Price Bracket</span>
              <span className="text-[12px] text-ink font-semibold">
                {inr(340)} – {inr(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={4850}
              step={150}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-heritage cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-mute">
              <span>{inr(340)}</span>
              <span>{inr(4850)}</span>
            </div>
          </div>
        </aside>

        {/* Right Products Container (lg: 9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center rounded-panel border border-line bg-canvas p-8">
              <p className="text-[16px] font-semibold text-ink">No components match your filter criteria</p>
              <p className="text-[13px] text-mute mt-1 max-w-sm mx-auto">
                Try expanding your price range or select &ldquo;All RE Models&rdquo; to browse all genuine spares.
              </p>
              <button onClick={resetFilters} className="btn-secondary h-10 px-4 mt-4 text-[13px] cursor-pointer">
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop & Tablet Product Cards Grid (Images 1 & 3) */}
              <div
                className={`hidden md:grid gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((p) => (
                  <article
                    key={p.id}
                    className="card card-hover flex flex-col justify-between p-4 bg-canvas group transition-all"
                  >
                    <div>
                      {/* Top Bar: OEM code + Stock Count */}
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <Link
                          href={`/parts/${p.partId}`}
                          className="part-ref truncate hover:underline"
                        >
                          OEM # {p.oem}
                        </Link>
                        <span className="inline-flex items-center gap-1 text-stock font-medium text-[10px]">
                          <span className="size-1.5 rounded-full bg-stock" />
                          {p.stockCount} in stock
                        </span>
                      </div>

                      {/* Image Stage */}
                      <Link
                        href={`/parts/${p.partId}`}
                        className="relative mt-3 aspect-[4/3] w-full rounded-xl bg-well/40 p-2 overflow-hidden flex items-center justify-center border border-line/60 group-hover:border-ink/30 transition-colors"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.img}
                          alt={p.name}
                          className="h-full w-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute bottom-2 left-2 rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[9px] text-white backdrop-blur">
                          {p.imageLabel}
                        </span>
                      </Link>

                      {/* Title & Fitment */}
                      <Link href={`/parts/${p.partId}`} className="block mt-3">
                        <h3 className="text-[14px] font-semibold text-ink line-clamp-1 leading-snug group-hover:text-heritage transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <p className="mt-1 text-[12px] text-stock flex items-center gap-1 font-medium truncate">
                        <Check className="size-3.5 text-stock shrink-0" />
                        <span>{p.fitsText}</span>
                      </p>

                      <p className="mt-1 text-[12px] text-mute line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Price & Add to Bag */}
                    <div className="mt-4 pt-3 border-t border-line/70">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[18px] font-bold text-ink">{inr(p.price)}</span>
                          <span className="ml-2 font-mono text-[12px] text-mute line-through">
                            {inr(p.mrp)}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-stock bg-stock/10 px-1.5 py-0.5 rounded font-semibold">
                          Save {inr(p.mrp - p.price)} ({p.discountPct}%)
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          add({
                            id: p.partId,
                            name: p.name,
                            price: p.price,
                            img: p.img,
                            oem: p.oem,
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

              {/* Mobile Product List (Clean Horizontal Cards, Image 2) */}
              <div className="md:hidden space-y-3">
                {sortedProducts.slice(0, mobileVisibleCount).map((p) => (
                  <article
                    key={p.id}
                    className="rounded-card border border-line bg-canvas p-3.5 shadow-sm space-y-2.5"
                  >
                    <div className="flex gap-3">
                      {/* Left Thumbnail with Badge */}
                      <Link
                        href={`/parts/${p.partId}`}
                        className="relative size-20 rounded-xl bg-well/50 border border-line p-1.5 shrink-0 flex items-center justify-center overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.img}
                          alt={p.name}
                          className="h-full w-full object-contain"
                        />
                        <span className="absolute bottom-1 left-1 rounded bg-canvas border border-line px-1 py-0.2 font-mono text-[8px] font-bold text-mute uppercase">
                          {p.mountPosition}
                        </span>
                      </Link>

                      {/* Right Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-semibold text-mute truncate">
                            OEM # {p.oem}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-stock font-medium">
                            <span className="size-1.5 rounded-full bg-stock" />
                            {p.stockCount} in stock
                          </span>
                        </div>

                        <Link href={`/parts/${p.partId}`} className="block mt-0.5">
                          <h4 className="text-[13px] font-bold text-ink line-clamp-1 leading-snug">
                            {p.name}
                          </h4>
                        </Link>

                        <p className="text-[11px] text-mute truncate mt-0.5">{p.fitsText}</p>

                        {/* Badges */}
                        <div className="mt-1 flex flex-wrap gap-1">
                          {p.badges.map((b) => (
                            <span
                              key={b}
                              className="rounded bg-well px-1.5 py-0.2 font-mono text-[9px] text-mute border border-line"
                            >
                              {b}
                            </span>
                          ))}
                        </div>

                        <div className="mt-1.5 flex items-baseline gap-2">
                          <span className="text-[15px] font-bold text-ink">{inr(p.price)}</span>
                          <span className="font-mono text-[11px] text-mute line-through">
                            {inr(p.mrp)}
                          </span>
                          <span className="rounded bg-stock/10 px-1 py-0.2 font-mono text-[10px] font-bold text-stock">
                            {p.discountPct}% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Add Button */}
                    <div className="pt-2 border-t border-line/60 flex items-center justify-between gap-2">
                      <p className="font-mono text-[10px] text-stock flex items-center gap-1">
                        <Truck className="size-3 text-stock" /> Next Day Dispatch
                      </p>

                      <button
                        onClick={() =>
                          add({
                            id: p.partId,
                            name: p.name,
                            price: p.price,
                            img: p.img,
                            oem: p.oem,
                          })
                        }
                        className="btn-primary h-8 px-3 text-[12px] font-semibold shrink-0 cursor-pointer"
                      >
                        <Plus className="size-3" /> Add
                      </button>
                    </div>
                  </article>
                ))}

                {/* Mobile Progress & Load Next */}
                <div className="pt-4 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1.5 w-24 rounded-full bg-well overflow-hidden">
                      <div
                        className="h-full bg-ink rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (mobileVisibleCount / sortedProducts.length) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-mute">
                      Showing {Math.min(mobileVisibleCount, sortedProducts.length)} of{" "}
                      {sortedProducts.length} parts
                    </span>
                  </div>

                  {mobileVisibleCount < sortedProducts.length && (
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

              {/* Desktop & Tablet Pagination (Images 1 & 3) */}
              <div className="hidden md:flex items-center justify-between border-t border-line pt-5 font-mono text-[12px] text-mute">
                <span>
                  Showing 1 to {sortedProducts.length} of {sortedProducts.length} Parts (Page 1 of 1)
                </span>
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

      {/* 6. Mobile & Tablet Filter Drawer */}
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
                  <h3 className="text-[16px] font-semibold text-ink">Category Filters</h3>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Mount Position */}
                <div>
                  <h4 className="text-[13px] text-ink font-semibold mb-2">Mount Position</h4>
                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <button
                      type="button"
                      onClick={() => setSelectedMount(selectedMount === "front" ? "all" : "front")}
                      className={`py-1.5 rounded-control border text-center transition-all ${
                        selectedMount === "front"
                          ? "bg-heritage text-white border-heritage"
                          : "bg-well text-mute border-line"
                      }`}
                    >
                      Front
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMount(selectedMount === "rear" ? "all" : "rear")}
                      className={`py-1.5 rounded-control border text-center transition-all ${
                        selectedMount === "rear"
                          ? "bg-heritage text-white border-heritage"
                          : "bg-well text-mute border-line"
                      }`}
                    >
                      Rear
                    </button>
                  </div>
                </div>

                {/* Sub-categories */}
                <div className="pt-3 border-t border-line/60">
                  <h4 className="text-[13px] text-ink font-semibold mb-2">Sub-Categories</h4>
                  <div className="space-y-2 text-[13px]">
                    {category.subCategories
                      .filter((s) => s.id !== "all")
                      .map((sub) => (
                        <label key={sub.id} className="flex items-center justify-between text-mute">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedSubCat === sub.id}
                              onChange={() =>
                                setSelectedSubCat(selectedSubCat === sub.id ? "all" : sub.id)
                              }
                              className="size-4 accent-heritage rounded"
                            />
                            {sub.name}
                          </span>
                          <span className="text-[12px] text-mute/80">{sub.count}</span>
                        </label>
                      ))}
                  </div>
                </div>

                {/* Model Compatibility */}
                <div className="pt-3 border-t border-line/60">
                  <h4 className="text-[13px] text-ink font-semibold mb-2">
                    Model Compatibility
                  </h4>
                  <div className="space-y-2 text-[13px]">
                    {modelOptions.map((opt) => (
                      <label key={opt.name} className="flex items-center justify-between text-mute">
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedModels.includes(opt.name)}
                            onChange={() => handleToggleModel(opt.name)}
                            className="size-4 accent-heritage rounded"
                          />
                          {opt.name}
                        </span>
                        <span className="text-[12px] text-mute/80">{opt.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Bracket */}
                <div className="pt-3 border-t border-line/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-ink font-semibold">Max Price</span>
                    <span className="text-[13px] font-semibold text-ink">{inr(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={4850}
                    step={150}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
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
