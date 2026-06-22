import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { TrendingUp, Award, Users, Package } from "lucide-react";

const BENEFITS = [
  { icon: Award, title: "Trusted Brand", body: "Sell under the Vitafoam Nigeria brand, one of the most recognised and trusted consumer brands in Nigeria with over 50 years of heritage." },
  { icon: TrendingUp, title: "Competitive Pricing", body: "Access competitive dealer pricing that allows you to build a profitable retail or wholesale business." },
  { icon: Users, title: "Marketing Support", body: "Benefit from Vitafoam Nigeria's national marketing efforts and receive support materials to promote your dealership." },
  { icon: Package, title: "Full Product Range", body: "Offer customers the complete Vitafoam range including mattresses, toppers, pillows, bedding, lifestyle, and baby products." },
];

const BecomeDistributor = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Become a Distributor | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Join the Vitafoam distribution network. Learn how to become an authorized Vitafoam dealer in Lagos, Ogun State or anywhere in Nigeria." />
      <link rel="canonical" href="https://vitafoammattress.com/become-a-distributor" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Become a Distributor</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Become a Distributor
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-4xl space-y-12">

        <div className="max-w-2xl">
          <p className="text-gray-600 leading-relaxed">
            Are you interested in joining the Vitafoam distribution network? We are always looking for motivated business partners across Nigeria to expand access to genuine Vitafoam products. As a Vitafoam dealer, you will be part of Nigeria's leading foam brand and serve your local community with products they trust.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Why Partner With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-bold text-gray-900 text-sm mb-1">{b.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Basic Requirements</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            {[
              "Registered business or sole trader with valid CAC documentation",
              "A physical retail space, showroom, or storage facility",
              "Ability to meet minimum order quantities",
              "Commitment to selling only authentic Vitafoam products at approved pricing",
              "Based in Nigeria with an active phone and WhatsApp contact",
            ].map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">How to Apply</h2>
          <p className="text-gray-600 text-sm mb-5">
            To start the conversation, reach out to us on WhatsApp or by phone with a brief introduction about your business, your location, and the type of partnership you are interested in. Our team will get back to you to discuss next steps.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/2348053054348"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded hover:bg-[#20bd5a] transition-colors text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+2348053054348"
              className="flex items-center gap-2 bg-[#1a1a1a] text-white font-bold px-6 py-2.5 rounded hover:bg-gray-800 transition-colors text-sm"
            >
              Call +234 805 305 4348
            </a>
          </div>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default BecomeDistributor;
