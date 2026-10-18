import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { add, wishlist, toggleWishlist } = useStore();
  const liked = wishlist.includes(product.id);
  const soldOut = product.stock === 0;

  return (
    <article className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-2xl bg-surface"
      >
        <div className="relative aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-[1.06] group-hover:opacity-0"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-[1100ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-100 group-hover:opacity-100"
          />
          {(product.badge || soldOut) && (
            <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
              {soldOut ? "Sold out" : product.badge}
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label={liked ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        onClick={() => toggleWishlist(product.id)}
        className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-background/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Heart className={cn("h-4 w-4", liked && "fill-current")} strokeWidth={1.5} />
      </button>

      {!soldOut && (
        <button
          type="button"
          onClick={() => add(product, product.sizes[Math.min(1, product.sizes.length - 1)]!)}
          className="absolute bottom-[92px] left-1/2 hidden -translate-x-1/2 translate-y-3 rounded-full bg-primary px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-primary-foreground opacity-0 shadow-lift transition-all duration-500 [transition-timing-function:var(--ease-lux)] group-hover:translate-y-0 group-hover:opacity-100 sm:block"
        >
          Quick add
        </button>
      )}

      <div className="flex items-start justify-between gap-4 px-1 py-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">
            <Link to="/product/$slug" params={{ slug: product.slug }}>
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
        </div>
        <p className="shrink-0 text-sm font-semibold">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
