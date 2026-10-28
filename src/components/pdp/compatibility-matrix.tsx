"use client";
import { CheckCircle2, AlertTriangle, ShieldCheck, XCircle } from "lucide-react";
import { Part } from "@/lib/data";

export function CompatibilityMatrix({ part }: { part: Part }) {
  const { compatibility } = part;

  return (
    <section className="mt-8 rounded-panel border border-line bg-canvas p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-line pb-4">
        <div>
          <p className="mono-spec text-[11px] text-mute">Cross-Catalog Database</p>
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink mt-0.5">
            Verified Vehicle Compatibility Matrix
          </h2>
          <p className="text-[13px] text-mute mt-1">
            Tested and calibrated for chassis dimensions to ensure exact factory fitment with your motorcycle registration year.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-stock/10 border border-stock/20 px-3 py-1 font-mono text-[11px] font-medium text-stock self-start md:self-auto">
          <ShieldCheck className="size-3.5" />
          <span>FACTORY OEM CERTIFIED</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-5 overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[620px] text-left border-collapse">
          <thead>
            <tr className="border-b border-line font-mono text-[11px] uppercase tracking-wider text-mute">
              <th className="py-3 px-3">Model Family</th>
              <th className="py-3 px-3">Production Years</th>
              <th className="py-3 px-3">Engine Version</th>
              <th className="py-3 px-3">Ratio / Spec Check</th>
              <th className="py-3 px-3 text-right">Fitment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60 text-[13px]">
            {compatibility.map((item, idx) => {
              const isDirect = item.status === "direct-fit";
              const isCompat = item.status === "compatible";
              const isIncompat = item.status === "incompatible";

              return (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-well/40 ${
                    isDirect ? "font-medium" : ""
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${
                          isDirect ? "bg-stock" : isCompat ? "bg-link" : "bg-danger"
                        }`}
                      />
                      <span className="text-ink">{item.model}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[12px] text-mute">{item.years}</td>
                  <td className="py-3.5 px-3 text-mute">{item.engine}</td>
                  <td className="py-3.5 px-3 font-mono text-[12px] text-ink/90">{item.ratio}</td>
                  <td className="py-3.5 px-3 text-right">
                    {isDirect && (
                      <span className="inline-flex items-center gap-1 rounded bg-stock/15 px-2.5 py-1 text-[11px] font-medium text-stock font-mono">
                        <CheckCircle2 className="size-3" />
                        <span>{item.badge}</span>
                      </span>
                    )}
                    {isCompat && (
                      <span className="inline-flex items-center gap-1 rounded bg-link/15 px-2.5 py-1 text-[11px] font-medium text-link font-mono">
                        <CheckCircle2 className="size-3" />
                        <span>{item.badge}</span>
                      </span>
                    )}
                    {isIncompat && (
                      <span className="inline-flex items-center gap-1 rounded bg-danger/10 px-2.5 py-1 text-[11px] font-medium text-danger font-mono">
                        <XCircle className="size-3" />
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
