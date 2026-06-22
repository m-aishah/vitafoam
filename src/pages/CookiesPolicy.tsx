import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CookiesPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Cookies Policy | Vitafoam Mattress Nigeria</title>
      <meta name="description" content="Learn how Vitafoam Mattress Nigeria uses cookies on our website and how you can manage your cookie preferences." />
      <link rel="canonical" href="https://vitafoammattress.com/cookies" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">Cookies Policy</h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">Home</Link> / Cookies Policy
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-3xl space-y-8">
        <p className="text-gray-500 text-sm">Last updated: June 2026</p>

        <div>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-2">What Are Cookies?</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, keep you logged in, and understand how you use the site so we can improve your experience.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-2">Cookies We Use</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-gray-900">Essential Cookies</td>
                  <td className="px-4 py-3 text-gray-600">Required for the website to function, such as maintaining your shopping cart and session.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900">Analytics Cookies</td>
                  <td className="px-4 py-3 text-gray-600">Help us understand how visitors use our site so we can improve performance and content.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-900">Preference Cookies</td>
                  <td className="px-4 py-3 text-gray-600">Remember your settings and preferences, such as your selected product filters.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-2">Managing Cookies</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            You can control or disable cookies through your browser settings. Most browsers allow you to refuse new cookies, delete existing ones, or alert you when a cookie is being set. Note that disabling essential cookies may affect how the website functions.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-2">Third-Party Cookies</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Some third-party services we use, such as analytics platforms, may also set cookies. These are governed by the respective privacy policies of those services.
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Questions? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.
        </p>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default CookiesPolicy;
