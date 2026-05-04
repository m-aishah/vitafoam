import productsData from "@/data/products.json";

export type GradeKey =
  | "Deluxe"
  | "Shine"
  | "Corona"
  | "Grand"
  | "Sizzler"
  | "Vita Haven"
  | "Supreme"
  | "Vita Galaxy Classic"
  | "Galaxy Orthopaedic"
  | "Vita Spring Flex"
  | "Vita Spring Firm";

export interface SizeOption {
  size: string; // "75x54x8"
  L: number;
  W: number;
  T: number;
  price: number;
}

export interface Product {
  id: string;
  grade: GradeKey;
  name: string;
  description: string;
  shortDesc: string;
  badgeClass: string; // tailwind classes
  sizes: SizeOption[];
}

const META: Record<GradeKey, { name: string; short: string; desc: string; badge: string }> = {
  Deluxe: {
    name: "Deluxe Mattress",
    short: "Entry-level Vitafoam quality with great everyday value.",
    desc: "Our entry-level Vitafoam grade offers dependable comfort at an unbeatable price. Engineered for everyday use, the Deluxe is the perfect first mattress, guest room essential, or budget-friendly upgrade, without compromising on Vitafoam's signature build quality.",
    badge: "bg-slate-200 text-slate-800",
  },
  Shine: {
    name: "Shine Mattress",
    short: "Improved comfort layers and lasting durability.",
    desc: "The Shine grade steps up with enhanced foam density and improved comfort layers. Built to hold its shape over years of use, it's an ideal pick for anyone wanting a noticeable comfort upgrade at an honest price.",
    badge: "bg-sky-100 text-sky-800",
  },
  Corona: {
    name: "Corona Mattress",
    short: "Mid-premium grade, Nigeria's most popular choice.",
    desc: "A mid-premium grade with superior comfort foam layers, ideal for everyday luxury sleep. Perfect for families who want quality without compromise, Corona is consistently our best-seller across Nigeria.",
    badge: "bg-teal-100 text-teal-800",
  },
  Grand: {
    name: "Grand Mattress",
    short: "High-end comfort engineered to last.",
    desc: "The Grand grade delivers high-end Vitafoam comfort with reinforced cores designed to maintain support for years. Plush yet supportive, it's a smart pick for couples and master bedrooms.",
    badge: "bg-purple-100 text-purple-800",
  },
  Sizzler: {
    name: "Sizzler Super Soft Mattress",
    short: "Ultra-soft premium feel, sink in and unwind.",
    desc: "Sizzler Super Soft (SS) wraps you in luxurious plushness. With ultra-soft top layers over a supportive core, it's pure indulgence for those who love to sink into bed.",
    badge: "bg-amber-100 text-amber-900",
  },
  "Vita Haven": {
    name: "Vita Haven Mattress",
    short: "Orthopaedic-grade support for healthier sleep.",
    desc: "Vita Haven is engineered with firm orthopaedic foam to support proper spine alignment. Recommended for back-pain relief and anyone who prefers a firmer, posture-correct sleep surface.",
    badge: "bg-orange-100 text-orange-800",
  },
  Supreme: {
    name: "Supreme Mattress",
    short: "Top-tier luxury comfort and craftsmanship.",
    desc: "The Supreme grade is luxury redefined, premium high-density foams, refined comfort layers and elegant finishing. Built for the most discerning sleepers who refuse to compromise.",
    badge: "bg-red-100 text-red-800",
  },
  "Vita Galaxy Classic": {
    name: "Vita Galaxy Classic Mattress",
    short: "Advanced multi-zone foam technology.",
    desc: "Vita Galaxy Classic combines advanced foam technology across multiple comfort zones, delivering targeted support and pressure relief in one cohesive sleep system.",
    badge: "bg-emerald-100 text-emerald-800",
  },
  "Galaxy Orthopaedic": {
    name: "Galaxy Orthopaedic Mattress",
    short: "Medical-grade orthopaedic support.",
    desc: "The Galaxy Orthopaedic grade is engineered to medical-grade firmness for serious back support. Recommended by health-conscious sleepers who need uncompromising spinal alignment.",
    badge: "bg-primary/10 text-primary",
  },
  "Vita Spring Flex": {
    name: "Vita Spring Flex Mattress",
    short: "Spring + foam hybrid with flexible comfort response.",
    desc: "Vita Spring Flex marries pocketed spring technology with Vitafoam comfort layers for a responsive, breathable sleep. Flexible feel, plush top, exceptional airflow.",
    badge: "bg-pink-100 text-pink-800",
  },
  "Vita Spring Firm": {
    name: "Vita Spring Firm Mattress",
    short: "Spring + foam hybrid with firm orthopaedic support.",
    desc: "Vita Spring Firm pairs sturdy springs with firm Vitafoam layers for hotel-grade firm support. The pinnacle of supportive sleep for those who love a firm, structured bed.",
    badge: "bg-amber-900/10 text-amber-900",
  },
};

const gradeToId: Record<GradeKey, string> = {
  Deluxe: "deluxe",
  Shine: "shine",
  Corona: "corona",
  Grand: "grand",
  Sizzler: "sizzler",
  "Vita Haven": "vita-haven",
  Supreme: "supreme",
  "Vita Galaxy Classic": "vita-galaxy-classic",
  "Galaxy Orthopaedic": "galaxy-orthopaedic",
  "Vita Spring Flex": "vita-spring-flex",
  "Vita Spring Firm": "vita-spring-firm",
};

function buildProducts(): Product[] {
  const data = productsData as Record<GradeKey, SizeOption[]>;
  return (Object.keys(META) as GradeKey[]).map((g) => {
    const sizes = (data[g] || []).filter((s) => s.price > 0).sort((a, b) => a.price - b.price);
    const m = META[g];
    return {
      id: gradeToId[g],
      grade: g,
      name: m.name,
      description: m.desc,
      shortDesc: m.short,
      badgeClass: m.badge,
      sizes,
    };
  }).filter((p) => p.sizes.length > 0);
}

const SEED = buildProducts();
const STORAGE_KEY = "mbg_products_v1";

export function getProducts(): Product[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Product[];
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
  return SEED;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function formatNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Convert "75x54x8" -> "4½ft × 6ft × 8 inches"
const inchToFt: Record<number, string> = {
  30: "2½ft",
  36: "3ft",
  42: "3½ft",
  48: "4ft",
  54: "4½ft",
  60: "5ft",
  72: "6ft",
  75: "6¼ft",
  79: "6½ft",
  84: "7ft",
  88: "7⅓ft",
  96: "8ft",
  108: "9ft",
};

export function formatSize(s: SizeOption): string {
  const widthLabel = inchToFt[s.W] || `${s.W}"`;
  const lengthLabel = inchToFt[s.L] || `${s.L}"`;
  return `${widthLabel} × ${lengthLabel} × ${s.T} inches`;
}

export function formatSizeShort(s: SizeOption): string {
  return `${s.L} × ${s.W} × ${s.T}"`;
}

export const GRADE_OPTIONS: GradeKey[] = [
  "Deluxe", "Shine", "Corona", "Grand", "Sizzler",
  "Vita Haven", "Supreme", "Vita Galaxy Classic",
  "Galaxy Orthopaedic", "Vita Spring Flex", "Vita Spring Firm",
];

export const THICKNESS_OPTIONS = [3, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export const WHATSAPP_NUMBER = "2348053054348";

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
