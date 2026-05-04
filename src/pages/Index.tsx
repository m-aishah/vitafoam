import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import MattressIllustration from "@/components/MattressIllustration";
import Reveal from "@/components/Reveal";
import { getProducts, formatNaira } from "@/lib/products";
import { ArrowRight, ShieldCheck, Ruler, Truck, Star } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import vitafoamLogo from "@/assets/vitafoam-logo.svg";

const FEATURES = [
  { icon: ShieldCheck, title: "Authorized Distributor", body: "Direct from Vitafoam. 100% genuine products with manufacturer warranty intact." },
  { icon: Ruler, title: "Every Size & Grade", body: "From single beds to custom king sizes. Every Vitafoam grade, always in stock." },
  { icon: WhatsAppIcon, title: "WhatsApp Checkout", body: "No complicated forms. Order directly on WhatsApp, fast, simple, personal." },
  { icon: Truck, title: "Delivered Nationwide", body: "We deliver across Nigeria. Your mattress, when and where you need it." },
];

const TESTIMONIALS = [
  { stars: 5, quote: "Best mattress I've ever slept on. The Corona grade is worth every kobo!", name: "Adaeze O.", city: "Lagos" },
  { stars: 5, quote: "Ordered via WhatsApp, delivered in 2 days. Excellent service!", name: "Emeka N.", city: "Abuja" },
  { stars: 5, quote: "Finally found a reliable Vitafoam distributor. Will always come back.", name: "Fatima I.", city: "Kano" },
];

const Index = () => {
  const products = getProducts();
  const featured = products.slice(0, 6);
  const heroFeatured = products.find((p) => p.grade === "Corona") || products[0];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&auto=format&fit=crop&q=80"
            alt="Premium bedroom interior"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        <div className="container mx-auto container-px py-20 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Authorized Vitafoam Distributor
              </span>
              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
                Sleep Like Royalty.<br /><span className="text-accent">Every Night.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
                Nigeria's trusted Vitafoam distributor, premium mattresses delivered to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/shop">Shop Mattresses <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <a href="#why">Learn More</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                <span>✓ All Sizes Available</span>
                <span>✓ Order via WhatsApp</span>
                <span>✓ Genuine Products Only</span>
              </div>

              {/* Authorized Vitafoam badge */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white/95 px-5 py-3 shadow-elegant backdrop-blur">
                <img src={vitafoamLogo} alt="Vitafoam" className="h-12 w-auto" />
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/70">Authorized Distributor</div>
                  <div className="text-sm font-bold text-primary">Genuine Vitafoam Products</div>
                </div>
              </div>
            </div>

            {/* Floating product card */}
            {heroFeatured && (
              <div className="hidden lg:flex justify-center">
                <div className="animate-float w-full max-w-sm rounded-2xl bg-white p-6 shadow-elegant">
                  <div className="rounded-xl bg-gradient-to-br from-primary-soft to-secondary p-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${heroFeatured.badgeClass}`}>
                      {heroFeatured.grade}
                    </span>
                    <MattressIllustration className="mt-3" />
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-xl font-semibold text-primary">{heroFeatured.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Most popular Vitafoam grade in Nigeria.</p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">From</div>
                        <div className="font-display text-2xl font-bold text-primary">{formatNaira(heroFeatured.sizes[0].price)}</div>
                      </div>
                      <Link to={`/product/${heroFeatured.id}`} className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 hover:gap-2.5 transition-smooth">
                        View <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="bg-surface py-20 lg:py-28">
        <div className="container mx-auto container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Why Us</span>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-primary">Why Choose Multibiz.global?</h2>
            <p className="mt-4 text-muted-foreground">Premium products, transparent pricing, personal service, that's our promise.</p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group relative h-full overflow-hidden rounded-xl bg-card p-7 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${f.icon === WhatsAppIcon ? "bg-[#25D366]/10 text-[#25D366]" : "bg-primary-soft text-primary"}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-primary">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Best Sellers</span>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-primary">Our Best Sellers</h2>
            <p className="mt-4 text-muted-foreground">Hand-picked Vitafoam grades our customers love most.</p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/shop">View All Mattresses <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-primary py-20 lg:py-28 text-primary-foreground">
        <div className="container mx-auto container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Reviews</span>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-bold">What Our Customers Say</h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="h-full rounded-xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                  <div className="flex gap-1 text-accent">
                    {Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-5 font-display text-lg leading-relaxed">"{t.quote}"</p>
                  <div className="mt-6 text-sm font-semibold">
                    {t.name} <span className="text-primary-foreground/60 font-normal">, {t.city}</span>
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
