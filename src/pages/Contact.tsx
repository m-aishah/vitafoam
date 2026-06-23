import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full border rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${errors[field] ? "border-red-400" : "border-gray-300"}`;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
        <h1 className="font-display text-2xl md:text-3xl font-bold relative z-10">Contact Us</h1>
        <p className="mt-2 text-white/70 text-sm relative z-10">
          <Link to="/" className="hover:text-white">Home</Link>
          {" / "}
          <span className="text-white">Contact</span>
        </p>
      </section>

      <section className="py-12 flex-1 bg-white">
        <div className="container mx-auto container-px">
          <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                We are an authorised Vitafoam Comfort Centre serving Lagos and Ogun State. Whether you have a product question, need delivery information, or want to place a large order, our team is ready to help.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Our Location</p>
                    <p className="text-gray-500 text-sm mt-0.5">Lagos & Ogun State, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">WhatsApp / Phone</p>
                    <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="text-primary text-sm hover:underline mt-0.5 block">
                      +234 805 305 4348
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Email</p>
                    <a href="mailto:info@vitafoamcomfortcentre.com" className="text-primary text-sm hover:underline mt-0.5 block">
                      info@vitafoamcomfortcentre.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Business Hours</p>
                    <p className="text-gray-500 text-sm mt-0.5">Monday – Saturday: 8:00am – 6:00pm</p>
                    <p className="text-gray-500 text-sm">Sunday: 10:00am – 4:00pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded p-6 text-center">
                  <p className="font-bold text-green-800 text-lg mb-2">Message Received!</p>
                  <p className="text-green-700 text-sm">Thank you, we will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Adaobi Okafor"
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className={inputClass("phone")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                    >
                      <option value="">Select a subject...</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Order/Delivery">Order / Delivery</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Warranty Claim">Warranty Claim</option>
                      <option value="Partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Message <span className="text-red-500">*</span></label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className={inputClass("message")}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 bg-[#1a1a1a] text-white text-sm font-bold rounded hover:bg-primary transition-colors uppercase tracking-wide"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
