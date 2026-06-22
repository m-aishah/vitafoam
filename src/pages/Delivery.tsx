import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Truck, Clock, MapPin, CheckCircle2 } from "lucide-react";

const Delivery = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Delivery Information | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Free delivery within Lagos and Ogun State for orders of 50,000 NGN and above. Nationwide shipping available across all 36 states in Nigeria." />
      <link rel="canonical" href="https://vitafoammattress.com/delivery" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Delivery Information</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Delivery Information
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-4xl space-y-12">

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-primary/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900">Free Delivery</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Available within Lagos State and Ogun State</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> For orders totalling 50,000 NGN or more</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Delivery within 3 to 5 working days</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" /> Our team will call to confirm a convenient delivery time</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gray-800 text-white flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900">Nationwide Delivery</h2>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /> Available to all 36 states in Nigeria</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /> Delivery within 5 to 10 working days</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /> Delivery fee calculated based on location and order size</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /> Fee communicated before payment is taken</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">How Delivery Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", icon: CheckCircle2, title: "Place Your Order", body: "Add products to your cart and complete checkout, or send us your order via WhatsApp. Our team confirms your order and payment." },
              { step: "2", icon: Clock, title: "Confirmation Call", body: "We call you to confirm delivery details, your address, and a convenient delivery window. You will receive an order reference number." },
              { step: "3", icon: Truck, title: "Delivery", body: "Our delivery team brings your order directly to your door within the agreed timeframe. Inspect items on arrival before signing off." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{s.step}</div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Delivery FAQs</h2>
          <div className="space-y-4">
            {[
              { q: "Can I choose a specific delivery date?", a: "We will work with you to find a convenient delivery window when we call to confirm your order." },
              { q: "What if I am not home when delivery arrives?", a: "Please contact us as soon as possible to reschedule. We will hold your order and arrange an alternative delivery time." },
              { q: "Do you assemble the mattress or furniture?", a: "Our delivery team can assist with basic placement. Please let us know in advance if you need help and we will do our best to accommodate." },
              { q: "What if my item arrives damaged?", a: "Inspect all items before signing. If anything is damaged in transit, refuse delivery and contact us immediately on WhatsApp so we can resolve it." },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-semibold text-gray-900 text-sm">{item.q}</p>
                <p className="text-gray-600 text-sm mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Delivery;
