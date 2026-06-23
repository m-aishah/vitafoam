import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useCatalogReady } from "@/hooks/useCatalog";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getGroupedShopItems } from "@/lib/catalog";
import {
  Truck,
  Clock,
  CreditCard,
  CheckCircle2,
  Settings,
  Star,
  ShieldCheck,
  Award,
} from "lucide-react";
import freeDeliveryImg from "@/assets/Vitafoam-Free-Delivery.jpg";
import gdnsImg from "@/assets/vitafoam-GDNs-07-scaled.jpg";
import mattressesImg from "@/assets/vitafoam-mattresses.png";

const HERO_SLIDES = [
  { src: freeDeliveryImg, bg: "#ffffff" },
  { src: gdnsImg, bg: "#f5e6c8" },
];

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
  {
    stars: 5,
    quote:
      "I bought the Vitafoam Corona mattress for my master bedroom and I honestly can't believe the difference. Woke up without back pain for the first time in years! Delivery was on time and the guys were very professional. Highly recommend Vitafoam Comfort Centre.",
    name: "Amaka Okonkwo",
    city: "Lagos",
  },
  {
    stars: 5,
    quote:
      "Ordered the Grand mattress for my new apartment. The quality is exceptional — very firm with just the right amount of cushioning. They delivered to Abuja without any issues. Price was fair and the WhatsApp ordering process was smooth.",
    name: "Emeka Nwosu",
    city: "Abuja",
  },
  {
    stars: 5,
    quote:
      "I got the memory foam topper for my existing mattress and it's been a game changer. My husband and I both sleep so much better now. Vitafoam Comfort Centre had the best price I found anywhere online. Will definitely shop here again.",
    name: "Fatima Aliyu",
    city: "Lagos",
  },
  {
    stars: 4,
    quote:
      "Good experience overall. The Vita Haven pillow I ordered is incredibly soft and comfortable. Delivery took about 3 days to Port Harcourt which was reasonable. Would love to see more pillow options but quality is top notch.",
    name: "Chukwudi Eze",
    city: "Port Harcourt",
  },
  {
    stars: 5,
    quote:
      "Bought mattresses for all three bedrooms during their sale. The delivery team even helped set everything up. Truly excellent service. The kids love their new mattresses and we love ours. Our whole family sleeps better now.",
    name: "Ngozi Adeyemi",
    city: "Lagos",
  },
  {
    stars: 4,
    quote:
      "Quality product as expected from Vitafoam. I ordered the bedding set and it's very durable and comfortable. Customer service was responsive on WhatsApp. Nationwide delivery to Kano was faster than expected.",
    name: "Bello Usman",
    city: "Kano",
  },
  {
    stars: 5,
    quote:
      "The Corona mattress is absolutely worth every naira. I was skeptical about buying a mattress online but Vitafoam Comfort Centre made it easy. Free delivery in Lagos was a huge bonus. Will recommend to all my friends and family.",
    name: "Adaeze Obi",
    city: "Lagos",
  },
  {
    stars: 5,
    quote:
      "Excellent! I purchased the Grand mattress after sleeping on one at a hotel and wanting the same experience at home. Vitafoam Comfort Centre confirmed it was the exact same product. Delivery was same-day within Lagos. Outstanding service!",
    name: "Tunde Fashola",
    city: "Lagos",
  },
  {
    stars: 5,
    quote:
      "I was not sure they delivered to Ogun State but they did! Got my Sizzler mattress delivered to Sagamu within 4 days. Very professional service and the mattress quality is outstanding. Will definitely order again.",
    name: "Yetunde Akinsanya",
    city: "Sagamu, Ogun",
  },
  {
    stars: 5,
    quote:
      "Ordered two mattresses for my new house in Abeokuta. Vitafoam Mattress Nigeria had the best prices online and delivery was smooth. The Deluxe grade is perfect for the guest room. Very happy customer!",
    name: "Segun Oladele",
    city: "Abeokuta, Ogun",
  },
];

const SHOP_CATEGORIES = [
  { label: "MATTRESSES", to: "/shop?category=mattress" },
  { label: "TOPPERS", to: "/shop?category=topper" },
  { label: "PILLOWS", to: "/shop?category=pillow" },
  { label: "BEDDING", to: "/shop?category=bedding" },
  { label: "LIFESTYLE", to: "/shop?category=lifestyle" },
];

const Index = () => {
  const catalogTick = useCatalogReady();
  const allItems = useMemo(() => getGroupedShopItems(), [catalogTick]);
  const mattresses = useMemo(
    () => allItems.filter((p) => p.category === "mattress"),
    [allItems],
  );
  const featured = mattresses.slice(0, 6);

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Vitafoam Mattress Nigeria | Buy Vitafoam in Nigeria</title>
        <meta
          name="description"
          content="Buy genuine Vitafoam mattresses in Lagos and Ogun State. Authorized Vitafoam dealer — Corona, Grand, Deluxe, Sizzler and more. Free delivery in Lagos for orders ₦50,000+."
        />
        <meta
          name="keywords"
          content="vitafoam mattress Nigeria, vitafoam Lagos, vitafoam Ogun, buy mattress Lagos, buy mattress Ogun State, Vitafoam dealer Nigeria, mattress Lagos, mattress Nigeria, vitafoam corona mattress, vitafoam grand mattress"
        />
        <meta
          property="og:title"
          content="Vitafoam Mattress Nigeria | Buy Vitafoam in Lagos & Ogun State"
        />
        <meta
          property="og:description"
          content="Buy genuine Vitafoam mattresses in Lagos and Ogun State. Authorized Vitafoam dealer — Corona, Grand, Deluxe, Sizzler and more. Free delivery in Lagos for orders ₦50,000+."
        />
        <meta property="og:url" content="https://vitafoammattress.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Vitafoam Mattress Nigeria | Buy Vitafoam in Lagos & Ogun State"
        />
        <meta
          name="twitter:description"
          content="Buy genuine Vitafoam mattresses in Lagos and Ogun State. Authorized Vitafoam dealer — Corona, Grand, Deluxe, Sizzler and more. Free delivery in Lagos for orders ₦50,000+."
        />
        <link rel="canonical" href="https://vitafoammattress.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Vitafoam Mattress Nigeria",
            description:
              "Authorized Vitafoam dealer selling genuine Vitafoam mattresses, toppers, pillows, bedding and lifestyle products in Lagos and Ogun State, Nigeria.",
            url: "https://vitafoammattress.com",
            telephone: "+2348053054348",
            address: {
              "@type": "PostalAddress",
              addressCountry: "NG",
              addressRegion: "Lagos",
            },
            areaServed: [
              { "@type": "State", name: "Lagos State", addressCountry: "NG" },
              { "@type": "State", name: "Ogun State", addressCountry: "NG" },
            ],
            priceRange: "₦₦",
            openingHours: "Mo-Sa 08:00-18:00",
            sameAs: ["https://vitafoammattress.com"],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "8",
              bestRating: "5",
            },
          })}
        </script>
      </Helmet>
      <SiteHeader />

      {/* HERO SLIDER */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative w-full h-[56vw] sm:h-[50vw] max-h-[540px] min-h-[180px]">
          {HERO_SLIDES.map(({ src }, i) => (
            <img
              key={src}
              src={src}
              alt="Vitafoam"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_SLIDES.map((_s, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-gray-700" : "w-2 bg-gray-400/70"}`}
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
                <p className="font-bold text-sm">
                  FREE DELIVERY IN LAGOS & OGUN STATE
                </p>
                <p className="text-gray-400 text-xs">
                  FOR ORDERS OF 50K AND ABOVE · SEE TERMS & CONDITIONS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 md:py-2 md:px-6">
              <Clock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">
                  DELIVERY WITHIN 3-5 WORKING DAYS
                </p>
                <p className="text-gray-400 text-xs">
                  LAGOS & OGUN STATE · NATIONWIDE SHIPPING AVAILABLE
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3 md:py-2 md:px-6">
              <CreditCard className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">
                  PAY ONLINE OR VIA BANK DEPOSIT
                </p>
                <p className="text-gray-400 text-xs">
                  USE OUR SECURE ONLINE PAYMENT GATEWAY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto container-px">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Lagos & Ogun's Most Trusted Vitafoam Dealer
              </h2>
              <p className="text-gray-600 mb-4">
                We are an authorized Vitafoam dealer serving Lagos State and
                Ogun State, offering the complete Vitafoam Nigeria product range
                — from premium mattresses like the Corona, Grand, Deluxe and
                Sizzler, to toppers, pillows, bedding, and lifestyle products.
              </p>
              <p className="text-gray-600 mb-4">
                Every product we sell is 100% genuine Vitafoam, backed by the
                brand's quality guarantee. We offer free delivery across Lagos
                and Ogun State for qualifying orders, and nationwide shipping
                throughout Nigeria.
              </p>
              <p className="text-gray-600">
                Looking to buy Vitafoam in Lagos or Ogun State? We are your
                closest authorized source — no middlemen, no fakes, just the
                real Vitafoam comfort you deserve.
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    100%
                  </div>
                  <div className="text-gray-600 text-sm">
                    Authentic Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    Free
                  </div>
                  <div className="text-gray-600 text-sm">
                    Lagos & Ogun Delivery
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    50+
                  </div>
                  <div className="text-gray-600 text-sm">
                    Products Available
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    5★
                  </div>
                  <div className="text-gray-600 text-sm">Customer Rated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* WHY VITAFOAM */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto container-px">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Why Vitafoam is Best for You
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {WHY_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-white mb-5">
                    <f.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {f.body}
                  </p>
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
            <div className="flex-1 text-white text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <CheckCircle2 className="h-7 w-7" />
                <h3 className="font-display text-2xl md:text-3xl font-bold">
                  Buy Right
                </h3>
              </div>
              <p className="text-white/80 text-sm mb-5">
                So many mattresses to choose from!
                <br />
                Let's help you choose the best one for you.
              </p>
              <Link
                to="/shop?category=mattress"
                className="inline-block bg-white text-gray-900 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors uppercase tracking-wide"
              >
                FIND THE RIGHT MATTRESS
              </Link>
            </div>
            <div className="flex-shrink-0 md:absolute md:right-8 md:bottom-0 flex justify-center">
              <img
                src={mattressesImg}
                alt="Vitafoam Mattresses"
                className="h-36 sm:h-40 md:h-52 w-auto object-contain max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS OF THE WEEK */}
      <section className="py-16 bg-white">
        <div className="container mx-auto container-px">
          <Reveal className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Products of the Week
            </h2>
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
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Shop By Category
            </h2>
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
              className="inline-block bg-[#1a1a1a] text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors uppercase tracking-wide"
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
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
          </Reveal>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex gap-1 text-primary mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-5 text-sm font-bold text-gray-900">
                    {t.name}{" "}
                    <span className="text-gray-400 font-normal">
                      — {t.city}
                    </span>
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
