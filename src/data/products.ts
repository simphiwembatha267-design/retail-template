const coverHero = { url: "" };
const creamJersey = { url: "" };
const blackLongsleeveFront = { url: "" };
const blackLongsleeveBack = { url: "" };
const storeEditorial = { url: "" };
const blackTracksuit = { url: "" };
const greenPoloFront = { url: "" };
const greenPoloStreet = { url: "" };
const logoCap = { url: "" };

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: "Tracksuits" | "Tees" | "Polos" | "Headwear";
  images: string[];
  badge?: "New" | "Best Seller" | "Low Stock";
  sizes: string[];
  stock: number;
  description: string;
  createdAt: number;
  sold: number;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "atelier-tracksuit",
    name: "Atelier Tracksuit",
    price: 1290,
    category: "Tracksuits",
    images: [blackTracksuit.url, storeEditorial.url],
    badge: "New",
    sizes: ["S", "M", "L", "XL", "2XL"],
    stock: 14,
    description:
      "Black zip-up tracksuit with the encircled A monogram and contrast white stripes. Made for movement, finished clean.",
    createdAt: 5,
    sold: 210,
  },
  {
    id: "2",
    slug: "core-boxy-tee",
    name: "Core Boxy Tee",
    price: 490,
    category: "Tees",
    images: [creamJersey.url, storeEditorial.url],
    badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    stock: 42,
    description:
      "Cream boxy jersey with the YOUR BRAND YACONSA graphic. Soft heavyweight cotton with a structured drop shoulder.",
    createdAt: 4,
    sold: 640,
  },
  {
    id: "3",
    slug: "green-polo",
    name: "Green Polo",
    price: 550,
    category: "Polos",
    images: [greenPoloFront.url, greenPoloStreet.url],
    sizes: ["S", "M", "L", "XL", "2XL"],
    stock: 9,
    description:
      "Green polo with contrast white collar and YOUR BRAND shoulder tape. A relaxed cut with clean finishing.",
    createdAt: 3,
    sold: 180,
  },
  {
    id: "4",
    slug: "monogram-cap",
    name: "Monogram Cap",
    price: 390,
    category: "Headwear",
    images: [logoCap.url, coverHero.url],
    badge: "Low Stock",
    sizes: ["One Size"],
    stock: 4,
    description:
      "White six-panel cap with the encircled A monogram embroidered in raised puff stitch.",
    createdAt: 2,
    sold: 320,
  },
  {
    id: "5",
    slug: "shadow-longsleeve",
    name: "Shadow Long-Sleeve",
    price: 790,
    category: "Tracksuits",
    images: [blackLongsleeveFront.url, blackLongsleeveBack.url],
    sizes: ["S", "M", "L", "XL"],
    stock: 21,
    description:
      "Black long-sleeve with the encircled A monogram and subtle white accents. A clean layer for any rotation.",
    createdAt: 1,
    sold: 140,
  },
  {
    id: "6",
    slug: "west-street-polo",
    name: "West Street Polo",
    price: 520,
    category: "Polos",
    images: [greenPoloStreet.url, greenPoloFront.url],
    badge: "New",
    sizes: ["S", "M", "L", "XL", "2XL"],
    stock: 33,
    description:
      "Green polo with the YOUR BRAND shoulder tape, photographed on the street. Built for everyday wear.",
    createdAt: 6,
    sold: 95,
  },
  {
    id: "7",
    slug: "yaconsa-striped-polo",
    name: "Yaconsa Striped Polo",
    price: 650,
    category: "Polos",
    images: [coverHero.url, storeEditorial.url],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    description:
      "Black-and-white striped polo with the encircled A monogram. A statement piece with classic collar detail.",
    createdAt: 2,
    sold: 76,
  },
  {
    id: "8",
    slug: "encircled-a-bucket-hat",
    name: "Encircled A Bucket Hat",
    price: 320,
    category: "Headwear",
    images: [blackLongsleeveBack.url, logoCap.url],
    sizes: ["One Size"],
    stock: 0,
    description: "White bucket hat with YOUR BRAND vertical branding. Lightweight cotton with a structured brim.",
    createdAt: 1,
    sold: 260,
  },
];

export const categories = ["Tracksuits", "Tees", "Polos", "Headwear"] as const;

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (v: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(v);

export const WHATSAPP = "+27 79 909 0379";
export const WHATSAPP_LINK = "https://wa.me/27799090379";
