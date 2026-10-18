import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

type Search = {
  category?: string | undefined;
  size?: string | undefined;
  sort?: "featured" | "newest" | "best" | "price-asc" | "price-desc" | undefined;
  inStock?: boolean | undefined;
  max?: number | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s["category"] === "string" ? s["category"] : undefined,
    size: typeof s["size"] === "string" ? s["size"] : undefined,
    sort: (["featured", "newest", "best", "price-asc", "price-desc"] as const).includes(
      s["sort"] as never,
    )
      ? (s["sort"] as Search["sort"])
      : "featured",
    inStock: s["inStock"] === true || s["inStock"] === "true",
    max: s["max"] ? Number(s["max"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — AnadaOne Clothing" },
      {
        name: "description",
        content:
          "Browse every AnadaOne piece: heavyweight hoodies, boxy tees, utility bottoms and headwear. Filter by size, price and availability.",
      },
      { property: "og:title", content: "Shop All — AnadaOne Clothing" },
      { property: "og:description", content: "Premium Durban-made streetwear, delivered nationwide." },
    ],
  }),
  component: Shop,
});

const allSizes = ["S", "M", "L", "XL", "2XL", "One Size"];

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [visible, setVisible] = useState(6);
  const sentinel = useRef<HTMLDivElement>(null);

  const set = (patch: Partial<Search>) =>
    navigate({ search: (prev: Search) => ({ ...prev, ...patch }) as never });

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.size && !p.sizes.includes(search.size)) return false;
      if (search.inStock && p.stock === 0) return false;
      if (search.max && p.price > search.max) return false;
      return true;
    });
    switch (search.sort) {
      case "newest":
        list = [...list].sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "best":
        list = [...list].sort((a, b) => b.sold - a.sold);
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return list;
  }, [search]);

  useEffect(() => setVisible(6), [search]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) setVisible((v) => Math.min(v + 6, filtered.length));
    });
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <header className="grid gap-4 border-b border-border pb-10">
        <p className="eyebrow">{filtered.length} pieces</p>
        <h1 className="display-xl text-[clamp(2.2rem,7vw,5rem)]">
          {search.category ?? "Shop All"}
        </h1>
      </header>

      <div className="sticky top-16 z-30 -mx-5 mt-6 flex gap-3 overflow-x-auto bg-background/90 px-5 py-4 backdrop-blur md:top-20 md:mx-0 md:px-0">
        <Chip active={!search.category} onClick={() => set({ category: undefined })}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c} active={search.category === c} onClick={() => set({ category: c })}>
            {c}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 bg-border" />
        {allSizes.map((s) => (
          <Chip
            key={s}
            active={search.size === s}
            onClick={() => set({ size: search.size === s ? undefined : s })}
          >
            {s}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 bg-border" />
        <Chip active={!!search.inStock} onClick={() => set({ inStock: !search.inStock })}>
          In stock
        </Chip>
        <Chip active={search.max === 600} onClick={() => set({ max: search.max === 600 ? undefined : 600 })}>
          Under R600
        </Chip>
        <select
          aria-label="Sort products"
          value={search.sort}
          onChange={(e) => set({ sort: e.target.value as Search["sort"] })}
          className="ml-auto h-10 shrink-0 rounded-full border border-border bg-transparent px-4 text-[11px] uppercase tracking-[0.16em] outline-none"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="best">Best selling</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        {filtered.slice(0, visible).map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-24 text-center text-sm text-muted-foreground">
          Nothing matches those filters yet.
        </p>
      )}

      <div ref={sentinel} className="h-20" aria-hidden="true">
        {visible < filtered.length && (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-surface" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 shrink-0 rounded-full border px-5 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300",
        active
          ? "border-foreground bg-primary text-primary-foreground"
          : "border-border hover:border-foreground",
      )}
    >
      {children}
    </button>
  );
}
