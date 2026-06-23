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
  location: string;
  rating: number;
  text: string;
}

const MATTRESS_REVIEWS: Review[] = [
  { name: "Adaobi Okafor", location: "Lagos Island, Lagos", rating: 5, text: "I bought the Corona 75x54x8 three months ago and it has completely transformed my sleep. I wake up without the back pain I had for years. Worth every naira and the delivery to Lagos Island was smooth." },
  { name: "Emeka Eze", location: "Ikeja, Lagos", rating: 5, text: "Genuine Vitafoam product, fast delivery to Ikeja. The mattress is exactly as described — firm but comfortable. My whole family sleeps better now. I have already recommended to three friends." },
  { name: "Fatima Aliyu", location: "Abeokuta, Ogun State", rating: 5, text: "Ordered online and it was delivered to Abeokuta within 3 days. The quality is obviously superior to the fake Vitafoam products I had bought before at the market. This is the real thing." },
  { name: "Chukwuemeka Nwosu", location: "Surulere, Lagos", rating: 4, text: "Very good mattress for the price. I got the Grand 6x6 for our master bedroom and my wife loves it. Solid construction, smells fresh, no complaints at all. Will order again for the guest room." },
  { name: "Ngozi Adeleke", location: "Sagamu, Ogun State", rating: 5, text: "Best purchase I made this year. The delivery team was professional and courteous. The mattress is everything the description promised. Sleeping better than I have in a decade." },
];

const PILLOW_REVIEWS: Review[] = [
  { name: "Bukola Adeyemi", location: "Victoria Island, Lagos", rating: 5, text: "The Visco Elastic Pillow is incredible — it keeps cool all night which is a game changer in Lagos heat. I sleep right through without waking up hot anymore. Highly recommend." },
  { name: "Samuel Obi", location: "Yaba, Lagos", rating: 4, text: "Good quality pillow, much better than the generic ones I was buying from the market. The support is just right and it feels like it will last a long time. Great value." },
  { name: "Amaka Chibuike", location: "Ikorodu, Lagos", rating: 5, text: "Bought the Haven Memory Pillow for my mother who has neck problems. She says it is the best pillow she has ever used and her neck pain has reduced significantly. Amazing product." },
  { name: "Taiwo Balogun", location: "Ota, Ogun State", rating: 5, text: "Fast delivery to Ota, product is genuine and well packaged. The pillow is soft but supportive — exactly what I needed. Will be ordering more for the whole house." },
];

const GENERAL_REVIEWS: Review[] = [
  { name: "Oluwaseun Adebayo", location: "Festac, Lagos", rating: 5, text: "Excellent customer service and genuine Vitafoam products. I have been buying from this store for over a year and have never been disappointed. The WhatsApp team is very responsive." },
  { name: "Chiamaka Okoro", location: "Mowe, Ogun State", rating: 5, text: "Very impressed with the quality. Quick delivery to Mowe and the product was well packaged and in perfect condition. Will definitely be ordering again for more items." },
  { name: "Ibrahim Musa", location: "Ikeja, Lagos", rating: 4, text: "Good products at fair prices. The WhatsApp customer service is very responsive — they answered all my questions before I placed my order. Smooth process from start to finish." },
  { name: "Blessing Okonkwo", location: "Lekki, Lagos", rating: 5, text: "Smooth ordering process and genuine products. Exactly what you would expect from an authorised Vitafoam dealer. Quick delivery to Lekki and the item was well packed." },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sz} ${i <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function ReviewsSection({ category }: { category: string }) {
  const reviews = category === "mattress" ? MATTRESS_REVIEWS : category === "pillow" ? PILLOW_REVIEWS : GENERAL_REVIEWS;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="mt-14 border-t border-gray-100 pt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="font-display text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
          <StarRating rating={5} size="md" />
          <span className="text-2xl font-bold text-gray-900">{avg}</span>
          <span className="text-gray-500 text-sm">out of 5 &middot; {reviews.length} reviews</span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.location}</p>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
        <p className="font-bold text-gray-900 mb-1">Bought this product?</p>
        <p className="text-sm text-gray-600 mb-4">Share your experience and help other shoppers make the right choice.</p>
        <a
          href="https://wa.me/2348053054348?text=Hi%2C%20I%20would%20like%20to%20leave%20a%20review%20for%20a%20product%20I%20bought."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#1fba59] transition-colors text-sm"
        >
          <WhatsAppIcon className="h-4 w-4" /> Leave a Review on WhatsApp
        </a>
      </div>
    </section>
  );
}

const ProductDetail = () => {
  const { id = "" } = useParams();
  const all = useMemo(() => getGroupedShopItems(), []);
  const product = useMemo(() => all.find((p) => p.id === id), [all, id]);
  const related = useMemo(
    () => all.filter((p) => p.category === product?.category && p.id !== id).slice(0, 3),
    [all, id, product]
  );

  const sortedSizes = [...(product?.sizes ?? [])].sort((a, b) => a.price - b.price);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 container mx-auto container-px py-24 text-center">
          <h1 className="font-display text-3xl text-gray-900">Product not found</h1>
          <Link to="/shop" className="mt-6 inline-block bg-[#1a1a1a] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors uppercase">
            Back to Shop
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const selected = sortedSizes[sizeIdx] ?? sortedSizes[0];
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
        sizes: sortedSizes.map((s) => ({ size: s.label, L: s.L, W: s.W, T: s.T, price: s.price })),
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
        <meta name="description" content={`Buy ${product.name} in Lagos & Ogun State. ${product.shortDesc.slice(0, 120)}. Authorized Vitafoam dealer — free delivery for orders above 50,000 NGN.`} />
        <meta property="og:title" content={`${product.name} | Vitafoam Mattress Nigeria`} />
        <meta property="og:description" content={`Buy ${product.name} in Lagos & Ogun State. Authorized Vitafoam dealer with free delivery for orders above 50,000 NGN.`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <SiteHeader />

      <section className="bg-primary text-white py-8 md:py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold relative z-10 px-4">{product.name}</h1>
        <p className="mt-2 text-white/70 text-xs sm:text-sm relative z-10 px-4">
          <Link to="/" className="hover:text-white">Home</Link>
          {" / "}
          <Link to={`/shop?category=${product.category}`} className="hover:text-white capitalize">{product.categoryLabel}</Link>
          {" / "}
          <span className="text-white">{product.name}</span>
        </p>
      </section>

      <section className="py-8 md:py-10 flex-1 bg-white">
        <div className="container mx-auto container-px">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-2">
            {/* Image */}
            <div className="border border-gray-200 rounded bg-gray-50 aspect-square flex items-center justify-center p-6 md:p-8">
              {product.image ? (
                <img src={product.image} alt={product.name} className="max-w-full max-h-[420px] object-contain" />
              ) : (
                <MattressIllustration className="max-w-xs sm:max-w-sm w-full" />
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 hidden sm:block">
                <Link to="/" className="hover:text-primary">HOME</Link>
                {" / "}
                <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{product.categoryLabel.toUpperCase()}</Link>
                {" / "}
                <span>{product.name.toUpperCase()}</span>
              </p>

              {product.grade && product.badgeClass && (
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-xl mt-2 mb-1 ${product.badgeClass}`}>
                  {product.grade}
                </span>
              )}

              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

              <div className="flex items-center gap-3 mt-3">
                <p className="text-primary font-bold text-2xl">
                  {product.sizes.length > 1 ? "From " : ""}{formatNaira(selected.price)}
                </p>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-xl">VAT inclusive</span>
              </div>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.shortDesc}</p>

              {product.sizes.length > 1 && (
                <div className="mt-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Available Sizes</label>
                  <Select value={String(sizeIdx)} onValueChange={(v) => { setSizeIdx(Number(v)); }}>
                    <SelectTrigger className="h-11 text-sm border-gray-300 w-full">
                      <SelectValue placeholder="Choose a size" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {sortedSizes.map((s, i) => (
                        <SelectItem key={i} value={String(i)} className="text-sm">
                          {displaySize(s)} — {formatNaira(s.price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="mt-5 flex items-center gap-3">
                <div className="inline-flex items-center border border-gray-300 rounded flex-shrink-0">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-10 text-gray-700 text-xl font-medium hover:bg-gray-100 transition-colors">−</button>
                  <span className="w-10 text-center font-semibold text-gray-900">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-11 w-10 text-gray-700 text-xl font-medium hover:bg-gray-100 transition-colors">+</button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 h-11 bg-[#1a1a1a] text-white text-xs sm:text-sm font-bold rounded hover:bg-primary transition-colors uppercase tracking-wide flex items-center justify-center gap-2 min-w-0"
                >
                  <ShoppingCart className="h-4 w-4 flex-shrink-0" /> ADD TO CART
                </button>
              </div>

              <div className="mt-3">
                <a
                  href={whatsappOrderUrl(waMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 bg-[#25D366] text-white text-xs sm:text-sm font-bold rounded hover:bg-[#1fba59] transition-colors uppercase tracking-wide"
                >
                  <WhatsAppIcon className="h-5 w-5 flex-shrink-0" /> ORDER ON WHATSAPP
                </a>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Need a custom size?{" "}
                <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">
                  Chat with us on WhatsApp.
                </a>
              </p>

              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary flex-shrink-0" /> Authorized Vitafoam Comfort Centre</li>
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary flex-shrink-0" /> Free delivery in Lagos &amp; Ogun for orders above 50,000 NGN</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" /> Manufacturer warranty intact · 7.5% VAT inclusive</li>
              </ul>
            </div>
          </div>

          {/* Description tab */}
          <div className="mt-12 border-t border-gray-100 pt-10">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Product Description</h2>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              <p>{product.description}</p>
              <h4 className="font-bold text-gray-900 mt-5 mb-2">Key Benefits</h4>
              <ul className="space-y-1.5">
                <li>• Genuine Vitafoam quality and manufacturing standards</li>
                <li>• Durable foam construction for long-lasting support</li>
                <li>• Available in multiple sizes to fit your bed frame</li>
                <li>• 7.5% VAT inclusive pricing — no hidden costs</li>
                <li>• Delivered direct to your door across Nigeria</li>
              </ul>
            </div>
          </div>

          <ReviewsSection category={product.category} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="container mx-auto container-px">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900 uppercase mb-6 md:mb-8">You May Also Like</h2>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
