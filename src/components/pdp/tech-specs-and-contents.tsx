"use client";
import { Package, Sliders, CheckCircle2, ShieldCheck, QrCode } from "lucide-react";
import { Part } from "@/lib/data";

export function TechSpecsAndContents({ part }: { part: Part }) {
  const { specs, packageContents } = part;

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {/* Detailed Technical Specifications Card */}
      <div className="rounded-panel border border-line bg-canvas p-4 md:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="size-4 text-heritage" />
              <h3 className="text-[18px] font-semibold text-ink">Detailed Technical Specifications</h3>
            </div>
            <span className="text-[12px] text-mute">OEM Spec Sheet</span>
          </div>

          <div className="mt-4 divide-y divide-line/60">
            {specs.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between py-2.5 text-[13px] gap-4">
                <span className="text-mute font-normal">{item.label}</span>
                <span className="font-medium text-ink text-right text-[13px]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[12px] text-mute">
          <span>Tolerance standard: DIN 8187</span>
          <span className="text-stock flex items-center gap-1 font-medium">
            <CheckCircle2 className="size-3" /> Metrology Certified
          </span>
        </div>
      </div>

      {/* Inside Factory Package Card */}
      <div className="rounded-panel border border-line bg-canvas p-4 md:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-heritage" />
              <h3 className="text-[18px] font-semibold text-ink">What&apos;s In The Factory Box</h3>
            </div>
            <span className="text-[12px] text-mute">Sealed Inventory</span>
          </div>

          <p className="mt-3 text-[12px] text-mute">
            All components are sealed in nitrogen-purged vapor barrier film with anti-corrosion VCI paper lining.
          </p>

          <div className="mt-4 space-y-2.5">
            {packageContents.map((pkg) => (
              <div
                key={pkg.index}
                className="flex items-start justify-between rounded-control border border-line/80 bg-well/40 p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[11px] font-bold text-mute bg-canvas px-1.5 py-0.5 rounded border border-line">
                    {pkg.index}
                  </span>
                  <div>
                    <h4 className="text-[13px] font-medium text-ink">{pkg.name}</h4>
                    <p className="text-[11px] text-mute mt-0.5">{pkg.spec}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-ink bg-canvas px-2 py-0.5 rounded border border-line">
                  {pkg.qty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Certificate of Authenticity */}
        <div className="mt-5 rounded-control border border-stock/30 bg-stock/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <QrCode className="size-4 text-stock" />
            <div>
              <p className="text-[12px] font-semibold text-ink">Digital Certificate of Authenticity</p>
              <p className="text-[11px] text-mute">
                QR label for instant warranty activation
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-stock bg-canvas px-2 py-0.5 rounded border border-stock/20">
            Verified
          </span>
        </div>
      </div>
    </section>
  );
}
