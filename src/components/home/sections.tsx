"use client";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, Funnel, Disc3, Cog, Cable, Zap, Shield, Plus, ShoppingBag } from "lucide-react";
import { articles, bikes, categories, inr, parts } from "@/lib/data";
import { useCart } from "@/components/cart";
import { Photo } from "./photo";

const icons = { filter: Funnel, disc: Disc3, cog: Cog, cable: Cable, zap: Zap, shield: Shield } as const;

function Head({
  title,
  sub,
  href,
  cta,
}: {
  title: string;
  sub?: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="mb-5 md:mb-6 lg:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4">
      <div className="min-w-0 flex-1">
        <h2 className="h-section !text-[20px] !leading-[26px] sm:!text-[22px] sm:!leading-[28px] md:!text-[28px] md:!leading-[36px]">
          {title}
        </h2>
        {sub && (
          <p className="mt-1 text-[13px] text-mute leading-5 min-h-[40px] md:min-h-0 line-clamp-2 md:line-clamp-none lg:text-[15px] lg:leading-6">
            {sub}
          </p>
        )}
      </div>
      <Link
        href={href}
        className="link-action shrink-0 text-[12px] sm:text-[13px] lg:text-sm font-medium self-start md:self-end mt-0.5 md:mt-0"
      >
        <span>{cta}</span>
        <ChevronRight className="size-3 md:size-3.5" />
      </Link>
    </div>
  );
}

export function ShopByBike() {
  return (
    <section className="shell section">
      <Head title="Shop by motorcycle" sub="Select your Royal Enfield model to view compatible parts" href="/bikes" cta="View all (6)" />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {bikes.map((b) => (
          <li key={b.slug}>
            <Link href={`/bikes/${b.slug}`} className="card card-hover block h-full p-3 lg:p-4">
              <p className="text-[12px] font-medium text-mute mb-2 hidden truncate md:block">{b.engine}</p>
              <Photo src={b.img} alt={b.name} className="aspect-[4/3] rounded-xl" fit="contain" />
              <h3 className="mt-3 text-[15px] font-medium leading-5">{b.name}</h3>
              <p className="text-[12px] text-mute">{b.sub}</p>
              <p className="mt-2 flex items-center justify-between text-[11px] text-mute">
                <span>{b.years}</span><span className="hidden md:inline">{b.schematics} schematics</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Categories() {
  return (
    <section className="shell section !pt-0 lg:!pt-4">
      <Head title="Find parts by category" sub="Browse replacement components by system and assembly group" href="/categories" cta="View all 24 sub-categories" />
      {/* Mobile & tablet: compact tiles */}
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:hidden">
        {categories.map((c) => {
          const I = icons[c.icon as keyof typeof icons];
          return (
            <li key={c.slug} className="h-full">
              <Link href={`/categories/${c.slug}`} className="card card-hover flex h-full items-start gap-2.5 sm:gap-3 p-3 md:p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-control bg-well"><I className="size-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] sm:text-[14px] font-medium leading-snug text-ink">{c.name}</span>
                  <span className="text-[11px] text-mute block mt-0.5">{c.parts} parts</span>
                  <span className="mt-1 hidden text-[12px] leading-4 text-mute md:line-clamp-2">{c.blurb}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Desktop: rich cards with photography */}
      <ul className="hidden gap-4 lg:grid lg:grid-cols-3">
        {categories.map((c) => {
          const I = icons[c.icon as keyof typeof icons];
          return (
            <li key={c.slug}>
              <Link href={`/categories/${c.slug}`} className="card card-hover block h-full p-5">
                <div className="flex items-start justify-between">
                  <div><h3 className="text-[17px] font-semibold tracking-tight">{c.name}</h3><p className="text-[11px] text-mute">{c.parts} parts</p></div>
                  <I className="size-4 text-mute" aria-hidden />
                </div>
                <p className="mt-3 line-clamp-3 min-h-[66px] text-[13px] leading-[22px] text-mute">{c.blurb}</p>
                <Photo src={c.img} alt={c.name} className="mt-4 aspect-[16/9] rounded-xl" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PopularParts() {
  const { add } = useCart();
  return (
    <section className="shell section !pt-0 lg:!pt-4">
      <Head title="Popular spare parts" sub="Frequently ordered components available for immediate dispatch" href="/parts/p1" cta="View all 1,280 parts" />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {parts.map((p, i) => (
          <li key={p.id} className={i === 3 ? "md:hidden lg:list-item" : ""}>
            <article className="card card-hover flex h-full flex-col p-3 lg:p-4 group">
              <Link href={`/parts/${p.id}`} className="block overflow-hidden rounded-xl">
                <Photo src={p.img} alt={p.name} className="aspect-square rounded-xl lg:aspect-[4/3] transition-transform duration-300 group-hover:scale-105" fit="contain" />
              </Link>
              <div className="mt-3 flex items-center justify-between gap-2">
                <Link href={`/parts/${p.id}`} className="part-ref truncate hover:underline">#{p.oem}</Link>
                <span className="chip-stock shrink-0 !px-1.5 !text-[10px]">{p.stockShort}</span>
              </div>
              <Link href={`/parts/${p.id}`} className="block">
                <h3 className="mt-2 text-[14px] font-medium leading-5 lg:text-[15px] hover:text-heritage transition-colors">{p.name}</h3>
              </Link>
              <p className="mt-1 text-[12px] text-mute">{p.fits}</p>
              <p className="mt-1 hidden items-center gap-1.5 text-[11px] text-stock lg:flex"><span className="size-1.5 rounded-full bg-stock" />In stock ({p.stock})</p>
              <div className="mt-auto flex items-end justify-between pt-3">
                <p><span className="block text-lg font-semibold leading-6 tracking-tight">{inr(p.price)}</span><span className="text-[10px] text-mute">Incl. GST</span></p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    add({ id: p.id, name: p.name, price: p.price, img: p.img, oem: p.oem });
                  }}
                  className="btn-add cursor-pointer"
                  aria-label={`Add ${p.name} to bag`}
                >
                  <Plus className="size-3.5 md:hidden lg:hidden" /><ShoppingBag className="hidden size-3.5 md:block lg:block" />Add
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function KnowHow() {
  return (
    <section className="shell section !pt-0 lg:!pt-4">
      <Head title="Know your motorcycle" sub="Technical procedures, service diagrams, and maintenance guidelines" href="/guides" cta="Explore all workshop manuals" />
      {/* Mobile: compact list */}
      <ul className="grid gap-3 md:hidden">
        {[{ t: "Understanding Microfiche Schemes", s: "How to isolate the exact OEM part code before ordering.", i: "book" }, { t: "J-Series 10,000 km Service Checklist", s: "Recommended valve tappet & oil filtration intervals.", i: "gauge" }].map((a) => (
          <li key={a.t}><Link href="/guides" className="card card-hover flex items-center gap-3 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-well"><ArrowUpRight className="size-4" /></span>
            <span className="min-w-0"><span className="block text-[14px] font-medium">{a.t}</span><span className="block text-[12px] text-mute">{a.s}</span></span>
            <ChevronRight className="ml-auto size-4 shrink-0 text-mute" />
          </Link></li>
        ))}
      </ul>
      {/* Tablet & desktop: photo cards */}
      <ul className="hidden gap-4 md:grid md:grid-cols-3">
        {articles.map((a) => (
          <li key={a.title}>
            <Link href="/guides" className="card card-hover flex h-full flex-col overflow-hidden">
              <Photo src={a.img} alt="" className="aspect-[16/9]" />
              <div className="flex flex-1 flex-col p-4 lg:p-5">
                <p className="text-[11px] font-medium text-heritage">{a.kind}</p>
                <h3 className="mt-2 text-[17px] font-semibold leading-6 tracking-tight">{a.title}</h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-5 text-mute">{a.body}</p>
                <span className="mt-auto flex items-center justify-between pt-4 text-[13px] text-mute">{a.cta}<ArrowUpRight className="size-4 text-link" /></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
