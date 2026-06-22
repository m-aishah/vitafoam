import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I place an order?",
    a: "You can order directly on our website by adding items to your cart, or by contacting us on WhatsApp at +234 805 305 4348. Our team will guide you through the process and confirm availability.",
  },
  {
    q: "Do you offer free delivery?",
    a: "Yes. We offer free delivery within Lagos State and Ogun State for orders of 50,000 NGN and above. For orders below this threshold or outside these states, delivery fees apply and will be communicated at checkout.",
  },
  {
    q: "How long does delivery take?",
    a: "For Lagos and Ogun State, delivery typically takes 3 to 5 working days. For other states, expect 5 to 10 working days depending on your location.",
  },
  {
    q: "Are your products genuine Vitafoam?",
    a: "Absolutely. We are an authorized Vitafoam dealer and source all products directly from Vitafoam Nigeria Plc. Every item we sell is 100% authentic and covered by the manufacturer's warranty.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfers, online card payments via our secure payment gateway, and POS on delivery for customers in Lagos. You can confirm payment options when placing your order via WhatsApp.",
  },
  {
    q: "Can I return a product I am not happy with?",
    a: "Yes. We accept returns within 7 days of delivery for items that are in original condition, have a manufacturing defect, or were delivered incorrectly. Please contact us via WhatsApp to initiate a return. See our full Return Policy for details.",
  },
  {
    q: "What warranty comes with Vitafoam mattresses?",
    a: "All Vitafoam mattresses carry the standard Vitafoam Nigeria manufacturer warranty, which varies by grade. Entry-level grades carry a 1 to 2 year warranty, while premium grades carry up to 10 years. See our Warranty page for the full breakdown.",
  },
  {
    q: "Do you ship nationwide?",
    a: "Yes. We ship to all 36 states in Nigeria. Delivery fees and timelines outside Lagos and Ogun State will be confirmed when you place your order.",
  },
  {
    q: "Which mattress grade is best for me?",
    a: "It depends on your budget and sleep needs. The Deluxe and Shine are great everyday options, while the Corona is our most popular all-round choice. For premium comfort, consider the Grand, Sizzler, or Vita Haven. Visit our Buy Right Guide for a full comparison.",
  },
  {
    q: "How do I care for my Vitafoam mattress?",
    a: "Rotate your mattress every 3 months to ensure even wear. Avoid jumping on the mattress, keep it dry, and use a mattress protector. Do not fold or bend the mattress as this can damage the foam structure.",
  },
];

const Faqs = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FAQs | Vitafoam Mattress Nigeria</title>
        <meta name="description" content="Frequently asked questions about ordering, delivery, returns, warranty and Vitafoam products in Nigeria." />
        <link rel="canonical" href="https://vitafoammattress.com/faqs" />
      </Helmet>
      <SiteHeader />

      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-3xl font-bold relative z-10">Frequently Asked Questions</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link> / FAQs
        </p>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="container mx-auto container-px max-w-3xl">
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm mb-4">Still have a question? We are happy to help.</p>
            <a
              href="https://wa.me/2348053054348"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#25D366] text-white font-bold px-8 py-3 rounded hover:bg-[#20bd5a] transition-colors uppercase tracking-wide text-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Faqs;
