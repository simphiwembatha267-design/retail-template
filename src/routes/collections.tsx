import { createFileRoute, Link } from "@tanstack/react-router";
import coverHero from "@/assets/cover-hero.jpg.asset.json";
import storeEditorial from "@/assets/store-editorial.jpg.asset.json";
import { products } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — AnadaOne Clothing" },
      {
        name: "description",
        content:
          "Explore AnadaOne collections: Monochrome Essentials, West Street Utility and Off-Season Fleece. Limited runs made in Durban.",
      },
      { property: "og:title", content: "Collections — AnadaOne Clothing" },
      { property: "og:description", content: "Limited-run streetwear collections made in Durban." },
    ],
  }),
  component: Collections,
});

const collections = [
  {
    name: "Monochrome Essentials",
    count: "9 pieces",
    img: storeEditorial.url,
    copy: "Two colours, zero noise. The foundation layer of the AnadaOne wardrobe.",
  },
  {
    name: "West Street Utility",
    count: "6 pieces",
    img: coverHero.url,
    copy: "Street silhouettes and heavy outerwear built for the pace of the CBD.",
  },
  {
    name: "Atelier Line",
    count: "5 pieces",
    img: products[0]!.images[0]!,
    copy: "480gsm loopback in garment-dyed neutrals. Made once, never repeated.",
  },
];

function Collections() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <header className="border-b border-border pb-10">
        <p className="eyebrow">Curated</p>
        <h1 className="display-xl mt-3 text-[clamp(2.2rem,7vw,5rem)]">Collections</h1>
      </header>

      <div className="mt-14 grid gap-6">
        {collections.map((c, i) => (
          <Reveal key={c.name} delay={i * 100}>
            <Link
              to="/shop"
              className="group grid overflow-hidden rounded-3xl bg-surface md:grid-cols-2"
            >
              <div className="overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full min-h-[300px] w-full object-cover transition-transform duration-[1300ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 md:p-16">
                <p className="eyebrow">{c.count}</p>
                <h2 className="display-xl text-[clamp(1.7rem,4vw,3rem)]">{c.name}</h2>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                <span className="link-underline w-fit text-[11px] uppercase tracking-[0.2em]">
                  Shop collection
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
