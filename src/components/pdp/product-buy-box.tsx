"use client";
import { useState } from "react";
import {
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Plus,
  Minus,
  MapPin,
  Truck,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Part, inr } from "@/lib/data";
import { useCart } from "@/components/cart";
import { GarageBikeModal } from "./garage-bike-modal";

export function ProductBuyBox({ part }: { part: Part }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const [pincode, setPincode] = useState("560001");
  const [pinStatus, setPinStatus] = useState<{
    city: string;
    sla: string;
    courier: string;
    fast: boolean;
  }>({
    city: "Bengaluru Central",
    sla: "Guaranteed delivery by Tomorrow, 4:00 PM",
    courier: "BlueDart Aviation Priority",
    fast: true,
  });
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  // Garage bike state
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const [activeBike, setActiveBike] = useState(part.matchedBike.name);
  const [isMatch, setIsMatch] = useState(true);
  const [matchNotes, setMatchNotes] = useState(part.matchedBike.chassis);

  const handleCopyOem = () => {
    navigator.clipboard.writeText(part.oem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingPin(true);
    setTimeout(() => {
      setIsCheckingPin(false);
      const clean = pincode.trim();
      if (clean.startsWith("56")) {
        setPinStatus({
          city: "Bengaluru Central Hub",
          sla: "Guaranteed delivery by Tomorrow, 4:00 PM",
          courier: "BlueDart Aviation Express",
          fast: true,
        });
      } else if (clean.startsWith("60") || clean.startsWith("61") || clean.startsWith("62")) {
        setPinStatus({
          city: "Chennai Factory Logistics Hub",
          sla: "Guaranteed delivery by Tomorrow, 11:30 AM",
          courier: "Direct Surface Express",
          fast: true,
        });
      } else if (clean.startsWith("11") || clean.startsWith("12") || clean.startsWith("20")) {
        setPinStatus({
          city: "Delhi NCR Air Cargo Terminal",
          sla: "Guaranteed delivery within 24–48 hours",
          courier: "BlueDart Aviation Priority",
          fast: true,
        });
      } else if (clean.startsWith("40") || clean.startsWith("41")) {
        setPinStatus({
          city: "Mumbai & Pune Metro Depots",
          sla: "Guaranteed delivery within 24–36 hours",
          courier: "Air Express Direct",
          fast: true,
        });
      } else {
        setPinStatus({
          city: `All-India Regional Dispatch (${clean || "PIN"})`,
          sla: "Standard Courier Delivery within 2–4 business days",
          courier: "Tracked Express Courier",
          fast: false,
        });
      }
    }, 300);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Meta: OEM REF + Stock Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={handleCopyOem}
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-well px-2.5 py-1 font-mono text-[12px] font-medium text-ink hover:border-ink transition-colors"
          title="Click to copy OEM Part Number"
        >
          <span className="text-mute">OEM REF:</span>
          <span>{part.oem}</span>
          {copied ? <Check className="size-3 text-stock" /> : <Copy className="size-3 text-mute" />}
        </button>

        <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-stock">
          <span className="size-2 rounded-full bg-stock animate-pulse" />
          <span>
            {part.stockUnits} in stock ({part.stock})
          </span>
        </div>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight text-ink leading-tight">
          {part.name}
        </h1>
        <p className="mt-1.5 text-[13px] md:text-[14px] text-mute font-normal">{part.sub}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/80">{part.description}</p>
      </div>

      {/* Guaranteed Fitment Card */}
      <div
        className={`rounded-card border p-3.5 transition-all ${
          isMatch ? "border-stock/30 bg-stock/5" : "border-danger/30 bg-danger/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className={`size-4 ${isMatch ? "text-stock" : "text-danger"}`} />
            <span className="text-[13px] font-semibold text-ink">
              {isMatch ? "Guaranteed Fitment" : "Fitment Warning"}
            </span>
            <span className="text-mute font-mono text-[11px] hidden sm:inline">
              · Pre-matched to garage bike
            </span>
          </div>
          <button
            onClick={() => setIsBikeModalOpen(true)}
            className="text-[12px] font-medium text-link hover:underline underline-offset-2"
          >
            Change
          </button>
        </div>

        <div className="mt-2.5 flex items-center justify-between rounded-control border border-line/60 bg-canvas p-2.5">
          <div className="min-w-0 pr-2">
            <p className="truncate text-[13px] font-medium text-ink">{activeBike}</p>
            <p className="truncate text-[11px] text-mute font-mono mt-0.5">{matchNotes}</p>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${
              isMatch ? "bg-stock/15 text-stock" : "bg-danger/15 text-danger"
            }`}
          >
            {isMatch ? "100% MATCH" : "NO MATCH"}
          </span>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="border-y border-line py-3">
        <div className="flex items-baseline gap-3">
          <span className="text-[32px] font-bold tracking-tight text-ink">{inr(part.price)}</span>
          <span className="font-mono text-[16px] text-mute line-through">{inr(part.mrp)}</span>
          <span className="rounded-full bg-stock/15 px-2.5 py-0.5 text-[12px] font-semibold text-stock">
            Save {inr(part.saveAmount)} ({part.discountPct}%)
          </span>
        </div>
        <p className="mt-1 text-[12px] text-mute leading-5">
          {part.taxNote}{" "}
          <span className="font-mono text-[11px] text-mute/80">(Incl. 18% GST: ₹{part.gstAmount})</span>
        </p>
      </div>

      {/* Actions: Quantity + Add to Bag */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          {/* Quantity Counter */}
          <div className="flex h-12 items-center rounded-control border border-line bg-canvas px-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid size-8 place-items-center rounded hover:bg-well text-mute hover:text-ink transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-8 text-center font-mono text-[15px] font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid size-8 place-items-center rounded hover:bg-well text-mute hover:text-ink transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={() =>
              add(
                {
                  id: part.id,
                  name: part.name,
                  price: part.price,
                  img: part.img,
                  oem: part.oem,
                },
                qty
              )
            }
            className="btn-primary flex-1 h-12 text-[15px] font-semibold tracking-wide"
          >
            <ShoppingBag className="size-4" />
            <span>Add to Bag — {inr(part.price * qty)}</span>
          </button>
        </div>

        {/* Instant Express Checkout */}
        <button
          onClick={() => {
            add(
              {
                id: part.id,
                name: part.name,
                price: part.price,
                img: part.img,
                oem: part.oem,
              },
              qty
            );
          }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-control border border-heritage/30 bg-heritage/10 font-medium text-[13px] text-heritage hover:bg-heritage/15 transition-colors"
        >
          <Zap className="size-4 text-heritage fill-heritage" />
          <span>Instant Express Checkout (UPI / Card)</span>
        </button>
      </div>

      {/* Pincode & Estimated Delivery Section */}
      <div className="rounded-card border border-line bg-well/50 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-ink flex items-center gap-1.5">
            <MapPin className="size-3.5 text-heritage" />
            <span>Estimated Delivery &amp; Pincode</span>
          </span>
          <span className="rounded bg-stock/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-stock uppercase">
            FREE SHIPPING
          </span>
        </div>

        <form onSubmit={handleCheckPincode} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={pincode}
              maxLength={6}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit PIN code"
              className="field h-9 text-[13px] font-mono pl-3 pr-8"
            />
          </div>
          <button
            type="submit"
            disabled={isCheckingPin}
            className="btn-secondary h-9 text-[12px] px-3 font-medium"
          >
            {isCheckingPin ? "Checking..." : "Check"}
          </button>
        </form>

        <div className="text-[12px] text-ink/90 flex items-start gap-2 pt-1">
          <Truck className="size-4 text-stock shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink">
              Express Priority Dispatch to <span className="underline">{pinStatus.city}</span>
            </p>
            <p className="text-mute text-[11px] mt-0.5">
              {pinStatus.sla} via <span className="font-medium text-ink">{pinStatus.courier}</span>
            </p>
            <p className="text-[11px] text-heritage font-mono mt-1">
              Order within 2h 42m for guaranteed dispatch on tonight&apos;s air transit
            </p>
          </div>
        </div>
      </div>

      {/* 3 Trust Pillars */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-line text-center">
        <div className="rounded-lg border border-line/70 bg-canvas p-2">
          <ShieldCheck className="mx-auto size-4 text-heritage" />
          <p className="text-[11px] font-semibold text-ink mt-1">100% Genuine</p>
          <p className="text-[10px] text-mute">OEM Direct Tier-1</p>
        </div>
        <div className="rounded-lg border border-line/70 bg-canvas p-2">
          <RotateCcw className="mx-auto size-4 text-heritage" />
          <p className="text-[11px] font-semibold text-ink mt-1">10-Day Returns</p>
          <p className="text-[10px] text-mute">Unopened Box SLA</p>
        </div>
        <div className="rounded-lg border border-line/70 bg-canvas p-2">
          <Truck className="mx-auto size-4 text-heritage" />
          <p className="text-[11px] font-semibold text-ink mt-1">Priority Delivery</p>
          <p className="text-[10px] text-mute">BlueDart Aviation</p>
        </div>
      </div>

      {/* Garage Bike Modal */}
      <GarageBikeModal
        isOpen={isBikeModalOpen}
        onClose={() => setIsBikeModalOpen(false)}
        currentBike={activeBike}
        onSelectBike={(bikeName, match, notes) => {
          setActiveBike(bikeName);
          setIsMatch(match);
          setMatchNotes(notes);
        }}
      />
    </div>
  );
}
