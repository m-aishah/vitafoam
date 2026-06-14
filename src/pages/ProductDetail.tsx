import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MattressIllustration from "@/components/MattressIllustration";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNaira, formatSize, whatsappOrderUrl, SizeOption } from "@/lib/products";
import { getGroupedShopItems, GroupedShopItem } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { addToCart } from "@/lib/cart";
import { Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { toast } from "@/hooks/use-toast";

function displaySize(s: { label: string; L: number; W: number; T: number; price: number }): string {
  if (s.L > 0 && s.W > 0) return formatSize({ size: s.label, L: s.L, W: s.W, T: s.T, price: s.price });
  return s.label;
}

const ProductDetail = () => {
  const { id = "" } = useParams();
  const all = useMemo(() => getGroupedShopItems(), []);
  const product = useMemo(() => all.find((p) => p.id === id), [all, id]);
  const related = useMemo(
    () => all.filter((p) => p.category === "mattress" && p.id !== id).slice(0, 3),
    [all, id]
  );

  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 container mx-auto container-px py-24 text-center">
          <h1 className="font-display text-3xl text-gray-900">Product not found</h1>
          <Link to="/shop" className="mt-6 inline-block bg-[#1a1a1a] text-white px-6 py-3 rounded text-sm font-bold hover:bg-gray-800 transition-colors uppercase">
            Back to Shop
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const selected = product.sizes[sizeIdx] ?? product.sizes[0];
  const sizeOption: SizeOption = { size: selected.label, L: selected.L, W: selected.W, T: selected.T, price: selected.price };

  const handleAdd = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        shortDesc: product.shortDesc,
        description: product.description,
        grade: (product.grade ?? product.categoryLabel) as any,
        badgeClass: product.badgeClass ?? "",
        sizes: product.sizes.map((s) => ({ size: s.label, L: s.L, W: s.W, T: s.T, price: s.price })),
        image: product.image ?? undefined,
      },
      sizeOption,
      qty
    );
    toast({ title: "Added to cart", description: `${product.name} — ${displaySize(selected)}` });
  };

  const waMessage = `Hi Vitafoam Comfort Centre, I'd like to order:\n\n• ${product.name}\n• Size: ${displaySize(selected)}\n• Qty: ${qty}\n• Price: ${formatNaira(selected.price * qty)} (7.5% VAT inclusive)\n\nPlease confirm availability and delivery.`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-2xl md:text-3xl font-bold relative z-10">{product.name}</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link>
          {" / "}
          <Link to={`/shop?category=${product.category}`} className="hover:text-white capitalize">{product.categoryLabel}</Link>
          {" / "}
          <span className="text-white">{product.name}</span>
        </p>
      </section>

      <section className="py-10 flex-1 bg-white">
        <div className="container mx-auto container-px">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="border border-gray-200 rounded bg-gray-50 aspect-square flex items-center justify-center p-8">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="max-w-full max-h-[420px] object-contain" />
                ) : (
                  <MattressIllustration className="max-w-sm" />
                )}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                <Link to="/" className="hover:text-primary">HOME</Link>
                {" / "}
                <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{product.categoryLabel.toUpperCase()}</Link>
                {" / "}
                <span>{product.name.toUpperCase()}</span>
              </p>

              {product.grade && product.badgeClass && (
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded mt-2 mb-1 ${product.badgeClass}`}>
                  {product.grade}
                </span>
              )}

              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

              <p className="text-primary font-bold text-2xl mt-3">
                {product.sizes.length > 1 ? "From " : ""}{formatNaira(selected.price)}
              </p>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.shortDesc}</p>

              {product.sizes.length > 1 && (
                <div className="mt-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Available Sizes</label>
                  <Select value={String(sizeIdx)} onValueChange={(v) => setSizeIdx(Number(v))}>
                    <SelectTrigger className="h-11 text-sm border-gray-300">
                      <SelectValue placeholder="Choose a size" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {product.sizes.map((s, i) => (
                        <SelectItem key={i} value={String(i)} className="text-sm">
                          {displaySize(s)} — {formatNaira(s.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mt-5 flex items-center gap-3">
                <div className="inline-flex items-center border border-gray-300 rounded">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 text-gray-700 text-xl font-medium hover:bg-gray-100 transition-colors">−</button>
                  <span className="w-12 text-center font-semibold text-gray-900">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-11 w-11 text-gray-700 text-xl font-medium hover:bg-gray-100 transition-colors">+</button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 h-11 bg-[#1a1a1a] text-white text-sm font-bold rounded hover:bg-primary transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" /> ADD TO CART
                </button>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Need a custom size? Chat with our team on WhatsApp.
              </p>
              <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-primary font-semibold hover:underline">
                Request Custom Size
              </a>

              <div className="mt-5">
                <a
                  href={whatsappOrderUrl(waMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 bg-[#25D366] text-white text-sm font-bold rounded hover:bg-[#1fba59] transition-colors uppercase tracking-wide"
                >
                  <WhatsAppIcon className="h-5 w-5" /> ORDER ON WHATSAPP
                </a>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Authorized Vitafoam Comfort Centre</li>
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary flex-shrink-0" /> Free delivery in Lagos for orders ₦50,000+</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" /> Manufacturer warranty intact · 7.5% VAT inclusive</li>
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex gap-0 border-b border-gray-200">
              {(["description", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                    activeTab === tab ? "bg-primary text-white rounded-t" : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {tab === "reviews" ? "REVIEWS (0)" : "DESCRIPTION"}
                </button>
              ))}
            </div>
            <div className="pt-8 pb-4">
              {activeTab === "description" ? (
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                  <p>{product.description}</p>
                  <h4 className="font-bold text-gray-900 mt-5 mb-2">Benefits</h4>
                  <ul className="space-y-1">
                    <li>• Genuine Vitafoam quality and manufacturing standards</li>
                    <li>• Durable foam construction for long-lasting support</li>
                    <li>• Available in multiple sizes to fit your space</li>
                    <li>• 7.5% VAT inclusive pricing — no hidden costs</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Reviews</h3>
                  <p className="text-gray-500 text-sm">There are no reviews yet.</p>
                  <div className="mt-6 border border-gray-200 rounded p-6">
                    <p className="font-bold text-gray-900">Be the first to review "{product.name}"</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Contact us on{" "}
                      <a href="https://wa.me/2348053054348" className="text-primary hover:underline" target="_blank" rel="noreferrer">WhatsApp</a>{" "}
                      to share your experience.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-white py-12">
          <div className="container mx-auto container-px">
            <h2 className="font-display text-2xl font-bold text-gray-900 uppercase mb-8">RELATED PRODUCTS</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} item={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
};

export default ProductDetail;
