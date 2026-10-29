"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Check,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowRight,
  Bookmark,
  Zap,
  MapPin,
  RefreshCw,
  PhoneCall,
  Lock,
  ChevronRight,
  Bike,
  Sparkles,
  Info,
  X,
} from "lucide-react";
import { useCart, CartLine } from "@/components/cart";
import { inr } from "@/lib/data";
import { BikeModelSwitchModal } from "@/components/bike/bike-model-switch-modal";

interface Consumable {
  id: string;
  name: string;
  code: string;
  desc: string;
  price: number;
  img: string;
}

const workshopConsumables: Consumable[] = [
  {
    id: "cons-1",
    name: "Annealed Copper Sump Crush Washer (M14)",
    code: "OEM # W-14421",
    desc: "Mandatory one-time crush seal for oil drain bolt.",
    price: 45,
    img: "/images/clutch-rotor.webp",
  },
  {
    id: "cons-2",
    name: "Castrol DOT 4 Response Brake Fluid (500ml)",
    code: "FLUID # 800412",
    desc: "High wet-boiling point synthetic fluid for Bybre ABS systems.",
    price: 380,
    img: "/images/brakes-fluid.jpg",
  },
  {
    id: "cons-3",
    name: "Viton Rubber Tappet Cover Gasket",
    code: "OEM # G-99201",
    desc: "Prevents high-temperature oil weeping on cylinder head.",
    price: 145,
    img: "/images/chasis-body.webp",
  },
];

export function CartPageContent() {
  const { lines, subtotal, count, remove, updateQty, add } = useCart();
  const [pinCode, setPinCode] = useState("560001");
  const [isPinVerified, setIsPinVerified] = useState(true);
  const [pinCity, setPinCity] = useState("Bengaluru (Indiranagar)");
  const [couponCode, setCouponCode] = useState("MEMBER10");
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [needB2bInvoice, setNeedB2bInvoice] = useState(false);
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const [savedForLater, setSavedForLater] = useState<CartLine[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const discountAmount = isCouponApplied ? 150 : 0;
  const shippingCost = subtotal > 999 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const gstAmount = Math.round(grandTotal * 0.18 * 100) / 100;

  const handleVerifyPin = () => {
    if (pinCode.length >= 6) {
      setIsPinVerified(true);
      setPinCity(pinCode.startsWith("56") ? "Bengaluru Hub" : "Regional Depot");
      showToast(`PIN Code ${pinCode} verified · Express Delivery Available`);
    } else {
      showToast("Please enter a valid 6-digit PIN code");
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "MEMBER10" || couponCode.toUpperCase() === "ROYAL50") {
      setIsCouponApplied(true);
      showToast(`Coupon ${couponCode.toUpperCase()} applied! Saved ₹150`);
    } else {
      showToast("Invalid promo code. Try MEMBER10");
    }
  };

  const handleSaveForLater = (item: CartLine) => {
    setSavedForLater((prev) => [...prev, item]);
    remove(item.id);
    showToast(`Moved "${item.name}" to Save for Later`);
  };

  const handleMoveBackToCart = (item: CartLine) => {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      oem: item.oem,
    });
    setSavedForLater((prev) => prev.filter((i) => i.id !== item.id));
    showToast(`Moved "${item.name}" back to cart`);
  };

  const handleAddConsumable = (cons: Consumable) => {
    add({
      id: cons.id,
      name: cons.name,
      price: cons.price,
      img: cons.img,
      oem: cons.code,
    });
    showToast(`Added ${cons.name} to cart`);
  };

  return (
    <div className="bg-offset min-h-screen text-ink pb-24 lg:pb-16">
      {/* Toast alert */}
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 rounded-card bg-ink text-white px-4 py-2.5 shadow-xl text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Breadcrumb & Warehouse Status (Desktop & Tablet) */}
      <div className="border-b border-line bg-canvas">
        <div className="shell py-3 flex flex-wrap items-center justify-between gap-3 text-[12px] text-mute">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/categories/engine-filters" className="hover:text-ink">Spare Parts</Link>
            <span>/</span>
            <span className="text-ink font-semibold">Shopping Bag</span>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-stock" />
            <span>Warehouse online · Bengaluru dispatch hub</span>
          </div>
        </div>
      </div>

      <div className="shell pt-5 md:pt-7">
        {/* GARAGE BIKE MATCHED BANNER */}
        <div className="rounded-card border border-heritage/30 bg-heritage/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-control bg-heritage text-white flex items-center justify-center shrink-0">
              <Bike className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-heritage">
                  Matched to your motorcycle
                </span>
                <span className="rounded bg-stock/15 px-1.5 py-0.2 text-[10px] font-semibold text-stock">
                  2 bikes saved
                </span>
              </div>
              <p className="text-[12px] text-mute mt-0.5">
                Catalog matched to: <strong className="text-ink font-semibold">Classic 350 Reborn (KA-01-MJ-4520)</strong> &amp; Sherpa 450 Platform
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBikeModalOpen(true)}
            className="btn-secondary h-8 px-3 text-[12px] gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className="size-3.5" />
            <span>Switch Active Bike</span>
          </button>
        </div>

        {/* SHOPPING BAG PAGE TITLE & PROMO STRIP */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-ink">Shopping Bag</h1>
              <span className="rounded-full bg-heritage text-white px-2.5 py-0.5 text-[11px] font-semibold">
                {count} {count === 1 ? "part" : "parts"}
              </span>
            </div>
            <p className="text-[13px] text-mute mt-1">
              Review items in your order, confirm delivery destination, and proceed to checkout.
            </p>
          </div>

          {/* Express Delivery Eligibility Badge */}
          <div className="rounded-card border border-line bg-canvas p-3 flex items-center gap-3 self-start md:self-auto">
            <div className="size-9 rounded-control bg-stock/10 text-stock flex items-center justify-center shrink-0">
              <Truck className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-ink">Express Delivery</span>
                <span className="rounded bg-stock/15 px-1.5 py-0.2 text-[10px] font-semibold text-stock">
                  Free over ₹999
                </span>
              </div>
              <p className="text-[12px] text-mute mt-0.5">
                Cart Total {inr(subtotal)} · Qualifies for Free Priority Courier
              </p>
            </div>
          </div>
        </div>

        {/* FREE DELIVERY ALERT BANNER */}
        <div className="mt-4 rounded-control border border-stock/30 bg-stock/5 px-4 py-2.5 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2 text-stock">
            <Zap className="size-4 shrink-0 fill-stock/20" />
            <span>
              You&apos;ve unlocked <strong>Free Express Delivery to Bengaluru!</strong> Dispatches within 6 hrs via BLR Logistics Hub.
            </span>
          </div>
          <span className="rounded bg-stock/20 text-stock font-semibold px-2 py-0.5 text-[10px] hidden sm:inline">
            Eligible
          </span>
        </div>

        {/* MAIN TWO-COLUMN CART LAYOUT (Desktop & Tablet) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Cart Items + Consumables (lg:col-span-8) */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* CART ITEMS CONTAINER */}
            <div className="space-y-4">
              {lines.length === 0 ? (
                <div className="rounded-card border border-line bg-canvas p-12 text-center shadow-sm">
                  <div className="size-16 rounded-full bg-well mx-auto flex items-center justify-center text-mute mb-3">
                    <Bike className="size-8" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">Your Shopping Bag is empty</h3>
                  <p className="text-[13px] text-mute mt-1 max-w-sm mx-auto">
                    Search by OEM part number or browse our motorcycle catalog to add verified factory assemblies.
                  </p>
                  <Link href="/bikes/classic-350" className="btn-primary h-10 px-5 text-[13px] mt-4 inline-flex">
                    Browse Classic 350 Spares
                  </Link>
                </div>
              ) : (
                lines.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-card border border-line bg-canvas p-4 md:p-5 shadow-sm space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="size-20 sm:size-24 rounded-card bg-well border border-line p-2 shrink-0 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.img || "/images/classic-350-chain-sprocket.webp"}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {item.oem && <span className="part-ref text-[10px]">#{item.oem}</span>}
                            <span className="inline-flex items-center gap-1 text-[10px] text-stock font-semibold bg-stock/10 px-1.5 py-0.2 rounded">
                              <Check className="size-3" /> OEM Verified Fit
                            </span>
                          </div>

                          <h3 className="text-[15px] sm:text-[16px] font-bold text-ink mt-1.5 leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-[12px] text-mute mt-1 line-clamp-2">
                            Factory genuine replacement assembly engineered to OEM specifications.
                          </p>

                          <div className="mt-2.5 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-[11px] text-mute bg-well px-2 py-0.5 rounded border border-line/60">
                              <Truck className="size-3 text-stock" /> Dispatches within 24 hours
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Unit Breakdown */}
                      <div className="sm:text-right shrink-0">
                        <span className="text-xl sm:text-2xl font-bold text-ink block">
                          {inr(item.price * item.qty)}
                        </span>
                        <span className="text-[11px] text-mute block mt-0.5">
                          {inr(item.price)} / unit · Incl. GST
                        </span>
                      </div>
                    </div>

                    {/* Bottom Controls: Quantity Stepper & Actions */}
                    <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3">
                      {/* Stepper */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-control border border-line bg-canvas shadow-sm">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="size-8 grid place-items-center text-mute hover:text-ink hover:bg-well rounded-l-control transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-[13px] font-semibold text-ink">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="size-8 grid place-items-center text-mute hover:text-ink hover:bg-well rounded-r-control transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <span className="text-[12px] text-mute hidden sm:inline">
                          Subtotal: {inr(item.price * item.qty)}
                        </span>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 text-[12px]">
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="text-mute hover:text-ink transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Bookmark className="size-3.5" />
                          <span>Save for Later</span>
                        </button>

                        <button
                          onClick={() => remove(item.id)}
                          className="text-danger font-medium hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="size-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* SAVED FOR LATER SECTION (If any) */}
            {savedForLater.length > 0 && (
              <div className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-3">
                <h3 className="text-[13px] font-semibold text-ink">
                  Saved for later ({savedForLater.length})
                </h3>
                <div className="divide-y divide-line/70">
                  {savedForLater.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-md bg-well border border-line p-1 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-ink">{item.name}</p>
                          <p className="text-[12px] text-mute">{inr(item.price)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleMoveBackToCart(item)}
                        className="btn-secondary h-8 px-3 text-[12px] cursor-pointer"
                      >
                        Move to Bag
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DELIVERY DESTINATION CARD (Desktop) */}
            <div className="rounded-card border border-line bg-canvas p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-control bg-well text-heritage flex items-center justify-center shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-mute">Delivery destination:</span>
                    <span className="text-[12px] font-semibold text-ink">
                      {pinCode} ({pinCity})
                    </span>
                  </div>
                  <p className="text-[12px] text-mute mt-0.5">
                    BlueDart Air Express by <strong className="text-stock font-semibold">Tomorrow, 4:00 PM</strong>
                  </p>
                </div>
              </div>

              {/* Pin verification widget */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="field h-9 w-28 text-[12px] text-center"
                  placeholder="PIN code"
                />
                <button
                  onClick={handleVerifyPin}
                  className="btn-secondary h-9 px-3 text-[12px] cursor-pointer"
                >
                  Change
                </button>
              </div>
            </div>

            {/* WORKSHOP CONSUMABLES & INSTALL HARDWARE (Desktop 3-column / Tablet 2-column) */}
            <div className="rounded-card border border-line bg-canvas p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <h3 className="text-[15px] font-bold text-ink">Maintenance Consumables</h3>
                  <p className="text-[12px] text-mute">Recommended with your current service items</p>
                </div>
                <span className="rounded bg-well px-2 py-0.5 text-[11px] text-mute hidden sm:inline">
                  Recommended for your cart
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {workshopConsumables.map((c) => (
                  <div
                    key={c.id}
                    className="card card-hover p-3.5 bg-canvas border border-line rounded-card flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-mute block">{c.code}</span>
                      <h4 className="text-[13px] font-semibold text-ink mt-1 leading-snug">{c.name}</h4>
                      <p className="text-[11px] text-mute mt-1 line-clamp-2 leading-tight">{c.desc}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-line/60 flex items-center justify-between">
                      <span className="text-[13px] font-bold text-ink">{inr(c.price)}</span>
                      <button
                        onClick={() => handleAddConsumable(c)}
                        className="btn-add h-7 px-2.5 text-[11px] gap-1 cursor-pointer"
                      >
                        <Plus className="size-3" /> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Order Summary Card (lg:col-span-4) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 sticky top-20 space-y-5">
            <div className="rounded-card border border-line bg-canvas p-5 md:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-lg font-bold text-ink">Order Summary</h3>
                <span className="text-[12px] text-mute">INR (₹)</span>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code"
                      className="field h-9 text-[12px] uppercase pl-3 pr-8"
                    />
                    {isCouponApplied && (
                      <CheckCircle2 className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-stock" />
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-secondary h-9 px-3 text-[12px] cursor-pointer shrink-0"
                  >
                    {isCouponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {isCouponApplied && (
                  <p className="text-[11px] text-stock flex items-center gap-1 font-medium">
                    <Check className="size-3" /> Garage Club Benefit (MEMBER10 applied)
                  </p>
                )}
              </form>

              {/* Price Line Items */}
              <div className="space-y-2 text-[12px] text-mute border-t border-line/60 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal ({count} {count === 1 ? "item" : "items"}):</span>
                  <span className="text-ink font-semibold">{inr(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="text-stock font-bold">
                    {shippingCost === 0 ? "FREE" : inr(shippingCost)}
                  </span>
                </div>

                {isCouponApplied && (
                  <div className="flex justify-between text-stock">
                    <span>Discount (MEMBER10):</span>
                    <span className="font-semibold">-₹{discountAmount}.00</span>
                  </div>
                )}

                <div className="flex justify-between text-[11px]">
                  <span>GST (18% inclusive):</span>
                  <span className="text-ink">₹{gstAmount}</span>
                </div>
              </div>

              {/* Total Payable Box */}
              <div className="pt-3 border-t border-line space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] font-semibold text-ink">Total Payable:</span>
                  <span className="text-2xl font-bold text-ink">{inr(grandTotal)}</span>
                </div>
                <p className="text-[11px] text-mute text-right">
                  All taxes and duties included
                </p>
              </div>

              {/* B2B Tax Invoice Toggle */}
              <div className="rounded-control border border-line bg-well p-3 flex items-center justify-between">
                <div>
                  <span className="text-[12px] font-semibold text-ink block">Need B2B Tax Invoice?</span>
                  <span className="text-[11px] text-mute">Claim GST input credit</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNeedB2bInvoice(!needB2bInvoice);
                    showToast(needB2bInvoice ? "B2B invoice disabled" : "GSTIN prompt enabled");
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    needB2bInvoice ? "bg-heritage" : "bg-line"
                  }`}
                >
                  <span
                    className={`size-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      needB2bInvoice ? "left-5" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Checkout Primary Button */}
              <button
                onClick={() => {
                  alert(`Proceeding to Razorpay Secure Gateway for ${inr(grandTotal)}`);
                }}
                disabled={lines.length === 0}
                className="btn-primary w-full h-12 text-[14px] font-semibold shadow-md gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="size-4" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 pt-2 border-t border-line/60 text-[12px] text-mute">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-stock shrink-0" />
                  <span>100% Genuine OEM Spares Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-4 text-heritage shrink-0" />
                  <span>10-day easy returns on fitment issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="size-4 text-link shrink-0" />
                  <span>Encrypted Razorpay checkout</span>
                </div>
              </div>

              {/* Master Tech Dial Desk Support */}
              <div className="rounded-control border border-line bg-well p-3.5 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[12px] font-semibold text-ink block">Need Fitment Help?</span>
                  <span className="text-[11px] text-mute">Speak with our technician</span>
                </div>
                <button
                  onClick={() => alert("Connecting to Royal Spares Workshop Help Desk: 1800-420-7727")}
                  className="btn-secondary h-8 px-3 text-[11px] gap-1 shrink-0 cursor-pointer"
                >
                  <PhoneCall className="size-3" /> Call desk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Bike Modal */}
      <BikeModelSwitchModal
        isOpen={isBikeModalOpen}
        onClose={() => setIsBikeModalOpen(false)}
        currentSlug="classic-350"
      />
    </div>
  );
}

