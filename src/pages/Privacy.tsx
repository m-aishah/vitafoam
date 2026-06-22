import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SECTIONS = [
  {
    title: "What We Collect",
    body: "When you place an order or contact us, we may collect your name, email address, phone number, delivery address, and order details. We may also collect browsing data such as pages visited and time on site through cookies and analytics tools.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to process and deliver your orders, communicate with you about your purchases, respond to enquiries, and improve our website and services. We may also send promotional emails if you have opted in to receive them.",
  },
  {
    title: "Data Storage and Security",
    body: "Your data is stored securely and is not sold or shared with third parties except where necessary to fulfil your order (e.g. delivery partners) or as required by law. We take reasonable steps to protect your information from unauthorized access.",
  },
  {
    title: "Your Rights",
    body: "You have the right to request access to the personal data we hold about you, ask for corrections, request deletion, or opt out of marketing communications at any time. To exercise any of these rights, contact us via our Contact page.",
  },
  {
    title: "Cookies",
    body: "We use cookies to improve your browsing experience and collect analytics. You can manage cookie preferences in your browser settings. See our Cookies Policy for more details.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.",
  },
  {
    title: "Contact",
    body: "If you have questions about this Privacy Notice or how we handle your data, please contact us at info@vitafoammattress.com or via WhatsApp on +234 805 305 4348.",
  },
];

const Privacy = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Privacy Notice | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Read our Privacy Notice to understand how Vitafoam Mattress Nigeria collects, uses and protects your personal data." />
      <link rel="canonical" href="https://vitafoammattress.com/privacy" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Privacy Notice</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Privacy Notice
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
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Privacy;
