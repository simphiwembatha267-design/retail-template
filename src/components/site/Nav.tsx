import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { Wordmark } from "./Logo";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New Arrivals", search: { sort: "newest" } },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { count, setCartOpen, wishlist, theme, toggleTheme } = useStore();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [path]);

  const results = q.trim()
    ? products.filter((p) => (p.name + p.category).toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : [];

  const onHome = path === "/";
  const transparent = onHome && !scrolled && !searchOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:var(--ease-lux)]",
        transparent
          ? "border-b border-transparent text-white"
          : "glass-panel border-b border-border text-foreground",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-5 sm:h-20 md:px-10">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="-ml-1 grid h-11 w-11 shrink-0 place-items-center lg:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <Link to="/" className="shrink-0" aria-label="Your Brand home">
          <Wordmark />
        </Link>

        <nav className="ml-10 hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              search={l.search as never}
              className="link-underline text-[11px] font-medium uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            aria-label="Search products"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center transition-transform hover:scale-110"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="hidden h-11 w-11 place-items-center transition-transform hover:scale-110 sm:grid"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />
            ) : (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            )}
          </button>
          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            className="relative hidden h-11 w-11 place-items-center transition-transform hover:scale-110 sm:grid"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute right-1.5 top-2 h-1.5 w-1.5 rounded-full bg-current" />
            )}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-11 w-11 place-items-center transition-transform hover:scale-110 sm:grid"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label={`Open cart, ${count} items`}
            onClick={() => setCartOpen(true)}
            className="relative grid h-11 w-11 place-items-center transition-transform hover:scale-110"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute right-0.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-current px-1 text-[10px] font-bold">
                <span className="text-background">{count}</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background text-foreground">
          <div className="mx-auto max-w-[1600px] px-5 py-6 md:px-10">
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search hoodies, tees, cargos…"
              aria-label="Search"
              className="w-full border-b border-border bg-transparent pb-4 font-display text-2xl uppercase tracking-tight outline-none placeholder:text-muted-foreground sm:text-4xl"
            />
            <div className="mt-4 grid gap-1">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface"
                >
                  <img src={p.images[0]} alt="" className="h-14 w-11 rounded-md object-cover" />
                  <span className="text-sm">{p.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{p.category}</span>
                </Link>
              ))}
              {q && results.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted-foreground">No matches yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background text-foreground transition-all duration-500 [transition-timing-function:var(--ease-lux)] lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Wordmark />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="mt-6 flex flex-col px-5">
          {links.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              search={l.search as never}
              className="border-b border-border py-5 font-display text-3xl font-extrabold uppercase tracking-tight"
              style={{ animation: open ? `reveal-up 600ms var(--ease-lux) ${i * 55}ms both` : undefined }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex gap-6 px-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/account">Account</Link>
          <button type="button" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"} mode
          </button>
        </div>
      </div>
    </header>
  );
}
