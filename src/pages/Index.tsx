import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProducts } from "@/lib/products";
import { Truck, Clock, CreditCard, CheckCircle2, Settings, Star } from "lucide-react";
import freeDeliveryImg from "@/assets/Vitafoam-Free-Delivery.jpg";
import mattressesImg from "@/assets/vitafoam-mattresses.png";

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

const CATEGORIES = [
  { label: "FURNITURE", to: "/shop" },
  { label: "PILLOW", to: "/shop" },
  { label: "MATTRESS", to: "/shop" },
  { label: "LIFESTYLE", to: "/shop" },
  { label: "MOTHER & CHILD", to: "/shop" },
];

const Index = () => {
  const products = getProducts();
  const featured = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-gray-900">
        <img
          src={freeDeliveryImg}
          alt="Free Delivery Within Lagos"
          className="w-full h-[420px] md:h-[520px] object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-start justify-center container mx-auto container-px">
          <div className="animate-fade-up">
            <p className="text-white text-xl md:text-2xl font-semibold italic mb-1">Enjoy</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary uppercase leading-none mb-2">
              FREE DELIVERY
            </h1>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-none">
              WITHIN LAGOS
            </h2>
            <p className="mt-4 text-white/80 text-sm">FOR ORDERS OF 50K AND ABOVE</p>
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
                to="/shop"
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
                <ProductCard product={p} />
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

          {/* Category tabs */}
          <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-8">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.label}
                to={cat.to}
                className={`px-5 py-3 text-sm font-bold tracking-wide transition-colors border-b-2 -mb-[2px] ${
                  i === 2
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
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-block bg-[#1a1a1a] text-white text-sm font-bold px-8 py-3 rounded hover:bg-gray-800 transition-colors uppercase tracking-wide"
            >
              VIEW ALL MATTRESSES
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
