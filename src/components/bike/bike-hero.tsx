"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BikeDetail } from "@/lib/data";
import { BikeModelSwitchModal } from "./bike-model-switch-modal";

export function BikeHero({ bike }: { bike: BikeDetail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && bike?.slug) {
      localStorage.setItem("royalspares_active_bike", bike.slug);
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("bike-change", { detail: bike.slug }));
    }
  }, [bike?.slug]);

  return (
    <section className="mb-6 md:mb-8">
      {/* 1. Desktop & Tablet Top Breadcrumb Bar */}
      <div className="hidden md:flex items-center justify-between border-b border-line/70 pb-3 text-[12px] text-mute">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">
                Catalogue
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/bikes/${bike.slug}`} className="hover:text-ink transition-colors">
                Royal Enfield
              </Link>
            </li>
            <li>/</li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-ink font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                {bike.name}
                <ChevronDown className="size-3" />
              </button>
            </li>
            <li>/</li>
            <li className="font-semibold text-ink bg-well px-2 py-0.5 rounded border border-line">
              {bike.platform}
            </li>
          </ol>
        </nav>
      </div>

      {/* 2. Mobile Model Switcher Header */}
      <div className="md:hidden pb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-[22px] font-bold text-ink cursor-pointer"
          >
            <span>{bike.name}</span>
            <ChevronDown className="size-5 text-mute" />
          </button>
          <span className="rounded-full bg-well border border-line px-2.5 py-0.5 text-[11px] font-medium text-mute">
            {bike.platformTag}
          </span>
        </div>
      </div>

      {/* 3. Hero Card Stage (Desktop & Tablet) */}
      <div className="relative mt-3 overflow-hidden rounded-panel border border-line bg-canvas p-5 md:p-7 shadow-sm">
        {/* Background Watermark */}
        <div className="absolute right-6 bottom-3 font-mono text-[64px] md:text-[96px] font-black tracking-tighter text-black/[0.03] select-none pointer-events-none leading-none">
          {bike.watermark}
        </div>

        <div className="relative z-10 max-w-3xl space-y-2">
          <h1 className="text-[24px] md:text-[30px] font-bold tracking-tight text-ink leading-tight">
            {bike.title}
          </h1>

          <p className="text-[13px] md:text-[14px] leading-relaxed text-mute">
            {bike.subtitle}
          </p>
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
