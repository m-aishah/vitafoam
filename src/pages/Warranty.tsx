import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, XCircle } from "lucide-react";

const WARRANTY_TABLE = [
  { grade: "Deluxe", years: "1 year" },
  { grade: "Shine", years: "2 years" },
  { grade: "Corona", years: "3 years" },
  { grade: "Grand", years: "5 years" },
  { grade: "Sizzler", years: "5 years" },
  { grade: "Vita Haven", years: "7 years" },
  { grade: "Supreme", years: "7 years" },
  { grade: "Vita Galaxy Classic", years: "10 years" },
  { grade: "Galaxy Orthopaedic", years: "10 years" },
  { grade: "Vita Spring Flex", years: "5 years" },
  { grade: "Vita Spring Firm", years: "5 years" },
];

const Warranty = () => (
  <div className="min-h-screen flex flex-col">
    <Helmet>
      <title>Warranty Information | Vitafoam Mattress Nigeria</title>
      <meta
        name="description"
        content="All Vitafoam mattresses come with the manufacturer warranty from Vitafoam Nigeria. Find warranty durations by grade and how to make a claim."
      />
      <link rel="canonical" href="https://vitafoammattress.com/warranty" />
    </Helmet>
    <SiteHeader />

    <section className="bg-primary text-white py-10 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_60%)]" />
      <h1 className="font-display text-3xl font-bold relative z-10">
        Warranty Information
      </h1>
      <p className="mt-2 text-white/70 text-sm relative z-10">
        <Link to="/" className="hover:text-white">
          Home
        </Link>{" "}
        / Warranty
      </p>
    </section>

    <section className="py-16 bg-white flex-1">
      <div className="container mx-auto container-px max-w-3xl space-y-10">
        <div>
          <p className="text-gray-600 leading-relaxed">
            All mattresses sold by Vitafoam Mattress Nigeria are covered by the
            standard Vitafoam Nigeria manufacturer warranty. This warranty
            applies to manufacturing defects and is honoured through our store
            as an authorized dealer.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
            Warranty by Grade
          </h2>
          {/* <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Grade</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900">Warranty Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {WARRANTY_TABLE.map((row) => (
                  <tr key={row.grade} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{row.grade}</td>
                    <td className="px-4 py-3 text-gray-600">{row.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          <p className="text-xs text-gray-400 mt-2">
            Warranty periods are indicative based on Vitafoam Nigeria guidelines
            and may vary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-green-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" /> What the
              Warranty Covers
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Manufacturing defects in materials or workmanship</li>
              <li>Premature sagging or body impressions beyond normal use</li>
              <li>Structural failure of the foam core</li>
              <li>Fabric or stitching defects present at time of purchase</li>
            </ul>
          </div>
          <div className="border border-red-100 rounded-lg p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" /> What is Not Covered
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Normal wear and softening over time</li>
              <li>Damage from water, moisture, or staining</li>
              <li>Damage caused by improper use or storage</li>
              <li>Damage from an unsupportive bed frame or base</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">
            How to Make a Warranty Claim
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Contact Us",
                body: "Reach out via WhatsApp on +234 805 305 4348 with your order reference and a description of the issue. Include clear photos of the defect.",
              },
              {
                step: "2",
                title: "Assessment",
                body: "Our team will review your claim and determine whether it falls within the warranty coverage. We may request the item be returned for inspection.",
              },
              {
                step: "3",
                title: "Resolution",
                body: "If the claim is approved, we will arrange a replacement or repair as appropriate under the Vitafoam warranty terms.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {s.title}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Warranty;
