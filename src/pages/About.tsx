import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, Truck, Star, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "100% Authentic Products", body: "Every product we sell is sourced directly from Vitafoam Nigeria. You will never receive a counterfeit or substandard item when you order from us." },
  { icon: Truck, title: "Free Delivery in Lagos and Ogun", body: "We offer free delivery across Lagos State and Ogun State for qualifying orders, bringing genuine Vitafoam comfort straight to your door." },
  { icon: CheckCircle2, title: "Nationwide Shipping", body: "We ship to all 36 states in Nigeria. No matter where you are, you can order with confidence and receive your products safely." },
  { icon: Star, title: "Expert Guidance", body: "Not sure which mattress is right for you? Our team is available on WhatsApp to help you pick the perfect grade and size for your needs and budget." },
];

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>About Us | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Vitafoam Mattress Nigeria is an authorized Vitafoam dealer serving Lagos and Ogun State with genuine Vitafoam mattresses, toppers, pillows and bedding." />
      <link rel="canonical" href="https://vitafoammattress.com/about" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">About Us</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / About Us
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vitafoam Mattress Nigeria is an authorized dealer of Vitafoam Nigeria's complete product range. We are based in Lagos and serve customers across Lagos State, Ogun State, and the rest of Nigeria with free nationwide shipping.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Vitafoam Nigeria Plc is the country's leading foam manufacturer, with over 50 years of experience producing world-class mattresses, pillows, toppers, and lifestyle products. As an authorized partner, we are proud to carry the full range of genuine Vitafoam products at fair, transparent prices.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple: to make quality sleep accessible to every Nigerian family. Whether you are setting up a new home, replacing an old mattress, or looking for the perfect gift, we are here to help you find the right product.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white mb-4">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Ready to Sleep Better?</h2>
          <p className="text-gray-600 mb-6">Browse our full range of Vitafoam mattresses, toppers, pillows, and bedding.</p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary/90 transition-colors uppercase tracking-wide text-sm"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default About;
