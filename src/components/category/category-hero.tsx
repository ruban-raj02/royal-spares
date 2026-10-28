"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Disc3,
  Funnel,
  Cog,
  Cable,
  Zap,
  Shield,
  Bike,
  Activity,
  Check,
} from "lucide-react";
import { CategoryDetail, categories, bikes } from "@/lib/data";
import { BikeModelSwitchModal } from "@/components/bike/bike-model-switch-modal";

const icons = {
  disc: Disc3,
  filter: Funnel,
  cog: Cog,
  cable: Cable,
  zap: Zap,
  shield: Shield,
} as const;

export function CategoryHero({
  category,
  selectedBikeFilter,
  onSelectBikeFilter,
}: {
  category: CategoryDetail;
  selectedBikeFilter: string;
  onSelectBikeFilter: (bike: string) => void;
}) {
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);

  return (
    <section className="mb-6 md:mb-8 space-y-4">
      {/* 1. Top Telemetry Bar (Desktop & Tablet) */}
      <div className="hidden md:flex items-center justify-between border-b border-line/70 pb-3 font-mono text-[11px] text-mute">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-stock animate-pulse" />
          <span className="font-semibold text-ink">LIVE CENTRAL INVENTORY DEPOT</span>
          <span>•</span>
          <span>CHENNAI HUB (ZONE A)</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Sync: 14:02:18 IST</span>
          <span className="text-line">|</span>
          <span className="text-stock font-medium">All 16 OEM Items Indexed</span>
        </div>
      </div>

      {/* 2. Breadcrumbs (Desktop & Tablet) */}
      <nav aria-label="Breadcrumb" className="hidden md:block">
        <ol className="flex items-center gap-1.5 font-mono text-[11px] text-mute">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Catalogue
            </Link>
          </li>
          <li>/</li>
          <li>
            <span className="text-mute">Category Browse</span>
          </li>
          <li>/</li>
          <li className="font-semibold text-ink bg-well px-2 py-0.5 rounded border border-line">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* 3. Hero Header Box */}
      <div className="rounded-panel border border-line bg-canvas p-4 md:p-7 shadow-sm relative overflow-hidden">
        {/* Background Subtle Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-heritage/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            {/* Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-well border border-line px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-mute uppercase">
                {category.eyebrow}
              </span>
              <span className="font-mono text-[10px] text-mute/80 hidden sm:inline">
                {category.standards}
              </span>
              {/* Mobile badge */}
              <span className="md:hidden rounded-full bg-stock/10 border border-stock/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-stock">
                {category.partsCount} OEM Parts
              </span>
            </div>

            <h1 className="text-[24px] md:text-[32px] font-bold tracking-tight text-ink leading-tight">
              {category.title}
            </h1>

            <p className="text-[13px] md:text-[14px] leading-relaxed text-mute max-w-2xl">
              {category.subtitle}
            </p>
          </div>

          {/* Quality & Tolerance Specs (Desktop Right Side) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="rounded-card border border-line bg-well/50 p-3 text-center min-w-[110px]">
              <span className="mono-spec text-[9px] block">SAFETY TESTED</span>
              <span className="font-bold text-[16px] text-ink block mt-0.5">
                {category.safetyTested}
              </span>
            </div>
            <div className="rounded-card border border-line bg-well/50 p-3 text-center min-w-[110px]">
              <span className="mono-spec text-[9px] block">TOLERANCE</span>
              <span className="font-mono font-bold text-[16px] text-ink block mt-0.5">
                {category.tolerance}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Horizontal Category Switcher Buttons */}
        <div className="mt-5 pt-4 border-t border-line/70 no-scrollbar overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((c) => {
              const isCurrent = c.slug === category.slug;
              const IconComp = icons[c.icon as keyof typeof icons] || Disc3;
              return (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className={`flex items-center gap-2 rounded-control px-3.5 py-2 text-[12px] md:text-[13px] font-medium transition-all ${
                    isCurrent
                      ? "bg-heritage text-white shadow-sm ring-1 ring-heritage"
                      : "bg-canvas border border-line text-mute hover:border-ink hover:text-ink"
                  }`}
                >
                  <IconComp className="size-3.5 shrink-0" />
                  <span>{c.name}</span>
                  {isCurrent && <Check className="size-3.5 text-white" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 5. Motorcycle Calibration & Compatibility Filter Bar */}
        <div className="mt-4 rounded-control border border-line/80 bg-well/60 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-md bg-canvas border border-line grid place-items-center text-heritage shrink-0">
              <Bike className="size-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-mute uppercase tracking-wider block">
                MOTORCYCLE CALIBRATION PROFILE
              </span>
              <span className="font-medium text-ink">
                Bike Compatibility: Showing parts for{" "}
                <b className="font-semibold text-heritage">
                  {selectedBikeFilter === "all" ? "All RE Models" : selectedBikeFilter}
                </b>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Quick dropdown for filtering models */}
            <div className="relative">
              <select
                value={selectedBikeFilter}
                onChange={(e) => onSelectBikeFilter(e.target.value)}
                className="field h-8 appearance-none truncate pr-7 pl-2.5 text-[11px] font-mono rounded-md bg-canvas border border-line cursor-pointer"
              >
                <option value="all">All RE Models</option>
                <option value="Classic 350 (J-Series)">Classic 350 (J-Series)</option>
                <option value="Interceptor / GT 650">Interceptor / GT 650</option>
                <option value="Himalayan 450 (Sherpa)">Himalayan 450 (Sherpa)</option>
                <option value="Meteor 350 / Hunter">Meteor 350 / Hunter</option>
                <option value="Standard 350 / 500 (UCE)">Standard 350 / 500 (UCE)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-mute" />
            </div>

            {/* Garage sync badge */}
            <button
              onClick={() => setIsBikeModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-2.5 py-1 text-[11px] font-mono font-medium text-ink hover:border-ink cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-stock" />
              <span>KA-01-MJ-4520</span>
              <ChevronDown className="size-3 text-mute" />
            </button>
          </div>
        </div>
      </div>

      {/* Model Switcher Modal */}
      <BikeModelSwitchModal
        isOpen={isBikeModalOpen}
        onClose={() => setIsBikeModalOpen(false)}
        currentSlug="classic-350"
      />
    </section>
  );
}
