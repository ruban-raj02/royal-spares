"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, ShieldCheck, Wrench, Sparkles, Compass } from "lucide-react";
import { BikeDetail } from "@/lib/data";
import { BikeModelSwitchModal } from "./bike-model-switch-modal";

export function BikeHero({ bike }: { bike: BikeDetail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="mb-6 md:mb-8">
      {/* 1. Desktop & Tablet Top Breadcrumb + Telemetry Bar */}
      <div className="hidden md:flex items-center justify-between border-b border-line/70 pb-3 font-mono text-[11px] text-mute">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                CATALOGUE
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/bikes/classic-350" className="hover:text-ink transition-colors">
                ROYAL ENFIELD
              </Link>
            </li>
            <li>/</li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-ink font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                {bike.name.toUpperCase()}
                <ChevronDown className="size-3" />
              </button>
            </li>
            <li>/</li>
            <li className="font-semibold text-ink bg-well px-2 py-0.5 rounded border border-line">
              {bike.platform}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-stock" />
            {bike.schematicRev}
          </span>
          <span className="text-line">|</span>
          <span>{bike.depotStock}</span>
        </div>
      </div>

      {/* 2. Mobile Model Switcher Header (Visible on Mobile only, as in Image 3) */}
      <div className="md:hidden pb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-[22px] font-bold text-ink cursor-pointer"
          >
            <span>{bike.name}</span>
            <ChevronDown className="size-5 text-mute" />
          </button>
          <span className="rounded-full bg-well border border-line px-2.5 py-0.5 font-mono text-[11px] font-semibold text-mute">
            {bike.platformTag}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-control border border-line/80 bg-well/60 px-3 py-1.5 text-[12px]">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink font-medium">
            <span className="size-2 rounded-full bg-stock" />
            {bike.garageSync}
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[12px] font-medium text-link hover:underline cursor-pointer"
          >
            Change
          </button>
        </div>
      </div>

      {/* 3. Hero Card Stage (Desktop & Tablet) */}
      <div className="relative mt-3 overflow-hidden rounded-panel border border-line bg-canvas p-5 md:p-8 shadow-sm">
        {/* Background Watermark */}
        <div className="absolute right-4 bottom-2 font-mono text-[64px] md:text-[110px] font-black tracking-tighter text-black/[0.03] select-none pointer-events-none leading-none">
          {bike.watermark}
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Text Block (lg: 8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Badges on desktop/tablet */}
            <div className="hidden md:flex flex-wrap items-center gap-2 text-[12px]">
              <span className="rounded-md bg-ink px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-white uppercase">
                OEM FACTORY CATALOG
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-stock/30 bg-stock/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-stock">
                <span className="size-1.5 rounded-full bg-stock" />
                Matched Active Garage: {bike.garageSync}
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[11px] font-medium text-link hover:underline ml-1 cursor-pointer"
              >
                Change Bike
              </button>
            </div>

            <h1 className="text-[26px] md:text-[34px] font-bold tracking-tight text-ink leading-tight">
              {bike.title}
            </h1>

            <p className="max-w-2xl text-[13px] md:text-[14px] leading-relaxed text-mute">
              {bike.subtitle}
            </p>

            {/* Spec Strip: 4 Columns (Desktop & Tablet) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-3 border-t border-line/80 font-mono">
              {bike.specs.map((s) => (
                <div key={s.label} className="rounded-control border border-line/70 bg-well/40 p-2.5">
                  <span className="block text-[9px] md:text-[10px] text-mute uppercase tracking-wider">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[11px] md:text-[12px] font-semibold text-ink">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Microfiche / Fitment Callout (lg: 4 cols) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between rounded-card border border-heritage/40 bg-gradient-to-br from-[#1d3329] to-[#12221b] p-5 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                  <Compass className="size-3.5 text-white" />
                  EXPLORE MICROFICHE
                </span>
                <h3 className="mt-1 text-[16px] font-semibold text-white">
                  Exploded Assembly View ({bike.platformTag})
                </h3>
              </div>
              <span className="size-8 rounded-full bg-white/10 grid place-items-center">
                <Wrench className="size-4 text-white" />
              </span>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-white/80">
              Interactive 2D blueprints with verified torque figures and bolt patterns for certified overhaul.
            </p>

            <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-stock-light text-white/90 font-medium">
                <ShieldCheck className="size-3.5 text-emerald-400" />
                100% Fitment Warranted
              </span>
              <button
                onClick={() => alert("Royal Spares 100% Fitment Guarantee: All OEM parts are checked against factory microfiche.")}
                className="text-white/70 hover:text-white underline underline-offset-2 cursor-pointer"
              >
                View Policy
              </button>
            </div>
          </div>

          {/* Tablet Fitment Assurance Circular Graphic (md to lg) */}
          <div className="hidden md:flex lg:hidden col-span-4 items-center justify-center p-3 rounded-card border border-line bg-well/50">
            <div className="text-center">
              <div className="inline-flex size-16 items-center justify-center rounded-full border-4 border-heritage/30 bg-canvas text-heritage shadow-inner mb-2">
                <ShieldCheck className="size-8 text-heritage" />
              </div>
              <p className="text-[12px] font-bold text-ink">FITMENT ASSURANCE</p>
              <p className="text-[11px] font-mono text-stock">100% Factory Tolerance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Switch Modal */}
      <BikeModelSwitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSlug={bike.slug}
      />
    </section>
  );
}
