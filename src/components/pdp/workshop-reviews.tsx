"use client";
import { Star, ShieldCheck, Wrench, Download, ArrowRight, UserCheck } from "lucide-react";
import { Part } from "@/lib/data";

export function WorkshopReviews({ part }: { part: Part }) {
  const { reviews, manual } = part;

  return (
    <section className="mt-8 space-y-6">
      {/* Reviews Container */}
      <div className="rounded-panel border border-line bg-canvas p-4 md:p-8">
        {/* Header */}
        <div className="border-b border-line pb-4">
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
            Verified Workshop Reviews
          </h2>
          <p className="text-[13px] text-mute mt-1">
            Real feedback from certified Royal Enfield technicians and verified high-mileage riders.
          </p>
        </div>

        {/* Rating Breakdown Header */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-line/60">
          {/* Big Rating Block (4 cols) */}
          <div className="md:col-span-4 flex items-center gap-4">
            <span className="text-[48px] font-bold tracking-tight text-ink leading-none">
              {reviews.rating}
            </span>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-[12px] text-mute mt-1">
                Based on {reviews.totalReviews} verified installations
              </p>
            </div>
          </div>

          {/* Distribution Bars (8 cols) */}
          <div className="md:col-span-8 space-y-1.5">
            {reviews.distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-3 text-[12px] text-mute">
                <span className="w-12 text-right">{d.stars} stars</span>
                <div className="h-2 flex-1 rounded-full bg-well overflow-hidden">
                  <div
                    className="h-full bg-heritage rounded-full transition-all duration-500"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="w-10">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.items.map((rev, idx) => (
            <div
              key={idx}
              className="card p-4 md:p-5 flex flex-col justify-between bg-well/30 border-line/80 hover:border-ink/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-mute">{rev.date}</span>
                </div>

                <h4 className="mt-3 text-[14px] font-semibold text-ink line-clamp-2 leading-snug">
                  &ldquo;{rev.headline}&rdquo;
                </h4>

                <p className="mt-2 text-[12px] leading-relaxed text-mute line-clamp-4">
                  {rev.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-ink flex items-center gap-1">
                    <UserCheck className="size-3 text-stock" />
                    {rev.author}
                  </p>
                  <p className="text-[11px] text-mute">
                    {rev.role} · {rev.city}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-stock bg-stock/10 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Manual Section Download Banner */}
      <div className="rounded-panel border border-line bg-canvas p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="size-11 rounded-control bg-well grid place-items-center shrink-0 border border-line">
            <Wrench className="size-5 text-heritage" />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-ink">{manual.title}</h4>
            <p className="text-[12px] text-mute">{manual.desc}</p>
          </div>
        </div>

        <button
          onClick={() => {
            alert(`Opening schematic: ${manual.file} (${manual.size})`);
          }}
          className="btn-secondary h-10 px-4 text-[13px] shrink-0 font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <span>PDF Schematic</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </section>
  );
}
