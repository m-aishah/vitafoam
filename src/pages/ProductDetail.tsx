import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MattressIllustration from "@/components/MattressIllustration";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getProduct, getProducts, formatNaira, formatSize, whatsappOrderUrl } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { addToCart } from "@/lib/cart";
import { Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProduct(id), [id]);
  const related = useMemo(() => getProducts().filter((p) => p.id !== id).slice(0, 3), [id]);
  const [sizeKey, setSizeKey] = useState<string>(product?.sizes[0]?.size ?? "");
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

  const selectedSize = product.sizes.find((s) => s.size === sizeKey) || product.sizes[0];

  const handleAdd = () => {
    addToCart(product, selectedSize, qty);
    toast({ title: "Added to cart", description: `${product.name}, ${formatSize(selectedSize)}` });
  };

  const waMessage = `Hi Vitafoam Comfort Centre, I'd like to order:\n\n• ${product.name}\n• Size: ${formatSize(selectedSize)}\n• Qty: ${qty}\n• Price: ${formatNaira(selectedSize.price * qty)} (7.5% VAT inclusive)\n\nPlease confirm availability and delivery.`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Orange banner breadcrumb */}
      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-2xl md:text-3xl font-bold relative z-10">{product.name}</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link>
          {" / "}
          <Link to="/shop" className="hover:text-white">Shop</Link>
          {" / "}
          <span className="text-white">{product.name}</span>
        </p>
      </section>

      {/* Product area */}
      <section className="py-10 flex-1 bg-white">
        <div className="container mx-auto container-px">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Image */}
            <div>
              <div className="border border-gray-200 rounded bg-gray-50 aspect-square flex items-center justify-center p-8">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="max-w-full max-h-[420px] object-contain" />
                ) : (
                  <MattressIllustration className="max-w-sm" />
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                <Link to="/" className="hover:text-primary">HOME</Link>
                {" / "}
                <Link to="/shop" className="hover:text-primary">MATTRESS</Link>
                {" / "}
                <span>{product.name.toUpperCase()}</span>
              </p>

              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mt-3">{product.name}</h1>

              <p className="text-primary font-bold text-2xl mt-3">From {formatNaira(selectedSize.price)}</p>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.shortDesc}</p>

              {/* Size */}
              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">Available Sizes (Mattress)</label>
                <Select value={sizeKey} onValueChange={setSizeKey}>
                  <SelectTrigger className="h-11 text-sm border-gray-300">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {product.sizes.map((s) => (
                      <SelectItem key={s.size} value={s.size} className="text-sm">
                        {formatSize(s)} — {formatNaira(s.price)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Qty + Add to cart */}
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

              {/* Custom size link */}
              <p className="mt-3 text-xs text-gray-500">
                To order for custom sizes for Mattresses, please click on the button below.
              </p>
              <a
                href="https://wa.me/2348053054348"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-sm text-primary font-semibold hover:underline"
              >
                Request Custom Size
              </a>

              {/* WhatsApp order */}
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

              {/* Trust bullets */}
              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Authorized Vitafoam Comfort Centre</li>
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary flex-shrink-0" /> Free delivery in Lagos for orders ₦50,000+</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" /> Manufacturer warranty intact · 7.5% VAT inclusive</li>
              </ul>
            </div>
          </div>

          {/* Description / Reviews tabs */}
          <div className="mt-14">
            <div className="flex gap-0 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                  activeTab === "description"
                    ? "bg-primary text-white rounded-t"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                  activeTab === "reviews"
                    ? "bg-primary text-white rounded-t"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                REVIEWS (0)
              </button>
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
                      <a href="https://wa.me/2348053054348" className="text-primary hover:underline" target="_blank" rel="noreferrer">
                        WhatsApp
                      </a>{" "}
                      to share your experience.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-white py-12">
          <div className="container mx-auto container-px">
            <h2 className="font-display text-2xl font-bold text-gray-900 uppercase mb-8">RELATED PRODUCTS</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
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
