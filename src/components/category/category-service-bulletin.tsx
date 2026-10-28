"use client";
import { Wrench, Download, PlayCircle, FileText, CheckCircle2 } from "lucide-react";
import { CategoryDetail } from "@/lib/data";

export function CategoryServiceBulletin({ category }: { category: CategoryDetail }) {
  const { bulletin } = category;

  return (
    <section className="mt-8 md:mt-12 rounded-panel border border-line bg-canvas p-5 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Information */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex items-center gap-2 text-heritage font-mono text-[11px] font-bold">
            <FileText className="size-4" />
            <span>{bulletin.code}</span>
          </div>

          <h3 className="text-[18px] md:text-[22px] font-bold text-ink tracking-tight">
            {bulletin.title}
          </h3>

          <p className="text-[13px] text-mute leading-relaxed">
            {bulletin.desc}
          </p>

          {/* Key Parameters */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
            {bulletin.params.map((p, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-well border border-line px-2.5 py-1 text-ink/80"
              >
                <CheckCircle2 className="size-3 text-stock" />
                <span>{p}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
          <button
            onClick={() => alert(`Downloading ${bulletin.pdfName} (${bulletin.pdfSize})`)}
            className="btn-secondary h-11 px-5 text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="size-4 text-mute" />
            <span>Download PDF Manual ({bulletin.pdfSize})</span>
          </button>
          <button
            onClick={() => alert("Opening video protocol: Factory Authorized Service Procedure")}
            className="btn-primary h-11 px-5 text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlayCircle className="size-4 text-white" />
            <span>Watch Video Protocol</span>
          </button>
        </div>
      </div>
    </section>
  );
}
