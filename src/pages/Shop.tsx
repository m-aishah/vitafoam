import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts, GRADE_OPTIONS, THICKNESS_OPTIONS, GradeKey } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, SlidersHorizontal } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type SortKey = "price-asc" | "price-desc" | "name-asc";

const Shop = () => {
  const all = useMemo(() => getProducts(), []);
  const [grades, setGrades] = useState<Set<GradeKey>>(new Set());
  const [thicknesses, setThicknesses] = useState<Set<number>>(new Set());
  const [sort, setSort] = useState<SortKey>("price-asc");

  const filtered = useMemo(() => {
    let list = all.filter((p) => (grades.size === 0 || grades.has(p.grade)));
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
  }, [all, grades, thicknesses, sort]);

  const toggle = <T,>(set: Set<T>, val: T, setter: (v: Set<T>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-lg font-semibold text-primary">Grade</h3>
        <div className="mt-3 space-y-2.5">
          {GRADE_OPTIONS.map((g) => (
            <label key={g} className="flex items-center gap-3 cursor-pointer text-sm font-body py-1">
              <Checkbox checked={grades.has(g)} onCheckedChange={() => toggle(grades, g, setGrades)} />
              <span className="text-foreground">{g}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-primary">Thickness</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {THICKNESS_OPTIONS.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer text-sm font-body py-1">
              <Checkbox checked={thicknesses.has(t)} onCheckedChange={() => toggle(thicknesses, t, setThicknesses)} />
              <span>{t}"</span>
            </label>
          ))}
        </div>
      </div>
      {(grades.size > 0 || thicknesses.size > 0) && (
        <Button variant="outline" className="w-full" onClick={() => { setGrades(new Set()); setThicknesses(new Set()); }}>
          Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Page header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto container-px">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Catalogue</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold">Shop Vitafoam Mattresses</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">Every grade. Every size. All prices 7.5% VAT inclusive.</p>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto container-px grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 text-primary mb-5">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="font-display text-xl font-semibold">Filters</span>
              </div>
              <FilterPanel />
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden h-11">
                      <Filter className="h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader><SheetTitle className="font-display text-2xl text-primary">Filters</SheetTitle></SheetHeader>
                    <div className="mt-6"><FilterPanel /></div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "product" : "products"}</p>
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[200px] h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A–Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-16 text-center">
                <p className="font-display text-2xl text-primary">No mattresses match your filters</p>
                <p className="mt-2 text-muted-foreground">Try clearing some filters to see more options.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
