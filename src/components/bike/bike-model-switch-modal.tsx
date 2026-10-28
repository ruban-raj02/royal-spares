"use client";
import Link from "next/link";
import { X, Check, Bike, ChevronRight } from "lucide-react";
import { bikes } from "@/lib/data";

export function BikeModelSwitchModal({
  isOpen,
  onClose,
  currentSlug,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentSlug: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-panel border border-line bg-canvas p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-2">
              <Bike className="size-5 text-heritage" />
              <h3 className="text-[17px] font-semibold text-ink">Select Motorcycle Model</h3>
            </div>
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-control hover:bg-well text-mute hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          <p className="mt-3 text-[13px] text-mute">
            Switch between Royal Enfield factory chassis platforms to browse dedicated genuine spare parts, torque figures, and schematics.
          </p>

          {/* List of Models */}
          <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
            {bikes.map((b) => {
              const isSelected = currentSlug === b.slug;
              return (
                <Link
                  key={b.slug}
                  href={`/bikes/${b.slug}`}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-card border p-3 transition-all ${
                    isSelected
                      ? "border-heritage bg-heritage/5 ring-1 ring-heritage"
                      : "border-line bg-canvas hover:border-ink"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-12 rounded-lg bg-well border border-line overflow-hidden p-1 shrink-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.img} alt={b.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-semibold text-ink flex items-center gap-2">
                        {b.name}
                        {isSelected && (
                          <span className="rounded bg-heritage text-white px-1.5 py-0.2 text-[9px] font-mono">
                            ACTIVE
                          </span>
                        )}
                      </h4>
                      <p className="text-[12px] text-mute truncate">{b.sub}</p>
                      <p className="font-mono text-[11px] text-mute/80 mt-0.5">
                        {b.engine} · {b.years} · {b.schematics} schematics
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    {isSelected ? (
                      <span className="grid size-6 place-items-center rounded-full bg-heritage text-white">
                        <Check className="size-3.5" />
                      </span>
                    ) : (
                      <ChevronRight className="size-4 text-mute" />
                    )}
                  </div>
                </Link>
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
