"use client";
import { useState } from "react";
import { Settings2, ChevronDown, BadgeCheck, Search } from "lucide-react";

const models = ["Classic 350 Reborn (J-Series)", "Bullet 350", "Hunter 350", "Himalayan 450", "Interceptor 650", "Continental GT 650"];
const years = ["2024 (Current)", "2023", "2022", "2021", "2020", "2019", "2018"];
const groups = ["All Assemblies (38)", "Engine & Gearbox", "Chassis & Frame", "Electrical & ECU", "Brakes & Wheels"];

function Select({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mono-spec mb-1.5 block">{label}</label>
      <div className="relative">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field appearance-none truncate pr-9">
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-mute" aria-hidden />
      </div>
    </div>
  );
}

export function Finder() {
  const [model, setModel] = useState(models[0]);
  const [year, setYear] = useState(years[0]);
  const [group, setGroup] = useState(groups[0]);

  return (
    <section id="finder" className="shell">
      <form onSubmit={(e) => e.preventDefault()} className="rounded-panel border border-line bg-canvas p-4 md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-control bg-well"><Settings2 className="size-4 text-heritage" /></span>
            <div>
              <h2 className="text-[17px] font-semibold leading-6 tracking-tight">Find the right part for your bike</h2>
              <p className="hidden text-[13px] text-mute md:block">Step-by-step verified fitment lookup</p>
            </div>
          </div>
          <span className="chip-stock hidden md:inline-flex">Verified against official Royal Enfield parts microfiche</span>
          <span className="chip-stock md:hidden">Microfiche verified</span>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto] lg:items-end">
          <div className="col-span-2 md:col-span-1"><Select id="model" label="1. Motorcycle model" value={model} onChange={setModel} options={models} /></div>
          <Select id="year" label="2. Year of production" value={year} onChange={setYear} options={years} />
          <Select id="group" label="3. Assembly" value={group} onChange={setGroup} options={groups} />
          <button type="submit" className="btn-primary col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-4">
            <Search className="size-4" />Verify fitment &amp; show parts
          </button>
        </div>

        <p className="mt-4 flex items-center gap-2 text-[12px] text-mute" aria-live="polite">
          <BadgeCheck className="size-4 text-stock" />
          <span className="font-mono">{model} · {year}</span> — compatible with 145 registered assemblies
        </p>
      </form>
    </section>
  );
}
