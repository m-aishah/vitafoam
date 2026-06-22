import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SECTIONS = [
  {
    title: "Introduction",
    body: `By accessing and using vitafoammattress.com, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website. We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of any changes.`,
  },
  {
    title: "Use of Website",
    body: `This website is intended for personal, non-commercial use. You may not use it for any unlawful purpose or in a way that could damage, disable, or impair the site. You are responsible for maintaining the confidentiality of any account credentials.`,
  },
  {
    title: "Orders and Payment",
    body: `All orders are subject to availability and confirmation. We reserve the right to decline or cancel any order at our discretion. Payment must be made in full before goods are dispatched. We accept bank transfers, online card payments, and other methods as specified at checkout.`,
  },
  {
    title: "Pricing",
    body: `All prices are listed in Nigerian Naira (NGN) and include VAT at 7.5%. We reserve the right to change prices at any time without notice. The price charged will be the price displayed at the time of order confirmation.`,
  },
  {
    title: "Delivery",
    body: `Delivery timelines are estimates and not guaranteed. We are not liable for delays caused by circumstances beyond our control. Free delivery applies to qualifying orders in Lagos and Ogun State as described in our Delivery Information page.`,
  },
  {
    title: "Returns and Refunds",
    body: `Returns are accepted within 7 days of delivery for eligible items. Please refer to our Return Policy page for full details. Refunds are processed within 5 to 10 business days of return approval.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website, including text, images, logos, and design, is the property of Vitafoam Mattress Nigeria or its licensors. You may not reproduce, distribute, or use any content without prior written permission.`,
  },
  {
    title: "Limitation of Liability",
    body: `We are not liable for any indirect, incidental, or consequential damages arising from the use of this website or our products, to the maximum extent permitted by law. Our total liability shall not exceed the value of the order in question.`,
  },
  {
    title: "Governing Law",
    body: `These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the Nigerian courts.`,
  },
];

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Terms and Conditions | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Read the Terms and Conditions for using Vitafoam Mattress Nigeria website and placing orders." />
      <link rel="canonical" href="https://vitafoammattress.com/terms" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Terms and Conditions</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Terms and Conditions
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-3xl">
        <p className="text-gray-500 text-sm mb-10">Last updated: June 2026</p>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-bold text-gray-900 mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-gray-500 text-sm">
          Questions about these terms? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.
        </p>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Terms;
