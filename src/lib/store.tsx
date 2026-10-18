import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export type CartLine = {
  id: string;
  slug: string;
  size: string;
  qty: number;
};

type StoreValue = {
  lines: CartLine[];
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  add: (product: Product, size: string, qty?: number) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, qty: number) => void;
  count: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setLines(read<CartLine[]>("ao_cart", []));
    setWishlist(read<string[]>("ao_wishlist", []));
    const t = read<"light" | "dark">("ao_theme", "light");
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ao_cart", JSON.stringify(lines));
  }, [lines]);
  useEffect(() => {
    window.localStorage.setItem("ao_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const add = useCallback((product: Product, size: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === product.id && l.size === size);
      if (found) {
        return prev.map((l) =>
          l.id === product.id && l.size === size ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { id: product.id, slug: product.slug, size, qty }];
    });
    setCartOpen(true);
  }, []);

  const remove = useCallback((id: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.id === id && l.size === size)));
  }, []);

  const setQty = useCallback((id: string, size: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.id === id && l.size === size))
        : prev.map((l) => (l.id === id && l.size === size ? { ...l, qty } : l)),
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem("ao_theme", JSON.stringify(next));
      return next;
    });
  }, []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const l of lines) {
      const p = products.find((x) => x.id === l.id);
      c += l.qty;
      if (p) s += p.price * l.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value: StoreValue = {
    lines,
    cartOpen,
    setCartOpen,
    add,
    remove,
    setQty,
    count,
    subtotal,
    wishlist,
    toggleWishlist,
    theme,
    toggleTheme,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
