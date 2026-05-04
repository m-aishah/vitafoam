import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.jpg";
import { adminLogout, isAdminAuthed } from "@/lib/admin";
import { getProducts, saveProducts, formatNaira, formatSize, Product } from "@/lib/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { LogOut, Package, Layers, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  const [authed] = useState(() => isAdminAuthed());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { setProducts(getProducts()); }, []);

  const stats = useMemo(() => {
    const totalSizes = products.reduce((s, p) => s + p.sizes.length, 0);
    const allPrices = products.flatMap(p => p.sizes.map(s => s.price));
    const avg = allPrices.length ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : 0;
    return { grades: products.length, totalSizes, avg };
  }, [products]);

  if (!authed) return <Navigate to="/admin/login" replace />;

  const updatePrice = (pid: string, sizeKey: string, value: string) => {
    const num = parseFloat(value.replace(/,/g, ""));
    if (isNaN(num) || num < 0) return;
    setProducts((prev) => {
      const next = prev.map((p) => p.id !== pid ? p : ({
        ...p,
        sizes: p.sizes.map((s) => s.size === sizeKey ? { ...s, price: num } : s).sort((a, b) => a.price - b.price),
      }));
      saveProducts(next);
      return next;
    });
  };

  const handleSave = () => {
    saveProducts(products);
    toast({ title: "Saved", description: "Catalog changes have been saved." });
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto container-px flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 rounded-md bg-white p-1" />
            <div>
              <div className="font-display text-lg font-bold">Admin Console</div>
              <div className="text-[11px] tracking-wider uppercase text-primary-foreground/60">Multibiz.global Venture</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="heroOutline" size="sm" className="h-10"><Link to="/">View Site</Link></Button>
            <Button onClick={() => { adminLogout(); window.location.href = "/admin/login"; }} variant="hero" size="sm" className="h-10">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto container-px py-10">
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {[
            { icon: Package, label: "Grades", value: stats.grades },
            { icon: Layers, label: "Total SKUs", value: stats.totalSizes },
            { icon: DollarSign, label: "Avg. Price", value: formatNaira(stats.avg) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></div>
              <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">Catalog & Pricing</h2>
              <p className="text-sm text-muted-foreground">Update prices per size. Changes save automatically.</p>
            </div>
            <Button variant="navy" onClick={handleSave}>Save All</Button>
          </div>

          <Accordion type="multiple" className="w-full">
            {products.map((p) => (
              <AccordionItem key={p.id} value={p.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.badgeClass}`}>{p.grade}</span>
                    <span className="font-display text-lg text-primary">{p.name}</span>
                    <span className="text-xs text-muted-foreground">({p.sizes.length} sizes)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                          <th className="py-2">Size</th>
                          <th className="py-2">Dimensions (in)</th>
                          <th className="py-2">Price (₦)</th>
                          <th className="py-2">Display</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.sizes.map((s) => (
                          <tr key={s.size} className="border-b border-border/60">
                            <td className="py-3 font-medium text-primary">{formatSize(s)}</td>
                            <td className="py-3 text-muted-foreground">{s.L} × {s.W} × {s.T}"</td>
                            <td className="py-3">
                              <Input
                                type="number"
                                step="0.01"
                                defaultValue={s.price}
                                onBlur={(e) => updatePrice(p.id, s.size, e.target.value)}
                                className="h-9 w-36"
                              />
                            </td>
                            <td className="py-3 font-semibold text-primary">{formatNaira(s.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
