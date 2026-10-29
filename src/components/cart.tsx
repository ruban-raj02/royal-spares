"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  MapPin,
  Check,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { inr } from "@/lib/data";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  img?: string;
  oem?: string;
  subtext?: string;
};

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  last: CartLine | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  add: (p: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
};

const CartCtx = createContext<Ctx | null>(null);

const defaultInitialLines: CartLine[] = [
  {
    id: "p3",
    name: "Sherpa 450 Oil Filter Cartridge",
    subtext: "Fits Himalayan 450 (Guaranteed)",
    price: 340,
    qty: 1,
    img: "/images/sherpa-450-oil-filter.jpg",
    oem: "594012/A",
  },
  {
    id: "p1",
    name: "Classic 350 Reborn Chain Sprocket Kit",
    subtext: "520 Pitch X-Ring · Verified OEM",
    price: 2850,
    qty: 1,
    img: "/images/classic-350-chain-sprocket.webp",
    oem: "570547/C",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(defaultInitialLines);
  const [last, setLast] = useState<CartLine | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((p: Omit<CartLine, "qty">, qty: number = 1) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.id === p.id);
      const next = hit
        ? prev.map((l) => (l.id === p.id ? { ...l, qty: l.qty + qty } : l))
        : [...prev, { ...p, qty }];
      const item = next.find((l) => l.id === p.id) ?? null;
      setLast(item);
      return next;
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.id !== id));
    } else {
      setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
    }
  }, []);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      last,
      isOpen,
      setIsOpen,
      add,
      remove,
      updateQty,
    }),
    [lines, count, subtotal, last, isOpen, add, remove, updateQty]
  );

  return (
    <CartCtx.Provider value={value}>
      {children}
      <CartDrawer />
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, setIsOpen, remove, updateQty } = useCart();
  const router = useRouter();
  const [mobilePin, setMobilePin] = useState("560001");
  const [mobilePinVerified, setMobilePinVerified] = useState(true);

  if (!isOpen) return null;

  const shippingCost = subtotal > 999 ? 0 : 50;
  const totalPayable = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* ======================================================== */}
      {/* 1. MOBILE BREAKPOINT (< 768px): Exact Bottom Sheet Drawer */}
      {/* ======================================================== */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 max-h-[90vh] bg-canvas rounded-t-[24px] border-t border-line shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 rounded-full bg-line mx-auto mt-3 mb-1" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[17px] font-bold text-ink">Shopping Bag</h2>
            <span className="rounded-full bg-well border border-line px-2 py-0.5 text-[11px] font-medium text-mute">
              {count} {count === 1 ? "Part" : "Parts"}
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="grid size-8 place-items-center rounded-full bg-well text-mute hover:text-ink transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Sheet Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3.5">
          {lines.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag className="mx-auto size-10 text-mute/50 mb-2" />
              <p className="text-[14px] font-semibold text-ink">Your bag is empty</p>
              <p className="text-[12px] text-mute mt-1">Browse OEM components to add genuine spares.</p>
            </div>
          ) : (
            lines.map((item) => (
              <div key={item.id} className="rounded-card border border-line bg-well/70 p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-16 rounded-lg bg-canvas border border-line overflow-hidden p-1 shrink-0 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.img || "/images/classic-350-chain-sprocket.webp"}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      {item.oem && (
                        <span className="font-mono text-[10px] text-mute block">
                          OEM # {item.oem}
                        </span>
                      )}
                      <h4 className="text-[13px] font-semibold text-ink truncate mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-mute truncate mt-0.5">
                        {item.subtext || "Fits Himalayan 450 (Guaranteed)"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => remove(item.id)}
                    className="text-mute hover:text-danger p-1 shrink-0 cursor-pointer"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[15px] font-bold text-ink">
                    {inr(item.price * item.qty)}
                  </span>

                  <div className="flex items-center rounded-control border border-line bg-canvas">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="size-7 grid place-items-center text-mute hover:text-ink cursor-pointer"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-7 text-center text-[12px] font-semibold text-ink">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="size-7 grid place-items-center text-mute hover:text-ink cursor-pointer"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Mobile PIN Code Dispatch Checker */}
          <div className="rounded-card border border-line bg-canvas p-3.5 space-y-2">
            <span className="text-[12px] font-medium text-mute block">
              Check delivery estimate by PIN code
            </span>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-mute" />
                <input
                  type="text"
                  maxLength={6}
                  value={mobilePin}
                  onChange={(e) => setMobilePin(e.target.value)}
                  className="field h-8 pl-8 text-[12px]"
                  placeholder="560001"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobilePinVerified(true)}
                className="btn-secondary h-8 px-3 text-[11px] font-medium cursor-pointer"
              >
                Verify
              </button>
            </div>

            {mobilePinVerified && (
              <p className="text-[11px] text-stock flex items-center gap-1.5 mt-1 font-medium">
                <Truck className="size-3.5 shrink-0" />
                <span>Express Delivery to Bengaluru by <strong>Tomorrow, 4:00 PM</strong></span>
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-1.5 text-[12px] text-mute border-t border-line/70 pt-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-ink font-semibold">{inr(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Delivery:</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-stock font-bold">FREE (Above ₹999)</span>
                ) : (
                  <span>₹50.00 (Free above ₹999)</span>
                )}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-line text-ink">
              <span className="font-sans font-semibold text-[14px]">Total Payable:</span>
              <div className="text-right">
                <span className="text-xl font-bold text-ink">{inr(totalPayable)}</span>
                <span className="block text-[10px] text-mute">Includes GST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sheet Footer Checkout Button */}
        <div className="border-t border-line p-4 bg-canvas space-y-2">
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/cart");
            }}
            disabled={lines.length === 0}
            className="btn-primary w-full h-11 text-[13px] font-semibold gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>Proceed to Fine-tune &amp; Checkout</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TABLET & DESKTOP (>= 768px): Side Drawer Slide-over */}
      {/* ======================================================== */}
      <div className="hidden md:flex fixed inset-y-0 right-0 max-w-full pl-10">
        <div className="w-screen max-w-md bg-canvas shadow-2xl flex flex-col border-l border-line">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-heritage" />
              <h2 className="text-[16px] font-semibold tracking-tight">Shopping Bag ({count})</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="grid size-8 place-items-center rounded-control hover:bg-well transition-colors text-mute hover:text-ink cursor-pointer"
              aria-label="Close cart"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {lines.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto size-10 text-mute/50 mb-3" />
                <p className="text-[14px] font-medium text-ink">Your bag is empty</p>
                <p className="text-[12px] text-mute mt-1">Browse motorcycle spares and add OEM parts to bag.</p>
              </div>
            ) : (
              lines.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-card border border-line bg-offset p-3">
                  <div className="size-16 shrink-0 rounded-control bg-canvas border border-line overflow-hidden grid place-items-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img || "/images/classic-350-chain-sprocket.webp"}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-[13px] font-semibold text-ink line-clamp-1">{item.name}</h4>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-mute hover:text-danger p-0.5 cursor-pointer"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    {item.oem && <p className="text-[10px] text-mute mt-0.5">OEM #{item.oem}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-line bg-canvas">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="grid size-6 place-items-center text-mute hover:text-ink cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-[12px] font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="grid size-6 place-items-center text-mute hover:text-ink cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-[14px]">{inr(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop/Tablet Drawer Footer */}
          {lines.length > 0 && (
            <div className="border-t border-line bg-offset p-5 space-y-3">
              <div className="flex items-center justify-between text-[13px] text-mute">
                <span>Subtotal (Incl. GST)</span>
                <span className="font-semibold text-ink text-[16px]">{inr(subtotal)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-stock font-medium">
                <Truck className="size-3.5" />
                <span>Express dispatch via BlueDart Aviation included</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/cart");
                  }}
                  className="btn-secondary h-11 text-[13px] font-medium cursor-pointer"
                >
                  View Full Bag
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/cart");
                  }}
                  className="btn-primary h-11 text-[13px] font-medium gap-1 cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
