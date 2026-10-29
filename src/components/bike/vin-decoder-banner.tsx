"use client";
import { useState } from "react";
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export function VinDecoderBanner({ garageSync = "KA-01-MJ-4520" }: { garageSync?: string }) {
  const [vin, setVin] = useState("");
  const [decoded, setDecoded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vin.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDecoded(
        `Chassis Frame J1D-5F9 · Verified MY 2023 Classic 350 Reborn (Halcyon Black) · Oragadam Plant Assembly Batch #4412`
      );
    }, 400);
  };

  return (
    <div className="mt-8 md:mt-12 space-y-4">
      {/* Desktop & Tablet Banner */}
      <div className="hidden md:block rounded-panel border border-line bg-gradient-to-r from-canvas via-well/40 to-canvas p-6 lg:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-ink text-white font-bold text-[15px] shrink-0 shadow-sm">
              VIN
            </div>
            <div>
              <h3 className="text-[18px] lg:text-[20px] font-bold text-ink tracking-tight">
                Unsure About Model Year or Revision Change?
              </h3>
              <p className="mt-1 text-[13px] text-mute leading-relaxed max-w-xl">
                Enter your motorcycle&apos;s 17-digit Chassis VIN to isolate factory batch-specific schematics, part supersessions, and eliminate fitment disputes.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                placeholder="E.G. ME3J1D5F9NA012984"
                maxLength={17}
                className="field h-11 text-[13px] font-mono tracking-wider pl-3 flex-1"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary h-11 px-5 text-[13px] font-semibold shrink-0 cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify VIN"} <ArrowRight className="size-3.5" />
              </button>
            </form>

            <div className="mt-2 flex items-center gap-3 text-[12px] text-mute">
              <span className="flex items-center gap-1 text-stock font-medium">
                <CheckCircle2 className="size-3" /> Guaranteed Fitment
              </span>
              <span>·</span>
              <span>Instant Chassis Lookup</span>
            </div>

            {decoded && (
              <div className="mt-3 rounded-control border border-stock/30 bg-stock/10 p-2.5 text-[12px] text-stock flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{decoded}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile VIN Guarantee Card */}
      <div className="md:hidden rounded-panel border border-line bg-well/70 p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="grid size-10 place-items-center rounded-control bg-heritage text-white">
            <ShieldCheck className="size-6" />
          </div>
          <span className="rounded bg-canvas border border-line px-2 py-0.5 text-[11px] font-medium text-mute">
            Guaranteed Fit
          </span>
        </div>

        <div>
          <h4 className="text-[16px] font-bold text-ink">Fitment Guarantee</h4>
          <p className="mt-1 text-[12px] leading-relaxed text-mute">
            Every part shipped for <b className="text-ink font-medium">{garageSync}</b> is physically verified against factory parts fiche. If it doesn&apos;t fit your motorcycle, we offer instant replacement.
          </p>
        </div>

        <div className="pt-2 border-t border-line/70 flex items-center justify-between text-[11px] font-medium text-mute">
          <span className="flex items-center gap-1 text-stock">
            <CheckCircle2 className="size-3.5" /> Authentic RE Spares
          </span>
          <span className="flex items-center gap-1 text-ink">
            <Sparkles className="size-3.5 text-heritage" /> 7-Day Easy Returns
          </span>
        </div>
      </div>
    </div>
  );
}
