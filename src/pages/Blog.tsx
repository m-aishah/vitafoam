import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const POSTS = [
  {
    title: "How to Choose the Right Vitafoam Mattress for Your Body Type",
    date: "June 10, 2026",
    category: "Buying Guide",
    gradient: "from-primary/80 to-primary",
    excerpt: "Not all mattresses are created equal. Your body type, sleeping position, and weight all play a role in determining which Vitafoam grade and firmness will give you the best night's rest.",
  },
  {
    title: "5 Signs You Need a New Mattress Right Now",
    date: "May 28, 2026",
    category: "Sleep Tips",
    gradient: "from-amber-500 to-orange-500",
    excerpt: "Waking up with aches and pains? Sagging in the middle? These are just two of the telltale signs that your current mattress has passed its best. Here is what to look out for.",
  },
  {
    title: "Vitafoam Grades Explained: Deluxe, Corona, Grand and Beyond",
    date: "May 15, 2026",
    category: "Product Info",
    gradient: "from-blue-500 to-indigo-600",
    excerpt: "Vitafoam offers more than ten mattress grades. We break down the key differences in comfort level, materials, and price so you can make the best choice for your budget.",
  },
  {
    title: "How to Care for Your Vitafoam Mattress and Make It Last Longer",
    date: "April 30, 2026",
    category: "Care Tips",
    gradient: "from-teal-500 to-emerald-600",
    excerpt: "A good mattress is an investment. With the right care habits, you can extend the life of your Vitafoam mattress and enjoy consistent comfort for years to come.",
  },
  {
    title: "The Benefits of Sleeping on a Quality Mattress",
    date: "April 18, 2026",
    category: "Sleep Tips",
    gradient: "from-purple-500 to-violet-600",
    excerpt: "Sleep quality affects everything from your mood to your immune system. We explore how upgrading to a quality Vitafoam mattress can make a real difference to your daily life.",
  },
  {
    title: "Why Buying a Genuine Vitafoam Matters: Spotting Fakes",
    date: "April 5, 2026",
    category: "Buying Guide",
    gradient: "from-rose-500 to-red-600",
    excerpt: "Counterfeit foam products flood the Nigerian market. Learn how to tell the difference between a genuine Vitafoam product and an inferior imitation, and why it matters for your health.",
  },
];

const Blog = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Blog | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Sleep tips, buying guides, and product information from the Vitafoam Mattress Nigeria team." />
      <link rel="canonical" href="https://vitafoammattress.com/blog" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Blog</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">Tips, guides and sleep advice from the Vitafoam Mattress Nigeria team</p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <div key={post.title} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
              <div className={`bg-gradient-to-br ${post.gradient} h-40 flex items-end p-4`}>
                <span className="text-white/90 text-xs font-semibold uppercase tracking-wide">{post.category}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="font-display font-bold text-gray-900 text-sm mb-2 leading-snug">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <button className="mt-4 text-primary text-sm font-semibold hover:underline text-left">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Blog;
