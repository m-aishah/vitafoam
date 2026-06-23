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
  | "Vita Spring Firm";

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
    short: "The Vitafoam Deluxe is the ideal entry point into genuine Vitafoam quality — offering reliable everyday comfort at an accessible price. Its high-resilience foam core provides consistent support night after night, making it a popular choice for student accommodation, guest rooms, and budget-conscious households. A trusted Nigerian household name for decades.",
    desc: "The Vitafoam Deluxe is the ideal entry point into genuine Vitafoam quality — offering reliable everyday comfort at an accessible price. Its high-resilience foam core provides consistent support night after night, making it a popular choice for student accommodation, guest rooms, and budget-conscious households. A trusted Nigerian household name for decades.",
    badge: "bg-slate-200 text-slate-800",
  },
  Shine: {
    name: "Shine Mattress",
    short: "The Vitafoam Shine steps up from entry level with improved comfort layers and enhanced foam density for longer-lasting support. It strikes the perfect balance between affordability and performance, making it one of the most recommended upgrades for growing families. Sleep better, feel the difference.",
    desc: "The Vitafoam Shine steps up from entry level with improved comfort layers and enhanced foam density for longer-lasting support. It strikes the perfect balance between affordability and performance, making it one of the most recommended upgrades for growing families. Sleep better, feel the difference.",
    badge: "bg-sky-100 text-sky-800",
  },
  Corona: {
    name: "Corona Mattress",
    short: "The Vitafoam Corona is Nigeria's best-selling mattress grade — and for good reason. Its mid-premium foam formulation delivers a satisfying blend of softness and support that works for virtually every sleeping style and body type. Millions of Nigerians trust the Corona for consistent, quality sleep every night.",
    desc: "The Vitafoam Corona is Nigeria's best-selling mattress grade — and for good reason. Its mid-premium foam formulation delivers a satisfying blend of softness and support that works for virtually every sleeping style and body type. Millions of Nigerians trust the Corona for consistent, quality sleep every night.",
    badge: "bg-teal-100 text-teal-800",
  },
  Grand: {
    name: "Grand Mattress",
    short: "The Vitafoam Grand is engineered for sleepers who refuse to compromise on comfort. Premium-density foam layers are precision-crafted to deliver deep, restorative sleep and superior long-term durability. An investment in your health that pays dividends every single morning.",
    desc: "The Vitafoam Grand is engineered for sleepers who refuse to compromise on comfort. Premium-density foam layers are precision-crafted to deliver deep, restorative sleep and superior long-term durability. An investment in your health that pays dividends every single morning.",
    badge: "bg-purple-100 text-purple-800",
  },
  Sizzler: {
    name: "Sizzler Super Soft Mattress",
    short: "Sink into the Vitafoam Sizzler and feel the difference immediately — its ultra-soft premium foam envelops your body for a truly indulgent sleep experience. Designed for those who want the finest everyday comfort without stepping into the orthopaedic range, the Sizzler is luxury made accessible. Perfect for master bedrooms and anyone who takes their sleep seriously.",
    desc: "Sink into the Vitafoam Sizzler and feel the difference immediately — its ultra-soft premium foam envelops your body for a truly indulgent sleep experience. Designed for those who want the finest everyday comfort without stepping into the orthopaedic range, the Sizzler is luxury made accessible. Perfect for master bedrooms and anyone who takes their sleep seriously.",
    badge: "bg-amber-100 text-amber-900",
  },
  "Vita Haven": {
    name: "Vita Haven Mattress",
    short: "The Vita Haven delivers orthopaedic-grade spinal support in a mattress engineered for healthier, pain-free sleep. Its advanced high-density foam core aligns your spine correctly, relieves pressure points, and reduces morning stiffness — ideal for those with back pain or anyone who simply wants to wake up feeling fully restored. A genuine investment in long-term health and wellbeing.",
    desc: "The Vita Haven delivers orthopaedic-grade spinal support in a mattress engineered for healthier, pain-free sleep. Its advanced high-density foam core aligns your spine correctly, relieves pressure points, and reduces morning stiffness — ideal for those with back pain or anyone who simply wants to wake up feeling fully restored. A genuine investment in long-term health and wellbeing.",
    badge: "bg-orange-100 text-orange-800",
  },
  Supreme: {
    name: "Supreme Mattress",
    short: "The Vitafoam Supreme represents the pinnacle of Vitafoam's foam-only mattress range — a top-tier sleep surface combining ultra-premium foam density with exceptional craftsmanship. Every layer is engineered for maximum comfort, pressure relief, and durability, ensuring your mattress performs beautifully for years to come. For those who accept nothing but the best.",
    desc: "The Vitafoam Supreme represents the pinnacle of Vitafoam's foam-only mattress range — a top-tier sleep surface combining ultra-premium foam density with exceptional craftsmanship. Every layer is engineered for maximum comfort, pressure relief, and durability, ensuring your mattress performs beautifully for years to come. For those who accept nothing but the best.",
    badge: "bg-red-100 text-red-800",
  },
  "Vita Galaxy Classic": {
    name: "Vita Galaxy Classic Mattress",
    short: "The Vita Galaxy Classic harnesses advanced multi-zone foam technology to deliver targeted support exactly where your body needs it most. Distinct comfort zones for the shoulders, lumbar, and hips ensure perfect spinal alignment regardless of your sleeping position. A scientifically designed mattress for the modern, health-conscious sleeper.",
    desc: "The Vita Galaxy Classic harnesses advanced multi-zone foam technology to deliver targeted support exactly where your body needs it most. Distinct comfort zones for the shoulders, lumbar, and hips ensure perfect spinal alignment regardless of your sleeping position. A scientifically designed mattress for the modern, health-conscious sleeper.",
    badge: "bg-emerald-100 text-emerald-800",
  },
  "Galaxy Orthopaedic": {
    name: "Galaxy Orthopaedic Mattress",
    short: "The Galaxy Orthopaedic is Vitafoam's medical-grade sleep solution, developed in collaboration with orthopaedic specialists to address the root causes of sleep-related back and joint pain. Its high-density therapeutic foam distributes body weight evenly, eliminates pressure points, and actively supports correct spinal alignment throughout the night. Recommended by healthcare professionals for post-surgery recovery, chronic back pain, and anyone who demands clinical-grade sleep support.",
    desc: "The Galaxy Orthopaedic is Vitafoam's medical-grade sleep solution, developed in collaboration with orthopaedic specialists to address the root causes of sleep-related back and joint pain. Its high-density therapeutic foam distributes body weight evenly, eliminates pressure points, and actively supports correct spinal alignment throughout the night. Recommended by healthcare professionals for post-surgery recovery, chronic back pain, and anyone who demands clinical-grade sleep support.",
    badge: "bg-primary/10 text-primary",
  },
  "Vita Spring Flex": {
    name: "Vita Spring Flex Mattress",
    short: "The Vita Spring Flex combines an individually pocketed spring system with premium foam layers for a sleep experience that is both responsive and cradling. The flexible spring core adapts dynamically to your movements, reducing partner disturbance while the foam comfort layer cushions pressure points. The best of both worlds — the support of springs, the comfort of foam.",
    desc: "The Vita Spring Flex combines an individually pocketed spring system with premium foam layers for a sleep experience that is both responsive and cradling. The flexible spring core adapts dynamically to your movements, reducing partner disturbance while the foam comfort layer cushions pressure points. The best of both worlds — the support of springs, the comfort of foam.",
    badge: "bg-pink-100 text-pink-800",
  },
  "Vita Spring Firm": {
    name: "Vita Spring Firm Mattress",
    short: "The Vita Spring Firm pairs a robust orthopaedic spring system with firm foam layers for sleepers who need maximum support. Engineered to maintain correct spinal posture throughout the night, it is particularly suited to heavier body types, back pain sufferers, and those who find traditional foam mattresses too soft. Firm, purposeful, and built to last.",
    desc: "The Vita Spring Firm pairs a robust orthopaedic spring system with firm foam layers for sleepers who need maximum support. Engineered to maintain correct spinal posture throughout the night, it is particularly suited to heavier body types, back pain sufferers, and those who find traditional foam mattresses too soft. Firm, purposeful, and built to last.",
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
];

export const THICKNESS_OPTIONS = [3, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export const GRADE_SUFFIX: Record<GradeKey, string> = {
  Deluxe: "DE", Shine: "SH", Corona: "CP", Grand: "SG", Sizzler: "SS",
  "Vita Haven": "VH", Supreme: "VS", "Vita Galaxy Classic": "GS",
  "Galaxy Orthopaedic": "RQ", "Vita Spring Flex": "SX", "Vita Spring Firm": "SF",
};

export const SUFFIX_TO_GRADE: Record<string, GradeKey> = Object.fromEntries(
  Object.entries(GRADE_SUFFIX).map(([k, v]) => [v, k as GradeKey])
) as Record<string, GradeKey>;

export const WHATSAPP_NUMBER = "2348053054348";

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
