import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";

const QualityPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Quality Policy | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Vitafoam Nigeria is ISO-certified and committed to world-class manufacturing standards. As an authorized dealer, we guarantee every product we sell is 100% genuine." />
      <link rel="canonical" href="https://vitafoammattress.com/quality-policy" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Quality Policy</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Quality Policy
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-3xl space-y-10">

        <div>
          <p className="text-gray-600 leading-relaxed">
            Quality is at the heart of everything Vitafoam Nigeria does. As an authorized Vitafoam dealer, we are committed to upholding those same standards in every product we sell and every interaction with our customers.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Vitafoam Nigeria's Quality Standards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: "ISO Certified", body: "Vitafoam Nigeria Plc was the first foam manufacturer in Nigeria to achieve ISO certification under the internationally recognised Quality Management System (ISO 9001)." },
              { icon: ShieldCheck, title: "Rigorous Testing", body: "Every Vitafoam product is rigorously tested by skilled engineers before leaving the factory. Products must meet strict density, durability, and comfort standards." },
              { icon: CheckCircle2, title: "International Standards", body: "Manufacturing conforms to international standards and applicable statutory requirements, ensuring products that exceed customer expectations at a fair price." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white mb-3">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Our Commitment as an Authorized Dealer</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            {[
              "We stock only 100% genuine Vitafoam products sourced directly from Vitafoam Nigeria Plc.",
              "We do not sell counterfeit, refurbished, or unauthorised imitations of Vitafoam products.",
              "All products are stored appropriately to maintain their quality before delivery.",
              "We provide accurate product descriptions, dimensions, and pricing to help customers make informed decisions.",
              "We stand behind every product we sell and will resolve quality issues promptly.",
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-700 font-semibold mb-2">Have a quality concern?</p>
          <p className="text-gray-600 text-sm mb-4">If you receive a product that does not meet the expected Vitafoam quality standard, contact us immediately and we will make it right.</p>
          <Link to="/contact" className="inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors uppercase tracking-wide text-sm">
            Contact Us
          </Link>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default QualityPolicy;
