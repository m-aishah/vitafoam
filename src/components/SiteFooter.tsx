import logo from "@/assets/logo.jpg";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto container-px py-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block rounded-lg bg-white p-3">
            <img src={logo} alt="Multibiz.global Venture — Better Sleep. Better Life. Everywhere." className="h-28 w-auto object-contain" />
          </div>
          <p className="mt-5 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
            Authorized Vitafoam distributor delivering premium mattresses across Nigeria. Genuine products, every grade, every size.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-accent">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="text-primary-foreground/80 hover:text-accent transition-smooth">Home</Link></li>
            <li><Link to="/shop" className="text-primary-foreground/80 hover:text-accent transition-smooth">Shop Mattresses</Link></li>
            <li><Link to="/cart" className="text-primary-foreground/80 hover:text-accent transition-smooth">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-accent">Order via WhatsApp</h4>
          <a href="https://wa.me/2348053054348" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-primary-foreground/90 hover:text-accent transition-smooth">
            <WhatsAppIcon className="h-4 w-4" />
            +234 805 305 4348
          </a>
          <p className="mt-2 text-xs text-primary-foreground/60">All prices 7.5% VAT inclusive.</p>
        </div>
      </div>

      <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-center text-xs text-primary-foreground/60">
        © 2026 Multibiz.global Venture. Authorized Vitafoam Distributor.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
