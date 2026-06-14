import mattressesData from "@/data/mattresses.json";
import toppersData from "@/data/toppers.json";
import pillowsData from "@/data/pillows.json";
import babyData from "@/data/baby.json";
import lifestyleData from "@/data/lifestyle.json";
import leisureData from "@/data/leisure.json";
import beddingData from "@/data/bedding.json";

export type CategoryKey = "mattress" | "topper" | "pillow" | "baby" | "lifestyle" | "leisure" | "bedding";

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

// Mattresses
export function getMattresses(): MattressRaw[] {
  return loadFromStorage<MattressRaw>(STORAGE_KEYS.mattress, (mattressesData as { products: MattressRaw[] }).products);
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

export function getTotalSKUCount(): number {
  return getMattresses().length + getToppers().length + getPillows().length +
    getBabyProducts().length + getLifestyleProducts().length +
    getLeisureProducts().length + getBeddingProducts().length;
}
