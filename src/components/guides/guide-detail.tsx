"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  Share2,
  Download,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Clock,
  Calendar,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Plus,
  ShoppingBag,
  Check,
  Send,
  Sliders,
  Gauge,
  Layers,
  FileText,
  HelpCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCart } from "@/components/cart";
import { inr } from "@/lib/data";

interface PartItem {
  id: string;
  name: string;
  oem: string;
  price: number;
  mrp: number;
  img: string;
  desc: string;
}

const guideParts: PartItem[] = [
  {
    id: "guide-p1",
    oem: "RA40012/A",
    name: "J-Series Micro Oil Filter Element + O-Ring Kit",
    price: 210,
    mrp: 245,
    img: "/images/engine-filters.jpg",
    desc: "Pleated cellulose filter with internal bypass spring. Traps particulate down to 25 microns.",
  },
  {
    id: "guide-p2",
    oem: "570412/E",
    name: "Magnetic Sump Drain Bolt with Copper Washer",
    price: 195,
    mrp: 220,
    img: "/images/clutch-rotor.webp",
    desc: "Neodymium core captures ferrous wear shavings. Includes factory solid copper crush gasket.",
  },
  {
    id: "guide-p3",
    oem: "RA40028/C",
    name: "Valve Cover Molded Viton High-Temp Gasket Seal",
    price: 340,
    mrp: 390,
    img: "/images/chasis-body.webp",
    desc: "Fluoroelastomer vulcanized seal prevents oil weeping across spark plug well under sustained thermal cycles.",
  },
  {
    id: "guide-p4",
    oem: "570547/C",
    name: "Factory Spark Plug (BOSCH YR7MES / RG4HC)",
    price: 290,
    mrp: 330,
    img: "/images/eletrical-ecu.jpg",
    desc: "Pre-gapped to 0.75mm with copper core electrode for rapid flame kernel dissipation and clean EFI ignition.",
  },
];

const bundleTotalMrp = guideParts.reduce((acc, p) => acc + p.mrp, 0);
const bundlePrice = 855; // discounted bundle price from design

const tableData = [
  {
    spec: "Valve Timing",
    uce: "Pushrod OHV / Hydraulic Tappets",
    jseries: "Chain-driven SOHC, Roller Rockers",
    implication: "Less reciprocating mass, higher RPM ceiling & stable 10,000km shim intervals",
  },
  {
    spec: "Bore × Stroke",
    uce: "70 × 90 mm (Long stroke)",
    jseries: "72 × 85.8 mm",
    implication: "Decreased mean piston speed, smoother thermal dissipation & reduced skirt friction",
  },
  {
    spec: "Compression Ratio",
    uce: "8.5 : 1",
    jseries: "9.5 : 1",
    implication: "11.7% thermal efficiency gain with standard 91+ RON unblended fuel",
  },
  {
    spec: "Engine Output",
    uce: "19.1 bhp @ 5,250 RPM",
    jseries: "20.2 bhp @ 6,100 RPM",
    implication: "Wider usable powerband with linear, snatch-free roll-on acceleration in city traffic",
  },
  {
    spec: "Peak Engine Torque",
    uce: "28 N·m @ 4,000 RPM",
    jseries: "27 N·m @ 4,000 RPM",
    implication: "Flat torque plateau sustained across 2,400–4,200 RPM for effortless tractability",
  },
  {
    spec: "Oil Capacity & Spec",
    uce: "2.75 Liters · 15W-50 Semi-Synth",
    jseries: "1.70 Liters · 15W-50 (JASO MA2)",
    implication: "38% sump capacity reduction achieved via high-efficiency trochoid scavenging pumps",
  },
  {
    spec: "Counterbalancer",
    uce: "None (Heavy flywheel balance webs)",
    jseries: "Integrated Primary Balance Shaft",
    implication: "Gear-driven reduction of primary vibrations by 85% at handlebar, footpegs & mirrors",
  },
];

const tocItems = [
  { id: "metallurgy", label: "1. Metallurgy & Counterbalancer" },
  { id: "face-off", label: "2. UCE vs. J-Series Architecture" },
  { id: "lubrication", label: "3. Lubrication Circuit & PSI" },
  { id: "clearances", label: "4. Tappet Clearances & Timing" },
  { id: "parts-basket", label: "5. Direct-Article OEM Parts" },
  { id: "torque-specs", label: "6. Master Torque Specs" },
  { id: "troubleshooting", label: "7. Diagnostic Fault Matrix" },
  { id: "next-guides", label: "8. Next Technical Protocols" },
  { id: "qa-forum", label: "9. Mechanic Bench Q&A" },
];

export function GuideDetail() {
  const { add, setIsOpen } = useCart();
  const [activeSection, setActiveSection] = useState("metallurgy");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [bundleAdded, setBundleAdded] = useState(false);

  // Q&A state
  const [questions, setQuestions] = useState([
    {
      id: "q1",
      author: "Karthik Rajagopalan",
      badge: "Certified RE Specialist, Chennai",
      time: "2 days ago",
      text: "Is it safe to run 10W-40 full synthetic in the J-349 instead of 15W-50 during colder Himalayan winters?",
      reply:
        "No. Royal Enfield specifically mandates 15W-50 (JASO MA2) because of the gear-driven primary counterbalancer. The scissor gears generate localized shear pressures that rapidly degrade 40-weight shear stability, risking gear whine. Use only factory 15W-50 semi-synth or full-synth.",
    },
    {
      id: "q2",
      author: "Deven Sengupta",
      badge: "Kolkata Classic Garage",
      time: "5 days ago",
      text: "Can the tappet adjustment be done with feeler gauges alone without the special square-head valve adjusting tool?",
      reply:
        "While possible using needle-nose pliers, you risk burring the 3mm square stud, causing backlash when tightening the locknut. Our Workshop Valve Adjusting Tool (Part #TL-349V) allows holding zero play while torquing the jam-nut to exactly 14 N·m.",
    },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Smooth scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handleAddPart = (part: PartItem) => {
    add({
      id: part.id,
      name: part.name,
      price: part.price,
      img: part.img,
      oem: part.oem,
    });
    setAddedIds((prev) => ({ ...prev, [part.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [part.id]: false }));
    }, 1800);
  };

  const handleAddAllBundle = () => {
    guideParts.forEach((p) => {
      add({
        id: p.id,
        name: p.name,
        price: p.price,
        img: p.img,
        oem: p.oem,
      });
    });
    setBundleAdded(true);
    setIsOpen(true);
    setTimeout(() => setBundleAdded(false), 2500);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: `q-${Date.now()}`,
        author: "You (Active Workshop Member)",
        badge: "Verified RE Owner",
        time: "Just now",
        text: newQuestion.trim(),
        reply:
          "Thank you for submitting your query. A Royal Spares Lab Master Technician will review your tolerance question and append official workshop guidance within 4 hours.",
      },
    ]);
    setNewQuestion("");
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  return (
    <article className="relative bg-offset text-ink min-h-screen">
      {/* Toast Alert for Share */}
      {shareToast && (
        <div className="fixed top-20 right-4 z-50 rounded-card bg-ink text-white px-4 py-2.5 shadow-xl text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>Technical Whitepaper link copied to clipboard</span>
        </div>
      )}

      {/* TOP HEADER / HERO SECTION */}
      <section className="border-b border-line bg-canvas">
        <div className="shell py-6 lg:py-10">
          {/* Breadcrumbs & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-mute">
              <span>Technical Guide</span>
              <span className="text-line">·</span>
              <span>J-Series OHC</span>
              <span className="text-line">·</span>
              <span className="inline-flex items-center gap-1 text-stock font-medium">
                <CheckCircle2 className="size-3" /> Factory Specifications
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`inline-flex items-center gap-1.5 rounded-control border px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                  isBookmarked
                    ? "border-heritage bg-heritage text-white"
                    : "border-line bg-well text-mute hover:border-ink hover:text-ink"
                }`}
                title="Save this technical protocol to your garage"
              >
                <Bookmark className="size-3.5" />
                <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save Guide"}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-control border border-line bg-well px-3 py-1.5 text-[12px] font-medium text-mute hover:border-ink hover:text-ink transition-colors cursor-pointer"
                title="Share technical protocol link"
              >
                <Share2 className="size-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={() => alert("Downloading Factory Service Manual PDF (J-Series SOHC - 24MB)...")}
                className="inline-flex items-center gap-1.5 rounded-control border border-line bg-well px-3 py-1.5 text-[12px] font-medium text-mute hover:border-ink hover:text-ink transition-colors cursor-pointer"
                title="Download complete factory technical manual"
              >
                <Download className="size-3.5" />
                <span className="hidden sm:inline">Download PDF (24MB)</span>
              </button>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="mt-5 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight text-ink leading-[1.18]">
              Decoding the J-Series 349cc Engine: Architecture, Oil Circuitry, Valve Tolerances &amp; Torque Specifications
            </h1>
            <p className="mt-3 text-[14px] sm:text-[15px] lg:text-[16px] text-mute leading-relaxed font-normal">
              A comprehensive mechanical breakdown of Royal Enfield&apos;s counterbalanced single: metallurgy, high-pressure galleries, critical service clearances, and factory workshop fastener torques.
            </p>
          </div>

          {/* Author Row & Guide Metadata */}
          <div className="mt-6 pt-5 border-t border-line/80 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Author info */}
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-heritage/15 border border-heritage/30 flex items-center justify-center font-bold text-heritage text-[13px] shrink-0">
                VK
              </div>
              <div>
                <p className="text-[13px] font-semibold text-ink leading-tight">VK Someshwara Rao</p>
                <p className="text-[11px] text-mute font-normal mt-0.5">
                  Lead Tech Editor · Royal Spares Workshop Lab
                </p>
              </div>
            </div>

            {/* Read Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[12px] text-mute">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-heritage" /> 12 min read
              </span>
              <span className="text-line hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" /> Updated 18 hours ago
              </span>
              <span className="text-line hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-stock">
                <ShieldCheck className="size-3.5" /> Applicable 2021–2025
              </span>
            </div>

            {/* Desktop Quick Specs Badge */}
            <div className="hidden xl:flex items-center gap-3 rounded-card border border-line bg-well px-4 py-2 text-[12px]">
              <div>
                <span className="block font-bold text-ink">349cc SOHC</span>
                <span className="text-mute text-[10px]">5-Speed Box</span>
              </div>
              <div className="h-6 w-px bg-line" />
              <div>
                <span className="block font-bold text-ink">Twin Valves</span>
                <span className="text-mute text-[10px]">1-Cyl EFI</span>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Horizontal Quick Chips Bar */}
          <div className="mt-4 flex xl:hidden items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="shrink-0 rounded-md bg-well border border-line px-2.5 py-1 text-[11px] text-ink font-semibold">
              349cc SOHC
            </span>
            <span className="shrink-0 rounded-md bg-well border border-line px-2.5 py-1 text-[11px] text-ink font-semibold">
              Bore × Stroke: 72 × 85.8mm
            </span>
            <span className="shrink-0 rounded-md bg-well border border-line px-2.5 py-1 text-[11px] text-ink font-semibold">
              Compression: 9.5 : 1
            </span>
            <span className="shrink-0 rounded-md bg-well border border-line px-2.5 py-1 text-[11px] text-ink font-semibold">
              Oil Capacity: 1.70L
            </span>
          </div>
        </div>
      </section>

      {/* MOBILE ACCORDION: ARTICLE QUICK JUMP */}
      <div className="lg:hidden sticky top-14 z-30 border-b border-line bg-canvas/95 backdrop-blur-md px-4 py-2.5">
        <button
          onClick={() => setIsTocOpen(!isTocOpen)}
          className="w-full flex items-center justify-between text-[12px] font-semibold text-ink"
        >
          <span className="flex items-center gap-2">
            <Layers className="size-4 text-heritage" />
            <span>Article Index &amp; Quick Jump</span>
          </span>
          <ChevronDown className={`size-4 text-mute transition-transform ${isTocOpen ? "rotate-180" : ""}`} />
        </button>

        {isTocOpen && (
          <nav className="mt-3 border-t border-line/60 pt-2 space-y-1.5 animate-in fade-in duration-150">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsTocOpen(false)}
                className={`block rounded-md px-2.5 py-1.5 text-[12px] transition-colors ${
                  activeSection === item.id
                    ? "bg-heritage text-white font-semibold"
                    : "text-mute hover:bg-well hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <div className="shell py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* DESKTOP STICKY LEFT SIDEBAR (Col span 3) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-6">
            {/* Table of contents card */}
            <div className="rounded-card border border-line bg-canvas p-4 shadow-sm">
              <h3 className="text-[12px] font-semibold text-ink mb-3 flex items-center gap-2">
                <Layers className="size-3.5 text-heritage" />
                <span>In this guide</span>
              </h3>
              <nav className="space-y-1 text-[12px]">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block rounded-md px-2.5 py-1.5 transition-colors ${
                      activeSection === item.id
                        ? "bg-heritage/10 text-heritage font-semibold border-l-2 border-heritage"
                        : "text-mute hover:bg-well hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Active Bench Spec Card */}
            <div className="rounded-card border border-line bg-canvas p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="text-[11px] font-medium text-mute">Active Bench Spec</span>
                <span className="rounded bg-stock/10 px-1.5 py-0.5 text-[10px] font-semibold text-stock">
                  OEM Spec
                </span>
              </div>
              <div>
                <p className="text-[14px] font-bold text-ink">J1-349 SOHC</p>
                <p className="text-[11px] text-mute">Classic · Bullet · Meteor · Hunter</p>
              </div>
              <div className="space-y-1.5 text-[12px] border-t border-line/60 pt-2 text-mute">
                <div className="flex justify-between">
                  <span>Displacement:</span>
                  <span className="font-semibold text-ink">349.34 cc</span>
                </div>
                <div className="flex justify-between">
                  <span>Compression:</span>
                  <span className="font-semibold text-ink">9.5 : 1</span>
                </div>
                <div className="flex justify-between">
                  <span>Dry Weight:</span>
                  <span className="font-semibold text-ink">42.8 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Sump Oil:</span>
                  <span className="font-semibold text-ink">1.70 Liters</span>
                </div>
              </div>

              <button
                onClick={() => alert("Downloading RE Factory Service Manual (PDF - 24MB)...")}
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 rounded-control border border-line bg-well py-2 text-[12px] font-semibold text-ink hover:border-ink transition-colors cursor-pointer"
              >
                <Download className="size-3.5 text-mute" />
                <span>Service Manual (PDF)</span>
              </button>
            </div>
          </aside>

          {/* MAIN ARTICLE BODY (Col span 9) */}
          <main className="lg:col-span-9 space-y-12">
            {/* ========================================================= */}
            {/* SECTION 1: Engine Metallurgy & Primary Counterbalancer */}
            {/* ========================================================= */}
            <section id="metallurgy" className="scroll-mt-24 space-y-4">
              <div className="border-b border-line/80 pb-3">
                <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                  Engine Metallurgy &amp; The Primary Counterbalancer
                </h2>
              </div>

              <div className="prose text-[14px] md:text-[15px] leading-relaxed text-ink/90 space-y-3">
                <p>
                  The departure from pushrod overhead valves to a Single Overhead Camshaft (SOHC) configuration was not
                  merely an emissions adaptation — it transformed the core thermal stability and valvetrain damping of
                  the motorcycle. By replacing the twin-pushrod geometry with a single helical camshaft acting on
                  roller rocker arms, internal reciprocating mass at the cylinder top-end was decreased by nearly 36%.
                </p>
                <p>
                  Crucially, the J-Series incorporates an eccentric gear-driven primary balance shaft, nestled
                  immediately forward of the crankshaft. Unlike the older UCE platform where natural secondary vibrations
                  dictated a practical 5,000 RPM ceiling, this counterbalancer cancels primary unbalanced inertia at the
                  root, delivering steady power delivery without losing the signature long-stroke exhaust cadence.
                </p>
              </div>

              {/* TECHNICAL CAD CUTAWAY HERO CARD */}
              <div className="relative overflow-hidden rounded-card border border-line bg-canvas p-4 md:p-6 shadow-sm">
                <div className="relative aspect-[16/9] w-full rounded-xl bg-well overflow-hidden border border-line flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/classic-350.avif"
                    alt="Royal Enfield J-Series 349cc SOHC Engine Cutaway"
                    className="h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                  />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="rounded bg-ink/80 text-white backdrop-blur px-2.5 py-1 text-[11px] font-medium">
                      Classic 350 · Bullet 350 · Hunter 350 · Meteor 350
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-[11px] text-mute bg-canvas/90 backdrop-blur px-2.5 py-1 rounded border border-line">
                    SOHC Valvetrain &amp; Primary Countershaft
                  </div>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-mute">
                  The structural stiffness of the J-Series is largely conferred from high-pressure die-cast (HPDC) aluminum alloy
                  crankcase halves. In contrast to gravity die-cast predecessors, tolerances are held within ±0.015mm across
                  machined mating surfaces. Both case halves split vertically, featuring an integrated main bearing journal web
                  that isolates torsional deflection under high combustion loads.
                </p>

                {/* Senior Tech Memo Callout Box */}
                <div className="mt-4 rounded-control border border-heritage/30 bg-heritage/5 p-3.5 flex items-start gap-3">
                  <Wrench className="size-5 text-heritage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-semibold text-ink">
                      Senior Tech Memo: Case-Half Mating Rigidity
                    </h4>
                    <p className="text-[12px] text-mute mt-1 leading-normal">
                      Royal Enfield factory service protocol strictly prohibits using silicone RTV or paper gaskets between
                      crankcase halves. Always use ThreeBond 1215B liquid gasket applied in a continuous 1.2mm bead around oil
                      passages. Torque crankcase bolts in an outward spiral sequence (10–12 N·m).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 2: Architectural Face-Off (UCE vs J-Series) */}
            {/* ========================================================= */}
            <section id="face-off" className="scroll-mt-24 space-y-4">
              <div className="border-b border-line/80 pb-3">
                <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                  Platform Comparison: UCE 350 vs. J-Series 349cc SOHC
                </h2>
                <p className="text-[13px] text-mute mt-1">
                  A side-by-side mechanical audit revealing why components for older pushrod Twinspark engines are strictly
                  non-interchangeable with new J-Platforms.
                </p>
              </div>

              {/* TABLE VIEW (Desktop / Tablet) */}
              <div className="overflow-x-auto rounded-card border border-line bg-canvas shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-line bg-well text-[12px] font-semibold text-mute">
                      <th className="p-3.5 pl-4">Specification</th>
                      <th className="p-3.5">Legacy UCE Platform</th>
                      <th className="p-3.5 bg-heritage/5 text-heritage font-bold">J-Series (J1-349 SOHC)</th>
                      <th className="p-3.5 pr-4 hidden md:table-cell">Engineering Implication</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/70 text-[13px]">
                    {tableData.map((row) => (
                      <tr key={row.spec} className="hover:bg-well/50 transition-colors">
                        <td className="p-3.5 pl-4 font-semibold text-ink whitespace-nowrap">{row.spec}</td>
                        <td className="p-3.5 text-mute">{row.uce}</td>
                        <td className="p-3.5 bg-heritage/5 font-semibold text-ink">{row.jseries}</td>
                        <td className="p-3.5 pr-4 text-[12px] text-mute hidden md:table-cell">{row.implication}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile-only engineering implication summary cards */}
              <div className="grid grid-cols-1 gap-2.5 md:hidden">
                <div className="rounded-card border border-line bg-canvas p-3 text-[12px]">
                  <span className="text-heritage font-bold block mb-1">Key Takeaway</span>
                  <p className="text-mute">
                    Zero crossover parts between UCE and J-Series. Crankshaft, gaskets, oil filters, spark plug thread pitches, and
                    sprockets are completely distinct.
                  </p>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 3: Lubrication Path & Pressurized Micro-Filtration */}
            {/* ========================================================= */}
            <section id="lubrication" className="scroll-mt-24 space-y-4">
              <div className="border-b border-line/80 pb-3">
                <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                  Lubrication Path &amp; The Pressurized Filtration Circuit
                </h2>
              </div>

              <p className="text-[14px] md:text-[15px] leading-relaxed text-ink/90">
                The J-Series engine operates an internal scavenge-and-scavenge pump layout driven directly by the gear train. Operating
                pressure delivers a steady volume of <strong>3.8 to 4.2 bar at 3,500 RPM</strong> (at nominal operating temperature of 85°C).
                The engine pulls oil from the lower sump via a wire strainer before forcing it through the right-side pleated micro-cartridge
                and routing it toward the crankshaft, valvetrain, and under-piston cooling jet.
              </p>

              {/* Interactive Schematic Flow Stage */}
              <div className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div>
                    <h4 className="text-[14px] font-bold text-ink">Pressurized Circuit Flow Topology</h4>
                    <p className="text-[12px] text-mute">From sump to under-crown cooling nozzle</p>
                  </div>
                  <span className="rounded bg-well border border-line px-2 py-0.5 text-[11px] text-mute">
                    Factory standard 2024
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Left: Step Breakdown */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-card border border-line bg-well p-3">
                      <span className="grid size-6 place-items-center rounded-full bg-heritage text-[12px] font-bold text-white shrink-0">
                        1
                      </span>
                      <div>
                        <h5 className="text-[13px] font-semibold text-ink">Crankcase Sump Strainer &amp; Trochoid Pump</h5>
                        <p className="text-[12px] text-mute mt-0.5">
                          Coarse-mesh pre-filter captures metal debris before oil reaches the high-volume trochoid gear pump.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-card border border-line bg-well p-3">
                      <span className="grid size-6 place-items-center rounded-full bg-heritage text-[12px] font-bold text-white shrink-0">
                        2
                      </span>
                      <div>
                        <h5 className="text-[13px] font-semibold text-ink">Pleated Cartridge &amp; Filter Chamber</h5>
                        <p className="text-[12px] text-mute mt-0.5">
                          OEM resin-impregnated paper filter removes micro particulates down to 25 microns before high-pressure galleries.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-card border border-line bg-well p-3">
                      <span className="grid size-6 place-items-center rounded-full bg-heritage text-[12px] font-bold text-white shrink-0">
                        3
                      </span>
                      <div>
                        <h5 className="text-[13px] font-semibold text-ink">Continuous Under-Piston Cooling Jet</h5>
                        <p className="text-[12px] text-mute mt-0.5">
                          Direct high-velocity spray targets the underside of the piston crown, reducing piston head temperatures by up to 34°C.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Diagram Visual */}
                  <div className="relative aspect-[4/3] rounded-xl border border-line bg-[#fafafa] p-4 flex flex-col items-center justify-center text-center overflow-hidden">
                    <div className="size-16 rounded-full bg-heritage/10 border border-heritage/30 flex items-center justify-center text-heritage mb-2">
                      <Gauge className="size-8" />
                    </div>
                    <span className="text-[16px] font-bold text-ink">4.0 bar @ 3,500 RPM</span>
                    <span className="text-[12px] text-mute mt-0.5">Nominal gallery operating pressure</span>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-stock/10 border border-stock/20 px-2.5 py-0.5 text-[11px] text-stock font-medium">
                      <Check className="size-3" /> Bypass valve: 1.8 bar relief
                    </div>
                  </div>
                </div>

                {/* Critical Warning Callout */}
                <div className="rounded-control border border-danger/30 bg-danger/5 p-3.5 flex items-start gap-3">
                  <AlertTriangle className="size-5 text-danger shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[13px] font-semibold text-danger">
                      Workshop Warning: Crush Washer Protocol &amp; Nozzle Alignment
                    </h5>
                    <p className="text-[12px] text-ink/80 mt-1 leading-normal">
                      The M14 sump drain plug uses a solid copper crush washer. Re-torquing an eroded or deformed washer produces
                      hairline stress cracks across the magnesium-aluminum lower sump casting. Always replace the washer at each oil drain cycle.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 4: Valve Clearances & SOHC Timing Precision */}
            {/* ========================================================= */}
            <section id="clearances" className="scroll-mt-24 space-y-4">
              <div className="border-b border-line/80 pb-3">
                <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                  Valve Clearances &amp; SOHC Timing Alignment
                </h2>
              </div>

              <p className="text-[14px] md:text-[15px] leading-relaxed text-ink/90">
                Because the J-Series utilizes screw-and-locknut tappet adjusters with roller rockers, periodic clearance checks are
                mandatory at <strong>10,000 km service intervals</strong>. Always measure with an engine temperature strictly below 35°C (cold engine).
              </p>

              {/* TWO SPEC METRIC CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Intake Spec Card */}
                <div className="rounded-card border border-stock/30 bg-stock/5 p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-stock/15 px-2 py-0.5 text-[11px] font-semibold text-stock">
                      Intake valve
                    </span>
                    <span className="text-[11px] text-mute">Cold (&lt;35°C)</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-ink tracking-tight">0.08</span>
                    <span className="text-lg font-bold text-ink">mm</span>
                    <span className="text-[12px] text-mute">± 0.02 mm</span>
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed text-mute">
                    Measure between roller rocker pad and valve stem tip with a flat feeler gauge. Jam-nut lock tightening requires
                    counter-holding with a 3mm square valve adjusting tool.
                  </p>
                </div>

                {/* Exhaust Spec Card */}
                <div className="rounded-card border border-link/30 bg-link/5 p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-link/15 px-2 py-0.5 text-[11px] font-semibold text-link">
                      Exhaust valve
                    </span>
                    <span className="text-[11px] text-mute">Cold (&lt;35°C)</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-ink tracking-tight">0.24</span>
                    <span className="text-lg font-bold text-ink">mm</span>
                    <span className="text-[12px] text-mute">± 0.02 mm</span>
                  </div>

                  <p className="mt-3 text-[12px] leading-relaxed text-mute">
                    Exhaust clearance accommodates higher thermal expansion of the stem due to superheated exhaust gas flow. Re-check
                    clearance after torquing the jam-nut to 14 N·m.
                  </p>
                </div>
              </div>

              {/* Protocol Steps Box */}
              <div className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-3">
                <h4 className="text-[14px] font-bold text-ink">Standard Feeler Gauge Protocol Checklist</h4>
                <ol className="space-y-2 text-[13px] text-mute list-decimal pl-5 leading-normal">
                  <li>
                    Rotate the crankshaft anti-clockwise via the alternator center bolt until the &apos;T&apos; line mark on the rotor aligns
                    with the crankcase index notch.
                  </li>
                  <li>
                    Verify that both rocker arms have palpable play. If tight, rotate 360° to reach the TRUE top-dead-center (TDC) of the
                    compression stroke.
                  </li>
                  <li>
                    Insert the 0.08mm blade into the intake gap. It should slide through with a smooth, oily drag resistance without flexing.
                  </li>
                  <li>
                    Torque the M5 adjuster locknut to 14 N·m while counter-holding the square head. Re-check clearance; if tightened, re-adjust.
                  </li>
                </ol>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 5: Direct In-Article OEM Parts Basket */}
            {/* ========================================================= */}
            <section id="parts-basket" className="scroll-mt-24 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line/80 pb-3 gap-2">
                <div>
                  <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                    Genuine Replacement Parts
                  </h2>
                  <p className="text-[13px] text-mute mt-0.5">
                    Original components mentioned in the service steps above, ready to add directly to your cart.
                  </p>
                </div>
                <span className="text-[12px] font-medium text-stock shrink-0">
                  All parts in stock &amp; dispatch ready
                </span>
              </div>

              {/* 4 Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guideParts.map((part) => {
                  const isAdded = addedIds[part.id];
                  return (
                    <div
                      key={part.id}
                      className="card card-hover flex flex-col justify-between p-4 bg-canvas border border-line rounded-card transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="part-ref truncate">#{part.oem}</span>
                          <span className="chip-stock !text-[10px]">In stock</span>
                        </div>

                        <div className="mt-3 aspect-[16/10] w-full rounded-lg bg-well border border-line overflow-hidden p-2 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={part.img} alt={part.name} className="h-full w-full object-contain" />
                        </div>

                        <h4 className="mt-3 text-[14px] font-semibold text-ink leading-snug">{part.name}</h4>
                        <p className="mt-1 text-[11px] text-mute line-clamp-2">{part.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                        <div>
                          <span className="text-[16px] font-bold text-ink">{inr(part.price)}</span>
                          <span className="ml-2 text-[12px] text-mute line-through">{inr(part.mrp)}</span>
                        </div>

                        <button
                          onClick={() => handleAddPart(part)}
                          className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-control text-[12px] font-medium transition-colors cursor-pointer ${
                            isAdded
                              ? "bg-stock text-white"
                              : "bg-heritage text-white hover:opacity-90"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="size-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <Plus className="size-3.5" /> Add to Bag
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BUNDLE BUY PROMOTION CARD */}
              <div className="rounded-card border border-heritage/30 bg-heritage/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-heritage">
                      Service Essentials Bundle
                    </span>
                    <span className="text-[12px] text-stock font-semibold">Save ₹180</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-ink mt-1">Complete 10,000 KM Periodic Service Bundle</h4>
                  <p className="text-[12px] text-mute mt-0.5">
                    Includes Oil Filter, Magnetic Drain Bolt with Washer, Viton Valve Cover Gasket, and RG4HC Spark Plug.
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xl font-bold text-ink">{inr(bundlePrice)}</span>
                    <span className="block text-[12px] text-mute line-through">{inr(bundleTotalMrp)}</span>
                  </div>

                  <button
                    onClick={handleAddAllBundle}
                    className="btn-primary h-10 px-5 text-[13px] whitespace-nowrap cursor-pointer"
                  >
                    <ShoppingBag className="size-4" />
                    <span>{bundleAdded ? "Bundle Added!" : "Add All 4 to Bag"}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 6: Master Torque Reference Card & Fasteners */}
            {/* ========================================================= */}
            <section id="torque-specs" className="scroll-mt-24 space-y-4">
              <div className="border-b border-line/80 pb-3">
                <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                  Torque Reference Card &amp; Tightening Patterns
                </h2>
                <p className="text-[13px] text-mute mt-1">
                  Torque values strictly verified against Royal Enfield factory workshop standards. Always use a calibrated torque wrench.
                </p>
              </div>

              {/* 4 Main Torque Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-card border border-line bg-canvas p-3.5 shadow-sm">
                  <span className="text-[11px] font-medium text-mute block truncate">Cylinder head flange</span>
                  <p className="mt-2 text-2xl font-bold text-ink">48 N·m</p>
                  <p className="text-[12px] text-mute">35.4 ft-lb · M10</p>
                  <p className="mt-2 text-[11px] text-mute border-t border-line/60 pt-1.5 leading-tight">
                    Cross-diagonal 2-stage (25 Nm then 48 Nm)
                  </p>
                </div>

                <div className="rounded-card border border-line bg-canvas p-3.5 shadow-sm">
                  <span className="text-[11px] font-medium text-mute block truncate">Oil sump drain bolt</span>
                  <p className="mt-2 text-2xl font-bold text-ink">15 N·m</p>
                  <p className="text-[12px] text-mute">11.0 ft-lb · M14</p>
                  <p className="mt-2 text-[11px] text-mute border-t border-line/60 pt-1.5 leading-tight">
                    Fresh solid copper crush washer mandatory
                  </p>
                </div>

                <div className="rounded-card border border-line bg-canvas p-3.5 shadow-sm">
                  <span className="text-[11px] font-medium text-mute block truncate">Spark plug (RG4HC)</span>
                  <p className="mt-2 text-2xl font-bold text-ink">20 N·m</p>
                  <p className="text-[12px] text-mute">14.7 ft-lb · M10</p>
                  <p className="mt-2 text-[11px] text-mute border-t border-line/60 pt-1.5 leading-tight">
                    Hand thread 3 full turns before torque socket
                  </p>
                </div>

                <div className="rounded-card border border-line bg-canvas p-3.5 shadow-sm">
                  <span className="text-[11px] font-medium text-mute block truncate">Valve tappet locknut</span>
                  <p className="mt-2 text-2xl font-bold text-ink">14 N·m</p>
                  <p className="text-[12px] text-mute">10.3 ft-lb · M5</p>
                  <p className="mt-2 text-[11px] text-mute border-t border-line/60 pt-1.5 leading-tight">
                    Counter-hold square stud with 3mm tool
                  </p>
                </div>
              </div>

              {/* Secondary Torque Matrix Table */}
              <div className="rounded-card border border-line bg-well p-4 flex flex-wrap items-center justify-between gap-4 text-[12px] text-mute">
                <div>
                  <span className="text-ink font-semibold">Crankcase Tension Bolt (M6):</span> 10 N·m (7.3 ft-lb)
                </div>
                <div className="hidden sm:block text-line">|</div>
                <div>
                  <span className="text-ink font-semibold">Clutch Hub Center Nut (M18):</span> 85 N·m (Reverse)
                </div>
                <div className="hidden sm:block text-line">|</div>
                <div>
                  <span className="text-ink font-semibold">Rotor / Magneto Bolt (M10):</span> 40 N·m (Threadlocker)
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 7: Troubleshooting Valve Tappet vs Piston Slap */}
            {/* ========================================================= */}
            <section id="troubleshooting" className="scroll-mt-24 space-y-4">
              <div className="border-b border-line/80 pb-3">
                <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                  Troubleshooting: Valve Tappet Clatter vs. Piston Slap at Cold Start
                </h2>
                <p className="text-[13px] text-mute mt-1">
                  Because the J-Series operates with a tight gear-driven valvetrain, mechanical clearances must only be diagnosed
                  when the crankcase temperature has normalized after a full operating thermal cycle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tappet Clatter Diagnostic Card */}
                <div className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-stock" />
                    <h4 className="text-[14px] font-bold text-ink">Acoustic Sign: Metallic Tappet Tick (Top-End)</h4>
                  </div>
                  <ul className="space-y-2 text-[12px] text-mute">
                    <li className="flex items-start gap-2">
                      <span className="text-ink font-semibold shrink-0">Frequency:</span>
                      <span>Exactly 1/2 crankshaft speed (camshaft rotation rate).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink font-semibold shrink-0">Sound Profile:</span>
                      <span>High-pitched light metallic tapping, loudest directly at cylinder head cover.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink font-semibold shrink-0">Thermal Pattern:</span>
                      <span>Constant across cold and operating temp (85°C); does NOT subside when hot.</span>
                    </li>
                    <li className="flex items-start gap-2 border-t border-line pt-2 text-ink">
                      <span className="text-heritage font-semibold shrink-0">Remedy:</span>
                      <span>Valve lash exceeds 0.12mm (intake) or 0.28mm (exhaust). Re-adjust screw adjusters.</span>
                    </li>
                  </ul>
                </div>

                {/* Piston Slap Diagnostic Card */}
                <div className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-link" />
                    <h4 className="text-[14px] font-bold text-ink">Acoustic Sign: Heavy Dull Knock (Piston Slap)</h4>
                  </div>
                  <ul className="space-y-2 text-[12px] text-mute">
                    <li className="flex items-start gap-2">
                      <span className="text-ink font-semibold shrink-0">Frequency:</span>
                      <span>1× crankshaft speed (every revolution at TDC/BDC changeover).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink font-semibold shrink-0">Sound Profile:</span>
                      <span>Hollow, muffled metallic thud, loudest near cylinder barrel lower skirts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink font-semibold shrink-0">Thermal Pattern:</span>
                      <span>Noticeable at cold start (&lt;25°C), completely disappears as piston expands.</span>
                    </li>
                    <li className="flex items-start gap-2 border-t border-line pt-2 text-ink">
                      <span className="text-link font-semibold shrink-0">Remedy:</span>
                      <span>Normal cold tolerance behavior. If persists when fully hot, inspect cylinder ovality.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 8: Next Technical Protocols */}
            {/* ========================================================= */}
            <section id="next-guides" className="scroll-mt-24 space-y-4">
              <div className="flex items-center justify-between border-b border-line/80 pb-3">
                <div>
                  <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                    Related Manuals &amp; Guides
                  </h2>
                </div>
                <Link href="/guides" className="link-action text-[13px] hidden sm:inline-flex">
                  Explore all guides <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/guides"
                  className="card card-hover flex flex-col p-4 bg-canvas border border-line rounded-card transition-all group"
                >
                  <span className="text-[11px] text-mute font-medium">Chassis &amp; Transmission · 7 min read</span>
                  <h4 className="mt-2 text-[14px] font-semibold text-ink group-hover:text-heritage transition-colors">
                    520 X-Ring Drive Chain Tensioning &amp; Master Link Replacement
                  </h4>
                  <p className="mt-1 text-[12px] text-mute line-clamp-2">
                    Laser alignment vs. swingarm hash marks: verifying sprocket coplanarity and 25–30mm slack tolerance.
                  </p>
                  <span className="mt-auto pt-3 flex items-center gap-1 text-[12px] font-semibold text-heritage">
                    Read guide <ChevronRight className="size-3" />
                  </span>
                </Link>

                <Link
                  href="/guides"
                  className="card card-hover flex flex-col p-4 bg-canvas border border-line rounded-card transition-all group"
                >
                  <span className="text-[11px] text-mute font-medium">Brakes &amp; Hydraulics · 9 min read</span>
                  <h4 className="mt-2 text-[14px] font-semibold text-ink group-hover:text-heritage transition-colors">
                    ByBre Dual-Channel Caliper Bleeding and DOT 4 Flush Procedure
                  </h4>
                  <p className="mt-1 text-[12px] text-mute line-clamp-2">
                    Master cylinder diaphragm diagnostics, caliper guide pin torque, and ABS hydraulic bubble evacuation.
                  </p>
                  <span className="mt-auto pt-3 flex items-center gap-1 text-[12px] font-semibold text-heritage">
                    Read guide <ChevronRight className="size-3" />
                  </span>
                </Link>

                <Link
                  href="/guides"
                  className="card card-hover flex flex-col p-4 bg-canvas border border-line rounded-card transition-all group"
                >
                  <span className="text-[11px] text-mute font-medium">Electrical &amp; EFI · 11 min read</span>
                  <h4 className="mt-2 text-[14px] font-semibold text-ink group-hover:text-heritage transition-colors">
                    Adjustable Reed Switch TPS Calibration &amp; Magneto Stator Health
                  </h4>
                  <p className="mt-1 text-[12px] text-mute line-clamp-2">
                    Multi-meter bench test across phase windings, rectifier output under load, and stepper motor relearn.
                  </p>
                  <span className="mt-auto pt-3 flex items-center gap-1 text-[12px] font-semibold text-heritage">
                    Read guide <ChevronRight className="size-3" />
                  </span>
                </Link>
              </div>
            </section>

            {/* ========================================================= */}
            {/* SECTION 9: Mechanic Technical Forum & Bench Q&A */}
            {/* ========================================================= */}
            <section id="qa-forum" className="scroll-mt-24 space-y-4">
              <div className="flex items-center justify-between border-b border-line/80 pb-3">
                <div>
                  <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
                    Technical Q&amp;A
                  </h2>
                  <p className="text-[13px] text-mute mt-0.5">
                    Verified responses from senior technicians from the Royal Spares Workshop Lab.
                  </p>
                </div>
                <span className="rounded bg-well border border-line px-2.5 py-1 text-[11px] text-mute hidden sm:inline-block">
                  {questions.length} questions
                </span>
              </div>

              {/* Discussion List */}
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-well border border-line flex items-center justify-center text-[12px] font-bold text-ink">
                          {q.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-[13px] font-semibold text-ink">{q.author}</span>
                          <span className="ml-2 rounded bg-well px-1.5 py-0.5 text-[11px] text-mute">
                            {q.badge}
                          </span>
                        </div>
                      </div>
                      <span className="text-[12px] text-mute">{q.time}</span>
                    </div>

                    <p className="text-[13px] font-medium text-ink leading-normal">{q.text}</p>

                    {/* Master reply */}
                    <div className="rounded-control border border-heritage/20 bg-heritage/5 p-3.5 flex items-start gap-3">
                      <div className="size-6 rounded-full bg-heritage text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-heritage">Royal Spares Workshop Lab</span>
                          <span className="text-[10px] font-medium bg-heritage text-white px-1.5 py-0.5 rounded">
                            Verified
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] text-ink/80 leading-relaxed">{q.reply}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Question Form */}
              <form
                onSubmit={handleSubmitQuestion}
                className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-3"
              >
                <h4 className="text-[14px] font-semibold text-ink">Submit a Question</h4>
                <p className="text-[12px] text-mute">
                  Ask our workshop team about torque sequences, feeler gauge tolerances, or OEM part revisions.
                </p>

                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. Can I reuse the copper sealing washer on the secondary oil passage banjo bolt if annealed over flame?"
                  className="w-full h-24 rounded-control border border-line bg-well p-3 text-[13px] outline-none placeholder:text-mute focus:border-ink focus:bg-canvas transition-colors resize-none"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-mute">Responses verified within 4 hours</span>
                  <button
                    type="submit"
                    disabled={!newQuestion.trim()}
                    className="btn-primary h-9 px-4 text-[13px] disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="size-3.5" /> Post Question
                  </button>
                </div>

                {submittedMessage && (
                  <p className="text-[12px] text-stock">
                    ✓ Your query has been logged and routed to our bench team!
                  </p>
                )}
              </form>
            </section>
          </main>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM ACTIONS BAR */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] text-stock font-medium">
              Service Essentials Bundle
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[17px] font-bold text-ink">{inr(bundlePrice)}</span>
              <span className="text-[12px] text-mute line-through">{inr(bundleTotalMrp)}</span>
            </div>
          </div>

          <button
            onClick={handleAddAllBundle}
            className="btn-primary h-10 px-4 text-[13px] font-semibold shadow-md cursor-pointer"
          >
            <ShoppingBag className="size-4" />
            <span>{bundleAdded ? "Bundle Added!" : "Add All To Bag"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

