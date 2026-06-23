import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useCatalogReady } from "@/hooks/useCatalog";
import { useSearchParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { formatNaira, GRADE_OPTIONS } from "@/lib/products";
import { getGroupedShopItems, GroupedShopItem, CATEGORY_LABELS, CategoryKey } from "@/lib/catalog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, ChevronDown, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const SHOP_PAGE_SIZE = 24;
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { addToCart } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";

type SortKey = "price-asc" | "price-desc" | "name-asc";

const ALL_CATEGORIES: { key: CategoryKey | "all"; label: string }[] = [
  { key: "all", label: "All Products" },
  { key: "mattress", label: "Mattresses" },
  { key: "topper", label: "Memory Toppers" },
  { key: "pillow", label: "Pillows" },
  { key: "bedding", label: "Bedding" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "leisure", label: "Leisure" },
  { key: "baby", label: "Baby & Mother" },
];

function PriceRangeSlider({
  min, max, low, high, step, onChange,
}: { min: number; max: number; low: number; high: number; step: number; onChange: (lo: number, hi: number) => void }) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 font-semibold">
        {formatNaira(low)} — {formatNaira(high)}
      </p>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200" />
        <div
          className="absolute h-1.5 rounded-full bg-primary"
          style={{ left: `${pct(low)}%`, right: `${100 - pct(high)}%` }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={low}
          onChange={(e) => { const v = Number(e.target.value); if (v < high) onChange(v, high); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: low > min + (max - min) * 0.9 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={high}
          onChange={(e) => { const v = Number(e.target.value); if (v > low) onChange(low, v); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        <div className="absolute w-4 h-4 rounded-full bg-white border-2 border-primary shadow pointer-events-none" style={{ left: `calc(${pct(low)}% - 8px)` }} />
        <div className="absolute w-4 h-4 rounded-full bg-white border-2 border-primary shadow pointer-events-none" style={{ left: `calc(${pct(high)}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400">
        <span>{formatNaira(min)}</span>
        <span>{formatNaira(max)}</span>
      </div>
    </div>
  );
}

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-sm font-bold text-gray-900 uppercase tracking-wide"
      >
        {title}
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

function ShopItemCard({ item }: { item: GroupedShopItem }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sortedSizes = [...item.sizes].sort((a, b) =>
    a.L !== b.L ? a.L - b.L : a.W !== b.W ? a.W - b.W : a.T - b.T
  );
  const selected = sortedSizes[selectedIdx] ?? sortedSizes[0];
  const isMattress = item.category === "mattress";

  const handleAdd = () => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        shortDesc: item.shortDesc,
        description: item.description,
        grade: (item.grade ?? item.categoryLabel) as any,
        badgeClass: item.badgeClass ?? "",
        sizes: sortedSizes.map((s) => ({ size: s.label, L: s.L, W: s.W, T: s.T, price: s.price })),
        image: item.image ?? undefined,
      },
      { size: selected?.label ?? "", L: selected?.L ?? 0, W: selected?.W ?? 0, T: selected?.T ?? 0, price: selected?.price ?? 0 },
      1
    );
    toast({ title: "Added to cart", description: item.name });
    setShowModal(false);
  };

  return (
    <>
      <div className="group border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
        <div className="relative overflow-hidden bg-gray-50 aspect-square flex items-center justify-center p-4 rounded-t-2xl">
          {item.image ? (
            <img src={item.image} alt={item.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <svg viewBox="0 0 200 120" className="w-2/3 opacity-40" fill="currentColor">
                <rect x="10" y="30" width="180" height="60" rx="8" />
                <rect x="20" y="20" width="160" height="15" rx="4" />
                <rect x="20" y="85" width="160" height="15" rx="4" />
              </svg>
            </div>
          )}
          {!isMattress && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-end justify-center pb-4">
              <button
                onClick={() => setShowModal(true)}
                className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 bg-white text-gray-900 text-xs font-bold px-5 py-2 rounded-xl shadow-lg hover:bg-primary hover:text-white"
              >
                QUICK VIEW
              </button>
            </div>
          )}
        </div>
        <div className="p-2 sm:p-4 border-t border-gray-100">
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide mb-1">{item.categoryLabel}</p>
          {item.grade && item.badgeClass && (
            <span className={`inline-block text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-xl mb-1 sm:mb-1.5 ${item.badgeClass}`}>{item.grade}</span>
          )}
          <h3 className="font-display text-sm sm:text-base font-bold text-gray-900 mb-1 line-clamp-2">
            {isMattress ? (
              <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">{item.name}</Link>
            ) : item.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-2">{item.shortDesc}</p>
          <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
            {item.sizes.length > 1 ? "FROM " : ""}<span className="font-bold text-gray-900">{formatNaira(item.minPrice)}</span>
          </p>
          {isMattress ? (
            <Link
              to={`/product/${item.id}`}
              className="block w-full text-center bg-[#1a1a1a] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary transition-colors uppercase tracking-wide"
            >
              SELECT OPTIONS
            </Link>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="block w-full text-center bg-[#1a1a1a] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary transition-colors uppercase tracking-wide"
            >
              {item.sizes.length > 1 ? "SELECT OPTIONS" : "ADD TO CART"}
            </button>
          )}
        </div>
      </div>

      {showModal && !isMattress && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-white rounded-t-2xl sm:rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 z-10">
              <span className="text-gray-600 text-sm font-bold">✕</span>
            </button>
            <div className="grid sm:grid-cols-2 gap-0">
              <div className="bg-gray-50 flex items-center justify-center p-6 sm:p-8 rounded-t-2xl sm:rounded-l-xl sm:rounded-tr-none min-h-[200px] sm:min-h-[260px]">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="max-h-52 w-full object-contain" />
                ) : (
                  <div className="text-gray-200 w-full flex items-center justify-center">
                    <svg viewBox="0 0 200 120" className="w-2/3 opacity-40" fill="currentColor">
                      <rect x="10" y="30" width="180" height="60" rx="8" />
                      <rect x="20" y="20" width="160" height="15" rx="4" />
                      <rect x="20" y="85" width="160" height="15" rx="4" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.categoryLabel}</p>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.shortDesc}</p>
                {item.sizes.length > 1 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1.5 uppercase tracking-wide font-semibold">Size</p>
                    <select
                      value={selectedIdx}
                      onChange={(e) => setSelectedIdx(Number(e.target.value))}
                      className="w-full h-10 border border-gray-300 rounded-xl px-3 text-sm focus:outline-none focus:border-primary"
                    >
                      {sortedSizes.map((s, i) => (
                        <option key={i} value={i}>{s.label} — {formatNaira(s.price)}</option>
                      ))}
                    </select>
                  </div>
                )}
                <p className="text-2xl font-bold text-primary mb-5">{formatNaira(selected?.price ?? item.minPrice)}</p>
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 w-full h-11 bg-[#1a1a1a] text-white text-sm font-bold rounded-xl hover:bg-primary transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" /> ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ShopPagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / SHOP_PAGE_SIZE));
  if (pages <= 1) return null;
  const from = (page - 1) * SHOP_PAGE_SIZE + 1;
  const to = Math.min(page * SHOP_PAGE_SIZE, total);
  const pageNums = Array.from({ length: pages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1)
    .reduce<(number | "…")[]>((acc, p, i, arr) => {
      if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-10 pt-6 border-t border-gray-200">
      <p className="text-sm text-gray-500">Showing {from}–{to} of {total} products</p>
      <div className="flex items-center gap-1.5">
        <button onClick={() => { onChange(page - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={page === 1}
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pageNums.map((p, i) =>
          p === "…" ? <span key={`e${i}`} className="px-1 text-sm text-gray-400">…</span> : (
            <button key={p} onClick={() => { onChange(p as number); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`h-9 min-w-9 px-2.5 rounded-xl text-sm font-semibold border transition-colors ${page === p ? "bg-primary text-white border-primary" : "border-gray-300 hover:bg-gray-50 text-gray-700"}`}>
              {p}
            </button>
          )
        )}
        <button onClick={() => { onChange(page + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={page === pages}
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const Shop = () => {
  const catalogTick = useCatalogReady();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = (searchParams.get("category") || "all") as CategoryKey | "all";
  const gradeParam = searchParams.get("grade") || "";

  const all = useMemo(() => getGroupedShopItems(), [catalogTick]);

  const priceRange = useMemo(() => {
    let min = Infinity, max = 0;
    all.forEach((p) => { if (p.minPrice < min) min = p.minPrice; if (p.minPrice > max) max = p.minPrice; });
    return { min: min === Infinity ? 0 : min, max };
  }, [all]);

  const [selectedGrades, setSelectedGrades] = useState<Set<string>>(
    () => gradeParam ? new Set([gradeParam]) : new Set()
  );
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [page, setPage] = useState(1);

  const effectiveLow = priceMin ?? priceRange.min;
  const effectiveHigh = priceMax ?? priceRange.max;

  const filtered = useMemo(() => {
    let list = all.filter((p) => {
      if (categoryParam !== "all" && p.category !== categoryParam) return false;
      if (selectedGrades.size > 0 && p.grade && !selectedGrades.has(p.grade)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !(p.grade ?? "").toLowerCase().includes(q) && !p.shortDesc.toLowerCase().includes(q)) return false;
      }
      if (priceMin !== null && p.minPrice < priceMin) return false;
      if (priceMax !== null && p.minPrice > priceMax) return false;
      return true;
    });
    list.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return sort === "price-asc" ? a.minPrice - b.minPrice : b.minPrice - a.minPrice;
    });
    return list;
  }, [all, categoryParam, selectedGrades, priceMin, priceMax, sort, searchQuery]);

  const toggleGrade = (g: string) => {
    const next = new Set(selectedGrades);
    next.has(g) ? next.delete(g) : next.add(g);
    setSelectedGrades(next);
  };

  const setCategory = (cat: CategoryKey | "all") => {
    const next = new URLSearchParams(searchParams);
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    next.delete("grade");
    next.delete("search");
    setSelectedGrades(new Set());
    setSearchParams(next);
  };

  const clearAll = () => { setSelectedGrades(new Set()); setPriceMin(null); setPriceMax(null); setPage(1); };

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1); }, [categoryParam, searchQuery, sort, selectedGrades, priceMin, priceMax]);

  const paginated = useMemo(() => filtered.slice((page - 1) * SHOP_PAGE_SIZE, page * SHOP_PAGE_SIZE), [filtered, page]);

  const showGradeFilter = categoryParam === "mattress" || categoryParam === "all";

  const FilterPanel = () => (
    <div>
      <AccordionSection title="Category" defaultOpen>
        <ul className="space-y-1">
          {ALL_CATEGORIES.map((c) => (
            <li key={c.key}>
              <button
                onClick={() => setCategory(c.key)}
                className={`block w-full text-left text-sm py-0.5 transition-colors ${categoryParam === c.key ? "text-primary font-semibold" : "text-gray-600 hover:text-primary"}`}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </AccordionSection>

      {showGradeFilter && (
        <AccordionSection title="Filter by Grade" defaultOpen>
          <div className="space-y-2">
            {GRADE_OPTIONS.map((g) => (
              <label key={g} className="flex items-center gap-3 cursor-pointer text-sm py-0.5">
                <input
                  type="checkbox"
                  checked={selectedGrades.has(g)}
                  onChange={() => toggleGrade(g)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-gray-600">{g}</span>
              </label>
            ))}
          </div>
        </AccordionSection>
      )}

      <AccordionSection title="Filter by Price" defaultOpen>
        <PriceRangeSlider
          min={priceRange.min}
          max={priceRange.max}
          low={effectiveLow}
          high={effectiveHigh}
          step={5000}
          onChange={(lo, hi) => { setPriceMin(lo > priceRange.min ? lo : null); setPriceMax(hi < priceRange.max ? hi : null); }}
        />
      </AccordionSection>

      {(selectedGrades.size > 0 || priceMin !== null || priceMax !== null) && (
        <button
          onClick={clearAll}
          className="mt-3 w-full text-xs bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors font-semibold uppercase tracking-wide"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  const pageTitle = searchQuery
    ? `Search: "${searchQuery}"`
    : categoryParam !== "all"
    ? CATEGORY_LABELS[categoryParam]
    : "Shop All Products";

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Buy Vitafoam Mattresses in Lagos & Ogun State | Shop Online</title>
        <meta name="description" content="Shop genuine Vitafoam mattresses, toppers, pillows, bedding and lifestyle products. Serving Lagos and Ogun State. Free delivery for orders ₦50,000+." />
        <meta name="keywords" content="buy vitafoam mattress Lagos, vitafoam mattress price Nigeria, vitafoam Ogun State, vitafoam corona mattress, vitafoam grand mattress, vitafoam deluxe mattress, mattress Lagos" />
        <meta property="og:title" content="Buy Vitafoam Mattresses in Lagos & Ogun State | Shop Online" />
        <meta property="og:description" content="Shop genuine Vitafoam mattresses, toppers, pillows, bedding and lifestyle products. Serving Lagos and Ogun State. Free delivery for orders ₦50,000+." />
        <meta property="og:url" content="https://vitafoammattress.com/shop" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy Vitafoam Mattresses in Lagos & Ogun State | Shop Online" />
        <meta name="twitter:description" content="Shop genuine Vitafoam mattresses, toppers, pillows, bedding and lifestyle products. Serving Lagos and Ogun State. Free delivery for orders ₦50,000+." />
        <link rel="canonical" href="https://vitafoammattress.com/shop" />
      </Helmet>
      <SiteHeader />

      <section className="bg-primary text-white py-8">
        <div className="container mx-auto container-px">
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold">{pageTitle}</h1>
          <p className="mt-2 text-white/70 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            {" / "}
            <span>{categoryParam !== "all" ? CATEGORY_LABELS[categoryParam] : "Shop"}</span>
          </p>
        </div>
      </section>

      <section className="py-10 flex-1 bg-white">
        <div className="container mx-auto container-px grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <div className="border border-gray-200 rounded-xl p-4">
                <FilterPanel />
              </div>
              <div className="mt-6 bg-primary text-white rounded-lg p-5">
                <h3 className="font-bold text-sm uppercase mb-2">Delivery Information</h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Free delivery within Lagos metropolis for orders of <strong>₦50,000</strong> and above (excludes Badagry, Ikorodu, Epe, Ibeju-Lekki).
                </p>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden h-10 text-sm flex-shrink-0">
                      <Filter className="h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader><SheetTitle className="text-xl font-bold">Filters</SheetTitle></SheetHeader>
                    <div className="mt-6 overflow-y-auto px-1"><FilterPanel /></div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-gray-500">{filtered.length} {filtered.length === 1 ? "product" : "products"}{filtered.length > SHOP_PAGE_SIZE ? ` · page ${page} of ${Math.ceil(filtered.length / SHOP_PAGE_SIZE)}` : ""}</p>
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-full sm:w-48 h-10 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Default sorting</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded-xl p-16 text-center">
                <p className="font-bold text-xl text-gray-700">No products match your filters</p>
                <p className="mt-2 text-gray-500 text-sm">Try clearing some filters to see more options.</p>
                {(selectedGrades.size > 0 || priceMin !== null || priceMax !== null) && (
                  <button onClick={clearAll} className="mt-4 text-sm text-primary font-semibold underline">Clear all filters</button>
                )}
              </div>
            ) : (
              <>
                <div className="grid gap-3 sm:gap-5 grid-cols-2 xl:grid-cols-3">
                  {paginated.map((item) => <ShopItemCard key={item.id} item={item} />)}
                </div>
                <ShopPagination page={page} total={filtered.length} onChange={setPage} />
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Shop;
