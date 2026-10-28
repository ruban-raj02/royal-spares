"use client";
import { useState, useEffect } from "react";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { Part, inr } from "@/lib/data";
import { useCart } from "@/components/cart";

export function StickyBottomBar({ part }: { part: Part }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 480px
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] animate-in fade-in slide-in-from-bottom duration-200"
      role="status"
    >
      <div className="shell flex items-center justify-between gap-4">
        {/* Left: Product Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-11 shrink-0 rounded-lg border border-line bg-well overflow-hidden p-1 hidden sm:flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={part.img} alt={part.name} className="h-full w-full object-contain" />
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-[13px] md:text-[14px] font-semibold text-ink">
              {part.name}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[14px] md:text-[16px] font-bold text-ink">
                {inr(part.price)}
              </span>
              <span className="font-mono text-[10px] text-mute hidden md:inline">
                TOTAL (INCL. TAXES)
              </span>
              <span className="chip-stock !px-1.5 !text-[10px] !py-0 shrink-0">
                {part.stockShort}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quantity + Add button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex h-10 items-center rounded-control border border-line bg-canvas px-1.5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid size-7 place-items-center rounded hover:bg-well text-mute hover:text-ink"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-6 text-center font-mono text-[13px] font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid size-7 place-items-center rounded hover:bg-well text-mute hover:text-ink"
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </button>
          </div>

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
            className="btn-primary h-10 px-4 md:px-5 text-[13px] font-semibold"
          >
            <ShoppingBag className="size-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
