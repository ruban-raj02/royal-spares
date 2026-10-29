"use client";
import { useState } from "react";
import { ShieldCheck, CheckCircle2, ArrowRight, Truck } from "lucide-react";
import { CategoryDetail } from "@/lib/data";

export function CategoryVinBanner({ category }: { category: CategoryDetail }) {
  const [vin, setVin] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vin.trim()) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStatus(
        `Chassis Decoded: 2023 Classic 350 Reborn (J1D Dual-Channel ABS) · 300mm ByBre Caliper & 13mm Bore Verified`
      );
    }, 400);
  };

  return (
    <div className="mt-8 md:mt-12 space-y-4">
      {/* 1. Desktop & Tablet Card (Images 1 & 3) */}
      <div className="hidden md:block rounded-panel border border-heritage/40 bg-gradient-to-r from-[#172c23] to-[#0f1d17] p-6 lg:p-8 text-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              Fitment Guarantee
            </span>
            <h3 className="text-[18px] lg:text-[22px] font-bold text-white tracking-tight">
              {category.vinNotice.heading}
            </h3>
            <p className="text-[13px] text-white/80 leading-relaxed max-w-xl">
              {category.vinNotice.sub}
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="E.G. ME3J1D5F9NA012984"
                maxLength={17}
                className="field h-11 bg-white/10 text-white placeholder:text-white/50 border-white/20 text-[13px] font-mono tracking-wider pl-3 flex-1 focus:bg-white focus:text-ink focus:border-white"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="btn-primary h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[13px] px-5 shrink-0 cursor-pointer"
              >
                {isVerifying ? "Verifying..." : "Verify Fitment"}
              </button>
            </form>

            {status && (
              <div className="mt-2.5 rounded-control border border-emerald-400/40 bg-emerald-400/15 p-2.5 text-[12px] text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                <span>{status}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Mobile Fitment & Pressure Tested Card (Image 2) */}
      <div className="md:hidden rounded-panel border border-line bg-well/70 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="grid size-10 place-items-center rounded-control bg-heritage text-white shrink-0">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-ink">
              Fitment &amp; Pressure Tested
            </h4>
            <p className="mt-1 text-[12px] text-mute leading-relaxed">
              Every component is batch-verified to Royal Enfield factory torque specifications and ISO-4925 standards. Guaranteed leak-free installation with hassle-free 10-day exchange.
            </p>
          </div>
        </div>

        <div className="pt-2.5 border-t border-line/70 flex items-center justify-between text-[11px] font-medium text-mute">
          <span className="flex items-center gap-1 text-stock">
            <CheckCircle2 className="size-3.5 text-stock" /> 100% Genuine ByBre / RE
          </span>
          <span className="flex items-center gap-1 text-ink">
            <Truck className="size-3.5 text-heritage" /> Safe Express Transit
          </span>
        </div>
      </div>
    </div>
  );
}
