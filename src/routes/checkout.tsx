import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { formatPrice, products } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — AnadaOne Clothing" },
      { name: "description", content: "Secure AnadaOne checkout with nationwide delivery across South Africa." },
      { property: "og:title", content: "Checkout — AnadaOne Clothing" },
      { property: "og:description", content: "Secure checkout, nationwide delivery." },
    ],
  }),
  component: Checkout,
});

const steps = ["Information", "Address", "Shipping", "Payment", "Review"];

function Checkout() {
  const { lines, subtotal } = useStore();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [ship, setShip] = useState<"standard" | "express">("standard");

  const shipping = ship === "express" ? 160 : subtotal > 1500 ? 0 : 95;
  const total = subtotal + shipping;

  if (done) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-5 text-center">
        <div
          className="grid h-24 w-24 place-items-center rounded-full bg-primary text-primary-foreground"
          style={{ animation: "reveal-up 800ms var(--ease-lux) both" }}
        >
          <Check className="h-10 w-10" strokeWidth={1.5} />
        </div>
        <h1 className="display-xl mt-10 text-[clamp(2rem,6vw,3.5rem)]">Order confirmed</h1>
        <p className="mt-5 text-sm text-muted-foreground">
          Thank you. A confirmation is on its way, and your parcel ships within one working day.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex h-14 items-center rounded-full bg-primary px-9 text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1300px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <h1 className="display-xl text-[clamp(2rem,6vw,4rem)]">Checkout</h1>

      <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className={cn(
              "text-[11px] uppercase tracking-[0.18em]",
              i === step ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {String(i + 1).padStart(2, "0")} {s}
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < steps.length - 1) setStep(step + 1);
            else setDone(true);
          }}
          className="grid gap-4"
        >
          {step === 0 && (
            <>
              <Field label="Full name" />
              <Field label="Email" type="email" />
              <Field label="Phone" type="tel" />
            </>
          )}
          {step === 1 && (
            <>
              <Field label="Street address" />
              <Field label="Suburb" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" />
                <Field label="Postal code" />
              </div>
            </>
          )}
          {step === 2 && (
            <div className="grid gap-3">
              {[
                { id: "standard", t: "Standard courier", d: "2–4 working days", p: subtotal > 1500 ? 0 : 95 },
                { id: "express", t: "Express courier", d: "1–2 working days", p: 160 },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setShip(o.id as "standard" | "express")}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border p-6 text-left transition-colors",
                    ship === o.id ? "border-foreground" : "border-border",
                  )}
                >
                  <span>
                    <span className="block text-sm font-semibold">{o.t}</span>
                    <span className="block text-xs text-muted-foreground">{o.d}</span>
                  </span>
                  <span className="text-sm">{o.p === 0 ? "Free" : formatPrice(o.p)}</span>
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <>
              <Field label="Card number" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Expiry" />
                <Field label="CVC" />
              </div>
              <p className="text-xs text-muted-foreground">
                Demo checkout — connect a payment provider to take live payments.
              </p>
            </>
          )}
          {step === 4 && (
            <div className="rounded-2xl border border-border p-6 text-sm">
              <p className="eyebrow">Review</p>
              <p className="mt-4 text-muted-foreground">
                {lines.length} item(s) · {ship === "express" ? "Express" : "Standard"} courier ·{" "}
                {formatPrice(total)} total
              </p>
            </div>
          )}

          <div className="mt-4 flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="h-14 flex-1 rounded-full border border-border text-[11px] uppercase tracking-[0.2em]"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="h-14 flex-[2] rounded-full bg-primary text-[11px] uppercase tracking-[0.24em] text-primary-foreground"
            >
              {step === steps.length - 1 ? "Place order" : "Continue"}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-3xl bg-surface p-8">
          <p className="eyebrow">Order summary</p>
          <ul className="mt-6 space-y-4">
            {lines.map((l) => {
              const p = products.find((x) => x.id === l.id);
              if (!p) return null;
              return (
                <li key={`${l.id}-${l.size}`} className="flex gap-4">
                  <img src={p.images[0]} alt="" loading="lazy" className="h-20 w-16 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Size {l.size} · Qty {l.qty}
                    </p>
                  </div>
                  <p className="text-sm">{formatPrice(p.price * l.qty)}</p>
                </li>
              );
            })}
            {lines.length === 0 && <li className="text-sm text-muted-foreground">Your bag is empty.</li>}
          </ul>
          <dl className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between pt-2 font-display text-base font-extrabold uppercase">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input
        type={type}
        required
        className="h-13 rounded-full border border-border bg-transparent px-5 py-3 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}
