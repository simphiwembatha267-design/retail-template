import { createFileRoute } from "@tanstack/react-router";
const coverHero = { url: "" };
const storeEditorial = { url: "" };
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Your Brand Clothing" },
      {
        name: "description",
        content:
          "Your Brand Clothing began in City Centre with one belief: South African streetwear can stand beside anything made abroad. Read the story.",
      },
      { property: "og:title", content: "Our Story — Your Brand Clothing" },
      {
        property: "og:description",
        content: "From a single shop on Main Street to nationwide delivery.",
      },
    ],
  }),
  component: About,
});

const timeline = [
  { year: "2019", t: "First run", d: "Fifty hoodies pressed by hand and sold out of a backpack on Main Street." },
  { year: "2021", t: "Shop 1", d: "The Main Street storefront opens — a home for the brand in City Centre." },
  { year: "2023", t: "Nationwide", d: "Courier partnerships open every province to Your Brand deliveries." },
  { year: "2025", t: "Atelier line", d: "In-house pattern development and 480gsm garment-dyed fleece." },
];

function About() {
  return (
    <>
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden bg-black">
        <img
          src={storeEditorial.url}
          alt="Your Brand store editorial in your city"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Since your city</p>
          <h1 className="display-xl mt-5 max-w-[14ch] text-[clamp(2.2rem,7vw,5.5rem)] text-white">
            The story behind the mark
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-4xl">
              We make clothing for people who don't need permission to stand out.
            </p>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Your Brand began with a single question: why should quality streetwear have to be
                imported? What started as fifty hand-pressed hoodies became a studio, a storefront
                and a customer base that stretches across South Africa.
              </p>
              <p>
                Everything is developed in-house — patterns, fabric weights, wash tests. We keep
                runs small so nothing gets diluted, and we price honestly because the garment should
                do the convincing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={coverHero.url}
              alt="Model wearing Your Brand black cap and striped polo"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-24 md:grid-cols-2 md:px-10">
          <Reveal>
            <p className="eyebrow">Mission</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
              Build South African garments that outlast the trend cycle.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Vision</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
              A your city label spoken about in the same breath as the world's best.
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10">
        <p className="eyebrow">Timeline</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 90} className="h-full">
              <div className="h-full bg-background p-8">
                <p className="font-display text-3xl font-extrabold">{t.year}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em]">{t.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
