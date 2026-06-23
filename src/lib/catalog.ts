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
  Deluxe:
    "The ideal starting point for quality sleep without compromise. Vitafoam's Deluxe grade delivers reliable everyday comfort at an accessible price point, making restful nights available to every household. Crafted with consistent foam density, it holds its shape night after night.",
  Shine:
    "A step up in comfort where improved foam layering meets long-lasting resilience. The Shine grade is built for sleepers who want a noticeably better night's rest without moving into premium territory. Its reinforced construction resists sagging and maintains even support across the full sleeping surface.",
  Corona:
    "Nigeria's most trusted mattress grade, chosen by millions for its winning balance of comfort and value. The Corona sits at the heart of the Vitafoam range, offering mid-premium foam quality refined through decades of local feedback. It adapts to a wide range of body types and sleeping positions with consistent, dependable support.",
  Grand:
    "Engineered for those who refuse to settle, the Grand grade combines high-density foam with precision construction for support that lasts years, not months. Every layer is selected to distribute body weight evenly and reduce pressure on joints throughout the night. This is high-end comfort built around the demands of everyday Nigerian life.",
  Sizzler:
    "Sink into exceptional softness with the Sizzler, Vitafoam's ultra-plush premium grade designed for sleepers who crave a cloud-like feel. Its specially formulated soft-touch foam cradles the body and melts away the tension of the day. Indulgent without sacrificing structure, the Sizzler delivers a deeply satisfying sleep experience every single night.",
  "Vita Haven":
    "Developed with your spinal health in mind, the Vita Haven delivers certified orthopaedic-grade support that promotes proper alignment from head to toe. Its firm, structured foam core prevents the deep sinkage that strains the lower back, while a comfort layer softens the surface for restful, posture-safe sleep. A genuine investment in long-term health and wellbeing.",
  Supreme:
    "The pinnacle of Vitafoam craftsmanship, the Supreme grade is reserved for those who demand the very best. Layers of premium high-resilience foam are combined with meticulous finishing to create a sleep surface that feels as refined as it performs. Every detail, from edge support to surface texture, reflects a commitment to luxury without compromise.",
  "Vita Galaxy Classic":
    "Powered by advanced multi-zone foam technology, the Vita Galaxy Classic maps distinct comfort zones across the mattress to match the different pressure needs of your shoulders, back, and legs. The result is a sleep surface that feels precisely tailored to your body, reducing tossing and turning through the night. Innovative engineering meets everyday sleeping comfort.",
  "Galaxy Orthopaedic":
    "Designed in line with orthopaedic standards, the Galaxy Orthopaedic provides medical-grade spinal support for sleepers with back concerns or those who simply prioritise posture. Its high-density core resists compression over time, maintaining therapeutic firmness across the full lifespan of the mattress. Serious support, night after night, year after year.",
  "Vita Spring Flex":
    "The Vita Spring Flex pairs a responsive spring system with premium foam layers for a sleep surface that moves with you. The flexible comfort response adapts naturally to shifting sleeping positions, providing cushioned support without the rigid feel of a purely firm mattress. Ideal for those who want the bounce and breathability of springs alongside the body-hugging comfort of foam.",
  "Vita Spring Firm":
    "Combining the structural integrity of a spring core with the therapeutic benefits of firm orthopaedic foam, the Vita Spring Firm is built for sleepers who need consistent, non-negotiable support. The innerspring layer promotes airflow and reduces heat retention while the top foam delivers the firm, corrective surface recommended for back health. A hybrid solution engineered for serious sleepers.",
  "Twill Single":
    "The Twill Single brings durable, hardwearing comfort to individual sleepers in a compact, easy-to-manage size. Its heavy-duty twill cover resists wear and maintains a clean appearance through years of regular use, while the foam core beneath provides reliable everyday support. Built for guest rooms, student accommodation, and children's bedrooms that need to stand the test of time.",
  "Twill Double":
    "Offering the same rugged twill-cover construction in a generous double size, the Twill Double is made for couples and those who like room to stretch. The reinforced cover stands up to the rigours of daily use without pilling or losing its neat finish, while the foam interior maintains consistent support across the wider sleeping surface. Practical, durable, and built to last.",
  Vitaluxe:
    "Ultra-luxury foam meets impeccable finishing in the Vitaluxe, Vitafoam's most opulent standard grade. Layers of premium-grade foam are precisely calibrated to deliver a sleep surface that feels sumptuous from the very first night, with a resilience that preserves that feeling for years. For those who consider their bed the centrepiece of their home, the Vitaluxe is the natural choice.",
  Vitahelix:
    "At the heart of the Vitahelix lies an innovative helix-core foam structure that distributes pressure more evenly than conventional foam designs. This unique architecture reduces peak pressure points at the shoulders and hips, allowing muscles to fully relax and promoting deeper, more restorative sleep. A thoughtfully engineered mattress for sleepers who wake up with aches they are ready to leave behind.",
  "Memory Topper":
    "Instantly upgrade your existing mattress with the Vitafoam Memory Topper, a premium memory foam layer that conforms precisely to your body's contours. It absorbs movement and reduces pressure across the full sleep surface, transforming even an ageing mattress into something noticeably more comfortable. A cost-effective way to experience the benefits of memory foam without replacing your entire bed.",
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
  gradeImages: Record<string, string | null>;
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
  mattresses: { lastUpdated: null, uploadedFileName: null, totalProducts: 0, products: [], gradeImages: {} },
  toppers: [],
  pillows: [],
  baby: [],
  lifestyle: [],
  leisure: [],
  bedding: [],
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

export let catalogLoaded = false;
let inflightFetch: Promise<void> | null = null;

// Load everything from Supabase once and update cache
export function initCatalog(): Promise<void> {
  // If data is already in cache, notify any newly-registered listeners immediately
  if (catalogLoaded) {
    dispatch();
    return Promise.resolve();
  }
  // Deduplicate concurrent calls — return the same promise to all callers
  if (inflightFetch) return inflightFetch;

  inflightFetch = (async () => {
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
        catalogLoaded = true;
      }
    } catch (e) {
      console.warn("[catalog] Could not load from Supabase:", e);
    } finally {
      inflightFetch = null;
    }
    dispatch();
  })();

  return inflightFetch;
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

export function getGradeImages(): Record<string, string | null> {
  return cache.mattresses.gradeImages ?? {};
}

export function setGradeImage(grade: string, url: string | null): void {
  saveMattressCatalog({
    ...cache.mattresses,
    gradeImages: { ...(cache.mattresses.gradeImages ?? {}), [grade]: url },
  });
}

export function resetMattressCatalog(): void {
  cache.mattresses = { lastUpdated: null, uploadedFileName: null, totalProducts: 0, products: [], gradeImages: {} };
  dispatch();
  persist("mattresses", cache.mattresses);
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
      image: cache.mattresses.gradeImages?.[grade] ?? null,
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
