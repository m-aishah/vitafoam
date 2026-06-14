import React, { useState } from "react";
import vitafoamLogo from "@/assets/vitafoam-logo-1.svg";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const SiteFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer>
      {/* Newsletter strip */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto container-px py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-800 text-sm sm:text-base">
              Sign up to receive exclusive email updates on new product announcements, special promotions, sales and more
            </p>
            <p className="text-xs text-gray-500 mt-1">
              By entering your email address, you agree to receive our marketing promotion and offers in accordance with our Privacy Policy
            </p>
          </div>
          <form className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 px-4 border border-gray-300 rounded text-sm flex-1 sm:w-56 focus:outline-none focus:border-primary"
            />
            <button type="submit" className="h-10 px-5 bg-[#1a1a1a] text-white text-sm font-bold rounded hover:bg-gray-800 transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#1a1a1a] text-gray-300">
        <div className="container mx-auto container-px py-12">
          <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {/* Products */}
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-4 uppercase tracking-wide">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="hover:text-primary transition-colors">Mattresses</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Pillows</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Bedding</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Lifestyle</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Furniture</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Mother & Child</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-4 uppercase tracking-wide">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Comfort Centres</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Distributors</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Ordering Centres</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Buy Right Guide</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Become a Distributor</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Site Map</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-4 uppercase tracking-wide">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Reviews</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">How to Shop on Vitafoam</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">How to Find Products</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Product Brochure</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Corporate Information</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-4 uppercase tracking-wide">Information</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shop" className="hover:text-primary transition-colors">Quality Policy</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Privacy Notice</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Cookies Policy</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Warranty</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Return Policy</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Delivery Information</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-4 uppercase tracking-wide">Customer Service</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Call Us</p>
                  <a href="tel:+2348053054348" className="hover:text-primary transition-colors">+234 805 305 4348</a>
                </div>
                <a
                  href="https://wa.me/2348053054348"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#20bd5a] transition-colors font-semibold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Send Us a Message
                </a>
                <div>
                  <p className="text-gray-300 font-semibold">0800VITAFOAM</p>
                  <p className="text-xs text-gray-400">(Toll Free)</p>
                </div>
                {/* Social */}
                <div className="flex items-center gap-2 pt-2">
                  <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-primary transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-primary transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-primary transition-colors">
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-primary transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-primary transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <img src={vitafoamLogo} alt="Vitafoam" className="h-8 w-auto brightness-0 invert opacity-60" />
              <span>© 2026 Vitafoam Comfort Centre. All Rights Reserved</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">We Accept:</span>
              <div className="flex gap-2">
                <div className="bg-white rounded px-2 py-1 text-[10px] font-bold text-red-600">Mastercard</div>
                <div className="bg-white rounded px-2 py-1 text-[10px] font-bold text-blue-700">VISA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
