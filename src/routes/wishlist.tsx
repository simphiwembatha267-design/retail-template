import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — AnadaOne Clothing" },
      { name: "description", content: "Your saved AnadaOne pieces, ready when you are." },
      { property: "og:title", content: "Wishlist — AnadaOne Clothing" },
      { property: "og:description", content: "Your saved AnadaOne pieces." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <header className="border-b border-border pb-10">
        <p className="eyebrow">{saved.length} saved</p>
        <h1 className="display-xl mt-3 text-[clamp(2.2rem,7vw,5rem)]">Wishlist</h1>
      </header>
      {saved.length === 0 ? (
        <div className="py-28 text-center">
          <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          <Link
            to="/shop"
            className="mt-6 inline-flex h-13 items-center rounded-full bg-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
