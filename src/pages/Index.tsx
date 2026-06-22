import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getGroupedShopItems } from "@/lib/catalog";
import { Truck, Clock, CreditCard, CheckCircle2, Settings, Star } from "lucide-react";
import freeDeliveryImg from "@/assets/Vitafoam-Free-Delivery.jpg";
import gdnsImg from "@/assets/vitafoam-GDNs-07-scaled.jpg";
import mattressesImg from "@/assets/vitafoam-mattresses.png";

const HERO_SLIDES = [freeDeliveryImg, gdnsImg];

const WHY_FEATURES = [
  {
    icon: CheckCircle2,
    title: "Support In The Right Places",
    body: "Our unique mattress is the ideal choice if you want to have a great night and wake up without aches and pains. Our mattresses makes you feel as if you're sleeping on the clouds.",
  },
  {
    icon: Settings,
    title: "Quality Made In Nigeria",
    body: "Our Mattresses are carefully manufactured and rigorously tested by skilled experts adhering to strict quality standards. We are the first Foam Manufacturing Company in Nigeria to subject its quality system to the internationally acclaimed Quality Management System.",
  },
  {
    icon: Star,
    title: "The Best Of Materials",
    body: "Our products are made to give you premium comfort as we use the best of materials. The manufacturing of our products conforms to international standards, applicable statutory, regulatory and other requirements to surpass customers' expectations at a price that represents value.",
  },
];

const TESTIMONIALS = [
  { stars: 5, quote: "Best mattress I've ever slept on. The Corona grade is worth every kobo!", name: "Adaeze O.", city: "Lagos" },
  { stars: 5, quote: "Ordered via WhatsApp, delivered in 2 days. Excellent service!", name: "Emeka N.", city: "Abuja" },
  { stars: 5, quote: "Finally found a reliable Vitafoam distributor. Will always come back.", name: "Fatima I.", city: "Kano" },
];

const SHOP_CATEGORIES = [
  { label: "MATTRESSES", to: "/shop?category=mattress" },
  { label: "TOPPERS", to: "/shop?category=topper" },
  { label: "PILLOWS", to: "/shop?category=pillow" },
  { label: "BEDDING", to: "/shop?category=bedding" },
  { label: "LIFESTYLE", to: "/shop?category=lifestyle" },
];

const Index = () => {
  const allItems = useMemo(() => getGroupedShopItems(), []);
  const mattresses = useMemo(() => allItems.filter((p) => p.category === "mattress"), [allItems]);
  const featured = mattresses.slice(0, 6);

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO SLIDER */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/7]">
          {HERO_SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Vitafoam"
              className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-white" : "w-2 bg-white/50"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="container mx-auto container-px py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            <div className="flex items-center gap-3 py-3 md:py-2 md:px-6 first:md:pl-0">
              <Truck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">FREE DELIVERY WITHIN LAGOS ONLY</p>
                <p className="text-gray-400 text-xs">FOR ORDERS OF 50K AND ABOVE · SEE TERMS & CONDITIONS</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 md:py-2 md:px-6">
              <Clock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">DELIVERY WITHIN 3-5 WORKING DAYS</p>
                <p className="text-gray-400 text-xs">IN LAGOS ONLY · FREE DELIVERY INFORMATION</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 md:py-2 md:px-6">
              <CreditCard className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">PAY ONLINE OR VIA BANK DEPOSIT</p>
                <p className="text-gray-400 text-xs">USE OUR SECURE ONLINE PAYMENT GATEWAY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VITAFOAM */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto container-px">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Why Vitafoam is Best for You</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {WHY_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-white mb-5">
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUY RIGHT BANNER */}
      <section className="py-8 bg-white">
        <div className="container mx-auto container-px">
          <div className="rounded-lg bg-primary p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-7 w-7" />
                <h3 className="font-display text-2xl md:text-3xl font-bold">Buy Right</h3>
              </div>
              <p className="text-white/80 text-sm mb-5">
                So many mattresses to choose from!<br />Let's help you choose the best one for you.
              </p>
              <Link
                to="/shop?category=mattress"
                className="inline-block bg-white text-gray-900 text-sm font-bold px-6 py-2.5 rounded hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                FIND THE RIGHT MATTRESS
              </Link>
            </div>
            <div className="flex-shrink-0 md:absolute md:right-8 md:bottom-0">
              <img src={mattressesImg} alt="Vitafoam Mattresses" className="h-40 md:h-52 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS OF THE WEEK */}
      <section className="py-16 bg-white">
        <div className="container mx-auto container-px">
          <Reveal className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Products of the Week</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard item={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto container-px">
          <Reveal className="text-center mb-8">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Shop By Category</h2>
          </Reveal>

          <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-8">
            {SHOP_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.label}
                to={cat.to}
                className={`px-5 py-3 text-sm font-bold tracking-wide transition-colors border-b-2 -mb-[2px] ${
                  i === 0
                    ? "text-primary border-primary"
                    : "text-gray-700 border-transparent hover:text-primary"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(3, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <ProductCard item={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-block bg-[#1a1a1a] text-white text-sm font-bold px-8 py-3 rounded hover:bg-gray-800 transition-colors uppercase tracking-wide"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto container-px">
          <Reveal className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="border border-gray-200 rounded p-6">
                  <div className="flex gap-1 text-primary mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-5 text-sm font-bold text-gray-900">
                    {t.name} <span className="text-gray-400 font-normal">— {t.city}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
