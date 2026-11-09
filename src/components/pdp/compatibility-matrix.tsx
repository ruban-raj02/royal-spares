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

      {/* Guaranteed Fit Bikes - aesthetic list, no card inside card */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
        {displayBikes.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2.5 border-b border-line/60"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Bike className="size-4 text-heritage shrink-0" />
              <div className="min-w-0">
                <h4 className="text-[13.5px] font-medium text-ink truncate">{item.model}</h4>
                <p className="text-[11.5px] text-mute">{item.years}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 shrink-0 text-[11.5px] font-medium text-stock">
              <CheckCircle2 className="size-3.5" />
              <span>100% Fit</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
