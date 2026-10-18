import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { formatPrice, products } from "@/data/products";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, setQty, remove, subtotal } = useStore();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(0);

  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 95;
  const total = Math.max(0, subtotal - applied) + shipping;

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-500",
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-label="Shopping cart"
        className={cn(
          "fixed right-0 top-0 z-[61] flex h-dvh w-full max-w-[460px] flex-col bg-background transition-transform duration-600 [transition-timing-function:var(--ease-lux)]",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.24em]">
            Your Bag
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="grid h-11 w-11 place-items-center"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="eyebrow">Your bag is empty</p>
              <Link
                to="/shop"
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-primary px-7 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((l) => {
                const p = products.find((x) => x.id === l.id);
                if (!p) return null;
                return (
                  <li key={`${l.id}-${l.size}`} className="flex gap-4 py-6">
                    <Link to="/product/$slug" params={{ slug: p.slug }} onClick={() => setCartOpen(false)}>
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="h-28 w-22 rounded-lg bg-surface object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Size {l.size}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(l.id, l.size, l.qty - 1)}
                            className="grid h-9 w-9 place-items-center"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm">{l.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(l.id, l.size, l.qty + 1)}
                            className="grid h-9 w-9 place-items-center"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(l.id, l.size)}
                          className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(p.price * l.qty)}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                aria-label="Promo code"
                className="h-11 flex-1 rounded-full border border-border bg-transparent px-4 text-sm outline-none focus:border-foreground"
              />
              <button
                type="button"
                onClick={() => setApplied(promo.trim().toUpperCase() === "ANADA10" ? subtotal * 0.1 : 0)}
                className="h-11 rounded-full border border-border px-5 text-[11px] uppercase tracking-[0.18em]"
              >
                Apply
              </button>
            </div>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              {applied > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Discount</dt>
                  <dd>−{formatPrice(applied)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery (nationwide)</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-base font-extrabold uppercase">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="mt-5 flex h-14 items-center justify-center rounded-full bg-primary text-xs uppercase tracking-[0.24em] text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
