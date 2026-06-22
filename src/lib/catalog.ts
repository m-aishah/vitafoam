import mattressesData from "@/data/mattresses.json";
import toppersData from "@/data/toppers.json";
import pillowsData from "@/data/pillows.json";
import babyData from "@/data/baby.json";
import lifestyleData from "@/data/lifestyle.json";
import leisureData from "@/data/leisure.json";
import beddingData from "@/data/bedding.json";
import { supabase } from "./supabase";

export type CategoryKey = "mattress" | "topper" | "pillow" | "baby" | "lifestyle" | "leisure" | "bedding";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  mattress: "Mattresses",
  topper: "Memory Toppers",
  pillow: "Pillows",
  baby: "Baby & Mother",
  lifestyle: "Lifestyle",
  leisure: "Leisure",
  bedding: "Bedding",
};

const GRADE_BADGE: Record<string, string> = {
  Deluxe: "bg-slate-200 text-slate-800",
  Shine: "bg-sky-100 text-sky-800",
  Corona: "bg-teal-100 text-teal-800",
  Grand: "bg-purple-100 text-purple-800",
  Sizzler: "bg-amber-100 text-amber-900",
  "Vita Haven": "bg-orange-100 text-orange-800",
  Supreme: "bg-red-100 text-red-800",
  "Vita Galaxy Classic": "bg-emerald-100 text-emerald-800",
  "Galaxy Orthopaedic": "bg-primary/10 text-primary",
  "Vita Spring Flex": "bg-pink-100 text-pink-800",
  "Vita Spring Firm": "bg-amber-900/10 text-amber-900",
  "Twill Single": "bg-stone-100 text-stone-800",
  "Twill Double": "bg-stone-200 text-stone-900",
  Vitaluxe: "bg-violet-100 text-violet-800",
  Vitahelix: "bg-cyan-100 text-cyan-800",
  "Memory Topper": "bg-lime-100 text-lime-800",
};

const GRADE_SHORT_DESC: Record<string, string> = {
  Deluxe: "Entry-level Vitafoam quality with great everyday value.",
  Shine: "Improved comfort layers and lasting durability.",
  Corona: "Mid-premium grade, Nigeria's most popular choice.",
  Grand: "High-end comfort engineered to last.",
  Sizzler: "Ultra-soft premium feel, sink in and unwind.",
  "Vita Haven": "Orthopaedic-grade support for healthier sleep.",
  Supreme: "Top-tier luxury comfort and craftsmanship.",
  "Vita Galaxy Classic": "Advanced multi-zone foam technology.",
  "Galaxy Orthopaedic": "Medical-grade orthopaedic support.",
  "Vita Spring Flex": "Spring + foam hybrid with flexible comfort response.",
  "Vita Spring Firm": "Spring + foam hybrid with firm orthopaedic support.",
  "Twill Single": "Durable twill-cover single mattress.",
  "Twill Double": "Durable twill-cover double mattress.",
  Vitaluxe: "Ultra-luxury premium foam for the finest sleep.",
  Vitahelix: "Innovative helix-core design for ultimate pressure relief.",
  "Memory Topper": "Memory foam topper that transforms your mattress.",
};

export interface MattressRaw {
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

export interface SimpleProduct {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  price: number;
  image: string | null;
}

export interface BeddingVariant {
  sizeName: string;
  L: number;
  W: number;
  price: number;
}

export interface BeddingProduct {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string | null;
  variants: BeddingVariant[];
}

export interface TopperRaw {
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
  image?: string | null;
}

export interface MattressCatalog {
  lastUpdated: string | null;
  uploadedFileName: string | null;
  totalProducts: number;
  products: MattressRaw[];
}

export interface ShopItem {
  id: string;
  category: CategoryKey;
  name: string;
  shortDesc: string;
  description: string;
  image?: string | null;
  minPrice: number;
  grade?: string;
  badgeClass?: string;
  sizes?: { label: string; price: number }[];
}

export interface GroupedShopItem {
  id: string;
  category: CategoryKey;
  categoryLabel: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string | null;
  minPrice: number;
  grade?: string;
  badgeClass?: string;
  sizes: { label: string; L: number; W: number; T: number; price: number }[];
}

// ─── In-memory cache (seeded from JSON, overwritten by Supabase on load) ───

const cache: {
  mattresses: MattressCatalog;
  toppers: TopperRaw[];
  pillows: SimpleProduct[];
  baby: SimpleProduct[];
  lifestyle: SimpleProduct[];
  leisure: SimpleProduct[];
  bedding: BeddingProduct[];
} = {
  mattresses: mattressesData as MattressCatalog,
  toppers: (toppersData as { products: TopperRaw[] }).products,
  pillows: (pillowsData as { products: SimpleProduct[] }).products,
  baby: (babyData as { products: SimpleProduct[] }).products,
  lifestyle: (lifestyleData as { products: SimpleProduct[] }).products,
  leisure: (leisureData as { products: SimpleProduct[] }).products,
  bedding: (beddingData as { products: BeddingProduct[] }).products,
};

// ─── Supabase helpers ───────────────────────────────────────────────────────

function dispatch() {
  window.dispatchEvent(new Event("mbg-catalog-changed"));
}

function persist(key: string, value: unknown): void {
  supabase
    .from("catalog")
    .upsert({ key, value, updated_at: new Date().toISOString() })
    .then(({ error }) => {
      if (error) console.error("[catalog] Supabase save failed:", key, error);
    });
}

// Load everything from Supabase once and update cache
export async function initCatalog(): Promise<void> {
  try {
    const { data, error } = await supabase.from("catalog").select("key, value");
    if (error) throw error;
    if (data) {
      for (const { key, value } of data) {
        if (key === "mattresses") cache.mattresses = value as MattressCatalog;
        else if (key === "toppers") cache.toppers = value as TopperRaw[];
        else if (key === "pillows") cache.pillows = value as SimpleProduct[];
        else if (key === "baby") cache.baby = value as SimpleProduct[];
        else if (key === "lifestyle") cache.lifestyle = value as SimpleProduct[];
        else if (key === "leisure") cache.leisure = value as SimpleProduct[];
        else if (key === "bedding") cache.bedding = value as BeddingProduct[];
      }
    }
  } catch (e) {
    console.warn("[catalog] Could not load from Supabase, using seed data:", e);
  }
  dispatch();
}

// Trigger on module load (fire-and-forget; components re-render via event)
initCatalog();

// ─── Mattresses ─────────────────────────────────────────────────────────────

export function getMattressCatalog(): MattressCatalog {
  return cache.mattresses;
}

export function saveMattressCatalog(cat: MattressCatalog): void {
  cache.mattresses = cat;
  dispatch();
  persist("mattresses", cat);
}

export function resetMattressCatalog(): void {
  cache.mattresses = mattressesData as MattressCatalog;
  dispatch();
  supabase.from("catalog").delete().eq("key", "mattresses").then(({ error }) => {
    if (error) console.error("[catalog] reset failed:", error);
  });
}

export function isUsingMattressSeed(): boolean {
  return cache.mattresses.lastUpdated === null;
}

export function getMattresses(): MattressRaw[] {
  return cache.mattresses.products;
}

export function saveMattresses(data: MattressRaw[]): void {
  saveMattressCatalog({ ...cache.mattresses, products: data, totalProducts: data.length });
}

export function updateMattressRaw(updated: MattressRaw): void {
  saveMattresses(getMattresses().map((p) => p.code === updated.code ? updated : p));
}

export function addMattressRaw(raw: MattressRaw): void {
  saveMattresses([...getMattresses(), raw]);
}

export function deleteMattressRaw(code: string): void {
  saveMattresses(getMattresses().filter((p) => p.code !== code));
}

// ─── Toppers ─────────────────────────────────────────────────────────────────

export function getToppers(): TopperRaw[] { return cache.toppers; }

function saveToppers(data: TopperRaw[]): void {
  cache.toppers = data;
  dispatch();
  persist("toppers", data);
}

export function getTopperProducts(): TopperRaw[] { return getToppers(); }
export function saveTopperProducts(data: TopperRaw[]): void { saveToppers(data); }
export function deleteTopperRaw(code: string): void {
  saveToppers(getToppers().filter((t) => t.code !== code));
}

// ─── Generic simple-product factory ─────────────────────────────────────────

type SimpleCat = "pillow" | "baby" | "lifestyle" | "leisure";

function getSimple(cat: SimpleCat): SimpleProduct[] { return cache[cat === "pillow" ? "pillows" : cat === "baby" ? "baby" : cat === "lifestyle" ? "lifestyle" : "leisure"]; }
function saveSimple(cat: SimpleCat, data: SimpleProduct[]): void {
  const key = cat === "pillow" ? "pillows" : cat;
  (cache as any)[key === "pillows" ? "pillows" : key] = data;
  dispatch();
  persist(key === "pillows" ? "pillows" : key, data);
}

// Fix: map cat key to cache key correctly
function cacheKey(cat: SimpleCat): keyof typeof cache {
  if (cat === "pillow") return "pillows";
  return cat as keyof typeof cache;
}

function getSimpleCat(cat: SimpleCat): SimpleProduct[] {
  return cache[cacheKey(cat)] as SimpleProduct[];
}

function saveSimpleCat(cat: SimpleCat, data: SimpleProduct[]): void {
  const ck = cacheKey(cat);
  (cache as any)[ck] = data;
  dispatch();
  const supaKey = cat === "pillow" ? "pillows" : cat;
  persist(supaKey, data);
}

// ─── Pillows ─────────────────────────────────────────────────────────────────

export function getPillows(): SimpleProduct[] { return cache.pillows; }
export function getPillowProducts(): SimpleProduct[] { return getPillows(); }
export function savePillows(data: SimpleProduct[]): void { saveSimpleCat("pillow", data); }
export function addPillow(item: SimpleProduct): void { savePillows([...getPillows(), item]); }
export function updatePillow(id: string, updated: SimpleProduct): void {
  savePillows(getPillows().map((p) => p.id === id ? updated : p));
}
export function deletePillow(id: string): void {
  savePillows(getPillows().filter((p) => p.id !== id));
}

// ─── Baby ─────────────────────────────────────────────────────────────────────

export function getBabyProducts(): SimpleProduct[] { return cache.baby; }
export function saveBabyProducts(data: SimpleProduct[]): void { saveSimpleCat("baby", data); }
export function addBabyProduct(item: SimpleProduct): void { saveBabyProducts([...getBabyProducts(), item]); }
export function updateBabyProduct(id: string, updated: SimpleProduct): void {
  saveBabyProducts(getBabyProducts().map((p) => p.id === id ? updated : p));
}
export function deleteBabyProduct(id: string): void {
  saveBabyProducts(getBabyProducts().filter((p) => p.id !== id));
}

// ─── Lifestyle ────────────────────────────────────────────────────────────────

export function getLifestyleProducts(): SimpleProduct[] { return cache.lifestyle; }
export function saveLifestyleProducts(data: SimpleProduct[]): void { saveSimpleCat("lifestyle", data); }
export function addLifestyleProduct(item: SimpleProduct): void { saveLifestyleProducts([...getLifestyleProducts(), item]); }
export function updateLifestyleProduct(id: string, updated: SimpleProduct): void {
  saveLifestyleProducts(getLifestyleProducts().map((p) => p.id === id ? updated : p));
}
export function deleteLifestyleProduct(id: string): void {
  saveLifestyleProducts(getLifestyleProducts().filter((p) => p.id !== id));
}

// ─── Leisure ─────────────────────────────────────────────────────────────────

export function getLeisureProducts(): SimpleProduct[] { return cache.leisure; }
export function saveLeisureProducts(data: SimpleProduct[]): void { saveSimpleCat("leisure", data); }
export function addLeisureProduct(item: SimpleProduct): void { saveLeisureProducts([...getLeisureProducts(), item]); }
export function updateLeisureProduct(id: string, updated: SimpleProduct): void {
  saveLeisureProducts(getLeisureProducts().map((p) => p.id === id ? updated : p));
}
export function deleteLeisureProduct(id: string): void {
  saveLeisureProducts(getLeisureProducts().filter((p) => p.id !== id));
}

// ─── Bedding ─────────────────────────────────────────────────────────────────

export function getBeddingProducts(): BeddingProduct[] { return cache.bedding; }
export function saveBeddingProducts(data: BeddingProduct[]): void {
  cache.bedding = data;
  dispatch();
  persist("bedding", data);
}
export function addBeddingProduct(item: BeddingProduct): void {
  saveBeddingProducts([...getBeddingProducts(), item]);
}
export function updateBeddingProduct(id: string, updated: BeddingProduct): void {
  saveBeddingProducts(getBeddingProducts().map((p) => p.id === id ? updated : p));
}
export function deleteBeddingProduct(id: string): void {
  saveBeddingProducts(getBeddingProducts().filter((p) => p.id !== id));
}

// ─── Admin aliases ────────────────────────────────────────────────────────────

export type SimpleProductRaw = SimpleProduct;
export type BeddingProductRaw = BeddingProduct;

export function addSimpleProduct(cat: SimpleCat, product: SimpleProduct): void {
  if (cat === "pillow") addPillow(product);
  else if (cat === "baby") addBabyProduct(product);
  else if (cat === "lifestyle") addLifestyleProduct(product);
  else addLeisureProduct(product);
}

export function updateSimpleProduct(cat: SimpleCat, updated: SimpleProduct): void {
  if (cat === "pillow") updatePillow(updated.id, updated);
  else if (cat === "baby") updateBabyProduct(updated.id, updated);
  else if (cat === "lifestyle") updateLifestyleProduct(updated.id, updated);
  else updateLeisureProduct(updated.id, updated);
}

export function deleteSimpleProduct(cat: SimpleCat, id: string): void {
  if (cat === "pillow") deletePillow(id);
  else if (cat === "baby") deleteBabyProduct(id);
  else if (cat === "lifestyle") deleteLifestyleProduct(id);
  else deleteLeisureProduct(id);
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export function getTotalSKUCount(): number {
  return getMattresses().length + getToppers().length + getPillows().length +
    getBabyProducts().length + getLifestyleProducts().length +
    getLeisureProducts().length + getBeddingProducts().length;
}

// ─── Shop: individual items (for search) ─────────────────────────────────────

export function getAllShopItems(category?: CategoryKey): ShopItem[] {
  const items: ShopItem[] = [];

  if (!category || category === "mattress") {
    getMattresses().forEach((m, i) => {
      items.push({ id: `mattress-${m.code || i}`, category: "mattress", name: m.displayLabel, shortDesc: `${m.grade} mattress`, description: `${m.grade} foam mattress — ${m.displaySize}`, minPrice: m.price, grade: m.grade });
    });
  }
  if (!category || category === "topper") {
    getToppers().forEach((t, i) => {
      items.push({ id: `topper-${t.code || i}`, category: "topper", name: t.displayLabel, shortDesc: `${t.grade}`, description: `${t.grade} — ${t.displaySize}`, minPrice: t.price, grade: t.grade });
    });
  }
  const addSimples = (prods: SimpleProduct[], cat: CategoryKey) => {
    prods.forEach((p) => items.push({ id: p.id, category: cat, name: p.name, shortDesc: p.shortDesc, description: p.description, image: p.image, minPrice: p.price }));
  };
  if (!category || category === "pillow") addSimples(getPillows(), "pillow");
  if (!category || category === "baby") addSimples(getBabyProducts(), "baby");
  if (!category || category === "lifestyle") addSimples(getLifestyleProducts(), "lifestyle");
  if (!category || category === "leisure") addSimples(getLeisureProducts(), "leisure");
  if (!category || category === "bedding") {
    getBeddingProducts().forEach((p) => {
      const minPrice = Math.min(...p.variants.map((v) => v.price));
      items.push({ id: p.id, category: "bedding", name: p.name, shortDesc: p.shortDesc, description: p.description, image: p.image, minPrice, sizes: p.variants.map((v) => ({ label: v.sizeName, price: v.price })) });
    });
  }
  return items;
}

// ─── Shop: grouped items (for shop grid) ─────────────────────────────────────

export function getGroupedShopItems(): GroupedShopItem[] {
  const items: GroupedShopItem[] = [];

  // Mattresses — group by grade
  const byGrade: Record<string, MattressRaw[]> = {};
  for (const r of getMattresses()) {
    (byGrade[r.grade] ||= []).push(r);
  }
  for (const [grade, raws] of Object.entries(byGrade)) {
    const sorted = raws
      .filter((r) => r.price > 0)
      .sort((a, b) => a.widthInches !== b.widthInches ? a.widthInches - b.widthInches : a.thicknessInches - b.thicknessInches);
    if (!sorted.length) continue;
    const id = grade.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    items.push({
      id,
      category: "mattress",
      categoryLabel: CATEGORY_LABELS.mattress,
      name: `${grade} Mattress`,
      shortDesc: GRADE_SHORT_DESC[grade] ?? `${grade} mattress.`,
      description: GRADE_SHORT_DESC[grade] ?? `${grade} foam mattress by Vitafoam.`,
      image: null,
      minPrice: Math.min(...sorted.map((r) => r.price)),
      grade,
      badgeClass: GRADE_BADGE[grade] ?? "bg-gray-100 text-gray-800",
      sizes: sorted.map((r) => ({ label: r.displaySize, L: r.lengthInches, W: r.widthInches, T: r.thicknessInches, price: r.price })),
    });
  }

  // Toppers — grouped as one product
  const toppers = getToppers().filter((t) => t.price > 0)
    .sort((a, b) => a.widthInches !== b.widthInches ? a.widthInches - b.widthInches : a.thicknessInches - b.thicknessInches);
  if (toppers.length) {
    const topperImg = toppers.find((t) => t.image)?.image ?? null;
    items.push({
      id: "memory-topper",
      category: "topper",
      categoryLabel: CATEGORY_LABELS.topper,
      name: "Vitafoam Memory Topper",
      shortDesc: GRADE_SHORT_DESC["Memory Topper"],
      description: "Premium memory foam topper that molds to your body shape, reducing pressure points and transforming your existing mattress into a luxury sleep surface.",
      image: topperImg,
      minPrice: Math.min(...toppers.map((t) => t.price)),
      grade: "Memory Topper",
      badgeClass: GRADE_BADGE["Memory Topper"],
      sizes: toppers.map((t) => ({ label: t.displaySize, L: t.lengthInches, W: t.widthInches, T: t.thicknessInches, price: t.price })),
    });
  }

  // Simple products
  const addSimples = (prods: SimpleProduct[], cat: "pillow" | "baby" | "lifestyle" | "leisure") => {
    for (const p of prods) {
      items.push({
        id: p.id,
        category: cat,
        categoryLabel: CATEGORY_LABELS[cat],
        name: p.name,
        shortDesc: p.shortDesc,
        description: p.description,
        image: p.image,
        minPrice: p.price,
        sizes: [{ label: "Standard", L: 0, W: 0, T: 0, price: p.price }],
      });
    }
  };
  addSimples(getPillows(), "pillow");
  addSimples(getBabyProducts(), "baby");
  addSimples(getLifestyleProducts(), "lifestyle");
  addSimples(getLeisureProducts(), "leisure");

  // Bedding
  for (const p of getBeddingProducts()) {
    const sorted = [...p.variants].sort((a, b) => a.W - b.W);
    if (!sorted.length) continue;
    items.push({
      id: p.id,
      category: "bedding",
      categoryLabel: CATEGORY_LABELS.bedding,
      name: p.name,
      shortDesc: p.shortDesc,
      description: p.description,
      image: p.image,
      minPrice: Math.min(...sorted.map((v) => v.price)),
      sizes: sorted.map((v) => ({ label: v.sizeName, L: v.L, W: v.W, T: 0, price: v.price })),
    });
  }

  return items;
}
