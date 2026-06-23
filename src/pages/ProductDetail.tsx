import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MattressIllustration from "@/components/MattressIllustration";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNaira, formatSize, whatsappOrderUrl, SizeOption } from "@/lib/products";
import { getGroupedShopItems, GroupedShopItem } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { addToCart } from "@/lib/cart";
import { Check, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { toast } from "@/hooks/use-toast";

function displaySize(s: { label: string; L: number; W: number; T: number; price: number }): string {
  if (s.L > 0 && s.W > 0) return formatSize({ size: s.label, L: s.L, W: s.W, T: s.T, price: s.price });
  return s.label;
}

interface Review {
  name: string;
  city: string;
  rating: 4 | 5;
  text: string;
}

const MATTRESS_REVIEWS: Review[] = [
  { name: "Amaka Okonkwo", city: "Lagos Island", rating: 5, text: "I bought this mattress for my master bedroom and the quality exceeded my expectations. Woke up without back pain for the first time in months. Delivery was prompt and the team was professional." },
  { name: "Emeka Nwosu", city: "Abuja", rating: 5, text: "Ordered online and had it delivered to Abuja without any issues. The mattress is firm with the right amount of cushioning. Fair pricing and smooth WhatsApp ordering process." },
  { name: "Ngozi Adeyemi", city: "Lekki, Lagos", rating: 5, text: "Bought mattresses for all three bedrooms and the delivery team even helped with setup. Truly excellent service. Our whole family sleeps so much better now." },
  { name: "Yetunde Akinsanya", city: "Sagamu, Ogun", rating: 4, text: "Did not think they delivered to Ogun State but they came through! Got my mattress delivered to Sagamu within 4 days. The quality is outstanding and will definitely reorder." },
  { name: "Tunde Fashola", city: "Victoria Island, Lagos", rating: 5, text: "Slept on this grade at a hotel and wanted the same experience at home. Vitafoam Comfort Centre confirmed it was the exact same product. Same-day delivery in Lagos. Outstanding!" },
  { name: "Bello Usman", city: "Kano", rating: 4, text: "Quality product as expected from Vitafoam. Customer service was very responsive on WhatsApp. Nationwide delivery to Kano was faster than expected. Very satisfied." },
];

const PILLOW_REVIEWS: Review[] = [
  { name: "Fatima Aliyu", city: "Ikeja, Lagos", rating: 5, text: "The Vitafoam pillow is incredibly soft and supportive. My neck pain from years of poor pillows is completely gone. This is the best pillow I have ever owned in Nigeria." },
  { name: "Chukwudi Eze", city: "Port Harcourt", rating: 4, text: "Very comfortable pillow that holds its shape well. Delivery to Port Harcourt took about 3 days which was reasonable. Would love to see more options but quality is top notch." },
  { name: "Aisha Mohammed", city: "Kaduna", rating: 5, text: "Ordered two pillows and they arrived in perfect condition. The filling is dense and comfortable without being too firm. My husband and I both love them. Will order more." },
  { name: "Seun Balogun", city: "Ibadan", rating: 5, text: "Was skeptical about buying a pillow online but the Vitafoam quality speaks for itself. Packaging was great and the pillow is exactly as described. Free delivery was a bonus." },
];

const GENERAL_REVIEWS: Review[] = [
  { name: "Adaeze Obi", city: "Enugu", rating: 5, text: "Amazing product quality and seamless ordering experience. The Vitafoam brand truly delivers on its promise. Will definitely be recommending to friends and family across Nigeria." },
  { name: "Segun Oladele", city: "Abeokuta, Ogun", rating: 5, text: "Vitafoam Mattress Nigeria had the best prices I found anywhere online. Delivery to Abeokuta was smooth and the product quality is exceptional. Very happy customer." },
  { name: "Grace Enyinnaya", city: "Owerri", rating: 4, text: "Good experience from start to finish. The product arrived well packaged and on time. Customer support was helpful on WhatsApp when I had questions. Would buy again." },
  { name: "Musa Danjuma", city: "Jos", rating: 5, text: "Placed my order on a Monday and had it by Thursday in Jos. The product is genuine Vitafoam - you can feel the quality difference immediately. Excellent service overall." },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function ReviewsSection({ category }: { category: string }) {
  const reviews = category === "pillow" ? PILLOW_REVIEWS : category === "mattress" ? MATTRESS_REVIEWS : GENERAL_REVIEWS;
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="container mx-auto container-px">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(Number(avgRating))} />
              <span className="text-sm font-semibold text-gray-700">{avgRating} out of 5</span>
              <span className="text-sm text-gray-400">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
              <StarRating rating={review.rating} />
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">"{review.text}"</p>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                <p className="text-xs text-gray-400">{review.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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
      <Helmet>
        <title>{product.name} | Buy in Lagos & Ogun — Vitafoam Mattress Nigeria</title>
        <meta name="description" content={`Buy ${product.name} in Lagos & Ogun State. ${product.shortDesc}. Authorized Vitafoam dealer with free delivery for orders ₦50,000+.`} />
        <meta property="og:title" content={`${product.name} | Vitafoam Mattress Nigeria`} />
        <meta property="og:description" content={`Buy ${product.name} in Lagos & Ogun State. ${product.shortDesc}. Authorized Vitafoam dealer with free delivery for orders ₦50,000+.`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Vitafoam Mattress Nigeria`} />
        <meta name="twitter:description" content={`Buy ${product.name} in Lagos & Ogun State. ${product.shortDesc}. Authorized Vitafoam dealer with free delivery for orders ₦50,000+.`} />
      </Helmet>
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

              <div className="mt-5 flex flex-wrap items-center gap-3">
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
            <div className="flex gap-0 border-b border-gray-200 overflow-x-auto">
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

      <ReviewsSection category={product.category} />

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
