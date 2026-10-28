"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { inr } from "@/lib/data";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  img?: string;
  oem?: string;
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-canvas shadow-2xl flex flex-col border-l border-line">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-heritage" />
              <h2 className="text-[16px] font-semibold tracking-tight">Shopping Bag ({count})</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="grid size-8 place-items-center rounded-control hover:bg-well transition-colors text-mute hover:text-ink"
              aria-label="Close cart"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {lines.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto size-10 text-mute/50 mb-3" />
                <p className="text-[14px] font-medium text-ink">Your bag is empty</p>
                <p className="text-[12px] text-mute mt-1">Browse motorcycle spares and add OEM parts to bag.</p>
              </div>
            ) : (
              lines.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-card border border-line bg-offset p-3">
                  {item.img && (
                    <div className="size-16 shrink-0 rounded-control bg-canvas border border-line overflow-hidden grid place-items-center p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-[13px] font-medium text-ink line-clamp-1">{item.name}</h4>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-mute hover:text-danger p-0.5"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    {item.oem && <p className="mono-spec text-[10px] mt-0.5">OEM #{item.oem}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-line bg-canvas">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="grid size-6 place-items-center text-mute hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-[12px] font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="grid size-6 place-items-center text-mute hover:text-ink"
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

          {/* Footer */}
          {lines.length > 0 && (
            <div className="border-t border-line bg-offset p-5 space-y-3">
              <div className="flex items-center justify-between text-[13px] text-mute">
                <span>Subtotal (Incl. GST)</span>
                <span className="font-semibold text-ink text-[16px]">{inr(subtotal)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-stock">
                <ShieldCheck className="size-3.5" />
                <span>Express dispatch via BlueDart Aviation included</span>
              </div>
              <button
                onClick={() => {
                  alert(`Proceeding to checkout with ${count} items (Total: ${inr(subtotal)})`);
                }}
                className="btn-primary w-full h-11 text-[14px]"
              >
                Proceed to Checkout <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
