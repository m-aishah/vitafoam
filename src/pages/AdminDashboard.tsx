import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/vitafoam-logo-1.svg";
import { adminLogout, isAdminAuthed } from "@/lib/admin";
import {
  getMattressCatalog, saveMattressCatalog,
  getTopperProducts, saveTopperProducts, deleteTopperRaw,
  getPillowProducts, getBabyProducts, getLifestyleProducts, getLeisureProducts,
  getBeddingProducts,
  addSimpleProduct, updateSimpleProduct, deleteSimpleProduct,
  addBeddingProduct, updateBeddingProduct, deleteBeddingProduct,
  deleteMattressRaw, updateMattressRaw, addMattressRaw,
  getGradeImages, setGradeImage, initCatalog,
  MattressRaw, SimpleProductRaw, BeddingProductRaw,
} from "@/lib/catalog";
import { formatNaira, GRADE_OPTIONS, calcDisplaySize } from "@/lib/products";
import { uploadProductImage } from "@/lib/imageUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { LogOut, Pencil, Trash2, Plus, Package, Layers, Tag, ImageIcon, Search, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Shared input class ───────────────────────────────────────────────────────
const inp = "mt-1 w-full border border-border rounded-xl px-3 h-10 text-sm focus:outline-none focus:border-primary transition-colors";
const inpSm = "border border-border rounded-xl px-2 h-9 text-xs focus:outline-none focus:border-primary transition-colors";

// ─── Image Uploader ───────────────────────────────────────────────────────────
function ImageUploader({ value, onChange, folder = "general" }: { value: string | null; onChange: (url: string | null) => void; folder?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setLoading(true);
    try {
      const url = await uploadProductImage(file, folder);
      onChange(url);
    } catch (e) {
      toast({ title: "Upload failed", description: String(e), variant: "destructive" });
    } finally { setLoading(false); }
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase text-muted-foreground">Image</label>
      <div className="mt-1.5 flex items-start gap-3">
        {value ? (
          <div className="relative h-20 w-20 flex-shrink-0 rounded-xl border border-border overflow-hidden bg-surface">
            <img src={value} alt="preview" className="h-full w-full object-cover" />
            <button type="button" onClick={() => onChange(null)}
              className="absolute top-0.5 right-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-black/60 text-white text-[10px] hover:bg-red-600">✕</button>
          </div>
        ) : (
          <div className="h-20 w-20 flex-shrink-0 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-gray-300 bg-surface">
            <ImageIcon className="h-7 w-7" />
          </div>
        )}
        <div className="flex-1">
          <Button type="button" size="sm" variant="outline" disabled={loading} onClick={() => ref.current?.click()} className="w-full rounded-xl">
            {loading ? "Uploading…" : value ? "Change Image" : "Upload Image"}
          </Button>
          <p className="mt-1 text-[11px] text-muted-foreground">JPG / PNG / WEBP — auto-compressed</p>
          <input ref={ref} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
        </div>
      </div>
    </div>
  );
}

// ─── Grade Images Panel ───────────────────────────────────────────────────────
function GradeImagesPanel({ onRefresh }: { onRefresh: () => void }) {
  const [images, setImages] = useState<Record<string, string | null>>(getGradeImages);

  useEffect(() => {
    const refresh = () => setImages(getGradeImages());
    window.addEventListener("mbg-catalog-changed", refresh);
    initCatalog();
    return () => window.removeEventListener("mbg-catalog-changed", refresh);
  }, []);

  const handleChange = (grade: string, url: string | null) => {
    setGradeImage(grade, url);
    setImages((prev) => ({ ...prev, [grade]: url }));
    onRefresh();
  };

  return (
    <div className="mt-6 border-t border-border pt-5">
      <h3 className="font-semibold text-sm text-gray-900 mb-3">Grade Images</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GRADE_OPTIONS.filter((g) => g !== "Memory Topper").map((grade) => (
          <div key={grade} className="border border-border rounded-xl p-3 bg-surface">
            <p className="text-xs font-bold text-gray-700 mb-2 truncate">{grade}</p>
            {images[grade] ? (
              <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-gray-50">
                <img src={images[grade]!} alt={grade} className="h-full w-full object-cover" />
                <button onClick={() => handleChange(grade, null)}
                  className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center rounded-full bg-black/60 text-white text-[10px] hover:bg-red-600">✕</button>
              </div>
            ) : (
              <div className="h-28 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-gray-300 mb-2">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
            <ImageUploader value={images[grade] ?? null} onChange={(url) => handleChange(grade, url)} folder="mattresses" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pagination ──────────────────────────────────────────────────────────────
const PAGE_SIZE = 20;

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages <= 1) return null;
  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);
  return (
    <div className="flex items-center justify-between mt-3 px-1">
      <p className="text-xs text-muted-foreground">{from}–{to} of {total}</p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)} disabled={page === 1}
          className="h-8 w-8 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        ><ChevronLeft className="h-4 w-4" /></button>
        {Array.from({ length: pages }, (_, i) => i + 1).filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1).reduce<(number | "…")[]>((acc, p, i, arr) => {
          if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
          acc.push(p);
          return acc;
        }, []).map((p, i) =>
          p === "…" ? <span key={`e${i}`} className="px-1 text-xs text-muted-foreground">…</span> : (
            <button key={p} onClick={() => onChange(p as number)}
              className={`h-8 min-w-8 px-2 rounded-xl text-xs font-semibold border transition-colors ${page === p ? "bg-primary text-white border-primary" : "border-border hover:bg-surface"}`}
            >{p}</button>
          )
        )}
        <button
          onClick={() => onChange(page + 1)} disabled={page === pages}
          className="h-8 w-8 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        ><ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

// ─── Search bar ───────────────────────────────────────────────────────────────
function TableSearch({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search…"}
        className="h-9 pl-9 pr-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors w-56"
      />
    </div>
  );
}

// ─── Mattress Table ───────────────────────────────────────────────────────────
function MattressTable({ products, onRefresh }: { products: MattressRaw[]; onRefresh: () => void }) {
  const [gradeFilter, setGradeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState<MattressRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: MattressRaw = { code: "", grade: "Corona", gradeSuffix: "CP", dimensionRaw: "", lengthInches: 75, widthInches: 60, thicknessInches: 6, price: 0, displaySize: "", displayLabel: "" };
  const [form, setForm] = useState<MattressRaw>(blank);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = gradeFilter === "all" ? products : products.filter((p) => p.grade === gradeFilter);
    if (q) list = list.filter((p) => p.grade.toLowerCase().includes(q) || p.displaySize.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    return [...list].sort((a, b) => a.grade.localeCompare(b.grade) || a.widthInches - b.widthInches || a.thicknessInches - b.thicknessInches);
  }, [products, gradeFilter, search]);
  const rows = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);
  // reset page when filter/search changes
  useEffect(() => { setPage(1); }, [gradeFilter, search]);

  const updateDims = (patch: Partial<MattressRaw>) => {
    setForm((f) => {
      const next = { ...f, ...patch };
      next.displaySize = calcDisplaySize(next.lengthInches, next.widthInches, next.thicknessInches);
      next.displayLabel = `${next.grade} — ${next.displaySize}`;
      return next;
    });
  };

  const openEdit = (r: MattressRaw) => { setForm({ ...r }); setEditTarget(r); };
  const openAdd = () => { const f = { ...blank }; f.displaySize = calcDisplaySize(f.lengthInches, f.widthInches, f.thicknessInches); f.displayLabel = `${f.grade} — ${f.displaySize}`; setForm(f); setAdding(true); };
  const save = () => {
    const f = { ...form, code: form.code || `SKU-${Date.now()}`, displayLabel: `${form.grade} — ${form.displaySize}` };
    if (adding) { addMattressRaw(f); setAdding(false); }
    else { updateMattressRaw(f); setEditTarget(null); }
    onRefresh();
    toast({ title: "Saved" });
  };
  const del = (code: string) => { deleteMattressRaw(code); onRefresh(); toast({ title: "Deleted" }); };
  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-44">
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="h-9 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>
                {GRADE_OPTIONS.filter((g) => g !== "Memory Topper").map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <TableSearch value={search} onChange={setSearch} placeholder="Search grade, size, code…" />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground">{filtered.length} of {products.length} SKUs</p>
          <Button size="sm" variant="navy" onClick={openAdd} className="rounded-xl"><Plus className="h-4 w-4" /> Add SKU</Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Grade</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code + r.dimensionRaw} className="border-t border-border/60 hover:bg-surface/50">
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{r.code || "—"}</td>
                <td className="px-4 py-2.5 font-medium">{r.grade}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.displaySize}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatNaira(r.price)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => openEdit(r)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this SKU?</AlertDialogTitle>
                          <AlertDialogDescription>{r.grade} — {r.displaySize}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="rounded-xl" onClick={() => del(r.code)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No SKUs match your search.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} onChange={setPage} />

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader><DialogTitle>{adding ? "Add SKU" : "Edit SKU"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); save(); } }}>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Grade</label>
              <Select value={form.grade} onValueChange={(v) => updateDims({ grade: v })}>
                <SelectTrigger className="mt-1.5 h-10 rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>{GRADE_OPTIONS.filter((g) => g !== "Memory Topper").map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Length (in)</label><input type="number" className={inp} value={form.lengthInches || ""} onChange={(e) => updateDims({ lengthInches: Number(e.target.value) })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Width (in)</label><input type="number" className={inp} value={form.widthInches || ""} onChange={(e) => updateDims({ widthInches: Number(e.target.value) })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Thick (in)</label><input type="number" className={inp} value={form.thicknessInches || ""} onChange={(e) => updateDims({ thicknessInches: Number(e.target.value) })} /></div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Display Size <span className="normal-case font-normal text-muted-foreground">(auto-filled)</span></label>
              <input className={`${inp} bg-surface`} value={form.displaySize} onChange={(e) => setForm({ ...form, displaySize: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Price (₦)</label>
              <input type="number" className={inp} value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Code <span className="normal-case font-normal text-muted-foreground">(optional — auto-generated if blank)</span></label>
              <input className={inp} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. M60CP6" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" className="rounded-xl" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Topper Table ─────────────────────────────────────────────────────────────
function TopperTable({ products, onRefresh }: { products: MattressRaw[]; onRefresh: () => void }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState<MattressRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: MattressRaw = { code: "", grade: "Memory Topper", gradeSuffix: "MT", dimensionRaw: "", lengthInches: 75, widthInches: 60, thicknessInches: 4, price: 0, displaySize: "", displayLabel: "" };
  const [form, setForm] = useState<MattressRaw>(blank);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? products.filter((p) => p.displaySize.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) : products;
  }, [products, search]);
  const rows = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);
  useEffect(() => { setPage(1); }, [search]);

  const updateDims = (patch: Partial<MattressRaw>) => {
    setForm((f) => { const next = { ...f, ...patch }; next.displaySize = calcDisplaySize(next.lengthInches, next.widthInches, next.thicknessInches); next.displayLabel = `Memory Topper — ${next.displaySize}`; return next; });
  };

  const openEdit = (r: MattressRaw) => { setForm({ ...r }); setEditTarget(r); };
  const openAdd = () => { const f = { ...blank }; f.displaySize = calcDisplaySize(f.lengthInches, f.widthInches, f.thicknessInches); f.displayLabel = `Memory Topper — ${f.displaySize}`; setForm(f); setAdding(true); };
  const save = () => {
    const f = { ...form, code: form.code || `MT-${Date.now()}` };
    if (adding) { saveTopperProducts([...products, f]); setAdding(false); }
    else { saveTopperProducts(products.map((p) => p.code === editTarget?.code ? f : p)); setEditTarget(null); }
    onRefresh(); toast({ title: "Saved" });
  };
  const del = (code: string) => { deleteTopperRaw(code); onRefresh(); toast({ title: "Deleted" }); };
  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <TableSearch value={search} onChange={setSearch} placeholder="Search size or code…" />
        <Button size="sm" variant="navy" className="rounded-xl" onClick={openAdd}><Plus className="h-4 w-4" /> Add Size</Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Code</th><th className="px-4 py-3">Size</th>
              <th className="px-4 py-3 text-right">Price</th><th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code} className="border-t border-border/60 hover:bg-surface/50">
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{r.code || "—"}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.displaySize}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatNaira(r.price)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => openEdit(r)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="sm" variant="outline" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button></AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader><AlertDialogTitle>Delete this size?</AlertDialogTitle><AlertDialogDescription>{r.displaySize}</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel><AlertDialogAction className="rounded-xl" onClick={() => del(r.code)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">No results.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} onChange={setPage} />
      <div className="mt-5 border-t border-border pt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Memory Topper Product Image</h3>
        <ImageUploader value={(products[0] as any)?.image ?? null} folder="toppers" onChange={(url) => { saveTopperProducts(products.map((p) => ({ ...p, image: url }))); onRefresh(); }} />
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader><DialogTitle>{adding ? "Add Topper Size" : "Edit Topper Size"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); save(); } }}>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Length (in)</label><input type="number" className={inp} value={form.lengthInches || ""} onChange={(e) => updateDims({ lengthInches: Number(e.target.value) })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Width (in)</label><input type="number" className={inp} value={form.widthInches || ""} onChange={(e) => updateDims({ widthInches: Number(e.target.value) })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Thick (in)</label><input type="number" className={inp} value={form.thicknessInches || ""} onChange={(e) => updateDims({ thicknessInches: Number(e.target.value) })} /></div>
            </div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Display Size <span className="normal-case font-normal">(auto-filled)</span></label><input className={`${inp} bg-surface`} value={form.displaySize} readOnly /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Price (₦)</label><input type="number" className={inp} value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Code <span className="normal-case font-normal">(optional)</span></label><input className={inp} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. MT304" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" className="rounded-xl" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Simple Product Table ─────────────────────────────────────────────────────
function SimpleProductTable({ cat, products, onRefresh }: { cat: "pillow" | "baby" | "lifestyle" | "leisure"; products: SimpleProductRaw[]; onRefresh: () => void }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState<SimpleProductRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: SimpleProductRaw = { id: "", name: "", shortDesc: "", description: "", price: 0, image: null };
  const [form, setForm] = useState<SimpleProductRaw>(blank);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q)) : products;
  }, [products, search]);
  const rows = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);
  useEffect(() => { setPage(1); }, [search]);

  const openEdit = (p: SimpleProductRaw) => { setForm({ ...p }); setEditTarget(p); };
  const openAdd = () => { setForm({ ...blank, id: `${cat}-${Date.now()}` }); setAdding(true); };
  const save = () => {
    if (editTarget) { updateSimpleProduct(cat, form); setEditTarget(null); }
    else { addSimpleProduct(cat, form); setAdding(false); }
    onRefresh(); toast({ title: "Saved" });
  };
  const del = (id: string) => { deleteSimpleProduct(cat, id); onRefresh(); toast({ title: "Deleted" }); };
  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <TableSearch value={search} onChange={setSearch} placeholder="Search products…" />
        <Button size="sm" variant="navy" className="rounded-xl" onClick={openAdd}><Plus className="h-4 w-4" /> Add Item</Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 w-16">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Short Description</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-border/60 hover:bg-surface/50">
                <td className="px-4 py-2.5">
                  {p.image ? <img src={p.image} alt={p.name} className="h-10 w-10 rounded-xl object-cover border border-border" />
                    : <div className="h-10 w-10 rounded-xl border border-border bg-surface flex items-center justify-center text-gray-300"><ImageIcon className="h-4 w-4" /></div>}
                </td>
                <td className="px-4 py-2.5 font-semibold text-primary">{p.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs max-w-xs truncate">{p.shortDesc}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatNaira(p.price)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => openEdit(p)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="sm" variant="outline" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button></AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader><AlertDialogTitle>Delete {p.name}?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel><AlertDialogAction className="rounded-xl" onClick={() => del(p.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No products match your search.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} onChange={setPage} />

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="rounded-2xl">
          <DialogHeader><DialogTitle>{editTarget ? "Edit Item" : "Add Item"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); save(); } }}>
            <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder={cat} />
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Name</label><input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Short Description</label><input className={inp} value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Description</label><textarea className={`${inp} h-20 resize-none py-2`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Price (₦)</label><input type="number" className={inp} value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" className="rounded-xl" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Bedding Table ────────────────────────────────────────────────────────────
function BeddingTable({ products, onRefresh }: { products: BeddingProductRaw[]; onRefresh: () => void }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editTarget, setEditTarget] = useState<BeddingProductRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const blank: BeddingProductRaw = { id: "", name: "", shortDesc: "", description: "", image: null, variants: [] };
  const [form, setForm] = useState<BeddingProductRaw>(blank);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q)) : products;
  }, [products, search]);
  const rows = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);
  useEffect(() => { setPage(1); }, [search]);

  const openEdit = (p: BeddingProductRaw) => { setForm({ ...p }); setEditTarget(p); };
  const openAdd = () => { setForm({ ...blank, id: `bedding-${Date.now()}` }); setAdding(true); };
  const save = () => {
    if (editTarget) { updateBeddingProduct(form.id, form); setEditTarget(null); }
    else { addBeddingProduct(form); setAdding(false); }
    onRefresh(); toast({ title: "Saved" });
  };
  const del = (id: string) => { deleteBeddingProduct(id); onRefresh(); toast({ title: "Deleted" }); };
  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <TableSearch value={search} onChange={setSearch} placeholder="Search bedding…" />
        <Button size="sm" variant="navy" className="rounded-xl" onClick={openAdd}><Plus className="h-4 w-4" /> Add Product</Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 w-16">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Sizes</th>
              <th className="px-4 py-3 text-right">From</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-border/60 hover:bg-surface/50">
                <td className="px-4 py-2.5">
                  {p.image ? <img src={p.image} alt={p.name} className="h-10 w-10 rounded-xl object-cover border border-border" />
                    : <div className="h-10 w-10 rounded-xl border border-border bg-surface flex items-center justify-center text-gray-300"><ImageIcon className="h-4 w-4" /></div>}
                </td>
                <td className="px-4 py-2.5 font-semibold text-primary">{p.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{p.variants.length} sizes</td>
                <td className="px-4 py-2.5 text-right font-semibold">{p.variants.length ? formatNaira(Math.min(...p.variants.map((v) => v.price))) : "—"}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => openEdit(p)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="sm" variant="outline" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button></AlertDialogTrigger>
                      <AlertDialogContent className="rounded-2xl">
                        <AlertDialogHeader><AlertDialogTitle>Delete {p.name}?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel><AlertDialogAction className="rounded-xl" onClick={() => del(p.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No products match your search.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={filtered.length} onChange={setPage} />

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader><DialogTitle>{editTarget ? "Edit Bedding Product" : "Add Bedding Product"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2 max-h-[65vh] overflow-y-auto pr-1">
            <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="bedding" />
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Name</label><input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); save(); } }} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Short Description</label><input className={inp} value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); save(); } }} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Description</label><textarea className={`${inp} h-20 resize-none py-2`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">Size Variants</label>
                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setForm({ ...form, variants: [...form.variants, { sizeName: "Single", L: 75, W: 30, price: 0 }] })}><Plus className="h-3 w-3" /></Button>
              </div>
              {form.variants.map((v, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <input className={`flex-1 ${inpSm}`} placeholder="Size name e.g. Queen" value={v.sizeName} onChange={(e) => { const vv = [...form.variants]; vv[i] = { ...v, sizeName: e.target.value }; setForm({ ...form, variants: vv }); }} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); save(); } }} />
                  <input type="number" className={`w-24 ${inpSm}`} placeholder="Price ₦" value={v.price || ""} onChange={(e) => { const vv = [...form.variants]; vv[i] = { ...v, price: Number(e.target.value) }; setForm({ ...form, variants: vv }); }} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); save(); } }} />
                  <Button size="sm" variant="outline" className="rounded-xl text-red-600" onClick={() => setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) })}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
              {form.variants.length === 0 && <p className="text-xs text-muted-foreground">No size variants yet. Click + to add one.</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" className="rounded-xl" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [authed] = useState(() => isAdminAuthed());
  const [tick, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  const mattressCat = useMemo(() => getMattressCatalog(), [tick]);
  const toppers = useMemo(() => getTopperProducts(), [tick]);
  const pillows = useMemo(() => getPillowProducts(), [tick]);
  const baby = useMemo(() => getBabyProducts(), [tick]);
  const lifestyle = useMemo(() => getLifestyleProducts(), [tick]);
  const leisure = useMemo(() => getLeisureProducts(), [tick]);
  const bedding = useMemo(() => getBeddingProducts(), [tick]);

  useEffect(() => {
    const onChange = () => refresh();
    window.addEventListener("mbg-catalog-changed", onChange);
    initCatalog();
    return () => window.removeEventListener("mbg-catalog-changed", onChange);
  }, []);

  if (!authed) return <Navigate to="/admin/login" replace />;

  const totalSKUs = mattressCat.products.length + toppers.length + pillows.length + baby.length + lifestyle.length + leisure.length + bedding.length;
  const grades = new Set(mattressCat.products.map((p) => p.grade)).size;
  const categoriesWithProducts = [mattressCat.products, toppers, pillows, baby, lifestyle, leisure, bedding].filter((a) => a.length > 0).length;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="bg-primary text-primary-foreground shadow">
        <div className="container mx-auto container-px flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Vitafoam" className="h-10 w-auto bg-white rounded-xl px-1" />
            <div>
              <div className="font-display text-lg font-bold">Admin Console</div>
              <div className="text-[11px] tracking-wider uppercase text-primary-foreground/60">Vitafoam Comfort Centre</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="heroOutline" size="sm" className="h-10 rounded-xl"><Link to="/">View Site</Link></Button>
            <Button onClick={() => { adminLogout(); window.location.href = "/admin/login"; }} variant="hero" size="sm" className="h-10 rounded-xl">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto container-px py-10 flex-1 space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Package, label: "Total SKUs", value: totalSKUs },
            { icon: Layers, label: "Mattress Grades", value: grades },
            { icon: Tag, label: "Active Categories", value: categoriesWithProducts },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></div>
              <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">{s.value}</div>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary mb-5">Product Catalog</h2>
          <Tabs defaultValue="mattress">
            <TabsList className="mb-5 flex-wrap h-auto gap-1">
              <TabsTrigger value="mattress">Mattresses ({mattressCat.products.length})</TabsTrigger>
              <TabsTrigger value="topper">Toppers ({toppers.length})</TabsTrigger>
              <TabsTrigger value="pillow">Pillows ({pillows.length})</TabsTrigger>
              <TabsTrigger value="bedding">Bedding ({bedding.length})</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle ({lifestyle.length})</TabsTrigger>
              <TabsTrigger value="leisure">Leisure ({leisure.length})</TabsTrigger>
              <TabsTrigger value="baby">Baby & Mother ({baby.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="mattress"><MattressTable products={mattressCat.products} onRefresh={refresh} /><GradeImagesPanel onRefresh={refresh} /></TabsContent>
            <TabsContent value="topper"><TopperTable products={toppers} onRefresh={refresh} /></TabsContent>
            <TabsContent value="pillow"><SimpleProductTable cat="pillow" products={pillows} onRefresh={refresh} /></TabsContent>
            <TabsContent value="bedding"><BeddingTable products={bedding} onRefresh={refresh} /></TabsContent>
            <TabsContent value="lifestyle"><SimpleProductTable cat="lifestyle" products={lifestyle} onRefresh={refresh} /></TabsContent>
            <TabsContent value="leisure"><SimpleProductTable cat="leisure" products={leisure} onRefresh={refresh} /></TabsContent>
            <TabsContent value="baby"><SimpleProductTable cat="baby" products={baby} onRefresh={refresh} /></TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
