"use client";
import { useState } from "react";
import { FileText, Download, Wrench, AlertTriangle, Maximize2, CheckCircle2 } from "lucide-react";
import { Part } from "@/lib/data";

export function MicroficheSchematic({ part }: { part: Part }) {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>("1");
  const { microfiche } = part;

  const currentHotspot =
    microfiche.hotspots.find((h) => h.id === selectedHotspot) || microfiche.hotspots[0];

  return (
    <section className="mt-12 rounded-panel border border-line bg-canvas p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-line pb-5">
        <div>
          <p className="mono-spec text-[11px] text-heritage font-semibold">
            Technical Engineering Microfiche
          </p>
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink mt-0.5">
            Exploded Microfiche &amp; Torque Specs
          </h2>
          <p className="text-[13px] text-mute font-mono mt-1">
            {microfiche.diagramCode} · {microfiche.diagramSub}
          </p>
        </div>

        <button
          onClick={() => {
            alert(`Downloading ${part.manual.file} (${part.manual.size})`);
          }}
          className="btn-secondary h-10 text-[13px] gap-2 shrink-0 self-start md:self-auto"
        >
          <Download className="size-3.5 text-mute" />
          <span>Download Microfiche (PDF)</span>
        </button>
      </div>

      {/* Main Grid: CAD Schematic (Left) + Factory Torque Specs (Right) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Schematic Drawing Stage (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-[16/10] w-full rounded-card border border-line/90 bg-[#fafafa] p-4 overflow-hidden select-none shadow-inner flex items-center justify-center">
            {/* Engineering Grid Background */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#1d1d1f 1px, transparent 1px), linear-gradient(to right, #1d1d1f 1px, transparent 1px), linear-gradient(to bottom, #1d1d1f 1px, transparent 1px)",
                backgroundSize: "20px 20px, 40px 40px, 40px 40px",
              }}
            />

            {/* Top Blueprint Details */}
            <div className="absolute top-3 left-4 flex items-center gap-3 font-mono text-[10px] text-mute">
              <span className="font-semibold text-ink/70">J1D-DRIVE-FIG-14</span>
              <span>• TOLERANCE: ±0.015mm</span>
              <span className="hidden sm:inline">• CAD REV: 4.1</span>
            </div>

            <div className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-[10px] text-mute bg-well px-2 py-0.5 rounded border border-line">
              <Maximize2 className="size-3" />
              <span>{microfiche.scale}</span>
            </div>

            {/* Technical Diagram SVG Graphics */}
            <svg
              className="w-full h-full max-h-[300px]"
              viewBox="0 0 600 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Construction centerlines */}
              <line
                x1="40"
                y1="180"
                x2="560"
                y2="180"
                stroke="#9ca3af"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.5"
              />
              <line
                x1="150"
                y1="50"
                x2="150"
                y2="310"
                stroke="#9ca3af"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.5"
              />
              <line
                x1="440"
                y1="50"
                x2="440"
                y2="310"
                stroke="#9ca3af"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.5"
              />

              {/* Chain drive loop */}
              <path
                d="M 150 115 L 440 85 A 95 95 0 0 1 440 275 L 150 245 A 65 65 0 0 1 150 115 Z"
                stroke="#1d1d1f"
                strokeWidth="3"
                strokeDasharray="8 3"
                className="transition-all"
              />

              {/* Rear Sprocket (42T) Big Gear */}
              <g transform="translate(440, 180)">
                <circle r="95" stroke="#1d1d1f" strokeWidth="2.5" fill="#f3f4f6" fillOpacity="0.4" />
                <circle r="80" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 3" />
                <circle r="52" stroke="#1d1d1f" strokeWidth="2" fill="#ffffff" />
                <circle r="28" stroke="#1d1d1f" strokeWidth="2" fill="#e5e7eb" />
                {/* Sprocket mounting holes (6x) */}
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <circle
                    key={deg}
                    cx={Math.cos((deg * Math.PI) / 180) * 40}
                    cy={Math.sin((deg * Math.PI) / 180) * 40}
                    r="5"
                    fill="#374151"
                  />
                ))}
                {/* Sprocket teeth indicators */}
                {[...Array(24)].map((_, i) => (
                  <line
                    key={i}
                    x1={Math.cos((i * 15 * Math.PI) / 180) * 95}
                    y1={Math.sin((i * 15 * Math.PI) / 180) * 95}
                    x2={Math.cos((i * 15 * Math.PI) / 180) * 105}
                    y2={Math.sin((i * 15 * Math.PI) / 180) * 105}
                    stroke="#1d1d1f"
                    strokeWidth="2"
                  />
                ))}
              </g>

              {/* Front Sprocket (15T) Small Gear */}
              <g transform="translate(150, 180)">
                <circle r="65" stroke="#1d1d1f" strokeWidth="2.5" fill="#f3f4f6" fillOpacity="0.4" />
                <circle r="42" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 3" />
                <circle r="22" stroke="#1d1d1f" strokeWidth="2" fill="#ffffff" />
                {/* Spline center shaft */}
                <circle r="12" stroke="#1d1d1f" strokeWidth="2" fill="#374151" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1={Math.cos((i * 30 * Math.PI) / 180) * 65}
                    y1={Math.sin((i * 30 * Math.PI) / 180) * 65}
                    x2={Math.cos((i * 30 * Math.PI) / 180) * 73}
                    y2={Math.sin((i * 30 * Math.PI) / 180) * 73}
                    stroke="#1d1d1f"
                    strokeWidth="2"
                  />
                ))}
              </g>

              {/* Dimension indicators */}
              <line x1="150" y1="320" x2="440" y2="320" stroke="#4b5563" strokeWidth="1" />
              <polyline points="155,316 150,320 155,324" fill="none" stroke="#4b5563" strokeWidth="1" />
              <polyline points="435,316 440,320 435,324" fill="none" stroke="#4b5563" strokeWidth="1" />
              <text
                x="295"
                y="314"
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
                fontFamily="var(--font-jetbrains)"
              >
                WHEELBASE DRIVELINE: 1,390mm
              </text>
            </svg>

            {/* Interactive Hotspot Buttons */}
            {microfiche.hotspots.map((spot) => {
              const isSelected = selectedHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex size-7 items-center justify-center rounded-full font-mono text-[12px] font-bold transition-all shadow-md ${
                    isSelected
                      ? "bg-heritage text-white ring-4 ring-heritage/30 scale-110"
                      : "bg-white text-ink border border-line hover:border-ink hover:scale-105"
                  }`}
                  aria-label={`Hotspot ${spot.id}: ${spot.label}`}
                >
                  <span>{spot.id}</span>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Inspector Card */}
          <div className="flex items-center justify-between rounded-card border border-heritage/30 bg-heritage/5 p-3.5">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-heritage font-mono text-[13px] font-bold text-white shrink-0">
                {currentHotspot.id}
              </span>
              <div>
                <h4 className="text-[13px] font-semibold text-ink">{currentHotspot.label}</h4>
                <p className="text-[12px] text-mute font-mono">{currentHotspot.spec}</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-heritage font-medium bg-canvas px-2.5 py-1 rounded border border-heritage/20">
              ACTIVE COMPONENT
            </span>
          </div>
        </div>

        {/* Factory Torque Standards Panel (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-card border border-line bg-well/40 p-4 md:p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-line">
              <Wrench className="size-4 text-heritage" />
              <h3 className="text-[15px] font-semibold text-ink">Factory Torque Standards</h3>
            </div>
            <p className="mt-2 text-[12px] text-mute leading-5">
              Strict compliance prevents countershaft seal deformation, hub flange warping, and rear wheel alignment drift.
            </p>

            {/* Torque Specifications List */}
            <div className="mt-4 space-y-2.5">
              {microfiche.torqueStandards.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-control border border-line/80 bg-canvas p-3 transition-colors hover:border-ink/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[13px] font-medium text-ink">{item.component}</span>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-[14px] font-bold text-ink">{item.metric}</span>
                      <span className="block font-mono text-[10px] text-mute">({item.imperial})</span>
                    </div>
                  </div>
                  <p className="mt-1 text-[11px] text-mute font-mono">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service Alert Warning Callout */}
          <div className="mt-4 rounded-control border border-amber-300 bg-amber-50/80 p-3 flex items-start gap-2.5 text-[12px] text-amber-900">
            <AlertTriangle className="size-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-snug">{microfiche.serviceAlert}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
