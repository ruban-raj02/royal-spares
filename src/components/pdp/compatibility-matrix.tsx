"use client";
import { CheckCircle2, ShieldCheck, Bike } from "lucide-react";
import { Part } from "@/lib/data";

export function CompatibilityMatrix({ part }: { part: Part }) {
  const { compatibility } = part;

  // Only list the motorcycle models of guaranteed direct fit
  const guaranteedBikes = compatibility.filter((item) => item.status === "direct-fit");
  const displayBikes =
    guaranteedBikes.length > 0
      ? guaranteedBikes
      : compatibility.filter((item) => item.status !== "incompatible");

  return (
    <section className="mt-8 rounded-panel border border-line bg-canvas p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-line pb-4">
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
            Verified Vehicle Compatibility
          </h2>
          <p className="text-[13px] text-mute mt-1">
            Guaranteed 100% factory direct fit for the following motorcycle models.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stock self-start md:self-auto">
          <ShieldCheck className="size-3.5" />
          <span>Guaranteed Fitment</span>
        </div>
      </div>

      {/* Guaranteed Fit Bikes List */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayBikes.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 p-3.5 rounded-control border border-line/80 bg-well/30"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-8 rounded-md bg-canvas border border-line grid place-items-center shrink-0 text-heritage">
                <Bike className="size-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13.5px] font-semibold text-ink truncate">{item.model}</h4>
                <p className="text-[11.5px] text-mute">{item.years}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 shrink-0 rounded bg-stock/15 px-2 py-0.5 text-[11px] font-semibold text-stock">
              <CheckCircle2 className="size-3" />
              <span>Guaranteed</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
