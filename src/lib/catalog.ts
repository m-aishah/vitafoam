import mattressesData from "@/data/mattresses.json";
import toppersData from "@/data/toppers.json";
import pillowsData from "@/data/pillows.json";
import babyData from "@/data/baby.json";
import lifestyleData from "@/data/lifestyle.json";
import leisureData from "@/data/leisure.json";
import beddingData from "@/data/bedding.json";

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
}

// Unified ShopItem for the shop page
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

const STORAGE_KEYS: Record<CategoryKey, string> = {
  mattress: "vitafoam_mattresses",
  topper: "vitafoam_toppers",
  pillow: "vitafoam_pillows",
  baby: "vitafoam_baby",
  lifestyle: "vitafoam_lifestyle",
  leisure: "vitafoam_leisure",
  bedding: "vitafoam_bedding",
};

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {}
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

// Mattress catalog (full object with metadata, used by admin + pdfParser)
export interface MattressCatalog {
  lastUpdated: string | null;
  uploadedFileName: string | null;
  totalProducts: number;
  products: MattressRaw[];
}

export function getMattressCatalog(): MattressCatalog {
  if (typeof window === "undefined") return mattressesData as MattressCatalog;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.mattress + "_catalog");
    if (raw) return JSON.parse(raw) as MattressCatalog;
  } catch {}
  return mattressesData as MattressCatalog;
}

export function saveMattressCatalog(cat: MattressCatalog): void {
  localStorage.setItem(STORAGE_KEYS.mattress + "_catalog", JSON.stringify(cat));
  saveToStorage(STORAGE_KEYS.mattress, cat.products);
  window.dispatchEvent(new Event("mbg-catalog-changed"));
}

export function resetMattressCatalog(): void {
  localStorage.removeItem(STORAGE_KEYS.mattress + "_catalog");
  localStorage.removeItem(STORAGE_KEYS.mattress);
  window.dispatchEvent(new Event("mbg-catalog-changed"));
}

export function isUsingMattressSeed(): boolean {
  if (typeof window === "undefined") return true;
  return !localStorage.getItem(STORAGE_KEYS.mattress + "_catalog");
}

// Mattresses
export function getMattresses(): MattressRaw[] {
  return getMattressCatalog().products;
}
export function saveMattresses(data: MattressRaw[]): void {
  saveToStorage(STORAGE_KEYS.mattress, data);
}
export function updateMattress(index: number, updated: MattressRaw): void {
  const items = getMattresses();
  items[index] = updated;
  saveMattresses(items);
}
export function deleteMattress(index: number): void {
  const items = getMattresses();
  items.splice(index, 1);
  saveMattresses(items);
}

// Toppers
export function getToppers(): TopperRaw[] {
  return loadFromStorage<TopperRaw>(STORAGE_KEYS.topper, (toppersData as { products: TopperRaw[] }).products);
}
export function saveToppers(data: TopperRaw[]): void {
  saveToStorage(STORAGE_KEYS.topper, data);
}
export function updateTopper(index: number, updated: TopperRaw): void {
  const items = getToppers();
  items[index] = updated;
  saveToppers(items);
}
export function deleteTopper(index: number): void {
  const items = getToppers();
  items.splice(index, 1);
  saveToppers(items);
}

// Pillows
export function getPillows(): SimpleProduct[] {
  return loadFromStorage<SimpleProduct>(STORAGE_KEYS.pillow, (pillowsData as { products: SimpleProduct[] }).products);
}
export function savePillows(data: SimpleProduct[]): void {
  saveToStorage(STORAGE_KEYS.pillow, data);
}
export function updatePillow(id: string, updated: SimpleProduct): void {
  const items = getPillows();
  const idx = items.findIndex(p => p.id === id);
  if (idx >= 0) { items[idx] = updated; savePillows(items); }
}
export function deletePillow(id: string): void {
  savePillows(getPillows().filter(p => p.id !== id));
}
export function addPillow(item: SimpleProduct): void {
  const items = getPillows();
  items.push(item);
  savePillows(items);
}

// Baby
export function getBabyProducts(): SimpleProduct[] {
  return loadFromStorage<SimpleProduct>(STORAGE_KEYS.baby, (babyData as { products: SimpleProduct[] }).products);
}
export function saveBabyProducts(data: SimpleProduct[]): void {
  saveToStorage(STORAGE_KEYS.baby, data);
}
export function updateBabyProduct(id: string, updated: SimpleProduct): void {
  const items = getBabyProducts();
  const idx = items.findIndex(p => p.id === id);
  if (idx >= 0) { items[idx] = updated; saveBabyProducts(items); }
}
export function deleteBabyProduct(id: string): void {
  saveBabyProducts(getBabyProducts().filter(p => p.id !== id));
}
export function addBabyProduct(item: SimpleProduct): void {
  const items = getBabyProducts();
  items.push(item);
  saveBabyProducts(items);
}

// Lifestyle
export function getLifestyleProducts(): SimpleProduct[] {
  return loadFromStorage<SimpleProduct>(STORAGE_KEYS.lifestyle, (lifestyleData as { products: SimpleProduct[] }).products);
}
export function saveLifestyleProducts(data: SimpleProduct[]): void {
  saveToStorage(STORAGE_KEYS.lifestyle, data);
}
export function updateLifestyleProduct(id: string, updated: SimpleProduct): void {
  const items = getLifestyleProducts();
  const idx = items.findIndex(p => p.id === id);
  if (idx >= 0) { items[idx] = updated; saveLifestyleProducts(items); }
}
export function deleteLifestyleProduct(id: string): void {
  saveLifestyleProducts(getLifestyleProducts().filter(p => p.id !== id));
}
export function addLifestyleProduct(item: SimpleProduct): void {
  const items = getLifestyleProducts();
  items.push(item);
  saveLifestyleProducts(items);
}

// Leisure
export function getLeisureProducts(): SimpleProduct[] {
  return loadFromStorage<SimpleProduct>(STORAGE_KEYS.leisure, (leisureData as { products: SimpleProduct[] }).products);
}
export function saveLeisureProducts(data: SimpleProduct[]): void {
  saveToStorage(STORAGE_KEYS.leisure, data);
}
export function updateLeisureProduct(id: string, updated: SimpleProduct): void {
  const items = getLeisureProducts();
  const idx = items.findIndex(p => p.id === id);
  if (idx >= 0) { items[idx] = updated; saveLeisureProducts(items); }
}
export function deleteLeisureProduct(id: string): void {
  saveLeisureProducts(getLeisureProducts().filter(p => p.id !== id));
}
export function addLeisureProduct(item: SimpleProduct): void {
  const items = getLeisureProducts();
  items.push(item);
  saveLeisureProducts(items);
}

// Bedding
export function getBeddingProducts(): BeddingProduct[] {
  return loadFromStorage<BeddingProduct>(STORAGE_KEYS.bedding, (beddingData as { products: BeddingProduct[] }).products);
}
export function saveBeddingProducts(data: BeddingProduct[]): void {
  saveToStorage(STORAGE_KEYS.bedding, data);
}
export function updateBeddingProduct(id: string, updated: BeddingProduct): void {
  const items = getBeddingProducts();
  const idx = items.findIndex(p => p.id === id);
  if (idx >= 0) { items[idx] = updated; saveBeddingProducts(items); }
}
export function deleteBeddingProduct(id: string): void {
  saveBeddingProducts(getBeddingProducts().filter(p => p.id !== id));
}
export function addBeddingProduct(item: BeddingProduct): void {
  const items = getBeddingProducts();
  items.push(item);
  saveBeddingProducts(items);
}

// Unified shop items
export function getAllShopItems(category?: CategoryKey): ShopItem[] {
  const items: ShopItem[] = [];

  const addMattresses = () => {
    getMattresses().forEach((m, i) => {
      items.push({
        id: `mattress-${m.code || i}`,
        category: "mattress",
        name: m.displayLabel,
        shortDesc: `${m.grade} mattress`,
        description: `${m.grade} foam mattress — ${m.displaySize}`,
        minPrice: m.price,
        grade: m.grade,
      });
    });
  };

  const addToppers = () => {
    getToppers().forEach((t, i) => {
      items.push({
        id: `topper-${t.code || i}`,
        category: "topper",
        name: t.displayLabel,
        shortDesc: `${t.grade}`,
        description: `${t.grade} — ${t.displaySize}`,
        minPrice: t.price,
        grade: t.grade,
      });
    });
  };

  const addSimple = (prods: SimpleProduct[], cat: CategoryKey) => {
    prods.forEach(p => {
      items.push({
        id: p.id,
        category: cat,
        name: p.name,
        shortDesc: p.shortDesc,
        description: p.description,
        image: p.image,
        minPrice: p.price,
      });
    });
  };

  const addBedding = () => {
    getBeddingProducts().forEach(p => {
      const minPrice = Math.min(...p.variants.map(v => v.price));
      items.push({
        id: p.id,
        category: "bedding",
        name: p.name,
        shortDesc: p.shortDesc,
        description: p.description,
        image: p.image,
        minPrice,
        sizes: p.variants.map(v => ({ label: v.sizeName, price: v.price })),
      });
    });
  };

  if (!category || category === "mattress") addMattresses();
  if (!category || category === "topper") addToppers();
  if (!category || category === "pillow") addSimple(getPillows(), "pillow");
  if (!category || category === "baby") addSimple(getBabyProducts(), "baby");
  if (!category || category === "lifestyle") addSimple(getLifestyleProducts(), "lifestyle");
  if (!category || category === "leisure") addSimple(getLeisureProducts(), "leisure");
  if (!category || category === "bedding") addBedding();

  return items;
}

// Aliases used by AdminDashboard
export function getTopperProducts(): TopperRaw[] { return getToppers(); }
export function saveTopperProducts(data: TopperRaw[]): void { saveToppers(data); }
export function deleteTopperRaw(code: string): void {
  saveToppers(getToppers().filter((t) => t.code !== code));
}
export function getPillowProducts(): SimpleProduct[] { return getPillows(); }
export function getBabyProductsList(): SimpleProduct[] { return getBabyProducts(); }
export function getLeisureProductsList(): SimpleProduct[] { return getLeisureProducts(); }
export function getLifestyleProductsList(): SimpleProduct[] { return getLifestyleProducts(); }

export type SimpleProductRaw = SimpleProduct;
export type BeddingProductRaw = BeddingProduct;

export function addSimpleProduct(cat: "pillow" | "baby" | "lifestyle" | "leisure", product: SimpleProduct): void {
  if (cat === "pillow") addPillow(product);
  else if (cat === "baby") addBabyProduct(product);
  else if (cat === "lifestyle") addLifestyleProduct(product);
  else addLeisureProduct(product);
}

export function updateSimpleProduct(cat: "pillow" | "baby" | "lifestyle" | "leisure", updated: SimpleProduct): void {
  if (cat === "pillow") updatePillow(updated.id, updated);
  else if (cat === "baby") updateBabyProduct(updated.id, updated);
  else if (cat === "lifestyle") updateLifestyleProduct(updated.id, updated);
  else updateLeisureProduct(updated.id, updated);
}

export function deleteSimpleProduct(cat: "pillow" | "baby" | "lifestyle" | "leisure", id: string): void {
  if (cat === "pillow") deletePillow(id);
  else if (cat === "baby") deleteBabyProduct(id);
  else if (cat === "lifestyle") deleteLifestyleProduct(id);
  else deleteLeisureProduct(id);
}

export function deleteMattressRaw(code: string): void {
  const cat = getMattressCatalog();
  const products = cat.products.filter((p) => p.code !== code);
  saveMattressCatalog({ ...cat, products, totalProducts: products.length });
}

export function updateMattressRaw(updated: MattressRaw): void {
  const cat = getMattressCatalog();
  const products = cat.products.map((p) => p.code === updated.code ? updated : p);
  saveMattressCatalog({ ...cat, products });
}

export function addMattressRaw(raw: MattressRaw): void {
  const cat = getMattressCatalog();
  const products = [...cat.products, raw];
  saveMattressCatalog({ ...cat, products, totalProducts: products.length });
}

export function getTotalSKUCount(): number {
  return getMattresses().length + getToppers().length + getPillows().length +
    getBabyProducts().length + getLifestyleProducts().length +
    getLeisureProducts().length + getBeddingProducts().length;
}

// Grouped shop items — mattresses/toppers are grouped by grade, others are per-product
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

  // Toppers — group as one product with sizes
  const toppers = getToppers().filter((t) => t.price > 0).sort((a, b) => a.price - b.price);
  if (toppers.length) {
    items.push({
      id: "memory-topper",
      category: "topper",
      categoryLabel: CATEGORY_LABELS.topper,
      name: "Vitafoam Memory Topper",
      shortDesc: GRADE_SHORT_DESC["Memory Topper"],
      description: "Premium memory foam topper that molds to your body shape, reducing pressure points and transforming your existing mattress into a luxury sleep surface.",
      image: null,
      minPrice: toppers[0].price,
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
    const sorted = [...p.variants].sort((a, b) => a.price - b.price);
    if (!sorted.length) continue;
    items.push({
      id: p.id,
      category: "bedding",
      categoryLabel: CATEGORY_LABELS.bedding,
      name: p.name,
      shortDesc: p.shortDesc,
      description: p.description,
      image: p.image,
      minPrice: sorted[0].price,
      sizes: sorted.map((v) => ({ label: v.sizeName, L: v.L, W: v.W, T: 0, price: v.price })),
    });
  }

  return items;
}
