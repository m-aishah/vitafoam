import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SIZES = [
  { name: "Single", dims: '75" x 30"', desc: "Ideal for children, teenagers, or compact guest rooms." },
  { name: "Three-Quarter", dims: '75" x 42"', desc: "A step up from single. Great for older teens or tight spaces." },
  { name: "Double", dims: '75" x 54"', desc: "Standard for couples or adults who want extra room." },
  { name: "Queen", dims: '78" x 60"', desc: "Popular for master bedrooms. Comfortable for two people." },
  { name: "King", dims: '78" x 72"', desc: "Maximum space. Perfect for couples who want the most room." },
];

const GRADES = [
  { grade: "Deluxe", best: "Budget-conscious buyers", feel: "Firm", price: "Most affordable", desc: "Reliable everyday quality from Nigeria's leading foam brand. A great starting point." },
  { grade: "Shine", best: "Light sleepers on a budget", feel: "Medium Firm", price: "Budget", desc: "Improved comfort layers over Deluxe with added durability." },
  { grade: "Corona", best: "Most buyers", feel: "Medium", price: "Mid-range", desc: "Nigeria's most popular choice. The sweet spot between comfort and value." },
  { grade: "Grand", best: "Comfort seekers", feel: "Medium Soft", price: "Premium", desc: "High-end comfort engineered to last. A significant upgrade in sleep quality." },
  { grade: "Sizzler", best: "Those who love a plush feel", feel: "Soft", price: "Premium", desc: "Ultra-soft luxury feel. Sink in and experience deep relaxation every night." },
  { grade: "Vita Haven", best: "Back pain sufferers", feel: "Orthopaedic", price: "Premium", desc: "Designed with orthopaedic-grade support to promote spinal alignment." },
];

const BuyRightGuide = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Buy Right Guide | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Not sure which Vitafoam mattress to buy? Our Buy Right Guide helps you choose the right size, firmness and grade for your needs and budget." />
      <link rel="canonical" href="https://vitafoammattress.com/buy-right-guide" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Buy Right Guide</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Buy Right Guide
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-4xl space-y-14">

        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Step 1: Choose Your Size</h2>
          <p className="text-gray-500 text-sm mb-6">Match your mattress size to your bed frame and room dimensions.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SIZES.map((s) => (
              <div key={s.name} className="border border-gray-200 rounded-lg p-4">
                <p className="font-display font-bold text-gray-900">{s.name}</p>
                <p className="text-primary text-sm font-semibold mb-1">{s.dims}</p>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Step 2: Choose Your Firmness</h2>
          <p className="text-gray-500 text-sm mb-6">Your preferred sleep position affects which firmness is right for you.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { level: "Firm", best: "Back and stomach sleepers", desc: "Provides strong support and keeps your spine aligned. Less sinkage." },
              { level: "Medium", best: "All sleep positions", desc: "The most versatile feel. A balance of support and comfort suitable for most people." },
              { level: "Soft", best: "Side sleepers", desc: "Cushions shoulders and hips. Allows the body to sink in for pressure relief." },
            ].map((f) => (
              <div key={f.level} className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="font-display font-bold text-gray-900 text-lg mb-1">{f.level}</p>
                <p className="text-xs text-primary font-semibold mb-2">Best for: {f.best}</p>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Step 3: Choose Your Grade</h2>
          <p className="text-gray-500 text-sm mb-6">Vitafoam grades are ordered from most affordable to most premium.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {GRADES.map((g) => (
              <div key={g.grade} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-display font-bold text-gray-900">{g.grade}</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">{g.price}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">Feel: {g.feel} &bull; Best for: {g.best}</p>
                <p className="text-gray-600 text-sm">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Ready to Shop?</h3>
          <p className="text-gray-600 text-sm mb-5">Browse our full range of genuine Vitafoam mattresses in all grades and sizes.</p>
          <Link
            to="/shop?category=mattress"
            className="inline-block bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary/90 transition-colors uppercase tracking-wide text-sm"
          >
            Shop Mattresses
          </Link>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default BuyRightGuide;
