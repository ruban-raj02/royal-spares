"use client";
import { useState } from "react";
import { Plus, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Part, inr } from "@/lib/data";
import { useCart } from "@/components/cart";

export function FrequentlyBoughtTogether({ part }: { part: Part }) {
  const { add } = useCart();
  const { bundle } = part;

  // Track checked state for bundle items
  const [selectedItems, setSelectedItems] = useState<{ [id: string]: boolean }>({
    [part.id]: true, // main item always checked
    ...Object.fromEntries(bundle.items.map((it) => [it.id, true])),
  });

  const toggleItem = (id: string) => {
    if (id === part.id) return; // cannot uncheck main item
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate totals
  const activeItemsCount = Object.values(selectedItems).filter(Boolean).length;
  const rawTotal =
    (selectedItems[part.id] ? part.price : 0) +
    bundle.items.reduce((s, it) => s + (selectedItems[it.id] ? it.price : 0), 0);

  const bundleDiscount = activeItemsCount === bundle.items.length + 1 ? bundle.bundleSavings : 0;
  const finalPrice = Math.max(0, rawTotal - bundleDiscount);

  const handleAddAll = () => {
    // Add main part if selected
    if (selectedItems[part.id]) {
      add({
        id: part.id,
        name: part.name,
        price: part.price,
        img: part.img,
        oem: part.oem,
      });
    }

    // Add bundle items
    bundle.items.forEach((it) => {
      if (selectedItems[it.id]) {
        add({
          id: it.id,
          name: it.name,
          price: it.price,
          img: it.img,
          oem: it.oem,
        });
      }
    });
  };

  return (
    <section className="mt-8 rounded-panel border border-line bg-canvas p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-line pb-4">
        <div>
          <p className="mono-spec text-[11px] text-mute">{bundle.title}</p>
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink mt-0.5">
            Frequently Bought Together with Kit #{part.oem}
          </h2>
          <p className="text-[13px] text-mute mt-1">
            Commonly replaced during major service intervals for maximum longevity and zero vibration.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-stock/10 border border-stock/20 px-3 py-1 font-mono text-[11px] font-medium text-stock self-start md:self-auto">
          <Sparkles className="size-3.5" />
          <span>{bundle.discountText}</span>
        </div>
      </div>

      {/* Interactive Bundle Cards Row */}
      <div className="mt-6 flex flex-col lg:flex-row items-center gap-4">
        {/* Main Product Card */}
        <div className="card flex-1 w-full p-4 border-heritage/40 bg-heritage/5 ring-1 ring-heritage/20 flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="relative size-20 rounded-lg bg-canvas border border-line overflow-hidden p-1 shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={part.img} alt={part.name} className="h-full w-full object-contain" />
              <span className="absolute top-1 left-1 bg-ink text-white font-mono text-[9px] px-1 rounded">
                MAIN
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="mono-spec text-[10px] block">OEM #{part.oem}</span>
              <h4 className="text-[14px] font-semibold text-ink line-clamp-1 mt-0.5">
                {part.name}
              </h4>
              <p className="font-bold text-[15px] text-ink mt-1.5">{inr(part.price)}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[12px] text-heritage font-medium">
            <Check className="size-4" />
            <span>Included in bundle</span>
          </div>
        </div>

        {/* Bundle Items with Plus dividers */}
        {bundle.items.map((it) => {
          const isChecked = !!selectedItems[it.id];
          return (
            <div key={it.id} className="flex flex-col lg:flex-row items-center gap-4 flex-1 w-full">
              <span className="grid size-7 place-items-center rounded-full bg-well text-mute border border-line shrink-0">
                <Plus className="size-4" />
              </span>

              <div
                onClick={() => toggleItem(it.id)}
                className={`card flex-1 w-full p-4 cursor-pointer transition-all flex flex-col justify-between ${
                  isChecked
                    ? "border-heritage/40 bg-canvas ring-1 ring-heritage/20"
                    : "border-line bg-well/40 opacity-70"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="size-20 rounded-lg bg-canvas border border-line overflow-hidden p-1 shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.img} alt={it.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mono-spec text-[10px] block">OEM #{it.oem}</span>
                    <h4 className="text-[14px] font-semibold text-ink line-clamp-1 mt-0.5">
                      {it.name}
                    </h4>
                    <p className="font-bold text-[15px] text-ink mt-1.5">{inr(it.price)}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-[12px]">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItem(it.id)}
                    className="size-4 accent-heritage rounded cursor-pointer"
                  />
                  <span className={isChecked ? "font-medium text-ink" : "text-mute"}>
                    {isChecked ? "Selected" : "Add to bundle"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Box & Add All CTA */}
      <div className="mt-6 pt-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-[13px] text-mute">
            Total for <span className="font-semibold text-ink">{activeItemsCount} selected items</span>:
          </p>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-[24px] font-bold text-ink">{inr(finalPrice)}</span>
            {bundleDiscount > 0 && (
              <span className="font-mono text-[14px] text-mute line-through">{inr(rawTotal)}</span>
            )}
            {bundleDiscount > 0 && (
              <span className="font-mono text-[11px] font-semibold text-stock bg-stock/10 px-2 py-0.5 rounded">
                Save {inr(bundleDiscount)} on combo
              </span>
            )}
          </div>
        </div>

        <button onClick={handleAddAll} className="btn-primary w-full sm:w-auto h-11 px-6 text-[14px]">
          <ShoppingBag className="size-4" />
          <span>Add All {activeItemsCount} Items to Bag</span>
        </button>
      </div>
    </section>
  );
}
