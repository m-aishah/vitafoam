import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, XCircle } from "lucide-react";

const Returns = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Return Policy | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Our return policy: 7-day returns for manufacturing defects, wrong or damaged items. Contact us via WhatsApp to initiate a return." />
      <link rel="canonical" href="https://vitafoammattress.com/returns" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Return Policy</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Return Policy
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-3xl space-y-10">

        <div>
          <p className="text-gray-600 leading-relaxed">
            We want you to be completely satisfied with your purchase. If something is not right, we will work with you to resolve it. Please read our return policy carefully before initiating a return.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Return Window</h2>
          <p className="text-gray-600 leading-relaxed">
            Returns are accepted within <strong>7 days of the delivery date</strong>. After this period, we are unable to accept returns except where a warranty claim applies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-green-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" /> Eligible for Return
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Manufacturing defects (lumps, tears, stitching failures)</li>
              <li>Wrong item delivered (different grade or size)</li>
              <li>Item damaged in transit</li>
              <li>Product does not match the description on our website</li>
            </ul>
          </div>
          <div className="border border-red-100 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" /> Not Eligible for Return
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Change of mind after 7 days of delivery</li>
              <li>Normal wear and tear over time</li>
              <li>Damage caused by improper use, staining, or moisture</li>
              <li>Custom or specially ordered items</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">How to Return an Item</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Contact Us", body: "Reach out via WhatsApp on +234 805 305 4348 within 7 days of delivery. Describe the issue and include photos where possible." },
              { step: "2", title: "Get Approval", body: "Our team will review your request and confirm whether the return qualifies. We aim to respond within 24 hours." },
              { step: "3", title: "Return and Resolution", body: "If approved, we will arrange collection or provide instructions. Once the item is received and inspected, we will issue a replacement or refund." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0">{s.step}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-700 font-semibold mb-3">Need to start a return?</p>
          <a
            href="https://wa.me/2348053054348"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-[#25D366] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#20bd5a] transition-colors uppercase tracking-wide text-sm"
          >
            Contact Us on WhatsApp
          </a>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Returns;
