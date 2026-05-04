import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MattressIllustration from "@/components/MattressIllustration";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getProduct, formatNaira, formatSize, whatsappOrderUrl } from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { ArrowLeft, Check, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import vitafoamMark from "@/assets/vitafoam-mark.png";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => getProduct(id), [id]);
  const [sizeKey, setSizeKey] = useState<string>(product?.sizes[0]?.size ?? "");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 container mx-auto container-px py-24 text-center">
          <h1 className="font-display text-4xl text-primary">Product not found</h1>
          <Button asChild className="mt-6"><Link to="/shop">Back to Shop</Link></Button>
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

  const waMessage = `Hi Multibiz.global Venture, I'd like to order:\n\n• ${product.name}\n• Size: ${formatSize(selectedSize)}\n• Qty: ${qty}\n• Price: ${formatNaira(selectedSize.price * qty)} (7.5% VAT inclusive)\n\nPlease confirm availability and delivery.`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="border-b border-border bg-surface">
        <div className="container mx-auto container-px py-4 text-sm text-muted-foreground">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 hover:text-primary transition-smooth">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto container-px grid gap-12 lg:grid-cols-2">
          {/* Image area */}
          <div className="relative rounded-2xl bg-gradient-to-br from-primary-soft via-secondary to-primary-soft p-8 lg:p-12 shadow-card">
            <span className={`absolute top-5 left-5 rounded-full px-3 py-1.5 text-xs font-semibold ${product.badgeClass}`}>
              {product.grade}
            </span>
            <div className="flex h-full items-center justify-center">
              <MattressIllustration className="max-w-md" />
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-primary/60">
              <img src={vitafoamMark} alt="Vitafoam" className="h-5 w-5 object-contain" />
              <ShieldCheck className="h-4 w-4" /> Genuine Vitafoam Product
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">{product.grade}</span>
            <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-primary leading-tight">{product.name}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Price display */}
            <div className="mt-7 rounded-xl border border-border bg-card p-6">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Price</div>
              <div className="mt-1 font-display text-4xl font-bold text-primary">
                {formatNaira(selectedSize.price)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">7.5% VAT inclusive</div>
            </div>

            {/* Size dropdown */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-primary mb-2">Select Size</label>
              <Select value={sizeKey} onValueChange={setSizeKey}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {product.sizes.map((s) => (
                    <SelectItem key={s.size} value={s.size} className="text-sm">
                      {formatSize(s)}, {formatNaira(s.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-primary mb-2">Quantity</label>
              <div className="inline-flex items-center rounded-md border border-input">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 text-primary text-xl font-medium hover:bg-secondary transition-smooth" aria-label="Decrease">−</button>
                <span className="w-14 text-center font-semibold text-primary">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-12 w-12 text-primary text-xl font-medium hover:bg-secondary transition-smooth" aria-label="Increase">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button onClick={handleAdd} variant="navy" size="lg" className="h-12">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </Button>
              <Button asChild variant="gold" size="lg" className="h-12">
                <a href={whatsappOrderUrl(waMessage)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust */}
            <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Authorized Vitafoam Distributor</li>
              <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Nationwide delivery across Nigeria</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Manufacturer warranty intact</li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ProductDetail;
