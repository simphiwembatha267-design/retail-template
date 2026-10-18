import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
const coverHero = { url: "" };
const storeEditorial = { url: "" };
import { products, categories, formatPrice } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Brand Clothing — Premium South African Streetwear" },
      {
        name: "description",
        content:
          "Designed for those who move different. Heavyweight hoodies, boxy tees and utility bottoms, made in your city and delivered nationwide.",
      },
      { property: "og:title", content: "Your Brand Clothing — Designed For Those Who Move Different" },
      {
        property: "og:description",
        content: "Premium South African streetwear built with quality, confidence and individuality.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const newArrivals = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative h-dvh min-h-[620px] overflow-hidden bg-black">
        <img
          src={coverHero.url}
          alt="Model wearing an Your Brand black-and-white striped polo and black cap"
          width={1600}
          height={1920}
          className="absolute inset-0 h-[118%] w-full object-cover object-center opacity-90 will-change-transform"
          style={{ transform: `translateY(${offset * 0.25}px) scale(1.02)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-white/70"
            style={{ animation: "reveal-up 900ms var(--ease-lux) 120ms both" }}
          >
            your city · Est. Your Brand
          </p>
          <h1
            className="display-xl mt-6 max-w-[16ch] text-[clamp(2.6rem,9vw,7.5rem)] text-white"
            style={{ animation: "reveal-up 1100ms var(--ease-lux) 220ms both" }}
          >
            Designed for those who move different.
          </h1>
          <p
            className="mt-7 max-w-md text-sm leading-relaxed text-white/75 sm:text-base"
            style={{ animation: "reveal-up 1000ms var(--ease-lux) 400ms both" }}
          >
            Premium South African streetwear built with quality, confidence and individuality.
          </p>
          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{ animation: "reveal-up 1000ms var(--ease-lux) 520ms both" }}
          >
            <Link
              to="/shop"
              className="group flex h-14 items-center gap-3 rounded-full bg-white px-8 text-[11px] uppercase tracking-[0.22em] text-black transition-transform duration-500 hover:scale-[1.04]"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              search={{ sort: "newest" } as never}
              className="flex h-14 items-center rounded-full border border-white/40 px-8 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur transition-colors duration-500 hover:bg-white/10"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border py-4">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-12 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span>Free delivery over R1500</span>
              <span>·</span>
              <span>Nationwide shipping</span>
              <span>·</span>
              <span>Made in your city</span>
              <span>·</span>
              <span>Limited runs</span>
              <span>·</span>
              <span>Free delivery over R1500</span>
              <span>·</span>
              <span>Nationwide shipping</span>
              <span>·</span>
              <span>Made in your city</span>
              <span>·</span>
              <span>Limited runs</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <Section
        eyebrow="Just landed"
        title="New Arrivals"
        href="/shop"
        linkLabel="View all"
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURED COLLECTION */}
      <section className="relative mx-auto max-w-[1600px] px-5 py-8 md:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={storeEditorial.url}
              alt="Two models in Your Brand monochrome essentials in front of the store"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-[70vh] min-h-[420px] w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-lux)] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center gap-6 p-8 md:p-16">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Collection 01</p>
              <h2 className="display-xl max-w-[12ch] text-[clamp(2rem,5.5vw,4.5rem)] text-white">
                Monochrome Essentials
              </h2>
              <p className="max-w-sm text-sm text-white/75">
                Nine pieces. Two colours. Cut heavy, finished clean — the foundation of the Your Brand wardrobe.
              </p>
              <div>
                <Link
                  to="/collections"
                  className="inline-flex h-13 items-center rounded-full bg-white px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-black"
                >
                  Explore collection
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SHOP BY CATEGORY */}
      <Section eyebrow="Browse" title="Shop By Category">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => {
            const img = products.find((p) => p.category === c)!.images[0];
            return (
              <Reveal key={c} delay={i * 80}>
                <Link
                  to="/shop"
                  search={{ category: c } as never}
                  className="group relative block overflow-hidden rounded-2xl bg-surface"
                >
                  <img
                    src={img}
                    alt={c}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                    <span className="rounded-full bg-background/90 px-4 py-2 text-[11px] uppercase tracking-[0.2em]">
                      {c}
                    </span>
                    <ArrowRight className="h-5 w-5 -translate-x-2 text-background opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section eyebrow="Loved most" title="Best Sellers" href="/shop" linkLabel="Shop all">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {bestSellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* INSTAGRAM */}
      <Section eyebrow="@yourbrand" title="Instagram">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {products.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <img
                src={p.images[i % p.images.length]}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER BAND */}
      <section className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <Reveal>
          <div className="rounded-3xl bg-primary px-8 py-20 text-center text-primary-foreground md:px-16">
            <p className="text-[11px] uppercase tracking-[0.3em] opacity-60">Members first</p>
            <h2 className="display-xl mx-auto mt-6 max-w-[16ch] text-[clamp(1.9rem,5vw,4rem)]">
              Early access to every drop
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm opacity-70">
              Restocks, private sales and the pieces that never reach the rail. Sent rarely, worth
              opening.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex h-14 items-center rounded-full bg-background px-9 text-[11px] uppercase tracking-[0.22em] text-foreground"
            >
              Shop the collection · from {formatPrice(320)}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  href,
  linkLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-xl mt-3 text-[clamp(1.9rem,5vw,3.75rem)]">{title}</h2>
          </div>
          {href && (
            <Link to={href} className="link-underline shrink-0 pb-2 text-[11px] uppercase tracking-[0.2em]">
              {linkLabel}
            </Link>
          )}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
