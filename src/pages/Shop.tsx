import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts, GRADE_OPTIONS, THICKNESS_OPTIONS, GradeKey } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type SortKey = "price-asc" | "price-desc" | "name-asc";

const WEIGHT_CATS = [
  { label: "All weight Categories", value: "" },
  { label: "Above 100kg", value: "above-100" },
  { label: "Up to 100kg", value: "up-100" },
  { label: "Up to 70kg", value: "up-70" },
  { label: "Under 50kg", value: "under-50" },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const all = useMemo(() => getProducts(), []);
  const [grades, setGrades] = useState<Set<GradeKey>>(new Set());
  const [thicknesses, setThicknesses] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<SortKey>("price-asc");

  const filtered = useMemo(() => {
    let list = all.filter((p) => {
      if (grades.size > 0 && !grades.has(p.grade)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.grade.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q);
      }
      return true;
    });
    if (thicknesses.size > 0) {
      list = list.map((p) => ({ ...p, sizes: p.sizes.filter((s) => thicknesses.has(s.T)) })).filter((p) => p.sizes.length > 0);
    }
    list.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      const ap = a.sizes[0]?.price ?? 0;
      const bp = b.sizes[0]?.price ?? 0;
      return sort === "price-asc" ? ap - bp : bp - ap;
    });
    return list;
  }, [all, grades, thicknesses, sort, searchQuery]);

  const toggle = <T,>(set: Set<T>, val: T, setter: (v: Set<T>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-3">CATEGORIES:</h3>
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center justify-between">
            Mattress <span className="text-gray-400">^</span>
          </h4>
          <ul className="space-y-1.5 pl-2">
            {WEIGHT_CATS.map((cat) => (
              <li key={cat.value}>
                <button className="text-sm text-gray-600 hover:text-primary transition-colors text-left">
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-gray-700">Lifestyle</h4>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold text-sm text-gray-700">Mother & Child</h4>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold text-sm text-gray-700">Furniture</h4>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold text-sm text-gray-700">Bedding</h4>
        </div>
        <div className="mt-2">
          <h4 className="font-semibold text-sm text-gray-700">Pillow</h4>
        </div>
      </div>

      {/* Grade filter */}
      <div className="border-t border-gray-200 pt-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-3">FILTER BY GRADE:</h3>
        <div className="space-y-2">
          {GRADE_OPTIONS.map((g) => (
            <label key={g} className="flex items-center gap-3 cursor-pointer text-sm py-0.5">
              <Checkbox checked={grades.has(g)} onCheckedChange={() => toggle(grades, g, setGrades)} />
              <span className="text-gray-600">{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Thickness filter */}
      <div className="border-t border-gray-200 pt-5">
        <h3 className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-3">FILTER BY PRICE:</h3>
        <div className="grid grid-cols-2 gap-2">
          {THICKNESS_OPTIONS.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={thicknesses.has(t)} onCheckedChange={() => toggle(thicknesses, t, setThicknesses)} />
              <span>{t}" thick</span>
            </label>
          ))}
        </div>
        {(grades.size > 0 || thicknesses.size > 0) && (
          <button
            onClick={() => { setGrades(new Set()); setThicknesses(new Set()); }}
            className="mt-3 text-xs bg-[#1a1a1a] text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors uppercase font-bold"
          >
            FILTER / CLEAR
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Brown page banner */}
      <section className="bg-[#7B3F1A] text-white py-8">
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
        <div className="container mx-auto container-px grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-36">
              <FilterPanel />
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
                    <div className="mt-6 overflow-y-auto"><FilterPanel /></div>
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
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Delivery info box */}
      <section className="py-6 bg-white">
        <div className="container mx-auto container-px">
          <div className="max-w-sm bg-primary text-white rounded-lg p-6">
            <h3 className="font-bold text-base uppercase mb-2">DELIVERY INFORMATION</h3>
            <p className="text-sm text-white/85 leading-relaxed">
              Delivery within Lagos metropolis for orders of <strong>50,000 Naira</strong> and above (this excludes Badagry, Ikorodu, Epe, Ibeju-Lekki) is free.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Shop;
