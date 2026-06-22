import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const HowToShop = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>How to Shop | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Learn how to order Vitafoam products online or via WhatsApp. Step-by-step guide to buying mattresses, toppers, pillows and bedding." />
      <link rel="canonical" href="https://vitafoammattress.com/how-to-shop" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">How to Shop</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / How to Shop
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-4xl space-y-12">

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-primary/30 rounded-lg p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Order Online</h2>
            <ol className="space-y-4">
              {[
                { n: "1", t: "Browse Products", b: "Visit our Shop page and use the category filters to find what you are looking for. You can filter by grade, price, and size." },
                { n: "2", t: "Select Your Item", b: "Click on a product to view full details, choose your preferred size, and check the price." },
                { n: "3", t: "Add to Cart", b: "Select the size and quantity, then click Add to Cart. Continue shopping or go to your cart when ready." },
                { n: "4", t: "Checkout", b: "Review your cart, confirm your delivery address, and choose your payment method. Complete payment to confirm your order." },
                { n: "5", t: "Order Confirmation", b: "You will receive an order confirmation. Our team will contact you to confirm delivery details." },
              ].map((s) => (
                <li key={s.n} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{s.n}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{s.t}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-[#25D366]/30 rounded-lg p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Order via WhatsApp
            </h2>
            <ol className="space-y-4">
              {[
                { n: "1", t: "Message Us", b: "Send a message to +234 805 305 4348 on WhatsApp with the product name, grade, and size you want." },
                { n: "2", t: "Get a Quote", b: "We will confirm availability, provide a price quote including any applicable delivery fees, and answer your questions." },
                { n: "3", t: "Make Payment", b: "Pay via bank transfer to our account details. Send your payment receipt on WhatsApp to confirm." },
                { n: "4", t: "Delivery Arranged", b: "We confirm your order and schedule delivery. Expect a call from our team to agree on a convenient delivery time." },
              ].map((s) => (
                <li key={s.n} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{s.n}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{s.t}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="https://wa.me/2348053054348"
              target="_blank"
              rel="noreferrer"
              className="mt-5 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-2.5 rounded hover:bg-[#20bd5a] transition-colors text-sm"
            >
              <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Payment Methods</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Bank Transfer", desc: "Transfer directly to our account. Send your receipt on WhatsApp to confirm payment." },
              { title: "Online Card Payment", desc: "Pay securely via our online payment gateway using your debit or credit card." },
              { title: "POS on Delivery", desc: "Available for customers in Lagos. Pay with your card when your order is delivered." },
            ].map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 text-sm mb-1">{p.title}</p>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">After You Order</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Order Confirmation", desc: "You will receive confirmation via email or WhatsApp with your order reference number." },
              { title: "Dispatch", desc: "We prepare and dispatch your order within 1 to 2 business days of payment confirmation." },
              { title: "Delivery", desc: "Our team will contact you before delivery to confirm a convenient time. Most Lagos and Ogun orders arrive within 3 to 5 working days." },
            ].map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 text-sm mb-1">{p.title}</p>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    <SiteFooter />
  </div>
);

export default HowToShop;
