"use client";
import { Package, BookOpen, CheckCircle2, QrCode } from "lucide-react";
import { Part } from "@/lib/data";

function getHowToUse(part: Part) {
  if (part.id === "p1" || part.slug.includes("chain-sprocket")) {
    return [
      {
        step: "01",
        title: "Bike Setup & Safety",
        desc: "Place the motorcycle securely on its center stand on a level, solid surface. Ensure the engine and exhausts are cold before starting work.",
      },
      {
        step: "02",
        title: "Disassembly & Surface Cleaning",
        desc: "Loosen the rear axle, remove the drive chain, and take off the old sprockets. Clean road grit, grease, and dirt from the hub and countershaft area.",
      },
      {
        step: "03",
        title: "Sprocket Mounting & Chain Routing",
        desc: "Mount the new OEM sprockets using fresh threadlocker on bolts. Route the continuous sealed chain and ensure correct alignment along the swingarm guide.",
      },
      {
        step: "04",
        title: "Tension Adjustment & Final Check",
        desc: "Set the recommended chain slack (25–30mm) at the midway point. Torque axle nut to factory spec, lubricate, and rotate the wheel manually to verify smooth travel.",
      },
    ];
  }

  if (part.id === "p2" || part.slug.includes("brake-pad")) {
    return [
      {
        step: "01",
        title: "Mounting & Safety Check",
        desc: "Elevate the bike on the center stand. Ensure the brake disc and caliper are completely cool to the touch before loosening any fasteners.",
      },
      {
        step: "02",
        title: "Pin Removal & Caliper Cleaning",
        desc: "Remove the pad retaining pins and spring clip. Spray brake cleaner to wash off accumulated friction dust before gently resetting the caliper pistons.",
      },
      {
        step: "03",
        title: "Insert New OEM Pads",
        desc: "Slide the new ByBre brake pads into the caliper bracket with anti-squeal shims properly seated. Ensure friction material faces the disc evenly.",
      },
      {
        step: "04",
        title: "Secure Pins & Bed In",
        desc: "Reinstall retaining pins and torque guide bolts. Pump the brake lever several times until firm pressure returns before conducting moderate test rides.",
      },
    ];
  }

  if (part.id === "p3" || part.slug.includes("oil-filter")) {
    return [
      {
        step: "01",
        title: "Warm Engine & Drain Sump",
        desc: "Idle the motorcycle for 2–3 minutes to warm the oil. Place a drain pan underneath and remove the sump drain plug with a fresh copper washer ready.",
      },
      {
        step: "02",
        title: "Remove Old Filter & Clean Cavity",
        desc: "Unbolt the oil filter chamber cover, take out the used cartridge, and wipe the filter cavity clean of any metal residue with a lint-free cloth.",
      },
      {
        step: "03",
        title: "Install New Filter & O-Ring",
        desc: "Coat the new Viton rubber sealing ring with clean engine oil. Insert the OEM filter cartridge into the housing with the rubber grommet facing inward.",
      },
      {
        step: "04",
        title: "Torque Bolts & Check for Leaks",
        desc: "Reinstall cover bolts and torque evenly to 10 N·m. Refill with recommended 15W-50 oil, run the engine for 1 minute, and verify zero oil seepage.",
      },
    ];
  }

  if (part.id === "p4" || part.slug.includes("clutch-cable")) {
    return [
      {
        step: "01",
        title: "Slacken Cable & Note Routing",
        desc: "Back off the adjuster locknut at the handlebar clutch lever and loosen the lower cable bracket nuts on the engine casing.",
      },
      {
        step: "02",
        title: "Unhook Cable Ends",
        desc: "Line up the lever adjuster slots, unhook the upper cable nipple from the lever pivot, then release the lower nipple from the clutch release arm.",
      },
      {
        step: "03",
        title: "Route New Teflon Cable",
        desc: "Feed the new OEM cable along the exact factory frame path without tight bends. Hook the engine release arm first, followed by the handlebar lever.",
      },
      {
        step: "04",
        title: "Adjust Free Play & Test",
        desc: "Set 2–3mm of free play at the clutch lever perch. Tighten locknuts securely and verify smooth, non-binding clutch lever return action.",
      },
    ];
  }

  return [
    {
      step: "01",
      title: "Preparation & Inspection",
      desc: "Park the motorcycle on level ground on its center stand. Allow the engine and exhaust components to cool completely before handling.",
    },
    {
      step: "02",
      title: "Clean Disassembly",
      desc: "Remove the worn part carefully, keeping track of all factory bolts and washers. Wipe clean the mating surface and surrounding mounts.",
    },
    {
      step: "03",
      title: "OEM Part Installation",
      desc: "Position the genuine replacement part precisely into its factory seating guides. Hand-thread all fasteners first to avoid cross-threading.",
    },
    {
      step: "04",
      title: "Torque & Final Verification",
      desc: "Tighten all mounting hardware evenly to manufacturer torque specifications. Conduct a manual operation check before road use.",
    },
  ];
}

export function TechSpecsAndContents({ part }: { part: Part }) {
  const { packageContents } = part;
  const howToUsePoints = getHowToUse(part);

  return (
    <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {/* How to Use Card (4 Points) */}
      <div className="rounded-panel border border-line bg-canvas p-4 md:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-heritage" />
              <h3 className="text-[18px] font-semibold text-ink">How to Use</h3>
            </div>
            <span className="text-[12px] text-mute">Installation Guide</span>
          </div>

          <div className="mt-5 space-y-4">
            {howToUsePoints.map((pt) => (
              <div
                key={pt.step}
                className="flex items-start gap-3.5"
              >
                <span className="text-[15px] font-bold text-heritage shrink-0 select-none">
                  {pt.step}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[14px] font-semibold text-ink leading-snug">{pt.title}</h4>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-mute">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[12px] text-mute">
          <span>Factory fitment guaranteed</span>
          <span className="text-stock flex items-center gap-1 font-medium">
            <CheckCircle2 className="size-3" /> Step-by-step verified
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

          <div className="mt-5 space-y-3.5">
            {packageContents.map((pkg) => (
              <div
                key={pkg.index}
                className="flex items-start justify-between gap-3 pb-3 border-b border-line/40 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className="text-[14px] font-semibold text-mute shrink-0 select-none">
                    {pkg.index}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-[13.5px] font-medium text-ink">{pkg.name}</h4>
                    <p className="text-[11.5px] text-mute mt-0.5">{pkg.spec}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[12px] font-medium text-mute pl-2">
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
