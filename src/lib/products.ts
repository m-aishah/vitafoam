import productsData from "@/data/products.json";
import coronaImg from "@/assets/corona-mattress.jpg";
import shineImg from "@/assets/vita-shine.jpg";
import grandImg from "@/assets/vita-grand.jpg";
import havenImg from "@/assets/vita-haven.jpg";
import sizzlerImg from "@/assets/vita-sizzler.jpg";
import springFirmImg from "@/assets/vita-spring-firm.jpg";
import springFlexImg from "@/assets/vita-spring-flex.jpg";
import supremeImg from "@/assets/vita-supreme.jpg";

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
  | "Vita Spring Firm"
  | "Twill Single"
  | "Twill Double"
  | "Vitaluxe"
  | "Vitahelix"
  | "Memory Topper";

export interface SizeOption {
  size: string;
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
  badgeClass: string;
  sizes: SizeOption[];
  image?: string;
}

export interface RawProduct {
  code: string;
  grade: string;
  gradeSuffix: string;
  dimensionRaw: string;
  lengthInches: number;
  widthInches: number;
  thicknessInches: number;
  price: number;
  displaySize: string;
  displayLabel: string;
}

export interface CatalogFile {
  lastUpdated: string | null;
  uploadedFileName: string | null;
  totalProducts: number;
  products: RawProduct[];
}

const IMAGES: Partial<Record<GradeKey, string>> = {
  Corona: coronaImg,
  Shine: shineImg,
  Grand: grandImg,
  "Vita Haven": havenImg,
  Sizzler: sizzlerImg,
  "Vita Spring Firm": springFirmImg,
  "Vita Spring Flex": springFlexImg,
  Supreme: supremeImg,
};

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
  "Twill Single": {
    name: "Twill Single Mattress",
    short: "Classic single-layer twill foam comfort.",
    desc: "The Twill Single offers reliable everyday comfort in a single-layer foam build, ideal for guest rooms and student accommodation.",
    badge: "bg-slate-100 text-slate-700",
  },
  "Twill Double": {
    name: "Twill Double Mattress",
    short: "Double-sided twill foam for extended life.",
    desc: "Twill Double delivers double-sided foam construction for extended mattress life and balanced comfort for couples.",
    badge: "bg-slate-100 text-slate-700",
  },
  Vitaluxe: {
    name: "Vitaluxe Mattress",
    short: "Luxury Vitafoam comfort at a mid-range price.",
    desc: "Vitaluxe bridges the gap between premium and affordable, offering luxury comfort foam layers at a price that makes sense.",
    badge: "bg-violet-100 text-violet-800",
  },
  Vitahelix: {
    name: "Vitahelix Mattress",
    short: "Helix spring technology meets Vitafoam comfort.",
    desc: "Vitahelix combines innovative helix spring technology with Vitafoam's renowned comfort foam for unparalleled motion isolation and support.",
    badge: "bg-cyan-100 text-cyan-800",
  },
  "Memory Topper": {
    name: "Memory Foam Topper",
    short: "Pressure-relief memory foam mattress topper.",
    desc: "Transform any mattress with Vitafoam's viscoelastic memory topper. Conforms to your body shape for zero-pressure-point sleep.",
    badge: "bg-indigo-100 text-indigo-800",
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
  "Twill Single": "twill-single",
  "Twill Double": "twill-double",
  Vitaluxe: "vitaluxe",
  Vitahelix: "vitahelix",
  "Memory Topper": "memory-topper",
};

const SEED_CATALOG = productsData as CatalogFile;
const OVERRIDE_KEY = "mbg_catalog_override_v1";

export function getCatalog(): CatalogFile {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(OVERRIDE_KEY);
      if (raw) return JSON.parse(raw) as CatalogFile;
    } catch {}
  }
  return SEED_CATALOG;
}

export function saveCatalog(cat: CatalogFile) {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify(cat));
  window.dispatchEvent(new Event("mbg-catalog-changed"));
}

export function resetCatalog() {
  localStorage.removeItem(OVERRIDE_KEY);
  window.dispatchEvent(new Event("mbg-catalog-changed"));
}

export function isUsingSeed(): boolean {
  if (typeof window === "undefined") return true;
  return !localStorage.getItem(OVERRIDE_KEY);
}

function buildProducts(catalog: CatalogFile): Product[] {
  const byGrade: Record<string, RawProduct[]> = {};
  for (const r of catalog.products) {
    if (!META[r.grade as GradeKey]) continue;
    (byGrade[r.grade] ||= []).push(r);
  }
  return (Object.keys(META) as GradeKey[]).map((g) => {
    const rawList = (byGrade[g] || [])
      .filter((r) => r.price > 0)
      .sort((a, b) => a.price - b.price);
    const sizes: SizeOption[] = rawList.map((r) => ({
      size: `${r.lengthInches}x${r.widthInches}x${r.thicknessInches}`,
      L: r.lengthInches,
      W: r.widthInches,
      T: r.thicknessInches,
      price: r.price,
    }));
    const m = META[g];
    return {
      id: gradeToId[g],
      grade: g,
      name: m.name,
      description: m.desc,
      shortDesc: m.short,
      badgeClass: m.badge,
      sizes,
      image: IMAGES[g],
    };
  }).filter((p) => p.sizes.length > 0);
}

export function getProducts(): Product[] {
  return buildProducts(getCatalog());
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function formatNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const W_TO_FT: Record<number, string> = {
  30: "2½'", 36: "3'", 42: "3½'", 48: "4'", 54: "4½'",
  60: "5'", 63: "5¼'", 71: "5'11\"", 72: "6'", 84: "7'",
};
const L_TO_FT: Record<number, string> = {
  75: "6'", 79: "6½'", 84: "7'",
};

export function formatSize(s: SizeOption): string {
  const W = W_TO_FT[s.W] ?? `${s.W}"`;
  const L = L_TO_FT[s.L] ?? `${s.L}"`;
  return `${W} × ${L} × ${s.T}"`;
}

export function formatSizeShort(s: SizeOption): string {
  const W = W_TO_FT[s.W] ?? `${s.W}"`;
  return `${W} × ${s.T}"`;
}

export const GRADE_OPTIONS: GradeKey[] = [
  "Deluxe", "Shine", "Corona", "Grand", "Sizzler",
  "Vita Haven", "Supreme", "Vita Galaxy Classic",
  "Galaxy Orthopaedic", "Vita Spring Flex", "Vita Spring Firm",
  "Twill Single", "Twill Double", "Vitaluxe", "Vitahelix", "Memory Topper",
];

export const THICKNESS_OPTIONS = [3, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export const GRADE_SUFFIX: Record<GradeKey, string> = {
  Deluxe: "DE", Shine: "SH", Corona: "CP", Grand: "SG", Sizzler: "SS",
  "Vita Haven": "VH", Supreme: "VS", "Vita Galaxy Classic": "GS",
  "Galaxy Orthopaedic": "RQ", "Vita Spring Flex": "SX", "Vita Spring Firm": "SF",
  "Twill Single": "TS", "Twill Double": "TD", Vitaluxe: "VL", Vitahelix: "VX",
  "Memory Topper": "MT",
};

export const SUFFIX_TO_GRADE: Record<string, GradeKey> = Object.fromEntries(
  Object.entries(GRADE_SUFFIX).map(([k, v]) => [v, k as GradeKey])
) as Record<string, GradeKey>;

export const WHATSAPP_NUMBER = "2348053054348";

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
