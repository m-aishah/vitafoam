import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/vitafoam-logo-1.svg";
import { adminLogout, isAdminAuthed } from "@/lib/admin";
import { parsePriceListPdf, formatLastUpdated } from "@/lib/pdfParser";
import { compressImage } from "@/lib/imageUtils";
import {
  getMattressCatalog, saveMattressCatalog, resetMattressCatalog, isUsingMattressSeed,
  getTopperProducts, saveTopperProducts, deleteTopperRaw,
  getPillowProducts, getBabyProducts, getLifestyleProducts, getLeisureProducts,
  getBeddingProducts,
  addSimpleProduct, updateSimpleProduct, deleteSimpleProduct,
  addBeddingProduct, updateBeddingProduct, deleteBeddingProduct,
  deleteMattressRaw, updateMattressRaw, addMattressRaw,
  MattressRaw, SimpleProductRaw, BeddingProductRaw,
} from "@/lib/catalog";
import { formatNaira, GRADE_OPTIONS } from "@/lib/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  LogOut, Upload, Loader2, CheckCircle2, AlertTriangle, XCircle,
  FileText, RotateCcw, Pencil, Trash2, Plus, Package, Layers, DollarSign,
} from "lucide-react";

type UploadStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; count: number; filename: string; iso: string }
  | { kind: "warn"; message: string }
  | { kind: "error"; message: string };

// ---- Image uploader ----

function ImageUploader({ value, onChange }: { value: string | null; onChange: (url: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setLoading(true);
    try {
      const url = await compressImage(file);
      onChange(url);
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="text-xs font-semibold uppercase text-muted-foreground">Image</label>
      <div className="mt-1 flex items-start gap-3">
        {value ? (
          <div className="relative h-20 w-20 flex-shrink-0 rounded border border-border overflow-hidden bg-surface">
            <img src={value} alt="preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-0.5 right-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-black/60 text-white text-[10px] hover:bg-red-600"
            >✕</button>
          </div>
        ) : (
          <div className="h-20 w-20 flex-shrink-0 rounded border-2 border-dashed border-border flex items-center justify-center text-gray-300 bg-surface">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        )}
        <div className="flex-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={() => ref.current?.click()}
            className="w-full"
          >
            {loading ? "Compressing…" : value ? "Change Image" : "Upload Image"}
          </Button>
          <p className="mt-1 text-[11px] text-muted-foreground">JPG, PNG, WEBP — auto-compressed</p>
          <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
          />
        </div>
      </div>
    </div>
  );
}

// ---- Simple product CRUD ----

function SimpleProductTable({
  cat, products, onRefresh,
}: {
  cat: "pillow" | "baby" | "lifestyle" | "leisure";
  products: SimpleProductRaw[];
  onRefresh: () => void;
}) {
  const [editTarget, setEditTarget] = useState<SimpleProductRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const emptyForm: SimpleProductRaw = { id: "", name: "", shortDesc: "", description: "", price: 0, image: null };
  const [form, setForm] = useState<SimpleProductRaw>(emptyForm);

  const openEdit = (p: SimpleProductRaw) => { setForm({ ...p }); setEditTarget(p); };
  const openAdd = () => { setForm({ ...emptyForm, id: `${cat}-${Date.now()}` }); setAdding(true); };

  const save = () => {
    if (editTarget) {
      updateSimpleProduct(cat, form);
      setEditTarget(null);
    } else {
      addSimpleProduct(cat, form);
      setAdding(false);
    }
    onRefresh();
    toast({ title: "Saved" });
  };

  const del = (id: string) => {
    deleteSimpleProduct(cat, id);
    onRefresh();
    toast({ title: "Deleted" });
  };

  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button size="sm" variant="navy" onClick={openAdd}><Plus className="h-4 w-4" /> Add Item</Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Short Description</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border/60">
                <td className="px-4 py-2.5 font-semibold text-primary">{p.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs max-w-xs truncate">{p.shortDesc}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatNaira(p.price)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {p.name}?</AlertDialogTitle>
                          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => del(p.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editTarget ? "Edit Item" : "Add Item"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Name</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Short Description</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Description</label><textarea className="mt-1 w-full border border-border rounded px-3 py-2 text-sm h-20 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Price (₦)</label><input type="number" className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---- Mattress table ----

function MattressTable({ products, onRefresh }: { products: MattressRaw[]; onRefresh: () => void }) {
  const [gradeFilter, setGradeFilter] = useState("all");
  const [editTarget, setEditTarget] = useState<MattressRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const emptyForm: MattressRaw = { code: "", grade: "Corona", gradeSuffix: "CP", dimensionRaw: "", lengthInches: 75, widthInches: 60, thicknessInches: 6, price: 0, displaySize: "", displayLabel: "" };
  const [form, setForm] = useState<MattressRaw>(emptyForm);

  const rows = useMemo(() => {
    const list = gradeFilter === "all" ? products : products.filter((p) => p.grade === gradeFilter);
    return [...list].sort((a, b) => a.grade.localeCompare(b.grade) || a.widthInches - b.widthInches || a.thicknessInches - b.thicknessInches);
  }, [products, gradeFilter]);

  const openEdit = (r: MattressRaw) => { setForm({ ...r }); setEditTarget(r); };
  const openAdd = () => { setForm({ ...emptyForm, code: `MAN-${Date.now()}` }); setAdding(true); };

  const save = () => {
    const f = { ...form, displaySize: form.displaySize || `${form.lengthInches}x${form.widthInches}x${form.thicknessInches}` };
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
      <div className="flex items-center justify-between mb-3">
        <div className="w-56">
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All grades</SelectItem>
              {GRADE_OPTIONS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground">{rows.length} of {products.length} SKUs</p>
          <Button size="sm" variant="navy" onClick={openAdd}><Plus className="h-4 w-4" /> Add SKU</Button>
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
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code + r.dimensionRaw} className="border-t border-border/60">
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{r.code || "—"}</td>
                <td className="px-4 py-2.5">{r.grade}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.displaySize}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatNaira(r.price)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" onClick={() => openEdit(r)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this SKU?</AlertDialogTitle>
                          <AlertDialogDescription>{r.grade} — {r.displaySize}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => del(r.code)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No products.</td></tr>}
          </tbody>
        </table>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent>
          <DialogHeader><DialogTitle>{adding ? "Add SKU" : "Edit SKU"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Grade</label>
              <Select value={form.grade} onValueChange={(v) => setForm({ ...form, grade: v })}>
                <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GRADE_OPTIONS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Length (in)</label><input type="number" className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.lengthInches} onChange={(e) => setForm({ ...form, lengthInches: Number(e.target.value) })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Width (in)</label><input type="number" className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.widthInches} onChange={(e) => setForm({ ...form, widthInches: Number(e.target.value) })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Thickness (in)</label><input type="number" className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.thicknessInches} onChange={(e) => setForm({ ...form, thicknessInches: Number(e.target.value) })} /></div>
            </div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Display Size Label</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" placeholder="e.g. 6' × 5' × 6&quot; (auto-filled if blank)" value={form.displaySize} onChange={(e) => setForm({ ...form, displaySize: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Price (₦)</label><input type="number" className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---- Topper table ----

function TopperTable({ products, onRefresh }: { products: MattressRaw[]; onRefresh: () => void }) {
  const [editTarget, setEditTarget] = useState<MattressRaw | null>(null);
  const [form, setForm] = useState<MattressRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const emptyForm: MattressRaw = { code: "", grade: "Memory Topper", gradeSuffix: "MT", dimensionRaw: "", lengthInches: 75, widthInches: 60, thicknessInches: 4, price: 0, displaySize: "", displayLabel: "" };

  const openEdit = (r: MattressRaw) => { setForm({ ...r }); setEditTarget(r); };
  const openAdd = () => { setForm({ ...emptyForm }); setAdding(true); };

  const save = () => {
    const updated = form!;
    if (adding) {
      saveTopperProducts([...products, updated]);
    } else {
      saveTopperProducts(products.map((p) => p.code === editTarget?.code ? updated : p));
    }
    setEditTarget(null);
    setAdding(false);
    onRefresh();
    toast({ title: "Saved" });
  };

  const del = (code: string) => { deleteTopperRaw(code); onRefresh(); toast({ title: "Deleted" }); };

  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button size="sm" variant="navy" onClick={openAdd}><Plus className="h-4 w-4" /> Add Size</Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((r) => (
              <tr key={r.code + r.dimensionRaw} className="border-t border-border/60">
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{r.code}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{r.displaySize}</td>
                <td className="px-4 py-2.5 text-right font-semibold">{formatNaira(r.price)}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" onClick={() => openEdit(r)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete this topper size?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => del(r.code)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">No toppers yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent>
          <DialogHeader><DialogTitle>{adding ? "Add Topper Size" : "Edit Topper"}</DialogTitle></DialogHeader>
          {form && (
            <div className="space-y-3 py-2">
              <ImageUploader value={form.image ?? null} onChange={(url) => setForm({ ...form, image: url })} />
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Code</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Display Size</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.displaySize} onChange={(e) => setForm({ ...form, displaySize: e.target.value })} /></div>
              <div><label className="text-xs font-semibold uppercase text-muted-foreground">Price (₦)</label><input type="number" className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---- Bedding table ----

function BeddingTable({ products, onRefresh }: { products: BeddingProductRaw[]; onRefresh: () => void }) {
  const [editTarget, setEditTarget] = useState<BeddingProductRaw | null>(null);
  const [adding, setAdding] = useState(false);
  const emptyForm: BeddingProductRaw = { id: `bedding-${Date.now()}`, name: "", shortDesc: "", description: "", image: null, variants: [] };
  const [form, setForm] = useState<BeddingProductRaw>(emptyForm);

  const openEdit = (p: BeddingProductRaw) => { setForm({ ...p }); setEditTarget(p); };
  const openAdd = () => { setForm({ ...emptyForm, id: `bedding-${Date.now()}` }); setAdding(true); };

  const save = () => {
    if (editTarget) { updateBeddingProduct(form.id, form); setEditTarget(null); }
    else { addBeddingProduct(form); setAdding(false); }
    onRefresh();
    toast({ title: "Saved" });
  };

  const del = (id: string) => { deleteBeddingProduct(id); onRefresh(); toast({ title: "Deleted" }); };

  const modalOpen = !!editTarget || adding;
  const closeModal = () => { setEditTarget(null); setAdding(false); };

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button size="sm" variant="navy" onClick={openAdd}><Plus className="h-4 w-4" /> Add Product</Button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Variants</th>
              <th className="px-4 py-3 text-right">From</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border/60">
                <td className="px-4 py-2.5 font-semibold text-primary">{p.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{p.variants.length} sizes</td>
                <td className="px-4 py-2.5 text-right font-semibold">{p.variants.length ? formatNaira(Math.min(...p.variants.map((v) => v.price))) : "—"}</td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete {p.name}?</AlertDialogTitle></AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => del(p.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">No bedding products yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editTarget ? "Edit Bedding Product" : "Add Bedding Product"}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto">
            <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Name</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Short Description</label><input className="mt-1 w-full border border-border rounded px-3 h-9 text-sm" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} /></div>
            <div><label className="text-xs font-semibold uppercase text-muted-foreground">Description</label><textarea className="mt-1 w-full border border-border rounded px-3 py-2 text-sm h-20 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground">Size Variants</label>
                <Button size="sm" variant="outline" onClick={() => setForm({ ...form, variants: [...form.variants, { sizeName: "Single", L: 75, W: 30, price: 0 }] })}><Plus className="h-3 w-3" /></Button>
              </div>
              {form.variants.map((v, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <input className="flex-1 border border-border rounded px-2 h-8 text-xs" placeholder="Size name" value={v.sizeName} onChange={(e) => { const vv = [...form.variants]; vv[i] = { ...v, sizeName: e.target.value }; setForm({ ...form, variants: vv }); }} />
                  <input type="number" className="w-24 border border-border rounded px-2 h-8 text-xs" placeholder="Price" value={v.price} onChange={(e) => { const vv = [...form.variants]; vv[i] = { ...v, price: Number(e.target.value) }; setForm({ ...form, variants: vv }); }} />
                  <Button size="sm" variant="outline" className="text-red-600" onClick={() => setForm({ ...form, variants: form.variants.filter((_, j) => j !== i) })}><Trash2 className="h-3 w-3" /></Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button variant="navy" onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---- Main dashboard ----

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

  const [status, setStatus] = useState<UploadStatus>({ kind: "idle" });
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onChange = () => refresh();
    window.addEventListener("mbg-catalog-changed", onChange);
    return () => window.removeEventListener("mbg-catalog-changed", onChange);
  }, []);

  const totalSKUs = mattressCat.products.length + toppers.length + pillows.length + baby.length + lifestyle.length + leisure.length + bedding.length;
  const avgPrice = mattressCat.products.length
    ? mattressCat.products.reduce((a, b) => a + b.price, 0) / mattressCat.products.length
    : 0;

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
        setStatus({ kind: "warn", message: "The PDF was read but no products were found. Please check the file." });
        return;
      }
      saveMattressCatalog(next);
      refresh();
      setStatus({ kind: "success", count: next.totalProducts, filename: next.uploadedFileName || file.name, iso: next.lastUpdated || new Date().toISOString() });
      toast({ title: "Price list updated", description: `${next.totalProducts} mattress SKUs loaded.` });
    } catch (e) {
      console.error(e);
      setStatus({ kind: "error", message: "Could not read the PDF. Please try again." });
    }
  };

  const handleReset = () => {
    resetMattressCatalog();
    refresh();
    setStatus({ kind: "idle" });
    toast({ title: "Reset", description: "Mattress catalog restored to seed data." });
  };

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

      <main className="container mx-auto container-px py-10 flex-1 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Package, label: "Total SKUs", value: totalSKUs },
            { icon: Layers, label: "Mattress Grades", value: new Set(mattressCat.products.map((p) => p.grade)).size },
            { icon: DollarSign, label: "Avg. Mattress Price", value: formatNaira(avgPrice) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary"><s.icon className="h-5 w-5" /></div>
              <div className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">{s.value}</div>
            </div>
          ))}
        </div>

        {/* PDF Upload */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary mb-1">Update Mattress Price List via PDF</h2>
          <p className="text-sm text-muted-foreground mb-4">Upload the official Vitafoam price list PDF to refresh mattress prices instantly.</p>

          <div className="mb-4 rounded-lg border border-border bg-surface p-4 text-sm">
            {isUsingMattressSeed() ? (
              <div className="flex items-start gap-2 text-muted-foreground"><FileText className="h-4 w-4 mt-0.5 text-primary" /><span>Using seed data. Upload a price list PDF to update.</span></div>
            ) : (
              <div className="grid gap-1.5 sm:grid-cols-3">
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground">Last updated</span><div className="font-medium text-primary">{formatLastUpdated(mattressCat.lastUpdated)}</div></div>
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground">File</span><div className="font-medium text-primary truncate">{mattressCat.uploadedFileName || "—"}</div></div>
                <div><span className="text-xs uppercase tracking-wide text-muted-foreground">Total SKUs</span><div className="font-medium text-primary">{mattressCat.totalProducts}</div></div>
              </div>
            )}
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-smooth ${dragOver ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-primary/40"}`}
          >
            <Upload className="mx-auto h-10 w-10 text-primary/60" />
            <p className="mt-3 font-medium text-primary">Drag & drop Vitafoam PDF here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
            <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="navy" onClick={() => fileInputRef.current?.click()} disabled={status.kind === "loading"}>
              {status.kind === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Reading PDF...</> : <><Upload className="h-4 w-4" /> Upload & Refresh</>}
            </Button>
            {!isUsingMattressSeed() && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline"><RotateCcw className="h-4 w-4" /> Reset to Seed</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset catalog?</AlertDialogTitle>
                    <AlertDialogDescription>This will discard the uploaded price list and restore default seed data.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>Reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {status.kind === "loading" && <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-surface p-3 text-sm text-primary"><Loader2 className="h-4 w-4 animate-spin" /> Reading PDF...</div>}
          {status.kind === "success" && <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"><CheckCircle2 className="h-4 w-4 mt-0.5" /><span>{status.count} SKUs loaded from <strong>{status.filename}</strong>. Updated: {formatLastUpdated(status.iso)}.</span></div>}
          {status.kind === "warn" && <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><AlertTriangle className="h-4 w-4 mt-0.5" /> {status.message}</div>}
          {status.kind === "error" && <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900"><XCircle className="h-4 w-4 mt-0.5" /> {status.message}</div>}
        </section>

        {/* Category tabs */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-primary mb-4">Product Catalog</h2>
          <Tabs defaultValue="mattress">
            <TabsList className="mb-4 flex-wrap h-auto gap-1">
              <TabsTrigger value="mattress">Mattresses ({mattressCat.products.length})</TabsTrigger>
              <TabsTrigger value="topper">Toppers ({toppers.length})</TabsTrigger>
              <TabsTrigger value="pillow">Pillows ({pillows.length})</TabsTrigger>
              <TabsTrigger value="bedding">Bedding ({bedding.length})</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle ({lifestyle.length})</TabsTrigger>
              <TabsTrigger value="leisure">Leisure ({leisure.length})</TabsTrigger>
              <TabsTrigger value="baby">Baby & Mother ({baby.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="mattress">
              <MattressTable products={mattressCat.products} onRefresh={refresh} />
            </TabsContent>
            <TabsContent value="topper">
              <TopperTable products={toppers} onRefresh={refresh} />
            </TabsContent>
            <TabsContent value="pillow">
              <SimpleProductTable cat="pillow" products={pillows} onRefresh={refresh} />
            </TabsContent>
            <TabsContent value="bedding">
              <BeddingTable products={bedding} onRefresh={refresh} />
            </TabsContent>
            <TabsContent value="lifestyle">
              <SimpleProductTable cat="lifestyle" products={lifestyle} onRefresh={refresh} />
            </TabsContent>
            <TabsContent value="leisure">
              <SimpleProductTable cat="leisure" products={leisure} onRefresh={refresh} />
            </TabsContent>
            <TabsContent value="baby">
              <SimpleProductTable cat="baby" products={baby} onRefresh={refresh} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
