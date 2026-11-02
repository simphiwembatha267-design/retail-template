import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { findProduct, formatPrice, products, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — Your Brand Clothing` },
      { name: "description", content: loaderData?.description ?? "Your Brand Clothing" },
      { property: "og:title", content: `${loaderData?.name ?? "Product"} — Your Brand` },
      { property: "og:description", content: loaderData?.description ?? "Your Brand Clothing" },
    ],
  }),
  component: ProductPage,
  errorComponent: () => <p className="p-40 text-center">Product unavailable.</p>,
  notFoundComponent: () => <p className="p-40 text-center">Product not found.</p>,
});

function ProductPage() {
  const product = Route.useLoaderData() as Product;
  const { add, wishlist, toggleWishlist } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setSize(null);
    setQty(1);
    setActive(0);
    try {
      const raw = window.localStorage.getItem("ao_recent");
      const list: string[] = raw ? JSON.parse(raw) : [];
      setRecent(list.filter((s) => s !== product.slug));
      const next = [product.slug, ...list.filter((s) => s !== product.slug)].slice(0, 6);
      window.localStorage.setItem("ao_recent", JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [product.slug]);

  const liked = wishlist.includes(product.id);
  const soldOut = product.stock === 0;
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const recentProducts = recent.map((s) => findProduct(s)).filter(Boolean).slice(0, 4) as Product[];

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <nav aria-label="Breadcrumb" className="mb-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/shop" className="link-underline">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="grid gap-3">
          <div
            className="relative overflow-hidden rounded-3xl bg-surface"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={product.images[active]}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover transition-transform duration-500"
              style={
                zoom
                  ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                aria-label={`View image ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "overflow-hidden rounded-2xl border-2 bg-surface transition-colors",
                  active === i ? "border-foreground" : "border-transparent",
                )}
              >
                <img src={img} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          {product.badge && !soldOut && <p className="eyebrow">{product.badge}</p>}
          <h1 className="display-xl mt-3 text-[clamp(1.9rem,4.5vw,3.5rem)]">{product.name}</h1>
          <p className="mt-4 text-xl font-semibold">{formatPrice(product.price)}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </span>
            <span>{product.sold} sold</span>
          </div>

          <p className="mt-8 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-10">
            <p className="eyebrow">Size</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-14 min-w-16 rounded-full border-2 px-6 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-300",
                    size === s ? "border-foreground bg-primary text-primary-foreground" : "border-border hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className={cn("text-xs uppercase tracking-[0.16em]", soldOut ? "text-destructive" : "text-muted-foreground")}>
              {soldOut ? "Sold out" : product.stock <= 6 ? `Only ${product.stock} left` : "In stock"}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={soldOut}
              onClick={() => size && add(product, size, qty)}
              className="flex h-14 w-full shrink-0 items-center sm:flex-1 justify-center rounded-full bg-primary text-xs uppercase tracking-[0.24em] text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-40"
            >
              {size ? "Add to bag" : "Select a size"}
            </button>
            <Link
              to="/checkout"
              onClick={() => size && add(product, size, qty)}
              className="flex h-14 w-full shrink-0 items-center sm:flex-1 justify-center rounded-full border border-border text-xs uppercase tracking-[0.24em] transition-transform hover:scale-[1.02] hover:border-foreground"
            >
              Buy now
            </Link>
            <button
              type="button"
              aria-label="Save to wishlist"
              onClick={() => toggleWishlist(product.id)}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border"
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} strokeWidth={1.5} />
            </button>
          </div>

          <p className="mt-8 flex items-center gap-3 rounded-2xl bg-surface p-5 text-xs text-muted-foreground">
            <Truck className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Nationwide courier · 2–4 working days · free over R1500
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <p className="eyebrow">Reviews</p>
            <ul className="mt-5 space-y-5">
              {[
                { n: "Lwazi", t: "True to size and the fabric is heavy in the best way." },
                { n: "Nadia", t: "Packaging alone felt premium. Will order again." },
              ].map((r) => (
                <li key={r.n} className="text-sm">
                  <p className="leading-relaxed">"{r.t}"</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{r.n}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="display-xl mb-10 text-[clamp(1.6rem,4vw,3rem)]">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {recentProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="eyebrow">Recently viewed</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
