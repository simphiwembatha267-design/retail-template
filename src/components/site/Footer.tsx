import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LogoMark } from "./Logo";
import { WHATSAPP, WHATSAPP_LINK } from "@/data/products";

const groups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "New Arrivals", to: "/shop" },
      { label: "Collections", to: "/collections" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Delivery Information", to: "/policies/delivery" },
      { label: "Returns Policy", to: "/policies/returns" },
      { label: "Account", to: "/account" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Privacy Policy", to: "/policies/privacy" },
      { label: "Terms & Conditions", to: "/policies/terms" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <LogoMark className="h-10 w-10" />
            <p className="mt-6 max-w-sm font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">
              Built in Durban.
              <br />
              Worn everywhere.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>
                  Durban CBD, West Street, 320 Building,
                  <br />
                  4th Floor, Shop 423D
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <a href={WHATSAPP_LINK} className="link-underline">
                  {WHATSAPP}
                </a>
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <h3 className="eyebrow">{g.title}</h3>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="link-underline text-sm text-muted-foreground hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 border-t border-border pt-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list.", { description: "Watch your inbox for first access." });
              setEmail("");
            }}
            className="flex w-full max-w-lg items-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address for newsletter"
              className="h-12 flex-1 rounded-full border border-border bg-transparent px-5 text-sm outline-none focus:border-foreground"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-primary px-7 text-[11px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              Subscribe
            </button>
          </form>
          <div className="flex items-center gap-5">
            <a href="https://instagram.com" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-border">
              <Instagram className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a href={WHATSAPP_LINK} className="text-[11px] uppercase tracking-[0.2em] link-underline">
              WhatsApp
            </a>
          </div>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          © {new Date().getFullYear()} AnadaOne Clothing · Nationwide delivery across South Africa
        </p>
      </div>
    </footer>
  );
}
