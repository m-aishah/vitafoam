import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Link } from "react-router-dom";
import { CheckCircle2, Award, Users, Truck } from "lucide-react";

const STATS = [
  { value: "60+", label: "Years of Vitafoam Excellence" },
  { value: "16", label: "Mattress Grades Available" },
  { value: "1st", label: "Foam Company with ISO 9001 in Nigeria" },
  { value: "24hrs", label: "Average Delivery Time in Lagos" },
];

const VALUES = [
  { icon: CheckCircle2, title: "Genuine Products Only", body: "We are an authorised Vitafoam Comfort Centre. Every product we sell comes directly from Vitafoam Nigeria and carries the full manufacturer warranty. You will never receive a counterfeit product from us." },
  { icon: Award, title: "Quality You Can Trust", body: "Vitafoam Nigeria was the first foam manufacturing company in Nigeria to achieve ISO 9001 certification — an internationally recognised quality management standard. That commitment to quality runs through every product we carry." },
  { icon: Users, title: "Customer-First Service", body: "From the moment you browse our website to the day your mattress is delivered, we are with you every step. Our WhatsApp support team is available 7 days a week to answer questions, confirm orders, and arrange delivery." },
  { icon: Truck, title: "Reliable Lagos Delivery", body: "We deliver across Lagos and Ogun State. Orders of ₦50,000 and above qualify for free delivery within Lagos metropolis (excluding Badagry, Ikorodu, Epe, and Ibeju-Lekki corridor). Most orders arrive within 24–48 hours." },
];

const About = () => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-2xl md:text-3xl font-bold relative z-10">About Us</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link>
        {" / "}
        <span className="text-white">About</span>
      </p>
    </section>

    {/* Mission */}
    <section className="py-14 bg-white">
      <div className="container mx-auto container-px">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-5">Nigeria's Trusted Vitafoam Comfort Centre</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We are an authorised Vitafoam Comfort Centre serving customers across Lagos and Ogun State. Our mission is simple: to make genuine Vitafoam mattresses and sleep products accessible, affordable, and easy to order — whether you're furnishing a new home, replacing an old mattress, or outfitting an entire property.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Vitafoam Nigeria has been manufacturing quality foam and sleep products since 1962. As an authorised dealer, we carry the full range — from the popular entry-level Deluxe to the premium Galaxy Orthopaedic — at prices that reflect true manufacturer-direct value. Every mattress comes with the Vitafoam manufacturer warranty intact.
          </p>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-10 bg-surface">
      <div className="container mx-auto container-px">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs text-gray-500 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-14 bg-white">
      <div className="container mx-auto container-px">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Why Buy From Us</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="flex gap-5">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-12 bg-primary text-white text-center">
      <div className="container mx-auto container-px">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Sleep Better?</h2>
        <p className="text-white/80 text-sm mb-6 max-w-xl mx-auto">Browse our full range of genuine Vitafoam mattresses and sleep products. Delivery across Lagos and Ogun State.</p>
        <Link
          to="/shop"
          className="inline-block bg-white text-gray-900 text-sm font-bold px-8 py-3 rounded hover:bg-gray-100 transition-colors uppercase tracking-wide"
        >
          SHOP MATTRESSES
        </Link>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default About;
