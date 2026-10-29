"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Compass, Sparkles, CheckCircle2, ShieldCheck, ZoomIn, RotateCcw } from "lucide-react";
import { Part } from "@/lib/data";

export function ProductGallery({ part }: { part: Part }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const activeImage = part.gallery[activeIdx] || { label: part.name, src: part.img };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is360Mode) return;
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !is360Mode) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 8) {
      setRotation((prev) => (prev + (delta > 0 ? 12 : -12) + 360) % 360);
      startX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Top Banner Badges */}
      <div className="flex items-center justify-between gap-2 text-[12px]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-stock/10 border border-stock/20 px-3 py-1 font-medium text-stock">
          <span className="size-2 rounded-full bg-stock" />
          <span>Genuine OEM Sealed</span>
          <span className="text-mute text-[11px]">· {part.batch}</span>
        </div>

        <button
          onClick={() => {
            setIs360Mode(!is360Mode);
            if (!is360Mode) setActiveIdx(0);
          }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium transition-colors border ${
            is360Mode
              ? "bg-heritage text-white border-heritage shadow-sm"
              : "bg-well text-ink border-line hover:border-ink"
          }`}
          aria-label="Toggle 360 View"
        >
          <Compass className={`size-3.5 ${is360Mode ? "animate-spin" : ""}`} />
          <span>{is360Mode ? "360° Active" : "360° View"}</span>
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="card relative aspect-square w-full overflow-hidden bg-white p-4 md:p-8 flex items-center justify-center select-none group cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* OEM Authenticity Watermark */}
        <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-mute/50 uppercase pointer-events-none">
          REV: 2024-C · OEM SPEC
        </div>

        {/* 360 indicator if active */}
        {is360Mode && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] text-white backdrop-blur">
            <RotateCcw className="size-3 animate-spin" />
            <span>Drag horizontally ({Math.round(rotation)}°)</span>
          </div>
        )}

        {/* Primary Product Image with 360 rotation simulation */}
        <div
          className="relative size-full max-h-[420px] max-w-[420px] transition-transform duration-75 flex items-center justify-center"
          style={is360Mode ? { transform: `rotateY(${rotation}deg)` } : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage.src}
            alt={part.name}
            className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Scale tag */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[11px] font-mono text-mute bg-canvas/80 backdrop-blur px-2 py-1 rounded border border-line">
          <ZoomIn className="size-3" />
          <span>RL-ENG 1:1 OEM</span>
        </div>
      </div>

      {/* Thumbnails list */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {part.gallery.map((img, i) => (
          <button
            key={img.label + i}
            onClick={() => {
              setActiveIdx(i);
              setIs360Mode(!!img.is360);
            }}
            className={`card group flex flex-col items-center p-1.5 transition-all text-left ${
              activeIdx === i
                ? "border-heritage ring-2 ring-heritage/20 shadow-sm"
                : "hover:border-ink opacity-80 hover:opacity-100"
            }`}
          >
            <div className="aspect-square w-full rounded-lg bg-well/60 overflow-hidden p-1 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} className="h-full w-full object-contain" />
            </div>
            <span className="mt-1 block truncate w-full text-center text-[10px] font-medium text-mute group-hover:text-ink">
              {img.label}
            </span>
          </button>
        ))}
      </div>

      {/* Sub-bar Quality Assurance Badges */}
      <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-mute">
        <div className="flex items-center gap-2 rounded-control border border-line/80 bg-well/40 p-2.5">
          <CheckCircle2 className="size-3.5 text-stock shrink-0" />
          <span className="truncate">J-Platform Calibrated (±0.02mm)</span>
        </div>
        <div className="flex items-center gap-2 rounded-control border border-line/80 bg-well/40 p-2.5">
          <ShieldCheck className="size-3.5 text-heritage shrink-0" />
          <span className="truncate">Direct Dispatch (Hologram Sealed)</span>
        </div>
      </div>
    </div>
  );
}
