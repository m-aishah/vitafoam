import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us | Vitafoam Mattress Nigeria</title>
        <meta name="description" content="Get in touch with Vitafoam Mattress Nigeria. Call, WhatsApp or send a message. We serve Lagos and Ogun State with nationwide shipping." />
        <link rel="canonical" href="https://vitafoammattress.com/contact" />
      </Helmet>
      <SiteHeader />

      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-3xl font-bold relative z-10">Contact Us</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link> / Contact Us
        </p>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="container mx-auto container-px">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">Call Us</p>
                    <a href="tel:+2348053054348" className="text-gray-600 hover:text-primary transition-colors">+234 805 305 4348</a>
                    <p className="text-gray-500 text-xs mt-1">Toll free: 0800VITAFOAM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">WhatsApp</p>
                    <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline font-semibold">
                      Send us a message
                    </a>
                    <p className="text-gray-500 text-xs mt-1">Fastest way to reach us</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">Email</p>
                    <a href="mailto:info@vitafoammattress.com" className="text-gray-600 hover:text-primary transition-colors">info@vitafoammattress.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">Business Hours</p>
                    <p className="text-gray-600 text-sm">Monday to Saturday: 8:00 AM to 6:00 PM</p>
                    <p className="text-gray-500 text-xs mt-1">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Amaka Okonkwo"
                    className="w-full h-10 px-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full h-10 px-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-primary/90 transition-colors uppercase tracking-wide text-sm"
                >
                  Send Message
                </button>
                <p className="text-xs text-gray-400 text-center">For fastest response, contact us directly on WhatsApp.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
