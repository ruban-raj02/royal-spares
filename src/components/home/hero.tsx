import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, Package, Plane, Truck } from "lucide-react";
import { Photo } from "./photo";

const trust = [
  { icon: ShieldCheck, t: "100% Genuine", s: "RE hologram intact" },
  { icon: Package, t: "Factory Sourced", s: "Direct OEM channels" },
  { icon: Truck, t: "Express Delivery", s: "Pan-India coverage" },
];

export function Hero() {
  return (
    <section className="shell section !pt-6 lg:!pt-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div>
          <p className="mono-spec mb-4 lg:mb-5">Royal Enfield spare parts · OEM microfiche</p>
          <h1 className="h-display">The right part.<br />The right fit.</h1>
          <p className="mt-4 max-w-md text-[15px] leading-6 text-mute lg:mt-5 lg:text-[17px] lg:leading-7">
            Precision automotive commerce for your Royal Enfield. Factory OEM specifications, verified fitment diagrams, and rapid door-to-door delivery across India.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link href="#finder" className="btn-primary">Find my parts <ArrowRight className="size-4" /></Link>
            <Link href="/parts" className="link-action justify-center sm:justify-start">Browse all spare parts <ChevronRight className="size-3" /></Link>
          </div>
          <ul className="mt-8 hidden grid-cols-3 gap-4 md:grid">
            {trust.map(({ icon: I, t, s }) => (
              <li key={t} className="flex items-start gap-2"><I className="mt-0.5 size-4 text-heritage" aria-hidden />
                <div><p className="text-[13px] font-medium">{t}</p><p className="text-[12px] text-mute">{s}</p></div></li>
            ))}
          </ul>
          <ul className="mt-6 flex justify-between gap-2 text-[11px] md:hidden">
            {[{ icon: ShieldCheck, t: "100% Genuine RE" }, { icon: Package, t: "Factory Source" }, { icon: Plane, t: "Air Cargo" }].map(({ icon: I, t }) => (
              <li key={t} className="flex items-center gap-1.5"><I className="size-3.5 text-heritage" />{t}</li>
            ))}
          </ul>
        </div>

        {/* Product showcase — tablet & desktop */}
        <div className="relative hidden rounded-panel border border-line bg-well p-4 md:block">
          <span className="part-ref absolute left-4 top-4 z-10 bg-canvas">REF # 570547/C</span>
          <span className="chip-stock absolute right-4 top-4 z-10 bg-canvas">Pass: 0.02mm tol.</span>
          <Photo src="/images/clutch-rotor.webp" alt="Clutch plates and floating brake disc" fit="contain" className="aspect-[4/3] rounded-card bg-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-card border border-line bg-canvas/90 px-4 py-3 backdrop-blur">
            <div><p className="text-[13px] font-medium">Heavy Duty Clutch &amp; Rotor</p><p className="font-mono text-[11px] text-mute">Fits 349cc J-Platform</p></div>
            <p className="text-right"><span className="block text-[11px] text-mute line-through">₹2,440</span><span className="font-semibold">₹2,850</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
