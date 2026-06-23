import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { MapPin, Phone } from "lucide-react";

const Locations = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Our Locations | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Vitafoam Mattress Nigeria serves customers in Lagos and Ogun State including Sagamu, Abeokuta and Ijebu Ode. Contact us for your nearest pick-up or delivery." />
      <link rel="canonical" href="https://vitafoammattress.com/locations" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Our Locations</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Our Locations
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-4xl space-y-12">

        <p className="text-gray-600 leading-relaxed">
          Vitafoam Mattress Nigeria serves customers across Lagos State and Ogun State with genuine Vitafoam products and free delivery for qualifying orders. Contact us to confirm availability, arrange a viewing, or schedule delivery to your area.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-gray-900">Lagos State</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              We serve all areas within Lagos State including Lagos Island, Lagos Mainland, Victoria Island, Lekki, Surulere, Ikeja, Yaba, Festac, Ikorodu, and surrounding areas. Free delivery is available for orders of 50,000 NGN and above.
            </p>
            <ul className="text-gray-500 text-sm space-y-1">
              <li>Lagos Island and Victoria Island</li>
              <li>Lekki, Ajah, and Sangotedo</li>
              <li>Ikeja, Surulere, and Yaba</li>
              <li>Ikorodu, Festac, and Amuwo Odofin</li>
              <li>All other Lagos State locations</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold text-gray-900">Ogun State</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              We deliver to all major areas in Ogun State. Whether you are in Sagamu, Abeokuta, Ijebu Ode, or anywhere else in Ogun State, we can bring your Vitafoam order directly to you.
            </p>
            <ul className="text-gray-500 text-sm space-y-1">
              <li>Sagamu and Ikenne</li>
              <li>Abeokuta and Obafemi Owode</li>
              <li>Ijebu Ode and Ijebu North</li>
              <li>Ota and Sango Ota</li>
              <li>Mowe, Ofada, and surrounding areas</li>
            </ul>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Nationwide Delivery</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We ship to all 36 states in Nigeria. If you are outside Lagos or Ogun State, contact us to confirm delivery fees and timelines to your location. Most orders reach other states within 5 to 10 working days.
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Find Your Nearest Comfort Centre</h2>
          <p className="text-gray-600 text-sm mb-5">
            Contact us directly on WhatsApp or by phone and we will confirm the most convenient way to get your order. Our team is available Monday to Saturday, 8:00 AM to 6:00 PM.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/2348053054348"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#20bd5a] transition-colors text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+2348053054348"
              className="flex items-center gap-2 bg-[#1a1a1a] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" /> +234 805 305 4348
            </a>
          </div>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Locations;
