import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP, WHATSAPP_LINK } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Store — Your Brand Clothing, City Centre" },
      {
        name: "description",
        content:
          "Visit Your Brand at 320 Building, 4th Floor, Shop 423D, West Street, City Centre. WhatsApp +27 79 909 0379. Nationwide delivery.",
      },
      { property: "og:title", content: "Contact Your Brand Clothing" },
      { property: "og:description", content: "City Centre storefront, WhatsApp support and nationwide delivery." },
    ],
  }),
  component: Contact,
});

const hours = [
  ["Monday – Friday", "09:00 – 18:00"],
  ["Saturday", "09:00 – 16:00"],
  ["Sunday", "Closed"],
  ["Public holidays", "10:00 – 14:00"],
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pt-44">
      <header className="border-b border-border pb-10">
        <p className="eyebrow">We're one message away</p>
        <h1 className="display-xl mt-3 text-[clamp(2.2rem,7vw,5rem)]">Contact</h1>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-10">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="eyebrow">Store</p>
                <p className="mt-3 text-lg leading-relaxed">
                  City Centre
                  <br />
                  West Street
                  <br />
                  320 Building, 4th Floor
                  <br />
                  Shop 423D
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="eyebrow">Call or WhatsApp</p>
                <a href={WHATSAPP_LINK} className="link-underline mt-3 block text-lg">
                  {WHATSAPP}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  className="mt-5 inline-flex h-13 items-center rounded-full bg-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary-foreground"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
              <div className="w-full max-w-sm">
                <p className="eyebrow">Business hours</p>
                <dl className="mt-3 divide-y divide-border text-sm">
                  {hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between py-3">
                      <dt className="text-muted-foreground">{d}</dt>
                      <dd>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message sent", { description: "We reply within one business day." });
            }}
            className="rounded-3xl border border-border p-8 shadow-soft"
          >
            <p className="eyebrow">Send a message</p>
            <div className="mt-6 grid gap-4">
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" required={false} />
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  name="message"
                  className="rounded-2xl border border-border bg-transparent p-4 text-sm outline-none focus:border-foreground"
                />
              </label>
              <button
                type="submit"
                className="h-14 rounded-full bg-primary text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {sent ? "Message sent" : "Send message"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <iframe
          title="Your Brand store location on West Street, City Centre"
          src="https://www.google.com/maps?q=320%20West%20Street%2C%20your city%20CBD&output=embed"
          loading="lazy"
          className="h-[420px] w-full rounded-3xl border border-border grayscale"
        />
      </Reveal>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-13 rounded-full border border-border bg-transparent px-5 py-3 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}
