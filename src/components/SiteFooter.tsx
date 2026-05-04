import logo from "@/assets/logo.jpg";
import vitafoamLogo from "@/assets/vitafoam-logo.svg";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto container-px py-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-white p-2">
              <img src={logo} alt="Multibiz.global Venture" className="h-16 w-16 object-contain" />
            </div>
            <div>
              <div className="font-display text-xl font-bold">Multibiz<span className="text-accent">.global</span> Venture</div>
              <div className="text-xs tracking-[0.2em] uppercase text-primary-foreground/70">Better Sleep. Better Life. Everywhere.</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm text-primary-foreground/70 leading-relaxed">
            Authorized Vitafoam distributor delivering premium mattresses across Nigeria. Genuine products, every grade, every size.
          </p>

          {/* Authorized distributor seal */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-lg bg-white/95 px-4 py-3">
            <img src={vitafoamLogo} alt="Vitafoam" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">Authorized Distributor</div>
              <div className="text-sm font-bold text-primary">Genuine Vitafoam Products</div>
            </div>
          </div>
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
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
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

