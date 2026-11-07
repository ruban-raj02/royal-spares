"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Plus, Check, ArrowRight } from "lucide-react";
import { Part, parts, inr } from "@/lib/data";
import { useCart } from "@/components/cart";
import { Photo } from "@/components/home/photo";

export function SuggestedProducts({ currentPart }: { currentPart: Part }) {
  const { add } = useCart();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Suggest up to 4 other parts from catalog
  const suggested = parts.filter((p) => p.id !== currentPart.id).slice(0, 4);

  const handleAdd = (part: Part) => {
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

  return (
    <section className="mt-12 rounded-panel border border-line bg-canvas p-4 md:p-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-line pb-4 gap-2">
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-ink">
            Suggested Products
          </h2>
          <p className="text-[13px] text-mute mt-1">
            Genuine Royal Enfield components and consumables frequently paired with this assembly.
          </p>
        </div>
        <Link
          href="/categories"
          className="link-action text-[12px] sm:text-[13px] font-medium shrink-0 self-start sm:self-auto"
        >
          <span>Browse all parts</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Suggested Products Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {suggested.map((p) => {
          const isAdded = addedIds[p.id];
          return (
            <article
              key={p.id}
              className="card card-hover flex flex-col justify-between p-3 lg:p-4 bg-canvas group transition-all"
            >
              <div>
                <Link href={`/parts/${p.id}`} className="block overflow-hidden rounded-xl bg-well/40 p-2 border border-line/60">
                  <Photo
                    src={p.img}
                    alt={p.name}
                    className="aspect-square rounded-xl lg:aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                    fit="contain"
                  />
                </Link>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <Link href={`/parts/${p.id}`} className="part-ref truncate hover:underline text-[11px]">
                    #{p.oem}
                  </Link>
                </div>

                <Link href={`/parts/${p.id}`} className="block mt-1.5">
                  <h3 className="text-[13px] lg:text-[14px] font-semibold text-ink line-clamp-2 leading-snug group-hover:text-heritage transition-colors">
                    {p.name}
                  </h3>
                </Link>

                <p className="mt-1 text-[11px] lg:text-[12px] text-mute line-clamp-1">{p.fits}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/70 flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[15px] lg:text-[16px] font-bold text-ink">
                    {inr(p.price)}
                  </span>
                  <span className="text-[10px] text-mute">Incl. GST</span>
                </div>

                <button
                  onClick={() => handleAdd(p)}
                  className={`inline-flex items-center gap-1 h-8 px-2.5 sm:px-3 rounded-control text-[12px] font-medium transition-colors cursor-pointer shrink-0 ${
                    isAdded
                      ? "bg-stock text-white"
                      : "bg-heritage text-white hover:opacity-90"
                  }`}
                  aria-label={`Add ${p.name} to bag`}
                >
                  {isAdded ? (
                    <>
                      <Check className="size-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="size-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

