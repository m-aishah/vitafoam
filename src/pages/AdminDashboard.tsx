import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/vitafoam-logo-1.svg";
import { adminLogout, isAdminAuthed } from "@/lib/admin";
import {
  getCatalog, saveCatalog, resetCatalog, isUsingSeed,
  formatNaira, CatalogFile, RawProduct, GRADE_OPTIONS,
} from "@/lib/products";
import { parsePriceListPdf, formatLastUpdated } from "@/lib/pdfParser";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  LogOut, Package, Layers, DollarSign, Upload, Loader2,
  CheckCircle2, AlertTriangle, XCircle, FileText, RotateCcw,
} from "lucide-react";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; count: number; filename: string; iso: string }
  | { kind: "warn"; message: string }
  | { kind: "error"; message: string };

const AdminDashboard = () => {
  const [authed] = useState(() => isAdminAuthed());
  const [catalog, setCatalog] = useState<CatalogFile>(() => getCatalog());
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [dragOver, setDragOver] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onChange = () => setCatalog(getCatalog());
    window.addEventListener("mbg-catalog-changed", onChange);
    return () => window.removeEventListener("mbg-catalog-changed", onChange);
  }, []);

  const stats = useMemo(() => {
    const grades = new Set(catalog.products.map((p) => p.grade)).size;
    const total = catalog.products.length;
    const avg = total ? catalog.products.reduce((a, b) => a + b.price, 0) / total : 0;
    return { grades, total, avg };
  }, [catalog]);

  const filteredRows = useMemo<RawProduct[]>(() => {
    const rows = gradeFilter === "all"
      ? catalog.products
      : catalog.products.filter((p) => p.grade === gradeFilter);
    return [...rows].sort((a, b) => a.grade.localeCompare(b.grade) || a.price - b.price);
  }, [catalog, gradeFilter]);

  if (!authed) return <Navigate to="/admin/login" replace />;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setStatus({ kind: "error", message: "Please upload a PDF file." });
      return;
    }
    setStatus({ kind: "loading" });
    try {
      const next = await parsePriceListPdf(file);
      if (next.totalProducts === 0) {
        setStatus({
          kind: "warn",
          message: "The PDF was read but no mattress products were found. Please make sure you uploaded the correct Vitafoam Comfort Centre price list.",
        });
        return;
      }
      saveCatalog(next);
      setCatalog(next);
      setStatus({
        kind: "success",
        count: next.totalProducts,
        filename: next.uploadedFileName || file.name,
        iso: next.lastUpdated || new Date().toISOString(),
      });
      toast({ title: "Price list updated", description: `${next.totalProducts} products loaded.` });
    } catch (e) {
      console.error(e);
      setStatus({ kind: "error", message: "Could not read the PDF. Please try again or check the file." });
    }
  };

  const handleReset = () => {
    resetCatalog();
    setCatalog(getCatalog());
    setStatus({ kind: "idle" });
    toast({ title: "Reset complete", description: "Catalog restored to default seed data." });
  };

  const seedMode = isUsingSeed();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto container-px flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Vitafoam" className="h-10 w-auto bg-white rounded px-1" />
            <div>
              <div className="font-display text-lg font-bold">Admin Console</div>
              <div className="text-[11px] tracking-wider uppercase text-primary-foreground/60">Vitafoam Comfort Centre</div>
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

      <main className="container mx-auto container-px py-10 flex-1 space-y-10">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Package, label: "Grades", value: stats.grades },
            { icon: Layers, label: "Total SKUs", value: stats.total },
            { icon: DollarSign, label: "Avg. Price", value: formatNaira(stats.avg) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></div>
              <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Update Price List section */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">Update Price List</h2>
              <p className="text-sm text-muted-foreground">Upload the latest Vitafoam Comfort Centre price list PDF to refresh prices instantly.</p>
            </div>
          </div>

          {/* Status card */}
          <div className="mt-5 rounded-lg border border-border bg-surface p-4 text-sm">
            {seedMode ? (
              <div className="flex items-start gap-2 text-muted-foreground">
                <FileText className="h-4 w-4 mt-0.5 text-primary" />
                <span>Using default seed data, upload a new price list to update prices.</span>
              </div>
            ) : (
              <div className="grid gap-1.5 sm:grid-cols-3">
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground">Last updated</span><div className="font-medium text-primary">{formatLastUpdated(catalog.lastUpdated)}</div></div>
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground">File</span><div className="font-medium text-primary truncate">{catalog.uploadedFileName || "—"}</div></div>
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground">Total products</span><div className="font-medium text-primary">{catalog.totalProducts}</div></div>
              </div>
            )}
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-5 cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-smooth ${dragOver ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-primary/40"}`}
          >
            <Upload className="mx-auto h-10 w-10 text-primary/60" />
            <p className="mt-3 font-medium text-primary">Drag & drop your Vitafoam price list PDF here</p>
            <p className="text-sm text-muted-foreground">or click to browse, PDF files only</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="navy" onClick={() => fileInputRef.current?.click()} disabled={status.kind === "loading"}>
              {status.kind === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Reading PDF...</> : <><Upload className="h-4 w-4" /> Upload & Update Prices</>}
            </Button>
            {!seedMode && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline"><RotateCcw className="h-4 w-4" /> Clear All & Reset to Seed Data</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset catalog?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will discard the uploaded price list and restore the default seed data. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>Reset to seed</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {/* Status banners */}
          {status.kind === "loading" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-surface p-3 text-sm text-primary">
              <Loader2 className="h-4 w-4 animate-spin" /> Reading PDF, please wait...
            </div>
          )}
          {status.kind === "success" && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              <CheckCircle2 className="h-4 w-4 mt-0.5" />
              <span>Price list updated, {status.count} products loaded from <strong>{status.filename}</strong>. Last updated: {formatLastUpdated(status.iso)}.</span>
            </div>
          )}
          {status.kind === "warn" && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <AlertTriangle className="h-4 w-4 mt-0.5" /> {status.message}
            </div>
          )}
          {status.kind === "error" && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900">
              <XCircle className="h-4 w-4 mt-0.5" /> {status.message}
            </div>
          )}
        </section>

        {/* Catalog preview */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">Catalog Preview</h2>
              <p className="text-sm text-muted-foreground">Showing {filteredRows.length} of {catalog.totalProducts} products</p>
            </div>
            <div className="w-56">
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All grades</SelectItem>
                  {GRADE_OPTIONS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r) => (
                  <tr key={r.code + r.dimensionRaw} className="border-t border-border/60">
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">{r.code}</td>
                    <td className="px-4 py-2.5">{r.grade}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.displaySize}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-primary">{formatNaira(r.price)}</td>
                  </tr>
                ))}
                {filteredRows.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">No products to display.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Credentials reminder */}
        <section className="rounded-xl border border-dashed border-border bg-surface p-5 text-sm">
          <div className="font-display text-base font-semibold text-primary">Admin Credentials</div>
          <p className="mt-1 text-muted-foreground">For your reference, keep these private.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div><span className="text-xs uppercase tracking-wide text-muted-foreground">Username</span><div className="font-mono text-primary">multibiz_admin</div></div>
            <div><span className="text-xs uppercase tracking-wide text-muted-foreground">Password</span><div className="font-mono text-primary">Vitafoam@2026</div></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
