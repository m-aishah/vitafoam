import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

type FAQ = { question: string; answer: string };

const FAQS: FAQ[] = [
  {
    question: "Are your Vitafoam products genuine?",
    answer: "Yes — absolutely. We are an authorised Vitafoam Comfort Centre and source all our products directly from Vitafoam Nigeria Limited. Every mattress and sleep product we sell comes with the full manufacturer warranty intact. We never sell counterfeit, grey-market, or rebranded foam products. If you have any doubt, you can verify our authorised dealer status directly with Vitafoam Nigeria.",
  },
  {
    question: "Do you deliver outside Lagos?",
    answer: "Yes, we deliver nationwide. While our free delivery offer applies only within Lagos metropolis (for orders of ₦50,000 and above), we can arrange paid delivery to any state in Nigeria. For deliveries outside Lagos, please contact us on WhatsApp to get a delivery quote for your specific location. We typically use trusted logistics partners for inter-state deliveries.",
  },
  {
    question: "How long does delivery take?",
    answer: "For Lagos orders, delivery is typically within 1–3 working days after payment confirmation. Most orders within Lagos Island, Victoria Island, Lekki, Ikeja, and Surulere are delivered within 24–48 hours. For other areas within Lagos and Ogun State, delivery takes 2–5 working days. Inter-state delivery timelines vary by location — contact us for specifics.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers (direct deposit), online card payment via our secure payment gateway, and cash on delivery for select Lagos areas (subject to confirmation). For large orders, we can also arrange a flexible payment plan — contact us to discuss. All prices displayed on our website are inclusive of 7.5% VAT; there are no hidden charges.",
  },
  {
    question: "What is the warranty on Vitafoam mattresses?",
    answer: "Vitafoam Nigeria provides a manufacturer warranty on all their mattresses. The warranty duration varies by product grade — premium grades such as the Galaxy Orthopaedic and Supreme carry longer warranty periods. Your warranty is registered to you as the original purchaser and covers manufacturing defects in materials and workmanship under normal use. Warranty claims are processed directly through Vitafoam Nigeria with your proof of purchase.",
  },
  {
    question: "Can I return a mattress if I am not satisfied?",
    answer: "We accept returns within 7 days of delivery if the product is unused, in its original packaging, and in undamaged condition. If a mattress has a manufacturing defect, we will arrange a replacement or full refund at no cost to you. Please note that we cannot accept returns on mattresses that have been used, due to hygiene regulations. Contact us via WhatsApp within 7 days of delivery to initiate a return.",
  },
  {
    question: "What sizes are available?",
    answer: "Our mattresses are available in a wide range of standard Nigerian sizes including 2½' × 6' (75 × 30 inches), 3' × 6', 3½' × 6', 4' × 6', 4½' × 6', 5' × 6', 5' × 6½', 6' × 6', and 7' × 6'. Thicknesses range from 3 inches to 20 inches depending on the grade. We also offer custom sizes — contact us on WhatsApp to discuss your specific requirements and get a quote.",
  },
  {
    question: "How do I order?",
    answer: "You can order directly on our website by selecting your mattress, choosing your preferred size, adding to cart, and proceeding to checkout via WhatsApp. Alternatively, you can contact us directly on WhatsApp at +234 805 305 4348 and our team will guide you through the process, confirm availability, and arrange delivery. We respond to all WhatsApp enquiries within a few hours during business hours.",
  },
  {
    question: "How do I care for my Vitafoam mattress?",
    answer: "To maintain your Vitafoam mattress in excellent condition: rotate it 180 degrees every 3 months for even wear; use a high-quality mattress protector to guard against stains; air it in a well-ventilated area periodically; avoid jumping on the mattress or placing excessively heavy objects on it; and never fold or bend a foam mattress as this can permanently damage its internal structure. Keep it away from direct heat sources and direct sunlight for extended periods.",
  },
  {
    question: "What is the difference between the mattress grades?",
    answer: "Vitafoam offers mattresses across multiple price and comfort tiers. Entry-level grades (Deluxe, Shine) offer great everyday value with high-resilience foam. Mid-range grades (Corona, Grand) are our most popular and deliver a premium everyday sleep experience. Premium grades (Sizzler, Supreme) feature higher-density foam and superior comfort layers. Orthopaedic grades (Vita Haven, Galaxy Orthopaedic) prioritise spinal alignment and are medically recommended. Spring hybrid grades (Vita Spring Flex, Vita Spring Firm) combine pocket springs with foam for a different feel. Our team can help you choose the right grade for your needs and budget.",
  },
  {
    question: "Do you offer bulk or corporate pricing?",
    answer: "Yes. We offer special pricing for bulk orders, hotels, hostels, hospitals, property developers, and corporate organisations. If you need 5 or more mattresses, please contact us via WhatsApp or email with your requirements and we will provide a custom quote. We have supplied mattresses to multiple hospitality and institutional clients across Lagos and Ogun State.",
  },
  {
    question: "Is free delivery available on all orders?",
    answer: "Free delivery applies to orders of ₦50,000 and above within Lagos metropolis, excluding Badagry, Ikorodu, Epe, and the Ibeju-Lekki corridor beyond Lekki Phase 1. For orders below ₦50,000, or for deliveries to excluded areas, a delivery fee applies — our team will confirm the exact fee when you place your order. Ogun State deliveries (Sagamu, Abeokuta, Ota, Mowe, etc.) are subject to a flat delivery charge.",
  },
];

const FAQItem = ({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
    >
      <span className="pr-4">{faq.question}</span>
      <ChevronDown className={`flex-shrink-0 h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
    </button>
    {isOpen && (
      <div className="pb-5 pr-8 text-sm text-gray-600 leading-relaxed">
        {faq.answer}
      </div>
    )}
  </div>
);

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-2xl md:text-3xl font-bold relative z-10">Frequently Asked Questions</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link>
          {" / "}
          <span className="text-white">FAQs</span>
        </p>
      </section>

      <section className="py-14 flex-1 bg-white">
        <div className="container mx-auto container-px">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-600 text-sm leading-relaxed mb-10 text-center">
              Everything you need to know about ordering genuine Vitafoam mattresses from our store. Can't find your answer? Contact us on{" "}
              <a href="https://wa.me/2348053054348" className="text-primary hover:underline font-semibold" target="_blank" rel="noreferrer">WhatsApp</a>.
            </p>
            <div className="border border-gray-200 rounded p-6 divide-y divide-gray-200">
              {FAQS.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Faqs;
