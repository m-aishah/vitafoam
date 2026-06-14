import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts, GRADE_OPTIONS, GradeKey, formatNaira } from "@/lib/products";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, ChevronDown } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type SortKey = "price-asc" | "price-desc" | "name-asc";

const PRODUCT_CATEGORIES = ["Mattress", "Pillow", "Bedding", "Lifestyle", "Mother & Child", "Furniture"];

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
        {/* Track background */}
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200" />
        {/* Active track */}
        <div
          className="absolute h-1.5 rounded-full bg-primary"
          style={{ left: `${pct(low)}%`, right: `${100 - pct(high)}%` }}
        />
        {/* Min handle */}
        <input
          type="range"
          min={min} max={max} step={step} value={low}
          onChange={(e) => { const v = Number(e.target.value); if (v < high) onChange(v, high); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: low > min + (max - min) * 0.9 ? 5 : 3 }}
        />
        {/* Max handle */}
        <input
          type="range"
          min={min} max={max} step={step} value={high}
          onChange={(e) => { const v = Number(e.target.value); if (v > low) onChange(low, v); }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        {/* Visual handles */}
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

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const all = useMemo(() => getProducts(), []);

  const priceRange = useMemo(() => {
    let min = Infinity, max = 0;
    all.forEach((p) => p.sizes.forEach((s) => { if (s.price < min) min = s.price; if (s.price > max) max = s.price; }));
    return { min: min === Infinity ? 0 : min, max };
  }, [all]);

  const [grades, setGrades] = useState<Set<GradeKey>>(new Set());
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("price-asc");

  const effectiveLow = priceMin ?? priceRange.min;
  const effectiveMax = priceMax ?? priceRange.max;

  const filtered = useMemo(() => {
    let list = all.filter((p) => {
      if (grades.size > 0 && !grades.has(p.grade)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.grade.toLowerCase().includes(q) && !p.shortDesc.toLowerCase().includes(q)) return false;
      }
      const lowestPrice = Math.min(...p.sizes.map((s) => s.price));
      if (priceMin !== null && lowestPrice < priceMin) return false;
      if (priceMax !== null && lowestPrice > priceMax) return false;
      return true;
    });
    list.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      const ap = a.sizes[0]?.price ?? 0;
      const bp = b.sizes[0]?.price ?? 0;
      return sort === "price-asc" ? ap - bp : bp - ap;
    });
    return list;
  }, [all, grades, priceMin, priceMax, sort, searchQuery]);

  const toggleGrade = (g: GradeKey) => {
    const next = new Set(grades);
    next.has(g) ? next.delete(g) : next.add(g);
    setGrades(next);
  };

  const clearAll = () => { setGrades(new Set()); setPriceMin(null); setPriceMax(null); };

  const FilterPanel = () => (
    <div>
      <AccordionSection title="Categories" defaultOpen>
        <ul className="space-y-1">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                to="/shop"
                className="block text-sm text-gray-600 hover:text-primary transition-colors py-0.5"
              >
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionSection>

      <AccordionSection title="Filter by Grade" defaultOpen>
        <div className="space-y-2">
          {GRADE_OPTIONS.map((g) => (
            <label key={g} className="flex items-center gap-3 cursor-pointer text-sm py-0.5">
              <input
                type="checkbox"
                checked={grades.has(g)}
                onChange={() => toggleGrade(g)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-gray-600">{g}</span>
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Filter by Price" defaultOpen>
        <PriceRangeSlider
          min={priceRange.min}
          max={priceRange.max}
          low={effectiveLow}
          high={effectiveMax}
          step={5000}
          onChange={(lo, hi) => { setPriceMin(lo > priceRange.min ? lo : null); setPriceMax(hi < priceRange.max ? hi : null); }}
        />
      </AccordionSection>

      {(grades.size > 0 || priceMin !== null || priceMax !== null) && (
        <button
          onClick={clearAll}
          className="mt-3 w-full text-xs bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors font-semibold uppercase tracking-wide"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Page banner */}
      <section className="bg-primary text-white py-8">
        <div className="container mx-auto container-px">
          <h1 className="font-display text-3xl lg:text-4xl font-bold">
            {searchQuery ? `Search: "${searchQuery}"` : "Shop Vitafoam Mattresses"}
          </h1>
          <p className="mt-2 text-white/70 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            {" / "}
            <span>{searchQuery ? "Search Results" : "Mattress"}</span>
          </p>
        </div>
      </section>

      <section className="py-10 flex-1 bg-white">
        <div className="container mx-auto container-px grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <div className="border border-gray-200 rounded p-4">
                <FilterPanel />
              </div>

              {/* Delivery info card */}
              <div className="mt-6 bg-primary text-white rounded-lg p-5">
                <h3 className="font-bold text-sm uppercase mb-2">Delivery Information</h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Free delivery within Lagos metropolis for orders of <strong>₦50,000</strong> and above (excludes Badagry, Ikorodu, Epe, Ibeju-Lekki).
                </p>
              </div>
            </div>
          </aside>

          <div>
            {/* Sort bar */}
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden h-10 text-sm">
                      <Filter className="h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader><SheetTitle className="text-xl font-bold">Filters</SheetTitle></SheetHeader>
                    <div className="mt-6 overflow-y-auto px-1"><FilterPanel /></div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-gray-500">{filtered.length} {filtered.length === 1 ? "product" : "products"}</p>
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[200px] h-10 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Default sorting</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="border border-dashed border-gray-300 rounded p-16 text-center">
                <p className="font-bold text-xl text-gray-700">No mattresses match your filters</p>
                <p className="mt-2 text-gray-500 text-sm">Try clearing some filters to see more options.</p>
                {(grades.size > 0 || priceMin !== null || priceMax !== null) && (
                  <button onClick={clearAll} className="mt-4 text-sm text-primary font-semibold underline">Clear all filters</button>
                )}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Shop;
