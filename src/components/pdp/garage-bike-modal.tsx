"use client";
import { useState } from "react";
import { X, Check, AlertTriangle, Bike, ShieldCheck } from "lucide-react";
import { bikes } from "@/lib/data";

interface BikeOption {
  slug: string;
  name: string;
  series: string;
  engine: string;
  years: string;
  isMatch: boolean;
  matchReason: string;
}

export function GarageBikeModal({
  isOpen,
  onClose,
  currentBike,
  onSelectBike,
  partCategory,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentBike: string;
  onSelectBike: (bikeName: string, isMatch: boolean, notes: string) => void;
  partCategory?: string;
}) {
  if (!isOpen) return null;

  const bikeOptions: BikeOption[] = [
    {
      slug: "classic-350",
      name: "Classic 350 Reborn (J-1D Series)",
      series: "Chassis Frame J1D — MY 2021 through 2025",
      engine: "349cc SOHC J-Series",
      years: "2021–2025",
      isMatch: true,
      matchReason: "100% Guaranteed Direct Fit · Factory 520 Pitch OEM Calibrated",
    },
    {
      slug: "meteor-350",
      name: "Meteor 350 (Fireball / Stellar / Supernova)",
      series: "Chassis Frame J-MTR — MY 2020 through 2025",
      engine: "349cc SOHC J-Series",
      years: "2020–2025",
      isMatch: true,
      matchReason: "100% Guaranteed Direct Fit · Shared J-Series Transmission Crate",
    },
    {
      slug: "hunter-350",
      name: "Hunter 350 (Retro & Metro)",
      series: "Chassis Frame J-HNTR — MY 2022 through 2025",
      engine: "349cc SOHC J-Series",
      years: "2022–2025",
      isMatch: true,
      matchReason: "Verified Compatible · Compact swingarm geometry verified",
    },
    {
      slug: "himalayan-450",
      name: "Himalayan 450 (Sherpa Engine)",
      series: "Chassis Frame H-452 — MY 2023 through 2025",
      engine: "452cc DOHC Liquid-Cooled",
      years: "2023–2025",
      isMatch: false,
      matchReason: "Different spline & mounting spacing. Requires Sherpa 450 drivetrain kit.",
    },
    {
      slug: "interceptor-650",
      name: "Interceptor 650 & Continental GT 650",
      series: "Chassis Frame P-650 — MY 2018 through 2025",
      engine: "648cc Parallel Twin SOHC",
      years: "2018–2025",
      isMatch: false,
      matchReason: "Twin-cylinder 650 platform uses 525-series heavy-link driveline.",
    },
    {
      slug: "classic-350-uce",
      name: "Classic 350 UCE Pushrod (Pre-2021)",
      series: "Cast Iron / Twinspark Engine Platform",
      engine: "346cc Pushrod Twinspark",
      years: "2009–2020",
      isMatch: false,
      matchReason: "Incompatible · Older generation uses 530 chain pitch and 16T/38T gearing.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-panel border border-line bg-canvas p-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-2">
              <Bike className="size-5 text-heritage" />
              <h3 className="text-[17px] font-semibold text-ink">Select Your Active Garage Bike</h3>
            </div>
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-3 text-[13px] text-mute">
            Select the exact motorcycle model parked in your garage. Our microfiche engine validates spline diameter, ratio, and pitch compatibility.
          </p>

          <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
            {bikeOptions.map((b) => {
              const isSelected = currentBike.includes(b.name.split(" ")[0]);
              return (
                <div
                  key={b.slug}
                  onClick={() => {
                    onSelectBike(b.name, b.isMatch, b.matchReason);
                    onClose();
                  }}
                  className={`cursor-pointer rounded-card border p-3.5 transition-all ${
                    isSelected
                      ? "border-heritage bg-heritage/5 ring-1 ring-heritage"
                      : "border-line bg-canvas hover:border-ink"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-[14px] font-medium text-ink flex items-center gap-2">
                        {b.name}
                        {b.isMatch ? (
                          <span className="inline-flex items-center gap-1 rounded bg-stock/10 px-1.5 py-0.5 text-[10px] font-medium text-stock">
                            <Check className="size-3" /> MATCH
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded bg-danger/10 px-1.5 py-0.5 text-[10px] font-medium text-danger">
                            <AlertTriangle className="size-3" /> INCOMPATIBLE
                          </span>
                        )}
                      </h4>
                      <p className="text-[12px] text-mute mt-0.5">{b.series}</p>
                      <p className="font-mono text-[11px] text-mute/80 mt-1">
                        {b.engine} · {b.years}
                      </p>
                      <p
                        className={`text-[12px] mt-1.5 font-medium ${
                          b.isMatch ? "text-stock" : "text-danger"
                        }`}
                      >
                        {b.matchReason}
                      </p>
                    </div>

                    <div
                      className={`grid size-6 place-items-center rounded-full border ${
                        isSelected
                          ? "border-heritage bg-heritage text-white"
                          : "border-line text-transparent"
                      }`}
                    >
                      <Check className="size-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-line flex justify-end">
            <button onClick={onClose} className="btn-secondary h-9 text-[13px] px-4">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
